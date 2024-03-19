const Examples = {
	createWebhook: {
		subscriptionId: "322",
		description: "test webhook",
		protocol: "ETHEREUM",
		network: "MAINNET",
		eventType: "BLOCK_PERIOD",
		notification: {
			webhookUrl: "https://webhook.mock.server/blockperiod",
		},
		condition: {
			period: 3,
		},
		createdAt: "2023-04-21T05:55:12.084Z",
	},
	getWebhook: {
		total: 1,
		rpp: 10,
		page: 1,
		items: [
			{
				subscriptionId: "31",
				description: "test",
				protocol: "ETHEREUM",
				network: "MAINNET",
				subscriptionType: "WEBHOOK",
				eventType: "BLOCK_PERIOD",
				notification: {
					webhookUrl: "https://webhook.mock.server/blockperiod",
				},
				isActive: true,
				updatedAt: "2023-04-21T09:40:49.678Z",
				createdAt: "2023-04-21T09:40:49.678Z",
				condition: {
					period: 1,
				},
			},
		],
	},
	updateWebhook: {
		total: 1,
		rpp: 10,
		page: 1,
		items: [
			{
				subscriptionId: "31",
				description: "test",
				protocol: "ETHEREUM",
				network: "MAINNET",
				subscriptionType: "WEBHOOK",
				eventType: "BLOCK_PERIOD",
				notification: {
					webhookUrl: "https://webhook.mock.server/blockperiod",
				},
				isActive: true,
				updatedAt: "2023-04-21T09:40:49.678Z",
				createdAt: "2023-04-21T09:40:49.678Z",
				condition: {
					period: 1,
				},
			},
		],
	},
	deleteWebhook: {
		result: true,
	},
};

export default Examples;
