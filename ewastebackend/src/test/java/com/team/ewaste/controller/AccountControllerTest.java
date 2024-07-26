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
public class AccountControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RoleRepo roleRepo;

    @Before
    public void setUp() {
        RoleDO user = new RoleDO();
        user.setRole("user");
        if (roleRepo.findByRole("user")== null) {
            roleRepo.save(user);
        }

        RoleDO staff = new RoleDO();
        staff.setRole("staff");
        if (roleRepo.findByRole("staff") == null) {
            roleRepo.save(staff);
        }

        RoleDO localTrader = new RoleDO();
        localTrader.setRole("localTrader");
        if (roleRepo.findByRole("localTrader") == null) {
            roleRepo.save(localTrader);
        }

        RoleDO admin = new RoleDO();
        admin.setRole("admin");
        if (roleRepo.findByRole("admin") == null) {
            roleRepo.save(admin);
        }
    }

    @Test
    public void test_register() throws Exception {

        AccountRegisterDTO accountRegisterDTO = new AccountRegisterDTO();
        accountRegisterDTO.setUserEmail("abcdefg@gmail.com")
                .setPassword("abcdefg123456")
                .setName("Mike")
                //.setRole("admin")
                .setIsActive(true)
                .setRoleId(1);

        String body = objectMapper.writeValueAsString(accountRegisterDTO);

        String responseBody = mockMvc.perform(MockMvcRequestBuilders.post("/account/register")
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


    @Test
    public void test_login() throws Exception {
        AccountLoginDTO accountLoginDTO = new AccountLoginDTO();
        accountLoginDTO.setUserEmail("abcdefg@gmail.com")
                .setPassword("abcdefg123456");

        String body = objectMapper.writeValueAsString(accountLoginDTO);

        String responseBody = mockMvc.perform(MockMvcRequestBuilders.post("/account/login")
                        .content(body)
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Result<AccountLoginVO> result  = objectMapper.readValue(responseBody, new TypeReference<Result<AccountLoginVO>>() {
        });

        // login fail
        //assertEquals("User Not Found", result.getMsg());
        // login successful
        assertEquals("abcdefg@gmail.com", result.getData().getUserEmail());
    }


    @Test
    public void test_editUserInfo() throws Exception {
        AccountEditDTO accountEditDTO = new AccountEditDTO();
        accountEditDTO.setUserId(1)
                .setUserEmail("123asd@gmail.com")
                .setName("John")
                //.setPassword("12hhqwesa3456")
                //.setRole("admin")
                //.setIsActive(true)
                .setRoleId(1);

        String body = objectMapper.writeValueAsString(accountEditDTO);

        String responseBody = mockMvc.perform(MockMvcRequestBuilders.put("/account/edit/info")
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
