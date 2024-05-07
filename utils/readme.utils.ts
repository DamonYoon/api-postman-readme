import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { CategoryInfo, DocForCategoryInfo, ReadmeApiSpec, ReadmeApiSpecResponse } from "../types";
import FormData from "form-data";
import fs from "fs";
dotenv.config();

const baseUrl = "https://dash.readme.com/api/v1";
const readmeApiKey = process.env.README_API_KEY;

class Readme {
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

	// Upload API Spec(https://docs.readme.com/main/reference/uploadapispecification)
	static async uploadSpecification({
		filePath,
		version,
	}: {
		filePath: string;
		version: string;
	}): Promise<ReadmeApiSpecResponse> {
		const formData = new FormData();

		const fileData = fs.createReadStream(filePath);
		formData.append("spec", fileData, {
			// contentType: "multipart/form-data; boundary=---011000010111000001101001",
		});

		const response: AxiosResponse<ReadmeApiSpecResponse> = await axios.request({
			baseURL: baseUrl,
			url: "/api-specification",
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: readmeApiKey,
				"x-readme-version": `${version}`,
				"content-type": "multipart/form-data",
			},
			data: formData,
		});

		return response.data;
	}

	// Update API Spec(https://docs.readme.com/main/reference/updateapispecification)
	static async updateSpecification({ filePath, id }: { filePath: string; id: string }): Promise<ReadmeApiSpecResponse> {
		const formData = new FormData();

		const fileData = fs.createReadStream(filePath);
		formData.append("spec", fileData);

		const response: AxiosResponse<ReadmeApiSpecResponse> = await axios.request({
			baseURL: baseUrl,
			url: `/api-specification/${id}`,
			method: "PUT",
			headers: {
				Accept: "application/json",
				Authorization: readmeApiKey,
				"content-type": "multipart/form-data",
			},
			data: formData,
		});

		return response.data;
	}

	// Delete API specification(https://docs.readme.com/main/reference/deleteapispecification)
	static async deleteApiSpec({ id }: { id: string }) {
		await axios.request({
			baseURL: baseUrl,
			url: `/api-specification/${id}`,
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: readmeApiKey,
			},
		});
		console.log(`Deleted API Specification: ${id}`);
	}

	// Validate API Spec(https://docs.readme.com/main/reference/validateapispecification)
	static async validateSpecification({ filePath }: { filePath: string }) {
		const formData = new FormData();

		const fileData = fs.createReadStream(filePath);
		formData.append("spec", fileData, {
			// contentType: "multipart/form-data; boundary=---011000010111000001101001",
		});

		const response = await axios.request({
			baseURL: baseUrl,
			url: "/api-validation",
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: readmeApiKey,
				"content-type": "multipart/form-data",
			},
			data: formData,
		});

		return response.data;
	}

	// get category (https://docs.readme.com/main/reference/getcategory)
	static async getCategory({ slug, version }: { slug: string; version: string }): Promise<CategoryInfo> {
		const response: AxiosResponse<CategoryInfo> = await axios.request({
			baseURL: baseUrl,
			url: `/categories/${slug}/docs`,
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: readmeApiKey,
				"x-readme-version": `${version}`,
			},
		});

		return response.data;
	}

	// delete category (https://docs.readme.com/main/reference/deletecategory)
	static async deleteCategory({ slug, version }: { slug: string; version: string }) {
		const response = await axios.request({
			baseURL: baseUrl,
			url: `/categories/${slug}`,
			method: "DELETE",
			headers: {
				Accept: "application/json",
				Authorization: readmeApiKey,
				"x-readme-version": `${version}`,
			},
		});

		console.log(`Deleted Category: ${slug}`);
		return response.data;
	}

	// get docs for category (https://docs.readme.com/main/reference/getcategorydocs)
	static async getDocsForCategory({ slug, version }: { slug: string; version: string }): Promise<DocForCategoryInfo[]> {
		const response: AxiosResponse<DocForCategoryInfo[]> = await axios.request({
			baseURL: baseUrl,
			url: `/categories/${slug}/docs`,
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: readmeApiKey,
				"x-readme-version": `${version}`,
			},
		});

		return response.data;
	}
}

export default Readme;
