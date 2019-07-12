import React from "react";
import {Row,Col,Affix} from "antd";

import {Route,withRouter,Redirect} from "react-router-dom";


import TopicList from "./content/topicList";
import TopicDetail from "./content/topicDetail";
import SiderPage from "./siderPage/sider";

import "./main.css";
/**
 * 文章主体内容的组装
 */
class TopicPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        return (<Row type="flex" className="main" justify="center">
                    <Col span={14} className="content">
                        <Route exact path="/" component={TopicList} />
                        <Route exact path="/:tab" component={TopicList} />
                        <Route exact path="/topic/:id" component={TopicDetail} />
                    </Col>
                    <Col offset={1} span={5} className="sider">
                        <Affix offsetTop={84}>
                            <SiderPage />
                        </Affix>
                    </Col>
                </Row>);
    }
} 

export default withRouter(TopicPage);