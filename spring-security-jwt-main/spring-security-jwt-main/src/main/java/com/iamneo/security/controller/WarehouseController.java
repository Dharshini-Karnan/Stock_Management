package com.iamneo.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.iamneo.security.entity.Product;
import com.iamneo.security.entity.Warehouse;
import com.iamneo.security.service.WarehouseService;

@RequestMapping("/api/v1/auth")
@CrossOrigin("https://localhost:3000")
@Controller
public class WarehouseController {
    @Autowired
    WarehouseService serv;

    @GetMapping("/warehouse")
    public ResponseEntity<List<Warehouse>> getAllProducts() {
        List<Warehouse> products = serv.getDetails();
        // products from MySQL
        return ResponseEntity.ok(products);
    }

    @PostMapping("/warehouse")
    public ResponseEntity<Warehouse> addProduct(@RequestBody Warehouse product) {
        Warehouse savedProduct = serv.savesProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @DeleteMapping("/warehouse/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") int id) {
        serv.delete(id);
        return ResponseEntity.ok("Product Deleted Successfully");
    }

    @PutMapping("/warehouse/{id}")
    public ResponseEntity<Warehouse> updateWare(@PathVariable("id")int id,@RequestBody Warehouse obj){
        Warehouse update= serv.updateware(id, obj);
        return ResponseEntity.ok(update);
    }

    

}
