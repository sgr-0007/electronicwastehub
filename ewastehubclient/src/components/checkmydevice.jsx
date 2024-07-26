import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../assets/images/device-placeholder.png';
import Navbar from './navbar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import check from '../assets/images/check.gif';
import { DeviceClassService } from '../service/deviceclassificationservice';
import iphone14 from '../assets/images/iphone14.png';
import { Tag } from 'primereact/tag';
import notfound from '../assets/images/not-found.gif';






const checkOut = () => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const userId = userData.id;
    const [devices, setProducts] = useState([]);
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [checkDevices, setCheckDevices] = useState([]);
    const [search, setSearch] = useState('');
    const [model, setModel] = useState('');
    const [classification, setClassification] = useState('');
    const [brand, setBrand] = useState('');

    const classificationOptions = [
        { label: 'Select Classification', value: '' },
        { label: 'Current', value: 'Current' },
        { label: 'Recycle', value: 'Recycle' },
        { label: 'Rare', value: 'Rare' },
        { label: 'Unknown', value: 'Unknown' },
    ];

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('right');
    const [visibleData, setVisibleData] = useState(true);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/devices/all/devicesdetail`);
                setProducts(response.data.data);
                setFilteredDevices(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };

        fetchDevices();
    }, []);

    
  const contentStyle = {
    backgroundColor: '#f5f5f5', // Light gray background color
    padding: '15px', // Adjust padding for content spacing
  };


    const contentTemplate4 = (device) => (
        <>
          <img src={device.imageData || placeholderImage} alt={`${device.brand} ${device.model}`} style={{ borderRadius: '10px 10px 0px 0px', margin: '10px',height: '250px',
                width: '250px',
                aspectRatio: "250/250",
                objectFit: "cover", }} />
          <div style={contentStyle}>
            <h4>{device.brand} - {device.model}</h4>
            <p>Expected Value: ${device.expectedValue.toLocaleString()}</p>
            {device.isActive && <Tag severity="success" value="Verified"></Tag>}
          </div>
        </>
      );

    const getClass = (deviceClass) => {
        const deviceClassId = DeviceClassService.getDeviceClassByName(deviceClass);
        return deviceClassId;
    }

    const handleFilter = () => {

        const result = devices.filter(device =>
            device.brand.toLowerCase().includes(brand.toLowerCase()) &&
            device.model.toLowerCase().includes(model.toLowerCase()) &&
            device.deviceClassificationId === getClass(classification) &&
            device.userId === userId
        );
        console.log(result);
        (result.length === 0) ? setVisibleData(false) : setVisibleData(true);
        setCheckDevices(result);
    };

    const handleReset = () => {
        setSearch('');
        setModel('');
        setBrand('');
        setClassification('');
        setCheckDevices([]);
        setVisibleData(true);
    };
   
    const show = (position) => {
        setPosition(position);
        setVisible(true);
    };
    const footerContent = (
        <div>
              <Button label="Reset" icon="pi pi-times" onClick={() => handleReset()} className="p-button-text" />
              <Button label="Check" icon="pi pi-check" onClick={() => handleFilter()} autoFocus />

        </div>
    );

    const headerContent = (
        <div>
            <img src={check} alt="check" style={{ width: '50px', height: '50px' }} />
        </div>
    );  


    return (
        <div>           
      
            <div style={{ display: 'flex', flexWrap: 'wrap',paddingBottom:'20px' , justifyContent: 'flex-end' }}>
       
              <Button label="Check My Device"
              onClick={() => show('right')}
              icon='pi pi-eye'/>
                </div>

                <Dialog header={headerContent} maximizable visible={visible} position={position} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={true}>
            <div>
                <div className='grid'>
                    <div className='col-4'>
                        <InputText id="model" placeholder='Check By Model..' value={model} onChange={(e) => setModel(e.target.value)} />
                    </div>
                    <div className='col-4'>
                        <InputText id="brand" placeholder='Check By Brand..' value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </div>
                    <div className='col-4'>
                        <Dropdown
                            id="classification"
                            value={classification}
                            options={classificationOptions}
                            onChange={(e) => setClassification(e.value)}
                            placeholder="Select Classification"
                        />
                    </div>

                </div>
            </div>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '5px' }}>
             { (checkDevices.length > 0) && checkDevices.map((device) => (
                    <div key={device.deviceDetailsId} style={{ margin: '15px 0' }}>

                <Card style={{ borderRadius: '30px 0px 30px 0px', boxShadow: `0 4px 8px 0 rgba(80, 143, 25, 0.2), 0 6px 20px 0 rgba(80, 143, 25, 0.19)`
              }
                } key={device.deviceDetailsId} header={contentTemplate4(device)}>
                </Card>
              </div>
              ))}
                { (!visibleData) && <img src={notfound} alt="notfound" style={{ width: '50%', height: '50%' }} />}
            </div>
              </Dialog>
            
        </div>
    );
};

export default checkOut;