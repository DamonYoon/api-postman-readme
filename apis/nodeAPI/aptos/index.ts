import { OpenAPIV3 } from "openapi-types";
import { NODE_API_BASE_URL } from "../../../utils/urls.utils";
import API_DOCS_TITLES from "../../../utils/titles.utils";
import accountPaths from "./src/accounts";
import blockPaths from "./src/blocks";
import eventsPaths from "./src/events";
import generalPaths from "./src/general";
import tablesPaths from "./src/tables";
import transactionsPaths from "./src/transactions";
import { MAIN_API_CONFIGS } from "../../../configs/readme.config";
import Constants from "../../../utils/constants.utils";
import { ReadmeExtension } from "../../../types";

const APTOS_VERSION = "v1";

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
			url: `${NODE_API_BASE_URL}${APTOS_VERSION}`,
			variables: {
				// protocol: {
				// 	enum: ["aptos"],
				// 	default: "aptos",
				// },
				// network: {
				// 	enum: ["mainnet", "testnet"],
				// 	default: "mainnet",
				// },
				"protocol-network": {
					enum: ["aptos-mainnet", "aptos-testnet"],
					default: "aptos-mainnet",
				},
			},
		},
	],
	tags: [
		{
			name: "Ethereum",
			externalDocs: {
				url: "https://developer.nodit.io/reference/eth_getproof",
			},
		},
		{
			name: "Polygon",
			externalDocs: {
				url: "https://developer.nodit.io/reference/polygon_eth_getproof",
			},
		},
		{
			name: "Arbitrum",
			externalDocs: {
				url: "https://developer.nodit.io/reference/arbitrum_eth_getproof",
			},
		},
		{
			name: "Optimism",
			externalDocs: {
				url: "https://developer.nodit.io/reference/optimism_eth_getproof",
			},
		},
		{
			name: "Aptos",
		},
	],
	components: {
		securitySchemes: {
			api_key: {
				type: "apiKey",
				name: "X-API-KEY",
				in: "header",
				"x-default": Constants.API_KEY.NODIT_DOCS_DEMO,
			} as ReadmeExtension.securitySchemes,
		},
	},
	paths: {
		...accountPaths,
		...blockPaths,
		...eventsPaths,
		...generalPaths,
		...tablesPaths,
		...transactionsPaths,
	},
};

export default oasDocs;
