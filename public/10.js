(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./resources/js/components/Register.tsx":
/*!**********************************************!*\
  !*** ./resources/js/components/Register.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/AccountCircle */ "./node_modules/@material-ui/icons/AccountCircle.js");
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_EmailRounded__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/EmailRounded */ "./node_modules/@material-ui/icons/EmailRounded.js");
/* harmony import */ var _material_ui_icons_EmailRounded__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_EmailRounded__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_LockRounded__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/LockRounded */ "./node_modules/@material-ui/icons/LockRounded.js");
/* harmony import */ var _material_ui_icons_LockRounded__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockRounded__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _FormErrorMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FormErrorMessage */ "./resources/js/components/FormErrorMessage.tsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);









var Register = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Register, _super);
    function Register(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            userName: "",
            userPasswd1: "",
            userPasswd2: "",
            userEmail: "",
            errorMessage: undefined,
            regdia: false,
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        return _this;
    }
    Register.prototype.handleChange = function (e) {
        var _a;
        var _this = this;
        var itemName = e.target.name;
        var itemValue = e.target.value;
        this.setState((_a = {}, _a[itemName] = itemValue, _a), function () {
            if (_this.state.userPasswd1 !== _this.state.userPasswd2) {
                _this.setState({ errorMessage: "Passwords do not match" });
            }
            else {
                _this.setState({ errorMessage: undefined });
            }
        });
    };
    Register.prototype.handleClose = function (e) {
        this.setState({ regdia: false });
        //console.log("closed!");
        this.setState({ dialogReason: undefined });
    };
    Register.prototype.handleSubmit = function (e) {
        var _this = this;
        e.preventDefault();
        if (this.state.userPasswd1 == this.state.userPasswd2) {
            var _a = this.state, userEmail = _a.userEmail, userName = _a.userName, userPasswd1 = _a.userPasswd1;
            axios__WEBPACK_IMPORTED_MODULE_7___default.a.post("api/register_request", {
                email: this.state.userEmail,
                name: this.state.userName,
                password: this.state.userPasswd1,
            }, { withCredentials: true }).then(function (response) {
                _this.setState({ regdia: true });
                _this.setState({ dialogMessage: "You have successfully registered!" });
            }).catch(function (error) {
                _this.setState({ regdia: true });
                _this.setState({ dialogMessage: "Oops, an error occurred!" });
                _this.setState({ dialogReason: error.response.data });
            });
        }
        else {
            //console.log("Error");
        }
    };
    Register.prototype.render = function () {
        var classes = this.props.classes;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Container"], { maxWidth: "md" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Dialog"], { open: this.state.regdia, onClose: this.handleClose, "aria-labelledby": "dtitle" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogTitle"], { id: "dtitle" }, "Login"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContent"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogContentText"], null,
                        this.state.dialogMessage,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                        this.state.dialogReason)),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["DialogActions"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { autoFocus: true, onClick: this.handleClose, color: "primary" }, "Got it"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], { container: true, spacing: 0, direction: "column", justify: "center", alignItems: "center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grow"], { in: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"], { className: classes.paper },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: { width: "100%" } },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", { onSubmit: this.handleSubmit },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { className: classes.margin, id: "userNameText", name: "userName", label: "User Name", placeholder: "User Name", onChange: this.handleChange, value: this.state.userName, InputProps: {
                                        startAdornment: (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["InputAdornment"], { position: "start" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_3___default.a, null))),
                                    }, required: true }),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { className: classes.margin, id: "userEmail", placeholder: "Email", name: "userEmail", label: "Email", onChange: this.handleChange, value: this.state.userEmail, InputProps: {
                                        startAdornment: (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["InputAdornment"], { position: "start" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_EmailRounded__WEBPACK_IMPORTED_MODULE_4___default.a, null)))
                                    }, required: true }),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { className: classes.margin, id: "userPasswd1", name: "userPasswd1", type: "password", placeholder: "Password", label: "Password", value: this.state.userPasswd1, onChange: this.handleChange, InputProps: {
                                        startAdornment: (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["InputAdornment"], { position: "start" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_LockRounded__WEBPACK_IMPORTED_MODULE_5___default.a, null)))
                                    }, required: true }),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TextField"], { className: classes.margin, id: "userPasswd2", name: "userPasswd2", type: "password", placeholder: "Password Verification", label: "Password Verification", value: this.state.userPasswd2, onChange: this.handleChange, InputProps: {
                                        startAdornment: (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["InputAdornment"], { position: "start" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_LockRounded__WEBPACK_IMPORTED_MODULE_5___default.a, null)))
                                    }, required: true }),
                                this.state.errorMessage !== undefined ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FormErrorMessage__WEBPACK_IMPORTED_MODULE_6__["default"], { theMessage: this.state.errorMessage })) : null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], { className: classes.submitbtn, type: "submit", variant: "contained", color: "primary" }, "Register"))))))));
    };
    return Register;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(function (_a) {
    var spacing = _a.spacing;
    return Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["createStyles"])({
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
    });
})(Register));


/***/ })

}]);