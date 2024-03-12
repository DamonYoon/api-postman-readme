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

	export const Balance: OpenAPIV3.SchemaObject = {
		type: "object",
		properties: {
			ownerAddress: CommonFields.ownerAddress,
			balance: CommonFields.balance,
		},
	};

	export const NftBalance: OpenAPIV3.SchemaObject = {
		type: "object",
		properties: {
			totalBalance: {
				type: "string",
				description:
					"해당 컨트랙트의 잔고 수량을 모두 더한 값을 반환합니다.\n [참고] contract type에 따라 수량 계산 방법이 다를 수 있습니다. ERC721는 uniqueBalance와 동일하며, ERC1155는 모든 수량을 더한 값을 반환합니다.\n (예시) 1. ERC721의 경우: #100, #200, #300을 보유했다면 3을 반환 2. ERC1155의 경우: #1을 100개, #200, #300을 각각 200개씩 보유했다면 600을 반환",
			},
			uniqueBalance: {
				type: "string",
				description:
					"해당 컨트랙트가 보유한 NFT 중 각기 다른 token ID의 수를 반환합니다.\n [참고] contract type에 따라 수량 계산 방법이 다를 수 있습니다. ERC721은 totalBalance와 동일하며, ERC1155는 유니크한 token ID의 수를 반환합니다.  \n (예시) 1. ERC721의 경우: #100, #200, #300을 보유했다면 3을 반환 2. ERC1155의 경우: #1을 100개, #200, #300을 각각 200개씩 보유했다면 3을 반환",
			},
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
					"컨트랙트의 로고 URL을 나타내는 필드입니다. 이 URL은 컨트랙트를 시각적으로 식별하는 데 사용될 수 있습니다.\n [참고] 모든 컨트랙트의 로고 이미지가 제공되는 것은 아닙니다. 컨트랙트 로고가 없는 경우, 이 필드는 null로 제공됩니다.",
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
			// TODO: Add totalSupplyId
			// totalSupplyId: {
			// 	type: "string",
			// 	description: "컨트랙트의 총 공급량을 나타내는 필드입니다.",
			// },
			decimals: {
				type: "integer",
				description: "컨트랙트의 소수점 자리수를 나타내는 필드입니다.",
			},
		},
	};

	export const NftHolder: OpenAPIV3.SchemaObject = {
		type: "object",
		properties: {
			ownerAddress: CommonFields.ownerAddress,
			...NftBalance.properties,
		},
	};
}

export default DataDomains;
