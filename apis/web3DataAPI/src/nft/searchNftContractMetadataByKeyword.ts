import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import { throughputLimitInfoMessage } from "../../resources/callouts";

const summary = "Search NFT Contract Metadata By Keyword";
const endpoint = "searchNftContractMetadataByKeyword";
const isPublic = true;
const tags = ["NFT API"];

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags,
		description: `NFT 컨트랙트의 name 혹은 symbol과 일치하는 컨트랙트 목록을 조회합니다.

${throughputLimitInfoMessage}`,
		summary,
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
			"200": Responses.Success200({
				schema: DataDomains.Pagination({
					allOf: [DataDomains.ContractMeta, DataDomains.AssetMeta],
				}),
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
	summary,
	endpoint,
	isPublic,
	info,
};
