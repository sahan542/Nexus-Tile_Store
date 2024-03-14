package com.example.Nexus.repository;

import com.example.Nexus.model.BookedTile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookedTile, Long> {
    List<BookedTile> findByTileId(Long tileId);

     BookedTile findByBookingConfirmationCode(String confirmationCode);
}
