package com.iamneo.security.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamneo.security.entity.Product;
import com.iamneo.security.entity.Supplier;
import com.iamneo.security.repository.SupplierRepo;

@Service
public class SupplierService {
    @Autowired
    SupplierRepo repo;

    public Supplier savesSupplier(Supplier p) {
        return repo.save(p);
    }

    public List<Supplier> getDetails() {
        List<Supplier> arr = new ArrayList<>();
        arr = (List<Supplier>) repo.findAll();
        return arr;
    }
}
