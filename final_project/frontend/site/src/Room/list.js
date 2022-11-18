import { Avatar, Button, List, Skeleton, Pagination, Popover, Card, Badge, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment'
import axios, { Axios } from "axios";
const count = 3;
const room_list_URL = `http://localhost:8000/hotelPortal/room_list`;
const { Meta } = Card;

function App({ data, setData, list, setList, rooms, setRooms, isAddOrder, setIsAddOrder }) {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    // const [isAddOrder, setIsAddOrder] = useState([]);
    //   const [data, setData] = useState([]);
    //   const [list, setList] = useState([]);
    useEffect(() => {
        fetch(room_list_URL)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res);
                setList(res);

                res.forEach(element => {
                    return setIsAddOrder(isAddOrder => [...isAddOrder, true]);
                });
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
        fetch(room_list_URL)
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

    function onClick(item, index) {
        if (isAddOrder[index]) {
            var temp = {
                type: item.fields.type,
                occupancy: item.fields.occupancy,
                roomNum: item.fields.roomNum,
                direction: item.fields.direction,
                price: item.fields.price,
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
            setRooms(rooms => [...rooms, temp]);
        } else {
            setRooms(rooms.filter(room => room.roomNum !== item.fields.roomNum));
        }

        const newAdd = isAddOrder.map((isAdd, i) => {
            if (i === index) {
                return !isAdd;
            } else {
                return isAdd;
            }
        });
        setIsAddOrder(newAdd)
    };

    function content(item) {
        return (
            <>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title={"Room Detail For " + item.fields.roomNum} description="www.hotelportal_team8.com" />
                </Card>
                <Descriptions
                    title="Specific"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="Room Number">{item.fields.roomNum}</Descriptions.Item>
                    <Descriptions.Item label="Type">{item.fields.type}</Descriptions.Item>
                    <Descriptions.Item label="Direction">{item.fields.direction}</Descriptions.Item>
                    <Descriptions.Item label="Occupancy">{item.fields.occupancy + ' people'}</Descriptions.Item>
                    <Descriptions.Item label="Price">{item.fields.price + '$'}</Descriptions.Item>
                </Descriptions>
            </>
        );
    };

    return (
        <>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item, index) => {
                    return <List.Item
                        actions={[<a onClick={() => { onClick(item, index) }}>{isAddOrder[index] ? 'add to shopping cart' : 'cancel'} </a>
                            //   , <a key="list-loadmore-more">more</a>
                        ]}
                    // onClick={() => { onClickListItem(item) }}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <Popover content={content(item)} trigger="click">
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://randomuser.me/api/portraits/med/women/67.jpg`} />}
                                    title={<a>{item.fields?.roomNum}</a>}
                                    description={
                                        'Type: ' + item.fields?.type + ' ' +
                                        'Occupancy: ' + item.fields?.occupancy + ' ' +
                                        'Direction: ' + item.fields?.direction + ' ' +
                                        'Price: ' + item.fields?.price
                                    }
                                />
                            </Popover>
                        </Skeleton>
                    </List.Item>
                }}
            />
        </>
    );
};
export default App;