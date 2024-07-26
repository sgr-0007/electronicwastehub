import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';


const HomePage = () => {
    const navigate = useNavigate();

    
    const gotoProducts = (e) => {
        e.preventDefault();
        navigate('/registerewaste');
         
    };

  const cardStyle = {
    width: '400px',
    textAlign: 'center',
    margin: '2rem auto',
    padding: '2rem',
  };

  return (
    <><Navbar /><div className="p-d-flex p-jc-center p-ai-center" style={{ height: '100vh' }}>
      <Card title="Electronic Waste Hub" subTitle="Your One-Stop Solution" style={cardStyle}>
        <h2>Welcome to our Electronic Waste Hub</h2>
        <p>
          Help the environment and protect your data. We offer a convenient and responsible solution for recycling your unwanted electronics.
        </p>
        <p>
          We accept a wide range of electronics, including smartphones, laptops, Gaming consoles, and more. We ensure secure data wiping and environmentally responsible recycling.

        </p>
        <Divider />
        <Button label="Drop off your e-waste" onClick={gotoProducts} icon="pi pi-arrow-right" />
      </Card>
    </div></>
  );
};

export default HomePage;