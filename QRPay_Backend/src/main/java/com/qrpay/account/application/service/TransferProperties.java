package com.qrpay.account.application.service;

import com.qrpay.account.domain.Money;
import lombok.Data;

/**
 * Configuration properties for money transfer use cases.
 */
@Data
public class TransferProperties {

  public static Money maximumTransferThreshold = Money.of(10_000L);
  
  public static int id_length = 10;

}
