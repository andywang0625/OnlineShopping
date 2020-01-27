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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
var Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var InputBase_1 = __importDefault(require("@material-ui/core/InputBase"));
var styles_1 = require("@material-ui/core/styles");
var Menu_1 = __importDefault(require("@material-ui/icons/Menu"));
var Search_1 = __importDefault(require("@material-ui/icons/Search"));
var Drawer_1 = __importDefault(require("@material-ui/core/Drawer"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
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
        if (index == 2) {
            window.location.href = "login";
        }
        else if (index == 0) {
            window.location.href = "/";
        }
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
    var sideList = function () { return (React.createElement("div", { className: classes.list, onClick: toggleDrawer(false), onKeyDown: toggleDrawer(false) },
        React.createElement(List_1.default, null, ['Home Page', 'Register', 'Login to Your Account', 'Contact Us'].map(function (text, index) { return (React.createElement(ListItem_1.default, { button: true, key: text, onClick: handleClick(index) },
            React.createElement(ListItemText_1.default, { primary: text }))); })),
        React.createElement(Divider_1.default, null),
        React.createElement(List_1.default, null, ['All Categories', 'Daily', 'Tech', 'Babies'].map(function (text, index) { return (React.createElement(ListItem_1.default, { button: true, key: text },
            React.createElement(ListItemText_1.default, { primary: text }))); })))); };
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
    return (React.createElement("div", { className: classes.root },
        React.createElement(AppBar_1.default, { position: "static" },
            React.createElement(Toolbar_1.default, null,
                React.createElement(IconButton_1.default, { onClick: toggleDrawer(true), edge: "start", className: classes.menuButton, color: "inherit", "aria-label": "open drawer" },
                    React.createElement(Menu_1.default, null)),
                React.createElement(Drawer_1.default, { open: state.drawer, onClose: toggleDrawer(false) }, sideList()),
                React.createElement(Typography_1.default, { className: classes.title, variant: "h6", noWrap: true }, "BuyTown Online"),
                React.createElement("div", { className: classes.search },
                    React.createElement("div", { className: classes.searchIcon },
                        React.createElement(Search_1.default, null)),
                    React.createElement(InputBase_1.default, { placeholder: "Search\u2026", classes: {
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }, inputProps: { 'aria-label': 'search' } }))))));
}
exports.default = Header;
