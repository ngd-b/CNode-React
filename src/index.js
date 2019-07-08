import React from "react";
import ReactDOM from "react-dom";
import {Row,Col,Input,Layout,Spin,Result,Button,List,Avatar,Icon,Tag,Affix} from "antd";

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
/**
 * 主体文章内容的获取，格式、样式
 */
class ContentPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error:"",
            loading:true,
            data:[],
            params:{
                page:1,
                tab:"",
                limit:20
            },
        }
    }
    componentDidMount(){
        let _this = this;
        requestAPI.getTopics(_this.state.params).then(function(res){
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
    getTime(time){
        let diffTime = new Date().getTime() - new Date(time).getTime();
        let replay_msg = "";
        if(diffTime/(3600*1000*24) > 1){
            replay_msg = Math.floor(diffTime/(3600*1000*24))+"天前";
        }else if(diffTime/(3600*1000) > 1){
            replay_msg = Math.floor(diffTime/(3600*1000))+"小时前";
        }else{
            replay_msg = Math.floor(diffTime/(60*1000))+"分钟前";
        }
        return replay_msg;
    }
    render(){
        const {error,loading,data} = this.state;
        let {page,limit} = this.state.params
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
                            this.setState({
                                params:{
                                    page:page
                                },
                            });
                        },
                        pageSize:limit,
                        current:page,
                    }}
                    dataSource = {data}
                    renderItem = {item=>(
                        <List.Item 
                            className="item"
                            key={item.id}
                        >
                            <List.Item.Meta 
                                avatar={<Avatar src={item.author.avatar_url} />}
                               
                                />
                            <div className="count">
                                <span className="replay_count">{item.reply_count}</span>
                                <span>/</span>
                                <span className="visit_count">{item.visit_count}</span>
                            </div>
                            <div>
                                <ArticleTag tab={item.tab} good={item.good} top={item.top} />
                                <a>{item.title}</a>
                            </div>
                            <div>
                                <span>{this.getTime(item.last_reply_at)}</span>
                            </div> 
                        </List.Item>
                    )
                    }
                /> )
        }
    }
}
/**
 * 文章类型处理
 * @param {} props 
 */
function ArticleTag(props){
    if(props.top){
        return <Tag color="#80bd01">置顶</Tag>;
    }else if(props.good){
        return <Tag color="#80bd01">精华</Tag>
    }else{
        let name = "分享";
        switch(props.tab){
            case "share":
                name = "分享";
                break;
            case "ask":
                name ="问答";
                break; 
            case "ask":
                name ="招聘";
                break; 
            default:
                name="分享";
        }
        return <Tag color="#e5e5e5" style={{color:"#999"}}>{name}</Tag>;
    }
    
}
class SiderPage extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    loginFromGithub(){

    }
    render(){
        return (<div className="login-box">
                <p>CNode：Node.js专业中文社区</p>
                <Button type="primary" onClick={this.loginFromGithub}> 通过 GitHub 登录</Button>
            </div>);
    }
}
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
        const {error,loading,data} = this.state;
        return (<Row type="flex" className="main" justify="center">
                <Col span={14} className="content">
                    <ContentPage />
                </Col>
                <Col offset={1} span={5} className="sider">
                    <Affix offsetTop={100}>
                        <SiderPage />
                    </Affix>
                </Col>
            </Row>);
    }
} 
/**
 * 底部部分的内容
 */
class FooterPage extends React.Component{
    constructor(props){
        super(props);
        const data = [
            {
                name:"github",
                src:"https://github.com/ngd-b"
            },
            {
                name:"CSDN",
                src:"https://blog.csdn.net/heroboyluck"
            }
        ]
        this.state = {
            data
        }
    }
    render(){
        const {data} = this.state;
        return (<Row>
                <Col offset={4} span={12}>
                   
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
                <Footer>
                    <FooterPage />
                </Footer>
            </Layout>);
    }
}

ReactDOM.render(<App />,document.getElementById("app"));