import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import Constants from "../../../utils/constants.utils";

const title = "Create Webhook";
const endpoint = "createWebhook";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Webhook API"],
		description: `Webhook을 생성하기 위한 API입니다. 구독 정보와 Webhook URL을 입력하여 Webhook을 생성합니다. Webhook을 생성하면 해당 Webhook URL로 이벤트가 전송됩니다. Webhook이 생성되면 Webhook의 Subscription ID를 반환하며, 이를 통해 Webhook 정보를 조회, 수정 및 삭제를 할 수 있습니다.`,
		summary: title,
		operationId: endpoint,
		parameters: [Requests.protocol, Requests.network],
		requestBody: {
			required: true,
			content: {
				"application/json": {
					schema: {
						additionalProperties: false,
						type: "object",
						properties: {
							eventType: Requests.eventType,
							description: Requests.description,
							notification: Requests.notification,
							condition: Requests.condition,
						},
						required: ["eventType", "description", "notification", "condition"],
						default: {
							eventType: "SUCCESSFUL_TRANSACTION",
							notification: {
								webhookUrl: "https://example.com/webhook",
							},
							description: "Webhook for successful transaction",
							condition: `{"addresses": ["${Constants.VITALIK_BUTERIN_ACCOUNT_ADDRESS}"]}`,
						},
					},
				},
			},
		},
		responses: {
			"201": Responses.Success201({
				schema: {
					type: "object",
					properties: {
						subscriptionId: Responses.subscriptionId,
						description: Responses.description,
						protocol: Responses.protocol,
						network: Responses.network,
						eventType: Responses.eventType,
						notification: Responses.notification,
						signingKey: Responses.signingKey,
						createdAt: Responses.createdAt,
						condition: Responses.condition,
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
