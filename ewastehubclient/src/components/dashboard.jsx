import React from 'react'
import Navbar from './navbar'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from "html2canvas";
import { Chart } from 'primereact/chart';
import { useRef, useEffect, useState } from 'react';
import { DeviceTypeService } from '../service/devicetypeservice';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { DeviceStatusService } from '../service/devicestatusservice';
import { DeviceClassService } from '../service/deviceclassificationservice';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import logo from '../assets/images/waste1.png';
import referral from '../assets/images/referral.gif';
import devicedash from '../assets/images/devicedash.gif';
import usersstats from '../assets/images/users.gif';
import { set } from 'react-hook-form';







const dashboard = () => {
    const [products, setProducts] = useState([]);
    const [usersStats, setUsersStats] = useState(0);
    const [referrals, setReferrals] = useState(0);
    const [deviceTypes, setDeviceTypes] = useState([]);
    const [statData, setStatData] = useState([]);
    const [users, setUsers] = useState([]);
    let currentProducts = [];
    let recycleProducts = [];

    const getStatus = (statusId) => {
        const status = DeviceStatusService.getDeviceStatus(statusId);
        return status.status;
    };
    const getCategory = (deviceTypeId) => {
        const category = DeviceTypeService.getDeviceType(deviceTypeId);
        return category.deviceType;
    };
    const getClass = (deviceClassId) => {
        const deviceClass = DeviceClassService.getDeviceClassById(deviceClassId);
        return deviceClass.deviceClass;
    }
    const headerUser = (
        <img alt="Card" src={usersstats} style={{ width: '100px' }} />
    );

    const headerDevice = (
        <img alt="Card" src={devicedash} style={{ width: '100px' }} />
    );

    const headerReferral = (
        <img alt="Card" src={referral} style={{ width: '100px' }} />
    );

    const statusData = DeviceStatusService.getDeviceStatusData();
    const statuslabels = statusData.map(item => item.status);
    const pieData = {
        labels: statuslabels,
        datasets: [
            {
                data: statData,
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56",
                    "#4BC0C0", "#9966FF", "#FF9F40"
                ],
                hoverBackgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56",
                    "#4BC0C0", "#9966FF", "#FF9F40"
                ]
            }]
    };
    const pieOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'right'
            }
        }
    };
    const exportChartToImage = () => {
        const chart = document.querySelector('.p-chart'); // Adjust selector if necessary
        html2canvas(chart).then((canvas) => {
            const image = canvas.toDataURL('image/png');
            exportPdf(image);
        });
    };
    const findUserEmailById = (userId) => {
        const user = users.find(user => user.userid === userId);
        if (user) {
            return user.useremail;
        } else {
            console.log('User not found');
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(value);
    }

    const exportPdf = (image) => {
        const doc = new jsPDF();        
        doc.addImage(image, 'PNG', 65, 35, 80, 80);  
        const tableColumn = ["Owner", "Model", "Brand", "Type", "Class", "Status"];
        const tableRows = [];

        const tableColumnRecycle = ["Owner", "Model", "Brand", "Status", "Paid"];
        const tableRowsRecycle = [];

        console.log(products);
        currentProducts = products.filter(x=>x.deviceClassificationId==1 || x.deviceClassificationId==3);
        recycleProducts = products.filter(x=>(x.deviceClassificationId==2) && (x.statusId==4 || x.statusId==5));
        currentProducts.forEach(product => {
            const productData = [

                findUserEmailById(product.userId),
                product.model,
                product.brand,
                getCategory(product.deviceTypeId),
                getClass(product.deviceClassificationId),
                getStatus(product.statusId)
            ];
            tableRows.push(productData);
        });
        recycleProducts.forEach(product => {
            const productData = [
                findUserEmailById(product.userId),
                product.model,
                product.brand,
                getStatus(product.statusId),
                (product.statusId==4 || product.statusId == 5) ? '120 £' : '150 £'
                
            ];
            tableRowsRecycle.push(productData);
        });
        console.log(currentProducts);
        console.log(recycleProducts);
        const data = [];
        const row1 = [...statData];
        row1.unshift("Count");
        data.push(row1);
        let numDevices = 0;
        for (let i = 0; i < 6; i++) {
            numDevices += statData[i];
        }
        // const row2 = [];
        // for (let i = 0; i < 6; i++) {
        //     row2.push((100 * parseInt(statData[i]) / 6).toFixed(2)).toString();
        // }
        // row2.unshift("%");
        // data.push(row2);
        const labels = [...statuslabels];
        labels.unshift("");
        doc.autoTable(labels, data, { startY: 10 });
        doc.autoTable(tableColumn, tableRows, { startY: 120 });
        doc.autoTable(tableColumnRecycle, tableRowsRecycle, { startY: 250 });
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

        doc.save(dateTime + "devicesreport.pdf");
    }
    useEffect(() => {
        DeviceTypeService.getDeviceTypes().then(data => setDeviceTypes(data));
        const fetchDevices = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/devices/all/devicesdetail`);
                setProducts(response.data.data);
                console.log(response.data.data);
                const stats = [0, 0, 0, 0, 0, 0];

                const totalReferrals = response.data.data.reduce((acc, device) => {
                    return acc + (device.referral || 0); 
                  }, 0);
                  setReferrals(totalReferrals); 
                console.log('Total referrals:', totalReferrals);              
                for (let i = 0; i < response.data.data.length; i++) {
                    stats[response.data.data[i].statusId - 1]++;
                }

                setStatData(stats);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };
        const fetchUsersStats = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/statistics/getAllData`);
                setUsersStats(response.data.data.totalNumberOfOwners);
                console.log(response.data.data.totalNumberOfOwners);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/staff/findall/user`);
                setUsers(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
        fetchUsersStats();
        fetchDevices();
    }, []);

    return (
        <>
            <Navbar />
            <div className='grid mt-1' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div className='col-3'>
                    <Card style={{ borderRadius: '20px 20px 20px 20px', boxShadow: `0 4px 8px 0 rgba(80, 143, 25, 0.2), 0 6px 20px 0 rgba(80, 143, 25, 0.19)`}}
                     title="Owners" subTitle="Active Owners" header={headerUser} className="md:w-25rem">
                        <p className="m-0" style={{ fontWeight: 'bold', fontSize: '50px', justifyContent: 'center', display: 'flex' }}>
                            {usersStats > 0 ? `${usersStats}` : 'No Active Owners'}
                        </p>
                    </Card>
                </div>
                <div className='col-3'>

                    <Card style={{ borderRadius: '20px 20px 20px 20px', boxShadow: `0 4px 8px 0 rgba(80, 143, 25, 0.2), 0 6px 20px 0 rgba(80, 143, 25, 0.19)`}}
                     title="Devices" subTitle="Verified Devices" header={headerDevice} className="md:w-25rem">
                        <p className="m-0" style={{ fontWeight: 'bold', fontSize: '50px', justifyContent: 'center', display: 'flex' }}>
                            {products.length > 0 ? `${products.length}` : 'No Verified Devices'}
                        </p>
                    </Card>
                </div>

                <div className='col-3'>

                    <Card style={{ borderRadius: '20px 20px 20px 20px', boxShadow: `0 4px 8px 0 rgba(80, 143, 25, 0.2), 0 6px 20px 0 rgba(80, 143, 25, 0.19)`}}
                      title="Referrals" subTitle="Successful Referrals" header={headerReferral} className="md:w-25rem">
                        <p className="m-0" style={{ fontWeight: 'bold', fontSize: '50px', justifyContent: 'center', display: 'flex' }}>
                            {referrals > 0 ? `${referrals}` : 'No Referrals'}
                        </p>
                    </Card>
                </div>
            </div>
            <div className='flex mx-8 flex justify-content-center'>
                <Chart type="pie" data={pieData} options={pieOptions} className="w-full md:w-30rem" />
            </div>
            <div className='flex mx-8 flex justify-content-center'>
            </div>
            <div className='fixed bottom-0 right-0 p-3' style={{ paddingBottom: '30px', paddingRight: '30px' }}>
                <Button icon="pi pi-download" label='Report' aria-label="Report" onClick={exportChartToImage} />

            </div>

        </>
    );
}

export default dashboard