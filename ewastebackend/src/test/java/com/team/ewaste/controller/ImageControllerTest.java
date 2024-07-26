package com.team.ewaste.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.ewaste.common.response.Result;
import com.team.ewaste.pojo.DTO.AccountEditDTO;
import com.team.ewaste.pojo.DTO.AccountLoginDTO;
import com.team.ewaste.pojo.VO.AccountLoginVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

/**
 * @author Kyle
 * @date 2024/04/18
 */
@AutoConfigureMockMvc
@SpringBootTest
@RunWith(SpringRunner.class)
public class ImageControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void test_uploadImage() throws Exception {

        String imageData = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAkACQAAD/4QCARXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEo" +
                "AAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAACQAAAAAQAAAJAAAAABAAKgAgAEAAAAAQAAAzygAwAEAAAAAQAABq0AAAAA/+0AOFBob3Rvc2hvcCA" +
                "zLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/iAjRJQ0NfUFJPRklMRQABAQAAAiRhcHBsBAAAAG1udHJSR0IgWFlaIAfh" +
                "AAcABwANABYAIGFjc3BBUFBMAAAAAEFQUEwAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtYXBwbMoalYIlfxBNOJkT1dHqFYIAAAAAAAAAAAAAAAAAA";

        String body = objectMapper.writeValueAsString(imageData);

        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .post("/images/upload/{devicedetailsid}", 1)
                        .content(body)
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();


        assertEquals("Image uploaded successfully", responseBody);
    }


    @Test
    public void test_getImage() throws Exception {
        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .get("/images/getImage/{devicedetailsid}", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        //ResponseEntity stringResponseEntity = objectMapper.readValue(responseBody, new TypeReference<ResponseEntity>() {
        //});

        assertTrue(responseBody.startsWith("data:image/png;base64,"));
    }
}
