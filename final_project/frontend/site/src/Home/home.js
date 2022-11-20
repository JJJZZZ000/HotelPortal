import logo from '../Setting/logo.svg';
import '../Setting/App.css';
import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { Layout, Select, Row, Col, Space, Divider, PageHeader, Menu, icon, Typography, Avatar } from "antd";
import Room_list from '../Room/Room_list.js';
import ImageList from './ImageList';
import Home from './home.js';

import Carousel from './Carousel';
import {
    HomeOutlined,
    ShopOutlined,
    WalletOutlined,
    LoginOutlined,
    LogoutOutlined,
    MailOutlined,
    PhoneOutlined,
    IdcardOutlined,
    createFromIconfontCN,
} from '@ant-design/icons';
import {
    Router,
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

function App() {
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

                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    <Divider></Divider>
                    {/* <Title>About Us</Title> */}
                    <Typography>
                        <Title>About Us</Title>
                        <Paragraph>
                            In the process of internal desktop applications development, many different design specs and
                            implementations would be involved, which might cause designers and developers difficulties and
                            duplication and reduce the efficiency of development.
                        </Paragraph>
                        <Paragraph>
                            After massive project practice and summaries, Ant Design, a design language for background
                            applications, is refined by Ant UED Team, which aims to{' '}
                            <Text strong>
                                uniform the user interface specs for internal background projects, lower the unnecessary
                                cost of design differences and implementation and liberate the resources of design and
                                front-end development
                            </Text>
                        </Paragraph>
                    </Typography>
                    <Divider dashed style={{ backgroundColor: "black" }}></Divider>
                    <ImageList />
                    <Carousel />
                    <Typography>
                        <Title>Contact Us</Title>
                    </Typography>
                </Space>

            </Content>
            <Footer
                style={{ textAlign: 'center' }}
            >
                <div style={{ color: "black" }}>
                    {/* <Title style={{ color: "black" }}>Contact Us</Title> */}
                    <Row justify="center" align="top">
                        <Col span={8}><Avatar src="/1.jpg" /> <Text>Liu Jiaqi</Text></Col>
                        <Col span={8}><Avatar src="/2.JPG" /> <Text>Jie Zhu</Text></Col>
                        <Col span={8}><Avatar src="/3.jpeg" /> <Text>Haorong Zhu</Text></Col>
                    </Row>
                    <Row>
                        <Col span={8}><MailOutlined /> jiaqili3@andrew.cmu.edu</Col>
                        <Col span={8}><MailOutlined /> Jie Zhu@andrew.cmu.edu</Col>
                        <Col span={8}><MailOutlined /> Haorong Zhu@andrew.cmu.edu</Col>
                    </Row>
                    <Row>
                        <Col span={8}><PhoneOutlined /> +1 412 954 8356</Col>
                        <Col span={8}><PhoneOutlined /> +1 412 954 8360</Col>
                        <Col span={8}><PhoneOutlined /> +1 000 000 0000</Col>
                    </Row>
                    <Row>
                        <Col span={8}><IdcardOutlined /> jiaqili3</Col>
                        <Col span={8}><IdcardOutlined /> jiezhu2</Col>
                        <Col span={8}><IdcardOutlined /> haorongzhu</Col>
                    </Row>
                </div>
                <Divider></Divider>
                Final Project Team 8
            </Footer>
        </Layout>
    );
}

export default App;