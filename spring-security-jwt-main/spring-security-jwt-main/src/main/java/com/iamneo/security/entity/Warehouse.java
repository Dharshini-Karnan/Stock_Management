package com.iamneo.security.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Warehouse")
public class Warehouse {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String location;
    private String capacity;
     @ManyToOne
   @JoinColumn(name="user_id")
   private User user;

    public int getId() {
        return id;
    }
 

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    

    public Warehouse(int id, String name, String location, String capacity) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
     
    }

    public Warehouse() {

    }
    public User getUser(){
        return user;
    }
    public void setUser(User user){
        this.user=user;
    }
   public Warehouse(int id){
    this.id=id;
   }
}
