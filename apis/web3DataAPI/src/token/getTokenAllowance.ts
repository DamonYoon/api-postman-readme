import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";
import Constants from "../../../../utils/constants.utils";

const summary = "Get Token Allowance";
const endpoint = "getTokenAllowance";
const isPublic = true;
const tags = ["Token API"];

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags,
		description: "Spender에게 Owner가 Approve한 Token의 수량을 조회합니다.",
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
									contractAddress: {
										...Requests.contractAddress,
										default: Constants.USDT_CONTRACT_ADDRESS,
									},
									ownerAddress: {
										...Requests.accountAddress,
										default: "0x14d06788090769f669427b6aea1c0240d2321f34",
									},
									spenderAddress: {
										...Requests.accountAddress,
										default: "0x61e2523f3e7895670be632600bf0d139453642f7",
									},
								},
								required: ["contractAddress", "ownerAddress", "spenderAddress"],
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
						allowance: {
							type: "string",
							description:
								"spender가 owner를 대신하여 transferFrom을 통해 사용할 수 있는 남은 토큰 수를 반환합니다. 이 값은 approve나 transferFrom이 호출될 때 변경됩니다",
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
	summary,
	endpoint,
	isPublic,
	info,
};
