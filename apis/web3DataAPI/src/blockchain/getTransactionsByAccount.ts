import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import Constants from "../../../../utils/constants.utils";
import { decodeInfoMessage } from "../../resources/callouts";

const summary = "Get Transactions By Account";
const endpoint = "getTransactionsByAccount";
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
		description: `특정 계정이 전송 혹은 수신한 트랜잭션 목록을 조회합니다.

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
									accountAddress: { ...Requests.accountAddress, default: Constants.VITALIK_BUTERIN_ACCOUNT_ADDRESS },
									relation: Requests.relation,
									fromBlock: Requests.fromBlock,
									toBlock: Requests.toBlock,
									fromDate: Requests.fromDate,
									toDate: Requests.toDate,
								},
								required: ["accountAddress"],
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
									...DataDomains.Log,
									...DataDomains.DecodedLog,
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
