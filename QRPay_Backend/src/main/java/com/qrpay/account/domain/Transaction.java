package com.qrpay.account.domain;

import java.nio.charset.Charset;
import java.util.Random;

import com.qrpay.account.application.service.TransferProperties;

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
	
	@Getter
	@NonNull
	private final TransactionState transactionState;
	
	public static Transaction newTransaction(AccountId targetAccountId, Money money) {
		return new Transaction(null, targetAccountId, money, new TransactionState(false));
	}
	
	public boolean complete() {
		if(transactionState.value)
			return false;
		transactionState.value = true;
		return true;
	}

	@Value
	public static class TransactionId {
		private final String value;
		
		public static TransactionId getRandom() {
			byte[] array = new byte[TransferProperties.id_length]; 
		    new Random().nextBytes(array);
		    return new TransactionId(new String(array, Charset.forName("UTF-8")));
		}
	}
	
	@Value
	public static class AccountId {
		private final String value;
	}
	
	public static class TransactionState {
		
		public TransactionState(boolean state) {
			this.value = state;
		}

		public boolean getValue() {
			return value;
		}
		
		private boolean value;
	}

}
