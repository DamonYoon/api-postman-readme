import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../../utils/patterns.utils";

namespace Requests {
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

		export const address: OpenAPIV3.ParameterObject = {
			name: "address",
			in: "path",
			required: true,
			schema: {
				type: "string",
				pattern: Patterns.Aptos.address,
				default: "0x1",
			},
			description: "조회하고자 하는 대상 계정의 주소. hexadecimal prefix가 없는 계정 주소도 검색 가능합니다.",
		};

		export const resource_type: OpenAPIV3.ParameterObject = {
			name: "resource_type",
			in: "path",
			required: true,
			schema: {
				type: "string",
				pattern: Patterns.Aptos.resourceType,
				default: "0x1::account::Account",
			},
			description: "조회하고자 하는 대상 리소스의 타입.",
		};

		export const module_name: OpenAPIV3.ParameterObject = {
			name: "module_name",
			in: "path",
			required: true,
			schema: {
				type: "string",
				default: "coin",
			},
			description: "조회하고자 하는 특정 모듈의 이름.",
		};

		export const blockHeight: OpenAPIV3.ParameterObject = {
			name: "block_height",
			in: "path",
			required: true,
			schema: {
				type: "integer",
				default: 160155267,
			},
			description: "조회하고자 하는 블록의 번호.",
		};

		export const version: OpenAPIV3.ParameterObject = {
			name: "version",
			in: "path",
			required: true,
			schema: {
				type: "integer",
				default: 514117590,
			},
			description: "조회하고자 하는 버전의 정보.",
		};

		export const creationNumber: OpenAPIV3.ParameterObject = {
			name: "creation_number",
			in: "path",
			required: true,
			schema: {
				type: "integer",
				default: 1,
			},
			description: "지정된 계정에서 발생한 이벤트 스트림 생성 번호. 주어진 계정에서 이벤트 유형 한 개당 1씩 증가한다.",
		};

		export const eventHandle: OpenAPIV3.ParameterObject = {
			name: "event_handle",
			in: "path",
			required: true,
			schema: {
				type: "string",
				default: "0x1::Account::AccountSentEvent",
				pattern: Patterns.Aptos.resourceType,
			},
			description: "특정 event handle을 조회하기 위한 event handle struct의 이름",
		};

		export const fieldName: OpenAPIV3.ParameterObject = {
			name: "field_name",
			in: "path",
			required: true,
			schema: {
				type: "string",
				default: "amount",
			},
			description: "조회할 event를 특정하기 위한 event_handle 내의 field 이름",
		};
	}

	/** Query Parameters **/
	export namespace QueryParams {
		export const ledgerVersion: OpenAPIV3.ParameterObject = {
			name: "ledger_version",
			in: "query",
			required: false,
			schema: {
				type: "integer",
				format: "uint64",
			},
			description:
				"시스템에서 실행한 트랜잭션의 수. 정수로 버전이 지정되며 블록체인의 상태(State)를 의미합니다. 가장 최신 버전의 블록체인 상태에 대해서만 트랜잭션을 실행할 수 있습니다. 별도로 지정하지 않을 경우, 가장 최신의 버전을 가져옵니다.",
		};

		export const limit: OpenAPIV3.ParameterObject = {
			name: "limit",
			in: "query",
			required: false,
			schema: {
				type: "integer",
			},
			description: "조회할 최대 데이터 수",
		};

		export const start: OpenAPIV3.ParameterObject = {
			name: "start",
			in: "query",
			required: false,
			schema: {
				type: "string",
			},
			description:
				"Pagination을 지원하기 위해 위치를 지정하는 커서. 응답의 X-Aptos-Cursor 헤더로 다음 페이지의 커서를 얻을 수 있습니다.",
		};

		export const withTransactions: OpenAPIV3.ParameterObject = {
			name: "with_transactions",
			in: "query",
			required: false,
			schema: {
				type: "boolean",
			},
			description:
				"조회할 블록의 데이터에 트랜잭션에 대한 데이터 포함 여부를 확인하는 파라미터. true로 설정 시 해당 블록 안에 있는 모든 트랜잭션에 대한 데이터를 포함합니다.",
		};
	}

	export namespace BodyParams {}
}

export default Requests;
