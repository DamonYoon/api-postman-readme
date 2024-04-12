import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import { NODE_API_BASE_URL } from "../../../../utils/urls.utils";
import Schemas from "../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../configs/readme.config";
import Constants from "../../../../utils/constants.utils";
import { Patterns } from "../../../../utils/patterns.utils";

const method = "eth_feeHistory";
const protocol = "ethereum";
const version = MAIN_API_CONFIGS.version;

const oasDocs: OpenAPIV3.Document = {
	openapi: "3.1.0",
	info: {
		title: `${protocol}-${method}`,
		version,
	},
	servers: [
		{
			url: NODE_API_BASE_URL,
			variables: Schemas.ServerVariables[protocol],
		},
	],
	components: {
		securitySchemes: {
			api_key: {
				type: "apiKey",
				name: "X-API-KEY",
				in: "header",
			},
		},
	},
	paths: {
		["/"]: {
			post: {
				security: [
					{
						api_key: [],
					},
				],
				tags: [],
				description: `요청한 블록 범위 내의 가스 수수료 히스토리를 반환합니다. 이 정보를 사용하여 트랜잭션을 생성할 때 maxFeePerGas 및 maxPriorityFeePerGas의 적절한 값을 설정할 수 있습니다.`,
				summary: method,
				operationId: method,
				parameters: [],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: Requests.CommonFormat({
								method,
								params: {
									type: "array",
									items: {
										oneOf: [
											{
												title: "Block Count",
												type: "integer",
												minimum: 1,
												maximum: 1024,
												default: 2,
											},
											Schemas.blockNumberOrTag,
											{
												title: "Reward Percentiles",
												type: "array",
												items: {
													type: "integer",
													minimum: 0,
													maximum: 100,
												},
												default: [0, 100],
											},
										],
									},
									description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.
1. \`block count\`: 조회하고자 하는 블록의 범위를 입력합니다. 블록 범위는 1이상 1024이하의 정수로 입력합니다. 사용 가능한 모든 블록이 제공되지 않으면 요청된 수보다 적은 수가 반환될 수 있습니다.
2. \`newest block\`: 조회의 기준이 되는 블록을 입력합니다. 16진수 문자열 형식의 블록 넘버 또는 "latest"를 입력합니다.
3. \`reward percentiles\`: 우선 순위 수수료에 대한 백분위 값을 샘플링하기 위한 정수 배열을 입력합니다. 각 블록의 사용된 가스량에 따라 가중치를 부여하여 백분위 값을 계산합니다. 백분위 값은 0 이상 100 이하의 정수를 오름차순으로 입력합니다.`,
									minItems: 3,
									maxItems: 3,
									default: [2, "latest", [0, 100]],
								},
							}),
						},
					},
				},
				responses: {
					"200": Responses.Success200({
						example: Examples[method],
					}),
					"400": Responses.Error400,
				},
			},
		},
	},
};

export default oasDocs;
