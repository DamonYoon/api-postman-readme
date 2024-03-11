import { OpenAPIV3_1 } from "openapi-types";
import Parameters from "../schemas/parameters";
import Responses from "../schemas/responses";

const endpoint = "getNftContractsByAccount";
const summary = "Get NFT Contracts by Account";

export const getNftContractsByAccount: OpenAPIV3_1.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["NFT API"],
		description: "해당 Account가 보유한 NFT의 목록을 조회합니다.",
		summary: summary,
		operationId: endpoint,
		parameters: [Parameters.protocol, Parameters.network],
		requestBody: {
			required: true,
			content: {
				"application/json": {
					schema: {
						allOf: [
							{
								type: "object",
								properties: {
									accountAddress: {
										...Parameters.accountAddress,
										default: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
									},
									contractAddresses: {
										type: "array",
										items: {
											...Parameters.contractAddress,
										},
									},
								},
								required: ["accountAddress"],
							},
							Parameters.paginationSet,
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
							type: "object",
							properties: {
								...Responses.paginationSet({
									type: "object",
									properties: {
										ownerAddress: Responses.ownerAddress,
										balance: Responses.balance,
										contractAddress: Responses.contractAddress,
										tokenId: Responses.tokenId,
										rawMetadata: Responses.rawMetadata,
										metadata: Responses.metadata,
										media: Responses.media,
										metadataSyncedAt: Responses.metadataSyncedAt,
									},
								}),
							},
						},
					},
				},
			},
		},
	},
};
