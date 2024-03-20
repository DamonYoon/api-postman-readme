import * as path from "path";
import { convertTsToYaml, getApiDefinition, updateToReadme } from ".";
import dotenv from "dotenv";
dotenv.config();

async function main() {
	try {
		const currentWorkingDir = process.cwd();

		// 커맨드 라인 인자로부터 받은 TypeScript 파일 경로의 유효성을 검사합니다.
		const tsFilePathInput = process.argv[2];
		if (!tsFilePathInput) {
			console.error("Error: A TypeScript file path must be provided as an argument.");
			process.exit(1);
		}
		const tsFilePath = path.resolve(currentWorkingDir, tsFilePathInput);

		const tsData = await getApiDefinition(tsFilePath);

		// 출력 디렉토리를 설정합니다. 입력되지 않은 경우 기본값 "./docs"를 사용합니다.
		const outputDir = process.argv[3]
			? path.resolve(currentWorkingDir, process.argv[3])
			: path.resolve(currentWorkingDir, "./docs");

		const outputPath = await convertTsToYaml(tsData, tsFilePath, outputDir);
		await updateToReadme(outputPath, tsData.id);
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
