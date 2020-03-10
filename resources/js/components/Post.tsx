import React, { Component } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Paper, Container, Divider } from '@material-ui/core';
import axios from "axios";
import Loading from './Loading';
import queryString from 'query-string'


interface PostState{
    id?:string|string[];
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
}

export class Post extends Component<any, PostState> {
    constructor(props:any){
        super(props);
        this.state = {
            id:undefined,
            token:this.props.token,
            isFetching:true,
            postBody:undefined,
            postTitle:undefined,
            postDate:undefined,
            owner:undefined,
            price:undefined,
            quantity:undefined,
            notFound:false,
            query:undefined
        };
    }
    componentDidMount(){
        const values = queryString.parse(this.props.location.search);
        if(values.id!=null){
            this.setState({id:values.id});
        }
        else
            this.setState({notFound:true});
        axios.post('/api/post',{
            id:this.state.id,
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
        })
    }

    render() {
        console.log(this.state.isFetching);
        if(this.state.notFound) return (
            <Container>
                <h1>Item Not Found</h1>
            </Container>
        );
        // if(this.state.isFetching)
        //     return (<Loading></Loading>);
        return (
            <Container>
                <Paper>
                    <Divider></Divider>
                </Paper>
            </Container>
        );
    }
}

export default Post;
