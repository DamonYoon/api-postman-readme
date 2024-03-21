import { OpenAPIV3 } from "openapi-types";

export interface ApiSpec {
	summary: string;
	endpoint: string;
	isPublic?: boolean;
	info: OpenAPIV3.PathItemObject;
}
