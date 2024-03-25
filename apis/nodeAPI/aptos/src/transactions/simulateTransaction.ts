import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";

const summary = "Simulate transaction";
const endpoint = "simulateTransaction";
const operationId = "aptos_" + endpoint;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Aptos"],
		description: ``,
		summary,
		operationId,
		parameters: [],
		responses: {
			"200": Responses.Success200({
				schema: {
					type: "array",
					items: {},
				},
				example: Examples[endpoint],
			}),
			"400": Responses.Error400,
		},
	},
};

export default info;
