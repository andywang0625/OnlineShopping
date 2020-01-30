import { Component } from "react";
import React from "react";
import Alert from '@material-ui/lab/Alert';
import { withStyles, Theme } from "@material-ui/core";

const styles = (theme:Theme) =>({
    error:{
        width: "100%"
    }
});

class FormErrorMessage extends Component<any>{
    render(){
        const {theMessage} = this.props;
        const {classes} = this.props;
        return(
            <div className={classes.error}><Alert severity="error">{theMessage}</Alert></div>
        );
    }
}

export default withStyles(styles)(FormErrorMessage);