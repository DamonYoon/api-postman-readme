import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";

const title = "Search NFT Contract Metadata By Keyword";
const endpoint = "searchNftContractMetadataByKeyword";
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
			"특정 주소를 입력하여 해당 컨트랙트가 발행한 NFT 목록 조회합니다. 컨트랙트의 name 혹은 symbol과 일치하는 NFT를 조회합니다.",
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
									keyword: { ...Requests.keyword, default: "BAYC" },
								},
								required: ["keyword"],
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
							allOf: [DataDomains.ContractMeta, DataDomains.AssetMeta],
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
