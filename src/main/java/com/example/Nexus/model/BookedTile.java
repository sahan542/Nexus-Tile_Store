package com.example.Nexus.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "BookingTiles")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookedTile {

    @Id
    private String bookingId;
    private LocalDate bookingDate;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String bookingConfirmationCode;
    @DBRef
    private Tile tile;

    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
