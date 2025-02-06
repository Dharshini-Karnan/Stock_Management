package com.iamneo.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.security.dto.request.AuthenticationRequest;
import com.iamneo.security.dto.request.RegisterRequest;
import com.iamneo.security.dto.response.AuthenticationResponse;
import com.iamneo.security.entity.Product;
import com.iamneo.security.entity.Supplier;
import com.iamneo.security.service.AuthenticationService;
import com.iamneo.security.service.ProductService;
import com.iamneo.security.service.SupplierService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        System.out.println("Block");
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    // @GetMapping("/products")
    // public ResponseEntity<List<Product>> getAllProducts() {
    // List<Product> products = serv.getDetails();
    // // products from MySQL
    // return ResponseEntity.ok(products);
    // }

    // @PostMapping("/products")
    // public ResponseEntity<Product> addProduct(@RequestBody Product product) {
    // Product savedProduct = serv.savesProduct(product);
    // return ResponseEntity.ok(savedProduct);
    // }
    // }
    @Autowired
    SupplierService serv;

    @GetMapping("/supplier")
    public ResponseEntity<List<Supplier>> getAllSupplier() {
        List<Supplier> supplier = serv.getDetails();
        // products from MySQL
        return ResponseEntity.ok(supplier);
    }

    @PostMapping("/supplier")
    public ResponseEntity<Supplier> addSupplier(@RequestBody Supplier product) {
        Supplier savedProduct = serv.savesSupplier(product);
        return ResponseEntity.ok(savedProduct);
    }
}
