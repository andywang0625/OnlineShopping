import * as React from 'react';
import {Component} from 'react';
import axios from "axios";
import { Theme, withStyles, List, ListItemAvatar, Avatar, ListItem, ListItemText, Typography, Divider, Card, CardHeader, CardContent } from '@material-ui/core';
import { stat } from 'fs';
import color from '@material-ui/core/colors/amber';
import { lightBlue, grey } from '@material-ui/core/colors';
import Loading from './Loading';

interface PostsState{
    token?:string;
    errorMessage?:string;
    posts?:any;
    isFetching:boolean;
}

const styles = (theme:Theme) =>({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    rootdiv:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: "column",
        marginBottom: theme.spacing(2),
    },
    inline: {
        display: 'inline',
    },
    listItem:{
        width: "95%",
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
});

class Posts extends Component<any, PostsState>{
    constructor(props:any){
        super(props);
        this.state={
            token:undefined,
            isFetching:true,
        }
    }
    componentDidMount(){
        axios.post("api/posts",{
            keyWord: undefined,
            class: undefined,
            minPrice: undefined,
            maxPrice: undefined,
          },{withCredentials: true}).then((response)=>{
            this.setState({token:this.props.token, posts:response, isFetching:false});
          });
    }

    clickHandler = (event:React.MouseEvent<HTMLDivElement, MouseEvent>,id:string) => {
        window.location.href = "/post/"+id;
    }

    createList = (classes:any) =>{
        let list:any = [];
        console.log(this.state.posts.data["data"]);
        this.state.posts.data["data"].forEach((item:any)=>{
            list.push(
            <div className={classes.rootdiv}>
                <ListItem button onClick={event => this.clickHandler(event, item["id"])} className={classes.listItem}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar alt={item["title"]} src={"/static/imgs/productAvatars/"+item["id"]} />
                        }
                        title={item["title"]}
                        subheader={item["number"]+" left"+" Created by "+item["userid"]+" on "+item["updated_at"]}
                    >
                    </CardHeader>
                    <Divider></Divider>
                    <CardContent className={classes.cardBody}>
                        <div className={classes.description}>
                            {item["description"]}
                        </div>
                    </CardContent>
                </Card>
                </ListItem>
            </div>
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

export default withStyles(styles)(Posts);
