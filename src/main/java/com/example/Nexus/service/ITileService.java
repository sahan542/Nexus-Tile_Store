package com.example.Nexus.service;

import com.example.Nexus.model.Tile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;

public interface ITileService {
    Tile addNewTile(MultipartFile photo, String collectionType, String groupType, BigDecimal price, String color, String size, String finishingType) throws SQLException, IOException;
}
