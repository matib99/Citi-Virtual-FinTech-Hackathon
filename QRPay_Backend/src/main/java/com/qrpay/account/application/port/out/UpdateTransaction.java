package com.qrpay.account.application.port.out;

import com.qrpay.account.domain.Transaction;

public interface UpdateTransaction {

	void updateTransaction(Transaction transaction);

}
