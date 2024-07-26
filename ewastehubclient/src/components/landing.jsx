import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Navbar from './navbar';
import { Card } from 'primereact/card';
import Checkmydevice from './checkmydevice';
import { Button } from 'primereact/button';
import iphone14 from '../assets/images/iphone14.png';
import Lottie from 'react-lottie';
import loyalty from '../assets/images/loyalty.json';
import { Messages } from 'primereact/messages';
import { useRef } from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Image } from 'primereact/image';





const MyComponent = () => {
    const [devices, setProducts] = useState([]);
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [search, setSearch] = useState('');
    const [userLoyalty, setUserLoyalty] = useState(0);
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const userId = userData.id;
    const msgs = useRef(null);


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loyalty,
        renderer: 'svg',
    };

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/devices/all/devicesdetail`);
                setProducts(response.data.data);
                setFilteredDevices(response.data.data);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };
        const fetchUsers = async () => {
            try {
                const responseUsers = await axios.get(`${API_BASE_URL}/staff/findall/user`);
                console.log(responseUsers.data.data);
                //filter by user id
                const userLoyalty = responseUsers.data.data.find(u => u.userid === userId).loyaltypoints;
                if(userLoyalty === null) {
                    setUserLoyalty(0);
                    if (msgs.current) {
                        msgs.current.clear();
                        msgs.current.show({ id: '1', sticky: true, severity: 'success', summary: 'Loyalty Earned', detail: `${0}`, closable: false });
                    }
                    return;
                }                
                setUserLoyalty(userLoyalty);
                console.log(userLoyalty);
                if (msgs.current) {
                    msgs.current.clear();
                    msgs.current.show({ id: '1', sticky: true, severity: 'success', summary: 'Loyalty Earned', detail: `${userLoyalty}`, closable: false });
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
        fetchDevices();
    }, []);

    const handleSearch = () => {
        const result = devices.filter(device =>
            device.brand.toLowerCase().includes(search.toLowerCase()) ||
            device.model.toLowerCase().includes(search.toLowerCase()) ||
            device.expectedValue.toString().includes(search)
        );
        setFilteredDevices(result);
    };


    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f0f0',
            margin: 0,
        }}>
            <Navbar />

           
            <Card style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>

                <div className='grid'>
                    <div className='col-4' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Messages className='custom-tooltip-btn' ref={msgs} />
                    </div>
                    <div className='col-4' style={{ display: 'flex', alignItems: 'center' }}>
                        <Lottie options={defaultOptions} height={300} width={300} />
                    </div>
                    <div className='col-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Checkmydevice />  

                </div>
                </div>
                <Tooltip target=".custom-tooltip-btn" position="top">
                    <div>
                        <h4>My Loyalty Points</h4>
                        <p>As a loyal customer, you have earned {userLoyalty} points.</p>
                        <p>Get your free data retrieval at 120!</p>
                    </div>
                </Tooltip>



                <div className='grid'>
                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Search for electronics..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                padding: '10px',
                                width: '60%', // Adjust width as needed
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                        <Button
                            icon="pi pi-search"
                            title='Search'
                            onClick={handleSearch}
                            style={{
                                padding: '10px 20px',
                                marginLeft: '10px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                backgroundColor: '#4CAF50', // Button color
                                color: 'white', // Button text color
                            }}
                        >
                        </Button>
                    </div>

                    
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {filteredDevices.map((device) => (
                        <div key={device.deviceDetailsId} style={{
                            borderRadius: '20px 20px 20px 20px', boxShadow: '0 4px 8px 0 rgba(80, 143, 25, 0.2), 0 6px 20px 0 rgba(80, 143, 25, 0.19)',
                            transition: '0.3s',
                            width: '250px',
                            backgroundColor: '#fff',
                            margin: '10px',
                            padding: '10px',
                            textAlign: 'center',
                            display: 'inline-block',
                            justifyContent: 'space-around',
                        }}>
<Image src={`${device.imageData}` || iphone14} zoomSrc={`${device.imageData}` || iphone14} alt="Image"  width="150" height="150" preview style={{ display: 'flex', justifyContent:'center', padding:'10px' }} />
                        <h4>{device.brand} - {device.model}</h4>
                            <p>Expected Value: ${device.expectedValue.toLocaleString()}</p>
                        </div>
                    ))}
                </div>

            </Card>
        </div>
    );
};

export default MyComponent;

