(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./resources/js/components/Logout.tsx":
/*!********************************************!*\
  !*** ./resources/js/components/Logout.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var universal_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! universal-cookie */ "./node_modules/universal-cookie/es6/index.js");



class Logout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { msg } = this.props;
        console.log(this.props);
        if (msg) {
            const cookies = new universal_cookie__WEBPACK_IMPORTED_MODULE_1__["default"]();
            console.log(cookies.get('token'));
            cookies.remove('token', { path: '/' });
            window.location.href = "/";
        }
        else {
            window.location.href = "/login";
        }
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Logout);


/***/ })

}]);