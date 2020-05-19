import * as React from 'react';
import {Component} from 'react';
import axios from "axios";
import { Theme, withStyles, List, ListItemAvatar, Avatar, ListItem, ListItemText, Typography, Divider, Card, CardHeader, CardContent, Fade, Zoom, Grow, Badge, Chip, createStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { grey } from '@material-ui/core/colors';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import Loading from './Loading';

interface PostsState{
    token?: string;
    errorMessage?: string;
    posts?: any;
    isFetching: boolean;
    isLoadingMore: boolean;
    searchKey: string;
    page: number;
    noMore: boolean;
}

class Posts extends Component<any, PostsState>{
    cancel: any;
    observer: any;
    lastItem: any;
    private pageTop = React.createRef<HTMLDivElement>();
    constructor(props:any){
        super(props);
        this.state={
            token:undefined,
            isFetching:true,
            searchKey:this.props.searchKey,
            page:0,
            noMore:false,
            isLoadingMore:false,
        }
        this.observer = React.createRef();
        this.lastItem = (item)=>{
            if(this.state.isFetching) return;
            if(this.observer.current) this.observer.current.disconnect();
            this.observer.current = new IntersectionObserver(entries=>{
                if(entries[0].isIntersecting){
                    this.setState({page:this.state.page+1}, ()=>this.handleLoading());
                }
            });
            if(item) this.observer.current.observe(item);
        };
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
                this.setState({token:this.props.token, posts:response.data, isFetching:false, page:0, noMore:false});
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
            this.setState({token:this.props.token, posts:response.data, isFetching:false});
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

    handleLoading = ()=>{
        this.setState({
            isLoadingMore:true,
        });
        axios.post("api/posts",{
            keyWord: this.props.searchKey,
            class: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            page: this.state.page,
          }).then((response)=>{
            if(response.data.length)
                this.setState({token:this.props.token, posts: this.state.posts.concat(response.data), isLoadingMore:false});
            else{
                this.setState({noMore:true, isLoadingMore:false});
            }
          });
    }

    handleScrollToTop = () =>{
        this.pageTop.current.scrollIntoView({behavior:"smooth"});
    }

    createList = (classes:any) =>{
        let list:any = [];
        let listItem = this.state.posts;
        if(listItem.length!=0){
            listItem.map((item:any, index:number)=>{
                list.push(
                <div className={classes.rootdiv}>
                    <ListItem ref={listItem.length === index+1?this.lastItem:null} button onClick={event => this.clickHandler(event, item["id"])} className={classes.listItem}>
                    <Fade in={!this.state.isFetching} style={{ transitionDelay: '100ms' }}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar alt={item["title"]} src={item.image?"/api/img/post/cover/"+item["id"]:null} />
                                }
                                title={item["title"]}
                                subheader={item["number"]+" left"+" Created by "+item["userid"]+" on "+item["created_at"]}
                                action={<Zoom in={!this.state.isFetching} style={{ transitionDelay: '300ms'}}><Chip color="primary" size="small" label={"$"+item["price"]}></Chip></Zoom>}>
                            </CardHeader>
                            <Divider></Divider>
                            <CardContent className={classes.cardBody}>
                                <div className={classes.description}>
                                    {this.shortenDescription(item["description"])}
                                </div>
                            </CardContent>
                        </Card>
                    </Fade>
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
            <>
                <div className={classes.pageTop} ref={this.pageTop}></div>
                <List className={classes.root}>
                    {this.createList(classes)}
                </List>
                {this.state.isLoadingMore?<Loading></Loading>:null}
                {this.state.noMore?<Typography align="center">
                    That's the last one.
                    <IconButton color="primary" aria-label="go page top" onClick={this.handleScrollToTop}>
                        <VerticalAlignTopIcon></VerticalAlignTopIcon>
                    </IconButton>
                </Typography>:null}
            </>
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
    },
    pageTop:{
        position: "absolute",
        top: -100,
    }
}))(Posts);
