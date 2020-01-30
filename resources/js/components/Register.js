"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
var EmailRounded_1 = __importDefault(require("@material-ui/icons/EmailRounded"));
var LockRounded_1 = __importDefault(require("@material-ui/icons/LockRounded"));
var FormErrorMessage_1 = __importDefault(require("./FormErrorMessage"));
var styles = function (theme) { return ({
    margin: {
        margin: theme.spacing(1),
        width: "100%",
    }
}); };
var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            userName: "",
            userPasswd1: "",
            userPasswd2: "",
            userEmail: "",
            errorMessage: undefined,
        };
        _this.handleChange = _this.handleChange.bind(_this);
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
    Register.prototype.render = function () {
        var classes = this.props.classes;
        return (react_2.default.createElement(core_1.Container, { maxWidth: "md" },
            react_2.default.createElement(core_1.Grid, { container: true },
                react_2.default.createElement("form", null,
                    react_2.default.createElement(core_1.TextField, { className: classes.margin, id: "userNameText", name: "userName", label: "User Name", onChange: this.handleChange, value: this.state.userName, InputProps: {
                            startAdornment: (react_2.default.createElement(core_1.InputAdornment, { position: "start" },
                                react_2.default.createElement(AccountCircle_1.default, null))),
                        } }),
                    react_2.default.createElement(core_1.TextField, { className: classes.margin, id: "userEmail", name: "userEmail", label: "Email", onChange: this.handleChange, value: this.state.userEmail, InputProps: {
                            startAdornment: (react_2.default.createElement(core_1.InputAdornment, { position: "start" },
                                react_2.default.createElement(EmailRounded_1.default, null)))
                        } }),
                    react_2.default.createElement(core_1.TextField, { className: classes.margin, id: "userPasswd1", name: "userPasswd1", label: "Password", value: this.state.userPasswd1, onChange: this.handleChange, InputProps: {
                            startAdornment: (react_2.default.createElement(core_1.InputAdornment, { position: "start" },
                                react_2.default.createElement(LockRounded_1.default, null)))
                        } }),
                    react_2.default.createElement(core_1.TextField, { className: classes.margin, id: "userPasswd2", name: "userPasswd2", label: "Password Verification", value: this.state.userPasswd2, onChange: this.handleChange, InputProps: {
                            startAdornment: (react_2.default.createElement(core_1.InputAdornment, { position: "start" },
                                react_2.default.createElement(LockRounded_1.default, null)))
                        } }),
                    this.state.errorMessage !== undefined ? (react_2.default.createElement(FormErrorMessage_1.default, { theMessage: this.state.errorMessage })) : null,
                    react_2.default.createElement(core_1.Button, { className: classes.margin, type: "submit", variant: "contained", color: "primary" }, "Register")))));
    };
    return Register;
}(react_1.Component));
exports.default = core_1.withStyles(styles)(Register);
