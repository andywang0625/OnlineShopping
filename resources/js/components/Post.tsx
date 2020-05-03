import React, { Component } from 'react';
import { useParams, useLocation, withRouter } from 'react-router-dom';
import { Paper, Container, Divider, Chip, Typography, Theme, Card, CardHeader, Avatar, CardContent, IconButton, CardActions, Slide, Zoom, createStyles, Popover } from '@material-ui/core';
import axios from "axios";
import Loading from './Loading';
import queryString from 'query-string'
import { withStyles } from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import MessageAvatar from './MessageAvatar';

interface PostState{
    token?:string;
    isFetching:boolean;
    postBody:any;
    postTitle?:string;
    postDate?:string;
    owner?:string;
    price?:string;
    quantity?:string;
    notFound?:boolean;
    query?:any;
    ownerid?:string;
    sliderLoading?:boolean;
    sliders?:any[];
    tags?:any[];
    anchorEl:any;
    open:object;
}

export class Post extends Component<any, PostState> {
    constructor(props:any){
        super(props);
        this.state = {
            token:this.props.token,
            isFetching:true,
            postBody:undefined,
            postTitle:undefined,
            postDate:undefined,
            owner:undefined,
            ownerid:undefined,
            price:undefined,
            quantity:undefined,
            notFound:false,
            query:undefined,
            sliderLoading:true,
            sliders:undefined,
            tags:undefined,
            anchorEl:null,
            open:{},
        };
    }
    componentDidMount(){
        const values = queryString.parse(this.props.location.search);
        let id:string|string[] = "";
        if(values.id!=null){
            id = values.id;
        }else
            this.setState({notFound:true});
        axios.post('/api/post',{
            id:id,
        }).then((response:any)=>{
            this.setState({
                postBody:response.data["data"].postBody,
                postTitle:response.data["data"].postTitle,
                postDate:response.data["data"].postDate,
                owner:response.data["data"].owner,
                ownerid:response.data["data"].ownerid,
                price:response.data["data"].price,
                quantity:response.data["data"].quantity,
                isFetching:false,
            });
            axios({
                method:"GET",
                url:"/api/post/tags",
                params:{
                    id:id,
                }
            }).then((response)=>{
                this.setState({
                    tags:response.data.tags,
                });
            }).catch(e=>{
                throw e;
            })
            axios.get('/api/img/postid/'+id).then((response:any)=>{
                let slides:any = [];
                let imgNames: any[] = [];
                Object.keys(response.data).forEach(function(key){
                    imgNames.push(response.data[key].filename);
                });

                imgNames.forEach(function(name){
                    slides.push(<div data-src={"/api/img/post/"+name}></div>);
                });

                this.setState({
                    sliders:slides,
                    sliderLoading:false
                });
            }).catch(e=>{
                throw e;
            });
        }).catch(e=>{
            if(e=="Error: Request failed with status code 404")
                this.setState({notFound:true});
            else{
                console.log(e);
                this.setState({
                    notFound:true,
                });
            }
        });
    }

    sliderMaker = () =>{
        if(this.state.sliderLoading){
            return (
                    <Loading></Loading>
            )
        }else if(this.state.sliders?.length!=0){
            return(
                <AwesomeSlider organicArrows={true}>
                    {this.state.sliders}
                </AwesomeSlider>
            );
        }else{
            return(
                <Typography align="center" gutterBottom>Oops, The Owner Did Not Provide a Photo</Typography>
            );
        }
    }

    handleClose = ()=>{
        this.setState({
            anchorEl:null,
            open:{},
        });
    }

    handleTagsClick = (e, index)=>{
        this.setState({
            anchorEl:e.currentTarget,
            open:{
                [index]:true
            },
        });
    }
    tagsMaker = (currentValue, index) =>{
        const {classes} = this.props;
        return(
            <>
                <Chip aria-describedby={index}
                    className={classes.tag}
                    color="primary"
                    label={currentValue.tag}
                    onClick={(e)=>this.handleTagsClick(e, index)}></Chip>
                <Popover
                    id={index}
                    open={this.state.open[index]}
                    onClose={this.handleClose}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    ><Typography className={classes.tagCaption} variant="caption">{currentValue.description}</Typography></Popover>
            </>
        );
    }

    render() {
        const {classes} = this.props;
        if(this.state.notFound) return (
            <Container>
                <h1>Item Not Found</h1>
            </Container>
        );
        if(this.state.isFetching)
            return (<Loading></Loading>);
        return (
            <Container className={classes.root}>
                <Slide direction="up" in style={{ transitionDelay: '300ms'}}>
                    <Paper className={classes.paper}>
                    <Card className={classes.header}>
                        <CardHeader
                        avatar={this.state.ownerid!=this.props.userid?<MessageAvatar userid={this.state.ownerid}></MessageAvatar>: <Avatar aria-label="Start Chat" className={classes.avatar} src={"/static/img/UserAvatars/"+this.state.ownerid}></Avatar>}
                        title={
                            <Typography variant="h5" gutterBottom>
                            {this.state.postTitle}
                            </Typography>
                        }
                        subheader={
                            <div>
                                <Typography variant="h6" gutterBottom>
                                    {this.state.postDate?.slice(0,10)}
                                </Typography>
                                <Zoom in style={{ transitionDelay:'600ms'}}>
                                    <Chip label={"$"+this.state.price} variant="outlined">
                                    </Chip>
                                </Zoom>
                            </div>
                        }>
                        </CardHeader>
                        <CardContent>
                        <Divider></Divider>
                        {this.state.tags?(this.state.tags.map(this.tagsMaker)):null}
                        <Divider></Divider>
                        {this.sliderMaker()}
                        <Divider></Divider>
                        <Typography paragraph className={classes.body} variant="body1">
                            {this.state.postBody}
                        </Typography>
                        <Divider></Divider>
                        <CardActions>
                        <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                        <ShareIcon />
                        </IconButton>
                    </CardActions>
                        </CardContent>
                    </Card>
                    </Paper>
                </Slide>
            </Container>
        );
    }
}

export default withStyles(({spacing}:Theme)=>createStyles({
    root:{
        padding:0
    },
    paper:{
        marginTop: spacing(3),
        height: "60%",
        marginBottom: spacing(10),
    },
    body:{
        padding: spacing(0),
        paddingTop: spacing(5),
        paddingBottom: spacing(5),
    },
    header:{
        padding: spacing(0),
    },
    avatar: {
        backgroundColor: blue[500],
    },
    tag:{
        margin:spacing(1),
    },
    tagCaption:{
        marginTop:spacing(2),
        marginBottom:spacing(2),
    }
}))(withRouter(Post));
