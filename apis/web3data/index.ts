import { OpenAPIV3 } from "openapi-types";

const protocol: OpenAPIV3.ParameterObject = {
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
function calculateDaysBetweenDates(begin, end) {
	const start = new Date(begin);
	const finish = new Date(end);
	const millisecondsPerDay = 1000 * 60 * 60 * 24;

	const millisBetween = finish.getTime() - start.getTime();
	const days = millisBetween / millisecondsPerDay;

	return Math.floor(days);
}

const network: OpenAPIV3.ParameterObject = {
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

const web3_data_API_docs: OpenAPIV3.Document = {
	openapi: "3.1.0",
	info: {
		title: "",
		version: "1.0.0",
	},
	servers: [
		{
			url: "{baseurl}",
		},
	],
	components: {
		securitySchemes: {
			api_key: {
				type: "apiKey",
				name: "X-API-KEY",
				in: "header",
			},
		},
	},
	paths: {
		"/{apikey}": {
			post: {
				security: [
					{
						api_key: [],
					},
				],
				tags: ["NFT API"],
				description: "해당 Account가 보유한 NFT의 목록을 조회합니다.",
				summary: "Get NFTs Owned By Account",
				operationId: "getNFTsOwnedByAccount",
				parameters: [protocol, network],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {},
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Successful Response",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {},
								},
							},
						},
					},
				},
			},
		},
	},
};
