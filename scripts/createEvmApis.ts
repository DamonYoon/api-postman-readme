import * as path from "path";
import { Patterns } from "../utils/patterns.utils";
import Readme from "../utils/readme.utils";
import { supportedMethods, supportedProtocols } from "../apis/nodeAPI/evm";
import { readFile, readdir } from "fs/promises";

function validateInputs(
	versionInput?: string,
	protocolInput?: keyof typeof supportedMethods | "all"
): [string, keyof typeof supportedMethods | "all"] {
	if (!versionInput) {
		throw new Error("Error: A unique ID for API is required as the second argument.");
	}

	if (!Patterns.readmeDocsVersion.test(versionInput)) {
		throw new Error("Error: The version must be 'main' or in the format of x.x.x.");
	}

	if (!protocolInput) {
		throw new Error("Error: A protocol is required as the second argument.");
	}

	if (protocolInput !== "all" && !supportedProtocols.includes(protocolInput)) {
		throw new Error("Error: Only supported protocol is allowed.");
	}

	return [versionInput, protocolInput];
}

async function readOASFiles({
	version,
	protocol,
	basePath,
}: {
	version: string;
	protocol: keyof typeof supportedMethods;
	basePath: string;
}) {
	const methods = supportedMethods[protocol];
	let totalCount = 0;
	for (const method of methods) {
		const methodPath = path.join(basePath, method);
		try {
			const files = await readdir(methodPath);
			let methodCount = 0;
			for (const file of files) {
				if (file.endsWith(".ts")) {
					const filePath = path.join(methodPath, file);
					const content = await readFile(filePath, "utf-8");
					console.log(`Reading file: ${filePath}`);

					// TODO: 필요한 처리 로직을 여기에 추가
					totalCount++;
					methodCount++;
				}
			}
			console.log(`▶ API count for ${method}: ${methodCount}`);
		} catch (error: any) {
			console.error(`Error processing ${methodPath}: ${error.message}`);
		}
	}
	console.log(`▶▶ Total API count: ${totalCount}`);
}

async function main() {
	try {
		const currentWorkingDir = process.cwd();
		const evmMethodPath = "./apis/nodeAPI/evm/methods/"; // OAS 파일이 위치한 기본 경로를 설정
		const folderPath = path.join(currentWorkingDir, evmMethodPath);

		const [versionInput, protocolInput] = validateInputs(...process.argv.slice(2));
		if (protocolInput !== "all") readOASFiles({ version: versionInput, protocol: protocolInput, basePath: folderPath });

		// console.log(`✅ Successfully created API specification  (ID: ${versionInput})!`);
	} catch (error: any) {
		if (error.response) {
			console.error("API Error Response Data:", error.response.data);
		}
		console.error("Error Creating API specifications:", error.message);
	}
}

main();
