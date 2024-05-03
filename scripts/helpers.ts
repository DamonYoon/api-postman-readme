import * as yaml from "js-yaml";
import * as path from "path";
import * as fs from "fs/promises";
import { exec } from "child_process";
import dotenv from "dotenv";
import { MAIN_VERSION, README_CONFIGS } from "../configs/readme.config";
import { OpenAPIV3 } from "openapi-types";
dotenv.config();

export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Processes items in batches, awaiting completion of one batch before starting the next.
 * @param items - The items to process.
 * @param callback - The callback function to process each item.
 * @param batchSize - The number of items to process in each batch.
 * @param delay - The delay in milliseconds between batches.
 * @returns {Promise<void>}
 */
export async function batchProcess<T>({
	items,
	callback,
	batchSize,
	delay,
}: {
	items: T[];
	callback: (item: T) => Promise<void>;
	batchSize: number;
	delay: number;
}): Promise<void> {
	let index = 0;

	while (index < items.length) {
		const batch = items.slice(index, index + batchSize);

		// Promise.allSettled를 사용하여 배치 내 모든 작업이 완료될 때까지 기다림
		await Promise.allSettled(
			batch.map((item) =>
				callback(item).catch((error) => {
					if (error.response) {
						console.error("API Error Response Data:", error.response.data);
					}
					console.error("Error deleting API specifications:", error.message);
				})
			)
		);

		index += batchSize;
		console.log(`Processed batch up to index ${index} of ${items.length}`);

		// 마지막 배치가 아니라면 딜레이를 적용
		if (index < items.length) {
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}
}

export async function getOasDocs(tsFilePath: string, version: string, protocol?: string): Promise<OpenAPIV3.Document> {
	if (!tsFilePath.endsWith(".ts")) {
		throw new Error("A valid TypeScript file path with a .ts extension must be provided as an argument.");
	}

	const module = await require(tsFilePath);
	let oasDocs: OpenAPIV3.Document;
	const isEvmApis = tsFilePath.includes("evm");

	if (isEvmApis) {
		oasDocs = module.default({
			protocol: protocol,
			version: version,
		});
	} else {
		oasDocs = module.default({
			version: version,
		});
	}
	return oasDocs;
}

export async function convertTsToYaml(
	oasDocs: OpenAPIV3.Document,
	version: string,
	outputDir: string,
	tsFilePath: string
) {
	try {
		const yamlData = yaml.dump({ ...oasDocs }); // yaml로 변환

		const fileName = path.basename(tsFilePath).split(".")[0];
		const folderName = path.basename(path.dirname(tsFilePath));
		const outputDirPath = path.join(outputDir, `v${version}`);

		// if output directory does not exist, create it
		await fs.mkdir(outputDirPath, { recursive: true });

		const nowDate = new Date().toISOString().split("T")[0];
		const nowDateYYYYMMDD = nowDate ? nowDate.replace(/-/g, "") : "UnknownDate";
		// const timestamp = Math.floor(new Date().getTime() / 1000); // Unix timestamp in seconds

		let baseFileName = `${nowDateYYYYMMDD}_${folderName}`;

		if (path.dirname(tsFilePath).includes("evm")) {
			baseFileName = `${nowDateYYYYMMDD}_${oasDocs.info.title.split("-")[0]}_${fileName}`;
		}

		const outputPath = path.join(outputDirPath, `${baseFileName}.yaml`);

		await fs.writeFile(outputPath, yamlData, "utf8");
		console.log(`${outputPath} file created successfully`);

		return outputPath;
	} catch (err) {
		// 에러 객체가 Error 인스턴스인지 확인
		if (err instanceof Error) {
			console.error("Error processing the file:", err.message);
		} else {
			// 알 수 없는 타입의 에러 처리
			console.error("An unknown error occurred.");
		}
		process.exit(1);
	}
}

export async function updateToReadme(docsPath: string, id: string) {
	// 환경 변수를 통한 인증 정보 확인
	const apiKey = process.env.README_API_KEY;
	if (!apiKey) {
		console.error("Error: README_API_KEY environment variable is not set.");
		process.exit(1);
	}

	// 입력 인자 유효성 검사
	if (!docsPath || !id || !/^[0-9a-fA-F]{24}$/.test(id)) {
		console.error("Usage: npm run update-api -- <docs path> <id (24 hex characters)>");
		process.exit(1);
	}

	const command = `npx rdme openapi --update ${path.resolve(docsPath)} --id ${id} --key ${apiKey}`;

	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error.message}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		if (stderr) {
			console.error(`stderr: ${stderr}`);
		}
	});
}

export function findApiDefinitionId(version: string, title: string): string {
	const apiDefinition = README_CONFIGS.find((config) => config.version === version)?.apiDefinitions.find(
		(config) => config.title === title
	);

	if (!apiDefinition) {
		throw new Error("Version not found in README_CONFIGS. Please check the version or config file.");
	}

	return apiDefinition.id;
}
