import * as React from 'react';
import {Component} from 'react';
import * as ReactDOM from 'react-dom';
import Header from './Header';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import HomePage from './HomePage';
import {LocalizeProvider} from "react-localize-redux";
import LoginPage from './LoginPage';
import Container from "@material-ui/core/Container";
import Register from './Register';
import { positions } from '@material-ui/system';

class App extends Component{
    render(){
        return(
            <Container fixed>
                <LocalizeProvider>
                    <BrowserRouter>
                        <Header />
                        <Route exact path="/" component={HomePage}></Route>
                        <Route path="/login" component={LoginPage}></Route>
                        <Route path="/register" component={Register}></Route>
                    </BrowserRouter>
                </LocalizeProvider>
            </Container>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
