export const DeviceTypeService = {

    getDeviceTypeData() {

        return [

            {
                deviceTypeId: 1,
                deviceType: 'Smartphone',
            },
            {
                deviceTypeId: 2,
                deviceType: 'Laptop',
            },
            {
                deviceTypeId: 3,
                deviceType: 'Tablet',
            },
            {
                deviceTypeId: 4,
                deviceType: 'Smartwatch',
            },
            {
                deviceTypeId: 5,
                deviceType: 'Gaming Console',
            },
            {
                deviceTypeId: 6,
                deviceType: 'Camera',
            },
        
        ]
    },

    getDeviceTypes() {
        return Promise.resolve(this.getDeviceTypeData());
    },
    getDeviceType(deviceTypeId) {
        const deviceTypeData = this.getDeviceTypeData();
        const deviceType = deviceTypeData.find(item => item.deviceTypeId === deviceTypeId);
        return deviceType;
    },
    getForDropdown() {
        const deviceTypeData = this.getDeviceTypeData();
        const transformedTypes = deviceTypeData.map(type => ({
            label: type.deviceType,
            value: type.deviceTypeId.toString()
        }));
        return transformedTypes;
    }
};