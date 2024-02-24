package com.example.Nexus.service;

import com.example.Nexus.exception.InternalServerException;
import com.example.Nexus.exception.ResourceNotFoundException;
import com.example.Nexus.model.Tile;
import com.example.Nexus.repository.TileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

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

    @Override
    public List<Tile> getAllTiles() {
        return tileRepository.findAll();
    }

    @Override
    public byte[] getTilePhotoByTileId(Long tileId) throws SQLException {
        Optional<Tile> theTile = tileRepository.findById(tileId);
        if(theTile.isEmpty()){
            throw new ResourceNotFoundException("Sorry, Tile Not Found!");
        }
        Blob photoBlob = theTile.get().getPhoto();
        if(photoBlob != null){
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteTile(Long tileId) {
        Optional<Tile> theTile = tileRepository.findById(tileId);
        if (theTile.isPresent()){
            tileRepository.deleteById(tileId);
        }
    }

    @Override
    public Tile updateTile(Long tileId, String collectionType,
                           String groupType, BigDecimal price, String color,
                           String size, String finishingType, byte[] photoBytes) {
        Tile tile = tileRepository.findById(tileId)
                .orElseThrow(() -> new ResourceNotFoundException("Tile not Found"));
        if (collectionType != null) tile.setCollectionType(collectionType);
        if (groupType != null) tile.setGroupType(groupType);
        if (price != null) tile.setPrice(price);
        if (color != null) tile.setColor(color);
        if (size != null) tile.setSize(size);
        if (finishingType != null) tile.setFinishingType(finishingType);
        if (photoBytes != null && photoBytes.length > 0){
            try{
                tile.setPhoto(new SerialBlob(photoBytes));
            }
            catch(SQLException ex){
                throw new InternalServerException("Error Updating Tile");
            }
        }
        return tileRepository.save(tile);
    }

    @Override
    public Optional<Tile> getTileById(Long tileId) {
        return Optional.of(tileRepository.findById(tileId).get());
    }


}
