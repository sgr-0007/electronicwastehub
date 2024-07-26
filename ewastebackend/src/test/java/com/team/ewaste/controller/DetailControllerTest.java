package com.team.ewaste.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.ewaste.common.response.Result;
import com.team.ewaste.pojo.BO.DeviceDetailBO;
import com.team.ewaste.pojo.DO.DeviceDetailDO;
import com.team.ewaste.pojo.DO.RoleDO;
import com.team.ewaste.pojo.DTO.AccountEditDTO;
import com.team.ewaste.pojo.DTO.AccountLoginDTO;
import com.team.ewaste.pojo.DTO.AccountRegisterDTO;
import com.team.ewaste.pojo.DTO.DeviceUpdateDetailDTO;
import com.team.ewaste.pojo.VO.AccountLoginVO;
import com.team.ewaste.repo.DeviceDetailRepo;
import com.team.ewaste.repo.RoleRepo;
import lombok.extern.slf4j.Slf4j;
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

import java.util.List;
import java.util.Random;

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
public class DetailControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DeviceDetailRepo deviceDetailRepo;

    @Test
    public void test_insertDefaultValue() {
        DeviceDetailDO deviceDetailDO = new DeviceDetailDO();
        deviceDetailDO
                //.setDeviceTypeId(1)
                .setUserId(1)
                .setModel("Iphone 10")
                .setBonus(Math.round(new Random().nextDouble() * 200 * 100.0) / 100.0)
                .setBrand("Apple")
                .setDeviceTypeId(1)
                .setDeviceClassificationId(1)
                .setExpectedValue(Math.round(new Random().nextDouble() * 200 * 100.0) / 100.0)
                .setDataTransferFee(Math.round(new Random().nextDouble() * 200 * 100.0) / 100.0)
                .setStatusId(1)
                .setIsDraft(false)
                .setIsActive(true)
                .setImageData("test image data");

        deviceDetailRepo.save(deviceDetailDO);
    }

    @Test
    public void test_getAllDevicesDetail() throws Exception {

        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .get("/devices/all/devicesdetail")
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Result<List<DeviceDetailBO>> result = objectMapper.readValue(responseBody, new TypeReference<Result<List<DeviceDetailBO>>>() {
        });

        List<DeviceDetailBO> data = result.getData();
        data.forEach(deviceDetailBO -> {
            log.debug("deviceDetailBO -> {}", deviceDetailBO);
        });
    }

    @Test
    public void test_updateDevice() throws Exception {

        int devicedetailedId = 1;
        Double expectedvalue = 99.99;
        Double datatransferfee = 111.99;
        Boolean isactive = false;


        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .put("/devices/info/{devicedetailedId}", devicedetailedId)
                        .param("expectedvalue", String.valueOf(expectedvalue))
                        .param("datatransferfee", String.valueOf(datatransferfee))
                        .param("isactive", String.valueOf(isactive))
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
    public void test_updateVisivility() throws Exception {

        int devicedetailedId = 1;
        Boolean isvisible = false;

        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .put("/devices/visibility/{devicedetailedId}", devicedetailedId)
                        .param("isvisible", String.valueOf(isvisible))
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Result<?> result = objectMapper.readValue(responseBody, new TypeReference<Result<?>>() {
        });

        assertEquals(Long.valueOf(1), Long.valueOf(result.getCode()));

        DeviceDetailDO deviceDetailDO = deviceDetailRepo.findByDeviceDetailsId(1);
        Integer statusId = deviceDetailDO.getStatusId();

        //if (isvisible) {
        //    assertEquals(Integer.valueOf(2), statusId);
        //} else {
        //    assertEquals(Integer.valueOf(1), statusId);
        //}
    }

    @Test
    public void test_updateDeviceDetailById() throws Exception {

        DeviceUpdateDetailDTO deviceUpdateDetailDTO = new DeviceUpdateDetailDTO();
        deviceUpdateDetailDTO.setDeviceDetailsId(1)
                .setUserId(1)
                .setModel("Samsung 10")
                .setBrand("Samsung")
                .setDeviceTypeId(1)
                .setDeviceClassificationId(1)
                .setExpectedValue(Math.round(new Random().nextDouble() * 200 * 100.0) / 100.0)
                .setStatusId(1);

        String body = objectMapper.writeValueAsString(deviceUpdateDetailDTO);

        String responseBody = mockMvc.perform(MockMvcRequestBuilders
                        .post("/devices/update/devicedetail")
                        .content(body)
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
