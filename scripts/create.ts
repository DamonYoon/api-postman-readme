import fs from "fs";
import { exec } from "child_process";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// 커맨드 라인으로부터 경로와 버전을 받음
const [filePath, version] = process.argv.slice(2);

if (!filePath || !version) {
  console.error("Should provide both a folder path and a version");
  process.exit(1);
}

// 파일명 추출
const fileName = path.basename(filePath);

// 결과를 저장할 텍스트 파일명 생성
const resultFilePath = `id-${fileName}.txt`;
fs.writeFileSync(`./ids/${resultFilePath}`, '', 'utf-8'); // 초기 내용을 비워서 파일 생성

// YAML 파일 경로 설정
const yamlFilePath = "./.github/workflows/rdme-v0-0-3.yml";

// exec 함수를 Promise로 감싸는 함수
const execPromise = (command) => new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(stdout);
  });
});

// 각 파일을 처리하는 함수
const processFile = async (fileName) => {
  const command = `npx rdme openapi --create ${filePath} --version ${version}`;

  try {
    const stdout = await execPromise(command);
    // ID 추출 로직
    const idMatch = stdout.match(/--id=(\w+)/);
    if (idMatch && idMatch[1]) {
      const id = idMatch[1];

      // 결과 파일에 추가
      const resultLine = `${filePath}: ${id}\n`;
      fs.appendFileSync(`./ids/${resultFilePath}`, resultLine, 'utf-8');
      console.log(`✅ Added to yaml file: ${resultLine}`);
    }
  } catch (error) {
    console.error(`❗️ Error executing command for file ${fileName}: ${error}`);
  }
};

// 메인 함수
const main = async () => {
  processFile(fileName).catch(error => console.error(`❗️ Error: ${error}`))
};

main();
