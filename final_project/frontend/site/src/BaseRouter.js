import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Home from './home.js';
import App from './App';
import Room_list from './Room_list.js';

const BasicRoute = () => (
    <HashRouter>
        <Routes>
            <Route exact path="/" element={<App />}/>
            <Route exact path="/home" element={<Home />}/>
            <Route exact path="/room_list" element={<Room_list />}/>
            {/* 地址栏跳转传参 */}
            {/* <Route exact path="/other/:id" component={Other}/> */}
        </Routes>
    </HashRouter>
);

export default BasicRoute;