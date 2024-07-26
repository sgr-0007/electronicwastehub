export const DeviceStatusService = {

    getDeviceStatusData() {

        return [

            {
                statusId: 1,
                status: 'Received',
            },
            {
                statusId: 2,
                status: 'Verified',
            },
            {
                statusId: 3,
                status: 'Data Wiped',
            },
            {
                statusId: 4,
                status: 'Payment Received',
            },
            {
                statusId: 5,
                status: 'Data Dispatched',
            },
            {
                statusId: 6,
                status: 'Qr Scanned',
            },
        
        ]
    },

    getDeviceStatus(statusId) {
        const statusData = this.getDeviceStatusData();
        const status = statusData.find(item => item.statusId === statusId);
        return status;
    }
};