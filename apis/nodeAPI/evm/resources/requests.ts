import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../../utils/patterns.utils";
import Schemas from "./schemas";

interface CommonFormatParams {
	method: string;
	params?: OpenAPIV3.SchemaObject;
}
namespace Requests {
	export const baseObject = (defaultMethod: string): OpenAPIV3.SchemaObject => ({
		type: "object",
		required: ["id", "jsonrpc", "method"],
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
				default: defaultMethod,
			},
		},
	});

	// export function CommonFormat({ method, params }: CommonFormatParams): OpenAPIV3.SchemaObject {
	// 	const returnObject = params
	// 		? { ...baseObject(method), properties: { ...baseObject(method).properties, params } }
	// 		: baseObject(method);
	// 	return returnObject;
	// }
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

	/** Body Parameters **/
	export namespace BodyParams {}
}

export default Requests;
