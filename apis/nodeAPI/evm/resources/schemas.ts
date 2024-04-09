import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../../utils/patterns.utils";

namespace Schemas {
	export const error: OpenAPIV3.SchemaObject = {
		type: "object",
		required: ["message", "error_code"],
		properties: {
			message: {
				type: "string",
			},
			error_code: {
				type: "string",
				description: `These codes provide more granular error information beyond just the HTTP status code of the response.

Allowed values: account_not_found, resource_not_found, module_not_found, struct_field_not_found, version_not_found, transaction_not_found, table_item_not_found, block_not_found, state_value_not_found, version_pruned, block_pruned, invalid_input, invalid_transaction_update, sequence_number_too_old, vm_error, health_check_failed, mempool_is_full, internal_error, web_framework_error, bcs_not_supported, api_disabled`,
			},
			vm_error_code: {
				type: "integer",
				description: "A code providing VM error details when submitting transactions to the VM.",
			},
		},
	};

	export namespace ServerVariables {
		export const ethereum: {
			[variable: string]: OpenAPIV3.ServerVariableObject;
		} = {
			protocol: {
				enum: ["ethereum"],
				default: "ethereum",
			},
			network: {
				enum: ["mainnet", "sepolia", "holesky"],
				default: "mainnet",
			},
		};

		export const polygon: {
			[variable: string]: OpenAPIV3.ServerVariableObject;
		} = {
			protocol: {
				enum: ["polygon"],
				default: "polygon",
			},
			network: {
				enum: ["mainnet", "amoy"],
				default: "mainnet",
			},
		};

		export const arbitrum: {
			[variable: string]: OpenAPIV3.ServerVariableObject;
		} = {
			protocol: {
				enum: ["arbitrum"],
				default: "arbitrum",
			},
			network: {
				enum: ["mainnet"],
				default: "mainnet",
			},
		};
	}
}

export default Schemas;
