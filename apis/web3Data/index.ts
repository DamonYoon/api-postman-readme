import { OpenAPIV3 } from "openapi-types";
import * as yaml from "js-yaml";
import * as fs from "fs";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import nftPaths from "./nft";
import nativePaths from "./native";
import tokenPaths from "./token";
import blockchainPaths from "./blockchain";
import statsPaths from "./stats";

const docsFileName = "EVM_Web3_Data_API.yaml";

const EVM_Web3_Data_API: OpenAPIV3.Document = {
	openapi: "3.1.0",
	info: {
		title: "Web3 Data API",
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

const EVM_Web3_Data_API_yaml = yaml.dump(EVM_Web3_Data_API);
fs.writeFileSync(`./docs/${docsFileName}.yaml`, EVM_Web3_Data_API_yaml, "utf8");
console.log("File created successfully");
