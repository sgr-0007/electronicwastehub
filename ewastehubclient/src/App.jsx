
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import React from 'react';
import Landing from './components/landing';
import Login from './components/login';
import ManageEWaste from './components/manageewaste';
import HomePage from './components/home';
import Navbar from './components/navbar';
import RegisterUser from './components/registeruser';
import RegisterEWaste from './components/registerewaste';
import ManageUsers from './components/manageusers';
import Services from './components/services';
import Home1 from './components/home1';
import Payment from './components/payment';
import Completion from './components/completion';
import Dash from './components/dashboard';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/home1" element={<Landing/>} />
                    <Route path="/" element={<Home1 />} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/manageusers" element={<ManageUsers/>} />
                     <Route path="/registeruser" element={<RegisterUser/>} />
                     <Route path="/home" element={<HomePage />} />
                     <Route path="/registerewaste" element={<RegisterEWaste/>} />
                    <Route path="/manageewaste" element={<ManageEWaste/>} />
                    <Route path="/services" element={<Services/>} />
                    <Route path="/payment" element={<Payment/>} />
                    <Route path="/completion" element={<Completion />} />
                    <Route path="/dashboard" element={<Dash/>} />




                </Routes>
            </Router>
        </div>
        
    )
}

export default App
