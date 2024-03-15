import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";

const title = "Get Block by Hash or Number";
const endpoint = "getBlockByHashOrNumber";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Blockchain API"],
		description: `블록 해시 혹은 블록넘버로 조회한 블록의 특정 정보를 반환합니다.`,
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
									block: { ...Requests.block, default: "latest" },
								},
								required: ["block"],
							},
							Requests.PaginationSet,
							{
								type: "object",
								properties: {
									withLogs: Requests.withLogs,
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
						schema: DataDomains.Block,
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
