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
import Page_403 from './403.js';
import Page_404 from './404.js';
import Page_500 from './500.js';


const BasicRoute = () => (
    <HashRouter>
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/home" element={<Home />}/>
            <Route exact path="/room_list" element={<Room_list />}/>
            <Route exact path="/order_list" element={<Order_list />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/register" element={<Register />}/>
            <Route exact path="/success" element={<Success />}/>
            <Route exact path="/failed" element={<Failed />}/>
            <Route exact path="/403" element={<Page_403 />}/>
            <Route exact path="/404" element={<Page_404 />}/>
            <Route exact path="/500" element={<Page_500 />}/>
            {/* 地址栏跳转传参 */}
            {/* <Route exact path="/other/:id" component={Other}/> */}
        </Routes>
    </HashRouter>
);

export default BasicRoute;