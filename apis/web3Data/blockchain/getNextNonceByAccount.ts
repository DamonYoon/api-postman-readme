import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import Constants from "../../../utils/constants.utils";
import { Patterns } from "../../../utils/patterns.utils";

const title = "Get Next Nonce by Account";
const endpoint = "getNextNonceByAccount";
const isPublic = true;
const tags = ["Blockchain API"];

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags,
		description: `특정 Account의 다음 nonce를 조회합니다.`,
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
									accountAddress: { ...Requests.accountAddress, default: Constants.VITALIK_BUTERIN_ACCOUNT_ADDRESS },
								},
								required: ["accountAddress"],
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
						nonce: {
							type: "string",
							description: "조회한 계정의 다음 nonce 값을 나타냅니다. 이 값은 트랜잭션을 생성할 때 사용됩니다.",
							pattern: Patterns.decimalString,
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
