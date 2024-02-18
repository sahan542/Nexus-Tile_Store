package com.example.Nexus.repository;

import com.example.Nexus.model.Tile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TileRepository extends MongoRepository<Tile, String> {
}
