import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";

const endpoint = "getNftMetadataByContract";
const summary = "Get NFT Metadata by Contract";

export const getNftMetadataByContract: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["NFT API"],
		description: "특정 주소를 입력하여 해당 컨트랙트가 발행한 NFT의 메타데이터를 조회합니다.",
		summary: summary,
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
										default: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
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
							type: "object",
							properties: {
								...DataDomains.NftMeta.properties,
								contract: {
									type: "object",
									properties: {
										...DataDomains.ContractMeta.properties,
										...DataDomains.AssetMeta.properties,
									},
								},
							},
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
