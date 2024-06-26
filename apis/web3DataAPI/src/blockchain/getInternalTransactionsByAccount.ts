import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import Constants from "../../../../utils/constants.utils";
import { onlyEthereumMainnetInfoMessage, throughputLimitInfoMessage } from "../../resources/callouts";

const summary = "Get Internal Transactions By Account";
const endpoint = "getInternalTransactionsByAccount";
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
		description: `특정 Account와 관련된 internal transaction 리스트를 조회합니다.

${onlyEthereumMainnetInfoMessage}

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
									accountAddress: {
										...Requests.accountAddress,
										default: Constants.VITALIK_BUTERIN_ACCOUNT_ADDRESS,
									},
								},
								required: ["accountAddress"],
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
