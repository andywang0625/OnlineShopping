import { Component, HtmlHTMLAttributes } from "react";
import React from "react";
import { TextField, Container, Grid, createStyles, makeStyles, Theme, withStyles, InputAdornment, Button } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import FormErrorMessage from './FormErrorMessage';
import axios from "axios";

interface RegState{
    userName?: string;
    userPasswd1?: string;
    userPasswd2?: string;
    userEmail?: string;
    errorMessage?: string;
}

const styles = (theme:Theme) => ({
    margin:{
        margin: theme.spacing(1),
        width: "100%",
    }
});

class Register extends Component<any, RegState>{
    constructor(props:any){
        super(props);
        this.state = {
            userName:"",
            userPasswd1:"",
            userPasswd2:"",
            userEmail:"",
            errorMessage:undefined,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const itemName = e.target.name;
        const itemValue = e.target.value;
        this.setState({[itemName]: itemValue}, ()=>{
            if(this.state.userPasswd1!==this.state.userPasswd2){
                this.setState({errorMessage: "Passwords do not match"});
            }else{
                this.setState({errorMessage: undefined});
            }
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(this.state.userPasswd1==this.state.userPasswd2){
            const {userEmail, userName, userPasswd1} = this.state;
            console.log("form submitted");
        }else{
            console.log("Error");
        }

    }

    render(){
        const {classes} = this.props;
        return(
            <Container maxWidth="md">
                <Grid container style={{marginTop: 20, alignItems:"center", display:"flex"}}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            className={classes.margin}
                            id="userNameText"
                            name="userName"
                            label="User Name"
                            placeholder="User Name"
                            onChange={this.handleChange}
                            value={this.state.userName}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle></AccountCircle>
                                    </InputAdornment>
                                ),
                            }}
                            required></TextField>
                        <TextField
                            className={classes.margin}
                            id="userEmail"
                            placeholder="Email"
                            name="userEmail"
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
                            required></TextField>
                        <TextField
                            className={classes.margin}
                            id="userPasswd1"
                            name="userPasswd1"
                            placeholder="Password"
                            label="Password"
                            value={this.state.userPasswd1}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position="start">
                                    <LockRoundedIcon></LockRoundedIcon>
                                    </InputAdornment>
                                )
                            }}
                            required></TextField>
                            <TextField
                            className={classes.margin}
                            id="userPasswd2"
                            name="userPasswd2"
                            placeholder="Password Verification"
                            label="Password Verification"
                            value={this.state.userPasswd2}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <LockRoundedIcon></LockRoundedIcon>
                                    </InputAdornment>
                                )
                            }}
                            required></TextField>
                        {this.state.errorMessage !== undefined ?(
                            <FormErrorMessage theMessage={this.state.errorMessage}></FormErrorMessage>
                        ):null}
                        <Button className={classes.margin} type="submit" variant="contained" color="primary">Register</Button>
                    </form>


                </Grid>
            </Container>
        );
    }
}
export default withStyles(styles)(Register);