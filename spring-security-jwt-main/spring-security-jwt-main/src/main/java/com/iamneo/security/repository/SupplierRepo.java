package com.iamneo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.Supplier;

@Repository
public interface SupplierRepo extends JpaRepository<Supplier, Integer> {

}
