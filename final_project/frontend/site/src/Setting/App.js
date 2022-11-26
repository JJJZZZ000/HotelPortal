import './App.css';
import { Avatar, Button, List, Skeleton, Pagination, Popover, Card, Badge, Descriptions} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useCallback } from "react";
import axios, { Axios } from "axios";
import { Layout, Select, Row, Col, Space, Typography, Divider, PageHeader, Menu, icon } from "antd";
import Room_list from '../Room/Room_list.js';
import Home from '../Home/home.js';
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
import { GoogleLogin, GoogleButton, GoogleLogout} from 'react-google-login';
import { gapi } from 'gapi-script';


const demoURL = "http://localhost:8000/hotelPortal/demo";
const csrf_token_URL = "http://localhost:8000/hotelPortal/get_csrf_token";
const client_id = '449220278505-16qg948jt09u3cgdeb44r5h4sc1t1h9q.apps.googleusercontent.com';
const { Header, Content, Footer } = Layout;

function App() {
  const [get, setGet] = useState(null);

  var [token, setToken] = useState("");
  var [profile, setProfile] = useState({});

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
        setProfile()
      }).catch(() => {
        throw new Error("Get CSRF token failed");
      });
  }, [])

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: client_id,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });


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


  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }
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
          defaultSelectedKeys={['1']}
          style={{float:"left", width:"360px"}}
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
        {/* <div style={{float:"right", height:"100%"}}>         
        {token.length === 0 ? 
        <GoogleLogin
          clientId={client_id}  // your Google app client ID
          buttonText="Sign in with Google"
          onSuccess={onGoogleLoginSuccess} // perform your user logic here
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          render={renderProps => (
            <button style={{width:"70px"}}onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
          // <Link >login</Link>
          )}
          // <li class="ant-menu-overflow-item ant-menu-item" role="menuitem" tabindex="-1" style="opacity: 1; order: 2;" data-menu-id="rc-menu-uuid-07529-2-3"><span role="img" aria-label="wallet" class="anticon anticon-wallet ant-menu-item-icon"><svg viewBox="64 64 896 896" focusable="false" data-icon="wallet" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 464H528V448h312v128zm0 264H184V184h656v200H496c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h344v200zM580 512a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg></span><span class="ant-menu-title-content"><a href="#/order_list">order list</a></span></li>



        /> : 
        <GoogleLogout 
        clientId={client_id}
        buttonText='Logout'
        onLogoutSuccess={onGoogleLogoutSuccess}
        style={{height:"100%"}}
      />}
      </div> */}
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
        <div className="site-layout-content">
          <button onClick={onClick}>demo request</button>
          <div>{get}</div>
        </div>
        {token.length === 0 ? <GoogleLogin
          clientId={client_id}  // your Google app client ID
          buttonText="Sign in with Google"
          onSuccess={onGoogleLoginSuccess} // perform your user logic here
          // onFailure={onGoogleLoginFailure} // handle errors here
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        /> : 
        <GoogleLogout 
        clientId={client_id}
        buttonText='Logout'
        onLogoutSuccess={onGoogleLogoutSuccess}
      />}
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
