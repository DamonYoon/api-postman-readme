import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import { NODE_API_BASE_URL } from "../../../../utils/urls.utils";
import Schemas from "../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../configs/readme.config";

const method = "eth_getBlockByHash";
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
			},
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
				description: `블록 해시를 입력하여 특정 블록의 정보를 조회합니다.`,
				summary: method,
				operationId: method,
				parameters: [],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: Requests.CommonFormat({
								method,
								params: {
									type: "array",
									items: {
										oneOf: [Schemas.blockHash, Schemas.includeTransactions],
									},
									minItems: 2,
									maxItems: 2,
									default: ["0x59f63e3840e0f4a1659074c1a4021e881a268a52d31958688da1d66bfbf6d2ca", false],
									description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.
1. \`block hash\`: 조회하고자 하는 블록 해시를 64자리 16진수 문자열 형식으로 입력합니다.
2. \`include transactions\` : 블록 조회시 해당 블록에 포함된 모든 트랜잭션 정보를 함께 조회할지 여부를 Boolean 형식으로 입력합니다. true로 입력한 경우 모든 트랜잭션을 포함하며, false로 입력하는 경우 포함하지 않습니다.`,
								},
							}),
						},
					},
				},
				responses: {
					"200": Responses.Success200({
						example: Examples[method],
					}),
					"400": Responses.Error400,
				},
			},
		},
	},
};

export default oasDocs;
