import { Account, Connection, Near, providers, transactions, utils } from "near-api-js";

import { StreamActions } from "./actions";
import { AccessKeyView, InitStreamParams } from "./types";

export class StreamClient {
	constructor(readonly connection: Connection, readonly accountId: string, readonly contractId: string) {}

	async initStream(params: InitStreamParams): Promise<providers.FinalExecutionOutcome> {
		const publicKey = await this.connection.signer.getPublicKey();
		const accessKey = await this.connection.provider.query<AccessKeyView>({
			request_type: "view_access_key",
			finality: "final",
			public_key: publicKey.toString(),
			account_id: this.accountId,
		});
		const nonce = accessKey.nonce;

		const blockResult = await this.connection.provider.block({ finality: "final" });
		const block = utils.serialize.base_decode(blockResult.header.hash);

		const action = StreamActions.getInitStreamAction(params);
		const transaction = transactions.createTransaction(
			this.accountId,
			publicKey,
			this.contractId,
			nonce,
			[action],
			block,
		);
		const signedTransaction = await transactions.signTransaction(
			transaction,
			this.connection.signer,
			this.accountId,
			this.connection.networkId,
		);

		return this.connection.provider.sendTransactionAsync(signedTransaction[1]);
	}
}
