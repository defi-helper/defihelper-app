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
/* harmony import */ var _common_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/dialog */ "./src/common/dialog/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/tagirgilazov/Desktop/work.nosync/defihelper-frontend/src/app.tsx",
    _s = __webpack_require__.$Refresh$.signature();




const App = () => {
  _s();

  Object(_wallets_networks__WEBPACK_IMPORTED_MODULE_0__["useNetwork"])();
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxDEV"])(_common_dialog__WEBPACK_IMPORTED_MODULE_1__["DialogProvider"], {
    children: "asdf"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 10
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
false,

/***/ "./src/common/confirm-dialog/index.ts":
false,

/***/ "./src/common/cut-account.ts":
false,

/***/ "./src/common/history.ts":
false,

/***/ "./src/common/hooks/index.ts":
false,

/***/ "./src/common/hooks/use-query-params.ts":
false,

/***/ "./src/graphql/_generated-types.ts":
false,

/***/ "./src/layouts/index.ts":
false,

/***/ "./src/layouts/main-layout/index.ts":
false,

/***/ "./src/layouts/main-layout/main-layout.tsx":
false,

/***/ "./src/paths.ts":
false,

/***/ "./src/protocols/common/constants.ts":
false,

/***/ "./src/protocols/common/graphql/index.ts":
false,

/***/ "./src/protocols/common/graphql/protocol-create.graphql.ts":
false,

/***/ "./src/protocols/common/graphql/protocol-delete.graphql.ts":
false,

/***/ "./src/protocols/common/graphql/protocol-detail.graphql.ts":
false,

/***/ "./src/protocols/common/graphql/protocol-list.graphql.ts":
false,

/***/ "./src/protocols/common/graphql/protocol-update.graphql.ts":
false,

/***/ "./src/protocols/common/graphql/protocol.fragment.graphql.ts":
false,

/***/ "./src/protocols/common/index.ts":
false,

/***/ "./src/protocols/common/protocol-form/index.ts":
false,

/***/ "./src/protocols/common/protocol-form/protocol-form.tsx":
false,

/***/ "./src/protocols/common/protocol.api.ts":
false,

/***/ "./src/protocols/protocol-create/index.ts":
false,

/***/ "./src/protocols/protocol-create/protocol-create.model.ts":
false,

/***/ "./src/protocols/protocol-create/protocol-create.tsx":
false,

/***/ "./src/protocols/protocol-detail/index.ts":
false,

/***/ "./src/protocols/protocol-detail/protocol-detail.model.ts":
false,

/***/ "./src/protocols/protocol-detail/protocol-detail.tsx":
false,

/***/ "./src/protocols/protocol-list/index.ts":
false,

/***/ "./src/protocols/protocol-list/protocol-list.model.ts":
false,

/***/ "./src/protocols/protocol-list/protocol-list.tsx":
false,

/***/ "./src/protocols/protocol-update/index.ts":
false,

/***/ "./src/protocols/protocol-update/protocol-update.model.ts":
false,

/***/ "./src/protocols/protocol-update/protocol-update.tsx":
false,

/***/ "./src/router/can-route.tsx":
false,

/***/ "./src/router/index.ts":
false,

/***/ "./src/router/router.tsx":
false,

/***/ "./src/staking/common/graphql/index.ts":
false,

/***/ "./src/staking/common/graphql/staking-contract-create.graphql.ts":
false,

/***/ "./src/staking/common/graphql/staking-contract-delete.graphql.ts":
false,

/***/ "./src/staking/common/graphql/staking-contract-list.graphql.ts":
false,

/***/ "./src/staking/common/graphql/staking-contract-update.graphql.ts":
false,

/***/ "./src/staking/common/graphql/staking-contract.fragment.graphql.ts":
false,

/***/ "./src/staking/common/index.ts":
false,

/***/ "./src/staking/common/staking-form/index.ts":
false,

/***/ "./src/staking/common/staking-form/staking-form.tsx":
false,

/***/ "./src/staking/common/staking.api.ts":
false,

/***/ "./src/staking/staking-create/index.ts":
false,

/***/ "./src/staking/staking-create/staking-create.model.ts":
false,

/***/ "./src/staking/staking-create/staking-create.tsx":
false,

/***/ "./src/staking/staking-list/index.ts":
false,

/***/ "./src/staking/staking-list/staking-list.model.ts":
false,

/***/ "./src/staking/staking-list/staking-list.tsx":
false,

/***/ "./src/staking/staking-update/index.ts":
false,

/***/ "./src/staking/staking-update/staking-update.model.ts":
false,

/***/ "./src/staking/staking-update/staking-update.tsx":
false,

/***/ "./src/users/common/graphql/index.ts":
false,

/***/ "./src/users/common/graphql/me.graphql.ts":
false,

/***/ "./src/users/common/index.ts":
false,

/***/ "./src/users/common/user.api.ts":
false,

/***/ "./src/users/index.ts":
false,

/***/ "./src/users/user.ability.ts":
false,

/***/ "./src/users/user.model.ts":
false,

/***/ "./src/users/user.provider.tsx":
false,

/***/ "./src/wallets/wallet-detail/index.ts":
false,

/***/ "./src/wallets/wallet-detail/wallet-detail.tsx":
false,

/***/ "./src/wallets/wallet-list/index.ts":
false,

/***/ "./src/wallets/wallet-list/wallet-list.tsx":
false

})
//# sourceMappingURL=main.09b2a9ee98f370d18d8b.hot-update.js.map