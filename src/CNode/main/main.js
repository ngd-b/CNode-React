import React from "react";
import {Row,Col,Affix} from "antd";
import {Route,withRouter} from "react-router-dom";

import {AuthorContext,Author} from "@Context/authorContext";
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
        // 文章详情作者
        // this.changeAuthorName=({name})=>{
        //     this.setState({
        //         authorName:name
        //     });
        // }
        this.state = {
            authorName:"",
        };

        this.getDetailAuthor = this.getDetailAuthor.bind(this);
        // 回调 需要绑定this 
        this.getArticleAuthor = this.getArticleAuthor.bind(this);
    }
    // 子组件回调函数
    getArticleAuthor(name){
        // 更新当前查看详情文章的用户
        this.setState({
            authorName:name
        });
    }
    componentWillUpdate(prevProps){
        // .....
        // console.log(this.props);
    }
    // 路由钩子函数
    getDetailAuthor(nextState,replace){
        // 钩子函数未执行...
        console.log(nextState,replace);
        this.setState({
            articleId:123
        });
    }
    render(){
        return (<Row type="flex" className="main" justify="center">
                        <Col span={14} className="content">
                            <Route exact path="/" render={routeProps=>(<TopicList callback = {this.getArticleAuthor} {...routeProps} />)} />
                            <Route exact path="/topic/:id" render={routeProps=>(<TopicDetail callback = {this.getArticleAuthor} {...routeProps} />)} onEnter={(nextState,replace)=>this.getDetailAuthor(nextState,replace)}/>
                        </Col>
                        <Col offset={1} span={5} className="sider">
                            <Affix offsetTop={84}>
                                <SiderPage authorName = {this.state.authorName} />
                            </Affix>
                        </Col>
                    </Row>);
    }
} 

export default  withRouter(TopicPage);
// 
// <Switch>
// <Route exact path="/" component={SiderPage} />
// <Route exact path="/topic/:id" render={routeProps=>(<SiderPage  {...routeProps} />)}/>
// </Switch>