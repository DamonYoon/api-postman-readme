import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import { decodeInfoMessage } from "../../resources/callouts";

const summary = "Get Transaction By Hash";
const endpoint = "getTransactionByHash";
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
		description: `특정 트랜잭션의 정보를 조회합니다.

${decodeInfoMessage}`,
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
									transactionHash: {
										...Requests.transactionHash,
										default: "0x1632ac1627903e586c8ea0b1c134908c34ee95e84face9a303abd63686eb2022",
									},
									withLogs: Requests.withLogs,
									withDecode: Requests.withDecode,
								},
								required: ["transactionHash"],
							},
						],
					},
				},
			},
		},
		responses: {
			"200": Responses.Success200({
				schema: {
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
