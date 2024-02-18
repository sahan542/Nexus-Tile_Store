package com.example.Nexus.service;

import com.example.Nexus.model.Tile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;

public interface ITileService {
    Tile addNewTile(MultipartFile photo, String collectionType, String groupType, String tileName, String tileSize, String tileColor, String finishingType, Integer tilePrice) throws IOException, SQLException;
}
