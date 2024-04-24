import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import { onlyEthereumMainnetInfoMessage } from "../../resources/callouts";

const summary = "Get Internal Transactions By Transaction Hash";
const endpoint = "getInternalTransactionsByTransactionHash";
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
		description: `특정 트랜잭션에서 발생한 internal transaction 리스트를 조회합니다.

${onlyEthereumMainnetInfoMessage}`,
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
								},
								required: ["transactionHash"],
							},
							Requests.PaginationSet,
							{
								type: "object",
								properties: {
									withZeroValue: Requests.withZeroValue,
									withExternalTransaction: Requests.withExternalTransaction,
								},
							},
						],
					},
				},
			},
		},
		responses: {
			"200": Responses.Success200({
				schema: DataDomains.Pagination(DataDomains.Trace),
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
