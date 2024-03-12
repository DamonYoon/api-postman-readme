import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";

const endpoint = "getNftContractsByAccount";
const summary = "Get NFT Contracts by Account";

export const getNftContractsByAccount: OpenAPIV3.PathItemObject = {
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
									accountAddress: {
										...Requests.accountAddress,
										default: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
									},
									contractAddresses: {
										type: "array",
										items: {
											...Requests.contractAddress,
										},
									},
								},
								required: ["accountAddress"],
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
								contract: {
									type: "object",
									properties: {
										...DataDomains.ContractMeta.properties,
										...DataDomains.AssetMeta.properties,
									},
								},
								...DataDomains.NftBalance.properties,
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
