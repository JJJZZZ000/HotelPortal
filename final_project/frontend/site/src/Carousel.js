import { Carousel } from 'antd';
import React from 'react';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const App = () => (
  <Carousel autoplay effect='fade'>
    <div>
      <h3 style={contentStyle}>First Image</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Second Image</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Third Image</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Fourth Image</h3>
    </div>
  </Carousel>
);
export default App;