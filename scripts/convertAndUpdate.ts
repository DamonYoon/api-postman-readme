import * as path from "path";
import { convertTsToYaml, findApiDefinitionId, getOasDocs, updateToReadme } from "./helpers";
import { Patterns } from "../utils/patterns.utils";
import { supportedMethods } from "../apis/nodeAPI/evm";

function validateInputs(
	tsFilePathInput?: string,
	versionInput?: string,
	protocolInput?: string
): [string, string, string | undefined] {
	if (!tsFilePathInput) {
		throw new Error("Error: A TypeScript file path and version are required as the first and second arguments.");
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

		const supportedNetworks = Object.keys(supportedMethods);
		if (!supportedNetworks.includes(protocolInput)) {
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

		const oasDocs = await getOasDocs(tsFilePath, versionInput, protocolInput);

		const outputDir = path.resolve(currentWorkingDir, "./docs");
		const outputPath = await convertTsToYaml(oasDocs, versionInput, outputDir, tsFilePath);

		const apiDefinitionId = findApiDefinitionId(versionInput, oasDocs.info.title);
		await updateToReadme(outputPath, apiDefinitionId);

		console.log("Documentation has been successfully updated.");
	} catch (error) {
		console.error(`Error: ${error instanceof Error ? error.message : "An unknown error occurred."}`);
		process.exit(1);
	}
}

main();
