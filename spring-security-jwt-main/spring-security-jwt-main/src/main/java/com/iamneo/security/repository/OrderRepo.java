package com.iamneo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {

}
