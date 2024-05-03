import axios from "axios";
import dotenv from "dotenv";
import { ReadmeApiSpec } from "../types";
import FormData from "form-data";
import fs from "fs";
dotenv.config();

const baseUrl = "https://dash.readme.com/api/v1";
const readmeApiKey = process.env.README_API_KEY;

class Readme {
	// Upload API Spec(https://docs.readme.com/main/reference/uploadapispecification)
	static async uploadSpecification({ filePath, version }: { filePath: string; version: string }) {
		const formData = new FormData();

		formData.append("spec", fs.createReadStream(filePath), "");

		console.log(formData);

		// const response = await axios.request({
		// 	baseURL: baseUrl,
		// 	url: "/api-specification",
		// 	method: "POST",
		// 	headers: {
		// 		Accept: "application/json",
		// 		Authorization: readmeApiKey,
		// 		"x-readme-version": `${version}`,
		// 		"content-type": "multipart/form-data; boundary=---011000010111000001101001",
		// 		// ...formData.getHeaders(), // This spreads the headers required by the FormData, including 'content-type'.
		// 	},
		// 	data: formData,
		// });

		// return response.data;
	}

	// Get metadata(https://docs.readme.com/main/reference/getapispecification)
	static async getMetadata({
		page = 1,
		perPage = 100,
		version,
	}: {
		page?: number;
		perPage?: number;
		version: string;
	}): Promise<ReadmeApiSpec[]> {
		const response = await axios.request({
			baseURL: baseUrl,
			url: "/api-specification",
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: readmeApiKey,
				"x-readme-version": `${version}`,
			},
			params: {
				page,
				perPage,
			},
		});
		return response.data;
	}

	// Delete API specification(https://docs.readme.com/main/reference/deleteapispecification)
	static async deleteApiSpec(spec: ReadmeApiSpec) {
		await axios.request({
			baseURL: baseUrl,
			url: `/api-specification/${spec.id}`,
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: readmeApiKey,
			},
		});
		console.log(`Deleted API Specification: ${spec.title} ${spec.id}`);
	}
}

export default Readme;
