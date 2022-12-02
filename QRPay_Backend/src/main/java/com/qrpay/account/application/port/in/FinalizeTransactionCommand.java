package com.qrpay.account.application.port.in;

import com.qrpay.account.domain.Transaction.AccountId;
import com.qrpay.account.domain.Transaction.TransactionId;
import com.qrpay.common.SelfValidating;
import lombok.EqualsAndHashCode;
import lombok.Value;

import javax.validation.constraints.NotNull;

@Value
@EqualsAndHashCode(callSuper = false)
public
class FinalizeTransactionCommand extends SelfValidating<FinalizeTransactionCommand> {

    @NotNull
    private final AccountId sourceAccountId;

    @NotNull
    private final TransactionId transactionId;

    public FinalizeTransactionCommand(
            AccountId sourceAccountId,
            TransactionId transactionId) {
        this.sourceAccountId = sourceAccountId;
        this.transactionId = transactionId;
        this.validateSelf();
    }
}
