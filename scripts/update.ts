import { updateToReadme } from "./helpers";

const docsPath = process.argv[2];
const id = process.argv[3];

// 입력 인자 유효성 검사
if (!docsPath || !id || !/^[0-9a-fA-F]{24}$/.test(id)) {
	console.error("Usage: npm run update-api -- <docs path> <id (24 hex characters)>");
	process.exit(1);
}

updateToReadme(docsPath, id);
