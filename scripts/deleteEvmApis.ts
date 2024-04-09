import { batchProcess } from ".";
import { README_CONFIGS, MAIN_API_CONFIGS } from "../configs/readme.config";
import { ApiDefinition, ReadmeApiSpec } from "../types";
import Readme from "./readme";

const versionPattern = /^(main|\d+\.\d+\.\d+)$/;
const batchSize = 10;
const delay = 500;

function validateInputs(versionInput?: string): string {
	if (!versionInput) {
		throw new Error("Error: A version is required as the second argument.");
	}

	if (versionInput === "main" || versionInput === MAIN_API_CONFIGS.version) {
		throw new Error("The main version cannot be deleted.");
	}

	if (!versionPattern.test(versionInput)) {
		throw new Error("The version must be in the format of x.x.x.");
	}

	return versionInput;
}

async function getAllApiSpecs({
	page = 1,
	perPage = 100,
	version,
	allSpecs = [],
}: {
	page?: number;
	perPage?: number;
	version: string;
	allSpecs: ReadmeApiSpec[];
}): Promise<ReadmeApiSpec[]> {
	const specs = await Readme.getMetadata({ page, perPage, version });
	allSpecs.push(...specs);

	console.log(`[Page ${page}] Fetched ${specs.length} API specifications. Total: ${allSpecs.length}`);
	// 'nextPage'가 있다면 재귀적으로 다음 페이지 데이터를 불러옴
	if (specs.length > 0) {
		return getAllApiSpecs({ page: page + 1, perPage: 100, version, allSpecs });
	} else {
		return allSpecs; // 모든 데이터를 불러왔으므로 반환
	}
}

function getExcludedApis(version: string): ApiDefinition[] {
	if (!version) throw Error("Version not found");

	const apiConfig = README_CONFIGS.find((config) => config.version === version);
	if (apiConfig === undefined) throw Error("API definitions not found");

	return apiConfig.apiDefinitions;
}

async function main() {
	try {
		const versionInput = validateInputs(process.argv[2]);

		const apiSpecs = await getAllApiSpecs({ page: 1, perPage: 100, version: versionInput, allSpecs: [] });
		const excludeApiTitles = getExcludedApis(versionInput);
		const targeApiSpecs = apiSpecs.filter(
			(spec) => !excludeApiTitles.some((exclude) => exclude.title === spec.title || exclude.id === spec.id)
		);
		console.log(
			`Deleting API specifications for version ${versionInput}... To be deleted Total Count: ${targeApiSpecs.length}`
		);

		await batchProcess({
			items: targeApiSpecs,
			callback: Readme.deleteApiSpec,
			batchSize,
			delay,
		});

		// await Promise.allSettled(
		// 	targeApiSpecs.map((spec) =>
		// 		Readme.deleteApiSpec(spec).catch((error) => {
		// 			console.error("Error deleting API specification:", error);
		// 		})
		// 	)
		// );

		console.log(
			`✅ Successfully deleted API specifications for version ${versionInput}! Deleted Total Count: ${targeApiSpecs.length}`
		);
	} catch (error: any) {
		if (error.response) {
			console.error("API Error Response Data:", error.response.data);
		}
		console.error("Error deleting API specifications:", error.message);
	}
}

main();
