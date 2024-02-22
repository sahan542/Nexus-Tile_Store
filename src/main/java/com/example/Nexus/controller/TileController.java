package com.example.Nexus.controller;

import com.example.Nexus.model.Tile;
import com.example.Nexus.response.TileResponse;
import com.example.Nexus.service.ITileService;
import com.example.Nexus.service.TileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/tiles")
public class TileController {

    private final ITileService tileService;

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
}
