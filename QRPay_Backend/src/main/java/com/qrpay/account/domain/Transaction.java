package com.qrpay.account.domain;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Value;

/**
 * A money transfer activity between {@link Account}s.
 */
@Value
@RequiredArgsConstructor
public class Transaction {

	@Getter
	private TransactionId id;

	/**
	 * The credited account.
	 */
	@Getter
	@NonNull
	private final AccountId targetAccountId;

	/**
	 * The money that was transferred between the accounts.
	 */
	@Getter
	@NonNull
	private final Money money;

	public Transaction(
			@NonNull AccountId targetAccountId,
			@NonNull Money money) {
		this.id = null;
		this.targetAccountId = targetAccountId;
		this.money = money;
	}

	@Value
	public static class TransactionId {
		private final Long value = null;
	}
	
	@Value
	public static class AccountId {
		private final Long value = null;
	}

}
