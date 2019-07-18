import React from "react";
import {Button,Icon,List} from "antd";
import {withRouter,Link,Redirect} from "react-router-dom";
import {AuthorContext} from "@Context/authorContext";

import requestAPI from "@api/CNode";

import "./sider.css";

class SiderPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isArticleDetail:false,
            loading:true,
            loginName:props.authorName,
            author:{},
            recentData:[]
        };
        this.handleClickOfRecentTopic = this.handleClickOfRecentTopic.bind(this);
    }
    loginFromGithub(){

    }
    getAuthorDetail(name){
        let _this = this;
        requestAPI.getAuthorDetail(name,{}).then(
            res=>{
                if(res.status){
                    _this.setState({
                        loading:false,
                        isArticleDetail:true,
                        author:res.data,
                        recentData:res.data.recent_topics.splice(0,5)
                    });
                }
            },
            error=>{
                console.log(error);
            }
        );
    }
    componentWillReceiveProps(nextProps){
        let loginName = nextProps.authorName;
        this.setState({
            loginName:loginName
        });
        this.getAuthorDetail(loginName);
    }
    // 处理作者最近文章点击事件
    handleClickOfRecentTopic(id){
        // console.log(id);
        this.props.callback(id);
    }
    render(){
        const {isArticleDetail,loading,author} = this.state;
       
        if(this.state.isArticleDetail){
            // let data = author.recent_topics.splice(0,5);
            return (<div>
                    <div className="info-box">
                        <p className="title">作者</p>
                        <div className="body">
                            <a className="avatar">
                                <img src={author.avatar_url} />
                                <span>{author.loginname}</span>
                            </a>
                            <p className="score">积分：<span>{author.score}</span></p>
                            <p className="motto">""</p>
                        </div>
                    </div>
                    <div className="info-box">
                        <List
                            header={<p className="title">作者其他话题</p>}
                            itemLayout="horizontal"
                            split={false}
                            dataSource={this.state.recentData}
                            renderItem={item=>(
                                <List.Item key={item.id}>
                                    <Link to={{pathname:"/topic/"+item.id}} replace onClick={()=>this.handleClickOfRecentTopic(item.id)}>{item.title}</Link>
                                </List.Item>
                            )}
                        ></List>
                    </div>
                </div>);
        }else{
            return (<div className="login-box">
                <p>CNode：Node.js专业中文社区</p>
                <Button type="primary" icon="github" onClick={this.loginFromGithub}> 通过 GitHub 登录</Button>
            </div>);
        }
        
    }
}

export default withRouter(SiderPage);