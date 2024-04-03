import * as path from "path";
import { convertTsToYaml, getApiInfo, updateToReadme } from ".";
import { README_CONFIGS } from "../configs/readme.config";

const versionPattern = /^(main|\d+\.\d+\.\d+)$/;

function validateInputs(tsFilePathInput?: string, versionInput?: string): [string, string] {
	if (!tsFilePathInput) {
		throw new Error("A TypeScript file path is required as the first argument.");
	}

	if (!versionInput) {
		throw new Error("A version is required as the second argument.");
	}

	if (!versionPattern.test(versionInput)) {
		throw new Error("The version must be 'main' or in the format of x.x.x.");
	}

	return [tsFilePathInput, versionInput];
}

function findApiDefinitionId(version: string, title: string): string {
	const apiDefinition = README_CONFIGS.find((config) => config.version === version)?.apiDefinitions.find(
		(config) => config.title === title
	);

	if (!apiDefinition) {
		throw new Error("Version not found in README_CONFIGS. Please check the version or config file.");
	}

	return apiDefinition.id;
}

async function main() {
	try {
		const currentWorkingDir = process.cwd();
		const [tsFilePathInput, version] = validateInputs(process.argv[2], process.argv[3]);

		const tsFilePath = path.resolve(currentWorkingDir, tsFilePathInput);
		const apiInfo = await getApiInfo(tsFilePath);

		const outputDir = path.resolve(currentWorkingDir, "./docs");
		const outputPath = await convertTsToYaml(apiInfo, version, outputDir, tsFilePath);

		const apiDefinitionId = findApiDefinitionId(version, apiInfo.title);
		await updateToReadme(outputPath, apiDefinitionId);

		console.log("Documentation has been successfully updated.");
	} catch (error) {
		console.error(`Error: ${error instanceof Error ? error.message : "An unknown error occurred."}`);
		process.exit(1);
	}
}

main();
