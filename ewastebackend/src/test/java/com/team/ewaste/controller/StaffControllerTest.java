package com.team.ewaste.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.ewaste.common.response.Result;
import com.team.ewaste.pojo.BO.AccountInfoBO;
import com.team.ewaste.pojo.DO.RoleDO;
import com.team.ewaste.pojo.DTO.AccountEditDTO;
import com.team.ewaste.pojo.DTO.AccountLoginDTO;
import com.team.ewaste.pojo.DTO.AccountRegisterDTO;
import com.team.ewaste.pojo.DTO.DeviceDetailDTO;
import com.team.ewaste.pojo.VO.AccountLoginVO;
import com.team.ewaste.repo.RoleRepo;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
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
import springfox.documentation.spring.web.json.Json;

import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

/**
 * @author Kyle
 * @date 2024/04/18
 */
@AutoConfigureMockMvc
@SpringBootTest
@RunWith(SpringRunner.class)
@Slf4j
public class StaffControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void test_createDeviceDetail() throws Exception {

        DeviceDetailDTO deviceDetailDTO = new DeviceDetailDTO();
        deviceDetailDTO
                .setUserId(1)
                .setModel("Test model")
                .setBrand("Test brand")
                .setDeviceTypeId(1)
                .setDeviceClassificationId(1)
                .setExpectedValue(222.2)
                .setDataTransferFee(111.1)
                .setIsActive(true)
                .setIsDraft(false)
                .setStatusId(1);

        String body = objectMapper.writeValueAsString(deviceDetailDTO);

        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .post("/staff/device/detail")
                        .content(body)
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertEquals("true", new JSONObject(responseBody).get("success").toString());
    }

    @Test
    public void test_viewDeviceStatus() throws Exception {
        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .get("/staff/device/status/{deviceDetailId}", 3)
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Result<?> result = objectMapper.readValue(responseBody, new TypeReference<Result<?>>() {
        });

        log.debug("result: {}", result);
    }

    @Test
    public void test_updateDeviceStatus() throws Exception {
        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .put("/staff/device/status")
                        .param("deviceDetailsId", String.valueOf(3))
                        .param("statusId", String.valueOf(2))
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

    @Test
    public void test_findAllUsers() throws Exception {
        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .get("/staff/findall/user")
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Result<List<AccountInfoBO>> result = objectMapper.readValue(responseBody, new TypeReference<Result<List<AccountInfoBO>>>() {
        });

        log.debug("result: {}", result);
    }

    @Test
    public void test_updateClassifyDevice() throws Exception {
        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .put("/staff/device/classify")
                        .param("deviceClassificationId", String.valueOf(1))
                        .param("deviceClassification", "test classification")
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
