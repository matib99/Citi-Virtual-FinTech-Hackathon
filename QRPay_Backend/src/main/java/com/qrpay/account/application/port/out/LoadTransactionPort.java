package com.qrpay.account.application.port.out;


import com.qrpay.account.domain.Transaction;
import com.qrpay.account.domain.Transaction.TransactionId;

public interface LoadTransactionPort {

	Transaction loadTransaction(TransactionId transactionId);
}
