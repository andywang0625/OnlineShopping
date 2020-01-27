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
var react_1 = require("react");
var ReactDOM = __importStar(require("react-dom"));
var Header_1 = __importDefault(require("./Header"));
var react_router_dom_1 = require("react-router-dom");
var HomePage_1 = __importDefault(require("./HomePage"));
var react_localize_redux_1 = require("react-localize-redux");
var LoginPage_1 = __importDefault(require("./LoginPage"));
var Container_1 = __importDefault(require("@material-ui/core/Container"));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement(Container_1.default, { fixed: true },
            React.createElement(react_localize_redux_1.LocalizeProvider, null,
                React.createElement(react_router_dom_1.BrowserRouter, null,
                    React.createElement(Header_1.default, null),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: HomePage_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: "/login", component: LoginPage_1.default })))));
    };
    return App;
}(react_1.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
