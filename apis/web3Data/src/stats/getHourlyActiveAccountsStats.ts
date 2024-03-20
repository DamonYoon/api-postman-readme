import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";

const title = "Get Hourly Active Accounts Stats";
const endpoint = "getHourlyActiveAccountsStats";
const isPublic = true;
const tags = ["Statistic API"];

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags,
		description: `지정한 범위 내에서 발생한 시간별 활성 계정의 수를 조회합니다
		
> 📘 데이터는 언제 반영되나요?
>
>  현재 시간별 통계 API에서 시간은 UTC 기준으로, 응답의 각 항목에는 date로부터 +1시간 내의 통계치가 제공됩니다. 시간별 통계의 경우 최근 1시간의 통계치 반영이 최대 40분까지 지연될 수 있으므로 최신 데이터 조회 시 고려가 필요합니다.
		
> 🚧 사용 시 네트워크를 확인하세요!
>
> 이 API는 오직 Ethereum Mainnet, TheBalance Mainnet 에서만 지원되며, 다른 네트워크에서는 사용할 수 없습니다. 사용 시 네트워크를 확인해주세요.`,
		summary: title,
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
							startDateTime: Requests.startDate,
							endDateTime: Requests.endDate,
						},
						required: ["startDateTime", "endDateTime"],
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
	title,
	endpoint,
	isPublic,
	info,
};
