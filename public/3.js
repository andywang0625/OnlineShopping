(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/@material-ui/icons/Close.js":
/*!**************************************************!*\
  !*** ./node_modules/@material-ui/icons/Close.js ***!
  \**************************************************/
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
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), 'Close');

exports.default = _default;

/***/ }),

/***/ "./resources/js/components/EditImage.tsx":
/*!***********************************************!*\
  !*** ./resources/js/components/EditImage.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MessageBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MessageBox */ "./resources/js/components/MessageBox.tsx");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");







class EditImage extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.closeMsg = () => {
            this.setState({
                msgBox: false,
            });
        };
        this.fileSelectHandler = (event) => {
            let formdata = new FormData();
            formdata.append("photo", event.target.files[0]);
            formdata.append("postid", this.props.postid);
            axios__WEBPACK_IMPORTED_MODULE_2___default()({
                url: '/api/img/post_image',
                method: "POST",
                data: formdata
            }).then((response) => {
                this.setState({
                    imgList: [...this.state.imgList, response.data["filename"]]
                });
            }).catch((e) => {
                this.setState({
                    msgBox: true,
                    failedR: e.response.data["message"],
                });
            });
        };
        this.renderImgList = (classes) => {
            let imgs = [];
            this.state.imgList.map((tile, index) => {
                imgs.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["ButtonBase"], { focusRipple: true, key: index, style: {
                        width: 100
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { onClick: () => this.rmImgHandler(tile) },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { height: "100", width: "100", src: "/api/img/tn/post/" + tile, alt: tile }))));
            });
            return (imgs);
        };
        this.rmImgHandler = (name) => {
            axios__WEBPACK_IMPORTED_MODULE_2___default.a.post("/api/img/post/rmimg", {
                token: this.props.token,
                name: name,
            }).then(response => {
                let arr = this.state.imgList;
                arr.splice(this.state.imgList.indexOf(name), 1);
                this.setState({
                    imgList: arr
                });
            }).catch(e => {
                console.log("Error: Removing Image Failed");
            });
        };
        this.state = {
            file: null,
            msgBox: false,
            failedR: "",
            imgList: [],
            id: ""
        };
    }
    componentDidMount() {
        const values = query_string__WEBPACK_IMPORTED_MODULE_4___default.a.parse(this.props.location.search);
        let id = "";
        if (values.id != null) {
            id = values.id;
            this.setState({ id: id });
        }
        else {
            //MessageBox: Not Found Error Message
        }
        axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("/api/img/postid/" + id).then((response) => {
            let imgNames = [];
            Object.keys(response.data).forEach(function (key) {
                imgNames.push(response.data[key].filename);
            });
            this.setState({
                imgList: imgNames,
            });
        });
    }
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: classes.root },
            this.state.msgBox ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MessageBox__WEBPACK_IMPORTED_MODULE_3__["default"], { callback: this.closeMsg.bind(this), messageType: "e", messageText: "An error occurred while uploading the picture  " + this.state.failedR }) : null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { variant: "contained", component: "label" },
                "Upload Image",
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", { type: "file", onChange: (e) => this.fileSelectHandler(e), style: { display: "none" } })),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null),
            this.renderImgList(classes)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(({ palette, spacing }) => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["createStyles"])({
    root: {
        marginTop: spacing(4),
    },
    imgListRoot: {},
    gridList: {
        transform: 'translateZ(0)',
        width: 500,
        height: 450,
    },
    title: {
        color: palette.primary.light,
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}))(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["withRouter"])(EditImage)));


/***/ }),

/***/ "./resources/js/components/EditPost.tsx":
/*!**********************************************!*\
  !*** ./resources/js/components/EditPost.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Loading */ "./resources/js/components/Loading.tsx");








class EditPost extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.handleChange = (type) => (e) => {
            const itemName = e.target.name;
            const itemValue = e.target.value;
            if (type == "amount") {
                if (Math.ceil(parseInt((itemValue).toString().replace(".", ""))) < 0) {
                    this.setState({ amount: "0", Quantity: Math.ceil(parseInt(itemValue)) });
                }
                else {
                    this.setState({ amount: ((Math.ceil(parseInt(itemValue))).toString().replace(".", "")),
                        Quantity: Math.ceil(parseInt(itemValue)) });
                }
                this.setState({
                    Quantity: Math.ceil(parseInt(itemValue))
                });
            }
            else if (type == "number") {
                if (parseInt(itemValue) < 0) {
                    this.setState({ priceBox: "0", Price: 0 });
                }
                else {
                    this.setState({ priceBox: itemValue, Price: parseFloat(itemValue) });
                }
                this.setState({
                    Price: Math.ceil(parseInt(itemValue))
                });
            }
            else if (type == "description") {
                this.setState({ Description: itemValue });
            }
            else if (type == "title") {
                this.setState({ Title: itemValue });
            }
        };
        this.handleClose = (e) => {
            this.setState({ logdia: false });
            //console.log("closed!");
            this.setState({ dialogReason: undefined });
            if (this.state.success) {
                return window.location.href = "/";
            }
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/postEdit', {
                id: this.state.id,
                token: this.props.token,
                title: this.state.Title,
                quantity: this.state.Quantity,
                price: this.state.Price,
                description: this.state.Description
            }).then((response) => {
                this.props.postback(this.state.id);
            }).catch(e => {
                this.setState({
                    logdia: true,
                    dialogMessage: "Oops, an error occurred!",
                    dialogReason: e.response.data
                });
            });
        };
        this.state = {
            Quantity: 0,
            Price: 0,
            Title: "",
            Description: "",
            amount: "0",
            priceBox: "0",
            logdia: false,
            dialogMessage: "",
            dialogReason: "",
            success: false,
            isFetching: true,
            notFound: false,
            id: undefined,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        //console.log(this.props);
        const values = query_string__WEBPACK_IMPORTED_MODULE_4___default.a.parse(this.props.location.search);
        let id = "";
        if (values.id != null) {
            id = values.id;
            this.setState({ id: id });
        }
        else
            this.setState({ notFound: true });
        axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("api/post", {
            id: id,
        }).then((response) => {
            this.setState({
                Description: response.data["data"].postBody,
                Title: response.data["data"].postTitle,
                Quantity: parseInt(response.data["data"].quantity),
                Price: parseFloat(response.data["data"].price),
                isFetching: false,
                priceBox: response.data["data"].price,
                amount: response.data["data"].quantity,
            });
        }).catch(e => {
        });
    }
    render() {
        const { classes } = this.props;
        if (this.state.isFetching) {
            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Loading__WEBPACK_IMPORTED_MODULE_6__["default"], null));
        }
        else if (this.state.notFound) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Redirect"], { to: "/" });
        }
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Container"], { className: classes.root },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { open: this.state.logdia, onClose: this.handleClose, "aria-labelledby": "dtitle" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogTitle"], { id: "dtitle" }, "Create Post"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContentText"], null,
                            this.state.dialogMessage,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null),
                            this.state.dialogReason)),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { autoFocus: true, onClick: this.handleClose, color: "primary" }, "Got it"))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", { autoComplete: "off", onSubmit: this.handleSubmit },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { container: true, spacing: 3 },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { item: true, xs: 12, md: 8 },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { variant: "outlined", value: this.state.Title, onChange: this.handleChange("title"), id: "title", label: "Title", className: [classes.titleBar, classes.inputfield].join(" "), color: "secondary", required: true })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { item: true, xs: 6, md: 2 },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { id: "quantity", label: "Quantity", type: "number", value: this.state.amount, onChange: this.handleChange("amount"), className: classes.inputfield, required: true })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { item: true, xs: 6, md: 2 },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { id: "price", label: "Price", value: this.state.priceBox, className: classes.inputfield, onChange: this.handleChange("number"), type: "number", InputProps: {
                                    startAdornment: (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["InputAdornment"], { position: "start" }, "$"))
                                }, required: true })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { item: true, xs: 12 },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Divider"], null)),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { item: true, xs: 12 },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { id: "description", label: "Description", placeholder: "Give a brief description for your product!", multiline: true, variant: "outlined", className: classes.inputfield, value: this.state.Description, onChange: this.handleChange("description"), rows: "20", rowsMax: "100", required: true })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { item: true, xs: 12 },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { container: true, justify: "flex-end" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { item: true, xs: 12, md: 1 },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { className: [classes.submitbtn, classes.inputfield].join(" "), type: "submit", variant: "contained", color: "primary" }, "Save")))))))));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(({ spacing }) => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["createStyles"])({
    root: {
        flexGrow: 1,
        marginTop: spacing(4),
        marginBottom: spacing(8),
    },
    titleBar: {},
    inputfield: {
        width: "100%",
    },
    submitbtn: {}
}))(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["withRouter"])(EditPost)));


/***/ }),

/***/ "./resources/js/components/EditPostStepper.tsx":
/*!*****************************************************!*\
  !*** ./resources/js/components/EditPostStepper.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditPostStepper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Stepper */ "./node_modules/@material-ui/core/esm/Stepper/index.js");
/* harmony import */ var _material_ui_core_Step__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Step */ "./node_modules/@material-ui/core/esm/Step/index.js");
/* harmony import */ var _material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/StepLabel */ "./node_modules/@material-ui/core/esm/StepLabel/index.js");
/* harmony import */ var _material_ui_core_StepContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/StepContent */ "./node_modules/@material-ui/core/esm/StepContent/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/esm/Paper/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _MessageBox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MessageBox */ "./resources/js/components/MessageBox.tsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _EditPost__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./EditPost */ "./resources/js/components/EditPost.tsx");
/* harmony import */ var _EditImage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./EditImage */ "./resources/js/components/EditImage.tsx");
/* harmony import */ var _EditTags__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./EditTags */ "./resources/js/components/EditTags.tsx");















const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])((theme) => Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["createStyles"])({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(8),
        width: '100%',
        padding: 0,
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    sb: {
        marginBottom: theme.spacing(10),
    },
    stepper: {
        margin: theme.spacing(0),
        padding: 0,
    }
}));
function EditPostStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(0);
    const [msgBox, setMsgBox] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false);
    const steps = getSteps();
    const [postId, setPostId] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState("");
    const [step1Clear, setStep1Clear] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false);
    const [step2Clear, setStep2Clear] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false);
    const [snackbar, setSnackbar] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false);
    const [snackbarMsg, setSnackbarMsg] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState("");
    function getSteps() {
        return ['Create a Post', 'Upload Images to Describe it', 'Done'];
    }
    function getStepContent(step, token) {
        switch (step) {
            case 0:
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditPost__WEBPACK_IMPORTED_MODULE_12__["default"], { token: token, postback: handleSave });
            case 1:
                if (postId == "") {
                    return null;
                }
                else {
                    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditImage__WEBPACK_IMPORTED_MODULE_13__["default"], { token: token, postid: postId });
                }
            case 2:
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__["default"], { component: 'span', variant: "h5" }, "You Are All Set!");
            default:
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__["default"], { component: 'span', variant: "h5" }, "Unknow Error");
        }
    }
    const hanleSaveMsg = (step) => {
        if (step == 0) {
            setSnackbar(true);
            setSnackbarMsg("Post Saved!");
        }
    };
    const closeMesBox = () => {
        setMsgBox(false);
    };
    const handleSave = (id) => {
        setPostId(id);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        hanleSaveMsg(0);
    };
    const handleNext = () => {
        if (postId) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };
    const handleFinish = () => {
        return window.location.href = "/";
    };
    const handleSnackbarClose = () => {
        setSnackbar(false);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: classes.root },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_10__["Snackbar"], { className: classes.sb, anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            }, open: snackbar, autoHideDuration: 6000, onClose: handleSnackbarClose, message: "Post Saved!", action: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_10__["IconButton"], { size: "small", "aria-label": "close", color: "inherit", onClick: handleSnackbarClose },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_11___default.a, { fontSize: "small" }))) }),
        msgBox ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MessageBox__WEBPACK_IMPORTED_MODULE_9__["default"], { callback: closeMesBox, messageType: "e", messageText: "You must finish step one first." }) : null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_2__["default"], { className: classes.stepper, activeStep: activeStep, orientation: "vertical" }, steps.map((label, index) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Step__WEBPACK_IMPORTED_MODULE_3__["default"], { key: label },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_4__["default"], null, label),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_StepContent__WEBPACK_IMPORTED_MODULE_5__["default"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__["default"], { component: 'span' }, getStepContent(index, props.token)),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: classes.actionsContainer },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, activeStep === 1 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__["default"], { onClick: handleNext, className: classes.button }, "Next") : null))))))),
        activeStep === steps.length - 1 && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_7__["default"], { square: true, elevation: 0, className: classes.resetContainer },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditTags__WEBPACK_IMPORTED_MODULE_14__["default"], { PostId: Number(postId), Token: props.token }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__["default"], { onClick: handleFinish, variant: "contained", color: "primary", className: classes.button }, "Return to Home Page")))));
}


/***/ }),

/***/ "./resources/js/components/EditTags.tsx":
/*!**********************************************!*\
  !*** ./resources/js/components/EditTags.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Loading */ "./resources/js/components/Loading.tsx");




class EditTags extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.handleAddTag = (tagInfo) => {
            this.setState({
                TagsAvaliable: this.state.TagsAvaliable.filter((tag) => tagInfo.id !== tag.id),
                TagsSelected: [...this.state.TagsSelected, tagInfo],
            }, () => {
                this.setState({
                    isLoading: true,
                });
                axios__WEBPACK_IMPORTED_MODULE_1___default()({
                    method: "post",
                    url: "/api/post/tags/add",
                    data: {
                        id: this.props.PostId,
                        tag: tagInfo.id,
                        token: this.props.Token,
                    }
                }).then((response) => {
                    if (response.data.error == null) {
                        this.setState({
                            isLoading: false,
                        });
                    }
                }).catch(e => {
                    console.log(e.response.data.error);
                });
            });
        };
        this.handleDelTag = (tagInfo) => {
            this.setState({
                TagsSelected: this.state.TagsSelected.filter((tag) => tagInfo.id !== tag.id),
                TagsAvaliable: [...this.state.TagsAvaliable, tagInfo],
            }, () => {
                this.setState({ isLoading: true });
                axios__WEBPACK_IMPORTED_MODULE_1___default()({
                    method: "post",
                    url: "/api/post/tags/del",
                    data: {
                        id: this.props.PostId,
                        tag: tagInfo.id,
                        token: this.props.Token,
                    }
                }).then((response) => {
                    if (response.data.error == null)
                        this.setState({
                            isLoading: false,
                        });
                }).catch(e => {
                    console.log(e.response.data.error);
                });
            });
        };
        this.state = {
            TagsAvaliable: [],
            TagsSelected: [],
            isFetching: true,
            isLoading: false,
        };
    }
    componentDidMount() {
        axios__WEBPACK_IMPORTED_MODULE_1___default()({
            method: "get",
            url: "/api/tags",
        }).then((response) => {
            this.setState({ TagsAvaliable: response.data["tags"] });
            axios__WEBPACK_IMPORTED_MODULE_1___default()({
                method: "get",
                url: "/api/post/tags",
                params: {
                    id: this.props.PostId,
                }
            }).then((response) => {
                response.data.tags.map((currentValue) => {
                    this.setState({
                        TagsAvaliable: this.state.TagsAvaliable.filter((tag) => currentValue.id != tag.id),
                        TagsSelected: [...this.state.TagsSelected, currentValue],
                    });
                });
                this.setState({
                    isFetching: false,
                });
            });
        });
    }
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: classes.root }, this.state.isLoading && this.state.isFetching ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Loading__WEBPACK_IMPORTED_MODULE_3__["default"], null) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
            this.state.TagsAvaliable.length ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: classes.tagPaper }, this.state.TagsAvaliable.map((currentValue, index) => {
                    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", { key: currentValue.id },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Chip"], { label: currentValue.tag, onClick: (e) => this.handleAddTag(currentValue), className: classes.tag, color: "primary" })));
                }))) : null,
            this.state.TagsSelected.length ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: classes.tagPaper }, this.state.TagsSelected.map((currentValue, index) => {
                    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", { key: currentValue.id },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Chip"], { label: currentValue.tag, onDelete: (e) => this.handleDelTag(currentValue), className: classes.tag, color: "secondary" })));
                }))) : null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(({ spacing }) => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["createStyles"])({
    root: {
        width: "100%",
    },
    tag: {
        margin: spacing(1),
    },
    tagPaper: {
        display: 'flex',
        justifyContent: "center",
        flexWarp: "warp",
        padding: spacing(0.5),
        listStyle: 'none',
    },
}))(EditTags));


/***/ })

}]);