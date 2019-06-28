/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../autopilot/presets.js":
/*!*******************************!*\
  !*** ../autopilot/presets.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    "motor-light": {
        text: 'Motor - light conditions',
        values: {
            rudderTime: 200,
            rudderWait: 200,
            kP: 1,
            kI: 0.04,
            kD: 0.02,
            rudderMult: 100
        }
    },
    'sail-light': {
        text: 'Sailing - light conditions',
        values: {
            rudderTime: 200,
            rudderWait: 200,
            kP: 0.6,
            kI: 0.06,
            kD: 0.02,
            rudderMult: 65
        }
    },
    'sail-light-med-downhill': {
        text: 'Sailing - light/med downhill',
        values: {
            rudderTime: 200,
            rudderWait: 200,
            kP: 1,
            kI: 0.04,
            kD: 0.02,
            rudderMult: 100
        }
    },
    'sail-med-heavy-downhill': {
        text: 'Sailing - med/heavy downhill',
        values: {
            rudderTime: 200,
            rudderWait: 400,
            rudderMult: 100,
            kP: 3,
            kI: .04,
            kD: .03
        }
    }
};

/***/ }),

/***/ "../autopilot/utils.js":
/*!*****************************!*\
  !*** ../autopilot/utils.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const _ = __webpack_require__(/*! lodash */ "../node_modules/lodash/lodash.js");

module.exports = {
    fixed: (n, places = 1) => parseFloat(parseFloat(n, 10).toFixed(places)),

    getDirectionalDiff(angle1, angle2) {
        var diff = angle2 - angle1;
        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;
        return diff;
    },

    now: () => new Date().getTime()
};

/***/ }),

/***/ "../network/networkBus.js":
/*!********************************!*\
  !*** ../network/networkBus.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const _ = __webpack_require__(/*! lodash */ "../node_modules/lodash/lodash.js");
const { objToMsg, msgToObj } = __webpack_require__(/*! ./utils */ "../network/utils.js");

const ipc = __webpack_require__(/*! node-ipc */ "../node_modules/node-ipc/node-ipc.js");

ipc.config.id = 'boat-systems';
ipc.config.retry = 1500;
ipc.config.silent = true;

const listeners = {};

ipc.connectTo('boat-systems', () => {
    ipc.of['boat-systems'].on('message', msg => {
        const obj = msgToObj(msg);
        (listeners[obj.event] || []).forEach(listener => listener(obj.data));
    });
});

module.exports.onBusMessage = (event, listener) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(listener);
};

module.exports.sendMessage = (event, data) => ipc.of['boat-systems'].emit('message', objToMsg({ event: event, data: data }));

//setTimeout(() => module.exports.send('LOG', {msg: 'here is the log message'}), 5000);

//setTimeout(() => module.exports.send('MY_EVENT', {foo: 1}), 5000);
//setTimeout(() => networkSocket.send(JSON.stringify({event: 'MY_EVENT', foo: 2}), PORT,  IP_ADDRESS), 5000);

/***/ }),

/***/ "../network/utils.js":
/*!***************************!*\
  !*** ../network/utils.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const _ = __webpack_require__(/*! lodash */ "../node_modules/lodash/lodash.js");

const nullToUndefined = obj => _.reduce(obj, (result, v, k) => {
    _.isPlainObject(v) ? result[k] = nullToUndefined(v) : result[k] = v === null ? undefined : v;
    return result;
}, {});

module.exports.objToMsg = obj => `$${JSON.stringify(obj, (k, v) => v === undefined ? null : v)}\n`;

module.exports.msgToObj = msg => nullToUndefined(JSON.parse(msg.toString().replace(/^\$/, '')));

/***/ }),

/***/ "../node_modules/bootstrap/dist/css/bootstrap.min.css":
/*!************************************************************!*\
  !*** ../node_modules/bootstrap/dist/css/bootstrap.min.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../css-loader!./bootstrap.min.css */ "../node_modules/css-loader/index.js!../node_modules/bootstrap/dist/css/bootstrap.min.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/bootstrap/dist/css/bootstrap.min.css":
/*!***************************************************************************************!*\
  !*** ../node_modules/css-loader!../node_modules/bootstrap/dist/css/bootstrap.min.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ../node_modules/css-loader/index.js):\nError: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/bootstrap/dist/css/bootstrap.min.css'");

/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/react-reflex/styles.css":
/*!**************************************************************************!*\
  !*** ../node_modules/css-loader!../node_modules/react-reflex/styles.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ../node_modules/css-loader/index.js):\nError: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react-reflex/styles.css'");

/***/ }),

/***/ "../node_modules/key-event-to-string/index.js":
/*!****************************************************!*\
  !*** ../node_modules/key-event-to-string/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/key-event-to-string/index.js'");

/***/ }),

/***/ "../node_modules/lodash/lodash.js":
/*!****************************************!*\
  !*** ../node_modules/lodash/lodash.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/lodash/lodash.js'");

/***/ }),

/***/ "../node_modules/mobx-react/index.module.js":
/*!**************************************************!*\
  !*** ../node_modules/mobx-react/index.module.js ***!
  \**************************************************/
/*! exports provided: propTypes, PropTypes, onError, observer, Observer, renderReporter, componentByNodeRegistery, trackComponents, useStaticRendering, Provider, inject */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/mobx-react/index.module.js'");

/***/ }),

/***/ "../node_modules/mobx/lib/mobx.module.js":
/*!***********************************************!*\
  !*** ../node_modules/mobx/lib/mobx.module.js ***!
  \***********************************************/
/*! exports provided: extras, Reaction, untracked, IDerivationState, Atom, BaseAtom, useStrict, isStrictModeEnabled, spy, comparer, asReference, asFlat, asStructure, asMap, isModifierDescriptor, isObservableObject, isBoxedObservable, isObservableArray, ObservableMap, isObservableMap, map, transaction, observable, computed, isObservable, isComputed, extendObservable, extendShallowObservable, observe, intercept, autorun, autorunAsync, when, reaction, action, isAction, runInAction, expr, toJS, createTransformer, whyRun, trace, isArrayLike, default */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/mobx/lib/mobx.module.js'");

/***/ }),

/***/ "../node_modules/node-ipc/node-ipc.js":
/*!********************************************!*\
  !*** ../node_modules/node-ipc/node-ipc.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/node-ipc/node-ipc.js'");

/***/ }),

/***/ "../node_modules/react-bootstrap/es/index.js":
/*!***************************************************!*\
  !*** ../node_modules/react-bootstrap/es/index.js ***!
  \***************************************************/
/*! exports provided: Accordion, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Carousel, CarouselItem, Checkbox, Clearfix, CloseButton, ControlLabel, Col, Collapse, Dropdown, DropdownButton, Fade, Form, FormControl, FormGroup, Glyphicon, Grid, HelpBlock, Image, InputGroup, Jumbotron, Label, ListGroup, ListGroupItem, Media, MenuItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, Navbar, NavbarBrand, NavDropdown, NavItem, Overlay, OverlayTrigger, PageHeader, PageItem, Pager, Pagination, Panel, PanelGroup, Popover, ProgressBar, Radio, ResponsiveEmbed, Row, SafeAnchor, SplitButton, Tab, TabContainer, TabContent, Table, TabPane, Tabs, Thumbnail, ToggleButton, ToggleButtonGroup, Tooltip, Well, utils */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react-bootstrap/es/index.js'");

/***/ }),

/***/ "../node_modules/react-bootstrap/lib/Col.js":
/*!**************************************************!*\
  !*** ../node_modules/react-bootstrap/lib/Col.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react-bootstrap/lib/Col.js'");

/***/ }),

/***/ "../node_modules/react-bootstrap/lib/DropdownButton.js":
/*!*************************************************************!*\
  !*** ../node_modules/react-bootstrap/lib/DropdownButton.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react-bootstrap/lib/DropdownButton.js'");

/***/ }),

/***/ "../node_modules/react-bootstrap/lib/Grid.js":
/*!***************************************************!*\
  !*** ../node_modules/react-bootstrap/lib/Grid.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react-bootstrap/lib/Grid.js'");

/***/ }),

/***/ "../node_modules/react-bootstrap/lib/MenuItem.js":
/*!*******************************************************!*\
  !*** ../node_modules/react-bootstrap/lib/MenuItem.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react-bootstrap/lib/MenuItem.js'");

/***/ }),

/***/ "../node_modules/react-bootstrap/lib/Row.js":
/*!**************************************************!*\
  !*** ../node_modules/react-bootstrap/lib/Row.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react-bootstrap/lib/Row.js'");

/***/ }),

/***/ "../node_modules/react-bootstrap/lib/Well.js":
/*!***************************************************!*\
  !*** ../node_modules/react-bootstrap/lib/Well.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react-bootstrap/lib/Well.js'");

/***/ }),

/***/ "../node_modules/react-dom/index.js":
/*!******************************************!*\
  !*** ../node_modules/react-dom/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react-dom/index.js'");

/***/ }),

/***/ "../node_modules/react-reflex/dist/es/index.js":
/*!*****************************************************!*\
  !*** ../node_modules/react-reflex/dist/es/index.js ***!
  \*****************************************************/
/*! exports provided: ReflexContainer, ReflexSplitter, ReflexElement, ReflexHandle */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react-reflex/dist/es/index.js'");

/***/ }),

/***/ "../node_modules/react-reflex/styles.css":
/*!***********************************************!*\
  !*** ../node_modules/react-reflex/styles.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../css-loader!./styles.css */ "../node_modules/css-loader/index.js!../node_modules/react-reflex/styles.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../node_modules/react-router-dom/es/index.js":
/*!****************************************************!*\
  !*** ../node_modules/react-router-dom/es/index.js ***!
  \****************************************************/
/*! exports provided: BrowserRouter, HashRouter, Link, MemoryRouter, NavLink, Prompt, Redirect, Route, Router, StaticRouter, Switch, generatePath, matchPath, withRouter */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react-router-dom/es/index.js'");

/***/ }),

/***/ "../node_modules/react/index.js":
/*!**************************************!*\
  !*** ../node_modules/react/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/react/index.js'");

/***/ }),

/***/ "../node_modules/simple-monads/lib/simple-monads.js":
/*!**********************************************************!*\
  !*** ../node_modules/simple-monads/lib/simple-monads.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/simple-monads/lib/simple-monads.js'");

/***/ }),

/***/ "../node_modules/style-loader/lib/addStyles.js":
/*!*****************************************************!*\
  !*** ../node_modules/style-loader/lib/addStyles.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/scott/work/boat-systems/node_modules/style-loader/lib/addStyles.js'");

/***/ }),

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.App = undefined;

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/es/index.js");

var _reactReflex = __webpack_require__(/*! react-reflex */ "../node_modules/react-reflex/dist/es/index.js");

__webpack_require__(/*! react-reflex/styles.css */ "../node_modules/react-reflex/styles.css");

__webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "../node_modules/bootstrap/dist/css/bootstrap.min.css");

var _SidebarMenu = __webpack_require__(/*! ./SidebarMenu */ "./src/components/SidebarMenu.js");

var _HomePage = __webpack_require__(/*! ../pages/HomePage */ "./src/pages/HomePage.js");

var _LogPage = __webpack_require__(/*! ../pages/LogPage */ "./src/pages/LogPage.js");

var _AutopilotPage = __webpack_require__(/*! ../pages/AutopilotPage */ "./src/pages/AutopilotPage/AutopilotPage.js");

var App = exports.App = function App() {
    return React.createElement(
        _reactRouterDom.HashRouter,
        null,
        React.createElement(
            _reactReflex.ReflexContainer,
            { orientation: 'vertical' },
            React.createElement(
                _reactReflex.ReflexElement,
                { flex: .2 },
                React.createElement(_SidebarMenu.SidebarMenu, null)
            ),
            React.createElement(_reactReflex.ReflexSplitter, null),
            React.createElement(
                _reactReflex.ReflexElement,
                null,
                React.createElement(
                    _reactRouterDom.Switch,
                    null,
                    React.createElement(_reactRouterDom.Route, { path: '/log', component: _LogPage.LogPage }),
                    React.createElement(_reactRouterDom.Route, { path: '/autopilot', component: _AutopilotPage.AutopilotPage }),
                    React.createElement(_reactRouterDom.Route, { component: _HomePage.HomePage })
                )
            )
        )
    );
};

/***/ }),

/***/ "./src/components/Component.js":
/*!*************************************!*\
  !*** ./src/components/Component.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _react = __webpack_require__(/*! react */ "../node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = exports.Component = _react2.default.Component;

/***/ }),

/***/ "./src/components/SidebarMenu.js":
/*!***************************************!*\
  !*** ./src/components/SidebarMenu.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(BS) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SidebarMenu = undefined;

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/es/index.js");

var SidebarMenu = exports.SidebarMenu = function SidebarMenu() {
    return React.createElement(
        BS.ListGroup,
        null,
        React.createElement(
            BS.ListGroupItem,
            null,
            React.createElement(
                _reactRouterDom.Link,
                { to: "/log" },
                "Log"
            )
        ),
        React.createElement(
            BS.ListGroupItem,
            null,
            React.createElement(
                _reactRouterDom.Link,
                { to: "/autopilot" },
                "Autopilot"
            )
        )
    );
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react-bootstrap */ "../node_modules/react-bootstrap/es/index.js")))

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(/*! react */ "../node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "../node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(/*! ./components/App */ "./src/components/App.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.React = _react2.default;


_reactDom2.default.render(_react2.default.createElement(_App.App, null), document.querySelector('#app'));

/***/ }),

/***/ "./src/pages/AutopilotPage/AdjustableValuesBox.js":
/*!********************************************************!*\
  !*** ./src/pages/AutopilotPage/AdjustableValuesBox.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _AutopilotClientStore = __webpack_require__(/*! ../../stores/AutopilotClientStore */ "./src/stores/AutopilotClientStore.js");

var _Component2 = __webpack_require__(/*! ../../components/Component */ "./src/components/Component.js");

var _mobxReact = __webpack_require__(/*! mobx-react */ "../node_modules/mobx-react/index.module.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValueField = __webpack_require__(/*! ./ValueField */ "./src/pages/AutopilotPage/ValueField.js");
var PureComponent = __webpack_require__(/*! ./PureComponent */ "./src/pages/AutopilotPage/PureComponent.js");
var _ = __webpack_require__(/*! lodash */ "../node_modules/lodash/lodash.js");


var eventToString = __webpack_require__(/*! key-event-to-string */ "../node_modules/key-event-to-string/index.js")({
    cmd: "cmd",
    ctrl: "ctrl",
    alt: "alt",
    shift: "shift",
    joinWith: "-"
});

var adjustableValues = [{ key: 'rudderTime', text: 'RudderTime', inc: 10 }, { key: 'rudderWait', text: 'Rudder Wait', inc: 10 }, { key: 'rudderMult', text: 'Rudder mult', inc: 5 }, { key: 'smoothing', text: 'Smoothing', inc: 10 }, { key: 'kP', text: 'P', inc: 0.05 }, { key: 'kI', text: 'I', inc: 0.01 }, { key: 'kD', text: 'D', inc: 0.01 }];

var AdjustableValuesBox = (0, _mobxReact.observer)(_class = function (_Component) {
    _inherits(AdjustableValuesBox, _Component);

    function AdjustableValuesBox(props) {
        _classCallCheck(this, AdjustableValuesBox);

        var _this = _possibleConstructorReturn(this, (AdjustableValuesBox.__proto__ || Object.getPrototypeOf(AdjustableValuesBox)).call(this, props));

        _this.state = { adjustableValueIdx: 0 };
        _this.keyUpListener = _this.onKeyUp.bind(_this);
        document.addEventListener('keyup', _this.keyUpListener);
        return _this;
    }

    _createClass(AdjustableValuesBox, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('keyup', this.keyUpListener);
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(ev) {
            var key = eventToString(ev);
            key === 'Down' && this.downArrow();
            key === 'Up' && this.upArrow();
            key === 'shift-Left' && this.shiftLeft();
            key === 'shift-Right' && this.shiftRight();
        }
    }, {
        key: 'downArrow',
        value: function downArrow() {
            this.setState({ adjustableValueIdx: this.state.adjustableValueIdx < adjustableValues.length - 1 ? this.state.adjustableValueIdx + 1 : 0 });
        }
    }, {
        key: 'upArrow',
        value: function upArrow() {
            this.setState({ adjustableValueIdx: this.state.adjustableValueIdx === 0 ? Object.keys(adjustableValues).length - 1 : this.state.adjustableValueIdx - 1 });
        }
    }, {
        key: 'shiftLeft',
        value: function shiftLeft() {
            var item = adjustableValues[this.state.adjustableValueIdx];
            (0, _AutopilotClientStore.sendToAutopilot)(_defineProperty({}, item.key, _AutopilotClientStore.values.get(item.key) - item.inc));
        }
    }, {
        key: 'shiftRight',
        value: function shiftRight() {
            var item = adjustableValues[this.state.adjustableValueIdx];
            (0, _AutopilotClientStore.sendToAutopilot)(_defineProperty({}, item.key, _AutopilotClientStore.values.get(item.key) + item.inc));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                null,
                adjustableValues.map(function (v, idx) {
                    return React.createElement(
                        ValueField,
                        { key: v.key, label: v.text },
                        React.createElement(
                            'span',
                            { key: v.key, style: idx === _this2.state.adjustableValueIdx ? style.highlighted : {} },
                            _AutopilotClientStore.values.get(v.key)
                        )
                    );
                })
            );
        }
    }]);

    return AdjustableValuesBox;
}(_Component2.Component)) || _class;

var style = {
    highlighted: {
        backgroundColor: 'black',
        color: 'white'
    }
};

module.exports = AdjustableValuesBox;

/***/ }),

/***/ "./src/pages/AutopilotPage/AutopilotPage.js":
/*!**************************************************!*\
  !*** ./src/pages/AutopilotPage/AutopilotPage.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AutopilotPage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = __webpack_require__(/*! ../../components/Component */ "./src/components/Component.js");

var _simpleMonads = __webpack_require__(/*! simple-monads */ "../node_modules/simple-monads/lib/simple-monads.js");

var _AutopilotClientStore = __webpack_require__(/*! ../../stores/AutopilotClientStore */ "./src/stores/AutopilotClientStore.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Col = __webpack_require__(/*! react-bootstrap/lib/Col */ "../node_modules/react-bootstrap/lib/Col.js");
var Row = __webpack_require__(/*! react-bootstrap/lib/Row */ "../node_modules/react-bootstrap/lib/Row.js");
var Grid = __webpack_require__(/*! react-bootstrap/lib/Grid */ "../node_modules/react-bootstrap/lib/Grid.js");
var Well = __webpack_require__(/*! react-bootstrap/lib/Well */ "../node_modules/react-bootstrap/lib/Well.js");

var ValuesBox = __webpack_require__(/*! ./ValuesBox */ "./src/pages/AutopilotPage/ValuesBox.js");
var ExtraBox = __webpack_require__(/*! ./ExtraBox */ "./src/pages/AutopilotPage/ExtraBox.js");
var AdjustableValuesBox = __webpack_require__(/*! ./AdjustableValuesBox */ "./src/pages/AutopilotPage/AdjustableValuesBox.js");
var PresetsSelect = __webpack_require__(/*! ./PresetsSelect */ "./src/pages/AutopilotPage/PresetsSelect.js");

var AutopilotPage = exports.AutopilotPage = function (_Component) {
    _inherits(AutopilotPage, _Component);

    function AutopilotPage(props) {
        _classCallCheck(this, AutopilotPage);

        var _this = _possibleConstructorReturn(this, (AutopilotPage.__proto__ || Object.getPrototypeOf(AutopilotPage)).call(this, props));

        document.addEventListener('keyup', _this.keyListener);
        return _this;
    }

    _createClass(AutopilotPage, [{
        key: 'keyListener',
        value: function keyListener(key) {
            key.code === 'KeyC' && _simpleMonads.Either.of(_AutopilotClientStore.values.get('course')).cata(function () {
                return (0, _AutopilotClientStore.sendToAutopilot)({ course: _AutopilotClientStore.values.get('heading') });
            }, function () {
                return (0, _AutopilotClientStore.sendToAutopilot)({ course: undefined });
            });

            key.code === 'ArrowRight' && _simpleMonads.Maybe.of(_AutopilotClientStore.values.get('course')).map(function (course) {
                return (0, _AutopilotClientStore.sendToAutopilot)({ course: course + 1 });
            });

            key.code === 'ArrowLeft' && _simpleMonads.Maybe.of(_AutopilotClientStore.values.get('course')).map(function (course) {
                return (0, _AutopilotClientStore.sendToAutopilot)({ course: course - 1 });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('keyup', this.keyListener);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                Grid,
                { fluid: true },
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { style: { paddingBottom: 5 } },
                        React.createElement(PresetsSelect, null)
                    )
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { xs: 6 },
                        React.createElement(
                            Well,
                            null,
                            React.createElement(ValuesBox, null),
                            React.createElement(AdjustableValuesBox, null)
                        )
                    ),
                    React.createElement(
                        Col,
                        { xs: 6 },
                        React.createElement(
                            Well,
                            null,
                            React.createElement(ExtraBox, null)
                        )
                    )
                )
            );
        }
    }]);

    return AutopilotPage;
}(_Component2.Component);

/***/ }),

/***/ "./src/pages/AutopilotPage/Color.js":
/*!******************************************!*\
  !*** ./src/pages/AutopilotPage/Color.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../../../../autopilot/utils */ "../autopilot/utils.js");

module.exports = function (_ref) {
    var children = _ref.children;
    return _.isNumber(children) ? colorIt(children) : 'N/A';
};

var colorIt = function colorIt(num) {
    var value = utils.fixed(num, 3);
    var color = 'black';
    num > 0 && (color = 'green');
    num < 0 && (color = 'red');

    return React.createElement(
        'span',
        { style: { color: color } },
        value
    );
};

/***/ }),

/***/ "./src/pages/AutopilotPage/ExtraBox.js":
/*!*********************************************!*\
  !*** ./src/pages/AutopilotPage/ExtraBox.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _Component2 = __webpack_require__(/*! ../../components/Component */ "./src/components/Component.js");

var _AutopilotClientStore = __webpack_require__(/*! ../../stores/AutopilotClientStore */ "./src/stores/AutopilotClientStore.js");

var _mobxReact = __webpack_require__(/*! mobx-react */ "../node_modules/mobx-react/index.module.js");

var _simpleMonads = __webpack_require__(/*! simple-monads */ "../node_modules/simple-monads/lib/simple-monads.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValueField = __webpack_require__(/*! ./ValueField */ "./src/pages/AutopilotPage/ValueField.js");
var Color = __webpack_require__(/*! ./Color */ "./src/pages/AutopilotPage/Color.js");
var utils = __webpack_require__(/*! ../../../../autopilot/utils */ "../autopilot/utils.js");

var ExtraBox = (0, _mobxReact.observer)(_class = function (_Component) {
    _inherits(ExtraBox, _Component);

    function ExtraBox(props) {
        _classCallCheck(this, ExtraBox);

        var _this = _possibleConstructorReturn(this, (ExtraBox.__proto__ || Object.getPrototypeOf(ExtraBox)).call(this, props));

        _AutopilotClientStore.values.get('voltage') || _AutopilotClientStore.values.set('voltage', 1023);

        _this.maxDly = 0;
        _this.maxMaxDly = 0;
        _this.minHz = 999999;

        setInterval(function () {
            return _this.minHz = 999999;
        }, 5000);
        setInterval(function () {
            _this.maxMaxDly = Math.max(_this.maxMaxDly, _this.maxDly);
            _this.maxDly = 0;
        }, 1000 * 60 * 5);
        return _this;
    }

    _createClass(ExtraBox, [{
        key: 'convertToVolts',
        value: function convertToVolts(num) {
            return utils.fixed(num * .0049 * (1000 + 220) / 220);
        }
    }, {
        key: 'render',
        value: function render() {
            this.maxDly = isNaN(this.maxDly) ? 0 : Math.max(_AutopilotClientStore.values.get('compassDelay'), this.maxDly);
            this.minHz = Math.min(_AutopilotClientStore.values.get('hz'), this.minHz);
            return React.createElement(
                'div',
                null,
                React.createElement(
                    ValueField,
                    { label: 'Roll' },
                    React.createElement(
                        Color,
                        null,
                        _AutopilotClientStore.values.get('roll')
                    )
                ),
                React.createElement(
                    ValueField,
                    { label: 'Pitch' },
                    React.createElement(
                        Color,
                        null,
                        _AutopilotClientStore.values.get('pitch')
                    ),
                    ' '
                ),
                React.createElement(
                    ValueField,
                    { label: 'HZ' },
                    _AutopilotClientStore.values.get('hz')
                ),
                React.createElement(
                    ValueField,
                    { label: 'Min HZ' },
                    this.minHz
                ),
                React.createElement(
                    ValueField,
                    { label: 'R State' },
                    _AutopilotClientStore.values.get('rudderState')
                ),
                React.createElement(
                    ValueField,
                    { label: 'Base' },
                    _AutopilotClientStore.values.get('prevBase')
                ),
                React.createElement(
                    ValueField,
                    { label: 'Tach' },
                    _AutopilotClientStore.values.get('prevTach')
                ),
                React.createElement(
                    ValueField,
                    { label: 'Speed' },
                    _AutopilotClientStore.values.get('prevSpeed')
                ),
                React.createElement(
                    ValueField,
                    { label: 'Cmps Dly' },
                    _AutopilotClientStore.values.get('compassDelay')
                ),
                React.createElement(
                    ValueField,
                    { label: 'Max Dly' },
                    this.maxDly,
                    ' (',
                    this.maxMaxDly,
                    ')'
                )
            );
        }
    }]);

    return ExtraBox;
}(_Component2.Component)) || _class;

;

module.exports = ExtraBox;

/***/ }),

/***/ "./src/pages/AutopilotPage/Label.js":
/*!******************************************!*\
  !*** ./src/pages/AutopilotPage/Label.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Col = __webpack_require__(/*! react-bootstrap/lib/Col */ "../node_modules/react-bootstrap/lib/Col.js");

module.exports = function (_ref) {
    var children = _ref.children;
    return React.createElement(
        Col,
        { xs: 4 },
        React.createElement(
            'label',
            null,
            children,
            ':'
        )
    );
};

/***/ }),

/***/ "./src/pages/AutopilotPage/PresetsSelect.js":
/*!**************************************************!*\
  !*** ./src/pages/AutopilotPage/PresetsSelect.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _Component2 = __webpack_require__(/*! ../../components/Component */ "./src/components/Component.js");

var _mobxReact = __webpack_require__(/*! mobx-react */ "../node_modules/mobx-react/index.module.js");

var _AutopilotClientStore = __webpack_require__(/*! ../../stores/AutopilotClientStore */ "./src/stores/AutopilotClientStore.js");

var _simpleMonads = __webpack_require__(/*! simple-monads */ "../node_modules/simple-monads/lib/simple-monads.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var presets = __webpack_require__(/*! ../../../../autopilot/presets */ "../autopilot/presets.js");
var _ = __webpack_require__(/*! lodash */ "../node_modules/lodash/lodash.js");
var DropdownButton = __webpack_require__(/*! react-bootstrap/lib/DropdownButton */ "../node_modules/react-bootstrap/lib/DropdownButton.js");
var MenuItem = __webpack_require__(/*! react-bootstrap/lib/MenuItem */ "../node_modules/react-bootstrap/lib/MenuItem.js");

var PresetsSelect = (0, _mobxReact.observer)(_class = function (_Component) {
    _inherits(PresetsSelect, _Component);

    function PresetsSelect() {
        _classCallCheck(this, PresetsSelect);

        return _possibleConstructorReturn(this, (PresetsSelect.__proto__ || Object.getPrototypeOf(PresetsSelect)).apply(this, arguments));
    }

    _createClass(PresetsSelect, [{
        key: 'updatePresets',
        value: function updatePresets(preset) {
            (0, _AutopilotClientStore.sendToAutopilot)({ preset: preset });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _simpleMonads.Maybe.of(_AutopilotClientStore.values.get('preset')).map(function (preset) {
                return React.createElement(
                    DropdownButton,
                    { id: 'preset-select', onSelect: _this2.updatePresets.bind(_this2), title: _.get(presets[preset], 'text') },
                    _.map(presets, function (v, k) {
                        return React.createElement(
                            MenuItem,
                            { key: k, eventKey: k },
                            v.text
                        );
                    })
                );
            }).getOrElse(null);
        }
    }]);

    return PresetsSelect;
}(_Component2.Component)) || _class;

module.exports = PresetsSelect;

/***/ }),

/***/ "./src/pages/AutopilotPage/PureComponent.js":
/*!**************************************************!*\
  !*** ./src/pages/AutopilotPage/PureComponent.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = __webpack_require__(/*! ../../components/Component */ "./src/components/Component.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_Component) {
    _inherits(PureComponent, _Component);

    function PureComponent() {
        _classCallCheck(this, PureComponent);

        return _possibleConstructorReturn(this, (PureComponent.__proto__ || Object.getPrototypeOf(PureComponent)).apply(this, arguments));
    }

    _createClass(PureComponent, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(newProps, newState) {
            return _.isEqual(newProps, this.props) && _.isEqual(newState, this.state);
        }
    }]);

    return PureComponent;
}(_Component2.Component);

/***/ }),

/***/ "./src/pages/AutopilotPage/Value.js":
/*!******************************************!*\
  !*** ./src/pages/AutopilotPage/Value.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Col = __webpack_require__(/*! react-bootstrap/lib/Col */ "../node_modules/react-bootstrap/lib/Col.js");

module.exports = function (_ref) {
  var children = _ref.children;
  return React.createElement(
    Col,
    { xs: 8 },
    children
  );
};

/***/ }),

/***/ "./src/pages/AutopilotPage/ValueField.js":
/*!***********************************************!*\
  !*** ./src/pages/AutopilotPage/ValueField.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Label = __webpack_require__(/*! ./Label */ "./src/pages/AutopilotPage/Label.js");
var Value = __webpack_require__(/*! ./Value */ "./src/pages/AutopilotPage/Value.js");
var Row = __webpack_require__(/*! react-bootstrap/lib/Row */ "../node_modules/react-bootstrap/lib/Row.js");

module.exports = function (_ref) {
    var label = _ref.label,
        children = _ref.children;
    return React.createElement(
        Row,
        null,
        React.createElement(
            Label,
            null,
            label
        ),
        React.createElement(
            Value,
            null,
            children === undefined ? 'undefined' : (typeof children === 'undefined' ? 'undefined' : _typeof(children)) === 'object' ? children : children.toString()
        )
    );
};

/***/ }),

/***/ "./src/pages/AutopilotPage/ValuesBox.js":
/*!**********************************************!*\
  !*** ./src/pages/AutopilotPage/ValuesBox.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _Component2 = __webpack_require__(/*! ../../components/Component */ "./src/components/Component.js");

var _mobxReact = __webpack_require__(/*! mobx-react */ "../node_modules/mobx-react/index.module.js");

var _AutopilotClientStore = __webpack_require__(/*! ../../stores/AutopilotClientStore */ "./src/stores/AutopilotClientStore.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValueField = __webpack_require__(/*! ./ValueField */ "./src/pages/AutopilotPage/ValueField.js");
var Color = __webpack_require__(/*! ./Color */ "./src/pages/AutopilotPage/Color.js");

var ValuesBox = (0, _mobxReact.observer)(_class = function (_Component) {
    _inherits(ValuesBox, _Component);

    function ValuesBox() {
        _classCallCheck(this, ValuesBox);

        return _possibleConstructorReturn(this, (ValuesBox.__proto__ || Object.getPrototypeOf(ValuesBox)).apply(this, arguments));
    }

    _createClass(ValuesBox, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    ValueField,
                    { label: 'Course' },
                    _AutopilotClientStore.values.get('course') !== undefined ? _AutopilotClientStore.values.get('course') : 'N/A'
                ),
                React.createElement(
                    ValueField,
                    { label: 'Heading' },
                    _AutopilotClientStore.values.get('heading')
                ),
                React.createElement(
                    ValueField,
                    { label: 'Error' },
                    React.createElement(
                        Color,
                        null,
                        _AutopilotClientStore.values.get('error')
                    )
                ),
                React.createElement(
                    ValueField,
                    { label: 'Rudder' },
                    React.createElement(
                        Color,
                        null,
                        _AutopilotClientStore.values.get('course') === undefined ? 'N/A' : _AutopilotClientStore.values.get('rudder')
                    ),
                    ' '
                )
            );
        }
    }]);

    return ValuesBox;
}(_Component2.Component)) || _class;

;

module.exports = ValuesBox;

/***/ }),

/***/ "./src/pages/HomePage.js":
/*!*******************************!*\
  !*** ./src/pages/HomePage.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var HomePage = exports.HomePage = function HomePage() {
    return React.createElement(
        "div",
        null,
        "This is home"
    );
};

/***/ }),

/***/ "./src/pages/LogPage.js":
/*!******************************!*\
  !*** ./src/pages/LogPage.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LogPage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _mobxReact = __webpack_require__(/*! mobx-react */ "../node_modules/mobx-react/index.module.js");

var _react = __webpack_require__(/*! react */ "../node_modules/react/index.js");

var _LogStore = __webpack_require__(/*! ../stores/LogStore */ "./src/stores/LogStore.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogPage = exports.LogPage = (0, _mobxReact.observer)(_class = function (_Component) {
    _inherits(LogPage, _Component);

    function LogPage() {
        _classCallCheck(this, LogPage);

        return _possibleConstructorReturn(this, (LogPage.__proto__ || Object.getPrototypeOf(LogPage)).apply(this, arguments));
    }

    _createClass(LogPage, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { onClick: _LogStore.clearLogMessages },
                    'Clear'
                ),
                (0, _LogStore.getLogMessages)().map(function (msg, idx) {
                    return React.createElement(
                        'div',
                        { key: idx },
                        msg.level,
                        ': ',
                        msg.msg
                    );
                })
            );
        }
    }]);

    return LogPage;
}(_react.Component)) || _class;

/***/ }),

/***/ "./src/stores/AutopilotClientStore.js":
/*!********************************************!*\
  !*** ./src/stores/AutopilotClientStore.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendToAutopilot = exports.values = undefined;

var _mobx = __webpack_require__(/*! mobx */ "../node_modules/mobx/lib/mobx.module.js");

var _networkBus = __webpack_require__(/*! ../../../network/networkBus */ "../network/networkBus.js");

var values = exports.values = _mobx.observable.map();
global.values = values;

(0, _networkBus.onBusMessage)('AUTOPILOT', function (obj) {
  return values.merge(obj);
});
(0, _networkBus.onBusMessage)('COMPASS_DELAY', function (obj) {
  return values.merge({ compassDelay: obj.delay });
});

var sendToAutopilot = exports.sendToAutopilot = function sendToAutopilot(obj) {
  return (0, _networkBus.sendMessage)('AUTOPILOT', obj);
};

/***/ }),

/***/ "./src/stores/LogStore.js":
/*!********************************!*\
  !*** ./src/stores/LogStore.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearLogMessages = exports.getLogMessages = undefined;

var _mobx = __webpack_require__(/*! mobx */ "../node_modules/mobx/lib/mobx.module.js");

var _require$remote$requi = __webpack_require__(/*! electron */ "electron").remote.require('../network/networkBus'),
    onBusMessage = _require$remote$requi.onBusMessage;

var log = _mobx.observable.array([]);

var getLogMessages = exports.getLogMessages = function getLogMessages() {
  return log;
};
var clearLogMessages = exports.clearLogMessages = log.clear.bind(log);

onBusMessage('LOG', function (msg) {
  return log.push(msg);
});

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2F1dG9waWxvdC9wcmVzZXRzLmpzIiwid2VicGFjazovLy8uLi9hdXRvcGlsb3QvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25ldHdvcmsvbmV0d29ya0J1cy5qcyIsIndlYnBhY2s6Ly8vLi4vbmV0d29yay91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZmxleC9zdHlsZXMuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU2lkZWJhck1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9BdXRvcGlsb3RQYWdlL0FkanVzdGFibGVWYWx1ZXNCb3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL0F1dG9waWxvdFBhZ2UvQXV0b3BpbG90UGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvQXV0b3BpbG90UGFnZS9Db2xvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvQXV0b3BpbG90UGFnZS9FeHRyYUJveC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvQXV0b3BpbG90UGFnZS9MYWJlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvQXV0b3BpbG90UGFnZS9QcmVzZXRzU2VsZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9BdXRvcGlsb3RQYWdlL1B1cmVDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL0F1dG9waWxvdFBhZ2UvVmFsdWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL0F1dG9waWxvdFBhZ2UvVmFsdWVGaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvQXV0b3BpbG90UGFnZS9WYWx1ZXNCb3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL0hvbWVQYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9Mb2dQYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZXMvQXV0b3BpbG90Q2xpZW50U3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3Jlcy9Mb2dTdG9yZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZXh0IiwidmFsdWVzIiwicnVkZGVyVGltZSIsInJ1ZGRlcldhaXQiLCJrUCIsImtJIiwia0QiLCJydWRkZXJNdWx0IiwiXyIsInJlcXVpcmUiLCJmaXhlZCIsIm4iLCJwbGFjZXMiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsImdldERpcmVjdGlvbmFsRGlmZiIsImFuZ2xlMSIsImFuZ2xlMiIsImRpZmYiLCJub3ciLCJEYXRlIiwiZ2V0VGltZSIsIm9ialRvTXNnIiwibXNnVG9PYmoiLCJpcGMiLCJjb25maWciLCJpZCIsInJldHJ5Iiwic2lsZW50IiwibGlzdGVuZXJzIiwiY29ubmVjdFRvIiwib2YiLCJvbiIsIm1zZyIsIm9iaiIsImV2ZW50IiwiZm9yRWFjaCIsImxpc3RlbmVyIiwiZGF0YSIsIm9uQnVzTWVzc2FnZSIsInB1c2giLCJzZW5kTWVzc2FnZSIsImVtaXQiLCJudWxsVG9VbmRlZmluZWQiLCJyZWR1Y2UiLCJyZXN1bHQiLCJ2IiwiayIsImlzUGxhaW5PYmplY3QiLCJ1bmRlZmluZWQiLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJBcHAiLCJMb2dQYWdlIiwiQXV0b3BpbG90UGFnZSIsIkhvbWVQYWdlIiwiQ29tcG9uZW50IiwiUmVhY3QiLCJTaWRlYmFyTWVudSIsImdsb2JhbCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiVmFsdWVGaWVsZCIsIlB1cmVDb21wb25lbnQiLCJldmVudFRvU3RyaW5nIiwiY21kIiwiY3RybCIsImFsdCIsInNoaWZ0Iiwiam9pbldpdGgiLCJhZGp1c3RhYmxlVmFsdWVzIiwia2V5IiwiaW5jIiwiQWRqdXN0YWJsZVZhbHVlc0JveCIsIm9ic2VydmVyIiwicHJvcHMiLCJzdGF0ZSIsImFkanVzdGFibGVWYWx1ZUlkeCIsImtleVVwTGlzdGVuZXIiLCJvbktleVVwIiwiYmluZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXYiLCJkb3duQXJyb3ciLCJ1cEFycm93Iiwic2hpZnRMZWZ0Iiwic2hpZnRSaWdodCIsInNldFN0YXRlIiwibGVuZ3RoIiwiT2JqZWN0Iiwia2V5cyIsIml0ZW0iLCJnZXQiLCJtYXAiLCJpZHgiLCJzdHlsZSIsImhpZ2hsaWdodGVkIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJDb2wiLCJSb3ciLCJHcmlkIiwiV2VsbCIsIlZhbHVlc0JveCIsIkV4dHJhQm94IiwiUHJlc2V0c1NlbGVjdCIsImtleUxpc3RlbmVyIiwiY29kZSIsIkVpdGhlciIsImNhdGEiLCJjb3Vyc2UiLCJNYXliZSIsInBhZGRpbmdCb3R0b20iLCJ1dGlscyIsImNoaWxkcmVuIiwiaXNOdW1iZXIiLCJjb2xvckl0IiwibnVtIiwidmFsdWUiLCJDb2xvciIsInNldCIsIm1heERseSIsIm1heE1heERseSIsIm1pbkh6Iiwic2V0SW50ZXJ2YWwiLCJNYXRoIiwibWF4IiwiaXNOYU4iLCJtaW4iLCJwcmVzZXRzIiwiRHJvcGRvd25CdXR0b24iLCJNZW51SXRlbSIsInByZXNldCIsInVwZGF0ZVByZXNldHMiLCJnZXRPckVsc2UiLCJuZXdQcm9wcyIsIm5ld1N0YXRlIiwiaXNFcXVhbCIsIkxhYmVsIiwiVmFsdWUiLCJsYWJlbCIsImNsZWFyTG9nTWVzc2FnZXMiLCJsZXZlbCIsIm9ic2VydmFibGUiLCJtZXJnZSIsImNvbXBhc3NEZWxheSIsImRlbGF5Iiwic2VuZFRvQXV0b3BpbG90IiwicmVtb3RlIiwibG9nIiwiYXJyYXkiLCJnZXRMb2dNZXNzYWdlcyIsImNsZWFyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDYixtQkFBZTtBQUNYQyxjQUFNLDBCQURLO0FBRVhDLGdCQUFRO0FBQ0pDLHdCQUFZLEdBRFI7QUFFSkMsd0JBQVksR0FGUjtBQUdKQyxnQkFBSSxDQUhBO0FBSUpDLGdCQUFJLElBSkE7QUFLSkMsZ0JBQUksSUFMQTtBQU1KQyx3QkFBWTtBQU5SO0FBRkcsS0FERjtBQVliLGtCQUFjO0FBQ1ZQLGNBQU0sNEJBREk7QUFFVkMsZ0JBQVE7QUFDSkMsd0JBQVksR0FEUjtBQUVKQyx3QkFBWSxHQUZSO0FBR0pDLGdCQUFJLEdBSEE7QUFJSkMsZ0JBQUks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QUFBLFNBQU9BLE9BQU9xSixLQUFQLENBQWFwSCxHQUFiLENBQVA7QUFBQSxDQUExQjtBQUNBLDhCQUFhLGVBQWIsRUFBOEI7QUFBQSxTQUFPakMsT0FBT3FKLEtBQVAsQ0FBYSxFQUFDQyxjQUFjckgsSUFBSXNILEtBQW5CLEVBQWIsQ0FBUDtBQUFBLENBQTlCOztBQUdPLElBQU1DLDRDQUFrQixTQUFsQkEsZUFBa0I7QUFBQSxTQUFPLDZCQUFZLFdBQVosRUFBeUJ2SCxHQUF6QixDQUFQO0FBQUEsQ0FBeEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BQOzs0QkFIdUJ6QixtQkFBT0EsQ0FBQywwQkFBUixFQUFvQmlKLE1BQXBCLENBQTJCakosT0FBM0IsQ0FBbUMsdUJBQW5DLEM7SUFBaEI4QixZLHlCQUFBQSxZOztBQUlQLElBQU1vSCxNQUFNTixpQkFBV08sS0FBWCxDQUFpQixFQUFqQixDQUFaOztBQUVPLElBQU1DLDBDQUFpQixTQUFqQkEsY0FBaUI7QUFBQSxTQUFNRixHQUFOO0FBQUEsQ0FBdkI7QUFDQSxJQUFNUiw4Q0FBbUJRLElBQUlHLEtBQUosQ0FBVXpFLElBQVYsQ0FBZXNFLEdBQWYsQ0FBekI7O0FBRVBwSCxhQUFhLEtBQWIsRUFBb0I7QUFBQSxTQUFPb0gsSUFBSW5ILElBQUosQ0FBU1AsR0FBVCxDQUFQO0FBQUEsQ0FBcEIsRTs7Ozs7Ozs7Ozs7QUNUQSxxQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBcIm1vdG9yLWxpZ2h0XCI6IHtcbiAgICAgICAgdGV4dDogJ01vdG9yIC0gbGlnaHQgY29uZGl0aW9ucycsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgcnVkZGVyVGltZTogMjAwLFxuICAgICAgICAgICAgcnVkZGVyV2FpdDogMjAwLFxuICAgICAgICAgICAga1A6IDEsXG4gICAgICAgICAgICBrSTogMC4wNCxcbiAgICAgICAgICAgIGtEOiAwLjAyLFxuICAgICAgICAgICAgcnVkZGVyTXVsdDogMTAwXG4gICAgICAgIH1cbiAgICB9LFxuICAgICdzYWlsLWxpZ2h0Jzoge1xuICAgICAgICB0ZXh0OiAnU2FpbGluZyAtIGxpZ2h0IGNvbmRpdGlvbnMnLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHJ1ZGRlclRpbWU6IDIwMCxcbiAgICAgICAgICAgIHJ1ZGRlcldhaXQ6IDIwMCxcbiAgICAgICAgICAgIGtQOiAwLjYsXG4gICAgICAgICAgICBrSTogMC4wNixcbiAgICAgICAgICAgIGtEOiAwLjAyLFxuICAgICAgICAgICAgcnVkZGVyTXVsdDogNjVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgJ3NhaWwtbGlnaHQtbWVkLWRvd25oaWxsJzoge1xuICAgICAgICB0ZXh0OiAnU2FpbGluZyAtIGxpZ2h0L21lZCBkb3duaGlsbCcsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgcnVkZGVyVGltZTogMjAwLFxuICAgICAgICAgICAgcnVkZGVyV2FpdDogMjAwLFxuICAgICAgICAgICAga1A6IDEsXG4gICAgICAgICAgICBrSTogMC4wNCxcbiAgICAgICAgICAgIGtEOiAwLjAyLFxuICAgICAgICAgICAgcnVkZGVyTXVsdDogMTAwXG4gICAgICAgIH1cbiAgICB9LFxuICAgICdzYWlsLW1lZC1oZWF2eS1kb3duaGlsbCc6IHtcbiAgICAgICAgdGV4dDogJ1NhaWxpbmcgLSBtZWQvaGVhdnkgZG93bmhpbGwnLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHJ1ZGRlclRpbWU6IDIwMCxcbiAgICAgICAgICAgIHJ1ZGRlcldhaXQ6IDQwMCxcbiAgICAgICAgICAgIHJ1ZGRlck11bHQ6IDEwMCxcbiAgICAgICAgICAgIGtQOiAzLFxuICAgICAgICAgICAga0k6IC4wNCxcbiAgICAgICAgICAgIGtEOiAuMDMsXG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cbiIsImNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZml4ZWQ6IChuLCBwbGFjZXMgPSAxKSA9PiBwYXJzZUZsb2F0KHBhcnNlRmxvYXQobiwgMTApLnRvRml4ZWQocGxhY2VzKSksXG5cbiAgICBnZXREaXJlY3Rpb25hbERpZmYoYW5nbGUxLCBhbmdsZTIpIHtcbiAgICAgICAgdmFyIGRpZmYgPSBhbmdsZTIgLSBhbmdsZTE7XG4gICAgICAgIGlmIChkaWZmIDwgLTE4MCkgZGlmZiArPSAzNjA7XG4gICAgICAgIGlmIChkaWZmID4gMTgwKSBkaWZmIC09IDM2MDtcbiAgICAgICAgcmV0dXJuIGRpZmY7XG4gICAgfSxcblxuICAgIG5vdzogKCkgPT4gbmV3IERhdGUoKS5nZXRUaW1lKCksXG59O1xuXG4iLCJjb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCB7b2JqVG9Nc2csIG1zZ1RvT2JqfSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuXG5jb25zdCBpcGMgPSByZXF1aXJlKCdub2RlLWlwYycpO1xuXG5pcGMuY29uZmlnLmlkID0gJ2JvYXQtc3lzdGVtcyc7XG5pcGMuY29uZmlnLnJldHJ5ID0gMTUwMDtcbmlwYy5jb25maWcuc2lsZW50ID0gdHJ1ZTtcblxuXG5jb25zdCBsaXN0ZW5lcnMgPSB7fTtcblxuaXBjLmNvbm5lY3RUbyhcbiAgICAnYm9hdC1zeXN0ZW1zJyxcbiAgICAoKSA9PiB7XG4gICAgICAgIGlwYy5vZlsnYm9hdC1zeXN0ZW1zJ10ub24oXG4gICAgICAgICAgICAnbWVzc2FnZScsXG4gICAgICAgICAgICAobXNnKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0gbXNnVG9PYmoobXNnKTtcbiAgICAgICAgICAgICAgICAobGlzdGVuZXJzW29iai5ldmVudF0gfHwgW10pLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIob2JqLmRhdGEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4pO1xuXG5cbm1vZHVsZS5leHBvcnRzLm9uQnVzTWVzc2FnZSA9IChldmVudCwgbGlzdGVuZXIpID0+IHtcbiAgICBsaXN0ZW5lcnNbZXZlbnRdID0gbGlzdGVuZXJzW2V2ZW50XSB8fCBbXTtcbiAgICBsaXN0ZW5lcnNbZXZlbnRdLnB1c2gobGlzdGVuZXIpXG59O1xuXG5tb2R1bGUuZXhwb3J0cy5zZW5kTWVzc2FnZSA9IChldmVudCwgZGF0YSkgPT5cbiAgICBpcGMub2ZbJ2JvYXQtc3lzdGVtcyddLmVtaXQoJ21lc3NhZ2UnLCBvYmpUb01zZyh7ZXZlbnQ6IGV2ZW50LCBkYXRhOiBkYXRhfSkpO1xuXG5cblxuXG5cblxuLy9zZXRUaW1lb3V0KCgpID0+IG1vZHVsZS5leHBvcnRzLnNlbmQoJ0xPRycsIHttc2c6ICdoZXJlIGlzIHRoZSBsb2cgbWVzc2FnZSd9KSwgNTAwMCk7XG5cbi8vc2V0VGltZW91dCgoKSA9PiBtb2R1bGUuZXhwb3J0cy5zZW5kKCdNWV9FVkVOVCcsIHtmb286IDF9KSwgNTAwMCk7XG4vL3NldFRpbWVvdXQoKCkgPT4gbmV0d29ya1NvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHtldmVudDogJ01ZX0VWRU5UJywgZm9vOiAyfSksIFBPUlQsICBJUF9BRERSRVNTKSwgNTAwMCk7XG5cbiIsImNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxuY29uc3QgbnVsbFRvVW5kZWZpbmVkID0gIG9iaiA9PiBfLnJlZHVjZShvYmosIChyZXN1bHQsIHYsIGspID0+IHtcbiAgICBfLmlzUGxhaW5PYmplY3QodikgPyAoXG4gICAgICAgIHJlc3VsdFtrXSA9IG51bGxUb1VuZGVmaW5lZCh2KVxuICAgICkgOiAoXG4gICAgICAgIHJlc3VsdFtrXSA9IHYgPT09IG51bGwgPyB1bmRlZmluZWQgOiB2XG4gICAgKSA7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn0sIHt9KTtcblxubW9kdWxlLmV4cG9ydHMub2JqVG9Nc2cgPSBvYmogPT4gYCQke0pTT04uc3RyaW5naWZ5KG9iaiwgKGssIHYpID0+IHYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiB2KX1cXG5gO1xuXG5tb2R1bGUuZXhwb3J0cy5tc2dUb09iaiA9IG1zZyA9PiBudWxsVG9VbmRlZmluZWQoSlNPTi5wYXJzZShtc2cudG9TdHJpbmcoKS5yZXBsYWNlKC9eXFwkLywgJycpKSk7XG5cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vYm9vdHN0cmFwLm1pbi5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2Jvb3RzdHJhcC5taW4uY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2Jvb3RzdHJhcC5taW4uY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZXMuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZXMuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlcy5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQge0hhc2hSb3V0ZXIsIFN3aXRjaCwgUm91dGV9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQge1JlZmxleENvbnRhaW5lciwgUmVmbGV4RWxlbWVudCwgUmVmbGV4U3BsaXR0ZXJ9IGZyb20gJ3JlYWN0LXJlZmxleCdcbmltcG9ydCAncmVhY3QtcmVmbGV4L3N0eWxlcy5jc3MnXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzcydcblxuaW1wb3J0IHtTaWRlYmFyTWVudX0gZnJvbSBcIi4vU2lkZWJhck1lbnVcIjtcbmltcG9ydCB7SG9tZVBhZ2V9IGZyb20gXCIuLi9wYWdlcy9Ib21lUGFnZVwiO1xuaW1wb3J0IHtMb2dQYWdlfSBmcm9tIFwiLi4vcGFnZXMvTG9nUGFnZVwiO1xuaW1wb3J0IHtBdXRvcGlsb3RQYWdlfSBmcm9tIFwiLi4vcGFnZXMvQXV0b3BpbG90UGFnZVwiO1xuXG5cbmV4cG9ydCBjb25zdCBBcHAgPSAoKSA9PiAoXG4gICAgPEhhc2hSb3V0ZXI+XG4gICAgICAgIDxSZWZsZXhDb250YWluZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgICAgICAgPFJlZmxleEVsZW1lbnQgZmxleD17LjJ9PlxuICAgICAgICAgICAgICAgIDxTaWRlYmFyTWVudSAvPlxuICAgICAgICAgICAgPC9SZWZsZXhFbGVtZW50PlxuICAgICAgICAgICAgPFJlZmxleFNwbGl0dGVyIC8+XG4gICAgICAgICAgICA8UmVmbGV4RWxlbWVudD5cbiAgICAgICAgICAgICAgICA8U3dpdGNoPlxuICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9sb2dcIiBjb21wb25lbnQ9e0xvZ1BhZ2V9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2F1dG9waWxvdFwiIGNvbXBvbmVudD17QXV0b3BpbG90UGFnZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIGNvbXBvbmVudD17SG9tZVBhZ2V9Lz5cbiAgICAgICAgICAgICAgICA8L1N3aXRjaD5cbiAgICAgICAgICAgIDwvUmVmbGV4RWxlbWVudD5cbiAgICAgICAgPC9SZWZsZXhDb250YWluZXI+XG4gICAgPC9IYXNoUm91dGVyPlxuKTsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBjb25zdCBDb21wb25lbnQgPSBSZWFjdC5Db21wb25lbnQ7IiwiaW1wb3J0IHtMaW5rfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuXG5leHBvcnQgY29uc3QgU2lkZWJhck1lbnUgPSAoKSA9PiAoXG4gICAgPEJTLkxpc3RHcm91cD5cbiAgICAgICAgPEJTLkxpc3RHcm91cEl0ZW0+XG4gICAgICAgICAgICA8TGluayB0bz1cIi9sb2dcIj5Mb2c8L0xpbms+XG4gICAgICAgIDwvQlMuTGlzdEdyb3VwSXRlbT5cbiAgICAgICAgPEJTLkxpc3RHcm91cEl0ZW0+XG4gICAgICAgICAgICA8TGluayB0bz1cIi9hdXRvcGlsb3RcIj5BdXRvcGlsb3Q8L0xpbms+XG4gICAgICAgIDwvQlMuTGlzdEdyb3VwSXRlbT5cbiAgICA8L0JTLkxpc3RHcm91cD5cbik7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuZ2xvYmFsLlJlYWN0ID0gUmVhY3RcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQge0FwcH0gZnJvbSBcIi4vY29tcG9uZW50cy9BcHBcIjtcblxuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpKTtcblxuIiwiaW1wb3J0IHtzZW5kVG9BdXRvcGlsb3QsIHZhbHVlc30gZnJvbSBcIi4uLy4uL3N0b3Jlcy9BdXRvcGlsb3RDbGllbnRTdG9yZVwiO1xuXG5jb25zdCBWYWx1ZUZpZWxkID0gcmVxdWlyZSgnLi9WYWx1ZUZpZWxkJyk7XG5jb25zdCBQdXJlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9QdXJlQ29tcG9uZW50Jyk7XG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvQ29tcG9uZW50XCI7XG5pbXBvcnQge29ic2VydmVyfSBmcm9tICdtb2J4LXJlYWN0J1xuXG5cbmNvbnN0IGV2ZW50VG9TdHJpbmcgPSByZXF1aXJlKCdrZXktZXZlbnQtdG8tc3RyaW5nJykoe1xuICAgIGNtZDogXCJjbWRcIixcbiAgICBjdHJsOiBcImN0cmxcIixcbiAgICBhbHQ6IFwiYWx0XCIsXG4gICAgc2hpZnQ6IFwic2hpZnRcIixcbiAgICBqb2luV2l0aDogXCItXCJcbn0pO1xuXG5jb25zdCBhZGp1c3RhYmxlVmFsdWVzID0gW1xuICAgIHtrZXk6ICdydWRkZXJUaW1lJywgdGV4dDogJ1J1ZGRlclRpbWUnLCBpbmM6IDEwfSxcbiAgICB7a2V5OiAncnVkZGVyV2FpdCcsIHRleHQ6ICdSdWRkZXIgV2FpdCcsIGluYzogMTB9LFxuICAgIHtrZXk6ICdydWRkZXJNdWx0JywgdGV4dDogJ1J1ZGRlciBtdWx0JywgaW5jOiA1fSxcbiAgICB7a2V5OiAnc21vb3RoaW5nJywgdGV4dDogJ1Ntb290aGluZycsIGluYzogMTB9LFxuICAgIHtrZXk6ICdrUCcsIHRleHQ6ICdQJywgaW5jOiAwLjA1fSxcbiAgICB7a2V5OiAna0knLCB0ZXh0OiAnSScsIGluYzogMC4wMX0sXG4gICAge2tleTogJ2tEJywgdGV4dDogJ0QnLCBpbmM6IDAuMDF9LFxuXTtcblxuQG9ic2VydmVyXG5jbGFzcyBBZGp1c3RhYmxlVmFsdWVzQm94IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHthZGp1c3RhYmxlVmFsdWVJZHg6IDB9O1xuICAgICAgICB0aGlzLmtleVVwTGlzdGVuZXIgPSB0aGlzLm9uS2V5VXAuYmluZCh0aGlzKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmtleVVwTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMua2V5VXBMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgb25LZXlVcChldikge1xuICAgICAgICBjb25zdCBrZXkgPSBldmVudFRvU3RyaW5nKGV2KTtcbiAgICAgICAga2V5ID09PSAnRG93bicgJiYgdGhpcy5kb3duQXJyb3coKTtcbiAgICAgICAga2V5ID09PSAnVXAnICYmIHRoaXMudXBBcnJvdygpO1xuICAgICAgICBrZXkgPT09ICdzaGlmdC1MZWZ0JyAmJiB0aGlzLnNoaWZ0TGVmdCgpO1xuICAgICAgICBrZXkgPT09ICdzaGlmdC1SaWdodCcgJiYgdGhpcy5zaGlmdFJpZ2h0KCk7XG4gICAgfVxuXG4gICAgZG93bkFycm93KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthZGp1c3RhYmxlVmFsdWVJZHg6IHRoaXMuc3RhdGUuYWRqdXN0YWJsZVZhbHVlSWR4IDwgYWRqdXN0YWJsZVZhbHVlcy5sZW5ndGggLSAxID8gdGhpcy5zdGF0ZS5hZGp1c3RhYmxlVmFsdWVJZHggKyAxIDogMH0pO1xuICAgIH1cblxuICAgIHVwQXJyb3coKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FkanVzdGFibGVWYWx1ZUlkeDogdGhpcy5zdGF0ZS5hZGp1c3RhYmxlVmFsdWVJZHggPT09IDAgPyBPYmplY3Qua2V5cyhhZGp1c3RhYmxlVmFsdWVzKS5sZW5ndGggLSAxIDogdGhpcy5zdGF0ZS5hZGp1c3RhYmxlVmFsdWVJZHggLSAxfSk7XG4gICAgfVxuXG4gICAgc2hpZnRMZWZ0KCkge1xuICAgICAgICBjb25zdCBpdGVtID0gYWRqdXN0YWJsZVZhbHVlc1t0aGlzLnN0YXRlLmFkanVzdGFibGVWYWx1ZUlkeF07XG4gICAgICAgIHNlbmRUb0F1dG9waWxvdCh7W2l0ZW0ua2V5XTogdmFsdWVzLmdldChpdGVtLmtleSkgLSBpdGVtLmluY30pO1xuICAgIH1cblxuICAgIHNoaWZ0UmlnaHQoKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBhZGp1c3RhYmxlVmFsdWVzW3RoaXMuc3RhdGUuYWRqdXN0YWJsZVZhbHVlSWR4XTtcbiAgICAgICAgc2VuZFRvQXV0b3BpbG90KHtbaXRlbS5rZXldOiB2YWx1ZXMuZ2V0KGl0ZW0ua2V5KSArIGl0ZW0uaW5jfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7YWRqdXN0YWJsZVZhbHVlcy5tYXAoKHYsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPFZhbHVlRmllbGQga2V5PXt2LmtleX0gbGFiZWw9e3YudGV4dH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXt2LmtleX0gc3R5bGU9e2lkeCA9PT0gdGhpcy5zdGF0ZS5hZGp1c3RhYmxlVmFsdWVJZHggPyBzdHlsZS5oaWdobGlnaHRlZCA6IHt9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlcy5nZXQodi5rZXkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVmFsdWVGaWVsZD5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNvbnN0IHN0eWxlID0ge1xuICAgIGhpZ2hsaWdodGVkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFkanVzdGFibGVWYWx1ZXNCb3g7XG5cbiIsImNvbnN0IENvbCA9IHJlcXVpcmUoJ3JlYWN0LWJvb3RzdHJhcC9saWIvQ29sJyk7XG5jb25zdCBSb3cgPSByZXF1aXJlKCdyZWFjdC1ib290c3RyYXAvbGliL1JvdycpO1xuY29uc3QgR3JpZCA9IHJlcXVpcmUoJ3JlYWN0LWJvb3RzdHJhcC9saWIvR3JpZCcpO1xuY29uc3QgV2VsbCA9IHJlcXVpcmUoJ3JlYWN0LWJvb3RzdHJhcC9saWIvV2VsbCcpO1xuXG5jb25zdCBWYWx1ZXNCb3ggPSByZXF1aXJlKCcuL1ZhbHVlc0JveCcpO1xuY29uc3QgRXh0cmFCb3ggPSByZXF1aXJlKCcuL0V4dHJhQm94Jyk7XG5jb25zdCBBZGp1c3RhYmxlVmFsdWVzQm94ID0gcmVxdWlyZSgnLi9BZGp1c3RhYmxlVmFsdWVzQm94Jyk7XG5jb25zdCBQcmVzZXRzU2VsZWN0ID0gcmVxdWlyZSgnLi9QcmVzZXRzU2VsZWN0Jyk7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvQ29tcG9uZW50XCI7XG5pbXBvcnQge01heWJlLCBFaXRoZXJ9IGZyb20gJ3NpbXBsZS1tb25hZHMnXG5pbXBvcnQge3ZhbHVlcywgc2VuZFRvQXV0b3BpbG90fSBmcm9tIFwiLi4vLi4vc3RvcmVzL0F1dG9waWxvdENsaWVudFN0b3JlXCI7XG5cbmV4cG9ydCBjbGFzcyBBdXRvcGlsb3RQYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmtleUxpc3RlbmVyKTtcbiAgICB9XG5cblxua2V5TGlzdGVuZXIoa2V5KSB7XG4gICAgICAgIGtleS5jb2RlID09PSAnS2V5QycgJiZcbiAgICAgICAgRWl0aGVyLm9mKHZhbHVlcy5nZXQoJ2NvdXJzZScpKVxuICAgICAgICAgICAgLmNhdGEoXG4gICAgICAgICAgICAgICAgKCkgPT4gc2VuZFRvQXV0b3BpbG90KHtjb3Vyc2U6IHZhbHVlcy5nZXQoJ2hlYWRpbmcnKX0pLFxuICAgICAgICAgICAgICAgICgpID0+IHNlbmRUb0F1dG9waWxvdCh7Y291cnNlOiB1bmRlZmluZWR9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBrZXkuY29kZSA9PT0gJ0Fycm93UmlnaHQnICYmIChcbiAgICAgICAgICAgIE1heWJlLm9mKHZhbHVlcy5nZXQoJ2NvdXJzZScpKVxuICAgICAgICAgICAgICAgIC5tYXAoY291cnNlID0+IHNlbmRUb0F1dG9waWxvdCh7Y291cnNlOiBjb3Vyc2UgKyAxfSkpXG4gICAgICAgICk7XG5cbiAgICAgICAga2V5LmNvZGUgPT09ICdBcnJvd0xlZnQnICYmIChcbiAgICAgICAgICAgIE1heWJlLm9mKHZhbHVlcy5nZXQoJ2NvdXJzZScpKVxuICAgICAgICAgICAgICAgIC5tYXAoY291cnNlID0+IHNlbmRUb0F1dG9waWxvdCh7Y291cnNlOiBjb3Vyc2UgLSAxfSkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5rZXlMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdyaWQgZmx1aWQ+XG4gICAgICAgICAgICAgICAgPFJvdz5cbiAgICAgICAgICAgICAgICAgICAgPENvbCBzdHlsZT17e3BhZGRpbmdCb3R0b206IDV9fT48UHJlc2V0c1NlbGVjdC8+PC9Db2w+XG4gICAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICAgICAgPFJvdz5cbiAgICAgICAgICAgICAgICAgICAgPENvbCB4cz17Nn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8V2VsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmFsdWVzQm94Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWRqdXN0YWJsZVZhbHVlc0JveC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1dlbGw+XG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgICAgICAgICA8Q29sIHhzPXs2fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxXZWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHRyYUJveC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1dlbGw+XG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgICAgIDwvUm93PlxuICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuIiwiY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9hdXRvcGlsb3QvdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoe2NoaWxkcmVufSkgPT4gXy5pc051bWJlcihjaGlsZHJlbikgPyBjb2xvckl0KGNoaWxkcmVuKSA6ICdOL0EnO1xuXG5jb25zdCBjb2xvckl0ID0gKG51bSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gdXRpbHMuZml4ZWQobnVtLCAzKTtcbiAgICBsZXQgY29sb3IgPSAnYmxhY2snO1xuICAgIG51bSA+IDAgJiYgKGNvbG9yID0gJ2dyZWVuJyk7XG4gICAgbnVtIDwgMCAmJiAoY29sb3IgPSAncmVkJyk7XG5cbiAgICByZXR1cm4gPHNwYW4gc3R5bGU9e3tjb2xvcjogY29sb3J9fT57dmFsdWV9PC9zcGFuPlxufTtcbiIsImNvbnN0IFZhbHVlRmllbGQgPSByZXF1aXJlKCcuL1ZhbHVlRmllbGQnKTtcbmNvbnN0IENvbG9yID0gcmVxdWlyZSgnLi9Db2xvcicpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9hdXRvcGlsb3QvdXRpbHMnKTtcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9Db21wb25lbnRcIjtcbmltcG9ydCB7dmFsdWVzfSBmcm9tIFwiLi4vLi4vc3RvcmVzL0F1dG9waWxvdENsaWVudFN0b3JlXCI7XG5pbXBvcnQge29ic2VydmVyfSBmcm9tICdtb2J4LXJlYWN0J1xuaW1wb3J0IHtNYXliZX0gZnJvbSAnc2ltcGxlLW1vbmFkcydcblxuQG9ic2VydmVyXG5jbGFzcyBFeHRyYUJveCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHZhbHVlcy5nZXQoJ3ZvbHRhZ2UnKSB8fCB2YWx1ZXMuc2V0KCd2b2x0YWdlJywgMTAyMyk7XG5cbiAgICAgICAgdGhpcy5tYXhEbHkgPSAwO1xuICAgICAgICB0aGlzLm1heE1heERseSA9IDA7XG4gICAgICAgIHRoaXMubWluSHogPSA5OTk5OTk7XG5cbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5taW5IeiA9IDk5OTk5OSwgNTAwMCk7XG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWF4TWF4RGx5ID0gTWF0aC5tYXgodGhpcy5tYXhNYXhEbHksIHRoaXMubWF4RGx5KTtcbiAgICAgICAgICAgIHRoaXMubWF4RGx5ID0gMDtcbiAgICAgICAgfSwgMTAwMCAqIDYwICogNSk7XG4gICAgfVxuXG4gICAgY29udmVydFRvVm9sdHMobnVtKSB7XG4gICAgICAgIHJldHVybiB1dGlscy5maXhlZCgobnVtICogLjAwNDkpICogKDEwMDAgKyAyMjApIC8gMjIwKTtcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5tYXhEbHkgPSBpc05hTih0aGlzLm1heERseSkgPyAwIDogTWF0aC5tYXgodmFsdWVzLmdldCgnY29tcGFzc0RlbGF5JyksIHRoaXMubWF4RGx5KTtcbiAgICAgICAgdGhpcy5taW5IeiA9IE1hdGgubWluKHZhbHVlcy5nZXQoJ2h6JyksIHRoaXMubWluSHopO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8VmFsdWVGaWVsZCBsYWJlbD1cIlJvbGxcIj48Q29sb3I+e3ZhbHVlcy5nZXQoJ3JvbGwnKX08L0NvbG9yPjwvVmFsdWVGaWVsZD5cbiAgICAgICAgICAgICAgICA8VmFsdWVGaWVsZCBsYWJlbD1cIlBpdGNoXCI+PENvbG9yPnt2YWx1ZXMuZ2V0KCdwaXRjaCcpfTwvQ29sb3I+IDwvVmFsdWVGaWVsZD5cbiAgICAgICAgICAgICAgICA8VmFsdWVGaWVsZCBsYWJlbD1cIkhaXCI+e3ZhbHVlcy5nZXQoJ2h6Jyl9PC9WYWx1ZUZpZWxkPlxuICAgICAgICAgICAgICAgIDxWYWx1ZUZpZWxkIGxhYmVsPVwiTWluIEhaXCI+e3RoaXMubWluSHp9PC9WYWx1ZUZpZWxkPlxuICAgICAgICAgICAgICAgIDxWYWx1ZUZpZWxkIGxhYmVsPVwiUiBTdGF0ZVwiPnt2YWx1ZXMuZ2V0KCdydWRkZXJTdGF0ZScpfTwvVmFsdWVGaWVsZD5cbiAgICAgICAgICAgICAgICA8VmFsdWVGaWVsZCBsYWJlbD1cIkJhc2VcIj57dmFsdWVzLmdldCgncHJldkJhc2UnKX08L1ZhbHVlRmllbGQ+XG4gICAgICAgICAgICAgICAgPFZhbHVlRmllbGQgbGFiZWw9XCJUYWNoXCI+e3ZhbHVlcy5nZXQoJ3ByZXZUYWNoJyl9PC9WYWx1ZUZpZWxkPlxuICAgICAgICAgICAgICAgIDxWYWx1ZUZpZWxkIGxhYmVsPVwiU3BlZWRcIj57dmFsdWVzLmdldCgncHJldlNwZWVkJyl9PC9WYWx1ZUZpZWxkPlxuICAgICAgICAgICAgICAgIDxWYWx1ZUZpZWxkIGxhYmVsPVwiQ21wcyBEbHlcIj57dmFsdWVzLmdldCgnY29tcGFzc0RlbGF5Jyl9PC9WYWx1ZUZpZWxkPlxuICAgICAgICAgICAgICAgIDxWYWx1ZUZpZWxkIGxhYmVsPVwiTWF4IERseVwiPnt0aGlzLm1heERseX0gKHt0aGlzLm1heE1heERseX0pPC9WYWx1ZUZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4dHJhQm94O1xuXG5cbiIsImNvbnN0IENvbCA9IHJlcXVpcmUoJ3JlYWN0LWJvb3RzdHJhcC9saWIvQ29sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHtjaGlsZHJlbn0pID0+IChcbiAgICA8Q29sIHhzPXs0fT48bGFiZWw+e2NoaWxkcmVufTo8L2xhYmVsPjwvQ29sPlxuKTsiLCJjb25zdCBwcmVzZXRzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vYXV0b3BpbG90L3ByZXNldHMnKTtcbmNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IERyb3Bkb3duQnV0dG9uID0gcmVxdWlyZSgncmVhY3QtYm9vdHN0cmFwL2xpYi9Ecm9wZG93bkJ1dHRvbicpO1xuY29uc3QgTWVudUl0ZW0gPSByZXF1aXJlKCdyZWFjdC1ib290c3RyYXAvbGliL01lbnVJdGVtJyk7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvQ29tcG9uZW50XCI7XG5pbXBvcnQge29ic2VydmVyfSBmcm9tICdtb2J4LXJlYWN0J1xuaW1wb3J0IHtzZW5kVG9BdXRvcGlsb3QsIHZhbHVlc30gZnJvbSBcIi4uLy4uL3N0b3Jlcy9BdXRvcGlsb3RDbGllbnRTdG9yZVwiO1xuaW1wb3J0IHtNYXliZX0gZnJvbSAnc2ltcGxlLW1vbmFkcydcblxuQG9ic2VydmVyXG5jbGFzcyBQcmVzZXRzU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIHVwZGF0ZVByZXNldHMocHJlc2V0KSB7XG4gICAgICAgIHNlbmRUb0F1dG9waWxvdCh7cHJlc2V0OiBwcmVzZXR9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBNYXliZS5vZih2YWx1ZXMuZ2V0KCdwcmVzZXQnKSlcbiAgICAgICAgICAgIC5tYXAocHJlc2V0ID0+IChcbiAgICAgICAgICAgICAgICA8RHJvcGRvd25CdXR0b24gaWQ9XCJwcmVzZXQtc2VsZWN0XCIgb25TZWxlY3Q9e3RoaXMudXBkYXRlUHJlc2V0cy5iaW5kKHRoaXMpfSB0aXRsZT17Xy5nZXQocHJlc2V0c1twcmVzZXRdLCAndGV4dCcpfT5cbiAgICAgICAgICAgICAgICAgICAge18ubWFwKHByZXNldHMsICh2LCBrKSA9PiA8TWVudUl0ZW0ga2V5PXtrfSBldmVudEtleT17a30+e3YudGV4dH08L01lbnVJdGVtPil9XG4gICAgICAgICAgICAgICAgPC9Ecm9wZG93bkJ1dHRvbj5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgICAuZ2V0T3JFbHNlKG51bGwpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQcmVzZXRzU2VsZWN0OyIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9Db21wb25lbnRcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBQdXJlQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV3UHJvcHMsIG5ld1N0YXRlKSB7XG4gICAgICAgIHJldHVybiBfLmlzRXF1YWwobmV3UHJvcHMsIHRoaXMucHJvcHMpICYmIF8uaXNFcXVhbChuZXdTdGF0ZSwgdGhpcy5zdGF0ZSk7XG4gICAgfVxufTsiLCJjb25zdCBDb2wgPSByZXF1aXJlKCdyZWFjdC1ib290c3RyYXAvbGliL0NvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh7Y2hpbGRyZW59KSA9PiA8Q29sIHhzPXs4fT57Y2hpbGRyZW59PC9Db2w+O1xuIiwiY29uc3QgTGFiZWwgPSByZXF1aXJlKCcuL0xhYmVsJyk7XG5jb25zdCBWYWx1ZSA9IHJlcXVpcmUoJy4vVmFsdWUnKTtcbmNvbnN0IFJvdyA9IHJlcXVpcmUoJ3JlYWN0LWJvb3RzdHJhcC9saWIvUm93Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHtsYWJlbCwgY2hpbGRyZW59KSA9PiAoXG4gICAgPFJvdz5cbiAgICAgICAgPExhYmVsPntsYWJlbH08L0xhYmVsPlxuICAgICAgICA8VmFsdWU+e2NoaWxkcmVuID09PSB1bmRlZmluZWQgID8gJ3VuZGVmaW5lZCcgOiB0eXBlb2YgY2hpbGRyZW4gPT09ICdvYmplY3QnID8gY2hpbGRyZW4gOiBjaGlsZHJlbi50b1N0cmluZygpfTwvVmFsdWU+XG4gICAgPC9Sb3c+XG4pO1xuXG4iLCJjb25zdCBWYWx1ZUZpZWxkID0gcmVxdWlyZSgnLi9WYWx1ZUZpZWxkJyk7XG5jb25zdCBDb2xvciA9IHJlcXVpcmUoJy4vQ29sb3InKTtcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9Db21wb25lbnRcIjtcbmltcG9ydCB7b2JzZXJ2ZXJ9IGZyb20gJ21vYngtcmVhY3QnXG5pbXBvcnQge3ZhbHVlc30gZnJvbSBcIi4uLy4uL3N0b3Jlcy9BdXRvcGlsb3RDbGllbnRTdG9yZVwiO1xuXG5Ab2JzZXJ2ZXJcbmNsYXNzIFZhbHVlc0JveCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8VmFsdWVGaWVsZCBsYWJlbD1cIkNvdXJzZVwiPnt2YWx1ZXMuZ2V0KCdjb3Vyc2UnKSAhPT0gdW5kZWZpbmVkID8gdmFsdWVzLmdldCgnY291cnNlJykgOiAnTi9BJ308L1ZhbHVlRmllbGQ+XG4gICAgICAgICAgICAgICAgPFZhbHVlRmllbGQgbGFiZWw9XCJIZWFkaW5nXCI+e3ZhbHVlcy5nZXQoJ2hlYWRpbmcnKX08L1ZhbHVlRmllbGQ+XG5cbiAgICAgICAgICAgICAgICA8VmFsdWVGaWVsZCBsYWJlbD1cIkVycm9yXCI+PENvbG9yPnt2YWx1ZXMuZ2V0KCdlcnJvcicpfTwvQ29sb3I+PC9WYWx1ZUZpZWxkPlxuICAgICAgICAgICAgICAgIDxWYWx1ZUZpZWxkIGxhYmVsPVwiUnVkZGVyXCI+PENvbG9yPnt2YWx1ZXMuZ2V0KCdjb3Vyc2UnKSA9PT0gdW5kZWZpbmVkID8gJ04vQScgOiB2YWx1ZXMuZ2V0KCdydWRkZXInKX08L0NvbG9yPiA8L1ZhbHVlRmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsdWVzQm94OyIsImV4cG9ydCBjb25zdCBIb21lUGFnZSA9ICgpID0+IChcbiAgICA8ZGl2PlxuICAgICAgICBUaGlzIGlzIGhvbWVcbiAgICA8L2Rpdj5cbik7IiwiaW1wb3J0IHtvYnNlcnZlcn0gZnJvbSAnbW9ieC1yZWFjdCdcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7Z2V0TG9nTWVzc2FnZXMsIGNsZWFyTG9nTWVzc2FnZXN9IGZyb20gXCIuLi9zdG9yZXMvTG9nU3RvcmVcIjtcblxuQG9ic2VydmVyXG5leHBvcnQgY2xhc3MgTG9nUGFnZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2NsZWFyTG9nTWVzc2FnZXN9PkNsZWFyPC9idXR0b24+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBnZXRMb2dNZXNzYWdlcygpLm1hcCgobXNnLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0+e21zZy5sZXZlbH06IHttc2cubXNnfTwvZGl2PlxuICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59IiwiaW1wb3J0IHtvYnNlcnZhYmxlLCBhdXRvcnVuLCBleHRlbmRPYnNlcnZhYmxlLCB0b0pTfSBmcm9tICdtb2J4J1xuaW1wb3J0IHtvbkJ1c01lc3NhZ2UsIHNlbmRNZXNzYWdlfSBmcm9tICcuLi8uLi8uLi9uZXR3b3JrL25ldHdvcmtCdXMnO1xuXG5leHBvcnQgY29uc3QgdmFsdWVzID0gb2JzZXJ2YWJsZS5tYXAoKTtcbmdsb2JhbC52YWx1ZXMgPSB2YWx1ZXM7XG5cbm9uQnVzTWVzc2FnZSgnQVVUT1BJTE9UJywgb2JqID0+IHZhbHVlcy5tZXJnZShvYmopKTtcbm9uQnVzTWVzc2FnZSgnQ09NUEFTU19ERUxBWScsIG9iaiA9PiB2YWx1ZXMubWVyZ2Uoe2NvbXBhc3NEZWxheTogb2JqLmRlbGF5fSkpO1xuXG5cbmV4cG9ydCBjb25zdCBzZW5kVG9BdXRvcGlsb3QgPSBvYmogPT4gc2VuZE1lc3NhZ2UoJ0FVVE9QSUxPVCcsIG9iaik7XG5cblxuXG5cblxuIiwiY29uc3Qge29uQnVzTWVzc2FnZX0gPSByZXF1aXJlKCdlbGVjdHJvbicpLnJlbW90ZS5yZXF1aXJlKCcuLi9uZXR3b3JrL25ldHdvcmtCdXMnKTtcblxuXG5pbXBvcnQge29ic2VydmFibGV9IGZyb20gJ21vYngnXG5jb25zdCBsb2cgPSBvYnNlcnZhYmxlLmFycmF5KFtdKTtcblxuZXhwb3J0IGNvbnN0IGdldExvZ01lc3NhZ2VzID0gKCkgPT4gbG9nO1xuZXhwb3J0IGNvbnN0IGNsZWFyTG9nTWVzc2FnZXMgPSBsb2cuY2xlYXIuYmluZChsb2cpO1xuXG5vbkJ1c01lc3NhZ2UoJ0xPRycsIG1zZyA9PiBsb2cucHVzaChtc2cpKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9