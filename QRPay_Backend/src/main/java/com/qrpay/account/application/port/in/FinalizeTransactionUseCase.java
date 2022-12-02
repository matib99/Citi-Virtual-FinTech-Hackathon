package com.qrpay.account.application.port.in;

public interface FinalizeTransactionUseCase {

	boolean finalize(FinalizeTransactionCommand command);

}
