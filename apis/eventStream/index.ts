import { OpenAPIV3 } from "openapi-types";
import * as yaml from "js-yaml";
import * as fs from "fs";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import webhookCreate from "./webhook/create";
import webhookGet from "./webhook/get";
import webhookUpdate from "./webhook/update";
import webhookDelete from "./webhook/delete";

const docsFileName = "Webhook_API";
const title = "EVENT STREAM";

const EventStream: OpenAPIV3.Document = {
	openapi: "3.1.0",
	info: {
		title,
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

const EventStream_yaml = yaml.dump(EventStream);
fs.writeFileSync(`./docs/${docsFileName}.yaml`, EventStream_yaml, "utf8");
console.log("File created successfully");
