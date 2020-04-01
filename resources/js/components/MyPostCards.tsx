import React from 'react';
import { ListItem, Grow, Card, CardHeader, Avatar, Zoom, Chip, IconButton, Divider, CardContent, Menu, MenuList, Popper } from '@material-ui/core';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from '@material-ui/core/MenuItem';
import Loading from './Loading';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";


const MyPostCards = (props:any) => {
    const [anchorEl, setAnchorEl] = React.useState<undefined | HTMLElement>(undefined);
    const [msgOpen, setMsgOpen] = React.useState(false);

    const clickHandler = (event:React.MouseEvent<HTMLLIElement, MouseEvent>,id:string, action:string) => {
        if(action=="edit"){
            window.location.href = "/editPost?id="+id;
        }else if(action=="delete"){
            setMsgOpen(true);
        }
        handleClose(event);
    }

    const handleClick = (event:React.MouseEvent<HTMLElement>)=>{
        setAnchorEl(event.currentTarget);
    }


    const handleDelete = () =>{
        axios.post("/api/post/delete",{
            id:props.listItem[props.item]["id"],
            token:props.token,
        }).then(response=>{
            props.delCallback();
        }).catch(e=>{
            console.log(e.response.data);
        });
        handleMsgClose();
    }

    const handleClose = (event:any) =>{
        setAnchorEl(undefined);
    }

    const handleMsgClose = ()=>{
        setMsgOpen(false);
    }
    const handleMsgOpen = ()=>{
        setMsgOpen(true);
    }

    if(props.isFetching){
        return (<Loading></Loading>);
    }else{
        //button onClick={event => clickHandler(event, props.listItem[props.item]["id"])}
        return (
            <div className={props.classes.rootdiv}>
            <Dialog
                open={msgOpen}
                onClose={handleMsgOpen}
                aria-labelledby="alert-remove"
            >
            <DialogTitle id="alert-dialog-title">{"Do you really want to delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to delete a post. If you really want to do that, please click Yes button.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleMsgClose} color="primary">
                    No, I don't mean that.
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    Yes.
                </Button>
                </DialogActions>
            </Dialog>
            <ListItem className={props.classes.listItem}>
            <Grow in={!props.isFetching} style={{ transitionDelay: '100ms' }}>
                <Card className={props.classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar alt={props.listItem[props.item]["title"]} src={"/api/img/post/cover/"+props.listItem[props.item]["id"]} />
                        }
                        title={props.listItem[props.item]["title"]}
                        subheader={props.listItem[props.item]["number"]+" Left"+"  Created"+" on "+props.listItem[props.item]["created_at"]}
                        action={
                            <div>
                            <Zoom in={!props.isFetching} style={{ transitionDelay: '300ms'}}><Chip color="primary" size="small" label={"$"+props.listItem[props.item]["price"]}></Chip></Zoom>
                            <IconButton aria-label="options" onClick={handleClick}>
                            <MoreVertIcon />
                            </IconButton>
                            <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            keepMounted
                            onClose={handleClose}>
                            <MenuItem onClick={event => clickHandler(event, props.listItem[props.item]["id"], "edit")}>
                                <EditIcon color="primary" />
                                Edit</MenuItem>
                            <MenuItem onClick={event => clickHandler(event, props.listItem[props.item]["id"], "delete")}>
                                <DeleteIcon style={{color:red[500]}} />
                                Delete</MenuItem>
                            </Menu>
                            </div>
                    }>
                    </CardHeader>
                    <Divider></Divider>
                    <CardContent className={props.classes.cardBody}>
                        <div className={props.classes.description}>
                            {props.listItem[props.item]["description"]}
                        </div>
                    </CardContent>
                </Card>
            </Grow>
            </ListItem>
        </div>
        );
    }
}

export default MyPostCards;
