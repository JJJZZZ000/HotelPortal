import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback } from "react";
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
import { GoogleLogin, GoogleButton, GoogleLogout} from 'react-google-login';
import { gapi } from 'gapi-script';


const demoURL = "http://localhost:8000/hotelPortal/demo";
const csrf_token_URL = "http://localhost:8000/hotelPortal/get_csrf_token";
const client_id = '449220278505-16qg948jt09u3cgdeb44r5h4sc1t1h9q.apps.googleusercontent.com';
const { Header, Content, Footer } = Layout;

function App() {
  const [get, setGet] = useState(null);

  const [token, setToken] = useState("");
  const [profile, setProfile] = useState({});

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

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: client_id,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  // const openGoogleLoginPage = useCallback(() => {
  //   const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  //   const redirectUri = 'api/v1/auth/login/google/';

  //   const scope = [
  //     'https://www.googleapis.com/auth/userinfo.email',
  //     'https://www.googleapis.com/auth/userinfo.profile'
  //   ].join(' ');

  //   const params = {
  //     response_type: 'code',
  //     client_id: client_id,
  //     redirect_uri: `http://localhost:3000`,
  //     prompt: 'select_account',
  //     access_type: 'offline',
  //     scope
  //   };

  //   const urlParams = new URLSearchParams(params).toString();

  //   window.location = `${googleAuthUrl}?${urlParams}`;
  // }, []);


  // const Login = () => {
  //   return (
  //     // <GoogleLogin
  //     //   clientId={"449220278505-16qg948jt09u3cgdeb44r5h4sc1t1h9q.apps.googleusercontent.com"}  // your Google app client ID
  //     //   buttonText="Sign in with Google"
  //     //   onSuccess={onGoogleLoginSuccess} // perform your user logic here
  //     //   // onFailure={onGoogleLoginFailure} // handle errors here
  //     //   cookiePolicy={'single_host_origin'}
  //     // />
  //     <GoogleLogin
  //         clientId={"449220278505-16qg948jt09u3cgdeb44r5h4sc1t1h9q.apps.googleusercontent.com"}
  //         buttonText="Log in with Google"
  //         onSuccess={handleLogin}
  //         onFailure={handleLogin}
  //         cookiePolicy={'single_host_origin'}
  //     />
  //   );
  // };
  // const handleLogin = async googleData => {
  //   const res = await fetch("/api/v1/auth/google", {
  //       method: "POST",
  //       body: JSON.stringify({
  //       token: googleData.tokenId
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   const data = await res.json()
  //   // store returned user somehow
  // }


  // const notifyError = (error, options) => {
  //   error = error || 'Something went wrong.';
  //   toast.error(error.toString(), options);
  // };

  const onGoogleLoginSuccess = useCallback(
    response => {
      const idToken = response.tokenId;
      const data = {
        email: response.profileObj.email,
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName
      };
      setToken(response.tokenId)
      console.log(response.tokenId, response.profileObj)
      // validateTokenAndObtainSession({ data, idToken })
      //   // .then(handleUserInit)
      //   .catch(notifyError);
    },
    // [handleUserInit]
  );
  const onGoogleLogoutSuccess = useCallback(
    response => {
      console.log("tttttt")
      setToken("")
    },
  );


  // const handleUserInit = useCallback(
  //   resp => {
  //     if (resp.ok) {
  //       setUser(resp.data);
  //       history.push(HOME_URL);
  //     } 
  //     else {
  //       notifyError(resp.data[0]);
  //     }
  //   },
  //   [history, setUser]
  // );
  // const validateTokenAndObtainSession = ({ data, idToken }) => {
  //   const headers = {
  //     Authorization: idToken,
  //     'Content-Type': 'application/json'
  //   };

  //   return post('users/init/', data, { headers });
  // };


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
        {/* <div className="site-layout-content">
          <button onClick={Login}>login test</button>
        </div> */}
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
