import { OpenAPIV3 } from "openapi-types";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import webhookCreate from "./src/webhook/create";
import webhookGet from "./src/webhook/get";
import webhookUpdate from "./src/webhook/update";
import webhookDelete from "./src/webhook/delete";
import API_CONFIGS from "../../configs/api.configs";
import { ApiInfo } from "../../types";
import API_DOCS_TITLES from "../../utils/titles.utils";

const title = API_DOCS_TITLES.EVENT_STREAM;

const { version } = API_CONFIGS;
const apiConfig = API_CONFIGS.apiDefinitions.find((config) => config.title === title);
if (!apiConfig) {
	throw new Error("API definitions not found. Please check the title of the API.");
}
const { id } = apiConfig;

const oasDocs: OpenAPIV3.Document = {
	openapi: "3.1.0",
	info: {
		title,
		version,
	},
	servers: [
		{
			url: WEB3_DATA_API_BASE_URL,
		},
	],
	components: {
		securitySchemes: {
			api_key: {
				type: "apiKey",
				name: "X-API-KEY",
				in: "header",
			},
		},
	},
	paths: {
		"/{protocol}/{network}/webhooks": {
			post: webhookCreate.info.post,
			get: webhookGet.info.get,
		},
		"/{protocol}/{network}/webhooks/{subscriptionId}": {
			patch: webhookUpdate.info.patch,
			delete: webhookDelete.info.delete,
		},
	},
};

const apiInfo: ApiInfo = {
	title,
	id,
	oasDocs,
};

export default apiInfo;
