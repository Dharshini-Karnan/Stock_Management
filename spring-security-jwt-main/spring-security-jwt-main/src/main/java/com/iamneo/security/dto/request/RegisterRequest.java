package com.iamneo.security.dto.request;

import com.iamneo.security.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role;

    public Role getRole() {
        // Convert the provided role string to a Role enum value
        if (role != null) {
            try {
                return Role.valueOf(role.toUpperCase());
            } catch (IllegalArgumentException e) {

            }
        }

        return Role.ADMIN;
    }
}
