import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";

const title = "Get Webhook";
const endpoint = "getWebhook";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	get: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Webhook API"],
		description: `Webhook의 Subscription ID로 Webhook 정보를 조회하기 위한 API입니다.`,
		summary: title,
		operationId: endpoint,
		parameters: [Requests.protocol, Requests.network, Requests.subscriptionIdQuery],
		responses: {
			"200": Responses.Success200({
				schema: {
					type: "object",
					properties: {
						total: {
							type: "integer",
						},
						rpp: {
							type: "integer",
						},
						page: {
							type: "integer",
						},
						items: {
							type: "array",
							items: {
								type: "object",
								properties: {
									subscriptionId: Responses.subscriptionId,
									description: Responses.description,
									protocol: Responses.protocol,
									network: Responses.network,
									eventType: Responses.eventType,
									notification: Responses.notification,
									signingKey: Responses.signingKey,
									isActive: Responses.isActive,
									updatedAt: Responses.updatedAt,
									createdAt: Responses.createdAt,
									condition: Responses.condition,
								},
							},
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
