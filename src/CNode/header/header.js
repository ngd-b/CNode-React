
import React from "react";
import {Row,Col,Input,Icon} from "antd";

import {withRouter} from "react-router-dom";

import "@css/index.css";
import "./header.css";
// head
class AppHead extends React.Component{
    constructor(props){
        super(props);
        const tags = [
            {
                name:"首页",
                src:""
            },
            {
                name:"未读消息",
                src:"",
            },
            {
                name:"新手入门",
                src:"",
            },
            {
                name:"API",
                src:"",
            },
            {
                name:"关于",
                src:"",
            },
            {
                name:"设置",
                src:"",
            },
            {
                name:"退出",
                src:"",
            }];
        this.state = {
            tags
        }
    }
    render(){
        const {tags} = this.state;
        return (<Row type="flex" className="header" justify="space-around" align="middle">
            <Col span={3}>
                <a className="brand" href="/">
                    <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" />
                </a>
            </Col>
            <Col span={6} className="searchInput">
                <Input placeholder="input search content" prefix={<Icon type="search" style={{color:'rgba(0,0,0,.3)',background:'#e1e1e1'}}/>}/>
            </Col>
            <Col offset={2} span={10}>
                <ul className="list-unstyled">{tags.map(item=>(
                    <li><a href={item.src}>{item.name}</a></li>
                ))
                }
                </ul>
            </Col>
        </Row>);
    }
}

export default  AppHead;