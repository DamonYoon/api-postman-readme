import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
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
			"200": Responses.Success200({
				schema: {
					type: "object",
					properties: {
						result: {
							type: "boolean",
							description: "입력된 Address가 컨트랙트라면 true, 아니라면 false를 반환합니다.",
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
