import {} from "../schemas/evm";

interface ApiConfig {
	title: string;
	version: string;
	baseUrl: string;
	description: string;
	tags: string[];
	// paths:
}

interface PathsConfig {}

export const apiConfig = {
	title: "Example API",
	version: "1.0",
	baseUrl: "https://example.com/api",
	description: "This is an example API.",
	tags: ["Example"],
	paths: [
		{
			path: "/users/{userId}",
			summary: "Get User by ID",
			operationId: "getUser",
			method: "GET",
			headers: { "X-API-KEY": "Your-API-Key" },
			queryParams: [
				{
					name: "includeDetails",
					type: "boolean",
					description: "Include detailed information",
				},
			],
			bodyParams: [],
			responses: {
				200: { description: "Successful response", content: "" },
			},
		},
	],
};
