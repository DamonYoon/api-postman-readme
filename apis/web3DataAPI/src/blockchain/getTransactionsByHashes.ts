import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import { decodeInfoMessage, throughputLimitInfoMessage } from "../../resources/callouts";

const summary = "Get Transactions By Hashes";
const endpoint = "getTransactionsByHashes";
const isPublic = true;
const tags = ["Blockchain API"];

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags,
		description: `여러 트랜잭션의 정보를 조회합니다. 최대 1000개의 트랜잭션을 조회할 수 있습니다. 

${decodeInfoMessage}

${throughputLimitInfoMessage}
`,
		summary,
		operationId: endpoint,
		parameters: [Requests.protocol, Requests.network],
		requestBody: {
			required: true,
			content: {
				"application/json": {
					schema: {
						additionalProperties: false,
						allOf: [
							{
								type: "object",
								properties: {
									transactionHashes: {
										type: "array",
										items: {
											...Requests.transactionHash,
										},
										minItems: 1,
										maxItems: 1000,
										description: "조회할 트랜잭션 해시를 배열로 입력합니다.",
										default: ["0x1632ac1627903e586c8ea0b1c134908c34ee95e84face9a303abd63686eb2022"],
									},
								},
								required: ["transactionHashes"],
							},
							{
								type: "object",
								properties: {
									withLogs: Requests.withLogs,
									withDecode: Requests.withDecode,
								},
							},
						],
					},
				},
			},
		},
		responses: {
			"200": Responses.Success200({
				schema: {
					type: "array",
					items: {
						allOf: [
							DataDomains.TransactionWithReceipt,
							{
								type: "object",
								properties: {
									logs: {
										...DataDomains.Log,
										...DataDomains.DecodedLog,
									},
								},
							},
						],
					},
				},
				example: Examples[endpoint],
			}),
			"400": Responses.Error400,
			"401": Responses.Error401,
			"403": Responses.Error403,
			"404": Responses.Error404,
			"429": Responses.Error429,
		},
	},
};

export default {
	summary,
	endpoint,
	isPublic,
	info,
};
