import * as path from "path";
import { Patterns } from "../utils/patterns.utils";
import Readme from "../utils/readme.utils";

function validateInputs(yamlFilePathInput?: string, idInput?: string): [string, string] {
	if (!yamlFilePathInput) {
		throw new Error("Error: A '.yaml' file path is required as the first argument.");
	}

	if (!idInput) {
		throw new Error("Error: A unique ID for API is required as the second argument.");
	}

	if (!Patterns.readmeDocsId.test(idInput)) {
		throw new Error("Error: A unique ID for the API must be formatted as a 24-character hexadecimal string.");
	}

	return [yamlFilePathInput, idInput];
}

async function main() {
	try {
		const currentWorkingDir = process.cwd();
		const [yamlFilePathInput, idInput] = validateInputs(...process.argv.slice(2));

		const yamlFilePath = path.resolve(currentWorkingDir, yamlFilePathInput);

		const result = await Readme.updateSpecification({
			filePath: yamlFilePath,
			id: idInput,
		});

		console.log(result);

		console.log(`✅ Successfully update API specification  (ID: ${idInput})!`);
	} catch (error: any) {
		if (error.response) {
			console.error("API Error Response Data:", error.response.data);
		}
		console.error("Error updating API specifications:", error.message);
	}
}

main();
