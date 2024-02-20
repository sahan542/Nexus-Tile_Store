package com.example.Nexus.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.codec.binary.Base64;


import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class TileResponse {
    private Long id;
    private String collectionType;
    private String groupType;
    private BigDecimal price;
    private String color;
    private String size;
    private String finishingType;
    private boolean isBooked;
    private String photo;
    private List<BookingResponse> bookings;

    public TileResponse(Long id, String collectionType, String groupType, BigDecimal price, String color, String size, String finishingType) {
        this.id = id;
        this.collectionType = collectionType;
        this.groupType = groupType;
        this.price = price;
        this.color = color;
        this.size = size;
        this.finishingType = finishingType;
    }

    public TileResponse(Long id, String collectionType, String groupType, BigDecimal price, String color,
                        String size, String finishingType, boolean isBooked, byte[] photoBytes, List<BookingResponse> bookings) {
        this.id = id;
        this.collectionType = collectionType;
        this.groupType = groupType;
        this.price = price;
        this.color = color;
        this.size = size;
        this.finishingType = finishingType;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.bookings = bookings;
    }
}
