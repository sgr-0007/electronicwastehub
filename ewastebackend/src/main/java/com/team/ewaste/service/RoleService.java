package com.team.ewaste.service;

public interface RoleService {

    /**
     * upgrade role
     * @param adminUserId
     * @param memberUserId
     * @param role
     */
    void upgradeRole(int adminUserId, int memberUserId, String role);
}
