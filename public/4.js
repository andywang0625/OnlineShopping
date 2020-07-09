(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/@material-ui/icons/VerticalAlignTop.js":
/*!*************************************************************!*\
  !*** ./node_modules/@material-ui/icons/VerticalAlignTop.js ***!
  \*************************************************************/
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
  d: "M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"
}), 'VerticalAlignTop');

exports.default = _default;

/***/ }),

/***/ "./resources/js/components/HomePage.tsx":
/*!**********************************************!*\
  !*** ./resources/js/components/HomePage.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Posts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Posts */ "./resources/js/components/Posts.tsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");





class HomePage extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.state = {
            token: props.token
        };
    }
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], { className: classes.paper },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Posts__WEBPACK_IMPORTED_MODULE_1__["default"], { token: this.state.token, searchKey: this.props.searchKey })));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(({ spacing }) => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["createStyles"])({
    paper: {
        width: "100%",
        marginTop: spacing(3),
        marginBottom: spacing(10),
    }
}))(HomePage));


/***/ }),

/***/ "./resources/js/components/Posts.tsx":
/*!*******************************************!*\
  !*** ./resources/js/components/Posts.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/colors */ "./node_modules/@material-ui/core/esm/colors/index.js");
/* harmony import */ var _material_ui_icons_VerticalAlignTop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/VerticalAlignTop */ "./node_modules/@material-ui/icons/VerticalAlignTop.js");
/* harmony import */ var _material_ui_icons_VerticalAlignTop__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_VerticalAlignTop__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Loading */ "./resources/js/components/Loading.tsx");








class Posts extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.pageTop = react__WEBPACK_IMPORTED_MODULE_0__["createRef"]();
        this.clickHandler = (event, id) => {
            window.location.href = "/post?id=" + id;
        };
        this.shortenDescription = (description) => {
            if (description.length > 120) {
                return description.substr(0, description.lastIndexOf(' ', 120)) + "...";
            }
            else {
                return description;
            }
        };
        this.handleLoading = () => {
            this.setState({
                isLoadingMore: true,
            });
            axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("api/posts", {
                keyWord: this.props.searchKey,
                class: undefined,
                minPrice: undefined,
                maxPrice: undefined,
                page: this.state.page,
            }).then((response) => {
                if (response.data.length)
                    this.setState({ token: this.props.token, posts: this.state.posts.concat(response.data), isLoadingMore: false });
                else {
                    this.setState({ noMore: true, isLoadingMore: false });
                }
            });
        };
        this.handleScrollToTop = () => {
            this.pageTop.current.scrollIntoView({ behavior: "smooth" });
        };
        this.createList = (classes) => {
            let list = [];
            let listItem = this.state.posts;
            if (listItem.length != 0) {
                listItem.map((item, index) => {
                    list.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: classes.rootdiv },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["ListItem"], { ref: listItem.length === index + 1 ? this.lastItem : null, button: true, onClick: event => this.clickHandler(event, item["id"]), className: classes.listItem },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Fade"], { in: !this.state.isFetching, style: { transitionDelay: '100ms' } },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Card"], { className: classes.card },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CardHeader"], { avatar: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Avatar"], { alt: item["title"], src: item.image ? "/api/img/post/cover/" + item["id"] : null }), title: item["title"], subheader: item["number"] + " left" + " Created by " + item["userid"] + " on " + item["created_at"], action: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Zoom"], { in: !this.state.isFetching, style: { transitionDelay: '300ms' } },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Chip"], { color: "primary", size: "small", label: "$" + item["price"] })) }),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Divider"], null),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CardContent"], { className: classes.cardBody },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: classes.description }, this.shortenDescription(item["description"]))))))));
                });
            }
            else {
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { align: "center" }, "No related items found! :(");
            }
            return list;
        };
        this.state = {
            token: undefined,
            isFetching: true,
            searchKey: this.props.searchKey,
            page: 0,
            noMore: false,
            isLoadingMore: false,
        };
        this.observer = react__WEBPACK_IMPORTED_MODULE_0__["createRef"]();
        this.lastItem = (item) => {
            if (this.state.isFetching)
                return;
            if (this.observer.current)
                this.observer.current.disconnect();
            this.observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    this.setState({ page: this.state.page + 1 }, () => this.handleLoading());
                }
            });
            if (item)
                this.observer.current.observe(item);
        };
        this.cancel = "";
    }
    componentDidUpdate(prevProps) {
        if (prevProps.searchKey !== this.props.searchKey) {
            if (this.cancel) {
                this.cancel.cancel();
            }
            this.cancel = axios__WEBPACK_IMPORTED_MODULE_1___default.a.CancelToken.source();
            axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("api/posts", {
                keyWord: this.props.searchKey,
                class: undefined,
                minPrice: undefined,
                maxPrice: undefined,
            }, {
                cancelToken: this.cancel.token
            }).then((response) => {
                this.setState({ token: this.props.token, posts: response.data, isFetching: false, page: 0, noMore: false });
            }).catch((e) => {
                if (axios__WEBPACK_IMPORTED_MODULE_1___default.a.isCancel(e)) {
                    //console.log("Request Cancelled");
                }
                else {
                    console.log("Internal Error");
                }
            });
        }
    }
    componentDidMount() {
        axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("api/posts", {
            keyWord: undefined,
            class: undefined,
            minPrice: undefined,
            maxPrice: undefined,
        }).then((response) => {
            this.setState({ token: this.props.token, posts: response.data, isFetching: false });
        });
    }
    render() {
        if (this.state.isFetching)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Loading__WEBPACK_IMPORTED_MODULE_6__["default"], null);
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: classes.pageTop, ref: this.pageTop }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["List"], { className: classes.root }, this.createList(classes)),
            this.state.isLoadingMore ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Loading__WEBPACK_IMPORTED_MODULE_6__["default"], null) : null,
            this.state.noMore ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], { align: "center" },
                "That's the last one.",
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_3__["default"], { color: "primary", "aria-label": "go page top", onClick: this.handleScrollToTop },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_material_ui_icons_VerticalAlignTop__WEBPACK_IMPORTED_MODULE_5___default.a, null))) : null));
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
        backgroundColor: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_4__["grey"][100],
    },
    pageTop: {
        position: "absolute",
        top: -100,
    }
}))(Posts));


/***/ })

}]);