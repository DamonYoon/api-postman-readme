export const supportedMethods = {
	ethereum: ["eth", "net", "web3", "trace", "debug"],
	polygon: ["eth", "net", "web3", "debug", "bor"],
	arbitrum: ["eth", "net", "web3", "debug"],
	optimism: ["eth", "net", "web3", "debug", "optimism"],
	luniverse: ["eth", "net", "web3", "debug"],
};

export const supportedProtocols = Object.keys(supportedMethods);
export type SupportedProtocols = keyof typeof supportedMethods | "all";
