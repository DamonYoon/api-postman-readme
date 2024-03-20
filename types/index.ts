import { OpenAPIV3 } from "openapi-types";

export interface ApiDefinition {
	fileName: string;
	oasDocs: OpenAPIV3.Document;
	id: string;
}
