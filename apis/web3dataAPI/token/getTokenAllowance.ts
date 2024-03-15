import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import Examples from "../examples";
import Constants from "../../../utils/constants.utils";

const title = "Get Token Allowance";
const endpoint = "getTokenAllowance";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Token API"],
		description: "Spender에게 Owner가 Approve한 Token의 수량을 조회합니다.",
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
			"200": {
				description: "Successful Response",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								allowance: {
									type: "string",
								},
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
	isPublic,
	info,
};
