import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import axios, { Axios } from "axios";
import Home from '../Home/home.js';
import App from '../Setting/App';
import Room_list from '../Room/Room_list.js';
import Order_list from '../Order/Order_list.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Success from '../StatusPage/Success.js';
import Failed from '../StatusPage/Failed.js';
import Page_403 from '../StatusPage/403.js';
import Page_404 from '../StatusPage/404.js';
import Page_500 from '../StatusPage/500.js';


function BasicRoute() {
    const csrf_token_URL = "http://localhost:8000/hotelPortal/get_csrf_token";
    useEffect(() => {
        axios.get(csrf_token_URL)
            .then(res => {
                window.sessionStorage.setItem('CSRF-Token', getCookie('csrftoken'));
                // console.log("getCookie: "+getCookie('csrftoken'));
                // console.log("checkWindow: "+sessionStorage.getItem("CSRF-Token"))
            }).catch(() => {
                throw new Error("Get CSRF token failed");
            });
    }, [])

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/room_list" element={<Room_list />} />
                <Route exact path="/order_list" element={<Order_list />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/success" element={<Success />} />
                <Route exact path="/failed" element={<Failed />} />
                <Route exact path="/403" element={<Page_403 />} />
                <Route exact path="/404" element={<Page_404 />} />
                <Route exact path="/500" element={<Page_500 />} />
                {/* 地址栏跳转传参 */}
                {/* <Route exact path="/other/:id" component={Other}/> */}
            </Routes>
        </HashRouter>
    );
};

export default BasicRoute;