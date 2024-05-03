import { OpenAPIV3 } from "openapi-types";
import { WEB3_DATA_API_BASE_URL } from "../../../utils/urls.utils";
import webhookCreate from "./src/create";
import webhookGet from "./src/get";
import webhookUpdate from "./src/update";
import webhookDelete from "./src/delete";
import API_DOCS_TITLES from "../../../utils/titles.utils";
import Constants from "../../../utils/constants.utils";
import { OasParams, ReadmeExtension } from "../../../types";

const title = API_DOCS_TITLES.EVENT_STREAM;

function oasDocs({ version }: OasParams): OpenAPIV3.Document {
	return {
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
					"x-default": Constants.API_KEY.NODIT_DOCS_DEMO,
				} as ReadmeExtension.securitySchemes,
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
}

export default oasDocs;
