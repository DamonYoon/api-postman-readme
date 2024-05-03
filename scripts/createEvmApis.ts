import { Patterns } from "../utils/patterns.utils";

function validateInputs(versionInput?: string): string {
	if (!versionInput) {
		throw new Error("Error: A version is required as the second argument.");
	}

	if (!Patterns.readmeDocsVersion.test(versionInput)) {
		throw new Error("The version must be in the format of x.x.x.");
	}

	return versionInput;
}

async function main() {
	try {
		const versionInput = validateInputs(process.argv[2]);

		console.log(`✅ Successfully created API specifications for version ${versionInput}! Total Count: `);
	} catch (error: any) {
		if (error.response) {
			console.error("API Error Response Data:", error.response.data);
		}
		console.error("Error deleting API specifications:", error.message);
	}
}

main();
