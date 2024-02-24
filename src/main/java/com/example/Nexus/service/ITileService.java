package com.example.Nexus.service;

import com.example.Nexus.model.Tile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface ITileService {
    Tile addNewTile(MultipartFile photo, String collectionType, String groupType, BigDecimal price, String color, String size, String finishingType) throws SQLException, IOException;



    List<String> getAllCollectionTypes();

    List<String> getAllGroupTypes();

    List<Tile> getAllTiles();

    byte[] getTilePhotoByTileId(Long tileId) throws SQLException;


    void deleteTile(Long tileId);

    Tile updateTile(Long tileId, String collectionType, String groupType,
                    BigDecimal price, String color, String size,
                    String finishingType, byte[] photoBytes);

    Optional<Tile> getTileById(Long tileId);
}
