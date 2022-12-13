import BN from "bn.js";
import { transactions } from "near-api-js";

/**
 * Raw transaction before transformation
 */
export interface RawTransaction {
	receiverId: string;
	functionCalls: FunctionCallOptions[];
}

/**
 * View function options
 */
export interface ViewFunctionOptions {
	methodName: string;
	args: object;
}

/**
 * Call function options
 */
export interface FunctionCallOptions extends ViewFunctionOptions {
	gas: string;
	deposit: string;
}

/**
 * Near Transaction
 */
export interface Transaction {
	signerId: string;
	receiverId: string;
	actions: transactions.Action[];
}

/**
 * Arguments to init stream
 */
export type InitStreamParams = {
	rate: number;
	start: string;
	end: string;
	receiver: string;
	canCancel: boolean;
	canUpdate: boolean;
};

type BlockHash = string;
type BlockHeight = number;

export interface QueryResponseKind {
	block_height: BlockHeight;
	block_hash: BlockHash;
}

export interface FunctionCallPermissionView {
	FunctionCall: {
		allowance: string;
		receiver_id: string;
		method_names: string[];
	};
}

export interface AccessKeyView extends QueryResponseKind {
	nonce: BN;
	permission: "FullAccess" | FunctionCallPermissionView;
}

export interface StreamView extends QueryResponseKind {}
