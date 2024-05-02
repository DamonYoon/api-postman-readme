import { OpenAPIV3 } from "openapi-types";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";
import { NODE_API_BASE_URL } from "../../../../../utils/urls.utils";
import Schemas from "../../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../../configs/readme.config";
import Requests from "../../resources/requests";
import Constants from "../../../../../utils/constants.utils";
import { ReadmeExtension } from "../../../../../types";

// const method = "eth_getProof";
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
				description: `특정 주소의 Storage에 저장된 값을 merkle-proof가 포함된 형식으로 반환합니다. 반환된 Proof값을 활용하여 조회한 Storage의 현재 상태값이 위변조되지 않았음을 검증할 수 있습니다.`,
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
											oneOf: [Schemas.address, Schemas.storageHashes, Schemas.blockNumberOrHashOrTag],
										},
										minItems: 3,
										maxItems: 3,
										default: [
											"0xdac17f958d2ee523a2206206994597c13d831ec7",
											["0x000000000000000000000000c6cde7c39eb2f0f0095f41570af89efc2c1ea828"],
											"latest",
										],
										description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.
1. \`address\` - 조회 대상 주소를 40자리 16진수 문자열로 입력합니다.
2. \`storage hashes\` - 조회 대상 Storage 위치 배열 (16진수 문자열)
3. \`block identifier\` - 조회 대상 블록 식별자로 블록 넘버, 블록 해시, 블록 태그 중 하나를 입력할 수 있습니다. 
	- 블록 넘버: 16진수 문자열 (ex. "0x1")
	- 블록 해시: 64자리 16진수 문자열 (ex. "0x39008d07edf93c03bb9d1cfc80598fcf63f441ec86e9de3733fa6a484980ca48")]
	- 블록 태그: enum 문자열 (ex. "latest", "earliest", "pending")`,
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
