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
var Alert_1 = __importDefault(require("@material-ui/lab/Alert"));
var core_1 = require("@material-ui/core");
var styles = function (theme) { return ({
    error: {
        width: "100%"
    }
}); };
var FormErrorMessage = /** @class */ (function (_super) {
    __extends(FormErrorMessage, _super);
    function FormErrorMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormErrorMessage.prototype.render = function () {
        var theMessage = this.props.theMessage;
        var classes = this.props.classes;
        return (react_2.default.createElement("div", { className: classes.error },
            react_2.default.createElement(Alert_1.default, { severity: "error" }, theMessage)));
    };
    return FormErrorMessage;
}(react_1.Component));
exports.default = core_1.withStyles(styles)(FormErrorMessage);
