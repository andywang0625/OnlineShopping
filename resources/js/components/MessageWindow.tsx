import React, { Component, createRef } from 'react';
import { withStyles, Paper, Typography, Input, Divider, Button, Icon, Grid, InputAdornment } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import Loading from './Loading';
import Container from '@material-ui/core/Container';

interface MessageWindowState{
    message?:string;
    messagesList?:string[];
    isFetching:boolean;
}

class MessageWindow extends Component<any, MessageWindowState> {
    interval:any = undefined;
    private messageEnd = createRef<HTMLDivElement>();
    constructor(props){
        super(props);
        this.state = {
            message:undefined,
            messagesList:undefined,
            isFetching:true,
        };
    }

    fetchConversation = () =>{
        let messages:any[] = [];
        axios({
            method: 'get',
            url: '/api/messages/sent',
            params:{
                token:this.props.token,
                targetId: this.props.location.targetid,
            }
        }).then((response)=>{
            messages = response.data.messages;
            axios({
                method: "get",
                url: '/api/messages/received',
                params:{
                    token:this.props.token,
                    targetId: this.props.location.targetid,
                }
            }).then((response)=>{
                messages = messages.concat(response.data.messages);
                messages = messages.sort((a, b)=>{
                    return a.created_at > b.created_at?1:-1;
                });
                //console.log(messages); // print format
                this.setState({
                    messagesList:messages,
                    isFetching:false,
                })
            });
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.messagesList){
            if(prevState.messagesList.length!=this.state.messagesList.length){
                this.messageEnd.current.scrollIntoView({behavior:"smooth"});
            }
        }else if(this.messageEnd.current){
            this.messageEnd.current.scrollIntoView();
        }
    }

    componentDidMount(){
        if(!this.props.location.targetid)
            window.location.href = "/";
        this.props.hideHomeBar(true);
        this.interval = setInterval(this.fetchConversation, 5000);
        this.fetchConversation();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    makeChatbox = (currentMessage, index) =>{
        const {classes} = this.props;
        if(currentMessage.targetid!=this.props.userId){
            return (
                <div className={`${classes.bubbleContainer} ${classes.right}`}>
                    <div className={classes.bubble}>
                        <Typography>{currentMessage.content}</Typography>
                    </div>
                </div>
            );
        }else{
            return (
                <div className={`${classes.bubbleContainer} ${classes.left}`}>
                    <div className={classes.bubble}>
                        <Typography>{currentMessage.content}</Typography>
                    </div>
                </div>
            );
        }
    }

    handleSubmit = () =>{
        if(this.state.message){
            axios({
                url:"/api/message/send",
                method: "post",
                data:{
                    token: this.props.token,
                    reciever: this.props.location.targetid,
                    message: this.state.message,
                }
            }).then((response)=>{
                if(!response.data.error){
                    this.fetchConversation();
                }
            }).catch((error)=>{
                console.log(error.response.data.error);
            });
        }
        this.setState({
            message:"",
        });
    }

    handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({
            message:e.target.value,
        });
    }

    handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === "Enter"){
            this.handleSubmit();
        }
    }

    render() {
        const {classes} = this.props;
        if(this.state.isFetching)
            return (
                <Loading></Loading>
            );
        else
            return (
                <div>
                    <Container className={classes.root} maxWidth="md">
                        <Paper className={classes.paper}>
                            {this.state.messagesList.map(this.makeChatbox)}
                            <div ref={this.messageEnd}>
                            </div>
                        </Paper>
                    </Container>
                    <div className={classes.textRoot}>
                    <Divider></Divider>
                    <Input
                    className={classes.textBox}
                    placeholder="Your Question"
                    inputProps={{'aria-label':"message"}}
                    onChange={this.handleChange}
                    value={this.state.message}
                    onKeyDown={this.handleKeyDown}
                    endAdornment={
                        <InputAdornment position="end">
                        <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}
                        onClick={this.handleSubmit}></Button>
                        </InputAdornment>
                    } />
                    </div>
                </div>
            );
    }
}

export default withStyles({
    root:{
        marginBottom:"20px",
    },
    textRoot:{
        top: 'auto',
        position:"fixed",
        bottom:0,
        left:0,
        right:0,
        width:"100%",
    },
    textBox:{
        width:"100%",
    },
    bubble:{
        border: "0.5px solid black",
        borderRadius: "10px",
        margin:"5px",
        padding: "10px",
        display: "inline-block",
    },
    bubbleContainer:{
        width: "100%",
        display: "flex",
    },
    right:{
        justifyContent: "flex-end",
    },
    left:{
        justifyContent: "flex-start",
    },
    paper:{
        height: "80vh",
        maxHeight: "80vh",
        marginTop: "10px",
        marginBottom: "35px",
        overflow: "auto",
    },
    button:{
        width:"100%",
    }
})(withRouter(MessageWindow));
