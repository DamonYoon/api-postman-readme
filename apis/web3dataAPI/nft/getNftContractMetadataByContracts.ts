import { OpenAPIV3 } from "openapi-types";
import Requests from "../schemas/requests";
import Responses from "../schemas/responses";
import DataDomains from "../schemas/dataDomains";
import Examples from "../examples";
import Constants from "../../../utils/constants.utils";

const title = "Get NFT Contract Metadata by Contracts";
const endpoint = "getNftContractMetadataByContracts";
const isPublic = true;

const info: OpenAPIV3.PathItemObject = {
	post: {
		security: [
			{
				api_key: [],
			},
		],
		tags: ["NFT API"],
		description: `특정 NFT 컨트랙트의 메타데이터를 조회합니다. 다수의 컨트랙트를 조회할 수 있으며, 최대 ${Constants.INPUT_ITEM_MAX}개의 컨트랙트를 조회할 수 있습니다.`,
		summary: title,
		operationId: endpoint,
		parameters: [Requests.protocol, Requests.network],
		requestBody: {
			required: true,
			content: {
				"application/json": {
					schema: {
						additionalProperties: false,
						allOf: [
							{
								type: "object",
								properties: {
									contractAddresses: {
										type: "array",
										items: {
											...Requests.contractAddress,
										},
										default: [Constants.BAYC_CONTRACT_ADDRESS, Constants.MAYC_CONTRACT_ADDRESS],
									},
								},
								required: ["contractAddresses"],
								maximum: Constants.INPUT_ITEM_MAX,
							},
						],
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Successful Response",
				content: {
					"application/json": {
						schema: {
							type: "array",
							items: {
								allOf: [DataDomains.ContractMeta, DataDomains.AssetMeta],
							},
						},
						example: Examples[endpoint],
					},
				},
			},
			"400": { ...Responses.Error400 },
			"401": { ...Responses.Error401 },
			"403": { ...Responses.Error403 },
			"404": { ...Responses.Error404 },
			"429": { ...Responses.Error429 },
		},
	},
};

export default {
	title,
	endpoint,
	isPublic,
	info,
};
