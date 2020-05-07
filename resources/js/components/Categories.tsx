import React, { Component } from 'react';
import { Theme, withStyles, List, ListItemAvatar, Avatar, ListItem, ListItemText, Typography, Divider, Card, CardHeader, CardContent, Fade, Zoom, Grow, Badge, Chip, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { createStyles } from '@material-ui/core/styles';
import Loading from './Loading';

interface CategoriesState{
    cates:any[];
    selectedCates:any[];
    result:any[];
    isFetching:boolean;
    isSearching:boolean;
}

class Categories extends Component<any, CategoriesState> {
    cancel:any;
    constructor(props){
        super(props);
        this.state = {
            cates:[],
            selectedCates:[],
            isFetching:true,
            isSearching:false,
            result:[],
        };
        this.cancel = "";
    }
    componentDidMount(){
        axios({
            method:"get",
            url:"/api/tags",
        }).then((response)=>{
            this.setState({cates:response.data["tags"], isFetching:false});
        });
    }
    handleSelect = (tagInfo:any) =>{
        this.setState({
            cates: this.state.cates.filter((cate)=>tagInfo.id!==cate.id),
            selectedCates: [...this.state.selectedCates, tagInfo],
        },()=>this.handleSearching());
    }
    handleSearching = () =>{
        if(this.state.selectedCates.length){
            if(this.cancel)
                this.cancel.cancel();
            this.cancel = axios.CancelToken.source();
            this.setState({isSearching:true});
            var tags = this.state.selectedCates.map((currentValue)=>{return currentValue.id});
            axios({
                method:"POST",
                url:"/api/post/getByTags",
                data:{
                    tags:tags,
                },
                cancelToken: this.cancel.token,
            }).then((response)=>{
                this.setState({
                    result:response.data.results,
                    isSearching:false,
                });
            }).catch((e)=>{
                if(axios.isCancel(e)){
                    //console.log("canceled");
                }else{
                    console.log(e.response.data.error);
                }
            });
        }else{
            this.setState({
                result:[],
            });
        }
    }
    handleDelete = (tagInfo:any) =>{
        this.setState({
            selectedCates: this.state.selectedCates.filter((cate)=>tagInfo.id!==cate.id),
            cates: [...this.state.cates, tagInfo],
        },()=>this.handleSearching());
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
    render() {
        const {classes} = this.props

        if(!this.state.isFetching) return (
            <Container className={classes.root}>
                {this.state.cates.length?<Paper>
                    <div className={classes.tagPaper}>
                        {this.state.cates.map((currentValue, index)=>{
                            return (
                                <li key={currentValue.id}>
                                    <Chip
                                        label={currentValue.tag}
                                        onClick={(e)=>this.handleSelect(currentValue)}
                                        className={classes.tag}
                                        color="primary"></Chip>
                                </li>
                            );
                        })}
                    </div>
                </Paper>:null}
                {this.state.selectedCates.length?<Paper>
                <div className={classes.tagPaper}>
                    {this.state.selectedCates.map((currentValue, index)=>{
                        return (
                            <li key={currentValue.id}>
                                <Chip
                                    label={currentValue.tag}
                                    onDelete={(e)=>this.handleDelete(currentValue)}
                                    className={classes.tag}
                                    color="secondary"></Chip>
                            </li>
                        );
                    })}
                </div>
                </Paper>:null}
                {this.state.result.length?(<Paper className={classes.resultPaper}>
                    {this.state.result.map((currentValue)=>{
                        return (
                        <div className={classes.rootdiv}>
                            <ListItem button onClick={event => this.clickHandler(event, currentValue.id)} className={classes.listItem}>
                            <Grow in={!this.state.isFetching} style={{ transitionDelay: '100ms' }}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        avatar={
                                            <Avatar alt={currentValue.title} src={"/api/img/post/cover/"+currentValue.id} />
                                        }
                                        title={currentValue.title}
                                        subheader={currentValue.number+" left"+" Created by "+currentValue.userid+" on "+currentValue.created_at}
                                        action={<Zoom in={!this.state.isFetching} style={{ transitionDelay: '300ms'}}><Chip color="primary" size="small" label={"$"+currentValue.price}></Chip></Zoom>}>
                                    </CardHeader>
                                    <Divider></Divider>
                                    <CardContent className={classes.cardBody}>
                                        <div className={classes.description}>
                                            {this.shortenDescription(currentValue.description)}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grow>
                            </ListItem>
                        </div>);})}
                    </Paper>):<Typography variant="body1">There is no result for your selection</Typography>}
            </Container>
        );
        else
            return <Loading></Loading>
    }
}

export default withStyles(({spacing}:Theme)=>createStyles({
    root:{
        marginBottom:"20px",
    },
    tag:{
        margin: spacing(1),
    },
    tagPaper:{
        display: 'flex',
        justifyContent:"center",
        flexWarp:"warp",
        padding: spacing(0.5),
        listStyle: 'none',
    },
    listItem:{
        width: "100%",
        padding: 0
    },
    resultPaper:{
        padding: 0,
    },
    card:{
        width: "100%",
        margin: 0
    },
    rootdiv:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: "column",
        marginBottom: spacing(2),
    },
}))(withRouter(Categories));
