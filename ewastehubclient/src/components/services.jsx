import React from 'react'
import Navbar from './navbar'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Avatar } from 'primereact/avatar';
import current from '../assets/images/current.gif';
import recycle from '../assets/images/recycle.gif';
import rare from '../assets/images/rare.gif';
import unknown from '../assets/images/unknown.gif';
import iphone14 from '../assets/images/iphone14.png';
import nodata from '../assets/images/Nodata.png';
import { Image } from 'primereact/image';



import '../App.css';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';


const Services = () => {
  const userData = JSON.parse(sessionStorage.getItem('user'))
  ;
  const userId = userData.id;
  const navigate = useNavigate();

  const [filteredDevices, setFilteredDevices] = useState([]);

  
  useEffect(() => {


    const fetchDevices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/devices/all/devicesdetail`);
        const filteredDevicesByUser = response.data.data.filter(device => device.userId === userId);
        setFilteredDevices(filteredDevicesByUser);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  const handleQrCode = (device) => {
    const qrCodeData = `Identification: E Waste Hub\nBrand: ${device.brand}\nModel: ${device.model}\nExpected Value: $${device.expectedValue.toLocaleString()}`; // Combine device info for QR code
    return qrCodeData; // Return QR code data
  };

  const downloadQrCode = async (qrCodeData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/staff/device/status?deviceDetailsId=${qrCodeData.deviceDetailsId}&statusId=${6}`);

      if (response.status === 200) {
        const updatedDevices = filteredDevices.map(device => {
          if (device.deviceDetailsId === qrCodeData.deviceDetailsId) {
            return { ...device, statusId: 6 };
          }
          return device;
        });

        setFilteredDevices(updatedDevices);

        const resLoyalty = await axios.put(`${API_BASE_URL}/staff/user/loyaltypoints?loyaltyPoints=${10}&userId=${userId}`);
        console.log(resLoyalty);

        const resReferral = await axios.put(`${API_BASE_URL}/staff/device/referral?deviceDetailsId=${qrCodeData.deviceDetailsId}`);
        console.log(resReferral);
      }

      console.log(response);
      const qrInfo = handleQrCode(qrCodeData);
      const dataUrl = await QRCode.toDataURL(qrInfo, { type: 'png' });

      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');

      const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: 'image/png' });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      const timestamp = new Date().getTime();
      link.download = `device-qr-code-${timestamp}.png`;

      link.click();

      // Revoking the object URL after download to avoid memory leaks
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handlePayment = async (device) => {
    console.log(device);
    const deviceDetailsId = device.deviceDetailsId;
    navigate('/payment', { state: { deviceDetailsId } });

    if (response.status === 200) {
      console.log("Device status updated successfully!");
    } else {
      console.error("Failed to update device status:", response.data);
    }
  };

  const contentStyle = {
    backgroundColor: '#f5f5f5', // Light gray background color
    padding: '15px', // Adjust padding for content spacing
  };

  const contentTemplate1 = (device) => (
    console.log(device.imageData),

    <>
     {device.imageData !==null && <Image src={`${device.imageData}` || iphone14} zoomSrc={`${device.imageData}` || iphone14} alt="Image"  width="150" height="150" preview style={{ display: 'flex', justifyContent:'center', padding:'10px' }} />}
                 {device.imageData ===null && <img src={device.imageData || iphone14} alt={`${device.brand} ${device.model}`} style={{ borderRadius: '10px 10px 0px 0px', margin: '10px',height: '250px',
            width: '250px',
            aspectRatio: "250/250",
            objectFit: "fill", }} /> }
      <div style={contentStyle}>
        <h4>{device.brand} - {device.model}</h4>
        <p>Expected Value: ${device.expectedValue.toLocaleString()}</p>
        <a href={device.cex ? device.cex : `https://uk.webuy.com/search?stext=${device.brand} ${device.model}`} target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(76, 175, 80)', fontPalette: 'dark', fontWeight:'bold' }}>
          Check on CeX
        </a>
      </div>
    </>
  );

  const contentTemplate2 = (device) => (
    <>
     {device.imageData !==null && <Image src={`${device.imageData}` || iphone14} zoomSrc={`${device.imageData}` || iphone14} alt="Image"  width="150" height="150" preview style={{ display: 'flex', justifyContent:'center', padding:'10px' }} />}

                 {device.imageData ===null && <img src={device.imageData || iphone14} alt={`${device.brand} ${device.model}`} style={{ borderRadius: '10px 10px 0px 0px', margin: '10px',height: '250px',
            width: '250px',
            aspectRatio: "250/250",
            }} /> }
      <div style={contentStyle}>
        <h4>{device.brand} - {device.model}</h4>
        <p>Data Retrieval</p>

      </div>
    </>
  );

  const contentTemplate3 = (device) => (
    <>
     {device.imageData !==null && <img src={device.imageData|| iphone14} alt={`${device.brand} ${device.model}`} style={{ borderRadius: '10px 10px 0px 0px', margin: '10px',height: '250px',
            width: '250px',
            aspectRatio: "250/250",
            objectFit: "fill", }} /> }
                 {device.imageData ===null && <img src={device.imageData || iphone14} alt={`${device.brand} ${device.model}`} style={{ borderRadius: '10px 10px 0px 0px', margin: '10px',height: '250px',
            width: '250px',
            aspectRatio: "250/250",
            objectFit: "fill", }} /> }
      <div style={contentStyle}>
        <h4>{device.brand} - {device.model}</h4>
        <p>Expected Value: ${device.expectedValue.toLocaleString()}</p>
      </div>
    </>
  );
  const contentTemplate4 = (device) => (
    <>
     {device.imageData !==null && <img src={device.imageData|| iphone14} alt={`${device.brand} ${device.model}`} style={{ borderRadius: '10px 10px 0px 0px', margin: '10px',height: '250px',
            width: '250px',
            aspectRatio: "250/250",
            objectFit: "fill", }} /> }
                 {device.imageData ===null && <img src={device.imageData || iphone14} alt={`${device.brand} ${device.model}`} style={{ borderRadius: '10px 10px 0px 0px', margin: '10px',height: '250px',
            width: '250px',
            aspectRatio: "250/250",
            objectFit: "fill", }} /> }
      <div style={contentStyle}>
        <h4>{device.brand} - {device.model}</h4>
        <p>Expected Value: ${device.expectedValue.toLocaleString()}</p>
      </div>3
    </>
  );

  const footerTemplateCurrent = (device) => (
    <>
    {device.statusId === 1 && (
        <Button
          label="Awaiting Verification"
          icon="pi pi-info-circle"
          raised
          className="p-button"
          disabled
        />
      )}
      {device.statusId === 2 && (
        <Button label='Get QR Code' icon="pi pi-download" title='Get QrCode' className="p-button"

          onClick={() => downloadQrCode(device)} />
      )}
      {device.statusId === 6 && (
        <Button
          label="Qr Scanned"
          icon="pi pi-check"
          raised
          className="p-button"
          disabled
        />
      )}
      {device.statusId === 3 && (
        <Button
          label="Data Wiped"
          icon="pi pi-check"
          raised
          className="p-button"
          disabled
        />
      )}

    </>
  );

  const footerTemplateRare = (device) => (
    <>
    {device.statusId === 1 && (
        <Button
          label="Awaiting Verification"
          icon="pi pi-info-circle"
          raised
          className="p-button"
          disabled
        />
      )}
      {device.statusId === 2 && (
        <Button label='Get QR Code' icon="pi pi-download" title='Get QrCode' className="p-button"

          onClick={() => downloadQrCode(device)} />
      )}
      {device.statusId === 6 && (
        <Button
          label="Qr Scanned"
          icon="pi pi-check"
          raised
          className="p-button"
          disabled
        />
      )}
      {device.statusId === 3 && (
        <Button
          label="Data Wiped"
          icon="pi pi-check"
          raised
          className="p-button"
          disabled
        />
      )}

    </>
  );

  const footerTemplate = (device) => (
    <>
      {device.statusId === 1 && (
        <Button
          label="Awaiting Verification"
          icon="pi pi-info-circle"
          raised
          className="p-button"
          disabled
        />
      )}
      {device.statusId === 2 && (
        <Button
          label="Pay Now"
          icon="pi pi-credit-card"
          raised
          className="p-button"
          onClick={() => handlePayment(device)}
        />
      )}
      {device.statusId === 5 && (
        <Button
          label="Data retrieved"
          icon="pi pi-check"
          raised
          className="p-button"
          disabled
        />
      )}
      {device.statusId === 3 && (
        <Button
          label="Data Wiped"
          icon="pi pi-check"
          raised
          className="p-button"
          disabled
        />
      )}
      {device.statusId === 4 && (
        <Button
          label="Payment Done"
          icon="pi pi-check"
          raised
          className="p-button"
          disabled
        />
      )}

    </>
  );

  const tab1HeaderTemplate = (options) => {
    console.log(options);
    const activeClass = options.selected ? 'font-bold white-space-nowrap' : 'font-normal white-space-nowrap';
    return (
      <div className={`flex align-items-center gap-2 p-3`} style={{ cursor: 'pointer' }} onClick={options.onClick}>
        <Avatar image={current} shape="circle" />
        <span className={`${activeClass}`}>Current</span>
      </div>
    );
  };

  const tab2HeaderTemplate = (options) => {
    console.log(options);

    const activeClass = options.selected ? 'font-bold white-space-nowrap' : 'font-normal white-space-nowrap';
    return (
      <div className={`flex align-items-center gap-2 p-3`} style={{ cursor: 'pointer' }} onClick={options.onClick}>
        <Avatar image={recycle} shape="circle" />
        <span className={`${activeClass}`}>Recycle</span>
      </div>
    );
  };
  const tab3HeaderTemplate = (options) => {
    const activeClass = options.selected ? 'font-bold white-space-nowrap' : 'font-normal white-space-nowrap';
    return (
      <div className={`flex align-items-center gap-2 p-3`} style={{ cursor: 'pointer' }} onClick={options.onClick}>
        <Avatar image={rare} shape="circle" />
        <span className={`${activeClass}`}>Rare</span>
      </div>
    );
  };
  const tab4HeaderTemplate = (options) => {
    const activeClass = options.selected ? 'font-bold white-space-nowrap' : 'font-normal white-space-nowrap';
    return (
      <div className={`flex align-items-center gap-2 p-3`} style={{ cursor: 'pointer' }} onClick={options.onClick}>
        <Avatar image={unknown} shape="circle" />
        <span className={`${activeClass}`}>Unknown</span>
      </div>
    );
  };

  return (
    <><Navbar />

      <div className="card">
        <TabView>
        <TabPanel headerTemplate={tab2HeaderTemplate} headerClassName="flex align-items-center">
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '5px' }}>
              {filteredDevices.filter(x => x.deviceClassificationId == 2).map((device) => (
                <Card style={{ borderRadius: '20px 20px 20px 20px', boxShadow: `0 4px 8px 0 rgba(80, 143, 25, 0.2), 0 6px 20px 0 rgba(80, 143, 25, 0.19)`
              }}
                key={device.deviceDetailsId} header={contentTemplate2(device)} footer={footerTemplate(device)}>
                </Card>
              ))}
              {filteredDevices?.filter(x => x.deviceClassificationId == 2)?.length == 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <img src={nodata} alt="No Data" style={{ width: '450px', height: '450px' }} />
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel headerTemplate={tab1HeaderTemplate}>
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '5px' }}>
           {filteredDevices.filter(x => x.deviceClassificationId == 1).map((device) => (
                    <div key={device.deviceDetailsId} style={{ margin: '15px 0' }}>

                <Card style={{ borderRadius: '20px 20px 20px 20px', boxShadow: `0 4px 8px 0 rgba(80, 143, 25, 0.2), 0 6px 20px 0 rgba(80, 143, 25, 0.19)`
              }
                } key={device.deviceDetailsId} header={contentTemplate1(device)} footer={footerTemplateCurrent(device)}>
                </Card>
              </div>
              ))}
              {filteredDevices?.filter(x => x.deviceClassificationId == 1)?.length == 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <img src={nodata} alt="No Data" style={{ width: '450px', height: '450px' }} />
                </div>
              )}
            </div>
          </TabPanel>

          <TabPanel headerTemplate={tab3HeaderTemplate}>
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '5px' }}>
              {filteredDevices.filter(x => x.deviceClassificationId == 3).map((device) => (
                    <div key={device.deviceDetailsId} style={{ margin: '15px 0' }}>

                <Card style={{ borderRadius: '20px 20px 20px 20px', boxShadow: `0 4px 8px 0 rgba(80, 143, 25, 0.2), 0 6px 20px 0 rgba(80, 143, 25, 0.19)`
              }
                } key={device.deviceDetailsId} header={contentTemplate3(device)} footer={footerTemplateRare(device)}>
                </Card>
              </div>
              ))}
              {filteredDevices?.filter(x => x.deviceClassificationId == 3)?.length == 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <img src={nodata} alt="No Data" style={{ width: '450px', height: '450px' }} />
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel headerTemplate={tab4HeaderTemplate}>
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '5px' }}>
              {filteredDevices.filter(x => x.deviceClassificationId == 4).map((device) => (
                    <div key={device.deviceDetailsId} style={{ margin: '15px 0' }}>

                <Card style={{ borderRadius: '20px 20px 20px 20px', boxShadow: `0 4px 8px 0 rgba(80, 143, 25, 0.2), 0 6px 20px 0 rgba(80, 143, 25, 0.19)`
              }
                } key={device.deviceDetailsId} header={contentTemplate4(device)}>
                </Card>
              </div>
              ))}
              {filteredDevices?.filter(x => x.deviceClassificationId ==4)?.length == 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <img src={nodata} alt="No Data" style={{ width: '450px', height: '450px' }} />
                </div>
              )}
            </div>
          </TabPanel>
        </TabView>
      </div>

    </>
  )
}

export default Services
