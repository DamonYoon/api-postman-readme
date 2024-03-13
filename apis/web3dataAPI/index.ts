import { OpenAPIV3 } from "openapi-types";
import * as yaml from "js-yaml";
import * as fs from "fs";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import nftPaths from "./nft";

const EVM_API_docs: OpenAPIV3.Document = {
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
		// NFT
		...nftPaths,

		// Token
		// Blockchain
		// Stats
	},
};

const EVM_API_docs_yaml = yaml.dump(EVM_API_docs);
fs.writeFileSync("EVM_API_docs.yaml", EVM_API_docs_yaml, "utf8");
console.log("File created successfully");
