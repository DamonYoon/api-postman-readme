import Readme from "../utils/readme.utils";

(async () => {
	const result = await Readme.getDocsForCategory({ slug: "ethereum-trace_call", version: "0.2.3" });
	console.log(result[0]?.children);
})();
