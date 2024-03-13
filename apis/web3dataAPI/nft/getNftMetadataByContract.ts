import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";
import Constants from "../../../utils/constants.utils";

const title = "Get NFT Metadata by Contract";
const endpoint = "getNftMetadataByContract";
const hide = false;

export const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["NFT API"],
		description: "특정 컨트랙트에서 발행된 NFT의 메타데이터 목록을 조회합니다.",
		summary: title,
		operationId: endpoint,
		parameters: [Requests.protocol, Requests.network],
		requestBody: {
			required: true,
			content: {
				"application/json": {
					schema: {
						allOf: [
							{
								type: "object",
								properties: {
									contractAddress: {
										...Requests.contractAddress,
										default: Constants.BAYC_CONTRACT_ADDRESS,
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
						schema: DataDomains.Pagination({
							allOf: [
								DataDomains.NftMeta,
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
	hide,
	info,
};
