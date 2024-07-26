package com.team.ewaste.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.ewaste.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/images")
@Slf4j
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }


    @PostMapping("/upload/{devicedetailsid}")
    public ResponseEntity<String> uploadImage(@PathVariable Integer devicedetailsid, @RequestBody String imageData) throws JsonProcessingException {
        log.debug("device details id: {}, imageData -> {}", devicedetailsid, imageData);
        ObjectMapper mapper = new ObjectMapper();
        Map jsonData = mapper.readValue(imageData, Map.class);
        String base64 = (String) jsonData.get("imageData");
        imageService.uploadImage(devicedetailsid, base64);

        return ResponseEntity.ok("Image uploaded successfully");
    }


    @GetMapping("/getImage/{devicedetailsid}")
    public ResponseEntity<String> getImage(@PathVariable Integer devicedetailsid) {
        // data:image/png;base64,UklGRrorAABXRUJQ
        return ResponseEntity.ok("data:image/png;base64," + imageService.getImage(devicedetailsid));
    }
}