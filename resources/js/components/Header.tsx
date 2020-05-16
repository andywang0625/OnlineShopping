import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import retryTimes = jest.retryTimes;
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list:{
            width: 250,
        },
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        menuItems:{
          width: '100%',
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            width:'100%',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
        },
    }),
);

export default function Header(props:any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [searchText, setSearchText] = React.useState("");

    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
    let sideList;
    const keyWordHandler = props.keyWordHandler;
    const searchBoxHandler = (e:any) =>{
        setSearchText(e.target.value);
        keyWordHandler(e.target.value);
    }
    if(props.user&&props.email){
        sideList = () =>(
            <div
            className={classes.list}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
                <List>
                    <ListItem>
                        <ListItemText>
                        Welcome, {props.user}
                        </ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {
                        ['Home Page','My Items', 'Conversations', 'Logout', 'Contact Us'].map((text, index)=>(
                            <ListItem button key={text} onClick={handleClickLogin(index)}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={()=>window.location.href="categories"}>
                        <ListItemText primary="All Categories" />
                    </ListItem>
                </List>
            </div>
        );
    }else{
        sideList = () =>(
            <div
            className={classes.list}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
                <List>
                    {
                        ['Home Page','Register', 'Login to Your Account', 'Contact Us'].map((text, index)=>(
                            <ListItem button key={text} onClick={handleClick(index)}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={()=>window.location.href="categories"}>
                        <ListItemText primary="All Categories" />
                    </ListItem>
                </List>
            </div>
        );
    }


    const handleClickLogin = (index:number)=> (event: React.MouseEvent<HTMLElement>) => {
        if(index==3){
            window.location.href = "logout";
        }else if(index==0){
            window.location.href = "/";
        }else if(index==1){
            window.location.href = "myItems";
        }else if(index==4){
            window.location.href = "support";
        }else if(index==2){
            window.location.href = "conversations";
        }
    };

    const handleClick = (index:number)=> (event: React.MouseEvent<HTMLElement>) => {
        if(index==2){
            window.location.href = "login";
        }else if(index==0){
            window.location.href = "/";
        }else if(index==1){
            window.location.href = "register";
        }else if(index==3){
            window.location.href = "support"
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const isMenuOpen = Boolean(anchorEl);
    const classes = useStyles("");
    const [state, setState] = React.useState({
       drawer: false,
    });


    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) =>{
        if(event.type === 'keydown'&&((event as React.KeyboardEvent).key==='Tab')||(event as React.KeyboardEvent).key==='Shift')
            return;
        setState({...state, ["drawer"]: open});
    }
    return (
        <React.Fragment>
        <AppBar>
            <Toolbar>
                <IconButton
                    onClick={toggleDrawer(true)}
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <Drawer open={state.drawer} onClose={toggleDrawer(false)}>
                    {sideList()}
                </Drawer>
                <Typography className={classes.title} variant="h6" noWrap>
                    BuyTown Online
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        value={searchText}
                        onChange={searchBoxHandler}
                        placeholder="Search..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </Toolbar>
        </AppBar>
        <Toolbar />
        </React.Fragment>
    );
}
