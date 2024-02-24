package com.example.Nexus.controller;

import com.example.Nexus.exception.PhotoRetrievalException;
import com.example.Nexus.exception.ResourceNotFoundException;
import com.example.Nexus.model.BookedTile;
import com.example.Nexus.model.Tile;
import com.example.Nexus.response.BookingResponse;
import com.example.Nexus.response.TileResponse;
import com.example.Nexus.service.BookedTileService;
import com.example.Nexus.service.ITileService;
import com.example.Nexus.service.TileService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


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
    @DeleteMapping("/delete/tile/{tileId}")
    public ResponseEntity<Void> deleteTile(@PathVariable Long tileId){
        tileService.deleteTile(tileId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{tileId}")
    public ResponseEntity<TileResponse> updateTile(@PathVariable Long tileId,
                                                   @RequestParam(required = false) String collectionType,
                                                   @RequestParam(required = false) String groupType,
                                                   @RequestParam(required = false) BigDecimal price,
                                                   @RequestParam(required = false) String color,
                                                   @RequestParam(required = false) String size,
                                                   @RequestParam(required = false) String finishingType,
                                                   @RequestParam(required = false) MultipartFile photo ) throws IOException, SQLException {
        byte[] photoBytes = photo != null && !photo.isEmpty()?
                photo.getBytes() : tileService.getTilePhotoByTileId(tileId);
        Blob photoBlob = photoBytes != null && photoBytes.length > 0 ? new SerialBlob(photoBytes) : null;
        Tile theTile = tileService.updateTile(tileId, collectionType, groupType, price, color, size, finishingType, photoBytes);
        theTile.setPhoto(photoBlob);
        TileResponse tileResponse = getTileResponse(theTile);
        return ResponseEntity.ok(tileResponse);
    }

    @GetMapping("/tile/{tileId}")
    public  ResponseEntity<Optional<TileResponse>> getTileBYId(@PathVariable Long tileId){
        Optional<Tile> theTile = tileService.getTileById(tileId);
        return theTile.map(tile -> {
            TileResponse tileResponse = getTileResponse(tile);
            return ResponseEntity.ok(Optional.of(tileResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }
    private TileResponse getTileResponse(Tile tile) {
        List<BookedTile> bookings = getAllBookingsByTileId(tile.getId());

        // Check if bookings is null, if so, initialize it as an empty list
        if (bookings == null) {
            bookings = new ArrayList<>();
        }

        List<BookingResponse> bookingInfo = bookings.stream()
                .map(booking -> new BookingResponse(booking.getBookingId(),
                        booking.getBookingDate(),
                        booking.getBookingConfirmationCode()))
                .toList();

        byte[] photoBytes = null;
        if (tile.getPhoto() != null) {
            Blob photoBlob = tile.getPhoto();
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error Retrieving photo", e);
            }
        }

        return new TileResponse(tile.getId(), tile.getCollectionType(), tile.getGroupType(),
                tile.getPrice(), tile.getColor(), tile.getSize(), tile.getFinishingType(), tile.isBooked(),
                photoBytes, bookingInfo);
    }

    private List<BookedTile> getAllBookingsByTileId(Long tileId) {
        return bookedTileService.getAllBookingsByTileId(tileId);
    }
}
