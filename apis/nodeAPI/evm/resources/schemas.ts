import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../../utils/patterns.utils";
import Constants from "../../../../utils/constants.utils";

namespace Schemas {
	export const error: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["message", "error_code"],
		properties: {
			message: {
				type: "string",
			},
			error_code: {
				type: "string",
				description: `These codes provide more granular error information beyond just the HTTP status code of the response.

Allowed values: account_not_found, resource_not_found, module_not_found, struct_field_not_found, version_not_found, transaction_not_found, table_item_not_found, block_not_found, state_value_not_found, version_pruned, block_pruned, invalid_input, invalid_transaction_update, sequence_number_too_old, vm_error, health_check_failed, mempool_is_full, internal_error, web_framework_error, bcs_not_supported, api_disabled`,
			},
			vm_error_code: {
				type: "integer",
				description: "A code providing VM error details when submitting transactions to the VM.",
			},
		},
	};

	export namespace ServerVariables {
		export const ethereum: {
			[variable: string]: OpenAPIV3.ServerVariableObject;
		} = {
			protocol: {
				enum: ["ethereum"],
				default: "ethereum",
			},
			network: {
				enum: ["mainnet", "sepolia", "holesky"],
				default: "mainnet",
			},
		};

		export const polygon: {
			[variable: string]: OpenAPIV3.ServerVariableObject;
		} = {
			protocol: {
				enum: ["polygon"],
				default: "polygon",
			},
			network: {
				enum: ["mainnet", "amoy"],
				default: "mainnet",
			},
		};

		export const arbitrum: {
			[variable: string]: OpenAPIV3.ServerVariableObject;
		} = {
			protocol: {
				enum: ["arbitrum"],
				default: "arbitrum",
			},
			network: {
				enum: ["mainnet", "sepolia"],
				default: "mainnet",
			},
		};

		export const optimism: {
			[variable: string]: OpenAPIV3.ServerVariableObject;
		} = {
			protocol: {
				enum: ["optimism"],
				default: "optimism",
			},
			network: {
				enum: ["mainnet", "sepolia"],
				default: "mainnet",
			},
		};
	}

	export const address: OpenAPIV3.SchemaObject = {
		title: "Address",
		type: "string",
		description: `주소는 20바이트 길이의 16진수 문자열로 표현되며, EVM 계열의 블록체인에서 사용되는 주소 형식입니다.`,
		pattern: Patterns.ethereumAddress,
		default: Constants.VITALIK_BUTERIN_ACCOUNT_ADDRESS,
	};

	export const storageHashes: OpenAPIV3.SchemaObject = {
		title: "Storage Hashes",
		type: "array",
		items: {
			title: "Storage Hash",
			type: "string",
			description: `Storage Hash는 특정 주소의 Storage에 저장된 값을 조회하기 위한 해시값입니다. 해시값은 64자리 16진수 문자열로 표현됩니다`,
			pattern: Patterns.hexaDecimalLength(64),
		},
		description: `Storage Hashes는 특정 주소의 Storage에 저장된 값을 조회하기 위한 해시값들의 배열입니다. 각 해시값은 해시값은 64자리 16진수 문자열로 표현됩니다`,
		default: ["0x000000000000000000000000c6cde7c39eb2f0f0095f41570af89efc2c1ea828"],
	};

	export const blockNumber: OpenAPIV3.SchemaObject = {
		title: "Block Number",
		type: "string",
		description: "블록 넘버는 블록의 순서를 나타내는 숫자입니다. 블록 넘버는 16진수 문자열로 표현됩니다.",
		pattern: Patterns.hexaDecimal,
		default: "0x1076B5A",
	};

	export const blockHash: OpenAPIV3.SchemaObject = {
		title: "Block Hash",
		type: "string",
		description: `블록 해시는 블록의 고유 식별자입니다. 블록 해시값은 64자리 16진수 문자열로 표현됩니다.`,
		pattern: Patterns.hexaDecimalLength(64),
		default: "0x39008d07edf93c03bb9d1cfc80598fcf63f441ec86e9de3733fa6a484980ca48",
	};

	export const blockTag: OpenAPIV3.SchemaObject = {
		title: "Block Tag",
		type: "string",
		description: `블록 태그는 다음 중 하나를 사용하여 블록을 지정할 수 있습니다.
* \`earliest\`: 체인에서 사용 가능한 가장 오래된 블록을 나타냅니다.
* \`finalized\`: 최근에 확정된 블록을 나타내며, 이는 더 이상 변경될 수 없는 안정적인 상태의 블록을 의미합니다. 이 용어는 주로 지분 증명(PoS) 블록체인에서 사용되며, 블록이 최종적으로 확정되었음을 나타냅니다.
* \`safe\`: 네트워크에 의해 안전하게 간주되는 최근 블록을 나타냅니다. '안전'한 블록은 네트워크 재조직(reorgs)의 위험 없이 신뢰할 수 있는 것으로 간주됩니다.
* \`latest\`: 현재 체인의 가장 최근 블록을 나타내며, 아직 최종 확정되지 않았을 수 있어 재조직(reorgs)될 가능성이 있습니다. 이는 일반적으로 가장 최신의 상태를 조회할 때 사용됩니다.
* \`pending\`: 아직 채굴되지 않은, 메모리 풀에 있는 트랜잭션들을 포함할 예정인 다음 블록을 나타냅니다. 이는 주로 예정된 트랜잭션들의 상태를 확인할 때 사용됩니다.`,
		pattern: Patterns.blockTag,
		default: "latest",
	};

	export const blockNumberOrTag: OpenAPIV3.SchemaObject = {
		title: "Block Number or Tag",
		type: "string",
		description: `블록 지정을 위해 블록 넘버 또는 블록 태그 중 하나를 사용할 수 있습니다.`,
		oneOf: [Schemas.blockNumber, Schemas.blockTag],
		default: "0x12C1A00", // 19415000
	};

	export const blockNumberOrHashOrTag: OpenAPIV3.SchemaObject = {
		title: "Block Identifier",
		type: "string",
		description: `블록 지정을 위해 블록 해시, Number 값(hex형식), 또는 다음 태그 중 하나를 사용할 수 있습니다.`,
		oneOf: [Schemas.blockNumber, Schemas.blockHash, Schemas.blockTag],
		default: "latest",
	};

	export const position: OpenAPIV3.SchemaObject = {
		title: "Position",
		type: "string",
		description: `storage에서 slot의 인덱스를 나타냅니다. 이 값은 16진수 문자열로 표현됩니다.`,
		pattern: Patterns.hexaDecimal,
		default: "0x0:0",
	};

	export const includeTransactions: OpenAPIV3.SchemaObject = {
		title: "Include Transactions",
		type: "boolean",
		description: `트랜잭션을 포함할지 여부를 나타냅니다. true로 설정하면 트랜잭션을 포함한 결과를 반환합니다.`,
		default: false,
	};

	export const transactionHash: OpenAPIV3.SchemaObject = {
		title: "Transaction Hash",
		type: "string",
		description: `트랜잭션 해시는 트랜잭션의 고유 식별자입니다. 트랜잭션 해시는 64자리 16진수 문자열로 표현됩니다.`,
		pattern: Patterns.hexaDecimalLength(64),
		default: "0xda148d856aef6d77d0b76c90ef1091ffe77afe9ee9b1c6cc23f28f042f198bd8",
	};

	export const transactionIndex: OpenAPIV3.SchemaObject = {
		title: "Transaction Index",
		type: "string",
		description: `트랜잭션 인덱스는 블록 내 특정 트랜잭션의 순서를 나타내는 숫자입니다. 트랜잭션 인덱스는 16진수 문자열로 표현됩니다.`,
		pattern: Patterns.hexaDecimal,
		default: "0x0",
	};

	export const callObject: OpenAPIV3.SchemaObject = {
		title: "Call Object",
		type: "object",
		description: `트랜잭션을 시뮬레이션하기 위한 call object입니다. 다음 필드를 포함할 수 있습니다.
* \`from\`: 트랜잭션의 from 주소를 문자열 형식으로 입력합니다. Optional 필드입니다.
* \`to\` : 트랜잭션의 to 주소를 문자열 형식으로 입력합니다.
* \`gas\` : 해당 트랜잭션을 처리하기 위해 필요한 가스의 소모량을 hex형식의 문자열로 입력합니다. Optional 필드입니다. 스마트 컨트랙트 call을 수행하는 경우 소모되는 가스가 없으므로 0x0로 입력할 수 있습니다.
* \`gasPrice\` : 설정하고자 하는 가스당 비용을 hex 형식의 문자열로 입력합니다. Optional 필드입니다.
* \`value\` : 트랜잭션의 value 값입니다. Optional 필드입니다.
* \`data\` : 실행하고자 하는 트랜잭션의 method signature 해시값입니다. ABI에서 참고할 수 있습니다. Optional 필드입니다.`,
		required: ["to"],
		default: {
			to: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
			data: "0x70a08231000000000000000000000000A03167de1A56160e4647d77D81E9139af55b63D4",
		},
	};

	export const stateOverrideSet: OpenAPIV3.SchemaObject = {
		title: "State Override Set",
		type: "object",
		description: `호출하는 스마트 컨트랙트의 잔고, nonce, 코드, 상태 등을 실제 블록체인 상의 값 변경 없이 call 시점에 임의의 값으로 시뮬레이션 할 수 있도록 override할 수 있습니다. 이는 다음 필드를 포함할 수 있습니다.
* \`balance\`: 계정의 잔액을 override할 hex 형식의 문자열입니다.
* \`nonce\`: 계정의 nonce 값을 override할 hex 형식의 문자열입니다.
* \`code\`: 계정에 주입할 가짜 EVM 바이트코드를 hex 형식의 문자열로 입력합니다.
* \`state\`: 계정의 스토리지 상태를 override할 키-값 쌍의 집합입니다. 각 키와 값은 hex 형식의 문자열로 표현됩니다.
* \`stateDiff\`: 계정의 스토리지 상태 중 개별 슬롯을 override할 키-값 쌍의 집합입니다. 이는 state와 유사하지만, 특정 슬롯의 변경만을 목표로 할 때 사용됩니다.`,
		default: {},
	};

	export const signedTransactionHash: OpenAPIV3.SchemaObject = {
		title: "Signed Transaction Hash",
		type: "string",
		description: `서명된 트랜잭션 해시는 서명된 트랜잭션의 해시값을 나타냅니다. 서명된 트랜잭션 해시는 0x로 시작하는 16진수 문자열로 표현됩니다.
서명된 트랜잭션 해시를 얻기 위해서는 아래의 단계를 따라야 합니다.
1. 트랜잭션 데이터 생성합니다. 이 데이터에는 보낸이, 받는이, 가스 가격, 가스 한도, 이더리움의 양 등이 포함됩니다.
2. 트랜잭션 데이터를 RLP(Recursive Length Prefix) 인코딩합니다.
3. RLP 인코딩된 데이터를 Keccak-256 해시 함수에 넣어 해시값을 생성합니다.
4. 생성된 해시값을 서명합니다. 서명된 해시값은 서명된 트랜잭션 해시입니다.`,
		pattern: Patterns.hexaDecimal,
		default: "0x59f63e3840e0f4a1659074c1a4021e881a268a52d31958688da1d66bfbf6d2ca",
	};

	export const fromBlock: OpenAPIV3.SchemaObject = {
		title: "From Block",
		type: "string",
		description: `블록 조회 범위의 시작 블록 지정을 위해 블록 넘버와 블록 태그 중 하나를 입력할 수 있습니다. ${Schemas.blockTag.description}`,
		oneOf: [Schemas.blockNumber, Schemas.blockTag],
		default: "0x12C1A00", // 19415000
	};

	export const toBlock: OpenAPIV3.SchemaObject = {
		title: "To Block",
		type: "string",
		description: `블록 조회 범위의 종료 블록 지정을 위해 블록 넘버와 블록 태그 중 하나를 입력할 수 있습니다. ${Schemas.blockTag.description}`,
		oneOf: [Schemas.blockNumber, Schemas.blockTag],
		default: "latest",
	};

	export const topics: OpenAPIV3.SchemaObject = {
		title: "Topics",
		type: "array",
		minimum: 1,
		maximum: 4,
		items: {
			type: "string",
			description: "트랜잭션 로그의 토픽 필터링을 위한 토픽을 32바이트 길이의 16진수 문자열로 입력합니다.",
		},
		description: `Topics는 트랜잭션 로그의 토픽 필터링을 위한 토픽 배열입니다. 각 토픽은 32바이트 길이의 16진수 문자열로 표현됩니다.`,
		default: [
			"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
			`0x000000000000000000000000${Constants.VITALIK_BUTERIN_ACCOUNT_ADDRESS.slice(2)}`,
		],
	};

	export const filterId: OpenAPIV3.SchemaObject = {
		title: "Filter ID",
		type: "string",
		description: `필터 ID는 필터를 생성할 때 반환되는 고유 식별자입니다. 필터 ID는 16진수 문자열로 표현됩니다.`,
		pattern: Patterns.hexaDecimalLength(32),
		default: "0xaf35d60b70eb3b54018456a0d365ea49",
	};

	export const eventType: OpenAPIV3.SchemaObject = {
		title: "Event Type",
		type: "string",
		description: `이벤트 타입은 이벤트를 구독할 때 사용하는 타입을 나타냅니다. 다음 중 하나를 사용할 수 있습니다.
* \`newHeads\`: 새로운 블록이 생성될 때마다 이벤트를 수신합니다.
* \`logs\`: "logs"를 구독하는 경우, 두 번째 파라미터로 필터 옵션을 객체 형태로 제공할 수 있습니다. 이 객체는 fromBlock, toBlock, address, topics 필드를 포함할 수 있습니다.
* \`newPendingTransactions\`: 새로운 Pending 트랜잭션이 생성될 때마다 이벤트를 수신합니다.`,
		pattern: Patterns.eventType,
		default: "newHeads",
	};
}

export default Schemas;
