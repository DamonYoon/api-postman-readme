import * as yaml from "js-yaml";
import * as path from "path";
import * as fs from "fs/promises";
import { exec } from "child_process";
import { ApiDefinition } from "../types";
import dotenv from "dotenv";
dotenv.config();

export async function getApiDefinition(tsFilePath: string): Promise<ApiDefinition> {
	if (!tsFilePath.endsWith(".ts")) {
		throw new Error("A valid TypeScript file path with a .ts extension must be provided as an argument.");
	}
	const module = await require(tsFilePath);
	const tsData: ApiDefinition = module.default;
	return tsData;
}

export async function convertTsToYaml(tsData: ApiDefinition, tsFilePath: string, outputDir: string = "./docs") {
	try {
		const yamlData = yaml.dump(tsData); // yaml로 변환

		const baseFileName = tsData.fileName || path.basename(tsFilePath, path.extname(tsFilePath));
		const outputPath = path.join(outputDir, `${baseFileName}.yaml`);

		await fs.writeFile(outputPath, yamlData, "utf8");
		console.log(`${outputPath} file created successfully`);
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
	const apiKey = process.env.RDME_API_KEY;
	if (!apiKey) {
		console.error("Error: RDME_API_KEY environment variable is not set.");
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
