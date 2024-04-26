import { OpenAPIV3 } from "openapi-types";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";
import { NODE_API_BASE_URL } from "../../../../../utils/urls.utils";
import Schemas from "../../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../../configs/readme.config";
import Requests from "../../resources/requests";

// const method = "eth_call";
const fileName = __dirname.split("/").slice(-1)[0]?.split(".")[0];
const method = fileName as string;
console.log(__dirname.split("/").slice(-1));
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
				description: `실제로 트랜잭션을 생성하여 발행하지 않고 컨트랙트의 읽기 method를 실행한 결과를 조회할 수 있습니다. 주로 특정 스마트 컨트랙트의 현재 상태를 읽기 위해 사용됩니다. call로 인한 상태 변경은 일어나지 않습니다.`,
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
										minItems: 2,
										maxItems: 2,
										items: {
											oneOf: [Schemas.callObject, Schemas.blockNumberOrHashOrTag, Schemas.stateOverrideSet],
										},
										default: [
											{
												to: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
												data: "0x70a08231000000000000000000000000A03167de1A56160e4647d77D81E9139af55b63D4",
											},
											"latest",
											{},
										],
										description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.
1. \`call object\` - 호출할 컨트랙트의 주소와 호출할 함수의 데이터를 입력합니다.
2. \`block identifier\` - 조회 대상 블록 식별자로 블록 넘버, 블록 해시, 블록 태그 중 하나를 입력할 수 있습니다. 
3. \`state override set\` - 상태 변경을 위한 트랜잭션의 state override set을 입력합니다.`,
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
