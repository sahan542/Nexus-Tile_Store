package com.example.Nexus.repository;

import com.example.Nexus.model.Tile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TileRepository extends JpaRepository<Tile, Long> {
    @Query("SELECT DISTINCT r.collectionType FROM Tile r")
    List<String> findDistinctCollectionTypes();
    @Query("SELECT DISTINCT r.groupType FROM Tile r")
    List<String> findDistinctGroupTypes();
}
