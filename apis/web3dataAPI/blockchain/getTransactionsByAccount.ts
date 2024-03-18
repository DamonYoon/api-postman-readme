import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import DataDomains from "../resources/dataDomains";
import Examples from "../resources/examples";
import Constants from "../../../utils/constants.utils";

const title = "Get Transactions by Account";
const endpoint = "getTransactionsByAccount";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Blockchain API"],
		description: `특정 계정이 전송 혹은 수신한 트랜잭션 목록을 조회합니다.

> 🚧 decodeInput 사용 시 주의사항
>
> decodeInput 필드는 트랜잭션의 input 필드를 해석하여 결과를 제공합니다. 그러나 서로 다른 함수가 같은 함수 선택자(function selector)를 사용할 수 있기 때문에, 제공된 결과가 실제로 호출된 함수와 일치하지 않을 가능성이 있습니다. 따라서, ERC 표준 규격과 다른 함수의 경우 추가적인 검증 과정을 거치는 것을 권장 드립니다.`,
		summary: title,
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
									contractAddresses: {
										type: "array",
										items: Requests.contractAddress,
									},
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
			"200": {
				description: "Successful Response",
				content: {
					"application/json": {
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
					},
				},
			},
			"400": { ...Responses.Error400 },
			"401": { ...Responses.Error401 },
			"403": { ...Responses.Error403 },
			"404": { ...Responses.Error404 },
			"429": { ...Responses.Error429 },
		},
	},
};

export default {
	title,
	endpoint,
	isPublic,
	info,
};
