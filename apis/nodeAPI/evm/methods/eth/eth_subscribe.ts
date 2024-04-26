import { OpenAPIV3 } from "openapi-types";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";
import { NODE_API_WS_BASE_URL } from "../../../../../utils/urls.utils";
import Schemas from "../../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../../configs/readme.config";
import Requests from "../../resources/requests";

// const method = "eth_subscribe";
const fileName = __dirname.split("/").slice(-1)[0]?.split(".")[0];
const method = fileName as string;
const protocol = "ethereum";
const version = MAIN_API_CONFIGS.version;

interface XReadme {
	"x-readme"?: {
		"code-samples"?: {
			language: string;
			code?: string;
			name: string;
			install?: string;
			correspondingExample?: string;
		}[];
		"samples-languages"?: string[];
		"explorer-enabled"?: boolean;
	};
}

const oasDocs: OpenAPIV3.Document<XReadme> = {
	openapi: "3.1.0",
	info: {
		title: `${protocol}-${method}`,
		version,
	},
	servers: [
		{
			url: NODE_API_WS_BASE_URL,
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
				description: `특정 이벤트가 발생할 때마다 실시간으로 알림을 받을 수 있습니다. 이벤트 타입은 newHeads, logs, newPendingTransactions 중 하나를 선택할 수 있습니다.`,
				summary: method,
				operationId: protocol === "ethereum" ? method : `${protocol}_${method}`,
				parameters: [],
				"x-readme": {
					"explorer-enabled": false,
					"samples-languages": ["curl"],
					"code-samples": [
						{
							language: "curl",
							name: "WSS Subscribe",
							install: "npm install -g wscat",
							code: `# Set network and your api key in the URL to connect
$ wscat -c wss://{protocol-network}.nodit.io/{api-key}

# Send a request with the following JSON-RPC payload
> '{"jsonrpc":"2.0","method":"${method}","id":1,"params":["newHeads"]}'`,
						},
					],
				},
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: ["id", "jsonrpc", "method"],
								properties: {
									...Requests.baseObject(method).properties, // id, jsonrpc, method
									params: {
										type: "array",
										minItems: 1,
										maxItems: 2,
										items: {
											type: "string",
											enum: ["newHeads", "logs", "newPendingTransactions"],
										},
										default: ["newHeads"],
										readOnly: true,
									},
								},
							},
							examples: {
								newHeads: {
									summary: "newHeads",
									value: {
										...Requests.baseObject(method).properties, // id, jsonrpc, method
										params: ["newHeads"],
									},
								},
								logs: {
									summary: "logs",
									value: {
										...Requests.baseObject(method).properties, // id, jsonrpc, method
										params: [
											"logs",
											{
												address: "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
												topics: ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
											},
										],
									},
								},
								newPendingTransactions: {
									summary: "newPendingTransactions",
									value: {
										...Requests.baseObject(method).properties, // id, jsonrpc, method
										params: ["newPendingTransactions"],
									},
								},
							},
						},
					},
				},
				responses: {
					"200": Responses.Success200({
						examples: {
							newHeads: {
								summary: "newHeads",
								value: {
									jsonrpc: "2.0",
									method: "eth_subscription",
									params: {
										result: {
											difficulty: "0x15d9223a23aa",
											extraData: "0xd983010305844765746887676f312e342e328777696e646f7773",
											gasLimit: "0x47e7c4",
											gasUsed: "0x38658",
											logsBloom:
												"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
											miner: "0xf8b483dba2c3b7176a3da549ad41a48bb3121069",
											nonce: "0x084149998194cc5f",
											number: "0x1348c9",
											parentHash: "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
											receiptRoot: "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
											sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
											stateRoot: "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
											timestamp: "0x56ffeff8",
											transactionsRoot: "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f",
										},
										subscription: "0x9ce59a13059e417087c02d3236a0b1cc",
									},
								},
							},
							logs: {
								summary: "logs",
								value: {
									jsonrpc: "2.0",
									method: "eth_subscription",
									params: {
										subscription: "0x4a8a4c0517381924f9838102c5a4dcb7",
										result: {
											address: "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
											blockHash: "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
											blockNumber: "0x29e87",
											data: "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
											logIndex: "0x0",
											topics: ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
											transactionHash: "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
											transactionIndex: "0x0",
										},
									},
								},
							},
							newPendingTransactions: {
								summary: "newPendingTransactions",
								value: {
									jsonrpc: "2.0",
									method: "eth_subscription",
									params: {
										subscription: "0xc3b33aa549fb9a60e95d21862596617c",
										result: "0xd6fdc5cc41a9959e922f30cb772a9aef46f4daea279307bc5f7024edc4ccd7fa",
									},
								},
							},
						},
					}),
					"400": Responses.Error400,
				},
			},
		},
	},
};

export default oasDocs;
