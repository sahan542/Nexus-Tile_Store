package com.example.Nexus.service;

import com.example.Nexus.model.Tile;
import com.example.Nexus.repository.TileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TileService implements ITileService{

    private final TileRepository tileRepository;
    @Override
    public Tile addNewTile(MultipartFile photo, String collectionType, String groupType, BigDecimal price, String color, String size, String finishingType) throws SQLException, IOException {
        Tile tile = new Tile();
        tile.setCollectionType(collectionType);
        tile.setGroupType(groupType);
        tile.setPrice(price);
        tile.setColor(color);
        tile.setSize(size);
        tile.setFinishingType(finishingType);
        if(!photo.isEmpty()){
            byte[] photoBytes = photo.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            tile.setPhoto(photoBlob);
        }
        return tileRepository.save(tile);
    }

    @Override
    public List<String> getAllCollectionTypes() {
        return tileRepository.findDistinctCollectionTypes();
    }

    @Override
    public List<String> getAllGroupTypes() {
        return tileRepository.findDistinctGroupTypes();
    }


}
