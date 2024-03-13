import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";
import Constants from "../../../utils/constants.utils";

const title = "Get NFT Metadata by Token IDs";
const endpoint = "getNftMetadataByTokenIds";
const hide = false;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["NFT API"],
		description: `특정 NFT의 메타데이터를 조회합니다. 다수의 NFT를 조회할 수 있으며, 최대 ${Constants.INPUT_ITEM_MAX}개의 NFT를 조회할 수 있습니다.`,
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
			"200": {
				description: "Successful Response",
				content: {
					"application/json": {
						schema: {
							type: "array",
							items: {
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
							},
						},
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
	hide,
	info,
};
