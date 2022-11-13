import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { Layout, Select, Row, Col, Space, Typography, Divider, PageHeader, Menu, icon, Pagination } from "antd";
import Room_list from './Order_list.js';
import Home from './home.js';
import List from '../src/Order/list';
import SelectComponent from '../src/Order/select'
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
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    return (
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['3']}
              items={[
                { key: 1, label: (<Link to='/home'>home</Link>), icon: <HomeOutlined /> },
                { key: 2, label: (<Link to='/room_list'>room list</Link>), icon: <ShopOutlined /> },
                { key: 3, label: (<Link to='/order_list'>order list</Link>), icon: <WalletOutlined /> },
                { key: 4, label: (<Link to='/login'>login</Link>), icon: <LoginOutlined /> },
                { key: 5, label: (<Link to='/register'>register</Link>), icon: <LogoutOutlined /> }
              ]}
            />
          </Header>
    
          <Content style={{ padding: '0 50px', }}>
            <Row>
              <Col span={16}>
                <Divider type="horizontal" />
                <SelectComponent data={data} setData ={setData} list={list} setList={setList}/>
                <Divider type="horizontal" />
                <List data={data} setData={setData} list={list} setList={setList}/>
              </Col>
    
              <Col span={8}>
    
              </Col>
            </Row>
    
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