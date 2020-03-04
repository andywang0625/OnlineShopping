import * as React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import axios  from 'axios';
import { Toolbar, Fab, IconButton, AppBar, CssBaseline, Paper, Typography, List, ListSubheader, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, ButtonBase } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { positions } from '@material-ui/system';

const styles = (theme:Theme) =>({
    text: {
        padding: theme.spacing(2, 2, 0),
      },
      paper: {
        paddingBottom: 50,
      },
      list: {
        marginBottom: theme.spacing(2),
      },
      subheader: {
        backgroundColor: theme.palette.background.paper,
      },
      appBar: {
        top: 'auto',
        bottom: 0,
      },
      grow: {
        flexGrow: 1,
      },
      fabButton: {
        position: 'absolute' as 'absolute', //
        zIndex: 1,
        right:50,
        top:-100,
      },
      userAva:{

      }
});

interface AppBarState{
    isFetching?:boolean;
    userName?:string;
    userId?:string;
    menu?:boolean;
}

class HomeBar extends React.Component<any, AppBarState>{
    constructor(props:any){
        super(props);
        this.state={
            isFetching:true,
            userName:undefined,
            userId:undefined,
            menu:false,
        }
    }

    componentDidMount(){
        axios.post("api/verify_login",{
            token: this.props.token,
        }).then(res=>{
            if(res.data){
                if(res.data["status"]){
                    this.setState({
                        isFetching:false,
                        userId:res.data["id"],
                        userName:res.data["name"],
                    });
                }else{
                    this.setState({
                        isFetching:false,
                    })
                }
            }else{
                this.setState({
                    isFetching:false,
                });
            }
        }).catch(error=>{
            this.setState({
                isFetching:false,
            });
            console.log(error);
        })
    }
    userProfile = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string|undefined) =>{
        window.location.href = "/user/"+id;
    }

    render(){
        console.log(this.state.userId);
        const {classes} = this.props;
        if(this.state.isFetching){
            return (<div></div>);
        }
        if(this.state.userId) return (
            <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed" color="primary" className={classes.appBar}>
              <Toolbar>
              <ButtonBase
              onClick={event => this.userProfile(event , this.state.userId)}>
              <Avatar
              className={classes.userAva}
              alt={this.state.userName} src={"/static/img/UserAvatars/"+this.state.userId}></Avatar>
              </ButtonBase>
                <div className={classes.grow} />
                <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={() => {window.location.href = "/create"}}>
                <AddIcon />
                </Fab>
              </Toolbar>
            </AppBar>
          </React.Fragment>
        );
        else{
            return (<div></div>);
        }
    }
}

export default withStyles(styles)(HomeBar);