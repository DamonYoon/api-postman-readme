import { OpenAPIV3_1 } from "openapi-types";
import * as yaml from "js-yaml";
import * as fs from "fs";
import { getNFTsOwnedByAccount } from "./nft/getNFTsOwnedByAccount";

const NFT_PATHS = {
	GET_NFTS_OWNED_BY_ACCOUNT: "getNftsOwnedByAccount",
};

const web3_data_API_docs: OpenAPIV3_1.Document = {
	openapi: "3.1.0",
	info: {
		title: "",
		version: "1.0.0",
	},
	servers: [
		{
			url: "{baseurl}",
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
		[`/{protocol}/{network}/nft/${NFT_PATHS.GET_NFTS_OWNED_BY_ACCOUNT}`]:
			getNFTsOwnedByAccount,
	},
};

const web3_data_API_docs_yaml = yaml.dump(web3_data_API_docs);
fs.writeFileSync("web3_data_API_docs.yaml", web3_data_API_docs_yaml, "utf8");
console.log("File created successfully");
