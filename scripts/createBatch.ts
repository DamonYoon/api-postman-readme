import fs from "fs";
import { exec } from "child_process";
import path from "path";
import dotenv from "dotenv";
import yaml from "js-yaml"; // YAML 파싱을 위한 라이브러리 추가
dotenv.config();

const [folderPath, version] = process.argv.slice(2);

if (!folderPath || !version) {
	console.error("Should provide both a folder path and a version");
	process.exit(1);
}

const folderName = path.basename(folderPath);
const idResultFilePath = `id-${folderName}.txt`;
fs.writeFileSync(`./ids/${idResultFilePath}`, "", "utf-8");
const slugResultFilePath = `slug-${folderName}.txt`;
fs.writeFileSync(`./slugs/${slugResultFilePath}`, "", "utf-8");

const execPromise = (command) =>
	new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(stdout);
		});
	});

const processFile = async (filePath) => {
	const file = path.basename(filePath);
	const yamlData = fs.readFileSync(filePath, "utf-8"); // filePath로 변경하여 실제 처리 대상 파일의 내용을 읽음

	// YAML 파일에서 title 추출
	const doc = yaml.load(yamlData);
	if (doc && doc.info && doc.info.title) {
		const title = doc.info.title.toLowerCase();
		// 변환된 title 값을 저장할 파일 경로 설정
		const slugFilePath = `./slugs/slug-${file.replace(".yaml", "").replace(".yml", "")}.txt`;
		fs.appendFileSync(`./slugs/${slugResultFilePath}`, `${title}\n`, "utf-8");
		console.log(`Title for ${file} saved to ${slugResultFilePath}`);
	} else {
		console.log(`No title found in ${file}`);
		return;
	}

	const command = `npx rdme openapi --create ${filePath} --version ${version}`;

	try {
		const stdout = await execPromise(command);
		const idMatch = stdout.match(/--id=(\w+)/);
		if (idMatch && idMatch[1]) {
			const id = idMatch[1];
			const createdId = `${id}\n`;
			fs.appendFileSync(`./ids/${idResultFilePath}`, createdId, "utf-8");
			console.log(`✅ Added to yaml file: ${createdId}`);
		}
	} catch (error) {
		console.error(`❗️ Error executing command for file ${file}: ${error}`);
	}
};

const processDirectory = async (directoryPath) => {
	const items = fs.readdirSync(directoryPath);
	for (const item of items) {
		const fullPath = path.join(directoryPath, item);
		if (fs.statSync(fullPath).isDirectory()) {
			await processDirectory(fullPath); // 재귀적으로 하위 폴더 처리
		} else if (fullPath.endsWith(".yaml") || fullPath.endsWith(".yml")) {
			await processFile(fullPath);
		}
	}
};

const main = async () => {
	try {
		await processDirectory(folderPath);
	} catch (error) {
		console.error(`❗️ Error: ${error}`);
	}
};

main();
