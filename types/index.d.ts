import { OpenAPIV3 } from "openapi-types";
import API_DOCS_TITLES from "../utils/titles.utils";

declare interface ApiDefinition {
	title: string;
	id: string;
}

declare interface ApiInfo extends ApiDefinition {
	oasDocs: OpenAPIV3.Document;
}

declare interface ReadmeConfig {
	version: string;
	apiDefinitions: ApiDefinition[];
}

declare interface ReadmeApiSpecResponse {
	_id: string;
	title: string;
}

declare interface ReadmeApiSpec {
	title: string;
	source: string;
	_id: string;
	version: string;
	lastSynced: string;
	type: string;
	id: string;
	category: {
		title: string;
		slug: string;
		order: number;
		_id: string;
		type: string;
		id: string;
	};
}

declare interface CategoryInfo {
	title: string;
	slug: string;
	order: number;
	reference: boolean;
	_id: string;
	project: string;
	version: string;
	createdAt: string;
	_v: number;
	type: string;
	id: string;
}

declare interface DocForCategoryInfo {
	_id: string;
	title: string;
	slug: string;
	order: number;
	hidden: boolean;
	children: DocForCategoryInfo[];
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

declare interface OasParams {
	version: string;
}

declare interface EvmOasParams extends OasParams {
	protocol: string;
}
