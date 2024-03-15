import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../utils/patterns.utils";

namespace CommonFields {
	export const ownerAddress: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "소유자 주소를 나타내는 필드입니다.",
		pattern: Patterns.ethereumAddress,
	};

	export const balance: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "잔고 나타내는 필드입니다.",
		pattern: Patterns.decimalString,
	};

	export const contractAddress: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "컨트랙트 주소를 나타내는 필드입니다.",
	};
}

namespace DataDomains {
	export const Pagination = (items: OpenAPIV3.SchemaObject): OpenAPIV3.SchemaObject => ({
		type: "object",
		required: ["items"],
		properties: {
			page: {
				type: "integer",
				description:
					"page 파라미터에 지정된 페이지 번호를 나타내는 필드입니다. 이 필드는 page 파라미터에 0보다 큰 값을 입력한 경우에만 응답에 포함됩니다.",
			},
			rpp: {
				type: "integer",
				description: "rpp 파라미터에 지정된 페이지당 결과 수를 나타내는 필드입니다.",
			},
			cursor: {
				type: "string",
				description:
					"cursor 페이지네이션을 위한 필드로, 다음 페이지의 데이터를 로드하기 위해 다음 요청에 제공해야 하는 값입니다.",
			},
			count: {
				type: "integer",
				description:
					"요청한 데이터의 총 개수를 나타내는 필드입니다. 이 필드는 withCount 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
			},
			items: {
				type: "array",
				description: "조회된 데이터의 목록을 나타내는 필드입니다.",
				items,
			},
		},
	});

	export const StatsDailyResponse: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["date", "count"],
		properties: {
			date: {
				type: "string",
				description: "날짜를 나타내는 필드입니다. 이 필드는 ",
			},
			count: {
				type: "integer",
				description: "날짜별 거래 수를 나타내는 필드입니다.",
			},
		},
	};

	export const StatsHourlyResponse: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["date", "count"],
		properties: {
			date: {
				type: "string",
				description: "시간을 나타내는 필드입니다. 이 필드는 ISO 8601 형식으로 제공됩니다.",
			},
			count: {
				type: "integer",
				description: "시간별 거래 수를 나타내는 필드입니다.",
			},
		},
	};

	export const Balance: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["ownerAddress", "balance"],
		properties: {
			ownerAddress: CommonFields.ownerAddress,
			balance: CommonFields.balance,
		},
	};

	export const NftBalance: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["totalBalance", "uniqueBalance"],
		properties: {
			totalBalance: {
				type: "string",
				description:
					"해당 컨트랙트의 잔고 수량을 모두 더한 값을 반환합니다.\n\n [참고]\n contract type에 따라 수량 계산 방법이 다를 수 있습니다. ERC721는 uniqueBalance와 동일하며, ERC1155는 모든 수량을 더한 값을 반환합니다.\n\n (예시)\n ERC721의 경우: #100, #200, #300을 보유했다면 3을 반환\n ERC1155의 경우: #1을 100개, #200, #300을 각각 200개씩 보유했다면 600을 반환",
			},
			uniqueBalance: {
				type: "string",
				description:
					"해당 컨트랙트가 보유한 NFT 중 각기 다른 token ID의 수를 반환합니다.\n\n [참고]\n contract type에 따라 수량 계산 방법이 다를 수 있습니다. ERC721은 totalBalance와 동일하며, ERC1155는 유니크한 token ID의 수를 반환합니다.\n\n (예시)\n ERC721의 경우: #100, #200, #300을 보유했다면 3을 반환\n ERC1155의 경우: #1을 100개, #200, #300을 각각 200개씩 보유했다면 3을 반환",
			},
		},
	};

	export const NftHolder: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["ownerAddress", "totalBalance", "uniqueBalance"],
		properties: {
			ownerAddress: CommonFields.ownerAddress,
			...NftBalance.properties,
		},
	};

	export const NftMeta: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["tokenId", "tokenUri", "tokenUriSyncedAt"],
		properties: {
			tokenId: {
				type: "string",
				description: "NFT 토큰의 고유 ID를 나타내는 필드입니다. 이 ID는 해당 NFT를 식별하는 데 사용됩니다.",
			},
			tokenUri: {
				type: "string",
				description:
					"NFT의 원본 메타데이터가 위치한 URI를 나타냅니다. 컨트랙트 구현에 따라 다르지만, 일반적으로 IPFS 주소나 웹 URL 형식으로 제공됩니다.",
			},
			tokenUriSyncedAt: {
				type: "string",
				description: "NFT의 tokenUri가 동기화 된 시점을 나타내는 필드입니다.",
			},
			rawMetadata: {
				type: "string",
				description:
					"NFT의 rawMetadata를 나타내는 필드입니다. 이 필드는 withMetadata 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
			},
			metadataSyncedAt: {
				type: "string",
				description:
					"NFT의 metadata가 동기화 된 시점을 나타내는 필드입니다. 이 필드는 withMetadata 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
			},
			media: {
				type: "object",
				required: ["originUrl", "cachedUrl", "thumbnailUrl", "updatedAt"],
				properties: {
					originUrl: {
						type: "string",
						description:
							"NFT metadata에서 가져온 원본 미디어 URL을 나타냅니다. 이 URL은 미디어 파일의 원본 위치를 가리킵니다.",
					},
					cachedUrl: {
						type: "string",
						description:
							"NFT의 캐시된 이미지 URL을 나타내는 필드입니다. 이 URL은 미디어 파일의 캐시된 위치를 가리키며, 빠른 로딩을 위해 사용됩니다.",
					},
					thumbnailUrl: {
						type: "string",
						description:
							"NFT의 썸네일 이미지 URL을 나타내는 필드입니다. 이 URL은 미디어 파일의 축소된 이미지를 가리키며, 미리보기 등에 사용됩니다.",
					},
					updatedAt: {
						type: "string",
						description:
							"NFT의 미디어 파일이 업데이트된 시간을 나타내는 필드입니다. 이 필드는 ISO 8601 형식으로 제공됩니다.",
					},
				},
			},
		},
	};

	export const ContractMeta: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["address", "deployedTransactionHash", "deployedAt", "deployerAddress", "logoUrl", "type"],
		properties: {
			address: CommonFields.contractAddress,
			deployedTransactionHash: {
				type: "string",
				description: "컨트랙트가 배포된 트랜잭션의 해시를 나타내는 필드입니다.",
			},
			deployedAt: {
				type: "string",
				description:
					"컨트랙트가 배포된 시간을 나타내는 필드입니다. 이 필드는 ISO 8601 형식의 날짜와 시간으로 제공됩니다.",
			},
			deployerAddress: {
				type: "string",
				description: "컨트랙트를 배포한 주소를 나타내는 필드입니다.",
			},
			logoUrl: {
				type: "string",
				description:
					"컨트랙트의 로고 URL을 나타내는 필드입니다. 이 URL은 컨트랙트를 시각적으로 식별하는 데 사용될 수 있습니다.\n\n\n [참고]\n\n 모든 컨트랙트의 로고 이미지가 제공되는 것은 아닙니다. 컨트랙트 로고가 없는 경우, 이 필드는 null로 제공됩니다.",
				default: null,
			},
			type: {
				type: "string",
				description:
					"컨트랙트의 타입을 나타내는 필드입니다. 컨트랙트 타입은 표준 규격의 이름이 표기됩니다. (e.g., ERC721, ERC1155, ERC20, ERC721, ERC1155, ERC20)",
			},
		},
	};

	export const AssetMeta: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["name", "symbol"],
		properties: {
			name: {
				type: "string",
				description:
					"컨트랙트의 이름을 나타내는 필드입니다. 표준을 따르지 않거나, 컨트랙트 생성 단계에서 name을 입력하지 않은 경우 빈 문자열을 반환합니다.",
				default: "",
			},
			symbol: {
				type: "string",
				description:
					"컨트랙트의 심볼을 나타내는 필드입니다. 표준을 따르지 않거나, 컨트랙트 생성 단계에서 symbol을 입력하지 않은 경우 빈 문자열을 반환합니다.",
			},
			totalSupply: {
				type: "string",
				description:
					"컨트랙트의 총 공급량을 나타내는 필드입니다. 이 값은 토큰의 총 발행량을 의미하며, 10진수 문자열 형태로 제공됩니다. 컨트랙트 타입이 ERC20인 경우에만 응답에 포함됩니다.",
			},
			// totalSupplyId: {
			// 	type: "string",
			// 	description: "컨트랙트의 총 공급량을 나타내는 필드입니다.",
			// },
			decimals: {
				type: "integer",
				description:
					"컨트랙트의 소수점 자리수를 나타내는 필드입니다. 컨트랙트 타입이 ERC20 또는 ERC1155인 경우에만 응답에 포함됩니다.",
			},
		},
	};

	export const TokenMarketData: OpenAPIV3.SchemaObject = {
		type: "object",
		properties: {
			currency: {
				type: "string",
				description: "거래에 사용되는 통화의 종류를 나타냅니다. ISO 4217 통화코드 형식으로 제공됩니다.",
				pattern: Patterns.iso4217,
			},
			price: {
				type: "string",
				description: "토큰의 현재 가격을 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			volumeFor24h: {
				type: "string",
				description:
					"지난 24시간 동안의 총 거래량을 나타내는 필드입니다. 이 필드는 활발한 거래 활동을 나타내는 지표로 사용됩니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			volumeChangeFor24h: {
				type: "string",
				description:
					"지난 24시간 동안의 거래량 변동을 나타내는 필드입니다. 이 필드는 시장의 변동성을 나타내는 지표로 사용됩니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			percentChangeFor1h: {
				type: "string",
				description:
					"지난 1시간 동안의 가격 변화 비율을 나타내는 필드입니다. 이 필드는 단기적 시장 동향을 나태는 지표로 사용됩니다.",
				pattern: Patterns.percentage,
			},
			percentChangeFor24h: {
				type: "string",
				description:
					"지난 24시간 동안의 가격 변화 비율을 나타내는 필드입니다. 이 필드는 중기적 시장 동향을 나태는 지표로 사용됩니다.",
				pattern: Patterns.percentage,
			},
			percentChangeFor7d: {
				type: "string",
				description:
					"지난 7일 동안의 가격 변화 비율을 나타내는 필드입니다. 이 필드는 장기적 시장 동향을 나태는 지표로 사용됩니다.",
				pattern: Patterns.percentage,
			},
			marketCap: {
				type: "string",
				description:
					"토큰의 시가총액을 나타내는 필드입니다. 이 필드는 자산의 총 시장 가치를 반영합니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			updatedAt: {
				type: "string",
				description: "데이터가 업데이트된 시간을 나타내는 필드입니다. 이 필드는 ISO 8601 형식으로 제공됩니다.",
				pattern: Patterns.iso8601,
			},
		},
	};

	export const Transfer: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["from", "to", "value", "timestamp", "blockNumber", "transactionHash", "logIndex"],
		properties: {
			from: {
				type: "string",
				description:
					"토큰이 전송된 주소를 나타내는 필드입니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.ethereumAddress,
			},
			to: {
				type: "string",
				description:
					"토큰을 전송받은 주소를 나타내는 필드입니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.ethereumAddress,
			},
			value: {
				type: "string",
				description: "전송한 토큰의 수량을 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			timestamp: {
				type: "integer",
				description: "토큰 전송이 발생한 시간을 나타내는 필드입니다. 이 필드는 UNIX 타임스탬프로 제공됩니다.",
			},
			blockNumber: {
				type: "integer",
				description: "토큰 전송이 발생한 블록 번호를 나타내는 필드입니다.",
			},
			transactionHash: {
				type: "string",
				description:
					"토큰 전송 트랜잭션의 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
			},
			logIndex: {
				type: "integer",
				description:
					"토큰 전송 트랜잭션의 로그 인덱스를 나타내는 필드입니다. 트랜잭션에서 발생한 이벤트의 순서를 의미합니다.",
			},
			batchIndex: {
				type: "integer",
				description:
					"토큰 전송 트랜잭션의 배치 인덱스를 나타내는 필드입니다. 이 필드는 ERC1155 토큰 전송에 대한 응답에만 포함됩니다.",
			},
		},
	};

	export const Block: OpenAPIV3.SchemaObject = {
		type: "object",
		required: [
			"hash",
			"number",
			"timestamp",
			"parentHash",
			"nonce",
			"stateRoot",
			"receiptsRoot",
			"transactionsRoot",
			"miner",
			"difficulty",
			"totalDifficulty",
			"mixHash",
			"gasLimit",
			"gasUsed",
			"size",
			"logsBloom",
			"extraData",
			"sha3Uncles",
			"transactionCount",
			"transactions",
		],
		properties: {
			hash: {
				type: "string",
				description: "블록 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.blockHash,
			},
			number: {
				type: "integer",
				description: "블록 번호 또는 블록 높이를 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			timestamp: {
				type: "integer",
				description: "블록이 생성된 시간을 나타내는 필드입니다. 이 필드는 UNIX 타임스탬프로 제공됩니다.",
			},
			parentHash: {
				type: "string",
				description:
					"블록의 부모 블록 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.blockHash,
			},
			nonce: {
				type: "string",
				description:
					"작업증명(PoW)에서 블록의 유효성을 증명하는 데 사용되는 값입니다. 지분증명(PoS)로 전환된 블록부터는 0x0000000000000000을 반환합니다.",
				pattern: Patterns.hexaDecimal,
			},
			stateRoot: {
				type: "string",
				description:
					"블록 상태의 루트 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.blockHash,
			},
			receiptsRoot: {
				type: "string",
				description:
					"블록에 포함된 모든 트랜잭션의 receipt의 루트 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.blockHash,
			},
			transactionsRoot: {
				type: "string",
				description:
					"블록에 포함된 모든 트랜잭션의 루트 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.blockHash,
			},
			miner: {
				type: "string",
				description:
					"블록을 생성한 채굴자의 주소를 나타내는 필드입니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.ethereumAddress,
			},
			difficulty: {
				type: "string",
				description:
					"블록 생성 난이도를 나타내는 필드입니다. 작업증명(PoW)에서는 난이도 값이 반환되며, 지분증명(PoS)로 전환된 블록부터는 0을 반환합니다.",
				pattern: Patterns.decimalString,
			},
			totalDifficulty: {
				type: "string",
				description:
					"블록 생성의 누적 난이도를 나타내는 필드로, 0번 블록부터 현재 블록까지의 난이도를 모두 더한 값을 반환합니다. 0x로 시작하는 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			mixHash: {
				type: "string",
				description:
					"작업증명(PoW)에서 블록의 유효성을 증명하는 데 사용되는 값입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.hexaDecimal64,
			},
			gasLimit: {
				type: "string",
				description:
					"블록에 허용되는 최대 가스량을 나타내는 필드입니다. 블록에 포함된 모든 트랜잭션의 가스량을 합한 값은 이 값보다 작아야 합니다. 0x로 시작하는 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.hexaDecimal,
			},
			gasUsed: {
				type: "string",
				description:
					"블록에 포함된 모든 트랜잭션의 가스 사용량을 나타내는 필드입니다. 0x로 시작하는 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.hexaDecimal,
			},
			baseFeePerGas: {
				type: "string",
				description:
					"블록 기본 가스 수수료를 나타내는 필드입니다. EIP-1559(London Hard fork)에서 도입된 변동적인 수수료 모델의 일부입니다. 따라서 도입 이전 블록에서는 해당 필드가 제공되지 않습니다. 0x로 시작하는 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.hexaDecimal,
			},
			size: {
				type: "string",
				description:
					"블록의 크기를 나타내는 필드입니다. 바이트 단위로 제공됩니다. 0x로 시작하는 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.hexaDecimal,
			},
			logsBloom: {
				type: "string",
				description:
					"블록에 포함된 모든 트랜잭션의 로그 블룸을 나타내는 필드입니다. 0x로 시작하는 512자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.hexaDecimal512,
			},
			extraData: {
				type: "string",
				description:
					"블록 생성자가 추가한 데이터를 나타내는 필드입니다. 아무런 값을 추가하지 않은 경우 0x를 반환합니다. 0x로 시작하는 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.hexaDecimal,
			},
			sha3Uncles: {
				type: "string",
				description:
					"블록에 포함된 모든 삼촌 블록의 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.hexaDecimal64,
			},
			transactionCount: {
				type: "integer",
				description: "블록에 포함된 트랜잭션의 수를 나타내는 필드입니다.",
			},
			transactions: {
				type: "array",
				description: "블록에 포함된 트랜잭션의 목록을 나타내는 필드입니다.",
				items: {
					type: "string",
					description:
						"블록에 포함된 트랜잭션의 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
					pattern: Patterns.transactionHash,
				},
			},
			withdrawalRoot: {
				type: "string",
				description:
					"블록에 포함된 모든 출금 트랜잭션의 루트 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.blockHash,
			},
			// withdrawalsCount: {
			// 	type: "integer",
			// 	description: "블록에 포함된 출금 트랜잭션의 수를 나타내는 필드입니다.",
			// },
			withdrawals: {
				type: "array",
				description: "검증자가 스테이킹한 자산을 출금한 목록을 나타내는 필드입니다.",
				items: {
					type: "object",
					required: ["index", "validatorIndex", "address", "amount"],
					properties: {
						index: {
							type: "string",
							description:
								"출금 거래의 인덱스를 나타내는 필드입니다. 0부터 시작하는 정수로 제공됩니다. 10진수 문자열 형태로 제공됩니다.",
							pattern: Patterns.decimalString,
						},
						validatorIndex: {
							type: "string",
							description: "출금을 요청한 검증자의 인덱스를 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
							pattern: Patterns.decimalString,
						},
						address: {
							type: "string",
							description:
								"출금된 Native Token을 받을 주소를 나타내는 필드입니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 제공됩니다.",
							pattern: Patterns.ethereumAddress,
						},
						amount: {
							type: "string",
							description: "출금한 수량을 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
							pattern: Patterns.decimalString,
						},
					},
				},
			},
		},
	};

	export const Args: OpenAPIV3.SchemaObject = {
		type: "object",
		properties: {
			name: {
				type: "string",
				description: "인자의 이름을 나타내는 필드입니다.",
			},
			type: {
				type: "string",
				description: "인자의 타입을 나타내는 필드입니다.",
			},
			value: {
				type: "string",
				description: "인자의 값을 나타내는 필드입니다.",
			},
		},
	};

	export const TransactionWithReceipt: OpenAPIV3.SchemaObject = {
		type: "object",
		required: [
			"transactionHash",
			"transactionIndex",
			"blockHash",
			"blockNumber",
			"from",
			"to",
			"value",
			"input",
			"functionSelector",
			"nonce",
			"gas",
			"gasPrice",
			"gasUsed",
			"cumulativeGasUsed",
			"effectiveGasPrice",
			"contractAddress",
			"logsBloom",
			"timestamp",
		],
		properties: {
			transactionHash: {
				type: "string",
				description: "트랜잭션의 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.transactionHash,
			},
			transactionIndex: {
				type: "string",
				description:
					"트랜잭션의 인덱스를 나타내는 필드입니다. 블록 내에서의 순서를 나타냅니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			blockHash: {
				type: "string",
				description: "블록의 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.blockHash,
			},
			blockNumber: {
				type: "string",
				description: "블록 번호를 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.blockNumber,
			},
			from: {
				type: "string",
				description:
					"트랜잭션을 발생시킨 주소를 나타내는 필드입니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.ethereumAddress,
			},
			to: {
				type: "string",
				description:
					"트랜잭션의 수신 주소를 나타내는 필드입니다. 컨트랙트 생성 트랜잭션의 경우 이 필드는 null을 반환합니다.0x로 시작하는 40자리의 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.ethereumAddress,
			},
			value: {
				type: "string",
				description: "트랜잭션에서 전송한 토큰의 수량을 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			input: {
				type: "string",
				description:
					"트랜잭션의 데이터를 나타내는 필드입니다. Native Token(ETH, MATIC 등) 전송의 경우 이 필드는 비어 있습니다. 0x로 시작하는 16진수 문자열 형태로 제공됩니다. ",
				pattern: Patterns.hexaDecimal,
			},
			decodedInput: {
				type: "object",
				description:
					"트랜잭션의 데이터를 디코딩한 결과를 나타내는 필드입니다. withDecodedInput 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
				properties: {
					type: {
						type: "string",
						description: "트랜잭션의 함수 타입을 나타내는 필드입니다.",
					},
					name: {
						type: "string",
						description: "트랜잭션의 함수 이름을 나타내는 필드입니다.",
					},
					signature: {
						type: "string",
						description: "트랜잭션의 함수 시그니처를 나타내는 필드입니다.",
					},
					args: {
						type: "array",
						items: DataDomains.Args,
					},
				},
			},
			functionSelector: {
				type: "string",
				description:
					"트랜잭션에서 호출한 함수의 selector를 나타내는 필드입니다. 0x로 시작하는 8자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.hexaDecimal8,
			},
			nonce: {
				type: "string",
				description:
					"트랜잭션의 nonce 값을 나타내는 필드입니다. 트랜잭션의 중복 방지 및 순서를 결정하는 데 사용됩니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			gas: {
				type: "string",
				description:
					"트랜잭션 실행을 위해 사용자가 할당하고자 하는 가스의 최대 양을 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			gasPrice: {
				type: "string",
				description:
					"사용자가 단위 가스당 지불할 의향이 있는 금액을 나타내는 필드입니다. EIP-1559(London Hard fork) 적용 이전의 트랜잭션 모델(고정된 수수료)에서 사용되는 필드이며, 네트워크 혼잡도에 따라 사용자가 수동으로 가격을 설정할 수 있습니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			maxFeePerGas: {
				type: "string",
				description:
					"사용자가 단위 가스당 지불할 의향이 있는 최대 수수료를 나타내는 필드입니다. 이는 baseFeePerGas와 MaxPriorityFeePerGas의 합보다 크거나 같아야 합니다. EIP-1559(London Hard fork)에서 도입된 변동적인 수수료 모델의 일부입니다. 따라서 도입 이전 트랜잭션에서는 해당 필드가 제공되지 않습니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			maxPriorityFeePerGas: {
				type: "string",
				description:
					"사용자가 블록 생성자에게 직접 지불하길 원하는 단위 가스당 최대 수수료입니다. 이 값이 클수록 블록 생성자는 해당 트랜잭션을 우선적으로 처리하게 됩니다. EIP-1559(London Hard fork)에서 도입된 변동적인 수수료 모델의 일부입니다. 따라서 도입 이전 트랜잭션에서는 해당 필드가 제공되지 않습니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			gasUsed: {
				type: "string",
				description:
					"트랜잭션 실행에서 실제로 사용된 가스의 양을 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			cumulativeGasUsed: {
				type: "string",
				description:
					"현재 트랜잭션까지 포함하여, 블록 내에서 처리된 모든 트랜잭션들에 사용된 가스의 총합을 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			effectGasPrice: {
				type: "string",
				description:
					"트랜잭션이 실제로 단위 가스당 지불한 평균 가격을 나타내는 필드입니다. EIP-1559(London Hard fork)에서 도입된 변동적인 수수료 모델의 일부입니다. 따라서 도입 이전 트랜잭션에서는 해당 필드가 제공되지 않습니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			contractAddress: {
				type: "string",
				description:
					"트랜잭션이 컨트랙트 생성 트랜잭션인 경우, 생성된 컨트랙트 주소를 나타내는 필드입니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.ethereumAddress,
			},
			type: {
				type: "string",
				description: `트랜잭션의 타입을 나타내는 필드이며, 블록 시점에 따라 이 필드가 제공되지 않을 수 있습니다. 10진수 문자열 형태로 제공됩니다.
0: Legacy transaction, EIP-1559 이전의 트랜잭션
1: Access List transaction, EIP-2930에 의해 도입된 접근 목록 트랜잭션
2: Fee market transaction, EIP-1559에 의해 도입된 수수료 시장 트랜잭션`,
				pattern: Patterns.decimalString,
			},
			status: {
				type: "string",
				description:
					"트랜잭션의 상태를 나타내는 필드입니다. 1이면 성공, 0이면 실패를 나타냅니다. Byzantium Hard Fork 이전의 트랜잭션에서는 해당 필드가 제공되지 않습니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			logsBloom: {
				type: "string",
				description:
					"트랜잭션에 포함된 모든 로그 블룸을 나타내는 필드입니다. 0x로 시작하는 512자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.hexaDecimal512,
			},
			accessList: {
				type: "array",
				description: "트랜잭션의 접근 목록을 나타내는 필드입니다.",
				items: {
					type: "object",
					required: ["address", "storageKeys"],
					properties: {
						address: {
							type: "string",
							description:
								"트랜잭션에서 접근한 컨트랙트 주소를 나타내는 필드입니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 제공됩니다.",
							pattern: Patterns.ethereumAddress,
						},
						storageKeys: {
							type: "array",
							description: "트랜잭션에서 접근한 컨트랙트의 storage key 목록을 나타내는 필드입니다.",
							items: {
								type: "string",
								description:
									"트랜잭션에서 접근한 컨트랙트의 storage key를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
								pattern: Patterns.hexaDecimal64,
							},
						},
					},
				},
			},
			timeStamp: {
				type: "integer",
				description: "트랜잭션이 생성된 시간을 나타내는 필드입니다. 이 필드는 UNIX 타임스탬프로 제공됩니다.",
			},
		},
	};

	export const Log: OpenAPIV3.SchemaObject = {
		type: "object",
		required: [
			"contractAddress",
			"transactionHash",
			"transactionIndex",
			"blockHash",
			"blockNumber",
			"data",
			"logIndex",
			"removed",
			"topics",
		],
		properties: {
			contractAddress: {
				type: "string",
				description:
					"로그를 생성한 컨트랙트 주소를 나타내는 필드입니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.ethereumAddress,
			},
			transactionHash: {
				type: "string",
				description:
					"로그를 생성한 트랜잭션의 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.transactionHash,
			},
			transactionIndex: {
				type: "string",
				description:
					"로그를 생성한 트랜잭션의 인덱스를 나타내는 필드입니다. 블록 내에서의 순서를 나타냅니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			blockHash: {
				type: "string",
				description:
					"로그를 생성한 블록의 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.blockHash,
			},
			blockNumber: {
				type: "string",
				description: "로그를 생성한 블록 번호를 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.blockNumber,
			},
			data: {
				type: "string",
				description:
					"로그의 데이터를 나타내는 필드입니다. 0x로 시작하는 16진수 문자열 형태로 제공됩니다. 이 필드는 로그의 이벤트 데이터를 나타냅니다.",
				pattern: Patterns.hexaDecimal,
			},
			logIndex: {
				type: "string",
				description:
					"로그의 인덱스를 나타내는 필드입니다. 트랜잭션에서 발생한 이벤트의 순서를 의미합니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			removed: {
				type: "boolean",
				description:
					"로그가 제거되었는지 여부를 나타내는 필드입니다. 체인의 재구성(Reorg)으로 인해 로그가 제거된 경우 true를 반환합니다.",
			},
			topics: {
				type: "array",
				description: "인덱스된 로그의 인자를 나타내는 필드입니다. 최대 4개의 토픽을 가질 수 있습니다.",
				items: {
					type: "string",
					description: "로그의 토픽을 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
					pattern: Patterns.hexaDecimal64,
				},
			},
		},
	};

	export const DecodedLog: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["name", "eventFragment", "signature", "eventHash", "args"],
		properties: {
			name: {
				type: "string",
				description: "로그의 이벤트 이름을 나타내는 필드입니다.",
			},
			eventFragment: {
				type: "string",
				description: "로그의 이벤트 프래그먼트를 나타내는 필드입니다.",
			},
			signature: {
				type: "string",
				description: "로그의 이벤트 시그니처를 나타내는 필드입니다.",
			},
			eventHash: {
				type: "string",
				description: "로그의 이벤트 해시를 나타내는 필드입니다.",
			},
			args: {
				type: "array",
				items: DataDomains.Args,
			},
		},
	};

	export const GasPrice: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["high", "average", "low", "latestBlock", "baseFee"],
		properties: {
			high: {
				type: "string",
				description: "현재 Gas Price의 최고가를 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			average: {
				type: "string",
				description: "현재 Gas Price의 평균가를 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			low: {
				type: "string",
				description: "현재 Gas Price의 최저가를 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			latestBlock: {
				type: "string",
				description: "최신 블록을 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			baseFee: {
				type: "string",
				description: "최신 블록의 기본 수수료를 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
		},
	};

	export const Trace: OpenAPIV3.SchemaObject = {
		type: "object",
		required: [],
		properties: {
			traceId: {
				type: "string",
				description: `트랜잭션의 트레이스 ID를 나타내는 필드입니다. 트랜잭션의 깊이와 호출 순서에 따라 고유한 값을 가집니다.

네이밍 규칙: \`call_{blockNumber}_{transactionIndex}_{depth1's callOrder}_{depth2's callOrder}_{...}\``,
			},
			traceIndex: {
				type: "integer",
				description: "트랜잭션의 트레이스 인덱스를 나타내는 필드입니다. external transaction의 경우 0을 반환합니다.",
			},
			transactionHash: {
				type: "string",
				description: "트랜잭션의 해시를 나타내는 필드입니다. 0x로 시작하는 64자리 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.transactionHash,
			},
			transactionIndex: {
				type: "string",
				description:
					"트랜잭션의 인덱스를 나타내는 필드입니다. 블록 내에서의 순서를 나타냅니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			from: {
				type: "string",
				description:
					"트랜잭션을 발생시킨 주소를 나타내는 필드입니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.ethereumAddress,
			},
			to: {
				type: "string",
				description:
					"트랜잭션의 수신 주소를 나타내는 필드입니다. 컨트랙트 생성 트랜잭션의 경우, 이 필드는 생성된 컨트랙트 주소를 반환합니다. 0x로 시작하는 40자리의 16진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.ethereumAddress,
			},
			value: {
				type: "string",
				description: "트랜잭션에서 전송된 수량을 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			traceType: {
				type: "string",
				description: "트랜잭션의 트레이스 타입을 나타내는 필드입니다. call, create 등이 있습니다.",
			},
			callType: {
				type: "string",
				description: "트랜잭션의 호출 타입을 나타내는 필드입니다. call, delegatecall, staticcall 등이 있습니다.",
			},
			gas: {
				type: "string",
				description: "트랜잭션에 할당된 가스의 양을 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			gasUsed: {
				type: "string",
				description:
					"트랜잭션 실행에서 실제로 사용된 가스의 양을 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			status: {
				type: "string",
				description:
					"트랜잭션의 상태를 나타내는 필드입니다. 1이면 성공, 0이면 실패를 나타냅니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.decimalString,
			},
			blockNumber: {
				type: "string",
				description: "트랜잭션이 포함된 블록의 번호를 나타내는 필드입니다. 10진수 문자열 형태로 제공됩니다.",
				pattern: Patterns.blockNumber,
			},
			timeStamp: {
				type: "integer",
				description: "트랜잭션이 생성된 시간을 나타내는 필드입니다. 이 필드는 UNIX 타임스탬프로 제공됩니다.",
			},
		},
	};
}

export default DataDomains;
