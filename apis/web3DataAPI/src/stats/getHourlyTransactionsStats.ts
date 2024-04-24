import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";
import { onlyEthereumMainnetLuniverseMainnetInfoMessage } from "../../resources/callouts";

const summary = "Get Hourly Transactions Stats";
const endpoint = "getHourlyTransactionsStats";
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
		description: `지정한 범위 내에서 발생한 시간별 트랜잭션 수를 조회합니다
		
> 📘 데이터는 언제 반영되나요?
>
>  현재 시간별 통계 API에서 시간은 UTC 기준으로, 응답의 각 항목에는 date로부터 +1시간 내의 통계치가 제공됩니다. 시간별 통계의 경우 최근 1시간의 통계치 반영이 최대 40분까지 지연될 수 있으므로 최신 데이터 조회 시 고려가 필요합니다.
		
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
							startDateTime: { ...Requests.startDateTime, default: "2024-01-01-00" },
							endDateTime: { ...Requests.endDateTime, default: "2024-02-01-00" },
						},
						required: ["startDateTime", "endDateTime"],
					},
				},
			},
		},
		responses: {
			"200": Responses.Success200({
				schema: DataDomains.HourlyStats,
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
