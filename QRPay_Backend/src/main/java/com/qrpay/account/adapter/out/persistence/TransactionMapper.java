package com.qrpay.account.adapter.out.persistence;

import java.math.BigInteger;

import org.springframework.stereotype.Component;

import com.qrpay.account.domain.Money;
import com.qrpay.account.domain.Transaction;
import com.qrpay.account.domain.Transaction.AccountId;
import com.qrpay.account.domain.Transaction.TransactionId;
import com.qrpay.account.domain.Transaction.TransactionState;

@Component
class TransactionMapper {

	Transaction mapToDomainEntity(
			TransactionJpaEntity transaction) {

		TransactionId transactionId = new TransactionId(transaction.getId());
		AccountId accountId = new AccountId(transaction.getTargetAccountId());
		Money amount = new Money(BigInteger.valueOf(transaction.getAmount()));
		TransactionState transactionState = new TransactionState(transaction.isState());
		
		return new Transaction(
				transactionId,
				accountId,
				amount,
				transactionState
				);

	}

	TransactionJpaEntity mapToJpaEntity(Transaction transaction) {
		return new TransactionJpaEntity(
				transaction.getId().getValue(),
				transaction.getTargetAccountId().getValue(),
				transaction.getMoney().getAmount().longValue(),
				transaction.getTransactionState().getValue());
	}

}
