// package com.iamneo.security.controller;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;

// import com.iamneo.security.entity.Supplier;
// import com.iamneo.security.service.SupplierService;

// public class SupplierController {

// @Autowired
// SupplierService serv;

// @GetMapping("/supplier")
// public ResponseEntity<List<Supplier>> getAllSupplier() {
// List<Supplier> supplier = serv.getDetails();
// // products from MySQL
// return ResponseEntity.ok(supplier);
// }

// @PostMapping("/supplier")
// public ResponseEntity<Supplier> addSupplier(@RequestBody Supplier product) {
// Supplier savedProduct = serv.savesSupplier(product);
// return ResponseEntity.ok(savedProduct);
// }
// }
