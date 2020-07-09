import * as React from 'react';
import {Component, Suspense, lazy} from 'react';
import * as ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import {LocalizeProvider} from "react-localize-redux";
import Header from './Header';
import MessageWindow from './MessageWindow';
import Conversations from './Conversations';
import Categories from './Categories';
import HomeBar from './HomeBar';
import Loading from './Loading';
import Create from './Create';
import UploadImage from './UploadImage';
import Container from "@material-ui/core/Container";
import { positions } from '@material-ui/system';
import Cookies from 'universal-cookie';
import axios from "axios";
import UserProfile from './UserProfile';
// import HomePage from './HomePage';
// import Post from './Post';
// import EditPost from './EditPost';
// import Login from './Login';
// import Logout from './Logout';
// import Register from './Register';
// import MyItem from './MyItem';
// import VerticalLinearStepper from './CreateStepper';
// import EditPostStepper from './EditPostStepper';
// import EditImage from './EditImage';


const HomePage = lazy(()=>import('./HomePage'));
const Login = lazy(()=>import('./Login'));
const Logout = lazy(()=>import('./Logout'));
const Register = lazy(()=>import('./Register'));
const Post = lazy(()=>import('./Post'));
const MyItem = lazy(()=>import('./MyItem'));
const VerticalLinearStepper = lazy(()=>import('./CreateStepper'));
const EditPostStepper = lazy(()=>import('./EditPostStepper'));
const EditPost = lazy(()=>import('./EditPost'));

interface AppState{
    token?:string;
    user?:string;
    email?:string;
    isLoading?:boolean;
    userId?:string;
    keyWord:string;
    hideHomeBar:boolean;
}

class App extends Component<any, AppState>{
    constructor(props:any){
        super(props);
        this.state={
            token:undefined,
            user:undefined,
            email:undefined,
            isLoading:true,
            userId:undefined,
            keyWord:"",
            hideHomeBar:false,
        }
    }

    componentDidMount(){
        const cookies = new Cookies();
        const token = cookies.get("token");
        if(token){
            this.setState({
                token:token,
            });
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
                            userId:message["id"]
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

    handleKeyWord = (keyWord:string) =>{
        this.setState({
            keyWord:keyWord,
        });
    }

    changeLoadingState = (isLoading:boolean=true) =>{
        this.setState({
            isLoading:isLoading
        });
    }

    hideHomeBar = (hidden:boolean=true) =>{
        this.setState({
            hideHomeBar:hidden,
        });
    }

    render(){
        if(this.state.isLoading) return (<Loading></Loading>)
        return(
            <Container fixed>
                <Router>
                <Suspense fallback={<Loading></Loading>}>
                <Header user={this.state.user} email={this.state.email} keyWordHandler={this.handleKeyWord.bind(this)} />
                    <Route exact path="/">
                        <HomePage token={this.state.token} searchKey={this.state.keyWord} />
                    </Route>
                    <Route path="/login">
                        {this.state.user? <Redirect to="/" /> : <Login />}
                    </Route>
                    <Route path="/register">
                        {this.state.user? <Redirect to="/" /> : <Register />}
                    </Route>
                    <Route path="/logout">
                        <Logout msg={this.state.token} />
                    </Route>
                    <Route path="/create">
                        <VerticalLinearStepper token={this.state.token}></VerticalLinearStepper>
                    </Route>
                    <Route path="/">
                        <HomeBar hide={this.state.hideHomeBar} token={this.state.token}></HomeBar>
                    </Route>
                    <Route path="/post" exact>
                        <Post userid={this.state.userId}></Post>
                    </Route>
                    <Route path="/editPost">
                        {this.state.user?  <EditPostStepper token={this.state.token}></EditPostStepper>:<Redirect to="/" />}
                    </Route>
                    <Route path="/myItems">
                        {this.state.user? <MyItem token={this.state.token} userId={this.state.userId}></MyItem>:<Redirect to="/"></Redirect>}
                    </Route>
                    <Route path="/user">
                        {this.state.user? <UserProfile token={this.state.token}></UserProfile>:<Redirect to="/"></Redirect>}
                    </Route>
                    <Route path="/chat">
                        {this.state.user? <MessageWindow hideHomeBar={this.hideHomeBar} userId={this.state.userId} token={this.state.token}></MessageWindow>:<Redirect to="/login"></Redirect>}
                    </Route>
                    <Route path="/conversations">
                        {this.state.user? <Conversations userId={this.state.userId} token={this.state.token}></Conversations>:<Redirect to="/login"></Redirect>}
                    </Route>
                    <Route path="/categories">
                        <Categories></Categories>
                    </Route>
                </Suspense>
                </Router>
            </Container>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
