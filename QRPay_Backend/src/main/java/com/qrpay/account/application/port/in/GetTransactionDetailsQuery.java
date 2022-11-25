package com.qrpay.account.application.port.in;

import com.qrpay.account.domain.Transaction;

public interface GetTransactionDetailsQuery {

	Transaction getDetails(Transaction.TransactionId transactionId);

}
