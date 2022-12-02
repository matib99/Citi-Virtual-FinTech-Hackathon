package com.qrpay.account.adapter.out.persistence;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "locks")
@Data
@AllArgsConstructor
@NoArgsConstructor
class LockJpaEntity {

	@Id
	@GeneratedValue
	private String id;
}
