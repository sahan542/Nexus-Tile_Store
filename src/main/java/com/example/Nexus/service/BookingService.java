package com.example.Nexus.service;

import com.example.Nexus.exception.InvalidBookingRequestException;
import com.example.Nexus.model.BookedTile;
import com.example.Nexus.model.Tile;
import com.example.Nexus.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements IBookingService{
    private final BookingRepository bookingRepository;
    private final ITileService tileService;

    //this was added as the constructors of above.you can remove it
    public BookingService(BookingRepository bookingRepository, ITileService tileService) {
        this.bookingRepository = bookingRepository;
        this.tileService = tileService;
    }

    @Override
    public List<BookedTile> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<BookedTile> getBookingsByUserEmail(String email) {
        return bookingRepository.findByCusEmail(email);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public String saveBooking(Long tileId, BookedTile bookingRequest) {
        Tile tile = tileService.getTileById(tileId).get();
        List<BookedTile> existingBookings = tile.getBookings();
        boolean tileIsAvailable = tileIsAvailable(bookingRequest,existingBookings );
        if(tileIsAvailable){
            tile.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }
        else{
            throw new InvalidBookingRequestException("Sorry,This tile is not available");
        }
        return bookingRequest.getBookingConfirmationCode();
    }


    public List<BookedTile> getAllBookingsByTileId(Long tileId) {

        return bookingRepository.findByTileId(tileId);
    }

    @Override
    public BookedTile findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode);
    }


    private boolean tileIsAvailable(BookedTile bookingRequest, List<BookedTile> existingBookings) {

        return true;
    }


}
