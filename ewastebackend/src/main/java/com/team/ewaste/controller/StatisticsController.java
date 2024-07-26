package com.team.ewaste.controller;

import com.team.ewaste.common.response.Result;
import com.team.ewaste.pojo.VO.StatisticsDataVO;
import com.team.ewaste.repo.DeviceTypeRepo;
import com.team.ewaste.service.StaffService;
import com.team.ewaste.service.StatisticsService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Kyle
 * @date 2024/04/23
 * get statistics data
 */
@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/statistics")
@Api(tags = "Statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("getAllData")
    public Result<StatisticsDataVO> getAllStatistics() {
        return Result.success(statisticsService.getAllStatistics());
    }
}
