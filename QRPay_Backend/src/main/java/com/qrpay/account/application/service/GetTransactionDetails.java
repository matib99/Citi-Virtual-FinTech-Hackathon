package com.qrpay.account.application.service;

import java.time.LocalDateTime;

import com.qrpay.account.application.port.in.GetTransactionDetailsQuery;
import com.qrpay.account.domain.Money;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
class GetTransactionDetailsService implements GetTransactionDetailsQuery {

	private final LoadTransactionPort loadTransactionPort;
	
	public GetTransactionDetailsService(LoadTransactionPort loadAccountPort) {
		this.loadTransactionPort = loadAccountPort;
	}

	@Override
	public Money getTransationDetails(TransactionId transactiontId) {
		return PersistancePort.loadTransaction(transactionId)
				.calculateBalance();
	}

}
