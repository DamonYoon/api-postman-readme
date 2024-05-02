import { OpenAPIV3 } from "openapi-types";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";
import { NODE_API_BASE_URL } from "../../../../../utils/urls.utils";
import Schemas from "../../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../../configs/readme.config";
import Requests from "../../resources/requests";
import Constants from "../../../../../utils/constants.utils";
import { ReadmeExtension } from "../../../../../types";

// const method = "eth_getLogs";
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
				description: `입력한 필터 조건에 부합하는 Log들을 조회합니다. 별도의 필터를 생성하여 필터 ID로 조회하지 않고, 요청에 바로 필터 조건을 입력하여 조회합니다.`,
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
											type: "object",
											properties: {
												address: Schemas.address,
												blockHash: Schemas.blockHash,
												fromBlock: Schemas.fromBlock,
												toBlock: Schemas.toBlock,
												topics: Schemas.topics,
											},
										},
										minItems: 1,
										maxItems: 1,
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
