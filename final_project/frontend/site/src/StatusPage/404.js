import '../Setting/App.css';
import React, { useState, useEffect, useCallback} from "react";
import axios, { Axios } from "axios";
import { Layout, Select, Row, Col, Space, Divider, PageHeader, Menu, icon, Typography, Result, Button, Avatar, Popover} from "antd";
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
  useEffect(()=>{
    var p = window.localStorage.getItem("profile")
    if(p !== null && Object.keys(profile).length !== 0){
      setProfile(JSON.parse(window.localStorage.getItem("profile")))
    }
  },[])
    const onClick = () => {
        window.location.href = '/';
    }
    const client_id = '449220278505-16qg948jt09u3cgdeb44r5h4sc1t1h9q.apps.googleusercontent.com';
    var [token, setToken] = useState("");
    var [profile, setProfile] = useState({});
    const onGoogleLoginSuccess = useCallback(
      response => {
          const idToken = response.tokenId;
          const data = {
              email: response.profileObj.email,
              first_name: response.profileObj.givenName,
              last_name: response.profileObj.familyName,
              username: response.profileObj.name,
              picture: response.profileObj.imageUrl
          };
          setToken(response.tokenId)
          window.sessionStorage.setItem('access-token', response.tokenId);
          setProfile(data)
          console.log("login received")
      },
  );
  useEffect(() => {
    console.log(profile)
    if (Object.keys(profile).length !== 0) {
        axios.get("http://localhost:8000/hotelPortal/login", {
            withCredentials: true,
            headers: {
                'X-CSRFToken': window.sessionStorage.getItem('CSRF-Token'),
                'access-token': window.sessionStorage.getItem('access-token'),
                'profile': window.localStorage.getItem('profile'),
            }
        }).catch((err) => {
            if (err.response.status == 403) {
              window.location.href = 'hotelPortal/#/403';
            } else if (err.response.status == 404) {
              window.location.href = 'hotelPortal/#/404';
            } else if (err.response.status == 500) {
              window.location.href = 'hotelPortal/#/500';
            }
          }).then(()=>{
            window.localStorage.setItem("profile", JSON.stringify(profile));
          })
    }
}, [profile])
  const onGoogleLogoutSuccess = useCallback(
    response => {
        setToken("")
        window.sessionStorage.setItem('access-token', "");
        setProfile({})
        window.localStorage.setItem('profile', "");
        window.location.href = 'hotelPortal/#/';
    },
);
  const onGoogleFail = useCallback(
    response => {
        window.location.href = 'hotelPortal/#/failed';
    }
);
var content = (
  <div>
  <p>{profile.username === undefined ?"Please login":"Username: "+profile.username}</p>
  <p>{profile.first_name === undefined?"":"First Name: "+profile.first_name}</p>
  <p>{profile.last_name === undefined?"":"Last Name: "+profile.last_name}</p>
  <p>{profile.email === undefined?"":"Email: "+profile.email}</p>
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
                            Object.keys(profile).length === 0
                                ? <Avatar icon={<UserOutlined />} /> :
                                <Avatar src={profile.picture} imgProps={{ referrerPolicy: "no-referrer" }}></Avatar>
                        }
                    </Popover>
                </div>
                
            </Header>

            <Content style={{ padding: '0 50px', }}>

                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={[
                        <Button type="primary" onClick={onClick}>
                            Go Home Page
                        </Button>,
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