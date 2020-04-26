import * as React from 'react';

import {Component} from 'react';
import Posts from './Posts';
import { Theme, withStyles, Paper } from '@material-ui/core';
import { createStyles } from '@material-ui/core';

interface HomeState{
    token?:string;
}

class HomePage extends Component<any, HomeState>{
    constructor(props:any){
        super(props);
        this.state={
            token:props.token
        };
    }

    render(){
        const {classes} = this.props;
        return (
            <Paper className={classes.paper}>
                <Posts token={this.state.token} searchKey={this.props.searchKey} />
            </Paper>
        );
    }
}
export default withStyles(({spacing}:Theme)=>createStyles({
    paper:{
        width:"100%",
        marginTop: spacing(3),
        marginBottom: spacing(10),
    }
}))(HomePage);
