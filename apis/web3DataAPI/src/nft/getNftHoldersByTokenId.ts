import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import Constants from "../../../../utils/constants.utils";

const summary = "Get NFT Holders by Token ID";
const endpoint = "getNftHoldersByTokenId";
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
			"특정 NFT의 홀더 리스트를 조회합니다. 홀더 리스트에는 홀더의 주소와 홀더가 보유한 NFT의 수량이 포함됩니다.",
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
									contractAddress: {
										...Requests.contractAddress,
										default: Constants.RARE_PEPE_CONTRACT_ADDRESS,
									},
									tokenId: {
										...Requests.tokenId,
										default: Constants.RARE_PEPE_TOKEN_ID,
									},
								},
								required: ["contractAddress", "tokenId"],
							},
							Requests.PaginationSet,
						],
					},
				},
			},
		},
		responses: {
			"200": Responses.Success200({
				schema: DataDomains.Pagination(DataDomains.NftHolder),
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
