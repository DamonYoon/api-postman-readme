import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import { NODE_API_BASE_URL } from "../../../../utils/urls.utils";
import Schemas from "../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../configs/readme.config";
import Constants from "../../../../utils/constants.utils";

const method = "eth_newFilter";
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
				description: `입력한 필터 조건에 부합하는 Log들을 조회하기 위한 필터를 생성하고 필터 ID를 반환합니다. 필터 ID는 eth_getFilterLogs, eth_uninstallFilter 메서드에서 사용됩니다.`,
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
									minItems: 1,
									maxItems: 1,
									items: {
										type: "object",
										properties: {
											address: Schemas.address,
											blockHash: Schemas.blockHash,
											fromBlock: Schemas.fromBlock,
											toBlock: Schemas.toBlock,
											topics: Schemas.topics,
										},
									},
									default: [
										{
											address: Constants.VITALIK_BUTERIN_ACCOUNT_ADDRESS,
											blockHash: "0x39008d07edf93c03bb9d1cfc80598fcf63f441ec86e9de3733fa6a484980ca48",
											fromBlock: "0x12C1A00",
											toBlock: "latest",
											topics: [
												"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
												`0x000000000000000000000000${Constants.VITALIK_BUTERIN_ACCOUNT_ADDRESS.slice(2)}`,
											],
										},
									],
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
