import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

interface MessageWindowState{
    message?:string;
    messagesList?:string[];
}

class MessageWindow extends Component<any, MessageWindowState> {
    constructor(props){
        super(props);
        //console.log(this.props.location.targetid);
        this.state = {
            message:undefined,
        }
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default withStyles({

})(withRouter(MessageWindow));
