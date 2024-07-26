export const DeviceClassService = {

    getDeviceClassData() {

        return [

            {
                deviceClassId: 1,
                deviceClass: 'Current',
            },
            {
                deviceClassId: 2,
                deviceClass: 'Recycle',
            },
            {
                deviceClassId: 3,
                deviceClass: 'Rare',
            },
            {
                deviceClassId: 4,
                deviceClass: 'Unknown',
            },
        
        ]
    },

    getDeviceClass() {
        return Promise.resolve(this.getDeviceClassData());

    },
    getDeviceClassById(deviceClassId) {
        const deviceClassData = this.getDeviceClassData();
        const deviceClass = deviceClassData.find(item => item.deviceClassId === deviceClassId);
        return deviceClass;
    },

    getDeviceClassByName(deviceClass) {
        const deviceClassData = this.getDeviceClassData();
        const deviceClassId = deviceClassData.find(item => item.deviceClass === deviceClass).deviceClassId;
        return deviceClassId;
    }
};