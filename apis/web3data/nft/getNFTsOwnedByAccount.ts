import { OpenAPIV3_1 } from "openapi-types";
import Parameters from "../schemas/parameters";

export const getNFTsOwnedByAccount: OpenAPIV3_1.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["NFT API"],
		description: "해당 Account가 보유한 NFT의 목록을 조회합니다.",
		summary: "Get NFTs Owned By Account",
		operationId: "getNFTsOwnedByAccount",
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
									accountAddress: Parameters.accountAddress,
									contractAddress: Parameters.contractAddress,
									withMetadata: Parameters.withMetadata,
								},
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
								count: {
									type: "integer",
									description:
										"요청한 데이터의 총 개수를 나타내는 필드입니다. 이 필드는 withCount 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
								},
								cursor: {
									type: "string",
									description:
										"cursor 페이지네이션을 위한 필드로, 다음 페이지의 데이터를 로드하기 위해 다음 요청에 제공해야 하는 값입니다.",
								},
								page: {
									type: "integer",
									description:
										"page 파라미터에 지정된 페이지 번호를 나타내는 필드입니다.",
								},
								rpp: {
									type: "integer",
									description:
										"rpp 파라미터에 지정된 페이지당 결과 수를 나타내는 필드입니다.",
								},
								items: {
									type: "array",
									items: {
										type: "object",
										properties: {
											ownerAddress: {
												type: "string",
												description: "소유자 주소를 나타내는 필드입니다.",
											},
											balance: {
												type: "string",
												description: "잔고 나타내는 필드입니다.",
											},
											contractAddress: {
												type: "string",
												description: "컨트랙트 주소를 나타내는 필드입니다.",
											},
											tokenId: {
												type: "string",
												description: "NFT의 토큰 ID를 나타내는 필드입니다.",
											},
											rawMetadata: {
												type: "string",
												description:
													"NFT의 rawMetadata를 나타내는 필드입니다. withMetadata 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
											},
											metadata: {
												type: "object",
												description:
													"NFT의 metadata를 나타내는 필드입니다. withMetadata 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
											},
											media: {
												type: "object",
												description:
													"NFT의 media를 나타내는 필드입니다. withMetadata 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
											},
											metadataSyncedAt: {
												type: "string",
												description:
													"NFT의 metadataSyncedAt을 나타내는 필드입니다. withMetadata 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
};
