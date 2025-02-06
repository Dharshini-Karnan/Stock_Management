package com.iamneo.security.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import com.google.common.base.Objects;
import java.util.Objects;
import com.iamneo.security.entity.Product;
import com.iamneo.security.repository.ProductRepo;

@Service
public class ProductService {
    @Autowired
    ProductRepo repo;

    public Product savesProduct(Product p) {
        var product = repo.save(p);
        System.out.println(product);
        return product;
    }

    public List<Product> getDetails() {
        List<Product> arr = new ArrayList<>();
        arr = (List<Product>) repo.findAll();
        System.out.println(arr);
        return arr;
    }

    public void delete(int id) {
        repo.deleteById(id);
    }
    
    public Product updateProduct(int id,Product obj){
        Product product=repo.findById(id).get();
        if(Objects.nonNull(product)&&(!Objects.isNull(product.getD()))){
            product.setD(obj.getD());
        }
        if(Objects.nonNull(product)&&(!Objects.isNull(product.getName()))){
            product.setName(obj.getName());
        }
        if(Objects.nonNull(product)&&(!Objects.isNull(product.getPrice()))){
            product.setPrice(obj.getPrice());
        }
        if(Objects.nonNull(product)&&(!Objects.isNull(product.getQuantity()))){
            product.setQuantity(obj.getQuantity());
        }
        if(Objects.nonNull(product)&&(!Objects.isNull(product.getSKU()))){
            product.setSKU(obj.getSKU());
        }
        return repo.saveAndFlush(product);
    }
    // public List<Product> getProductsByWarehouseId(int warehouseId) {
    //     return repo.findByWareId(warehouseId);
    // }
    
}
