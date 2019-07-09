import React from "react";
import {Spin,Result,Button,List,Avatar,Tag} from "antd";
import {BrowserRouter as Router,Route,Link} from "react-router-dom";

import requestAPI from "@api/CNode";

const typeMap = new Map([["all","全部"],["good","精华"],["ask","问答"],["share","分享"],["job","招聘"]]);
/**
 * 主体文章内容的获取，格式、样式
 */
class ContentItem extends React.Component{
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
        };
    }
    componentWillReceiveProps(nextProps){
        let {params} = this.state;
        if(nextProps.tab!==params.tab){
            params.tab = nextProps.tab;
            this.setState({
                loading:true,
                params:params
            });
            this.getTopicData();
        }
    }
    getTopicData(){
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
    componentDidMount(){
        this.getTopicData();
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
                                <a >{item.title}</a>
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
        return <Tag color="#e5e5e5" style={{color:"#999"}}>{typeMap.get(props.tab)}</Tag>;
    }
    
}

class TopicList extends React.Component{
    constructor(props){
        super(props);
        // let params = new URLSearchParams(this.props.location.search);
        this.state = {
            currentTab:"all",
        };
    }
    handleTabChange(key){
        // tab 切换
        this.setState({
            currentTab:key
        });
    }
    render(){
        let keys = [...typeMap.keys()];
        // let key = "all";
        return (<div>
                    <ul className="topic-tab">
                    {keys.map(key=>(
                        <li className="tab" className={this.state.currentTab==key?"current-tab":""} key={key} onClick={()=>this.handleTabChange(key)}>
                            <Link to={{ pathname: "/", search: "?tab="+key }}>{typeMap.get(key)}</Link>
                        </li>
                    ))}
                    </ul>
                    <ContentItem tab={this.state.currentTab} />
                </div>);
    }
}

export default function ContentPage(){
    return (<Router>
            <Route component={TopicList}></Route>
        </Router>);
}

// )
// )}
// <Tabs
//                 defaultActiveKey="all"
//                 onChange={this.handleTabChange}
//             >  
//                 <TabPane tab="全部" key="all">
//                     <ContentPage tab="" />
//                 </TabPane>
//                 <TabPane tab="问答" key="ask">
//                     <ContentPage tab="ask" />
//                 </TabPane>
//                 <TabPane tab="分享" key="share">
//                     <ContentPage tab="share" />
//                 </TabPane>
//                 <TabPane tab="精华" key="good">
//                     <ContentPage tab="good" />
//                 </TabPane>
//                 <TabPane tab="招聘" key="job">
//                     <ContentPage tab="job" />
//                 </TabPane>
//             </Tabs>