import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../../utils/patterns.utils";
import Schemas from "./schemas";

interface CommonFormatParams {
	method: string;
	params: OpenAPIV3.SchemaObject;
}
namespace Requests {
	export function CommonFormat({ method, params }: CommonFormatParams): OpenAPIV3.SchemaObject {
		return {
			type: "object",
			required: ["id", "jsonrpc", "method", "params"],
			properties: {
				id: {
					type: "integer",
					default: 1,
				},
				jsonrpc: {
					type: "string",
					default: "2.0",
				},
				method: {
					type: "string",
					default: method,
				},
				params,
			},
		};
	}
	/** Path Parameters **/
	export namespace PathParams {
		export const protocol: OpenAPIV3.ParameterObject = {
			name: "protocol",
			in: "path",
			required: true,
			schema: {
				type: "string",
				default: "aptos",
			},
			description:
				"조회 대상 Chain 프로토콜을 지정하기 위한 파라미터입니다. 지원되는 프로토콜에 대한 정보는 Supported Chains 페이지를 참고하거나, Protocol 조회 API를 활용하세요.",
		};

		export const network: OpenAPIV3.ParameterObject = {
			name: "network",
			in: "path",
			required: true,
			schema: {
				type: "string",
				default: "mainnet",
			},
			description:
				"조회 대상 Chain 네트워크를 지정하기 위한 파라미터입니다. 프로토콜에 따라 지원되는 네트워크가 다를 수 있습니다. 지원되는 네트워크에 대한 정보는 Supported Chains 페이지를 참고하거나 Network 조회 API를 활용하세요.",
		};
	}

	/** Query Parameters **/
	export namespace QueryParams {}

	export namespace BodyParams {}

	/** Descriptions **/
	export namespace Descriptions {
		export const address = `\`address\`: 조회하고자 하는 주소를 입력합니다.`;
		export const storageHashes = `\`storageHashes\`: 조회하고자 하는 storage의 해시 값을 배열 형식으로 입력합니다. eth_getStorage를 활용하여 조회할 수 있습니다.`;
		export const blockIdentifier = `\`blockIdentifier\`: 특정 블록을 기준으로 해당 계정의 잔고를 조회할 수 있습니다. 블록 지정을 위해 블록의 해시값, Number 값(hex형식), 또는 다음 태그 중 하나를 사용할 수 있습니다.
* \`earliest\`: 체인에서 사용 가능한 가장 오래된 블록을 나타냅니다. 
* \`finalized\`: 최근에 확정된 블록을 나타내며, 이는 더 이상 변경될 수 없는 안정적인 상태의 블록을 의미합니다. 이 용어는 주로 지분 증명(PoS) 블록체인에서 사용되며, 블록이 최종적으로 확정되었음을 나타냅니다.
* \`safe\`: 네트워크에 의해 안전하게 간주되는 최근 블록을 나타냅니다. '안전'한 블록은 네트워크 재조직(reorgs)의 위험 없이 신뢰할 수 있는 것으로 간주됩니다.
* \`latest\`: 현재 체인의 가장 최근 블록을 나타내며, 아직 최종 확정되지 않았을 수 있어 재조직(reorgs)될 가능성이 있습니다. 이는 일반적으로 가장 최신의 상태를 조회할 때 사용됩니다.
* \`pending\`: 아직 채굴되지 않은, 메모리 풀에 있는 트랜잭션들을 포함할 예정인 다음 블록을 나타냅니다. 이는 주로 예정된 트랜잭션들의 상태를 확인할 때 사용됩니다.`;
	}
}

export default Requests;
