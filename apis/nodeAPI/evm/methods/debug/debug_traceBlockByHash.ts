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
					description: `특정 블록에 대해 tracer를 설정하여 해당 tracer가 제공하는 정보들을 통해 트랜잭션으로 인한 체인의 상태 변화 및 실제 call의 발생 이력들을 Debug할 수 있는 도구입니다.`,
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
												oneOf: [Schemas.blockHash, Schemas.traceOption],
											},
											minItems: 1,
											maxItems: 1,
											default: [
												"0x8e38b4dbf6b11fcc3b9dee84fb7986e29ca0a02cecd8977c161ff7333329681e",
												{ tracer: "callTracer", tracerConfig: { onlyTopCall: true } },
											],
											description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.

1. \`block hash\`: 조회하고자 하는 블록 해시를 64자리 16진수 문자열 형식으로 입력합니다.
2. \`traceOption\`: trace 옵션 설정을 위한 object입니다.`,
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
