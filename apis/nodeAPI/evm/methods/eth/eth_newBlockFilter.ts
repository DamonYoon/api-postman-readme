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
					description: `신규 블록이 생성되면 알림을 받기 위한 필터를 생성하고 필터 ID를 반환합니다. 필더 ID는 eth_getFilterChanges 메서드에서 필터 결과를 조회할 때 사용됩니다.`,
					summary: method,
					operationId: protocol === "ethereum" ? method : `${protocol}_${method}`,
					parameters: [],
					requestBody: {
						required: true,
						content: {
							"application/json": {
								schema: {
									type: "object",
									required: ["id", "jsonrpc", "method"],
									properties: {
										...Requests.baseObject(method).properties, // id, jsonrpc, method
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
