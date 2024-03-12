import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../utils/patterns.utils";

namespace Requests {
	/* Path Parameters */
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

	/* Body Parameters */
	// Pagination
	export const page: OpenAPIV3.SchemaObject = {
		type: "integer",
		description:
			"page 파라미터는 조회하려는 데이터 페이지를 지정하는 데 사용됩니다. 이 파라미터는 100 이하의 값을 받으며, 100을 초과하는 페이지가 필요한 경우 cursor 페이지네이션 방식을 사용해야 합니다.\n [참고] page 파라미터와 cursor 파라미터는 동시에 사용할 수 없습니다. page와 cursor에 모두 빈 값을 입력한 경우, cursor 페이지네이션을 사용하는 것으로 간주합니다.",
		pattern: Patterns.page,
	};

	export const rpp: OpenAPIV3.SchemaObject = {
		type: "integer",
		description:
			"rpp는 results per page의 약자로, 한 페이지의 사이즈를 지정하는 파라미터입니다. 0보다 크고 1000 이하의 숫자를 지정할 수 있습니다.",
		pattern: Patterns.rpp,
	};

	export const cursor: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"cursor 파라미터는 페이지네이션을 위한 파라미터로, 이전 페이지와 다음 페이지 간의 데이터 이동을 지원합니다. 이전 페이지에서 얻은 cursor 값을 다음 요청에 제공하면 다음 페이지의 데이터를 로드할 수 있습니다.\n [참고] page 파라미터와 cursor 파라미터는 동시에 사용할 수 없습니다. page와 cursor에 모두 빈 값을 입력한 경우, cursor 페이지네이션을 사용하는 것으로 간주합니다.",
	};

	export const withCount: OpenAPIV3.SchemaObject = {
		type: "boolean",
		description:
			"응답에 count 필드의 포함 여부를 지정하는 파라미터이며, count 필드는 요청한 데이터의 총 개수를 나타냅니다. 이 파라미터에 true를 입력한 경우, 응답에 count 필드가 포함되며 응답속도가 느려질 수 있습니다.",
	};

	export const PaginationSet: OpenAPIV3.SchemaObject = {
		type: "object",
		properties: {
			page,
			rpp,
			cursor,
			withCount,
		},
	};
	// Pagination end

	// Common
	export const accountAddress: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "조회하고자 하는 계정의 주소를 지정하는 파라미터입니다.",
		pattern: Patterns.ethereumAddress,
	};

	export const contractAddress: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "조회하고자 하는 컨트랙트 주소를 지정하는 파라미터입니다.",
		pattern: Patterns.ethereumAddress,
	};

	// with options
	export const withMetadata: OpenAPIV3.SchemaObject = {
		type: "boolean",
		description:
			"응답에 NFT 토큰 메타데이터 관련 필드(rawMetadata, metadata, media, metadataSyncedAt)의 포함 여부를 지정하는 파라미터입니다. 이 파라미터에 true를 입력한 경우, 응답속도가 느려질 수 있습니다.",
	};

	export const withZeroValue: OpenAPIV3.SchemaObject = {
		type: "boolean",
		description:
			"Value가 0인 transaction 혹은 transfer를 포함하는지 여부를 지정하는 파라미터입니다. 이 파라미터에 true를 입력한 경우, 응답속도가 느려질 수 있습니다.",
	};
}

export default Requests;
