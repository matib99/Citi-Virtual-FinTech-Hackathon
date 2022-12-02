package com.qrpay.account.application.port.out;

import com.qrpay.account.domain.Transaction.TransactionId;

public interface LockTransactionPort {

	boolean lockTransaction(TransactionId transactionId);
	
	void releaseTransaction(TransactionId transactionId);

}
