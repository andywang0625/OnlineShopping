import * as React from 'react';
import {Component} from 'react';
import axios from "axios";
import { Theme, withStyles, List, ListItemAvatar, Avatar, ListItem, ListItemText, Typography, Divider, Card, CardHeader, CardContent, Fade, Zoom, Grow, Badge, Chip } from '@material-ui/core';
import { stat } from 'fs';
import color from '@material-ui/core/colors/amber';
import { lightBlue, grey } from '@material-ui/core/colors';
import Loading from './Loading';

interface PostsState{
    token?:string;
    errorMessage?:string;
    posts?:any;
    isFetching:boolean;
    searchKey:string;
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
});

class Posts extends Component<any, PostsState>{
    cancel:any;
    constructor(props:any){
        super(props);
        this.state={
            token:undefined,
            isFetching:true,
            searchKey:this.props.searchKey,
        }
        this.cancel = "";
    }

    componentDidUpdate(prevProps:any){
        if(prevProps.searchKey!==this.props.searchKey){
            if(this.cancel){
                this.cancel.cancel();
            }
            this.cancel = axios.CancelToken.source();
            axios.post("api/posts",{
                keyWord: this.props.searchKey,
                class: undefined,
                minPrice: undefined,
                maxPrice: undefined,
            },{
                cancelToken: this.cancel.token
            }).then((response)=>{
                this.setState({token:this.props.token, posts:response, isFetching:false});
            }).catch((e)=>{
                if(axios.isCancel(e)){
                    //console.log("Request Cancelled");
                }else{
                    console.log("Internal Error");
                }
            });
        }
    }

    componentDidMount(){
        axios.post("api/posts",{
            keyWord: undefined,
            class: undefined,
            minPrice: undefined,
            maxPrice: undefined,
          }).then((response)=>{
            this.setState({token:this.props.token, posts:response, isFetching:false});
          });
    }

    clickHandler = (event:React.MouseEvent<HTMLDivElement, MouseEvent>,id:string) => {
        window.location.href = "/post?id="+id;
    }

    shortenDescription = (description:string) =>{
        if(description.length>120){
            return description.substr(0,description.lastIndexOf(' ', 120))+"...";
        }else{
            return description;
        }

    }

    createList = (classes:any) =>{
        let list:any = [];
        let listItem = this.state.posts.data;
        if(listItem.length!=0){
            Object.keys(listItem).forEach((item:any)=>{
                list.push(
                <div className={classes.rootdiv}>
                    <ListItem button onClick={event => this.clickHandler(event, listItem[item]["id"])} className={classes.listItem}>
                    <Grow in={!this.state.isFetching} style={{ transitionDelay: '100ms' }}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar alt={listItem[item]["title"]} src={"/api/img/post/cover/"+listItem[item]["id"]} />
                                }
                                title={listItem[item]["title"]}
                                subheader={listItem[item]["number"]+" left"+" Created by "+listItem[item]["userid"]+" on "+listItem[item]["created_at"]}
                                action={<Zoom in={!this.state.isFetching} style={{ transitionDelay: '300ms'}}><Chip color="primary" size="small" label={"$"+listItem[item]["price"]}></Chip></Zoom>}>
                            </CardHeader>
                            <Divider></Divider>
                            <CardContent className={classes.cardBody}>
                                <div className={classes.description}>
                                    {this.shortenDescription(listItem[item]["description"])}
                                </div>
                            </CardContent>
                        </Card>
                    </Grow>
                    </ListItem>
                </div>
                )
            });
        }else{
            return <Typography align="center">No related items found! :(</Typography>
        }

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
