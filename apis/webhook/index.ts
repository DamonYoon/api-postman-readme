import { OpenAPIV3 } from "openapi-types";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import webhookCreate from "./crud/create";
import webhookGet from "./crud/get";
import webhookUpdate from "./crud/update";
import webhookDelete from "./crud/delete";
import { ApiDefinition } from "../../types";
import API_CONFIGS from "../../configs/api.configs";

const { category, fileName, id } = API_CONFIGS.webhook;

const oasDocs: OpenAPIV3.Document = {
	openapi: "3.1.0",
	info: {
		title: category,
		version: "1.0.0",
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

const apiDefinition: ApiDefinition = {
	category,
	fileName,
	oasDocs,
	id,
};

export default apiDefinition;
