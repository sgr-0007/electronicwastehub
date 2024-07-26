
import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import recover from '../assets/images/recover.png';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import placeholderImage from '../assets/images/device-placeholder.png';
import repair from '../assets/images/repair.png';
import loginImage from '../assets/images/waste1.png';
import { useNavigate } from 'react-router-dom';
import iphone14 from '../assets/images/iphone14.png';
import { Galleria } from 'primereact/galleria';
import { Image } from 'primereact/image';
import '../App.css';



export default function Component() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the pop-up


  const navButtonStyle = (isHovered) => ({
    padding: '5px 10px',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    transition: 'background-color 0.3s, color 0.3s',
    borderRadius: '5px',
  });

  const handleHover = (value) => {
    setHovered(value);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };



  //connect to backend
  const [devices, setDevices] = useState([]);
  const [displayedDevices, setDisplayedDevices] = useState([]);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/devices/all/devicesdetail`);
        setDevices(response.data.data);
        setDisplayedDevices(response.data.data);

      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };
    fetchDevices();
  }, []);

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login route
  };

  const handleRegisterClick = () => {
    navigate('/registeruser'); // Navigate to the register route
  };

  const itemTemplate = (item) => {
    return <Image src={`${item.imageData}`|| iphone14} alt="Image" width="320" />

}
const thumbnailTemplate = (item) => {

  return <Image src={`${item.imageData}`|| iphone14} zoomSrc={`${item.imageData}`|| iphone14} alt="Image" width="80" height="60" />
}
const caption = (item) => { 
  return (

    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'self-start', flexDirection: 'column' }}>
      <p style={{ margin: '0' }}>{item.brand} {item.model}</p>
      <p style={{ margin: '0' }}>£{item.expectedValue}</p>
    </div>
  );
}
  const handleNextClick = () => {

    let newIndex = 0;
    if (currentDeviceIndex + 3 >= devices.length + (3 - devices.length % 3)) {
      newIndex = 0;
    } else {
      newIndex = currentDeviceIndex + 3;
    }
    setCurrentDeviceIndex(newIndex);

    // update displayedDevices
    let newDisplayedDevices = [];
    for (let i = newIndex; i < newIndex + 3; i++) {
      if (i < devices.length) {
        newDisplayedDevices.push(devices[i]);
      } else {
        newDisplayedDevices.push({
          name: 'No more devices',
          imageUrl: placeholderImage,
          expectedValue: 0,
          deviceDetailsId: 0,
          brand: 'No more devices',
          model: 'No more devices',
        });
      }
    }
    setDisplayedDevices(newDisplayedDevices);
  };

  const popupContainerStyle = {
    position: 'absolute',
    top: '170px', // Adjust the distance from the top of the viewport
    right: '50px', // Adjust the distance from the right side   backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 20px rgba(0, 0, 0.1, 1)',
  };
  
  const popupContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  
  const buttonStyle = {
    margin: '5px',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'underline',
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
    }}>


      <div style={{
        backgroundColor: '#4caf50',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '20px 50px',
      }}>
              <div className="login-image-container">
          <img src={loginImage} alt="login" 
          style={{
            objectPosition: 'center',
            height: '250px',
            width: '250px',
            aspectRatio: "250/250",
            objectFit: "cover",
          }} />
        </div>
        <ul style={{
          listStyleType: 'none',
          display: 'flex',
          gap: '10px',
          padding: 0,
          margin: 0,
          marginLeft: 'auto',         

        }}>
          
          <li>
            <a
              href="#"
              style={navButtonStyle(hovered === 'login')}
              onMouseEnter={() => handleHover('login')}
              onMouseLeave={() => handleHover(false)}
              onClick={togglePopup} // Toggle the pop-up
            >
              Sign in
            </a>
            {showPopup && (
              <div style={popupContainerStyle}>
                <div style={popupContentStyle}>
                  <button style={buttonStyle} onClick={handleLoginClick}>Login</button>
                  <button style={buttonStyle} onClick={handleRegisterClick}>Register</button>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>


      {/*title*/}

      <Card style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',   backgroundImage: 'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)', margin: 0, padding: 0 }}>

        <main className="flex-1">
          <section style={{ width: '100%', marginTop: '0' }}>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '0', textAlign: 'center' }}>
              <div style={{ gap: '2rem' }}>
                <h1 style={{ fontSize: '90px', fontWeight: 'bold', textAlign: 'start' }}>
                  Your old tech. A new life.
                </h1>
                <p style={{ margin: 'auto', maxWidth: '600px', color: '#6B7280', fontSize: '1.125rem', lineHeight: '1.75rem' }}>
                  Safe and eco-friendly disposal. Reliable cell phone cleaning
                  services.
                </p>
              </div>

              {/*button*/}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>

                <a
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('featuredProduct').scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    display: 'inline-flex',
                    height: '48px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0.375rem',
                    backgroundColor: '#4caf50',
                    padding: '0 2rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: 'white',
                    boxShadow: `0 4px 8px 0 rgba(80, 143, 25, 0.2), 0 6px 20px 0 rgba(80, 143, 25, 0.19)`,
                    transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out',
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Learn More
                  <ChevronRightIcon style={{ color: '#F3F4F6', width: '32px', height: '32px', marginLeft: '8px' }} />
                </a>
              </div>
            </div>
          </section>



          {/*services */}
          <section >

            <div >

              {/*service title and intro*/}
              <div style={{ marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '2.5em', fontWeight: 'bold', textAlign: 'center' }}>Why choose E Waste Hub?</h2>
                <p style={{ margin: 'auto', maxWidth: '600px', color: '#6B7280', fontSize: '1.125rem', textAlign: 'center', lineHeight: '1.75rem' }}>
                  We make it easy to buy and sell used electronics. Safe and eco-friendly disposal. Reliable cell phone
                  cleaning services. Introducing our new cell phone cleaning service for a sparkling device!
                </p>
              </div>


              {/*service cards*/}
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', transform: 'scale(1.2)', Align: 'center' }}>
                  <div style={{ paddingRight: '10rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircleIcon style={{ height: '5rem', width: '5rem', borderRadius: '50%', border: '1px solid gray', padding: '0.5rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Convenience</h3>
                    <p style={{ fontSize: '0.875rem', color: 'gray' }}>
                      Buying and selling made easy.
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircleIcon style={{ height: '5rem', width: '5rem', borderRadius: '50%', border: '1px solid gray', padding: '0.5rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Eco-Friendly</h3>
                    <p style={{ fontSize: '0.875rem', color: 'gray' }}>
                      Safe and eco-friendly disposal.
                    </p>
                  </div>
                  <div style={{ paddingLeft: '10rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircleIcon style={{ height: '5rem', width: '5rem', borderRadius: '50%', border: '1px solid gray', padding: '0.5rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Reliable</h3>
                    <p style={{ fontSize: '0.875rem', color: 'gray' }}>
                      Trust our cell phone cleaning services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*services */}
          <section >
            <div >

              {/*service title and intro*/}
              <div style={{ marginTop: '10rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '2.5em', fontWeight: 'bold', textAlign: 'center' }}>Our Services</h2>

              </div>


              {/*service cards*/}
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', transform: 'scale(1.2)', Align: 'center' }}>
                  <div style={{ paddingRight: '10rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircleIcon style={{ height: '5rem', width: '5rem', borderRadius: '50%', border: '1px solid gray', padding: '0.5rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Data Retrieval</h3>
                    <p style={{ fontSize: '0.875rem', color: 'gray', maxWidth: '200px', whiteSpace: 'pre-wrap' }}>
                      Securely retrieve your data.
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircleIcon style={{ height: '5rem', width: '5rem', borderRadius: '50%', border: '1px solid gray', padding: '0.5rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Resell Electronics</h3>
                    <p style={{ fontSize: '0.875rem', color: 'gray', maxWidth: '210px', whiteSpace: 'pre-wrap' }}>
                      Give your used electronic devices a new owner through our platform and earn money.
                    </p>
                  </div>
                  <div style={{ paddingLeft: '10rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircleIcon style={{ height: '5rem', width: '5rem', borderRadius: '50%', border: '1px solid gray', padding: '0.5rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Reclaim Electronics</h3>
                    <p style={{ fontSize: '0.875rem', color: 'gray', maxWidth: '200px', whiteSpace: 'pre-wrap' }}>
                      Discover amazing discounts on pre-owned gadgets and devices, and save big on your purchases
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('featuredDevices').scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    display: 'inline-flex',
                    height: '48px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0.375rem',
                    backgroundColor: '#4caf50',
                    padding: '0 2rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: 'white',
                    boxShadow: `0 4px 8px 0 rgba(80, 143, 25, 0.2), 0 6px 20px 0 rgba(80, 143, 25, 0.19)`,
                    transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out',
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Featured Devices
                  <ChevronRightIcon style={{ color: '#F3F4F6', width: '32px', height: '32px', marginLeft: '8px' }} />
                </a>

              </div>

            </div>
          </section>


          {/*Featured services*/}

          <section>
            <div>

              <div id="featuredProduct" style={{ marginTop: '10rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '2.5em', fontWeight: 'bold', textAlign: 'center' }}>Featured Services</h2>

              </div>



              {/*example service product*/}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Card style={{ marginLeft: '16%',borderRadius: '20px 20px 20px 20px' }}>
                  <div>
                    <img
                      alt="Image"
                      style={{
                        objectPosition: 'center',
                        height: '400px',
                        width: '400px',
                        aspectRatio: "400/400",
                        objectFit: "cover",
                        
                      }}
                      src={recover}
                    />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Data Recovery Service</h3>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>For any electronic storages,laptop,phone etc.</p>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>£ 120</h3>
                  </div>
                </Card>
                <Card style={{ marginRight: '14%',borderRadius: '20px 20px 20px 20px' }}>
                  <div>
                    <img
                      alt="Image"
                      style={{
                        objectPosition: 'center',
                        height: '400px',
                        width: '400px',
                        aspectRatio: "400/400",
                        objectFit: "cover",
                      }}
                      src={repair}
                    />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Data Cleaning</h3>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Restoring your devices to their to its initialization.</p>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Free</h3>
                  </div>
                </Card>
              </div>


            </div>
          </section>


          {/*Featured device Products*/}
          <section>
            <div>

              <div id="featuredDevices" style={{ marginTop: '10rem', marginBottom: '1rem' }}>
                <h2 style={{fontSize: '2.5em', fontWeight: 'bold', textAlign: 'center' }}>Featured Devices</h2>
                <pp style={{
                  marginLeft: '16%',
                  margin: 'auto',
                  maxWidth: '600px',
                  color: '#6B7280',
                  fontSize: '1.125rem',
                  lineHeight: '1.75rem',
                  textAlign: 'center',
                  paddingLeft: '10%',
                  whiteSpace: 'pre-wrap',

                }}>
                  Browse through our featured amazing deals on quality electronics, including smartphones, laptops, and more waiting for you.
                </pp>
              </div>


              {/*example device product*/}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5%', paddingRight: '5%' }}>
              <Galleria value={displayedDevices} numVisible={3} circular style={{ maxWidth: '800px', margin: '0 auto' }}
              item={itemTemplate} thumbnail={thumbnailTemplate} caption={caption}  autoPlay transitionInterval={2000} />


              </div >
            </div>
          </section>


        </main>

      </Card>
      
        {/*footer*/}
        <footer style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px 16px', width: '100%', alignItems: 'center',backgroundColor: 'whitesmoke' , borderTop: '1px solid' }}>

          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="#" style={{ color: '#4caf50', textDecoration : 'none' }}>© 2024 E Waste Hub</a>
          </div>

        </footer>
    </div>
    
  )
}


function CheckCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}