package com.qrpay.account.domain;

import java.math.BigInteger;

import lombok.NonNull;
import lombok.Value;

@Value
public class Money {

	public static Money ZERO = Money.of(0L);

	@NonNull
	private final BigInteger amount;
	
	public Money(BigInteger amount) {
		this.amount = amount;
	}

	public static Money of(long value) {
		return new Money(BigInteger.valueOf(value));
	}
	
	public boolean isGreater(Money other) {
		return this.amount.compareTo(other.amount) > 0;
	}
	
	public BigInteger getAmount() {
		return amount;
	}

}
