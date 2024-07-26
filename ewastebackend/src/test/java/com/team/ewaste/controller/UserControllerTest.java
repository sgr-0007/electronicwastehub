package com.team.ewaste.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.ewaste.common.response.Result;
import com.team.ewaste.pojo.DTO.SendEmailDTO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

/**
 * @author Kyle
 * @date 2024/04/18
 */
@AutoConfigureMockMvc
@SpringBootTest
@RunWith(SpringRunner.class)
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void test_sendEmail() throws Exception {

        // need read email address
        SendEmailDTO sendEmailDTO = new SendEmailDTO();
        sendEmailDTO.setUserId(1)
                .setDeviceDetailsId(1);

        String body = objectMapper.writeValueAsString(sendEmailDTO);

        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .post("/user/device/secureemaillink")
                        .content(body)
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Result result = objectMapper.readValue(responseBody, new TypeReference<Result>() {
        });

        Thread.sleep(3000);
        assertEquals(Long.valueOf(1), Long.valueOf(result.getCode()));
    }

}
