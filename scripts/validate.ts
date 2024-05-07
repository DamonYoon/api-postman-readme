import * as path from "path";
import { Patterns } from "../utils/patterns.utils";
import Readme from "../utils/readme.utils";

function validateInputs(yamlFilePathInput?: string): [string] {
	if (!yamlFilePathInput) {
		throw new Error("Error: A '.yaml' file path is required as the first argument.");
	}

	return [yamlFilePathInput];
}

async function main() {
	try {
		const currentWorkingDir = process.cwd();
		const [yamlFilePathInput] = validateInputs(...process.argv.slice(2));

		const yamlFilePath = path.resolve(currentWorkingDir, yamlFilePathInput);

		await Readme.validateSpecification({
			filePath: yamlFilePath,
		});

		console.log(`✅ Valid API Spec!`);
	} catch (error: any) {
		if (error.response) {
			console.error("API Error Response Data:", error.response.data);
		}
		console.error("Error: Invalid API Spec, ", error.message);
	}
}

main();
