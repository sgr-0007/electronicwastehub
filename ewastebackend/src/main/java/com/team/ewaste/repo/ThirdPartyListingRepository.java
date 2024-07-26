package com.team.ewaste.repo;

import com.team.ewaste.pojo.VO.ThirdPartyListingVO;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ThirdPartyListingRepository {

    public List<ThirdPartyListingVO> getAllListings() {
        // Dummy implementation to return a list of third-party listings
        List<ThirdPartyListingVO> listings = new ArrayList<>();

        // Add sample listings
        listings.add(new ThirdPartyListingVO("CeX", "iPhone X", 250.0));
        listings.add(new ThirdPartyListingVO("CeX", "Samsung Galaxy S10", 300.0));
        listings.add(new ThirdPartyListingVO("Gazelle", "iPhone 11 Pro", 600.0));
        listings.add(new ThirdPartyListingVO("Best Buy", "Google Pixel 5", 400.0));

        return listings;
    }
}

