import { OpenAPIV3 } from "openapi-types";

namespace Responses {
	export const count: OpenAPIV3.SchemaObject = {
		type: "integer",
		description:
			"요청한 데이터의 총 개수를 나타내는 필드입니다. 이 필드는 withCount 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
	};

	export const cursor: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"cursor 페이지네이션을 위한 필드로, 다음 페이지의 데이터를 로드하기 위해 다음 요청에 제공해야 하는 값입니다.",
	};

	export const page: OpenAPIV3.SchemaObject = {
		type: "integer",
		description:
			"page 파라미터에 지정된 페이지 번호를 나타내는 필드입니다. 이 필드는 page 파라미터에 0보다 큰 값을 입력한 경우에만 응답에 포함됩니다.",
	};

	export const rpp: OpenAPIV3.SchemaObject = {
		type: "integer",
		description: "rpp 파라미터에 지정된 페이지당 결과 수를 나타내는 필드입니다.",
	};

	export const paginationSet = (items: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject) => ({
		page,
		rpp,
		cursor,
		count,
		items,
	});

	export const ownerAddress: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "소유자 주소를 나타내는 필드입니다.",
	};

	export const balance: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "잔고 나타내는 필드입니다.",
	};

	export const contractAddress: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "컨트랙트 주소를 나타내는 필드입니다.",
	};

	export const tokenId: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "NFT의 토큰 ID를 나타내는 필드입니다.",
	};

	export const rawMetadata: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"NFT의 rawMetadata를 나타내는 필드입니다. withMetadata 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
	};

	export const metadata: OpenAPIV3.SchemaObject = {
		type: "object",
		description:
			"NFT의 metadata를 나타내는 필드입니다. withMetadata 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
	};

	export const media: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "NFT의 media를 나타내는 필드입니다. withMetadata 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
	};

	export const metadataSyncedAt: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"NFT의 metadata가 동기화 된 시점을 나타내는 필드입니다. withMetadata 파라미터에 true를 입력한 경우에만 응답에 포함됩니다.",
	};

	export const totalBalance: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"해당 컨트랙트의 잔고 수량을 모두 더한 값을 반환합니다.\n [참고] contract type에 따라 수량 계산 방법이 다를 수 있습니다. ERC721는 uniqueBalance와 동일하며, ERC1155는 모든 수량을 더한 값을 반환합니다.  \n (예시) 1. ERC721의 경우: #100, #200, #300을 보유했다면 3을 반환 2. ERC1155의 경우: #1을 100개, #200, #300을 각각 200개씩 보유했다면 600을 반환",
	};

	export const uniqueBalance: OpenAPIV3.SchemaObject = {
		type: "integer",
		description:
			"해당 컨트랙트가 보유한 NFT 중 각기 다른 token ID의 수를 반환합니다.\n [참고] contract type에 따라 수량 계산 방법이 다를 수 있습니다. ERC721은 totalBalance와 동일하며, ERC1155는 유니크한 token ID의 수를 반환합니다.  \n (예시) 1. ERC721의 경우: #100, #200, #300을 보유했다면 3을 반환 2. ERC1155의 경우: #1을 100개, #200, #300을 각각 200개씩 보유했다면 3을 반환",
	};
}

export default Responses;
