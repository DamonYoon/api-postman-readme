import { OpenAPIV3 } from "openapi-types";

export const protocol: OpenAPIV3.ParameterObject = {
	name: "protocol",
	in: "path",
	required: true,
	schema: {
		type: "string",
		default: "ethereum",
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
		"조회 대상 Chain 네트워크를 지정하기 위한 파라미터입니다. mainnet 또는 테스트넷을 지정할 수 있습니다. 지원되는 네트워크에 대한 정보는 Supported Chains 페이지를 참고하거나 Network 조회 API를 활용하세요.",
};
