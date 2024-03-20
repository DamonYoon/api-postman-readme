import * as path from "path";
import { convertTsToYaml, getApiInfo, updateToReadme } from ".";
import dotenv from "dotenv";
import API_CONFIGS from "../configs/api.configs";
import { README_CONFIGS } from "../configs/readme.config";
dotenv.config();

async function main() {
	try {
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

		// 입력한 버전이 현재 버전과 다른 경우, README_CONFIGS에서 해당 버전의 API 정의를 찾아서 id를 변경합니다.
		let id: string = apiInfo.id;
		if (version !== API_CONFIGS.version) {
			const versionId = README_CONFIGS.find((config) => config.version === version)?.apiDefinitions.find(
				(config) => config.title === apiInfo.title
			)?.id;
			if (!versionId) {
				throw new Error("Error: API version not found. Please check the version and title of the API.");
			}
			id = versionId;
		}

		const outputDir = path.resolve(currentWorkingDir, "./docs");
		const outputPath = await convertTsToYaml(apiInfo, outputDir, version);
		await updateToReadme(outputPath, id);
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

main();
