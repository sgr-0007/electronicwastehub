package com.team.ewaste.service;

import java.io.IOException;

/**
 * @author Kyle
 * @date 2024/04/11
 */
public interface ImageService {
    void uploadImage(Integer devicedetailsid, String decodedBytes);

    String getImage(Integer devicedetailsid);
}
