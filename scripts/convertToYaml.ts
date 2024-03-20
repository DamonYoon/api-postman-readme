import * as path from "path";
import { convertTsToYaml, getApiInfo } from ".";
import API_CONFIGS from "../configs/api.configs";

async function main() {
	const currentWorkingDir = process.cwd();

	// 커맨드 라인 인자로부터 받은 TypeScript 파일 경로의 유효성을 검사합니다.
	const tsFilePathInput = process.argv[2];
	const version = process.argv[3] ? process.argv[3] : API_CONFIGS.version; // 버전을 입력하지 않은 경우 기본값을 사용합니다.
	const versionPattern = /^[0-9]+\.[0-9]+\.[0-9]+$/;

	if (!tsFilePathInput) {
		console.error("Error: A TypeScript file path is required as the first argument.");
		process.exit(1);
	}

	if (!versionPattern.test(version)) {
		console.error("Error: The version must be in the format of x.x.x.");
		process.exit(1);
	}

	const tsFilePath = path.resolve(currentWorkingDir, tsFilePathInput);

	const apiInfo = await getApiInfo(tsFilePath);

	const outputDir = path.resolve(currentWorkingDir, "./docs");

	convertTsToYaml(apiInfo, outputDir, version);
}

main();
