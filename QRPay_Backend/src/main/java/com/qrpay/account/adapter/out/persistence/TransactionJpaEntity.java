package com.qrpay.account.adapter.out.persistence;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transaction")
@Data
@AllArgsConstructor
@NoArgsConstructor
class TransactionJpaEntity {

	@Id
	@GeneratedValue
	private String id;
	
	@Column
	private String targetAccountId;

	@Column
	private Long amount;
	
	@Column
	private boolean state;

}
