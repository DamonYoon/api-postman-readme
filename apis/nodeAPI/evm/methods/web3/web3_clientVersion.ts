import { OpenAPIV3 } from "openapi-types";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";
import { NODE_API_BASE_URL } from "../../../../../utils/urls.utils";
import Schemas from "../../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../../configs/readme.config";
import Requests from "../../resources/requests";
import Constants from "../../../../../utils/constants.utils";
import { ReadmeExtension } from "../../../../../types";

// const method = "eth_blockNumber";
const fileName = __dirname.split("/").slice(-1)[0]?.split(".")[0];
const method = fileName;
if (!method) {
	throw new Error("Check if the file name is correct");
}

const protocol = "ethereum";
const version = MAIN_API_CONFIGS.version;

const oasDocs: OpenAPIV3.Document = {
	openapi: "3.1.0",
	info: {
		title: `${protocol}-${method}`,
		version,
	},
	servers: [
		{
			url: NODE_API_BASE_URL,
			variables: Schemas.ServerVariables[protocol],
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
		["/"]: {
			post: {
				security: [
					{
						api_key: [],
					},
				],
				tags: [],
				description: `현재 노드의 client 버전 정보를 조회합니다.`,
				summary: method,
				operationId: protocol === "ethereum" ? method : `${protocol}_${method}`,
				parameters: [],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: ["id", "jsonrpc", "method"],
								properties: {
									...Requests.baseObject(method).properties, // id, jsonrpc, method
								},
							},
						},
					},
				},
				responses: {
					"200": Responses.Success200({
						example: Examples[method as keyof typeof Examples],
					}),
					"400": Responses.Error400,
				},
			},
		},
	},
};

export default oasDocs;
