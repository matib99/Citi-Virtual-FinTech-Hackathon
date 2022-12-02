package com.qrpay.account.adapter.out.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.qrpay.account.application.port.out.PaymentPort;
import com.qrpay.account.domain.Payment;
import com.qrpay.common.WebAdapter;

import lombok.RequiredArgsConstructor;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class MakePaymentController implements PaymentPort {
	
	@Value( "${payments.url:127.0.0.1:5000}" )
	private String url;
	
	@Override
	public boolean make_payment(Payment payment) {
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> result = restTemplate.postForEntity(url, payment, String.class);
	    return result.getStatusCode().is2xxSuccessful();
	}
	
}
