import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { Layout, Select, Row, Col, Space, Typography, Divider, PageHeader, Menu, icon } from "antd";
import Room_list from './Room_list.js';
import Home from './Home.js';
import {
  HomeOutlined,
  ShopOutlined,
  WalletOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import {
  Router,
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const { Header, Content, Footer } = Layout;

function App() {
    return (
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={[
                {key:1, label: (<Link to='/home'>home</Link>), icon:<HomeOutlined/>}, 
                {key:2, label: (<Link to='/room_list'>room list</Link>), icon: <ShopOutlined/>}, 
                {key:3, label: (<Link to='/order_list'>order list</Link>), icon:<WalletOutlined/>}, 
                {key:4, label: (<Link to='/login'>login</Link>), icon:<LoginOutlined/>}, 
                {key:5, label: (<Link to='/register'>register</Link>), icon:<LogoutOutlined/>}
              ]}
            />
          </Header>
    
          <Content style={{ padding: '0 50px', }}>
            <div className="site-layout-content">
              <button>demo request</button>
              <div></div>
            </div>
            
            
          </Content>
          <Footer
            style={{ textAlign: 'center' }}
          >
            Final Project Team 8
          </Footer>
        </Layout>
      );
}

export default App;