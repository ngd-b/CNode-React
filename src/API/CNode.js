/**
 * the CNode's pbulic APi
 */
import {ajaxRequset as ajax} from "@api/AxiosRequest";

// get the topic page data 
class CNode{
    constructor(){
        this.author = {
            name:"hboot",
            email:"bobolity@163.com"
        }
    }
    getTopics(params){
        let {page,tab,limit} = params;
        return ajax('/topics',{
            type:"get",
            params:{
                    page:page||1,
                    tab:tab||"",
                    limit:limit||20,
                    mdrender:true
            }
        });
    }
    // the article's detail 
    getTopicDetail(id,params){
        return ajax('/topic/'+id,{
            type:"get",
            params:{
                mdrender:false,
                accesstoken:""
            }
        });
    }
} 

export default new CNode();