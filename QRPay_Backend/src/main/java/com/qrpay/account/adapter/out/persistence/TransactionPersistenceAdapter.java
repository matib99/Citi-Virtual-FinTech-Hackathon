package com.qrpay.account.adapter.out.persistence;

import javax.persistence.EntityNotFoundException;

import com.qrpay.account.application.port.out.LoadTransactionPort;
import com.qrpay.account.application.port.out.LockTransactionPort;
import com.qrpay.account.application.port.out.UpdateTransactionPort;
import com.qrpay.account.domain.Transaction;
import com.qrpay.account.domain.Transaction.TransactionId;
import com.qrpay.common.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@PersistenceAdapter
class TransactionPersistenceAdapter implements
		LoadTransactionPort,
		UpdateTransactionPort,
		LockTransactionPort {

	private final SpringDataTransactionRepository transactionRepository;
	private final SpringDataLockRepository lockRepository;
	private final TransactionMapper transactionMapper;

	@Override
	public Transaction loadTransaction(
					Transaction.TransactionId transactionId) {

		TransactionJpaEntity transaction =
				transactionRepository.findById(transactionId.getValue())
						.orElseThrow(EntityNotFoundException::new);

		return transactionMapper.mapToDomainEntity(
				transaction);

	}



	@Override
	public void updateTransaction(Transaction transaction) {
		transactionRepository.save(transactionMapper.mapToJpaEntity(transaction));
	}



	@Override
	public boolean lockTransaction(TransactionId transactionId) {
		
		return true;
	}



	@Override
	public void releaseTransaction(TransactionId transactionId) {
		lockRepository.deleteById(transactionId.getValue());
	}

}
