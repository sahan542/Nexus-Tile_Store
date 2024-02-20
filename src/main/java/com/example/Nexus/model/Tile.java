package com.example.Nexus.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Tile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String collectionType;
    private String groupType;
    private BigDecimal price;
    private String color;
    private String size;
    private String finishingType;
    private boolean isBooked = false;
    @Lob
    private Blob photo;
    @OneToMany(mappedBy= "tile", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedTile> bookings;

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
