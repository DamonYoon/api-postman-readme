import * as yaml from "js-yaml";
import * as path from "path";
import * as fs from "fs/promises";
import { exec } from "child_process";
import dotenv from "dotenv";
import { ApiInfo } from "../types";
import { MAIN_API_CONFIGS, README_CONFIGS } from "../configs/readme.config";
dotenv.config();

export function getMainVersionAndId(title: string) {
	const { version } = MAIN_API_CONFIGS;
	const apiConfig = README_CONFIGS.find((config) => config.version === version)?.apiDefinitions.find(
		(config) => config.title === title
	);
	if (!apiConfig) {
		throw new Error("API definitions not found. Please check the version or title of the API.");
	}
	const { id } = apiConfig;

	return { version, id };
}

export async function getApiInfo(tsFilePath: string): Promise<ApiInfo> {
	if (!tsFilePath.endsWith(".ts")) {
		throw new Error("A valid TypeScript file path with a .ts extension must be provided as an argument.");
	}
	const module = await require(tsFilePath);
	const apiInfo = module.default;
	return apiInfo;
}

export async function convertTsToYaml(apiInfo: ApiInfo, version: string, outputDir: string) {
	try {
		const effectiveVersion = version === "main" ? MAIN_API_CONFIGS.version : version;

		apiInfo.oasDocs.info.version = effectiveVersion;

		const yamlData = yaml.dump({ ...apiInfo.oasDocs }); // yaml로 변환

		const outputDirPath = path.join(outputDir, `v${version}`);

		// if output directory does not exist, create it
		await fs.mkdir(outputDirPath, { recursive: true });

		const nowDate = new Date().toISOString().split("T")[0];
		const nowDateYYYYMMDD = nowDate ? nowDate.replace(/-/g, "") : "UnknownDate";

		const baseFileName = `${nowDateYYYYMMDD}_${apiInfo.title.replace(/ /g, "_")}`;

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
