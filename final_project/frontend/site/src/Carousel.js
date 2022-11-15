import { Carousel, Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
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
      {/* <h3 style={contentStyle}>First Image</h3> */}
      <Statistic title="Order volume" value={112893} style={{textAlign:'center'}}/>
      <Statistic title="Account Balance (CNY)" value={112893} precision={2} style={{textAlign:'center'}}/>
      <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} style={{textAlign:'center'}}/>

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