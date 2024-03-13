import { OpenAPIV3 } from "openapi-types";

export interface ApiSpec {
	title: string;
	endpoint: string;
	hide?: boolean;
	info: OpenAPIV3.PathItemObject;
}
