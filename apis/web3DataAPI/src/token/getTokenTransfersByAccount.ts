import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import Constants from "../../../../utils/constants.utils";

const summary = "Get Token Transfers by Account";
const endpoint = "getTokenTransfersByAccount";
const isPublic = true;
const tags = ["Token API"];

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags,
		description:
			"특정 주소가 전송 혹은 수신한 ERC20 토큰 전송 목록을 조회합니다. 조회 결과에는 토큰 컨트랙트의 메타데이터와 전송된 토큰의 수량이 포함됩니다.",
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
									contractAddresses: Requests.contractAddresses,
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
									withZeroValue: Requests.withZeroValue,
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
						DataDomains.Transfer,
						{
							type: "object",
							properties: {
								contract: {
									...DataDomains.ContractMeta,
									...DataDomains.AssetMeta,
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
