import { OpenAPIV3 } from "openapi-types";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import webhookCreate from "./webhook/create";
import webhookGet from "./webhook/get";
import webhookUpdate from "./webhook/update";
import webhookDelete from "./webhook/delete";
import { ApiDefinition } from "../../types";

const category = "Event Stream";
const fileName = "Webhook_API";
const id = "65f9435dc3bc24003cc4d2b3";

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
	fileName,
	oasDocs,
	id,
};

export default apiDefinition;
