import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import Constants from "../../../utils/constants.utils";

const title = "Sync Nft Metadata";
const endpoint = "syncNftMetadata";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["NFT API"],
		description: `특정 NFT의 Metadata를 동기화합니다. 최대 100개의 NFT를 동기화할 수 있으며, 동기화까지 최대 10초가 소요될 수 있습니다.`,
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
									tokens: {
										type: "array",
										items: {
											type: "object",
											properties: {
												contractAddress: {
													...Requests.contractAddress,
												},
												tokenId: {
													...Requests.tokenId,
												},
											},
											required: ["contractAddress", "tokenId"],
										},
										default: [
											{ contractAddress: Constants.BAYC_CONTRACT_ADDRESS, tokenId: "1" },
											{ contractAddress: Constants.BAYC_CONTRACT_ADDRESS, tokenId: "2" },
										],
									},
								},
								required: ["tokens"],
								maximum: Constants.INPUT_ITEM_MAX,
							},
						],
					},
				},
			},
		},
		responses: {
			"200": Responses.Success200({
				schema: {
					type: "object",
					properties: {
						message: {
							type: "string",
							description: "동기화 요청에 대한 결과 메시지를 반환합니다.",
							example: "NFT Metadata synchronization request has been successfully submitted.",
						},
					},
				},
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
	title,
	endpoint,
	isPublic,
	info,
};
