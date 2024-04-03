import { OpenAPIV3 } from "openapi-types";
import Requests from "../../../resources/requests";
import Responses from "../../../resources/responses";
import Examples from "../../../resources/examples";

const method = "eth_getProof";

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["eth"],
		description: `특정 주소의 Storage에 저장된 값을 merkle-proof가 포함된 형식으로 반환합니다. 반환된 Proof값을 활용하여 조회한 Storage의 현재 상태값이 위변조되지 않았음을 검증할 수 있습니다.`,
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
								oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
							},
							minItems: 3,
							maxItems: 3,
							default: `["0xdac17f958d2ee523a2206206994597c13d831ec7",["0x000000000000000000000000c6cde7c39eb2f0f0095f41570af89efc2c1ea828"],"latest"]`,
							description: `다음 파라미터들을 타입에 맞게 배열로 입력합니다.
1. ${Requests.Descriptions.address}
2. ${Requests.Descriptions.storageHashes}
3. ${Requests.Descriptions.blockIdentifier}`,
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
};

export default info;
