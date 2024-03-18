import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import DataDomains from "../resources/dataDomains";
import Examples from "../resources/examples";

const title = "Get NFT Transfers Within Range";
const endpoint = "getNftTransfersWithinRange";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["NFT API"],
		description: `특정 기간동안 발생한 NFT 전송 목록을 조회합니다. 조회 결과에는 컨트랙트 메타데이터와 NFT 메타데이터가 포함됩니다. 
> 📘 기간 설정 팁 
> 설정한 기간이 길 경우 응답시간이 길어질 수 있습니다. 빠른 응답을 원한다면 필요한 기간만큼만 설정하는 것을 권장합니다.`,
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
						example: Examples[endpoint],
					},
				},
			},
			"400": Responses.Error400,
			"401": Responses.Error401,
			"403": Responses.Error403,
			"404": Responses.Error404,
			"429": Responses.Error429,
		},
	},
};

export default {
	title,
	endpoint,
	isPublic,
	info,
};
