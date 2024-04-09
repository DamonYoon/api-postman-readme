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

export interface ReadmeApiSpec {
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
