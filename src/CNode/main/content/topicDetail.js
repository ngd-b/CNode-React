import React from "react";
import {Row,Col,Spin,Result,Button,Tag} from "antd";
import {Link,withRouter} from "react-router-dom";
import ReactMarkdown  from "react-markdown";
import {AuthorContext} from "@Context/authorContext";

import requestAPI from "@api/CNode";

import {ArticleTag,typeMap,getTime} from "./common";

class TopicDetail extends React.Component{
    constructor(props){
        super(props);
        // let params = new URLSearchParams(this.props.location.search);
        // this.props.match.params.id;
        this.state = {
            loading:true,
            data:{},
            error:"",
            params:{
                mdrender:true,
                accesstoken:""
            }
        };
        this.props.articleId = this.props.match.params.id;
    }

    getDetailContent(id,bool = true){
        let _this = this;
        requestAPI.getTopicDetail(id,_this.state.params).then(
            res=>{
                let data = {};
                if(res.status === 200){
                    // 明明在全局做了配transformResponse置，怎么没有做处理，而第一个请求是处理过得
                    data = res.data;
                    if(bool){
                        _this.props.callback(data.author.loginname);
                    }
                }
                _this.setState({ 
                    loading:false,
                    data:data,
                });
                // _this.props.getArticleAuthorName(data.author.loginname);
            },
            xhr=>{
                _this.setState({
                    loading:false,
                    error:xhr.status+"------------"+xhr.message
                });
            });
    }
    componentDidMount(){
        this.getDetailContent(this.props.articleId);
    }
    componentWillReceiveProps(nextProps){
        let id = nextProps.match.params.id;
        this.props.articleId = id;
        this.getDetailContent(id,false);
        // if(this.props.match.params.id !== id){
        //     this.getDetailContent();
        // }
        
        // console.log(nextProps);
    }
    refreshDat(){
        this.getDetailContent(this.props.articleId);
    }
    render(){
        let {error,loading,data} = this.state;
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
            return(<Row className="detail">
                <Col className="header" span={24}>
                    <ArticleTag tab={data.tab} good={data.good} top={data.top} />
                    <h3>{data.title}</h3>
                    <ul>
                        <li>发布于 {getTime(data.create_at)}</li>
                        <li>作者 <Link to={{pathname:"/user/"+data.author.loginname}}>{data.author.loginname}</Link></li>
                        <li>{data.visit_count}次浏览</li>
                        <li>来自 {typeMap.get(data.tab)}</li>
                    </ul>
                </Col>
                <Col className="content" span={24}>
                    <ReactMarkdown className="topic markdown-text" source={data.content} />
                </Col>
                <Col className="replies" span={24}>

                </Col>
            </Row>);
        } 
    }
}

export default withRouter(TopicDetail);