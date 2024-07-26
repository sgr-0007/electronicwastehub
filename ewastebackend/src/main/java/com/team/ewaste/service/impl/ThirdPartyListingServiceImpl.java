package com.team.ewaste.service.impl;

import com.team.ewaste.pojo.VO.ThirdPartyListingVO;
import com.team.ewaste.repo.ThirdPartyListingRepository;
import com.team.ewaste.service.ThirdPartyListingService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThirdPartyListingServiceImpl implements ThirdPartyListingService {
    private final ThirdPartyListingRepository listingRepository;

    public ThirdPartyListingServiceImpl(ThirdPartyListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    public List<ThirdPartyListingVO> getAllListings() {
        return listingRepository.getAllListings();
    }
}
