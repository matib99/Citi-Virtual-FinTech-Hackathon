package com.qrpay.account.application.service;

import com.qrpay.account.application.port.in.SendMoneyCommand;
import com.qrpay.account.application.port.in.SendMoneyUseCase;
import com.qrpay.account.application.port.out.PaymentPort;
import com.qrpay.account.domain.Payment;
import com.qrpay.common.UseCase;
import lombok.RequiredArgsConstructor;

import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@UseCase
@Transactional
public class SendMoneyService implements SendMoneyUseCase {

	private final PaymentPort paymentPort;

	@Override
	public boolean sendMoney(SendMoneyCommand command) {
		if(command.getMoney().isGreater(TransferProperties.maximumTransferThreshold)) {
			return false;
		}
			
		
		if(!paymentPort.make_payment(new Payment(command.getSourceAccountId(), command.getTargetAccountId(), command.getMoney()))) {
			return false;
		}
		
		return true;
	}

}




