package com.example.Nexus.controller;

import com.example.Nexus.service.TileService;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import com.example.Nexus.model.Tile;
import com.example.Nexus.response.TileResponse;
import com.example.Nexus.service.ITileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RequiredArgsConstructor
@RestController
public class TileController {

    private final TileService tileService;

    @PostMapping("/tiles")
    public ResponseEntity<TileResponse> addNewTile(@RequestParam("photo") MultipartFile photo,
                                                   @RequestParam("collectionType") String collectionType,
                                                   @RequestParam("groupType") String groupType,
                                                   @RequestParam("tileName") String tileName,
                                                   @RequestParam("tileSize") String tileSize,
                                                   @RequestParam("tileColor") String tileColor,
                                                   @RequestParam("finishingType") String finishingType,
                                                   @RequestParam("tilePrice") Integer tilePrice) throws IOException {

        Tile savedTile = tileService.addNewTile(photo, collectionType, groupType, tileName, tileSize, tileColor, finishingType, tilePrice);

        TileResponse response = new TileResponse(savedTile.getId(), savedTile.getCollectionType(), savedTile.getGroupType(), savedTile.getTilePrice());

        return ResponseEntity.ok(response);
    }
}