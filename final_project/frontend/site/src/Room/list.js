import { Avatar, Button, List, Skeleton, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const fakeDataUrl = `http://localhost:8000/hotelPortal/room_list`;
function App({data, setData, list, setList}) {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res);
        setList(res);
      });
  }, []);
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
        <Button onClick={onLoadMore}>loading more</Button>
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
        {console.log(item)}
        return <List.Item
          actions={[<a href="http://localhost:8000/hotelPortal/cancel_order">cancel order</a>
        //   , <a key="list-loadmore-more">more</a>
        ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/67.jpg`} />}
              title={<a href="https://ant.design">{item.fields?.roomNum}</a>}
              description={
                'Type: ' + item.fields?.type + ' ' +
                'Occupancy: ' + item.fields?.occupancy + ' ' +
                'Direction: ' + item.fields?.direction + ' ' +
                'Price: ' + item.fields?.price
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