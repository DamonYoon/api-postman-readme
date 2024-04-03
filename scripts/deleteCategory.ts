import fs from "fs";
import fetch from "node-fetch"; // node-fetch 라이브러리를 사용하여 HTTP 요청을 수행
import dotenv from "dotenv";
dotenv.config();

// 커맨드 라인으로부터 slug 파일 경로와 버전을 받음
const [slugFilePath, version] = process.argv.slice(2);

if (!slugFilePath || !version) {
	console.error("Should provide both a slug file path and a version");
	process.exit(1);
}

// 파일에서 slug를 읽고 각각에 대해 삭제 요청을 실행하는 함수
const processSlugs = async () => {
	try {
		if (!process.env.README_API_KEY) {
			console.error("README_API_KEY is not set");
			process.exit(1);
		}

		const slugs = fs.readFileSync(slugFilePath, "utf-8").split("\n").filter(Boolean);
		for (const slug of slugs) {
			const url = `https://dash.readme.com/api/v1/categories/${slug}`;
			console.log(`Deleting category with slug: ${slug}`);

			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					Authorization: process.env.README_API_KEY, // 환경 변수에서 API 키를 로드
					Accept: "application/json",
					"X-Readme-Version": version,
				},
			});

			if (!response.ok) {
				console.error(`Failed to delete slug ${slug}. Status: ${response.status}`);
			} else {
				console.log(`Successfully deleted slug: ${slug}`);
			}
		}
	} catch (error) {
		console.error(`Error processing slugs: ${error}`);
	}
};

processSlugs();
