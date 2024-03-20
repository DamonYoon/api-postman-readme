import { ReadmeConfig } from "../types";
import API_DOCS_TITLES from "../utils/titles.utils";

export const README_CONFIGS: ReadmeConfig[] = [
	{
		version: "1.0.2",
		apiDefinitions: [
			{
				title: API_DOCS_TITLES.WEB3_DATA_API,
				id: "65fa8c319a046700577794d3",
			},
			{
				title: API_DOCS_TITLES.EVENT_STREAM,
				id: "65fa8c319a046700577794d4",
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
