import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";

const title = "Delete Webhook";
const endpoint = "deleteWebhook";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	delete: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Webhook API"],
		description: `Webhook을 삭제하기 위한 API입니다. Webhook을 삭제하면 해당 Webhook의 구독이 취소되며, 더 이상 이벤트를 받지 않습니다.`,
		summary: title,
		operationId: endpoint,
		parameters: [Requests.protocol, Requests.network, Requests.subscriptionId],
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
