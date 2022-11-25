package com.qrpay.account.adapter.out.persistence;

import javax.persistence.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

import com.qrpay.account.application.port.out.LoadTransactionPort;
import com.qrpay.account.application.port.out.UpdateTransaction;
import com.qrpay.account.domain.Transaction;
import com.qrpay.account.domain.Transaction.TransactionId;
import com.qrpay.common.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@PersistenceAdapter
class TransactionPersistenceAdapter implements
		LoadTransactionPort,
		UpdateTransaction {

	private final SpringDataTransactionRepository accountRepository;

	@Override
	public Transaction loadTransaction(
					Transaction.TransactionId transactionId) {

		TransactionJpaEntity transaction =
				accountRepository.findById(transactionId.getValue())
						.orElseThrow(EntityNotFoundException::new);

		return transactionMapper.mapToDomainEntity(
				transaction);

	}



	@Override
	public void updateTransaction(Transaction transaction) {
		transactionRepository.save(Mapper.mapToJpaEntity(activity));
	}

}
