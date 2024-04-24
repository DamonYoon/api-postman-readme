import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import { decodeInfoMessage } from "../../resources/callouts";

const summary = "Get Transactions In Block";
const endpoint = "getTransactionsInBlock";
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
		description: `특정 블록 내의 트랜잭션 리스트를 조회합니다.

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
									block: { ...Requests.block, default: "latest" },
								},
								required: ["block"],
							},
							Requests.PaginationSet,
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
				schema: DataDomains.Pagination({
					allOf: [
						DataDomains.TransactionWithReceipt,
						{
							type: "object",
							properties: {
								logs: {
									type: "array",
									items: {
										allOf: [
											{ ...DataDomains.Log },
											{
												type: "object",
												properties: {
													decoded: DataDomains.DecodedLog,
												},
											},
										],
									},
								},
							},
						},
					],
				}),
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
