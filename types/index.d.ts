import { OpenAPIV3 } from "openapi-types";
import API_DOCS_TITLES from "../utils/titles.utils";

declare interface ApiDefinition {
	title: API_DOCS_TITLES;
	id: string;
}

declare interface ApiInfo extends ApiDefinition {
	oasDocs: OpenAPIV3.Document;
}

declare interface ReadmeConfig {
	version: string;
	apiDefinitions: ApiDefinition[];
}

declare interface ReadmeApiSpec {
	title: string;
	source: string | null;
	_id: string | null;
	version: string | null;
	lastSynced: string | null;
	category: {
		title: string | null;
		slug: string | null;
		order: number;
		_id: string | null;
		type: string | null;
		id: string | null;
	} | null;
	type: string | null;
	id: string | null;
}

declare interface ApiSpec {
	summary: string;
	endpoint: string;
	isPublic?: boolean;
	info: OpenAPIV3.PathItemObject;
}

declare namespace ReadmeExtension {
	export interface securitySchemes extends OpenAPIV3.ApiKeySecurityScheme {
		"x-default": string;
	}
}
