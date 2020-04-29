import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import Loading from './Loading';

interface MessageWindowState{
    message?:string;
    messagesList?:string[];
    isFetching:boolean;
}

class MessageWindow extends Component<any, MessageWindowState> {
    constructor(props){
        super(props);
        //console.log(this.props.location.targetid);
        this.state = {
            message:undefined,
            messagesList:undefined,
            isFetching:true,
        }
    }
    componentDidMount(){
        let messages:any[] = [];
        axios({
            method: 'get',
            url: '/api/messages/sent',
            params:{
                token:this.props.token,
            }
        }).then((response)=>{
            messages = response.data.messages;
            axios({
                method: "get",
                url: '/api/messages/received',
                params:{
                    token:this.props.token,
                }
            }).then((response)=>{
                messages = messages.concat(response.data.messages);
                messages = messages.sort((a, b)=>{
                    return a.created_at > b.created_at?1:-1;
                });
                this.setState({
                    messagesList:messages,
                    isFetching:false,
                })
            });
        });
    }
    render() {
        if(this.state.isFetching)
            return (
                <Loading></Loading>
            );
        else
            return (
                <div>

                </div>
            );
    }
}

export default withStyles({

})(withRouter(MessageWindow));
