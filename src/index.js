import React from "react";
import ReactDOM from "react-dom";
import {Layout} from "antd";
import {BrowserRouter as Router,Route,Link} from "react-router-dom";

import "@css/index.css";
import "@CNode/header/header.css";

const {Header,Content,Footer} = Layout; 

/**
 * 组件导入
 */
import AppHead from "@CNode/header/header";
import TopicPage from "@CNode/main/main";
import FooterPage from "@CNode/footer/footer";

class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<Router>
                    <Layout>
                    <Header>
                        <AppHead />
                    </Header>
                    <Content>
                        <TopicPage />
                    </Content>
                    <Footer>
                        <FooterPage />
                    </Footer>
                </Layout>
            </Router>);
    }
}

ReactDOM.render(<App />,document.getElementById("app"));