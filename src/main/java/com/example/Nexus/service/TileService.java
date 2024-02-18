package com.example.Nexus.service;


import com.example.Nexus.model.Tile;
import com.example.Nexus.repository.TileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@Service
public class TileService implements ITileService {

    private final TileRepository tileRepository;
    private final GridFsTemplate gridFsTemplate;

    @Override
    public Tile addNewTile(MultipartFile file, String collectionType, String groupType, String tileName, String tileSize, String tileColor, String finishingType, Integer tilePrice) throws IOException {
        // Create a new tile entity
        Tile tile = new Tile();
        tile.setCollectionType(collectionType);
        tile.setGroupType(groupType);
        tile.setTileName(tileName);
        tile.setTileSize(tileSize);
        tile.setTileColor(tileColor);
        tile.setFinishingType(finishingType);
        tile.setTilePrice(tilePrice);

        if (!file.isEmpty()) {
            byte[] photoBytes = file.getBytes();
            tile.setPhoto(photoBytes); // Set the photo data directly
        }

        // Save the tile entity
        return tileRepository.save(tile);
    }
}