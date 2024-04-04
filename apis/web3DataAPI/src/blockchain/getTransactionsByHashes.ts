import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import Constants from "../../../../utils/constants.utils";

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
		//TODO: 최대 조회 가능한 트랜잭션 수량 확인 필요
		// description: `여러 트랜잭션의 정보를 조회합니다. 최대 ${Constants.INPUT_ITEM_MAX}개의 트랜잭션을 조회할 수 있습니다.
		description: `여러 트랜잭션의 정보를 조회합니다. 최대 1000개의 트랜잭션을 조회할 수 있습니다. 

> 🚧 decodeInput 사용 시 주의사항
>
> decodeInput 필드는 트랜잭션의 input 필드를 해석하여 결과를 제공합니다. 그러나 서로 다른 함수가 같은 함수 선택자(function selector)를 사용할 수 있기 때문에, 제공된 결과가 실제로 호출된 함수와 일치하지 않을 가능성이 있습니다. 따라서, ERC 표준 규격과 다른 함수의 경우 추가적인 검증 과정을 거치는 것을 권장 드립니다.`,
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
										description: "조회할 트랜잭션의 해시값을 배열로 입력합니다.",
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
