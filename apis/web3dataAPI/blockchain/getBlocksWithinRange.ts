import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";

const title = "Get Blocks Within Range";
const endpoint = "getBlocksWithinRange";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Blockchain API"],
		description: `특정 기간, 특정 구간의 블록 리스트 정보를 조회합니다.`,
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
							allOf: [DataDomains.Block],
						}),
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
	isPublic,
	info,
};
