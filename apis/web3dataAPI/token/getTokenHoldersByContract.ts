import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";
import Constants from "../../../utils/constants.utils";

const title = "Get Token Holders By Contract";
const endpoint = "getTokenHoldersByContract";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Token API"],
		description:
			"특정 NFT 컨트랙트의 홀더 리스트를 조회합니다. 홀더 리스트에는 홀더의 주소와 홀더가 보유한 NFT의 수량이 포함됩니다.",
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
									contractAddress: {
										...Requests.contractAddress,
										default: Constants.USDT_CONTRACT_ADDRESS,
									},
								},
								required: ["contractAddress"],
							},
							Requests.PaginationSet,
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
						schema: DataDomains.Pagination(DataDomains.Balance),
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
