import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import { NODE_API_BASE_URL } from "../../../../utils/urls.utils";
import Schemas from "../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../configs/readme.config";

const method = "eth_getUncleByBlockNumberAndIndex";
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
				description: `블록 넘버와 트랜잭션 인덱스를 입력하여 해당 블록의 uncle 정보를 조회합니다.`,
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
										oneOf: [Schemas.blockNumberOrTag, Schemas.transactionIndex],
									},
									minItems: 1,
									maxItems: 1,
									default: ["0x5BAD54", "0x0"],
									description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.
1. \`block number\`: 조회하고자 하는 블록 넘버를 16진수 문자열 형식으로 입력합니다. "earliest", "latest", "pending" 등의 블록 태그를 입력할 수도 있습니다.
2. \`transaction index\`: 조회하고자 하는 트랜잭션의 index를 16진수 문자열 형식으로 입력합니다.`,
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
