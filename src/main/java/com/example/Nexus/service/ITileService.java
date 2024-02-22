package com.example.Nexus.service;

import com.example.Nexus.model.Tile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

public interface ITileService {
    Tile addNewTile(MultipartFile photo, String collectionType, String groupType, BigDecimal price, String color, String size, String finishingType) throws SQLException, IOException;



    List<String> getAllCollectionTypes();

    List<String> getAllGroupTypes();
}
