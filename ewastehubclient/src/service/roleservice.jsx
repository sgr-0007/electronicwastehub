export const RoleService = {

    getRolesData() {

        return [

            {
                roleid: 1,
                role: 'admin',
            },
            {
                roleid: 3,
                role: 'staff',
            },
            {
                roleid: 2,
                role: 'owner',
            },
            
        ]
    },

    getRoles() {
        return Promise.resolve(this.getRolesData());

    }
};