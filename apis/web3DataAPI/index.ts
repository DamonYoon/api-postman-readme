import { OpenAPIV3 } from "openapi-types";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import nftPaths from "./src/nft";
import nativePaths from "./src/native";
import tokenPaths from "./src/token";
import blockchainPaths from "./src/blockchain";
import statsPaths from "./src/stats";
import API_DOCS_TITLES from "../../utils/titles.utils";
import { MAIN_API_CONFIGS } from "../../configs/readme.config";

const title = API_DOCS_TITLES.WEB3_DATA_API;

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
		...nftPaths,
		...nativePaths,
		...tokenPaths,
		...blockchainPaths,
		...statsPaths,
	},
};

export default oasDocs;
