import { OpenAPIV3 } from "openapi-types";

export interface ApiConfig {
	category: string;
	fileName: string;
	id: string;
}

export interface ApiDefinition extends ApiConfig {
	oasDocs: OpenAPIV3.Document;
}
