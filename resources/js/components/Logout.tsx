import { Component, HtmlHTMLAttributes } from "react";
import * as React from 'react';
import Cookies from 'universal-cookie';
import axios from "axios";
import {withRouter} from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core';


class Logout extends Component<any>{
    constructor(props:any){
        super(props);
    }
    componentDidMount(){
        const { msg } = this.props;
        console.log(this.props);
        if(msg){
            const cookies = new Cookies();
            console.log(cookies.get('token'));
            cookies.remove('token', {path: '/'});
            window.location.href = "/";
        }else{
            window.location.href = "/login";
        }
    }
    render(){
        return(
            <div></div>
        );
    }
}
export default Logout;
