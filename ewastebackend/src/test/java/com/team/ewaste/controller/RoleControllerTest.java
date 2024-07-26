package com.team.ewaste.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.ewaste.common.response.Result;
import com.team.ewaste.pojo.DO.RoleDO;
import com.team.ewaste.pojo.DTO.AccountEditDTO;
import com.team.ewaste.pojo.DTO.AccountLoginDTO;
import com.team.ewaste.pojo.DTO.AccountRegisterDTO;
import com.team.ewaste.pojo.VO.AccountLoginVO;
import com.team.ewaste.repo.RoleRepo;
import org.junit.Before;
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
public class RoleControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void test_upgradeRole() throws Exception {

        int adminUserId = 2;
        int memberUserId = 1;
        String role = "staff";

        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .put("/staff/updateRole")
                        .param("adminUserId", String.valueOf(adminUserId))
                        .param("memberUserId", String.valueOf(memberUserId))
                        .param("role", role)
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Result<?> result = objectMapper.readValue(responseBody, new TypeReference<Result<?>>() {
        });

        assertEquals(Long.valueOf(1), Long.valueOf(result.getCode()));
    }
}
