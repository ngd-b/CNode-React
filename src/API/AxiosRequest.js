import axios from "axios";

// public config to request option
const instance = axios.create({
    baseURL:'https://cnodejs.org/api/v1',
    timeout:10000,
    transformRequest:[function(data,headers){
        return data;
    }],
    transformResponse:[function(data){
        return data.data;
    }],
    headers:{
        'X-Requested-Wiht':"XMLHttpRequest"
    },
    params:{},
    responseType:"json",
    responseEncoding:"utf-8",
    maxContentLength:2000,
    validateStatus:function(status){
        return status>=200&&status<=300;
    },
    proxy:{
        host:"127.0.0.1",
        port:17899,
        auth:{
            username:"",
            password:""
        }
    }
});

// the request's interceptors before reqeust 
instance.interceptors.request.use(function(config){
    return config;
});

// exposed interface to ajax requst 
export const ajaxRequset = (api,option)=>{
    return instance({
        url:api,
        method:option.type,
        params:option.params
    });
}