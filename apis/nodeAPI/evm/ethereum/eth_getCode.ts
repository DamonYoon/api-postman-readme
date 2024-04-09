import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import { NODE_API_BASE_URL } from "../../../../utils/urls.utils";
import Schemas from "../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../configs/readme.config";

const method = "eth_getCode";
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
				description: `특정 주소의 Storage에 저장된 값을 merkle-proof가 포함된 형식으로 반환합니다. 반환된 Proof값을 활용하여 조회한 Storage의 현재 상태값이 위변조되지 않았음을 검증할 수 있습니다.`,
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
										oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
									},
									minItems: 2,
									maxItems: 2,
									default: ["0xdac17f958d2ee523a2206206994597c13d831ec7", "latest"],
									description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.
1. ${Requests.Descriptions.address}
2. ${Requests.Descriptions.blockIdentifier}`,
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
