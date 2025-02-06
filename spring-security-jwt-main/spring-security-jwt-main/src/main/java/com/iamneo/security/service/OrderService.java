package com.iamneo.security.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamneo.security.entity.Order;
import com.iamneo.security.entity.Product;
import com.iamneo.security.repository.OrderRepo;

@Service
public class OrderService {
    @Autowired
    OrderRepo repo;

    public Order savesProduct(Order p) {
        return repo.save(p);
    }

    public List<Order> getDetails() {
        List<Order> arr = new ArrayList<>();
        arr = (List<Order>) repo.findAll();
        return arr;
    }

    public void delete(int id) {
        repo.deleteById(id);
    }
     
    public Order updateOrder(int id,Order obj){
        Order order=repo.findById(id).get();
        if(Objects.nonNull(order)&&(!Objects.isNull(obj.getCustomername()))){
            order.setCustomername(obj.getCustomername());
        }
        if(Objects.nonNull(order)&&(!Objects.isNull(order.getCustomerph()))){
            order.setCustomerph(obj.getCustomerph());
        }
        if(Objects.nonNull(order)&&(!Objects.isNull(order.getDate()))){
            order.setDate(obj.getDate());
        }
        if(Objects.nonNull(order)&&(!Objects.isNull(order.getProductName()))){
            order.setProductName(obj.getProductName());
        }
        if(Objects.nonNull(order)&&(!Objects.isNull(order.getStatus()))){
            order.setStatus(obj.getStatus());
        }
        if(Objects.nonNull(order)&&(!Objects.isNull(order.getPrice()))){
            order.setPrice(obj.getPrice());
        }
        if(Objects.nonNull(order)&&(!Objects.isNull(order.getQuantity()))){
            order.setQuantity(obj.getQuantity());
        }
        if(Objects.nonNull(order)&&(!Objects.isNull(order.getTotal()))){
            order.setTotal(obj.getTotal());
        }


        
        return repo.saveAndFlush(order);
    }
     

}
