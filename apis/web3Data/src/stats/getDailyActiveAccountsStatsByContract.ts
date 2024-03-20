import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";

const title = "Get Daily Active Accounts Stats By Contract";
const endpoint = "getDailyActiveAccountsStatsByContract";
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
		description: `지정한 범위 내에서 발생한 특정 컨트랙트의 일별 활성 계정의 수를 조회할 수 있습니다.
		
> 📘 데이터는 언제 반영되나요?
>
> 현재 일 통계 API에서 '1일'의 기준은 UTC 기준으로, 해당 일자의 UTC 00:00:00부터 UTC 24:00:00이전까지의 데이터를 취합합니다. 일일 통계의 경우 이전 일자의 통계치 반영이 다음날 오전 00:30:00까지 지연될 수 있으므로 최신 데이터 조회 시 고려가 필요합니다.
		
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
							startDate: Requests.startDate,
							endDate: Requests.endDate,
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
	title,
	endpoint,
	isPublic,
	info,
};
