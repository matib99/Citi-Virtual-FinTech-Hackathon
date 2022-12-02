package com.qrpay.account.application.port.out;

import com.qrpay.account.domain.Payment;

public interface PaymentPort {
	
	boolean make_payment(Payment payment);

}
