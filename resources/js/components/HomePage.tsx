import * as React from 'react';

import {Component} from 'react';
import Posts from './Posts';
import { Theme, withStyles, Paper } from '@material-ui/core';

interface HomeState{
    token?:string;
}

const styles = (theme:Theme) => ({
    paper:{
        width:"100%",
        marginTop: theme.spacing(3),
    }
});

class HomePage extends Component<any, HomeState>{
    constructor(props:any){
        super(props);
        this.state={
            token:props.token
        }
    }
    render(){
        const {classes} = this.props;
        return (
            <Paper className={classes.paper}>
                <Posts token={this.state.token} />
            </Paper>
        );
    }
}
export default withStyles(styles)(HomePage);
