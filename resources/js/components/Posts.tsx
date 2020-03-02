import * as React from 'react';
import {Component} from 'react';
import axios from "axios";

interface PostsState{
    token?:string;
    errorMessage?:string;
}

class Posts extends Component<any, PostsState>{
    constructor(props:any){
        super(props);
        this.state={
            token:undefined
        }
    }
    componentDidMount(){
        this.setState({token:this.props.token});
    }

    createList = () =>{
        let list:any = [];
        axios.post("api/posts",{
            keyWord: undefined,
            class: undefined,
            minPrice: undefined,
            maxPrice: undefined,
        },{withCredentials: true}).then(response => {
            if(!response.data["error"]){
                response.data["data"].forEach(function(element:any){
                    list.push(element["title"]);
                    list.push(element["description"]);
                    list.push(element["price"]);
                });
                // for(let i = 0; i < response.data["data"].length; i++){
                //     ;
                // }
            }else{
                ;
            }
        }).catch(error => {
            this.setState({errorMessage: error.response.data["error"]});
        });
        console.log(list);
        return (<div></div>);
    }

    render(){
        return(
            <div>{this.createList()}</div>
        )
    }
}

export default Posts;
