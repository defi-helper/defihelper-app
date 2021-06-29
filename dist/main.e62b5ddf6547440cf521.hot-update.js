webpackHotUpdate("main",{

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _wallets_networks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wallets/networks */ "./src/wallets/networks/index.ts");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router */ "./src/router/index.ts");
/* harmony import */ var _common_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/dialog */ "./src/common/dialog/index.ts");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifications */ "./src/notifications/index.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./users */ "./src/users/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/app.tsx",
    _s = __webpack_require__.$Refresh$.signature();







const App = () => {
  _s();

  Object(_wallets_networks__WEBPACK_IMPORTED_MODULE_0__["useNetwork"])();
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(_common_dialog__WEBPACK_IMPORTED_MODULE_2__["DialogProvider"], {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(_notifications__WEBPACK_IMPORTED_MODULE_3__["NotificationsProvider"], {
      maxItems: 6,
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(_users__WEBPACK_IMPORTED_MODULE_4__["UserProvider"], {
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(_router__WEBPACK_IMPORTED_MODULE_1__["Router"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 14,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 11,
    columnNumber: 5
  }, undefined);
};

_s(App, "MSIQhN/WbHE6vX/DcEpPgIbjKlI=", false, function () {
  return [_wallets_networks__WEBPACK_IMPORTED_MODULE_0__["useNetwork"]];
});

_c = App;

var _c;

__webpack_require__.$Refresh$.register(_c, "App");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/common/confirm-dialog/confirm-dialog.tsx":
/*!******************************************************!*\
  !*** ./src/common/confirm-dialog/confirm-dialog.tsx ***!
  \******************************************************/
/*! exports provided: ConfirmDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmDialog", function() { return ConfirmDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _common_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/common/dialog */ "./src/common/dialog/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/common/confirm-dialog/confirm-dialog.tsx";





const ConfirmDialog = props => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_common_dialog__WEBPACK_IMPORTED_MODULE_3__["Dialog"], {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1__["default"], {
      children: "Are you sure?"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onClick: () => props.onConfirm(),
      children: "yes"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onClick: () => props.onCancel(),
      children: "no"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }, undefined);
};
_c = ConfirmDialog;

var _c;

__webpack_require__.$Refresh$.register(_c, "ConfirmDialog");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/common/confirm-dialog/index.ts":
/*!********************************************!*\
  !*** ./src/common/confirm-dialog/index.ts ***!
  \********************************************/
/*! exports provided: ConfirmDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _confirm_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./confirm-dialog */ "./src/common/confirm-dialog/confirm-dialog.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfirmDialog", function() { return _confirm_dialog__WEBPACK_IMPORTED_MODULE_0__["ConfirmDialog"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/common/cut-account.ts":
/*!***********************************!*\
  !*** ./src/common/cut-account.ts ***!
  \***********************************/
/*! exports provided: cutAccount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cutAccount", function() { return cutAccount; });
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

const cutAccount = account => {
  if (!account) return;
  return `${account.substring(0, 6)}...${account.substring(account.length - 4, account.length)}`;
};

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/common/history.ts":
/*!*******************************!*\
  !*** ./src/common/history.ts ***!
  \*******************************/
/*! exports provided: history */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "history", function() { return history; });
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);


const history = Object(history__WEBPACK_IMPORTED_MODULE_0__["createBrowserHistory"])();

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/common/hooks/index.ts":
/*!***********************************!*\
  !*** ./src/common/hooks/index.ts ***!
  \***********************************/
/*! exports provided: useQueryParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _use_query_params__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-query-params */ "./src/common/hooks/use-query-params.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useQueryParams", function() { return _use_query_params__WEBPACK_IMPORTED_MODULE_0__["useQueryParams"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/common/hooks/use-query-params.ts":
/*!**********************************************!*\
  !*** ./src/common/hooks/use-query-params.ts ***!
  \**********************************************/
/*! exports provided: useQueryParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useQueryParams", function() { return useQueryParams; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _s = __webpack_require__.$Refresh$.signature();



const useQueryParams = () => {
  _s();

  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"])();
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => new URLSearchParams(location.search), [location]);
};

_s(useQueryParams, "2C3fFgfpLfpeuWv7tC/2m+4rlHY=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"]];
});

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/graphql/_generated-types.ts":
/*!*****************************************!*\
  !*** ./src/graphql/_generated-types.ts ***!
  \*****************************************/
/*! exports provided: BlockchainEnum, ContractListSortInputTypeColumnEnum, ContractMetricChartSortInputTypeColumnEnum, MetricGroupEnum, ProposalListSortInputTypeColumnEnum, ProposalStatusEnum, ProtocolListSortInputTypeColumnEnum, ProtocolMetricChartSortInputTypeColumnEnum, SortOrderEnum, UserMetricChartSortInputTypeColumnEnum, UserRoleEnum, VoteListSortInputTypeColumnEnum, WalletContractListSortInputTypeColumnEnum, WalletListSortInputTypeColumnEnum, WalletMetricChartSortInputTypeColumnEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockchainEnum", function() { return BlockchainEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractListSortInputTypeColumnEnum", function() { return ContractListSortInputTypeColumnEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractMetricChartSortInputTypeColumnEnum", function() { return ContractMetricChartSortInputTypeColumnEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricGroupEnum", function() { return MetricGroupEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProposalListSortInputTypeColumnEnum", function() { return ProposalListSortInputTypeColumnEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProposalStatusEnum", function() { return ProposalStatusEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProtocolListSortInputTypeColumnEnum", function() { return ProtocolListSortInputTypeColumnEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProtocolMetricChartSortInputTypeColumnEnum", function() { return ProtocolMetricChartSortInputTypeColumnEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortOrderEnum", function() { return SortOrderEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserMetricChartSortInputTypeColumnEnum", function() { return UserMetricChartSortInputTypeColumnEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRoleEnum", function() { return UserRoleEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoteListSortInputTypeColumnEnum", function() { return VoteListSortInputTypeColumnEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletContractListSortInputTypeColumnEnum", function() { return WalletContractListSortInputTypeColumnEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletListSortInputTypeColumnEnum", function() { return WalletListSortInputTypeColumnEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletMetricChartSortInputTypeColumnEnum", function() { return WalletMetricChartSortInputTypeColumnEnum; });
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

/* eslint-disable */

/** All built-in and custom scalars, mapped to their actual values */
let BlockchainEnum;

(function (BlockchainEnum) {
  BlockchainEnum["Ethereum"] = "ethereum";
  BlockchainEnum["Waves"] = "waves";
})(BlockchainEnum || (BlockchainEnum = {}));

let ContractListSortInputTypeColumnEnum;

(function (ContractListSortInputTypeColumnEnum) {
  ContractListSortInputTypeColumnEnum["Id"] = "id";
  ContractListSortInputTypeColumnEnum["Name"] = "name";
  ContractListSortInputTypeColumnEnum["Address"] = "address";
  ContractListSortInputTypeColumnEnum["CreatedAt"] = "createdAt";
})(ContractListSortInputTypeColumnEnum || (ContractListSortInputTypeColumnEnum = {}));

let ContractMetricChartSortInputTypeColumnEnum;

(function (ContractMetricChartSortInputTypeColumnEnum) {
  ContractMetricChartSortInputTypeColumnEnum["Date"] = "date";
  ContractMetricChartSortInputTypeColumnEnum["Value"] = "value";
})(ContractMetricChartSortInputTypeColumnEnum || (ContractMetricChartSortInputTypeColumnEnum = {}));

let MetricGroupEnum;

(function (MetricGroupEnum) {
  MetricGroupEnum["Hour"] = "hour";
  MetricGroupEnum["Day"] = "day";
  MetricGroupEnum["Week"] = "week";
  MetricGroupEnum["Year"] = "year";
})(MetricGroupEnum || (MetricGroupEnum = {}));

let ProposalListSortInputTypeColumnEnum;

(function (ProposalListSortInputTypeColumnEnum) {
  ProposalListSortInputTypeColumnEnum["Id"] = "id";
  ProposalListSortInputTypeColumnEnum["Title"] = "title";
  ProposalListSortInputTypeColumnEnum["CreatedAt"] = "createdAt";
})(ProposalListSortInputTypeColumnEnum || (ProposalListSortInputTypeColumnEnum = {}));

let ProposalStatusEnum;

(function (ProposalStatusEnum) {
  ProposalStatusEnum["Open"] = "open";
  ProposalStatusEnum["Executed"] = "executed";
  ProposalStatusEnum["Defeated"] = "defeated";
})(ProposalStatusEnum || (ProposalStatusEnum = {}));

let ProtocolListSortInputTypeColumnEnum;

(function (ProtocolListSortInputTypeColumnEnum) {
  ProtocolListSortInputTypeColumnEnum["Id"] = "id";
  ProtocolListSortInputTypeColumnEnum["Name"] = "name";
  ProtocolListSortInputTypeColumnEnum["Address"] = "address";
  ProtocolListSortInputTypeColumnEnum["CreatedAt"] = "createdAt";
})(ProtocolListSortInputTypeColumnEnum || (ProtocolListSortInputTypeColumnEnum = {}));

let ProtocolMetricChartSortInputTypeColumnEnum;

(function (ProtocolMetricChartSortInputTypeColumnEnum) {
  ProtocolMetricChartSortInputTypeColumnEnum["Date"] = "date";
  ProtocolMetricChartSortInputTypeColumnEnum["Value"] = "value";
})(ProtocolMetricChartSortInputTypeColumnEnum || (ProtocolMetricChartSortInputTypeColumnEnum = {}));

let SortOrderEnum;

(function (SortOrderEnum) {
  SortOrderEnum["Asc"] = "asc";
  SortOrderEnum["Desc"] = "desc";
})(SortOrderEnum || (SortOrderEnum = {}));

let UserMetricChartSortInputTypeColumnEnum;

(function (UserMetricChartSortInputTypeColumnEnum) {
  UserMetricChartSortInputTypeColumnEnum["Date"] = "date";
  UserMetricChartSortInputTypeColumnEnum["Value"] = "value";
})(UserMetricChartSortInputTypeColumnEnum || (UserMetricChartSortInputTypeColumnEnum = {}));

let UserRoleEnum;

(function (UserRoleEnum) {
  UserRoleEnum["User"] = "user";
  UserRoleEnum["Admin"] = "admin";
})(UserRoleEnum || (UserRoleEnum = {}));

let VoteListSortInputTypeColumnEnum;

(function (VoteListSortInputTypeColumnEnum) {
  VoteListSortInputTypeColumnEnum["Id"] = "id";
  VoteListSortInputTypeColumnEnum["CreatedAt"] = "createdAt";
})(VoteListSortInputTypeColumnEnum || (VoteListSortInputTypeColumnEnum = {}));

let WalletContractListSortInputTypeColumnEnum;

(function (WalletContractListSortInputTypeColumnEnum) {
  WalletContractListSortInputTypeColumnEnum["Id"] = "id";
  WalletContractListSortInputTypeColumnEnum["Name"] = "name";
  WalletContractListSortInputTypeColumnEnum["Address"] = "address";
  WalletContractListSortInputTypeColumnEnum["CreatedAt"] = "createdAt";
})(WalletContractListSortInputTypeColumnEnum || (WalletContractListSortInputTypeColumnEnum = {}));

let WalletListSortInputTypeColumnEnum;

(function (WalletListSortInputTypeColumnEnum) {
  WalletListSortInputTypeColumnEnum["Id"] = "id";
  WalletListSortInputTypeColumnEnum["Address"] = "address";
  WalletListSortInputTypeColumnEnum["CreatedAt"] = "createdAt";
})(WalletListSortInputTypeColumnEnum || (WalletListSortInputTypeColumnEnum = {}));

let WalletMetricChartSortInputTypeColumnEnum;

(function (WalletMetricChartSortInputTypeColumnEnum) {
  WalletMetricChartSortInputTypeColumnEnum["Date"] = "date";
  WalletMetricChartSortInputTypeColumnEnum["Value"] = "value";
})(WalletMetricChartSortInputTypeColumnEnum || (WalletMetricChartSortInputTypeColumnEnum = {}));

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/layouts/index.ts":
/*!******************************!*\
  !*** ./src/layouts/index.ts ***!
  \******************************/
/*! exports provided: MainLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _main_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-layout */ "./src/layouts/main-layout/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MainLayout", function() { return _main_layout__WEBPACK_IMPORTED_MODULE_0__["MainLayout"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/layouts/main-layout/index.ts":
/*!******************************************!*\
  !*** ./src/layouts/main-layout/index.ts ***!
  \******************************************/
/*! exports provided: MainLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _main_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-layout */ "./src/layouts/main-layout/main-layout.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MainLayout", function() { return _main_layout__WEBPACK_IMPORTED_MODULE_0__["MainLayout"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/layouts/main-layout/main-layout.tsx":
/*!*************************************************!*\
  !*** ./src/layouts/main-layout/main-layout.tsx ***!
  \*************************************************/
/*! exports provided: MainLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainLayout", function() { return MainLayout; });
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Drawer */ "./node_modules/@material-ui/core/esm/Drawer/index.js");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/AppBar */ "./node_modules/@material-ui/core/esm/AppBar/index.js");
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ "./node_modules/@material-ui/core/esm/CssBaseline/index.js");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "./node_modules/@material-ui/core/esm/Toolbar/index.js");
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/List */ "./node_modules/@material-ui/core/esm/List/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Divider */ "./node_modules/@material-ui/core/esm/Divider/index.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/esm/ListItem/index.js");
/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ "./node_modules/@material-ui/core/esm/ListItemIcon/index.js");
/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/ListItemText */ "./node_modules/@material-ui/core/esm/ListItemText/index.js");
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Container */ "./node_modules/@material-ui/core/esm/Container/index.js");
/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Box */ "./node_modules/@material-ui/core/esm/Box/index.js");
/* harmony import */ var _material_ui_icons_Language__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/Language */ "./node_modules/@material-ui/icons/Language.js");
/* harmony import */ var _material_ui_icons_Language__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Language__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_icons_Power__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/icons/Power */ "./node_modules/@material-ui/icons/Power.js");
/* harmony import */ var _material_ui_icons_Power__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Power__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_icons_Dashboard__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/Dashboard */ "./node_modules/@material-ui/icons/Dashboard.js");
/* harmony import */ var _material_ui_icons_Dashboard__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Dashboard__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_icons_Bookmark__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/Bookmark */ "./node_modules/@material-ui/icons/Bookmark.js");
/* harmony import */ var _material_ui_icons_Bookmark__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Bookmark__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/Settings */ "./node_modules/@material-ui/icons/Settings.js");
/* harmony import */ var _material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/core/Menu */ "./node_modules/@material-ui/core/esm/Menu/index.js");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "./node_modules/@material-ui/core/esm/MenuItem/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ~/paths */ "./src/paths.ts");
/* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ~/common/hooks */ "./src/common/hooks/index.ts");
/* harmony import */ var _common_dialog__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ~/common/dialog */ "./src/common/dialog/index.ts");
/* harmony import */ var _wallets_wallet_list__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ~/wallets/wallet-list */ "./src/wallets/wallet-list/index.ts");
/* harmony import */ var _common_cut_account__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ~/common/cut-account */ "./src/common/cut-account.ts");
/* harmony import */ var _wallets_wallet_detail__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ~/wallets/wallet-detail */ "./src/wallets/wallet-detail/index.ts");
/* harmony import */ var _wallets_networks__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ~/wallets/networks */ "./src/wallets/networks/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/layouts/main-layout/main-layout.tsx",
    _s = __webpack_require__.$Refresh$.signature();
































const drawerWidth = 340;
const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["makeStyles"])(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  logo: {
    color: 'inherit',
    textDecoration: 'none'
  },
  actions: {
    marginLeft: 'auto'
  }
}));
const NETWORKS = [{
  title: 'All',
  query: ''
}, {
  title: 'Ethereum',
  query: 'eth'
}, {
  title: 'Binance Smart Chain',
  query: 'bsc'
}, {
  title: 'Waves',
  query: 'waves'
}];
const PROTOCOLS = [{
  id: '1',
  title: '1inch'
}, {
  id: '2',
  title: 'Aave'
}, {
  id: '3',
  title: 'Alchemix'
}];
const MENU = [{
  title: 'Overview',
  icon: _material_ui_icons_Dashboard__WEBPACK_IMPORTED_MODULE_15___default.a
}, {
  title: 'Favorites',
  icon: _material_ui_icons_Bookmark__WEBPACK_IMPORTED_MODULE_16___default.a
}, {
  title: 'Settings',
  icon: _material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_17___default.a
}];
const MainLayout = props => {
  _s();

  const {
    account
  } = Object(_wallets_networks__WEBPACK_IMPORTED_MODULE_29__["useNetworkProvider"])();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = Object(react__WEBPACK_IMPORTED_MODULE_22__["useState"])(null);
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_18__["useHistory"])();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeNetwork = search => {
    history.push({
      pathname: _paths__WEBPACK_IMPORTED_MODULE_23__["paths"].protocols.list,
      search: search ? `network=${search}` : undefined
    });
  };

  const handleChangeLocation = path => history.push(path.toLowerCase());

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const queryParams = Object(_common_hooks__WEBPACK_IMPORTED_MODULE_24__["useQueryParams"])();
  const currentNetwork = Object(react__WEBPACK_IMPORTED_MODULE_22__["useMemo"])(() => {
    var _NETWORKS$find;

    return (_NETWORKS$find = NETWORKS.find(({
      query
    }) => query === queryParams.get('network'))) === null || _NETWORKS$find === void 0 ? void 0 : _NETWORKS$find.title;
  }, [queryParams]);
  const [openWalletList, closeWalletList] = Object(_common_dialog__WEBPACK_IMPORTED_MODULE_25__["useDialog"])(_wallets_wallet_list__WEBPACK_IMPORTED_MODULE_26__["WalletList"]);
  const [openChangeWallet] = Object(_common_dialog__WEBPACK_IMPORTED_MODULE_25__["useDialog"])(_wallets_wallet_detail__WEBPACK_IMPORTED_MODULE_28__["WalletDetail"]);

  const handleOpenWalletList = () => openWalletList({
    onClick: closeWalletList
  }).catch(error => console.error(error.message));

  const handleChangeWallet = () => openChangeWallet({
    onChange: handleOpenWalletList
  }).catch(error => console.error(error.message));

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])("div", {
    className: classes.root,
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_3__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__["default"], {
      position: "fixed",
      className: classes.appBar,
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_4__["default"], {
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], {
          className: classes.logo,
          variant: "h6",
          noWrap: true,
          component: react_router_dom__WEBPACK_IMPORTED_MODULE_18__["Link"],
          to: _paths__WEBPACK_IMPORTED_MODULE_23__["paths"].main,
          children: "DefiHelper.io"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 174,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])("div", {
          className: classes.actions,
          children: [account ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_19__["default"], {
            color: "inherit",
            onClick: handleChangeWallet,
            children: Object(_common_cut_account__WEBPACK_IMPORTED_MODULE_27__["cutAccount"])(account)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 185,
            columnNumber: 15
          }, undefined) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_19__["default"], {
            color: "inherit",
            onClick: handleOpenWalletList,
            children: "Connect wallet"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 189,
            columnNumber: 15
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_19__["default"], {
            "aria-controls": "simple-menu",
            "aria-haspopup": "true",
            onClick: handleClick,
            color: "inherit",
            children: currentNetwork !== null && currentNetwork !== void 0 ? currentNetwork : 'All'
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 193,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 183,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_20__["default"], {
          anchorEl: anchorEl,
          open: Boolean(anchorEl),
          onClose: handleClose,
          children: NETWORKS.map(networkItem => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_21__["default"], {
            onClick: () => handleChangeNetwork(networkItem.query),
            children: networkItem.title
          }, networkItem.title, false, {
            fileName: _jsxFileName,
            lineNumber: 208,
            columnNumber: 15
          }, undefined))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 202,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 173,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.drawer,
      variant: "permanent",
      classes: {
        paper: classes.drawerPaper
      },
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_4__["default"], {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 225,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])("div", {
        className: classes.drawerContainer,
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_5__["default"], {
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_8__["default"], {
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_9__["default"], {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_icons_Language__WEBPACK_IMPORTED_MODULE_13___default.a, {}, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 230,
                columnNumber: 17
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 229,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_10__["default"], {
              primary: "Connected protocols"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 232,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 228,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_5__["default"], {
            children: PROTOCOLS.map(network => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_8__["default"], {
              button: true,
              className: classes.nested,
              onClick: () => handleChangeLocation(_paths__WEBPACK_IMPORTED_MODULE_23__["paths"].protocols.detail(network.id)),
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_9__["default"], {
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_icons_Power__WEBPACK_IMPORTED_MODULE_14___default.a, {}, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 245,
                  columnNumber: 21
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 244,
                columnNumber: 19
              }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_10__["default"], {
                primary: network.title
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 247,
                columnNumber: 19
              }, undefined)]
            }, network.title, true, {
              fileName: _jsxFileName,
              lineNumber: 236,
              columnNumber: 17
            }, undefined))
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 234,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 227,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_7__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 252,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_5__["default"], {
          children: MENU.map(menuItem => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_8__["default"], {
            button: true,
            onClick: () => handleChangeLocation(menuItem.title),
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_9__["default"], {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(menuItem.icon, {}, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 261,
                columnNumber: 19
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 260,
              columnNumber: 17
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_10__["default"], {
              primary: menuItem.title
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 263,
              columnNumber: 17
            }, undefined)]
          }, menuItem.title, true, {
            fileName: _jsxFileName,
            lineNumber: 255,
            columnNumber: 15
          }, undefined))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 253,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 226,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 218,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])("main", {
      className: classes.content,
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_4__["default"], {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 270,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_11__["default"], {
        maxWidth: "md",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_30__["jsxDEV"])(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_12__["default"], {
          my: 2,
          children: props.children
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 272,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 271,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 269,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 170,
    columnNumber: 5
  }, undefined);
};

_s(MainLayout, "ZbRI2G3blW4Sq+TJ39K/k9xX4EA=", false, function () {
  return [_wallets_networks__WEBPACK_IMPORTED_MODULE_29__["useNetworkProvider"], useStyles, react_router_dom__WEBPACK_IMPORTED_MODULE_18__["useHistory"], _common_hooks__WEBPACK_IMPORTED_MODULE_24__["useQueryParams"], _common_dialog__WEBPACK_IMPORTED_MODULE_25__["useDialog"], _common_dialog__WEBPACK_IMPORTED_MODULE_25__["useDialog"]];
});

_c = MainLayout;

var _c;

__webpack_require__.$Refresh$.register(_c, "MainLayout");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/paths.ts":
/*!**********************!*\
  !*** ./src/paths.ts ***!
  \**********************/
/*! exports provided: paths */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paths", function() { return paths; });
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

const paths = {
  main: '/',
  protocols: {
    list: '/protocols',
    detail: (id = ':protocolId') => `/protocols/${id}`,
    create: '/protocols/create',
    update: (id = ':protocolId') => `/protocols/update/${id}`
  },
  staking: {
    create: (protocolId = ':protocolId') => `/protocols/${protocolId}/staking/create`,
    update: (protocolId = ':protocolId', stakingId = ':stakingId') => `/protocols/${protocolId}/staking/${stakingId}`
  }
};

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/constants.ts":
/*!*******************************************!*\
  !*** ./src/protocols/common/constants.ts ***!
  \*******************************************/
/*! exports provided: PROTOCOLS, PROTOCOLS_MAP, NETWORKS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROTOCOLS", function() { return PROTOCOLS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROTOCOLS_MAP", function() { return PROTOCOLS_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NETWORKS", function() { return NETWORKS; });
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

const PROTOCOLS = [{
  id: '1',
  logo: '',
  title: '1inch',
  description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
  reward: {
    tokens: ['1INCH']
  },
  network: 'eth',
  link: 'https://1inch.exchange/#/dao/farming'
}, {
  id: '2',
  logo: '',
  title: 'Aave',
  description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
  reward: {
    tokens: ['stkAAVE']
  },
  network: 'eth',
  link: 'https://aave.com'
}, {
  id: '3',
  logo: '',
  title: 'Alchemix',
  description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
  reward: {
    tokens: ['ALCX']
  },
  network: 'eth',
  link: 'https://app.alchemix.fi/farms'
}, {
  id: '4',
  logo: '',
  title: 'Basis',
  description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
  reward: {
    tokens: ['BAS', 'BAC']
  },
  network: 'eth',
  link: 'https://basis.cash'
}, {
  id: '5',
  logo: '',
  title: 'Basket DAO',
  description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
  reward: {
    tokens: ['BASK']
  },
  network: 'waves',
  link: 'https://basketdao.org'
}, {
  id: '6',
  logo: '',
  title: 'Benchmark',
  description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
  reward: {
    tokens: ['MARK']
  },
  network: 'waves',
  link: 'https://launchpad.benchmarkprotocol.finance/pools'
}, {
  id: '7',
  logo: '',
  title: 'Big Data Protocol',
  description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
  reward: {
    tokens: ['BDP', 'bALPHA']
  },
  network: 'bsc',
  link: 'https://www.bigdataprotocol.com/datavault'
}, {
  id: '8',
  logo: '',
  title: 'Cover Protocol',
  description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
  reward: {
    tokens: ['Various']
  },
  network: 'bsc',
  link: 'https://app.coverprotocol.com'
}, {
  id: '9',
  logo: '',
  title: 'Cryptex',
  description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
  reward: {
    tokens: ['CTX']
  },
  network: 'bsc',
  link: 'https://app.cryptex.finance'
}];
const PROTOCOLS_MAP = PROTOCOLS.reduce(_c = (acc, protocol) => {
  acc[protocol.id] = protocol;
  return acc;
}, {});
_c2 = PROTOCOLS_MAP;
const NETWORKS = {
  bsc: 'BSC',
  waves: 'Waves',
  eth: 'Ethereum'
};

var _c, _c2;

__webpack_require__.$Refresh$.register(_c, "PROTOCOLS_MAP$PROTOCOLS.reduce");
__webpack_require__.$Refresh$.register(_c2, "PROTOCOLS_MAP");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/graphql/index.ts":
/*!***********************************************!*\
  !*** ./src/protocols/common/graphql/index.ts ***!
  \***********************************************/
/*! exports provided: PROTOCOLS, PROTOCOL_CREATE, PROTOCOL_DETAIL, PROTOCOL_DELETE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _protocol_list_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./protocol-list.graphql */ "./src/protocols/common/graphql/protocol-list.graphql.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PROTOCOLS", function() { return _protocol_list_graphql__WEBPACK_IMPORTED_MODULE_0__["PROTOCOLS"]; });

/* harmony import */ var _protocol_create_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./protocol-create.graphql */ "./src/protocols/common/graphql/protocol-create.graphql.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PROTOCOL_CREATE", function() { return _protocol_create_graphql__WEBPACK_IMPORTED_MODULE_1__["PROTOCOL_CREATE"]; });

/* harmony import */ var _protocol_detail_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./protocol-detail.graphql */ "./src/protocols/common/graphql/protocol-detail.graphql.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PROTOCOL_DETAIL", function() { return _protocol_detail_graphql__WEBPACK_IMPORTED_MODULE_2__["PROTOCOL_DETAIL"]; });

/* harmony import */ var _protocol_delete_graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./protocol-delete.graphql */ "./src/protocols/common/graphql/protocol-delete.graphql.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PROTOCOL_DELETE", function() { return _protocol_delete_graphql__WEBPACK_IMPORTED_MODULE_3__["PROTOCOL_DELETE"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);






const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/graphql/protocol-create.graphql.ts":
/*!*****************************************************************!*\
  !*** ./src/protocols/common/graphql/protocol-create.graphql.ts ***!
  \*****************************************************************/
/*! exports provided: PROTOCOL_CREATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROTOCOL_CREATE", function() { return PROTOCOL_CREATE; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
/* harmony import */ var _protocol_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./protocol.fragment.graphql */ "./src/protocols/common/graphql/protocol.fragment.graphql.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const PROTOCOL_CREATE = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  mutation ProtocolCreate($input: ProtocolCreateInputType!) {
    protocolCreate(input: $input) {
      ...protocolFragment
    }
  }
  ${_protocol_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__["PROTOCOL_FRAGMENT"]}
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/graphql/protocol-delete.graphql.ts":
/*!*****************************************************************!*\
  !*** ./src/protocols/common/graphql/protocol-delete.graphql.ts ***!
  \*****************************************************************/
/*! exports provided: PROTOCOL_DELETE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROTOCOL_DELETE", function() { return PROTOCOL_DELETE; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);


const PROTOCOL_DELETE = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  mutation ProtocolDelete($id: UuidType!) {
    protocolDelete(id: $id)
  }
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/graphql/protocol-detail.graphql.ts":
/*!*****************************************************************!*\
  !*** ./src/protocols/common/graphql/protocol-detail.graphql.ts ***!
  \*****************************************************************/
/*! exports provided: PROTOCOL_DETAIL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROTOCOL_DETAIL", function() { return PROTOCOL_DETAIL; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
/* harmony import */ var _protocol_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./protocol.fragment.graphql */ "./src/protocols/common/graphql/protocol.fragment.graphql.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const PROTOCOL_DETAIL = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  query Protocol($filter: ProtocolFilterInputType!) {
    protocol(filter: $filter) {
      ...protocolFragment
    }
  }
  ${_protocol_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__["PROTOCOL_FRAGMENT"]}
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/graphql/protocol-list.graphql.ts":
/*!***************************************************************!*\
  !*** ./src/protocols/common/graphql/protocol-list.graphql.ts ***!
  \***************************************************************/
/*! exports provided: PROTOCOLS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROTOCOLS", function() { return PROTOCOLS; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
/* harmony import */ var _protocol_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./protocol.fragment.graphql */ "./src/protocols/common/graphql/protocol.fragment.graphql.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const PROTOCOLS = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  query Protocols(
    $protocolFilter: ProtocolListFilterInputType
    $protocolSort: [ProtocolListSortInputType!]
    $protocolPagination: ProtocolListPaginationInputType
  ) {
    protocols(
      filter: $protocolFilter
      sort: $protocolSort
      pagination: $protocolPagination
    ) {
      list {
        ...protocolFragment
      }
      pagination {
        count
      }
    }
  }
  ${_protocol_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__["PROTOCOL_FRAGMENT"]}
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/graphql/protocol-update.graphql.ts":
/*!*****************************************************************!*\
  !*** ./src/protocols/common/graphql/protocol-update.graphql.ts ***!
  \*****************************************************************/
/*! exports provided: PROTOCOL_UPDATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROTOCOL_UPDATE", function() { return PROTOCOL_UPDATE; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
/* harmony import */ var _protocol_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./protocol.fragment.graphql */ "./src/protocols/common/graphql/protocol.fragment.graphql.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const PROTOCOL_UPDATE = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  mutation ProtocolUpdate($id: UuidType!, $input: ProtocolUpdateInputType!) {
    protocolUpdate(id: $id, input: $input) {
      ...protocolFragment
    }
  }
  ${_protocol_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__["PROTOCOL_FRAGMENT"]}
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/graphql/protocol.fragment.graphql.ts":
/*!*******************************************************************!*\
  !*** ./src/protocols/common/graphql/protocol.fragment.graphql.ts ***!
  \*******************************************************************/
/*! exports provided: PROTOCOL_FRAGMENT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROTOCOL_FRAGMENT", function() { return PROTOCOL_FRAGMENT; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);


const PROTOCOL_FRAGMENT = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  fragment protocolFragment on ProtocolType {
    id
    adapter
    name
    description
    icon
    link
    hidden
    createdAt
  }
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/index.ts":
/*!***************************************!*\
  !*** ./src/protocols/common/index.ts ***!
  \***************************************/
/*! exports provided: ProtocolForm, PROTOCOLS, PROTOCOLS_MAP, NETWORKS, protocolsApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _protocol_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./protocol-form */ "./src/protocols/common/protocol-form/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProtocolForm", function() { return _protocol_form__WEBPACK_IMPORTED_MODULE_0__["ProtocolForm"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/protocols/common/constants.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PROTOCOLS", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["PROTOCOLS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PROTOCOLS_MAP", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["PROTOCOLS_MAP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NETWORKS", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["NETWORKS"]; });

/* harmony import */ var _protocol_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./protocol.api */ "./src/protocols/common/protocol.api.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "protocolsApi", function() { return _protocol_api__WEBPACK_IMPORTED_MODULE_2__["protocolsApi"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);





const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/protocol-form/index.ts":
/*!*****************************************************!*\
  !*** ./src/protocols/common/protocol-form/index.ts ***!
  \*****************************************************/
/*! exports provided: ProtocolForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _protocol_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./protocol-form */ "./src/protocols/common/protocol-form/protocol-form.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProtocolForm", function() { return _protocol_form__WEBPACK_IMPORTED_MODULE_0__["ProtocolForm"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/protocol-form/protocol-form.tsx":
/*!**************************************************************!*\
  !*** ./src/protocols/common/protocol-form/protocol-form.tsx ***!
  \**************************************************************/
/*! exports provided: ProtocolForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProtocolForm", function() { return ProtocolForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "./node_modules/@material-ui/core/esm/Checkbox/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/protocols/common/protocol-form/protocol-form.tsx",
    _s = __webpack_require__.$Refresh$.signature();








const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["makeStyles"])(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(2)
    }
  }
}));
const ProtocolForm = props => {
  _s();

  var _props$defaultValues;

  const {
    register,
    handleSubmit,
    setValue,
    reset
  } = Object(react_hook_form__WEBPACK_IMPORTED_MODULE_1__["useForm"])();
  const classes = useStyles();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    reset(props.defaultValues);
  }, [reset, props.defaultValues]);
  const hidden = register('hidden');
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("form", {
    className: classes.root,
    onSubmit: handleSubmit(props.onSubmit),
    noValidate: true,
    autoComplete: "off",
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "text",
      label: "Name",
      inputProps: register('name'),
      disabled: props.loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "text",
      label: "Description",
      inputProps: register('description'),
      disabled: props.loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "text",
      label: "Icon",
      inputProps: register('icon'),
      disabled: props.loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "text",
      label: "Adapter",
      inputProps: register('adapter'),
      disabled: props.loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_2__["default"], {
      type: "text",
      label: "Link",
      inputProps: register('link'),
      disabled: props.loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["FormLabel"], {
      children: ["Hidden", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_3__["default"], {
        inputRef: hidden.ref,
        defaultChecked: (_props$defaultValues = props.defaultValues) === null || _props$defaultValues === void 0 ? void 0 : _props$defaultValues.hidden,
        onChange: (_, checked) => setValue('hidden', checked),
        disabled: props.loading
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
      variant: "contained",
      color: "primary",
      type: "submit",
      disabled: props.loading,
      children: "Submit"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 46,
    columnNumber: 5
  }, undefined);
};

_s(ProtocolForm, "glVpUn2p+QmRQrS0LE8SlDPr/Dc=", false, function () {
  return [react_hook_form__WEBPACK_IMPORTED_MODULE_1__["useForm"], useStyles];
});

_c = ProtocolForm;

var _c;

__webpack_require__.$Refresh$.register(_c, "ProtocolForm");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/common/protocol.api.ts":
/*!**********************************************!*\
  !*** ./src/protocols/common/protocol.api.ts ***!
  \**********************************************/
/*! exports provided: protocolsApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "protocolsApi", function() { return protocolsApi; });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/api */ "./src/api/index.ts");
/* harmony import */ var _graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql */ "./src/protocols/common/graphql/index.ts");
/* harmony import */ var _graphql_protocol_update_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphql/protocol-update.graphql */ "./src/protocols/common/graphql/protocol-update.graphql.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);




const protocolsApi = {
  protocolList: variables => Object(_api__WEBPACK_IMPORTED_MODULE_0__["getAPIClient"])().query(_graphql__WEBPACK_IMPORTED_MODULE_1__["PROTOCOLS"], variables).toPromise().then(({
    data
  }) => data === null || data === void 0 ? void 0 : data.protocols),
  protocolDetail: variables => Object(_api__WEBPACK_IMPORTED_MODULE_0__["getAPIClient"])().query(_graphql__WEBPACK_IMPORTED_MODULE_1__["PROTOCOL_DETAIL"], variables).toPromise().then(({
    data
  }) => data === null || data === void 0 ? void 0 : data.protocol),
  protocolCreate: variables => Object(_api__WEBPACK_IMPORTED_MODULE_0__["getAPIClient"])().mutation(_graphql__WEBPACK_IMPORTED_MODULE_1__["PROTOCOL_CREATE"], variables).toPromise().then(({
    data
  }) => data === null || data === void 0 ? void 0 : data.protocolCreate),
  protocolUpdate: variables => Object(_api__WEBPACK_IMPORTED_MODULE_0__["getAPIClient"])().mutation(_graphql_protocol_update_graphql__WEBPACK_IMPORTED_MODULE_2__["PROTOCOL_UPDATE"], variables).toPromise().then(({
    data
  }) => data === null || data === void 0 ? void 0 : data.protocolUpdate),
  protocolDelete: id => Object(_api__WEBPACK_IMPORTED_MODULE_0__["getAPIClient"])().mutation(_graphql__WEBPACK_IMPORTED_MODULE_1__["PROTOCOL_DELETE"], {
    id
  }).toPromise().then(({
    data
  }) => data === null || data === void 0 ? void 0 : data.protocolDelete)
};

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-create/index.ts":
/*!************************************************!*\
  !*** ./src/protocols/protocol-create/index.ts ***!
  \************************************************/
/*! exports provided: ProtocolCreate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _protocol_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./protocol-create */ "./src/protocols/protocol-create/protocol-create.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProtocolCreate", function() { return _protocol_create__WEBPACK_IMPORTED_MODULE_0__["ProtocolCreate"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-create/protocol-create.model.ts":
/*!****************************************************************!*\
  !*** ./src/protocols/protocol-create/protocol-create.model.ts ***!
  \****************************************************************/
/*! exports provided: protocolCreateFx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "protocolCreateFx", function() { return protocolCreateFx; });
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! effector-logger */ "./node_modules/effector-logger/dist/index.js");
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(effector_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/common/history */ "./src/common/history.ts");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/notifications */ "./src/notifications/index.ts");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/paths */ "./src/paths.ts");
/* harmony import */ var _common_protocol_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/protocol.api */ "./src/protocols/common/protocol.api.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);






const protocolCreate = Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["createDomain"])('protocolCreate');
const protocolCreateFx = protocolCreate.createEffect({
  name: 'protocolCreateFx',
  handler: input => _common_protocol_api__WEBPACK_IMPORTED_MODULE_4__["protocolsApi"].protocolCreate({
    input
  })
});
protocolCreateFx.failData.watch(error => _notifications__WEBPACK_IMPORTED_MODULE_2__["notifications"].error(error.message));
protocolCreateFx.doneData.watch(payload => {
  if (!(payload === null || payload === void 0 ? void 0 : payload.id)) return;
  _common_history__WEBPACK_IMPORTED_MODULE_1__["history"].push(_paths__WEBPACK_IMPORTED_MODULE_3__["paths"].protocols.detail(payload.id));
});

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-create/protocol-create.tsx":
/*!***********************************************************!*\
  !*** ./src/protocols/protocol-create/protocol-create.tsx ***!
  \***********************************************************/
/*! exports provided: ProtocolCreate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProtocolCreate", function() { return ProtocolCreate; });
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var _layouts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/layouts */ "./src/layouts/index.ts");
/* harmony import */ var _protocols_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/protocols/common */ "./src/protocols/common/index.ts");
/* harmony import */ var _protocol_create_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./protocol-create.model */ "./src/protocols/protocol-create/protocol-create.model.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/protocols/protocol-create/protocol-create.tsx",
    _s = __webpack_require__.$Refresh$.signature();






const ProtocolCreate = () => {
  _s();

  const loading = Object(effector_react__WEBPACK_IMPORTED_MODULE_0__["useStore"])(_protocol_create_model__WEBPACK_IMPORTED_MODULE_3__["protocolCreateFx"].pending);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_layouts__WEBPACK_IMPORTED_MODULE_1__["MainLayout"], {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_protocols_common__WEBPACK_IMPORTED_MODULE_2__["ProtocolForm"], {
      onSubmit: _protocol_create_model__WEBPACK_IMPORTED_MODULE_3__["protocolCreateFx"],
      loading: loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 13,
    columnNumber: 5
  }, undefined);
};

_s(ProtocolCreate, "C4ErN9RWndlGNxoUZlSptEtxlM4=", false, function () {
  return [effector_react__WEBPACK_IMPORTED_MODULE_0__["useStore"]];
});

_c = ProtocolCreate;

var _c;

__webpack_require__.$Refresh$.register(_c, "ProtocolCreate");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-detail/index.ts":
/*!************************************************!*\
  !*** ./src/protocols/protocol-detail/index.ts ***!
  \************************************************/
/*! exports provided: ProtocolDetail, detailModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _protocol_detail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./protocol-detail */ "./src/protocols/protocol-detail/protocol-detail.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProtocolDetail", function() { return _protocol_detail__WEBPACK_IMPORTED_MODULE_0__["ProtocolDetail"]; });

/* harmony import */ var _protocol_detail_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./protocol-detail.model */ "./src/protocols/protocol-detail/protocol-detail.model.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "detailModel", function() { return _protocol_detail_model__WEBPACK_IMPORTED_MODULE_1__; });
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);





const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-detail/protocol-detail.model.ts":
/*!****************************************************************!*\
  !*** ./src/protocols/protocol-detail/protocol-detail.model.ts ***!
  \****************************************************************/
/*! exports provided: protocolDetailDomain, fetchProtocolFx, $protocol, Gate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "protocolDetailDomain", function() { return protocolDetailDomain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProtocolFx", function() { return fetchProtocolFx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$protocol", function() { return $protocol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gate", function() { return Gate; });
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! effector-logger */ "./node_modules/effector-logger/dist/index.js");
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(effector_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common */ "./src/protocols/common/index.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);




const protocolDetailDomain = Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["createDomain"])('protocolList');
const fetchProtocolFx = protocolDetailDomain.createEffect({
  name: 'fetchProtocolList',
  handler: async params => _common__WEBPACK_IMPORTED_MODULE_2__["protocolsApi"].protocolDetail({
    filter: {
      id: params.protocolId
    }
  })
});
const $protocol = protocolDetailDomain.createStore(null, {
  name: 'protocol'
}).on(fetchProtocolFx.doneData, (_, payload) => payload);
const Gate = Object(effector_react__WEBPACK_IMPORTED_MODULE_1__["createGate"])({
  domain: protocolDetailDomain
});
Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["sample"])({
  clock: Gate.open,
  target: fetchProtocolFx
});

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-detail/protocol-detail.tsx":
/*!***********************************************************!*\
  !*** ./src/protocols/protocol-detail/protocol-detail.tsx ***!
  \***********************************************************/
/*! exports provided: ProtocolDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProtocolDetail", function() { return ProtocolDetail; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_icons_Launch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/Launch */ "./node_modules/@material-ui/icons/Launch.js");
/* harmony import */ var _material_ui_icons_Launch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Launch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var _layouts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/layouts */ "./src/layouts/index.ts");
/* harmony import */ var _staking_staking_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/staking/staking-list */ "./src/staking/staking-list/index.ts");
/* harmony import */ var _protocol_detail_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./protocol-detail.model */ "./src/protocols/protocol-detail/protocol-detail.model.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/protocols/protocol-detail/protocol-detail.tsx",
    _s = __webpack_require__.$Refresh$.signature();











const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["makeStyles"])(() => ({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    verticalAlign: 'middle'
  }
}));
const ProtocolDetail = () => {
  _s();

  const params = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useParams"])();
  Object(effector_react__WEBPACK_IMPORTED_MODULE_5__["useGate"])(_protocol_detail_model__WEBPACK_IMPORTED_MODULE_8__["Gate"], params);
  const protocol = Object(effector_react__WEBPACK_IMPORTED_MODULE_5__["useStore"])(_protocol_detail_model__WEBPACK_IMPORTED_MODULE_8__["$protocol"]);
  const loading = Object(effector_react__WEBPACK_IMPORTED_MODULE_5__["useStore"])(_protocol_detail_model__WEBPACK_IMPORTED_MODULE_8__["fetchProtocolFx"].pending);
  const classes = useStyles();
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_layouts__WEBPACK_IMPORTED_MODULE_6__["MainLayout"], {
    children: [loading && !protocol && 'loading...', !loading && protocol && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])("div", {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])("div", {
        className: classes.header,
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Typography"], {
          variant: "h2",
          children: protocol.name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 48,
          columnNumber: 13
        }, undefined), protocol.link && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Typography"], {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Link"], {
            target: "_blank",
            href: protocol.link,
            children: ["More info ", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_material_ui_icons_Launch__WEBPACK_IMPORTED_MODULE_3___default.a, {
              className: classes.icon
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 52,
              columnNumber: 29
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 51,
            columnNumber: 17
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 15
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 11
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Typography"], {
        gutterBottom: true,
        children: protocol.description
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 11
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Typography"], {
        gutterBottom: true,
        component: "div",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])("div", {
          children: ["Adapter: ", protocol.adapter]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 13
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])("div", {
          children: ["Icon: ", protocol.icon]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 60,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 9
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Typography"], {
      gutterBottom: true,
      children: "Staking contracts"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_staking_staking_list__WEBPACK_IMPORTED_MODULE_7__["StakingList"], {
      protocolId: params.protocolId
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 43,
    columnNumber: 5
  }, undefined);
};

_s(ProtocolDetail, "KWA+niByR0ZM27Apjd6QdL4r3G8=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useParams"], effector_react__WEBPACK_IMPORTED_MODULE_5__["useGate"], effector_react__WEBPACK_IMPORTED_MODULE_5__["useStore"], effector_react__WEBPACK_IMPORTED_MODULE_5__["useStore"], useStyles];
});

_c = ProtocolDetail;

var _c;

__webpack_require__.$Refresh$.register(_c, "ProtocolDetail");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-list/index.ts":
/*!**********************************************!*\
  !*** ./src/protocols/protocol-list/index.ts ***!
  \**********************************************/
/*! exports provided: ProtocolList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _protocol_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./protocol-list */ "./src/protocols/protocol-list/protocol-list.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProtocolList", function() { return _protocol_list__WEBPACK_IMPORTED_MODULE_0__["ProtocolList"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-list/protocol-list.model.ts":
/*!************************************************************!*\
  !*** ./src/protocols/protocol-list/protocol-list.model.ts ***!
  \************************************************************/
/*! exports provided: protocolListDomain, fetchProtocolListFx, deleteProtocolFx, $protocolList, Gate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "protocolListDomain", function() { return protocolListDomain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProtocolListFx", function() { return fetchProtocolListFx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteProtocolFx", function() { return deleteProtocolFx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$protocolList", function() { return $protocolList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gate", function() { return Gate; });
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! effector-logger */ "./node_modules/effector-logger/dist/index.js");
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(effector_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var _wallets_networks_network_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/wallets/networks/network.model */ "./src/wallets/networks/network.model.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common */ "./src/protocols/common/index.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);





const protocolListDomain = Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["createDomain"])('protocolList');
const fetchProtocolListFx = protocolListDomain.createEffect({
  name: 'fetchProtocolList',
  handler: async () => _common__WEBPACK_IMPORTED_MODULE_3__["protocolsApi"].protocolList({})
});
const ERROR = 'Not deleted';
const deleteProtocolFx = protocolListDomain.createEffect({
  name: 'deleteProtocol',
  handler: async id => {
    const isDeleted = await _common__WEBPACK_IMPORTED_MODULE_3__["protocolsApi"].protocolDelete(id);

    if (isDeleted) {
      return id;
    }

    throw new Error(ERROR);
  }
});
const $protocolList = protocolListDomain.createStore({
  list: [],
  pagination: {
    count: 0
  }
}, {
  name: 'protocols'
}).on(fetchProtocolListFx.doneData, (_, payload) => payload).on(deleteProtocolFx.doneData, (state, payload) => {
  var _state$list;

  const list = (_state$list = state.list) === null || _state$list === void 0 ? void 0 : _state$list.filter(({
    id
  }) => id !== payload);
  return { ...state,
    list
  };
});
const Gate = Object(effector_react__WEBPACK_IMPORTED_MODULE_1__["createGate"])({
  domain: protocolListDomain
});
Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["sample"])({
  source: _wallets_networks_network_model__WEBPACK_IMPORTED_MODULE_2__["$wallet"],
  clock: [Gate.open, _wallets_networks_network_model__WEBPACK_IMPORTED_MODULE_2__["activateWalletFx"].doneData, _wallets_networks_network_model__WEBPACK_IMPORTED_MODULE_2__["updateWalletFx"].doneData],
  target: fetchProtocolListFx
});

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-list/protocol-list.tsx":
/*!*******************************************************!*\
  !*** ./src/protocols/protocol-list/protocol-list.tsx ***!
  \*******************************************************/
/*! exports provided: ProtocolList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProtocolList", function() { return ProtocolList; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _layouts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/layouts */ "./src/layouts/index.ts");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/paths */ "./src/paths.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/users */ "./src/users/index.ts");
/* harmony import */ var _common_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~/common/dialog */ "./src/common/dialog/index.ts");
/* harmony import */ var _common_confirm_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ~/common/confirm-dialog */ "./src/common/confirm-dialog/index.ts");
/* harmony import */ var _protocol_list_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./protocol-list.model */ "./src/protocols/protocol-list/protocol-list.model.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/protocols/protocol-list/protocol-list.tsx",
    _s = __webpack_require__.$Refresh$.signature();













const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["makeStyles"])(() => ({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },
  link: {
    textDecoration: 'none',
    width: '100%'
  },
  item: {
    display: 'flex',
    marginBottom: 5,
    width: '100%'
  },
  edit: {},
  card: {
    padding: '10px 15px',
    display: 'flex',
    alignItems: 'center'
  },
  tokens: {
    marginLeft: 'auto'
  },
  mr: {
    marginRight: 20
  }
}));
const ProtocolList = () => {
  _s();

  const classes = useStyles();
  const ability = Object(_users__WEBPACK_IMPORTED_MODULE_7__["useAbility"])();
  const [openConfirm] = Object(_common_dialog__WEBPACK_IMPORTED_MODULE_8__["useDialog"])(_common_confirm_dialog__WEBPACK_IMPORTED_MODULE_9__["ConfirmDialog"]);
  const loading = Object(effector_react__WEBPACK_IMPORTED_MODULE_2__["useStore"])(_protocol_list_model__WEBPACK_IMPORTED_MODULE_10__["fetchProtocolListFx"].pending);
  const protocolList = Object(effector_react__WEBPACK_IMPORTED_MODULE_2__["useStore"])(_protocol_list_model__WEBPACK_IMPORTED_MODULE_10__["$protocolList"]);
  const deleteLoading = Object(effector_react__WEBPACK_IMPORTED_MODULE_2__["useStore"])(_protocol_list_model__WEBPACK_IMPORTED_MODULE_10__["deleteProtocolFx"].pending);
  Object(effector_react__WEBPACK_IMPORTED_MODULE_2__["useGate"])(_protocol_list_model__WEBPACK_IMPORTED_MODULE_10__["Gate"]);

  const handleOpenConfirm = async id => {
    try {
      await openConfirm();
      await _protocol_list_model__WEBPACK_IMPORTED_MODULE_10__["deleteProtocolFx"](id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const protocols = Object(react__WEBPACK_IMPORTED_MODULE_4__["useMemo"])(() => {
    var _protocolList$list;

    return (_protocolList$list = protocolList.list) === null || _protocolList$list === void 0 ? void 0 : _protocolList$list.filter(protocol => ability.can('read', protocol));
  }, [protocolList, ability]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_layouts__WEBPACK_IMPORTED_MODULE_5__["MainLayout"], {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_users__WEBPACK_IMPORTED_MODULE_7__["Can"], {
      I: "create",
      an: "Protocol",
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
        component: react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"],
        variant: "contained",
        color: "primary",
        to: _paths__WEBPACK_IMPORTED_MODULE_6__["paths"].protocols.create,
        children: "New protocol"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])("ul", {
      className: classes.root,
      children: [loading && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])("li", {
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Paper"], {
          className: classes.card,
          children: "loading..."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 96,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 95,
        columnNumber: 11
      }, undefined), !loading && !(protocols === null || protocols === void 0 ? void 0 : protocols.length) && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])("li", {
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Paper"], {
          className: classes.card,
          children: "no protocols found"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 101,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 11
      }, undefined), !loading && protocols && protocols.map(protocol => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])("li", {
        className: classes.item,
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
          to: _paths__WEBPACK_IMPORTED_MODULE_6__["paths"].protocols.detail(protocol.id),
          className: classes.link,
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Paper"], {
            className: classes.card,
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])("div", {
              className: classes.mr,
              children: protocol.name
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 113,
              columnNumber: 19
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])("div", {
              className: `${classes.mr} ${classes.tokens}`,
              children: protocol.createdAt
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 114,
              columnNumber: 19
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 112,
            columnNumber: 17
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 15
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_users__WEBPACK_IMPORTED_MODULE_7__["Can"], {
          I: "update",
          a: "Protocol",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
            variant: "contained",
            color: "primary",
            component: react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"],
            to: _paths__WEBPACK_IMPORTED_MODULE_6__["paths"].protocols.update(protocol.id),
            className: classes.edit,
            disabled: deleteLoading,
            children: "Edit"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 120,
            columnNumber: 17
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 119,
          columnNumber: 15
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_users__WEBPACK_IMPORTED_MODULE_7__["Can"], {
          I: "delete",
          a: "Protocol",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
            variant: "contained",
            color: "secondary",
            disabled: deleteLoading,
            onClick: () => handleOpenConfirm(protocol.id),
            children: "Delete"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 132,
            columnNumber: 17
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 131,
          columnNumber: 15
        }, undefined)]
      }, protocol.id, true, {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 13
      }, undefined))]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 82,
    columnNumber: 5
  }, undefined);
};

_s(ProtocolList, "s+z/Fm56yOEg1ZhElDqljO5YxSE=", false, function () {
  return [useStyles, _users__WEBPACK_IMPORTED_MODULE_7__["useAbility"], _common_dialog__WEBPACK_IMPORTED_MODULE_8__["useDialog"], effector_react__WEBPACK_IMPORTED_MODULE_2__["useStore"], effector_react__WEBPACK_IMPORTED_MODULE_2__["useStore"], effector_react__WEBPACK_IMPORTED_MODULE_2__["useStore"], effector_react__WEBPACK_IMPORTED_MODULE_2__["useGate"]];
});

_c = ProtocolList;

var _c;

__webpack_require__.$Refresh$.register(_c, "ProtocolList");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-update/index.ts":
/*!************************************************!*\
  !*** ./src/protocols/protocol-update/index.ts ***!
  \************************************************/
/*! exports provided: ProtocolUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _protocol_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./protocol-update */ "./src/protocols/protocol-update/protocol-update.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProtocolUpdate", function() { return _protocol_update__WEBPACK_IMPORTED_MODULE_0__["ProtocolUpdate"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-update/protocol-update.model.ts":
/*!****************************************************************!*\
  !*** ./src/protocols/protocol-update/protocol-update.model.ts ***!
  \****************************************************************/
/*! exports provided: protocolUpdateFx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "protocolUpdateFx", function() { return protocolUpdateFx; });
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! effector-logger */ "./node_modules/effector-logger/dist/index.js");
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(effector_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/common/history */ "./src/common/history.ts");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/notifications */ "./src/notifications/index.ts");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/paths */ "./src/paths.ts");
/* harmony import */ var _common_protocol_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/protocol.api */ "./src/protocols/common/protocol.api.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);






const protocolUpdate = Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["createDomain"])('protocolUpdate');
const protocolUpdateFx = protocolUpdate.createEffect({
  name: 'protocolUpdateFx',
  handler: variables => _common_protocol_api__WEBPACK_IMPORTED_MODULE_4__["protocolsApi"].protocolUpdate(variables)
});
protocolUpdateFx.failData.watch(error => _notifications__WEBPACK_IMPORTED_MODULE_2__["notifications"].error(error.message));
protocolUpdateFx.doneData.watch(payload => {
  if (!(payload === null || payload === void 0 ? void 0 : payload.id)) return;
  _common_history__WEBPACK_IMPORTED_MODULE_1__["history"].push(_paths__WEBPACK_IMPORTED_MODULE_3__["paths"].protocols.detail(payload.id));
});

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/protocols/protocol-update/protocol-update.tsx":
/*!***********************************************************!*\
  !*** ./src/protocols/protocol-update/protocol-update.tsx ***!
  \***********************************************************/
/*! exports provided: ProtocolUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProtocolUpdate", function() { return ProtocolUpdate; });
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _layouts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/layouts */ "./src/layouts/index.ts");
/* harmony import */ var _protocols_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/protocols/common */ "./src/protocols/common/index.ts");
/* harmony import */ var _protocols_protocol_detail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/protocols/protocol-detail */ "./src/protocols/protocol-detail/index.ts");
/* harmony import */ var _protocol_update_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./protocol-update.model */ "./src/protocols/protocol-update/protocol-update.model.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/protocols/protocol-update/protocol-update.tsx",
    _s = __webpack_require__.$Refresh$.signature();









const ProtocolUpdate = () => {
  _s();

  const params = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useParams"])();
  Object(effector_react__WEBPACK_IMPORTED_MODULE_0__["useGate"])(_protocols_protocol_detail__WEBPACK_IMPORTED_MODULE_5__["detailModel"].Gate, params);
  const protocol = Object(effector_react__WEBPACK_IMPORTED_MODULE_0__["useStore"])(_protocols_protocol_detail__WEBPACK_IMPORTED_MODULE_5__["detailModel"].$protocol);
  const loading = Object(effector_react__WEBPACK_IMPORTED_MODULE_0__["useStore"])(_protocols_protocol_detail__WEBPACK_IMPORTED_MODULE_5__["detailModel"].fetchProtocolFx.pending);
  const defaultValues = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(() => {
    var _protocol$name, _protocol$description, _protocol$hidden, _protocol$icon, _protocol$link, _protocol$adapter;

    return {
      name: (_protocol$name = protocol === null || protocol === void 0 ? void 0 : protocol.name) !== null && _protocol$name !== void 0 ? _protocol$name : '',
      description: (_protocol$description = protocol === null || protocol === void 0 ? void 0 : protocol.description) !== null && _protocol$description !== void 0 ? _protocol$description : undefined,
      hidden: (_protocol$hidden = protocol === null || protocol === void 0 ? void 0 : protocol.hidden) !== null && _protocol$hidden !== void 0 ? _protocol$hidden : undefined,
      icon: (_protocol$icon = protocol === null || protocol === void 0 ? void 0 : protocol.icon) !== null && _protocol$icon !== void 0 ? _protocol$icon : undefined,
      link: (_protocol$link = protocol === null || protocol === void 0 ? void 0 : protocol.link) !== null && _protocol$link !== void 0 ? _protocol$link : undefined,
      adapter: (_protocol$adapter = protocol === null || protocol === void 0 ? void 0 : protocol.adapter) !== null && _protocol$adapter !== void 0 ? _protocol$adapter : ''
    };
  }, [protocol]);
  const formLoading = Object(effector_react__WEBPACK_IMPORTED_MODULE_0__["useStore"])(_protocol_update_model__WEBPACK_IMPORTED_MODULE_6__["protocolUpdateFx"].pending);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(_layouts__WEBPACK_IMPORTED_MODULE_3__["MainLayout"], {
    children: !loading && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(_protocols_common__WEBPACK_IMPORTED_MODULE_4__["ProtocolForm"], {
      onSubmit: formValues => _protocol_update_model__WEBPACK_IMPORTED_MODULE_6__["protocolUpdateFx"]({
        id: params.protocolId,
        input: formValues
      }),
      loading: formLoading,
      defaultValues: defaultValues
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 5
  }, undefined);
};

_s(ProtocolUpdate, "3LPMimZMKB1+pQ1DoTONMPclUY4=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useParams"], effector_react__WEBPACK_IMPORTED_MODULE_0__["useGate"], effector_react__WEBPACK_IMPORTED_MODULE_0__["useStore"], effector_react__WEBPACK_IMPORTED_MODULE_0__["useStore"], effector_react__WEBPACK_IMPORTED_MODULE_0__["useStore"]];
});

_c = ProtocolUpdate;

var _c;

__webpack_require__.$Refresh$.register(_c, "ProtocolUpdate");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/router/can-route.tsx":
/*!**********************************!*\
  !*** ./src/router/can-route.tsx ***!
  \**********************************/
/*! exports provided: CanRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanRoute", function() { return CanRoute; });
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var _users_user_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/users/user.model */ "./src/users/user.model.ts");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/paths */ "./src/paths.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/users */ "./src/users/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/router/can-route.tsx",
    _s = __webpack_require__.$Refresh$.signature();







const CanRoute = props => {
  _s();

  const user = Object(effector_react__WEBPACK_IMPORTED_MODULE_1__["useStore"])(_users_user_model__WEBPACK_IMPORTED_MODULE_2__["$user"]);
  const loading = Object(effector_react__WEBPACK_IMPORTED_MODULE_1__["useStore"])(_users_user_model__WEBPACK_IMPORTED_MODULE_2__["fetchUserFx"].pending);
  const ability = Object(_users__WEBPACK_IMPORTED_MODULE_4__["useAbility"])();
  const {
    children,
    action,
    subject,
    ...restOfProps
  } = props;

  if (loading && !user) {
    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_0__["Route"], { ...restOfProps,
      children: "loading..."
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 12
    }, undefined);
  }

  return !loading && user && ability.can(action, subject) ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_0__["Route"], { ...restOfProps,
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, undefined) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_0__["Redirect"], {
    to: _paths__WEBPACK_IMPORTED_MODULE_3__["paths"].main
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 30,
    columnNumber: 5
  }, undefined);
};

_s(CanRoute, "qaFYo+rg9NZcwicWiegJsp/q7+I=", false, function () {
  return [effector_react__WEBPACK_IMPORTED_MODULE_1__["useStore"], effector_react__WEBPACK_IMPORTED_MODULE_1__["useStore"], _users__WEBPACK_IMPORTED_MODULE_4__["useAbility"]];
});

_c = CanRoute;

var _c;

__webpack_require__.$Refresh$.register(_c, "CanRoute");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/router/index.ts":
/*!*****************************!*\
  !*** ./src/router/index.ts ***!
  \*****************************/
/*! exports provided: Router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ "./src/router/router.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return _router__WEBPACK_IMPORTED_MODULE_0__["Router"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/router/router.tsx":
/*!*******************************!*\
  !*** ./src/router/router.tsx ***!
  \*******************************/
/*! exports provided: Router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _can_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./can-route */ "./src/router/can-route.tsx");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/paths */ "./src/paths.ts");
/* harmony import */ var _common_history__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/common/history */ "./src/common/history.ts");
/* harmony import */ var _protocols_protocol_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/protocols/protocol-list */ "./src/protocols/protocol-list/index.ts");
/* harmony import */ var _protocols_protocol_detail__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/protocols/protocol-detail */ "./src/protocols/protocol-detail/index.ts");
/* harmony import */ var _protocols_protocol_create__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/protocols/protocol-create */ "./src/protocols/protocol-create/index.ts");
/* harmony import */ var _protocols_protocol_update__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~/protocols/protocol-update */ "./src/protocols/protocol-update/index.ts");
/* harmony import */ var _staking_staking_create__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ~/staking/staking-create */ "./src/staking/staking-create/index.ts");
/* harmony import */ var _staking_staking_update__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ~/staking/staking-update */ "./src/staking/staking-update/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/router/router.tsx";

 // import { PrivateRoute } from './private-route'











const Router = () => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Router"], {
    history: _common_history__WEBPACK_IMPORTED_MODULE_4__["history"],
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
        from: _paths__WEBPACK_IMPORTED_MODULE_3__["paths"].main,
        to: _paths__WEBPACK_IMPORTED_MODULE_3__["paths"].protocols.list,
        exact: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_can_route__WEBPACK_IMPORTED_MODULE_2__["CanRoute"], {
        action: "create",
        subject: "Protocol",
        path: _paths__WEBPACK_IMPORTED_MODULE_3__["paths"].protocols.create,
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_protocols_protocol_create__WEBPACK_IMPORTED_MODULE_7__["ProtocolCreate"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 32,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_can_route__WEBPACK_IMPORTED_MODULE_2__["CanRoute"], {
        action: "update",
        subject: "Protocol",
        path: _paths__WEBPACK_IMPORTED_MODULE_3__["paths"].protocols.update(),
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_protocols_protocol_update__WEBPACK_IMPORTED_MODULE_8__["ProtocolUpdate"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_can_route__WEBPACK_IMPORTED_MODULE_2__["CanRoute"], {
        action: "create",
        subject: "Contract",
        path: _paths__WEBPACK_IMPORTED_MODULE_3__["paths"].staking.create(),
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_staking_staking_create__WEBPACK_IMPORTED_MODULE_9__["StakingCreate"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_can_route__WEBPACK_IMPORTED_MODULE_2__["CanRoute"], {
        action: "update",
        subject: "Contract",
        path: _paths__WEBPACK_IMPORTED_MODULE_3__["paths"].staking.update(),
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_staking_staking_update__WEBPACK_IMPORTED_MODULE_10__["StakingUpdate"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: _paths__WEBPACK_IMPORTED_MODULE_3__["paths"].protocols.detail(),
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_protocols_protocol_detail__WEBPACK_IMPORTED_MODULE_6__["ProtocolDetail"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: _paths__WEBPACK_IMPORTED_MODULE_3__["paths"].protocols.list,
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_protocols_protocol_list__WEBPACK_IMPORTED_MODULE_5__["ProtocolList"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 24,
    columnNumber: 5
  }, undefined);
};
_c = Router;

var _c;

__webpack_require__.$Refresh$.register(_c, "Router");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/common/graphql/index.ts":
/*!*********************************************!*\
  !*** ./src/staking/common/graphql/index.ts ***!
  \*********************************************/
/*! exports provided: STAKING_CONTRACT_LIST, STAKING_CONTRACT_DELETE, STAKING_CONTRACT_CREATE, STAKING_CONTRACT_UPDATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _staking_contract_list_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staking-contract-list.graphql */ "./src/staking/common/graphql/staking-contract-list.graphql.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_LIST", function() { return _staking_contract_list_graphql__WEBPACK_IMPORTED_MODULE_0__["STAKING_CONTRACT_LIST"]; });

/* harmony import */ var _staking_contract_delete_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./staking-contract-delete.graphql */ "./src/staking/common/graphql/staking-contract-delete.graphql.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_DELETE", function() { return _staking_contract_delete_graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_DELETE"]; });

/* harmony import */ var _staking_contract_create_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./staking-contract-create.graphql */ "./src/staking/common/graphql/staking-contract-create.graphql.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_CREATE", function() { return _staking_contract_create_graphql__WEBPACK_IMPORTED_MODULE_2__["STAKING_CONTRACT_CREATE"]; });

/* harmony import */ var _staking_contract_update_graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./staking-contract-update.graphql */ "./src/staking/common/graphql/staking-contract-update.graphql.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_UPDATE", function() { return _staking_contract_update_graphql__WEBPACK_IMPORTED_MODULE_3__["STAKING_CONTRACT_UPDATE"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);






const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/common/graphql/staking-contract-create.graphql.ts":
/*!***********************************************************************!*\
  !*** ./src/staking/common/graphql/staking-contract-create.graphql.ts ***!
  \***********************************************************************/
/*! exports provided: STAKING_CONTRACT_CREATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_CREATE", function() { return STAKING_CONTRACT_CREATE; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
/* harmony import */ var _staking_contract_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./staking-contract.fragment.graphql */ "./src/staking/common/graphql/staking-contract.fragment.graphql.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const STAKING_CONTRACT_CREATE = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  mutation StakingContractCreate(
    $protocol: UuidType!
    $input: ContractCreateInputType!
  ) {
    contractCreate(protocol: $protocol, input: $input) {
      ...stakingContractFragment
    }
  }
  ${_staking_contract_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_FRAGMENT"]}
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/common/graphql/staking-contract-delete.graphql.ts":
/*!***********************************************************************!*\
  !*** ./src/staking/common/graphql/staking-contract-delete.graphql.ts ***!
  \***********************************************************************/
/*! exports provided: STAKING_CONTRACT_DELETE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_DELETE", function() { return STAKING_CONTRACT_DELETE; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);


const STAKING_CONTRACT_DELETE = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  mutation StakingContractDelete($id: UuidType!) {
    contractDelete(id: $id)
  }
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/common/graphql/staking-contract-list.graphql.ts":
/*!*********************************************************************!*\
  !*** ./src/staking/common/graphql/staking-contract-list.graphql.ts ***!
  \*********************************************************************/
/*! exports provided: STAKING_CONTRACT_LIST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_LIST", function() { return STAKING_CONTRACT_LIST; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
/* harmony import */ var _staking_contract_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./staking-contract.fragment.graphql */ "./src/staking/common/graphql/staking-contract.fragment.graphql.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const STAKING_CONTRACT_LIST = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  query StakingContractList(
    $filter: ProtocolFilterInputType!
    $contractFilter: ContractListFilterInputType
    $contractSort: [ContractListSortInputType!]
    $contractPagination: ContractListPaginationInputType
  ) {
    protocol(filter: $filter) {
      contracts(
        filter: $contractFilter
        sort: $contractSort
        pagination: $contractPagination
      ) {
        list {
          ...stakingContractFragment
        }
        pagination {
          count
        }
      }
    }
  }
  ${_staking_contract_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_FRAGMENT"]}
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/common/graphql/staking-contract-update.graphql.ts":
/*!***********************************************************************!*\
  !*** ./src/staking/common/graphql/staking-contract-update.graphql.ts ***!
  \***********************************************************************/
/*! exports provided: STAKING_CONTRACT_UPDATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_UPDATE", function() { return STAKING_CONTRACT_UPDATE; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
/* harmony import */ var _staking_contract_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./staking-contract.fragment.graphql */ "./src/staking/common/graphql/staking-contract.fragment.graphql.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const STAKING_CONTRACT_UPDATE = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  mutation StakingContractUpdate(
    $id: UuidType!
    $input: ContractUpdateInputType!
  ) {
    contractUpdate(id: $id, input: $input) {
      ...stakingContractFragment
    }
  }
  ${_staking_contract_fragment_graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_FRAGMENT"]}
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/common/graphql/staking-contract.fragment.graphql.ts":
/*!*************************************************************************!*\
  !*** ./src/staking/common/graphql/staking-contract.fragment.graphql.ts ***!
  \*************************************************************************/
/*! exports provided: STAKING_CONTRACT_FRAGMENT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_FRAGMENT", function() { return STAKING_CONTRACT_FRAGMENT; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);


const STAKING_CONTRACT_FRAGMENT = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  fragment stakingContractFragment on ContractType {
    id
    blockchain
    network
    address
    name
    description
    link
    hidden
    createdAt
    adapter
    protocolId
  }
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/common/index.ts":
/*!*************************************!*\
  !*** ./src/staking/common/index.ts ***!
  \*************************************/
/*! exports provided: stakingApi, STAKING_CONTRACT_LIST, STAKING_CONTRACT_DELETE, STAKING_CONTRACT_CREATE, STAKING_CONTRACT_UPDATE, StakingForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _staking_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staking.api */ "./src/staking/common/staking.api.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stakingApi", function() { return _staking_api__WEBPACK_IMPORTED_MODULE_0__["stakingApi"]; });

/* harmony import */ var _graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql */ "./src/staking/common/graphql/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_LIST", function() { return _graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_LIST"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_DELETE", function() { return _graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_DELETE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_CREATE", function() { return _graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_CREATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STAKING_CONTRACT_UPDATE", function() { return _graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_UPDATE"]; });

/* harmony import */ var _staking_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./staking-form */ "./src/staking/common/staking-form/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StakingForm", function() { return _staking_form__WEBPACK_IMPORTED_MODULE_2__["StakingForm"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);





const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/common/staking-form/index.ts":
/*!**************************************************!*\
  !*** ./src/staking/common/staking-form/index.ts ***!
  \**************************************************/
/*! exports provided: StakingForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _staking_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staking-form */ "./src/staking/common/staking-form/staking-form.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StakingForm", function() { return _staking_form__WEBPACK_IMPORTED_MODULE_0__["StakingForm"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/common/staking-form/staking-form.tsx":
/*!**********************************************************!*\
  !*** ./src/staking/common/staking-form/staking-form.tsx ***!
  \**********************************************************/
/*! exports provided: StakingForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StakingForm", function() { return StakingForm; });
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "./node_modules/@material-ui/core/esm/Checkbox/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.js");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "./node_modules/@material-ui/core/esm/MenuItem/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _graphql_generated_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/graphql/_generated-types */ "./src/graphql/_generated-types.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/staking/common/staking-form/staking-form.tsx",
    _s = __webpack_require__.$Refresh$.signature();










const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["makeStyles"])(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(2)
    }
  }
}));
const StakingForm = props => {
  _s();

  var _props$defaultValues, _props$defaultValues2, _props$defaultValues3, _props$defaultValues4, _props$defaultValues5, _props$defaultValues$, _props$defaultValues6, _props$defaultValues7, _props$defaultValues$2, _props$defaultValues8;

  const classes = useStyles();
  const {
    register,
    setValue,
    handleSubmit,
    reset
  } = Object(react_hook_form__WEBPACK_IMPORTED_MODULE_4__["useForm"])();
  const hidden = register('hidden');
  const blockChain = register('blockchain');
  Object(react__WEBPACK_IMPORTED_MODULE_6__["useEffect"])(() => {
    if (!props.defaultValues) return;
    reset(props.defaultValues);
  }, [props.defaultValues, reset]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])("form", {
    noValidate: true,
    autoComplete: "off",
    className: classes.root,
    onSubmit: handleSubmit(props.onSubmit),
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_0__["default"], {
      type: "text",
      label: "Name",
      defaultValue: (_props$defaultValues = props.defaultValues) === null || _props$defaultValues === void 0 ? void 0 : _props$defaultValues.name,
      ...register('name'),
      disabled: props.loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_0__["default"], {
      type: "text",
      label: "Description",
      defaultValue: (_props$defaultValues2 = props.defaultValues) === null || _props$defaultValues2 === void 0 ? void 0 : _props$defaultValues2.description,
      ...register('description'),
      disabled: props.loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_0__["default"], {
      type: "text",
      label: "Adapter",
      defaultValue: (_props$defaultValues3 = props.defaultValues) === null || _props$defaultValues3 === void 0 ? void 0 : _props$defaultValues3.adapter,
      ...register('adapter'),
      disabled: props.loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_0__["default"], {
      type: "text",
      label: "Address",
      defaultValue: (_props$defaultValues4 = props.defaultValues) === null || _props$defaultValues4 === void 0 ? void 0 : _props$defaultValues4.address,
      ...register('address'),
      disabled: props.loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_0__["default"], {
      type: "text",
      label: "Network",
      defaultValue: (_props$defaultValues5 = props.defaultValues) === null || _props$defaultValues5 === void 0 ? void 0 : _props$defaultValues5.network,
      ...register('network'),
      disabled: props.loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_0__["default"], {
      type: "text",
      label: "Blockchain",
      defaultValue: (_props$defaultValues$ = (_props$defaultValues6 = props.defaultValues) === null || _props$defaultValues6 === void 0 ? void 0 : _props$defaultValues6.blockchain) !== null && _props$defaultValues$ !== void 0 ? _props$defaultValues$ : _graphql_generated_types__WEBPACK_IMPORTED_MODULE_7__["BlockchainEnum"].Ethereum,
      select: true,
      disabled: props.loading,
      inputRef: blockChain.ref,
      ...blockChain,
      children: Object.entries(_graphql_generated_types__WEBPACK_IMPORTED_MODULE_7__["BlockchainEnum"]).map(([label, value]) => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: value,
        children: label
      }, label, false, {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 11
      }, undefined))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_0__["default"], {
      type: "text",
      label: "Link",
      defaultValue: (_props$defaultValues7 = props.defaultValues) === null || _props$defaultValues7 === void 0 ? void 0 : _props$defaultValues7.link,
      ...register('link'),
      disabled: props.loading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], {
      children: ["Hidden", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_1__["default"], {
        inputRef: hidden.ref,
        defaultChecked: (_props$defaultValues$2 = (_props$defaultValues8 = props.defaultValues) === null || _props$defaultValues8 === void 0 ? void 0 : _props$defaultValues8.hidden) !== null && _props$defaultValues$2 !== void 0 ? _props$defaultValues$2 : undefined,
        onChange: (_, checked) => setValue('hidden', checked),
        disabled: props.loading
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
      color: "primary",
      variant: "contained",
      disabled: props.loading,
      type: "submit",
      children: "Submit"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 55,
    columnNumber: 5
  }, undefined);
};

_s(StakingForm, "bu38NTHKBP4e/FWIB43RTtMXLlE=", false, function () {
  return [useStyles, react_hook_form__WEBPACK_IMPORTED_MODULE_4__["useForm"]];
});

_c = StakingForm;

var _c;

__webpack_require__.$Refresh$.register(_c, "StakingForm");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/common/staking.api.ts":
/*!*******************************************!*\
  !*** ./src/staking/common/staking.api.ts ***!
  \*******************************************/
/*! exports provided: stakingApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stakingApi", function() { return stakingApi; });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/api */ "./src/api/index.ts");
/* harmony import */ var _graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql */ "./src/staking/common/graphql/index.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const stakingApi = {
  contractList: variables => Object(_api__WEBPACK_IMPORTED_MODULE_0__["getAPIClient"])().mutation(_graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_LIST"], variables).toPromise().then(({
    data
  }) => {
    var _data$protocol$contra, _data$protocol;

    return (_data$protocol$contra = data === null || data === void 0 ? void 0 : (_data$protocol = data.protocol) === null || _data$protocol === void 0 ? void 0 : _data$protocol.contracts.list) !== null && _data$protocol$contra !== void 0 ? _data$protocol$contra : [];
  }),
  contractDelete: id => Object(_api__WEBPACK_IMPORTED_MODULE_0__["getAPIClient"])().mutation(_graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_DELETE"], {
    id
  }).toPromise().then(({
    data
  }) => data === null || data === void 0 ? void 0 : data.contractDelete),
  contractCreate: variables => Object(_api__WEBPACK_IMPORTED_MODULE_0__["getAPIClient"])().mutation(_graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_CREATE"], variables).toPromise().then(({
    data
  }) => data === null || data === void 0 ? void 0 : data.contractCreate.protocolId),
  contractUpdate: variables => Object(_api__WEBPACK_IMPORTED_MODULE_0__["getAPIClient"])().mutation(_graphql__WEBPACK_IMPORTED_MODULE_1__["STAKING_CONTRACT_UPDATE"], variables).toPromise().then(({
    data
  }) => data === null || data === void 0 ? void 0 : data.contractUpdate.protocolId)
};

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/staking-create/index.ts":
/*!*********************************************!*\
  !*** ./src/staking/staking-create/index.ts ***!
  \*********************************************/
/*! exports provided: StakingCreate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _staking_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staking-create */ "./src/staking/staking-create/staking-create.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StakingCreate", function() { return _staking_create__WEBPACK_IMPORTED_MODULE_0__["StakingCreate"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/staking-create/staking-create.model.ts":
/*!************************************************************!*\
  !*** ./src/staking/staking-create/staking-create.model.ts ***!
  \************************************************************/
/*! exports provided: stakingCreateFx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stakingCreateFx", function() { return stakingCreateFx; });
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! effector-logger */ "./node_modules/effector-logger/dist/index.js");
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(effector_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/common/history */ "./src/common/history.ts");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/notifications */ "./src/notifications/index.ts");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/paths */ "./src/paths.ts");
/* harmony import */ var _staking_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/staking/common */ "./src/staking/common/index.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);






const stakingCreate = Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["createDomain"])('stakingCreate');
const stakingCreateFx = stakingCreate.createEffect({
  name: 'stakingCreateFx',
  handler: input => _staking_common__WEBPACK_IMPORTED_MODULE_4__["stakingApi"].contractCreate(input)
});
stakingCreateFx.failData.watch(error => _notifications__WEBPACK_IMPORTED_MODULE_2__["notifications"].error(error.message));
stakingCreateFx.doneData.watch(payload => {
  _common_history__WEBPACK_IMPORTED_MODULE_1__["history"].push(_paths__WEBPACK_IMPORTED_MODULE_3__["paths"].protocols.detail(payload));
});

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/staking-create/staking-create.tsx":
/*!*******************************************************!*\
  !*** ./src/staking/staking-create/staking-create.tsx ***!
  \*******************************************************/
/*! exports provided: StakingCreate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StakingCreate", function() { return StakingCreate; });
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _layouts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/layouts */ "./src/layouts/index.ts");
/* harmony import */ var _staking_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/staking/common */ "./src/staking/common/index.ts");
/* harmony import */ var _staking_create_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./staking-create.model */ "./src/staking/staking-create/staking-create.model.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/staking/staking-create/staking-create.tsx",
    _s = __webpack_require__.$Refresh$.signature();






const StakingCreate = () => {
  _s();

  const params = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_0__["useParams"])();
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_layouts__WEBPACK_IMPORTED_MODULE_1__["MainLayout"], {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_staking_common__WEBPACK_IMPORTED_MODULE_2__["StakingForm"], {
      loading: false,
      onSubmit: formValues => _staking_create_model__WEBPACK_IMPORTED_MODULE_3__["stakingCreateFx"]({
        protocol: params.protocolId,
        input: formValues
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 15,
    columnNumber: 5
  }, undefined);
};

_s(StakingCreate, "+jVsTcECDRo3yq2d7EQxlN9Ixog=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_0__["useParams"]];
});

_c = StakingCreate;

var _c;

__webpack_require__.$Refresh$.register(_c, "StakingCreate");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/staking-list/index.ts":
/*!*******************************************!*\
  !*** ./src/staking/staking-list/index.ts ***!
  \*******************************************/
/*! exports provided: StakingList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _staking_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staking-list */ "./src/staking/staking-list/staking-list.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StakingList", function() { return _staking_list__WEBPACK_IMPORTED_MODULE_0__["StakingList"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/staking-list/staking-list.model.ts":
/*!********************************************************!*\
  !*** ./src/staking/staking-list/staking-list.model.ts ***!
  \********************************************************/
/*! exports provided: stakingListDomain, fetchStakingListFx, deleteStakingFx, $stakingList, Gate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stakingListDomain", function() { return stakingListDomain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStakingListFx", function() { return fetchStakingListFx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteStakingFx", function() { return deleteStakingFx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$stakingList", function() { return $stakingList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gate", function() { return Gate; });
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! effector-logger */ "./node_modules/effector-logger/dist/index.js");
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(effector_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common */ "./src/staking/common/index.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);




const stakingListDomain = Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["createDomain"])('stakingList');
const fetchStakingListFx = stakingListDomain.createEffect({
  name: 'fetchStakingList',
  handler: async id => _common__WEBPACK_IMPORTED_MODULE_2__["stakingApi"].contractList({
    filter: {
      id
    }
  })
});
const ERROR = 'Not deleted';
const deleteStakingFx = stakingListDomain.createEffect({
  name: 'deleteStaking',
  handler: async id => {
    const isDeleted = await _common__WEBPACK_IMPORTED_MODULE_2__["stakingApi"].contractDelete(id);

    if (isDeleted) {
      return id;
    }

    throw new Error(ERROR);
  }
});
const $stakingList = stakingListDomain.createStore([], {
  name: 'protocols'
}).on(fetchStakingListFx.doneData, (_, payload) => payload).on(deleteStakingFx.doneData, (state, payload) => {
  return state.filter(({
    id
  }) => id !== payload);
});
const Gate = Object(effector_react__WEBPACK_IMPORTED_MODULE_1__["createGate"])({
  domain: stakingListDomain
});
Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["sample"])({
  clock: Gate.open,
  target: fetchStakingListFx
});

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/staking-list/staking-list.tsx":
/*!***************************************************!*\
  !*** ./src/staking/staking-list/staking-list.tsx ***!
  \***************************************************/
/*! exports provided: StakingList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StakingList", function() { return StakingList; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/users */ "./src/users/index.ts");
/* harmony import */ var _staking_list_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./staking-list.model */ "./src/staking/staking-list/staking-list.model.ts");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/paths */ "./src/paths.ts");
/* harmony import */ var _common_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~/common/dialog */ "./src/common/dialog/index.ts");
/* harmony import */ var _common_confirm_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ~/common/confirm-dialog */ "./src/common/confirm-dialog/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/staking/staking-list/staking-list.tsx",
    _s = __webpack_require__.$Refresh$.signature();












const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["makeStyles"])(() => ({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },
  card: {
    padding: '10px 15px',
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center'
  },
  icons: {
    display: 'flex',
    '& > *:first-child': {
      marginRight: -3
    },
    '& > *:last-child': {
      marginLeft: -3
    }
  },
  tvl: {
    marginLeft: 'auto'
  },
  mr: {
    marginRight: 10
  }
}));
const StakingList = props => {
  _s();

  const classes = useStyles();
  const ability = Object(_users__WEBPACK_IMPORTED_MODULE_5__["useAbility"])();
  const stakingList = Object(effector_react__WEBPACK_IMPORTED_MODULE_1__["useStore"])(_staking_list_model__WEBPACK_IMPORTED_MODULE_6__["$stakingList"]);
  const loading = Object(effector_react__WEBPACK_IMPORTED_MODULE_1__["useStore"])(_staking_list_model__WEBPACK_IMPORTED_MODULE_6__["fetchStakingListFx"].pending);
  const [openConfirmDialog] = Object(_common_dialog__WEBPACK_IMPORTED_MODULE_8__["useDialog"])(_common_confirm_dialog__WEBPACK_IMPORTED_MODULE_9__["ConfirmDialog"]);
  Object(effector_react__WEBPACK_IMPORTED_MODULE_1__["useGate"])(_staking_list_model__WEBPACK_IMPORTED_MODULE_6__["Gate"], props.protocolId);
  const staking = Object(react__WEBPACK_IMPORTED_MODULE_4__["useMemo"])(() => stakingList.filter(stakingItem => ability.can('read', stakingItem)), [stakingList, ability]);

  const handleOpenConfirmDialog = async id => {
    try {
      await openConfirmDialog();
      await _staking_list_model__WEBPACK_IMPORTED_MODULE_6__["deleteStakingFx"](id);
    } catch (error) {
      console.error(error.message);
    }
  };

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("div", {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_users__WEBPACK_IMPORTED_MODULE_5__["Can"], {
      I: "create",
      a: "Contract",
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
        variant: "contained",
        color: "primary",
        component: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"],
        to: _paths__WEBPACK_IMPORTED_MODULE_7__["paths"].staking.create(props.protocolId),
        children: "New contract"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 82,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("ul", {
      className: classes.root,
      children: [loading && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Paper"], {
        children: "Loading..."
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 21
      }, undefined), !loading && !staking.length && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Paper"], {
        children: "no contracts found"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 41
      }, undefined), !loading && staking.map(stakingListItem => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("li", {
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Paper"], {
          className: classes.card,
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("div", {
            className: `${classes.icons} ${classes.mr}`,
            children: stakingListItem.adapter
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 98,
            columnNumber: 17
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("div", {
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("div", {
              children: stakingListItem.name
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 102,
              columnNumber: 19
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("div", {
              children: stakingListItem.blockchain
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 103,
              columnNumber: 19
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 101,
            columnNumber: 17
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("div", {
            className: `${classes.tvl} ${classes.mr}`,
            children: stakingListItem.network
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 105,
            columnNumber: 17
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("div", {
            className: classes.mr,
            children: stakingListItem.address
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 108,
            columnNumber: 17
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("div", {
            className: classes.mr,
            children: stakingListItem.description
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 109,
            columnNumber: 17
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("div", {
            className: classes.mr,
            children: stakingListItem.link
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 110,
            columnNumber: 17
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("div", {
            className: classes.mr,
            children: String(stakingListItem.hidden)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 111,
            columnNumber: 17
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("div", {
            className: classes.mr,
            children: stakingListItem.createdAt
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 114,
            columnNumber: 17
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 97,
          columnNumber: 15
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_users__WEBPACK_IMPORTED_MODULE_5__["Can"], {
          I: "update",
          a: "Contract",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            variant: "contained",
            component: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"],
            to: _paths__WEBPACK_IMPORTED_MODULE_7__["paths"].staking.update(props.protocolId, stakingListItem.id),
            children: "Edit"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 117,
            columnNumber: 17
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 116,
          columnNumber: 15
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_users__WEBPACK_IMPORTED_MODULE_5__["Can"], {
          I: "delete",
          a: "Contract",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            variant: "contained",
            color: "secondary",
            onClick: () => handleOpenConfirmDialog(stakingListItem.id),
            children: "Delete"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 129,
            columnNumber: 17
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 128,
          columnNumber: 15
        }, undefined)]
      }, stakingListItem.id, true, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 13
      }, undefined))]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 80,
    columnNumber: 5
  }, undefined);
};

_s(StakingList, "1MeGk7r+hQnqoOb8JWLCB7sd7Hg=", false, function () {
  return [useStyles, _users__WEBPACK_IMPORTED_MODULE_5__["useAbility"], effector_react__WEBPACK_IMPORTED_MODULE_1__["useStore"], effector_react__WEBPACK_IMPORTED_MODULE_1__["useStore"], _common_dialog__WEBPACK_IMPORTED_MODULE_8__["useDialog"], effector_react__WEBPACK_IMPORTED_MODULE_1__["useGate"]];
});

_c = StakingList;

var _c;

__webpack_require__.$Refresh$.register(_c, "StakingList");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/staking-update/index.ts":
/*!*********************************************!*\
  !*** ./src/staking/staking-update/index.ts ***!
  \*********************************************/
/*! exports provided: StakingUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _staking_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staking-update */ "./src/staking/staking-update/staking-update.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StakingUpdate", function() { return _staking_update__WEBPACK_IMPORTED_MODULE_0__["StakingUpdate"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/staking-update/staking-update.model.ts":
/*!************************************************************!*\
  !*** ./src/staking/staking-update/staking-update.model.ts ***!
  \************************************************************/
/*! exports provided: stakingUpdateFx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stakingUpdateFx", function() { return stakingUpdateFx; });
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! effector-logger */ "./node_modules/effector-logger/dist/index.js");
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(effector_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/common/history */ "./src/common/history.ts");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/notifications */ "./src/notifications/index.ts");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/paths */ "./src/paths.ts");
/* harmony import */ var _staking_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/staking/common */ "./src/staking/common/index.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);






const stakingUpdate = Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["createDomain"])('stakingUpdate');
const stakingUpdateFx = stakingUpdate.createEffect({
  name: 'stakingUpdateFx',
  handler: input => _staking_common__WEBPACK_IMPORTED_MODULE_4__["stakingApi"].contractUpdate(input)
});
stakingUpdateFx.failData.watch(error => _notifications__WEBPACK_IMPORTED_MODULE_2__["notifications"].error(error.message));
stakingUpdateFx.doneData.watch(payload => {
  _common_history__WEBPACK_IMPORTED_MODULE_1__["history"].push(_paths__WEBPACK_IMPORTED_MODULE_3__["paths"].protocols.detail(payload));
});

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/staking/staking-update/staking-update.tsx":
/*!*******************************************************!*\
  !*** ./src/staking/staking-update/staking-update.tsx ***!
  \*******************************************************/
/*! exports provided: StakingUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StakingUpdate", function() { return StakingUpdate; });
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var _layouts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/layouts */ "./src/layouts/index.ts");
/* harmony import */ var _staking_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/staking/common */ "./src/staking/common/index.ts");
/* harmony import */ var _staking_update_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./staking-update.model */ "./src/staking/staking-update/staking-update.model.ts");
/* harmony import */ var _staking_staking_list_staking_list_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/staking/staking-list/staking-list.model */ "./src/staking/staking-list/staking-list.model.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/staking/staking-update/staking-update.tsx",
    _s = __webpack_require__.$Refresh$.signature();








const StakingUpdate = () => {
  _s();

  const params = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_0__["useParams"])();
  const staking = Object(effector_react__WEBPACK_IMPORTED_MODULE_1__["useStoreMap"])({
    store: _staking_staking_list_staking_list_model__WEBPACK_IMPORTED_MODULE_5__["$stakingList"],
    keys: [params.stakingId],
    fn: (contracts, [stakingId]) => {
      var _contracts$find;

      return (_contracts$find = contracts.find(({
        id
      }) => id === stakingId)) !== null && _contracts$find !== void 0 ? _contracts$find : null;
    }
  });
  Object(effector_react__WEBPACK_IMPORTED_MODULE_1__["useGate"])(_staking_staking_list_staking_list_model__WEBPACK_IMPORTED_MODULE_5__["Gate"], params.protocolId);
  const defaultValues = staking ? {
    blockchain: staking.blockchain,
    network: staking.network,
    address: staking.address,
    name: staking.name,
    description: staking.description,
    link: staking.link,
    hidden: staking.hidden,
    adapter: staking.adapter
  } : undefined;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_layouts__WEBPACK_IMPORTED_MODULE_2__["MainLayout"], {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_staking_common__WEBPACK_IMPORTED_MODULE_3__["StakingForm"], {
      loading: false,
      defaultValues: defaultValues,
      onSubmit: formValues => _staking_update_model__WEBPACK_IMPORTED_MODULE_4__["stakingUpdateFx"]({
        id: params.stakingId,
        input: formValues
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 38,
    columnNumber: 5
  }, undefined);
};

_s(StakingUpdate, "Jlz0LwLDJPpTveVjoY1M+53eHDE=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_0__["useParams"], effector_react__WEBPACK_IMPORTED_MODULE_1__["useStoreMap"], effector_react__WEBPACK_IMPORTED_MODULE_1__["useGate"]];
});

_c = StakingUpdate;

var _c;

__webpack_require__.$Refresh$.register(_c, "StakingUpdate");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/users/common/graphql/index.ts":
/*!*******************************************!*\
  !*** ./src/users/common/graphql/index.ts ***!
  \*******************************************/
/*! exports provided: ME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _me_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./me.graphql */ "./src/users/common/graphql/me.graphql.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ME", function() { return _me_graphql__WEBPACK_IMPORTED_MODULE_0__["ME"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/users/common/graphql/me.graphql.ts":
/*!************************************************!*\
  !*** ./src/users/common/graphql/me.graphql.ts ***!
  \************************************************/
/*! exports provided: ME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ME", function() { return ME; });
/* harmony import */ var _urql_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @urql/core */ "./node_modules/@urql/core/dist/urql-core.mjs");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);


const ME = _urql_core__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  query Me(
    $filter: WalletListFilterInputType
    $sort: [WalletListSortInputType!]
    $pagination: WalletListPaginationInputType
  ) {
    me {
      id
      role
      createdAt
      wallets(filter: $filter, sort: $sort, pagination: $pagination) {
        list {
          id
          blockchain
          network
          address
          publicKey
          createdAt
        }
        pagination {
          count
        }
      }
    }
  }
`;

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/users/common/index.ts":
/*!***********************************!*\
  !*** ./src/users/common/index.ts ***!
  \***********************************/
/*! exports provided: ME, userApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphql */ "./src/users/common/graphql/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ME", function() { return _graphql__WEBPACK_IMPORTED_MODULE_0__["ME"]; });

/* harmony import */ var _user_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.api */ "./src/users/common/user.api.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "userApi", function() { return _user_api__WEBPACK_IMPORTED_MODULE_1__["userApi"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);




const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/users/common/user.api.ts":
/*!**************************************!*\
  !*** ./src/users/common/user.api.ts ***!
  \**************************************/
/*! exports provided: userApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userApi", function() { return userApi; });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/api */ "./src/api/index.ts");
/* harmony import */ var _graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql */ "./src/users/common/graphql/index.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const userApi = {
  me: () => Object(_api__WEBPACK_IMPORTED_MODULE_0__["getAPIClient"])().query(_graphql__WEBPACK_IMPORTED_MODULE_1__["ME"], {}).toPromise().then(({
    data
  }) => data === null || data === void 0 ? void 0 : data.me)
};

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/users/index.ts":
/*!****************************!*\
  !*** ./src/users/index.ts ***!
  \****************************/
/*! exports provided: Can, useAbility, userDomain, fetchUserFx, $user, Gate, UserProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _user_ability__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.ability */ "./src/users/user.ability.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Can", function() { return _user_ability__WEBPACK_IMPORTED_MODULE_0__["Can"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useAbility", function() { return _user_ability__WEBPACK_IMPORTED_MODULE_0__["useAbility"]; });

/* harmony import */ var _user_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.model */ "./src/users/user.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "userDomain", function() { return _user_model__WEBPACK_IMPORTED_MODULE_1__["userDomain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchUserFx", function() { return _user_model__WEBPACK_IMPORTED_MODULE_1__["fetchUserFx"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "$user", function() { return _user_model__WEBPACK_IMPORTED_MODULE_1__["$user"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Gate", function() { return _user_model__WEBPACK_IMPORTED_MODULE_1__["Gate"]; });

/* harmony import */ var _user_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.provider */ "./src/users/user.provider.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserProvider", function() { return _user_provider__WEBPACK_IMPORTED_MODULE_2__["UserProvider"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);





const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/users/user.ability.ts":
/*!***********************************!*\
  !*** ./src/users/user.ability.ts ***!
  \***********************************/
/*! exports provided: AppAbility, defineRulesFor, buildAbilityFor, AbilityContext, Can, useAbility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppAbility", function() { return AppAbility; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defineRulesFor", function() { return defineRulesFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildAbilityFor", function() { return buildAbilityFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbilityContext", function() { return AbilityContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Can", function() { return Can; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAbility", function() { return useAbility; });
/* harmony import */ var _casl_ability__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @casl/ability */ "./node_modules/@casl/ability/dist/es5m/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _casl_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @casl/react */ "./node_modules/@casl/react/dist/es5m/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _s = __webpack_require__.$Refresh$.signature();




const AppAbility = _casl_ability__WEBPACK_IMPORTED_MODULE_0__["Ability"];
const defineRulesFor = role => {
  const {
    can,
    rules
  } = new _casl_ability__WEBPACK_IMPORTED_MODULE_0__["AbilityBuilder"](AppAbility);

  if (role === 'admin') {
    can(['create', 'delete', 'read', 'update'], 'all');
  } else {
    can(['read'], ['Contract', 'Protocol'], {
      hidden: false
    });
  }

  return rules;
};
const buildAbilityFor = role => {
  return new AppAbility(defineRulesFor(role), {
    detectSubjectType: object => {
      if ('network' in object) return 'Contract';
      if ('hidden' in object) return 'Protocol';
      return 'all';
    }
  });
}; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

const AbilityContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])(undefined);
AbilityContext.displayName = 'AbilityContext';
const Can = Object(_casl_react__WEBPACK_IMPORTED_MODULE_2__["createContextualCan"])(AbilityContext.Consumer);
const useAbility = () => {
  _s();

  return Object(_casl_react__WEBPACK_IMPORTED_MODULE_2__["useAbility"])(AbilityContext);
};

_s(useAbility, "MXfLFGhaLwdxfRUmWjYjgqLkeBA=", false, function () {
  return [_casl_react__WEBPACK_IMPORTED_MODULE_2__["useAbility"]];
});

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/users/user.model.ts":
/*!*********************************!*\
  !*** ./src/users/user.model.ts ***!
  \*********************************/
/*! exports provided: userDomain, fetchUserFx, $user, Gate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userDomain", function() { return userDomain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUserFx", function() { return fetchUserFx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$user", function() { return $user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gate", function() { return Gate; });
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! effector-logger */ "./node_modules/effector-logger/dist/index.js");
/* harmony import */ var effector_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(effector_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var _wallets_networks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/wallets/networks */ "./src/wallets/networks/index.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common */ "./src/users/common/index.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);





const userDomain = Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["createDomain"])('user');
const fetchUserFx = userDomain.createEffect({
  name: 'fetchUser',
  handler: async () => _common__WEBPACK_IMPORTED_MODULE_3__["userApi"].me()
});
const $user = userDomain.createStore(null, {
  name: 'store'
}).on(fetchUserFx.doneData, (_, payload) => payload).on(_wallets_networks__WEBPACK_IMPORTED_MODULE_2__["signMessageFx"].doneData, (_, payload) => payload);
const Gate = Object(effector_react__WEBPACK_IMPORTED_MODULE_1__["createGate"])();
Object(effector_logger__WEBPACK_IMPORTED_MODULE_0__["sample"])({
  clock: Gate.open,
  target: fetchUserFx
});

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/users/user.provider.tsx":
/*!*************************************!*\
  !*** ./src/users/user.provider.tsx ***!
  \*************************************/
/*! exports provided: UserProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProvider", function() { return UserProvider; });
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _user_ability__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.ability */ "./src/users/user.ability.ts");
/* harmony import */ var _user_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.model */ "./src/users/user.model.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/users/user.provider.tsx",
    _s = __webpack_require__.$Refresh$.signature();






const UserProvider = props => {
  _s();

  const user = Object(effector_react__WEBPACK_IMPORTED_MODULE_0__["useStore"])(_user_model__WEBPACK_IMPORTED_MODULE_3__["$user"]);
  const ability = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(() => Object(_user_ability__WEBPACK_IMPORTED_MODULE_2__["buildAbilityFor"])(user === null || user === void 0 ? void 0 : user.role), [user]);
  Object(effector_react__WEBPACK_IMPORTED_MODULE_0__["useGate"])(_user_model__WEBPACK_IMPORTED_MODULE_3__["Gate"]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_user_ability__WEBPACK_IMPORTED_MODULE_2__["AbilityContext"].Provider, {
    value: ability,
    children: props.children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 5
  }, undefined);
};

_s(UserProvider, "IJIxrfYDQlGGL4C2GYJUGovD2pE=", false, function () {
  return [effector_react__WEBPACK_IMPORTED_MODULE_0__["useStore"], effector_react__WEBPACK_IMPORTED_MODULE_0__["useGate"]];
});

_c = UserProvider;

var _c;

__webpack_require__.$Refresh$.register(_c, "UserProvider");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/wallets/wallet-detail/index.ts":
/*!********************************************!*\
  !*** ./src/wallets/wallet-detail/index.ts ***!
  \********************************************/
/*! exports provided: WalletDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _wallet_detail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wallet-detail */ "./src/wallets/wallet-detail/wallet-detail.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WalletDetail", function() { return _wallet_detail__WEBPACK_IMPORTED_MODULE_0__["WalletDetail"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/wallets/wallet-detail/wallet-detail.tsx":
/*!*****************************************************!*\
  !*** ./src/wallets/wallet-detail/wallet-detail.tsx ***!
  \*****************************************************/
/*! exports provided: WalletDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletDetail", function() { return WalletDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var effector_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! effector-react */ "./node_modules/effector-react/effector-react.mjs");
/* harmony import */ var _common_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/common/dialog */ "./src/common/dialog/index.ts");
/* harmony import */ var _wallets_networks_network_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/wallets/networks/network.model */ "./src/wallets/networks/network.model.ts");
/* harmony import */ var _common_cut_account__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/common/cut-account */ "./src/common/cut-account.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/wallets/wallet-detail/wallet-detail.tsx",
    _s = __webpack_require__.$Refresh$.signature();








const WalletDetail = props => {
  _s();

  const wallet = Object(effector_react__WEBPACK_IMPORTED_MODULE_2__["useStore"])(_wallets_networks_network_model__WEBPACK_IMPORTED_MODULE_4__["$wallet"]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_common_dialog__WEBPACK_IMPORTED_MODULE_3__["Dialog"], {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("div", {
      children: Object(_common_cut_account__WEBPACK_IMPORTED_MODULE_5__["cutAccount"])(wallet.account)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      onClick: props.onChange,
      children: "Change Wallet"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 5
  }, undefined);
};

_s(WalletDetail, "K88oHb/E98GW5+6Zofs97V+ccU8=", false, function () {
  return [effector_react__WEBPACK_IMPORTED_MODULE_2__["useStore"]];
});

_c = WalletDetail;

var _c;

__webpack_require__.$Refresh$.register(_c, "WalletDetail");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/wallets/wallet-list/index.ts":
/*!******************************************!*\
  !*** ./src/wallets/wallet-list/index.ts ***!
  \******************************************/
/*! exports provided: WalletList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _wallet_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wallet-list */ "./src/wallets/wallet-list/wallet-list.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WalletList", function() { return _wallet_list__WEBPACK_IMPORTED_MODULE_0__["WalletList"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/wallets/wallet-list/wallet-list.tsx":
/*!*************************************************!*\
  !*** ./src/wallets/wallet-list/wallet-list.tsx ***!
  \*************************************************/
/*! exports provided: WalletList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletList", function() { return WalletList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/List */ "./node_modules/@material-ui/core/esm/List/index.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/esm/ListItem/index.js");
/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ "./node_modules/@material-ui/core/esm/ListItemIcon/index.js");
/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/ListItemText */ "./node_modules/@material-ui/core/esm/ListItemText/index.js");
/* harmony import */ var _common_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/common/dialog */ "./src/common/dialog/index.ts");
/* harmony import */ var _wallets_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/wallets/common */ "./src/wallets/common/index.ts");
/* harmony import */ var _wallets_networks_network_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~/wallets/networks/network.model */ "./src/wallets/networks/network.model.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/wallets/wallet-list/wallet-list.tsx",
    _s = __webpack_require__.$Refresh$.signature();











const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])({
  icon: {
    width: 40,
    height: 40
  }
});
const WalletList = props => {
  _s();

  const classes = useStyles();

  const handleActivate = connector => {
    Object(_wallets_networks_network_model__WEBPACK_IMPORTED_MODULE_8__["activateWalletFx"])({
      connector
    }).then(props.onClick);
  };

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_common_dialog__WEBPACK_IMPORTED_MODULE_6__["Dialog"], {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_2__["default"], {
      children: Object.entries(_wallets_common__WEBPACK_IMPORTED_MODULE_7__["connectorsByName"]).map(([walletName, wallet]) => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
        button: true,
        onClick: () => handleActivate(wallet.connector),
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__["default"], {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(wallet.logo, {
            className: classes.icon
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 41,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 13
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__["jsxDEV"])(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_5__["default"], {
          primary: walletName
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 13
        }, undefined)]
      }, walletName, true, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 11
      }, undefined))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 32,
    columnNumber: 5
  }, undefined);
};

_s(WalletList, "8g5FPXexvSEOsxdmU7HicukHGqY=", false, function () {
  return [useStyles];
});

_c = WalletList;

var _c;

__webpack_require__.$Refresh$.register(_c, "WalletList");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ })

})
//# sourceMappingURL=main.e62b5ddf6547440cf521.hot-update.js.map