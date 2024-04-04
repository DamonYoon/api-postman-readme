import { OpenAPIV3 } from "openapi-types";
import { NODE_API_BASE_URL } from "../../../../utils/urls.utils";
import API_DOCS_TITLES from "../../../../utils/titles.utils";
import { MAIN_API_CONFIGS } from "../../../../configs/readme.config";

const title = API_DOCS_TITLES.NODE_API;

const version = MAIN_API_CONFIGS.version;

const oasDocs: OpenAPIV3.Document = {
	openapi: "3.1.0",
	info: {
		title,
		version,
	},
	servers: [
		{
			url: NODE_API_BASE_URL,
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
	paths: {},
};

export default oasDocs;
