package com.qrpay.account.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

interface SpringDataTransactionRepository extends JpaRepository<TransactionJpaEntity, Long> {
}
