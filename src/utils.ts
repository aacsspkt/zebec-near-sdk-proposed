import BN from "bn.js";
import { utils } from "near-api-js";

import { RawTransaction } from "./types";

export const getGas = (gas: string | undefined) => (gas ? new BN(gas) : new BN("100000000000000"));

export const getAmount = (amount: string) =>
	amount ? new BN(utils.format.parseNearAmount(amount) || "0") : new BN("0");

export const transformTransactions = (transactions: RawTransaction[], AccountId: string) => {
	const parsedTransactions = transactions.map((t: RawTransaction) => {
		return {
			signerId: AccountId,
			receiverId: t.receiverId,
			actions: t.functionCalls.map((fc) => {
				return {
					type: "FunctionCall",
					params: {
						methodName: fc.methodName,
						args: fc.args || {},
						gas: getGas(fc.gas).toNumber().toFixed(),
						deposit: utils.format.parseNearAmount(fc.deposit || "0")!,
					},
				};
			}),
		};
	});

	return parsedTransactions;
};
