import { OpenAPIV3 } from "openapi-types";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import nftPaths from "./src/nft";
import nativePaths from "./src/native";
import tokenPaths from "./src/token";
import blockchainPaths from "./src/blockchain";
import statsPaths from "./src/stats";
import { ApiDefinition } from "../../types";
import API_CONFIGS from "../../configs/api.configs";

const { category, fileName, id } = API_CONFIGS.web3Data;

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
		...nftPaths,
		...nativePaths,
		...tokenPaths,
		...blockchainPaths,
		...statsPaths,
	},
};

const apiDefinition: ApiDefinition = {
	category,
	fileName,
	oasDocs,
	id,
};

export default apiDefinition;
