import Readme from "../utils/readme.utils";

(async () => {
	const result = await Readme.uploadSpecification({
		filePath: "./docs/v0.2.3/20240502_ethereum_trace_call_1714635357.yaml",
		version: "0.2.3",
	});

	console.log(result);
})();
