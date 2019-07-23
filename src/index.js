import React from "react";
import ReactDOM from "react-dom";
// import {Provider} from "react-redux";
// import {createStore} from "redux";
// import {Author} from "@Reduce/detailAuthor";

import {Layout} from "antd";
import {BrowserRouter as Router} from "react-router-dom";

import "@css/index.less";

const {Header,Content,Footer} = Layout; 

/**
 * 组件导入
 */
import AppHead from "@CNode/header/header";
import TopicPage from "@CNode/main/main";
import FooterPage from "@CNode/footer/footer";

// 创建store {subscribe,dispatch,getState}
// let store = createStore(Author);
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