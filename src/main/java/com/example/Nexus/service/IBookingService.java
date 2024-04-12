package com.example.Nexus.service;

import com.example.Nexus.model.BookedTile;

import java.util.List;

public interface IBookingService {
    void cancelBooking(Long bookingId);

    String saveBooking(Long tileId, BookedTile bookingRequest);

    BookedTile findByBookingConfirmationCode(String confirmationCode);

    List<BookedTile> getAllBookings();

    List<BookedTile> getBookingsByUserEmail(String email);
}
