import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Home from './home.js';
import App from './App';
import Room_list from './Room_list.js';
import Order_list from './Order_list.js';
import Login from './Login.js';
import Register from './Register.js';
import Success from './Success.js';
import Failed from './Failed.js';


const BasicRoute = () => (
    <HashRouter>
        <Routes>
            <Route exact path="/" element={<App />}/>
            <Route exact path="/home" element={<Home />}/>
            <Route exact path="/room_list" element={<Room_list />}/>
            <Route exact path="/order_list" element={<Order_list />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/register" element={<Register />}/>
            <Route exact path="/success" element={<Success />}/>
            <Route exact path="/failed" element={<Failed />}/>
            {/* 地址栏跳转传参 */}
            {/* <Route exact path="/other/:id" component={Other}/> */}
        </Routes>
    </HashRouter>
);

export default BasicRoute;