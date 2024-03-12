export const Patterns = {
	// Common
	hexaDecimal: "^0[xX][0-9a-fA-F]+$",
	decimalString: "^[0-9]+$",

	// Ethereum
	ethereumAddress: "^0[xX][0-9a-fA-F]{40}$",
	blockHash: "^0[xX][0-9a-fA-F]{64}$",
	blockTag: "^(pending|latest|earliest)$",
	txHash: "^0[xX][0-9a-fA-F]{64}$",

	// Pagination
	page: "^(?:[1-9][0-9]?|100)$",
	rpp: "^(?:[1-9][0-9]{0,2}?|1000)$",
};
