import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import { onlyEthereumMainnetLuniverseMainnetInfoMessage } from "../../resources/callouts";

const summary = "Get Daily Active Accounts Stats";
const endpoint = "getDailyActiveAccountsStats";
const isPublic = true;
const tags = ["Statistics API"];

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags,
		description: `지정한 범위 내에서 발생한 일별 활성 계정의 수를 조회할 수 있습니다.
		
> 📘 데이터는 언제 반영되나요?
>
> 현재 일 통계 API에서 '1일'의 기준은 UTC 기준으로, 해당 일자의 UTC 00:00:00부터 UTC 24:00:00이전까지의 데이터를 취합합니다. 일일 통계의 경우 이전 일자의 통계치 반영이 다음날 오전 00:30:00까지 지연될 수 있으므로 최신 데이터 조회 시 고려가 필요합니다.
		
${onlyEthereumMainnetLuniverseMainnetInfoMessage}`,
		summary,
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
							startDate: { ...Requests.startDate, default: "2024-01-01" },
							endDate: { ...Requests.endDate, default: "2024-02-01" },
						},
						required: ["startDate", "endDate"],
					},
				},
			},
		},
		responses: {
			"200": Responses.Success200({
				schema: DataDomains.DailyStats,
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
	summary,
	endpoint,
	isPublic,
	info,
};
