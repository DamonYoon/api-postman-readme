import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import DataDomains from "../resources/dataDomains";
import Examples from "../resources/examples";
import Constants from "../../../utils/constants.utils";

const title = "Get Token Prices by Contracts";
const endpoint = "getTokenPricesByContracts";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["Token API"],
		description: `특정 ERC20 컨트랙트의 메타데이터를 조회합니다. 다수의 컨트랙트를 조회할 수 있으며, 최대 ${Constants.INPUT_ITEM_MAX}개의 컨트랙트를 조회할 수 있습니다.`,
		summary: title,
		operationId: endpoint,
		parameters: [Requests.protocol, Requests.network],
		requestBody: {
			required: true,
			content: {
				"application/json": {
					schema: {
						additionalProperties: false,
						allOf: [
							{
								type: "object",
								properties: {
									contractAddresses: {
										type: "array",
										items: {
											...Requests.contractAddress,
										},
										default: [Constants.USDT_CONTRACT_ADDRESS, Constants.USDC_CONTRACT_ADDRESS],
									},
								},
								required: ["contractAddresses"],
								maximum: Constants.INPUT_ITEM_MAX,
							},
						],
					},
				},
			},
		},
		responses: {
			"200": Responses.Success200({
				schema: {
					type: "array",
					items: {
						allOf: [
							DataDomains.TokenMarketData,
							{
								type: "object",
								properties: {
									contract: {
										...DataDomains.ContractMeta,
										...DataDomains.AssetMeta,
									},
								},
							},
						],
					},
				},
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
