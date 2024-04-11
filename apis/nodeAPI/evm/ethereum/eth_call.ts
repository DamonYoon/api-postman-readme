import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import { NODE_API_BASE_URL } from "../../../../utils/urls.utils";
import Schemas from "../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../configs/readme.config";

const method = "eth_call";
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
				tags: ["eth"],
				description: `실제로 트랜잭션을 생성하여 발행하지 않고 컨트랙트의 읽기 method를 실행한 결과를 조회할 수 있습니다. 주로 특정 스마트 컨트랙트의 현재 상태를 읽기 위해 사용됩니다. call로 인한 상태 변경은 일어나지 않습니다.`,
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
									minItems: 2,
									maxItems: 2,
									items: {
										oneOf: [Schemas.callObject, Schemas.blockIdentifier, Schemas.stateOverrideSet],
									},
									default: ["0xc90d3Ac75D1D36dF0b0a229E73D8409FB7F3c4ab", "latest"],
									description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.
1. \`call object\` - 호출할 컨트랙트의 주소와 호출할 함수의 데이터를 입력합니다.
2. \`block identifier\` - 조회 대상 블록 식별자로 블록 넘버, 블록 해시, 블록 태그 중 하나를 입력할 수 있습니다. 
	- 블록 넘버: 16진수 문자열 (ex. "0x1") 
	- 블록 해시: 64자리 16진수 문자열 (ex. "0x39008d07edf93c03bb9d1cfc80598fcf63f441ec86e9de3733fa6a484980ca48")]
	- 블록 태그: enum 문자열 (ex. "latest", "earliest", "pending")
3. \`state override set\` - 상태 변경을 위한 트랜잭션의 state override set을 입력합니다.`,
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
