import { expect } from "chai";
import dotenv from "dotenv";
import { describe, it } from "mocha";

import { config, getConfig } from "../src";

// dotenv.config({ path: "env.local" });

describe("testing config const when no NEAR_SDK is not given", () => {
	it("returns mainnet config", () => {
		const actual = config;

		expect(actual.networkId).equals("mainnet");
		expect(actual.nodeUrl).equals("https://rpc.mainnet.near.org");
		expect(actual.walletUrl).equals("https://wallet.near.org");
		expect(actual.explorerUrl).equals("https://nearblocks.io");
		expect(actual.WRAP_NEAR_CONTRACT_ID).equals("wrap.near");
	});
});

describe("testing getConfig function after overriding", () => {
	it("returns test config", () => {
		const actual = getConfig("testnet");

		expect(actual.networkId).equals("testnet");
		expect(actual.nodeUrl).equals("https://rpc.testnet.near.org");
		expect(actual.walletUrl).equals("https://wallet.testnet.near.org");
		expect(actual.explorerUrl).equals("https://testnet.nearblocks.io");
		expect(actual.WRAP_NEAR_CONTRACT_ID).equals("wrap.testnet");
	});

	it("returns mainnet config", () => {
		const actual = getConfig();
		expect(actual.networkId).equals("testnet");
		expect(actual.nodeUrl).equals("https://rpc.testnet.near.org");
		expect(actual.walletUrl).equals("https://wallet.testnet.near.org");
		expect(actual.explorerUrl).equals("https://testnet.nearblocks.io");
		expect(actual.WRAP_NEAR_CONTRACT_ID).equals("wrap.testnet");
	});
});
