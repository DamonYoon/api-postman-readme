import { OpenAPIV3 } from "openapi-types";
import fs from "fs";
import { ApiSpec } from "../../../../interfaces";

let paths: OpenAPIV3.PathsObject = {};
const category = __dirname.split("/").pop(); // ger category from directory name

fs.readdirSync(__dirname).forEach((file) => {
	if (file === "index.ts") return; // 현재 파일은 무시

	const apiSpec: ApiSpec = require(`./${file}`).default;

	if (!apiSpec?.isPublic) return; // isPublic false인 경우, 해당 API를 문서에 노출하지 않음

	paths = {
		...paths,
		[`/{protocol}/{network}/${category}/${apiSpec.endpoint}`]: apiSpec.info,
	};
});

export default paths;
