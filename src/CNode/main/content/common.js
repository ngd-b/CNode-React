import React from "react";
import {Tag} from "antd";


const typeMap = new Map([["all","全部"],["good","精华"],["ask","问答"],["share","分享"],["job","招聘"]]);
/**
 * 文章类型处理
 * @param {} props 
 */
function ArticleTag(props){
    if(props.top){
        return <Tag color="#80bd01">精华</Tag>;
    }else if(props.good){
        return <Tag color="#80bd01">精华</Tag>;
    }else{
        return <Tag color="#e5e5e5" style={{color:"#999"}}>{typeMap.get(props.tab)}</Tag>;
    }
    
}
/**
 * 文章时间处理
 * @param {} time 
 */
function getTime(time){
    let diffTime = new Date().getTime() - new Date(time).getTime();
    let replay_msg = "";
    if(diffTime/(3600*1000*24) > 1){
        // 大概的计算，评论回复时间
        let day = Math.floor(diffTime/(3600*1000*24));
        if(day/(30*12)>1){
            let index = getYear(day,index);
            replay_msg = index+"年前";
        }else if(day>30){
            let index = day%30+1;
            replay_msg = index+"个月前";
        }else{
            replay_msg = day+"天前";
        }
    }else if(diffTime/(3600*1000) > 1){
        replay_msg = Math.floor(diffTime/(3600*1000))+"小时前";
    }else{
        replay_msg = Math.floor(diffTime/(60*1000))+"分钟前";
    }
    function getYear(day){
        let index = 1;
        day = day - 30*12;
        if(day/(30*12)>1){
            getYear(day);
        }
        return index;
    }
    return replay_msg;
}
export {ArticleTag,typeMap,getTime};
