import { OpenAPIV3 } from "openapi-types";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";
import { NODE_API_BASE_URL } from "../../../../../utils/urls.utils";
import Schemas from "../../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../../configs/readme.config";
import Requests from "../../resources/requests";
import Constants from "../../../../../utils/constants.utils";
import { ReadmeExtension } from "../../../../../types";

// const method = "eth_getUncleCountByBlockHash";
const fileName = __dirname.split("/").slice(-1)[0]?.split(".")[0];
const method = fileName as string;
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
				description: `블록 해시를 입력하여 해당 블록의 Uncle 블록 수를 조회합니다.`,
				summary: method,
				operationId: protocol === "ethereum" ? method : `${protocol}_${method}`,
				parameters: [],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: ["id", "jsonrpc", "method", "params"],
								properties: {
									...Requests.baseObject(method).properties, // id, jsonrpc, method
									params: {
										type: "array",
										items: {
											oneOf: [Schemas.blockHash],
										},
										minItems: 1,
										maxItems: 1,
										default: ["0x61a8ad530a8a43e3583f8ec163f773ad370329b2375d66433eb82f005e1d6202"],
										description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.
1. \`block hash\`: 조회하고자 하는 블록 해시를 64자리 16진수 문자열 형식으로 입력합니다.`,
									},
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
