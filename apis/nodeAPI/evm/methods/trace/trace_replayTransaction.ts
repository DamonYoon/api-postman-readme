import { OpenAPIV3 } from "openapi-types";
import Responses from "../../resources/responses";
import Examples from "../../resources/examples";
import { NODE_API_BASE_URL } from "../../../../../utils/urls.utils";
import Schemas from "../../resources/schemas";
import Requests from "../../resources/requests";
import Constants from "../../../../../utils/constants.utils";
import { EvmOasParams, ReadmeExtension } from "../../../../../types";

function oasDocs({ protocol, version }: EvmOasParams): OpenAPIV3.Document {
	const fileName = __filename.split("/").slice(-1)[0]?.split(".")[0];
	const method = fileName;
	if (!method) {
		throw new Error("Check if the file name is correct");
	}
	return {
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
					"x-default": Constants.API_KEY.NODIT_DOCS_DEMO,
				} as ReadmeExtension.securitySchemes,
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
					description: `지정된 트랜잭션을 다시 실행하고, 그 과정에서 발생한 모든 이벤트를 추적합니다. 이때 트랜잭션의 실행은 로컬에서 수행되기 때문에 실제 블록체인에 반영되지 않습니다. 이 메소드는 과거 트랜잭션의 실행 과정을 재현하고 분석하고자 할 때 사용됩니다.`,
					summary: method,
					operationId: protocol === "ethereum" ? method : `${protocol}_${method}`,
					parameters: [],
					requestBody: {
						required: true,
						content: {
							"application/json": {
								schema: {
									type: "object",
									required: ["id", "jsonrpc", "method", "params"],
									properties: {
										...Requests.baseObject(method).properties, // id, jsonrpc, method
										params: {
											type: "array",
											items: {
												oneOf: [Schemas.transactionHash, Schemas.traceType],
											},
											minItems: 2,
											maxItems: 2,
											default: ["0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3", ["trace"]],
											description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.

1. \`transaction hash\` : 조회하고자 하는 트랜잭션 해시를 문자열 형식으로 입력합니다.
2. \`trace type\`: 사용하고자 하는 trace 타입을 하나 이상 선택하여 배열로 입력합니다. "vmTrace", "trace", "stateDiff" 값을 사용할 수 있습니다. 각 옵션에 대한 자세한 내용은 API 문서 본문을 참고해주세요.
`,
										},
									},
								},
							},
						},
					},
					responses: {
						"200": Responses.Success200({
							example: Examples[method as keyof typeof Examples],
						}),
						"400": Responses.Error400,
					},
				},
			},
		},
	};
}

export default oasDocs;
