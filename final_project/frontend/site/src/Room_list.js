import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import qs from "qs"
import { Layout, Select, Row, Col, Space, Typography, Divider, PageHeader, Menu, icon, Pagination, Button } from "antd";
import Room_list from './Room_list.js';
import Home from './home.js';
import List from '../src/Room/list';
import SelectComponent from '../src/Room/select'
import ShoppingCart from '../src/Room/shopping_cart'
import moment from 'moment';
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
const { Text, Title } = Typography;
const checkout_URL = "http://localhost:8000/hotelPortal/create-checkout-session";

function App() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const [rooms, setRooms] = useState([]);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const [isAddOrder, setIsAddOrder] = useState([]);

  const onClick = () => {
    // window.location.href = checkout_URL
    axios.post(checkout_URL, {
      data: {
        rooms: rooms,
        startTime: startTime === undefined ? moment().format('YYYY-MM-DD').valueOf() : startTime,
        endTime: endTime === undefined ? moment().add(1, "days").format('YYYY-MM-DD').valueOf() : endTime,
        totalDay: endTime === undefined ? 1 : moment(endTime).diff(moment(startTime), 'days'),
      }
    }, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': window.sessionStorage.getItem('CSRF-Token')
      }
    }).then((res) => {
      // deal with the response.
      setIsAddOrder([])
      window.location.href = res.data;

    })
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
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
        <Row >
          <Col span={16}>
            <Divider type="horizontal" />
            <SelectComponent data={data} setData={setData} list={list} setList={setList} startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime}/>
          </Col>
          <Col span={8} align='middle'>
            <Divider type="horizontal" />
            <Text>Shopping Cart</Text>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Divider type="horizontal" />
            <List data={data} setData={setData} list={list} setList={setList} rooms={rooms} setRooms={setRooms} isAddOrder={isAddOrder} setIsAddOrder={setIsAddOrder} />
          </Col>
          <Col span={8}>
            <Divider type="horizontal" />
            <ShoppingCart rooms={rooms} setRooms={setRooms} />
            <Divider type="horizontal" >
              {/* <form 
                action='http://localhost:8000/hotelPortal/create-checkout-session' 
                method='POST'
                onSubmit={onClick}
                headers={{'X-CSRFToken': window.sessionStorage.getItem('CSRF-Token')}}
                withCredentials={true}
                > */}
                {/* <button type='submit'>Checkout Your Order!</button> */}
              {/* </form> */}
              <Button type="primary" onClick={onClick}>Checkout Your Order!</Button>
            </Divider>

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