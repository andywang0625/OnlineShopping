import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, Zoom, useTheme } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';

export default function MessageBox(props:any){
    let messageTitle = props.messageTitle;
    let messageType = props.messageType;
    let messageText = props.messageText;
    let closeCallback = props.callback;
    const [dialog, setDialog] = useState(true);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClose = () =>{
        closeCallback();
        setDialog(false);
    }

    const handleType = (type:string) =>{
        if(type==="e"){
            return <Typography component={'span'} variant="h6" gutterBottom>Oops, an error occurred!</Typography>;
        }else if(type==="i"){
            return <Typography component={'span'} variant="h6" gutterBottom>Attention!</Typography>;
        }else if(type==="s"){
            return <Typography component={'span'} variant="h6" gutterBottom>Succeed!</Typography>
        }else if(type==="w"){
            return <Typography component={'span'} variant="h6" gutterBottom>Look out!</Typography>
        }else{
            return <Typography component={'span'} variant="h6" gutterBottom>Pow!</Typography>
        }
    }

    return (
        <div>
        <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
        aria-labelledby="dtitle"
        TransitionComponent={Zoom}
        >
        <DialogTitle id="dtitle">{messageTitle}</DialogTitle>
        <DialogContent>
            <DialogContentText>
            {handleType(messageType)}
            <br></br>
            {messageText}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
                Got it
            </Button>
        </DialogActions>
        </Dialog>
        </div>
    );
}
