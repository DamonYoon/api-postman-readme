import { OpenAPIV3 } from "openapi-types";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import nftPaths from "./src/nft";
import nativePaths from "./src/native";
import tokenPaths from "./src/token";
import blockchainPaths from "./src/blockchain";
import statsPaths from "./src/stats";
import API_DOCS_TITLES from "../../utils/titles.utils";
import Constants from "../../utils/constants.utils";
import { OasParams, ReadmeExtension } from "../../types";

const title = API_DOCS_TITLES.WEB3_DATA_API;

function oasDocs({ version }: OasParams): OpenAPIV3.Document {
	return {
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
					"x-default": Constants.API_KEY.NODIT_DOCS_DEMO,
				} as ReadmeExtension.securitySchemes,
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
}

export default oasDocs;
