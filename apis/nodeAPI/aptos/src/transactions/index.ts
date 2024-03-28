import { OpenAPIV3 } from "openapi-types";
import getTransactions from "./getTransactions";
import submitTransaction from "./submitTransaction";
import getTransactionByHash from "./getTransactionByHash";
import getTransactionByVersion from "./getTransactionByVersion";
import getAccountTransactions from "./getAccountTransactions";
import submitBatchTransactions from "./submitBatchTransactions";
import simulateTransaction from "./simulateTransaction";
import encodeSubmission from "./encodeSubmission";
import estimateGasPrice from "./estimateGasPrice";

const TRANSACTIONS = "transactions";

const paths: OpenAPIV3.PathsObject = {
	[`/${TRANSACTIONS}`]: {
		...getTransactions,
		...submitTransaction,
	},
	[`/${TRANSACTIONS}/by_hash/{txn_hash}`]: getTransactionByHash,
	[`/${TRANSACTIONS}/by_version/{txn_version}`]: getTransactionByVersion,
	// [`/accounts/{address}/transactions`]: getAccountTransactions,
	// [`/${TRANSACTIONS}/batch`]: submitBatchTransactions,
	// [`/${TRANSACTIONS}/simulate`]: simulateTransaction,
	// [`/${TRANSACTIONS}/encode_submission`]: encodeSubmission,
	// [`/${TRANSACTIONS}/estimate_gas_price`]: estimateGasPrice,
};

export default paths;
