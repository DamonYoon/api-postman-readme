import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";
import Constants from "../../../utils/constants.utils";

const title = "Is Contract";
const endpoint = "isContract";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Blockchain API"],
		description: `입력된 Address가 컨트랙트 주소인지 아닌지 조회합니다.`,
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
									address: {
										...Requests.address,
										default: Constants.VITALIK_BUTERIN_ACCOUNT_ADDRESS,
									},
								},
								required: ["address"],
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
							type: "object",
							properties: {
								result: {
									type: "boolean",
									description: "입력된 Address가 컨트랙트라면 true, 아니라면 false를 반환합니다.",
									example: Examples.isContract,
								},
							},
						},
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
	isPublic,
	info,
};
