import { Carousel, Statistic, Image } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import React, {useState} from 'react';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
function App() {
  const [visible, setVisible] = useState(false);
  return (
    <Carousel autoplay effect='fade' style={contentStyle}>
      <div>
        <div>
          {/* <h3 style={contentStyle}>First Image</h3> */}
          {/* <Statistic title="Order volume" value={112893} valueStyle={{textAlign:'center', color:"white"}}/>
      <Statistic title="Account Balance (CNY)" value={112893} precision={2} style={{textAlign:'center'}}/>
      <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} style={{textAlign:'center'}}/> */}
          <h3 style={contentStyle}>First Image</h3>
          
          </div>
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
};
export default App;