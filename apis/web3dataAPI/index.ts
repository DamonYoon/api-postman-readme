import { OpenAPIV3 } from "openapi-types";
import * as yaml from "js-yaml";
import * as fs from "fs";
import { WEB3_DATA_API_BASE_URL } from "../../utils/urls.utils";
import NFT_APIs from "./nft";

const NFT_PATHS = {
	GET_NFTS_OWNED_BY_ACCOUNT: "getNftsOwnedByAccount",
	GET_NFTS_CONTRACTS_BY_ACCOUNT: "getNftContractsByAccount",
	GET_NFT_METADATA_BY_CONTRACT: "getNftMetadataByContract",
	GET_NFT_CONTACT_METADATA_BY_CONTRACTS: "getNftContractMetadataByContracts",
	GET_NFT_METADATA_BY_TOKEN_IDS: "getNftMetadataByTokenIds",
	SEARCH_NFT_CONTRACT_METADATA_BY_KEYWORD: "searchNftContractMetadataByKeyword",
	GET_NFT_TRANSFERS_WITHIN_RANGE: "getNftTransfersWithinRange",
	GET_NFT_TRANSFERS_BY_ACCOUNT: "getNftTransfersByAccount",
	GET_NFT_TRANSFERS_BY_CONTRACT: "getNftTransfersByContract",
	GET_NFT_TRANSFERS_BY_TOKEN_ID: "getNftTransfersByTokenId",
	GET_NFT_HOLDERS_BY_CONTRACT: "getNftHoldersByContract",
	GET_NFT_HOLDERS_BY_TOKEN_ID: "getNftHoldersByTokenId",
	SYNC_NFT_METADATA: "syncNftMetadata",
};

const EVM_API_docs: OpenAPIV3.Document = {
	openapi: "3.1.0",
	info: {
		title: "Web3 Data API Test",
		version: "1.0.0",
	},
	servers: [
		{
			url: WEB3_DATA_API_BASE_URL,
		},
	],
	components: {
		securitySchemes: {
			api_key: {
				type: "apiKey",
				name: "X-API-KEY",
				in: "header",
			},
		},
	},
	paths: {
		// NFT
		[`/{protocol}/{network}/nft/${NFT_PATHS.GET_NFTS_OWNED_BY_ACCOUNT}`]: NFT_APIs.getNftsOwnedByAccount,
		[`/{protocol}/{network}/nft/${NFT_PATHS.GET_NFTS_CONTRACTS_BY_ACCOUNT}`]: NFT_APIs.getNftContractsByAccount,
		[`/{protocol}/{network}/nft/${NFT_PATHS.GET_NFT_METADATA_BY_CONTRACT}`]: NFT_APIs.getNftMetadataByContract,

		// Token

		// Blockchain

		// Stats
	},
};

const EVM_API_docs_yaml = yaml.dump(EVM_API_docs);
fs.writeFileSync("EVM_API_docs.yaml", EVM_API_docs_yaml, "utf8");
console.log("File created successfully");
