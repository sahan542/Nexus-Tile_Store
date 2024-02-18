package com.example.Nexus.response;

import com.example.Nexus.model.BookedTile;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@NoArgsConstructor
public class TileResponse {

    @Id
    private String id;
    private String collectionType;
    private String groupType;
    private String tileName;
    private String tileSize;
    private String tileColor;
    private String finishingType;
    private Integer tilePrice;
    private boolean isBooked;
    private String photo;

    private List<BookingResponse> bookings;

    public TileResponse(String id, String collectionType, String groupType, Integer tilePrice) {
        this.id = id;
        this.collectionType = collectionType;
        this.groupType = groupType;
        this.tilePrice = tilePrice;
    }

    public TileResponse(String id, String collectionType, String groupType, String tileName, String tileSize, String tileColor,
                        String finishingType, Integer tilePrice, boolean isBooked, byte[] photoBytes, List<BookingResponse> bookings) {
        this.id = id;
        this.collectionType = collectionType;
        this.groupType = groupType;
        this.tileName = tileName;
        this.tileSize = tileSize;
        this.tileColor = tileColor;
        this.finishingType = finishingType;
        this.tilePrice = tilePrice;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.bookings = bookings;
    }
}
