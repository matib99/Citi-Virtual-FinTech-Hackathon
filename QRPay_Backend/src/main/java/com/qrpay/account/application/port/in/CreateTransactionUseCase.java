package com.qrpay.account.application.port.in;

import com.qrpay.account.domain.Transaction;

public interface CreateTransactionUseCase {

	boolean createTransaction(Transaction command);

}
