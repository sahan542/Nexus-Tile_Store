package com.example.Nexus.controller;

import com.example.Nexus.exception.InvalidBookingRequestException;
import com.example.Nexus.exception.ResourceNotFoundException;
import com.example.Nexus.model.BookedTile;
import com.example.Nexus.model.Tile;
import com.example.Nexus.response.BookingResponse;
import com.example.Nexus.response.TileResponse;
import com.example.Nexus.service.IBookingService;
import com.example.Nexus.service.ITileService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final IBookingService bookingService;
    private final ITileService tileService;
    @GetMapping("all-bookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        List<BookedTile> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedTile booking : bookings){
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }
    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode( @PathVariable String confirmationCode){
        try{
            BookedTile booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);

        }
        catch(ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());

        }
    }


    @PostMapping("/tile/{tileId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long tileId,
                                         @RequestBody BookedTile bookingRequest){
        try{
            String confirmationCode = bookingService.saveBooking(tileId, bookingRequest);
            return ResponseEntity.ok(confirmationCode);

        }
        catch(InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());

        }

    }

    @GetMapping("/user/{email}/bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email){
        List<BookedTile> bookings = bookingService.getBookingsByUserEmail(email);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedTile booking : bookings){
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }



    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(BookedTile booking) {
        Tile theTile = tileService.getTileById(booking.getTile().getId()).get();
        TileResponse tile = new TileResponse(theTile.getId(),
                                            theTile.getCollectionType(),
                                            theTile.getGroupType(),
                                            theTile.getPrice(),
                                            theTile.getColor(),
                                            theTile.getSize(),
                                            theTile.getFinishingType()

                );
        return new BookingResponse(booking.getBookingId(),
                                    booking.getCusName(),
                                    booking.getCusEmail(),
                                    booking.getCusAddress(),
                                    booking.getCusPhone(),
                                    booking.getBookingConfirmationCode(), tile);
    }
}
