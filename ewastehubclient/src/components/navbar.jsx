import React, { useState } from "react";
import '../App.css';
import { Link, NavLink } from "react-router-dom";
import loginImage from '../assets/images/waste1.png';


 const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem('user'));
  console.log(userData)
  
  return (
    <nav>
      <Link to="/home1" className="title">
        <img src={loginImage} 
        title="E-Waste Hub"
         style={{
          objectPosition: 'start',
          height: '100px',
          width: '100px',
          aspectRatio: "100/100",
          objectFit: "cover",
        }}
        alt="logo" />
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span style={{ backgroundColor: 'green' }}></span>
        <span style={{ backgroundColor: 'green' }}></span>
        <span style={{ backgroundColor: 'green' }}></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
      {userData && userData.roleId === 2 && (
          <li>
            <NavLink to="/home1">Home</NavLink>
          </li>
        )}
      
        {userData && userData.roleId === 1 && (
          <li>
            <NavLink to="/manageusers">Manage Users</NavLink>
          </li>
        )}

        {userData && (userData.roleId === 3 ||  userData.roleId==1) && (
          <li>
            <NavLink to="/manageewaste">Manage eDevices</NavLink>
          </li>
        )}
        {userData && (userData.roleId === 3 ||  userData.roleId==1) && (
          <li>
            <NavLink to="/dashboard">Report</NavLink>
          </li>
        )}
        {userData && userData.roleId === 2 && (
          <li>
            <NavLink to="/services">My eDevices</NavLink>
          </li>
        )}
        {userData && userData.roleId === 2 && (
          <li>
            <NavLink to="/registerewaste">Register eDevices</NavLink>
          </li>
        )}
        
        
        <li>
          <NavLink to="/login">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
