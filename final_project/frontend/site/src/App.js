import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import './url.js';

const demoURL = "http://localhost:8000/hotelPortal/demo";
function App() {
  const[get, setGet] = useState(null);

  const onClick = () => {
    axios.get(demoURL).then((response) => {
      console.log(response.data);
      setGet(response.data[0].text);
    })
  };

  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <button onClick={onClick}>demo request</button>
      <div>{get}</div>
    </div>
  );
}

export default App;
