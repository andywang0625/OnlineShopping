"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var AppBar_1 = require("@material-ui/core/AppBar");
var Toolbar_1 = require("@material-ui/core/Toolbar");
var IconButton_1 = require("@material-ui/core/IconButton");
var Typography_1 = require("@material-ui/core/Typography");
var InputBase_1 = require("@material-ui/core/InputBase");
var styles_1 = require("@material-ui/core/styles");
var Menu_1 = require("@material-ui/icons/Menu");
var Search_1 = require("@material-ui/icons/Search");
var Drawer_1 = require("@material-ui/core/Drawer");
var Divider_1 = require("@material-ui/core/Divider");
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var useStyles = styles_1.makeStyles(function (theme) {
    var _a, _b, _c;
    return styles_1.createStyles({
        list: {
            width: 250,
        },
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        menuItems: {
            width: '100%',
        },
        title: (_a = {
                flexGrow: 1,
                display: 'none'
            },
            _a[theme.breakpoints.up('sm')] = {
                display: 'block',
            },
            _a.width = '100%',
            _a),
        search: (_b = {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: styles_1.fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: styles_1.fade(theme.palette.common.white, 0.25),
                },
                marginLeft: 0,
                width: '100%'
            },
            _b[theme.breakpoints.up('sm')] = {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
            _b),
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
        inputInput: (_c = {
                padding: theme.spacing(1, 1, 1, 7),
                transition: theme.transitions.create('width'),
                width: '100%'
            },
            _c[theme.breakpoints.up('sm')] = {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
            _c),
    });
});
function Header() {
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
    var handleClick = function (index) { return function (event) {
        console.log(index);
        // if(index==2){
        //     window.location.href = "login";
        // }
        //return <Redirect to="/login" />;
        //return;
    }; };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var isMenuOpen = Boolean(anchorEl);
    var classes = useStyles("");
    var _b = React.useState({
        drawer: false,
    }), state = _b[0], setState = _b[1];
    var toggleDrawer = function (open) { return function (event) {
        var _a;
        if (event.type === 'keydown' && (event.key === 'Tab') || event.key === 'Shift')
            return;
        setState(__assign(__assign({}, state), (_a = {}, _a["drawer"] = open, _a)));
    }; };
    var sideList = function () { return (<div className={classes.list} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List_1.default>
                {['Home Page', 'Register', 'Login to Your Account', 'Contact Us'].map(function (text, index) { return (<ListItem_1.default button key={text} onClick={handleClick(index)}>
                            <ListItemText_1.default primary={text}/>
                        </ListItem_1.default>); })}
            </List_1.default>
            <Divider_1.default />
            <List_1.default>
                {['All Categories', 'Daily', 'Tech', 'Babies'].map(function (text, index) { return (<ListItem_1.default button key={text}>
                        <ListItemText_1.default primary={text}/>
                    </ListItem_1.default>); })}
            </List_1.default>
        </div>); };
    // const renderMenu = (
    //     <Menu
    //         id="simple-menu"
    //         anchorEl={anchorEl}
    //         keepMounted
    //         open={isMenuOpen}
    //         onClose={handleClose}
    //     >
    //         <MenuItem component={Link} to="/" className={classes.menuItems} onClick={handleClose}>Home</MenuItem>
    //         <MenuItem component={Link} to="/" className={classes.menuItems} onClick={handleClose}>Register</MenuItem>
    //         <MenuItem component={Link} to="/login" className={classes.menuItems} onClick={handleClose}>Login</MenuItem>
    //     </Menu>
    // );
    return (<div className={classes.root}>
            <AppBar_1.default position="static">
                <Toolbar_1.default>
                    <IconButton_1.default onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
                        <Menu_1.default />
                    </IconButton_1.default>
                    <Drawer_1.default open={state.drawer} onClose={toggleDrawer(false)}>
                        {sideList()}
                    </Drawer_1.default>
                    <Typography_1.default className={classes.title} variant="h6" noWrap>
                        BuyTown Online
                    </Typography_1.default>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search_1.default />
                        </div>
                        <InputBase_1.default placeholder="Search…" classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
    }} inputProps={{ 'aria-label': 'search' }}/>
                    </div>
                </Toolbar_1.default>
            </AppBar_1.default>
        </div>);
}
exports.default = Header;
