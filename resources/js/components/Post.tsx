import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Container, Divider } from '@material-ui/core';
import axios from "axios";
import Loading from './Loading';


interface PostState{
    id:number;
    token:string;
    isFetching:boolean;
    postBody:any;
    postTitle?:string;
    postDate?:string;
    owner?:string;
    price?:string;
    quantity?:string;
    notFound?:boolean;
}

export class Post extends Component<any, PostState> {
    constructor(props:any){
        super(props);
        console.log(this.props);
        this.state = {id:this.props.match.params.id,
            token:this.props.token,
            isFetching:true,
            postBody:undefined,
            postTitle:undefined,
            postDate:undefined,
            owner:undefined,
            price:undefined,
            quantity:undefined,
            notFound:false,
        };

    }

    componentDidMount(){
        axios.post('../api/post',{
            id: this.state.id,
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
        if(this.state.notFound) return (
            <Container>
                <h1>Item Not Found</h1>
            </Container>
        );
        if(this.state.isFetching) return (
            <Container>
                <Paper>
                    {this.state.postTitle}
                    <Divider></Divider>
                </Paper>
            </Container>
        );
        else
            return (<Loading></Loading>);
    }
}

export default Post;
