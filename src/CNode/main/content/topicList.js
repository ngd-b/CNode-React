import React from "react";
import {Spin,Result,Button,List,Avatar} from "antd";
import {Link,withRouter} from "react-router-dom";

import requestAPI from "@api/CNode";

import {ArticleTag,typeMap,getTime} from "./common";

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
                error:xhr.status+"------------"+xhr.message
            });
        });
    }
    componentDidMount(){
        this.getTopicData();
    }
    refreshDat(){
        this.getTopicData();
    }
    render(){
        const {error,loading,data} = this.state;
        let {page,limit} = this.state.params
        if(error){
            return (<Result 
                    status="warning"
                    title="the bad request"
                    extra={
                        <Button type="primary" onClick={()=>refreshDat()}>
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
                                <Link to={{pathname:"/topic/"+item.id}}>{item.title}</Link>
                            </div>
                            <div>
                                <span>{getTime(item.last_reply_at)}</span>
                            </div> 
                        </List.Item>
                    )
                    }
                /> )
        }
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

export default withRouter(TopicList);