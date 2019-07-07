import React from "react";
import ReactDOM from "react-dom";
import {Row,Col,Input,Layout,Spin,Result,Button,List,Avatar,Icon} from "antd";

import requestAPI from "@api/CNode";
import "@css/index.css";

const {Header,Content,Sider,Footer} = Layout; 
const {Search} = Input;

// head
class AppHead extends React.Component{
    constructor(props){
        super(props);
        const tags = [
            {
                name:"首页",
                src:""
            },
            {
                name:"未读消息",
                src:"",
            },
            {
                name:"新手入门",
                src:"",
            },
            {
                name:"API",
                src:"",
            },
            {
                name:"关于",
                src:"",
            },
            {
                name:"设置",
                src:"",
            },
            {
                name:"退出",
                src:"",
            }];
        this.state = {
            tags
        }
    }
    render(){
        const {tags} = this.state;
        return (<Row type="flex" className="header" justify="space-around" align="middle">
            <Col span={3}>
                <a className="brand">
                    <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" />
                </a>
            </Col>
            <Col span={6}>
                <Input placeholder="input search content" prefix={<Icon type="search" style={{color:'rgba(0,0,0,.3)'}}/>}/>
            </Col>
            <Col offset={2} span={10}>
                <ul className="list-unstyled">{tags.map(item=>(
                    <li><a href={item.src}>{item.name}</a></li>
                ))
                }
                </ul>
            </Col>
        </Row>);
    }
}
class ContentPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error:"",
            loading:true,
            data:[]
        }
    }
    componentDidMount(){
        let _this = this;
        requestAPI.getTopics().then(function(res){
            _this.setState({
                loading:false,
                data:res.data
            });
        }).catch(function(xhr){
            _this.setState({
                loading:false,
                xhr
            });
        });
    }
    render(){
        const {error,loading,data} = this.state;
        if(error){
            return (<Result 
                    status="warning"
                    title="the bad request"
                    extra={
                        <Button type="primary">
                            refresh
                        </Button>
                    }     
                />)
        }else if(loading){
            return <Spin />;
        }else{
            return (<List 
                    className="article"
                    size="large"
                    loading={loading}
                    itemLayout="horizontal"
                    pagination={{
                        onChange:page=>{
                            console.log(page);
                        },
                        pageSize:10
                    }}
                    dataSource = {data}
                    renderItem = {item=>(
                        <List.Item 
                            key={item.id}
                        >
                            <List.Item.Meta 
                                avatar={<Avatar src={item.author.avatar_url} />}
                                title={<a>{item.title}</a>}
                                />
                        </List.Item>
                    )
                    }
                /> )
        }
    }
}
class TopicPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        const {error,loading,data} = this.state;
        return (<Row type="flex" className="main" justify="center">
                <Col span={16} className="content">
                    <ContentPage />
                </Col>
                <Col span={5} className="sider">

                </Col>
            </Row>);
    }
} 


class App extends React.Component{
    render(){
        return (<Layout>
                <Header>
                    <AppHead />
                </Header>
                <Content>
                    <TopicPage />
                </Content>
            </Layout>);
    }
}

ReactDOM.render(<App />,document.getElementById("app"));