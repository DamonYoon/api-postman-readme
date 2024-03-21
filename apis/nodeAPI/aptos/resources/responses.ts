import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../../utils/patterns.utils";

interface Success200Interface {
	(option: OpenAPIV3.MediaTypeObject): OpenAPIV3.ResponseObject;
}

namespace Responses {
	/* Success Response Objects */
	export const Success200: Success200Interface = (option) => ({
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

	export namespace Params {
		export const sequenceNumber: OpenAPIV3.SchemaObject = {
			type: "integer",
			format: "uint64",
			description: "A string containing a 64-bit unsigned integer.",
			example: 32425224034,
		};

		export const authenticationKey: OpenAPIV3.SchemaObject = {
			type: "string",
			description:
				"All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte. Unlike the Address type, HexEncodedBytes will not trim any zeros.",
			pattern: Patterns.hexaDecimal,
			example: "0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1",
		};

		export const resource: OpenAPIV3.SchemaObject = {
			type: "object",
			description: "A resource of the account",
			required: ["type", "data"],
			properties: {
				type: {
					type: "string",
					description: `String representation of a MoveStructTag (on-chain Move struct type). This exists so you can specify MoveStructTags as path / query parameters, e.g. for get_events_by_event_handle.
		
		It is a combination of:
		
		1. move_module_address, module_name and struct_name, all joined by ::
		2. struct generic type parameters joined by ,
		
		Examples:
		
		- 0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>
		- 0x1::account::Account`,
					pattern: Patterns.Aptos.resourceType,
				},
				data: {
					type: "object",
					description:
						"This is a JSON representation of some data within an account resource. More specifically, it is a map of strings to arbitrary JSON values / objects, where the keys are top level fields within the given resource.",
				},
			},
		};

		export const bytecode: OpenAPIV3.SchemaObject = {
			type: "string",
			description:
				"All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.",
			pattern: Patterns.hexaDecimal,
		};

		export const address: OpenAPIV3.SchemaObject = {
			type: "string",
			description: "An account address",
			pattern: Patterns.Aptos.address,
		};

		export const generic_type_params: OpenAPIV3.SchemaObject = {
			type: "array",
			description: "Generic type parameters associated with the Move function",
			items: {
				type: "object",
				required: ["name", "constraints"],
				properties: {
					constraints: {
						type: "array",
						description: "Move abilities tied to the generic type param and associated with the function that uses it",
						items: {
							type: "string",
						},
					},
				},
			},
		};

		export const fields: OpenAPIV3.SchemaObject = {
			type: "array",
			description: "Fields associated with the struct",
			items: {
				type: "object",
				required: ["name", "type"],
				properties: {
					name: {
						type: "string",
					},
					type: {
						type: "string",
						description: "Type of the field",
						pattern: Patterns.Aptos.primitiveType,
					},
				},
			},
		};

		export const exposed_functions: OpenAPIV3.SchemaObject = {
			type: "array",
			description: "Public functions of the module",
			items: {
				type: "object",
				required: ["name", "visibility", "is_entry", "is_view", "params", "return"],
				properties: {
					name: {
						type: "string",
					},
					visibility: {
						type: "string",
						description: "Move function visibility",
					},
					is_entry: {
						type: "boolean",
						description: "Whether the function can be called as an entry function directly in a transaction",
					},
					is_view: {
						type: "boolean",
						description: "Whether the function is a view function or not",
					},
					generic_type_params: Responses.Params.generic_type_params,
					params: {
						type: "array",
						items: {
							type: "string",
							description: "Parameters associated with the Move function",
							pattern: Patterns.Aptos.primitiveType,
						},
					},
					return: {
						type: "array",
						items: {
							type: "string",
							description: "Return type of the Move function",
							pattern: Patterns.Aptos.primitiveType,
						},
					},
				},
			},
		};

		export const struct: OpenAPIV3.SchemaObject = {
			type: "object",
			description: "Structs of the module",
			required: ["name", "is_native", "abilities", "generic_type_params"],
			properties: {
				name: {
					type: "string",
				},
				is_native: {
					type: "boolean",
					description: "Whether the struct is a native struct of Move",
				},
				abilities: {
					type: "array",
					description: "Abilities associated with the struct",
					items: {
						type: "string",
					},
				},
				generic_type_params: Responses.Params.generic_type_params,
			},
		};

		export const abi: OpenAPIV3.SchemaObject = {
			type: "object",
			description: "A Move module",
			required: ["address", "name", "friends", "exposed_functions", "fields"],
			properties: {
				address: Responses.Params.address,
				name: {
					type: "string",
				},
				friends: {
					type: "array",
					items: {
						type: "string",
						description: "Friends of the module",
					},
				},
				exposed_functions: Responses.Params.exposed_functions,
				fields: Responses.Params.fields,
			},
		};

		export const module: OpenAPIV3.SchemaObject = {
			type: "object",
			description: "A Move module",
			required: ["bytecode", "abi"],
			properties: {
				bytecode: Responses.Params.bytecode,
				abi: Responses.Params.abi,
			},
		};
	}
}

export default Responses;
