export const Patterns = {
	// Date
	iso8601: "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\\.[0-9]{1,3})?Z$", // ISO 8601 날짜 문자열
	yyyymmdd: "^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$", // YYYY-MM-DD 형식의 날짜 문자열
	yyyymmddhh: "^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-([01][0-9]|2[0-3])$", // YYYY-MM-DD-HH 형식의 날짜 문자열

	// String
	hexaDecimal: "^0[xX][0-9a-fA-F]+$", // 0x로 시작하는 16진수 문자열
	decimalString: "^[0-9]+$", // 10진수 문자열

	// Ethereum
	ethereumAddress: "^0[xX][0-9a-fA-F]{40}$", // 0x로 시작하는 40자리 16진수 문자열
	blockHash: "^0[xX][0-9a-fA-F]{64}$", // 0x로 시작하는 64자리 16진수 문자열
	blockTag: "^(latest|earliest)$", // pending, latest, earliest
	blockNumber: "^[0-9]+$", // 10진수 문자열
	txHash: "^0[xX][0-9a-fA-F]{64}$", // 0x로 시작하는 64자리 16진수 문자열

	// Pagination
	page: "^(?:[1-9][0-9]?|100)$", //	1 이상 100 이하의 숫자
	rpp: "^(?:[1-9][0-9]{0,2}?|1000)$", // 1 이상 1000 이하의 숫자
};
