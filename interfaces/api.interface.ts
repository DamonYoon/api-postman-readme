import { OpenAPIV3 } from "openapi-types";

export interface ApiSpec {
	title: string;
	endpoint: string;
	isPublic?: boolean;
	info: OpenAPIV3.PathItemObject;
}
