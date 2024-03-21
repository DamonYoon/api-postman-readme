import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";

const summary = "Get account";
const endpoint = "getAccount";
const operationId = "aptos_" + endpoint;

const info: OpenAPIV3.PathItemObject = {
	get: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Aptos"],
		description: `계정 주소에 대한 인증 키와 sequence number를 반환합니다. 원장의 버전을 지정할 수 있으며 원장의 버전이 지정되지 않은 경우, 최신 원장의 버전을 가져옵니다.`,
		summary,
		operationId,
		parameters: [
			Requests.PathParams.protocol,
			Requests.PathParams.network,
			Requests.PathParams.address,
			Requests.QueryParams.ledgerVersion,
		],
		responses: {
			"200": Responses.Success200({
				schema: {
					type: "object",
					properties: {
						sequence_number: Responses.Params.sequenceNumber,
						authenticationKey: Responses.Params.authenticationKey,
					},
				},
				example: Examples[endpoint],
			}),
			"400": Responses.Error400,
		},
	},
};

export default info;