import fs from 'fs';
import fetch from 'node-fetch'; // node-fetch 라이브러리를 사용
import dotenv from 'dotenv';
dotenv.config();

// 커맨드 라인으로부터 ID 파일 경로를 받음
const [idFilePath] = process.argv.slice(2);

if (!idFilePath) {
  console.error("Should provide both an ID file path");
  process.exit(1);
}

// 파일에서 ID를 읽고 각각에 대해 삭제 요청을 실행하는 함수
const processIds = async () => {
  try {
    const ids = fs.readFileSync(idFilePath, 'utf-8').split('\n').filter(Boolean);
    for (const id of ids) {
      const url = `https://dash.readme.com/api/v1/api-specification/${id}`;
      console.log(`Deleting specification with ID: ${id}`);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': process.env.README_API_KEY, // 환경 변수에서 API 키를 로드
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`Failed to delete ID ${id}. Status: ${response.status}`);
      } else {
        console.log(`Successfully deleted ID: ${id}`);
      }
    }
  } catch (error) {
    console.error(`Error processing IDs: ${error}`);
  }
};

processIds();
