import { Col, Row, Image } from "antd";
import React, { useState } from 'react';


function App() {

    const [visible, setVisible] = useState(false);


    return (
        <Row>
            <Col span={8}>
                <div style={{textAlign:'center'}}>
                <Image
                    // preview={{
                    //     visible: false,
                    // }}
                    width={200}
                    src="https://dimg04.c-ctrip.com/images/0206h1200097xn5e79332_W_1080_808_R5_D.jpg"
                    onClick={() => setVisible(true)}
                /></div>
                <div
                    style={{
                        display: 'none',
                    }}
                >
                    <Image.PreviewGroup
                        // preview={{
                        //     visible,
                        //     onVisibleChange: (vis) => setVisible(vis),
                        // }}
                    >
                        <Image src="https://dimg04.c-ctrip.com/images/0206h1200097xn5e79332_W_1080_808_R5_D.jpg" />
                        <Image src="https://dimg04.c-ctrip.com/images/0201e1200097xn5lc30BC_W_1080_808_R5_D.jpg" />
                        <Image src="https://dimg04.c-ctrip.com/images/0206m1200097xmp7926AA_W_1080_808_R5_D.jpg" />
                    </Image.PreviewGroup>
                </div>
            </Col>

            <Col span={8}>
                <div style={{textAlign:'center'}}>
                <Image
                    // preview={{
                    //     visible: false,
                    // }}
                    width={200}
                    src="https://dimg04.c-ctrip.com/images/200m180000014b6l2238B_W_1080_808_R5_D.jpg"
                    onClick={() => setVisible(true)}
                /></div>
                <div
                    style={{
                        display: 'none',
                    }}
                >
                    <Image.PreviewGroup
                        // preview={{
                        //     visible,
                        //     onVisibleChange: (vis) => setVisible(vis),
                        // }}
                    >
                        <Image src="https://dimg04.c-ctrip.com/images/200m180000014b6l2238B_W_1080_808_R5_D.jpg" />
                        <Image src="https://dimg04.c-ctrip.com/images/200j1700000119l55F831_W_1080_808_R5_D.jpg" />
                        <Image src="https://dimg04.c-ctrip.com/images/200r17000001195ku3017_W_1080_808_R5_D.jpg" />
                    </Image.PreviewGroup>
                </div>
            </Col>

            <Col span={8}>
            <div style={{textAlign:'center'}}>
                <Image
                    // preview={{
                    //     visible: false,
                    // }}
                    width={200}
                    src="https://dimg04.c-ctrip.com/images/0202f1200097xn91mF17B_W_1080_808_R5_D.jpg"
                    onClick={() => setVisible(true)}
                /></div>
                <div
                    style={{
                        display: 'none',
                    }}
                >
                    <Image.PreviewGroup
                        // preview={{
                        //     visible,
                        //     onVisibleChange: (vis) => setVisible(vis),
                        // }}
                    >
                        <Image src="https://dimg04.c-ctrip.com/images/0202f1200097xn91mF17B_W_1080_808_R5_D.jpg" />
                        <Image src="https://dimg04.c-ctrip.com/images/0206o1200097xn5l24785_W_1080_808_R5_D.jpg" />
                        <Image src="https://dimg04.c-ctrip.com/images/0202i1200097xn1r791BE_W_1080_808_R5_D.jpg" />
                    </Image.PreviewGroup>
                </div>
            </Col>
        </Row>
    );
}

export default App;