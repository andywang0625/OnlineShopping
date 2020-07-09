(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./resources/js/components/Register.tsx":
/*!**********************************************!*\
  !*** ./resources/js/components/Register.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/icons/AccountCircle */ "./node_modules/@material-ui/icons/AccountCircle.js");
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_EmailRounded__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/EmailRounded */ "./node_modules/@material-ui/icons/EmailRounded.js");
/* harmony import */ var _material_ui_icons_EmailRounded__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_EmailRounded__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_LockRounded__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/LockRounded */ "./node_modules/@material-ui/icons/LockRounded.js");
/* harmony import */ var _material_ui_icons_LockRounded__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockRounded__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _FormErrorMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormErrorMessage */ "./resources/js/components/FormErrorMessage.tsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);








class Register extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userPasswd1: "",
            userPasswd2: "",
            userEmail: "",
            errorMessage: undefined,
            regdia: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;
        this.setState({ [itemName]: itemValue }, () => {
            if (this.state.userPasswd1 !== this.state.userPasswd2) {
                this.setState({ errorMessage: "Passwords do not match" });
            }
            else {
                this.setState({ errorMessage: undefined });
            }
        });
    }
    handleClose(e) {
        this.setState({ regdia: false });
        //console.log("closed!");
        this.setState({ dialogReason: undefined });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.userPasswd1 == this.state.userPasswd2) {
            const { userEmail, userName, userPasswd1 } = this.state;
            axios__WEBPACK_IMPORTED_MODULE_6___default.a.post("api/register_request", {
                email: this.state.userEmail,
                name: this.state.userName,
                password: this.state.userPasswd1,
            }, { withCredentials: true }).then(response => {
                this.setState({ regdia: true });
                this.setState({ dialogMessage: "You have successfully registered!" });
            }).catch(error => {
                this.setState({ regdia: true });
                this.setState({ dialogMessage: "Oops, an error occurred!" });
                this.setState({ dialogReason: error.response.data });
            });
        }
        else {
            //console.log("Error");
        }
    }
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Container"], { maxWidth: "md" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Dialog"], { open: this.state.regdia, onClose: this.handleClose, "aria-labelledby": "dtitle" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogTitle"], { id: "dtitle" }, "Login"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContent"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogContentText"], null,
                        this.state.dialogMessage,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null),
                        this.state.dialogReason)),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["DialogActions"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { autoFocus: true, onClick: this.handleClose, color: "primary" }, "Got it"))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], { container: true, spacing: 0, direction: "column", justify: "center", alignItems: "center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grow"], { in: true },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Paper"], { className: classes.paper },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { style: { width: "100%" } },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", { onSubmit: this.handleSubmit },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { className: classes.margin, id: "userNameText", name: "userName", label: "User Name", placeholder: "User Name", onChange: this.handleChange, value: this.state.userName, InputProps: {
                                        startAdornment: (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["InputAdornment"], { position: "start" },
                                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_2___default.a, null))),
                                    }, required: true }),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { className: classes.margin, id: "userEmail", placeholder: "Email", name: "userEmail", label: "Email", onChange: this.handleChange, value: this.state.userEmail, InputProps: {
                                        startAdornment: (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["InputAdornment"], { position: "start" },
                                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_EmailRounded__WEBPACK_IMPORTED_MODULE_3___default.a, null)))
                                    }, required: true }),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { className: classes.margin, id: "userPasswd1", name: "userPasswd1", type: "password", placeholder: "Password", label: "Password", value: this.state.userPasswd1, onChange: this.handleChange, InputProps: {
                                        startAdornment: (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["InputAdornment"], { position: "start" },
                                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockRounded__WEBPACK_IMPORTED_MODULE_4___default.a, null)))
                                    }, required: true }),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], { className: classes.margin, id: "userPasswd2", name: "userPasswd2", type: "password", placeholder: "Password Verification", label: "Password Verification", value: this.state.userPasswd2, onChange: this.handleChange, InputProps: {
                                        startAdornment: (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["InputAdornment"], { position: "start" },
                                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockRounded__WEBPACK_IMPORTED_MODULE_4___default.a, null)))
                                    }, required: true }),
                                this.state.errorMessage !== undefined ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormErrorMessage__WEBPACK_IMPORTED_MODULE_5__["default"], { theMessage: this.state.errorMessage })) : null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], { className: classes.submitbtn, type: "submit", variant: "contained", color: "primary" }, "Register"))))))));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(({ spacing }) => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["createStyles"])({
    margin: {
        marginTop: spacing(2),
        width: "100%",
    },
    submitbtn: {
        marginTop: spacing(4),
        width: "100%",
    },
    paper: {
        padding: spacing(3),
        marginTop: "10%",
        width: "80%"
    },
}))(Register));


/***/ })

}]);