import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import Constants from "../../../../utils/constants.utils";

const summary = "Get NFT Contracts by Account";
const endpoint = "getNftContractsByAccount";
const isPublic = true;
const tags = ["NFT API"];

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags,
		description:
			"특정 Account가 보유한 NFT를 컨트랙트 별로 그룹핑하여 조회합니다. 조회 결과에는 컨트랙트별 NFT의 수량과 컨트랙트의 메타데이터가 포함됩니다.",
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
									contractAddresses: Requests.contractAddresses,
								},
								required: ["accountAddress"],
							},
							Requests.PaginationSet,
						],
					},
				},
			},
		},
		responses: {
			"200": Responses.Success200({
				schema: DataDomains.Pagination({
					allOf: [
						DataDomains.NftBalance,
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
