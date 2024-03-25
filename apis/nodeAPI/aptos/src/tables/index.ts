import { OpenAPIV3 } from "openapi-types";
import getTableItem from "./getTableItem";
import getRawTableItem from "./getRawTableItem";

const paths: OpenAPIV3.PathsObject = {
	["/tables/{table_handle}/item"]: getTableItem,
	["/tables/{table_handle}/raw_item"]: getRawTableItem,
};

export default paths;
