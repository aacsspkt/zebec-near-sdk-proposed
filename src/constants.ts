import BN from "bn.js";

export { DEFAULT_FUNCTION_CALL_GAS } from "near-api-js";
export const NATIVE_TOKEN_DECIMALS = 24;
export const NATIVE_STREAM_CREATION_GAS = "10000000000000";
export const TOKEN_STREAM_CREATION_GAS = "55000000000000"; // 55Tgas
export const STREAM_CANCEL_GAS = TOKEN_STREAM_CREATION_GAS;
export const STREAM_PAUSE_RESUME_GAS = "10000000000000";
export const BASIC_STREAM_OP_GAS = "10000000000000";
export const WITHDRAW_OP_GAS = "250000000000000";

export const ONE_YOCTO_NEAR = "0.000000000000000000000001";
export const ONE_NEAR = "1000000000000000000000000";
export const ONE_NEAR_BN = new BN(ONE_NEAR, 10);

export type SdkEnvironment = "mainnet" | "testnet";

let SDK_ENV: SdkEnvironment | undefined;

export const getConfig = (
	env: SdkEnvironment = SDK_ENV ||
		(process.env.NEAR_ENV as SdkEnvironment) ||
		(process.env.REACT_APP_SDK_ENV as SdkEnvironment),
) => {
	SDK_ENV = env;
	switch (env) {
		case "mainnet":
			return {
				networkId: "mainnet",
				nodeUrl: "https://rpc.mainnet.near.org",
				walletUrl: "https://wallet.near.org",
				explorerUrl: "https://testnet.nearblocks.io",
				indexerUrl: "",
				WRAP_NEAR_CONTRACT_ID: "wrap.near",
				ZSTREAM_CONTRACT_ID: "",
			};
		case "testnet":
			return {
				networkId: "testnet",
				nodeUrl: "https://rpc.testnet.near.org",
				walletUrl: "https://wallet.testnet.near.org",
				explorerUrl: "https://testnet.nearblocks.io",
				indexerUrl: "",
				WRAP_NEAR_CONTRACT_ID: "wrap.testnet",
				ZSTREAM_CONTRACT_ID: "",
			};
		default:
			return {
				networkId: "mainnet",
				nodeUrl: "https://rpc.mainnet.near.org",
				walletUrl: "https://wallet.near.org",
				explorerUrl: "https://nearblocks.io",
				indexerUrl: "",
				WRAP_NEAR_CONTRACT_ID: "wrap.near",
				ZSTREAM_CONTRACT_ID: "",
			};
	}
};

export let config = getConfig();

export let ZSTREAM_CONTRACT_ID = config.ZSTREAM_CONTRACT_ID;

export let WRAP_NEAR_CONTRACT_ID = config.WRAP_NEAR_CONTRACT_ID;
