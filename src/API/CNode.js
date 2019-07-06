/**
 * the CNode's pbulic APi
 */
import {ajaxRequset as ajax} from "./AxiosRequest";

// get the topic page data 
class CNode{
    constructor(){
        this.author = {
            name:"hboot",
            email:"bobolity@163.com"
        }
    }
    getTopics(){
       return ajax('/topics',{type:"get"})
    }
    // the article's detail 
    getTopicDetail(id){
        return ajax('/top/id',{type:"get"})
    }
} 

export default new CNode();