package com.qrpay.account.application.port.in;

import com.qrpay.account.domain.Account.AccountId;
import com.qrpay.account.domain.Money;
import com.qrpay.common.SelfValidating;

public interface SendMoneyUseCase {

	boolean sendMoney(SendMoneyCommand command);

}
