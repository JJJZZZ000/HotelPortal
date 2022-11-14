import { DatePicker, Space } from 'antd';
import React from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;

function App({startTime, setStartTime, endTime, setEndTime}) {

    const onChange = (value) => {
        // turn to unify timestamp.
        if(value != null) {
            setStartTime(moment(value[0]).format('YYYY-MM-DD').valueOf())
            setEndTime(moment(value[1]).format('YYYY-MM-DD').valueOf())
        } else {
            setStartTime(moment().format('YYYY-MM-DD').valueOf())
            setEndTime(moment().add(1, "days").format('YYYY-MM-DD').valueOf())
        }
    }

    return (
            <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                style={{width: 260}}
                // defaultValue={[moment('2022-06-07T11:00:00Z'), moment('2022-06-07T14:00:00Z')]}
                // defaultValue={[moment(moment(new Date().getTime()).format('YYYY-MM-DD HH:mm')), moment(moment(new Date().getTime()).add(1, "days").format('YYYY-MM-DD HH:mm'))]}
                onChange={onChange}
            />
    );
}

export default App;