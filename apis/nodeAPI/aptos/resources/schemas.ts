import { OpenAPIV3 } from "openapi-types";
import { Patterns } from "../../../../utils/patterns.utils";

export const address: OpenAPIV3.SchemaObject = {
	type: "string",
	description: "An account address",
	pattern: Patterns.Aptos.address,
};

export const fields: OpenAPIV3.SchemaObject = {
	type: "array",
	description: "“ associated with the struct",
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
			generic_type_params: generic_type_params,
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

export const bytecode: OpenAPIV3.SchemaObject = {
	type: "string",
	description:
		"All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.",
	pattern: Patterns.hexaDecimal,
};

export const abi: OpenAPIV3.SchemaObject = {
	type: "object",
	description: "A Move module",
	required: ["address", "name", "friends", "exposed_functions", "“"],
	properties: {
		address: address,
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
		exposed_functions: exposed_functions,
		fields: fields,
	},
};

export const module: OpenAPIV3.SchemaObject = {
	type: "object",
	description: "A Move module",
	required: ["bytecode", "abi"],
	properties: {
		bytecode: bytecode,
		abi: abi,
	},
};

export namespace Payload {
	export const entryFunction: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "The payload of the entry function",
		required: ["type", "function", "type_arguments", "arguments"],
		properties: {
			type: {
				type: "string",
				description: "The type of the payload",
				example: "entry_function_payload",
			},
			function: {
				type: "string",
				description: "The function of the payload",
			},
			type_arguments: {
				type: "array",
				description: "The type arguments of the payload",
				items: {
					type: "string",
					pattern: Patterns.Aptos.primitiveType,
				},
			},
			arguments: {
				type: "array",
				description: "The arguments of the payload",
				items: {
					type: "string",
				},
			},
		},
	};

	export const script: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "The payload of the script",
		required: ["type", "code"],
		properties: {
			type: {
				type: "string",
				description: "The type of the payload",
				example: "script_payload",
			},
			code: {
				type: "object",
				description: "The code of the script",
				properties: {
					bytecode: bytecode,
					abi: exposed_functions,
				},
			},
		},
	};

	export const moduleBundle: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "The payload of the module bundle",
		required: ["type", "modules"],
		properties: {
			type: {
				type: "string",
				description: "The type of the payload",
				example: "module_bundle_payload",
			},
			modules: {
				type: "array",
				items: module,
			},
		},
	};

	export const multisig: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "The payload of the multisig",
		required: ["type", "transactionPayload"],
		properties: {
			type: {
				type: "string",
				description: "The type of the payload",
				example: "multisig_payload",
			},
			transactionPayload: Payload.entryFunction,
		},
	};
}

export namespace SignatureTypes {
	export const publicKey: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.",
		pattern: Patterns.hexaDecimal,
	};
	export const signature: OpenAPIV3.SchemaObject = {
		type: "string",
		description:
			"All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.",
		pattern: Patterns.hexaDecimal,
	};

	export const ed25519: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "The Ed25519 signature",
		required: ["type", "public_key", "signature"],
		properties: {
			type: {
				type: "string",
				description: "The type of the signature",
				example: "ed25519_signature",
			},
			public_key: publicKey,
			signature: signature,
		},
	};

	export const multiEd25519: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "A Ed25519 multi-sig signature",
		required: ["type", "public_keys", "signatures", "threshold", "bitmap"],
		properties: {
			type: {
				type: "string",
				description: "The type of the signature",
				example: "multi_ed25519_signature",
			},
			public_keys: {
				type: "array",
				description: "The public keys for the Ed25519 signature",
				items: publicKey,
			},
			signatures: {
				type: "array",
				description: "Signature associated with the public keys in the same order",
				items: signature,
			},
			threshold: {
				type: "integer",
				description: "The number of signatures required for a successful transaction",
			},
			bitmap: {
				type: "string",
				description:
					"All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte",
				pattern: Patterns.hexaDecimal,
			},
		},
	};
}

export namespace AccountSignature {
	export const ed25519: OpenAPIV3.SchemaObject = SignatureTypes.ed25519;
	export const multiEd25519: OpenAPIV3.SchemaObject = SignatureTypes.multiEd25519;

	export const singleKey: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "A single key signature",
		required: ["type", "public_key", "signature"],
		properties: {
			type: {
				type: "string",
				description: "The type of the signature",
				example: "single_key_signature",
			},
			public_key: SignatureTypes.publicKey,
			signature: SignatureTypes.signature,
		},
	};

	export const multiKey: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "A multi-key signature",
		required: ["type", "public_keys", "signatures"],
		properties: {
			type: {
				type: "string",
				description: "The type of the signature",
				example: "multi_key_signature",
			},
			public_keys: {
				type: "array",
				description: "The public keys for the multi-key signature",
				items: SignatureTypes.publicKey,
			},
			signatures: {
				type: "array",
				description: "The signatures associated with the public keys",
				items: {
					type: "object",
					properties: {
						index: {
							type: "integer",
							description: "The index of the public key",
						},
						signature: SignatureTypes.signature,
						signatures_required: {
							type: "integer",
							description: "The number of signatures required for a successful transaction",
						},
					},
				},
			},
		},
	};
}

export namespace TransactionSignature {
	export const ed25519: OpenAPIV3.SchemaObject = SignatureTypes.ed25519;

	export const multiEd25519: OpenAPIV3.SchemaObject = SignatureTypes.multiEd25519;

	export const multiAgent: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "A multi-agent signature",
		required: ["type", "signatures"],
		properties: {
			type: {
				type: "string",
				description: "The type of the signature",
				example: "multi_agent_signature",
			},
			sender: {
				type: "object",
				description: "The sender's signature",
				oneOf: [
					AccountSignature.ed25519,
					AccountSignature.multiEd25519,
					AccountSignature.singleKey,
					AccountSignature.multiKey,
				],
			},
			secondary_signer_addresses: {
				type: "array",
				description: "The other involved parties' addresses",
				items: {
					type: "string",
					pattern: Patterns.Aptos.address,
				},
			},
			secondary_signers: {
				type: "array",
				description: "The other involved parties' signatures",
				items: {
					type: "object",
					oneOf: [
						AccountSignature.ed25519,
						AccountSignature.multiEd25519,
						AccountSignature.singleKey,
						AccountSignature.multiKey,
					],
				},
			},
		},
	};

	export const feePayer: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "The fee payer of the transaction",
		required: [
			"type",
			"sender",
			"secondary_signer_addresses",
			"secondary_signers",
			"fee_payer_address",
			"fee_payer_signature",
		],
		properties: {
			type: {
				type: "string",
				description: "The type of the signature",
				example: "fee_payer_signature",
			},
			sender: {
				type: "object",
				description: "The sender's signature",
				oneOf: [
					AccountSignature.ed25519,
					AccountSignature.multiEd25519,
					AccountSignature.singleKey,
					AccountSignature.multiKey,
				],
			},
			secondary_signer_addresses: {
				type: "array",
				description: "The other involved parties' addresses",
				items: {
					type: "string",
					pattern: Patterns.Aptos.address,
				},
			},
			secondary_signers: {
				type: "array",
				description: "The other involved parties' signatures",
				items: {
					type: "object",
					oneOf: [
						AccountSignature.ed25519,
						AccountSignature.multiEd25519,
						AccountSignature.singleKey,
						AccountSignature.multiKey,
					],
				},
			},
			fee_payer_address: {
				type: "string",
				description: "The address of the paying party",
				pattern: Patterns.Aptos.address,
			},
			fee_payer_signature: {
				type: "object",
				description: "The signature of the fee payer",
				oneOf: [
					AccountSignature.ed25519,
					AccountSignature.multiEd25519,
					AccountSignature.singleKey,
					AccountSignature.multiKey,
				],
			},
		},
	};

	export const account: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "The signature of the transaction",
		oneOf: [
			AccountSignature.ed25519,
			AccountSignature.multiEd25519,
			AccountSignature.singleKey,
			AccountSignature.multiKey,
		],
	};
}

export const event: OpenAPIV3.SchemaObject = {
	type: "object",
	properties: {
		guid: {
			type: "object",
			properties: {
				creation_number: {
					type: "string",
					pattern: Patterns.Aptos.uint64String,
					description: "The creation number of the event",
				},
				account_address: {
					type: "string",
					description: "The account address of the event",
				},
			},
		},
		sequenceNumber: {
			type: "string",
			pattern: Patterns.Aptos.uint64String,
			description: "The sequence number of the event",
		},
		type: {
			type: "string",
			description: "The type of the event",
		},
		data: {
			type: "object",
			description: "The data of the event",
		},
	},
};

export const sequenceNumber: OpenAPIV3.SchemaObject = {
	type: "integer",
	pattern: Patterns.Aptos.uint64String,
	description: "A string containing a 64-bit unsigned integer.",
	example: 32425224034,
};

export namespace TransactionTypes {
	export const pendingTransaction: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "A transaction",
		required: [],
		properties: {
			type: {
				type: "string",
				description: "The type of the transaction",
				example: "pending_transaction",
			},
			hash: {
				type: "string",
				description: "The hash of the transaction",
			},
			sender: {
				type: "string",
				description: "The sender of the transaction. The format is a hex encoded 32 byte Aptos account address.",
			},
			sequence_number: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The sequence number of the transaction. The format is a 64-bit unsigned integer.",
			},
			max_gas_amount: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The maximum gas amount of the transaction. The format is a 64-bit unsigned integer.",
			},
			gas_unit_price: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The gas unit price of the transaction. The format is a 64-bit unsigned integer.",
			},
			expiration_timestamp_secs: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The expiration timestamp of the transaction. The format is a 64-bit unsigned integer.",
			},
			payload: {
				type: "object",
				oneOf: [Payload.entryFunction, Payload.script, Payload.moduleBundle, Payload.multisig],
			},
			signature: {
				type: "object",
				description: "The signature of the transaction",
				oneOf: [
					TransactionSignature.ed25519,
					TransactionSignature.multiEd25519,
					TransactionSignature.multiAgent,
					TransactionSignature.feePayer,
					TransactionSignature.account,
				],
			},
		},
	};

	export const userTransaction: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "A user transaction",
		required: [
			"type",
			"version",
			"hash",
			"state_change_hash",
			"event_checkpoint_hash",
			"gas_used",
			"success",
			"vm_status",
			"changes",
			"sender",
			"sequence_number",
			"max_gas_amount",
			"gas_unit_price",
			"expiration_timestamp_secs",
			"payload",
			"signature",
			"events",
			"timestamp",
		],
		properties: {
			type: {
				type: "string",
				description: "The type of the transaction",
				example: "user_transaction",
			},
			version: {
				type: "string",
				description: "The version of the transaction",
			},
			hash: {
				type: "string",
				description: "The hash of the transaction",
			},
			state_change_hash: {
				type: "string",
				description: "The state change hash of the transaction",
			},
			event_checkpoint_hash: {
				type: "string",
				description: "The event checkpoint hash of the transaction",
			},
			gas_used: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The gas used by the transaction",
			},
			success: {
				type: "boolean",
				description: "The success of the transaction",
			},
			vm_status: {
				type: "string",
				description: "The VM status of the transaction, can tell useful information in a failure",
			},
			changes: {
				type: "array",
				description: "The changes of the transaction",
				items: {
					type: "object",
					properties: {
						type: {
							type: "string",
							description: "The type of the change",
						},
						address: address,
						state_key_hash: {
							type: "string",
							description: "The state key hash.",
						},
						module: {
							type: "string",
							description: "Move module id is a string representation of Move module.",
						},
					},
				},
			},
			sender: address,
			sequence_number: sequenceNumber,
			max_gas_amount: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The maximum gas amount of the transaction. The format is a 64-bit unsigned integer.",
			},
			gas_unit_price: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The gas unit price of the transaction. The format is a 64-bit unsigned integer.",
			},
			expiration_timestamp_secs: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The expiration timestamp of the transaction. The format is a 64-bit unsigned integer.",
			},
			payload: {
				type: "object",
				oneOf: [Payload.entryFunction, Payload.script, Payload.moduleBundle, Payload.multisig],
			},
			signature: {
				type: "object",
				description: "The signature of the transaction",
				oneOf: [
					TransactionSignature.ed25519,
					TransactionSignature.multiEd25519,
					TransactionSignature.multiAgent,
					TransactionSignature.feePayer,
					TransactionSignature.account,
				],
			},
			events: {
				type: "array",
				description: "The events of the transaction",
				items: event,
			},
			timestamp: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The timestamp of the transaction",
			},
		},
	};

	export const genesisTransaction: OpenAPIV3.SchemaObject = {
		type: "object",
		description: "A genesis transaction",
		required: [
			"type",
			"version",
			"hash",
			"state_change_hash",
			"event_root_hash",
			"state_checkpoint_hash",
			"gas_used",
			"success",
			"vm_status",
			"accumulator_root_hash",
			"changes",
			"payload",
			"events",
		],
		properties: {
			type: {
				type: "string",
				description: "The type of the transaction",
				example: "genesis_transaction",
			},
			version: {
				type: "string",
				description: "The version of the transaction",
			},
			hash: {
				type: "string",
				description: "The hash of the transaction",
			},
			state_change_hash: {
				type: "string",
				description: "The state change hash of the transaction",
			},
			event_root_hash: {
				type: "string",
				description: "The event root hash of the transaction",
			},
			state_checkpoint_hash: {
				type: "string",
				description: "The state checkpoint hash of the transaction",
			},
			gas_used: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The gas used by the transaction",
			},
			success: {
				type: "boolean",
				description: "The success of the transaction",
			},
			vm_status: {
				type: "string",
				description: "The VM status of the transaction, can tell useful information in a failure",
			},
			accumulator_root_hash: {
				type: "string",
				description: "The accumulator root hash of the transaction",
			},
			changes: {
				type: "array",
				description: "The changes of the transaction",
				items: {
					type: "object",
					properties: {
						type: {
							type: "string",
							description: "The type of the change",
						},
						address: address,
						state_key_hash: {
							type: "string",
							description: "The state key hash.",
						},
						module: {
							type: "string",
							description: "Move module id is a string representation of Move module.",
						},
					},
				},
			},
			payload: {
				type: "object",
				oneOf: [Payload.entryFunction, Payload.script, Payload.moduleBundle, Payload.multisig],
			},
			events: {
				type: "array",
				description: "The events of the transaction",
				items: event,
			},
		},
	};

	export const blockMetadataTransaction: OpenAPIV3.SchemaObject = {
		type: "object",
		required: [
			"type",
			"version",
			"hash",
			"state_change_hash",
			"event_root_hash",
			"state_checkpoint_hash",
			"gas_used",
			"success",
			"vm_status",
			"accumulator_root_hash",
			"changes",
			"id",
			"epoch",
			"round",
			"events",
			"previous_block_votes_bitvec",
			"proposer",
			"failed_proposer_indices",
			"timestamp",
		],
		properties: {
			type: {
				type: "string",
				description: "The type of the transaction",
				example: "block_metadata_transaction",
			},
			version: {
				type: "string",
				description: "The version of the transaction",
			},
			hash: {
				type: "string",
				description: "The hash of the transaction",
			},
			state_change_hash: {
				type: "string",
				description: "The state change hash of the transaction",
			},
			event_root_hash: {
				type: "string",
				description: "The event root hash of the transaction",
			},
			state_checkpoint_hash: {
				type: "string",
				description: "The state checkpoint hash of the transaction",
			},
			gas_used: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The gas used by the transaction",
			},
			success: {
				type: "boolean",
				description: "The success of the transaction",
			},
			vm_status: {
				type: "string",
				description: "The VM status of the transaction, can tell useful information in a failure",
			},
			accumulator_root_hash: {
				type: "string",
				description: "The accumulator root hash of the transaction",
			},
			changes: {
				type: "array",
				description: "The changes of the transaction",
				items: {
					type: "object",
					properties: {
						type: {
							type: "string",
							description: "The type of the change",
						},
						address: address,
						state_key_hash: {
							type: "string",
							description: "The state key hash.",
						},
						module: {
							type: "string",
							description: "Move module id is a string representation of Move module.",
						},
					},
				},
			},
			id: {
				type: "string",
				description: "The ID of the transaction",
			},
			epoch: {
				type: "string",
				description: "The epoch of the transaction",
			},
			round: {
				type: "string",
				description: "The round of the transaction",
			},
			events: {
				type: "array",
				description: "The events of the transaction",
				items: event,
			},
			previous_block_votes_bitvec: {
				type: "string",
				description: "The previous block votes bitvec",
			},
			proposer: {
				type: "string",
				description: "The proposer of the transaction",
			},
			failed_proposer_indices: {
				type: "array",
				description: "The failed proposer indices",
				items: {
					type: "string",
				},
			},
			timestamp: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The timestamp of the transaction",
			},
		},
	};

	export const stateCheckpointTransaction: OpenAPIV3.SchemaObject = {
		type: "object",
		required: [
			"type",
			"version",
			"hash",
			"state_change_hash",
			"event_root_hash",
			"state_checkpoint_hash",
			"gas_used",
			"success",
			"vm_status",
			"accumulator_root_hash",
			"changes",
			"timestamp",
		],
		properties: {
			type: {
				type: "string",
				description: "The type of the transaction",
				example: "block_metadata_transaction",
			},
			version: {
				type: "string",
				description: "The version of the transaction",
			},
			hash: {
				type: "string",
				description: "The hash of the transaction",
			},
			state_change_hash: {
				type: "string",
				description: "The state change hash of the transaction",
			},
			event_root_hash: {
				type: "string",
				description: "The event root hash of the transaction",
			},
			state_checkpoint_hash: {
				type: "string",
				description: "The state checkpoint hash of the transaction",
			},
			gas_used: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The gas used by the transaction",
			},
			success: {
				type: "boolean",
				description: "The success of the transaction",
			},
			vm_status: {
				type: "string",
				description: "The VM status of the transaction, can tell useful information in a failure",
			},
			accumulator_root_hash: {
				type: "string",
				description: "The accumulator root hash of the transaction",
			},
			changes: {
				type: "array",
				description: "The changes of the transaction",
				items: {
					type: "object",
					properties: {
						type: {
							type: "string",
							description: "The type of the change",
						},
						address: address,
						state_key_hash: {
							type: "string",
							description: "The state key hash.",
						},
						module: {
							type: "string",
							description: "Move module id is a string representation of Move module.",
						},
					},
				},
			},
			timestamp: {
				type: "string",
				pattern: Patterns.Aptos.uint64String,
				description: "The timestamp of the transaction",
			},
		},
	};
}
