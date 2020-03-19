import React, { Component } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Paper, Container, Divider, Chip, Typography, Theme, Card, CardHeader, Avatar, CardContent, IconButton, CardActions, Slide, Zoom } from '@material-ui/core';
import axios from "axios";
import Loading from './Loading';
import queryString from 'query-string'
import { withStyles } from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const styles = (theme:Theme)=>({
    paper:{
        marginTop: theme.spacing(3),
        height: "60%",
        marginBottom: theme.spacing(10),
    },
    body:{
        padding: theme.spacing(1),
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
    },
    header:{
        padding: theme.spacing(1),
    },
    avatar: {
        backgroundColor: blue[500],
    },
});

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
            query:undefined
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
                price:response.data["data"].price,
                quantity:response.data["data"].quantity,
                isFetching:false,
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
        })
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
            <Container>
                <Slide direction="up" in style={{ transitionDelay: '300ms'}}>
                    <Paper className={classes.paper}>
                    <Card className={classes.header}>
                        <CardHeader
                        avatar={
                            <Avatar aria-label="Owner" className={classes.avatar}></Avatar>
                        }
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

export default withStyles(styles)(Post);
