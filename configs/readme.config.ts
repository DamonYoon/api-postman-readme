import { ReadmeConfig } from "../types";
import API_DOCS_TITLES from "../utils/titles.utils";

const MAIN_VERSION = "1.0.2";

export const README_CONFIGS: ReadmeConfig[] = [
	{
		version: "0.2.3",
		apiDefinitions: [
			{
				title: API_DOCS_TITLES.WEB3_DATA_API,
				id: "6632ea956a734b003c4fd399",
			},
			{
				title: API_DOCS_TITLES.EVENT_STREAM,
				id: "6632ea956a734b003c4fd39a",
			},
			{
				title: API_DOCS_TITLES.NODE_API,
				id: "6632ea956a734b003c4fd39b",
			},
		],
	},
	{
		version: "1.0.3",
		apiDefinitions: [
			{
				title: API_DOCS_TITLES.WEB3_DATA_API,
				id: "662b005c8a508f0043d54ac6",
			},
			{
				title: API_DOCS_TITLES.EVENT_STREAM,
				id: "662b005c8a508f0043d54ac7",
			},
			{
				title: API_DOCS_TITLES.NODE_API,
				id: "662b005c8a508f0043d54ac8",
			},
		],
	},
	{
		version: "1.0.2",
		apiDefinitions: [
			{
				title: API_DOCS_TITLES.WEB3_DATA_API,
				id: "660b962df43fa500628e79db",
			},
			{
				title: API_DOCS_TITLES.EVENT_STREAM,
				id: "660b962df43fa500628e79dc",
			},
			{
				title: API_DOCS_TITLES.NODE_API,
				id: "660b962df43fa500628e79dd",
			},
		],
	},
	{
		version: "1.0.1",
		apiDefinitions: [
			{
				title: API_DOCS_TITLES.WEB3_DATA_API,
				id: "65f9435dc3bc24003cc4d2b2",
			},
			{
				title: API_DOCS_TITLES.EVENT_STREAM,
				id: "65f9435dc3bc24003cc4d2b3",
			},
			{
				title: API_DOCS_TITLES.NODE_API,
				id: "65f9435dc3bc24003cc4d2b4",
			},
		],
	},
	{
		version: "1.0.0",
		apiDefinitions: [
			{
				title: API_DOCS_TITLES.WEB3_DATA_API,
				id: "65d31f7a7d0074002cdbec7a",
			},
			{
				title: API_DOCS_TITLES.EVENT_STREAM,
				id: "65d31f7a7d0074002cdbec7b",
			},
		],
	},
];

const mainApiDefinitions = README_CONFIGS.find((config) => config.version === MAIN_VERSION)?.apiDefinitions;

if (!mainApiDefinitions) {
	throw new Error("API definitions not found");
}

export const MAIN_API_CONFIGS = {
	version: MAIN_VERSION,
	apiDefinitions: mainApiDefinitions,
};
