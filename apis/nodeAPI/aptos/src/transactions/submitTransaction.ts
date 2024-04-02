import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";
import Schemas from "../../resources/schemas";

const summary = "Submit transaction";
const endpoint = "submitTransaction";
const operationId = "aptos_" + endpoint;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Aptos"],
		description: `트랜잭션을 실행하기 위해 서명된 트랜잭션을 Submit 합니다. JSON/BCS 두 가지 종류의 format을 지원합니다.`,
		summary,
		operationId,
		parameters: [Requests.Headers.acceptBSC],
		requestBody: {
			required: true,
			content: {
				"application/json": {
					schema: {
						additionalProperties: false,
						allOf: [Requests.BodyParams.transaction],
					},
				},
			},
		},
		responses: {
			"200": Responses.Success200({
				schema: Schemas.TransactionTypes.pendingTransaction,
				example: Examples[endpoint],
			}),
			"400": Responses.Error400,
		},
	},
};

export default info;
