package com.qrpay.account.application.service;

import com.qrpay.account.application.port.in.CreateTransactionUseCase;
import com.qrpay.account.application.port.in.FinalizeTransactionCommand;
import com.qrpay.account.application.port.in.FinalizeTransactionUseCase;
import com.qrpay.account.application.port.out.LoadTransactionPort;
import com.qrpay.account.application.port.out.LockTransactionPort;
import com.qrpay.account.application.port.out.PaymentPort;
import com.qrpay.account.application.port.out.UpdateTransactionPort;
import com.qrpay.account.domain.Payment;
import com.qrpay.account.domain.Transaction;
import com.qrpay.account.domain.Transaction.TransactionId;
import com.qrpay.common.UseCase;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityNotFoundException;

import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@UseCase
@Transactional
public class TransferService implements FinalizeTransactionUseCase, CreateTransactionUseCase {

	private final UpdateTransactionPort updateTransactionStatePort;
	private final LockTransactionPort lockTransactionStatePort;
	private final LoadTransactionPort loadTransactionPort;
	private final PaymentPort paymentPort;

	@Override
	public boolean finalize(FinalizeTransactionCommand command) {

		if(!lockTransactionStatePort.lockTransaction(command.getTransactionId())) {
			return false;
		}
		Transaction transaction = loadTransactionPort.loadTransaction(command.getTransactionId());
		if(!transaction.complete()) {
			lockTransactionStatePort.releaseTransaction(command.getTransactionId());
			return false;
		}
		if(!paymentPort.make_payment(Payment.of(transaction,  command.getSourceAccountId()))) {
			lockTransactionStatePort.releaseTransaction(command.getTransactionId());
			return false;
		}
		updateTransactionStatePort.updateTransaction(transaction);
		lockTransactionStatePort.releaseTransaction(command.getTransactionId());
		return true;
	}
	
	@Override
	public boolean createTransaction(Transaction transaction) {
		if(transaction.getMoney().isGreater(TransferProperties.maximumTransferThreshold))
			return false;
		TransactionId new_id = TransactionId.getRandom();
		if(!lockTransactionStatePort.lockTransaction(new_id)) {
			return false;
		}
		try {
			loadTransactionPort.loadTransaction(new_id);
		}
		catch (EntityNotFoundException e) {
			Transaction new_transaction = new Transaction(new_id, 
												transaction.getTargetAccountId(), 
												transaction.getMoney(), 
												transaction.getTransactionState());
			updateTransactionStatePort.updateTransaction(new_transaction);
		}
		lockTransactionStatePort.releaseTransaction(new_id);
		return false;
	}

}




