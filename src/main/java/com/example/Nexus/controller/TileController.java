package com.example.Nexus.controller;

import com.example.Nexus.exception.PhotoRetrievalException;
import com.example.Nexus.model.BookedTile;
import com.example.Nexus.model.Tile;
import com.example.Nexus.response.BookingResponse;
import com.example.Nexus.response.TileResponse;
import com.example.Nexus.service.BookedTileService;
import com.example.Nexus.service.ITileService;
import com.example.Nexus.service.TileService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/tiles")
public class TileController {

    private final ITileService tileService;
    private final BookedTileService bookedTileService;

    @PostMapping("/add/new-tile")
    public ResponseEntity<TileResponse> addNewTile(@RequestParam("photo") MultipartFile photo,
                                                   @RequestParam("collectionType") String collectionType,
                                                   @RequestParam("groupType") String groupType,
                                                   @RequestParam("price") BigDecimal price,
                                                   @RequestParam("color") String color,
                                                   @RequestParam("size") String size,
                                                   @RequestParam("finishingType") String finishingType) throws SQLException, IOException {
        Tile savedTile = tileService.addNewTile(photo, collectionType, groupType, price, color, size, finishingType);
        TileResponse response = new TileResponse(savedTile.getId(), savedTile.getCollectionType(), savedTile.getGroupType(),
                                            savedTile.getPrice(), savedTile.getColor(), savedTile.getSize(), savedTile.getFinishingType());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/collection-types")
    public List<String> getCollectionTypes(){
        return tileService.getAllCollectionTypes();
    }

    @GetMapping("/group-types")
    public List<String> getGroupTypes(){
        return tileService.getAllGroupTypes();
    }
    @GetMapping("/all-tiles")
    public ResponseEntity<List<TileResponse>> getAllTiles() throws SQLException {
        List<Tile> tiles = tileService.getAllTiles();
        List<TileResponse> tileResponses = new ArrayList<>();
        for(Tile tile : tiles){
            byte[] photoBytes = tileService.getTilePhotoByTileId(tile.getId());
            if(photoBytes != null && photoBytes.length > 0){
                String base64Photo = Base64.encodeBase64String(photoBytes);
                TileResponse tileResponse = getTileResponse(tile);
                tileResponse.setPhoto(base64Photo);
                tileResponses.add(tileResponse);
            }
        }
        return ResponseEntity.ok(tileResponses);
    }

    private TileResponse getTileResponse(Tile tile) {
        List<BookedTile> bookings = getAllBookingsByTileId(tile.getId());
        List<BookingResponse> bookingInfo = bookings
                .stream().map(booking -> new BookingResponse(booking.getBookingId(),
                        booking.getBookingDate(), booking.getBookingConfirmationCode())).toList();
        byte[] photoBytes = null;
        Blob photoBlob = tile.getPhoto();
        if(photoBlob != null){
            try{
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());

            }
            catch(SQLException e){
                throw new PhotoRetrievalException("Error Retrieving photo");
            }
        }
        return new TileResponse(tile.getId(), tile.getCollectionType(), tile.getGroupType(),
                                tile.getPrice(), tile.getColor(), tile.getSize(), tile.getFinishingType(), tile.isBooked(),
                                 photoBytes, bookingInfo );
    }

    private List<BookedTile> getAllBookingsByTileId(Long tileId) {
        return bookedTileService.getAllBookingsByTileId(tileId);
    }
}
