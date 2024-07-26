package com.team.ewaste.controller;

import com.team.ewaste.common.response.Result;
import com.team.ewaste.pojo.VO.ThirdPartyListingVO;
import com.team.ewaste.service.ThirdPartyListingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/listings")
public class ThirdPartyListingController {
    private final ThirdPartyListingService listingService;

    public ThirdPartyListingController(ThirdPartyListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping
    public Result<List<ThirdPartyListingVO>> getAllListings() {
        return Result.success(listingService.getAllListings());
    }
}
