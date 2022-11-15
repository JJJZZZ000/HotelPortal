import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { Layout, Select, Row, Col, Space, Typography, Divider, PageHeader, Menu, icon } from "antd";
import Room_list from './Room_list.js';
import Home from './home.js';
import moment from 'moment'
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

const demoURL = "http://localhost:8000/hotelPortal/demo";
const csrf_token_URL = "http://localhost:8000/hotelPortal/get_csrf_token";
const { Header, Content, Footer } = Layout;
function App() {
  const [get, setGet] = useState(null);

  const onClick = () => {
    axios.get(demoURL).then((response) => {
      console.log(response.data);
      setGet(response.data[0].text);
    })
  };

  useEffect(() => {
    axios.get(csrf_token_URL)
      .then(res => {
        window.sessionStorage.setItem('CSRF-Token', getCookie('csrftoken'));
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
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
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
        <div className="site-layout-content">
          <button onClick={onClick}>demo request</button>
          <div>{get}</div>
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
