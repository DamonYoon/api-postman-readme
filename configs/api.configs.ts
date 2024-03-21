import { README_CONFIGS } from "./readme.config";

const MAIN_VERSION = "1.0.1";

const apiDefinitions = README_CONFIGS.find((config) => config.version === MAIN_VERSION)?.apiDefinitions;

if (!apiDefinitions) {
	throw new Error("API definitions not found");
}

const API_CONFIGS = {
	version: MAIN_VERSION,
	apiDefinitions,
};

export default API_CONFIGS;
