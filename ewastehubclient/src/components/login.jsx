import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/images/waste1.png';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { API_BASE_URL } from '../config';



export let currentUserRoleID;

const Login = () => {
  const navigate = useNavigate();
  const toastRef = useRef(null);

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/account/login`, {
        userEmail,
        password

      });
      console.log(response.data.data);
      if(response.data.data.active === false){
        handleInActive(response.data.data);

      }
      else{

        handleLoginSuccess(response.data.data);
      }

    }
    catch (error) {
      handleLoginFailure(error);
    }
  };

  const handleLoginSuccess = (userData) => {
    if (userData != null) {
      console.log('Login successful!');
      // add session storage
      sessionStorage.setItem('user', JSON.stringify(userData));
      navigate(getRouteForRole(userData.roleId));
    } else {
      const errorMessage = 'Login failed. Please check your credentials and try again.';
      console.error('Login failed:', errorMessage);
      toastRef.current.show({
        severity: 'error',
        summary: 'Login Failed',
        detail: errorMessage,
      });
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Login error:', error);
    const errorMessage = 'Please Login after sometime.';
    console.error('Login failed:', errorMessage);
    toastRef.current.show({
      severity: 'error',
      summary: 'Login Failed',
      detail: errorMessage,
    });
  };

  const handleInActive = (error) => {
    console.error('Login error:', error);
    const errorMessage = 'Your account is inactive. Please contact the admin to activate your account';
    console.error('Login failed:', errorMessage);
    toastRef.current.show({
      severity: 'error',
      summary: 'Login Failed',
      detail: errorMessage,
    });
  };

  const getRouteForRole = (roleId) => {
    switch (roleId) {
      case 1:
        return '/manageusers';
      case 2:
        return '/home1';
      default:
        return '/manageewaste';
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/registeruser');


  };
  return (

    <div className="page-container">
      <Card className="login-card" style={{ borderRadius: '20px 20px 20px 20px' }}>
        <div className='grid'>
          <div className='col-6'>
            <div className="login-image-container">
              <img src={loginImage} alt="login"
                style={{
                  objectPosition: 'center',
                  height: '350px',
                  width: '350px',
                  aspectRatio: "350/350",
                  objectFit: "cover",
                }} />
            </div>
          </div>
          <div className='col-5'>
            <h2 style={{
              justifyContent: 'center',
              display: 'flex',

            }}>Access your Account</h2>
            <div className="p-fluid">
              <span className="p-float-label" style={{ marginBottom: '20px' }}>
                <InputText
                  id="userEmail"
                  required
                  autoFocus
                  value={userEmail}
                  onChange={handleEmailChange}
                />
                <label htmlFor="userEmail">Email</label>
              </span>
              <span className="p-float-label" style={{ marginBottom: '20px' }}>
                <InputText
                  id="password"
                  type="password"
                  required // Make password mandatory
                  value={password}
                  onChange={handlePasswordChange}
                />
                <label htmlFor="password">Password</label>
              </span>
              <Button
                label="Login"
                className="p-button-rounded"
                style={{ marginTop: '20px' }}
                disabled={!userEmail || !password} // Disable submit button if form is invalid
                onClick={handleSubmit}
              />
            </div>
            <Divider type="solid" align="center">or</Divider>
            <div className="signup-center">
              <Button
                label="Register"
                icon="pi pi-user"
                text
                raised
                className="p-button-rounded"
                onClick={handleRegister}
              />
            </div>
          </div>
        </div>
      </Card>
      <Toast ref={toastRef} />

    </div>
  );
};


export default Login;
