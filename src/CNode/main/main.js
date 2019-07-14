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
            articleId:''
        };
    }
    componentWillUpdate(prevProps){
        // .....
        console.log(this.props);
    }
    getDetailAuthor(nextState,replace){
        // 钩子函数没执行...
        console.log(nextState,replace);
        this.setState({
            articleId:123
        });
    }
    render(){
        return (<Row type="flex" className="main" justify="center">
                    <Col span={14} className="content">
                        <Route exact path="/" component={TopicList} />
                        <Route exact path="/topic/:id" component={TopicDetail} onEnter={(nextState,replace)=>this.getDetailAuthor(nextState,replace)}/>
                    </Col>
                    <Col offset={1} span={5} className="sider">
                        <Affix offsetTop={84}>
                            <SiderPage id={this.state.articleId} />
                        </Affix>
                    </Col>
                </Row>);
    }
} 

export default  withRouter(TopicPage);