import { Radio, Timeline, Tag } from 'antd';
import React, { useState } from 'react';
import moment from 'moment'
function App({ rooms, setRooms }) {
    let sum = 0;
    return (
        <>
            <Timeline mode='left'>
                {rooms.map((room) => {
                    sum += room.price;
                    return (
                        <Timeline.Item label={room.time}>
                            <Tag color="magenta">{room.roomNum}</Tag>
                            <Tag color="gold">{room.type}</Tag>
                            <Tag color="red">{room.occupancy + ' people'}</Tag>
                            <Tag color="volcano">{room.direction}</Tag>
                            <Tag color="orange">{room.price + '$'}</Tag>
                        </Timeline.Item>
                    )
                })}
                <Timeline.Item label='Total Cost'>{sum + '$'}</Timeline.Item>
            </Timeline>
        </>
    );
};
export default App;