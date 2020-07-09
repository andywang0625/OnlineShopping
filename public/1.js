(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/@material-ui/icons/Delete.js":
/*!***************************************************!*\
  !*** ./node_modules/@material-ui/icons/Delete.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ "./node_modules/@material-ui/icons/utils/createSvgIcon.js"));

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
}), 'Delete');

exports.default = _default;

/***/ }),

/***/ "./node_modules/@material-ui/icons/Edit.js":
/*!*************************************************!*\
  !*** ./node_modules/@material-ui/icons/Edit.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ "./node_modules/@material-ui/icons/utils/createSvgIcon.js"));

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
}), 'Edit');

exports.default = _default;

/***/ }),

/***/ "./node_modules/@material-ui/icons/MoreVert.js":
/*!*****************************************************!*\
  !*** ./node_modules/@material-ui/icons/MoreVert.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ "./node_modules/@material-ui/icons/utils/createSvgIcon.js"));

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
}), 'MoreVert');

exports.default = _default;

/***/ }),

/***/ "./resources/js/components/MyItem.tsx":
/*!********************************************!*\
  !*** ./resources/js/components/MyItem.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loading */ "./resources/js/components/Loading.tsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _MyPosts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MyPosts */ "./resources/js/components/MyPosts.tsx");




class MyItem extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.state = {
            notFound: false,
        };
    }
    render() {
        const { classes } = this.props;
        if (this.state.notFound) {
            // Return 404 Page
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null);
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], { className: classes.paper },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MyPosts__WEBPACK_IMPORTED_MODULE_3__["default"], { token: this.props.token, userId: this.props.userId })));
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(({ spacing }) => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["createStyles"])({
    paper: {
        width: "100%",
        marginTop: spacing(3),
        marginBottom: spacing(10),
    }
}))(MyItem));


/***/ }),

/***/ "./resources/js/components/MyPostCards.tsx":
/*!*************************************************!*\
  !*** ./resources/js/components/MyPostCards.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/icons/MoreVert */ "./node_modules/@material-ui/icons/MoreVert.js");
/* harmony import */ var _material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "./node_modules/@material-ui/core/esm/MenuItem/index.js");
/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Loading */ "./resources/js/components/Loading.tsx");
/* harmony import */ var _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/Delete */ "./node_modules/@material-ui/icons/Delete.js");
/* harmony import */ var _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/colors */ "./node_modules/@material-ui/core/esm/colors/index.js");
/* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Edit */ "./node_modules/@material-ui/icons/Edit.js");
/* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/index.js");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "./node_modules/@material-ui/core/esm/DialogActions/index.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/index.js");
/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/DialogContentText */ "./node_modules/@material-ui/core/esm/DialogContentText/index.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_14__);















const MyPostCards = (props) => {
    const [anchorEl, setAnchorEl] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(undefined);
    const [msgOpen, setMsgOpen] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false);
    const clickHandler = (event, id, action) => {
        if (action == "edit") {
            window.location.href = "/editPost?id=" + id;
        }
        else if (action == "delete") {
            setMsgOpen(true);
        }
        handleClose(event);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDelete = () => {
        axios__WEBPACK_IMPORTED_MODULE_14___default.a.post("/api/post/delete", {
            id: props.listItem[props.item]["id"],
            token: props.token,
        }).then(response => {
            props.delCallback();
        }).catch(e => {
            console.log(e.response.data);
        });
        handleMsgClose();
    };
    const handleClose = (event) => {
        setAnchorEl(undefined);
    };
    const handleMsgClose = () => {
        setMsgOpen(false);
    };
    const handleMsgOpen = () => {
        setMsgOpen(true);
    };
    if (props.isFetching) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Loading__WEBPACK_IMPORTED_MODULE_4__["default"], null));
    }
    else {
        //button onClick={event => clickHandler(event, props.listItem[props.item]["id"])}
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: props.classes.rootdiv },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_9__["default"], { open: msgOpen, onClose: handleMsgOpen, "aria-labelledby": "alert-remove" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_13__["default"], { id: "alert-dialog-title" }, "Do you really want to delete?"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_11__["default"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_12__["default"], { id: "alert-dialog-description" }, "You are about to delete a post. If you really want to do that, please click Yes button.")),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_10__["default"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__["default"], { onClick: handleMsgClose, color: "primary" }, "No, I don't mean that."),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__["default"], { onClick: handleDelete, color: "primary", autoFocus: true }, "Yes."))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["ListItem"], { className: props.classes.listItem },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grow"], { in: !props.isFetching, style: { transitionDelay: '100ms' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Card"], { className: props.classes.card },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["CardHeader"], { avatar: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Avatar"], { alt: props.listItem[props.item]["title"], src: "/api/img/post/cover/" + props.listItem[props.item]["id"] }), title: props.listItem[props.item]["title"], subheader: props.listItem[props.item]["number"] + " Left" + "  Created" + " on " + props.listItem[props.item]["created_at"], action: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Zoom"], { in: !props.isFetching, style: { transitionDelay: '300ms' } },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Chip"], { color: "primary", size: "small", label: "$" + props.listItem[props.item]["price"] })),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["IconButton"], { "aria-label": "options", onClick: handleClick },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_2___default.a, null)),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Menu"], { anchorEl: anchorEl, open: Boolean(anchorEl), keepMounted: true, onClose: handleClose },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_3__["default"], { onClick: event => clickHandler(event, props.listItem[props.item]["id"], "edit") },
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_7___default.a, { color: "primary" }),
                                        "Edit"),
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_3__["default"], { onClick: event => clickHandler(event, props.listItem[props.item]["id"], "delete") },
                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_5___default.a, { style: { color: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_6__["red"][500] } }),
                                        "Delete"))) }),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Divider"], null),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["CardContent"], { className: props.classes.cardBody },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: props.classes.description }, props.listItem[props.item]["description"])))))));
    }
};
/* harmony default export */ __webpack_exports__["default"] = (MyPostCards);


/***/ }),

/***/ "./resources/js/components/MyPosts.tsx":
/*!*********************************************!*\
  !*** ./resources/js/components/MyPosts.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/colors */ "./node_modules/@material-ui/core/esm/colors/index.js");
/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Loading */ "./resources/js/components/Loading.tsx");
/* harmony import */ var _MyPostCards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MyPostCards */ "./resources/js/components/MyPostCards.tsx");







class MyPosts extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.handleClose = (event, id) => {
            console.log("id");
        };
        this.deleteItem = () => {
            axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("api/posts", {
                keyWord: undefined,
                class: undefined,
                minPrice: undefined,
                maxPrice: undefined,
                userId: this.props.userId
            }, { withCredentials: true }).then((response) => {
                this.setState({ token: this.props.token, posts: response, isFetching: false });
            });
        };
        this.createList = (classes) => {
            let list = [];
            let listItem = this.state.posts.data;
            Object.keys(this.state.posts.data).forEach((item) => {
                list.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_MyPostCards__WEBPACK_IMPORTED_MODULE_5__["default"], { token: this.state.token, delCallback: this.deleteItem, classes: classes, listItem: listItem, item: item, isFetching: this.state.isFetching }));
            });
            return list;
        };
        this.state = {
            token: undefined,
            isFetching: true,
            userId: undefined
        };
    }
    componentDidMount() {
        axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("api/posts", {
            keyWord: undefined,
            class: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            userId: this.props.userId
        }, { withCredentials: true }).then((response) => {
            this.setState({ token: this.props.token, posts: response, isFetching: false });
        });
    }
    render() {
        if (this.state.isFetching)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Loading__WEBPACK_IMPORTED_MODULE_4__["default"], null);
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["List"], { className: classes.root }, this.createList(classes)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(({ spacing, palette }) => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["createStyles"])({
    root: {
        width: '100%',
        backgroundColor: palette.background.paper,
    },
    rootdiv: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: "column",
        marginBottom: spacing(2),
    },
    card: {
        width: "100%",
        margin: 0
    },
    inline: {
        display: 'inline',
    },
    listItem: {
        width: "95%",
        padding: 0
    },
    description: {
        width: "100%",
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        webkitLineClamp: 2,
        webkitBoxOrient: 'vertical',
    },
    avatar: {
        top: 0,
    },
    cardBody: {
        backgroundColor: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_3__["grey"][100],
    }
}))(MyPosts));


/***/ })

}]);