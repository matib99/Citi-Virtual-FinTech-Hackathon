package com.qrpay.account.adapter.in.web;

import com.qrpay.account.application.port.in.CreateTransactionUseCase;
import com.qrpay.account.application.port.in.FinalizeTransactionCommand;
import com.qrpay.account.application.port.in.FinalizeTransactionUseCase;
import com.qrpay.account.application.port.in.GetTransactionDetailsQuery;
import com.qrpay.common.WebAdapter;
import com.qrpay.account.domain.Money;
import com.qrpay.account.domain.Transaction;
import com.qrpay.account.domain.Transaction.AccountId;
import com.qrpay.account.domain.Transaction.TransactionId;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
class TransactionController {

	private final CreateTransactionUseCase createTransactionUseCase;
	private final FinalizeTransactionUseCase finalizeTransactionUseCase;
	private final GetTransactionDetailsQuery getTransactionDetailsQuery;

	@PostMapping(path = "/{transactionId}")
	void finalizeTransaction(
			@PathVariable("transactionId") TransactionId transactionId, 
			@RequestBody FinalizeTransactionBody body) {

		FinalizeTransactionCommand command = new FinalizeTransactionCommand(
				body.token, 
				transactionId
		); 
		finalizeTransactionUseCase.finalize(command);
	}
	
	@PostMapping(path = "/initialize")
	void initializeTransaction(
			@RequestBody InitializeTransactionBody body) {

		Transaction transaction = Transaction.newTransaction(body.name, body.amount);
		createTransactionUseCase.createTransaction(transaction);
	}
	
	@GetMapping(path = "/{transactionId}")
	Transaction getTransactionDetails(
			@PathVariable("transactionId") TransactionId transactionId) {
		
		return getTransactionDetailsQuery.getDetails(transactionId);
	}
	
	@RequiredArgsConstructor
	class FinalizeTransactionBody {
		private final AccountId token;
	}
	
	@RequiredArgsConstructor
	class InitializeTransactionBody {
		private final AccountId name;
		private final Money amount;
	}

}
