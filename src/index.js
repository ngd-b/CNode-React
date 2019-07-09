import React from "react";
import ReactDOM from "react-dom";
import {Layout} from "antd";

import "@css/index.css";
const {Header,Content,Footer} = Layout; 

/**
 * 组件导入
 */
import AppHead from "@CNode/header/header";
import TopicPage from "@CNode/main/main";
import FooterPage from "@CNode/footer/footer";

class App extends React.Component{
    render(){
        return (<Layout>
                <Header>
                    <AppHead />
                </Header>
                <Content>
                    <TopicPage />
                </Content>
                <Footer>
                    <FooterPage />
                </Footer>
            </Layout>);
    }
}

ReactDOM.render(<App />,document.getElementById("app"));