import { OpenAPIV3 } from "openapi-types";
import Requests from "../../resources/requests";
import Responses from "../../resources/responses";
import DataDomains from "../../resources/dataDomains";
import Examples from "../../resources/examples";

const summary = "Get Gas Price";
const endpoint = "getGasPrice";
const isPublic = true;
const tags = ["Blockchain API"];

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags,
		description: `현재 Gas Price를 조회합니다.`,
		summary,
		operationId: endpoint,
		parameters: [Requests.protocol, Requests.network],
		responses: {
			"200": Responses.Success200({
				schema: DataDomains.GasPrice,
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
