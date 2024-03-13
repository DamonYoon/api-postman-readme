import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../utils/patterns.utils";

namespace Requests {
	/** Path Parameters **/
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

	/** Body Parameters **/
	/* Pagination */
	export const page: OpenAPIV3.SchemaObject = {
		type: "integer",
		description:
			"page 파라미터는 조회하려는 데이터 페이지를 지정하는 데 사용됩니다. 이 파라미터는 100 이하의 값을 받으며, 100을 초과하는 페이지가 필요한 경우 cursor 페이지네이션 방식을 사용해야 합니다.\n\n [참고]\n page 파라미터와 cursor 파라미터는 동시에 사용할 수 없습니다. page와 cursor에 모두 빈 값을 입력한 경우, cursor 페이지네이션을 사용하는 것으로 간주합니다.",
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
			"cursor 파라미터는 페이지네이션을 위한 파라미터로, 이전 페이지와 다음 페이지 간의 데이터 이동을 지원합니다. 이전 페이지에서 얻은 cursor 값을 다음 요청에 제공하면 다음 페이지의 데이터를 로드할 수 있습니다.\n\n [참고]\n page 파라미터와 cursor 파라미터는 동시에 사용할 수 없습니다. page와 cursor에 모두 빈 값을 입력한 경우, cursor 페이지네이션을 사용하는 것으로 간주합니다.",
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

	/* Common */
	export const accountAddress: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"조회하고자 하는 계정의 주소를 지정하는 파라미터입니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 입력할 수 있습니다.",
		pattern: Patterns.ethereumAddress,
	};

	export const contractAddress: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"조회하고자 하는 컨트랙트 주소를 지정하는 파라미터입니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 입력할 수 있습니다.",
		pattern: Patterns.ethereumAddress,
	};

	export const tokenId: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "조회하고자 하는 NFT 토큰의 ID를 지정하는 파라미터입니다. 10진수 문자열 형태로 입력할 수 있습니다.",
		pattern: Patterns.decimalString,
	};

	export const keyword: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "조회하고자 하는 컨트랙트의 name 혹은 symbol을 지정하는 파라미터입니다.",
	};

	/* Range */
	export const fromBlock: OpenAPIV3.SchemaObject = {
		type: "string",
		description: `조회 시작 블록을 지정하는 파라미터입니다. 이 파라미터의 기본 값은 0이며, 블록 번호(10진수 문자열), 블록 해시(0x로 시작하는 64자리 16진수 문자열) 또는 블록 태그("earliest")를 입력할 수 있습니다.\n\n [참고]\n toBlock 없이 fromBlock만 제공되는 경우, fromBlock에 입력한 시점부터 최근 block까지의 결과가 조회됩니다. fromBlock은 toBlock보다 크거나 같아야 합니다. fromBlock과 toBlock에 동일한 값이 입력된 경우, 입력된 블록 한 개의 결과만 조회됩니다.`,
		pattern: Patterns.blockNumber || Patterns.blockHash || "earliest",
	};

	export const toBlock: OpenAPIV3.SchemaObject = {
		type: "string",
		description: `조회 종료 블록을 지정하는 파라미터입니다. 이 파라미터의 기본 값은 "latest"이며, 블록 번호(10진수 문자열), 블록 해시(0x로 시작하는 64자리 16진수 문자열) 또는 블록 태그("latest")를 입력할 수 있습니다. \n\n [참고]\n fromBlock 없이 toBlock만 제공되는 경우, 최초 block부터 toBlock까지의 결과가 조회됩니다. toBlock은 fromBlock보다 작거나 같아야 합니다. fromBlock과 toBlock에 동일한 값이 입력된 경우, 입력된 블록 한 개의 결과만 조회됩니다.`,
		pattern: Patterns.blockNumber || Patterns.blockHash || "latest",
	};

	export const fromDate: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"조회 시작 날짜를 지정하는 파라미터입니다. 이 파라미터는 ISO 8601 형식의 날짜 문자열을 입력할 수 있습니다. (예: 2021-01-01T00:00:00Z)\n\n [참고]\n toDate 없이 fromDate만 제공되는 경우, fromDate에 입력한 시점부터 최근 날짜까지의 결과가 조회됩니다. fromDate은 toDate보다 이전이어야 합니다. fromDate과 toDate에 동일한 값이 입력된 경우, 입력된 날짜의 결과만 조회됩니다.",
		pattern: Patterns.iso8601,
	};

	export const toDate: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"조회 종료 날짜를 지정하는 파라미터입니다. 이 파라미터는 ISO 8601 형식의 날짜 문자열을 입력할 수 있습니다. (예: 2021-01-01T00:00:00Z)\n\n [참고]\n fromDate 없이 toDate만 제공되는 경우, 최초 날짜부터 toDate까지의 결과가 조회됩니다. toDate은 fromDate보다 이후이어야 합니다. fromDate과 toDate에 동일한 값이 입력된 경우, 입력된 날짜의 결과만 조회됩니다.",
		pattern: Patterns.iso8601,
	};

	/* With Options */
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
