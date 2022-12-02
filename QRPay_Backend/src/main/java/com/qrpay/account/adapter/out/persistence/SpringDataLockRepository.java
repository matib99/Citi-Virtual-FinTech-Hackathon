package com.qrpay.account.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

interface SpringDataLockRepository extends JpaRepository<LockJpaEntity, String> {
}
