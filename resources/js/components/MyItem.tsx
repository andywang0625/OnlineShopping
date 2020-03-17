import React, { Component } from 'react'
import Loading from './Loading';
import { Theme, Paper, withStyles } from '@material-ui/core';
import MyPosts from './MyPosts';

interface MyItemState{
    notFound:boolean;
}

const styles = (theme:Theme) => ({
    paper:{
        width:"100%",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(10),
    }
});

class MyItem extends Component<any, MyItemState> {
    constructor(props:any){
        super(props);
        this.state = {
            notFound:false,
        };
    }
    render() {
        const {classes} = this.props;
        if(this.state.notFound){
            // Return 404 Page
            return <Loading></Loading>
        }else{
            return (
                <Paper className={classes.paper}>
                    <MyPosts token={this.props.token} userId={this.props.userId}></MyPosts>
                </Paper>
            )
        }
    }
}
export default withStyles(styles)(MyItem);
