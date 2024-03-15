import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";

const title = "Get Internal Transactions By Transaction Hash";
const endpoint = "getInternalTransactionsByTransactionHash";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Blockchain API"],
		description: `특정 트랜잭션에서 발생한 internal transaction 리스트를 조회합니다.

> 💡 사용 시 네트워크를 확인하세요!
>
> 이 API는 오직 Ethereum Mainnet에서만 지원되며, 다른 네트워크에서는 사용할 수 없습니다. 사용 시 네트워크를 확인해주세요.`,
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
			"200": {
				description: "Successful Response",
				content: {
					"application/json": {
						schema: DataDomains.Pagination(DataDomains.Trace),
						example: {
							...Examples[endpoint],
						},
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
