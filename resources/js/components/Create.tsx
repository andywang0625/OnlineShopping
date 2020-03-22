import * as React from 'react';
import { Container, Theme, withStyles, TextField, Grid, Divider, Button, InputAdornment, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Collapse } from '@material-ui/core';
import { number, string } from 'prop-types';
import axios from "axios";

interface CreateState{
    Quantity:Number;
    Price:Number;
    Title:string;
    Description:string;
    amount?:string;
    priceBox?:string;
    dialogMessage?: string;
    dialogReason?: string;
    logdia?: any;
    success?: boolean;
}

const styles = (theme:Theme)=>({

    titleBar:{

    },
    inputfield:{
        width:"100%",
    },
    submitbtn:{

    }
});

class Create extends React.Component<any, CreateState>{
    constructor(props:any){
        super(props);
        this.state = {
            Quantity:0,
            Price:0,
            Title:"",
            Description:"",
            amount:"0",
            priceBox:"0",
            logdia:false,
            dialogMessage:"",
            dialogReason:"",
            success:false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (type?:string) => (e: React.ChangeEvent<HTMLInputElement>) =>{
        const itemName = e.target.name;
        const itemValue = e.target.value;
        if(type=="amount"){
            if(Math.ceil(parseInt((itemValue).toString().replace(".","")))<0){
                this.setState({amount:"0", Quantity:  Math.ceil(parseInt(itemValue))});
            }else{
                this.setState({amount:((Math.ceil(parseInt(itemValue))).toString().replace(".","")),
                                Quantity: Math.ceil(parseInt(itemValue))});
            }
            this.setState({
                Quantity:  Math.ceil(parseInt(itemValue))
            });
        }else if(type=="number"){
            if(parseInt(itemValue)<0){
                this.setState({priceBox:"0", Price:0});
            }else{
                this.setState({priceBox:itemValue, Price:parseFloat(itemValue)});
            }
            this.setState({
                Price:  Math.ceil(parseInt(itemValue))
            });
        }else if(type=="description"){
            this.setState({Description:itemValue});
        }else if(type=="title"){
            this.setState({Title:itemValue});
        }
    }

    handleClose = (e: any) =>{
        this.setState({logdia:false});
        //console.log("closed!");
        this.setState({dialogReason:undefined});
        // if(this.state.success){
        //     return window.location.href = "/";
        // }
    }

    handleSubmit = (e:any) =>{
        e.preventDefault();
        //console.log(this.state);
        axios.post("api/create", {
            token: this.props.token,
            title: this.state.Title,
            quantity: this.state.Quantity,
            price: this.state.Price,
            description: this.state.Description,
        }).then(response =>{
            this.props.postback(response.data.toString());
        }).catch(error =>{
            this.setState({logdia:true});
            this.setState({dialogMessage:"Oops, an error occurred!"});
            this.setState({dialogReason: error.response.data.toString()});
        });
    }

    componentDidMount(){
    }

    render(){
        const {classes} = this.props;
        return (
            <div>
                <Dialog
                open={this.state.logdia}
                onClose={this.handleClose}
                aria-labelledby="dtitle"
                >
                <DialogTitle id="dtitle">Create Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    {this.state.dialogMessage}
                    <br></br>
                    {this.state.dialogReason}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleClose} color="primary">
                        Got it
                    </Button>
                </DialogActions>
                </Dialog>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <TextField variant="outlined" value={this.state.Title} onChange={this.handleChange("title")} id="title" label="Title" className={[classes.titleBar,classes.inputfield].join(" ")} color="secondary" required></TextField>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField id="quantity" label="Quantity" type="number" value={this.state.amount} onChange={this.handleChange("amount")} className={classes.inputfield} required></TextField>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField id="price"label="Price" value={this.state.priceBox} className={classes.inputfield} onChange={this.handleChange("number")} type="number"
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                )
                            }} required></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider></Divider>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            id="description"
                            label="Description"
                            placeholder="Give a brief description for your product!"
                            multiline
                            variant="outlined"
                            className={classes.inputfield}
                            value={this.state.Description}
                            onChange={this.handleChange("description")}
                            rows="20"
                            rowsMax="100" required/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justify="flex-end">
                                <Grid item xs={12} md={1}>
                                    <Button className={[classes.submitbtn, classes.inputfield].join(" ")} type="submit" variant="contained" color="primary">Post</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                </div>
        );
    }

}
export default withStyles(styles)(Create);
