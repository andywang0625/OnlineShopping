import * as React from 'react';

import {Component} from 'react';
import Posts from './Posts';

interface HomeState{
    token?:string;
}

class HomePage extends Component<any, HomeState>{
    constructor(props:any){
        super(props);
        this.state={
            token:props.token
        }
    }
    render(){
        return (
            <div>
                <div>HomePage</div>
                <Posts token={this.state.token} />
            </div>
        );
    }
}
export default HomePage;
