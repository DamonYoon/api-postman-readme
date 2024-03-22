import { OpenAPIV3 } from "openapi-types";
import { NODE_API_BASE_URL } from "../../../utils/urls.utils";
import { ApiInfo } from "../../../types";
import API_DOCS_TITLES from "../../../utils/titles.utils";
import { getVersionAndId } from "../../../scripts";
import accountPaths from "./src/accounts";
import blockPaths from "./src/blocks";
import eventsPaths from "./src/events";

const APTOS_VERSION = "v1";

const title = API_DOCS_TITLES.NODE_API;

const { version, id } = getVersionAndId(title);

const oasDocs: OpenAPIV3.Document = {
	openapi: "3.1.0",
	info: {
		title,
		version,
	},
	servers: [
		{
			url: `${NODE_API_BASE_URL}/${APTOS_VERSION}`,
			variables: {
				protocol: {
					enum: ["aptos"],
					default: "aptos",
				},
				network: {
					enum: ["mainnet", "testnet"],
					default: "mainnet",
				},
			},
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
		...accountPaths,
		...blockPaths,
		...eventsPaths,
	},
};

const apiInfo: ApiInfo = {
	title,
	id,
	oasDocs,
};

export default apiInfo;
