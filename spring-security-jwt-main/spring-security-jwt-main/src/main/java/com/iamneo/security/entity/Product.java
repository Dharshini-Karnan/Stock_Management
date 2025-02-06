package com.iamneo.security.entity;
import java.util.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;   
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity

@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String d;
    private int SKU;
    private int price;
    private int quantity;
    
   @ManyToOne
   @JoinColumn(name="user_id")
   private User user;
   @ManyToOne
   @JoinColumn(name="warehouse_id")
   private Warehouse ware;
    // @OneToMany
    // @JoinColumn(name = "product_id")
    // private Order orders;    
    public Product() {
    }

    public Product(int id, String name, String d, int SKU, int price, int quantity) {
        this.id = id;
        this.name = name;
        this.d = d;
        this.SKU = SKU;
        this.price = price;
        this.quantity = quantity;
       
    }
    
    
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getD() {
        return d;
    }

    public int getSKU() {
        return SKU;
    }

    public int getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setD(String d) {
        this.d = d;
    }

    public void setSKU(int SKU) {
        this.SKU = SKU;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
public User getUser(){
    return user;
}
public void setUser(User user){
    this.user=user;
}
public Warehouse getWare(){
    return ware;
}
public void setWare(Warehouse ware){
    this.ware=ware;
}
//    public Order getOrder(){
//     return orders;
//    }
//    public void setOrder(Order orders){
//     this.orders=orders;
//    }

}
