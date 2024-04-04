import { OpenAPIV3 } from "openapi-types";
import { WEB3_DATA_API_BASE_URL } from "../../../utils/urls.utils";
import webhookCreate from "./src/create";
import webhookGet from "./src/get";
import webhookUpdate from "./src/update";
import webhookDelete from "./src/delete";
import API_DOCS_TITLES from "../../../utils/titles.utils";
import { MAIN_API_CONFIGS } from "../../../configs/readme.config";

const title = API_DOCS_TITLES.EVENT_STREAM;

const version = MAIN_API_CONFIGS.version;

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

export default oasDocs;
