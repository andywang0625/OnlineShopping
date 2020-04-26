import * as React from 'react';
import {Component} from 'react';
import axios from "axios";
import { Theme, withStyles, List, ListItemAvatar, Avatar, ListItem, ListItemText, Typography, Divider, Card, CardHeader, CardContent, Fade, Zoom, Grow, Badge, Chip, IconButton, Menu, createStyles } from '@material-ui/core';
import { stat } from 'fs';
import color from '@material-ui/core/colors/amber';
import { lightBlue, grey } from '@material-ui/core/colors';
import Loading from './Loading';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from '@material-ui/core/MenuItem';
import MyPostCards from './MyPostCards';

interface PostsState{
    token?:string;
    errorMessage?:string;
    posts?:any;
    isFetching:boolean;
    userId?:number;
}


class MyPosts extends Component<any, PostsState>{
    constructor(props:any){
        super(props);
        this.state={
            token:undefined,
            isFetching:true,
            userId:undefined
        }
    }
    componentDidMount(){
        axios.post("api/posts",{
            keyWord: undefined,
            class: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            userId: this.props.userId
          },{withCredentials: true}).then((response)=>{
            this.setState({token:this.props.token, posts:response, isFetching:false});
          });
    }

    handleClose = (event:any, id:string) =>{
        console.log("id");
    }

    deleteItem = () => {
        axios.post("api/posts",{
            keyWord: undefined,
            class: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            userId: this.props.userId
          },{withCredentials: true}).then((response)=>{
            this.setState({token:this.props.token, posts:response, isFetching:false});
          });
    }

    createList = (classes:any) =>{
        let list:any = [];
        let listItem = this.state.posts.data;
        Object.keys(this.state.posts.data).forEach((item:any)=>{
            list.push(
                <MyPostCards token={this.state.token} delCallback={this.deleteItem} classes={classes} listItem={listItem} item={item} isFetching={this.state.isFetching}></MyPostCards>
            )
        });
        return list;
    }

    render(){
        if(this.state.isFetching) return <Loading />;
        const {classes} = this.props;
        return(
                <List className={classes.root}>
                    {this.createList(classes)}
                </List>
        )
    }
}

export default withStyles(({spacing, palette}:Theme)=>createStyles({
    root: {
        width: '100%',
        backgroundColor: palette.background.paper,
    },
    rootdiv:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: "column",
        marginBottom: spacing(2),
    },
    card:{
        width: "100%",
        margin: 0
    },
    inline: {
        display: 'inline',
    },
    listItem:{
        width: "95%",
        padding: 0
    },
    description:{
        width: "100%",
        overflow : 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        webkitLineClamp: 2,
        webkitBoxOrient: 'vertical',
    },
    avatar:{
        top:0,
    },
    cardBody:{
        backgroundColor: grey[100],
    }
}))(MyPosts);
