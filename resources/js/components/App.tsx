import * as React from 'react';
import {Component} from 'react';
import * as ReactDOM from 'react-dom';
import Header from './Header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import HomePage from './HomePage';
import {LocalizeProvider} from "react-localize-redux";
import Login from './Login';
import Logout from './Logout';
import Container from "@material-ui/core/Container";
import Register from './Register';
import { positions } from '@material-ui/system';
import Cookies from 'universal-cookie';
import axios from "axios";
import HomeBar from './HomeBar';
import Loading from './Loading';
import Create from './Create';

interface AppState{
    token?:string;
    user?:string;
    email?:string;
    isLoading?:boolean;
}

class App extends Component<any, AppState>{
    constructor(props:any){
        super(props);
        this.state={
            token:undefined,
            user:undefined,
            email:undefined,
            isLoading:true,
        }
    }

    componentDidMount(){
        const cookies = new Cookies();
        const token = cookies.get("token");
        if(token){
            this.state={token:token};
            axios.post("api/verify_login",{
                token: token,
            }).then(response =>{
                if(response.data){
                    let message = response.data;
                    if(message["status"]){
                        this.setState({
                            token:cookies.get("token"),
                            user:message["name"],
                            email:message["email"],
                            isLoading:false,
                        });
                    }else{
                        throw new Error("Your session has expired");
                    }
                }
            }).catch(error=>{
                return error;
            }).finally(()=>{
                this.setState({isLoading:false});
            });
        }else{
            this.setState({
                isLoading:false,
            });
        }
    }

    changeLoadingState = (isLoading:boolean=true) =>{
        this.setState({
            isLoading:isLoading
        });
    }

    render(){
        if(this.state.isLoading) return (<Loading></Loading>)
        return(
            <Container fixed>
                <Router>
                <Header user={this.state.user} email={this.state.email} />
                    <Route exact path="/">
                        <HomePage token={this.state.token} />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        {this.state.user? <Redirect to="/" /> : <Register />}
                    </Route>
                    <Route path="/logout">
                        <Logout msg={this.state.token} />
                    </Route>
                    <Route path="/create">
                        <Create token={this.state.token}></Create>
                    </Route>
                    <Route path="/" exact>
                        <HomeBar token={this.state.token}></HomeBar>
                    </Route>
                </Router>
            </Container>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
