import { OpenAPIV3 } from "openapi-types";
import Requests from "../resources/requests";
import Responses from "../resources/responses";
import Examples from "../resources/examples";
import { NODE_API_BASE_URL } from "../../../../utils/urls.utils";
import Schemas from "../resources/schemas";
import { MAIN_API_CONFIGS } from "../../../../configs/readme.config";

const method = "eth_subscribe";
const protocol = "ethereum";
const version = MAIN_API_CONFIGS.version;

interface XReadme {
	"x-readme": {
		"code-samples": {
			language: string;
			code?: string;
			name: string;
			install?: string;
			correspondingExample?: string;
		}[];
		"samples-languages": string[];
	};
}

const oasDocs: OpenAPIV3.Document<XReadme> = {
	openapi: "3.1.0",
	info: {
		title: `${protocol}-${method}`,
		version,
	},
	servers: [
		{
			url: NODE_API_BASE_URL,
			variables: Schemas.ServerVariables[protocol],
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
		["/"]: {
			post: {
				security: [
					{
						api_key: [],
					},
				],
				tags: [],
				description: `특정 이벤트가 발생할 때마다 실시간으로 알림을 받을 수 있습니다. 이벤트 타입은 newHeads, logs, newPendingTransactions 중 하나를 선택할 수 있습니다.`,
				summary: method,
				operationId: method,
				parameters: [],
				"x-readme": {
					"code-samples": [
						{
							language: "curl",
							name: "WSS Subscribe",
							install: "npm install -g wscat",
							code: `# Connect to the WebSocket server
$ wscat -c wss://${protocol}-mainnet.nodit.io/2vuwVWC9mbbLvjz62todRS08YUDzHzf_ 

# Send a request
> '{"jsonrpc":"2.0","method":"${method}","id":1,"params":["newHeads"]}'`,
							// correspondingExample: "TestExample",
						},
					],
					"samples-languages": ["curl"],
				},
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: Requests.CommonFormat({
								method,
								params: {
									type: "array",
									minItems: 1,
									maxItems: 2,
									items: {
										type: "string",
									},
									default: ["newHeads"],
								},
							}),
						},
					},
				},
				responses: {
					"200": Responses.Success200({
						example: Examples[method],
					}),
					"400": Responses.Error400,
				},
			},
		},
	},
};

export default oasDocs;
