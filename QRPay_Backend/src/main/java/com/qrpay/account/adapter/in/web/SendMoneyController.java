package com.qrpay.account.adapter.in.web;

import com.qrpay.account.application.port.in.SendMoneyUseCase;
import com.qrpay.account.application.port.in.SendMoneyCommand;
import com.qrpay.common.WebAdapter;
import com.qrpay.account.domain.Money;
import com.qrpay.account.domain.Transaction.AccountId;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
class SendMoneyController {

	private final SendMoneyUseCase sendMoneyUseCase;

	@PostMapping(path = "/user/{targetAccountId}")
	void sendMoney(
			@PathVariable("targetAccountId") AccountId targetAccountId,
			@RequestBody SendMoneyBody body) {

		SendMoneyCommand command = new SendMoneyCommand(
				body.token,
				targetAccountId,
				body.amount);

		sendMoneyUseCase.sendMoney(command);
	}
	
	@RequiredArgsConstructor
	class SendMoneyBody {
		private final AccountId token;
		private final Money amount;
	}

}
