import { OpenAPIV3 } from "openapi-types";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import nftPaths from "./nft";
import nativePaths from "./native";
import tokenPaths from "./token";
import blockchainPaths from "./blockchain";
import statsPaths from "./stats";
import { ApiDefinition } from "../../types";

const category = "Web3 Data API";
const fileName = "Web3_Data_API";
const id = "65f9435dc3bc24003cc4d2b2";

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
	fileName,
	oasDocs,
	id,
};

export default apiDefinition;
