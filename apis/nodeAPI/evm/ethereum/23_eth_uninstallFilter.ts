import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import { NODE_API_BASE_URL } from "../../../../utils/urls.utils";
import Schemas from "../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../configs/readme.config";

const method = "eth_uninstallFilter";
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
				description: `필터 ID를 입력하여 해당 필터를 제거합니다. 필터 ID는 eth_newFilter 메서드를 통해 생성된 필터 ID를 입력합니다. 필터가 이미 제거되었거나 존재하지 않는 경우에는 \`false\`를 반환합니다.`,
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
										oneOf: [Schemas.filterId],
									},
									minItems: 1,
									maxItems: 1,
									default: ["0xaf35d60b70eb3b54018456a0d365ea49"],
									description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.
1. \`filter ID\`: 미리 생성한 필터 ID를 입력합니다.`,
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
