package com.iamneo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.Warehouse;

@Repository
public interface WarehouseRepo extends JpaRepository<Warehouse, Integer> {
    @Query("SELECT w.id FROM Warehouse w WHERE w.name = :name")
    Integer findIdByWarehouseName(String name);
    Warehouse findByName(String name);
}
