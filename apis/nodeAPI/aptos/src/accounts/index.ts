import { OpenAPIV3 } from "openapi-types";
import getAccount from "./getAccount";
import getAccountModule from "./getAccountModule";
import getAccountModules from "./getAccountModules";
import getAccountResource from "./getAccountResource";
import getAccountResources from "./getAccountResources";

const url = `/v1/accounts`;

const paths: OpenAPIV3.PathsObject = {
	[`${url}/{address}`]: getAccount,
	[`${url}/{address}/modules/{module_name}`]: getAccountModule,
	[`${url}/{address}/modules`]: getAccountModules,
	[`${url}/{address}/resources/{resource_type}`]: getAccountResource,
	[`${url}/{address}/resources`]: getAccountResources,
};

export default paths;
