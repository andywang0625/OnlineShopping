import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { withStyles, Theme, ListItem, Grow, Card, CardHeader, Avatar, Zoom, Divider, CardContent, Typography, List, Chip } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import MessageAvatar from './MessageAvatar';
import Loading from './Loading';
import axios from "axios";

interface ConversationsState{
    isFetching:boolean;
    conversations?:string[];
}

class Conversations extends Component<any, ConversationsState> {
    constructor(props){
        super(props);
        this.state = {
            isFetching:true,
            conversations:undefined,
        };
    }

    componentDidMount(){
        axios({
            method:"get",
            url: "/api/messages/conversations",
            params:{
                token: this.props.token,
            }
        }).then((response)=>{
            this.setState({
                isFetching:false,
                conversations:response.data.conversations,
            });
        });
    }

    clickHandler = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, currentValue)=>{
        this.props.history.push({
            pathname: '/chat',
            targetid: currentValue.senderid,
        });
    }
    createList = (currentValue, index) =>{
        console.log(currentValue);
        const {classes} = this.props;
        return (
            <ListItem button onClick={event => this.clickHandler(event, currentValue)} className={classes.listItem}>
            <Grow in={!this.state.isFetching} style={{ transitionDelay: '100ms' }}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <MessageAvatar userid={currentValue.senderid}></MessageAvatar>
                        }
                        title={currentValue.sendername}
                        action={<Zoom in={!this.state.isFetching} style={{ transitionDelay: '300ms'}}><Chip color="primary" size="small" label={currentValue.lasttime}></Chip></Zoom>}>
                    </CardHeader>
                </Card>
            </Grow>
            </ListItem>
            );
    }
    render() {
        const {classes} = this.props;
        if(this.state.isFetching){
            return (<Loading></Loading>);
        }else
            return (
                <List className={classes.root}>
                    {this.state.conversations.map(this.createList)}
                </List>
            )
    }
}

export default withStyles(({spacing, palette}:Theme)=>createStyles({
    root: {
        width: '100%',
        backgroundColor: palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: "column",
    },
    listItem:{
        width: "100%",
        padding: 0,
    },
    card:{
        width: "100%",
        margin: 0
    },
}))(withRouter(Conversations));
