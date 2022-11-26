import '../Setting/App.css';
import React, { useState, useEffect,useCallback } from "react";
import axios, { Axios } from "axios";
import { Layout, Select, Row, Col, Space, Divider, PageHeader, Menu, icon, Typography, Result, Button ,Avatar, Popover} from "antd";
import Room_list from '../Room/Room_list.js';
import Carousel from '../Home/Carousel';
import { GoogleLogin, GoogleButton, GoogleLogout} from 'react-google-login';
import { UserOutlined } from '@ant-design/icons';


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
const { Title } = Typography;
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

function App() {
    const onClick = () => {
        window.location.href = '/';
    }
    const client_id = '449220278505-16qg948jt09u3cgdeb44r5h4sc1t1h9q.apps.googleusercontent.com';
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

                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={[
                        <Button type="primary" onClick={onClick}>
                            Go Home Page
                        </Button>
                    ]}
                />

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