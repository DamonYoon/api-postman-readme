import { OpenAPIV3 } from "openapi-types";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import nftPaths from "./src/nft";
import nativePaths from "./src/native";
import tokenPaths from "./src/token";
import blockchainPaths from "./src/blockchain";
import statsPaths from "./src/stats";
import API_CONFIGS from "../../configs/api.configs";
import { ApiInfo } from "../../types";
import API_DOCS_TITLES from "../../utils/titles.utils";

const title = API_DOCS_TITLES.WEB3_DATA_API;

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
		...nftPaths,
		...nativePaths,
		...tokenPaths,
		...blockchainPaths,
		...statsPaths,
	},
};

const apiInfo: ApiInfo = {
	title,
	id,
	oasDocs,
};

export default apiInfo;
