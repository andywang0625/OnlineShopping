import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

interface MessageWindowState{
    message?:string;
    messagesList?:string[];
}

class MessageWindow extends Component<any, MessageWindowState> {
    constructor(props){
        super(props);
        console.log(this.props.targetid);
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

})(MessageWindow);
