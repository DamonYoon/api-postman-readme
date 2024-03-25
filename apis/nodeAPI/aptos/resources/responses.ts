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

	export namespace Params {
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
				generic_type_params: schemas.generic_type_params,
			},
		};

		export const transaction: OpenAPIV3.SchemaObject = {
			type: "object",
			oneOf: [
				schemas.TransactionTypes.pendingTransaction,
				schemas.TransactionTypes.userTransaction,
				schemas.TransactionTypes.genesisTransaction,
				schemas.TransactionTypes.blockMetadataTransaction,
				schemas.TransactionTypes.stateCheckpointTransaction,
			],
		};

		export const block: OpenAPIV3.SchemaObject = {
			type: "object",
			description: "This contains the information about a transactions along with associated transactions if requested",
			required: ["block_height", "block_hash", "block_timestamp", "first_version", "last_version"],
			properties: {
				block_height: {
					type: "string",
					pattern: Patterns.Aptos.uint64String,
					description: "The height of the block. The format is a 64-bit unsigned integer.",
				},
				block_hash: {
					type: "string",
					description: "The hash of the block",
				},
				block_timestamp: {
					type: "string",
					pattern: Patterns.Aptos.uint64String,
					description: "The timestamp of the block. The format is a 64-bit unsigned integer.",
				},
				first_version: {
					type: "string",
					pattern: Patterns.Aptos.uint64String,
					description: "The first version of the block. The format is a 64-bit unsigned integer.",
				},
				last_version: {
					type: "string",
					pattern: Patterns.Aptos.uint64String,
					description: "The last version of the block. The format is a 64-bit unsigned integer.",
				},
				transactions: {
					type: "array",
					description: "The transactions in the block.",
					items: transaction,
				},
			},
		};

		export const ledgerInfo: OpenAPIV3.SchemaObject = {
			type: "object",
			properties: {
				chainId: {
					type: "integer",
					description: "Chain ID of the current chain",
				},
				epoch: {
					type: "string",
					description: "The epoch",
					pattern: Patterns.Aptos.uint64String,
				},
				ledgerVersion: {
					type: "string",
					description: "The ledger version",
					pattern: Patterns.Aptos.uint64String,
				},
				oldestLedgerVersion: {
					type: "string",
					description: "The oldest ledger version",
					pattern: Patterns.Aptos.uint64String,
				},
				ledgerTimestamp: {
					type: "string",
					description: "The ledger timestamp",
					pattern: Patterns.Aptos.uint64String,
				},
				nodeRole: {
					type: "string",
					description: "The node role",
					enum: ["full_node", "validator"],
				},
				oldestBlockHeight: {
					type: "string",
					description: "The oldest block height",
					pattern: Patterns.Aptos.uint64String,
				},
				blockHeight: {
					type: "string",
					description: "The block height",
					pattern: Patterns.Aptos.uint64String,
				},
				gitHash: {
					type: "string",
					description:
						"Git hash of the build of the API endpoint. Can be used to determine the exact software version used by the API endpoint.",
				},
			},
		};
	}
}

export default Responses;
