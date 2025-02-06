package com.iamneo.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    //  @Query("SELECT * FROM Product p WHERE p.warehouse_id = :warehouseId")
    // List<Product> findByWareId(int warehouseId);
}
