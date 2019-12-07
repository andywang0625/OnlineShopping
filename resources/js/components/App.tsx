import * as React from 'react';
import {Component} from 'react';
import * as ReactDOM from 'react-dom';
import Header from './Header';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import HomePage from './HomePage';
import {LocalizeProvider} from "react-localize-redux";
import LoginPage from './LoginPage';

class App extends Component{
    render(){
        return(
            <div>
                <LocalizeProvider>
                    <BrowserRouter>
                        <Header />
                        <Route exact path="/" component={HomePage}>
                        </Route>
                        <Route path="/login" component={LoginPage}>
                        </Route>
                    </BrowserRouter>
                </LocalizeProvider>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
