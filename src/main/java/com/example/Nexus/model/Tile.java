package com.example.Nexus.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "Tile")
@Getter
@Setter
@AllArgsConstructor
public class Tile {
    @Id
    private String id;
    private String collectionType;
    private String groupType;
    private String tileName;
    private String tileSize;
    private String tileColor;
    private String finishingType;
    private Integer tilePrice;
    private boolean isBooked = false;
    private List<BookedTile> bookings;
    private byte[] photo;

    public Tile() {
        this.bookings = new ArrayList<>();
    }

    public void addBooking(BookedTile booking){
        if(bookings == null){
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        booking.setTile(this);
        isBooked = true;
        String bookingCode = RandomStringUtils.randomNumeric(10);
        booking.setBookingConfirmationCode(bookingCode);
    }
}
