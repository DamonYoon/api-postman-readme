import { OpenAPIV3 } from "openapi-types";
import fs from "fs";
import { ApiSpec } from "../../../interfaces";

let nftPathsBuffer: OpenAPIV3.PathsObject = {};

fs.readdirSync(__dirname).forEach((file) => {
	if (file === "index.ts") return; // 현재 파일은 무시

	const apiSpec: ApiSpec = require(`./${file}`).default;

	if (apiSpec?.hide) return; // hide가 true인 경우, 해당 API를 문서에 노출하지 않음

	nftPathsBuffer = {
		...nftPathsBuffer,
		[`/{protocol}/{network}/nft/${apiSpec.endpoint}`]: apiSpec.info,
	};
});

const nftPaths = nftPathsBuffer;

export default nftPaths;
