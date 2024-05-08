import * as path from "path";
import { convertTsToYaml, findApiDefinitionId, getOasDocs } from "../utils/helpers.utils";
import { Patterns } from "../utils/patterns.utils";
import { supportedMethodsForProtocol } from "../apis/nodeAPI/evm";
import Readme from "../utils/readme.utils";

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

		const supportedNetworks = Object.keys(supportedMethodsForProtocol);
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

		const apiDefinitionId = await findApiDefinitionId(versionInput, oasDocs.info.title);

		const result = await Readme.updateSpecification({
			filePath: outputPath,
			id: apiDefinitionId,
		});

		console.log(result);

		console.log(`✅ Successfully update API specification  (ID: ${result._id})!`);
	} catch (error) {
		console.error(`Error: ${error instanceof Error ? error.message : "An unknown error occurred."}`);
		process.exit(1);
	}
}

main();
