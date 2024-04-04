import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";
import { NODE_API_BASE_URL } from "../../../../../utils/urls.utils";

const method = "eth_getBalance";

function createOasDocs(network: string, version: string): OpenAPIV3.Document {
	return {
		openapi: "3.1.0",
		info: {
			title: `${network}-${method}`,
			version,
		},
		servers: [
			{
				url: NODE_API_BASE_URL,
				variables: {
					protocol: {
						enum: ["ethereum"],
						default: "ethereum",
					},
					network: {
						enum: ["mainnet", "sepolia", "holesky"],
						default: "mainnet",
					},
				},
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
					description: `특정 계정 주소가 소유한 Native Token 자산 잔고를 조회할 수 있습니다.`,
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
											type: "string",
										},
										minItems: 2,
										maxItems: 2,
										default: '["0xc90d3Ac75D1D36dF0b0a229E73D8409FB7F3c4ab", "latest"]',
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
}

export default createOasDocs;
