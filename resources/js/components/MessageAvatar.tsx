import React, { Component } from 'react';
import { Avatar, withStyles, Theme, ButtonBase } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import MessageWindow from './MessageWindow';
import { Redirect, withRouter } from 'react-router-dom';

class MessageAvatar extends Component<any> {
    constructor(props){
        super(props);
    }
    handleClick = () =>{
        this.props.history.push({
            pathname: '/chat',
            targetid: this.props.userid,
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <ButtonBase
            className={classes.userAvaButtom}
            disableRipple={true}
            onClick={this.handleClick}>
            <Avatar aria-label="Start Chat" className={classes.avatar} src={"/static/img/UserAvatars/"+this.props.userid}></Avatar>
            </ButtonBase>
        );
    }
}

export default withStyles(({spacing}:Theme)=>createStyles({
    avatar:{
        backgroundColor: blue[500],
    }
}))(withRouter(MessageAvatar));
