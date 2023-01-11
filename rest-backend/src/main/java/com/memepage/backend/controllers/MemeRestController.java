package com.memepage.backend.controllers;

import com.memepage.backend.entities.Meme;
import com.memepage.backend.repositories.MemeRepository;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:8080")
@RestController
public class MemeRestController {

    public final MemeRepository memeRepository;
    public final MongoClient mongoClient;
    public GridFSBucket gridFSBucket;

    Logger log = LoggerFactory.getLogger(MemeRestController.class);

    public MemeRestController(MemeRepository memeRepository, MongoClient mongoClient) {
        this.memeRepository = memeRepository;
        this.mongoClient = mongoClient;
        MongoDatabase mongoDatabase = mongoClient.getDatabase("memes");
        this.gridFSBucket = GridFSBuckets.create(mongoDatabase);
    }

    @GetMapping("/memes")
    public List<Meme> getAllMemes() {
        return this.memeRepository.findAll();
    }

    @GetMapping("/meme/{id}")
    public Optional<Meme> getMemeById(@PathVariable("id") String id) {
        return this.memeRepository.findById(new ObjectId(id));
    }

    @GetMapping("/meme/file/{id}")
    public ResponseEntity<StreamingResponseBody> getMemeFile(@PathVariable("id") String id) {
        ObjectId fileId = new ObjectId(getMemeById(id).get().getFileID());
        GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(fileId);
        StreamingResponseBody body = outputStream -> FileCopyUtils.copy(downloadStream, outputStream);
        GridFSFile file = downloadStream.getGridFSFile();
        return ResponseEntity.ok()
                .header("Content-Type", file.getMetadata().get("type").toString())
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .contentLength(file.getLength()).body(body);
    }

    @PostMapping("/upload")
    public String uploadMeme(@RequestParam("title") String title, @RequestParam("file") MultipartFile file) {
        Meme newMeme = new Meme();
        newMeme.setTitle(title);
        try (InputStream streamToUploadFrom = file.getInputStream()) {
            GridFSUploadOptions options = new GridFSUploadOptions()
                    .chunkSizeBytes(1024)
                    .metadata(new Document("type", file.getContentType()));
            ObjectId fileId = gridFSBucket.uploadFromStream(file.getOriginalFilename(), streamToUploadFrom, options);
            newMeme.setFileID(fileId.toHexString());
            newMeme.setUploadDate(new Date(System.currentTimeMillis()).toString());
            this.memeRepository.save(newMeme);
            return newMeme.getId();
        } catch (IOException e) {
            e.printStackTrace();
            return "Error";
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMeme(@PathVariable("id") String id) {
        Optional<Meme> memeToDelete = this.memeRepository.findById(new ObjectId(id));
        ObjectId fileId = new ObjectId(memeToDelete.get().getFileID());
        gridFSBucket.delete(fileId);
        this.memeRepository.delete(memeToDelete.get());
    }

    @DeleteMapping("/dropMemeFiles")
    public void dropMemeFiles() {
        gridFSBucket.drop();
        this.memeRepository.deleteAll();
    }


}







