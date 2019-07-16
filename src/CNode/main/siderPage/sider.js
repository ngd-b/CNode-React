import React from "react";
import {Button,Icon} from "antd";
import {withRouter} from "react-router-dom";
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
            author:{}
        };
    }
    loginFromGithub(){

    }
    getAuthorDetail(name){
        let _this = this;
        requestAPI.getAuthorDetail(name,{}).then(function(res){
            if(res.status){
                _this.setState({
                    loading:false,
                    author:res.data
                });
            }
            console.log(res);
        }).catch(function(xhr){
            console.log(xhr);
        });
    }
    componentWillReceiveProps(nextProps){
        let loginName = nextProps.authorName;
        this.setState({
            isArticleDetail:true,
            loginName:loginName
        });
        this.getAuthorDetail(loginName);
    }
    render(){
        const {isArticleDetail,loading,author} = this.state;
        if(this.state.isArticleDetail){
            return (<div className="info-box">
                    <p className="title">作者</p>
                    <div className="body">
                        <a className="avatar">
                            <img src={author.avatar_url} />
                            <span>{author.loginname}</span>
                        </a>
                        <p className="score">积分：<span>{author.score}</span></p>
                        <p className="motto">""</p>
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
SiderPage.contextType = AuthorContext;

export default withRouter(SiderPage);