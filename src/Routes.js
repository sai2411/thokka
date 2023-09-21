// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import ParkingManagement from './ParkingManagement';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Signup}/>
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path='/vehicleregister' Component={ParkingManagement}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default Routing;
