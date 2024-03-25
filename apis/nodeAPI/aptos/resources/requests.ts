import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../../utils/patterns.utils";

namespace Requests {
	export namespace Headers {
		export const acceptBSC: OpenAPIV3.ParameterObject = {
			in: "header",
			name: "accept",
			required: true,
			description:
				"클라이언트가 수신할 수 있는 컨텐츠 유형, application/x-bcs 이 입력되어 있어야 API가 정상적으로 동작합니다.",
			schema: {
				type: "string",
				default: "application/x-bcs",
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
				default: 2,
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

		export const tableHandle: OpenAPIV3.ParameterObject = {
			name: "table_handle",
			in: "path",
			required: true,
			schema: {
				type: "string",
				pattern: Patterns.Aptos.hexaDecimalWithPrefix || Patterns.Aptos.hexaDecimalWithoutPrefix,
				default: "0x1e64d63a81616548755034b8de56a5019892567d14ec551703c665e1a062c9b7",
			},
			description: "테이블이 저장된 위치를 가리키는 포인터 값.",
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
				pattern: Patterns.Aptos.uint64String,
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

	export namespace BodyParams {
		export const key: OpenAPIV3.SchemaObject = {
			type: "string",
			description:
				"table의 item을 특정하는 값. Table_handle과 이 값을 이용하여 특정 table 내 item을 식별할 수 있습니다.",
			default:
				"0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::weighted_pool::WeightedPoolToken<0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT, 0x1::aptos_coin::AptosCoin, 0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null, 0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null, 0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::weighted_pool::Weight_50, 0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::weighted_pool::Weight_50, 0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null, 0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::base_pool::Null>",
		};

		export const tableItem: OpenAPIV3.SchemaObject = {
			type: "object",
			required: ["key_type", "value_type", "key"],
			properties: {
				key_type: {
					type: "string",
					description:
						"Move 코드에서 테이블은 특정 식별자로 데이터를 저장하는 방법입니다. key와 value로 구성되어 있으며 key_type은 트랜잭션 페이로드에서 노출되는 테이블의 key의 type을 특정합니다.",
					pattern: Patterns.Aptos.primitiveType,
					default: "0x1::string::String",
				},
				value_type: {
					type: "string",
					description:
						"Move 코드에서 테이블은 특정 식별자로 데이터를 저장하는 방법입니다. key와 value로 구성되어 있으며 value_type은 트랜잭션 페이로드에서 노출되는 테이블의 value의 type을 특정합니다.",
					pattern: Patterns.Aptos.primitiveType,
					default:
						"0x48271d39d0b05bd6efca2278f22277d6fcc375504f9839fd73f74ace240861af::weighted_pool::WeightedPoolInfo",
				},
				key,
			},
		};

		export const transaction: OpenAPIV3.SchemaObject = {
			type: "object",
			required: [],
			properties: {
				sender: {
					type: "string",
					description: "트랜잭션을 발생시킨 계정의 주소.",
					pattern: Patterns.Aptos.address,
					default: "0x1",
				},
				sequence_number: {
					type: "integer",
					description: "트랜잭션 발생 순서.",
					default: 1,
				},
				max_gas_amount: {
					type: "integer",
					description: "트랜잭션 발생 시 사용할 최대 gas 양.",
					default: 1000000,
				},
				gas_unit_price: {
					type: "integer",
					description: "트랜잭션 발생 시 사용할 gas의 가격.",
					default: 0,
				},
				expiration_timestamp_secs: {
					type: "integer",
					description: "트랜잭션 발생 시 사용할 gas의 가격.",
					default: 0,
				},
				payload: {
					type: "object",
					description: "트랜잭션 발생 시 사용할 gas의 가격.",
					default: {},
				},
				signature: {
					type: "string",
					description: "트랜잭션 발생 시 사용할 gas의 가격.",
					default: "0x1",
				},
			},
		};
	}
}

export default Requests;
