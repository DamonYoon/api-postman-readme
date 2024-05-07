import * as path from "path";
import { convertTsToYaml, getOasDocs } from "../utils/helpers.utils";
import { Patterns } from "../utils/patterns.utils";
import { supportedProtocols } from "../apis/nodeAPI/evm";

function validateInputs(
	tsFilePathInput?: string,
	versionInput?: string,
	protocolInput?: string
): [string, string, string | undefined] {
	if (!tsFilePathInput) {
		throw new Error("Error: A TypeScript file path is required as the first argument.");
	}

	if (!versionInput) {
		throw new Error("Error: A version is required as the second argument.");
	}

	if (!Patterns.readmeDocsVersion.test(versionInput)) {
		throw new Error("Error: The version must be 'main' or in the format of x.x.x.");
	}

	const isEvmApis = tsFilePathInput.includes("evm");
	if (isEvmApis) {
		if (!protocolInput) throw new Error("Error: A protocol is required as the third argument for EVM API");

		if (!supportedProtocols.includes(protocolInput)) {
			throw new Error(`Error: ${protocolInput} is not supported. `);
		}
	}

	return [tsFilePathInput, versionInput, protocolInput];
}

async function main() {
	try {
		const currentWorkingDir = process.cwd();
		const [tsFilePathInput, versionInput, protocolInput] = validateInputs(...process.argv.slice(2));
		const tsFilePath = path.resolve(currentWorkingDir, tsFilePathInput);
		const outputDir = path.resolve(currentWorkingDir, "./docs");

		const oasDocs = await getOasDocs(tsFilePath, versionInput, protocolInput);
		await convertTsToYaml(oasDocs, versionInput, outputDir, tsFilePath);
		console.log("API documentation has been successfully generated.");
	} catch (err) {
		if (err instanceof Error) {
			console.error("Error processing the file:", err.message);
		} else {
			console.error("An unknown error occurred:", err);
		}
		process.exit(1);
	}
}

main();
