import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../../utils/patterns.utils";
import * as schemas from "./schemas";

type Success200Function = (option: OpenAPIV3.MediaTypeObject) => OpenAPIV3.ResponseObject;

namespace Responses {
	/* Success Response Objects */
	export const Success200: Success200Function = (option) => ({
		description: "Successful Response",
		content: {
			"application/json": option,
		},
		headers: {
			"X-APTOS-BLOCK-HEIGHT": {
				description: "Current block height of the chain",
				schema: {
					type: "integer",
				},
				required: true,
			},
			"X-APTOS-CHAIN-ID": {
				description: "Chain ID of the current chain",
				schema: {
					type: "integer",
				},
				required: true,
			},
			"X-APTOS-EPOCH": {
				description: "Current epoch of the chain",
				schema: {
					type: "integer",
				},
				required: true,
			},
			"X-APTOS-LEDGER-OLDEST-VERSION": {
				description: "Oldest non-pruned ledger version of the chain",
				schema: {
					type: "integer",
				},
				required: true,
			},
			"X-APTOS-LEDGER-TIMESTAMPUSEC": {
				description: "Current timestamp of the chain",
				schema: {
					type: "integer",
				},
				required: true,
			},
			"X-APTOS-LEDGER-VERSION": {
				description: "Current ledger version of the chain",
				schema: {
					type: "integer",
				},
				required: true,
			},
			"X-APTOS-OLDEST-BLOCK-HEIGHT": {
				description: "Oldest non-pruned block height of the chain",
				schema: {
					type: "integer",
				},
				required: true,
			},
			"X-APTOS-CURSOR": {
				description: "Cursor for the next page",
				schema: {
					type: "string",
				},
				required: true,
			},
		},
	});

	/* Error Response Objects */
	export const Error400: OpenAPIV3.ResponseObject = {
		description: "Bad Request",
		content: {
			"application/json": {
				schema: {
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
				},
			},
		},
	};
}

export default Responses;
