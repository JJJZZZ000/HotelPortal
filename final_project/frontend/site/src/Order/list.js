import { Avatar, Button, List, Skeleton, Pagination } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const fakeDataUrl = `http://localhost:8000/hotelPortal/order_list`;
function App({data, setData, list, setList}) {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [list, setList] = useState([]);
  useEffect(() => 

  {
    // console.log(window.sessionStorage.getItem('access-token'))
  axios.get(fakeDataUrl, {
    withCredentials: true,
    headers: {
      'X-CSRFToken': window.sessionStorage.getItem('CSRF-Token'),
      'access-token': window.sessionStorage.getItem('access-token'),
      'profile':window.sessionStorage.getItem('profile'),
    }
  }).catch((err) => {
    if (err.response.status == 403) {
      window.location.href = 'hotelPortal/#/403';
    } else if (err.response.status == 404) {
      window.location.href = 'hotelPortal/#/404';
    } else if (err.response.status == 500) {
      window.location.href = 'hotelPortal/#/500';
    }
  })
  .then((res) => {
          // console.log(res)
          setInitLoading(false);
          setData(res.data);
          setList(res.data);
        });
}
  
  , []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        {/* <Button onClick={onLoadMore}>loading more</Button> */}
      </div>
    ) : null;
  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => {
        return <List.Item
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.fields.roomPicture} />}
              title={<a href="https://ant.design">{item.fields?.roomNum}</a>}
              description={
                  'Room: '+ item.fields?.room+' '+
                  'PaymentStatus: ' + item.fields?.paymentStatus+' '+
                  'Price: '+item.fields?.paymentPrice+' '+
                  'StartTime: ' + item.fields?.startTime+' '+
                  'EndTime: '+item.fields?.endTime+' '
            }
            />
            {/* <div>content</div> */}
          </Skeleton>
        </List.Item>
      }}
    />
  );
};
export default App;