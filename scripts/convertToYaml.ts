import * as path from "path";
import { convertTsToYaml, getApiInfo } from ".";

const versionPattern = /^(main|\d+\.\d+\.\d+)$/;

function validateInputs(tsFilePathInput?: string, versionInput?: string): [string, string] {
	if (!tsFilePathInput) {
		throw new Error("Error: A TypeScript file path and version are required as the first and second arguments.");
	}

	if (!versionInput) {
		throw new Error("Error: A version is required as the second argument.");
	}

	if (!versionPattern.test(versionInput)) {
		throw new Error("The version must be 'main' or in the format of x.x.x.");
	}

	return [tsFilePathInput, versionInput];
}

async function main() {
	try {
		const currentWorkingDir = process.cwd();
		const [tsFilePathInput, versionInput] = validateInputs(process.argv[2], process.argv[3]);

		const tsFilePath = path.resolve(currentWorkingDir, tsFilePathInput);
		const apiInfo = await getApiInfo(tsFilePath);
		const outputDir = path.resolve(currentWorkingDir, "./docs");

		await convertTsToYaml(apiInfo, versionInput, outputDir);
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
