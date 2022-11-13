import { Select, Typography, Divider, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios, { Axios } from "axios";
import TimePicker from './time_picker';
import moment from 'moment';

const { Text, Link, Title } = Typography;

function App({data, setData, list, setList, startTime, endTime, setStartTime, setEndTime}) {
    const [type, setType] = useState("");
    const [direction, setDirection] = useState("");
    const [occupancy, setOccupancy] = useState("");
    const [price, setPrice] = useState("");
    // const [startTime, setStartTime] = useState();
    // const [endTime, setEndTime] = useState();

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
        axios.get(room_list_URL, 
            {
                params: {
                    type: type,
                    direction: direction,
                    occupancy: occupancy,
                    price: price,
                    startTime: startTime,
                    endTime: endTime,
                }
            }).then((res) => {
                setData(res.data);
                setList(res.data);
            })
    };

    const onTypeClear = () => {
        setType();
    }

    const onDirectionClear = () => {
        setDirection();
    }

    const onOccupancyClear = () => {
        setOccupancy();
    }

    const onPriceClear = () => {
        setPrice();
    }

    return (
        <>
        <Row>
            <Col>
            <Text>Room Type:</Text>
            <Select
                allowClear
                defaultValue=""
                style={{
                    width: 70,
                }}
                onChange={handleTypeChange}
                onClear={onTypeClear}
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
            </Col>
            <Col>
            <Divider type="vertical" />
            <Text>Direction:</Text>
            <Select
                allowClear
                defaultValue=""
                style={{
                    width: 70,
                }}
                onChange={handleDirectionChange}
                onClear={onDirectionClear}
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
            </Col>
            <Col>
            <Divider type="vertical" />
            <Text>Occupancy:</Text>
            <Select
                allowClear
                defaultValue=""
                style={{
                    width: 70,
                }}
                onChange={handleOccupancyChange}
                onClear={onOccupancyClear}
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
            </Col>
            <Col>
            <Divider type="vertical" />
            <Text>price:</Text>
            <Select
                allowClear
                defaultValue=""
                style={{
                    width: 70,
                }}
                onChange={handlePriceChange}
                onClear={onPriceClear}
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
            </Col>
            <Col>
            <Divider type="vertical" />
            <TimePicker startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
            </Col>
            <Col>
            <Divider type="vertical" />
            <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={onClick} />
            </Col>
            </Row>
        </>
    );
}
export default App;