import BN from "bn.js";
import { transactions } from "near-api-js";

import { NATIVE_STREAM_CREATION_GAS, NATIVE_TOKEN_DECIMALS } from "./constants";
import { InitStreamParams } from "./types";
import { getGas } from "./utils";

export class StreamActions {
	static getInitStreamAction(params: InitStreamParams): transactions.Action {
		const { receiver, rate, start, end, canCancel, canUpdate } = params;

		const rateBN = new BN(rate * 1000, 10);
		const startBN = new BN(start, 10);
		const endBN = new BN(end, 10);
		const durationBN = endBN.sub(startBN);
		const ten = new BN(10, 10);
		const decimalsBN = new BN(NATIVE_TOKEN_DECIMALS - 3);
		const amountBN = ten.pow(decimalsBN).mul(rateBN).mul(durationBN);
		const streamRateBN = ten.pow(decimalsBN).mul(rateBN);

		const args = {
			receiver,
			stream_rate: streamRateBN.toString(),
			start,
			end,
			can_cancel: canCancel,
			can_update: canUpdate,
		};

		const gas = getGas(NATIVE_STREAM_CREATION_GAS);

		return transactions.functionCall("create_stream", args, gas, amountBN);
	}
}
