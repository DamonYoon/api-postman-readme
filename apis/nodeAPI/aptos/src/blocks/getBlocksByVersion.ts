import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";
import Schemas from "../../resources/schemas";

const summary = "Get blocks by version";
const endpoint = "getBlocksByVersion";
const operationId = "aptos_" + endpoint;

const info: OpenAPIV3.PathItemObject = {
	get: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Aptos"],
		description: `블록 번호를 이용하여 해당 블록에 대한 정보와 트랜잭션을 조회할 수 있습니다. 트랜잭션은 default 트랜잭션 사이즈로 제한이 있으며 만약 모든 트랜잭션이 존재하지 않는 경우, 유저가 get Transaction API를 이용하여 나머지 트랜잭션을 Query해야 합니다. 또한 block이 pruned 된 경우, 410 에러를 반환합니다.`,
		summary,
		operationId,
		parameters: [Requests.PathParams.version, Requests.QueryParams.withTransactions],
		responses: {
			"200": Responses.SuccessAptos200({
				schema: {
					type: "array",
					items: Schemas.block,
				},
				example: Examples[endpoint],
			}),
			"400": Responses.Error400,
		},
	},
};

export default info;
