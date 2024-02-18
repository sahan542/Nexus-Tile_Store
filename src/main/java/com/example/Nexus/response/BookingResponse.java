package com.example.Nexus.response;

import com.example.Nexus.model.Tile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    @Id
    private String bookingId;
    private LocalDate bookingDate;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String bookingConfirmationCode;
    private TileResponse tile;

    public BookingResponse(String bookingId, LocalDate bookingDate, String bookingConfirmationCode) {
        this.bookingId = bookingId;
        this.bookingDate = bookingDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
