package com.memepage.backend.repositories;

import com.memepage.backend.entities.Meme;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MemeRepository extends MongoRepository<Meme, ObjectId> {
}
