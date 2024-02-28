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
    private String cusName;
    private String cusEmail;
    private String cusAddress;
    private String cusPhone;
    private String bookingConfirmationCode;
    private TileResponse tile;


    public BookingResponse(Long id, String bookingConfirmationCode) {
        this.id = id;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }


}
