import { Select, Typography, Divider, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios, { Axios } from "axios";
import { DatePicker, Space } from 'antd';
import React from 'react';
import { Input } from 'antd';
import { useState } from 'react';
const { Text, Link, Title } = Typography;


function App({data, setData, list, setList}) {
    const [room, setRoom] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");



    const onBlur = (value) => {
        setRoom(value.target.value);
    };
    
    const handlePaymentStatusChange = (value) => {
        setPaymentStatus(value);
    };

    const handleStartTimeChange = (date, dateString) => {
        setStartTime(dateString);
    };

    const handleEndTimeChange = (date, dateString) => {
        setEndTime(dateString);
    };



    const order_list_URL = "http://localhost:8000/hotelPortal/order_list";
    
    const onClick = () => {
        // console.log(room);
        // console.log(paymentStatus)
        // console.log(startTime)
        // console.log(endTime)

        axios.get(order_list_URL,
            {
                params: {
                    room: room,
                    paymentStatus: paymentStatus,
                    startTime: startTime,
                    endTime: endTime,
                },
                headers: {
                    'X-CSRFToken': window.sessionStorage.getItem('CSRF-Token'),
                    'access_token': window.sessionStorage.getItem('access-token'),
                    'profile':window.sessionStorage.getItem('profile'),
                  }
            })
            .catch((err) => {
                if (err.response.status == 403) {
                  window.location.href = 'hotelPortal/#/403';
                } else if (err.response.status == 404) {
                  window.location.href = 'hotelPortal/#/404';
                } else if (err.response.status == 500) {
                  window.location.href = 'hotelPortal/#/500';
                }
              }).then((res) => {
                setData(res.data);
                setList(res.data);
            })
    };

    return (
        <>
            <Text>Room Number:</Text>
            <Input placeholder="e.g. A101" onBlur={onBlur} style={{width: 90,}}/>
            <Divider type="vertical" />
            <Text >Payment Status: </Text>
            <Select 
                defaultValue=""
                style={{
                    width: 90,
                }}
                onChange={handlePaymentStatusChange}
                options={[
                    {
                        value: 'Unpaid',
                        label: 'Unpaid',
                    },
                    {
                        value: 'Paid',
                        label: 'Paid',
                    },
                    {
                        value: 'Canceled',
                        label: 'Canceled',
                    },
                ]}
            />
            <Divider type="vertical" />
            <Text>Start Time:</Text>
            <Space direction="vertical">
                <DatePicker onChange={handleStartTimeChange}/>
            </Space>
            <Divider type="vertical" />
            <Text>End Time:</Text>
            <Space direction="vertical">
                <DatePicker onChange={handleEndTimeChange} />
            </Space>
            <Divider type="vertical" />
            <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={onClick} />
        </>
    );
}
export default App;