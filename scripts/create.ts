import * as path from "path";
import { Patterns } from "../utils/patterns.utils";
import Readme from "../utils/readme.utils";

function validateInputs(yamlFilePathInput?: string, versionInput?: string): [string, string] {
	if (!yamlFilePathInput) {
		throw new Error("Error: A '.yaml' file path is required as the first argument.");
	}

	if (!versionInput) {
		throw new Error("Error: A unique ID for API is required as the second argument.");
	}

	if (!Patterns.readmeDocsVersion.test(versionInput)) {
		throw new Error("Error: The version must be 'main' or in the format of x.x.x.");
	}

	return [yamlFilePathInput, versionInput];
}

async function main() {
	try {
		const currentWorkingDir = process.cwd();
		const [yamlFilePathInput, versionInput] = validateInputs(...process.argv.slice(2));

		const yamlFilePath = path.resolve(currentWorkingDir, yamlFilePathInput);

		const result = await Readme.uploadSpecification({
			filePath: yamlFilePath,
			version: versionInput,
		});

		console.log(result);
		console.log(`✅ Successfully created API specification  (ID: ${result._id})!`);
	} catch (error: any) {
		if (error.response) {
			console.error("API Error Response Data:", error.response.data);
		}
		console.error("Error Creating API specifications:", error.message);
	}
}

main();
