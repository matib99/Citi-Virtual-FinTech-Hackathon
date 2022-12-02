package com.qrpay.account.application.service;

import com.qrpay.account.application.port.in.GetTransactionDetailsQuery;
import com.qrpay.account.application.port.out.LoadTransactionPort;
import com.qrpay.account.domain.Transaction;
import com.qrpay.account.domain.Transaction.TransactionId;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
class GetTransactionDetailsService implements GetTransactionDetailsQuery {

	private final LoadTransactionPort loadTransactionPort;

	@Override
	public Transaction getDetails(TransactionId transactionId) {
		return loadTransactionPort.loadTransaction(transactionId);
	}

}
