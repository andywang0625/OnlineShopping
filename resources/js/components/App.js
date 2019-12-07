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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ReactDOM = require("react-dom");
var Header_1 = require("./Header");
var react_router_dom_1 = require("react-router-dom");
var HomePage_1 = require("./HomePage");
var react_localize_redux_1 = require("react-localize-redux");
var LoginPage_1 = require("./LoginPage");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(react_localize_redux_1.LocalizeProvider, null,
                React.createElement(react_router_dom_1.BrowserRouter, null,
                    React.createElement(Header_1.default, null),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: HomePage_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: "/login", component: LoginPage_1.default })))));
    };
    return App;
}(react_1.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=App.js.map