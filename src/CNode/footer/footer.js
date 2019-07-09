import React from "react";
import {Row,Col} from "antd";


/**
 * 底部部分的内容
 */
export default class FooterPage extends React.Component{
    constructor(props){
        super(props);
        const data = [
            {
                name:"github",
                src:"https://github.com/ngd-b"
            },
            {
                name:"CSDN",
                src:"https://blog.csdn.net/heroboyluck"
            }
        ]
        this.state = {
            data
        }
    }
    render(){
        const {data} = this.state;
        return (<Row>
                <Col offset={4} span={12}>
                   
                </Col>
            </Row>);
    }
}