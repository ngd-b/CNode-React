import React from "react";
import {Button,Icon} from "antd";

import "./sider.css";

export default class SiderPage extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    loginFromGithub(){

    }
    render(){
        return (<div className="login-box">
                <p>CNode：Node.js专业中文社区</p>
                <Button type="primary" icon="github" onClick={this.loginFromGithub}> 通过 GitHub 登录</Button>
            </div>);
    }
}
