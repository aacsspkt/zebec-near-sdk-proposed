"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WRAP_NEAR_CONTRACT_ID = exports.ZSTREAM_CONTRACT_ID = exports.config = exports.getConfig = exports.ONE_NEAR_BN = exports.ONE_NEAR = exports.ONE_YOCTO_NEAR = exports.WITHDRAW_OP_GAS = exports.BASIC_STREAM_OP_GAS = exports.STREAM_PAUSE_RESUME_GAS = exports.STREAM_CANCEL_GAS = exports.TOKEN_STREAM_CREATION_GAS = exports.NATIVE_STREAM_CREATION_GAS = exports.NATIVE_TOKEN_DECIMALS = exports.DEFAULT_FUNCTION_CALL_GAS = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
var near_api_js_1 = require("near-api-js");
Object.defineProperty(exports, "DEFAULT_FUNCTION_CALL_GAS", { enumerable: true, get: function () { return near_api_js_1.DEFAULT_FUNCTION_CALL_GAS; } });
exports.NATIVE_TOKEN_DECIMALS = 24;
exports.NATIVE_STREAM_CREATION_GAS = "10000000000000";
exports.TOKEN_STREAM_CREATION_GAS = "55000000000000"; // 55Tgas
exports.STREAM_CANCEL_GAS = exports.TOKEN_STREAM_CREATION_GAS;
exports.STREAM_PAUSE_RESUME_GAS = "10000000000000";
exports.BASIC_STREAM_OP_GAS = "10000000000000";
exports.WITHDRAW_OP_GAS = "250000000000000";
exports.ONE_YOCTO_NEAR = "0.000000000000000000000001";
exports.ONE_NEAR = "1000000000000000000000000";
exports.ONE_NEAR_BN = new bn_js_1.default(exports.ONE_NEAR, 10);
let SDK_ENV = "";
function getConfig(env = SDK_ENV || process.env.NEAR_ENV || process.env.REACT_APP_REF_SDK_ENV) {
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
}
exports.getConfig = getConfig;
exports.config = getConfig();
exports.ZSTREAM_CONTRACT_ID = exports.config.ZSTREAM_CONTRACT_ID;
exports.WRAP_NEAR_CONTRACT_ID = exports.config.WRAP_NEAR_CONTRACT_ID;
