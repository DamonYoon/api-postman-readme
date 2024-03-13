import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";

const title = "Get NFT Transfers Within Range";
const endpoint = "getNftTransfersWithinRange";
const hide = false;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["NFT API"],
		description:
			"특정 기간동안 발생한 NFT Transfer 리스트를 조회합니다. 조회 결과에는 컨트랙트 메타데이터와 NFT 메타데이터가 포함됩니다.",
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
									fromBlock: Requests.fromBlock,
									toBlock: Requests.toBlock,
									fromDate: Requests.fromDate,
									toDate: Requests.toDate,
								},
							},
							Requests.PaginationSet,
							{
								type: "object",
								properties: {
									withMetadata: Requests.withMetadata,
									withZeroValue: Requests.withZeroValue,
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
								DataDomains.Transfer,
								{
									type: "object",
									properties: {
										contract: {
											...DataDomains.ContractMeta,
											...DataDomains.AssetMeta,
										},
										nft: DataDomains.NftMeta,
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
