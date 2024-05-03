export const Patterns = {
	// Readme Docs Version
	readmeDocsVersion: /^(main|\d+\.\d+\.\d+)$/,

	// ISO
	iso4217: "^[A-Z]{3}$", // ISO 4217 통화코드
	iso8601: "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\\.[0-9]{1,3})?Z$", // ISO 8601 날짜 문자열

	// Date
	yyyymmdd: "^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$", // YYYY-MM-DD 형식의 날짜 문자열
	yyyymmddhh: "^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-([01][0-9]|2[0-3])$", // YYYY-MM-DD-HH 형식의 날짜 문자열

	// String
	decimalString: "^[0-9]+$", // 10진수 문자열
	decimalStringLength: (length: number) => `^[0-9]{${length}}$`, // 10진수 문자열
	hexaDecimal: "^0[xX][0-9a-fA-F]+$", // 0x로 시작하는 16진수 문자열
	hexaDecimalLength: (length: number) => `^0[xX][0-9a-fA-F]{${length}}$`,
	percentage: "^[0-9]+(?:\\.[0-9]+)?%$", // 10진수 문자열 또는 소수점을 포함하는 문자열

	// Ethereum
	ethereumAddress: "^0[xX][0-9a-fA-F]{40}$", // 0x로 시작하는 40자리 16진수 문자열
	blockTag: "^(latest|earliest)$", // pending, latest, earliest
	transactionHash: "^0[xX][0-9a-fA-F]{64}$", // 0x로 시작하는 64자리 16진수 문자열
	eventType: "^(newHeads|logs|newPendingTransactions|syncing)$",

	// Pagination
	page: "^(?:[1-9][0-9]?|100)$", //	1 이상 100 이하의 숫자
	rpp: "^(?:[1-9][0-9]{0,2}?|1000)$", // 1 이상 1000 이하의 숫자

	// Aptos
	Aptos: {
		address: "^0[xX]?[0-9a-fA-F]{0,64}$", // 0x로 시작하는 최대 64자리 16진수 문자열, 0x는 생략 가능
		resourceType: "^0x[0-9a-zA-Z:_<>]+$",
		primitiveType: "^(bool|u8|u64|u128|address|signer|vector<.+>|0x[0-9a-zA-Z:_<, >]+)$",
		byte32HexaDecimal: "^0[xX][0-9a-fA-F]{64}$",
		uint32String: "^[0-9]{1,10}$",
		uint64String: "^[0-9]{1,20}$",
		hexaDecimalWithPrefix: "^0[xX][0-9a-fA-F]{64}$",
		hexaDecimalWithoutPrefix: "^[0-9a-fA-F]{64}$",
	},
};
