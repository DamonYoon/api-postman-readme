import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";

const title = "Get Transaction By Hash";
const endpoint = "getTransactionByHash";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Blockchain API"],
		description: `특정 트랜잭션의 정보를 조회합니다.

> ⚠️ decodeInput 사용 시 주의사항
>
> decodeInput 필드는 트랜잭션의 input 필드를 해석하여 결과를 제공합니다. 그러나 서로 다른 함수가 동일한 함수 선택자(function selector)를 사용할 수 있기 때문에, 제공된 결과가 실제로 호출된 함수와 일치하지 않을 가능성이 있습니다. 따라서, ERC 표준 규격과 다른 함수의 경우 추가적인 검증 과정을 거치는 것을 권장 드립니다.`,
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
			"200": {
				description: "Successful Response",
				content: {
					"application/json": {
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
