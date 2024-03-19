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

	export const subscriptionId: OpenAPIV3.ParameterObject = {
		name: "subscriptionId",
		in: "path",
		required: true,
		schema: {
			type: "string",
		},
		description:
			"조회하고자 하는 Webhook에 할당된 subscriptionId를 지정하기 위한 파라미터입니다. Webhook 생성 시 반환되는 subscriptionId를 사용하여 Webhook 정보를 조회, 수정 및 삭제할 수 있습니다.",
	};

	/** Query Parameters **/
	export const subscriptionIdQuery: OpenAPIV3.ParameterObject = {
		name: "subscriptionId",
		in: "query",
		required: false,
		schema: {
			type: "string",
		},
		description:
			"조회하고자 하는 Webhook에 할당된 subscriptionId를 지정하기 위한 파라미터입니다. Webhook 생성 시 반환되는 subscriptionId를 사용하여 Webhook 정보를 조회, 수정 및 삭제할 수 있습니다. 빈 값을 입력하면 모든 Webhook 정보를 조회합니다.",
	};

	/** Common **/
	export const eventType: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"Webhook으로 구독하고자 하는 이벤트 타입 구분자를 지정하는 파라미터입니다. 지원되는 이벤트 타입에 대한 정보는 Event Types 페이지를 참고하세요.",
	};

	export const description: OpenAPIV3.SchemaObject = {
		type: "string",
		description: "이벤트의 설명을 지정하는 파라미터입니다.",
	};

	export const notification: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "이벤트 발생 시 알림을 받기 위해 필요한 정보를 지정하는 파라미터입니다.",
		properties: {
			webhookUrl: {
				type: "string",
				description:
					"구독한 이벤트 발생 시 알림을 받을 웹훅 URL을 지정하는 파라미터입니다. Public Access가 가능한 URL을 지정해야 합니다.",
			},
		},
	};

	export const condition: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"구독하고자 하는 이벤트 조건의 상제 정의를 위한 필드입니다. 이벤트 타입에 따라 입력 가능한 조건이 다르기 때문에, Webhook Types 페이지를 참고하여 사용하세요.",
		format: "json",
	};

	export const isActive: OpenAPIV3.SchemaObject = {
		type: "boolean",
		description:
			"Webhook의 활성화 여부를 지정하는 파라미터입니다. 이 값이 true로 지정하면 활성화되며, false로 지정하면 비활성화됩니다. 비활성화된 Webhook은 알림을 받을 수 없지만 삭제되지 않습니다.",
	};
}

export default Requests;
