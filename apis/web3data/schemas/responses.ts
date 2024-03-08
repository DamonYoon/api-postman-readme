import { OpenAPIV3 } from "openapi-types";

namespace Response {
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
		description:
			"rpp 파라미터에 지정된 페이지당 결과 수를 나타내는 필드입니다.",
	};

	export const items: OpenAPIV3.SchemaObject = {
		type: "array",
		items: {
			type: "object",
		},
	};
}

export default Response;
