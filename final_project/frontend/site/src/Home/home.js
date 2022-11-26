import logo from '../Setting/logo.svg';
import '../Setting/App.css';
import React, { useState, useEffect, useCallback } from "react";
import axios, { Axios } from "axios";
import { Layout, Select, Row, Col, Space, Divider, PageHeader, Menu, icon, Typography, Avatar ,Popover} from "antd";
import { UserOutlined } from '@ant-design/icons';
import Room_list from '../Room/Room_list.js';
import ImageList from './ImageList';
import Home from './home.js';
import { GoogleLogin, GoogleButton, GoogleLogout} from 'react-google-login';
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
const client_id = '449220278505-16qg948jt09u3cgdeb44r5h4sc1t1h9q.apps.googleusercontent.com';

function App() {
    var [token, setToken] = useState("");
var [profile, setProfile] = useState({});
const onGoogleLoginSuccess = useCallback(
    response => {
      console.log(response)
      const idToken = response.tokenId;
      const data = {
        email: response.profileObj.email,
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
        username: response.profileObj.name,
        picture: response.profileObj.imageUrl
      };
      setToken(response.tokenId)
      window.sessionStorage.setItem('access-token',response.tokenId);
      setProfile(response.data)
      window.sessionStorage.setItem('profile', response.data);
      var profileObj = {
        username:response.profileObj.name,
        first_name:response.profileObj.givenName,
        last_name:response.profileObj.familyName,
        email:response.profileObj.email,
        picture:response.profileObj.imageUrl
      }
      var profileJson = JSON.stringify(profileObj);
      setProfile(profileJson)
      window.sessionStorage.setItem('profile', profileJson);
      console.log("login received")
      axios.get("http://localhost:8000/hotelPortal/login", {
        withCredentials: true,
        headers: {
          'X-CSRFToken': window.sessionStorage.getItem('CSRF-Token'),
          'access-token': window.sessionStorage.getItem('access-token'),
          'profile':window.sessionStorage.getItem('profile'),
        }
      })
      console.log(window.sessionStorage.getItem("profile"))
      // window.location.reload()
    },
    // [handleUserInit]
  );
  const onGoogleLogoutSuccess = useCallback(
    response => {
      setToken("")
      window.sessionStorage.setItem('access-token',"");
      setProfile({})
      window.sessionStorage.setItem('profile',null);
      // window.location.reload()
    },
  );
  var content = (
    <div>
      <p>{window.sessionStorage.getItem('profile')==="null"?"Please login":"Username: "+JSON.parse(window.sessionStorage.getItem('profile'))["username"]}</p>
      <p>{window.sessionStorage.getItem('profile')==="null"?"":"First Name: "+JSON.parse(window.sessionStorage.getItem('profile'))["first_name"]}</p>
      <p>{window.sessionStorage.getItem('profile')==="null"?"":"Last Name: "+JSON.parse(window.sessionStorage.getItem('profile'))["last_name"]}</p>
      <p>{window.sessionStorage.getItem('profile')==="null"?"":"Email: "+JSON.parse(window.sessionStorage.getItem('profile'))["email"]}</p>
    </div>
  );
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{float:"left", width:"360px"}}
                    defaultSelectedKeys={['1']}
                    items={[
                        { key: 1, label: (<Link to='/home'>home</Link>), icon: <HomeOutlined /> },
                        { key: 2, label: (<Link to='/room_list'>room list</Link>), icon: <ShopOutlined /> },
                        { key: 3, label: (<Link to='/order_list'>order list</Link>), icon: <WalletOutlined /> },
                        { key: 4, label: (token.length===0 ? 
                            <GoogleLogin
                           clientId={client_id}  // your Google app client ID
                           buttonText="Sign in with Google"
                           onSuccess={onGoogleLoginSuccess} // perform your user logic here
                           cookiePolicy={'single_host_origin'}
                           isSignedIn={true}
                           render={renderProps => (
                           <Link onClick={renderProps.onClick} disabled={renderProps.disabled}>login</Link>
                           )}
                         /> :
                         <GoogleLogout 
                         clientId={client_id}
                         buttonText='Logout'
                         onLogoutSuccess={onGoogleLogoutSuccess}
                         render={renderProps => (
                           <Link onClick={renderProps.onClick} disabled={renderProps.disabled}>logout</Link>
                           )}
                       />
                         ), icon: <LoginOutlined /> },
                    ]}
                />
                <div style={{float:"right", height:"100%"}}>  
                <Popover content={content} title="Profile" trigger="hover">
                {
                window.sessionStorage.getItem('profile') === "null"
                ? <Avatar icon={<UserOutlined />} /> :
                <Avatar src={JSON.parse(window.sessionStorage.getItem('profile'))["picture"]}></Avatar>
                }
                </Popover>
                </div>
                
            </Header>

            <Content style={{ padding: '0 50px', }}>

                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    <Divider></Divider>
                    {/* <Title>About Us</Title> */}
                    <Typography>
                        <Title>Merulanties Inn - Feel the magic of Dali</Title>
                        <Paragraph>
                            In the center of Lijiang ancient town, there is a hidden B&B - {' '}
                            <Text strong>
                                Merulanties Inn
                            </Text>.
                        </Paragraph>
                        <Paragraph>
                            The Merulanties Inn is a New Luxury Green Hotel, where guests can experience the beauty of nature, inspiration of art and culture, and conscious green and healthy living. 
                            We placed an emphasis on culture, nature and sustainability. 
                        </Paragraph>
                        <Paragraph>
                            The owner has been operating here for 18 years, welcoming and seeing off guest everyday. 
                        </Paragraph>
                        <Paragraph>
                            Natural stone, reclaimed wood crafted into floors and furnishings, old hand-carved wood doors, old wooden trunks have be turned into coffee tables, and nature is brought indoors through living green walls. 
                            The garden is full of flowers, trees and herbs.
                        </Paragraph>
                        <Paragraph>
                            The Merulanties Inn followed the Global Sustainable Tourism for Hotels Standards. 
                            All cleaning and laundry products are naturally made, leaving no toxins for our precious ground and water resources. Energy and water saving features include passive energy saving design, solar water heating system, LED lighting, sun and lavender-dried sheets and water saving shower heads. 
                            Our rooms have zero disposable plastics, and bathroom amenities are biodegradable. We compost organic wastes to fertilize our organic vegetables
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