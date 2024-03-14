package com.example.Nexus.repository;

import com.example.Nexus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existByEmail(String email);

    void deleteByEmail(String email);

    Optional<User> findByEmail(String email);
}
