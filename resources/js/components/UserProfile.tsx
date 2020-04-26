import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, withStyles, Theme, InputAdornment, TextField, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import FormErrorMessage from './FormErrorMessage';
import MessageBox from './MessageBox';

interface UserProfileState{
    userName?:string;
    userPassword?:string;
    passwordRepeat?:string;
    userEmail?:string;
    errorMessage?:string;
    messageDia?:boolean;
    messageTitle?:string;
    messageType?:string;
    messageText?:string;
    passwordv?:string;
}


class UserProfile extends Component<any, UserProfileState> {
    constructor(props:any){
        super(props);
        this.state = {
            userName:undefined,
            userPassword:undefined,
            passwordRepeat:undefined,
            userEmail:undefined,
            errorMessage:undefined,
            messageDia:false,
            passwordv:undefined,
            messageText:undefined,
            messageTitle:undefined,
            messageType:undefined,
        };
    }
    componentDidMount(){
        axios.post("api/verify_login", {
            token: this.props.token,
        }).then((response)=>{
            this.setState({
                userEmail:response.data.email,
                userName:response.data.name,
            });
        });
    }
    handleSave = () =>{
        if(this.state.passwordv==undefined){
            axios.post("api/user/edit",{
                name: this.state.userName,
                email: this.state.userEmail,
                password: this.state.userPassword,
                token: this.props.token,
            }).then((response)=>{
                if(!response.data["error"]){
                    this.setState({
                        messageDia:true,
                        messageText: "Your Profile has been Saved!",
                        messageTitle:"Succeeded",
                        messageType:"s",
                    })
                }
            }).catch((error)=>{
                this.setState({
                    messageDia:true,
                    messageText:error.response.data.error,
                    messageTitle:"Error on Saving",
                    messageType:"e",
                });
            })
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({
            [e.target.name]: e.target.value
        }, ()=>{
            if(this.state.userPassword!=this.state.passwordRepeat){
                this.setState({passwordv:"Passwords do not match"});
            }else{
                this.setState({passwordv:undefined});
            }
        });
    }
    handleClose = (e:any) =>{
        this.setState({
            messageDia:false,
            messageText:undefined,
            messageTitle:undefined,
            messageType:undefined,
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Container maxWidth="md">
                <Paper className={classes.paper}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        {this.state.messageDia?<MessageBox
                            messageTitle={this.state.messageTitle}
                            messageType={this.state.messageType}
                            messageText={this.state.messageText}
                            callback={this.handleClose}></MessageBox>:null}
                        <TextField
                            id="userName"
                            name="userName"
                            className={classes.textField}
                            label="User Name"
                            onChange={this.handleChange}
                            value={this.state.userName}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle></AccountCircle>
                                    </InputAdornment>
                                )
                            }}
                            required></TextField>
                        <TextField
                            id="userEmail"
                            name="userEmail"
                            className={classes.textField}
                            label="Email"
                            onChange={this.handleChange}
                            value={this.state.userEmail}
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <EmailRoundedIcon></EmailRoundedIcon>
                                    </InputAdornment>
                                )
                            }}
                            ></TextField>
                        <TextField
                            id="userPassword"
                            name="userPassword"
                            className={classes.textField}
                            label="Password"
                            placeholder="Unchanged"
                            onChange={this.handleChange}
                            value={this.state.userPassword}
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <LockRoundedIcon></LockRoundedIcon>
                                    </InputAdornment>
                                )
                            }}
                            ></TextField>
                        <TextField
                            id="passwordRepeat"
                            name="passwordRepeat"
                            className={classes.textField}
                            label="Repeat Password"
                            value={this.state.passwordRepeat}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <LockRoundedIcon></LockRoundedIcon>
                                    </InputAdornment>
                                )
                            }}
                            ></TextField>
                        {this.state.passwordv !== undefined ?(
                            <FormErrorMessage theMessage={this.state.passwordv}></FormErrorMessage>
                        ):null}
                        <Button className={classes.button} onClick={this.handleSave} variant="contained" color="primary">Save</Button>
                    </Grid>
                </Paper>
            </Container>
        );
    }
}

export default withStyles({
    paper:{
        width:"100%",
        marginTop: "10%",
        paddingTop: "20px",
    },
    textField:{
        marginBottom:"20px",
    },
    button:{
        marginBottom:"20px",
        width:"220px",
    },
    error:{
        width:"220px",
    }
})(UserProfile);
