import { OpenAPIV3 } from "openapi-types";
import { NODE_API_BASE_URL } from "../../../utils/urls.utils";
import { ApiInfo } from "../../../types";
import API_DOCS_TITLES from "../../../utils/titles.utils";
import { getMainVersionAndId } from "../../../scripts";

const title = API_DOCS_TITLES.NODE_API;

const { version, id } = getMainVersionAndId(title);

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

const apiInfo: ApiInfo = {
	title,
	id,
	oasDocs,
};

export default apiInfo;
