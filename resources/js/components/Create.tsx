import * as React from 'react';
import { Container, Theme, withStyles, TextField, Grid, Divider, Button, InputAdornment } from '@material-ui/core';
import { number } from 'prop-types';

interface CreateState{
    Quantity:Number;
    Price:Number;
    Title:string;
    Description:string;
    amount?:string;
}

const styles = (theme:Theme)=>({
    root:{
        flexGrow: 1,
    },
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
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (type:string) => (e: React.ChangeEvent<HTMLInputElement>) =>{
        const itemName = e.target.name;
        const itemValue = e.target.value;
        if(type=="amout"){
            if(Math.ceil(parseInt((itemValue).toString().replace(".","")))<0){
                this.setState({amount:"0"});
            }else{
                this.setState({amount:((Math.ceil(parseInt(itemValue))).toString().replace(".",""))});
            }
            this.setState({
                Price:  Math.ceil(parseInt(itemValue))
            })
        }
    }

    handleSubmit = (e:any) =>{
        e.preventDefault();
    }

    componentDidMount(){
    }

    render(){
        const {classes} = this.props;
        return (
            <Container className={classes.root}>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <TextField variant="outlined" id="title" label="Title" className={[classes.titleBar,classes.inputfield].join(" ")} color="secondary" required></TextField>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField id="quantity" label="Quantity" type="number" value={this.state.amount} onChange={this.handleChange("amout")} className={classes.inputfield} required></TextField>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField id="price"label="Price" className={classes.inputfield} onChange={this.handleChange("price")} type="number"
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
            </Container>
        );
    }

}
export default withStyles(styles)(Create);
