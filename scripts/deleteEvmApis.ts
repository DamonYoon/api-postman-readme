import { batchProcess, createSlugFromTitle } from "../utils/helpers.utils";
import { README_CONFIGS, MAIN_VERSION } from "../configs/readme.config";
import { ApiDefinition, ReadmeApiSpec } from "../types";
import { Patterns } from "../utils/patterns.utils";
import Readme from "../utils/readme.utils";
import { SupportedProtocols, supportedProtocols } from "../apis/nodeAPI/evm";

const batchSize = 10;
const delay = 500;

function validateInputs(versionInput?: string, protocolInput?: SupportedProtocols): [string, SupportedProtocols] {
	if (!versionInput) {
		throw new Error("Error: A version is required as the first argument.");
	}

	if (versionInput === "main" || versionInput === MAIN_VERSION) {
		throw new Error("The main version cannot be deleted.");
	}

	if (!Patterns.readmeDocsVersion.test(versionInput)) {
		throw new Error("The version must be in the format of x.x.x.");
	}

	if (!protocolInput) {
		throw new Error("Error: A protocol is required as the second argument.");
	}

	if (protocolInput !== "all" && !supportedProtocols.includes(protocolInput)) {
		throw new Error("Error: Only supported protocol is allowed.");
	}

	return [versionInput, protocolInput];
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
		const [versionInput, protocolInput] = validateInputs(...process.argv.slice(2));

		const apiSpecs = await getAllApiSpecs({ page: 1, perPage: 100, version: versionInput, allSpecs: [] });
		const excludeApiTitles = getExcludedApis(versionInput);

		const excludeIds = new Set(excludeApiTitles.map((exclude) => exclude.id));
		const excludeTitles = new Set(excludeApiTitles.map((exclude) => exclude.title));

		const targetApiSpecs = apiSpecs
			.filter((spec) => !(excludeIds.has(spec.id) || excludeTitles.has(spec.title)))
			.filter((spec) => protocolInput === "all" || spec.title.split("-")[0]?.includes(protocolInput));

		console.log(
			`Deleting API specifications for version ${versionInput}... To be deleted Total Count: ${targetApiSpecs.length}`
		);

		// /** Deleting without delay: 삭제 도중에 계속 에러 발생함 */
		// await Promise.allSettled(
		// 	targetApiSpecs.map((spec) =>
		// 		Promise.all([
		// 			Readme.deleteApiSpec(spec),
		// 			Readme.deleteCategory({ slug: createSlugFromTitle(spec.title), version: versionInput }),
		// 		])
		// 	)
		// );

		/** Deleting with delay: 여전히 에러 발생하지만, 수가 더 적음 */
		await batchProcess({
			items: targetApiSpecs,
			callback: async (items) => {
				await Readme.deleteApiSpec(items);
				await Readme.deleteCategory({ slug: createSlugFromTitle(items.title), version: versionInput });
			},
			batchSize,
			delay,
		});

		console.log(
			`✅ Successfully deleted API specifications for version ${versionInput}! Deleted Total Count: ${targetApiSpecs.length}`
		);
	} catch (error: any) {
		if (error.response) {
			console.error("API Error Response Data:", error.response.data);
		}
		console.error("Error deleting API specifications:", error.message);
	}
}

main();
