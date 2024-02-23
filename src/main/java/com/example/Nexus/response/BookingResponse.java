package com.example.Nexus.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {

    private Long id;
    private LocalDate bookingDate;
    private String cusName;
    private String cusEmail;
    private String cusAddress;
    private String cusPhone;
    private String bookingConfirmationCode;
    private TileResponse tile;


    public BookingResponse(Long id, LocalDate bookingDate, String bookingConfirmationCode) {
        this.id = id;
        this.bookingDate = bookingDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
