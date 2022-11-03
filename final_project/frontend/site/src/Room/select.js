import { Select, Typography, Divider, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import axios, { Axios } from "axios";

const { Text, Link, Title } = Typography;

function App({data, setData, list, setList}) {
    const [type, setType] = useState("");
    const [direction, setDirection] = useState("");
    const [occupancy, setOccupancy] = useState("");
    const [price, setPrice] = useState("");

    const handleTypeChange = (value) => {
        setType(value);
    };
    
    const handleDirectionChange = (value) => {
        setDirection(value);
    };

    const handleOccupancyChange = (value) => {
        setOccupancy(value);
    };

    const handlePriceChange = (value) => {
        setPrice(value);
    };

    const room_list_URL = "http://localhost:8000/hotelPortal/room_list";
    
    const onClick = () => {
        console.log(type, direction, occupancy, price);
        axios.get(room_list_URL, 
            {
                params: {
                    type: type,
                    direction: direction,
                    occupancy: occupancy,
                    price: price,
                }
            }).then((res) => {
                setData(res.data);
                setList(res.data);

                setType();
                setDirection();
                setOccupancy();
                setPrice();
            })
    };

    return (
        <>
            <Text>Room Type:</Text>
            <Select
                defaultValue=""
                style={{
                    width: 140,
                }}
                onChange={handleTypeChange}
                options={[
                    {
                        value: 'Standard',
                        label: 'Standard',
                    },
                    {
                        value: 'Deluxe',
                        label: 'Deluxe',
                    },
                    {
                        value: 'Connecting',
                        label: 'Connecting',
                    },
                    {
                        value: 'Suite',
                        label: 'Suite',
                    },
                ]}
            />
            <Divider type="vertical" />
            <Text>Direction:</Text>
            <Select
                defaultValue=""
                style={{
                    width: 140,
                }}
                onChange={handleDirectionChange}
                options={[
                    {
                        value: 'North',
                        label: 'North',
                    },
                    {
                        value: 'South',
                        label: 'South',
                    },
                    {
                        value: 'East',
                        label: 'East',
                    },
                    {
                        value: 'West',
                        label: 'West',
                    },
                ]}
            />
            <Divider type="vertical" />
            <Text>Occupancy:</Text>
            <Select
                defaultValue=""
                style={{
                    width: 140,
                }}
                onChange={handleOccupancyChange}
                options={[
                    {
                        value: 'One',
                        label: 'One',
                    },
                    {
                        value: 'Two',
                        label: 'Two',
                    },
                    {
                        value: 'Three',
                        label: 'Three',
                    },
                    {
                        value: 'Four And Beyond',
                        label: 'Four And Beyond',
                    },
                ]}
            />
            <Divider type="vertical" />
            <Text>price:</Text>
            <Select
                defaultValue=""
                style={{
                    width: 140,
                }}
                onChange={handlePriceChange}
                options={[
                    {
                        value: '1',
                        label: '0 ~ 100',
                    },
                    {
                        value: '2',
                        label: '100 ~ 200',
                    },
                    {
                        value: '3',
                        label: '200 ~ 300',
                    },
                    {
                        value: '4',
                        label: '400 And Beyond',
                    },
                ]}
            />
            <Divider type="vertical" />
            <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={onClick} />
        </>
    );
}
export default App;