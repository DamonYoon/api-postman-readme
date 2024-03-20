import { OpenAPIV3 } from "openapi-types";
import API_DOCS_TITLES from "../utils/titles.utils";

export interface ApiDefinition {
	title: API_DOCS_TITLES;
	id: string;
}

export interface ApiInfo extends ApiDefinition {
	oasDocs: OpenAPIV3.Document;
}

export interface ReadmeConfig {
	version: string;
	apiDefinitions: ApiDefinition[];
}
