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
					description: `지정된 트랜잭션 호출을 시뮬레이션하고, 그 결과를 반환합니다. 이 메소드는 실제로 트랜잭션을 블록체인에 전송하지 않으며, 가스 소비량, 실행 결과, 로그 등을 포함한 상세한 실행 정보를 제공합니다. 이는 특정 함수 호출이 어떻게 수행될지 미리 확인하고자 할 때 유용합니다.`,
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
												oneOf: [Schemas.callObject, Schemas.traceType, Schemas.blockNumberOrTag],
											},
											minItems: 3,
											maxItems: 3,
											default: [
												{
													from: "0xc90d3Ac75D1D36dF0b0a229E73D8409FB7F3c4ab",
													to: "0xd3CdA913deB6f67967B99D67aCDFa1712C293601",
													value: "0x186a0",
												},
												["trace"],
												"latest",
											],
											description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.

1. \`call object\`는 다음과 같은 필드를 포함하는 object입니다.
2. \`trace type\`: 사용하고자 하는 trace 타입을 하나 이상 선택하여 배열로 입력합니다. "vmTrace", "trace", "stateDiff" 값을 사용할 수 있습니다. 각 옵션에 대한 자세한 내용은 API 문서 본문을 참고해주세요.
3. \`block number or block tag\`: 조회하고자 하는 블록 넘버를 16진수 문자열 형식으로 입력합니다. "earliest", "latest", "pending" 등의 블록 태그를 입력할 수도 있습니다.`,
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
