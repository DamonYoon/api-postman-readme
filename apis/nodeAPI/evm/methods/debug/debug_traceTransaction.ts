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
					description: `이미 처리된 Transaction의 처리 과정을 노드 레벨에서 replay하면서 트랜잭션의 실행 과정에서 각각의 단계와 관련된 상세한 정보를 확인할 수 있는 디버깅 메소드입니다. 트랜잭션의 호출 스택, 가스 사용량, 상태 변경, 로그 이벤트 등 다양한 정보를 반환합니다. 이를 통해 컨트랙트의 함수 호출 흐름, 변수 변경, 이벤트 발생 등을 추적하고 디버깅할 수 있습니다.`,
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
												oneOf: [Schemas.blockNumberOrHashOrTag, Schemas.traceOptionWithTimeout],
											},
											minItems: 2,
											maxItems: 2,
											default: [
												{
													from: "0xc90d3Ac75D1D36dF0b0a229E73D8409FB7F3c4ab",
													to: "0xd3CdA913deB6f67967B99D67aCDFa1712C293601",
													value: "0x186a0",
												},
												"finalized",
												{ tracer: "callTracer" },
											],
											description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.

1. \`call object\` - 호출할 컨트랙트의 주소와 호출할 함수의 데이터를 입력합니다.
2. \`block identifier\` - 조회 대상 블록 식별자로 블록 넘버, 블록 해시, 블록 태그 중 하나를 입력할 수 있습니다. 
3. \`trace option\`: trace 옵션 설정을 위한 object입니다.`,
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
