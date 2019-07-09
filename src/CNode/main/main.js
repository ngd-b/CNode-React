import React from "react";
import {Row,Col,Affix} from "antd";

import "./main.css";
import TopicList from "./content/topicList";
import SiderPage from "./siderPage/sider";

/**
 * 文章主体内容的组装
 */
export default class TopicPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        return (<Row type="flex" className="main" justify="center">
                <Col span={14} className="content">
                    <TopicList />
                </Col>
                <Col offset={1} span={5} className="sider">
                    <Affix offsetTop={84}>
                        <SiderPage />
                    </Affix>
                </Col>
            </Row>);
    }
} 