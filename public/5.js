(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

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


/***/ })

}]);