import React from "react";
import ReactDOM from "react-dom";

import requestAPI from "./API/CNode";

class TopicPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error:null,
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
            return <p>Error:{error.message}</p>
        }else if(loading){
            return <p>loading...</p>
        }else{
            return (<div>
                <ul>
                    {data.map(item=>(
                        <li key={item.id}>
                            <p>{item.author.loginname}</p>
                        </li>
                    ))}
                </ul>
            </div>)
        }
    }
} 


ReactDOM.render(<TopicPage />,document.getElementById("app"));