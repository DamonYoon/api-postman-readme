import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";

const title = "Update Webhook";
const endpoint = "updateWebhook";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	patch: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Webhook API"],
		description: `Webhook의 구독 조건(condition)을 변경하거나 Webhook을 활성화, 또는 비활성화 할 수 있습니다.`,
		summary: title,
		operationId: endpoint,
		parameters: [Requests.protocol, Requests.network, Requests.subscriptionId],
		requestBody: {
			required: true,
			content: {
				"application/json": {
					schema: {
						additionalProperties: false,
						type: "object",
						properties: {
							notification: Requests.notification,
							description: Requests.description,
							isActive: Requests.isActive,
							condition: Requests.condition,
						},
					},
				},
			},
		},
		responses: {
			"200": Responses.Success200({
				schema: {
					type: "object",
					properties: {
						result: Responses.result,
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
