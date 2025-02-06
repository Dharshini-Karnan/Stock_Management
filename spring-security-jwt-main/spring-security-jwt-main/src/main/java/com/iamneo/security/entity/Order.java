package com.iamneo.security.entity;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String date;
    private int quantity;
    private int price;
    private int total;
    private String status;
    private String productName;
    private String customername;
    private Long customerph;
    @OneToMany(targetEntity = Product.class,cascade = CascadeType.ALL)
    @JoinColumn(name="pid",referencedColumnName = "id")
     private List<Product> products;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCustomername() {
        return customername;
    }

    public void setCustomername(String customername) {
        this.customername = customername;
    }

    public Long getCustomerph() {
        return customerph;
    }

    public void setCustomerph(Long customerph) {
        this.customerph = customerph;
    }

    public Order(Long id, String date, int quantity, int price, int total, String status, String customername,
            Long customerph, String productName) {
        this.id = id;
        this.date = date;
        this.quantity = quantity;
        this.price = price;
        this.total = total;
        this.status = status;
        this.customername = customername;
        this.customerph = customerph;
        this.productName = productName;
    }

    public Order() {

    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

}
