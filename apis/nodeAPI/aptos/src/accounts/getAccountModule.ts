import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";

const summary = "Get account module";
const endpoint = "getAccountModule";
const operationId = "aptos_" + endpoint;

const info: OpenAPIV3.PathItemObject = {
	get: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Aptos"],
		description: `특정 원장 버전에서 주어진 계정의 개별 모듈을 검색합니다. 원장 버전이 지정되지 않은 경우 최신 원장 버전이 사용됩니다.`,
		summary,
		operationId,
		parameters: [Requests.PathParams.address, Requests.PathParams.module_name, Requests.QueryParams.ledgerVersion],
		responses: {
			"200": Responses.Success200({
				schema: Responses.Params.module,
				example: Examples[endpoint],
			}),
			"400": Responses.Error400,
		},
	},
};

export default info;
