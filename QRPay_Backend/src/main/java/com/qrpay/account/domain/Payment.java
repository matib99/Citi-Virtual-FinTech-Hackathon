package com.qrpay.account.domain;

import com.qrpay.account.domain.Transaction.AccountId;

import lombok.Getter;
import lombok.NonNull;
import lombok.Value;

@Value
public class Payment {

	/**
	 * The paying account.
	 */
	@Getter
	@NonNull
	private final AccountId originAccountId;
	
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
	
	public static Payment of(Transaction transaction, AccountId payer) {
		return new Payment(payer, transaction.getTargetAccountId(), transaction.getMoney());
	}

}
