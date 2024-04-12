import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import { NODE_API_BASE_URL } from "../../../../utils/urls.utils";
import Schemas from "../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../configs/readme.config";

const method = "eth_sendRawTransaction";
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
				description: `서명된 트랜잭션 데이터를 네트워크에 전송합니다. 트랜잭션이 정상적으로 처리되는 경우, 트랜잭션의 해시 값이 반환됩니다. 트랜잭션 서명은 개인키에 의해 client에서 이루어져야 합니다. 노드에서는 해당 트랜잭션의 유효성만 검증합니다.`,
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
										oneOf: [Schemas.signedTransactionHash],
									},
									minItems: 1,
									maxItems: 1,
									default: [
										"0x02f8688080808080943f39cfbaff46cb736a603269d14a7e9adf5158b488016345785d8a000080c001a005599173ee4483fa38044e8d7bf592b58a9ab598f7d4a510702d193c60af15a0a00f2d39e8202dc9d7d66a51fc67fcf1d893b20e080c6acf2b25610f5e926cfa21",
									],
									description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.
1. \`signed transaction hash\`: `,
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
