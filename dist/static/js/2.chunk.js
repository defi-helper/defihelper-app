(this["webpackJsonpstaking"] = this["webpackJsonpstaking"] || []).push([[2],{

/***/ "./node_modules/@json-rpc-tools/types/dist/cjs/blockchain.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/types/dist/cjs/blockchain.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IBlockchainProvider = exports.IBlockchainAuthenticator = exports.IPendingRequests = void 0;

const misc_1 = __webpack_require__(/*! ./misc */ "./node_modules/@json-rpc-tools/types/dist/cjs/misc.js");

const provider_1 = __webpack_require__(/*! ./provider */ "./node_modules/@json-rpc-tools/types/dist/cjs/provider.js");

class IPendingRequests {
  constructor(storage) {
    this.storage = storage;
  }

}

exports.IPendingRequests = IPendingRequests;

class IBlockchainAuthenticator extends misc_1.IEvents {
  constructor(config) {
    super();
    this.config = config;
  }

}

exports.IBlockchainAuthenticator = IBlockchainAuthenticator;

class IBlockchainProvider extends provider_1.IJsonRpcProvider {
  constructor(connection, config) {
    super(connection);
  }

}

exports.IBlockchainProvider = IBlockchainProvider;

/***/ }),

/***/ "./node_modules/@json-rpc-tools/types/dist/cjs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/types/dist/cjs/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

tslib_1.__exportStar(__webpack_require__(/*! ./blockchain */ "./node_modules/@json-rpc-tools/types/dist/cjs/blockchain.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./jsonrpc */ "./node_modules/@json-rpc-tools/types/dist/cjs/jsonrpc.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./misc */ "./node_modules/@json-rpc-tools/types/dist/cjs/misc.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./multi */ "./node_modules/@json-rpc-tools/types/dist/cjs/multi.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./provider */ "./node_modules/@json-rpc-tools/types/dist/cjs/provider.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./router */ "./node_modules/@json-rpc-tools/types/dist/cjs/router.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./schema */ "./node_modules/@json-rpc-tools/types/dist/cjs/schema.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./validator */ "./node_modules/@json-rpc-tools/types/dist/cjs/validator.js"), exports);

/***/ }),

/***/ "./node_modules/@json-rpc-tools/types/dist/cjs/jsonrpc.js":
/*!****************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/types/dist/cjs/jsonrpc.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/***/ }),

/***/ "./node_modules/@json-rpc-tools/types/dist/cjs/misc.js":
/*!*************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/types/dist/cjs/misc.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IEvents = void 0;

class IEvents {}

exports.IEvents = IEvents;

/***/ }),

/***/ "./node_modules/@json-rpc-tools/types/dist/cjs/multi.js":
/*!**************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/types/dist/cjs/multi.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IMultiServiceProvider = void 0;

const provider_1 = __webpack_require__(/*! ./provider */ "./node_modules/@json-rpc-tools/types/dist/cjs/provider.js");

class IMultiServiceProvider extends provider_1.IBaseJsonRpcProvider {
  constructor(config) {
    super();
    this.config = config;
  }

}

exports.IMultiServiceProvider = IMultiServiceProvider;

/***/ }),

/***/ "./node_modules/@json-rpc-tools/types/dist/cjs/provider.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/types/dist/cjs/provider.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IJsonRpcProvider = exports.IBaseJsonRpcProvider = exports.IJsonRpcConnection = void 0;

const misc_1 = __webpack_require__(/*! ./misc */ "./node_modules/@json-rpc-tools/types/dist/cjs/misc.js");

class IJsonRpcConnection extends misc_1.IEvents {
  constructor(opts) {
    super();
  }

}

exports.IJsonRpcConnection = IJsonRpcConnection;

class IBaseJsonRpcProvider extends misc_1.IEvents {
  constructor() {
    super();
  }

}

exports.IBaseJsonRpcProvider = IBaseJsonRpcProvider;

class IJsonRpcProvider extends IBaseJsonRpcProvider {
  constructor(connection) {
    super();
  }

}

exports.IJsonRpcProvider = IJsonRpcProvider;

/***/ }),

/***/ "./node_modules/@json-rpc-tools/types/dist/cjs/router.js":
/*!***************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/types/dist/cjs/router.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IJsonRpcRouter = void 0;

class IJsonRpcRouter {
  constructor(routes) {
    this.routes = routes;
  }

}

exports.IJsonRpcRouter = IJsonRpcRouter;

/***/ }),

/***/ "./node_modules/@json-rpc-tools/types/dist/cjs/schema.js":
/*!***************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/types/dist/cjs/schema.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/***/ }),

/***/ "./node_modules/@json-rpc-tools/types/dist/cjs/validator.js":
/*!******************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/types/dist/cjs/validator.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IJsonRpcValidator = void 0;

class IJsonRpcValidator {
  constructor(schemas) {
    this.schemas = schemas;
  }

}

exports.IJsonRpcValidator = IJsonRpcValidator;

/***/ }),

/***/ "./node_modules/@json-rpc-tools/utils/dist/cjs/constants.js":
/*!******************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/utils/dist/cjs/constants.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STANDARD_ERROR_MAP = exports.SERVER_ERROR_CODE_RANGE = exports.RESERVED_ERROR_CODES = exports.SERVER_ERROR = exports.INTERNAL_ERROR = exports.INVALID_PARAMS = exports.METHOD_NOT_FOUND = exports.INVALID_REQUEST = exports.PARSE_ERROR = void 0;
exports.PARSE_ERROR = "PARSE_ERROR";
exports.INVALID_REQUEST = "INVALID_REQUEST";
exports.METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
exports.INVALID_PARAMS = "INVALID_PARAMS";
exports.INTERNAL_ERROR = "INTERNAL_ERROR";
exports.SERVER_ERROR = "SERVER_ERROR";
exports.RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
exports.SERVER_ERROR_CODE_RANGE = [-32000, -32099];
exports.STANDARD_ERROR_MAP = {
  [exports.PARSE_ERROR]: {
    code: -32700,
    message: "Parse error"
  },
  [exports.INVALID_REQUEST]: {
    code: -32600,
    message: "Invalid Request"
  },
  [exports.METHOD_NOT_FOUND]: {
    code: -32601,
    message: "Method not found"
  },
  [exports.INVALID_PARAMS]: {
    code: -32602,
    message: "Invalid params"
  },
  [exports.INTERNAL_ERROR]: {
    code: -32603,
    message: "Internal error"
  },
  [exports.SERVER_ERROR]: {
    code: -32000,
    message: "Server error"
  }
};

/***/ }),

/***/ "./node_modules/@json-rpc-tools/utils/dist/cjs/error.js":
/*!**************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/utils/dist/cjs/error.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateJsonRpcError = exports.getErrorByCode = exports.getError = exports.isValidErrorCode = exports.isReservedErrorCode = exports.isServerErrorCode = void 0;

const constants_1 = __webpack_require__(/*! ./constants */ "./node_modules/@json-rpc-tools/utils/dist/cjs/constants.js");

function isServerErrorCode(code) {
  return code <= constants_1.SERVER_ERROR_CODE_RANGE[0] && code >= constants_1.SERVER_ERROR_CODE_RANGE[1];
}

exports.isServerErrorCode = isServerErrorCode;

function isReservedErrorCode(code) {
  return constants_1.RESERVED_ERROR_CODES.includes(code);
}

exports.isReservedErrorCode = isReservedErrorCode;

function isValidErrorCode(code) {
  return isServerErrorCode(code) || isReservedErrorCode(code);
}

exports.isValidErrorCode = isValidErrorCode;

function getError(type) {
  if (!Object.keys(constants_1.STANDARD_ERROR_MAP).includes(type)) {
    return constants_1.STANDARD_ERROR_MAP[constants_1.INTERNAL_ERROR];
  }

  return constants_1.STANDARD_ERROR_MAP[type];
}

exports.getError = getError;

function getErrorByCode(code) {
  const match = Object.values(constants_1.STANDARD_ERROR_MAP).find(e => e.code === code);

  if (!match) {
    return constants_1.STANDARD_ERROR_MAP[constants_1.INTERNAL_ERROR];
  }

  return match;
}

exports.getErrorByCode = getErrorByCode;

function validateJsonRpcError(response) {
  if (typeof response.error.code === "undefined") {
    return {
      valid: false,
      error: "Missing code for JSON-RPC error"
    };
  }

  if (typeof response.error.message === "undefined") {
    return {
      valid: false,
      error: "Missing message for JSON-RPC error"
    };
  }

  if (!isValidErrorCode(response.error.code)) {
    return {
      valid: false,
      error: `Invalid error code for JSON-RPC error code: ${response.error.code}`
    };
  }

  if (isReservedErrorCode(response.error.code)) {
    const error = getErrorByCode(response.error.code);

    if (error.message !== constants_1.STANDARD_ERROR_MAP[constants_1.INTERNAL_ERROR].message && response.error.message === error.message) {
      return {
        valid: false,
        error: `Invalid error message for JSON-RPC error code: ${response.error.code}`
      };
    }
  }

  return {
    valid: true
  };
}

exports.validateJsonRpcError = validateJsonRpcError;

/***/ }),

/***/ "./node_modules/@json-rpc-tools/utils/dist/cjs/format.js":
/*!***************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/utils/dist/cjs/format.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatErrorMessage = exports.formatJsonRpcError = exports.formatJsonRpcResult = exports.formatJsonRpcRequest = exports.payloadId = void 0;

const error_1 = __webpack_require__(/*! ./error */ "./node_modules/@json-rpc-tools/utils/dist/cjs/error.js");

const constants_1 = __webpack_require__(/*! ./constants */ "./node_modules/@json-rpc-tools/utils/dist/cjs/constants.js");

function payloadId() {
  const date = Date.now() * Math.pow(10, 3);
  const extra = Math.floor(Math.random() * Math.pow(10, 3));
  return date + extra;
}

exports.payloadId = payloadId;

function formatJsonRpcRequest(method, params, id) {
  return {
    id: id || payloadId(),
    jsonrpc: "2.0",
    method,
    params
  };
}

exports.formatJsonRpcRequest = formatJsonRpcRequest;

function formatJsonRpcResult(id, result) {
  return {
    id,
    jsonrpc: "2.0",
    result
  };
}

exports.formatJsonRpcResult = formatJsonRpcResult;

function formatJsonRpcError(id, error) {
  return {
    id,
    jsonrpc: "2.0",
    error: formatErrorMessage(error)
  };
}

exports.formatJsonRpcError = formatJsonRpcError;

function formatErrorMessage(error) {
  if (typeof error === "undefined") {
    return error_1.getError(constants_1.INTERNAL_ERROR);
  }

  if (typeof error === "string") {
    error = Object.assign(Object.assign({}, error_1.getError(constants_1.SERVER_ERROR)), {
      message: error
    });
  }

  if (error_1.isReservedErrorCode(error.code)) {
    error = error_1.getErrorByCode(error.code);
  }

  if (!error_1.isServerErrorCode(error.code)) {
    throw new Error("Error code is not in server code range");
  }

  return error;
}

exports.formatErrorMessage = formatErrorMessage;

/***/ }),

/***/ "./node_modules/@json-rpc-tools/utils/dist/cjs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/utils/dist/cjs/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

tslib_1.__exportStar(__webpack_require__(/*! ./constants */ "./node_modules/@json-rpc-tools/utils/dist/cjs/constants.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./error */ "./node_modules/@json-rpc-tools/utils/dist/cjs/error.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./format */ "./node_modules/@json-rpc-tools/utils/dist/cjs/format.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./routing */ "./node_modules/@json-rpc-tools/utils/dist/cjs/routing.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./types */ "./node_modules/@json-rpc-tools/utils/dist/cjs/types.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./validators */ "./node_modules/@json-rpc-tools/utils/dist/cjs/validators.js"), exports);

/***/ }),

/***/ "./node_modules/@json-rpc-tools/utils/dist/cjs/routing.js":
/*!****************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/utils/dist/cjs/routing.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidTrailingWildcardRoute = exports.isValidLeadingWildcardRoute = exports.isValidWildcardRoute = exports.isValidDefaultRoute = exports.isValidRoute = void 0;

function isValidRoute(route) {
  if (route.includes("*")) {
    return isValidWildcardRoute(route);
  }

  if (/\W/g.test(route)) {
    return false;
  }

  return true;
}

exports.isValidRoute = isValidRoute;

function isValidDefaultRoute(route) {
  return route === "*";
}

exports.isValidDefaultRoute = isValidDefaultRoute;

function isValidWildcardRoute(route) {
  if (isValidDefaultRoute(route)) {
    return true;
  }

  if (!route.includes("*")) {
    return false;
  }

  if (route.split("*").length !== 2) {
    return false;
  }

  if (route.split("*").filter(x => x.trim() === "").length !== 1) {
    return false;
  }

  return true;
}

exports.isValidWildcardRoute = isValidWildcardRoute;

function isValidLeadingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}

exports.isValidLeadingWildcardRoute = isValidLeadingWildcardRoute;

function isValidTrailingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
}

exports.isValidTrailingWildcardRoute = isValidTrailingWildcardRoute;

/***/ }),

/***/ "./node_modules/@json-rpc-tools/utils/dist/cjs/types.js":
/*!**************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/utils/dist/cjs/types.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

tslib_1.__exportStar(__webpack_require__(/*! @json-rpc-tools/types */ "./node_modules/@json-rpc-tools/types/dist/cjs/index.js"), exports);

/***/ }),

/***/ "./node_modules/@json-rpc-tools/utils/dist/cjs/validators.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@json-rpc-tools/utils/dist/cjs/validators.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isJsonRpcValidationInvalid = exports.isJsonRpcError = exports.isJsonRpcResult = exports.isJsonRpcResponse = exports.isJsonRpcRequest = exports.isJsonRpcPayload = void 0;

function isJsonRpcPayload(payload) {
  return "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}

exports.isJsonRpcPayload = isJsonRpcPayload;

function isJsonRpcRequest(payload) {
  return isJsonRpcPayload(payload) && "method" in payload;
}

exports.isJsonRpcRequest = isJsonRpcRequest;

function isJsonRpcResponse(payload) {
  return isJsonRpcPayload(payload) && ("result" in payload || "error" in payload);
}

exports.isJsonRpcResponse = isJsonRpcResponse;

function isJsonRpcResult(payload) {
  return "result" in payload;
}

exports.isJsonRpcResult = isJsonRpcResult;

function isJsonRpcError(payload) {
  return "error" in payload;
}

exports.isJsonRpcError = isJsonRpcError;

function isJsonRpcValidationInvalid(validation) {
  return "error" in validation && validation.valid === false;
}

exports.isJsonRpcValidationInvalid = isJsonRpcValidationInvalid;

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/aes/async.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/aes/async.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aesCbcDecrypt = exports.aesCbcEncrypt = void 0;

const helpers_1 = __webpack_require__(/*! ../helpers */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/index.js");

function aesCbcEncrypt(iv, key, data) {
  return __awaiter(this, void 0, void 0, function* () {
    let result;

    if (helpers_1.isBrowser()) {
      result = yield helpers_1.browserAesEncrypt(iv, key, data);
    } else if (helpers_1.isNode()) {
      result = helpers_1.nodeAesEncrypt(iv, key, data);
    } else {
      result = helpers_1.fallbackAesEncrypt(iv, key, data);
    }

    return result;
  });
}

exports.aesCbcEncrypt = aesCbcEncrypt;

function aesCbcDecrypt(iv, key, data) {
  return __awaiter(this, void 0, void 0, function* () {
    let result;

    if (helpers_1.isBrowser()) {
      result = yield helpers_1.browserAesDecrypt(iv, key, data);
    } else if (helpers_1.isNode()) {
      result = helpers_1.nodeAesDecrypt(iv, key, data);
    } else {
      result = helpers_1.fallbackAesDecrypt(iv, key, data);
    }

    return result;
  });
}

exports.aesCbcDecrypt = aesCbcDecrypt;

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/aes/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/aes/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(/*! ./async */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/aes/async.js"), exports);

__exportStar(__webpack_require__(/*! ./sync */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/aes/sync.js"), exports);

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/aes/sync.js":
/*!****************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/aes/sync.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aesCbcDecryptSync = exports.aesCbcEncryptSync = void 0;

const helpers_1 = __webpack_require__(/*! ../helpers */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/index.js");

function aesCbcEncryptSync(iv, key, data) {
  let result;

  if (helpers_1.isNode()) {
    result = helpers_1.nodeAesEncrypt(iv, key, data);
  } else {
    result = helpers_1.fallbackAesEncrypt(iv, key, data);
  }

  return result;
}

exports.aesCbcEncryptSync = aesCbcEncryptSync;

function aesCbcDecryptSync(iv, key, data) {
  let result;

  if (helpers_1.isNode()) {
    result = helpers_1.nodeAesDecrypt(iv, key, data);
  } else {
    result = helpers_1.fallbackAesDecrypt(iv, key, data);
  }

  return result;
}

exports.aesCbcDecryptSync = aesCbcDecryptSync;

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/constants/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/constants/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_BAD_MAC = exports.EMPTY_UINT_ARRAY = exports.MAX_MSG_LENGTH = exports.MAX_KEY_LENGTH = exports.PREFIXED_KEY_LENGTH = exports.MAC_LENGTH = exports.IV_LENGTH = exports.KEY_LENGTH = exports.PREFIX_LENGTH = exports.RIPEMD160_NODE_ALGO = exports.SHA512_NODE_ALGO = exports.SHA256_NODE_ALGO = exports.HMAC_NODE_ALGO = exports.AES_NODE_ALGO = exports.SHA512_BROWSER_ALGO = exports.SHA256_BROWSER_ALGO = exports.HMAC_BROWSER = exports.HMAC_BROWSER_ALGO = exports.AES_BROWSER_ALGO = exports.HMAC_LENGTH = exports.AES_LENGTH = exports.LENGTH_1024 = exports.LENGTH_512 = exports.LENGTH_256 = exports.LENGTH_128 = exports.LENGTH_64 = exports.LENGTH_32 = exports.LENGTH_16 = exports.LENGTH_1 = exports.LENGTH_0 = exports.VERIFY_OP = exports.SIGN_OP = exports.DECRYPT_OP = exports.ENCRYPT_OP = exports.UTF8_ENC = exports.HEX_ENC = void 0;
exports.HEX_ENC = 'hex';
exports.UTF8_ENC = 'utf8';
exports.ENCRYPT_OP = 'encrypt';
exports.DECRYPT_OP = 'decrypt';
exports.SIGN_OP = 'sign';
exports.VERIFY_OP = 'verify';
exports.LENGTH_0 = 0;
exports.LENGTH_1 = 1;
exports.LENGTH_16 = 16;
exports.LENGTH_32 = 32;
exports.LENGTH_64 = 64;
exports.LENGTH_128 = 128;
exports.LENGTH_256 = 256;
exports.LENGTH_512 = 512;
exports.LENGTH_1024 = 1024;
exports.AES_LENGTH = exports.LENGTH_256;
exports.HMAC_LENGTH = exports.LENGTH_256;
exports.AES_BROWSER_ALGO = 'AES-CBC';
exports.HMAC_BROWSER_ALGO = `SHA-${exports.AES_LENGTH}`;
exports.HMAC_BROWSER = 'HMAC';
exports.SHA256_BROWSER_ALGO = 'SHA-256';
exports.SHA512_BROWSER_ALGO = 'SHA-512';
exports.AES_NODE_ALGO = `aes-${exports.AES_LENGTH}-cbc`;
exports.HMAC_NODE_ALGO = `sha${exports.HMAC_LENGTH}`;
exports.SHA256_NODE_ALGO = 'sha256';
exports.SHA512_NODE_ALGO = 'sha512';
exports.RIPEMD160_NODE_ALGO = 'ripemd160';
exports.PREFIX_LENGTH = exports.LENGTH_1;
exports.KEY_LENGTH = exports.LENGTH_32;
exports.IV_LENGTH = exports.LENGTH_16;
exports.MAC_LENGTH = exports.LENGTH_32;
exports.PREFIXED_KEY_LENGTH = exports.KEY_LENGTH + exports.PREFIX_LENGTH;
exports.MAX_KEY_LENGTH = exports.LENGTH_1024;
exports.MAX_MSG_LENGTH = exports.LENGTH_32;
exports.EMPTY_UINT_ARRAY = new Uint8Array(exports.LENGTH_0);
exports.ERROR_BAD_MAC = 'Bad MAC';

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/browser.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/browser.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserSha512 = exports.browserSha256 = exports.browserHmacSha512Sign = exports.browserHmacSha256Sign = exports.browserAesDecrypt = exports.browserAesEncrypt = exports.browserImportKey = exports.browserExportKey = exports.getOps = exports.getAlgo = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;

const constants_1 = __webpack_require__(/*! ../constants */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/constants/index.js");

function getBrowerCrypto() {
  return (global === null || global === void 0 ? void 0 : global.crypto) || (global === null || global === void 0 ? void 0 : global.msCrypto) || {};
}

exports.getBrowerCrypto = getBrowerCrypto;

function getSubtleCrypto() {
  const browserCrypto = getBrowerCrypto();
  return browserCrypto.subtle || browserCrypto.webkitSubtle;
}

exports.getSubtleCrypto = getSubtleCrypto;

function getAlgo(type) {
  return type === constants_1.AES_BROWSER_ALGO ? {
    length: constants_1.AES_LENGTH,
    name: constants_1.AES_BROWSER_ALGO
  } : {
    hash: {
      name: constants_1.HMAC_BROWSER_ALGO
    },
    name: constants_1.HMAC_BROWSER
  };
}

exports.getAlgo = getAlgo;

function getOps(type) {
  return type === constants_1.AES_BROWSER_ALGO ? [constants_1.ENCRYPT_OP, constants_1.DECRYPT_OP] : [constants_1.SIGN_OP, constants_1.VERIFY_OP];
}

exports.getOps = getOps;

function browserExportKey(cryptoKey, type = constants_1.AES_BROWSER_ALGO) {
  return __awaiter(this, void 0, void 0, function* () {
    const subtle = getSubtleCrypto();
    return new Uint8Array(yield subtle.exportKey('raw', cryptoKey));
  });
}

exports.browserExportKey = browserExportKey;

function browserImportKey(buffer, type = constants_1.AES_BROWSER_ALGO) {
  return __awaiter(this, void 0, void 0, function* () {
    return getSubtleCrypto().importKey('raw', buffer, getAlgo(type), true, getOps(type));
  });
}

exports.browserImportKey = browserImportKey;

function browserAesEncrypt(iv, key, data) {
  return __awaiter(this, void 0, void 0, function* () {
    const subtle = getSubtleCrypto();
    const cryptoKey = yield browserImportKey(key, constants_1.AES_BROWSER_ALGO);
    const result = yield subtle.encrypt({
      iv,
      name: constants_1.AES_BROWSER_ALGO
    }, cryptoKey, data);
    return new Uint8Array(result);
  });
}

exports.browserAesEncrypt = browserAesEncrypt;

function browserAesDecrypt(iv, key, data) {
  return __awaiter(this, void 0, void 0, function* () {
    const subtle = getSubtleCrypto();
    const cryptoKey = yield browserImportKey(key, constants_1.AES_BROWSER_ALGO);
    const result = yield subtle.decrypt({
      iv,
      name: constants_1.AES_BROWSER_ALGO
    }, cryptoKey, data);
    return new Uint8Array(result);
  });
}

exports.browserAesDecrypt = browserAesDecrypt;

function browserHmacSha256Sign(key, data) {
  return __awaiter(this, void 0, void 0, function* () {
    const subtle = getSubtleCrypto();
    const cryptoKey = yield browserImportKey(key, constants_1.HMAC_BROWSER);
    const signature = yield subtle.sign({
      length: constants_1.HMAC_LENGTH,
      name: constants_1.HMAC_BROWSER
    }, cryptoKey, data);
    return new Uint8Array(signature);
  });
}

exports.browserHmacSha256Sign = browserHmacSha256Sign;

function browserHmacSha512Sign(key, data) {
  return __awaiter(this, void 0, void 0, function* () {
    const subtle = getSubtleCrypto();
    const cryptoKey = yield browserImportKey(key, constants_1.HMAC_BROWSER);
    const signature = yield subtle.sign({
      length: constants_1.LENGTH_512,
      name: constants_1.HMAC_BROWSER
    }, cryptoKey, data);
    return new Uint8Array(signature);
  });
}

exports.browserHmacSha512Sign = browserHmacSha512Sign;

function browserSha256(data) {
  return __awaiter(this, void 0, void 0, function* () {
    const subtle = getSubtleCrypto();
    const result = yield subtle.digest({
      name: constants_1.SHA256_BROWSER_ALGO
    }, data);
    return new Uint8Array(result);
  });
}

exports.browserSha256 = browserSha256;

function browserSha512(data) {
  return __awaiter(this, void 0, void 0, function* () {
    const subtle = getSubtleCrypto();
    const result = yield subtle.digest({
      name: constants_1.SHA512_BROWSER_ALGO
    }, data);
    return new Uint8Array(result);
  });
}

exports.browserSha512 = browserSha512;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/fallback.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/fallback.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fallbackRipemd160 = exports.fallbackSha512 = exports.fallbackSha256 = exports.fallbackHmacSha512Sign = exports.fallbackHmacSha256Sign = exports.fallbackAesDecrypt = exports.fallbackAesEncrypt = void 0;

const aes_js_1 = __importDefault(__webpack_require__(/*! aes-js */ "./node_modules/@pedrouid/iso-crypto/node_modules/aes-js/index.js"));

const hash = __importStar(__webpack_require__(/*! hash.js */ "./node_modules/hash.js/lib/hash.js"));

const enc_utils_1 = __webpack_require__(/*! enc-utils */ "./node_modules/enc-utils/dist/cjs/index.js");

const constants_1 = __webpack_require__(/*! ../constants */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/constants/index.js");

const index_1 = __webpack_require__(/*! ../index */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/index.js");

function fallbackAesEncrypt(iv, key, data) {
  const aesCbc = new aes_js_1.default.ModeOfOperation.cbc(key, iv);
  const padded = index_1.pkcs7.pad(data);
  const encryptedBytes = aesCbc.encrypt(padded);
  return new Uint8Array(encryptedBytes);
}

exports.fallbackAesEncrypt = fallbackAesEncrypt;

function fallbackAesDecrypt(iv, key, data) {
  const aesCbc = new aes_js_1.default.ModeOfOperation.cbc(key, iv);
  const encryptedBytes = aesCbc.decrypt(data);
  const padded = new Uint8Array(encryptedBytes);
  const result = index_1.pkcs7.unpad(padded);
  return result;
}

exports.fallbackAesDecrypt = fallbackAesDecrypt;

function fallbackHmacSha256Sign(key, data) {
  const result = hash.hmac(hash[constants_1.SHA256_NODE_ALGO], key).update(data).digest(constants_1.HEX_ENC);
  return enc_utils_1.hexToArray(result);
}

exports.fallbackHmacSha256Sign = fallbackHmacSha256Sign;

function fallbackHmacSha512Sign(key, data) {
  const result = hash.hmac(hash[constants_1.SHA512_NODE_ALGO], key).update(data).digest(constants_1.HEX_ENC);
  return enc_utils_1.hexToArray(result);
}

exports.fallbackHmacSha512Sign = fallbackHmacSha512Sign;

function fallbackSha256(msg) {
  const result = hash.sha256().update(msg).digest(constants_1.HEX_ENC);
  return enc_utils_1.hexToArray(result);
}

exports.fallbackSha256 = fallbackSha256;

function fallbackSha512(msg) {
  const result = hash.sha512().update(msg).digest(constants_1.HEX_ENC);
  return enc_utils_1.hexToArray(result);
}

exports.fallbackSha512 = fallbackSha512;

function fallbackRipemd160(msg) {
  const result = hash.ripemd160().update(msg).digest(constants_1.HEX_ENC);
  return enc_utils_1.hexToArray(result);
}

exports.fallbackRipemd160 = fallbackRipemd160;

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(/*! ./browser */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/browser.js"), exports);

__exportStar(__webpack_require__(/*! ./fallback */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/fallback.js"), exports);

__exportStar(__webpack_require__(/*! ./node */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/node.js"), exports);

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/node.js":
/*!************************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/node.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeRipemd160 = exports.nodeSha512 = exports.nodeSha256 = exports.nodeHmacSha512Sign = exports.nodeHmacSha256Sign = exports.nodeAesDecrypt = exports.nodeAesEncrypt = void 0;

const crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "./node_modules/crypto-browserify/index.js"));

const enc_utils_1 = __webpack_require__(/*! enc-utils */ "./node_modules/enc-utils/dist/cjs/index.js");

const constants_1 = __webpack_require__(/*! ../constants */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/constants/index.js");

function nodeAesEncrypt(iv, key, data) {
  const cipher = crypto_1.default.createCipheriv(constants_1.AES_NODE_ALGO, key, iv);
  return enc_utils_1.bufferToArray(enc_utils_1.concatBuffers(cipher.update(data), cipher.final()));
}

exports.nodeAesEncrypt = nodeAesEncrypt;

function nodeAesDecrypt(iv, key, data) {
  const decipher = crypto_1.default.createDecipheriv(constants_1.AES_NODE_ALGO, key, iv);
  return enc_utils_1.bufferToArray(enc_utils_1.concatBuffers(decipher.update(data), decipher.final()));
}

exports.nodeAesDecrypt = nodeAesDecrypt;

function nodeHmacSha256Sign(key, data) {
  const buf = crypto_1.default.createHmac(constants_1.HMAC_NODE_ALGO, new Uint8Array(key)).update(data).digest();
  return enc_utils_1.bufferToArray(buf);
}

exports.nodeHmacSha256Sign = nodeHmacSha256Sign;

function nodeHmacSha512Sign(key, data) {
  const buf = crypto_1.default.createHmac(constants_1.SHA512_NODE_ALGO, new Uint8Array(key)).update(data).digest();
  return enc_utils_1.bufferToArray(buf);
}

exports.nodeHmacSha512Sign = nodeHmacSha512Sign;

function nodeSha256(data) {
  const buf = crypto_1.default.createHash(constants_1.SHA256_NODE_ALGO).update(data).digest();
  return enc_utils_1.bufferToArray(buf);
}

exports.nodeSha256 = nodeSha256;

function nodeSha512(data) {
  const buf = crypto_1.default.createHash(constants_1.SHA512_NODE_ALGO).update(data).digest();
  return enc_utils_1.bufferToArray(buf);
}

exports.nodeSha512 = nodeSha512;

function nodeRipemd160(data) {
  const buf = crypto_1.default.createHash(constants_1.RIPEMD160_NODE_ALGO).update(data).digest();
  return enc_utils_1.bufferToArray(buf);
}

exports.nodeRipemd160 = nodeRipemd160;

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(/*! ./constants */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/constants/index.js"), exports);

__exportStar(__webpack_require__(/*! ./env */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/index.js"), exports);

__exportStar(__webpack_require__(/*! ./pkcs7 */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/pkcs7.js"), exports);

__exportStar(__webpack_require__(/*! ./types */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/types.js"), exports);

__exportStar(__webpack_require__(/*! ./validators */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/validators.js"), exports);

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/pkcs7.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/pkcs7.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pkcs7 = void 0;
let PADDING = [[16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16], [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15], [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14], [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13], [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12], [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [9, 9, 9, 9, 9, 9, 9, 9, 9], [8, 8, 8, 8, 8, 8, 8, 8], [7, 7, 7, 7, 7, 7, 7], [6, 6, 6, 6, 6, 6], [5, 5, 5, 5, 5], [4, 4, 4, 4], [3, 3, 3], [2, 2], [1]];
exports.pkcs7 = {
  pad(plaintext) {
    const padding = PADDING[plaintext.byteLength % 16 || 0];
    const result = new Uint8Array(plaintext.byteLength + padding.length);
    result.set(plaintext);
    result.set(padding, plaintext.byteLength);
    return result;
  },

  unpad(padded) {
    return padded.subarray(0, padded.byteLength - padded[padded.byteLength - 1]);
  }

};

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/types.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/types.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/validators.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/validators.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isConstantTime = exports.isNode = exports.isBrowser = exports.assert = void 0;

const env_1 = __webpack_require__(/*! ./env */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/env/index.js");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

exports.assert = assert;

function isBrowser() {
  return !!env_1.getBrowerCrypto() && !!env_1.getSubtleCrypto();
}

exports.isBrowser = isBrowser;

function isNode() {
  return typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.node !== 'undefined';
}

exports.isNode = isNode;

function isConstantTime(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let res = 0;

  for (let i = 0; i < arr1.length; i++) {
    res |= arr1[i] ^ arr2[i];
  }

  return res === 0;
}

exports.isConstantTime = isConstantTime;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/hmac/async.js":
/*!******************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/hmac/async.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hmacSha512Verify = exports.hmacSha512Sign = exports.hmacSha256Verify = exports.hmacSha256Sign = void 0;

const helpers_1 = __webpack_require__(/*! ../helpers */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/index.js");

function hmacSha256Sign(key, msg) {
  return __awaiter(this, void 0, void 0, function* () {
    let result;

    if (helpers_1.isBrowser()) {
      result = yield helpers_1.browserHmacSha256Sign(key, msg);
    } else if (helpers_1.isNode()) {
      result = helpers_1.nodeHmacSha256Sign(key, msg);
    } else {
      result = helpers_1.fallbackHmacSha256Sign(key, msg);
    }

    return result;
  });
}

exports.hmacSha256Sign = hmacSha256Sign;

function hmacSha256Verify(key, msg, sig) {
  return __awaiter(this, void 0, void 0, function* () {
    let result;

    if (helpers_1.isBrowser()) {
      const expectedSig = yield helpers_1.browserHmacSha256Sign(key, msg);
      result = helpers_1.isConstantTime(expectedSig, sig);
    } else if (helpers_1.isNode()) {
      const expectedSig = helpers_1.nodeHmacSha256Sign(key, msg);
      result = helpers_1.isConstantTime(expectedSig, sig);
    } else {
      const expectedSig = helpers_1.fallbackHmacSha256Sign(key, msg);
      result = helpers_1.isConstantTime(expectedSig, sig);
    }

    return result;
  });
}

exports.hmacSha256Verify = hmacSha256Verify;

function hmacSha512Sign(key, msg) {
  return __awaiter(this, void 0, void 0, function* () {
    let result;

    if (helpers_1.isBrowser()) {
      result = yield helpers_1.browserHmacSha512Sign(key, msg);
    } else if (helpers_1.isNode()) {
      result = helpers_1.nodeHmacSha512Sign(key, msg);
    } else {
      result = helpers_1.fallbackHmacSha512Sign(key, msg);
    }

    return result;
  });
}

exports.hmacSha512Sign = hmacSha512Sign;

function hmacSha512Verify(key, msg, sig) {
  return __awaiter(this, void 0, void 0, function* () {
    let result;

    if (helpers_1.isNode()) {
      const expectedSig = helpers_1.nodeHmacSha512Sign(key, msg);
      result = helpers_1.isConstantTime(expectedSig, sig);
    } else {
      const expectedSig = helpers_1.fallbackHmacSha512Sign(key, msg);
      result = helpers_1.isConstantTime(expectedSig, sig);
    }

    return result;
  });
}

exports.hmacSha512Verify = hmacSha512Verify;

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/hmac/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/hmac/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(/*! ./async */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/hmac/async.js"), exports);

__exportStar(__webpack_require__(/*! ./sync */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/hmac/sync.js"), exports);

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/hmac/sync.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/hmac/sync.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hmacSha512VerifySync = exports.hmacSha512SignSync = exports.hmacSha256VerifySync = exports.hmacSha256SignSync = void 0;

const helpers_1 = __webpack_require__(/*! ../helpers */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/index.js");

function hmacSha256SignSync(key, msg) {
  let result;

  if (helpers_1.isNode()) {
    result = helpers_1.nodeHmacSha256Sign(key, msg);
  } else {
    result = helpers_1.fallbackHmacSha256Sign(key, msg);
  }

  return result;
}

exports.hmacSha256SignSync = hmacSha256SignSync;

function hmacSha256VerifySync(key, msg, sig) {
  let result;

  if (helpers_1.isNode()) {
    const expectedSig = helpers_1.nodeHmacSha256Sign(key, msg);
    result = helpers_1.isConstantTime(expectedSig, sig);
  } else {
    const expectedSig = helpers_1.fallbackHmacSha256Sign(key, msg);
    result = helpers_1.isConstantTime(expectedSig, sig);
  }

  return result;
}

exports.hmacSha256VerifySync = hmacSha256VerifySync;

function hmacSha512SignSync(key, msg) {
  let result;

  if (helpers_1.isNode()) {
    result = helpers_1.nodeHmacSha512Sign(key, msg);
  } else {
    result = helpers_1.fallbackHmacSha512Sign(key, msg);
  }

  return result;
}

exports.hmacSha512SignSync = hmacSha512SignSync;

function hmacSha512VerifySync(key, msg, sig) {
  let result;

  if (helpers_1.isNode()) {
    const expectedSig = helpers_1.nodeHmacSha512Sign(key, msg);
    result = helpers_1.isConstantTime(expectedSig, sig);
  } else {
    const expectedSig = helpers_1.fallbackHmacSha512Sign(key, msg);
    result = helpers_1.isConstantTime(expectedSig, sig);
  }

  return result;
}

exports.hmacSha512VerifySync = hmacSha512VerifySync;

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(/*! ./aes */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/aes/index.js"), exports);

__exportStar(__webpack_require__(/*! ./helpers */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/index.js"), exports);

__exportStar(__webpack_require__(/*! ./hmac */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/hmac/index.js"), exports);

__exportStar(__webpack_require__(/*! ./random */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/random/index.js"), exports);

__exportStar(__webpack_require__(/*! ./sha2 */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/sha2/index.js"), exports);

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/random/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/random/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomBytes = void 0;

const isoRandom = __importStar(__webpack_require__(/*! @pedrouid/iso-random */ "./node_modules/@pedrouid/iso-random/dist/cjs/node/index.js"));

function randomBytes(length) {
  return isoRandom.randomBytes(length);
}

exports.randomBytes = randomBytes;

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/sha2/async.js":
/*!******************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/sha2/async.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ripemd160 = exports.sha512 = exports.sha256 = void 0;

const helpers_1 = __webpack_require__(/*! ../helpers */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/index.js");

function sha256(msg) {
  return __awaiter(this, void 0, void 0, function* () {
    let result = helpers_1.EMPTY_UINT_ARRAY;

    if (helpers_1.isBrowser()) {
      result = yield helpers_1.browserSha256(msg);
    } else if (helpers_1.isNode()) {
      result = helpers_1.nodeSha256(msg);
    } else {
      result = helpers_1.fallbackSha256(msg);
    }

    return result;
  });
}

exports.sha256 = sha256;

function sha512(msg) {
  return __awaiter(this, void 0, void 0, function* () {
    let result = helpers_1.EMPTY_UINT_ARRAY;

    if (helpers_1.isBrowser()) {
      result = yield helpers_1.browserSha512(msg);
    } else if (helpers_1.isNode()) {
      result = helpers_1.nodeSha512(msg);
    } else {
      result = helpers_1.fallbackSha512(msg);
    }

    return result;
  });
}

exports.sha512 = sha512;

function ripemd160(msg) {
  return __awaiter(this, void 0, void 0, function* () {
    let result = helpers_1.EMPTY_UINT_ARRAY;

    if (helpers_1.isNode()) {
      result = helpers_1.nodeRipemd160(msg);
    } else {
      result = helpers_1.fallbackRipemd160(msg);
    }

    return result;
  });
}

exports.ripemd160 = ripemd160;

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/sha2/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/sha2/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(/*! ./async */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/sha2/async.js"), exports);

__exportStar(__webpack_require__(/*! ./sync */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/sha2/sync.js"), exports);

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/dist/cjs/sha2/sync.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/dist/cjs/sha2/sync.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ripemd160Sync = exports.sha512Sync = exports.sha256Sync = void 0;

const helpers_1 = __webpack_require__(/*! ../helpers */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/helpers/index.js");

function sha256Sync(msg) {
  let result = helpers_1.EMPTY_UINT_ARRAY;

  if (helpers_1.isNode()) {
    result = helpers_1.nodeSha256(msg);
  } else {
    result = helpers_1.fallbackSha256(msg);
  }

  return result;
}

exports.sha256Sync = sha256Sync;

function sha512Sync(msg) {
  let result = helpers_1.EMPTY_UINT_ARRAY;

  if (helpers_1.isNode()) {
    result = helpers_1.nodeSha512(msg);
  } else {
    result = helpers_1.fallbackSha512(msg);
  }

  return result;
}

exports.sha512Sync = sha512Sync;

function ripemd160Sync(msg) {
  let result = helpers_1.EMPTY_UINT_ARRAY;

  if (helpers_1.isNode()) {
    result = helpers_1.nodeRipemd160(msg);
  } else {
    result = helpers_1.fallbackRipemd160(msg);
  }

  return result;
}

exports.ripemd160Sync = ripemd160Sync;

/***/ }),

/***/ "./node_modules/@pedrouid/iso-crypto/node_modules/aes-js/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-crypto/node_modules/aes-js/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
(function (root) {
  "use strict";

  function checkInt(value) {
    return parseInt(value) === value;
  }

  function checkInts(arrayish) {
    if (!checkInt(arrayish.length)) {
      return false;
    }

    for (var i = 0; i < arrayish.length; i++) {
      if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
        return false;
      }
    }

    return true;
  }

  function coerceArray(arg, copy) {
    // ArrayBuffer view
    if (arg.buffer && arg.name === 'Uint8Array') {
      if (copy) {
        if (arg.slice) {
          arg = arg.slice();
        } else {
          arg = Array.prototype.slice.call(arg);
        }
      }

      return arg;
    } // It's an array; check it is a valid representation of a byte


    if (Array.isArray(arg)) {
      if (!checkInts(arg)) {
        throw new Error('Array contains invalid value: ' + arg);
      }

      return new Uint8Array(arg);
    } // Something else, but behaves like an array (maybe a Buffer? Arguments?)


    if (checkInt(arg.length) && checkInts(arg)) {
      return new Uint8Array(arg);
    }

    throw new Error('unsupported array-like object');
  }

  function createArray(length) {
    return new Uint8Array(length);
  }

  function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
    if (sourceStart != null || sourceEnd != null) {
      if (sourceArray.slice) {
        sourceArray = sourceArray.slice(sourceStart, sourceEnd);
      } else {
        sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
      }
    }

    targetArray.set(sourceArray, targetStart);
  }

  var convertUtf8 = function () {
    function toBytes(text) {
      var result = [],
          i = 0;
      text = encodeURI(text);

      while (i < text.length) {
        var c = text.charCodeAt(i++); // if it is a % sign, encode the following 2 bytes as a hex value

        if (c === 37) {
          result.push(parseInt(text.substr(i, 2), 16));
          i += 2; // otherwise, just the actual byte
        } else {
          result.push(c);
        }
      }

      return coerceArray(result);
    }

    function fromBytes(bytes) {
      var result = [],
          i = 0;

      while (i < bytes.length) {
        var c = bytes[i];

        if (c < 128) {
          result.push(String.fromCharCode(c));
          i++;
        } else if (c > 191 && c < 224) {
          result.push(String.fromCharCode((c & 0x1f) << 6 | bytes[i + 1] & 0x3f));
          i += 2;
        } else {
          result.push(String.fromCharCode((c & 0x0f) << 12 | (bytes[i + 1] & 0x3f) << 6 | bytes[i + 2] & 0x3f));
          i += 3;
        }
      }

      return result.join('');
    }

    return {
      toBytes: toBytes,
      fromBytes: fromBytes
    };
  }();

  var convertHex = function () {
    function toBytes(text) {
      var result = [];

      for (var i = 0; i < text.length; i += 2) {
        result.push(parseInt(text.substr(i, 2), 16));
      }

      return result;
    } // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html


    var Hex = '0123456789abcdef';

    function fromBytes(bytes) {
      var result = [];

      for (var i = 0; i < bytes.length; i++) {
        var v = bytes[i];
        result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
      }

      return result.join('');
    }

    return {
      toBytes: toBytes,
      fromBytes: fromBytes
    };
  }(); // Number of rounds by keysize


  var numberOfRounds = {
    16: 10,
    24: 12,
    32: 14
  }; // Round constant words

  var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91]; // S-box and Inverse S-box (S is for Substitution)

  var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
  var Si = [0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d]; // Transformations for encryption

  var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
  var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
  var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
  var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c]; // Transformations for decryption

  var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
  var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
  var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
  var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0]; // Transformations for decryption key expansion

  var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
  var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
  var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
  var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

  function convertToInt32(bytes) {
    var result = [];

    for (var i = 0; i < bytes.length; i += 4) {
      result.push(bytes[i] << 24 | bytes[i + 1] << 16 | bytes[i + 2] << 8 | bytes[i + 3]);
    }

    return result;
  }

  var AES = function (key) {
    if (!(this instanceof AES)) {
      throw Error('AES must be instanitated with `new`');
    }

    Object.defineProperty(this, 'key', {
      value: coerceArray(key, true)
    });

    this._prepare();
  };

  AES.prototype._prepare = function () {
    var rounds = numberOfRounds[this.key.length];

    if (rounds == null) {
      throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
    } // encryption round keys


    this._Ke = []; // decryption round keys

    this._Kd = [];

    for (var i = 0; i <= rounds; i++) {
      this._Ke.push([0, 0, 0, 0]);

      this._Kd.push([0, 0, 0, 0]);
    }

    var roundKeyCount = (rounds + 1) * 4;
    var KC = this.key.length / 4; // convert the key into ints

    var tk = convertToInt32(this.key); // copy values into round key arrays

    var index;

    for (var i = 0; i < KC; i++) {
      index = i >> 2;
      this._Ke[index][i % 4] = tk[i];
      this._Kd[rounds - index][i % 4] = tk[i];
    } // key expansion (fips-197 section 5.2)


    var rconpointer = 0;
    var t = KC,
        tt;

    while (t < roundKeyCount) {
      tt = tk[KC - 1];
      tk[0] ^= S[tt >> 16 & 0xFF] << 24 ^ S[tt >> 8 & 0xFF] << 16 ^ S[tt & 0xFF] << 8 ^ S[tt >> 24 & 0xFF] ^ rcon[rconpointer] << 24;
      rconpointer += 1; // key expansion (for non-256 bit)

      if (KC != 8) {
        for (var i = 1; i < KC; i++) {
          tk[i] ^= tk[i - 1];
        } // key expansion for 256-bit keys is "slightly different" (fips-197)

      } else {
        for (var i = 1; i < KC / 2; i++) {
          tk[i] ^= tk[i - 1];
        }

        tt = tk[KC / 2 - 1];
        tk[KC / 2] ^= S[tt & 0xFF] ^ S[tt >> 8 & 0xFF] << 8 ^ S[tt >> 16 & 0xFF] << 16 ^ S[tt >> 24 & 0xFF] << 24;

        for (var i = KC / 2 + 1; i < KC; i++) {
          tk[i] ^= tk[i - 1];
        }
      } // copy values into round key arrays


      var i = 0,
          r,
          c;

      while (i < KC && t < roundKeyCount) {
        r = t >> 2;
        c = t % 4;
        this._Ke[r][c] = tk[i];
        this._Kd[rounds - r][c] = tk[i++];
        t++;
      }
    } // inverse-cipher-ify the decryption round key (fips-197 section 5.3)


    for (var r = 1; r < rounds; r++) {
      for (var c = 0; c < 4; c++) {
        tt = this._Kd[r][c];
        this._Kd[r][c] = U1[tt >> 24 & 0xFF] ^ U2[tt >> 16 & 0xFF] ^ U3[tt >> 8 & 0xFF] ^ U4[tt & 0xFF];
      }
    }
  };

  AES.prototype.encrypt = function (plaintext) {
    if (plaintext.length != 16) {
      throw new Error('invalid plaintext size (must be 16 bytes)');
    }

    var rounds = this._Ke.length - 1;
    var a = [0, 0, 0, 0]; // convert plaintext to (ints ^ key)

    var t = convertToInt32(plaintext);

    for (var i = 0; i < 4; i++) {
      t[i] ^= this._Ke[0][i];
    } // apply round transforms


    for (var r = 1; r < rounds; r++) {
      for (var i = 0; i < 4; i++) {
        a[i] = T1[t[i] >> 24 & 0xff] ^ T2[t[(i + 1) % 4] >> 16 & 0xff] ^ T3[t[(i + 2) % 4] >> 8 & 0xff] ^ T4[t[(i + 3) % 4] & 0xff] ^ this._Ke[r][i];
      }

      t = a.slice();
    } // the last round is special


    var result = createArray(16),
        tt;

    for (var i = 0; i < 4; i++) {
      tt = this._Ke[rounds][i];
      result[4 * i] = (S[t[i] >> 24 & 0xff] ^ tt >> 24) & 0xff;
      result[4 * i + 1] = (S[t[(i + 1) % 4] >> 16 & 0xff] ^ tt >> 16) & 0xff;
      result[4 * i + 2] = (S[t[(i + 2) % 4] >> 8 & 0xff] ^ tt >> 8) & 0xff;
      result[4 * i + 3] = (S[t[(i + 3) % 4] & 0xff] ^ tt) & 0xff;
    }

    return result;
  };

  AES.prototype.decrypt = function (ciphertext) {
    if (ciphertext.length != 16) {
      throw new Error('invalid ciphertext size (must be 16 bytes)');
    }

    var rounds = this._Kd.length - 1;
    var a = [0, 0, 0, 0]; // convert plaintext to (ints ^ key)

    var t = convertToInt32(ciphertext);

    for (var i = 0; i < 4; i++) {
      t[i] ^= this._Kd[0][i];
    } // apply round transforms


    for (var r = 1; r < rounds; r++) {
      for (var i = 0; i < 4; i++) {
        a[i] = T5[t[i] >> 24 & 0xff] ^ T6[t[(i + 3) % 4] >> 16 & 0xff] ^ T7[t[(i + 2) % 4] >> 8 & 0xff] ^ T8[t[(i + 1) % 4] & 0xff] ^ this._Kd[r][i];
      }

      t = a.slice();
    } // the last round is special


    var result = createArray(16),
        tt;

    for (var i = 0; i < 4; i++) {
      tt = this._Kd[rounds][i];
      result[4 * i] = (Si[t[i] >> 24 & 0xff] ^ tt >> 24) & 0xff;
      result[4 * i + 1] = (Si[t[(i + 3) % 4] >> 16 & 0xff] ^ tt >> 16) & 0xff;
      result[4 * i + 2] = (Si[t[(i + 2) % 4] >> 8 & 0xff] ^ tt >> 8) & 0xff;
      result[4 * i + 3] = (Si[t[(i + 1) % 4] & 0xff] ^ tt) & 0xff;
    }

    return result;
  };
  /**
   *  Mode Of Operation - Electonic Codebook (ECB)
   */


  var ModeOfOperationECB = function (key) {
    if (!(this instanceof ModeOfOperationECB)) {
      throw Error('AES must be instanitated with `new`');
    }

    this.description = "Electronic Code Block";
    this.name = "ecb";
    this._aes = new AES(key);
  };

  ModeOfOperationECB.prototype.encrypt = function (plaintext) {
    plaintext = coerceArray(plaintext);

    if (plaintext.length % 16 !== 0) {
      throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
    }

    var ciphertext = createArray(plaintext.length);
    var block = createArray(16);

    for (var i = 0; i < plaintext.length; i += 16) {
      copyArray(plaintext, block, 0, i, i + 16);
      block = this._aes.encrypt(block);
      copyArray(block, ciphertext, i);
    }

    return ciphertext;
  };

  ModeOfOperationECB.prototype.decrypt = function (ciphertext) {
    ciphertext = coerceArray(ciphertext);

    if (ciphertext.length % 16 !== 0) {
      throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
    }

    var plaintext = createArray(ciphertext.length);
    var block = createArray(16);

    for (var i = 0; i < ciphertext.length; i += 16) {
      copyArray(ciphertext, block, 0, i, i + 16);
      block = this._aes.decrypt(block);
      copyArray(block, plaintext, i);
    }

    return plaintext;
  };
  /**
   *  Mode Of Operation - Cipher Block Chaining (CBC)
   */


  var ModeOfOperationCBC = function (key, iv) {
    if (!(this instanceof ModeOfOperationCBC)) {
      throw Error('AES must be instanitated with `new`');
    }

    this.description = "Cipher Block Chaining";
    this.name = "cbc";

    if (!iv) {
      iv = createArray(16);
    } else if (iv.length != 16) {
      throw new Error('invalid initialation vector size (must be 16 bytes)');
    }

    this._lastCipherblock = coerceArray(iv, true);
    this._aes = new AES(key);
  };

  ModeOfOperationCBC.prototype.encrypt = function (plaintext) {
    plaintext = coerceArray(plaintext);

    if (plaintext.length % 16 !== 0) {
      throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
    }

    var ciphertext = createArray(plaintext.length);
    var block = createArray(16);

    for (var i = 0; i < plaintext.length; i += 16) {
      copyArray(plaintext, block, 0, i, i + 16);

      for (var j = 0; j < 16; j++) {
        block[j] ^= this._lastCipherblock[j];
      }

      this._lastCipherblock = this._aes.encrypt(block);
      copyArray(this._lastCipherblock, ciphertext, i);
    }

    return ciphertext;
  };

  ModeOfOperationCBC.prototype.decrypt = function (ciphertext) {
    ciphertext = coerceArray(ciphertext);

    if (ciphertext.length % 16 !== 0) {
      throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
    }

    var plaintext = createArray(ciphertext.length);
    var block = createArray(16);

    for (var i = 0; i < ciphertext.length; i += 16) {
      copyArray(ciphertext, block, 0, i, i + 16);
      block = this._aes.decrypt(block);

      for (var j = 0; j < 16; j++) {
        plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
      }

      copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
    }

    return plaintext;
  };
  /**
   *  Mode Of Operation - Cipher Feedback (CFB)
   */


  var ModeOfOperationCFB = function (key, iv, segmentSize) {
    if (!(this instanceof ModeOfOperationCFB)) {
      throw Error('AES must be instanitated with `new`');
    }

    this.description = "Cipher Feedback";
    this.name = "cfb";

    if (!iv) {
      iv = createArray(16);
    } else if (iv.length != 16) {
      throw new Error('invalid initialation vector size (must be 16 size)');
    }

    if (!segmentSize) {
      segmentSize = 1;
    }

    this.segmentSize = segmentSize;
    this._shiftRegister = coerceArray(iv, true);
    this._aes = new AES(key);
  };

  ModeOfOperationCFB.prototype.encrypt = function (plaintext) {
    if (plaintext.length % this.segmentSize != 0) {
      throw new Error('invalid plaintext size (must be segmentSize bytes)');
    }

    var encrypted = coerceArray(plaintext, true);
    var xorSegment;

    for (var i = 0; i < encrypted.length; i += this.segmentSize) {
      xorSegment = this._aes.encrypt(this._shiftRegister);

      for (var j = 0; j < this.segmentSize; j++) {
        encrypted[i + j] ^= xorSegment[j];
      } // Shift the register


      copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
      copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
    }

    return encrypted;
  };

  ModeOfOperationCFB.prototype.decrypt = function (ciphertext) {
    if (ciphertext.length % this.segmentSize != 0) {
      throw new Error('invalid ciphertext size (must be segmentSize bytes)');
    }

    var plaintext = coerceArray(ciphertext, true);
    var xorSegment;

    for (var i = 0; i < plaintext.length; i += this.segmentSize) {
      xorSegment = this._aes.encrypt(this._shiftRegister);

      for (var j = 0; j < this.segmentSize; j++) {
        plaintext[i + j] ^= xorSegment[j];
      } // Shift the register


      copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
      copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
    }

    return plaintext;
  };
  /**
   *  Mode Of Operation - Output Feedback (OFB)
   */


  var ModeOfOperationOFB = function (key, iv) {
    if (!(this instanceof ModeOfOperationOFB)) {
      throw Error('AES must be instanitated with `new`');
    }

    this.description = "Output Feedback";
    this.name = "ofb";

    if (!iv) {
      iv = createArray(16);
    } else if (iv.length != 16) {
      throw new Error('invalid initialation vector size (must be 16 bytes)');
    }

    this._lastPrecipher = coerceArray(iv, true);
    this._lastPrecipherIndex = 16;
    this._aes = new AES(key);
  };

  ModeOfOperationOFB.prototype.encrypt = function (plaintext) {
    var encrypted = coerceArray(plaintext, true);

    for (var i = 0; i < encrypted.length; i++) {
      if (this._lastPrecipherIndex === 16) {
        this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
        this._lastPrecipherIndex = 0;
      }

      encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
    }

    return encrypted;
  }; // Decryption is symetric


  ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;
  /**
   *  Counter object for CTR common mode of operation
   */

  var Counter = function (initialValue) {
    if (!(this instanceof Counter)) {
      throw Error('Counter must be instanitated with `new`');
    } // We allow 0, but anything false-ish uses the default 1


    if (initialValue !== 0 && !initialValue) {
      initialValue = 1;
    }

    if (typeof initialValue === 'number') {
      this._counter = createArray(16);
      this.setValue(initialValue);
    } else {
      this.setBytes(initialValue);
    }
  };

  Counter.prototype.setValue = function (value) {
    if (typeof value !== 'number' || parseInt(value) != value) {
      throw new Error('invalid counter value (must be an integer)');
    } // We cannot safely handle numbers beyond the safe range for integers


    if (value > Number.MAX_SAFE_INTEGER) {
      throw new Error('integer value out of safe range');
    }

    for (var index = 15; index >= 0; --index) {
      this._counter[index] = value % 256;
      value = parseInt(value / 256);
    }
  };

  Counter.prototype.setBytes = function (bytes) {
    bytes = coerceArray(bytes, true);

    if (bytes.length != 16) {
      throw new Error('invalid counter bytes size (must be 16 bytes)');
    }

    this._counter = bytes;
  };

  Counter.prototype.increment = function () {
    for (var i = 15; i >= 0; i--) {
      if (this._counter[i] === 255) {
        this._counter[i] = 0;
      } else {
        this._counter[i]++;
        break;
      }
    }
  };
  /**
   *  Mode Of Operation - Counter (CTR)
   */


  var ModeOfOperationCTR = function (key, counter) {
    if (!(this instanceof ModeOfOperationCTR)) {
      throw Error('AES must be instanitated with `new`');
    }

    this.description = "Counter";
    this.name = "ctr";

    if (!(counter instanceof Counter)) {
      counter = new Counter(counter);
    }

    this._counter = counter;
    this._remainingCounter = null;
    this._remainingCounterIndex = 16;
    this._aes = new AES(key);
  };

  ModeOfOperationCTR.prototype.encrypt = function (plaintext) {
    var encrypted = coerceArray(plaintext, true);

    for (var i = 0; i < encrypted.length; i++) {
      if (this._remainingCounterIndex === 16) {
        this._remainingCounter = this._aes.encrypt(this._counter._counter);
        this._remainingCounterIndex = 0;

        this._counter.increment();
      }

      encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
    }

    return encrypted;
  }; // Decryption is symetric


  ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt; ///////////////////////
  // Padding
  // See:https://tools.ietf.org/html/rfc2315

  function pkcs7pad(data) {
    data = coerceArray(data, true);
    var padder = 16 - data.length % 16;
    var result = createArray(data.length + padder);
    copyArray(data, result);

    for (var i = data.length; i < result.length; i++) {
      result[i] = padder;
    }

    return result;
  }

  function pkcs7strip(data) {
    data = coerceArray(data, true);

    if (data.length < 16) {
      throw new Error('PKCS#7 invalid length');
    }

    var padder = data[data.length - 1];

    if (padder > 16) {
      throw new Error('PKCS#7 padding byte out of range');
    }

    var length = data.length - padder;

    for (var i = 0; i < padder; i++) {
      if (data[length + i] !== padder) {
        throw new Error('PKCS#7 invalid padding byte');
      }
    }

    var result = createArray(length);
    copyArray(data, result, 0, 0, length);
    return result;
  } ///////////////////////
  // Exporting
  // The block cipher


  var aesjs = {
    AES: AES,
    Counter: Counter,
    ModeOfOperation: {
      ecb: ModeOfOperationECB,
      cbc: ModeOfOperationCBC,
      cfb: ModeOfOperationCFB,
      ofb: ModeOfOperationOFB,
      ctr: ModeOfOperationCTR
    },
    utils: {
      hex: convertHex,
      utf8: convertUtf8
    },
    padding: {
      pkcs7: {
        pad: pkcs7pad,
        strip: pkcs7strip
      }
    },
    _arrayTest: {
      coerceArray: coerceArray,
      createArray: createArray,
      copyArray: copyArray
    }
  }; // node.js

  if (true) {
    module.exports = aesjs; // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
  } else {}
})(this);

/***/ }),

/***/ "./node_modules/@pedrouid/iso-random/dist/cjs/node/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@pedrouid/iso-random/dist/cjs/node/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomBytes = void 0;

const crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "./node_modules/crypto-browserify/index.js"));

const enc_utils_1 = __webpack_require__(/*! enc-utils */ "./node_modules/enc-utils/dist/cjs/index.js");

function randomBytes(length) {
  const buf = crypto_1.default.randomBytes(length);
  return enc_utils_1.bufferToArray(buf);
}

exports.randomBytes = randomBytes;

/***/ }),

/***/ "./node_modules/@walletconnect/browser-utils/dist/cjs/browser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@walletconnect/browser-utils/dist/cjs/browser.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClientMeta = exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = exports.isBrowser = exports.isNode = exports.isMobile = exports.isIOS = exports.detectOS = exports.detectEnv = void 0;

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const windowMetadata = tslib_1.__importStar(__webpack_require__(/*! window-metadata */ "./node_modules/window-metadata/dist/cjs/index.js"));

const windowGetters = tslib_1.__importStar(__webpack_require__(/*! window-getters */ "./node_modules/window-getters/dist/cjs/index.js"));

const detect_browser_1 = __webpack_require__(/*! detect-browser */ "./node_modules/detect-browser/es/index.js");

function detectEnv(userAgent) {
  return detect_browser_1.detect(userAgent);
}

exports.detectEnv = detectEnv;

function detectOS() {
  const env = detectEnv();
  return env && env.os ? env.os : undefined;
}

exports.detectOS = detectOS;

function isIOS() {
  const os = detectOS();
  return os ? os.toLowerCase().includes("ios") : false;
}

exports.isIOS = isIOS;

function isMobile() {
  const os = detectOS();
  return os ? os.toLowerCase().includes("android") || os.toLowerCase().includes("ios") : false;
}

exports.isMobile = isMobile;

function isNode() {
  const env = detectEnv();
  const result = env && env.name ? env.name.toLowerCase() === "node" : false;
  return result;
}

exports.isNode = isNode;

function isBrowser() {
  const result = !isNode() && !!exports.getNavigator();
  return result;
}

exports.isBrowser = isBrowser;
exports.getFromWindow = windowGetters.getFromWindow;
exports.getFromWindowOrThrow = windowGetters.getFromWindowOrThrow;
exports.getDocumentOrThrow = windowGetters.getDocumentOrThrow;
exports.getDocument = windowGetters.getDocument;
exports.getNavigatorOrThrow = windowGetters.getNavigatorOrThrow;
exports.getNavigator = windowGetters.getNavigator;
exports.getLocationOrThrow = windowGetters.getLocationOrThrow;
exports.getLocation = windowGetters.getLocation;
exports.getCryptoOrThrow = windowGetters.getCryptoOrThrow;
exports.getCrypto = windowGetters.getCrypto;
exports.getLocalStorageOrThrow = windowGetters.getLocalStorageOrThrow;
exports.getLocalStorage = windowGetters.getLocalStorage;

function getClientMeta() {
  return windowMetadata.getWindowMetadata();
}

exports.getClientMeta = getClientMeta;

/***/ }),

/***/ "./node_modules/@walletconnect/browser-utils/dist/cjs/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@walletconnect/browser-utils/dist/cjs/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

tslib_1.__exportStar(__webpack_require__(/*! ./browser */ "./node_modules/@walletconnect/browser-utils/dist/cjs/browser.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./json */ "./node_modules/@walletconnect/browser-utils/dist/cjs/json.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./local */ "./node_modules/@walletconnect/browser-utils/dist/cjs/local.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./mobile */ "./node_modules/@walletconnect/browser-utils/dist/cjs/mobile.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./registry */ "./node_modules/@walletconnect/browser-utils/dist/cjs/registry.js"), exports);

/***/ }),

/***/ "./node_modules/@walletconnect/browser-utils/dist/cjs/json.js":
/*!********************************************************************!*\
  !*** ./node_modules/@walletconnect/browser-utils/dist/cjs/json.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeJsonStringify = exports.safeJsonParse = void 0;

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const safeJsonUtils = tslib_1.__importStar(__webpack_require__(/*! safe-json-utils */ "./node_modules/safe-json-utils/dist/cjs/index.js"));

exports.safeJsonParse = safeJsonUtils.safeJsonParse;
exports.safeJsonStringify = safeJsonUtils.safeJsonStringify;

/***/ }),

/***/ "./node_modules/@walletconnect/browser-utils/dist/cjs/local.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@walletconnect/browser-utils/dist/cjs/local.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeLocal = exports.getLocal = exports.setLocal = void 0;

const json_1 = __webpack_require__(/*! ./json */ "./node_modules/@walletconnect/browser-utils/dist/cjs/json.js");

const browser_1 = __webpack_require__(/*! ./browser */ "./node_modules/@walletconnect/browser-utils/dist/cjs/browser.js");

function setLocal(key, data) {
  const raw = json_1.safeJsonStringify(data);
  const local = browser_1.getLocalStorage();

  if (local) {
    local.setItem(key, raw);
  }
}

exports.setLocal = setLocal;

function getLocal(key) {
  let data = null;
  let raw = null;
  const local = browser_1.getLocalStorage();

  if (local) {
    raw = local.getItem(key);
  }

  data = json_1.safeJsonParse(raw);
  return data;
}

exports.getLocal = getLocal;

function removeLocal(key) {
  const local = browser_1.getLocalStorage();

  if (local) {
    local.removeItem(key);
  }
}

exports.removeLocal = removeLocal;

/***/ }),

/***/ "./node_modules/@walletconnect/browser-utils/dist/cjs/mobile.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@walletconnect/browser-utils/dist/cjs/mobile.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMobileLinkRegistry = exports.getMobileRegistryEntry = exports.saveMobileLinkInfo = exports.formatIOSMobile = exports.mobileLinkChoiceKey = void 0;

const local_1 = __webpack_require__(/*! ./local */ "./node_modules/@walletconnect/browser-utils/dist/cjs/local.js");

exports.mobileLinkChoiceKey = "WALLETCONNECT_DEEPLINK_CHOICE";

function formatIOSMobile(uri, entry) {
  const encodedUri = encodeURIComponent(uri);
  return entry.universalLink ? `${entry.universalLink}/wc?uri=${encodedUri}` : entry.deepLink ? `${entry.deepLink}${entry.deepLink.endsWith(":") ? "//" : "/"}wc?uri=${encodedUri}` : "";
}

exports.formatIOSMobile = formatIOSMobile;

function saveMobileLinkInfo(data) {
  const focusUri = data.href.split("?")[0];
  local_1.setLocal(exports.mobileLinkChoiceKey, Object.assign(Object.assign({}, data), {
    href: focusUri
  }));
}

exports.saveMobileLinkInfo = saveMobileLinkInfo;

function getMobileRegistryEntry(registry, name) {
  return registry.filter(entry => entry.name.toLowerCase().includes(name.toLowerCase()))[0];
}

exports.getMobileRegistryEntry = getMobileRegistryEntry;

function getMobileLinkRegistry(registry, whitelist) {
  let links = registry;

  if (whitelist && whitelist.length) {
    links = whitelist.map(name => getMobileRegistryEntry(registry, name));
  }

  return links;
}

exports.getMobileLinkRegistry = getMobileLinkRegistry;

/***/ }),

/***/ "./node_modules/@walletconnect/browser-utils/dist/cjs/registry.js":
/*!************************************************************************!*\
  !*** ./node_modules/@walletconnect/browser-utils/dist/cjs/registry.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMobileRegistry = exports.formatMobileRegistryEntry = exports.getAppLogoUrl = exports.getDappRegistryUrl = exports.getWalletRegistryUrl = void 0;
const API_URL = "https://registry.walletconnect.org";

function getWalletRegistryUrl() {
  return API_URL + "/data/wallets.json";
}

exports.getWalletRegistryUrl = getWalletRegistryUrl;

function getDappRegistryUrl() {
  return API_URL + "/data/dapps.json";
}

exports.getDappRegistryUrl = getDappRegistryUrl;

function getAppLogoUrl(id) {
  return API_URL + "/logo/sm/" + id + ".jpeg";
}

exports.getAppLogoUrl = getAppLogoUrl;

function formatMobileRegistryEntry(entry) {
  return {
    name: entry.name || "",
    shortName: entry.metadata.shortName || "",
    color: entry.metadata.colors.primary || "",
    logo: entry.id ? getAppLogoUrl(entry.id) : "",
    universalLink: entry.mobile.universal || "",
    deepLink: entry.mobile.native || ""
  };
}

exports.formatMobileRegistryEntry = formatMobileRegistryEntry;

function formatMobileRegistry(registry) {
  return Object.values(registry).filter(entry => !!entry.mobile.universal || !!entry.mobile.native).map(formatMobileRegistryEntry);
}

exports.formatMobileRegistry = formatMobileRegistry;

/***/ }),

/***/ "./node_modules/@walletconnect/client/dist/cjs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@walletconnect/client/dist/cjs/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const core_1 = tslib_1.__importDefault(__webpack_require__(/*! @walletconnect/core */ "./node_modules/@walletconnect/core/dist/cjs/index.js"));

const cryptoLib = tslib_1.__importStar(__webpack_require__(/*! @walletconnect/iso-crypto */ "./node_modules/@walletconnect/iso-crypto/dist/cjs/index.js"));

class WalletConnect extends core_1.default {
  constructor(connectorOpts, pushServerOpts) {
    super({
      cryptoLib,
      connectorOpts,
      pushServerOpts
    });
  }

}

exports.default = WalletConnect;

/***/ }),

/***/ "./node_modules/@walletconnect/core/dist/cjs/errors.js":
/*!*************************************************************!*\
  !*** ./node_modules/@walletconnect/core/dist/cjs/errors.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_QRCODE_MODAL_USER_CLOSED = exports.ERROR_QRCODE_MODAL_NOT_PROVIDED = exports.ERROR_INVALID_URI = exports.ERROR_INVALID_RESPONSE = exports.ERROR_MISSING_REQUIRED = exports.ERROR_MISSING_ID = exports.ERROR_MISSING_METHOD = exports.ERROR_MISSING_ERROR = exports.ERROR_MISSING_RESULT = exports.ERROR_MISSING_JSON_RPC = exports.ERROR_SESSION_REJECTED = exports.ERROR_SESSION_DISCONNECTED = exports.ERROR_SESSION_CONNECTED = void 0;
exports.ERROR_SESSION_CONNECTED = "Session currently connected";
exports.ERROR_SESSION_DISCONNECTED = "Session currently disconnected";
exports.ERROR_SESSION_REJECTED = "Session Rejected";
exports.ERROR_MISSING_JSON_RPC = "Missing JSON RPC response";
exports.ERROR_MISSING_RESULT = `JSON-RPC success response must include "result" field`;
exports.ERROR_MISSING_ERROR = `JSON-RPC error response must include "error" field`;
exports.ERROR_MISSING_METHOD = `JSON RPC request must have valid "method" value`;
exports.ERROR_MISSING_ID = `JSON RPC request must have valid "id" value`;
exports.ERROR_MISSING_REQUIRED = "Missing one of the required parameters: bridge / uri / session";
exports.ERROR_INVALID_RESPONSE = "JSON RPC response format is invalid";
exports.ERROR_INVALID_URI = "URI format is invalid";
exports.ERROR_QRCODE_MODAL_NOT_PROVIDED = "QRCode Modal not provided";
exports.ERROR_QRCODE_MODAL_USER_CLOSED = "User close QRCode Modal";

/***/ }),

/***/ "./node_modules/@walletconnect/core/dist/cjs/events.js":
/*!*************************************************************!*\
  !*** ./node_modules/@walletconnect/core/dist/cjs/events.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const utils_1 = __webpack_require__(/*! @walletconnect/utils */ "./node_modules/@walletconnect/utils/dist/cjs/index.js");

class EventManager {
  constructor() {
    this._eventEmitters = [];
  }

  subscribe(eventEmitter) {
    this._eventEmitters.push(eventEmitter);
  }

  trigger(payload) {
    let eventEmitters = [];
    let event;

    if (utils_1.isJsonRpcRequest(payload)) {
      event = payload.method;
    } else if (utils_1.isJsonRpcResponseSuccess(payload) || utils_1.isJsonRpcResponseError(payload)) {
      event = `response:${payload.id}`;
    } else if (utils_1.isInternalEvent(payload)) {
      event = payload.event;
    } else {
      event = "";
    }

    if (event) {
      eventEmitters = this._eventEmitters.filter(eventEmitter => eventEmitter.event === event);
    }

    if ((!eventEmitters || !eventEmitters.length) && !utils_1.isReservedEvent(event) && !utils_1.isInternalEvent(event)) {
      eventEmitters = this._eventEmitters.filter(eventEmitter => eventEmitter.event === "call_request");
    }

    eventEmitters.forEach(eventEmitter => {
      if (utils_1.isJsonRpcResponseError(payload)) {
        const error = new Error(payload.error.message);
        eventEmitter.callback(error, null);
      } else {
        eventEmitter.callback(null, payload);
      }
    });
  }

}

exports.default = EventManager;

/***/ }),

/***/ "./node_modules/@walletconnect/core/dist/cjs/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@walletconnect/core/dist/cjs/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const utils_1 = __webpack_require__(/*! @walletconnect/utils */ "./node_modules/@walletconnect/utils/dist/cjs/index.js");

const socket_transport_1 = tslib_1.__importDefault(__webpack_require__(/*! @walletconnect/socket-transport */ "./node_modules/@walletconnect/socket-transport/dist/cjs/index.js"));

const errors_1 = __webpack_require__(/*! ./errors */ "./node_modules/@walletconnect/core/dist/cjs/errors.js");

const events_1 = tslib_1.__importDefault(__webpack_require__(/*! ./events */ "./node_modules/@walletconnect/core/dist/cjs/events.js"));

const storage_1 = tslib_1.__importDefault(__webpack_require__(/*! ./storage */ "./node_modules/@walletconnect/core/dist/cjs/storage.js"));

class Connector {
  constructor(opts) {
    this.protocol = "wc";
    this.version = 1;
    this._bridge = "";
    this._key = null;
    this._clientId = "";
    this._clientMeta = null;
    this._peerId = "";
    this._peerMeta = null;
    this._handshakeId = 0;
    this._handshakeTopic = "";
    this._connected = false;
    this._accounts = [];
    this._chainId = 0;
    this._networkId = 0;
    this._rpcUrl = "";
    this._eventManager = new events_1.default();
    this._clientMeta = utils_1.getClientMeta() || opts.connectorOpts.clientMeta || null;
    this._cryptoLib = opts.cryptoLib;
    this._sessionStorage = opts.sessionStorage || new storage_1.default();
    this._qrcodeModal = opts.connectorOpts.qrcodeModal;
    this._qrcodeModalOptions = opts.connectorOpts.qrcodeModalOptions;

    if (!opts.connectorOpts.bridge && !opts.connectorOpts.uri && !opts.connectorOpts.session) {
      throw new Error(errors_1.ERROR_MISSING_REQUIRED);
    }

    if (opts.connectorOpts.bridge) {
      this.bridge = opts.connectorOpts.bridge;
    }

    if (opts.connectorOpts.uri) {
      this.uri = opts.connectorOpts.uri;
    }

    const session = opts.connectorOpts.session || this._getStorageSession();

    if (session) {
      this.session = session;
    }

    if (this.handshakeId) {
      this._subscribeToSessionResponse(this.handshakeId, "Session request rejected");
    }

    this._transport = opts.transport || new socket_transport_1.default({
      protocol: this.protocol,
      version: this.version,
      url: this.bridge,
      subscriptions: [this.clientId]
    });

    this._subscribeToInternalEvents();

    this._initTransport();

    if (opts.connectorOpts.uri) {
      this._subscribeToSessionRequest();
    }

    if (opts.pushServerOpts) {
      this._registerPushServer(opts.pushServerOpts);
    }
  }

  set bridge(value) {
    if (!value) {
      return;
    }

    this._bridge = value;
  }

  get bridge() {
    return this._bridge;
  }

  set key(value) {
    if (!value) {
      return;
    }

    const key = utils_1.convertHexToArrayBuffer(value);
    this._key = key;
  }

  get key() {
    if (this._key) {
      const key = utils_1.convertArrayBufferToHex(this._key, true);
      return key;
    }

    return "";
  }

  set clientId(value) {
    if (!value) {
      return;
    }

    this._clientId = value;
  }

  get clientId() {
    let clientId = this._clientId;

    if (!clientId) {
      clientId = this._clientId = utils_1.uuid();
    }

    return this._clientId;
  }

  set peerId(value) {
    if (!value) {
      return;
    }

    this._peerId = value;
  }

  get peerId() {
    return this._peerId;
  }

  set clientMeta(value) {}

  get clientMeta() {
    let clientMeta = this._clientMeta;

    if (!clientMeta) {
      clientMeta = this._clientMeta = utils_1.getClientMeta();
    }

    return clientMeta;
  }

  set peerMeta(value) {
    this._peerMeta = value;
  }

  get peerMeta() {
    const peerMeta = this._peerMeta;
    return peerMeta;
  }

  set handshakeTopic(value) {
    if (!value) {
      return;
    }

    this._handshakeTopic = value;
  }

  get handshakeTopic() {
    return this._handshakeTopic;
  }

  set handshakeId(value) {
    if (!value) {
      return;
    }

    this._handshakeId = value;
  }

  get handshakeId() {
    return this._handshakeId;
  }

  get uri() {
    const _uri = this._formatUri();

    return _uri;
  }

  set uri(value) {
    if (!value) {
      return;
    }

    const {
      handshakeTopic,
      bridge,
      key
    } = this._parseUri(value);

    this.handshakeTopic = handshakeTopic;
    this.bridge = bridge;
    this.key = key;
  }

  set chainId(value) {
    this._chainId = value;
  }

  get chainId() {
    const chainId = this._chainId;
    return chainId;
  }

  set networkId(value) {
    this._networkId = value;
  }

  get networkId() {
    const networkId = this._networkId;
    return networkId;
  }

  set accounts(value) {
    this._accounts = value;
  }

  get accounts() {
    const accounts = this._accounts;
    return accounts;
  }

  set rpcUrl(value) {
    this._rpcUrl = value;
  }

  get rpcUrl() {
    const rpcUrl = this._rpcUrl;
    return rpcUrl;
  }

  set connected(value) {}

  get connected() {
    return this._connected;
  }

  set pending(value) {}

  get pending() {
    return !!this._handshakeTopic;
  }

  get session() {
    return {
      connected: this.connected,
      accounts: this.accounts,
      chainId: this.chainId,
      bridge: this.bridge,
      key: this.key,
      clientId: this.clientId,
      clientMeta: this.clientMeta,
      peerId: this.peerId,
      peerMeta: this.peerMeta,
      handshakeId: this.handshakeId,
      handshakeTopic: this.handshakeTopic
    };
  }

  set session(value) {
    if (!value) {
      return;
    }

    this._connected = value.connected;
    this.accounts = value.accounts;
    this.chainId = value.chainId;
    this.bridge = value.bridge;
    this.key = value.key;
    this.clientId = value.clientId;
    this.clientMeta = value.clientMeta;
    this.peerId = value.peerId;
    this.peerMeta = value.peerMeta;
    this.handshakeId = value.handshakeId;
    this.handshakeTopic = value.handshakeTopic;
  }

  on(event, callback) {
    const eventEmitter = {
      event,
      callback
    };

    this._eventManager.subscribe(eventEmitter);
  }

  createInstantRequest(instantRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      this._key = yield this._generateKey();

      const request = this._formatRequest({
        method: "wc_instantRequest",
        params: [{
          peerId: this.clientId,
          peerMeta: this.clientMeta,
          request: this._formatRequest(instantRequest)
        }]
      });

      this.handshakeId = request.id;
      this.handshakeTopic = utils_1.uuid();

      this._eventManager.trigger({
        event: "display_uri",
        params: [this.uri]
      });

      this.on("modal_closed", () => {
        throw new Error(errors_1.ERROR_QRCODE_MODAL_USER_CLOSED);
      });

      const endInstantRequest = () => {
        this.killSession();
      };

      try {
        const result = yield this._sendCallRequest(request);

        if (result) {
          endInstantRequest();
        }

        return result;
      } catch (error) {
        endInstantRequest();
        throw error;
      }
    });
  }

  connect(opts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this._qrcodeModal) {
        throw new Error(errors_1.ERROR_QRCODE_MODAL_NOT_PROVIDED);
      }

      if (this.connected) {
        return {
          chainId: this.chainId,
          accounts: this.accounts
        };
      }

      yield this.createSession(opts);
      return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        this.on("modal_closed", () => reject(new Error(errors_1.ERROR_QRCODE_MODAL_USER_CLOSED)));
        this.on("connect", (error, payload) => {
          if (error) {
            return reject(error);
          }

          resolve(payload.params[0]);
        });
      }));
    });
  }

  createSession(opts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (this._connected) {
        throw new Error(errors_1.ERROR_SESSION_CONNECTED);
      }

      if (this.pending) {
        return;
      }

      this._key = yield this._generateKey();

      const request = this._formatRequest({
        method: "wc_sessionRequest",
        params: [{
          peerId: this.clientId,
          peerMeta: this.clientMeta,
          chainId: opts && opts.chainId ? opts.chainId : null
        }]
      });

      this.handshakeId = request.id;
      this.handshakeTopic = utils_1.uuid();

      this._sendSessionRequest(request, "Session update rejected", {
        topic: this.handshakeTopic
      });

      this._eventManager.trigger({
        event: "display_uri",
        params: [this.uri]
      });
    });
  }

  approveSession(sessionStatus) {
    if (this._connected) {
      throw new Error(errors_1.ERROR_SESSION_CONNECTED);
    }

    this.chainId = sessionStatus.chainId;
    this.accounts = sessionStatus.accounts;
    this.networkId = sessionStatus.networkId || 0;
    this.rpcUrl = sessionStatus.rpcUrl || "";
    const sessionParams = {
      approved: true,
      chainId: this.chainId,
      networkId: this.networkId,
      accounts: this.accounts,
      rpcUrl: this.rpcUrl,
      peerId: this.clientId,
      peerMeta: this.clientMeta
    };
    const response = {
      id: this.handshakeId,
      jsonrpc: "2.0",
      result: sessionParams
    };

    this._sendResponse(response);

    this._connected = true;

    this._setStorageSession();

    this._eventManager.trigger({
      event: "connect",
      params: [{
        peerId: this.peerId,
        peerMeta: this.peerMeta,
        chainId: this.chainId,
        accounts: this.accounts
      }]
    });
  }

  rejectSession(sessionError) {
    if (this._connected) {
      throw new Error(errors_1.ERROR_SESSION_CONNECTED);
    }

    const message = sessionError && sessionError.message ? sessionError.message : errors_1.ERROR_SESSION_REJECTED;

    const response = this._formatResponse({
      id: this.handshakeId,
      error: {
        message
      }
    });

    this._sendResponse(response);

    this._connected = false;

    this._eventManager.trigger({
      event: "disconnect",
      params: [{
        message
      }]
    });

    this._removeStorageSession();
  }

  updateSession(sessionStatus) {
    if (!this._connected) {
      throw new Error(errors_1.ERROR_SESSION_DISCONNECTED);
    }

    this.chainId = sessionStatus.chainId;
    this.accounts = sessionStatus.accounts;
    this.networkId = sessionStatus.networkId || 0;
    this.rpcUrl = sessionStatus.rpcUrl || "";
    const sessionParams = {
      approved: true,
      chainId: this.chainId,
      networkId: this.networkId,
      accounts: this.accounts,
      rpcUrl: this.rpcUrl
    };

    const request = this._formatRequest({
      method: "wc_sessionUpdate",
      params: [sessionParams]
    });

    this._sendSessionRequest(request, "Session update rejected");

    this._eventManager.trigger({
      event: "session_update",
      params: [{
        chainId: this.chainId,
        accounts: this.accounts
      }]
    });

    this._manageStorageSession();
  }

  killSession(sessionError) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const message = sessionError ? sessionError.message : "Session Disconnected";
      const sessionParams = {
        approved: false,
        chainId: null,
        networkId: null,
        accounts: null
      };

      const request = this._formatRequest({
        method: "wc_sessionUpdate",
        params: [sessionParams]
      });

      yield this._sendRequest(request);

      this._handleSessionDisconnect(message);
    });
  }

  sendTransaction(tx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this._connected) {
        throw new Error(errors_1.ERROR_SESSION_DISCONNECTED);
      }

      const parsedTx = utils_1.parseTransactionData(tx);

      const request = this._formatRequest({
        method: "eth_sendTransaction",
        params: [parsedTx]
      });

      const result = yield this._sendCallRequest(request);
      return result;
    });
  }

  signTransaction(tx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this._connected) {
        throw new Error(errors_1.ERROR_SESSION_DISCONNECTED);
      }

      const parsedTx = utils_1.parseTransactionData(tx);

      const request = this._formatRequest({
        method: "eth_signTransaction",
        params: [parsedTx]
      });

      const result = yield this._sendCallRequest(request);
      return result;
    });
  }

  signMessage(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this._connected) {
        throw new Error(errors_1.ERROR_SESSION_DISCONNECTED);
      }

      const request = this._formatRequest({
        method: "eth_sign",
        params
      });

      const result = yield this._sendCallRequest(request);
      return result;
    });
  }

  signPersonalMessage(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this._connected) {
        throw new Error(errors_1.ERROR_SESSION_DISCONNECTED);
      }

      params = utils_1.parsePersonalSign(params);

      const request = this._formatRequest({
        method: "personal_sign",
        params
      });

      const result = yield this._sendCallRequest(request);
      return result;
    });
  }

  signTypedData(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this._connected) {
        throw new Error(errors_1.ERROR_SESSION_DISCONNECTED);
      }

      const request = this._formatRequest({
        method: "eth_signTypedData",
        params
      });

      const result = yield this._sendCallRequest(request);
      return result;
    });
  }

  updateChain(chainParams) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this._connected) {
        throw new Error("Session currently disconnected");
      }

      const request = this._formatRequest({
        method: "wallet_updateChain",
        params: [chainParams]
      });

      const result = yield this._sendCallRequest(request);
      return result;
    });
  }

  unsafeSend(request, options) {
    this._sendRequest(request, options);

    return new Promise((resolve, reject) => {
      this._subscribeToResponse(request.id, (error, payload) => {
        if (error) {
          reject(error);
          return;
        }

        if (!payload) {
          throw new Error(errors_1.ERROR_MISSING_JSON_RPC);
        }

        resolve(payload);
      });
    });
  }

  sendCustomRequest(request, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this._connected) {
        throw new Error(errors_1.ERROR_SESSION_DISCONNECTED);
      }

      switch (request.method) {
        case "eth_accounts":
          return this.accounts;

        case "eth_chainId":
          return utils_1.convertNumberToHex(this.chainId);

        case "eth_sendTransaction":
        case "eth_signTransaction":
          if (request.params) {
            request.params[0] = utils_1.parseTransactionData(request.params[0]);
          }

          break;

        case "personal_sign":
          if (request.params) {
            request.params = utils_1.parsePersonalSign(request.params);
          }

          break;

        default:
          break;
      }

      const formattedRequest = this._formatRequest(request);

      const result = yield this._sendCallRequest(formattedRequest, options);
      return result;
    });
  }

  approveRequest(response) {
    if (utils_1.isJsonRpcResponseSuccess(response)) {
      const formattedResponse = this._formatResponse(response);

      this._sendResponse(formattedResponse);
    } else {
      throw new Error(errors_1.ERROR_MISSING_RESULT);
    }
  }

  rejectRequest(response) {
    if (utils_1.isJsonRpcResponseError(response)) {
      const formattedResponse = this._formatResponse(response);

      this._sendResponse(formattedResponse);
    } else {
      throw new Error(errors_1.ERROR_MISSING_ERROR);
    }
  }

  _sendRequest(request, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const callRequest = this._formatRequest(request);

      const encryptionPayload = yield this._encrypt(callRequest);
      const topic = typeof (options === null || options === void 0 ? void 0 : options.topic) !== "undefined" ? options.topic : this.peerId;
      const payload = JSON.stringify(encryptionPayload);
      const silent = typeof (options === null || options === void 0 ? void 0 : options.forcePushNotification) !== "undefined" ? !options.forcePushNotification : utils_1.isSilentPayload(callRequest);

      this._transport.send(payload, topic, silent);
    });
  }

  _sendResponse(response) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const encryptionPayload = yield this._encrypt(response);
      const topic = this.peerId;
      const payload = JSON.stringify(encryptionPayload);
      const silent = true;

      this._transport.send(payload, topic, silent);
    });
  }

  _sendSessionRequest(request, errorMsg, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      this._sendRequest(request, options);

      this._subscribeToSessionResponse(request.id, errorMsg);
    });
  }

  _sendCallRequest(request, options) {
    this._sendRequest(request, options);

    this._eventManager.trigger({
      event: "call_request_sent",
      params: [{
        request,
        options
      }]
    });

    if (utils_1.isMobile() && utils_1.signingMethods.includes(request.method)) {
      const mobileLinkUrl = utils_1.getLocal(utils_1.mobileLinkChoiceKey);

      if (mobileLinkUrl) {
        window.location.href = mobileLinkUrl.href;
      }
    }

    return this._subscribeToCallResponse(request.id);
  }

  _formatRequest(request) {
    if (typeof request.method === "undefined") {
      throw new Error(errors_1.ERROR_MISSING_METHOD);
    }

    const formattedRequest = {
      id: typeof request.id === "undefined" ? utils_1.payloadId() : request.id,
      jsonrpc: "2.0",
      method: request.method,
      params: typeof request.params === "undefined" ? [] : request.params
    };
    return formattedRequest;
  }

  _formatResponse(response) {
    if (typeof response.id === "undefined") {
      throw new Error(errors_1.ERROR_MISSING_ID);
    }

    const baseResponse = {
      id: response.id,
      jsonrpc: "2.0"
    };

    if (utils_1.isJsonRpcResponseError(response)) {
      const error = utils_1.formatRpcError(response.error);
      const errorResponse = Object.assign(Object.assign(Object.assign({}, baseResponse), response), {
        error
      });
      return errorResponse;
    } else if (utils_1.isJsonRpcResponseSuccess(response)) {
      const successResponse = Object.assign(Object.assign({}, baseResponse), response);
      return successResponse;
    }

    throw new Error(errors_1.ERROR_INVALID_RESPONSE);
  }

  _handleSessionDisconnect(errorMsg) {
    const message = errorMsg || "Session Disconnected";

    if (!this._connected) {
      if (this._qrcodeModal) {
        this._qrcodeModal.close();
      }

      utils_1.removeLocal(utils_1.mobileLinkChoiceKey);
    }

    if (this._connected) {
      this._connected = false;
    }

    if (this._handshakeId) {
      this._handshakeId = 0;
    }

    if (this._handshakeTopic) {
      this._handshakeTopic = "";
    }

    this._eventManager.trigger({
      event: "disconnect",
      params: [{
        message
      }]
    });

    this._removeStorageSession();

    this._transport.close();
  }

  _handleSessionResponse(errorMsg, sessionParams) {
    if (sessionParams) {
      if (sessionParams.approved) {
        if (!this._connected) {
          this._connected = true;

          if (sessionParams.chainId) {
            this.chainId = sessionParams.chainId;
          }

          if (sessionParams.accounts) {
            this.accounts = sessionParams.accounts;
          }

          if (sessionParams.peerId && !this.peerId) {
            this.peerId = sessionParams.peerId;
          }

          if (sessionParams.peerMeta && !this.peerMeta) {
            this.peerMeta = sessionParams.peerMeta;
          }

          this._eventManager.trigger({
            event: "connect",
            params: [{
              peerId: this.peerId,
              peerMeta: this.peerMeta,
              chainId: this.chainId,
              accounts: this.accounts
            }]
          });
        } else {
          if (sessionParams.chainId) {
            this.chainId = sessionParams.chainId;
          }

          if (sessionParams.accounts) {
            this.accounts = sessionParams.accounts;
          }

          this._eventManager.trigger({
            event: "session_update",
            params: [{
              chainId: this.chainId,
              accounts: this.accounts
            }]
          });
        }

        this._manageStorageSession();
      } else {
        this._handleSessionDisconnect(errorMsg);
      }
    } else {
      this._handleSessionDisconnect(errorMsg);
    }
  }

  _handleIncomingMessages(socketMessage) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const activeTopics = [this.clientId, this.handshakeTopic];

      if (!activeTopics.includes(socketMessage.topic)) {
        return;
      }

      let encryptionPayload;

      try {
        encryptionPayload = JSON.parse(socketMessage.payload);
      } catch (error) {
        return;
      }

      const payload = yield this._decrypt(encryptionPayload);

      if (payload) {
        this._eventManager.trigger(payload);
      }
    });
  }

  _subscribeToSessionRequest() {
    this._transport.subscribe(this.handshakeTopic);
  }

  _subscribeToResponse(id, callback) {
    this.on(`response:${id}`, callback);
  }

  _subscribeToSessionResponse(id, errorMsg) {
    this._subscribeToResponse(id, (error, payload) => {
      if (error) {
        this._handleSessionResponse(error.message);

        return;
      }

      if (payload.result) {
        this._handleSessionResponse(errorMsg, payload.result);
      } else if (payload.error && payload.error.message) {
        this._handleSessionResponse(payload.error.message);
      } else {
        this._handleSessionResponse(errorMsg);
      }
    });
  }

  _subscribeToCallResponse(id) {
    return new Promise((resolve, reject) => {
      this._subscribeToResponse(id, (error, payload) => {
        if (error) {
          reject(error);
          return;
        }

        if (payload.result) {
          resolve(payload.result);
        } else if (payload.error && payload.error.message) {
          reject(new Error(payload.error.message));
        } else {
          reject(new Error(errors_1.ERROR_INVALID_RESPONSE));
        }
      });
    });
  }

  _subscribeToInternalEvents() {
    this.on("display_uri", () => {
      if (this._qrcodeModal) {
        this._qrcodeModal.open(this.uri, () => {
          this._eventManager.trigger({
            event: "modal_closed",
            params: []
          });
        }, this._qrcodeModalOptions);
      }
    });
    this.on("connect", () => {
      if (this._qrcodeModal) {
        this._qrcodeModal.close();
      }
    });
    this.on("wc_sessionRequest", (error, payload) => {
      if (error) {
        this._eventManager.trigger({
          event: "error",
          params: [{
            code: "SESSION_REQUEST_ERROR",
            message: error.toString()
          }]
        });
      }

      this.handshakeId = payload.id;
      this.peerId = payload.params[0].peerId;
      this.peerMeta = payload.params[0].peerMeta;
      const internalPayload = Object.assign(Object.assign({}, payload), {
        method: "session_request"
      });

      this._eventManager.trigger(internalPayload);
    });
    this.on("wc_sessionUpdate", (error, payload) => {
      if (error) {
        this._handleSessionResponse(error.message);
      }

      this._handleSessionResponse("Session disconnected", payload.params[0]);
    });
  }

  _initTransport() {
    this._transport.on("message", socketMessage => this._handleIncomingMessages(socketMessage));

    this._transport.on("open", () => this._eventManager.trigger({
      event: "transport_open",
      params: []
    }));

    this._transport.on("close", () => this._eventManager.trigger({
      event: "transport_close",
      params: []
    }));

    this._transport.on("error", () => this._eventManager.trigger({
      event: "transport_error",
      params: ["Websocket connection failed"]
    }));

    this._transport.open();
  }

  _formatUri() {
    const protocol = this.protocol;
    const handshakeTopic = this.handshakeTopic;
    const version = this.version;
    const bridge = encodeURIComponent(this.bridge);
    const key = this.key;
    const uri = `${protocol}:${handshakeTopic}@${version}?bridge=${bridge}&key=${key}`;
    return uri;
  }

  _parseUri(uri) {
    const result = utils_1.parseWalletConnectUri(uri);

    if (result.protocol === this.protocol) {
      if (!result.handshakeTopic) {
        throw Error("Invalid or missing handshakeTopic parameter value");
      }

      const handshakeTopic = result.handshakeTopic;

      if (!result.bridge) {
        throw Error("Invalid or missing bridge url parameter value");
      }

      const bridge = decodeURIComponent(result.bridge);

      if (!result.key) {
        throw Error("Invalid or missing key parameter value");
      }

      const key = result.key;
      return {
        handshakeTopic,
        bridge,
        key
      };
    } else {
      throw new Error(errors_1.ERROR_INVALID_URI);
    }
  }

  _generateKey() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (this._cryptoLib) {
        const result = yield this._cryptoLib.generateKey();
        return result;
      }

      return null;
    });
  }

  _encrypt(data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const key = this._key;

      if (this._cryptoLib && key) {
        const result = yield this._cryptoLib.encrypt(data, key);
        return result;
      }

      return null;
    });
  }

  _decrypt(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const key = this._key;

      if (this._cryptoLib && key) {
        const result = yield this._cryptoLib.decrypt(payload, key);
        return result;
      }

      return null;
    });
  }

  _getStorageSession() {
    let result = null;

    if (this._sessionStorage) {
      result = this._sessionStorage.getSession();
    }

    return result;
  }

  _setStorageSession() {
    if (this._sessionStorage) {
      this._sessionStorage.setSession(this.session);
    }
  }

  _removeStorageSession() {
    if (this._sessionStorage) {
      this._sessionStorage.removeSession();
    }
  }

  _manageStorageSession() {
    if (this._connected) {
      this._setStorageSession();
    } else {
      this._removeStorageSession();
    }
  }

  _registerPushServer(pushServerOpts) {
    if (!pushServerOpts.url || typeof pushServerOpts.url !== "string") {
      throw Error("Invalid or missing pushServerOpts.url parameter value");
    }

    if (!pushServerOpts.type || typeof pushServerOpts.type !== "string") {
      throw Error("Invalid or missing pushServerOpts.type parameter value");
    }

    if (!pushServerOpts.token || typeof pushServerOpts.token !== "string") {
      throw Error("Invalid or missing pushServerOpts.token parameter value");
    }

    const pushSubscription = {
      bridge: this.bridge,
      topic: this.clientId,
      type: pushServerOpts.type,
      token: pushServerOpts.token,
      peerName: "",
      language: pushServerOpts.language || ""
    };
    this.on("connect", (error, payload) => tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (error) {
        throw error;
      }

      if (pushServerOpts.peerMeta) {
        const peerName = payload.params[0].peerMeta.name;
        pushSubscription.peerName = peerName;
      }

      try {
        const response = yield fetch(`${pushServerOpts.url}/new`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pushSubscription)
        });
        const json = yield response.json();

        if (!json.success) {
          throw Error("Failed to register in Push Server");
        }
      } catch (error) {
        throw Error("Failed to register in Push Server");
      }
    }));
  }

}

exports.default = Connector;

/***/ }),

/***/ "./node_modules/@walletconnect/core/dist/cjs/storage.js":
/*!**************************************************************!*\
  !*** ./node_modules/@walletconnect/core/dist/cjs/storage.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const utils_1 = __webpack_require__(/*! @walletconnect/utils */ "./node_modules/@walletconnect/utils/dist/cjs/index.js");

class SessionStorage {
  constructor() {
    this.storageId = "walletconnect";
  }

  getSession() {
    let session = null;
    const json = utils_1.getLocal(this.storageId);

    if (json && utils_1.isWalletConnectSession(json)) {
      session = json;
    }

    return session;
  }

  setSession(session) {
    utils_1.setLocal(this.storageId, session);
    return session;
  }

  removeSession() {
    utils_1.removeLocal(this.storageId);
  }

}

exports.default = SessionStorage;

/***/ }),

/***/ "./node_modules/@walletconnect/http-connection/dist/cjs/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@walletconnect/http-connection/dist/cjs/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const eventemitter3_1 = tslib_1.__importDefault(__webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js"));

const xhr2_cookies_1 = __webpack_require__(/*! xhr2-cookies */ "./node_modules/xhr2-cookies/dist/index.js");

const utils_1 = __webpack_require__(/*! @walletconnect/utils */ "./node_modules/@walletconnect/utils/dist/cjs/index.js");

const XHR = utils_1.getFromWindow("XMLHttpRequest") || xhr2_cookies_1.XMLHttpRequest;

class HTTPConnection extends eventemitter3_1.default {
  constructor(url) {
    super();
    this.url = url;
  }

  formatError(payload, message, code = -1) {
    return {
      error: {
        message,
        code
      },
      id: payload.id,
      jsonrpc: payload.jsonrpc
    };
  }

  send(payload, internal) {
    return new Promise(resolve => {
      if (payload.method === "eth_subscribe") {
        const error = this.formatError(payload, "Subscriptions are not supported by this HTTP endpoint");
        this.emit("error", error);
        return resolve(error);
      }

      const xhr = new XHR();
      let responded = false;

      const res = (err, result) => {
        if (!responded) {
          xhr.abort();
          responded = true;

          if (internal) {
            internal(err, result);
          } else {
            const {
              id,
              jsonrpc
            } = payload;
            const response = err ? {
              id,
              jsonrpc,
              error: {
                message: err.message,
                code: err.code
              }
            } : {
              id,
              jsonrpc,
              result
            };
            this.emit("payload", response);
            resolve(response);
          }
        }
      };

      xhr.open("POST", this.url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.timeout = 60 * 1000;
      xhr.onerror = res;
      xhr.ontimeout = res;

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          try {
            const response = JSON.parse(xhr.responseText);
            res(response.error, response.result);
          } catch (e) {
            res(e);
          }
        }
      };

      xhr.send(JSON.stringify(payload));
    });
  }

}

exports.default = HTTPConnection;

/***/ }),

/***/ "./node_modules/@walletconnect/iso-crypto/dist/cjs/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@walletconnect/iso-crypto/dist/cjs/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrypt = exports.encrypt = exports.verifyHmac = exports.generateKey = void 0;

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const isoCrypto = tslib_1.__importStar(__webpack_require__(/*! @pedrouid/iso-crypto */ "./node_modules/@pedrouid/iso-crypto/dist/cjs/index.js"));

const encUtils = tslib_1.__importStar(__webpack_require__(/*! enc-utils */ "./node_modules/enc-utils/dist/cjs/index.js"));

const utils_1 = __webpack_require__(/*! @walletconnect/utils */ "./node_modules/@walletconnect/utils/dist/cjs/index.js");

function generateKey(length) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const _length = (length || 256) / 8;

    const bytes = isoCrypto.randomBytes(_length);
    const result = utils_1.convertBufferToArrayBuffer(encUtils.arrayToBuffer(bytes));
    return result;
  });
}

exports.generateKey = generateKey;

function verifyHmac(payload, key) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const cipherText = encUtils.hexToArray(payload.data);
    const iv = encUtils.hexToArray(payload.iv);
    const hmac = encUtils.hexToArray(payload.hmac);
    const hmacHex = encUtils.arrayToHex(hmac, false);
    const unsigned = encUtils.concatArrays(cipherText, iv);
    const chmac = yield isoCrypto.hmacSha256Sign(key, unsigned);
    const chmacHex = encUtils.arrayToHex(chmac, false);

    if (encUtils.removeHexPrefix(hmacHex) === encUtils.removeHexPrefix(chmacHex)) {
      return true;
    }

    return false;
  });
}

exports.verifyHmac = verifyHmac;

function encrypt(data, key, providedIv) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const _key = encUtils.bufferToArray(utils_1.convertArrayBufferToBuffer(key));

    const ivArrayBuffer = providedIv || (yield generateKey(128));
    const iv = encUtils.bufferToArray(utils_1.convertArrayBufferToBuffer(ivArrayBuffer));
    const ivHex = encUtils.arrayToHex(iv, false);
    const contentString = JSON.stringify(data);
    const content = encUtils.utf8ToArray(contentString);
    const cipherText = yield isoCrypto.aesCbcEncrypt(iv, _key, content);
    const cipherTextHex = encUtils.arrayToHex(cipherText, false);
    const unsigned = encUtils.concatArrays(cipherText, iv);
    const hmac = yield isoCrypto.hmacSha256Sign(_key, unsigned);
    const hmacHex = encUtils.arrayToHex(hmac, false);
    return {
      data: cipherTextHex,
      hmac: hmacHex,
      iv: ivHex
    };
  });
}

exports.encrypt = encrypt;

function decrypt(payload, key) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const _key = encUtils.bufferToArray(utils_1.convertArrayBufferToBuffer(key));

    if (!_key) {
      throw new Error("Missing key: required for decryption");
    }

    const verified = yield verifyHmac(payload, _key);

    if (!verified) {
      return null;
    }

    const cipherText = encUtils.hexToArray(payload.data);
    const iv = encUtils.hexToArray(payload.iv);
    const buffer = yield isoCrypto.aesCbcDecrypt(iv, _key, cipherText);
    const utf8 = encUtils.arrayToUtf8(buffer);
    let data;

    try {
      data = JSON.parse(utf8);
    } catch (error) {
      return null;
    }

    return data;
  });
}

exports.decrypt = decrypt;

/***/ }),

/***/ "./node_modules/@walletconnect/qrcode-modal/dist/cjs/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/@walletconnect/qrcode-modal/dist/cjs/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var browserUtils = __webpack_require__(/*! @walletconnect/browser-utils */ "./node_modules/@walletconnect/browser-utils/dist/cjs/index.js");

var QRCode = _interopDefault(__webpack_require__(/*! qrcode */ "./node_modules/qrcode/lib/browser.js"));

var React = __webpack_require__(/*! preact/compat */ "./node_modules/preact/compat/dist/compat.module.js");

function open(uri) {
  QRCode.toString(uri, {
    type: "terminal"
  }).then(console.log);
}

var WALLETCONNECT_STYLE_SHEET = ":root {\n  --animation-duration: 300ms;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.animated {\n  animation-duration: var(--animation-duration);\n  animation-fill-mode: both;\n}\n\n.fadeIn {\n  animation-name: fadeIn;\n}\n\n.fadeOut {\n  animation-name: fadeOut;\n}\n\n#walletconnect-wrapper {\n  -webkit-user-select: none;\n  align-items: center;\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  left: 0;\n  pointer-events: none;\n  position: fixed;\n  top: 0;\n  user-select: none;\n  width: 100%;\n  z-index: 99999999999999;\n}\n\n.walletconnect-modal__headerLogo {\n  height: 21px;\n}\n\n.walletconnect-modal__header p {\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n  align-items: flex-start;\n  display: flex;\n  flex: 1;\n  margin-left: 5px;\n}\n\n.walletconnect-modal__close__wrapper {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  z-index: 10000;\n  background: white;\n  border-radius: 26px;\n  padding: 6px;\n  box-sizing: border-box;\n  width: 26px;\n  height: 26px;\n  cursor: pointer;\n}\n\n.walletconnect-modal__close__icon {\n  position: relative;\n  top: 7px;\n  right: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: rotate(45deg);\n}\n\n.walletconnect-modal__close__line1 {\n  position: absolute;\n  width: 100%;\n  border: 1px solid rgb(48, 52, 59);\n}\n\n.walletconnect-modal__close__line2 {\n  position: absolute;\n  width: 100%;\n  border: 1px solid rgb(48, 52, 59);\n  transform: rotate(90deg);\n}\n\n.walletconnect-qrcode__base {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  background: rgba(37, 41, 46, 0.95);\n  height: 100%;\n  left: 0;\n  pointer-events: auto;\n  position: fixed;\n  top: 0;\n  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n  width: 100%;\n  will-change: opacity;\n  padding: 40px;\n  box-sizing: border-box;\n}\n\n.walletconnect-qrcode__text {\n  color: rgba(60, 66, 82, 0.6);\n  font-size: 16px;\n  font-weight: 600;\n  letter-spacing: 0;\n  line-height: 1.1875em;\n  margin: 10px 0 30px 0;\n  text-align: center;\n  width: 100%;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-qrcode__text {\n    font-size: 4vw;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-qrcode__text {\n    font-size: 14px;\n  }\n}\n\n.walletconnect-qrcode__image {\n  width: calc(100% - 30px);\n  box-sizing: border-box;\n  cursor: none;\n  margin: 0 auto;\n}\n\n.walletconnect-qrcode__notification {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  font-size: 16px;\n  padding: 16px 20px;\n  border-radius: 16px;\n  text-align: center;\n  transition: all 0.1s ease-in-out;\n  background: white;\n  color: black;\n  margin-bottom: -60px;\n  opacity: 0;\n}\n\n.walletconnect-qrcode__notification.notification__show {\n  opacity: 1;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-modal__header {\n    height: 130px;\n  }\n  .walletconnect-modal__base {\n    overflow: auto;\n  }\n}\n\n@media only screen and (min-device-width: 415px) and (max-width: 768px) {\n  #content {\n    max-width: 768px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (min-width: 375px) and (max-width: 415px) {\n  #content {\n    max-width: 414px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (min-width: 320px) and (max-width: 375px) {\n  #content {\n    max-width: 375px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  #content {\n    max-width: 320px;\n    box-sizing: border-box;\n  }\n}\n\n.walletconnect-modal__base {\n  -webkit-font-smoothing: antialiased;\n  background: #ffffff;\n  border-radius: 24px;\n  box-shadow: 0 10px 50px 5px rgba(0, 0, 0, 0.4);\n  font-family: ui-rounded, \"SF Pro Rounded\", \"SF Pro Text\", medium-content-sans-serif-font,\n    -apple-system, BlinkMacSystemFont, ui-sans-serif, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell,\n    \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  margin-top: 41px;\n  padding: 24px 24px 22px;\n  pointer-events: auto;\n  position: relative;\n  text-align: center;\n  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n  will-change: transform;\n  overflow: visible;\n  transform: translateY(-50%);\n  top: 50%;\n  max-width: 500px;\n  margin: auto;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-modal__base {\n    padding: 24px 12px;\n  }\n}\n\n.walletconnect-modal__base .hidden {\n  transform: translateY(150%);\n  transition: 0.125s cubic-bezier(0.4, 0, 1, 1);\n}\n\n.walletconnect-modal__header {\n  align-items: center;\n  display: flex;\n  height: 26px;\n  left: 0;\n  justify-content: space-between;\n  position: absolute;\n  top: -42px;\n  width: 100%;\n}\n\n.walletconnect-modal__base .wc-logo {\n  align-items: center;\n  display: flex;\n  height: 26px;\n  margin-top: 15px;\n  padding-bottom: 15px;\n  pointer-events: auto;\n}\n\n.walletconnect-modal__base .wc-logo div {\n  background-color: #3399ff;\n  height: 21px;\n  margin-right: 5px;\n  mask-image: url(\"images/wc-logo.svg\") center no-repeat;\n  width: 32px;\n}\n\n.walletconnect-modal__base .wc-logo p {\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n}\n\n.walletconnect-modal__base h2 {\n  color: rgba(60, 66, 82, 0.6);\n  font-size: 16px;\n  font-weight: 600;\n  letter-spacing: 0;\n  line-height: 1.1875em;\n  margin: 0 0 19px 0;\n  text-align: center;\n  width: 100%;\n}\n\n.walletconnect-modal__base__row {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  align-items: center;\n  border-radius: 20px;\n  cursor: pointer;\n  display: flex;\n  height: 56px;\n  justify-content: space-between;\n  padding: 0 15px;\n  position: relative;\n  margin: 0px 0px 8px;\n  text-align: left;\n  transition: 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  will-change: transform;\n  text-decoration: none;\n}\n\n.walletconnect-modal__base__row:hover {\n  background: rgba(60, 66, 82, 0.06);\n}\n\n.walletconnect-modal__base__row:active {\n  background: rgba(60, 66, 82, 0.06);\n  transform: scale(0.975);\n  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n.walletconnect-modal__base__row__h3 {\n  color: #25292e;\n  font-size: 20px;\n  font-weight: 700;\n  margin: 0;\n  padding-bottom: 3px;\n}\n\n.walletconnect-modal__base__row__right {\n  align-items: center;\n  display: flex;\n  justify-content: center;\n}\n\n.walletconnect-modal__base__row__right__app-icon {\n  border-radius: 8px;\n  height: 34px;\n  margin: 0 11px 2px 0;\n  width: 34px;\n  background-size: 100%;\n  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);\n}\n\n.walletconnect-modal__base__row__right__caret {\n  height: 18px;\n  opacity: 0.3;\n  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  width: 8px;\n  will-change: opacity;\n}\n\n.walletconnect-modal__base__row:hover .caret,\n.walletconnect-modal__base__row:active .caret {\n  opacity: 0.6;\n}\n\n.walletconnect-modal__mobile__toggle {\n  width: 80%;\n  display: flex;\n  margin: 0 auto;\n  position: relative;\n  overflow: hidden;\n  border-radius: 8px;\n  margin-bottom: 5vw;\n  background: #d4d5d9;\n}\n\n.walletconnect-modal__mobile__toggle_selector {\n  width: calc(50% - 8px);\n  background: white;\n  position: absolute;\n  border-radius: 5px;\n  height: calc(100% - 8px);\n  top: 4px;\n  transition: all 0.2s ease-in-out;\n  transform: translate3d(4px, 0, 0);\n}\n\n.walletconnect-modal__mobile__toggle.right__selected .walletconnect-modal__mobile__toggle_selector {\n  transform: translate3d(calc(100% + 12px), 0, 0);\n}\n\n.walletconnect-modal__mobile__toggle a {\n  font-size: 12px;\n  width: 50%;\n  text-align: center;\n  padding: 8px;\n  margin: 0;\n  font-weight: 600;\n  z-index: 1;\n}\n\n.walletconnect-modal__footer {\n  display: flex;\n  justify-content: center;\n  margin-top: 20px;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-modal__footer {\n    margin-top: 5vw;\n  }\n}\n\n.walletconnect-modal__footer a {\n  cursor: pointer;\n  color: #898d97;\n  font-size: 15px;\n  margin: 0 auto;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-modal__footer a {\n    font-size: 14px;\n  }\n}\n\n.walletconnect-connect__buttons__wrapper {\n  max-height: 44vh;\n}\n\n.walletconnect-connect__buttons__wrapper__android {\n  margin: 50% 0;\n}\n\n.walletconnect-connect__buttons__wrapper__wrap {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\n\n@media only screen and (min-width: 768px) {\n  .walletconnect-connect__buttons__wrapper__wrap {\n    margin-top: 40px;\n  }\n}\n\n.walletconnect-connect__button {\n  background-color: rgb(64, 153, 255);\n  padding: 12px;\n  border-radius: 8px;\n  text-decoration: none;\n  color: rgb(255, 255, 255);\n  font-weight: 500;\n}\n\n.walletconnect-connect__button__icon_anchor {\n  cursor: pointer;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin: 8px;\n  width: 42px;\n  justify-self: center;\n  flex-direction: column;\n  text-decoration: none !important;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-connect__button__icon_anchor {\n    margin: 4px;\n  }\n}\n\n.walletconnect-connect__button__icon {\n  border-radius: 10px;\n  height: 42px;\n  margin: 0;\n  width: 42px;\n  background-size: cover !important;\n  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);\n}\n\n.walletconnect-connect__button__text {\n  color: #424952;\n  font-size: 2.7vw;\n  text-decoration: none !important;\n  padding: 0;\n  margin-top: 1.8vw;\n  font-weight: 600;\n}\n\n@media only screen and (min-width: 768px) {\n  .walletconnect-connect__button__text {\n    font-size: 16px;\n    margin-top: 12px;\n  }\n}\n";
var WALLETCONNECT_LOGO_SVG_URL = "data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='300px' height='185px' viewBox='0 0 300 185' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3EWalletConnect%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='walletconnect-logo-alt' fill='%233B99FC' fill-rule='nonzero'%3E %3Cpath d='M61.4385429,36.2562612 C110.349767,-11.6319051 189.65053,-11.6319051 238.561752,36.2562612 L244.448297,42.0196786 C246.893858,44.4140867 246.893858,48.2961898 244.448297,50.690599 L224.311602,70.406102 C223.088821,71.6033071 221.106302,71.6033071 219.883521,70.406102 L211.782937,62.4749541 C177.661245,29.0669724 122.339051,29.0669724 88.2173582,62.4749541 L79.542302,70.9685592 C78.3195204,72.1657633 76.337001,72.1657633 75.1142214,70.9685592 L54.9775265,51.2530561 C52.5319653,48.8586469 52.5319653,44.9765439 54.9775265,42.5821357 L61.4385429,36.2562612 Z M280.206339,77.0300061 L298.128036,94.5769031 C300.573585,96.9713 300.573599,100.85338 298.128067,103.247793 L217.317896,182.368927 C214.872352,184.763353 210.907314,184.76338 208.461736,182.368989 C208.461726,182.368979 208.461714,182.368967 208.461704,182.368957 L151.107561,126.214385 C150.496171,125.615783 149.504911,125.615783 148.893521,126.214385 C148.893517,126.214389 148.893514,126.214393 148.89351,126.214396 L91.5405888,182.368927 C89.095052,184.763359 85.1300133,184.763399 82.6844276,182.369014 C82.6844133,182.369 82.684398,182.368986 82.6843827,182.36897 L1.87196327,103.246785 C-0.573596939,100.852377 -0.573596939,96.9702735 1.87196327,94.5758653 L19.7936929,77.028998 C22.2392531,74.6345898 26.2042918,74.6345898 28.6498531,77.028998 L86.0048306,133.184355 C86.6162214,133.782957 87.6074796,133.782957 88.2188704,133.184355 C88.2188796,133.184346 88.2188878,133.184338 88.2188969,133.184331 L145.571,77.028998 C148.016505,74.6345347 151.981544,74.6344449 154.427161,77.028798 C154.427195,77.0288316 154.427229,77.0288653 154.427262,77.028899 L211.782164,133.184331 C212.393554,133.782932 213.384814,133.782932 213.996204,133.184331 L271.350179,77.0300061 C273.79574,74.6355969 277.760778,74.6355969 280.206339,77.0300061 Z' id='WalletConnect'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E";
var WALLETCONNECT_HEADER_TEXT = "WalletConnect";
var ANIMATION_DURATION = 300;
var DEFAULT_BUTTON_COLOR = "rgb(64, 153, 255)";
var WALLETCONNECT_WRAPPER_ID = "walletconnect-wrapper";
var WALLETCONNECT_STYLE_ID = "walletconnect-style-sheet";
var WALLETCONNECT_MODAL_ID = "walletconnect-qrcode-modal";
var WALLETCONNECT_CLOSE_BUTTON_ID = "walletconnect-qrcode-close";
var WALLETCONNECT_CTA_TEXT_ID = "walletconnect-qrcode-text";
var WALLETCONNECT_CONNECT_BUTTON_ID = "walletconnect-connect-button";

function Header(props) {
  return React.createElement("div", {
    className: "walletconnect-modal__header"
  }, React.createElement("img", {
    src: WALLETCONNECT_LOGO_SVG_URL,
    className: "walletconnect-modal__headerLogo"
  }), React.createElement("p", null, WALLETCONNECT_HEADER_TEXT), React.createElement("div", {
    className: "walletconnect-modal__close__wrapper",
    onClick: props.onClose
  }, React.createElement("div", {
    id: WALLETCONNECT_CLOSE_BUTTON_ID,
    className: "walletconnect-modal__close__icon"
  }, React.createElement("div", {
    className: "walletconnect-modal__close__line1"
  }), React.createElement("div", {
    className: "walletconnect-modal__close__line2"
  }))));
} // A type of promise-like that resolves synchronously and supports only one observer


var _iteratorSymbol = /*#__PURE__*/typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator"; // Asynchronously iterate through an object's values


var _asyncIteratorSymbol = /*#__PURE__*/typeof Symbol !== "undefined" ? Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")) : "@@asyncIterator"; // Asynchronously iterate on a value using it's async iterator if present, or its synchronous iterator if missing


function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
} // Asynchronously await a promise and pass the result to a finally continuation


function ConnectButton(props) {
  return React.createElement("a", {
    className: "walletconnect-connect__button",
    href: props.href,
    id: WALLETCONNECT_CONNECT_BUTTON_ID + "-" + props.name,
    onClick: props.onClick,
    rel: "noopener noreferrer",
    style: {
      backgroundColor: props.color
    },
    target: "_blank"
  }, props.name);
}

var CARET_SVG_URL = "data:image/svg+xml,%3Csvg width='8' height='18' viewBox='0 0 8 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.586301 0.213898C0.150354 0.552968 0.0718197 1.18124 0.41089 1.61719L5.2892 7.88931C5.57007 8.25042 5.57007 8.75608 5.2892 9.11719L0.410889 15.3893C0.071819 15.8253 0.150353 16.4535 0.586301 16.7926C1.02225 17.1317 1.65052 17.0531 1.98959 16.6172L6.86791 10.3451C7.7105 9.26174 7.7105 7.74476 6.86791 6.66143L1.98959 0.38931C1.65052 -0.0466374 1.02225 -0.125172 0.586301 0.213898Z' fill='%233C4252'/%3E %3C/svg%3E";

function WalletButton(props) {
  var color = props.color;
  var href = props.href;
  var name = props.name;
  var logo = props.logo;
  var onClick = props.onClick;
  return React.createElement("a", {
    className: "walletconnect-modal__base__row",
    href: href,
    onClick: onClick,
    rel: "noopener noreferrer",
    target: "_blank"
  }, React.createElement("h3", {
    className: "walletconnect-modal__base__row__h3"
  }, name), React.createElement("div", {
    className: "walletconnect-modal__base__row__right"
  }, React.createElement("div", {
    className: "walletconnect-modal__base__row__right__app-icon",
    style: {
      background: "url('" + logo + "') " + color,
      backgroundSize: "100%"
    }
  }), React.createElement("img", {
    src: CARET_SVG_URL,
    className: "walletconnect-modal__base__row__right__caret"
  })));
}

function WalletIcon(props) {
  var color = props.color;
  var href = props.href;
  var name = props.name;
  var logo = props.logo;
  var onClick = props.onClick;
  return React.createElement("a", {
    className: "walletconnect-connect__button__icon_anchor",
    href: href,
    onClick: onClick,
    rel: "noopener noreferrer",
    target: "_blank"
  }, React.createElement("div", {
    className: "walletconnect-connect__button__icon",
    style: {
      background: "url('" + logo + "') " + color,
      backgroundSize: "100%"
    }
  }), React.createElement("div", {
    style: {
      fontSize: (name.length > 8 ? 2.5 : 2.7) + "vw"
    },
    className: "walletconnect-connect__button__text"
  }, name));
}

var GRID_MIN_COUNT = 5;
var LINKS_PER_PAGE = 12;

function MobileLinkDisplay(props) {
  var ios = browserUtils.isIOS();
  var whitelist = props.qrcodeModalOptions && props.qrcodeModalOptions.mobileLinks ? props.qrcodeModalOptions.mobileLinks : undefined;
  var ref = React.useState(1);
  var page = ref[0];
  var setPage = ref[1];
  var ref$1 = React.useState(false);
  var error = ref$1[0];
  var setError = ref$1[1];
  var ref$2 = React.useState([]);
  var links = ref$2[0];
  var setLinks = ref$2[1];
  React.useEffect(function () {
    var initMobileLinks = function () {
      try {
        if (!ios) {
          return Promise.resolve();
        }

        var _temp = _catch(function () {
          var url = browserUtils.getWalletRegistryUrl();
          return Promise.resolve(fetch(url).then(function (x) {
            return x.json();
          })).then(function (registry) {
            var _links = browserUtils.getMobileLinkRegistry(browserUtils.formatMobileRegistry(registry), whitelist);

            setLinks(_links);
          });
        }, function (e) {
          console.error(e);
          setError(true);
        });

        return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };

    initMobileLinks();
  }, []);
  var grid = links.length > GRID_MIN_COUNT;
  var pages = Math.ceil(links.length / LINKS_PER_PAGE);
  var range = [(page - 1) * LINKS_PER_PAGE + 1, page * LINKS_PER_PAGE];
  var pageLinks = links.length ? links.filter(function (_, index) {
    return index + 1 >= range[0] && index + 1 <= range[1];
  }) : [];
  return React.createElement("div", null, React.createElement("p", {
    id: WALLETCONNECT_CTA_TEXT_ID,
    className: "walletconnect-qrcode__text"
  }, ios ? props.text.choose_preferred_wallet : props.text.connect_mobile_wallet), React.createElement("div", {
    className: "walletconnect-connect__buttons__wrapper" + (!ios ? "__android" : grid ? "__wrap" : "")
  }, ios ? pageLinks.length ? pageLinks.map(function (entry) {
    var color = entry.color;
    var name = entry.name;
    var shortName = entry.shortName;
    var logo = entry.logo;
    var href = browserUtils.formatIOSMobile(props.uri, entry);
    var handleClickIOS = React.useCallback(function () {
      browserUtils.saveMobileLinkInfo({
        name: name,
        href: href
      });
    }, []);
    return !grid ? React.createElement(WalletButton, {
      color: color,
      href: href,
      name: name,
      logo: logo,
      onClick: handleClickIOS
    }) : React.createElement(WalletIcon, {
      color: color,
      href: href,
      name: shortName,
      logo: logo,
      onClick: handleClickIOS
    });
  }) : React.createElement(React.Fragment, null, React.createElement("p", null, error ? "Something went wrong" : "Loading...")) : React.createElement(ConnectButton, {
    name: props.text.connect,
    color: DEFAULT_BUTTON_COLOR,
    href: props.uri,
    onClick: React.useCallback(function () {
      browserUtils.saveMobileLinkInfo({
        name: "Unknown",
        href: props.uri
      });
    }, [])
  })), !!(ios && pages > 1) && React.createElement("div", {
    className: "walletconnect-modal__footer"
  }, Array(pages).fill(0).map(function (_, index) {
    var pageNumber = index + 1;
    var selected = page === pageNumber;
    return React.createElement("a", {
      style: {
        margin: "auto 10px",
        fontWeight: selected ? "bold" : "normal"
      },
      onClick: function () {
        return setPage(pageNumber);
      }
    }, pageNumber);
  })));
}

function Notification(props) {
  var show = !!props.message.trim();
  return React.createElement("div", {
    className: "walletconnect-qrcode__notification" + (show ? " notification__show" : "")
  }, props.message);
}

var formatQRCodeImage = function (data) {
  try {
    var result = "";
    return Promise.resolve(QRCode.toString(data, {
      margin: 0,
      type: "svg"
    })).then(function (dataString) {
      if (typeof dataString === "string") {
        result = dataString.replace("<svg", "<svg class=\"walletconnect-qrcode__image\"");
      }

      return result;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

function QRCodeDisplay(props) {
  var ref = React.useState("");
  var notification = ref[0];
  var setNotification = ref[1];
  var ref$1 = React.useState("");
  var svg = ref$1[0];
  var setSvg = ref$1[1];
  React.useEffect(function () {
    try {
      return Promise.resolve(formatQRCodeImage(props.uri)).then(function (_formatQRCodeImage) {
        setSvg(_formatQRCodeImage);
      });
    } catch (e) {
      Promise.reject(e);
    }
  }, []);

  var copyToClipboard = function () {
    var tmp = document.createElement("input");
    tmp.value = props.uri;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    tmp.remove();
    setNotification(props.text.copied_to_clipboard);
    setInterval(function () {
      return setNotification("");
    }, 1200);
  };

  return React.createElement("div", null, React.createElement("p", {
    id: WALLETCONNECT_CTA_TEXT_ID,
    className: "walletconnect-qrcode__text"
  }, props.text.scan_qrcode_with_wallet), React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: svg
    }
  }), React.createElement("div", {
    className: "walletconnect-modal__footer"
  }, React.createElement("a", {
    onClick: copyToClipboard
  }, props.text.copy_to_clipboard)), React.createElement(Notification, {
    message: notification
  }));
}

function Modal(props) {
  var mobile = browserUtils.isMobile();
  var ref = React.useState(!mobile);
  var displayQRCode = ref[0];
  var setDisplayQRCode = ref[1];
  var displayProps = {
    text: props.text,
    uri: props.uri,
    qrcodeModalOptions: props.qrcodeModalOptions
  };
  return React.createElement("div", {
    id: WALLETCONNECT_MODAL_ID,
    className: "walletconnect-qrcode__base animated fadeIn"
  }, React.createElement("div", {
    className: "walletconnect-modal__base"
  }, React.createElement(Header, {
    onClose: props.onClose
  }), mobile && React.createElement("div", {
    className: "walletconnect-modal__mobile__toggle" + (displayQRCode ? " right__selected" : "")
  }, React.createElement("div", {
    className: "walletconnect-modal__mobile__toggle_selector"
  }), React.createElement("a", {
    onClick: function () {
      return setDisplayQRCode(false);
    }
  }, props.text.mobile), React.createElement("a", {
    onClick: function () {
      return setDisplayQRCode(true);
    }
  }, props.text.qrcode)), React.createElement("div", null, displayQRCode ? React.createElement(QRCodeDisplay, Object.assign({}, displayProps)) : React.createElement(MobileLinkDisplay, Object.assign({}, displayProps)))));
}

var de = {
  choose_preferred_wallet: "Wähle bevorzugte Wallet",
  connect_mobile_wallet: "Verbinde mit Mobile Wallet",
  scan_qrcode_with_wallet: "Scanne den QR-code mit einer WalletConnect kompatiblen Wallet",
  connect: "Verbinden",
  qrcode: "QR-Code",
  mobile: "Mobile",
  copy_to_clipboard: "In die Zwischenablage kopieren",
  copied_to_clipboard: "In die Zwischenablage kopiert!"
};
var en = {
  choose_preferred_wallet: "Choose your preferred wallet",
  connect_mobile_wallet: "Connect to Mobile Wallet",
  scan_qrcode_with_wallet: "Scan QR code with a WalletConnect-compatible wallet",
  connect: "Connect",
  qrcode: "QR Code",
  mobile: "Mobile",
  copy_to_clipboard: "Copy to clipboard",
  copied_to_clipboard: "Copied to clipboard!"
};
var es = {
  choose_preferred_wallet: "Elige tu billetera preferida",
  connect_mobile_wallet: "Conectar a billetera móvil",
  scan_qrcode_with_wallet: "Escanea el código QR con una billetera compatible con WalletConnect",
  connect: "Conectar",
  qrcode: "Código QR",
  mobile: "Móvil",
  copy_to_clipboard: "Copiar",
  copied_to_clipboard: "Copiado!"
};
var fr = {
  choose_preferred_wallet: "Choisissez votre portefeuille préféré",
  connect_mobile_wallet: "Se connecter au portefeuille mobile",
  scan_qrcode_with_wallet: "Scannez le QR code avec un portefeuille compatible WalletConnect",
  connect: "Se connecter",
  qrcode: "QR Code",
  mobile: "Mobile",
  copy_to_clipboard: "Copier",
  copied_to_clipboard: "Copié!"
};
var ko = {
  choose_preferred_wallet: "원하는 지갑을 선택하세요",
  connect_mobile_wallet: "모바일 지갑과 연결",
  scan_qrcode_with_wallet: "WalletConnect 지원 지갑에서 QR코드를 스캔하세요",
  connect: "연결",
  qrcode: "QR 코드",
  mobile: "모바일",
  copy_to_clipboard: "클립보드에 복사",
  copied_to_clipboard: "클립보드에 복사되었습니다!"
};
var pt = {
  choose_preferred_wallet: "Escolha sua carteira preferida",
  connect_mobile_wallet: "Conectar-se à carteira móvel",
  scan_qrcode_with_wallet: "Ler o código QR com uma carteira compatível com WalletConnect",
  connect: "Conectar",
  qrcode: "Código QR",
  mobile: "Móvel",
  copy_to_clipboard: "Copiar",
  copied_to_clipboard: "Copiado!"
};
var zh = {
  choose_preferred_wallet: "选择你的钱包",
  connect_mobile_wallet: "连接至移动端钱包",
  scan_qrcode_with_wallet: "使用兼容 WalletConnect 的钱包扫描二维码",
  connect: "连接",
  qrcode: "二维码",
  mobile: "移动",
  copy_to_clipboard: "复制到剪贴板",
  copied_to_clipboard: "复制到剪贴板成功！"
};
var fa = {
  choose_preferred_wallet: "کیف پول مورد نظر خود را انتخاب کنید",
  connect_mobile_wallet: "به کیف پول موبایل وصل شوید",
  scan_qrcode_with_wallet: "کد QR را با یک کیف پول سازگار با WalletConnect اسکن کنید",
  connect: "اتصال",
  qrcode: "کد QR",
  mobile: "سیار",
  copy_to_clipboard: "کپی به کلیپ بورد",
  copied_to_clipboard: "در کلیپ بورد کپی شد!"
};
var languages = {
  de: de,
  en: en,
  es: es,
  fr: fr,
  ko: ko,
  pt: pt,
  zh: zh,
  fa: fa
};

function injectStyleSheet() {
  var doc = browserUtils.getDocumentOrThrow();
  var prev = doc.getElementById(WALLETCONNECT_STYLE_ID);

  if (prev) {
    doc.head.removeChild(prev);
  }

  var style = doc.createElement("style");
  style.setAttribute("id", WALLETCONNECT_STYLE_ID);
  style.innerText = WALLETCONNECT_STYLE_SHEET;
  doc.head.appendChild(style);
}

function renderWrapper() {
  var doc = browserUtils.getDocumentOrThrow();
  var wrapper = doc.createElement("div");
  wrapper.setAttribute("id", WALLETCONNECT_WRAPPER_ID);
  doc.body.appendChild(wrapper);
  return wrapper;
}

function triggerCloseAnimation() {
  var doc = browserUtils.getDocumentOrThrow();
  var modal = doc.getElementById(WALLETCONNECT_MODAL_ID);

  if (modal) {
    modal.className = modal.className.replace("fadeIn", "fadeOut");
    setTimeout(function () {
      var wrapper = doc.getElementById(WALLETCONNECT_WRAPPER_ID);

      if (wrapper) {
        doc.body.removeChild(wrapper);
      }
    }, ANIMATION_DURATION);
  }
}

function getWrappedCallback(cb) {
  return function () {
    triggerCloseAnimation();

    if (cb) {
      cb();
    }
  };
}

function getText() {
  var lang = browserUtils.getNavigatorOrThrow().language.split("-")[0] || "en";
  return languages[lang] || languages["en"];
}

function open$1(uri, cb, qrcodeModalOptions) {
  injectStyleSheet();
  var wrapper = renderWrapper();
  React.render(React.createElement(Modal, {
    text: getText(),
    uri: uri,
    onClose: getWrappedCallback(cb),
    qrcodeModalOptions: qrcodeModalOptions
  }), wrapper);
}

function close$1() {
  triggerCloseAnimation();
}

var isNode = function () {
  return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
};

function open$2(uri, cb, qrcodeModalOptions) {
  console.log(uri);

  if (isNode()) {
    open(uri);
  } else {
    open$1(uri, cb, qrcodeModalOptions);
  }
}

function close$2() {
  if (isNode()) ;else {
    close$1();
  }
}

var index = {
  open: open$2,
  close: close$2
};
module.exports = index;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@walletconnect/socket-transport/dist/cjs/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/@walletconnect/socket-transport/dist/cjs/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const utils_1 = __webpack_require__(/*! @walletconnect/utils */ "./node_modules/@walletconnect/utils/dist/cjs/index.js");

const network_1 = tslib_1.__importDefault(__webpack_require__(/*! ./network */ "./node_modules/@walletconnect/socket-transport/dist/cjs/network.js"));

const WS = typeof global.WebSocket !== "undefined" ? global.WebSocket : __webpack_require__(/*! ws */ "./node_modules/@walletconnect/socket-transport/node_modules/ws/browser.js");

class SocketTransport {
  constructor(opts) {
    this._queue = [];
    this._events = [];
    this._subscriptions = [];
    this._protocol = opts.protocol;
    this._version = opts.version;
    this._url = "";
    this._netMonitor = null;
    this._socket = null;
    this._nextSocket = null;
    this._subscriptions = opts.subscriptions || [];
    this._netMonitor = opts.netMonitor || new network_1.default();

    if (!opts.url || typeof opts.url !== "string") {
      throw new Error("Missing or invalid WebSocket url");
    }

    this._url = opts.url;

    this._netMonitor.on("online", () => this._socketCreate());
  }

  set readyState(value) {}

  get readyState() {
    return this._socket ? this._socket.readyState : -1;
  }

  set connecting(value) {}

  get connecting() {
    return this.readyState === 0;
  }

  set connected(value) {}

  get connected() {
    return this.readyState === 1;
  }

  set closing(value) {}

  get closing() {
    return this.readyState === 2;
  }

  set closed(value) {}

  get closed() {
    return this.readyState === 3;
  }

  open() {
    this._socketCreate();
  }

  close() {
    this._socketClose();
  }

  send(message, topic, silent) {
    if (!topic || typeof topic !== "string") {
      throw new Error("Missing or invalid topic field");
    }

    this._socketSend({
      topic: topic,
      type: "pub",
      payload: message,
      silent: !!silent
    });
  }

  subscribe(topic) {
    this._socketSend({
      topic: topic,
      type: "sub",
      payload: "",
      silent: true
    });
  }

  on(event, callback) {
    this._events.push({
      event,
      callback
    });
  }

  _socketCreate() {
    if (this._nextSocket) {
      return;
    }

    const url = getWebSocketUrl(this._url, this._protocol, this._version);
    this._nextSocket = new WS(url);

    if (!this._nextSocket) {
      throw new Error("Failed to create socket");
    }

    this._nextSocket.onmessage = event => this._socketReceive(event);

    this._nextSocket.onopen = () => this._socketOpen();

    this._nextSocket.onerror = event => this._socketError(event);

    this._nextSocket.onclose = () => {
      this._nextSocket = null;

      this._socketCreate();
    };
  }

  _socketOpen() {
    this._socketClose();

    this._socket = this._nextSocket;
    this._nextSocket = null;

    this._queueSubscriptions();

    this._pushQueue();
  }

  _socketClose() {
    if (this._socket) {
      this._socket.onclose = () => {};

      this._socket.close();
    }
  }

  _socketSend(socketMessage) {
    const message = JSON.stringify(socketMessage);

    if (this._socket && this._socket.readyState === 1) {
      this._socket.send(message);
    } else {
      this._setToQueue(socketMessage);

      this._socketCreate();
    }
  }

  _socketReceive(event) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      let socketMessage;

      try {
        socketMessage = JSON.parse(event.data);
      } catch (error) {
        return;
      }

      this._socketSend({
        topic: socketMessage.topic,
        type: "ack",
        payload: "",
        silent: true
      });

      if (this._socket && this._socket.readyState === 1) {
        const events = this._events.filter(event => event.event === "message");

        if (events && events.length) {
          events.forEach(event => event.callback(socketMessage));
        }
      }
    });
  }

  _socketError(e) {
    const events = this._events.filter(event => event.event === "error");

    if (events && events.length) {
      events.forEach(event => event.callback(e));
    }
  }

  _queueSubscriptions() {
    const subscriptions = this._subscriptions;
    subscriptions.forEach(topic => this._queue.push({
      topic: topic,
      type: "sub",
      payload: "",
      silent: true
    }));
    this._subscriptions = [];
  }

  _setToQueue(socketMessage) {
    this._queue.push(socketMessage);
  }

  _pushQueue() {
    const queue = this._queue;
    queue.forEach(socketMessage => this._socketSend(socketMessage));
    this._queue = [];
  }

}

function getWebSocketUrl(_url, protocol, version) {
  var _a, _b;

  const url = _url.startsWith("https") ? _url.replace("https", "wss") : _url.startsWith("http") ? _url.replace("http", "ws") : _url;
  const splitUrl = url.split("?");
  const params = utils_1.isBrowser() ? {
    protocol,
    version,
    env: "browser",
    host: ((_a = utils_1.getLocation()) === null || _a === void 0 ? void 0 : _a.host) || ""
  } : {
    protocol,
    version,
    env: ((_b = utils_1.detectEnv()) === null || _b === void 0 ? void 0 : _b.name) || ""
  };
  const queryString = utils_1.appendToQueryString(utils_1.getQueryString(splitUrl[1] || ""), params);
  return splitUrl[0] + "?" + queryString;
}

exports.default = SocketTransport;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@walletconnect/socket-transport/dist/cjs/network.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@walletconnect/socket-transport/dist/cjs/network.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

class NetworkMonitor {
  constructor() {
    this._eventEmitters = [];

    if (typeof window !== "undefined" && typeof window.addEventListener !== "undefined") {
      window.addEventListener("online", () => this.trigger("online"));
      window.addEventListener("offline", () => this.trigger("offline"));
    }
  }

  on(event, callback) {
    this._eventEmitters.push({
      event,
      callback
    });
  }

  trigger(event) {
    let eventEmitters = [];

    if (event) {
      eventEmitters = this._eventEmitters.filter(eventEmitter => eventEmitter.event === event);
    }

    eventEmitters.forEach(eventEmitter => {
      eventEmitter.callback();
    });
  }

}

exports.default = NetworkMonitor;

/***/ }),

/***/ "./node_modules/@walletconnect/socket-transport/node_modules/ws/browser.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@walletconnect/socket-transport/node_modules/ws/browser.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  throw new Error('ws does not work in the browser. Browser clients must use the native ' + 'WebSocket object');
};

/***/ }),

/***/ "./node_modules/@walletconnect/utils/dist/cjs/constants.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/dist/cjs/constants.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateMethods = exports.signingMethods = exports.reservedEvents = void 0;
exports.reservedEvents = ["session_request", "session_update", "exchange_key", "connect", "disconnect", "display_uri", "modal_closed", "transport_open", "transport_close", "transport_error"];
exports.signingMethods = ["eth_sendTransaction", "eth_signTransaction", "eth_sign", "eth_signTypedData", "eth_signTypedData_v1", "eth_signTypedData_v2", "eth_signTypedData_v3", "eth_signTypedData_v4", "personal_sign"];
exports.stateMethods = ["eth_accounts", "eth_chainId", "net_version"];

/***/ }),

/***/ "./node_modules/@walletconnect/utils/dist/cjs/encoding.js":
/*!****************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/dist/cjs/encoding.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertNumberToHex = exports.convertNumberToUtf8 = exports.convertNumberToArrayBuffer = exports.convertNumberToBuffer = exports.convertHexToNumber = exports.convertHexToUtf8 = exports.convertHexToArrayBuffer = exports.convertHexToBuffer = exports.convertUtf8ToNumber = exports.convertUtf8ToHex = exports.convertUtf8ToBuffer = exports.convertUtf8ToArrayBuffer = exports.concatBuffers = exports.convertBufferToNumber = exports.convertBufferToHex = exports.convertBufferToUtf8 = exports.convertBufferToArrayBuffer = exports.concatArrayBuffers = exports.convertArrayBufferToNumber = exports.convertArrayBufferToHex = exports.convertArrayBufferToUtf8 = exports.convertArrayBufferToBuffer = void 0;

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const bn_js_1 = tslib_1.__importDefault(__webpack_require__(/*! bn.js */ "./node_modules/@walletconnect/utils/node_modules/bn.js/lib/bn.js"));

const encUtils = tslib_1.__importStar(__webpack_require__(/*! enc-utils */ "./node_modules/enc-utils/dist/cjs/index.js"));

function convertArrayBufferToBuffer(arrBuf) {
  return encUtils.arrayToBuffer(new Uint8Array(arrBuf));
}

exports.convertArrayBufferToBuffer = convertArrayBufferToBuffer;

function convertArrayBufferToUtf8(arrBuf) {
  return encUtils.arrayToUtf8(new Uint8Array(arrBuf));
}

exports.convertArrayBufferToUtf8 = convertArrayBufferToUtf8;

function convertArrayBufferToHex(arrBuf, noPrefix) {
  return encUtils.arrayToHex(new Uint8Array(arrBuf), !noPrefix);
}

exports.convertArrayBufferToHex = convertArrayBufferToHex;

function convertArrayBufferToNumber(arrBuf) {
  return encUtils.arrayToNumber(new Uint8Array(arrBuf));
}

exports.convertArrayBufferToNumber = convertArrayBufferToNumber;

function concatArrayBuffers(...args) {
  return encUtils.hexToArray(args.map(b => encUtils.arrayToHex(new Uint8Array(b))).join("")).buffer;
}

exports.concatArrayBuffers = concatArrayBuffers;

function convertBufferToArrayBuffer(buf) {
  return encUtils.bufferToArray(buf).buffer;
}

exports.convertBufferToArrayBuffer = convertBufferToArrayBuffer;

function convertBufferToUtf8(buf) {
  return encUtils.bufferToUtf8(buf);
}

exports.convertBufferToUtf8 = convertBufferToUtf8;

function convertBufferToHex(buf, noPrefix) {
  return encUtils.bufferToHex(buf, !noPrefix);
}

exports.convertBufferToHex = convertBufferToHex;

function convertBufferToNumber(buf) {
  return encUtils.bufferToNumber(buf);
}

exports.convertBufferToNumber = convertBufferToNumber;

function concatBuffers(...args) {
  return encUtils.concatBuffers(...args);
}

exports.concatBuffers = concatBuffers;

function convertUtf8ToArrayBuffer(utf8) {
  return encUtils.utf8ToArray(utf8).buffer;
}

exports.convertUtf8ToArrayBuffer = convertUtf8ToArrayBuffer;

function convertUtf8ToBuffer(utf8) {
  return encUtils.utf8ToBuffer(utf8);
}

exports.convertUtf8ToBuffer = convertUtf8ToBuffer;

function convertUtf8ToHex(utf8, noPrefix) {
  return encUtils.utf8ToHex(utf8, !noPrefix);
}

exports.convertUtf8ToHex = convertUtf8ToHex;

function convertUtf8ToNumber(utf8) {
  return new bn_js_1.default(utf8, 10).toNumber();
}

exports.convertUtf8ToNumber = convertUtf8ToNumber;

function convertHexToBuffer(hex) {
  return encUtils.hexToBuffer(hex);
}

exports.convertHexToBuffer = convertHexToBuffer;

function convertHexToArrayBuffer(hex) {
  return encUtils.hexToArray(hex).buffer;
}

exports.convertHexToArrayBuffer = convertHexToArrayBuffer;

function convertHexToUtf8(hex) {
  return encUtils.hexToUtf8(hex);
}

exports.convertHexToUtf8 = convertHexToUtf8;

function convertHexToNumber(hex) {
  return new bn_js_1.default(encUtils.removeHexPrefix(hex), "hex").toNumber();
}

exports.convertHexToNumber = convertHexToNumber;

function convertNumberToBuffer(num) {
  return encUtils.numberToBuffer(num);
}

exports.convertNumberToBuffer = convertNumberToBuffer;

function convertNumberToArrayBuffer(num) {
  return encUtils.numberToArray(num).buffer;
}

exports.convertNumberToArrayBuffer = convertNumberToArrayBuffer;

function convertNumberToUtf8(num) {
  return new bn_js_1.default(num).toString();
}

exports.convertNumberToUtf8 = convertNumberToUtf8;

function convertNumberToHex(num, noPrefix) {
  const hex = encUtils.removeHexPrefix(encUtils.sanitizeHex(new bn_js_1.default(num).toString(16)));
  return noPrefix ? hex : encUtils.addHexPrefix(hex);
}

exports.convertNumberToHex = convertNumberToHex;

/***/ }),

/***/ "./node_modules/@walletconnect/utils/dist/cjs/ethereum.js":
/*!****************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/dist/cjs/ethereum.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTransactionData = exports.parsePersonalSign = exports.isValidAddress = exports.toChecksumAddress = void 0;

const js_sha3_1 = __webpack_require__(/*! js-sha3 */ "./node_modules/@walletconnect/utils/node_modules/js-sha3/src/sha3.js");

const encoding_1 = __webpack_require__(/*! ./encoding */ "./node_modules/@walletconnect/utils/dist/cjs/encoding.js");

const misc_1 = __webpack_require__(/*! ./misc */ "./node_modules/@walletconnect/utils/dist/cjs/misc.js");

const validators_1 = __webpack_require__(/*! ./validators */ "./node_modules/@walletconnect/utils/dist/cjs/validators.js");

const enc_utils_1 = __webpack_require__(/*! enc-utils */ "./node_modules/enc-utils/dist/cjs/index.js");

function toChecksumAddress(address) {
  address = enc_utils_1.removeHexPrefix(address.toLowerCase());
  const hash = enc_utils_1.removeHexPrefix(js_sha3_1.keccak_256(encoding_1.convertUtf8ToBuffer(address)));
  let checksum = "";

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) > 7) {
      checksum += address[i].toUpperCase();
    } else {
      checksum += address[i];
    }
  }

  return enc_utils_1.addHexPrefix(checksum);
}

exports.toChecksumAddress = toChecksumAddress;

const isValidAddress = address => {
  if (!address) {
    return false;
  } else if (address.toLowerCase().substring(0, 2) !== "0x") {
    return false;
  } else if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    return true;
  } else {
    return address === toChecksumAddress(address);
  }
};

exports.isValidAddress = isValidAddress;

function parsePersonalSign(params) {
  if (!validators_1.isEmptyArray(params) && !validators_1.isHexString(params[0])) {
    params[0] = encoding_1.convertUtf8ToHex(params[0]);
  }

  return params;
}

exports.parsePersonalSign = parsePersonalSign;

function parseTransactionData(txData) {
  if (typeof txData.from === "undefined" || !exports.isValidAddress(txData.from)) {
    throw new Error(`Transaction object must include a valid 'from' value.`);
  }

  function parseHexValues(value) {
    let result = value;

    if (typeof value === "number" || typeof value === "string" && !validators_1.isEmptyString(value)) {
      if (!validators_1.isHexString(value)) {
        result = encoding_1.convertNumberToHex(value);
      } else if (typeof value === "string") {
        result = misc_1.sanitizeHex(value);
      }
    }

    if (typeof result === "string") {
      result = misc_1.removeHexLeadingZeros(result);
    }

    return result;
  }

  const txDataRPC = {
    from: misc_1.sanitizeHex(txData.from),
    to: typeof txData.to === "undefined" ? "" : misc_1.sanitizeHex(txData.to),
    gasPrice: typeof txData.gasPrice === "undefined" ? "" : parseHexValues(txData.gasPrice),
    gas: typeof txData.gas === "undefined" ? typeof txData.gasLimit === "undefined" ? "" : parseHexValues(txData.gasLimit) : parseHexValues(txData.gas),
    value: typeof txData.value === "undefined" ? "" : parseHexValues(txData.value),
    nonce: typeof txData.nonce === "undefined" ? "" : parseHexValues(txData.nonce),
    data: typeof txData.data === "undefined" ? "" : misc_1.sanitizeHex(txData.data) || "0x"
  };
  const prunable = ["gasPrice", "gas", "value", "nonce"];
  Object.keys(txDataRPC).forEach(key => {
    if (!txDataRPC[key].trim().length && prunable.includes(key)) {
      delete txDataRPC[key];
    }
  });
  return txDataRPC;
}

exports.parseTransactionData = parseTransactionData;

/***/ }),

/***/ "./node_modules/@walletconnect/utils/dist/cjs/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/dist/cjs/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

tslib_1.__exportStar(__webpack_require__(/*! @walletconnect/browser-utils */ "./node_modules/@walletconnect/browser-utils/dist/cjs/index.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./constants */ "./node_modules/@walletconnect/utils/dist/cjs/constants.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./encoding */ "./node_modules/@walletconnect/utils/dist/cjs/encoding.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./ethereum */ "./node_modules/@walletconnect/utils/dist/cjs/ethereum.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./misc */ "./node_modules/@walletconnect/utils/dist/cjs/misc.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./payload */ "./node_modules/@walletconnect/utils/dist/cjs/payload.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./session */ "./node_modules/@walletconnect/utils/dist/cjs/session.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./url */ "./node_modules/@walletconnect/utils/dist/cjs/url.js"), exports);

tslib_1.__exportStar(__webpack_require__(/*! ./validators */ "./node_modules/@walletconnect/utils/dist/cjs/validators.js"), exports);

/***/ }),

/***/ "./node_modules/@walletconnect/utils/dist/cjs/misc.js":
/*!************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/dist/cjs/misc.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logDeprecationWarning = exports.uuid = exports.payloadId = exports.removeHexLeadingZeros = exports.removeHexPrefix = exports.addHexPrefix = exports.sanitizeHex = void 0;

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const encUtils = tslib_1.__importStar(__webpack_require__(/*! enc-utils */ "./node_modules/enc-utils/dist/cjs/index.js"));

const jsonRpcUtils = tslib_1.__importStar(__webpack_require__(/*! @json-rpc-tools/utils */ "./node_modules/@json-rpc-tools/utils/dist/cjs/index.js"));

function sanitizeHex(hex) {
  return encUtils.sanitizeHex(hex);
}

exports.sanitizeHex = sanitizeHex;

function addHexPrefix(hex) {
  return encUtils.addHexPrefix(hex);
}

exports.addHexPrefix = addHexPrefix;

function removeHexPrefix(hex) {
  return encUtils.removeHexPrefix(hex);
}

exports.removeHexPrefix = removeHexPrefix;

function removeHexLeadingZeros(hex) {
  return encUtils.removeHexLeadingZeros(encUtils.addHexPrefix(hex));
}

exports.removeHexLeadingZeros = removeHexLeadingZeros;
exports.payloadId = jsonRpcUtils.payloadId;

function uuid() {
  const result = ((a, b) => {
    for (b = a = ""; a++ < 36; b += a * 51 & 52 ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : "-") {}

    return b;
  })();

  return result;
}

exports.uuid = uuid;

function logDeprecationWarning() {
  console.warn("DEPRECATION WARNING: This WalletConnect client library will be deprecated in favor of @walletconnect/client. Please check docs.walletconnect.org to learn more about this migration!");
}

exports.logDeprecationWarning = logDeprecationWarning;

/***/ }),

/***/ "./node_modules/@walletconnect/utils/dist/cjs/payload.js":
/*!***************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/dist/cjs/payload.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatRpcError = exports.promisify = void 0;

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

function promisify(originalFn, thisArg) {
  const promisifiedFunction = (...callArgs) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      const callback = (err, data) => {
        if (err === null || typeof err === "undefined") {
          reject(err);
        }

        resolve(data);
      };

      originalFn.apply(thisArg, [...callArgs, callback]);
    });
  });

  return promisifiedFunction;
}

exports.promisify = promisify;

function formatRpcError(error) {
  const message = error.message || "Failed or Rejected Request";
  let code = -32000;

  if (error && !error.code) {
    switch (message) {
      case "Parse error":
        code = -32700;
        break;

      case "Invalid request":
        code = -32600;
        break;

      case "Method not found":
        code = -32601;
        break;

      case "Invalid params":
        code = -32602;
        break;

      case "Internal error":
        code = -32603;
        break;

      default:
        code = -32000;
        break;
    }
  }

  const result = {
    code,
    message
  };
  return result;
}

exports.formatRpcError = formatRpcError;

/***/ }),

/***/ "./node_modules/@walletconnect/utils/dist/cjs/session.js":
/*!***************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/dist/cjs/session.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseWalletConnectUri = exports.isWalletConnectSession = void 0;

const url_1 = __webpack_require__(/*! ./url */ "./node_modules/@walletconnect/utils/dist/cjs/url.js");

function isWalletConnectSession(object) {
  return typeof object.bridge !== "undefined";
}

exports.isWalletConnectSession = isWalletConnectSession;

function parseWalletConnectUri(str) {
  const pathStart = str.indexOf(":");
  const pathEnd = str.indexOf("?") !== -1 ? str.indexOf("?") : undefined;
  const protocol = str.substring(0, pathStart);
  const path = str.substring(pathStart + 1, pathEnd);

  function parseRequiredParams(path) {
    const separator = "@";
    const values = path.split(separator);
    const requiredParams = {
      handshakeTopic: values[0],
      version: parseInt(values[1], 10)
    };
    return requiredParams;
  }

  const requiredParams = parseRequiredParams(path);
  const queryString = typeof pathEnd !== "undefined" ? str.substr(pathEnd) : "";

  function parseQueryParams(queryString) {
    const result = url_1.parseQueryString(queryString);
    const parameters = {
      key: result.key || "",
      bridge: result.bridge || ""
    };
    return parameters;
  }

  const queryParams = parseQueryParams(queryString);
  const result = Object.assign(Object.assign({
    protocol
  }, requiredParams), queryParams);
  return result;
}

exports.parseWalletConnectUri = parseWalletConnectUri;

/***/ }),

/***/ "./node_modules/@walletconnect/utils/dist/cjs/url.js":
/*!***********************************************************!*\
  !*** ./node_modules/@walletconnect/utils/dist/cjs/url.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatQueryString = exports.parseQueryString = exports.appendToQueryString = exports.getQueryString = void 0;

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const queryStringUtils = tslib_1.__importStar(__webpack_require__(/*! query-string */ "./node_modules/@walletconnect/utils/node_modules/query-string/index.js"));

function getQueryString(url) {
  const pathEnd = url.indexOf("?") !== -1 ? url.indexOf("?") : undefined;
  const queryString = typeof pathEnd !== "undefined" ? url.substr(pathEnd) : "";
  return queryString;
}

exports.getQueryString = getQueryString;

function appendToQueryString(queryString, newQueryParams) {
  let queryParams = parseQueryString(queryString);
  queryParams = Object.assign(Object.assign({}, queryParams), newQueryParams);
  queryString = formatQueryString(queryParams);
  return queryString;
}

exports.appendToQueryString = appendToQueryString;

function parseQueryString(queryString) {
  return queryStringUtils.parse(queryString);
}

exports.parseQueryString = parseQueryString;

function formatQueryString(queryParams) {
  return queryStringUtils.stringify(queryParams);
}

exports.formatQueryString = formatQueryString;

/***/ }),

/***/ "./node_modules/@walletconnect/utils/dist/cjs/validators.js":
/*!******************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/dist/cjs/validators.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSilentPayload = exports.isReservedEvent = exports.isInternalEvent = exports.isJsonRpcResponseError = exports.isJsonRpcResponseSuccess = exports.isJsonRpcRequest = exports.isJsonRpcSubscription = exports.isHexString = exports.getEncoding = exports.getType = exports.isArrayBuffer = exports.isTypedArray = exports.isBuffer = exports.isEmptyArray = exports.isEmptyString = void 0;

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const encUtils = tslib_1.__importStar(__webpack_require__(/*! enc-utils */ "./node_modules/enc-utils/dist/cjs/index.js"));

const constants_1 = __webpack_require__(/*! ./constants */ "./node_modules/@walletconnect/utils/dist/cjs/constants.js");

function isEmptyString(value) {
  return value === "" || typeof value === "string" && value.trim() === "";
}

exports.isEmptyString = isEmptyString;

function isEmptyArray(array) {
  return !(array && array.length);
}

exports.isEmptyArray = isEmptyArray;

function isBuffer(val) {
  return encUtils.isBuffer(val);
}

exports.isBuffer = isBuffer;

function isTypedArray(val) {
  return encUtils.isTypedArray(val);
}

exports.isTypedArray = isTypedArray;

function isArrayBuffer(val) {
  return encUtils.isArrayBuffer(val);
}

exports.isArrayBuffer = isArrayBuffer;

function getType(val) {
  return encUtils.getType(val);
}

exports.getType = getType;

function getEncoding(val) {
  return encUtils.getEncoding(val);
}

exports.getEncoding = getEncoding;

function isHexString(value, length) {
  return encUtils.isHexString(value, length);
}

exports.isHexString = isHexString;

function isJsonRpcSubscription(object) {
  return typeof object.params === "object";
}

exports.isJsonRpcSubscription = isJsonRpcSubscription;

function isJsonRpcRequest(object) {
  return typeof object.method !== "undefined";
}

exports.isJsonRpcRequest = isJsonRpcRequest;

function isJsonRpcResponseSuccess(object) {
  return typeof object.result !== "undefined";
}

exports.isJsonRpcResponseSuccess = isJsonRpcResponseSuccess;

function isJsonRpcResponseError(object) {
  return typeof object.error !== "undefined";
}

exports.isJsonRpcResponseError = isJsonRpcResponseError;

function isInternalEvent(object) {
  return typeof object.event !== "undefined";
}

exports.isInternalEvent = isInternalEvent;

function isReservedEvent(event) {
  return constants_1.reservedEvents.includes(event) || event.startsWith("wc_");
}

exports.isReservedEvent = isReservedEvent;

function isSilentPayload(request) {
  if (request.method.startsWith("wc_")) {
    return true;
  }

  if (constants_1.signingMethods.includes(request.method)) {
    return false;
  }

  return true;
}

exports.isSilentPayload = isSilentPayload;

/***/ }),

/***/ "./node_modules/@walletconnect/utils/node_modules/bn.js/lib/bn.js":
/*!************************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/node_modules/bn.js/lib/bn.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
  'use strict'; // Utils

  function assert(val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  } // Could use `inherits` module, but don't want to move from single file
  // architecture yet.


  function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function () {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  } // BN


  function BN(number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0; // Reduction context

    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }

  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;
  var Buffer;

  try {
    Buffer = __webpack_require__(/*! buffer */ 19).Buffer;
  } catch (e) {}

  BN.isBN = function isBN(num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' && num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max(left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min(left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init(number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }

    assert(base === (base | 0) && base >= 2 && base <= 36);
    number = number.toString().replace(/\s+/g, '');
    var start = 0;

    if (number[0] === '-') {
      start++;
    }

    if (base === 16) {
      this._parseHex(number, start);
    } else {
      this._parseBase(number, base, start);
    }

    if (number[0] === '-') {
      this.negative = 1;
    }

    this.strip();
    if (endian !== 'le') return;

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initNumber = function _initNumber(number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }

    if (number < 0x4000000) {
      this.words = [number & 0x3ffffff];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [number & 0x3ffffff, number / 0x4000000 & 0x3ffffff];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)

      this.words = [number & 0x3ffffff, number / 0x4000000 & 0x3ffffff, 1];
      this.length = 3;
    }

    if (endian !== 'le') return; // Reverse the bytes

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray(number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');

    if (number.length <= 0) {
      this.words = [0];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);

    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;

    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
        this.words[j] |= w << off & 0x3ffffff;
        this.words[j + 1] = w >>> 26 - off & 0x3ffffff;
        off += 24;

        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
        this.words[j] |= w << off & 0x3ffffff;
        this.words[j + 1] = w >>> 26 - off & 0x3ffffff;
        off += 24;

        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }

    return this.strip();
  };

  function parseHex(str, start, end) {
    var r = 0;
    var len = Math.min(str.length, end);

    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;
      r <<= 4; // 'a' - 'f'

      if (c >= 49 && c <= 54) {
        r |= c - 49 + 0xa; // 'A' - 'F'
      } else if (c >= 17 && c <= 22) {
        r |= c - 17 + 0xa; // '0' - '9'
      } else {
        r |= c & 0xf;
      }
    }

    return r;
  }

  BN.prototype._parseHex = function _parseHex(number, start) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);

    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w; // Scan 24-bit chunks and add them to the number

    var off = 0;

    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
      w = parseHex(number, i, i + 6);
      this.words[j] |= w << off & 0x3ffffff; // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb

      this.words[j + 1] |= w >>> 26 - off & 0x3fffff;
      off += 24;

      if (off >= 26) {
        off -= 26;
        j++;
      }
    }

    if (i + 6 !== start) {
      w = parseHex(number, start, i + 6);
      this.words[j] |= w << off & 0x3ffffff;
      this.words[j + 1] |= w >>> 26 - off & 0x3fffff;
    }

    this.strip();
  };

  function parseBase(str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);

    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;
      r *= mul; // 'a'

      if (c >= 49) {
        r += c - 49 + 0xa; // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa; // '0' - '9'
      } else {
        r += c;
      }
    }

    return r;
  }

  BN.prototype._parseBase = function _parseBase(number, base, start) {
    // Initialize as zero
    this.words = [0];
    this.length = 1; // Find length of limb in base

    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }

    limbLen--;
    limbPow = limbPow / base | 0;
    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;
    var word = 0;

    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);
      this.imuln(limbPow);

      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);

      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
  };

  BN.prototype.copy = function copy(dest) {
    dest.words = new Array(this.length);

    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }

    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone() {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand(size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }

    return this;
  }; // Remove leading `0` from `this`


  BN.prototype.strip = function strip() {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }

    return this._normSign();
  };

  BN.prototype._normSign = function _normSign() {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }

    return this;
  };

  BN.prototype.inspect = function inspect() {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };
  /*
   var zeros = [];
  var groupSizes = [];
  var groupBases = [];
   var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }
   */


  var zeros = ['', '0', '00', '000', '0000', '00000', '000000', '0000000', '00000000', '000000000', '0000000000', '00000000000', '000000000000', '0000000000000', '00000000000000', '000000000000000', '0000000000000000', '00000000000000000', '000000000000000000', '0000000000000000000', '00000000000000000000', '000000000000000000000', '0000000000000000000000', '00000000000000000000000', '000000000000000000000000', '0000000000000000000000000'];
  var groupSizes = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
  var groupBases = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

  BN.prototype.toString = function toString(base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;
    var out;

    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;

      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = ((w << off | carry) & 0xffffff).toString(16);
        carry = w >>> 24 - off & 0xffffff;

        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }

        off += 2;

        if (off >= 26) {
          off -= 26;
          i--;
        }
      }

      if (carry !== 0) {
        out = carry.toString(16) + out;
      }

      while (out.length % padding !== 0) {
        out = '0' + out;
      }

      if (this.negative !== 0) {
        out = '-' + out;
      }

      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base]; // var groupBase = Math.pow(base, groupSize);

      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;

      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }

      if (this.isZero()) {
        out = '0' + out;
      }

      while (out.length % padding !== 0) {
        out = '0' + out;
      }

      if (this.negative !== 0) {
        out = '-' + out;
      }

      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber() {
    var ret = this.words[0];

    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + this.words[1] * 0x4000000;
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }

    return this.negative !== 0 ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON() {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer(endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray(endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');
    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);
    var b, i;
    var q = this.clone();

    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);
        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);
        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits(w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits(w) {
      var t = w;
      var r = 0;

      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }

      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }

      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }

      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }

      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits(w) {
    // Short-cut
    if (w === 0) return 26;
    var t = w;
    var r = 0;

    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }

    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }

    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }

    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }

    if ((t & 0x1) === 0) {
      r++;
    }

    return r;
  }; // Return number of used bits in a BN


  BN.prototype.bitLength = function bitLength() {
    var w = this.words[this.length - 1];

    var hi = this._countBits(w);

    return (this.length - 1) * 26 + hi;
  };

  function toBitArray(num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = bit / 26 | 0;
      var wbit = bit % 26;
      w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
    }

    return w;
  } // Number of trailing zero bits


  BN.prototype.zeroBits = function zeroBits() {
    if (this.isZero()) return 0;
    var r = 0;

    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);

      r += b;
      if (b !== 26) break;
    }

    return r;
  };

  BN.prototype.byteLength = function byteLength() {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos(width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }

    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos(width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }

    return this.clone();
  };

  BN.prototype.isNeg = function isNeg() {
    return this.negative !== 0;
  }; // Return negative clone of `this`


  BN.prototype.neg = function neg() {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg() {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  }; // Or `num` with `this` in-place


  BN.prototype.iuor = function iuor(num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior(num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  }; // Or `num` with `this`


  BN.prototype.or = function or(num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor(num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  }; // And `num` with `this` in-place


  BN.prototype.iuand = function iuand(num) {
    // b = min-length(num, this)
    var b;

    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;
    return this.strip();
  };

  BN.prototype.iand = function iand(num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  }; // And `num` with `this`


  BN.prototype.and = function and(num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand(num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  }; // Xor `num` with `this` in-place


  BN.prototype.iuxor = function iuxor(num) {
    // a.length > b.length
    var a;
    var b;

    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;
    return this.strip();
  };

  BN.prototype.ixor = function ixor(num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  }; // Xor `num` with `this`


  BN.prototype.xor = function xor(num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor(num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  }; // Not ``this`` with ``width`` bitwidth


  BN.prototype.inotn = function inotn(width) {
    assert(typeof width === 'number' && width >= 0);
    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26; // Extend the buffer with leading zeroes

    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    } // Handle complete words


    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    } // Handle the residue


    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & 0x3ffffff >> 26 - bitsLeft;
    } // And remove leading zeroes


    return this.strip();
  };

  BN.prototype.notn = function notn(width) {
    return this.clone().inotn(width);
  }; // Set `bit` of `this`


  BN.prototype.setn = function setn(bit, val) {
    assert(typeof bit === 'number' && bit >= 0);
    var off = bit / 26 | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | 1 << wbit;
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  }; // Add `num` to `this` in-place


  BN.prototype.iadd = function iadd(num) {
    var r; // negative + positive

    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign(); // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    } // a.length > b.length


    var a, b;

    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;

    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;

    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++; // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  }; // Add `num` to `this`


  BN.prototype.add = function add(num) {
    var res;

    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);
    return num.clone().iadd(this);
  }; // Subtract `num` from `this` in-place


  BN.prototype.isub = function isub(num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign(); // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    } // At this point both numbers are positive


    var cmp = this.cmp(num); // Optimization - zeroify

    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    } // a > b


    var a, b;

    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;

    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    } // Copy rest of the words


    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  }; // Subtract `num` from `this`


  BN.prototype.sub = function sub(num) {
    return this.clone().isub(num);
  };

  function smallMulTo(self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = self.length + num.length | 0;
    out.length = len;
    len = len - 1 | 0; // Peel one iteration (compiler can't do it, because of code complexity)

    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;
    var lo = r & 0x3ffffff;
    var carry = r / 0x4000000 | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);

      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += r / 0x4000000 | 0;
        rword = r & 0x3ffffff;
      }

      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }

    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  } // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).


  var comb10MulTo = function comb10MulTo(self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;
    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */

    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = mid + Math.imul(ah0, bl0) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */

    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = mid + Math.imul(ah1, bl0) | 0;
    hi = Math.imul(ah1, bh0);
    lo = lo + Math.imul(al0, bl1) | 0;
    mid = mid + Math.imul(al0, bh1) | 0;
    mid = mid + Math.imul(ah0, bl1) | 0;
    hi = hi + Math.imul(ah0, bh1) | 0;
    var w1 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */

    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = mid + Math.imul(ah2, bl0) | 0;
    hi = Math.imul(ah2, bh0);
    lo = lo + Math.imul(al1, bl1) | 0;
    mid = mid + Math.imul(al1, bh1) | 0;
    mid = mid + Math.imul(ah1, bl1) | 0;
    hi = hi + Math.imul(ah1, bh1) | 0;
    lo = lo + Math.imul(al0, bl2) | 0;
    mid = mid + Math.imul(al0, bh2) | 0;
    mid = mid + Math.imul(ah0, bl2) | 0;
    hi = hi + Math.imul(ah0, bh2) | 0;
    var w2 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */

    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = mid + Math.imul(ah3, bl0) | 0;
    hi = Math.imul(ah3, bh0);
    lo = lo + Math.imul(al2, bl1) | 0;
    mid = mid + Math.imul(al2, bh1) | 0;
    mid = mid + Math.imul(ah2, bl1) | 0;
    hi = hi + Math.imul(ah2, bh1) | 0;
    lo = lo + Math.imul(al1, bl2) | 0;
    mid = mid + Math.imul(al1, bh2) | 0;
    mid = mid + Math.imul(ah1, bl2) | 0;
    hi = hi + Math.imul(ah1, bh2) | 0;
    lo = lo + Math.imul(al0, bl3) | 0;
    mid = mid + Math.imul(al0, bh3) | 0;
    mid = mid + Math.imul(ah0, bl3) | 0;
    hi = hi + Math.imul(ah0, bh3) | 0;
    var w3 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */

    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = mid + Math.imul(ah4, bl0) | 0;
    hi = Math.imul(ah4, bh0);
    lo = lo + Math.imul(al3, bl1) | 0;
    mid = mid + Math.imul(al3, bh1) | 0;
    mid = mid + Math.imul(ah3, bl1) | 0;
    hi = hi + Math.imul(ah3, bh1) | 0;
    lo = lo + Math.imul(al2, bl2) | 0;
    mid = mid + Math.imul(al2, bh2) | 0;
    mid = mid + Math.imul(ah2, bl2) | 0;
    hi = hi + Math.imul(ah2, bh2) | 0;
    lo = lo + Math.imul(al1, bl3) | 0;
    mid = mid + Math.imul(al1, bh3) | 0;
    mid = mid + Math.imul(ah1, bl3) | 0;
    hi = hi + Math.imul(ah1, bh3) | 0;
    lo = lo + Math.imul(al0, bl4) | 0;
    mid = mid + Math.imul(al0, bh4) | 0;
    mid = mid + Math.imul(ah0, bl4) | 0;
    hi = hi + Math.imul(ah0, bh4) | 0;
    var w4 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */

    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = mid + Math.imul(ah5, bl0) | 0;
    hi = Math.imul(ah5, bh0);
    lo = lo + Math.imul(al4, bl1) | 0;
    mid = mid + Math.imul(al4, bh1) | 0;
    mid = mid + Math.imul(ah4, bl1) | 0;
    hi = hi + Math.imul(ah4, bh1) | 0;
    lo = lo + Math.imul(al3, bl2) | 0;
    mid = mid + Math.imul(al3, bh2) | 0;
    mid = mid + Math.imul(ah3, bl2) | 0;
    hi = hi + Math.imul(ah3, bh2) | 0;
    lo = lo + Math.imul(al2, bl3) | 0;
    mid = mid + Math.imul(al2, bh3) | 0;
    mid = mid + Math.imul(ah2, bl3) | 0;
    hi = hi + Math.imul(ah2, bh3) | 0;
    lo = lo + Math.imul(al1, bl4) | 0;
    mid = mid + Math.imul(al1, bh4) | 0;
    mid = mid + Math.imul(ah1, bl4) | 0;
    hi = hi + Math.imul(ah1, bh4) | 0;
    lo = lo + Math.imul(al0, bl5) | 0;
    mid = mid + Math.imul(al0, bh5) | 0;
    mid = mid + Math.imul(ah0, bl5) | 0;
    hi = hi + Math.imul(ah0, bh5) | 0;
    var w5 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */

    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = mid + Math.imul(ah6, bl0) | 0;
    hi = Math.imul(ah6, bh0);
    lo = lo + Math.imul(al5, bl1) | 0;
    mid = mid + Math.imul(al5, bh1) | 0;
    mid = mid + Math.imul(ah5, bl1) | 0;
    hi = hi + Math.imul(ah5, bh1) | 0;
    lo = lo + Math.imul(al4, bl2) | 0;
    mid = mid + Math.imul(al4, bh2) | 0;
    mid = mid + Math.imul(ah4, bl2) | 0;
    hi = hi + Math.imul(ah4, bh2) | 0;
    lo = lo + Math.imul(al3, bl3) | 0;
    mid = mid + Math.imul(al3, bh3) | 0;
    mid = mid + Math.imul(ah3, bl3) | 0;
    hi = hi + Math.imul(ah3, bh3) | 0;
    lo = lo + Math.imul(al2, bl4) | 0;
    mid = mid + Math.imul(al2, bh4) | 0;
    mid = mid + Math.imul(ah2, bl4) | 0;
    hi = hi + Math.imul(ah2, bh4) | 0;
    lo = lo + Math.imul(al1, bl5) | 0;
    mid = mid + Math.imul(al1, bh5) | 0;
    mid = mid + Math.imul(ah1, bl5) | 0;
    hi = hi + Math.imul(ah1, bh5) | 0;
    lo = lo + Math.imul(al0, bl6) | 0;
    mid = mid + Math.imul(al0, bh6) | 0;
    mid = mid + Math.imul(ah0, bl6) | 0;
    hi = hi + Math.imul(ah0, bh6) | 0;
    var w6 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */

    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = mid + Math.imul(ah7, bl0) | 0;
    hi = Math.imul(ah7, bh0);
    lo = lo + Math.imul(al6, bl1) | 0;
    mid = mid + Math.imul(al6, bh1) | 0;
    mid = mid + Math.imul(ah6, bl1) | 0;
    hi = hi + Math.imul(ah6, bh1) | 0;
    lo = lo + Math.imul(al5, bl2) | 0;
    mid = mid + Math.imul(al5, bh2) | 0;
    mid = mid + Math.imul(ah5, bl2) | 0;
    hi = hi + Math.imul(ah5, bh2) | 0;
    lo = lo + Math.imul(al4, bl3) | 0;
    mid = mid + Math.imul(al4, bh3) | 0;
    mid = mid + Math.imul(ah4, bl3) | 0;
    hi = hi + Math.imul(ah4, bh3) | 0;
    lo = lo + Math.imul(al3, bl4) | 0;
    mid = mid + Math.imul(al3, bh4) | 0;
    mid = mid + Math.imul(ah3, bl4) | 0;
    hi = hi + Math.imul(ah3, bh4) | 0;
    lo = lo + Math.imul(al2, bl5) | 0;
    mid = mid + Math.imul(al2, bh5) | 0;
    mid = mid + Math.imul(ah2, bl5) | 0;
    hi = hi + Math.imul(ah2, bh5) | 0;
    lo = lo + Math.imul(al1, bl6) | 0;
    mid = mid + Math.imul(al1, bh6) | 0;
    mid = mid + Math.imul(ah1, bl6) | 0;
    hi = hi + Math.imul(ah1, bh6) | 0;
    lo = lo + Math.imul(al0, bl7) | 0;
    mid = mid + Math.imul(al0, bh7) | 0;
    mid = mid + Math.imul(ah0, bl7) | 0;
    hi = hi + Math.imul(ah0, bh7) | 0;
    var w7 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */

    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = mid + Math.imul(ah8, bl0) | 0;
    hi = Math.imul(ah8, bh0);
    lo = lo + Math.imul(al7, bl1) | 0;
    mid = mid + Math.imul(al7, bh1) | 0;
    mid = mid + Math.imul(ah7, bl1) | 0;
    hi = hi + Math.imul(ah7, bh1) | 0;
    lo = lo + Math.imul(al6, bl2) | 0;
    mid = mid + Math.imul(al6, bh2) | 0;
    mid = mid + Math.imul(ah6, bl2) | 0;
    hi = hi + Math.imul(ah6, bh2) | 0;
    lo = lo + Math.imul(al5, bl3) | 0;
    mid = mid + Math.imul(al5, bh3) | 0;
    mid = mid + Math.imul(ah5, bl3) | 0;
    hi = hi + Math.imul(ah5, bh3) | 0;
    lo = lo + Math.imul(al4, bl4) | 0;
    mid = mid + Math.imul(al4, bh4) | 0;
    mid = mid + Math.imul(ah4, bl4) | 0;
    hi = hi + Math.imul(ah4, bh4) | 0;
    lo = lo + Math.imul(al3, bl5) | 0;
    mid = mid + Math.imul(al3, bh5) | 0;
    mid = mid + Math.imul(ah3, bl5) | 0;
    hi = hi + Math.imul(ah3, bh5) | 0;
    lo = lo + Math.imul(al2, bl6) | 0;
    mid = mid + Math.imul(al2, bh6) | 0;
    mid = mid + Math.imul(ah2, bl6) | 0;
    hi = hi + Math.imul(ah2, bh6) | 0;
    lo = lo + Math.imul(al1, bl7) | 0;
    mid = mid + Math.imul(al1, bh7) | 0;
    mid = mid + Math.imul(ah1, bl7) | 0;
    hi = hi + Math.imul(ah1, bh7) | 0;
    lo = lo + Math.imul(al0, bl8) | 0;
    mid = mid + Math.imul(al0, bh8) | 0;
    mid = mid + Math.imul(ah0, bl8) | 0;
    hi = hi + Math.imul(ah0, bh8) | 0;
    var w8 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */

    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = mid + Math.imul(ah9, bl0) | 0;
    hi = Math.imul(ah9, bh0);
    lo = lo + Math.imul(al8, bl1) | 0;
    mid = mid + Math.imul(al8, bh1) | 0;
    mid = mid + Math.imul(ah8, bl1) | 0;
    hi = hi + Math.imul(ah8, bh1) | 0;
    lo = lo + Math.imul(al7, bl2) | 0;
    mid = mid + Math.imul(al7, bh2) | 0;
    mid = mid + Math.imul(ah7, bl2) | 0;
    hi = hi + Math.imul(ah7, bh2) | 0;
    lo = lo + Math.imul(al6, bl3) | 0;
    mid = mid + Math.imul(al6, bh3) | 0;
    mid = mid + Math.imul(ah6, bl3) | 0;
    hi = hi + Math.imul(ah6, bh3) | 0;
    lo = lo + Math.imul(al5, bl4) | 0;
    mid = mid + Math.imul(al5, bh4) | 0;
    mid = mid + Math.imul(ah5, bl4) | 0;
    hi = hi + Math.imul(ah5, bh4) | 0;
    lo = lo + Math.imul(al4, bl5) | 0;
    mid = mid + Math.imul(al4, bh5) | 0;
    mid = mid + Math.imul(ah4, bl5) | 0;
    hi = hi + Math.imul(ah4, bh5) | 0;
    lo = lo + Math.imul(al3, bl6) | 0;
    mid = mid + Math.imul(al3, bh6) | 0;
    mid = mid + Math.imul(ah3, bl6) | 0;
    hi = hi + Math.imul(ah3, bh6) | 0;
    lo = lo + Math.imul(al2, bl7) | 0;
    mid = mid + Math.imul(al2, bh7) | 0;
    mid = mid + Math.imul(ah2, bl7) | 0;
    hi = hi + Math.imul(ah2, bh7) | 0;
    lo = lo + Math.imul(al1, bl8) | 0;
    mid = mid + Math.imul(al1, bh8) | 0;
    mid = mid + Math.imul(ah1, bl8) | 0;
    hi = hi + Math.imul(ah1, bh8) | 0;
    lo = lo + Math.imul(al0, bl9) | 0;
    mid = mid + Math.imul(al0, bh9) | 0;
    mid = mid + Math.imul(ah0, bl9) | 0;
    hi = hi + Math.imul(ah0, bh9) | 0;
    var w9 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */

    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = mid + Math.imul(ah9, bl1) | 0;
    hi = Math.imul(ah9, bh1);
    lo = lo + Math.imul(al8, bl2) | 0;
    mid = mid + Math.imul(al8, bh2) | 0;
    mid = mid + Math.imul(ah8, bl2) | 0;
    hi = hi + Math.imul(ah8, bh2) | 0;
    lo = lo + Math.imul(al7, bl3) | 0;
    mid = mid + Math.imul(al7, bh3) | 0;
    mid = mid + Math.imul(ah7, bl3) | 0;
    hi = hi + Math.imul(ah7, bh3) | 0;
    lo = lo + Math.imul(al6, bl4) | 0;
    mid = mid + Math.imul(al6, bh4) | 0;
    mid = mid + Math.imul(ah6, bl4) | 0;
    hi = hi + Math.imul(ah6, bh4) | 0;
    lo = lo + Math.imul(al5, bl5) | 0;
    mid = mid + Math.imul(al5, bh5) | 0;
    mid = mid + Math.imul(ah5, bl5) | 0;
    hi = hi + Math.imul(ah5, bh5) | 0;
    lo = lo + Math.imul(al4, bl6) | 0;
    mid = mid + Math.imul(al4, bh6) | 0;
    mid = mid + Math.imul(ah4, bl6) | 0;
    hi = hi + Math.imul(ah4, bh6) | 0;
    lo = lo + Math.imul(al3, bl7) | 0;
    mid = mid + Math.imul(al3, bh7) | 0;
    mid = mid + Math.imul(ah3, bl7) | 0;
    hi = hi + Math.imul(ah3, bh7) | 0;
    lo = lo + Math.imul(al2, bl8) | 0;
    mid = mid + Math.imul(al2, bh8) | 0;
    mid = mid + Math.imul(ah2, bl8) | 0;
    hi = hi + Math.imul(ah2, bh8) | 0;
    lo = lo + Math.imul(al1, bl9) | 0;
    mid = mid + Math.imul(al1, bh9) | 0;
    mid = mid + Math.imul(ah1, bl9) | 0;
    hi = hi + Math.imul(ah1, bh9) | 0;
    var w10 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */

    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = mid + Math.imul(ah9, bl2) | 0;
    hi = Math.imul(ah9, bh2);
    lo = lo + Math.imul(al8, bl3) | 0;
    mid = mid + Math.imul(al8, bh3) | 0;
    mid = mid + Math.imul(ah8, bl3) | 0;
    hi = hi + Math.imul(ah8, bh3) | 0;
    lo = lo + Math.imul(al7, bl4) | 0;
    mid = mid + Math.imul(al7, bh4) | 0;
    mid = mid + Math.imul(ah7, bl4) | 0;
    hi = hi + Math.imul(ah7, bh4) | 0;
    lo = lo + Math.imul(al6, bl5) | 0;
    mid = mid + Math.imul(al6, bh5) | 0;
    mid = mid + Math.imul(ah6, bl5) | 0;
    hi = hi + Math.imul(ah6, bh5) | 0;
    lo = lo + Math.imul(al5, bl6) | 0;
    mid = mid + Math.imul(al5, bh6) | 0;
    mid = mid + Math.imul(ah5, bl6) | 0;
    hi = hi + Math.imul(ah5, bh6) | 0;
    lo = lo + Math.imul(al4, bl7) | 0;
    mid = mid + Math.imul(al4, bh7) | 0;
    mid = mid + Math.imul(ah4, bl7) | 0;
    hi = hi + Math.imul(ah4, bh7) | 0;
    lo = lo + Math.imul(al3, bl8) | 0;
    mid = mid + Math.imul(al3, bh8) | 0;
    mid = mid + Math.imul(ah3, bl8) | 0;
    hi = hi + Math.imul(ah3, bh8) | 0;
    lo = lo + Math.imul(al2, bl9) | 0;
    mid = mid + Math.imul(al2, bh9) | 0;
    mid = mid + Math.imul(ah2, bl9) | 0;
    hi = hi + Math.imul(ah2, bh9) | 0;
    var w11 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */

    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = mid + Math.imul(ah9, bl3) | 0;
    hi = Math.imul(ah9, bh3);
    lo = lo + Math.imul(al8, bl4) | 0;
    mid = mid + Math.imul(al8, bh4) | 0;
    mid = mid + Math.imul(ah8, bl4) | 0;
    hi = hi + Math.imul(ah8, bh4) | 0;
    lo = lo + Math.imul(al7, bl5) | 0;
    mid = mid + Math.imul(al7, bh5) | 0;
    mid = mid + Math.imul(ah7, bl5) | 0;
    hi = hi + Math.imul(ah7, bh5) | 0;
    lo = lo + Math.imul(al6, bl6) | 0;
    mid = mid + Math.imul(al6, bh6) | 0;
    mid = mid + Math.imul(ah6, bl6) | 0;
    hi = hi + Math.imul(ah6, bh6) | 0;
    lo = lo + Math.imul(al5, bl7) | 0;
    mid = mid + Math.imul(al5, bh7) | 0;
    mid = mid + Math.imul(ah5, bl7) | 0;
    hi = hi + Math.imul(ah5, bh7) | 0;
    lo = lo + Math.imul(al4, bl8) | 0;
    mid = mid + Math.imul(al4, bh8) | 0;
    mid = mid + Math.imul(ah4, bl8) | 0;
    hi = hi + Math.imul(ah4, bh8) | 0;
    lo = lo + Math.imul(al3, bl9) | 0;
    mid = mid + Math.imul(al3, bh9) | 0;
    mid = mid + Math.imul(ah3, bl9) | 0;
    hi = hi + Math.imul(ah3, bh9) | 0;
    var w12 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */

    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = mid + Math.imul(ah9, bl4) | 0;
    hi = Math.imul(ah9, bh4);
    lo = lo + Math.imul(al8, bl5) | 0;
    mid = mid + Math.imul(al8, bh5) | 0;
    mid = mid + Math.imul(ah8, bl5) | 0;
    hi = hi + Math.imul(ah8, bh5) | 0;
    lo = lo + Math.imul(al7, bl6) | 0;
    mid = mid + Math.imul(al7, bh6) | 0;
    mid = mid + Math.imul(ah7, bl6) | 0;
    hi = hi + Math.imul(ah7, bh6) | 0;
    lo = lo + Math.imul(al6, bl7) | 0;
    mid = mid + Math.imul(al6, bh7) | 0;
    mid = mid + Math.imul(ah6, bl7) | 0;
    hi = hi + Math.imul(ah6, bh7) | 0;
    lo = lo + Math.imul(al5, bl8) | 0;
    mid = mid + Math.imul(al5, bh8) | 0;
    mid = mid + Math.imul(ah5, bl8) | 0;
    hi = hi + Math.imul(ah5, bh8) | 0;
    lo = lo + Math.imul(al4, bl9) | 0;
    mid = mid + Math.imul(al4, bh9) | 0;
    mid = mid + Math.imul(ah4, bl9) | 0;
    hi = hi + Math.imul(ah4, bh9) | 0;
    var w13 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */

    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = mid + Math.imul(ah9, bl5) | 0;
    hi = Math.imul(ah9, bh5);
    lo = lo + Math.imul(al8, bl6) | 0;
    mid = mid + Math.imul(al8, bh6) | 0;
    mid = mid + Math.imul(ah8, bl6) | 0;
    hi = hi + Math.imul(ah8, bh6) | 0;
    lo = lo + Math.imul(al7, bl7) | 0;
    mid = mid + Math.imul(al7, bh7) | 0;
    mid = mid + Math.imul(ah7, bl7) | 0;
    hi = hi + Math.imul(ah7, bh7) | 0;
    lo = lo + Math.imul(al6, bl8) | 0;
    mid = mid + Math.imul(al6, bh8) | 0;
    mid = mid + Math.imul(ah6, bl8) | 0;
    hi = hi + Math.imul(ah6, bh8) | 0;
    lo = lo + Math.imul(al5, bl9) | 0;
    mid = mid + Math.imul(al5, bh9) | 0;
    mid = mid + Math.imul(ah5, bl9) | 0;
    hi = hi + Math.imul(ah5, bh9) | 0;
    var w14 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */

    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = mid + Math.imul(ah9, bl6) | 0;
    hi = Math.imul(ah9, bh6);
    lo = lo + Math.imul(al8, bl7) | 0;
    mid = mid + Math.imul(al8, bh7) | 0;
    mid = mid + Math.imul(ah8, bl7) | 0;
    hi = hi + Math.imul(ah8, bh7) | 0;
    lo = lo + Math.imul(al7, bl8) | 0;
    mid = mid + Math.imul(al7, bh8) | 0;
    mid = mid + Math.imul(ah7, bl8) | 0;
    hi = hi + Math.imul(ah7, bh8) | 0;
    lo = lo + Math.imul(al6, bl9) | 0;
    mid = mid + Math.imul(al6, bh9) | 0;
    mid = mid + Math.imul(ah6, bl9) | 0;
    hi = hi + Math.imul(ah6, bh9) | 0;
    var w15 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */

    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = mid + Math.imul(ah9, bl7) | 0;
    hi = Math.imul(ah9, bh7);
    lo = lo + Math.imul(al8, bl8) | 0;
    mid = mid + Math.imul(al8, bh8) | 0;
    mid = mid + Math.imul(ah8, bl8) | 0;
    hi = hi + Math.imul(ah8, bh8) | 0;
    lo = lo + Math.imul(al7, bl9) | 0;
    mid = mid + Math.imul(al7, bh9) | 0;
    mid = mid + Math.imul(ah7, bl9) | 0;
    hi = hi + Math.imul(ah7, bh9) | 0;
    var w16 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */

    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = mid + Math.imul(ah9, bl8) | 0;
    hi = Math.imul(ah9, bh8);
    lo = lo + Math.imul(al8, bl9) | 0;
    mid = mid + Math.imul(al8, bh9) | 0;
    mid = mid + Math.imul(ah8, bl9) | 0;
    hi = hi + Math.imul(ah8, bh9) | 0;
    var w17 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */

    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = mid + Math.imul(ah9, bl9) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;

    if (c !== 0) {
      o[19] = c;
      out.length++;
    }

    return out;
  }; // Polyfill comb


  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo(self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;
    var carry = 0;
    var hncarry = 0;

    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);

      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;
        var lo = r & 0x3ffffff;
        ncarry = ncarry + (r / 0x4000000 | 0) | 0;
        lo = lo + rword | 0;
        rword = lo & 0x3ffffff;
        ncarry = ncarry + (lo >>> 26) | 0;
        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }

      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }

    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo(self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo(num, out) {
    var res;
    var len = this.length + num.length;

    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  }; // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion


  function FFTM(x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT(N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;

    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  }; // Returns binary-reversed representation of `x`


  FFTM.prototype.revBin = function revBin(x, l, N) {
    if (x === 0 || x === N - 1) return x;
    var rb = 0;

    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << l - i - 1;
      x >>= 1;
    }

    return rb;
  }; // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm


  FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;
      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];
          var ro = rtws[p + j + s];
          var io = itws[p + j + s];
          var rx = rtwdf_ * ro - itwdf_ * io;
          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;
          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;
          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;
          /* jshint maxdepth : false */

          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;
            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;

    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];
      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;
      t = iws[i];
      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b(ws, N) {
    var carry = 0;

    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 + Math.round(ws[2 * i] / N) + carry;
      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
    var carry = 0;

    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);
      rws[2 * i] = carry & 0x1fff;
      carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff;
      carry = carry >>> 13;
    } // Pad with zeroes


    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub(N) {
    var ph = new Array(N);

    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp(x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);
    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);
    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);
    var rmws = out.words;
    rmws.length = N;
    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);
    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);
    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  }; // Multiply `this` by `num`


  BN.prototype.mul = function mul(num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  }; // Multiply employing FFT


  BN.prototype.mulf = function mulf(num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  }; // In-place Multiplication


  BN.prototype.imul = function imul(num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln(num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000); // Carry

    var carry = 0;

    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += w / 0x4000000 | 0; // NOTE: lo is 27bit maximum

      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln(num) {
    return this.clone().imuln(num);
  }; // `this` * `this`


  BN.prototype.sqr = function sqr() {
    return this.mul(this);
  }; // `this` * `this` in-place


  BN.prototype.isqr = function isqr() {
    return this.imul(this.clone());
  }; // Math.pow(`this`, `num`)


  BN.prototype.pow = function pow(num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1); // Skip leading zeroes

    var res = this;

    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;
        res = res.mul(q);
      }
    }

    return res;
  }; // Shift-left in-place


  BN.prototype.iushln = function iushln(bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = 0x3ffffff >>> 26 - r << 26 - r;
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = (this.words[i] | 0) - newCarry << r;
        this.words[i] = c | carry;
        carry = newCarry >>> 26 - r;
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln(bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  }; // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits


  BN.prototype.iushrn = function iushrn(bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;

    if (hint) {
      h = (hint - hint % 26) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ 0x3ffffff >>> r << r;
    var maskedWords = extended;
    h -= s;
    h = Math.max(0, h); // Extended mode, copy masked part

    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }

      maskedWords.length = s;
    }

    if (s === 0) {// No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;

      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;

    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = carry << 26 - r | word >>> r;
      carry = word & mask;
    } // Push carried bits as a mask


    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn(bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  }; // Shift-left


  BN.prototype.shln = function shln(bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln(bits) {
    return this.clone().iushln(bits);
  }; // Shift-right


  BN.prototype.shrn = function shrn(bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn(bits) {
    return this.clone().iushrn(bits);
  }; // Test if n bit is set


  BN.prototype.testn = function testn(bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r; // Fast case: bit is much higher than all existing words

    if (this.length <= s) return false; // Check bit and return

    var w = this.words[s];
    return !!(w & q);
  }; // Return only lowers bits of number (in-place)


  BN.prototype.imaskn = function imaskn(bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }

    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ 0x3ffffff >>> r << r;
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  }; // Return only lowers bits of number


  BN.prototype.maskn = function maskn(bits) {
    return this.clone().imaskn(bits);
  }; // Add plain number `num` to `this`


  BN.prototype.iaddn = function iaddn(num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num); // Possible sign change

    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    } // Add without checks


    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn(num) {
    this.words[0] += num; // Carry

    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;

      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }

    this.length = Math.max(this.length, i + 1);
    return this;
  }; // Subtract plain number `num` from `this`


  BN.prototype.isubn = function isubn(num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn(num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn(num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs() {
    this.negative = 0;
    return this;
  };

  BN.prototype.abs = function abs() {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;

    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - (right / 0x4000000 | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }

    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip(); // Subtraction overflow

    assert(carry === -1);
    carry = 0;

    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }

    this.negative = 1;
    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv(num, mode) {
    var shift = this.length - num.length;
    var a = this.clone();
    var b = num; // Normalize

    var bhi = b.words[b.length - 1] | 0;

    var bhiBits = this._countBits(bhi);

    shift = 26 - bhiBits;

    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    } // Initialize quotient


    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);

      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);

    if (diff.negative === 0) {
      a = diff;

      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 + (a.words[b.length + j - 1] | 0); // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)

      qj = Math.min(qj / bhi | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);

      while (a.negative !== 0) {
        qj--;
        a.negative = 0;

        a._ishlnsubmul(b, 1, j);

        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }

      if (q) {
        q.words[j] = qj;
      }
    }

    if (q) {
      q.strip();
    }

    a.strip(); // Denormalize

    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  }; // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested


  BN.prototype.divmod = function divmod(num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;

    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();

        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();

        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    } // Both numbers are positive at this point
    // Strip both numbers to approximate shift value


    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    } // Very short reduction


    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  }; // Find `this` / `num`


  BN.prototype.div = function div(num) {
    return this.divmod(num, 'div', false).div;
  }; // Find `this` % `num`


  BN.prototype.mod = function mod(num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod(num) {
    return this.divmod(num, 'mod', true).mod;
  }; // Find Round(`this` / `num`)


  BN.prototype.divRound = function divRound(num) {
    var dm = this.divmod(num); // Fast case - exact division

    if (dm.mod.isZero()) return dm.div;
    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half); // Round down

    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div; // Round up

    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn(num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;
    var acc = 0;

    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  }; // In-place division by number


  BN.prototype.idivn = function idivn(num) {
    assert(num <= 0x3ffffff);
    var carry = 0;

    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = w / num | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn(num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd(p) {
    assert(p.negative === 0);
    assert(!p.isZero());
    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    } // A * x + B * y = x


    var A = new BN(1);
    var B = new BN(0); // C * x + D * y = y

    var C = new BN(0);
    var D = new BN(1);
    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);

      if (i > 0) {
        x.iushrn(i);

        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);

      if (j > 0) {
        y.iushrn(j);

        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  }; // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed


  BN.prototype._invmp = function _invmp(p) {
    assert(p.negative === 0);
    assert(!p.isZero());
    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);
    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);

      if (i > 0) {
        a.iushrn(i);

        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);

      if (j > 0) {
        b.iushrn(j);

        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;

    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd(num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();
    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0; // Remove common factor of two

    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }

      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);

      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  }; // Invert number in the field F(num)


  BN.prototype.invm = function invm(num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven() {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd() {
    return (this.words[0] & 1) === 1;
  }; // And first word and num


  BN.prototype.andln = function andln(num) {
    return this.words[0] & num;
  }; // Increment at the bit position in-line


  BN.prototype.bincn = function bincn(bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r; // Fast case: bit is much higher than all existing words

    if (this.length <= s) {
      this._expand(s + 1);

      this.words[s] |= q;
      return this;
    } // Add bit and propagate, if needed


    var carry = q;

    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.isZero = function isZero() {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn(num) {
    var negative = num < 0;
    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;
    this.strip();
    var res;

    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');
      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }

    if (this.negative !== 0) return -res | 0;
    return res;
  }; // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`


  BN.prototype.cmp = function cmp(num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;
    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  }; // Unsigned comparison


  BN.prototype.ucmp = function ucmp(num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;
    var res = 0;

    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;
      if (a === b) continue;

      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }

      break;
    }

    return res;
  };

  BN.prototype.gtn = function gtn(num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt(num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten(num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte(num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn(num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt(num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten(num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte(num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn(num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq(num) {
    return this.cmp(num) === 0;
  }; //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //


  BN.red = function red(num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed(ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed() {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed(ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed(ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd(num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd(num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub(num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub(num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl(num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul(num) {
    assert(this.red, 'redMul works only with red numbers');

    this.red._verify2(this, num);

    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul(num) {
    assert(this.red, 'redMul works only with red numbers');

    this.red._verify2(this, num);

    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr() {
    assert(this.red, 'redSqr works only with red numbers');

    this.red._verify1(this);

    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr() {
    assert(this.red, 'redISqr works only with red numbers');

    this.red._verify1(this);

    return this.red.isqr(this);
  }; // Square root over p


  BN.prototype.redSqrt = function redSqrt() {
    assert(this.red, 'redSqrt works only with red numbers');

    this.red._verify1(this);

    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm() {
    assert(this.red, 'redInvm works only with red numbers');

    this.red._verify1(this);

    return this.red.invm(this);
  }; // Return negative clone of `this` % `red modulo`


  BN.prototype.redNeg = function redNeg() {
    assert(this.red, 'redNeg works only with red numbers');

    this.red._verify1(this);

    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow(num) {
    assert(this.red && !num.red, 'redPow(normalNum)');

    this.red._verify1(this);

    return this.red.pow(this, num);
  }; // Prime numbers with efficient reduction


  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  }; // Pseudo-Mersenne prime

  function MPrime(name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);
    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp() {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce(num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);

    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      r.strip();
    }

    return r;
  };

  MPrime.prototype.split = function split(input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK(num) {
    return num.imul(this.k);
  };

  function K256() {
    MPrime.call(this, 'k256', 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }

  inherits(K256, MPrime);

  K256.prototype.split = function split(input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;
    var outLen = Math.min(input.length, 9);

    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }

    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    } // Shift by 9 limbs


    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
      prev = next;
    }

    prev >>>= 22;
    input.words[i - 10] = prev;

    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK(num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2; // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390

    var lo = 0;

    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + (lo / 0x4000000 | 0);
    } // Fast length reduction


    if (num.words[num.length - 1] === 0) {
      num.length--;

      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }

    return num;
  };

  function P224() {
    MPrime.call(this, 'p224', 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }

  inherits(P224, MPrime);

  function P192() {
    MPrime.call(this, 'p192', 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }

  inherits(P192, MPrime);

  function P25519() {
    // 2 ^ 255 - 19
    MPrime.call(this, '25519', '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }

  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK(num) {
    // K = 0x13
    var carry = 0;

    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;
      num.words[i] = lo;
      carry = hi;
    }

    if (carry !== 0) {
      num.words[num.length++] = carry;
    }

    return num;
  }; // Exported mostly for testing purposes, use plain name instead


  BN._prime = function prime(name) {
    // Cached version of prime
    if (primes[name]) return primes[name];
    var prime;

    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }

    primes[name] = prime;
    return prime;
  }; //
  // Base reduction engine
  //


  function Red(m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);

      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1(a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2(a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red, 'red works only with red numbers');
  };

  Red.prototype.imod = function imod(a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg(a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add(a, b) {
    this._verify2(a, b);

    var res = a.add(b);

    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }

    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd(a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);

    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }

    return res;
  };

  Red.prototype.sub = function sub(a, b) {
    this._verify2(a, b);

    var res = a.sub(b);

    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Red.prototype.isub = function isub(a, b) {
    this._verify2(a, b);

    var res = a.isub(b);

    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }

    return res;
  };

  Red.prototype.shl = function shl(a, num) {
    this._verify1(a);

    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul(a, b) {
    this._verify2(a, b);

    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul(a, b) {
    this._verify2(a, b);

    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr(a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr(a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt(a) {
    if (a.isZero()) return a.clone();
    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1); // Fast case

    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    } // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)


    var q = this.m.subn(1);
    var s = 0;

    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }

    assert(!q.isZero());
    var one = new BN(1).toRed(this);
    var nOne = one.redNeg(); // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.

    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;

    while (t.cmp(one) !== 0) {
      var tmp = t;

      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }

      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));
      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm(a) {
    var inv = a._invmp(this.m);

    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow(a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();
    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;

    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;

    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];

      for (var j = start - 1; j >= 0; j--) {
        var bit = word >> j & 1;

        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }

      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo(num) {
    var r = num.umod(this.m);
    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom(num) {
    var res = num.clone();
    res.red = null;
    return res;
  }; //
  // Montgomery method engine
  //


  BN.mont = function mont(num) {
    return new Mont(num);
  };

  function Mont(m) {
    Red.call(this, m);
    this.shift = this.m.bitLength();

    if (this.shift % 26 !== 0) {
      this.shift += 26 - this.shift % 26;
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);
    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }

  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo(num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom(num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul(a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul(a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);
    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm(a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})( false || module, this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/@walletconnect/utils/node_modules/js-sha3/src/sha3.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/node_modules/js-sha3/src/sha3.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */

/*jslint bitwise: true */
(function () {
  'use strict';

  var INPUT_ERROR = 'input is invalid type';
  var FINALIZE_ERROR = 'finalize already called';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};

  if (root.JS_SHA3_NO_WINDOW) {
    WINDOW = false;
  }

  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;

  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }

  var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js");
  var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
  var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
  var KECCAK_PADDING = [1, 256, 65536, 16777216];
  var PADDING = [6, 1536, 393216, 100663296];
  var SHIFT = [0, 8, 16, 24];
  var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
  var BITS = [224, 256, 384, 512];
  var SHAKE_BITS = [128, 256];
  var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'];
  var CSHAKE_BYTEPAD = {
    '128': 168,
    '256': 136
  };

  if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function (bits, padding, outputType) {
    return function (message) {
      return new Keccak(bits, padding, bits).update(message)[outputType]();
    };
  };

  var createShakeOutputMethod = function (bits, padding, outputType) {
    return function (message, outputBits) {
      return new Keccak(bits, padding, outputBits).update(message)[outputType]();
    };
  };

  var createCshakeOutputMethod = function (bits, padding, outputType) {
    return function (message, outputBits, n, s) {
      return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
    };
  };

  var createKmacOutputMethod = function (bits, padding, outputType) {
    return function (key, message, outputBits, s) {
      return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
    };
  };

  var createOutputMethods = function (method, createMethod, bits, padding) {
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createMethod(bits, padding, type);
    }

    return method;
  };

  var createMethod = function (bits, padding) {
    var method = createOutputMethod(bits, padding, 'hex');

    method.create = function () {
      return new Keccak(bits, padding, bits);
    };

    method.update = function (message) {
      return method.create().update(message);
    };

    return createOutputMethods(method, createOutputMethod, bits, padding);
  };

  var createShakeMethod = function (bits, padding) {
    var method = createShakeOutputMethod(bits, padding, 'hex');

    method.create = function (outputBits) {
      return new Keccak(bits, padding, outputBits);
    };

    method.update = function (message, outputBits) {
      return method.create(outputBits).update(message);
    };

    return createOutputMethods(method, createShakeOutputMethod, bits, padding);
  };

  var createCshakeMethod = function (bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createCshakeOutputMethod(bits, padding, 'hex');

    method.create = function (outputBits, n, s) {
      if (!n && !s) {
        return methods['shake' + bits].create(outputBits);
      } else {
        return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
      }
    };

    method.update = function (message, outputBits, n, s) {
      return method.create(outputBits, n, s).update(message);
    };

    return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
  };

  var createKmacMethod = function (bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createKmacOutputMethod(bits, padding, 'hex');

    method.create = function (key, outputBits, s) {
      return new Kmac(bits, padding, outputBits).bytepad(['KMAC', s], w).bytepad([key], w);
    };

    method.update = function (key, message, outputBits, s) {
      return method.create(key, outputBits, s).update(message);
    };

    return createOutputMethods(method, createKmacOutputMethod, bits, padding);
  };

  var algorithms = [{
    name: 'keccak',
    padding: KECCAK_PADDING,
    bits: BITS,
    createMethod: createMethod
  }, {
    name: 'sha3',
    padding: PADDING,
    bits: BITS,
    createMethod: createMethod
  }, {
    name: 'shake',
    padding: SHAKE_PADDING,
    bits: SHAKE_BITS,
    createMethod: createShakeMethod
  }, {
    name: 'cshake',
    padding: CSHAKE_PADDING,
    bits: SHAKE_BITS,
    createMethod: createCshakeMethod
  }, {
    name: 'kmac',
    padding: CSHAKE_PADDING,
    bits: SHAKE_BITS,
    createMethod: createKmacMethod
  }];
  var methods = {},
      methodNames = [];

  for (var i = 0; i < algorithms.length; ++i) {
    var algorithm = algorithms[i];
    var bits = algorithm.bits;

    for (var j = 0; j < bits.length; ++j) {
      var methodName = algorithm.name + '_' + bits[j];
      methodNames.push(methodName);
      methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);

      if (algorithm.name !== 'sha3') {
        var newMethodName = algorithm.name + bits[j];
        methodNames.push(newMethodName);
        methods[newMethodName] = methods[methodName];
      }
    }
  }

  function Keccak(bits, padding, outputBits) {
    this.blocks = [];
    this.s = [];
    this.padding = padding;
    this.outputBits = outputBits;
    this.reset = true;
    this.finalized = false;
    this.block = 0;
    this.start = 0;
    this.blockCount = 1600 - (bits << 1) >> 5;
    this.byteCount = this.blockCount << 2;
    this.outputBlocks = outputBits >> 5;
    this.extraBytes = (outputBits & 31) >> 3;

    for (var i = 0; i < 50; ++i) {
      this.s[i] = 0;
    }
  }

  Keccak.prototype.update = function (message) {
    if (this.finalized) {
      throw new Error(FINALIZE_ERROR);
    }

    var notString,
        type = typeof message;

    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw new Error(INPUT_ERROR);
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw new Error(INPUT_ERROR);
          }
        }
      } else {
        throw new Error(INPUT_ERROR);
      }

      notString = true;
    }

    var blocks = this.blocks,
        byteCount = this.byteCount,
        length = message.length,
        blockCount = this.blockCount,
        index = 0,
        s = this.s,
        i,
        code;

    while (index < length) {
      if (this.reset) {
        this.reset = false;
        blocks[0] = this.block;

        for (i = 1; i < blockCount + 1; ++i) {
          blocks[i] = 0;
        }
      }

      if (notString) {
        for (i = this.start; index < length && i < byteCount; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < byteCount; ++index) {
          code = message.charCodeAt(index);

          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
            blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;

      if (i >= byteCount) {
        this.start = i - byteCount;
        this.block = blocks[blockCount];

        for (i = 0; i < blockCount; ++i) {
          s[i] ^= blocks[i];
        }

        f(s);
        this.reset = true;
      } else {
        this.start = i;
      }
    }

    return this;
  };

  Keccak.prototype.encode = function (x, right) {
    var o = x & 255,
        n = 1;
    var bytes = [o];
    x = x >> 8;
    o = x & 255;

    while (o > 0) {
      bytes.unshift(o);
      x = x >> 8;
      o = x & 255;
      ++n;
    }

    if (right) {
      bytes.push(n);
    } else {
      bytes.unshift(n);
    }

    this.update(bytes);
    return bytes.length;
  };

  Keccak.prototype.encodeString = function (str) {
    var notString,
        type = typeof str;

    if (type !== 'string') {
      if (type === 'object') {
        if (str === null) {
          throw new Error(INPUT_ERROR);
        } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
          str = new Uint8Array(str);
        } else if (!Array.isArray(str)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
            throw new Error(INPUT_ERROR);
          }
        }
      } else {
        throw new Error(INPUT_ERROR);
      }

      notString = true;
    }

    var bytes = 0,
        length = str.length;

    if (notString) {
      bytes = length;
    } else {
      for (var i = 0; i < str.length; ++i) {
        var code = str.charCodeAt(i);

        if (code < 0x80) {
          bytes += 1;
        } else if (code < 0x800) {
          bytes += 2;
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes += 3;
        } else {
          code = 0x10000 + ((code & 0x3ff) << 10 | str.charCodeAt(++i) & 0x3ff);
          bytes += 4;
        }
      }
    }

    bytes += this.encode(bytes * 8);
    this.update(str);
    return bytes;
  };

  Keccak.prototype.bytepad = function (strs, w) {
    var bytes = this.encode(w);

    for (var i = 0; i < strs.length; ++i) {
      bytes += this.encodeString(strs[i]);
    }

    var paddingBytes = w - bytes % w;
    var zeros = [];
    zeros.length = paddingBytes;
    this.update(zeros);
    return this;
  };

  Keccak.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }

    this.finalized = true;
    var blocks = this.blocks,
        i = this.lastByteIndex,
        blockCount = this.blockCount,
        s = this.s;
    blocks[i >> 2] |= this.padding[i & 3];

    if (this.lastByteIndex === this.byteCount) {
      blocks[0] = blocks[blockCount];

      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0;
      }
    }

    blocks[blockCount - 1] |= 0x80000000;

    for (i = 0; i < blockCount; ++i) {
      s[i] ^= blocks[i];
    }

    f(s);
  };

  Keccak.prototype.toString = Keccak.prototype.hex = function () {
    this.finalize();
    var blockCount = this.blockCount,
        s = this.s,
        outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes,
        i = 0,
        j = 0;
    var hex = '',
        block;

    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        block = s[i];
        hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F] + HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F] + HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F] + HEX_CHARS[block >> 28 & 0x0F] + HEX_CHARS[block >> 24 & 0x0F];
      }

      if (j % blockCount === 0) {
        f(s);
        i = 0;
      }
    }

    if (extraBytes) {
      block = s[i];
      hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F];

      if (extraBytes > 1) {
        hex += HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F];
      }

      if (extraBytes > 2) {
        hex += HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F];
      }
    }

    return hex;
  };

  Keccak.prototype.arrayBuffer = function () {
    this.finalize();
    var blockCount = this.blockCount,
        s = this.s,
        outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes,
        i = 0,
        j = 0;
    var bytes = this.outputBits >> 3;
    var buffer;

    if (extraBytes) {
      buffer = new ArrayBuffer(outputBlocks + 1 << 2);
    } else {
      buffer = new ArrayBuffer(bytes);
    }

    var array = new Uint32Array(buffer);

    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        array[j] = s[i];
      }

      if (j % blockCount === 0) {
        f(s);
      }
    }

    if (extraBytes) {
      array[i] = s[i];
      buffer = buffer.slice(0, bytes);
    }

    return buffer;
  };

  Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

  Keccak.prototype.digest = Keccak.prototype.array = function () {
    this.finalize();
    var blockCount = this.blockCount,
        s = this.s,
        outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes,
        i = 0,
        j = 0;
    var array = [],
        offset,
        block;

    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        offset = j << 2;
        block = s[i];
        array[offset] = block & 0xFF;
        array[offset + 1] = block >> 8 & 0xFF;
        array[offset + 2] = block >> 16 & 0xFF;
        array[offset + 3] = block >> 24 & 0xFF;
      }

      if (j % blockCount === 0) {
        f(s);
      }
    }

    if (extraBytes) {
      offset = j << 2;
      block = s[i];
      array[offset] = block & 0xFF;

      if (extraBytes > 1) {
        array[offset + 1] = block >> 8 & 0xFF;
      }

      if (extraBytes > 2) {
        array[offset + 2] = block >> 16 & 0xFF;
      }
    }

    return array;
  };

  function Kmac(bits, padding, outputBits) {
    Keccak.call(this, bits, padding, outputBits);
  }

  Kmac.prototype = new Keccak();

  Kmac.prototype.finalize = function () {
    this.encode(this.outputBits, true);
    return Keccak.prototype.finalize.call(this);
  };

  var f = function (s) {
    var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;

    for (n = 0; n < 48; n += 2) {
      c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
      c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
      c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
      c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
      c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
      c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
      c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
      c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
      c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
      c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
      h = c8 ^ (c2 << 1 | c3 >>> 31);
      l = c9 ^ (c3 << 1 | c2 >>> 31);
      s[0] ^= h;
      s[1] ^= l;
      s[10] ^= h;
      s[11] ^= l;
      s[20] ^= h;
      s[21] ^= l;
      s[30] ^= h;
      s[31] ^= l;
      s[40] ^= h;
      s[41] ^= l;
      h = c0 ^ (c4 << 1 | c5 >>> 31);
      l = c1 ^ (c5 << 1 | c4 >>> 31);
      s[2] ^= h;
      s[3] ^= l;
      s[12] ^= h;
      s[13] ^= l;
      s[22] ^= h;
      s[23] ^= l;
      s[32] ^= h;
      s[33] ^= l;
      s[42] ^= h;
      s[43] ^= l;
      h = c2 ^ (c6 << 1 | c7 >>> 31);
      l = c3 ^ (c7 << 1 | c6 >>> 31);
      s[4] ^= h;
      s[5] ^= l;
      s[14] ^= h;
      s[15] ^= l;
      s[24] ^= h;
      s[25] ^= l;
      s[34] ^= h;
      s[35] ^= l;
      s[44] ^= h;
      s[45] ^= l;
      h = c4 ^ (c8 << 1 | c9 >>> 31);
      l = c5 ^ (c9 << 1 | c8 >>> 31);
      s[6] ^= h;
      s[7] ^= l;
      s[16] ^= h;
      s[17] ^= l;
      s[26] ^= h;
      s[27] ^= l;
      s[36] ^= h;
      s[37] ^= l;
      s[46] ^= h;
      s[47] ^= l;
      h = c6 ^ (c0 << 1 | c1 >>> 31);
      l = c7 ^ (c1 << 1 | c0 >>> 31);
      s[8] ^= h;
      s[9] ^= l;
      s[18] ^= h;
      s[19] ^= l;
      s[28] ^= h;
      s[29] ^= l;
      s[38] ^= h;
      s[39] ^= l;
      s[48] ^= h;
      s[49] ^= l;
      b0 = s[0];
      b1 = s[1];
      b32 = s[11] << 4 | s[10] >>> 28;
      b33 = s[10] << 4 | s[11] >>> 28;
      b14 = s[20] << 3 | s[21] >>> 29;
      b15 = s[21] << 3 | s[20] >>> 29;
      b46 = s[31] << 9 | s[30] >>> 23;
      b47 = s[30] << 9 | s[31] >>> 23;
      b28 = s[40] << 18 | s[41] >>> 14;
      b29 = s[41] << 18 | s[40] >>> 14;
      b20 = s[2] << 1 | s[3] >>> 31;
      b21 = s[3] << 1 | s[2] >>> 31;
      b2 = s[13] << 12 | s[12] >>> 20;
      b3 = s[12] << 12 | s[13] >>> 20;
      b34 = s[22] << 10 | s[23] >>> 22;
      b35 = s[23] << 10 | s[22] >>> 22;
      b16 = s[33] << 13 | s[32] >>> 19;
      b17 = s[32] << 13 | s[33] >>> 19;
      b48 = s[42] << 2 | s[43] >>> 30;
      b49 = s[43] << 2 | s[42] >>> 30;
      b40 = s[5] << 30 | s[4] >>> 2;
      b41 = s[4] << 30 | s[5] >>> 2;
      b22 = s[14] << 6 | s[15] >>> 26;
      b23 = s[15] << 6 | s[14] >>> 26;
      b4 = s[25] << 11 | s[24] >>> 21;
      b5 = s[24] << 11 | s[25] >>> 21;
      b36 = s[34] << 15 | s[35] >>> 17;
      b37 = s[35] << 15 | s[34] >>> 17;
      b18 = s[45] << 29 | s[44] >>> 3;
      b19 = s[44] << 29 | s[45] >>> 3;
      b10 = s[6] << 28 | s[7] >>> 4;
      b11 = s[7] << 28 | s[6] >>> 4;
      b42 = s[17] << 23 | s[16] >>> 9;
      b43 = s[16] << 23 | s[17] >>> 9;
      b24 = s[26] << 25 | s[27] >>> 7;
      b25 = s[27] << 25 | s[26] >>> 7;
      b6 = s[36] << 21 | s[37] >>> 11;
      b7 = s[37] << 21 | s[36] >>> 11;
      b38 = s[47] << 24 | s[46] >>> 8;
      b39 = s[46] << 24 | s[47] >>> 8;
      b30 = s[8] << 27 | s[9] >>> 5;
      b31 = s[9] << 27 | s[8] >>> 5;
      b12 = s[18] << 20 | s[19] >>> 12;
      b13 = s[19] << 20 | s[18] >>> 12;
      b44 = s[29] << 7 | s[28] >>> 25;
      b45 = s[28] << 7 | s[29] >>> 25;
      b26 = s[38] << 8 | s[39] >>> 24;
      b27 = s[39] << 8 | s[38] >>> 24;
      b8 = s[48] << 14 | s[49] >>> 18;
      b9 = s[49] << 14 | s[48] >>> 18;
      s[0] = b0 ^ ~b2 & b4;
      s[1] = b1 ^ ~b3 & b5;
      s[10] = b10 ^ ~b12 & b14;
      s[11] = b11 ^ ~b13 & b15;
      s[20] = b20 ^ ~b22 & b24;
      s[21] = b21 ^ ~b23 & b25;
      s[30] = b30 ^ ~b32 & b34;
      s[31] = b31 ^ ~b33 & b35;
      s[40] = b40 ^ ~b42 & b44;
      s[41] = b41 ^ ~b43 & b45;
      s[2] = b2 ^ ~b4 & b6;
      s[3] = b3 ^ ~b5 & b7;
      s[12] = b12 ^ ~b14 & b16;
      s[13] = b13 ^ ~b15 & b17;
      s[22] = b22 ^ ~b24 & b26;
      s[23] = b23 ^ ~b25 & b27;
      s[32] = b32 ^ ~b34 & b36;
      s[33] = b33 ^ ~b35 & b37;
      s[42] = b42 ^ ~b44 & b46;
      s[43] = b43 ^ ~b45 & b47;
      s[4] = b4 ^ ~b6 & b8;
      s[5] = b5 ^ ~b7 & b9;
      s[14] = b14 ^ ~b16 & b18;
      s[15] = b15 ^ ~b17 & b19;
      s[24] = b24 ^ ~b26 & b28;
      s[25] = b25 ^ ~b27 & b29;
      s[34] = b34 ^ ~b36 & b38;
      s[35] = b35 ^ ~b37 & b39;
      s[44] = b44 ^ ~b46 & b48;
      s[45] = b45 ^ ~b47 & b49;
      s[6] = b6 ^ ~b8 & b0;
      s[7] = b7 ^ ~b9 & b1;
      s[16] = b16 ^ ~b18 & b10;
      s[17] = b17 ^ ~b19 & b11;
      s[26] = b26 ^ ~b28 & b20;
      s[27] = b27 ^ ~b29 & b21;
      s[36] = b36 ^ ~b38 & b30;
      s[37] = b37 ^ ~b39 & b31;
      s[46] = b46 ^ ~b48 & b40;
      s[47] = b47 ^ ~b49 & b41;
      s[8] = b8 ^ ~b0 & b2;
      s[9] = b9 ^ ~b1 & b3;
      s[18] = b18 ^ ~b10 & b12;
      s[19] = b19 ^ ~b11 & b13;
      s[28] = b28 ^ ~b20 & b22;
      s[29] = b29 ^ ~b21 & b23;
      s[38] = b38 ^ ~b30 & b32;
      s[39] = b39 ^ ~b31 & b33;
      s[48] = b48 ^ ~b40 & b42;
      s[49] = b49 ^ ~b41 & b43;
      s[0] ^= RC[n];
      s[1] ^= RC[n + 1];
    }
  };

  if (COMMON_JS) {
    module.exports = methods;
  } else {
    for (i = 0; i < methodNames.length; ++i) {
      root[methodNames[i]] = methods[methodNames[i]];
    }

    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return methods;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@walletconnect/utils/node_modules/query-string/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/node_modules/query-string/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/@walletconnect/utils/node_modules/strict-uri-encode/index.js");

const decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");

const splitOnFirst = __webpack_require__(/*! split-on-first */ "./node_modules/split-on-first/index.js");

const isNullOrUndefined = value => value === null || value === undefined;

function encoderForArrayFormat(options) {
  switch (options.arrayFormat) {
    case 'index':
      return key => (result, value) => {
        const index = result.length;

        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
          return result;
        }

        if (value === null) {
          return [...result, [encode(key, options), '[', index, ']'].join('')];
        }

        return [...result, [encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')];
      };

    case 'bracket':
      return key => (result, value) => {
        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
          return result;
        }

        if (value === null) {
          return [...result, [encode(key, options), '[]'].join('')];
        }

        return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
      };

    case 'comma':
    case 'separator':
      return key => (result, value) => {
        if (value === null || value === undefined || value.length === 0) {
          return result;
        }

        if (result.length === 0) {
          return [[encode(key, options), '=', encode(value, options)].join('')];
        }

        return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
      };

    default:
      return key => (result, value) => {
        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
          return result;
        }

        if (value === null) {
          return [...result, encode(key, options)];
        }

        return [...result, [encode(key, options), '=', encode(value, options)].join('')];
      };
  }
}

function parserForArrayFormat(options) {
  let result;

  switch (options.arrayFormat) {
    case 'index':
      return (key, value, accumulator) => {
        result = /\[(\d*)\]$/.exec(key);
        key = key.replace(/\[\d*\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {};
        }

        accumulator[key][result[1]] = value;
      };

    case 'bracket':
      return (key, value, accumulator) => {
        result = /(\[\])$/.exec(key);
        key = key.replace(/\[\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    case 'comma':
    case 'separator':
      return (key, value, accumulator) => {
        const isArray = typeof value === 'string' && value.split('').indexOf(options.arrayFormatSeparator) > -1;
        const newValue = isArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
        accumulator[key] = newValue;
      };

    default:
      return (key, value, accumulator) => {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };
  }
}

function validateArrayFormatSeparator(value) {
  if (typeof value !== 'string' || value.length !== 1) {
    throw new TypeError('arrayFormatSeparator must be single character string');
  }
}

function encode(value, options) {
  if (options.encode) {
    return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }

  return value;
}

function decode(value, options) {
  if (options.decode) {
    return decodeComponent(value);
  }

  return value;
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  }

  if (typeof input === 'object') {
    return keysSorter(Object.keys(input)).sort((a, b) => Number(a) - Number(b)).map(key => input[key]);
  }

  return input;
}

function removeHash(input) {
  const hashStart = input.indexOf('#');

  if (hashStart !== -1) {
    input = input.slice(0, hashStart);
  }

  return input;
}

function getHash(url) {
  let hash = '';
  const hashStart = url.indexOf('#');

  if (hashStart !== -1) {
    hash = url.slice(hashStart);
  }

  return hash;
}

function extract(input) {
  input = removeHash(input);
  const queryStart = input.indexOf('?');

  if (queryStart === -1) {
    return '';
  }

  return input.slice(queryStart + 1);
}

function parseValue(value, options) {
  if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
    value = Number(value);
  } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
    value = value.toLowerCase() === 'true';
  }

  return value;
}

function parse(input, options) {
  options = Object.assign({
    decode: true,
    sort: true,
    arrayFormat: 'none',
    arrayFormatSeparator: ',',
    parseNumbers: false,
    parseBooleans: false
  }, options);
  validateArrayFormatSeparator(options.arrayFormatSeparator);
  const formatter = parserForArrayFormat(options); // Create an object with no prototype

  const ret = Object.create(null);

  if (typeof input !== 'string') {
    return ret;
  }

  input = input.trim().replace(/^[?#&]/, '');

  if (!input) {
    return ret;
  }

  for (const param of input.split('&')) {
    let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '='); // Missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    value = value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? value : decode(value, options);
    formatter(decode(key, options), value, ret);
  }

  for (const key of Object.keys(ret)) {
    const value = ret[key];

    if (typeof value === 'object' && value !== null) {
      for (const k of Object.keys(value)) {
        value[k] = parseValue(value[k], options);
      }
    } else {
      ret[key] = parseValue(value, options);
    }
  }

  if (options.sort === false) {
    return ret;
  }

  return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
    const value = ret[key];

    if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
      // Sort object keys, not values
      result[key] = keysSorter(value);
    } else {
      result[key] = value;
    }

    return result;
  }, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
  if (!object) {
    return '';
  }

  options = Object.assign({
    encode: true,
    strict: true,
    arrayFormat: 'none',
    arrayFormatSeparator: ','
  }, options);
  validateArrayFormatSeparator(options.arrayFormatSeparator);

  const shouldFilter = key => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === '';

  const formatter = encoderForArrayFormat(options);
  const objectCopy = {};

  for (const key of Object.keys(object)) {
    if (!shouldFilter(key)) {
      objectCopy[key] = object[key];
    }
  }

  const keys = Object.keys(objectCopy);

  if (options.sort !== false) {
    keys.sort(options.sort);
  }

  return keys.map(key => {
    const value = object[key];

    if (value === undefined) {
      return '';
    }

    if (value === null) {
      return encode(key, options);
    }

    if (Array.isArray(value)) {
      return value.reduce(formatter(key), []).join('&');
    }

    return encode(key, options) + '=' + encode(value, options);
  }).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (input, options) => {
  options = Object.assign({
    decode: true
  }, options);
  const [url, hash] = splitOnFirst(input, '#');
  return Object.assign({
    url: url.split('?')[0] || '',
    query: parse(extract(input), options)
  }, options && options.parseFragmentIdentifier && hash ? {
    fragmentIdentifier: decode(hash, options)
  } : {});
};

exports.stringifyUrl = (input, options) => {
  options = Object.assign({
    encode: true,
    strict: true
  }, options);
  const url = removeHash(input.url).split('?')[0] || '';
  const queryFromUrl = exports.extract(input.url);
  const parsedQueryFromUrl = exports.parse(queryFromUrl, {
    sort: false
  });
  const query = Object.assign(parsedQueryFromUrl, input.query);
  let queryString = exports.stringify(query, options);

  if (queryString) {
    queryString = `?${queryString}`;
  }

  let hash = getHash(input.url);

  if (input.fragmentIdentifier) {
    hash = `#${encode(input.fragmentIdentifier, options)}`;
  }

  return `${url}${queryString}${hash}`;
};

/***/ }),

/***/ "./node_modules/@walletconnect/utils/node_modules/strict-uri-encode/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@walletconnect/utils/node_modules/strict-uri-encode/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/dist/cjs/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/dist/cjs/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const client_1 = tslib_1.__importDefault(__webpack_require__(/*! @walletconnect/client */ "./node_modules/@walletconnect/client/dist/cjs/index.js"));

const qrcode_modal_1 = tslib_1.__importDefault(__webpack_require__(/*! @walletconnect/qrcode-modal */ "./node_modules/@walletconnect/qrcode-modal/dist/cjs/index.js"));

const http_connection_1 = tslib_1.__importDefault(__webpack_require__(/*! @walletconnect/http-connection */ "./node_modules/@walletconnect/http-connection/dist/cjs/index.js"));

const utils_1 = __webpack_require__(/*! @walletconnect/utils */ "./node_modules/@walletconnect/utils/dist/cjs/index.js");

const ProviderEngine = __webpack_require__(/*! web3-provider-engine */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/index.js");

const CacheSubprovider = __webpack_require__(/*! web3-provider-engine/subproviders/cache */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/cache.js");

const FixtureSubprovider = __webpack_require__(/*! web3-provider-engine/subproviders/fixture */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/fixture.js");

const FilterSubprovider = __webpack_require__(/*! web3-provider-engine/subproviders/filters */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/filters.js");

const HookedWalletSubprovider = __webpack_require__(/*! web3-provider-engine/subproviders/hooked-wallet */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/hooked-wallet.js");

const NonceSubprovider = __webpack_require__(/*! web3-provider-engine/subproviders/nonce-tracker */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/nonce-tracker.js");

const SubscriptionsSubprovider = __webpack_require__(/*! web3-provider-engine/subproviders/subscriptions */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/subscriptions.js");

class WalletConnectProvider extends ProviderEngine {
  constructor(opts) {
    super({
      pollingInterval: opts.pollingInterval || 8000
    });
    this.bridge = "https://bridge.walletconnect.org";
    this.qrcode = true;
    this.qrcodeModal = qrcode_modal_1.default;
    this.qrcodeModalOptions = undefined;
    this.rpc = null;
    this.infuraId = "";
    this.http = null;
    this.isConnecting = false;
    this.connected = false;
    this.connectCallbacks = [];
    this.accounts = [];
    this.chainId = 1;
    this.networkId = 1;
    this.rpcUrl = "";

    this.enable = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
      const wc = yield this.getWalletConnector();

      if (wc) {
        this.start();
        this.subscribeWalletConnector();
        return wc.accounts;
      } else {
        throw new Error("Failed to connect to WalleConnect");
      }
    });

    this.request = payload => tslib_1.__awaiter(this, void 0, void 0, function* () {
      return this.send(payload);
    });

    this.send = (payload, callback) => tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (typeof payload === "string") {
        const method = payload;
        let params = callback;

        if (method === "personal_sign") {
          params = utils_1.parsePersonalSign(params);
        }

        return this.sendAsyncPromise(method, params);
      }

      payload = Object.assign({
        id: utils_1.payloadId(),
        jsonrpc: "2.0"
      }, payload);

      if (payload.method === "personal_sign") {
        payload.params = utils_1.parsePersonalSign(payload.params);
      }

      if (callback) {
        this.sendAsync(payload, callback);
        return;
      }

      return this.sendAsyncPromise(payload.method, payload.params);
    });

    this.onConnect = callback => {
      this.connectCallbacks.push(callback);
    };

    this.triggerConnect = result => {
      if (this.connectCallbacks && this.connectCallbacks.length) {
        this.connectCallbacks.forEach(callback => callback(result));
      }
    };

    this.bridge = opts.connector ? opts.connector.bridge : opts.bridge || "https://bridge.walletconnect.org";
    this.qrcode = typeof opts.qrcode === "undefined" || opts.qrcode !== false;
    this.qrcodeModal = opts.qrcodeModal || this.qrcodeModal;
    this.qrcodeModalOptions = opts.qrcodeModalOptions;
    this.wc = opts.connector || new client_1.default({
      bridge: this.bridge,
      qrcodeModal: this.qrcode ? this.qrcodeModal : undefined,
      qrcodeModalOptions: this.qrcodeModalOptions,
      clientMeta: opts === null || opts === void 0 ? void 0 : opts.clientMeta
    });
    this.rpc = opts.rpc || null;

    if (!this.rpc && (!opts.infuraId || typeof opts.infuraId !== "string" || !opts.infuraId.trim())) {
      throw new Error("Missing one of the required parameters: rpc or infuraId");
    }

    this.infuraId = opts.infuraId || "";
    this.chainId = typeof opts.chainId !== "undefined" ? opts.chainId : 1;
    this.networkId = this.chainId;
    this.initialize();
  }

  get isWalletConnect() {
    return true;
  }

  get connector() {
    return this.wc;
  }

  get walletMeta() {
    return this.wc.peerMeta;
  }

  disconnect() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      this.close();
    });
  }

  close() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const wc = yield this.getWalletConnector({
        disableSessionCreation: true
      });
      yield wc.killSession();
      yield this.onDisconnect();
    });
  }

  handleRequest(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      try {
        let response;
        let result = null;
        const wc = yield this.getWalletConnector();

        switch (payload.method) {
          case "wc_killSession":
            yield this.close();
            result = null;
            break;

          case "eth_accounts":
            result = wc.accounts;
            break;

          case "eth_coinbase":
            result = wc.accounts[0];
            break;

          case "eth_chainId":
            result = wc.chainId;
            break;

          case "net_version":
            result = wc.networkId || wc.chainId;
            break;

          case "eth_uninstallFilter":
            this.sendAsync(payload, _ => _);
            result = true;
            break;

          default:
            response = yield this.handleOtherRequests(payload);
        }

        if (response) {
          return response;
        }

        return this.formatResponse(payload, result);
      } catch (error) {
        this.emit("error", error);
        throw error;
      }
    });
  }

  handleOtherRequests(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!utils_1.signingMethods.includes(payload.method) && payload.method.startsWith("eth_")) {
        return this.handleReadRequests(payload);
      }

      const wc = yield this.getWalletConnector();
      const result = yield wc.sendCustomRequest(payload);
      return this.formatResponse(payload, result);
    });
  }

  handleReadRequests(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!this.http) {
        const error = new Error("HTTP Connection not available");
        this.emit("error", error);
        throw error;
      }

      return this.http.send(payload);
    });
  }

  formatResponse(payload, result) {
    return {
      id: payload.id,
      jsonrpc: payload.jsonrpc,
      result: result
    };
  }

  getWalletConnector(opts = {}) {
    const {
      disableSessionCreation = false
    } = opts;
    return new Promise((resolve, reject) => {
      const wc = this.wc;

      if (this.isConnecting) {
        this.onConnect(x => resolve(x));
      } else if (!wc.connected && !disableSessionCreation) {
        this.isConnecting = true;
        const sessionRequestOpions = this.chainId ? {
          chainId: this.chainId
        } : undefined;
        wc.on("modal_closed", () => {
          reject(new Error("User closed modal"));
        });
        wc.createSession(sessionRequestOpions).then(() => {
          wc.on("connect", (error, payload) => {
            if (error) {
              this.isConnecting = false;
              return reject(error);
            }

            this.isConnecting = false;
            this.connected = true;

            if (payload) {
              this.updateState(payload.params[0]);
            }

            this.emit("connect");
            this.triggerConnect(wc);
            resolve(wc);
          });
        }).catch(error => {
          this.isConnecting = false;
          reject(error);
        });
      } else {
        if (!this.connected) {
          this.connected = true;
          this.updateState(wc.session);
        }

        resolve(wc);
      }
    });
  }

  subscribeWalletConnector() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const wc = yield this.getWalletConnector();
      wc.on("disconnect", error => {
        if (error) {
          this.emit("error", error);
          return;
        }

        this.onDisconnect();
      });
      wc.on("session_update", (error, payload) => {
        if (error) {
          this.emit("error", error);
          return;
        }

        this.updateState(payload.params[0]);
      });
    });
  }

  onDisconnect() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      yield this.stop();
      this.emit("close", 1000, "Connection closed");
      this.emit("disconnect", 1000, "Connection disconnected");
    });
  }

  updateState(sessionParams) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const {
        accounts,
        chainId,
        networkId,
        rpcUrl
      } = sessionParams;

      if (!this.accounts || accounts && this.accounts !== accounts) {
        this.accounts = accounts;
        this.emit("accountsChanged", accounts);
      }

      if (!this.chainId || chainId && this.chainId !== chainId) {
        this.chainId = chainId;
        this.emit("chainChanged", chainId);
      }

      if (!this.networkId || networkId && this.networkId !== networkId) {
        this.networkId = networkId;
        this.emit("networkChanged", networkId);
      }

      this.updateRpcUrl(this.chainId, rpcUrl || "");
    });
  }

  updateRpcUrl(chainId, rpcUrl = "") {
    const infuraNetworks = {
      1: "mainnet",
      3: "ropsten",
      4: "rinkeby",
      5: "goerli",
      42: "kovan"
    };
    const network = infuraNetworks[chainId];

    if (!rpcUrl) {
      if (this.rpc && this.rpc[chainId]) {
        rpcUrl = this.rpc[chainId];
      } else if (network) {
        rpcUrl = `https://${network}.infura.io/v3/${this.infuraId}`;
      }
    }

    if (rpcUrl) {
      this.rpcUrl = rpcUrl;
      this.updateHttpConnection();
    } else {
      this.emit("error", new Error(`No RPC Url available for chainId: ${chainId}`));
    }
  }

  updateHttpConnection() {
    if (this.rpcUrl) {
      this.http = new http_connection_1.default(this.rpcUrl);
      this.http.on("payload", payload => this.emit("payload", payload));
      this.http.on("error", error => this.emit("error", error));
    }
  }

  sendAsyncPromise(method, params) {
    return new Promise((resolve, reject) => {
      this.sendAsync({
        id: utils_1.payloadId(),
        jsonrpc: "2.0",
        method,
        params: params || []
      }, (error, response) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(response.result);
      });
    });
  }

  initialize() {
    this.updateRpcUrl(this.chainId);
    this.addProvider(new FixtureSubprovider({
      eth_hashrate: "0x00",
      eth_mining: false,
      eth_syncing: true,
      net_listening: true,
      web3_clientVersion: `WalletConnect/v1.x.x/javascript`
    }));
    this.addProvider(new CacheSubprovider());
    this.addProvider(new SubscriptionsSubprovider());
    this.addProvider(new FilterSubprovider());
    this.addProvider(new NonceSubprovider());
    this.addProvider(new HookedWalletSubprovider(this.configWallet()));
    this.addProvider({
      handleRequest: (payload, next, end) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
          const {
            result
          } = yield this.handleRequest(payload);
          end(null, result);
        } catch (error) {
          end(error);
        }
      }),
      setEngine: _ => _
    });
  }

  configWallet() {
    return {
      getAccounts: cb => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
          const wc = yield this.getWalletConnector();
          const accounts = wc.accounts;

          if (accounts && accounts.length) {
            cb(null, accounts);
          } else {
            cb(new Error("Failed to get accounts"));
          }
        } catch (error) {
          cb(error);
        }
      }),
      processMessage: (msgParams, cb) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
          const wc = yield this.getWalletConnector();
          const result = yield wc.signMessage([msgParams.from, msgParams.data]);
          cb(null, result);
        } catch (error) {
          cb(error);
        }
      }),
      processPersonalMessage: (msgParams, cb) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
          const wc = yield this.getWalletConnector();
          const result = yield wc.signPersonalMessage([msgParams.data, msgParams.from]);
          cb(null, result);
        } catch (error) {
          cb(error);
        }
      }),
      processSignTransaction: (txParams, cb) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
          const wc = yield this.getWalletConnector();
          const result = yield wc.signTransaction(txParams);
          cb(null, result);
        } catch (error) {
          cb(error);
        }
      }),
      processTransaction: (txParams, cb) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
          const wc = yield this.getWalletConnector();
          const result = yield wc.sendTransaction(txParams);
          cb(null, result);
        } catch (error) {
          cb(error);
        }
      }),
      processTypedMessage: (msgParams, cb) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
          const wc = yield this.getWalletConnector();
          const result = yield wc.signTypedData([msgParams.from, msgParams.data]);
          cb(null, result);
        } catch (error) {
          cb(error);
        }
      })
    };
  }

}

exports.default = WalletConnectProvider;

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/bn.js/lib/bn.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/bn.js/lib/bn.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
  'use strict'; // Utils

  function assert(val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  } // Could use `inherits` module, but don't want to move from single file
  // architecture yet.


  function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function () {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  } // BN


  function BN(number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0; // Reduction context

    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }

  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;
  var Buffer;

  try {
    if (typeof window !== 'undefined' && typeof window.Buffer !== 'undefined') {
      Buffer = window.Buffer;
    } else {
      Buffer = __webpack_require__(/*! buffer */ 22).Buffer;
    }
  } catch (e) {}

  BN.isBN = function isBN(num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' && num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max(left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min(left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init(number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }

    assert(base === (base | 0) && base >= 2 && base <= 36);
    number = number.toString().replace(/\s+/g, '');
    var start = 0;

    if (number[0] === '-') {
      start++;
      this.negative = 1;
    }

    if (start < number.length) {
      if (base === 16) {
        this._parseHex(number, start, endian);
      } else {
        this._parseBase(number, base, start);

        if (endian === 'le') {
          this._initArray(this.toArray(), base, endian);
        }
      }
    }
  };

  BN.prototype._initNumber = function _initNumber(number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }

    if (number < 0x4000000) {
      this.words = [number & 0x3ffffff];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [number & 0x3ffffff, number / 0x4000000 & 0x3ffffff];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)

      this.words = [number & 0x3ffffff, number / 0x4000000 & 0x3ffffff, 1];
      this.length = 3;
    }

    if (endian !== 'le') return; // Reverse the bytes

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray(number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');

    if (number.length <= 0) {
      this.words = [0];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);

    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;

    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
        this.words[j] |= w << off & 0x3ffffff;
        this.words[j + 1] = w >>> 26 - off & 0x3ffffff;
        off += 24;

        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
        this.words[j] |= w << off & 0x3ffffff;
        this.words[j + 1] = w >>> 26 - off & 0x3ffffff;
        off += 24;

        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }

    return this.strip();
  };

  function parseHex4Bits(string, index) {
    var c = string.charCodeAt(index); // 'A' - 'F'

    if (c >= 65 && c <= 70) {
      return c - 55; // 'a' - 'f'
    } else if (c >= 97 && c <= 102) {
      return c - 87; // '0' - '9'
    } else {
      return c - 48 & 0xf;
    }
  }

  function parseHexByte(string, lowerBound, index) {
    var r = parseHex4Bits(string, index);

    if (index - 1 >= lowerBound) {
      r |= parseHex4Bits(string, index - 1) << 4;
    }

    return r;
  }

  BN.prototype._parseHex = function _parseHex(number, start, endian) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);

    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    } // 24-bits chunks


    var off = 0;
    var j = 0;
    var w;

    if (endian === 'be') {
      for (i = number.length - 1; i >= start; i -= 2) {
        w = parseHexByte(number, start, i) << off;
        this.words[j] |= w & 0x3ffffff;

        if (off >= 18) {
          off -= 18;
          j += 1;
          this.words[j] |= w >>> 26;
        } else {
          off += 8;
        }
      }
    } else {
      var parseLength = number.length - start;

      for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
        w = parseHexByte(number, start, i) << off;
        this.words[j] |= w & 0x3ffffff;

        if (off >= 18) {
          off -= 18;
          j += 1;
          this.words[j] |= w >>> 26;
        } else {
          off += 8;
        }
      }
    }

    this.strip();
  };

  function parseBase(str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);

    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;
      r *= mul; // 'a'

      if (c >= 49) {
        r += c - 49 + 0xa; // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa; // '0' - '9'
      } else {
        r += c;
      }
    }

    return r;
  }

  BN.prototype._parseBase = function _parseBase(number, base, start) {
    // Initialize as zero
    this.words = [0];
    this.length = 1; // Find length of limb in base

    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }

    limbLen--;
    limbPow = limbPow / base | 0;
    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;
    var word = 0;

    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);
      this.imuln(limbPow);

      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);

      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    this.strip();
  };

  BN.prototype.copy = function copy(dest) {
    dest.words = new Array(this.length);

    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }

    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone() {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand(size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }

    return this;
  }; // Remove leading `0` from `this`


  BN.prototype.strip = function strip() {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }

    return this._normSign();
  };

  BN.prototype._normSign = function _normSign() {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }

    return this;
  };

  BN.prototype.inspect = function inspect() {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };
  /*
   var zeros = [];
  var groupSizes = [];
  var groupBases = [];
   var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }
   */


  var zeros = ['', '0', '00', '000', '0000', '00000', '000000', '0000000', '00000000', '000000000', '0000000000', '00000000000', '000000000000', '0000000000000', '00000000000000', '000000000000000', '0000000000000000', '00000000000000000', '000000000000000000', '0000000000000000000', '00000000000000000000', '000000000000000000000', '0000000000000000000000', '00000000000000000000000', '000000000000000000000000', '0000000000000000000000000'];
  var groupSizes = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
  var groupBases = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

  BN.prototype.toString = function toString(base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;
    var out;

    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;

      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = ((w << off | carry) & 0xffffff).toString(16);
        carry = w >>> 24 - off & 0xffffff;

        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }

        off += 2;

        if (off >= 26) {
          off -= 26;
          i--;
        }
      }

      if (carry !== 0) {
        out = carry.toString(16) + out;
      }

      while (out.length % padding !== 0) {
        out = '0' + out;
      }

      if (this.negative !== 0) {
        out = '-' + out;
      }

      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base]; // var groupBase = Math.pow(base, groupSize);

      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;

      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }

      if (this.isZero()) {
        out = '0' + out;
      }

      while (out.length % padding !== 0) {
        out = '0' + out;
      }

      if (this.negative !== 0) {
        out = '-' + out;
      }

      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber() {
    var ret = this.words[0];

    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + this.words[1] * 0x4000000;
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }

    return this.negative !== 0 ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON() {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer(endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray(endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');
    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);
    var b, i;
    var q = this.clone();

    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);
        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);
        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits(w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits(w) {
      var t = w;
      var r = 0;

      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }

      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }

      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }

      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }

      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits(w) {
    // Short-cut
    if (w === 0) return 26;
    var t = w;
    var r = 0;

    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }

    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }

    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }

    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }

    if ((t & 0x1) === 0) {
      r++;
    }

    return r;
  }; // Return number of used bits in a BN


  BN.prototype.bitLength = function bitLength() {
    var w = this.words[this.length - 1];

    var hi = this._countBits(w);

    return (this.length - 1) * 26 + hi;
  };

  function toBitArray(num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = bit / 26 | 0;
      var wbit = bit % 26;
      w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
    }

    return w;
  } // Number of trailing zero bits


  BN.prototype.zeroBits = function zeroBits() {
    if (this.isZero()) return 0;
    var r = 0;

    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);

      r += b;
      if (b !== 26) break;
    }

    return r;
  };

  BN.prototype.byteLength = function byteLength() {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos(width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }

    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos(width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }

    return this.clone();
  };

  BN.prototype.isNeg = function isNeg() {
    return this.negative !== 0;
  }; // Return negative clone of `this`


  BN.prototype.neg = function neg() {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg() {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  }; // Or `num` with `this` in-place


  BN.prototype.iuor = function iuor(num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior(num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  }; // Or `num` with `this`


  BN.prototype.or = function or(num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor(num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  }; // And `num` with `this` in-place


  BN.prototype.iuand = function iuand(num) {
    // b = min-length(num, this)
    var b;

    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;
    return this.strip();
  };

  BN.prototype.iand = function iand(num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  }; // And `num` with `this`


  BN.prototype.and = function and(num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand(num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  }; // Xor `num` with `this` in-place


  BN.prototype.iuxor = function iuxor(num) {
    // a.length > b.length
    var a;
    var b;

    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;
    return this.strip();
  };

  BN.prototype.ixor = function ixor(num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  }; // Xor `num` with `this`


  BN.prototype.xor = function xor(num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor(num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  }; // Not ``this`` with ``width`` bitwidth


  BN.prototype.inotn = function inotn(width) {
    assert(typeof width === 'number' && width >= 0);
    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26; // Extend the buffer with leading zeroes

    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    } // Handle complete words


    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    } // Handle the residue


    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & 0x3ffffff >> 26 - bitsLeft;
    } // And remove leading zeroes


    return this.strip();
  };

  BN.prototype.notn = function notn(width) {
    return this.clone().inotn(width);
  }; // Set `bit` of `this`


  BN.prototype.setn = function setn(bit, val) {
    assert(typeof bit === 'number' && bit >= 0);
    var off = bit / 26 | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | 1 << wbit;
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  }; // Add `num` to `this` in-place


  BN.prototype.iadd = function iadd(num) {
    var r; // negative + positive

    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign(); // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    } // a.length > b.length


    var a, b;

    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;

    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;

    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++; // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  }; // Add `num` to `this`


  BN.prototype.add = function add(num) {
    var res;

    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);
    return num.clone().iadd(this);
  }; // Subtract `num` from `this` in-place


  BN.prototype.isub = function isub(num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign(); // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    } // At this point both numbers are positive


    var cmp = this.cmp(num); // Optimization - zeroify

    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    } // a > b


    var a, b;

    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;

    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    } // Copy rest of the words


    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  }; // Subtract `num` from `this`


  BN.prototype.sub = function sub(num) {
    return this.clone().isub(num);
  };

  function smallMulTo(self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = self.length + num.length | 0;
    out.length = len;
    len = len - 1 | 0; // Peel one iteration (compiler can't do it, because of code complexity)

    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;
    var lo = r & 0x3ffffff;
    var carry = r / 0x4000000 | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);

      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += r / 0x4000000 | 0;
        rword = r & 0x3ffffff;
      }

      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }

    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  } // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).


  var comb10MulTo = function comb10MulTo(self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;
    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */

    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = mid + Math.imul(ah0, bl0) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */

    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = mid + Math.imul(ah1, bl0) | 0;
    hi = Math.imul(ah1, bh0);
    lo = lo + Math.imul(al0, bl1) | 0;
    mid = mid + Math.imul(al0, bh1) | 0;
    mid = mid + Math.imul(ah0, bl1) | 0;
    hi = hi + Math.imul(ah0, bh1) | 0;
    var w1 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */

    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = mid + Math.imul(ah2, bl0) | 0;
    hi = Math.imul(ah2, bh0);
    lo = lo + Math.imul(al1, bl1) | 0;
    mid = mid + Math.imul(al1, bh1) | 0;
    mid = mid + Math.imul(ah1, bl1) | 0;
    hi = hi + Math.imul(ah1, bh1) | 0;
    lo = lo + Math.imul(al0, bl2) | 0;
    mid = mid + Math.imul(al0, bh2) | 0;
    mid = mid + Math.imul(ah0, bl2) | 0;
    hi = hi + Math.imul(ah0, bh2) | 0;
    var w2 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */

    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = mid + Math.imul(ah3, bl0) | 0;
    hi = Math.imul(ah3, bh0);
    lo = lo + Math.imul(al2, bl1) | 0;
    mid = mid + Math.imul(al2, bh1) | 0;
    mid = mid + Math.imul(ah2, bl1) | 0;
    hi = hi + Math.imul(ah2, bh1) | 0;
    lo = lo + Math.imul(al1, bl2) | 0;
    mid = mid + Math.imul(al1, bh2) | 0;
    mid = mid + Math.imul(ah1, bl2) | 0;
    hi = hi + Math.imul(ah1, bh2) | 0;
    lo = lo + Math.imul(al0, bl3) | 0;
    mid = mid + Math.imul(al0, bh3) | 0;
    mid = mid + Math.imul(ah0, bl3) | 0;
    hi = hi + Math.imul(ah0, bh3) | 0;
    var w3 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */

    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = mid + Math.imul(ah4, bl0) | 0;
    hi = Math.imul(ah4, bh0);
    lo = lo + Math.imul(al3, bl1) | 0;
    mid = mid + Math.imul(al3, bh1) | 0;
    mid = mid + Math.imul(ah3, bl1) | 0;
    hi = hi + Math.imul(ah3, bh1) | 0;
    lo = lo + Math.imul(al2, bl2) | 0;
    mid = mid + Math.imul(al2, bh2) | 0;
    mid = mid + Math.imul(ah2, bl2) | 0;
    hi = hi + Math.imul(ah2, bh2) | 0;
    lo = lo + Math.imul(al1, bl3) | 0;
    mid = mid + Math.imul(al1, bh3) | 0;
    mid = mid + Math.imul(ah1, bl3) | 0;
    hi = hi + Math.imul(ah1, bh3) | 0;
    lo = lo + Math.imul(al0, bl4) | 0;
    mid = mid + Math.imul(al0, bh4) | 0;
    mid = mid + Math.imul(ah0, bl4) | 0;
    hi = hi + Math.imul(ah0, bh4) | 0;
    var w4 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */

    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = mid + Math.imul(ah5, bl0) | 0;
    hi = Math.imul(ah5, bh0);
    lo = lo + Math.imul(al4, bl1) | 0;
    mid = mid + Math.imul(al4, bh1) | 0;
    mid = mid + Math.imul(ah4, bl1) | 0;
    hi = hi + Math.imul(ah4, bh1) | 0;
    lo = lo + Math.imul(al3, bl2) | 0;
    mid = mid + Math.imul(al3, bh2) | 0;
    mid = mid + Math.imul(ah3, bl2) | 0;
    hi = hi + Math.imul(ah3, bh2) | 0;
    lo = lo + Math.imul(al2, bl3) | 0;
    mid = mid + Math.imul(al2, bh3) | 0;
    mid = mid + Math.imul(ah2, bl3) | 0;
    hi = hi + Math.imul(ah2, bh3) | 0;
    lo = lo + Math.imul(al1, bl4) | 0;
    mid = mid + Math.imul(al1, bh4) | 0;
    mid = mid + Math.imul(ah1, bl4) | 0;
    hi = hi + Math.imul(ah1, bh4) | 0;
    lo = lo + Math.imul(al0, bl5) | 0;
    mid = mid + Math.imul(al0, bh5) | 0;
    mid = mid + Math.imul(ah0, bl5) | 0;
    hi = hi + Math.imul(ah0, bh5) | 0;
    var w5 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */

    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = mid + Math.imul(ah6, bl0) | 0;
    hi = Math.imul(ah6, bh0);
    lo = lo + Math.imul(al5, bl1) | 0;
    mid = mid + Math.imul(al5, bh1) | 0;
    mid = mid + Math.imul(ah5, bl1) | 0;
    hi = hi + Math.imul(ah5, bh1) | 0;
    lo = lo + Math.imul(al4, bl2) | 0;
    mid = mid + Math.imul(al4, bh2) | 0;
    mid = mid + Math.imul(ah4, bl2) | 0;
    hi = hi + Math.imul(ah4, bh2) | 0;
    lo = lo + Math.imul(al3, bl3) | 0;
    mid = mid + Math.imul(al3, bh3) | 0;
    mid = mid + Math.imul(ah3, bl3) | 0;
    hi = hi + Math.imul(ah3, bh3) | 0;
    lo = lo + Math.imul(al2, bl4) | 0;
    mid = mid + Math.imul(al2, bh4) | 0;
    mid = mid + Math.imul(ah2, bl4) | 0;
    hi = hi + Math.imul(ah2, bh4) | 0;
    lo = lo + Math.imul(al1, bl5) | 0;
    mid = mid + Math.imul(al1, bh5) | 0;
    mid = mid + Math.imul(ah1, bl5) | 0;
    hi = hi + Math.imul(ah1, bh5) | 0;
    lo = lo + Math.imul(al0, bl6) | 0;
    mid = mid + Math.imul(al0, bh6) | 0;
    mid = mid + Math.imul(ah0, bl6) | 0;
    hi = hi + Math.imul(ah0, bh6) | 0;
    var w6 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */

    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = mid + Math.imul(ah7, bl0) | 0;
    hi = Math.imul(ah7, bh0);
    lo = lo + Math.imul(al6, bl1) | 0;
    mid = mid + Math.imul(al6, bh1) | 0;
    mid = mid + Math.imul(ah6, bl1) | 0;
    hi = hi + Math.imul(ah6, bh1) | 0;
    lo = lo + Math.imul(al5, bl2) | 0;
    mid = mid + Math.imul(al5, bh2) | 0;
    mid = mid + Math.imul(ah5, bl2) | 0;
    hi = hi + Math.imul(ah5, bh2) | 0;
    lo = lo + Math.imul(al4, bl3) | 0;
    mid = mid + Math.imul(al4, bh3) | 0;
    mid = mid + Math.imul(ah4, bl3) | 0;
    hi = hi + Math.imul(ah4, bh3) | 0;
    lo = lo + Math.imul(al3, bl4) | 0;
    mid = mid + Math.imul(al3, bh4) | 0;
    mid = mid + Math.imul(ah3, bl4) | 0;
    hi = hi + Math.imul(ah3, bh4) | 0;
    lo = lo + Math.imul(al2, bl5) | 0;
    mid = mid + Math.imul(al2, bh5) | 0;
    mid = mid + Math.imul(ah2, bl5) | 0;
    hi = hi + Math.imul(ah2, bh5) | 0;
    lo = lo + Math.imul(al1, bl6) | 0;
    mid = mid + Math.imul(al1, bh6) | 0;
    mid = mid + Math.imul(ah1, bl6) | 0;
    hi = hi + Math.imul(ah1, bh6) | 0;
    lo = lo + Math.imul(al0, bl7) | 0;
    mid = mid + Math.imul(al0, bh7) | 0;
    mid = mid + Math.imul(ah0, bl7) | 0;
    hi = hi + Math.imul(ah0, bh7) | 0;
    var w7 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */

    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = mid + Math.imul(ah8, bl0) | 0;
    hi = Math.imul(ah8, bh0);
    lo = lo + Math.imul(al7, bl1) | 0;
    mid = mid + Math.imul(al7, bh1) | 0;
    mid = mid + Math.imul(ah7, bl1) | 0;
    hi = hi + Math.imul(ah7, bh1) | 0;
    lo = lo + Math.imul(al6, bl2) | 0;
    mid = mid + Math.imul(al6, bh2) | 0;
    mid = mid + Math.imul(ah6, bl2) | 0;
    hi = hi + Math.imul(ah6, bh2) | 0;
    lo = lo + Math.imul(al5, bl3) | 0;
    mid = mid + Math.imul(al5, bh3) | 0;
    mid = mid + Math.imul(ah5, bl3) | 0;
    hi = hi + Math.imul(ah5, bh3) | 0;
    lo = lo + Math.imul(al4, bl4) | 0;
    mid = mid + Math.imul(al4, bh4) | 0;
    mid = mid + Math.imul(ah4, bl4) | 0;
    hi = hi + Math.imul(ah4, bh4) | 0;
    lo = lo + Math.imul(al3, bl5) | 0;
    mid = mid + Math.imul(al3, bh5) | 0;
    mid = mid + Math.imul(ah3, bl5) | 0;
    hi = hi + Math.imul(ah3, bh5) | 0;
    lo = lo + Math.imul(al2, bl6) | 0;
    mid = mid + Math.imul(al2, bh6) | 0;
    mid = mid + Math.imul(ah2, bl6) | 0;
    hi = hi + Math.imul(ah2, bh6) | 0;
    lo = lo + Math.imul(al1, bl7) | 0;
    mid = mid + Math.imul(al1, bh7) | 0;
    mid = mid + Math.imul(ah1, bl7) | 0;
    hi = hi + Math.imul(ah1, bh7) | 0;
    lo = lo + Math.imul(al0, bl8) | 0;
    mid = mid + Math.imul(al0, bh8) | 0;
    mid = mid + Math.imul(ah0, bl8) | 0;
    hi = hi + Math.imul(ah0, bh8) | 0;
    var w8 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */

    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = mid + Math.imul(ah9, bl0) | 0;
    hi = Math.imul(ah9, bh0);
    lo = lo + Math.imul(al8, bl1) | 0;
    mid = mid + Math.imul(al8, bh1) | 0;
    mid = mid + Math.imul(ah8, bl1) | 0;
    hi = hi + Math.imul(ah8, bh1) | 0;
    lo = lo + Math.imul(al7, bl2) | 0;
    mid = mid + Math.imul(al7, bh2) | 0;
    mid = mid + Math.imul(ah7, bl2) | 0;
    hi = hi + Math.imul(ah7, bh2) | 0;
    lo = lo + Math.imul(al6, bl3) | 0;
    mid = mid + Math.imul(al6, bh3) | 0;
    mid = mid + Math.imul(ah6, bl3) | 0;
    hi = hi + Math.imul(ah6, bh3) | 0;
    lo = lo + Math.imul(al5, bl4) | 0;
    mid = mid + Math.imul(al5, bh4) | 0;
    mid = mid + Math.imul(ah5, bl4) | 0;
    hi = hi + Math.imul(ah5, bh4) | 0;
    lo = lo + Math.imul(al4, bl5) | 0;
    mid = mid + Math.imul(al4, bh5) | 0;
    mid = mid + Math.imul(ah4, bl5) | 0;
    hi = hi + Math.imul(ah4, bh5) | 0;
    lo = lo + Math.imul(al3, bl6) | 0;
    mid = mid + Math.imul(al3, bh6) | 0;
    mid = mid + Math.imul(ah3, bl6) | 0;
    hi = hi + Math.imul(ah3, bh6) | 0;
    lo = lo + Math.imul(al2, bl7) | 0;
    mid = mid + Math.imul(al2, bh7) | 0;
    mid = mid + Math.imul(ah2, bl7) | 0;
    hi = hi + Math.imul(ah2, bh7) | 0;
    lo = lo + Math.imul(al1, bl8) | 0;
    mid = mid + Math.imul(al1, bh8) | 0;
    mid = mid + Math.imul(ah1, bl8) | 0;
    hi = hi + Math.imul(ah1, bh8) | 0;
    lo = lo + Math.imul(al0, bl9) | 0;
    mid = mid + Math.imul(al0, bh9) | 0;
    mid = mid + Math.imul(ah0, bl9) | 0;
    hi = hi + Math.imul(ah0, bh9) | 0;
    var w9 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */

    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = mid + Math.imul(ah9, bl1) | 0;
    hi = Math.imul(ah9, bh1);
    lo = lo + Math.imul(al8, bl2) | 0;
    mid = mid + Math.imul(al8, bh2) | 0;
    mid = mid + Math.imul(ah8, bl2) | 0;
    hi = hi + Math.imul(ah8, bh2) | 0;
    lo = lo + Math.imul(al7, bl3) | 0;
    mid = mid + Math.imul(al7, bh3) | 0;
    mid = mid + Math.imul(ah7, bl3) | 0;
    hi = hi + Math.imul(ah7, bh3) | 0;
    lo = lo + Math.imul(al6, bl4) | 0;
    mid = mid + Math.imul(al6, bh4) | 0;
    mid = mid + Math.imul(ah6, bl4) | 0;
    hi = hi + Math.imul(ah6, bh4) | 0;
    lo = lo + Math.imul(al5, bl5) | 0;
    mid = mid + Math.imul(al5, bh5) | 0;
    mid = mid + Math.imul(ah5, bl5) | 0;
    hi = hi + Math.imul(ah5, bh5) | 0;
    lo = lo + Math.imul(al4, bl6) | 0;
    mid = mid + Math.imul(al4, bh6) | 0;
    mid = mid + Math.imul(ah4, bl6) | 0;
    hi = hi + Math.imul(ah4, bh6) | 0;
    lo = lo + Math.imul(al3, bl7) | 0;
    mid = mid + Math.imul(al3, bh7) | 0;
    mid = mid + Math.imul(ah3, bl7) | 0;
    hi = hi + Math.imul(ah3, bh7) | 0;
    lo = lo + Math.imul(al2, bl8) | 0;
    mid = mid + Math.imul(al2, bh8) | 0;
    mid = mid + Math.imul(ah2, bl8) | 0;
    hi = hi + Math.imul(ah2, bh8) | 0;
    lo = lo + Math.imul(al1, bl9) | 0;
    mid = mid + Math.imul(al1, bh9) | 0;
    mid = mid + Math.imul(ah1, bl9) | 0;
    hi = hi + Math.imul(ah1, bh9) | 0;
    var w10 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */

    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = mid + Math.imul(ah9, bl2) | 0;
    hi = Math.imul(ah9, bh2);
    lo = lo + Math.imul(al8, bl3) | 0;
    mid = mid + Math.imul(al8, bh3) | 0;
    mid = mid + Math.imul(ah8, bl3) | 0;
    hi = hi + Math.imul(ah8, bh3) | 0;
    lo = lo + Math.imul(al7, bl4) | 0;
    mid = mid + Math.imul(al7, bh4) | 0;
    mid = mid + Math.imul(ah7, bl4) | 0;
    hi = hi + Math.imul(ah7, bh4) | 0;
    lo = lo + Math.imul(al6, bl5) | 0;
    mid = mid + Math.imul(al6, bh5) | 0;
    mid = mid + Math.imul(ah6, bl5) | 0;
    hi = hi + Math.imul(ah6, bh5) | 0;
    lo = lo + Math.imul(al5, bl6) | 0;
    mid = mid + Math.imul(al5, bh6) | 0;
    mid = mid + Math.imul(ah5, bl6) | 0;
    hi = hi + Math.imul(ah5, bh6) | 0;
    lo = lo + Math.imul(al4, bl7) | 0;
    mid = mid + Math.imul(al4, bh7) | 0;
    mid = mid + Math.imul(ah4, bl7) | 0;
    hi = hi + Math.imul(ah4, bh7) | 0;
    lo = lo + Math.imul(al3, bl8) | 0;
    mid = mid + Math.imul(al3, bh8) | 0;
    mid = mid + Math.imul(ah3, bl8) | 0;
    hi = hi + Math.imul(ah3, bh8) | 0;
    lo = lo + Math.imul(al2, bl9) | 0;
    mid = mid + Math.imul(al2, bh9) | 0;
    mid = mid + Math.imul(ah2, bl9) | 0;
    hi = hi + Math.imul(ah2, bh9) | 0;
    var w11 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */

    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = mid + Math.imul(ah9, bl3) | 0;
    hi = Math.imul(ah9, bh3);
    lo = lo + Math.imul(al8, bl4) | 0;
    mid = mid + Math.imul(al8, bh4) | 0;
    mid = mid + Math.imul(ah8, bl4) | 0;
    hi = hi + Math.imul(ah8, bh4) | 0;
    lo = lo + Math.imul(al7, bl5) | 0;
    mid = mid + Math.imul(al7, bh5) | 0;
    mid = mid + Math.imul(ah7, bl5) | 0;
    hi = hi + Math.imul(ah7, bh5) | 0;
    lo = lo + Math.imul(al6, bl6) | 0;
    mid = mid + Math.imul(al6, bh6) | 0;
    mid = mid + Math.imul(ah6, bl6) | 0;
    hi = hi + Math.imul(ah6, bh6) | 0;
    lo = lo + Math.imul(al5, bl7) | 0;
    mid = mid + Math.imul(al5, bh7) | 0;
    mid = mid + Math.imul(ah5, bl7) | 0;
    hi = hi + Math.imul(ah5, bh7) | 0;
    lo = lo + Math.imul(al4, bl8) | 0;
    mid = mid + Math.imul(al4, bh8) | 0;
    mid = mid + Math.imul(ah4, bl8) | 0;
    hi = hi + Math.imul(ah4, bh8) | 0;
    lo = lo + Math.imul(al3, bl9) | 0;
    mid = mid + Math.imul(al3, bh9) | 0;
    mid = mid + Math.imul(ah3, bl9) | 0;
    hi = hi + Math.imul(ah3, bh9) | 0;
    var w12 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */

    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = mid + Math.imul(ah9, bl4) | 0;
    hi = Math.imul(ah9, bh4);
    lo = lo + Math.imul(al8, bl5) | 0;
    mid = mid + Math.imul(al8, bh5) | 0;
    mid = mid + Math.imul(ah8, bl5) | 0;
    hi = hi + Math.imul(ah8, bh5) | 0;
    lo = lo + Math.imul(al7, bl6) | 0;
    mid = mid + Math.imul(al7, bh6) | 0;
    mid = mid + Math.imul(ah7, bl6) | 0;
    hi = hi + Math.imul(ah7, bh6) | 0;
    lo = lo + Math.imul(al6, bl7) | 0;
    mid = mid + Math.imul(al6, bh7) | 0;
    mid = mid + Math.imul(ah6, bl7) | 0;
    hi = hi + Math.imul(ah6, bh7) | 0;
    lo = lo + Math.imul(al5, bl8) | 0;
    mid = mid + Math.imul(al5, bh8) | 0;
    mid = mid + Math.imul(ah5, bl8) | 0;
    hi = hi + Math.imul(ah5, bh8) | 0;
    lo = lo + Math.imul(al4, bl9) | 0;
    mid = mid + Math.imul(al4, bh9) | 0;
    mid = mid + Math.imul(ah4, bl9) | 0;
    hi = hi + Math.imul(ah4, bh9) | 0;
    var w13 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */

    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = mid + Math.imul(ah9, bl5) | 0;
    hi = Math.imul(ah9, bh5);
    lo = lo + Math.imul(al8, bl6) | 0;
    mid = mid + Math.imul(al8, bh6) | 0;
    mid = mid + Math.imul(ah8, bl6) | 0;
    hi = hi + Math.imul(ah8, bh6) | 0;
    lo = lo + Math.imul(al7, bl7) | 0;
    mid = mid + Math.imul(al7, bh7) | 0;
    mid = mid + Math.imul(ah7, bl7) | 0;
    hi = hi + Math.imul(ah7, bh7) | 0;
    lo = lo + Math.imul(al6, bl8) | 0;
    mid = mid + Math.imul(al6, bh8) | 0;
    mid = mid + Math.imul(ah6, bl8) | 0;
    hi = hi + Math.imul(ah6, bh8) | 0;
    lo = lo + Math.imul(al5, bl9) | 0;
    mid = mid + Math.imul(al5, bh9) | 0;
    mid = mid + Math.imul(ah5, bl9) | 0;
    hi = hi + Math.imul(ah5, bh9) | 0;
    var w14 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */

    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = mid + Math.imul(ah9, bl6) | 0;
    hi = Math.imul(ah9, bh6);
    lo = lo + Math.imul(al8, bl7) | 0;
    mid = mid + Math.imul(al8, bh7) | 0;
    mid = mid + Math.imul(ah8, bl7) | 0;
    hi = hi + Math.imul(ah8, bh7) | 0;
    lo = lo + Math.imul(al7, bl8) | 0;
    mid = mid + Math.imul(al7, bh8) | 0;
    mid = mid + Math.imul(ah7, bl8) | 0;
    hi = hi + Math.imul(ah7, bh8) | 0;
    lo = lo + Math.imul(al6, bl9) | 0;
    mid = mid + Math.imul(al6, bh9) | 0;
    mid = mid + Math.imul(ah6, bl9) | 0;
    hi = hi + Math.imul(ah6, bh9) | 0;
    var w15 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */

    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = mid + Math.imul(ah9, bl7) | 0;
    hi = Math.imul(ah9, bh7);
    lo = lo + Math.imul(al8, bl8) | 0;
    mid = mid + Math.imul(al8, bh8) | 0;
    mid = mid + Math.imul(ah8, bl8) | 0;
    hi = hi + Math.imul(ah8, bh8) | 0;
    lo = lo + Math.imul(al7, bl9) | 0;
    mid = mid + Math.imul(al7, bh9) | 0;
    mid = mid + Math.imul(ah7, bl9) | 0;
    hi = hi + Math.imul(ah7, bh9) | 0;
    var w16 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */

    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = mid + Math.imul(ah9, bl8) | 0;
    hi = Math.imul(ah9, bh8);
    lo = lo + Math.imul(al8, bl9) | 0;
    mid = mid + Math.imul(al8, bh9) | 0;
    mid = mid + Math.imul(ah8, bl9) | 0;
    hi = hi + Math.imul(ah8, bh9) | 0;
    var w17 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */

    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = mid + Math.imul(ah9, bl9) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
    c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;

    if (c !== 0) {
      o[19] = c;
      out.length++;
    }

    return out;
  }; // Polyfill comb


  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo(self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;
    var carry = 0;
    var hncarry = 0;

    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);

      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;
        var lo = r & 0x3ffffff;
        ncarry = ncarry + (r / 0x4000000 | 0) | 0;
        lo = lo + rword | 0;
        rword = lo & 0x3ffffff;
        ncarry = ncarry + (lo >>> 26) | 0;
        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }

      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }

    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo(self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo(num, out) {
    var res;
    var len = this.length + num.length;

    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  }; // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion


  function FFTM(x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT(N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;

    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  }; // Returns binary-reversed representation of `x`


  FFTM.prototype.revBin = function revBin(x, l, N) {
    if (x === 0 || x === N - 1) return x;
    var rb = 0;

    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << l - i - 1;
      x >>= 1;
    }

    return rb;
  }; // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm


  FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;
      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];
          var ro = rtws[p + j + s];
          var io = itws[p + j + s];
          var rx = rtwdf_ * ro - itwdf_ * io;
          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;
          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;
          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;
          /* jshint maxdepth : false */

          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;
            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;

    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];
      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;
      t = iws[i];
      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b(ws, N) {
    var carry = 0;

    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 + Math.round(ws[2 * i] / N) + carry;
      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
    var carry = 0;

    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);
      rws[2 * i] = carry & 0x1fff;
      carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff;
      carry = carry >>> 13;
    } // Pad with zeroes


    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub(N) {
    var ph = new Array(N);

    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp(x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);
    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);
    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);
    var rmws = out.words;
    rmws.length = N;
    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);
    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);
    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  }; // Multiply `this` by `num`


  BN.prototype.mul = function mul(num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  }; // Multiply employing FFT


  BN.prototype.mulf = function mulf(num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  }; // In-place Multiplication


  BN.prototype.imul = function imul(num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln(num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000); // Carry

    var carry = 0;

    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += w / 0x4000000 | 0; // NOTE: lo is 27bit maximum

      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln(num) {
    return this.clone().imuln(num);
  }; // `this` * `this`


  BN.prototype.sqr = function sqr() {
    return this.mul(this);
  }; // `this` * `this` in-place


  BN.prototype.isqr = function isqr() {
    return this.imul(this.clone());
  }; // Math.pow(`this`, `num`)


  BN.prototype.pow = function pow(num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1); // Skip leading zeroes

    var res = this;

    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;
        res = res.mul(q);
      }
    }

    return res;
  }; // Shift-left in-place


  BN.prototype.iushln = function iushln(bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = 0x3ffffff >>> 26 - r << 26 - r;
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = (this.words[i] | 0) - newCarry << r;
        this.words[i] = c | carry;
        carry = newCarry >>> 26 - r;
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln(bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  }; // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits


  BN.prototype.iushrn = function iushrn(bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;

    if (hint) {
      h = (hint - hint % 26) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ 0x3ffffff >>> r << r;
    var maskedWords = extended;
    h -= s;
    h = Math.max(0, h); // Extended mode, copy masked part

    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }

      maskedWords.length = s;
    }

    if (s === 0) {// No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;

      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;

    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = carry << 26 - r | word >>> r;
      carry = word & mask;
    } // Push carried bits as a mask


    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn(bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  }; // Shift-left


  BN.prototype.shln = function shln(bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln(bits) {
    return this.clone().iushln(bits);
  }; // Shift-right


  BN.prototype.shrn = function shrn(bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn(bits) {
    return this.clone().iushrn(bits);
  }; // Test if n bit is set


  BN.prototype.testn = function testn(bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r; // Fast case: bit is much higher than all existing words

    if (this.length <= s) return false; // Check bit and return

    var w = this.words[s];
    return !!(w & q);
  }; // Return only lowers bits of number (in-place)


  BN.prototype.imaskn = function imaskn(bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }

    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ 0x3ffffff >>> r << r;
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  }; // Return only lowers bits of number


  BN.prototype.maskn = function maskn(bits) {
    return this.clone().imaskn(bits);
  }; // Add plain number `num` to `this`


  BN.prototype.iaddn = function iaddn(num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num); // Possible sign change

    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    } // Add without checks


    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn(num) {
    this.words[0] += num; // Carry

    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;

      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }

    this.length = Math.max(this.length, i + 1);
    return this;
  }; // Subtract plain number `num` from `this`


  BN.prototype.isubn = function isubn(num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn(num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn(num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs() {
    this.negative = 0;
    return this;
  };

  BN.prototype.abs = function abs() {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;

    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - (right / 0x4000000 | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }

    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip(); // Subtraction overflow

    assert(carry === -1);
    carry = 0;

    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }

    this.negative = 1;
    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv(num, mode) {
    var shift = this.length - num.length;
    var a = this.clone();
    var b = num; // Normalize

    var bhi = b.words[b.length - 1] | 0;

    var bhiBits = this._countBits(bhi);

    shift = 26 - bhiBits;

    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    } // Initialize quotient


    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);

      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);

    if (diff.negative === 0) {
      a = diff;

      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 + (a.words[b.length + j - 1] | 0); // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)

      qj = Math.min(qj / bhi | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);

      while (a.negative !== 0) {
        qj--;
        a.negative = 0;

        a._ishlnsubmul(b, 1, j);

        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }

      if (q) {
        q.words[j] = qj;
      }
    }

    if (q) {
      q.strip();
    }

    a.strip(); // Denormalize

    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  }; // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested


  BN.prototype.divmod = function divmod(num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;

    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();

        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();

        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    } // Both numbers are positive at this point
    // Strip both numbers to approximate shift value


    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    } // Very short reduction


    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  }; // Find `this` / `num`


  BN.prototype.div = function div(num) {
    return this.divmod(num, 'div', false).div;
  }; // Find `this` % `num`


  BN.prototype.mod = function mod(num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod(num) {
    return this.divmod(num, 'mod', true).mod;
  }; // Find Round(`this` / `num`)


  BN.prototype.divRound = function divRound(num) {
    var dm = this.divmod(num); // Fast case - exact division

    if (dm.mod.isZero()) return dm.div;
    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half); // Round down

    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div; // Round up

    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn(num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;
    var acc = 0;

    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  }; // In-place division by number


  BN.prototype.idivn = function idivn(num) {
    assert(num <= 0x3ffffff);
    var carry = 0;

    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = w / num | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn(num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd(p) {
    assert(p.negative === 0);
    assert(!p.isZero());
    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    } // A * x + B * y = x


    var A = new BN(1);
    var B = new BN(0); // C * x + D * y = y

    var C = new BN(0);
    var D = new BN(1);
    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);

      if (i > 0) {
        x.iushrn(i);

        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);

      if (j > 0) {
        y.iushrn(j);

        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  }; // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed


  BN.prototype._invmp = function _invmp(p) {
    assert(p.negative === 0);
    assert(!p.isZero());
    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);
    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);

      if (i > 0) {
        a.iushrn(i);

        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);

      if (j > 0) {
        b.iushrn(j);

        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;

    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd(num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();
    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0; // Remove common factor of two

    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }

      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);

      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  }; // Invert number in the field F(num)


  BN.prototype.invm = function invm(num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven() {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd() {
    return (this.words[0] & 1) === 1;
  }; // And first word and num


  BN.prototype.andln = function andln(num) {
    return this.words[0] & num;
  }; // Increment at the bit position in-line


  BN.prototype.bincn = function bincn(bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r; // Fast case: bit is much higher than all existing words

    if (this.length <= s) {
      this._expand(s + 1);

      this.words[s] |= q;
      return this;
    } // Add bit and propagate, if needed


    var carry = q;

    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.isZero = function isZero() {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn(num) {
    var negative = num < 0;
    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;
    this.strip();
    var res;

    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');
      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }

    if (this.negative !== 0) return -res | 0;
    return res;
  }; // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`


  BN.prototype.cmp = function cmp(num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;
    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  }; // Unsigned comparison


  BN.prototype.ucmp = function ucmp(num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;
    var res = 0;

    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;
      if (a === b) continue;

      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }

      break;
    }

    return res;
  };

  BN.prototype.gtn = function gtn(num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt(num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten(num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte(num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn(num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt(num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten(num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte(num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn(num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq(num) {
    return this.cmp(num) === 0;
  }; //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //


  BN.red = function red(num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed(ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed() {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed(ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed(ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd(num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd(num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub(num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub(num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl(num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul(num) {
    assert(this.red, 'redMul works only with red numbers');

    this.red._verify2(this, num);

    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul(num) {
    assert(this.red, 'redMul works only with red numbers');

    this.red._verify2(this, num);

    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr() {
    assert(this.red, 'redSqr works only with red numbers');

    this.red._verify1(this);

    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr() {
    assert(this.red, 'redISqr works only with red numbers');

    this.red._verify1(this);

    return this.red.isqr(this);
  }; // Square root over p


  BN.prototype.redSqrt = function redSqrt() {
    assert(this.red, 'redSqrt works only with red numbers');

    this.red._verify1(this);

    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm() {
    assert(this.red, 'redInvm works only with red numbers');

    this.red._verify1(this);

    return this.red.invm(this);
  }; // Return negative clone of `this` % `red modulo`


  BN.prototype.redNeg = function redNeg() {
    assert(this.red, 'redNeg works only with red numbers');

    this.red._verify1(this);

    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow(num) {
    assert(this.red && !num.red, 'redPow(normalNum)');

    this.red._verify1(this);

    return this.red.pow(this, num);
  }; // Prime numbers with efficient reduction


  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  }; // Pseudo-Mersenne prime

  function MPrime(name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);
    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp() {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce(num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);

    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      if (r.strip !== undefined) {
        // r is BN v4 instance
        r.strip();
      } else {
        // r is BN v5 instance
        r._strip();
      }
    }

    return r;
  };

  MPrime.prototype.split = function split(input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK(num) {
    return num.imul(this.k);
  };

  function K256() {
    MPrime.call(this, 'k256', 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }

  inherits(K256, MPrime);

  K256.prototype.split = function split(input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;
    var outLen = Math.min(input.length, 9);

    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }

    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    } // Shift by 9 limbs


    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
      prev = next;
    }

    prev >>>= 22;
    input.words[i - 10] = prev;

    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK(num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2; // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390

    var lo = 0;

    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + (lo / 0x4000000 | 0);
    } // Fast length reduction


    if (num.words[num.length - 1] === 0) {
      num.length--;

      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }

    return num;
  };

  function P224() {
    MPrime.call(this, 'p224', 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }

  inherits(P224, MPrime);

  function P192() {
    MPrime.call(this, 'p192', 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }

  inherits(P192, MPrime);

  function P25519() {
    // 2 ^ 255 - 19
    MPrime.call(this, '25519', '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }

  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK(num) {
    // K = 0x13
    var carry = 0;

    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;
      num.words[i] = lo;
      carry = hi;
    }

    if (carry !== 0) {
      num.words[num.length++] = carry;
    }

    return num;
  }; // Exported mostly for testing purposes, use plain name instead


  BN._prime = function prime(name) {
    // Cached version of prime
    if (primes[name]) return primes[name];
    var prime;

    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }

    primes[name] = prime;
    return prime;
  }; //
  // Base reduction engine
  //


  function Red(m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);

      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1(a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2(a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red, 'red works only with red numbers');
  };

  Red.prototype.imod = function imod(a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg(a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add(a, b) {
    this._verify2(a, b);

    var res = a.add(b);

    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }

    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd(a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);

    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }

    return res;
  };

  Red.prototype.sub = function sub(a, b) {
    this._verify2(a, b);

    var res = a.sub(b);

    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Red.prototype.isub = function isub(a, b) {
    this._verify2(a, b);

    var res = a.isub(b);

    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }

    return res;
  };

  Red.prototype.shl = function shl(a, num) {
    this._verify1(a);

    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul(a, b) {
    this._verify2(a, b);

    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul(a, b) {
    this._verify2(a, b);

    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr(a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr(a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt(a) {
    if (a.isZero()) return a.clone();
    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1); // Fast case

    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    } // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)


    var q = this.m.subn(1);
    var s = 0;

    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }

    assert(!q.isZero());
    var one = new BN(1).toRed(this);
    var nOne = one.redNeg(); // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.

    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;

    while (t.cmp(one) !== 0) {
      var tmp = t;

      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }

      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));
      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm(a) {
    var inv = a._invmp(this.m);

    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow(a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();
    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;

    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;

    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];

      for (var j = start - 1; j >= 0; j--) {
        var bit = word >> j & 1;

        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }

      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo(num) {
    var r = num.umod(this.m);
    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom(num) {
    var res = num.clone();
    res.red = null;
    return res;
  }; //
  // Montgomery method engine
  //


  BN.mont = function mont(num) {
    return new Mont(num);
  };

  function Mont(m) {
    Red.call(this, m);
    this.shift = this.m.bitLength();

    if (this.shift % 26 !== 0) {
      this.shift += 26 - this.shift % 26;
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);
    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }

  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo(num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom(num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul(a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul(a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);
    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm(a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})( false || module, this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/eth-json-rpc-middleware/block-cache.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/eth-json-rpc-middleware/block-cache.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const cacheUtils = __webpack_require__(/*! ./cache-utils.js */ "./node_modules/@walletconnect/web3-provider/node_modules/eth-json-rpc-middleware/cache-utils.js");

const createAsyncMiddleware = __webpack_require__(/*! json-rpc-engine/src/createAsyncMiddleware */ "./node_modules/@walletconnect/web3-provider/node_modules/json-rpc-engine/src/createAsyncMiddleware.js"); // `<nil>` comes from https://github.com/ethereum/go-ethereum/issues/16925


const emptyValues = [undefined, null, '\u003cnil\u003e'];
module.exports = createBlockCacheMiddleware;

function createBlockCacheMiddleware(opts = {}) {
  // validate options
  const {
    blockTracker
  } = opts;
  if (!blockTracker) throw new Error('createBlockCacheMiddleware - No BlockTracker specified'); // create caching strategies

  const blockCache = new BlockCacheStrategy();
  const strategies = {
    perma: blockCache,
    block: blockCache,
    fork: blockCache
  };
  return createAsyncMiddleware(async (req, res, next) => {
    // allow cach to be skipped if so specified
    if (req.skipCache) {
      return next();
    } // check type and matching strategy


    const type = cacheUtils.cacheTypeForPayload(req);
    const strategy = strategies[type]; // If there's no strategy in place, pass it down the chain.

    if (!strategy) {
      return next();
    } // If the strategy can't cache this request, ignore it.


    if (!strategy.canCacheRequest(req)) {
      return next();
    } // get block reference (number or keyword)


    let blockTag = cacheUtils.blockTagForPayload(req);
    if (!blockTag) blockTag = 'latest'; // get exact block number

    let requestedBlockNumber;

    if (blockTag === 'earliest') {
      // this just exists for symmetry with "latest"
      requestedBlockNumber = '0x00';
    } else if (blockTag === 'latest') {
      // fetch latest block number
      const latestBlockNumber = await blockTracker.getLatestBlock(); // clear all cache before latest block

      blockCache.clearBefore(latestBlockNumber);
      requestedBlockNumber = latestBlockNumber;
    } else {
      // We have a hex number
      requestedBlockNumber = blockTag;
    } // end on a hit, continue on a miss


    const cacheResult = await strategy.get(req, requestedBlockNumber);

    if (cacheResult === undefined) {
      // cache miss
      // wait for other middleware to handle request
      await next(); // add result to cache

      await strategy.set(req, requestedBlockNumber, res.result);
    } else {
      // fill in result from cache
      res.result = cacheResult;
    }
  });
} //
// Cache Strategies
//


class BlockCacheStrategy {
  constructor() {
    this.cache = {};
  }

  getBlockCacheForPayload(payload, blockNumberHex) {
    const blockNumber = Number.parseInt(blockNumberHex, 16);
    let blockCache = this.cache[blockNumber]; // create new cache if necesary

    if (!blockCache) {
      const newCache = {};
      this.cache[blockNumber] = newCache;
      blockCache = newCache;
    }

    return blockCache;
  }

  async get(payload, requestedBlockNumber) {
    // lookup block cache
    const blockCache = this.getBlockCacheForPayload(payload, requestedBlockNumber);
    if (!blockCache) return; // lookup payload in block cache

    const identifier = cacheUtils.cacheIdentifierForPayload(payload, true);
    const cached = blockCache[identifier]; // may be undefined

    return cached;
  }

  async set(payload, requestedBlockNumber, result) {
    // check if we can cached this result
    const canCache = this.canCacheResult(payload, result);
    if (!canCache) return; // set the value in the cache

    const blockCache = this.getBlockCacheForPayload(payload, requestedBlockNumber);
    const identifier = cacheUtils.cacheIdentifierForPayload(payload, true);
    blockCache[identifier] = result;
  }

  canCacheRequest(payload) {
    // check request method
    if (!cacheUtils.canCache(payload)) {
      return false;
    } // check blockTag


    const blockTag = cacheUtils.blockTagForPayload(payload);

    if (blockTag === 'pending') {
      return false;
    } // can be cached


    return true;
  }

  canCacheResult(payload, result) {
    // never cache empty values (e.g. undefined)
    if (emptyValues.includes(result)) return; // check if transactions have block reference before caching

    if (['eth_getTransactionByHash', 'eth_getTransactionReceipt'].includes(payload.method)) {
      if (!result || !result.blockHash || result.blockHash === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        return false;
      }
    } // otherwise true


    return true;
  } // removes all block caches with block number lower than `oldBlockHex`


  clearBefore(oldBlockHex) {
    const self = this;
    const oldBlockNumber = Number.parseInt(oldBlockHex, 16); // clear old caches

    Object.keys(self.cache).map(Number).filter(num => num < oldBlockNumber).forEach(num => delete self.cache[num]);
  }

}

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/eth-json-rpc-middleware/cache-utils.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/eth-json-rpc-middleware/cache-utils.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const stringify = __webpack_require__(/*! json-stable-stringify */ "./node_modules/json-stable-stringify/index.js");

module.exports = {
  cacheIdentifierForPayload: cacheIdentifierForPayload,
  canCache: canCache,
  blockTagForPayload: blockTagForPayload,
  paramsWithoutBlockTag: paramsWithoutBlockTag,
  blockTagParamIndex: blockTagParamIndex,
  cacheTypeForPayload: cacheTypeForPayload
};

function cacheIdentifierForPayload(payload, skipBlockRef) {
  const simpleParams = skipBlockRef ? paramsWithoutBlockTag(payload) : payload.params;

  if (canCache(payload)) {
    return payload.method + ':' + stringify(simpleParams);
  } else {
    return null;
  }
}

function canCache(payload) {
  return cacheTypeForPayload(payload) !== 'never';
}

function blockTagForPayload(payload) {
  let index = blockTagParamIndex(payload); // Block tag param not passed.

  if (index >= payload.params.length) {
    return null;
  }

  return payload.params[index];
}

function paramsWithoutBlockTag(payload) {
  const index = blockTagParamIndex(payload); // Block tag param not passed.

  if (index >= payload.params.length) {
    return payload.params;
  } // eth_getBlockByNumber has the block tag first, then the optional includeTx? param


  if (payload.method === 'eth_getBlockByNumber') {
    return payload.params.slice(1);
  }

  return payload.params.slice(0, index);
}

function blockTagParamIndex(payload) {
  switch (payload.method) {
    // blockTag is at index 2
    case 'eth_getStorageAt':
      return 2;
    // blockTag is at index 1

    case 'eth_getBalance':
    case 'eth_getCode':
    case 'eth_getTransactionCount':
    case 'eth_call':
      return 1;
    // blockTag is at index 0

    case 'eth_getBlockByNumber':
      return 0;
    // there is no blockTag

    default:
      return undefined;
  }
}

function cacheTypeForPayload(payload) {
  switch (payload.method) {
    // cache permanently
    case 'web3_clientVersion':
    case 'web3_sha3':
    case 'eth_protocolVersion':
    case 'eth_getBlockTransactionCountByHash':
    case 'eth_getUncleCountByBlockHash':
    case 'eth_getCode':
    case 'eth_getBlockByHash':
    case 'eth_getTransactionByHash':
    case 'eth_getTransactionByBlockHashAndIndex':
    case 'eth_getTransactionReceipt':
    case 'eth_getUncleByBlockHashAndIndex':
    case 'eth_getCompilers':
    case 'eth_compileLLL':
    case 'eth_compileSolidity':
    case 'eth_compileSerpent':
    case 'shh_version':
    case 'test_permaCache':
      return 'perma';
    // cache until fork

    case 'eth_getBlockByNumber':
    case 'eth_getBlockTransactionCountByNumber':
    case 'eth_getUncleCountByBlockNumber':
    case 'eth_getTransactionByBlockNumberAndIndex':
    case 'eth_getUncleByBlockNumberAndIndex':
    case 'test_forkCache':
      return 'fork';
    // cache for block

    case 'eth_gasPrice':
    case 'eth_blockNumber':
    case 'eth_getBalance':
    case 'eth_getStorageAt':
    case 'eth_getTransactionCount':
    case 'eth_call':
    case 'eth_estimateGas':
    case 'eth_getFilterLogs':
    case 'eth_getLogs':
    case 'test_blockCache':
      return 'block';
    // never cache

    case 'net_version':
    case 'net_peerCount':
    case 'net_listening':
    case 'eth_syncing':
    case 'eth_sign':
    case 'eth_coinbase':
    case 'eth_mining':
    case 'eth_hashrate':
    case 'eth_accounts':
    case 'eth_sendTransaction':
    case 'eth_sendRawTransaction':
    case 'eth_newFilter':
    case 'eth_newBlockFilter':
    case 'eth_newPendingTransactionFilter':
    case 'eth_uninstallFilter':
    case 'eth_getFilterChanges':
    case 'eth_getWork':
    case 'eth_submitWork':
    case 'eth_submitHashrate':
    case 'db_putString':
    case 'db_getString':
    case 'db_putHex':
    case 'db_getHex':
    case 'shh_post':
    case 'shh_newIdentity':
    case 'shh_hasIdentity':
    case 'shh_newGroup':
    case 'shh_addToGroup':
    case 'shh_newFilter':
    case 'shh_uninstallFilter':
    case 'shh_getFilterChanges':
    case 'shh_getMessages':
    case 'test_neverCache':
      return 'never';
  }
}

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/eth-sig-util/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/eth-sig-util/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const ethUtil = __webpack_require__(/*! ethereumjs-util */ "./node_modules/ethereumjs-util/dist/index.js");

const ethAbi = __webpack_require__(/*! ethereumjs-abi */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/index.js");

module.exports = {
  concatSig: function (v, r, s) {
    const rSig = ethUtil.fromSigned(r);
    const sSig = ethUtil.fromSigned(s);
    const vSig = ethUtil.bufferToInt(v);
    const rStr = padWithZeroes(ethUtil.toUnsigned(rSig).toString('hex'), 64);
    const sStr = padWithZeroes(ethUtil.toUnsigned(sSig).toString('hex'), 64);
    const vStr = ethUtil.stripHexPrefix(ethUtil.intToHex(vSig));
    return ethUtil.addHexPrefix(rStr.concat(sStr, vStr)).toString('hex');
  },
  normalize: function (input) {
    if (!input) return;

    if (typeof input === 'number') {
      const buffer = ethUtil.toBuffer(input);
      input = ethUtil.bufferToHex(buffer);
    }

    if (typeof input !== 'string') {
      var msg = 'eth-sig-util.normalize() requires hex string or integer input.';
      msg += ' received ' + typeof input + ': ' + input;
      throw new Error(msg);
    }

    return ethUtil.addHexPrefix(input.toLowerCase());
  },
  personalSign: function (privateKey, msgParams) {
    var message = ethUtil.toBuffer(msgParams.data);
    var msgHash = ethUtil.hashPersonalMessage(message);
    var sig = ethUtil.ecsign(msgHash, privateKey);
    var serialized = ethUtil.bufferToHex(this.concatSig(sig.v, sig.r, sig.s));
    return serialized;
  },
  recoverPersonalSignature: function (msgParams) {
    const publicKey = getPublicKeyFor(msgParams);
    const sender = ethUtil.publicToAddress(publicKey);
    const senderHex = ethUtil.bufferToHex(sender);
    return senderHex;
  },
  extractPublicKey: function (msgParams) {
    const publicKey = getPublicKeyFor(msgParams);
    return '0x' + publicKey.toString('hex');
  },
  typedSignatureHash: function (typedData) {
    const hashBuffer = typedSignatureHash(typedData);
    return ethUtil.bufferToHex(hashBuffer);
  },
  signTypedData: function (privateKey, msgParams) {
    const msgHash = typedSignatureHash(msgParams.data);
    const sig = ethUtil.ecsign(msgHash, privateKey);
    return ethUtil.bufferToHex(this.concatSig(sig.v, sig.r, sig.s));
  },
  recoverTypedSignature: function (msgParams) {
    const msgHash = typedSignatureHash(msgParams.data);
    const publicKey = recoverPublicKey(msgHash, msgParams.sig);
    const sender = ethUtil.publicToAddress(publicKey);
    return ethUtil.bufferToHex(sender);
  }
};
/**
 * @param typedData - Array of data along with types, as per EIP712.
 * @returns Buffer
 */

function typedSignatureHash(typedData) {
  const error = new Error('Expect argument to be non-empty array');
  if (typeof typedData !== 'object' || !typedData.length) throw error;
  const data = typedData.map(function (e) {
    return e.type === 'bytes' ? ethUtil.toBuffer(e.value) : e.value;
  });
  const types = typedData.map(function (e) {
    return e.type;
  });
  const schema = typedData.map(function (e) {
    if (!e.name) throw error;
    return e.type + ' ' + e.name;
  });
  return ethAbi.soliditySHA3(['bytes32', 'bytes32'], [ethAbi.soliditySHA3(new Array(typedData.length).fill('string'), schema), ethAbi.soliditySHA3(types, data)]);
}

function recoverPublicKey(hash, sig) {
  const signature = ethUtil.toBuffer(sig);
  const sigParams = ethUtil.fromRpcSig(signature);
  return ethUtil.ecrecover(hash, sigParams.v, sigParams.r, sigParams.s);
}

function getPublicKeyFor(msgParams) {
  const message = ethUtil.toBuffer(msgParams.data);
  const msgHash = ethUtil.hashPersonalMessage(message);
  return recoverPublicKey(msgHash, msgParams.sig);
}

function padWithZeroes(number, length) {
  var myString = '' + number;

  while (myString.length < length) {
    myString = '0' + myString;
  }

  return myString;
}

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/index.js */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/lib/index.js");

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/lib/index.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/lib/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/* eslint-disable no-useless-escape */
const utils = __webpack_require__(/*! ethereumjs-util */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/index.js");

const BN = __webpack_require__(/*! bn.js */ "./node_modules/@walletconnect/web3-provider/node_modules/bn.js/lib/bn.js");

var ABI = function () {}; // Convert from short to canonical names
// FIXME: optimise or make this nicer?


function elementaryName(name) {
  if (name.startsWith('int[')) {
    return 'int256' + name.slice(3);
  } else if (name === 'int') {
    return 'int256';
  } else if (name.startsWith('uint[')) {
    return 'uint256' + name.slice(4);
  } else if (name === 'uint') {
    return 'uint256';
  } else if (name.startsWith('fixed[')) {
    return 'fixed128x128' + name.slice(5);
  } else if (name === 'fixed') {
    return 'fixed128x128';
  } else if (name.startsWith('ufixed[')) {
    return 'ufixed128x128' + name.slice(6);
  } else if (name === 'ufixed') {
    return 'ufixed128x128';
  }

  return name;
}

ABI.eventID = function (name, types) {
  // FIXME: use node.js util.format?
  var sig = name + '(' + types.map(elementaryName).join(',') + ')';
  return utils.keccak256(Buffer.from(sig));
};

ABI.methodID = function (name, types) {
  return ABI.eventID(name, types).slice(0, 4);
}; // Parse N from type<N>


function parseTypeN(type) {
  return parseInt(/^\D+(\d+)$/.exec(type)[1], 10);
} // Parse N,M from type<N>x<M>


function parseTypeNxM(type) {
  var tmp = /^\D+(\d+)x(\d+)$/.exec(type);
  return [parseInt(tmp[1], 10), parseInt(tmp[2], 10)];
} // Parse N in type[<N>] where "type" can itself be an array type.


function parseTypeArray(type) {
  var tmp = type.match(/(.*)\[(.*?)\]$/);

  if (tmp) {
    return tmp[2] === '' ? 'dynamic' : parseInt(tmp[2], 10);
  }

  return null;
}

function parseNumber(arg) {
  var type = typeof arg;

  if (type === 'string') {
    if (utils.isHexPrefixed(arg)) {
      return new BN(utils.stripHexPrefix(arg), 16);
    } else {
      return new BN(arg, 10);
    }
  } else if (type === 'number') {
    return new BN(arg);
  } else if (arg.toArray) {
    // assume this is a BN for the moment, replace with BN.isBN soon
    return arg;
  } else {
    throw new Error('Argument is not a number');
  }
} // someMethod(bytes,uint)
// someMethod(bytes,uint):(boolean)


function parseSignature(sig) {
  var tmp = /^(\w+)\((.*)\)$/.exec(sig);

  if (tmp.length !== 3) {
    throw new Error('Invalid method signature');
  }

  var args = /^(.+)\):\((.+)$/.exec(tmp[2]);

  if (args !== null && args.length === 3) {
    return {
      method: tmp[1],
      args: args[1].split(','),
      retargs: args[2].split(',')
    };
  } else {
    var params = tmp[2].split(',');

    if (params.length === 1 && params[0] === '') {
      // Special-case (possibly naive) fixup for functions that take no arguments.
      // TODO: special cases are always bad, but this makes the function return
      // match what the calling functions expect
      params = [];
    }

    return {
      method: tmp[1],
      args: params
    };
  }
} // Encodes a single item (can be dynamic array)
// @returns: Buffer


function encodeSingle(type, arg) {
  var size, num, ret, i;

  if (type === 'address') {
    return encodeSingle('uint160', parseNumber(arg));
  } else if (type === 'bool') {
    return encodeSingle('uint8', arg ? 1 : 0);
  } else if (type === 'string') {
    return encodeSingle('bytes', Buffer.from(arg, 'utf8'));
  } else if (isArray(type)) {
    // this part handles fixed-length ([2]) and variable length ([]) arrays
    // NOTE: we catch here all calls to arrays, that simplifies the rest
    if (typeof arg.length === 'undefined') {
      throw new Error('Not an array?');
    }

    size = parseTypeArray(type);

    if (size !== 'dynamic' && size !== 0 && arg.length > size) {
      throw new Error('Elements exceed array size: ' + size);
    }

    ret = [];
    type = type.slice(0, type.lastIndexOf('['));

    if (typeof arg === 'string') {
      arg = JSON.parse(arg);
    }

    for (i in arg) {
      ret.push(encodeSingle(type, arg[i]));
    }

    if (size === 'dynamic') {
      var length = encodeSingle('uint256', arg.length);
      ret.unshift(length);
    }

    return Buffer.concat(ret);
  } else if (type === 'bytes') {
    arg = Buffer.from(arg);
    ret = Buffer.concat([encodeSingle('uint256', arg.length), arg]);

    if (arg.length % 32 !== 0) {
      ret = Buffer.concat([ret, utils.zeros(32 - arg.length % 32)]);
    }

    return ret;
  } else if (type.startsWith('bytes')) {
    size = parseTypeN(type);

    if (size < 1 || size > 32) {
      throw new Error('Invalid bytes<N> width: ' + size);
    }

    return utils.setLengthRight(arg, 32);
  } else if (type.startsWith('uint')) {
    size = parseTypeN(type);

    if (size % 8 || size < 8 || size > 256) {
      throw new Error('Invalid uint<N> width: ' + size);
    }

    num = parseNumber(arg);

    if (num.bitLength() > size) {
      throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
    }

    if (num < 0) {
      throw new Error('Supplied uint is negative');
    }

    return num.toArrayLike(Buffer, 'be', 32);
  } else if (type.startsWith('int')) {
    size = parseTypeN(type);

    if (size % 8 || size < 8 || size > 256) {
      throw new Error('Invalid int<N> width: ' + size);
    }

    num = parseNumber(arg);

    if (num.bitLength() > size) {
      throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
    }

    return num.toTwos(256).toArrayLike(Buffer, 'be', 32);
  } else if (type.startsWith('ufixed')) {
    size = parseTypeNxM(type);
    num = parseNumber(arg);

    if (num < 0) {
      throw new Error('Supplied ufixed is negative');
    }

    return encodeSingle('uint256', num.mul(new BN(2).pow(new BN(size[1]))));
  } else if (type.startsWith('fixed')) {
    size = parseTypeNxM(type);
    return encodeSingle('int256', parseNumber(arg).mul(new BN(2).pow(new BN(size[1]))));
  }

  throw new Error('Unsupported or invalid type: ' + type);
} // Decodes a single item (can be dynamic array)
// @returns: array
// FIXME: this method will need a lot of attention at checking limits and validation


function decodeSingle(parsedType, data, offset) {
  if (typeof parsedType === 'string') {
    parsedType = parseType(parsedType);
  }

  var size, num, ret, i;

  if (parsedType.name === 'address') {
    return decodeSingle(parsedType.rawType, data, offset).toArrayLike(Buffer, 'be', 20).toString('hex');
  } else if (parsedType.name === 'bool') {
    return decodeSingle(parsedType.rawType, data, offset).toString() === new BN(1).toString();
  } else if (parsedType.name === 'string') {
    var bytes = decodeSingle(parsedType.rawType, data, offset);
    return Buffer.from(bytes, 'utf8').toString();
  } else if (parsedType.isArray) {
    // this part handles fixed-length arrays ([2]) and variable length ([]) arrays
    // NOTE: we catch here all calls to arrays, that simplifies the rest
    ret = [];
    size = parsedType.size;

    if (parsedType.size === 'dynamic') {
      offset = decodeSingle('uint256', data, offset).toNumber();
      size = decodeSingle('uint256', data, offset).toNumber();
      offset = offset + 32;
    }

    for (i = 0; i < size; i++) {
      var decoded = decodeSingle(parsedType.subArray, data, offset);
      ret.push(decoded);
      offset += parsedType.subArray.memoryUsage;
    }

    return ret;
  } else if (parsedType.name === 'bytes') {
    offset = decodeSingle('uint256', data, offset).toNumber();
    size = decodeSingle('uint256', data, offset).toNumber();
    return data.slice(offset + 32, offset + 32 + size);
  } else if (parsedType.name.startsWith('bytes')) {
    return data.slice(offset, offset + parsedType.size);
  } else if (parsedType.name.startsWith('uint')) {
    num = new BN(data.slice(offset, offset + 32), 16, 'be');

    if (num.bitLength() > parsedType.size) {
      throw new Error('Decoded int exceeds width: ' + parsedType.size + ' vs ' + num.bitLength());
    }

    return num;
  } else if (parsedType.name.startsWith('int')) {
    num = new BN(data.slice(offset, offset + 32), 16, 'be').fromTwos(256);

    if (num.bitLength() > parsedType.size) {
      throw new Error('Decoded uint exceeds width: ' + parsedType.size + ' vs ' + num.bitLength());
    }

    return num;
  } else if (parsedType.name.startsWith('ufixed')) {
    size = new BN(2).pow(new BN(parsedType.size[1]));
    num = decodeSingle('uint256', data, offset);

    if (!num.mod(size).isZero()) {
      throw new Error('Decimals not supported yet');
    }

    return num.div(size);
  } else if (parsedType.name.startsWith('fixed')) {
    size = new BN(2).pow(new BN(parsedType.size[1]));
    num = decodeSingle('int256', data, offset);

    if (!num.mod(size).isZero()) {
      throw new Error('Decimals not supported yet');
    }

    return num.div(size);
  }

  throw new Error('Unsupported or invalid type: ' + parsedType.name);
} // Parse the given type
// @returns: {} containing the type itself, memory usage and (including size and subArray if applicable)


function parseType(type) {
  var size;
  var ret;

  if (isArray(type)) {
    size = parseTypeArray(type);
    var subArray = type.slice(0, type.lastIndexOf('['));
    subArray = parseType(subArray);
    ret = {
      isArray: true,
      name: type,
      size: size,
      memoryUsage: size === 'dynamic' ? 32 : subArray.memoryUsage * size,
      subArray: subArray
    };
    return ret;
  } else {
    var rawType;

    switch (type) {
      case 'address':
        rawType = 'uint160';
        break;

      case 'bool':
        rawType = 'uint8';
        break;

      case 'string':
        rawType = 'bytes';
        break;
    }

    ret = {
      rawType: rawType,
      name: type,
      memoryUsage: 32
    };

    if (type.startsWith('bytes') && type !== 'bytes' || type.startsWith('uint') || type.startsWith('int')) {
      ret.size = parseTypeN(type);
    } else if (type.startsWith('ufixed') || type.startsWith('fixed')) {
      ret.size = parseTypeNxM(type);
    }

    if (type.startsWith('bytes') && type !== 'bytes' && (ret.size < 1 || ret.size > 32)) {
      throw new Error('Invalid bytes<N> width: ' + ret.size);
    }

    if ((type.startsWith('uint') || type.startsWith('int')) && (ret.size % 8 || ret.size < 8 || ret.size > 256)) {
      throw new Error('Invalid int/uint<N> width: ' + ret.size);
    }

    return ret;
  }
} // Is a type dynamic?


function isDynamic(type) {
  // FIXME: handle all types? I don't think anything is missing now
  return type === 'string' || type === 'bytes' || parseTypeArray(type) === 'dynamic';
} // Is a type an array?


function isArray(type) {
  return type.lastIndexOf(']') === type.length - 1;
} // Encode a method/event with arguments
// @types an array of string type names
// @args  an array of the appropriate values


ABI.rawEncode = function (types, values) {
  var output = [];
  var data = [];
  var headLength = 0;
  types.forEach(function (type) {
    if (isArray(type)) {
      var size = parseTypeArray(type);

      if (size !== 'dynamic') {
        headLength += 32 * size;
      } else {
        headLength += 32;
      }
    } else {
      headLength += 32;
    }
  });

  for (var i = 0; i < types.length; i++) {
    var type = elementaryName(types[i]);
    var value = values[i];
    var cur = encodeSingle(type, value); // Use the head/tail method for storing dynamic data

    if (isDynamic(type)) {
      output.push(encodeSingle('uint256', headLength));
      data.push(cur);
      headLength += cur.length;
    } else {
      output.push(cur);
    }
  }

  return Buffer.concat(output.concat(data));
};

ABI.rawDecode = function (types, data) {
  var ret = [];
  data = Buffer.from(data);
  var offset = 0;

  for (var i = 0; i < types.length; i++) {
    var type = elementaryName(types[i]);
    var parsed = parseType(type, data, offset);
    var decoded = decodeSingle(parsed, data, offset);
    offset += parsed.memoryUsage;
    ret.push(decoded);
  }

  return ret;
};

ABI.simpleEncode = function (method) {
  var args = Array.prototype.slice.call(arguments).slice(1);
  var sig = parseSignature(method); // FIXME: validate/convert arguments

  if (args.length !== sig.args.length) {
    throw new Error('Argument count mismatch');
  }

  return Buffer.concat([ABI.methodID(sig.method, sig.args), ABI.rawEncode(sig.args, args)]);
};

ABI.simpleDecode = function (method, data) {
  var sig = parseSignature(method); // FIXME: validate/convert arguments

  if (!sig.retargs) {
    throw new Error('No return values in method');
  }

  return ABI.rawDecode(sig.retargs, data);
};

function stringify(type, value) {
  if (type.startsWith('address') || type.startsWith('bytes')) {
    return '0x' + value.toString('hex');
  } else {
    return value.toString();
  }
}

ABI.stringify = function (types, values) {
  var ret = [];

  for (var i in types) {
    var type = types[i];
    var value = values[i]; // if it is an array type, concat the items

    if (/^[^\[]+\[.*\]$/.test(type)) {
      value = value.map(function (item) {
        return stringify(type, item);
      }).join(', ');
    } else {
      value = stringify(type, value);
    }

    ret.push(value);
  }

  return ret;
};

ABI.solidityHexValue = function (type, value, bitsize) {
  // pass in bitsize = null if use default bitsize
  var size, num;

  if (isArray(type)) {
    var subType = type.replace(/\[.*?\]/, '');

    if (!isArray(subType)) {
      var arraySize = parseTypeArray(type);

      if (arraySize !== 'dynamic' && arraySize !== 0 && value.length > arraySize) {
        throw new Error('Elements exceed array size: ' + arraySize);
      }
    }

    var arrayValues = value.map(function (v) {
      return ABI.solidityHexValue(subType, v, 256);
    });
    return Buffer.concat(arrayValues);
  } else if (type === 'bytes') {
    return value;
  } else if (type === 'string') {
    return Buffer.from(value, 'utf8');
  } else if (type === 'bool') {
    bitsize = bitsize || 8;
    var padding = Array(bitsize / 4).join('0');
    return Buffer.from(value ? padding + '1' : padding + '0', 'hex');
  } else if (type === 'address') {
    var bytesize = 20;

    if (bitsize) {
      bytesize = bitsize / 8;
    }

    return utils.setLengthLeft(value, bytesize);
  } else if (type.startsWith('bytes')) {
    size = parseTypeN(type);

    if (size < 1 || size > 32) {
      throw new Error('Invalid bytes<N> width: ' + size);
    }

    return utils.setLengthRight(value, size);
  } else if (type.startsWith('uint')) {
    size = parseTypeN(type);

    if (size % 8 || size < 8 || size > 256) {
      throw new Error('Invalid uint<N> width: ' + size);
    }

    num = parseNumber(value);

    if (num.bitLength() > size) {
      throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
    }

    bitsize = bitsize || size;
    return num.toArrayLike(Buffer, 'be', bitsize / 8);
  } else if (type.startsWith('int')) {
    size = parseTypeN(type);

    if (size % 8 || size < 8 || size > 256) {
      throw new Error('Invalid int<N> width: ' + size);
    }

    num = parseNumber(value);

    if (num.bitLength() > size) {
      throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
    }

    bitsize = bitsize || size;
    return num.toTwos(size).toArrayLike(Buffer, 'be', bitsize / 8);
  } else {
    // FIXME: support all other types
    throw new Error('Unsupported or invalid type: ' + type);
  }
};

ABI.solidityPack = function (types, values) {
  if (types.length !== values.length) {
    throw new Error('Number of types are not matching the values');
  }

  var ret = [];

  for (var i = 0; i < types.length; i++) {
    var type = elementaryName(types[i]);
    var value = values[i];
    ret.push(ABI.solidityHexValue(type, value, null));
  }

  return Buffer.concat(ret);
};

ABI.soliditySHA3 = function (types, values) {
  return utils.keccak256(ABI.solidityPack(types, values));
};

ABI.soliditySHA256 = function (types, values) {
  return utils.sha256(ABI.solidityPack(types, values));
};

ABI.solidityRIPEMD160 = function (types, values) {
  return utils.ripemd160(ABI.solidityPack(types, values), true);
}; // Serpent's users are familiar with this encoding
// - s: string
// - b: bytes
// - b<N>: bytes<N>
// - i: int256
// - a: int256[]


function isNumeric(c) {
  // FIXME: is this correct? Seems to work
  return c >= '0' && c <= '9';
} // For a "documentation" refer to https://github.com/ethereum/serpent/blob/develop/preprocess.cpp


ABI.fromSerpent = function (sig) {
  var ret = [];

  for (var i = 0; i < sig.length; i++) {
    var type = sig[i];

    if (type === 's') {
      ret.push('bytes');
    } else if (type === 'b') {
      var tmp = 'bytes';
      var j = i + 1;

      while (j < sig.length && isNumeric(sig[j])) {
        tmp += sig[j] - '0';
        j++;
      }

      i = j - 1;
      ret.push(tmp);
    } else if (type === 'i') {
      ret.push('int256');
    } else if (type === 'a') {
      ret.push('int256[]');
    } else {
      throw new Error('Unsupported or invalid type: ' + type);
    }
  }

  return ret;
};

ABI.toSerpent = function (types) {
  var ret = [];

  for (var i = 0; i < types.length; i++) {
    var type = types[i];

    if (type === 'bytes') {
      ret.push('s');
    } else if (type.startsWith('bytes')) {
      ret.push('b' + parseTypeN(type));
    } else if (type === 'int256') {
      ret.push('i');
    } else if (type === 'int256[]') {
      ret.push('a');
    } else {
      throw new Error('Unsupported or invalid type: ' + type);
    }
  }

  return ret.join('');
};

module.exports = ABI;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/account.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/account.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importPublic = exports.privateToPublic = exports.privateToAddress = exports.publicToAddress = exports.pubToAddress = exports.isValidPublic = exports.isValidPrivate = exports.isPrecompiled = exports.generateAddress2 = exports.generateAddress = exports.isValidChecksumAddress = exports.toChecksumAddress = exports.isZeroAddress = exports.isValidAddress = exports.zeroAddress = void 0;

var assert = __webpack_require__(/*! assert */ "./node_modules/assert/assert.js");

var ethjsUtil = __webpack_require__(/*! ethjs-util */ "./node_modules/ethjs-util/lib/index.js");

var secp256k1 = __webpack_require__(/*! ./secp256k1v3-adapter */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/secp256k1v3-adapter.js");

var BN = __webpack_require__(/*! bn.js */ "./node_modules/@walletconnect/web3-provider/node_modules/bn.js/lib/bn.js");

var bytes_1 = __webpack_require__(/*! ./bytes */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/bytes.js");

var hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/hash.js");
/**
 * Returns a zero address.
 */


exports.zeroAddress = function () {
  var addressLength = 20;
  var addr = bytes_1.zeros(addressLength);
  return bytes_1.bufferToHex(addr);
};
/**
 * Checks if the address is a valid. Accepts checksummed addresses too.
 */


exports.isValidAddress = function (address) {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
};
/**
 * Checks if a given address is a zero address.
 */


exports.isZeroAddress = function (address) {
  var zeroAddr = exports.zeroAddress();
  return zeroAddr === bytes_1.addHexPrefix(address);
};
/**
 * Returns a checksummed address.
 *
 * If a eip1191ChainId is provided, the chainId will be included in the checksum calculation. This
 * has the effect of checksummed addresses for one chain having invalid checksums for others.
 * For more details, consult EIP-1191.
 *
 * WARNING: Checksums with and without the chainId will differ. As of 2019-06-26, the most commonly
 * used variation in Ethereum was without the chainId. This may change in the future.
 */


exports.toChecksumAddress = function (address, eip1191ChainId) {
  address = ethjsUtil.stripHexPrefix(address).toLowerCase();
  var prefix = eip1191ChainId !== undefined ? eip1191ChainId.toString() + '0x' : '';
  var hash = hash_1.keccak(prefix + address).toString('hex');
  var ret = '0x';

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
};
/**
 * Checks if the address is a valid checksummed address.
 *
 * See toChecksumAddress' documentation for details about the eip1191ChainId parameter.
 */


exports.isValidChecksumAddress = function (address, eip1191ChainId) {
  return exports.isValidAddress(address) && exports.toChecksumAddress(address, eip1191ChainId) === address;
};
/**
 * Generates an address of a newly created contract.
 * @param from The address which is creating this new address
 * @param nonce The nonce of the from account
 */


exports.generateAddress = function (from, nonce) {
  from = bytes_1.toBuffer(from);
  var nonceBN = new BN(nonce);

  if (nonceBN.isZero()) {
    // in RLP we want to encode null in the case of zero nonce
    // read the RLP documentation for an answer if you dare
    return hash_1.rlphash([from, null]).slice(-20);
  } // Only take the lower 160bits of the hash


  return hash_1.rlphash([from, Buffer.from(nonceBN.toArray())]).slice(-20);
};
/**
 * Generates an address for a contract created using CREATE2.
 * @param from The address which is creating this new address
 * @param salt A salt
 * @param initCode The init code of the contract being created
 */


exports.generateAddress2 = function (from, salt, initCode) {
  var fromBuf = bytes_1.toBuffer(from);
  var saltBuf = bytes_1.toBuffer(salt);
  var initCodeBuf = bytes_1.toBuffer(initCode);
  assert(fromBuf.length === 20);
  assert(saltBuf.length === 32);
  var address = hash_1.keccak256(Buffer.concat([Buffer.from('ff', 'hex'), fromBuf, saltBuf, hash_1.keccak256(initCodeBuf)]));
  return address.slice(-20);
};
/**
 * Returns true if the supplied address belongs to a precompiled account (Byzantium).
 */


exports.isPrecompiled = function (address) {
  var a = bytes_1.unpad(address);
  return a.length === 1 && a[0] >= 1 && a[0] <= 8;
};
/**
 * Checks if the private key satisfies the rules of the curve secp256k1.
 */


exports.isValidPrivate = function (privateKey) {
  return secp256k1.privateKeyVerify(privateKey);
};
/**
 * Checks if the public key satisfies the rules of the curve secp256k1
 * and the requirements of Ethereum.
 * @param publicKey The two points of an uncompressed key, unless sanitize is enabled
 * @param sanitize Accept public keys in other formats
 */


exports.isValidPublic = function (publicKey, sanitize) {
  if (sanitize === void 0) {
    sanitize = false;
  }

  if (publicKey.length === 64) {
    // Convert to SEC1 for secp256k1
    return secp256k1.publicKeyVerify(Buffer.concat([Buffer.from([4]), publicKey]));
  }

  if (!sanitize) {
    return false;
  }

  return secp256k1.publicKeyVerify(publicKey);
};
/**
 * Returns the ethereum address of a given public key.
 * Accepts "Ethereum public keys" and SEC1 encoded keys.
 * @param pubKey The two points of an uncompressed key, unless sanitize is enabled
 * @param sanitize Accept public keys in other formats
 */


exports.pubToAddress = function (pubKey, sanitize) {
  if (sanitize === void 0) {
    sanitize = false;
  }

  pubKey = bytes_1.toBuffer(pubKey);

  if (sanitize && pubKey.length !== 64) {
    pubKey = secp256k1.publicKeyConvert(pubKey, false).slice(1);
  }

  assert(pubKey.length === 64); // Only take the lower 160bits of the hash

  return hash_1.keccak(pubKey).slice(-20);
};

exports.publicToAddress = exports.pubToAddress;
/**
 * Returns the ethereum address of a given private key.
 * @param privateKey A private key must be 256 bits wide
 */

exports.privateToAddress = function (privateKey) {
  return exports.publicToAddress(exports.privateToPublic(privateKey));
};
/**
 * Returns the ethereum public key of a given private key.
 * @param privateKey A private key must be 256 bits wide
 */


exports.privateToPublic = function (privateKey) {
  privateKey = bytes_1.toBuffer(privateKey); // skip the type flag and use the X, Y points

  return secp256k1.publicKeyCreate(privateKey, false).slice(1);
};
/**
 * Converts a public key to the Ethereum format.
 */


exports.importPublic = function (publicKey) {
  publicKey = bytes_1.toBuffer(publicKey);

  if (publicKey.length !== 64) {
    publicKey = secp256k1.publicKeyConvert(publicKey, false).slice(1);
  }

  return publicKey;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/bytes.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/bytes.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baToJSON = exports.addHexPrefix = exports.toUnsigned = exports.fromSigned = exports.bufferToHex = exports.bufferToInt = exports.toBuffer = exports.stripZeros = exports.unpad = exports.setLengthRight = exports.setLength = exports.setLengthLeft = exports.zeros = void 0;

var ethjsUtil = __webpack_require__(/*! ethjs-util */ "./node_modules/ethjs-util/lib/index.js");

var BN = __webpack_require__(/*! bn.js */ "./node_modules/@walletconnect/web3-provider/node_modules/bn.js/lib/bn.js");
/**
 * Returns a buffer filled with 0s.
 * @param bytes the number of bytes the buffer should be
 */


exports.zeros = function (bytes) {
  return Buffer.allocUnsafe(bytes).fill(0);
};
/**
 * Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param msg the value to pad (Buffer|Array)
 * @param length the number of bytes the output should be
 * @param right whether to start padding form the left or right
 * @return (Buffer|Array)
 */


exports.setLengthLeft = function (msg, length, right) {
  if (right === void 0) {
    right = false;
  }

  var buf = exports.zeros(length);
  msg = exports.toBuffer(msg);

  if (right) {
    if (msg.length < length) {
      msg.copy(buf);
      return buf;
    }

    return msg.slice(0, length);
  } else {
    if (msg.length < length) {
      msg.copy(buf, length - msg.length);
      return buf;
    }

    return msg.slice(-length);
  }
};

exports.setLength = exports.setLengthLeft;
/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param msg the value to pad (Buffer|Array)
 * @param length the number of bytes the output should be
 * @return (Buffer|Array)
 */

exports.setLengthRight = function (msg, length) {
  return exports.setLength(msg, length, true);
};
/**
 * Trims leading zeros from a `Buffer` or an `Array`.
 * @param a (Buffer|Array|String)
 * @return (Buffer|Array|String)
 */


exports.unpad = function (a) {
  a = ethjsUtil.stripHexPrefix(a);
  var first = a[0];

  while (a.length > 0 && first.toString() === '0') {
    a = a.slice(1);
    first = a[0];
  }

  return a;
};

exports.stripZeros = exports.unpad;
/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.
 * @param v the value
 */

exports.toBuffer = function (v) {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v);
    } else if (typeof v === 'string') {
      if (ethjsUtil.isHexString(v)) {
        v = Buffer.from(ethjsUtil.padToEven(ethjsUtil.stripHexPrefix(v)), 'hex');
      } else {
        throw new Error("Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: " + v);
      }
    } else if (typeof v === 'number') {
      v = ethjsUtil.intToBuffer(v);
    } else if (v === null || v === undefined) {
      v = Buffer.allocUnsafe(0);
    } else if (BN.isBN(v)) {
      v = v.toArrayLike(Buffer);
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = Buffer.from(v.toArray());
    } else {
      throw new Error('invalid type');
    }
  }

  return v;
};
/**
 * Converts a `Buffer` to a `Number`.
 * @param buf `Buffer` object to convert
 * @throws If the input number exceeds 53 bits.
 */


exports.bufferToInt = function (buf) {
  return new BN(exports.toBuffer(buf)).toNumber();
};
/**
 * Converts a `Buffer` into a `0x`-prefixed hex `String`.
 * @param buf `Buffer` object to convert
 */


exports.bufferToHex = function (buf) {
  buf = exports.toBuffer(buf);
  return '0x' + buf.toString('hex');
};
/**
 * Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.
 * @param num Signed integer value
 */


exports.fromSigned = function (num) {
  return new BN(num).fromTwos(256);
};
/**
 * Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.
 * @param num
 */


exports.toUnsigned = function (num) {
  return Buffer.from(num.toTwos(256).toArray());
};
/**
 * Adds "0x" to a given `String` if it does not already start with "0x".
 */


exports.addHexPrefix = function (str) {
  if (typeof str !== 'string') {
    return str;
  }

  return ethjsUtil.isHexPrefixed(str) ? str : '0x' + str;
};
/**
 * Converts a `Buffer` or `Array` to JSON.
 * @param ba (Buffer|Array)
 * @return (Array|String|null)
 */


exports.baToJSON = function (ba) {
  if (Buffer.isBuffer(ba)) {
    return "0x" + ba.toString('hex');
  } else if (ba instanceof Array) {
    var array = [];

    for (var i = 0; i < ba.length; i++) {
      array.push(exports.baToJSON(ba[i]));
    }

    return array;
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/constants.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/constants.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KECCAK256_RLP = exports.KECCAK256_RLP_S = exports.KECCAK256_RLP_ARRAY = exports.KECCAK256_RLP_ARRAY_S = exports.KECCAK256_NULL = exports.KECCAK256_NULL_S = exports.TWO_POW256 = exports.MAX_INTEGER = void 0;

var BN = __webpack_require__(/*! bn.js */ "./node_modules/@walletconnect/web3-provider/node_modules/bn.js/lib/bn.js");
/**
 * The max integer that this VM can handle
 */


exports.MAX_INTEGER = new BN('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16);
/**
 * 2^256
 */

exports.TWO_POW256 = new BN('10000000000000000000000000000000000000000000000000000000000000000', 16);
/**
 * Keccak-256 hash of null
 */

exports.KECCAK256_NULL_S = 'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
/**
 * Keccak-256 hash of null
 */

exports.KECCAK256_NULL = Buffer.from(exports.KECCAK256_NULL_S, 'hex');
/**
 * Keccak-256 of an RLP of an empty array
 */

exports.KECCAK256_RLP_ARRAY_S = '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347';
/**
 * Keccak-256 of an RLP of an empty array
 */

exports.KECCAK256_RLP_ARRAY = Buffer.from(exports.KECCAK256_RLP_ARRAY_S, 'hex');
/**
 * Keccak-256 hash of the RLP of null
 */

exports.KECCAK256_RLP_S = '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421';
/**
 * Keccak-256 hash of the RLP of null
 */

exports.KECCAK256_RLP = Buffer.from(exports.KECCAK256_RLP_S, 'hex');
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/hash.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/hash.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rlphash = exports.ripemd160 = exports.sha256 = exports.keccak256 = exports.keccak = void 0;

var _a = __webpack_require__(/*! ethereum-cryptography/keccak */ "./node_modules/ethereum-cryptography/keccak.js"),
    keccak224 = _a.keccak224,
    keccak384 = _a.keccak384,
    k256 = _a.keccak256,
    keccak512 = _a.keccak512;

var createHash = __webpack_require__(/*! create-hash */ "./node_modules/create-hash/browser.js");

var ethjsUtil = __webpack_require__(/*! ethjs-util */ "./node_modules/ethjs-util/lib/index.js");

var rlp = __webpack_require__(/*! rlp */ "./node_modules/rlp/dist/index.js");

var bytes_1 = __webpack_require__(/*! ./bytes */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/bytes.js");
/**
 * Creates Keccak hash of the input
 * @param a The input data (Buffer|Array|String|Number) If the string is a 0x-prefixed hex value
 * it's interpreted as hexadecimal, otherwise as utf8.
 * @param bits The Keccak width
 */


exports.keccak = function (a, bits) {
  if (bits === void 0) {
    bits = 256;
  }

  if (typeof a === 'string' && !ethjsUtil.isHexString(a)) {
    a = Buffer.from(a, 'utf8');
  } else {
    a = bytes_1.toBuffer(a);
  }

  if (!bits) bits = 256;

  switch (bits) {
    case 224:
      {
        return keccak224(a);
      }

    case 256:
      {
        return k256(a);
      }

    case 384:
      {
        return keccak384(a);
      }

    case 512:
      {
        return keccak512(a);
      }

    default:
      {
        throw new Error("Invald algorithm: keccak" + bits);
      }
  }
};
/**
 * Creates Keccak-256 hash of the input, alias for keccak(a, 256).
 * @param a The input data (Buffer|Array|String|Number)
 */


exports.keccak256 = function (a) {
  return exports.keccak(a);
};
/**
 * Creates SHA256 hash of the input.
 * @param a The input data (Buffer|Array|String|Number)
 */


exports.sha256 = function (a) {
  a = bytes_1.toBuffer(a);
  return createHash('sha256').update(a).digest();
};
/**
 * Creates RIPEMD160 hash of the input.
 * @param a The input data (Buffer|Array|String|Number)
 * @param padded Whether it should be padded to 256 bits or not
 */


exports.ripemd160 = function (a, padded) {
  a = bytes_1.toBuffer(a);
  var hash = createHash('rmd160').update(a).digest();

  if (padded === true) {
    return bytes_1.setLength(hash, 32);
  } else {
    return hash;
  }
};
/**
 * Creates SHA-3 hash of the RLP encoded version of the input.
 * @param a The input data
 */


exports.rlphash = function (a) {
  return exports.keccak(rlp.encode(a));
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/index.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/index.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secp256k1 = exports.rlp = exports.BN = void 0;

var secp256k1 = __webpack_require__(/*! ./secp256k1v3-adapter */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/secp256k1v3-adapter.js");

exports.secp256k1 = secp256k1;

var ethjsUtil = __webpack_require__(/*! ethjs-util */ "./node_modules/ethjs-util/lib/index.js");

var BN = __webpack_require__(/*! bn.js */ "./node_modules/@walletconnect/web3-provider/node_modules/bn.js/lib/bn.js");

exports.BN = BN;

var rlp = __webpack_require__(/*! rlp */ "./node_modules/rlp/dist/index.js");

exports.rlp = rlp;
Object.assign(exports, ethjsUtil);
/**
 * Constants
 */

__exportStar(__webpack_require__(/*! ./constants */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/constants.js"), exports);
/**
 * Public-key cryptography (secp256k1) and addresses
 */


__exportStar(__webpack_require__(/*! ./account */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/account.js"), exports);
/**
 * Hash functions
 */


__exportStar(__webpack_require__(/*! ./hash */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/hash.js"), exports);
/**
 * ECDSA signature
 */


__exportStar(__webpack_require__(/*! ./signature */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/signature.js"), exports);
/**
 * Utilities for manipulating Buffers, byte arrays, etc.
 */


__exportStar(__webpack_require__(/*! ./bytes */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/bytes.js"), exports);
/**
 * Function for definining properties on an object
 */


__exportStar(__webpack_require__(/*! ./object */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/object.js"), exports);

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/object.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/object.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineProperties = void 0;

var assert = __webpack_require__(/*! assert */ "./node_modules/assert/assert.js");

var ethjsUtil = __webpack_require__(/*! ethjs-util */ "./node_modules/ethjs-util/lib/index.js");

var rlp = __webpack_require__(/*! rlp */ "./node_modules/rlp/dist/index.js");

var bytes_1 = __webpack_require__(/*! ./bytes */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/bytes.js");
/**
 * Defines properties on a `Object`. It make the assumption that underlying data is binary.
 * @param self the `Object` to define properties on
 * @param fields an array fields to define. Fields can contain:
 * * `name` - the name of the properties
 * * `length` - the number of bytes the field can have
 * * `allowLess` - if the field can be less than the length
 * * `allowEmpty`
 * @param data data to be validated against the definitions
 * @deprecated
 */


exports.defineProperties = function (self, fields, data) {
  self.raw = [];
  self._fields = []; // attach the `toJSON`

  self.toJSON = function (label) {
    if (label === void 0) {
      label = false;
    }

    if (label) {
      var obj_1 = {};

      self._fields.forEach(function (field) {
        obj_1[field] = "0x" + self[field].toString('hex');
      });

      return obj_1;
    }

    return bytes_1.baToJSON(self.raw);
  };

  self.serialize = function serialize() {
    return rlp.encode(self.raw);
  };

  fields.forEach(function (field, i) {
    self._fields.push(field.name);

    function getter() {
      return self.raw[i];
    }

    function setter(v) {
      v = bytes_1.toBuffer(v);

      if (v.toString('hex') === '00' && !field.allowZero) {
        v = Buffer.allocUnsafe(0);
      }

      if (field.allowLess && field.length) {
        v = bytes_1.stripZeros(v);
        assert(field.length >= v.length, "The field " + field.name + " must not have more " + field.length + " bytes");
      } else if (!(field.allowZero && v.length === 0) && field.length) {
        assert(field.length === v.length, "The field " + field.name + " must have byte length of " + field.length);
      }

      self.raw[i] = v;
    }

    Object.defineProperty(self, field.name, {
      enumerable: true,
      configurable: true,
      get: getter,
      set: setter
    });

    if (field.default) {
      self[field.name] = field.default;
    } // attach alias


    if (field.alias) {
      Object.defineProperty(self, field.alias, {
        enumerable: false,
        configurable: true,
        set: setter,
        get: getter
      });
    }
  }); // if the constuctor is passed data

  if (data) {
    if (typeof data === 'string') {
      data = Buffer.from(ethjsUtil.stripHexPrefix(data), 'hex');
    }

    if (Buffer.isBuffer(data)) {
      data = rlp.decode(data);
    }

    if (Array.isArray(data)) {
      if (data.length > self._fields.length) {
        throw new Error('wrong number of fields in data');
      } // make sure all the items are buffers


      data.forEach(function (d, i) {
        self[self._fields[i]] = bytes_1.toBuffer(d);
      });
    } else if (typeof data === 'object') {
      var keys_1 = Object.keys(data);
      fields.forEach(function (field) {
        if (keys_1.indexOf(field.name) !== -1) self[field.name] = data[field.name];
        if (keys_1.indexOf(field.alias) !== -1) self[field.alias] = data[field.alias];
      });
    } else {
      throw new Error('invalid data');
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/secp256k1v3-adapter.js":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/secp256k1v3-adapter.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ecdhUnsafe = exports.ecdh = exports.recover = exports.verify = exports.sign = exports.signatureImportLax = exports.signatureImport = exports.signatureExport = exports.signatureNormalize = exports.publicKeyCombine = exports.publicKeyTweakMul = exports.publicKeyTweakAdd = exports.publicKeyVerify = exports.publicKeyConvert = exports.publicKeyCreate = exports.privateKeyTweakMul = exports.privateKeyTweakAdd = exports.privateKeyModInverse = exports.privateKeyNegate = exports.privateKeyImport = exports.privateKeyExport = exports.privateKeyVerify = void 0;

var secp256k1 = __webpack_require__(/*! ethereum-cryptography/secp256k1 */ "./node_modules/ethereum-cryptography/secp256k1.js");

var secp256k1v3 = __webpack_require__(/*! ./secp256k1v3-lib/index */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/secp256k1v3-lib/index.js");

var der = __webpack_require__(/*! ./secp256k1v3-lib/der */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/secp256k1v3-lib/der.js");
/**
 * Verify an ECDSA privateKey
 * @method privateKeyVerify
 * @param {Buffer} privateKey
 * @return {boolean}
 */


exports.privateKeyVerify = function (privateKey) {
  // secp256k1 v4 version throws when privateKey length is not 32
  if (privateKey.length !== 32) {
    return false;
  }

  return secp256k1.privateKeyVerify(Uint8Array.from(privateKey));
};
/**
 * Export a privateKey in DER format
 * @method privateKeyExport
 * @param {Buffer} privateKey
 * @param {boolean} compressed
 * @return {boolean}
 */


exports.privateKeyExport = function (privateKey, compressed) {
  // secp256k1 v4 version throws when privateKey length is not 32
  if (privateKey.length !== 32) {
    throw new RangeError('private key length is invalid');
  }

  var publicKey = secp256k1v3.privateKeyExport(privateKey, compressed);
  return der.privateKeyExport(privateKey, publicKey, compressed);
};
/**
 * Import a privateKey in DER format
 * @method privateKeyImport
 * @param {Buffer} privateKey
 * @return {Buffer}
 */


exports.privateKeyImport = function (privateKey) {
  // privateKeyImport method is not part of secp256k1 v4 package
  // this implementation is based on v3
  privateKey = der.privateKeyImport(privateKey);

  if (privateKey !== null && privateKey.length === 32 && exports.privateKeyVerify(privateKey)) {
    return privateKey;
  }

  throw new Error("couldn't import from DER format");
};
/**
 * Negate a privateKey by subtracting it from the order of the curve's base point
 * @method privateKeyNegate
 * @param {Buffer} privateKey
 * @return {Buffer}
 */


exports.privateKeyNegate = function (privateKey) {
  return Buffer.from(secp256k1.privateKeyNegate(Uint8Array.from(privateKey)));
};
/**
 * Compute the inverse of a privateKey (modulo the order of the curve's base point).
 * @method privateKeyModInverse
 * @param {Buffer} privateKey
 * @return {Buffer}
 */


exports.privateKeyModInverse = function (privateKey) {
  if (privateKey.length !== 32) {
    throw new Error('private key length is invalid');
  }

  return Buffer.from(secp256k1v3.privateKeyModInverse(Uint8Array.from(privateKey)));
};
/**
 * Tweak a privateKey by adding tweak to it.
 * @method privateKeyTweakAdd
 * @param {Buffer} privateKey
 * @param {Buffer} tweak
 * @return {Buffer}
 */


exports.privateKeyTweakAdd = function (privateKey, tweak) {
  return Buffer.from(secp256k1.privateKeyTweakAdd(Uint8Array.from(privateKey), tweak));
};
/**
 * Tweak a privateKey by multiplying it by a tweak.
 * @method privateKeyTweakMul
 * @param {Buffer} privateKey
 * @param {Buffer} tweak
 * @return {Buffer}
 */


exports.privateKeyTweakMul = function (privateKey, tweak) {
  return Buffer.from(secp256k1.privateKeyTweakMul(Uint8Array.from(privateKey), Uint8Array.from(tweak)));
};
/**
 * Compute the public key for a privateKey.
 * @method publicKeyCreate
 * @param {Buffer} privateKey
 * @param {boolean} compressed
 * @return {Buffer}
 */


exports.publicKeyCreate = function (privateKey, compressed) {
  return Buffer.from(secp256k1.publicKeyCreate(Uint8Array.from(privateKey), compressed));
};
/**
 * Convert a publicKey to compressed or uncompressed form.
 * @method publicKeyConvert
 * @param {Buffer} publicKey
 * @param {boolean} compressed
 * @return {Buffer}
 */


exports.publicKeyConvert = function (publicKey, compressed) {
  return Buffer.from(secp256k1.publicKeyConvert(Uint8Array.from(publicKey), compressed));
};
/**
 * Verify an ECDSA publicKey.
 * @method publicKeyVerify
 * @param {Buffer} publicKey
 * @return {boolean}
 */


exports.publicKeyVerify = function (publicKey) {
  // secp256k1 v4 version throws when publicKey length is not 33 or 65
  if (publicKey.length !== 33 && publicKey.length !== 65) {
    return false;
  }

  return secp256k1.publicKeyVerify(Uint8Array.from(publicKey));
};
/**
 * Tweak a publicKey by adding tweak times the generator to it.
 * @method publicKeyTweakAdd
 * @param {Buffer} publicKey
 * @param {Buffer} tweak
 * @param {boolean} compressed
 * @return {Buffer}
 */


exports.publicKeyTweakAdd = function (publicKey, tweak, compressed) {
  return Buffer.from(secp256k1.publicKeyTweakAdd(Uint8Array.from(publicKey), Uint8Array.from(tweak), compressed));
};
/**
 * Tweak a publicKey by multiplying it by a tweak value
 * @method publicKeyTweakMul
 * @param {Buffer} publicKey
 * @param {Buffer} tweak
 * @param {boolean} compressed
 * @return {Buffer}
 */


exports.publicKeyTweakMul = function (publicKey, tweak, compressed) {
  return Buffer.from(secp256k1.publicKeyTweakMul(Uint8Array.from(publicKey), Uint8Array.from(tweak), compressed));
};
/**
 * Add a given publicKeys together.
 * @method publicKeyCombine
 * @param {Array<Buffer>} publicKeys
 * @param {boolean} compressed
 * @return {Buffer}
 */


exports.publicKeyCombine = function (publicKeys, compressed) {
  var keys = [];
  publicKeys.forEach(function (publicKey) {
    keys.push(Uint8Array.from(publicKey));
  });
  return Buffer.from(secp256k1.publicKeyCombine(keys, compressed));
};
/**
 * Convert a signature to a normalized lower-S form.
 * @method signatureNormalize
 * @param {Buffer} signature
 * @return {Buffer}
 */


exports.signatureNormalize = function (signature) {
  return Buffer.from(secp256k1.signatureNormalize(Uint8Array.from(signature)));
};
/**
 * Serialize an ECDSA signature in DER format.
 * @method signatureExport
 * @param {Buffer} signature
 * @return {Buffer}
 */


exports.signatureExport = function (signature) {
  return Buffer.from(secp256k1.signatureExport(Uint8Array.from(signature)));
};
/**
 * Parse a DER ECDSA signature (follow by [BIP66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki)).
 * @method signatureImport
 * @param {Buffer} signature
 * @return {Buffer}
 */


exports.signatureImport = function (signature) {
  return Buffer.from(secp256k1.signatureImport(Uint8Array.from(signature)));
};
/**
 * Parse a DER ECDSA signature (not follow by [BIP66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki)).
 * @method signatureImportLax
 * @param {Buffer} signature
 * @return {Buffer}
 */


exports.signatureImportLax = function (signature) {
  // signatureImportLax method is not part of secp256k1 v4 package
  // this implementation is based on v3
  // ensure that signature is greater than 0
  if (signature.length === 0) {
    throw new RangeError('signature length is invalid');
  }

  var sigObj = der.signatureImportLax(signature);

  if (sigObj === null) {
    throw new Error("couldn't parse DER signature");
  }

  return secp256k1v3.signatureImport(sigObj);
};
/**
 * Create an ECDSA signature. Always return low-S signature.
 * @method sign
 * @param {Buffer} message
 * @param {Buffer} privateKey
 * @param {Object} options
 * @return {Buffer}
 */


exports.sign = function (message, privateKey, options) {
  if (options === null) {
    throw new TypeError('options should be an Object');
  }

  var signOptions = undefined;

  if (options) {
    signOptions = {};

    if (options.data === null) {
      // validate option.data length
      throw new TypeError('options.data should be a Buffer');
    }

    if (options.data) {
      if (options.data.length != 32) {
        throw new RangeError('options.data length is invalid');
      }

      signOptions.data = new Uint8Array(options.data);
    }

    if (options.noncefn === null) {
      throw new TypeError('options.noncefn should be a Function');
    }

    if (options.noncefn) {
      // convert option.noncefn function signature
      signOptions.noncefn = function (message, privateKey, algo, data, attempt) {
        var bufferAlgo = algo != null ? Buffer.from(algo) : null;
        var bufferData = data != null ? Buffer.from(data) : null;
        var buffer = Buffer.from('');

        if (options.noncefn) {
          buffer = options.noncefn(Buffer.from(message), Buffer.from(privateKey), bufferAlgo, bufferData, attempt);
        }

        return new Uint8Array(buffer);
      };
    }
  }

  var sig = secp256k1.ecdsaSign(Uint8Array.from(message), Uint8Array.from(privateKey), signOptions);
  return {
    signature: Buffer.from(sig.signature),
    recovery: sig.recid
  };
};
/**
 * Verify an ECDSA signature.
 * @method verify
 * @param {Buffer} message
 * @param {Buffer} signature
 * @param {Buffer} publicKey
 * @return {boolean}
 */


exports.verify = function (message, signature, publicKey) {
  return secp256k1.ecdsaVerify(Uint8Array.from(signature), Uint8Array.from(message), publicKey);
};
/**
 * Recover an ECDSA public key from a signature.
 * @method recover
 * @param {Buffer} message
 * @param {Buffer} signature
 * @param {Number} recid
 * @param {boolean} compressed
 * @return {Buffer}
 */


exports.recover = function (message, signature, recid, compressed) {
  return Buffer.from(secp256k1.ecdsaRecover(Uint8Array.from(signature), recid, Uint8Array.from(message), compressed));
};
/**
 * Compute an EC Diffie-Hellman secret and applied sha256 to compressed public key.
 * @method ecdh
 * @param {Buffer} publicKey
 * @param {Buffer} privateKey
 * @return {Buffer}
 */


exports.ecdh = function (publicKey, privateKey) {
  // note: secp256k1 v3 doesn't allow optional parameter
  return Buffer.from(secp256k1.ecdh(Uint8Array.from(publicKey), Uint8Array.from(privateKey), {}));
};

exports.ecdhUnsafe = function (publicKey, privateKey, compressed) {
  // ecdhUnsafe method is not part of secp256k1 v4 package
  // this implementation is based on v3
  // ensure valid publicKey length
  if (publicKey.length !== 33 && publicKey.length !== 65) {
    throw new RangeError('public key length is invalid');
  } // ensure valid privateKey length


  if (privateKey.length !== 32) {
    throw new RangeError('private key length is invalid');
  }

  return Buffer.from(secp256k1v3.ecdhUnsafe(Uint8Array.from(publicKey), Uint8Array.from(privateKey), compressed));
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/secp256k1v3-lib/der.js":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/secp256k1v3-lib/der.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) { // This file is imported from secp256k1 v3
// https://github.com/cryptocoinjs/secp256k1-node/blob/master/LICENSE

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EC_PRIVKEY_EXPORT_DER_COMPRESSED = Buffer.from([// begin
0x30, 0x81, 0xd3, 0x02, 0x01, 0x01, 0x04, 0x20, // private key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // middle
0xa0, 0x81, 0x85, 0x30, 0x81, 0x82, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04, 0x21, 0x02, 0x79, 0xbe, 0x66, 0x7e, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xce, 0x87, 0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xce, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8, 0x17, 0x98, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xba, 0xae, 0xdc, 0xe6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5e, 0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x24, 0x03, 0x22, 0x00, // public key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
var EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED = Buffer.from([// begin
0x30, 0x82, 0x01, 0x13, 0x02, 0x01, 0x01, 0x04, 0x20, // private key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // middle
0xa0, 0x81, 0xa5, 0x30, 0x81, 0xa2, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04, 0x41, 0x04, 0x79, 0xbe, 0x66, 0x7e, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xce, 0x87, 0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xce, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8, 0x17, 0x98, 0x48, 0x3a, 0xda, 0x77, 0x26, 0xa3, 0xc4, 0x65, 0x5d, 0xa4, 0xfb, 0xfc, 0x0e, 0x11, 0x08, 0xa8, 0xfd, 0x17, 0xb4, 0x48, 0xa6, 0x85, 0x54, 0x19, 0x9c, 0x47, 0xd0, 0x8f, 0xfb, 0x10, 0xd4, 0xb8, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xba, 0xae, 0xdc, 0xe6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5e, 0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x44, 0x03, 0x42, 0x00, // public key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

exports.privateKeyExport = function (privateKey, publicKey, compressed) {
  if (compressed === void 0) {
    compressed = true;
  }

  var result = Buffer.from(compressed ? EC_PRIVKEY_EXPORT_DER_COMPRESSED : EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED);
  privateKey.copy(result, compressed ? 8 : 9);
  publicKey.copy(result, compressed ? 181 : 214);
  return result;
};

exports.privateKeyImport = function (privateKey) {
  var length = privateKey.length; // sequence header

  var index = 0;
  if (length < index + 1 || privateKey[index] !== 0x30) return null;
  index += 1; // sequence length constructor

  if (length < index + 1 || !(privateKey[index] & 0x80)) return null;
  var lenb = privateKey[index] & 0x7f;
  index += 1;
  if (lenb < 1 || lenb > 2) return null;
  if (length < index + lenb) return null; // sequence length

  var len = privateKey[index + lenb - 1] | (lenb > 1 ? privateKey[index + lenb - 2] << 8 : 0);
  index += lenb;
  if (length < index + len) return null; // sequence element 0: version number (=1)

  if (length < index + 3 || privateKey[index] !== 0x02 || privateKey[index + 1] !== 0x01 || privateKey[index + 2] !== 0x01) {
    return null;
  }

  index += 3; // sequence element 1: octet string, up to 32 bytes

  if (length < index + 2 || privateKey[index] !== 0x04 || privateKey[index + 1] > 0x20 || length < index + 2 + privateKey[index + 1]) {
    return null;
  }

  return privateKey.slice(index + 2, index + 2 + privateKey[index + 1]);
};

exports.signatureImportLax = function (signature) {
  var r = Buffer.alloc(32, 0);
  var s = Buffer.alloc(32, 0);
  var length = signature.length;
  var index = 0; // sequence tag byte

  if (signature[index++] !== 0x30) {
    return null;
  } // sequence length byte


  var lenbyte = signature[index++];

  if (lenbyte & 0x80) {
    index += lenbyte - 0x80;

    if (index > length) {
      return null;
    }
  } // sequence tag byte for r


  if (signature[index++] !== 0x02) {
    return null;
  } // length for r


  var rlen = signature[index++];

  if (rlen & 0x80) {
    lenbyte = rlen - 0x80;

    if (index + lenbyte > length) {
      return null;
    }

    for (; lenbyte > 0 && signature[index] === 0x00; index += 1, lenbyte -= 1);

    for (rlen = 0; lenbyte > 0; index += 1, lenbyte -= 1) rlen = (rlen << 8) + signature[index];
  }

  if (rlen > length - index) {
    return null;
  }

  var rindex = index;
  index += rlen; // sequence tag byte for s

  if (signature[index++] !== 0x02) {
    return null;
  } // length for s


  var slen = signature[index++];

  if (slen & 0x80) {
    lenbyte = slen - 0x80;

    if (index + lenbyte > length) {
      return null;
    }

    for (; lenbyte > 0 && signature[index] === 0x00; index += 1, lenbyte -= 1);

    for (slen = 0; lenbyte > 0; index += 1, lenbyte -= 1) slen = (slen << 8) + signature[index];
  }

  if (slen > length - index) {
    return null;
  }

  var sindex = index;
  index += slen; // ignore leading zeros in r

  for (; rlen > 0 && signature[rindex] === 0x00; rlen -= 1, rindex += 1); // copy r value


  if (rlen > 32) {
    return null;
  }

  var rvalue = signature.slice(rindex, rindex + rlen);
  rvalue.copy(r, 32 - rvalue.length); // ignore leading zeros in s

  for (; slen > 0 && signature[sindex] === 0x00; slen -= 1, sindex += 1); // copy s value


  if (slen > 32) {
    return null;
  }

  var svalue = signature.slice(sindex, sindex + slen);
  svalue.copy(s, 32 - svalue.length);
  return {
    r: r,
    s: s
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/secp256k1v3-lib/index.js":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/secp256k1v3-lib/index.js ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) { // This file is imported from secp256k1 v3
// https://github.com/cryptocoinjs/secp256k1-node/blob/master/LICENSE

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BN = __webpack_require__(/*! bn.js */ "./node_modules/@walletconnect/web3-provider/node_modules/bn.js/lib/bn.js");

var EC = __webpack_require__(/*! elliptic */ "./node_modules/elliptic/lib/elliptic.js").ec;

var ec = new EC('secp256k1');
var ecparams = ec.curve;

exports.privateKeyExport = function (privateKey, compressed) {
  if (compressed === void 0) {
    compressed = true;
  }

  var d = new BN(privateKey);

  if (d.ucmp(ecparams.n) >= 0) {
    throw new Error("couldn't export to DER format");
  }

  var point = ec.g.mul(d);
  return toPublicKey(point.getX(), point.getY(), compressed);
};

exports.privateKeyModInverse = function (privateKey) {
  var bn = new BN(privateKey);

  if (bn.ucmp(ecparams.n) >= 0 || bn.isZero()) {
    throw new Error('private key range is invalid');
  }

  return bn.invm(ecparams.n).toArrayLike(Buffer, 'be', 32);
};

exports.signatureImport = function (sigObj) {
  var r = new BN(sigObj.r);

  if (r.ucmp(ecparams.n) >= 0) {
    r = new BN(0);
  }

  var s = new BN(sigObj.s);

  if (s.ucmp(ecparams.n) >= 0) {
    s = new BN(0);
  }

  return Buffer.concat([r.toArrayLike(Buffer, 'be', 32), s.toArrayLike(Buffer, 'be', 32)]);
};

exports.ecdhUnsafe = function (publicKey, privateKey, compressed) {
  if (compressed === void 0) {
    compressed = true;
  }

  var point = ec.keyFromPublic(publicKey);
  var scalar = new BN(privateKey);

  if (scalar.ucmp(ecparams.n) >= 0 || scalar.isZero()) {
    throw new Error('scalar was invalid (zero or overflow)');
  }

  var shared = point.pub.mul(scalar);
  return toPublicKey(shared.getX(), shared.getY(), compressed);
};

var toPublicKey = function (x, y, compressed) {
  var publicKey;

  if (compressed) {
    publicKey = Buffer.alloc(33);
    publicKey[0] = y.isOdd() ? 0x03 : 0x02;
    x.toArrayLike(Buffer, 'be', 32).copy(publicKey, 1);
  } else {
    publicKey = Buffer.alloc(65);
    publicKey[0] = 0x04;
    x.toArrayLike(Buffer, 'be', 32).copy(publicKey, 1);
    y.toArrayLike(Buffer, 'be', 32).copy(publicKey, 33);
  }

  return publicKey;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/signature.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/signature.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPersonalMessage = exports.isValidSignature = exports.fromRpcSig = exports.toRpcSig = exports.ecrecover = exports.ecsign = void 0;

var secp256k1 = __webpack_require__(/*! ./secp256k1v3-adapter */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/secp256k1v3-adapter.js");

var BN = __webpack_require__(/*! bn.js */ "./node_modules/@walletconnect/web3-provider/node_modules/bn.js/lib/bn.js");

var bytes_1 = __webpack_require__(/*! ./bytes */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/bytes.js");

var hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/@walletconnect/web3-provider/node_modules/ethereumjs-abi/node_modules/ethereumjs-util/dist/hash.js");
/**
 * Returns the ECDSA signature of a message hash.
 */


exports.ecsign = function (msgHash, privateKey, chainId) {
  var sig = secp256k1.sign(msgHash, privateKey);
  var recovery = sig.recovery;
  var ret = {
    r: sig.signature.slice(0, 32),
    s: sig.signature.slice(32, 64),
    v: chainId ? recovery + (chainId * 2 + 35) : recovery + 27
  };
  return ret;
};
/**
 * ECDSA public key recovery from signature.
 * @returns Recovered public key
 */


exports.ecrecover = function (msgHash, v, r, s, chainId) {
  var signature = Buffer.concat([bytes_1.setLength(r, 32), bytes_1.setLength(s, 32)], 64);
  var recovery = calculateSigRecovery(v, chainId);

  if (!isValidSigRecovery(recovery)) {
    throw new Error('Invalid signature v value');
  }

  var senderPubKey = secp256k1.recover(msgHash, signature, recovery);
  return secp256k1.publicKeyConvert(senderPubKey, false).slice(1);
};
/**
 * Convert signature parameters into the format of `eth_sign` RPC method.
 * @returns Signature
 */


exports.toRpcSig = function (v, r, s, chainId) {
  var recovery = calculateSigRecovery(v, chainId);

  if (!isValidSigRecovery(recovery)) {
    throw new Error('Invalid signature v value');
  } // geth (and the RPC eth_sign method) uses the 65 byte format used by Bitcoin


  return bytes_1.bufferToHex(Buffer.concat([bytes_1.setLengthLeft(r, 32), bytes_1.setLengthLeft(s, 32), bytes_1.toBuffer(v)]));
};
/**
 * Convert signature format of the `eth_sign` RPC method to signature parameters
 * NOTE: all because of a bug in geth: https://github.com/ethereum/go-ethereum/issues/2053
 */


exports.fromRpcSig = function (sig) {
  var buf = bytes_1.toBuffer(sig); // NOTE: with potential introduction of chainId this might need to be updated

  if (buf.length !== 65) {
    throw new Error('Invalid signature length');
  }

  var v = buf[64]; // support both versions of `eth_sign` responses

  if (v < 27) {
    v += 27;
  }

  return {
    v: v,
    r: buf.slice(0, 32),
    s: buf.slice(32, 64)
  };
};
/**
 * Validate a ECDSA signature.
 * @param homesteadOrLater Indicates whether this is being used on either the homestead hardfork or a later one
 */


exports.isValidSignature = function (v, r, s, homesteadOrLater, chainId) {
  if (homesteadOrLater === void 0) {
    homesteadOrLater = true;
  }

  var SECP256K1_N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16);
  var SECP256K1_N = new BN('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16);

  if (r.length !== 32 || s.length !== 32) {
    return false;
  }

  if (!isValidSigRecovery(calculateSigRecovery(v, chainId))) {
    return false;
  }

  var rBN = new BN(r);
  var sBN = new BN(s);

  if (rBN.isZero() || rBN.gt(SECP256K1_N) || sBN.isZero() || sBN.gt(SECP256K1_N)) {
    return false;
  }

  if (homesteadOrLater && sBN.cmp(SECP256K1_N_DIV_2) === 1) {
    return false;
  }

  return true;
};
/**
 * Returns the keccak-256 hash of `message`, prefixed with the header used by the `eth_sign` RPC call.
 * The output of this function can be fed into `ecsign` to produce the same signature as the `eth_sign`
 * call for a given `message`, or fed to `ecrecover` along with a signature to recover the public key
 * used to produce the signature.
 */


exports.hashPersonalMessage = function (message) {
  var prefix = Buffer.from("\u0019Ethereum Signed Message:\n" + message.length.toString(), 'utf-8');
  return hash_1.keccak(Buffer.concat([prefix, message]));
};

function calculateSigRecovery(v, chainId) {
  return chainId ? v - (2 * chainId + 35) : v - 27;
}

function isValidSigRecovery(recovery) {
  return recovery === 0 || recovery === 1;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/json-rpc-engine/src/createAsyncMiddleware.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/json-rpc-engine/src/createAsyncMiddleware.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * JsonRpcEngine only accepts callback-based middleware directly.
 * createAsyncMiddleware exists to enable consumers to pass in async middleware
 * functions.
 *
 * Async middleware have no "end" function. Instead, they "end" if they return
 * without calling "next". Rather than passing in explicit return handlers,
 * async middleware can simply await "next", and perform operations on the
 * response object when execution resumes.
 *
 * To accomplish this, createAsyncMiddleware passes the async middleware a
 * wrapped "next" function. That function calls the internal JsonRpcEngine
 * "next" function with a return handler that resolves a promise when called.
 *
 * The return handler will always be called. Its resolution of the promise
 * enables the control flow described above.
 */
module.exports = function createAsyncMiddleware(asyncMiddleware) {
  return (req, res, next, end) => {
    // nextPromise is the key to the implementation
    // it is resolved by the return handler passed to the
    // "next" function
    let resolveNextPromise;
    const nextPromise = new Promise(resolve => {
      resolveNextPromise = resolve;
    });
    let returnHandlerCallback, nextWasCalled;

    const asyncNext = async () => {
      nextWasCalled = true;
      next(callback => {
        // eslint-disable-line callback-return
        returnHandlerCallback = callback;
        resolveNextPromise();
      });
      await nextPromise;
    };

    asyncMiddleware(req, res, asyncNext).then(async () => {
      if (nextWasCalled) {
        await nextPromise; // we must wait until the return handler is called

        returnHandlerCallback(null);
      } else {
        end(null);
      }
    }).catch(error => {
      if (returnHandlerCallback) {
        returnHandlerCallback(error);
      } else {
        end(error);
      }
    });
  };
};

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/index.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/index.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;

const inherits = __webpack_require__(/*! util */ "./node_modules/util/util.js").inherits;

const ethUtil = __webpack_require__(/*! ethereumjs-util */ "./node_modules/ethereumjs-util/dist/index.js");

const EthBlockTracker = __webpack_require__(/*! eth-block-tracker */ "./node_modules/eth-block-tracker/src/polling.js");

const map = __webpack_require__(/*! async/map */ "./node_modules/async/map.js");

const eachSeries = __webpack_require__(/*! async/eachSeries */ "./node_modules/async/eachSeries.js");

const Stoplight = __webpack_require__(/*! ./util/stoplight.js */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/stoplight.js");

const cacheUtils = __webpack_require__(/*! ./util/rpc-cache-utils.js */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/rpc-cache-utils.js");

const createPayload = __webpack_require__(/*! ./util/create-payload.js */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/create-payload.js");

const noop = function () {};

module.exports = Web3ProviderEngine;
inherits(Web3ProviderEngine, EventEmitter);

function Web3ProviderEngine(opts) {
  const self = this;
  EventEmitter.call(self);
  self.setMaxListeners(30); // parse options

  opts = opts || {}; // block polling

  const directProvider = {
    sendAsync: self._handleAsync.bind(self)
  };
  const blockTrackerProvider = opts.blockTrackerProvider || directProvider;
  self._blockTracker = opts.blockTracker || new EthBlockTracker({
    provider: blockTrackerProvider,
    pollingInterval: opts.pollingInterval || 4000,
    setSkipCacheFlag: true
  }); // set initialization blocker

  self._ready = new Stoplight(); // local state

  self.currentBlock = null;
  self._providers = [];
} // public


Web3ProviderEngine.prototype.start = function (cb = noop) {
  const self = this; // trigger start

  self._ready.go(); // on new block, request block body and emit as events


  self._blockTracker.on('latest', blockNumber => {
    // get block body
    self._getBlockByNumberWithRetry(blockNumber, (err, block) => {
      if (err) {
        this.emit('error', err);
        return;
      }

      if (!block) {
        console.log(block);
        this.emit('error', new Error("Could not find block"));
        return;
      }

      const bufferBlock = toBufferBlock(block); // set current + emit "block" event

      self._setCurrentBlock(bufferBlock); // emit other events


      self.emit('rawBlock', block);
      self.emit('latest', block);
    });
  }); // forward other events


  self._blockTracker.on('sync', self.emit.bind(self, 'sync'));

  self._blockTracker.on('error', self.emit.bind(self, 'error')); // update state


  self._running = true; // signal that we started

  self.emit('start');
};

Web3ProviderEngine.prototype.stop = function () {
  const self = this; // stop block polling by removing event listeners

  self._blockTracker.removeAllListeners(); // update state


  self._running = false; // signal that we stopped

  self.emit('stop');
};

Web3ProviderEngine.prototype.isRunning = function () {
  const self = this;
  return self._running;
};

Web3ProviderEngine.prototype.addProvider = function (source, index) {
  const self = this;

  if (typeof index === 'number') {
    self._providers.splice(index, 0, source);
  } else {
    self._providers.push(source);
  }

  source.setEngine(this);
};

Web3ProviderEngine.prototype.removeProvider = function (source) {
  const self = this;

  const index = self._providers.indexOf(source);

  if (index < 0) throw new Error('Provider not found.');

  self._providers.splice(index, 1);
};

Web3ProviderEngine.prototype.send = function (payload) {
  throw new Error('Web3ProviderEngine does not support synchronous requests.');
};

Web3ProviderEngine.prototype.sendAsync = function (payload, cb) {
  const self = this;

  self._ready.await(function () {
    if (Array.isArray(payload)) {
      // handle batch
      map(payload, self._handleAsync.bind(self), cb);
    } else {
      // handle single
      self._handleAsync(payload, cb);
    }
  });
}; // private


Web3ProviderEngine.prototype._getBlockByNumberWithRetry = function (blockNumber, cb) {
  const self = this;
  let retriesRemaining = 5;
  attemptRequest();
  return;

  function attemptRequest() {
    self._getBlockByNumber(blockNumber, afterRequest);
  }

  function afterRequest(err, block) {
    // anomalous error occurred
    if (err) return cb(err); // block not ready yet

    if (!block) {
      if (retriesRemaining > 0) {
        // wait 1s then try again
        retriesRemaining--;
        setTimeout(function () {
          attemptRequest();
        }, 1000);
        return;
      } else {
        // give up, return a null block
        cb(null, null);
        return;
      }
    } // otherwise return result


    cb(null, block);
    return;
  }
};

Web3ProviderEngine.prototype._getBlockByNumber = function (blockNumber, cb) {
  const req = createPayload({
    method: 'eth_getBlockByNumber',
    params: [blockNumber, false],
    skipCache: true
  });

  this._handleAsync(req, (err, res) => {
    if (err) return cb(err);
    return cb(null, res.result);
  });
};

Web3ProviderEngine.prototype._handleAsync = function (payload, finished) {
  var self = this;
  var currentProvider = -1;
  var result = null;
  var error = null;
  var stack = [];
  next();

  function next(after) {
    currentProvider += 1;
    stack.unshift(after); // Bubbled down as far as we could go, and the request wasn't
    // handled. Return an error.

    if (currentProvider >= self._providers.length) {
      end(new Error('Request for method "' + payload.method + '" not handled by any subprovider. Please check your subprovider configuration to ensure this method is handled.'));
    } else {
      try {
        var provider = self._providers[currentProvider];
        provider.handleRequest(payload, next, end);
      } catch (e) {
        end(e);
      }
    }
  }

  function end(_error, _result) {
    error = _error;
    result = _result;
    eachSeries(stack, function (fn, callback) {
      if (fn) {
        fn(error, result, callback);
      } else {
        callback();
      }
    }, function () {
      var resultObj = {
        id: payload.id,
        jsonrpc: payload.jsonrpc,
        result: result
      };

      if (error != null) {
        resultObj.error = {
          message: error.stack || error.message || error,
          code: -32000
        }; // respond with both error formats

        finished(error, resultObj);
      } else {
        finished(null, resultObj);
      }
    });
  }
}; //
// from remote-data
//


Web3ProviderEngine.prototype._setCurrentBlock = function (block) {
  const self = this;
  self.currentBlock = block;
  self.emit('block', block);
}; // util


function toBufferBlock(jsonBlock) {
  return {
    number: ethUtil.toBuffer(jsonBlock.number),
    hash: ethUtil.toBuffer(jsonBlock.hash),
    parentHash: ethUtil.toBuffer(jsonBlock.parentHash),
    nonce: ethUtil.toBuffer(jsonBlock.nonce),
    mixHash: ethUtil.toBuffer(jsonBlock.mixHash),
    sha3Uncles: ethUtil.toBuffer(jsonBlock.sha3Uncles),
    logsBloom: ethUtil.toBuffer(jsonBlock.logsBloom),
    transactionsRoot: ethUtil.toBuffer(jsonBlock.transactionsRoot),
    stateRoot: ethUtil.toBuffer(jsonBlock.stateRoot),
    receiptsRoot: ethUtil.toBuffer(jsonBlock.receiptRoot || jsonBlock.receiptsRoot),
    miner: ethUtil.toBuffer(jsonBlock.miner),
    difficulty: ethUtil.toBuffer(jsonBlock.difficulty),
    totalDifficulty: ethUtil.toBuffer(jsonBlock.totalDifficulty),
    size: ethUtil.toBuffer(jsonBlock.size),
    extraData: ethUtil.toBuffer(jsonBlock.extraData),
    gasLimit: ethUtil.toBuffer(jsonBlock.gasLimit),
    gasUsed: ethUtil.toBuffer(jsonBlock.gasUsed),
    timestamp: ethUtil.toBuffer(jsonBlock.timestamp),
    transactions: jsonBlock.transactions
  };
}

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/cache.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/cache.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const ProviderSubprovider = __webpack_require__(/*! ./json-rpc-engine-middleware */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/json-rpc-engine-middleware.js");

const createBlockCacheMiddleware = __webpack_require__(/*! eth-json-rpc-middleware/block-cache */ "./node_modules/@walletconnect/web3-provider/node_modules/eth-json-rpc-middleware/block-cache.js");

class BlockCacheSubprovider extends ProviderSubprovider {
  constructor(opts) {
    super(({
      blockTracker
    }) => createBlockCacheMiddleware(Object.assign({
      blockTracker
    }, opts)));
  }

}

module.exports = BlockCacheSubprovider;

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/filters.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/filters.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const ProviderSubprovider = __webpack_require__(/*! ./json-rpc-engine-middleware */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/json-rpc-engine-middleware.js");

const createFilterMiddleware = __webpack_require__(/*! eth-json-rpc-filters */ "./node_modules/eth-json-rpc-filters/index.js");

class SubscriptionsSubprovider extends ProviderSubprovider {
  constructor() {
    super(({
      blockTracker,
      provider,
      engine
    }) => {
      return createFilterMiddleware({
        blockTracker,
        provider
      });
    });
  }

}

module.exports = SubscriptionsSubprovider;

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/fixture.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/fixture.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const inherits = __webpack_require__(/*! util */ "./node_modules/util/util.js").inherits;

const Subprovider = __webpack_require__(/*! ./subprovider.js */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/subprovider.js");

module.exports = FixtureProvider;
inherits(FixtureProvider, Subprovider);

function FixtureProvider(staticResponses) {
  const self = this;
  staticResponses = staticResponses || {};
  self.staticResponses = staticResponses;
}

FixtureProvider.prototype.handleRequest = function (payload, next, end) {
  const self = this;
  var staticResponse = self.staticResponses[payload.method]; // async function

  if ('function' === typeof staticResponse) {
    staticResponse(payload, next, end); // static response - null is valid response
  } else if (staticResponse !== undefined) {
    // return result asynchronously
    setTimeout(() => end(null, staticResponse)); // no prepared response - skip
  } else {
    next();
  }
};

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/hooked-wallet.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/hooked-wallet.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Emulate 'eth_accounts' / 'eth_sendTransaction' using 'eth_sendRawTransaction'
 *
 * The two callbacks a user needs to implement are:
 * - getAccounts() -- array of addresses supported
 * - signTransaction(tx) -- sign a raw transaction object
 */
const waterfall = __webpack_require__(/*! async/waterfall */ "./node_modules/async/waterfall.js");

const parallel = __webpack_require__(/*! async/parallel */ "./node_modules/async/parallel.js");

const inherits = __webpack_require__(/*! util */ "./node_modules/util/util.js").inherits;

const ethUtil = __webpack_require__(/*! ethereumjs-util */ "./node_modules/ethereumjs-util/dist/index.js");

const sigUtil = __webpack_require__(/*! eth-sig-util */ "./node_modules/@walletconnect/web3-provider/node_modules/eth-sig-util/index.js");

const extend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js");

const Semaphore = __webpack_require__(/*! semaphore */ "./node_modules/semaphore/lib/semaphore.js");

const Subprovider = __webpack_require__(/*! ./subprovider.js */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/subprovider.js");

const estimateGas = __webpack_require__(/*! ../util/estimate-gas.js */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/estimate-gas.js");

const hexRegex = /^[0-9A-Fa-f]+$/g;
module.exports = HookedWalletSubprovider; // handles the following RPC methods:
//   eth_coinbase
//   eth_accounts
//   eth_sendTransaction
//   eth_sign
//   eth_signTypedData
//   eth_signTypedData_v3
//   eth_signTypedData_v4
//   personal_sign
//   eth_decryptMessage
//   encryption_public_key
//   personal_ecRecover
//   parity_postTransaction
//   parity_checkRequest
//   parity_defaultAccount
//
// Tx Signature Flow
//
// handleRequest: eth_sendTransaction
//   validateTransaction (basic validity check)
//     validateSender (checks that sender is in accounts)
//   processTransaction (sign tx and submit to network)
//     approveTransaction (UI approval hook)
//     checkApproval
//     finalizeAndSubmitTx (tx signing)
//       nonceLock.take (bottle neck to ensure atomic nonce)
//         fillInTxExtras (set fallback gasPrice, nonce, etc)
//         signTransaction (perform the signature)
//         publishTransaction (publish signed tx to network)
//

inherits(HookedWalletSubprovider, Subprovider);

function HookedWalletSubprovider(opts) {
  const self = this; // control flow

  self.nonceLock = Semaphore(1); // data lookup

  if (opts.getAccounts) self.getAccounts = opts.getAccounts; // high level override

  if (opts.processTransaction) self.processTransaction = opts.processTransaction;
  if (opts.processMessage) self.processMessage = opts.processMessage;
  if (opts.processPersonalMessage) self.processPersonalMessage = opts.processPersonalMessage;
  if (opts.processTypedMessage) self.processTypedMessage = opts.processTypedMessage; // approval hooks

  self.approveTransaction = opts.approveTransaction || self.autoApprove;
  self.approveMessage = opts.approveMessage || self.autoApprove;
  self.approvePersonalMessage = opts.approvePersonalMessage || self.autoApprove;
  self.approveDecryptMessage = opts.approveDecryptMessage || self.autoApprove;
  self.approveEncryptionPublicKey = opts.approveEncryptionPublicKey || self.autoApprove;
  self.approveTypedMessage = opts.approveTypedMessage || self.autoApprove; // actually perform the signature

  if (opts.signTransaction) self.signTransaction = opts.signTransaction || mustProvideInConstructor('signTransaction');
  if (opts.signMessage) self.signMessage = opts.signMessage || mustProvideInConstructor('signMessage');
  if (opts.signPersonalMessage) self.signPersonalMessage = opts.signPersonalMessage || mustProvideInConstructor('signPersonalMessage');
  if (opts.decryptMessage) self.decryptMessage = opts.decryptMessage || mustProvideInConstructor('decryptMessage');
  if (opts.encryptionPublicKey) self.encryptionPublicKey = opts.encryptionPublicKey || mustProvideInConstructor('encryptionPublicKey');
  if (opts.signTypedMessage) self.signTypedMessage = opts.signTypedMessage || mustProvideInConstructor('signTypedMessage');
  if (opts.recoverPersonalSignature) self.recoverPersonalSignature = opts.recoverPersonalSignature; // publish to network

  if (opts.publishTransaction) self.publishTransaction = opts.publishTransaction; // gas options

  self.estimateGas = opts.estimateGas || self.estimateGas;
  self.getGasPrice = opts.getGasPrice || self.getGasPrice;
}

HookedWalletSubprovider.prototype.handleRequest = function (payload, next, end) {
  const self = this;
  self._parityRequests = {};
  self._parityRequestCount = 0; // switch statement is not block scoped
  // sp we cant repeat var declarations

  let txParams, msgParams, extraParams;
  let message, address;

  switch (payload.method) {
    case 'eth_coinbase':
      // process normally
      self.getAccounts(function (err, accounts) {
        if (err) return end(err);
        let result = accounts[0] || null;
        end(null, result);
      });
      return;

    case 'eth_accounts':
      // process normally
      self.getAccounts(function (err, accounts) {
        if (err) return end(err);
        end(null, accounts);
      });
      return;

    case 'eth_sendTransaction':
      txParams = payload.params[0];
      waterfall([cb => self.validateTransaction(txParams, cb), cb => self.processTransaction(txParams, cb)], end);
      return;

    case 'eth_signTransaction':
      txParams = payload.params[0];
      waterfall([cb => self.validateTransaction(txParams, cb), cb => self.processSignTransaction(txParams, cb)], end);
      return;

    case 'eth_sign':
      // process normally
      address = payload.params[0];
      message = payload.params[1]; // non-standard "extraParams" to be appended to our "msgParams" obj
      // good place for metadata

      extraParams = payload.params[2] || {};
      msgParams = extend(extraParams, {
        from: address,
        data: message
      });
      waterfall([cb => self.validateMessage(msgParams, cb), cb => self.processMessage(msgParams, cb)], end);
      return;

    case 'personal_sign':
      return function () {
        // process normally
        const first = payload.params[0];
        const second = payload.params[1]; // We initially incorrectly ordered these parameters.
        // To gracefully respect users who adopted this API early,
        // we are currently gracefully recovering from the wrong param order
        // when it is clearly identifiable.
        //
        // That means when the first param is definitely an address,
        // and the second param is definitely not, but is hex.

        if (resemblesData(second) && resemblesAddress(first)) {
          let warning = `The eth_personalSign method requires params ordered `;
          warning += `[message, address]. This was previously handled incorrectly, `;
          warning += `and has been corrected automatically. `;
          warning += `Please switch this param order for smooth behavior in the future.`;
          console.warn(warning);
          address = payload.params[0];
          message = payload.params[1];
        } else {
          message = payload.params[0];
          address = payload.params[1];
        } // non-standard "extraParams" to be appended to our "msgParams" obj
        // good place for metadata


        extraParams = payload.params[2] || {};
        msgParams = extend(extraParams, {
          from: address,
          data: message
        });
        waterfall([cb => self.validatePersonalMessage(msgParams, cb), cb => self.processPersonalMessage(msgParams, cb)], end);
      }();

    case 'eth_decryptMessage':
      return function () {
        // process normally
        const first = payload.params[0];
        const second = payload.params[1]; // We initially incorrectly ordered these parameters.
        // To gracefully respect users who adopted this API early,
        // we are currently gracefully recovering from the wrong param order
        // when it is clearly identifiable.
        //
        // That means when the first param is definitely an address,
        // and the second param is definitely not, but is hex.

        if (resemblesData(second) && resemblesAddress(first)) {
          let warning = `The eth_decryptMessage method requires params ordered `;
          warning += `[message, address]. This was previously handled incorrectly, `;
          warning += `and has been corrected automatically. `;
          warning += `Please switch this param order for smooth behavior in the future.`;
          console.warn(warning);
          address = payload.params[0];
          message = payload.params[1];
        } else {
          message = payload.params[0];
          address = payload.params[1];
        } // non-standard "extraParams" to be appended to our "msgParams" obj
        // good place for metadata


        extraParams = payload.params[2] || {};
        msgParams = extend(extraParams, {
          from: address,
          data: message
        });
        waterfall([cb => self.validateDecryptMessage(msgParams, cb), cb => self.processDecryptMessage(msgParams, cb)], end);
      }();

    case 'encryption_public_key':
      return function () {
        const address = payload.params[0];
        waterfall([cb => self.validateEncryptionPublicKey(address, cb), cb => self.processEncryptionPublicKey(address, cb)], end);
      }();

    case 'personal_ecRecover':
      return function () {
        message = payload.params[0];
        let signature = payload.params[1]; // non-standard "extraParams" to be appended to our "msgParams" obj
        // good place for metadata

        extraParams = payload.params[2] || {};
        msgParams = extend(extraParams, {
          sig: signature,
          data: message
        });
        self.recoverPersonalSignature(msgParams, end);
      }();

    case 'eth_signTypedData':
    case 'eth_signTypedData_v3':
    case 'eth_signTypedData_v4':
      return function () {
        // process normally
        const first = payload.params[0];
        const second = payload.params[1];

        if (resemblesAddress(first)) {
          address = first;
          message = second;
        } else {
          message = first;
          address = second;
        }

        extraParams = payload.params[2] || {};
        msgParams = extend(extraParams, {
          from: address,
          data: message
        });
        waterfall([cb => self.validateTypedMessage(msgParams, cb), cb => self.processTypedMessage(msgParams, cb)], end);
      }();

    case 'parity_postTransaction':
      txParams = payload.params[0];
      self.parityPostTransaction(txParams, end);
      return;

    case 'parity_postSign':
      address = payload.params[0];
      message = payload.params[1];
      self.parityPostSign(address, message, end);
      return;

    case 'parity_checkRequest':
      return function () {
        const requestId = payload.params[0];
        self.parityCheckRequest(requestId, end);
      }();

    case 'parity_defaultAccount':
      self.getAccounts(function (err, accounts) {
        if (err) return end(err);
        const account = accounts[0] || null;
        end(null, account);
      });
      return;

    default:
      next();
      return;
  }
}; //
// data lookup
//


HookedWalletSubprovider.prototype.getAccounts = function (cb) {
  cb(null, []);
}; //
// "process" high level flow
//


HookedWalletSubprovider.prototype.processTransaction = function (txParams, cb) {
  const self = this;
  waterfall([cb => self.approveTransaction(txParams, cb), (didApprove, cb) => self.checkApproval('transaction', didApprove, cb), cb => self.finalizeAndSubmitTx(txParams, cb)], cb);
};

HookedWalletSubprovider.prototype.processSignTransaction = function (txParams, cb) {
  const self = this;
  waterfall([cb => self.approveTransaction(txParams, cb), (didApprove, cb) => self.checkApproval('transaction', didApprove, cb), cb => self.finalizeTx(txParams, cb)], cb);
};

HookedWalletSubprovider.prototype.processMessage = function (msgParams, cb) {
  const self = this;
  waterfall([cb => self.approveMessage(msgParams, cb), (didApprove, cb) => self.checkApproval('message', didApprove, cb), cb => self.signMessage(msgParams, cb)], cb);
};

HookedWalletSubprovider.prototype.processPersonalMessage = function (msgParams, cb) {
  const self = this;
  waterfall([cb => self.approvePersonalMessage(msgParams, cb), (didApprove, cb) => self.checkApproval('message', didApprove, cb), cb => self.signPersonalMessage(msgParams, cb)], cb);
};

HookedWalletSubprovider.prototype.processDecryptMessage = function (msgParams, cb) {
  const self = this;
  waterfall([cb => self.approveDecryptMessage(msgParams, cb), (didApprove, cb) => self.checkApproval('decryptMessage', didApprove, cb), cb => self.decryptMessage(msgParams, cb)], cb);
};

HookedWalletSubprovider.prototype.processEncryptionPublicKey = function (msgParams, cb) {
  const self = this;
  waterfall([cb => self.approveEncryptionPublicKey(msgParams, cb), (didApprove, cb) => self.checkApproval('encryptionPublicKey', didApprove, cb), cb => self.encryptionPublicKey(msgParams, cb)], cb);
};

HookedWalletSubprovider.prototype.processTypedMessage = function (msgParams, cb) {
  const self = this;
  waterfall([cb => self.approveTypedMessage(msgParams, cb), (didApprove, cb) => self.checkApproval('message', didApprove, cb), cb => self.signTypedMessage(msgParams, cb)], cb);
}; //
// approval
//


HookedWalletSubprovider.prototype.autoApprove = function (txParams, cb) {
  cb(null, true);
};

HookedWalletSubprovider.prototype.checkApproval = function (type, didApprove, cb) {
  cb(didApprove ? null : new Error('User denied ' + type + ' signature.'));
}; //
// parity
//


HookedWalletSubprovider.prototype.parityPostTransaction = function (txParams, cb) {
  const self = this; // get next id

  const count = self._parityRequestCount;
  const reqId = `0x${count.toString(16)}`;
  self._parityRequestCount++;
  self.emitPayload({
    method: 'eth_sendTransaction',
    params: [txParams]
  }, function (error, res) {
    if (error) {
      self._parityRequests[reqId] = {
        error
      };
      return;
    }

    const txHash = res.result;
    self._parityRequests[reqId] = txHash;
  });
  cb(null, reqId);
};

HookedWalletSubprovider.prototype.parityPostSign = function (address, message, cb) {
  const self = this; // get next id

  const count = self._parityRequestCount;
  const reqId = `0x${count.toString(16)}`;
  self._parityRequestCount++;
  self.emitPayload({
    method: 'eth_sign',
    params: [address, message]
  }, function (error, res) {
    if (error) {
      self._parityRequests[reqId] = {
        error
      };
      return;
    }

    const result = res.result;
    self._parityRequests[reqId] = result;
  });
  cb(null, reqId);
};

HookedWalletSubprovider.prototype.parityCheckRequest = function (reqId, cb) {
  const self = this;
  const result = self._parityRequests[reqId] || null; // tx not handled yet

  if (!result) return cb(null, null); // tx was rejected (or other error)

  if (result.error) return cb(result.error); // tx sent

  cb(null, result);
}; //
// signature and recovery
//


HookedWalletSubprovider.prototype.recoverPersonalSignature = function (msgParams, cb) {
  let senderHex;

  try {
    senderHex = sigUtil.recoverPersonalSignature(msgParams);
  } catch (err) {
    return cb(err);
  }

  cb(null, senderHex);
}; //
// validation
//


HookedWalletSubprovider.prototype.validateTransaction = function (txParams, cb) {
  const self = this; // shortcut: undefined sender is invalid

  if (txParams.from === undefined) return cb(new Error(`Undefined address - from address required to sign transaction.`));
  self.validateSender(txParams.from, function (err, senderIsValid) {
    if (err) return cb(err);
    if (!senderIsValid) return cb(new Error(`Unknown address - unable to sign transaction for this address: "${txParams.from}"`));
    cb();
  });
};

HookedWalletSubprovider.prototype.validateMessage = function (msgParams, cb) {
  const self = this;
  if (msgParams.from === undefined) return cb(new Error(`Undefined address - from address required to sign message.`));
  self.validateSender(msgParams.from, function (err, senderIsValid) {
    if (err) return cb(err);
    if (!senderIsValid) return cb(new Error(`Unknown address - unable to sign message for this address: "${msgParams.from}"`));
    cb();
  });
};

HookedWalletSubprovider.prototype.validatePersonalMessage = function (msgParams, cb) {
  const self = this;
  if (msgParams.from === undefined) return cb(new Error(`Undefined address - from address required to sign personal message.`));
  if (msgParams.data === undefined) return cb(new Error(`Undefined message - message required to sign personal message.`));
  if (!isValidHex(msgParams.data)) return cb(new Error(`HookedWalletSubprovider - validateMessage - message was not encoded as hex.`));
  self.validateSender(msgParams.from, function (err, senderIsValid) {
    if (err) return cb(err);
    if (!senderIsValid) return cb(new Error(`Unknown address - unable to sign message for this address: "${msgParams.from}"`));
    cb();
  });
};

HookedWalletSubprovider.prototype.validateDecryptMessage = function (msgParams, cb) {
  const self = this;
  if (msgParams.from === undefined) return cb(new Error(`Undefined address - from address required to decrypt message.`));
  if (msgParams.data === undefined) return cb(new Error(`Undefined message - message required to decrypt message.`));
  if (!isValidHex(msgParams.data)) return cb(new Error(`HookedWalletSubprovider - validateDecryptMessage - message was not encoded as hex.`));
  self.validateSender(msgParams.from, function (err, senderIsValid) {
    if (err) return cb(err);
    if (!senderIsValid) return cb(new Error(`Unknown address - unable to decrypt message for this address: "${msgParams.from}"`));
    cb();
  });
};

HookedWalletSubprovider.prototype.validateEncryptionPublicKey = function (address, cb) {
  const self = this;
  self.validateSender(address, function (err, senderIsValid) {
    if (err) return cb(err);
    if (!senderIsValid) return cb(new Error(`Unknown address - unable to obtain encryption public key for this address: "${address}"`));
    cb();
  });
};

HookedWalletSubprovider.prototype.validateTypedMessage = function (msgParams, cb) {
  if (msgParams.from === undefined) return cb(new Error(`Undefined address - from address required to sign typed data.`));
  if (msgParams.data === undefined) return cb(new Error(`Undefined data - message required to sign typed data.`));
  this.validateSender(msgParams.from, function (err, senderIsValid) {
    if (err) return cb(err);
    if (!senderIsValid) return cb(new Error(`Unknown address - unable to sign message for this address: "${msgParams.from}"`));
    cb();
  });
};

HookedWalletSubprovider.prototype.validateSender = function (senderAddress, cb) {
  const self = this; // shortcut: undefined sender is invalid

  if (!senderAddress) return cb(null, false);
  self.getAccounts(function (err, accounts) {
    if (err) return cb(err);
    const senderIsValid = accounts.map(toLowerCase).indexOf(senderAddress.toLowerCase()) !== -1;
    cb(null, senderIsValid);
  });
}; //
// tx helpers
//


HookedWalletSubprovider.prototype.finalizeAndSubmitTx = function (txParams, cb) {
  const self = this; // can only allow one tx to pass through this flow at a time
  // so we can atomically consume a nonce

  self.nonceLock.take(function () {
    waterfall([self.fillInTxExtras.bind(self, txParams), self.signTransaction.bind(self), self.publishTransaction.bind(self)], function (err, txHash) {
      self.nonceLock.leave();
      if (err) return cb(err);
      cb(null, txHash);
    });
  });
};

HookedWalletSubprovider.prototype.finalizeTx = function (txParams, cb) {
  const self = this; // can only allow one tx to pass through this flow at a time
  // so we can atomically consume a nonce

  self.nonceLock.take(function () {
    waterfall([self.fillInTxExtras.bind(self, txParams), self.signTransaction.bind(self)], function (err, signedTx) {
      self.nonceLock.leave();
      if (err) return cb(err);
      cb(null, {
        raw: signedTx,
        tx: txParams
      });
    });
  });
};

HookedWalletSubprovider.prototype.publishTransaction = function (rawTx, cb) {
  const self = this;
  self.emitPayload({
    method: 'eth_sendRawTransaction',
    params: [rawTx]
  }, function (err, res) {
    if (err) return cb(err);
    cb(null, res.result);
  });
};

HookedWalletSubprovider.prototype.estimateGas = function (txParams, cb) {
  const self = this;
  estimateGas(self.engine, txParams, cb);
};

HookedWalletSubprovider.prototype.getGasPrice = function (cb) {
  const self = this;
  self.emitPayload({
    method: 'eth_gasPrice',
    params: []
  }, function (err, res) {
    if (err) return cb(err);
    cb(null, res.result);
  });
};

HookedWalletSubprovider.prototype.fillInTxExtras = function (txParams, cb) {
  const self = this;
  const address = txParams.from; // console.log('fillInTxExtras - address:', address)

  const tasks = {};

  if (txParams.gasPrice === undefined) {
    // console.log("need to get gasprice")
    tasks.gasPrice = self.getGasPrice.bind(self);
  }

  if (txParams.nonce === undefined) {
    // console.log("need to get nonce")
    tasks.nonce = self.emitPayload.bind(self, {
      method: 'eth_getTransactionCount',
      params: [address, 'pending']
    });
  }

  if (txParams.gas === undefined) {
    // console.log("need to get gas")
    tasks.gas = self.estimateGas.bind(self, cloneTxParams(txParams));
  }

  parallel(tasks, function (err, taskResults) {
    if (err) return cb(err);
    const result = {};
    if (taskResults.gasPrice) result.gasPrice = taskResults.gasPrice;
    if (taskResults.nonce) result.nonce = taskResults.nonce.result;
    if (taskResults.gas) result.gas = taskResults.gas;
    cb(null, extend(txParams, result));
  });
}; // util
// we use this to clean any custom params from the txParams


function cloneTxParams(txParams) {
  return {
    from: txParams.from,
    to: txParams.to,
    value: txParams.value,
    data: txParams.data,
    gas: txParams.gas,
    gasPrice: txParams.gasPrice,
    nonce: txParams.nonce
  };
}

function toLowerCase(string) {
  return string.toLowerCase();
}

function resemblesAddress(string) {
  const fixed = ethUtil.addHexPrefix(string);
  const isValid = ethUtil.isValidAddress(fixed);
  return isValid;
} // Returns true if resembles hex data
// but definitely not a valid address.


function resemblesData(string) {
  const fixed = ethUtil.addHexPrefix(string);
  const isValidAddress = ethUtil.isValidAddress(fixed);
  return !isValidAddress && isValidHex(string);
}

function isValidHex(data) {
  const isString = typeof data === 'string';
  if (!isString) return false;
  const isHexPrefixed = data.slice(0, 2) === '0x';
  if (!isHexPrefixed) return false;
  const nonPrefixed = data.slice(2);
  const isValid = nonPrefixed.match(hexRegex);
  return isValid;
}

function mustProvideInConstructor(methodName) {
  return function (params, cb) {
    cb(new Error('ProviderEngine - HookedWalletSubprovider - Must provide "' + methodName + '" fn in constructor options'));
  };
}

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/json-rpc-engine-middleware.js":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/json-rpc-engine-middleware.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Subprovider = __webpack_require__(/*! ./subprovider.js */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/subprovider.js"); // wraps a json-rpc-engine middleware in a subprovider interface


class JsonRpcEngineMiddlewareSubprovider extends Subprovider {
  // take a constructorFn to call once we have a reference to the engine
  constructor(constructorFn) {
    super();
    if (!constructorFn) throw new Error('JsonRpcEngineMiddlewareSubprovider - no constructorFn specified');
    this._constructorFn = constructorFn;
  } // this is called once the subprovider has been added to the provider engine


  setEngine(engine) {
    if (this.middleware) throw new Error('JsonRpcEngineMiddlewareSubprovider - subprovider added to engine twice');
    const blockTracker = engine._blockTracker;

    const middleware = this._constructorFn({
      engine,
      provider: engine,
      blockTracker
    });

    if (!middleware) throw new Error('JsonRpcEngineMiddlewareSubprovider - _constructorFn did not return middleware');
    if (typeof middleware !== 'function') throw new Error('JsonRpcEngineMiddlewareSubprovider - specified middleware is not a function');
    this.middleware = middleware;
  }

  handleRequest(req, provEngNext, provEngEnd) {
    const res = {
      id: req.id
    };
    this.middleware(req, res, middlewareNext, middlewareEnd);

    function middlewareNext(handler) {
      provEngNext((err, result, cb) => {
        // update response object with result or error
        if (err) {
          delete res.result;
          res.error = {
            message: err.message || err
          };
        } else {
          res.result = result;
        } // call middleware's next handler (even if error)


        if (handler) {
          handler(cb);
        } else {
          cb();
        }
      });
    }

    function middlewareEnd(err) {
      if (err) return provEngEnd(err);
      provEngEnd(null, res.result);
    }
  }

}

module.exports = JsonRpcEngineMiddlewareSubprovider;

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/nonce-tracker.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/nonce-tracker.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const inherits = __webpack_require__(/*! util */ "./node_modules/util/util.js").inherits;

const Transaction = __webpack_require__(/*! ethereumjs-tx */ "./node_modules/ethereumjs-tx/es5/index.js");

const ethUtil = __webpack_require__(/*! ethereumjs-util */ "./node_modules/ethereumjs-util/dist/index.js");

const Subprovider = __webpack_require__(/*! ./subprovider.js */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/subprovider.js");

const blockTagForPayload = __webpack_require__(/*! ../util/rpc-cache-utils */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/rpc-cache-utils.js").blockTagForPayload;

module.exports = NonceTrackerSubprovider; // handles the following RPC methods:
//   eth_getTransactionCount (pending only)
//
// observes the following RPC methods:
//   eth_sendRawTransaction
//   evm_revert (to clear the nonce cache)

inherits(NonceTrackerSubprovider, Subprovider);

function NonceTrackerSubprovider(opts) {
  const self = this;
  self.nonceCache = {};
}

NonceTrackerSubprovider.prototype.handleRequest = function (payload, next, end) {
  const self = this;

  switch (payload.method) {
    case 'eth_getTransactionCount':
      var blockTag = blockTagForPayload(payload);
      var address = payload.params[0].toLowerCase();
      var cachedResult = self.nonceCache[address]; // only handle requests against the 'pending' blockTag

      if (blockTag === 'pending') {
        // has a result
        if (cachedResult) {
          end(null, cachedResult); // fallthrough then populate cache
        } else {
          next(function (err, result, cb) {
            if (err) return cb();

            if (self.nonceCache[address] === undefined) {
              self.nonceCache[address] = result;
            }

            cb();
          });
        }
      } else {
        next();
      }

      return;

    case 'eth_sendRawTransaction':
      // allow the request to continue normally
      next(function (err, result, cb) {
        // only update local nonce if tx was submitted correctly
        if (err) return cb(); // parse raw tx

        var rawTx = payload.params[0];
        var stripped = ethUtil.stripHexPrefix(rawTx);
        var rawData = Buffer.from(ethUtil.stripHexPrefix(rawTx), 'hex');
        var tx = new Transaction(Buffer.from(ethUtil.stripHexPrefix(rawTx), 'hex')); // extract address

        var address = '0x' + tx.getSenderAddress().toString('hex').toLowerCase(); // extract nonce and increment

        var nonce = ethUtil.bufferToInt(tx.nonce);
        nonce++; // hexify and normalize

        var hexNonce = nonce.toString(16);
        if (hexNonce.length % 2) hexNonce = '0' + hexNonce;
        hexNonce = '0x' + hexNonce; // dont update our record on the nonce until the submit was successful
        // update cache

        self.nonceCache[address] = hexNonce;
        cb();
      });
      return;
    // Clear cache on a testrpc revert

    case 'evm_revert':
      self.nonceCache = {};
      next();
      return;

    default:
      next();
      return;
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/subprovider.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/subprovider.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const createPayload = __webpack_require__(/*! ../util/create-payload.js */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/create-payload.js");

module.exports = SubProvider; // this is the base class for a subprovider -- mostly helpers

function SubProvider() {}

SubProvider.prototype.setEngine = function (engine) {
  const self = this;
  if (self.engine) return;
  self.engine = engine;
  engine.on('block', function (block) {
    self.currentBlock = block;
  });
  engine.on('start', function () {
    self.start();
  });
  engine.on('stop', function () {
    self.stop();
  });
};

SubProvider.prototype.handleRequest = function (payload, next, end) {
  throw new Error('Subproviders should override `handleRequest`.');
};

SubProvider.prototype.emitPayload = function (payload, cb) {
  const self = this;
  self.engine.sendAsync(createPayload(payload), cb);
}; // dummies for overriding


SubProvider.prototype.stop = function () {};

SubProvider.prototype.start = function () {};

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/subscriptions.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/subscriptions.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const ProviderSubprovider = __webpack_require__(/*! ./json-rpc-engine-middleware */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/subproviders/json-rpc-engine-middleware.js");

const createSubscriptionManager = __webpack_require__(/*! eth-json-rpc-filters/subscriptionManager */ "./node_modules/eth-json-rpc-filters/subscriptionManager.js");

class SubscriptionsSubprovider extends ProviderSubprovider {
  constructor() {
    super(({
      blockTracker,
      provider,
      engine
    }) => {
      const {
        events,
        middleware
      } = createSubscriptionManager({
        blockTracker,
        provider
      }); // forward subscription events on the engine

      events.on('notification', data => engine.emit('data', null, data)); // return the subscription install/remove middleware

      return middleware;
    });
  }

}

module.exports = SubscriptionsSubprovider;

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/create-payload.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/create-payload.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const getRandomId = __webpack_require__(/*! ./random-id.js */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/random-id.js");

const extend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js");

module.exports = createPayload;

function createPayload(data) {
  return extend({
    // defaults
    id: getRandomId(),
    jsonrpc: '2.0',
    params: [] // user-specified

  }, data);
}

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/estimate-gas.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/estimate-gas.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const createPayload = __webpack_require__(/*! ./create-payload.js */ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/create-payload.js");

module.exports = estimateGas;
/*

This is a work around for https://github.com/ethereum/go-ethereum/issues/2577

*/

function estimateGas(provider, txParams, cb) {
  provider.sendAsync(createPayload({
    method: 'eth_estimateGas',
    params: [txParams]
  }), function (err, res) {
    if (err) {
      // handle simple value transfer case
      if (err.message === 'no contract code at given address') {
        return cb(null, '0xcf08');
      } else {
        return cb(err);
      }
    }

    cb(null, res.result);
  });
}

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/random-id.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/random-id.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = createRandomId;

function createRandomId() {
  // random id
  return Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
}

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/rpc-cache-utils.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/rpc-cache-utils.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const stringify = __webpack_require__(/*! json-stable-stringify */ "./node_modules/json-stable-stringify/index.js");

module.exports = {
  cacheIdentifierForPayload: cacheIdentifierForPayload,
  canCache: canCache,
  blockTagForPayload: blockTagForPayload,
  paramsWithoutBlockTag: paramsWithoutBlockTag,
  blockTagParamIndex: blockTagParamIndex,
  cacheTypeForPayload: cacheTypeForPayload
};

function cacheIdentifierForPayload(payload, opts = {}) {
  if (!canCache(payload)) return null;
  const {
    includeBlockRef
  } = opts;
  const params = includeBlockRef ? payload.params : paramsWithoutBlockTag(payload);
  return payload.method + ':' + stringify(params);
}

function canCache(payload) {
  return cacheTypeForPayload(payload) !== 'never';
}

function blockTagForPayload(payload) {
  var index = blockTagParamIndex(payload); // Block tag param not passed.

  if (index >= payload.params.length) {
    return null;
  }

  return payload.params[index];
}

function paramsWithoutBlockTag(payload) {
  var index = blockTagParamIndex(payload); // Block tag param not passed.

  if (index >= payload.params.length) {
    return payload.params;
  } // eth_getBlockByNumber has the block tag first, then the optional includeTx? param


  if (payload.method === 'eth_getBlockByNumber') {
    return payload.params.slice(1);
  }

  return payload.params.slice(0, index);
}

function blockTagParamIndex(payload) {
  switch (payload.method) {
    // blockTag is third param
    case 'eth_getStorageAt':
      return 2;
    // blockTag is second param

    case 'eth_getBalance':
    case 'eth_getCode':
    case 'eth_getTransactionCount':
    case 'eth_call':
    case 'eth_estimateGas':
      return 1;
    // blockTag is first param

    case 'eth_getBlockByNumber':
      return 0;
    // there is no blockTag

    default:
      return undefined;
  }
}

function cacheTypeForPayload(payload) {
  switch (payload.method) {
    // cache permanently
    case 'web3_clientVersion':
    case 'web3_sha3':
    case 'eth_protocolVersion':
    case 'eth_getBlockTransactionCountByHash':
    case 'eth_getUncleCountByBlockHash':
    case 'eth_getCode':
    case 'eth_getBlockByHash':
    case 'eth_getTransactionByHash':
    case 'eth_getTransactionByBlockHashAndIndex':
    case 'eth_getTransactionReceipt':
    case 'eth_getUncleByBlockHashAndIndex':
    case 'eth_getCompilers':
    case 'eth_compileLLL':
    case 'eth_compileSolidity':
    case 'eth_compileSerpent':
    case 'shh_version':
      return 'perma';
    // cache until fork

    case 'eth_getBlockByNumber':
    case 'eth_getBlockTransactionCountByNumber':
    case 'eth_getUncleCountByBlockNumber':
    case 'eth_getTransactionByBlockNumberAndIndex':
    case 'eth_getUncleByBlockNumberAndIndex':
      return 'fork';
    // cache for block

    case 'eth_gasPrice':
    case 'eth_getBalance':
    case 'eth_getStorageAt':
    case 'eth_getTransactionCount':
    case 'eth_call':
    case 'eth_estimateGas':
    case 'eth_getFilterLogs':
    case 'eth_getLogs':
    case 'eth_blockNumber':
      return 'block';
    // never cache

    case 'net_version':
    case 'net_peerCount':
    case 'net_listening':
    case 'eth_syncing':
    case 'eth_sign':
    case 'eth_coinbase':
    case 'eth_mining':
    case 'eth_hashrate':
    case 'eth_accounts':
    case 'eth_sendTransaction':
    case 'eth_sendRawTransaction':
    case 'eth_newFilter':
    case 'eth_newBlockFilter':
    case 'eth_newPendingTransactionFilter':
    case 'eth_uninstallFilter':
    case 'eth_getFilterChanges':
    case 'eth_getWork':
    case 'eth_submitWork':
    case 'eth_submitHashrate':
    case 'db_putString':
    case 'db_getString':
    case 'db_putHex':
    case 'db_getHex':
    case 'shh_post':
    case 'shh_newIdentity':
    case 'shh_hasIdentity':
    case 'shh_newGroup':
    case 'shh_addToGroup':
    case 'shh_newFilter':
    case 'shh_uninstallFilter':
    case 'shh_getFilterChanges':
    case 'shh_getMessages':
      return 'never';
  }
}

/***/ }),

/***/ "./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/stoplight.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@walletconnect/web3-provider/node_modules/web3-provider-engine/util/stoplight.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;

const inherits = __webpack_require__(/*! util */ "./node_modules/util/util.js").inherits;

module.exports = Stoplight;
inherits(Stoplight, EventEmitter);

function Stoplight() {
  const self = this;
  EventEmitter.call(self);
  self.isLocked = true;
}

Stoplight.prototype.go = function () {
  const self = this;
  self.isLocked = false;
  self.emit('unlock');
};

Stoplight.prototype.stop = function () {
  const self = this;
  self.isLocked = true;
  self.emit('lock');
};

Stoplight.prototype.await = function (fn) {
  const self = this;

  if (self.isLocked) {
    self.once('unlock', fn);
  } else {
    setTimeout(fn);
  }
};

/***/ }),

/***/ "./node_modules/async/internal/parallel.js":
/*!*************************************************!*\
  !*** ./node_modules/async/internal/parallel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _parallel;

var _noop = __webpack_require__(/*! lodash/noop */ "./node_modules/lodash/noop.js");

var _noop2 = _interopRequireDefault(_noop);

var _isArrayLike = __webpack_require__(/*! lodash/isArrayLike */ "./node_modules/lodash/isArrayLike.js");

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _slice = __webpack_require__(/*! ./slice */ "./node_modules/async/internal/slice.js");

var _slice2 = _interopRequireDefault(_slice);

var _wrapAsync = __webpack_require__(/*! ./wrapAsync */ "./node_modules/async/internal/wrapAsync.js");

var _wrapAsync2 = _interopRequireDefault(_wrapAsync);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _parallel(eachfn, tasks, callback) {
  callback = callback || _noop2.default;
  var results = (0, _isArrayLike2.default)(tasks) ? [] : {};
  eachfn(tasks, function (task, key, callback) {
    (0, _wrapAsync2.default)(task)(function (err, result) {
      if (arguments.length > 2) {
        result = (0, _slice2.default)(arguments, 1);
      }

      results[key] = result;
      callback(err);
    });
  }, function (err) {
    callback(err, results);
  });
}

module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/async/parallel.js":
/*!****************************************!*\
  !*** ./node_modules/async/parallel.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parallelLimit;

var _eachOf = __webpack_require__(/*! ./eachOf */ "./node_modules/async/eachOf.js");

var _eachOf2 = _interopRequireDefault(_eachOf);

var _parallel = __webpack_require__(/*! ./internal/parallel */ "./node_modules/async/internal/parallel.js");

var _parallel2 = _interopRequireDefault(_parallel);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Run the `tasks` collection of functions in parallel, without waiting until
 * the previous function has completed. If any of the functions pass an error to
 * its callback, the main `callback` is immediately called with the value of the
 * error. Once the `tasks` have completed, the results are passed to the final
 * `callback` as an array.
 *
 * **Note:** `parallel` is about kicking-off I/O tasks in parallel, not about
 * parallel execution of code.  If your tasks do not use any timers or perform
 * any I/O, they will actually be executed in series.  Any synchronous setup
 * sections for each task will happen one after the other.  JavaScript remains
 * single-threaded.
 *
 * **Hint:** Use [`reflect`]{@link module:Utils.reflect} to continue the
 * execution of other tasks when a task fails.
 *
 * It is also possible to use an object instead of an array. Each property will
 * be run as a function and the results will be passed to the final `callback`
 * as an object instead of an array. This can be a more readable way of handling
 * results from {@link async.parallel}.
 *
 * @name parallel
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|Object} tasks - A collection of
 * [async functions]{@link AsyncFunction} to run.
 * Each async function can complete with any number of optional `result` values.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed successfully. This function gets a results array
 * (or object) containing all the result arguments passed to the task callbacks.
 * Invoked with (err, results).
 *
 * @example
 * async.parallel([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // the results array will equal ['one','two'] even though
 *     // the second function had a shorter timeout.
 * });
 *
 * // an example using an object instead of an array
 * async.parallel({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }, function(err, results) {
 *     // results is now equals to: {one: 1, two: 2}
 * });
 */


function parallelLimit(tasks, callback) {
  (0, _parallel2.default)(_eachOf2.default, tasks, callback);
}

module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/async/waterfall.js":
/*!*****************************************!*\
  !*** ./node_modules/async/waterfall.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (tasks, callback) {
  callback = (0, _once2.default)(callback || _noop2.default);
  if (!(0, _isArray2.default)(tasks)) return callback(new Error('First argument to waterfall must be an array of functions'));
  if (!tasks.length) return callback();
  var taskIndex = 0;

  function nextTask(args) {
    var task = (0, _wrapAsync2.default)(tasks[taskIndex++]);
    args.push((0, _onlyOnce2.default)(next));
    task.apply(null, args);
  }

  function next(err
  /*, ...args*/
  ) {
    if (err || taskIndex === tasks.length) {
      return callback.apply(null, arguments);
    }

    nextTask((0, _slice2.default)(arguments, 1));
  }

  nextTask([]);
};

var _isArray = __webpack_require__(/*! lodash/isArray */ "./node_modules/lodash/isArray.js");

var _isArray2 = _interopRequireDefault(_isArray);

var _noop = __webpack_require__(/*! lodash/noop */ "./node_modules/lodash/noop.js");

var _noop2 = _interopRequireDefault(_noop);

var _once = __webpack_require__(/*! ./internal/once */ "./node_modules/async/internal/once.js");

var _once2 = _interopRequireDefault(_once);

var _slice = __webpack_require__(/*! ./internal/slice */ "./node_modules/async/internal/slice.js");

var _slice2 = _interopRequireDefault(_slice);

var _onlyOnce = __webpack_require__(/*! ./internal/onlyOnce */ "./node_modules/async/internal/onlyOnce.js");

var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

var _wrapAsync = __webpack_require__(/*! ./internal/wrapAsync */ "./node_modules/async/internal/wrapAsync.js");

var _wrapAsync2 = _interopRequireDefault(_wrapAsync);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = exports['default'];
/**
 * Runs the `tasks` array of functions in series, each passing their results to
 * the next in the array. However, if any of the `tasks` pass an error to their
 * own callback, the next function is not executed, and the main `callback` is
 * immediately called with the error.
 *
 * @name waterfall
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array} tasks - An array of [async functions]{@link AsyncFunction}
 * to run.
 * Each function should complete with any number of `result` values.
 * The `result` values will be passed as arguments, in order, to the next task.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This will be passed the results of the last task's
 * callback. Invoked with (err, [results]).
 * @returns undefined
 * @example
 *
 * async.waterfall([
 *     function(callback) {
 *         callback(null, 'one', 'two');
 *     },
 *     function(arg1, arg2, callback) {
 *         // arg1 now equals 'one' and arg2 now equals 'two'
 *         callback(null, 'three');
 *     },
 *     function(arg1, callback) {
 *         // arg1 now equals 'three'
 *         callback(null, 'done');
 *     }
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 *
 * // Or, with named functions:
 * async.waterfall([
 *     myFirstFunction,
 *     mySecondFunction,
 *     myLastFunction,
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 * function myFirstFunction(callback) {
 *     callback(null, 'one', 'two');
 * }
 * function mySecondFunction(arg1, arg2, callback) {
 *     // arg1 now equals 'one' and arg2 now equals 'two'
 *     callback(null, 'three');
 * }
 * function myLastFunction(arg1, callback) {
 *     // arg1 now equals 'three'
 *     callback(null, 'done');
 * }
 */

/***/ }),

/***/ "./node_modules/builtin-status-codes/browser.js":
/*!******************************************************!*\
  !*** ./node_modules/builtin-status-codes/browser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
};

/***/ }),

/***/ "./node_modules/cookiejar/cookiejar.js":
/*!*********************************************!*\
  !*** ./node_modules/cookiejar/cookiejar.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint node: true */
(function () {
  "use strict";

  function CookieAccessInfo(domain, path, secure, script) {
    if (this instanceof CookieAccessInfo) {
      this.domain = domain || undefined;
      this.path = path || "/";
      this.secure = !!secure;
      this.script = !!script;
      return this;
    }

    return new CookieAccessInfo(domain, path, secure, script);
  }

  CookieAccessInfo.All = Object.freeze(Object.create(null));
  exports.CookieAccessInfo = CookieAccessInfo;

  function Cookie(cookiestr, request_domain, request_path) {
    if (cookiestr instanceof Cookie) {
      return cookiestr;
    }

    if (this instanceof Cookie) {
      this.name = null;
      this.value = null;
      this.expiration_date = Infinity;
      this.path = String(request_path || "/");
      this.explicit_path = false;
      this.domain = request_domain || null;
      this.explicit_domain = false;
      this.secure = false; //how to define default?

      this.noscript = false; //httponly

      if (cookiestr) {
        this.parse(cookiestr, request_domain, request_path);
      }

      return this;
    }

    return new Cookie(cookiestr, request_domain, request_path);
  }

  exports.Cookie = Cookie;

  Cookie.prototype.toString = function toString() {
    var str = [this.name + "=" + this.value];

    if (this.expiration_date !== Infinity) {
      str.push("expires=" + new Date(this.expiration_date).toGMTString());
    }

    if (this.domain) {
      str.push("domain=" + this.domain);
    }

    if (this.path) {
      str.push("path=" + this.path);
    }

    if (this.secure) {
      str.push("secure");
    }

    if (this.noscript) {
      str.push("httponly");
    }

    return str.join("; ");
  };

  Cookie.prototype.toValueString = function toValueString() {
    return this.name + "=" + this.value;
  };

  var cookie_str_splitter = /[:](?=\s*[a-zA-Z0-9_\-]+\s*[=])/g;

  Cookie.prototype.parse = function parse(str, request_domain, request_path) {
    if (this instanceof Cookie) {
      var parts = str.split(";").filter(function (value) {
        return !!value;
      });
      var i;
      var pair = parts[0].match(/([^=]+)=([\s\S]*)/);

      if (!pair) {
        console.warn("Invalid cookie header encountered. Header: '" + str + "'");
        return;
      }

      var key = pair[1];
      var value = pair[2];

      if (typeof key !== 'string' || key.length === 0 || typeof value !== 'string') {
        console.warn("Unable to extract values from cookie header. Cookie: '" + str + "'");
        return;
      }

      this.name = key;
      this.value = value;

      for (i = 1; i < parts.length; i += 1) {
        pair = parts[i].match(/([^=]+)(?:=([\s\S]*))?/);
        key = pair[1].trim().toLowerCase();
        value = pair[2];

        switch (key) {
          case "httponly":
            this.noscript = true;
            break;

          case "expires":
            this.expiration_date = value ? Number(Date.parse(value)) : Infinity;
            break;

          case "path":
            this.path = value ? value.trim() : "";
            this.explicit_path = true;
            break;

          case "domain":
            this.domain = value ? value.trim() : "";
            this.explicit_domain = !!this.domain;
            break;

          case "secure":
            this.secure = true;
            break;
        }
      }

      if (!this.explicit_path) {
        this.path = request_path || "/";
      }

      if (!this.explicit_domain) {
        this.domain = request_domain;
      }

      return this;
    }

    return new Cookie().parse(str, request_domain, request_path);
  };

  Cookie.prototype.matches = function matches(access_info) {
    if (access_info === CookieAccessInfo.All) {
      return true;
    }

    if (this.noscript && access_info.script || this.secure && !access_info.secure || !this.collidesWith(access_info)) {
      return false;
    }

    return true;
  };

  Cookie.prototype.collidesWith = function collidesWith(access_info) {
    if (this.path && !access_info.path || this.domain && !access_info.domain) {
      return false;
    }

    if (this.path && access_info.path.indexOf(this.path) !== 0) {
      return false;
    }

    if (this.explicit_path && access_info.path.indexOf(this.path) !== 0) {
      return false;
    }

    var access_domain = access_info.domain && access_info.domain.replace(/^[\.]/, '');
    var cookie_domain = this.domain && this.domain.replace(/^[\.]/, '');

    if (cookie_domain === access_domain) {
      return true;
    }

    if (cookie_domain) {
      if (!this.explicit_domain) {
        return false; // we already checked if the domains were exactly the same
      }

      var wildcard = access_domain.indexOf(cookie_domain);

      if (wildcard === -1 || wildcard !== access_domain.length - cookie_domain.length) {
        return false;
      }

      return true;
    }

    return true;
  };

  function CookieJar() {
    var cookies, cookies_list, collidable_cookie;

    if (this instanceof CookieJar) {
      cookies = Object.create(null); //name: [Cookie]

      this.setCookie = function setCookie(cookie, request_domain, request_path) {
        var remove, i;
        cookie = new Cookie(cookie, request_domain, request_path); //Delete the cookie if the set is past the current time

        remove = cookie.expiration_date <= Date.now();

        if (cookies[cookie.name] !== undefined) {
          cookies_list = cookies[cookie.name];

          for (i = 0; i < cookies_list.length; i += 1) {
            collidable_cookie = cookies_list[i];

            if (collidable_cookie.collidesWith(cookie)) {
              if (remove) {
                cookies_list.splice(i, 1);

                if (cookies_list.length === 0) {
                  delete cookies[cookie.name];
                }

                return false;
              }

              cookies_list[i] = cookie;
              return cookie;
            }
          }

          if (remove) {
            return false;
          }

          cookies_list.push(cookie);
          return cookie;
        }

        if (remove) {
          return false;
        }

        cookies[cookie.name] = [cookie];
        return cookies[cookie.name];
      }; //returns a cookie


      this.getCookie = function getCookie(cookie_name, access_info) {
        var cookie, i;
        cookies_list = cookies[cookie_name];

        if (!cookies_list) {
          return;
        }

        for (i = 0; i < cookies_list.length; i += 1) {
          cookie = cookies_list[i];

          if (cookie.expiration_date <= Date.now()) {
            if (cookies_list.length === 0) {
              delete cookies[cookie.name];
            }

            continue;
          }

          if (cookie.matches(access_info)) {
            return cookie;
          }
        }
      }; //returns a list of cookies


      this.getCookies = function getCookies(access_info) {
        var matches = [],
            cookie_name,
            cookie;

        for (cookie_name in cookies) {
          cookie = this.getCookie(cookie_name, access_info);

          if (cookie) {
            matches.push(cookie);
          }
        }

        matches.toString = function toString() {
          return matches.join(":");
        };

        matches.toValueString = function toValueString() {
          return matches.map(function (c) {
            return c.toValueString();
          }).join(';');
        };

        return matches;
      };

      return this;
    }

    return new CookieJar();
  }

  exports.CookieJar = CookieJar; //returns list of cookies that were set correctly. Cookies that are expired and removed are not returned.

  CookieJar.prototype.setCookies = function setCookies(cookies, request_domain, request_path) {
    cookies = Array.isArray(cookies) ? cookies : cookies.split(cookie_str_splitter);
    var successful = [],
        i,
        cookie;
    cookies = cookies.map(function (item) {
      return new Cookie(item, request_domain, request_path);
    });

    for (i = 0; i < cookies.length; i += 1) {
      cookie = cookies[i];

      if (this.setCookie(cookie, request_domain, request_path)) {
        successful.push(cookie);
      }
    }

    return successful;
  };
})();

/***/ }),

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
  try {
    // Try to decode the entire string first
    return decodeURIComponent(components.join(''));
  } catch (err) {// Do nothing
  }

  if (components.length === 1) {
    return components;
  }

  split = split || 1; // Split the array in 2 parts

  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher);

    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join('');
      tokens = input.match(singleMatcher);
    }

    return input;
  }
}

function customDecodeURIComponent(input) {
  // Keep track of all the replacements and prefill the map with the `BOM`
  var replaceMap = {
    '%FE%FF': '\uFFFD\uFFFD',
    '%FF%FE': '\uFFFD\uFFFD'
  };
  var match = multiMatcher.exec(input);

  while (match) {
    try {
      // Decode as big chunks as possible
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode(match[0]);

      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }

    match = multiMatcher.exec(input);
  } // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else


  replaceMap['%C2'] = '\uFFFD';
  var entries = Object.keys(replaceMap);

  for (var i = 0; i < entries.length; i++) {
    // Replace all decoded components
    var key = entries[i];
    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
  }

  return input;
}

module.exports = function (encodedURI) {
  if (typeof encodedURI !== 'string') {
    throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
  }

  try {
    encodedURI = encodedURI.replace(/\+/g, ' '); // Try the built in decoder first

    return decodeURIComponent(encodedURI);
  } catch (err) {
    // Fallback to a more advanced decoder
    return customDecodeURIComponent(encodedURI);
  }
};

/***/ }),

/***/ "./node_modules/detect-browser/es/index.js":
/*!*************************************************!*\
  !*** ./node_modules/detect-browser/es/index.js ***!
  \*************************************************/
/*! exports provided: BrowserInfo, NodeInfo, SearchBotDeviceInfo, BotInfo, ReactNativeInfo, detect, browserName, parseUserAgent, detectOS, getNodeVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserInfo", function() { return BrowserInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeInfo", function() { return NodeInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBotDeviceInfo", function() { return SearchBotDeviceInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BotInfo", function() { return BotInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactNativeInfo", function() { return ReactNativeInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detect", function() { return detect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "browserName", function() { return browserName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseUserAgent", function() { return parseUserAgent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detectOS", function() { return detectOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodeVersion", function() { return getNodeVersion; });
var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

var BrowserInfo =
/** @class */
function () {
  function BrowserInfo(name, version, os) {
    this.name = name;
    this.version = version;
    this.os = os;
    this.type = 'browser';
  }

  return BrowserInfo;
}();



var NodeInfo =
/** @class */
function () {
  function NodeInfo(version) {
    this.version = version;
    this.type = 'node';
    this.name = 'node';
    this.os = process.platform;
  }

  return NodeInfo;
}();



var SearchBotDeviceInfo =
/** @class */
function () {
  function SearchBotDeviceInfo(name, version, os, bot) {
    this.name = name;
    this.version = version;
    this.os = os;
    this.bot = bot;
    this.type = 'bot-device';
  }

  return SearchBotDeviceInfo;
}();



var BotInfo =
/** @class */
function () {
  function BotInfo() {
    this.type = 'bot';
    this.bot = true; // NOTE: deprecated test name instead

    this.name = 'bot';
    this.version = null;
    this.os = null;
  }

  return BotInfo;
}();



var ReactNativeInfo =
/** @class */
function () {
  function ReactNativeInfo() {
    this.type = 'react-native';
    this.name = 'react-native';
    this.version = null;
    this.os = null;
  }

  return ReactNativeInfo;
}();

 // tslint:disable-next-line:max-line-length

var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [['aol', /AOLShield\/([0-9\._]+)/], ['edge', /Edge\/([0-9\._]+)/], ['edge-ios', /EdgiOS\/([0-9\._]+)/], ['yandexbrowser', /YaBrowser\/([0-9\._]+)/], ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/], ['samsung', /SamsungBrowser\/([0-9\.]+)/], ['silk', /\bSilk\/([0-9._-]+)\b/], ['miui', /MiuiBrowser\/([0-9\.]+)$/], ['beaker', /BeakerBrowser\/([0-9\.]+)/], ['edge-chromium', /EdgA?\/([0-9\.]+)/], ['chromium-webview', /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/], ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/], ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/], ['fxios', /FxiOS\/([0-9\.]+)/], ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/], ['opera', /Opera\/([0-9\.]+)(?:\s|$)/], ['opera', /OPR\/([0-9\.]+)(:?\s|$)/], ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/], ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/], ['ie', /MSIE\s(7\.0)/], ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/], ['android', /Android\s([0-9\.]+)/], ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/], ['safari', /Version\/([0-9\._]+).*Safari/], ['facebook', /FBAV\/([0-9\.]+)/], ['instagram', /Instagram\s([0-9\.]+)/], ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/], ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/], ['searchbot', SEARCHBOX_UA_REGEX]];
var operatingSystemRules = [['iOS', /iP(hone|od|ad)/], ['Android OS', /Android/], ['BlackBerry OS', /BlackBerry|BB10/], ['Windows Mobile', /IEMobile/], ['Amazon OS', /Kindle/], ['Windows 3.11', /Win16/], ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/], ['Windows 98', /(Windows 98)|(Win98)/], ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/], ['Windows XP', /(Windows NT 5.1)|(Windows XP)/], ['Windows Server 2003', /(Windows NT 5.2)/], ['Windows Vista', /(Windows NT 6.0)/], ['Windows 7', /(Windows NT 6.1)/], ['Windows 8', /(Windows NT 6.2)/], ['Windows 8.1', /(Windows NT 6.3)/], ['Windows 10', /(Windows NT 10.0)/], ['Windows ME', /Windows ME/], ['Open BSD', /OpenBSD/], ['Sun OS', /SunOS/], ['Chrome OS', /CrOS/], ['Linux', /(Linux)|(X11)/], ['Mac OS', /(Mac_PowerPC)|(Macintosh)/], ['QNX', /QNX/], ['BeOS', /BeOS/], ['OS/2', /OS\/2/]];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }

  if (typeof document === 'undefined' && typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return new ReactNativeInfo();
  }

  if (typeof navigator !== 'undefined') {
    return parseUserAgent(navigator.userAgent);
  }

  return getNodeVersion();
}

function matchUserAgent(ua) {
  // opted for using reduce here rather than Array#first with a regex.test call
  // this is primarily because using the reduce we only perform the regex
  // execution once rather than once for the test and for the exec again below
  // probably something that needs to be benchmarked though
  return ua !== '' && userAgentRules.reduce(function (matched, _a) {
    var browser = _a[0],
        regex = _a[1];

    if (matched) {
      return matched;
    }

    var uaMatch = regex.exec(ua);
    return !!uaMatch && [browser, uaMatch];
  }, false);
}

function browserName(ua) {
  var data = matchUserAgent(ua);
  return data ? data[0] : null;
}
function parseUserAgent(ua) {
  var matchedRule = matchUserAgent(ua);

  if (!matchedRule) {
    return null;
  }

  var name = matchedRule[0],
      match = matchedRule[1];

  if (name === 'searchbot') {
    return new BotInfo();
  }

  var versionParts = match[1] && match[1].split(/[._]/).slice(0, 3);

  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArrays(versionParts, createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length));
    }
  } else {
    versionParts = [];
  }

  var version = versionParts.join('.');
  var os = detectOS(ua);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);

  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
  }

  return new BrowserInfo(name, version, os);
}
function detectOS(ua) {
  for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    var _a = operatingSystemRules[ii],
        os = _a[0],
        regex = _a[1];
    var match = regex.exec(ua);

    if (match) {
      return os;
    }
  }

  return null;
}
function getNodeVersion() {
  var isNode = typeof process !== 'undefined' && process.version;
  return isNode ? new NodeInfo(process.version.slice(1)) : null;
}

function createVersionParts(count) {
  var output = [];

  for (var ii = 0; ii < count; ii++) {
    output.push('0');
  }

  return output;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/dijkstrajs/dijkstra.js":
/*!*********************************************!*\
  !*** ./node_modules/dijkstrajs/dijkstra.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/

var dijkstra = {
  single_source_shortest_paths: function (graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {}; // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost

    var costs = {};
    costs[s] = 0; // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?

    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);
    var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;

    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost; // Get nodes adjacent to u...

      adjacent_nodes = graph[u] || {}; // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.

      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v]; // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.

          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e; // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).

          cost_of_s_to_v = costs[v];
          first_visit = typeof costs[v] === 'undefined';

          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },
  extract_shortest_path_from_predecessor_list: function (predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;

    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }

    nodes.reverse();
    return nodes;
  },
  find_path: function (graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
          t = {},
          key;
      opts = opts || {};

      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }

      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },
    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = {
        value: value,
        cost: cost
      };
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },
    empty: function () {
      return this.queue.length === 0;
    }
  }
}; // node.js module exports

if (true) {
  module.exports = dijkstra;
}

/***/ }),

/***/ "./node_modules/enc-utils/dist/cjs/index.js":
/*!**************************************************!*\
  !*** ./node_modules/enc-utils/dist/cjs/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const is_typedarray_1 = __importDefault(__webpack_require__(/*! is-typedarray */ "./node_modules/is-typedarray/index.js"));

const typedarray_to_buffer_1 = __importDefault(__webpack_require__(/*! typedarray-to-buffer */ "./node_modules/typedarray-to-buffer/index.js"));

const ENC_HEX = 'hex';
const ENC_UTF8 = 'utf8';
const ENC_BIN = 'binary';
const TYPE_BUFFER = 'buffer';
const TYPE_ARRAY = 'array';
const TYPE_TYPED_ARRAY = 'typed-array';
const TYPE_ARRAY_BUFFER = 'array-buffer';
const STRING_ZERO = '0';

function bufferToArray(buf) {
  return new Uint8Array(buf);
}

exports.bufferToArray = bufferToArray;

function bufferToHex(buf, prefixed = false) {
  const hex = buf.toString(ENC_HEX);
  return prefixed ? addHexPrefix(hex) : hex;
}

exports.bufferToHex = bufferToHex;

function bufferToUtf8(buf) {
  return buf.toString(ENC_UTF8);
}

exports.bufferToUtf8 = bufferToUtf8;

function bufferToNumber(buf) {
  return buf.readUIntBE(0, buf.length);
}

exports.bufferToNumber = bufferToNumber;

function bufferToBinary(buf) {
  return arrayToBinary(bufferToArray(buf));
}

exports.bufferToBinary = bufferToBinary;

function arrayToBuffer(arr) {
  return typedarray_to_buffer_1.default(arr);
}

exports.arrayToBuffer = arrayToBuffer;

function arrayToHex(arr, prefixed = false) {
  return bufferToHex(arrayToBuffer(arr), prefixed);
}

exports.arrayToHex = arrayToHex;

function arrayToUtf8(arr) {
  return bufferToUtf8(arrayToBuffer(arr));
}

exports.arrayToUtf8 = arrayToUtf8;

function arrayToNumber(arr) {
  return bufferToNumber(arrayToBuffer(arr));
}

exports.arrayToNumber = arrayToNumber;

function arrayToBinary(arr) {
  return Array.from(arr).map(numberToBinary).join('');
}

exports.arrayToBinary = arrayToBinary;

function hexToBuffer(hex) {
  return Buffer.from(removeHexPrefix(hex), ENC_HEX);
}

exports.hexToBuffer = hexToBuffer;

function hexToArray(hex) {
  return bufferToArray(hexToBuffer(hex));
}

exports.hexToArray = hexToArray;

function hexToUtf8(hex) {
  return bufferToUtf8(hexToBuffer(hex));
}

exports.hexToUtf8 = hexToUtf8;

function hexToNumber(hex) {
  return arrayToNumber(hexToArray(hex));
}

exports.hexToNumber = hexToNumber;

function hexToBinary(hex) {
  return arrayToBinary(hexToArray(hex));
}

exports.hexToBinary = hexToBinary;

function utf8ToBuffer(utf8) {
  return Buffer.from(utf8, ENC_UTF8);
}

exports.utf8ToBuffer = utf8ToBuffer;

function utf8ToArray(utf8) {
  return bufferToArray(utf8ToBuffer(utf8));
}

exports.utf8ToArray = utf8ToArray;

function utf8ToHex(utf8, prefixed = false) {
  return bufferToHex(utf8ToBuffer(utf8), prefixed);
}

exports.utf8ToHex = utf8ToHex;

function utf8ToNumber(utf8) {
  const num = parseInt(utf8, 10);
  assert(isDefined(num), 'Number can only safely store up to 53 bits');
  return num;
}

exports.utf8ToNumber = utf8ToNumber;

function utf8ToBinary(utf8) {
  return arrayToBinary(utf8ToArray(utf8));
}

exports.utf8ToBinary = utf8ToBinary;

function numberToBuffer(num) {
  return binaryToBuffer(numberToBinary(num));
}

exports.numberToBuffer = numberToBuffer;

function numberToArray(num) {
  return binaryToArray(numberToBinary(num));
}

exports.numberToArray = numberToArray;

function numberToHex(num, prefixed) {
  return binaryToHex(numberToBinary(num), prefixed);
}

exports.numberToHex = numberToHex;

function numberToUtf8(num) {
  return `${num}`;
}

exports.numberToUtf8 = numberToUtf8;

function numberToBinary(num) {
  const bin = (num >>> 0).toString(2);
  return sanitizeBytes(bin);
}

exports.numberToBinary = numberToBinary;

function binaryToBuffer(bin) {
  return arrayToBuffer(binaryToArray(bin));
}

exports.binaryToBuffer = binaryToBuffer;

function binaryToArray(bin) {
  return new Uint8Array(splitBytes(bin).map(x => parseInt(x, 2)));
}

exports.binaryToArray = binaryToArray;

function binaryToHex(bin, prefixed) {
  return arrayToHex(binaryToArray(bin), prefixed);
}

exports.binaryToHex = binaryToHex;

function binaryToUtf8(bin) {
  return arrayToUtf8(binaryToArray(bin));
}

exports.binaryToUtf8 = binaryToUtf8;

function binaryToNumber(bin) {
  return arrayToNumber(binaryToArray(bin));
}

exports.binaryToNumber = binaryToNumber;

function isBinaryString(str) {
  if (typeof str !== 'string' || !new RegExp(/^[01]+$/).test(str)) {
    return false;
  }

  if (str.length % 8 !== 0) {
    return false;
  }

  return true;
}

exports.isBinaryString = isBinaryString;

function isHexString(str, length) {
  if (typeof str !== 'string' || !str.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }

  if (length && str.length !== 2 + 2 * length) {
    return false;
  }

  return true;
}

exports.isHexString = isHexString;

function isBuffer(val) {
  return Buffer.isBuffer(val);
}

exports.isBuffer = isBuffer;

function isTypedArray(val) {
  return is_typedarray_1.default.strict(val) && !isBuffer(val);
}

exports.isTypedArray = isTypedArray;

function isArrayBuffer(val) {
  return !isTypedArray(val) && !isBuffer(val) && typeof val.byteLength !== 'undefined';
}

exports.isArrayBuffer = isArrayBuffer;

function getType(val) {
  if (isBuffer(val)) {
    return TYPE_BUFFER;
  } else if (isTypedArray(val)) {
    return TYPE_TYPED_ARRAY;
  } else if (isArrayBuffer(val)) {
    return TYPE_ARRAY_BUFFER;
  } else if (Array.isArray(val)) {
    return TYPE_ARRAY;
  } else {
    return typeof val;
  }
}

exports.getType = getType;

function getEncoding(str) {
  if (isBinaryString(str)) {
    return ENC_BIN;
  }

  if (isHexString(str)) {
    return ENC_HEX;
  }

  return ENC_UTF8;
}

exports.getEncoding = getEncoding;

function concatBuffers(...args) {
  const result = Buffer.concat(args);
  return result;
}

exports.concatBuffers = concatBuffers;

function concatArrays(...args) {
  let result = [];
  args.forEach(arg => result = result.concat(Array.from(arg)));
  return new Uint8Array([...result]);
}

exports.concatArrays = concatArrays;

function trimLeft(data, length) {
  const diff = data.length - length;

  if (diff > 0) {
    data = data.slice(diff);
  }

  return data;
}

exports.trimLeft = trimLeft;

function trimRight(data, length) {
  return data.slice(0, length);
}

exports.trimRight = trimRight;

function calcByteLength(length, byteSize = 8) {
  const remainder = length % byteSize;
  return remainder ? (length - remainder) / byteSize * byteSize + byteSize : length;
}

exports.calcByteLength = calcByteLength;

function splitBytes(str, byteSize = 8) {
  const bytes = sanitizeBytes(str).match(new RegExp(`.{${byteSize}}`, 'gi'));
  return Array.from(bytes || []);
}

exports.splitBytes = splitBytes;

function swapBytes(str) {
  return splitBytes(str).map(reverseString).join('');
}

exports.swapBytes = swapBytes;

function swapHex(str) {
  return binaryToHex(swapBytes(hexToBinary(str)));
}

exports.swapHex = swapHex;

function sanitizeBytes(str, byteSize = 8, padding = STRING_ZERO) {
  return padLeft(str, calcByteLength(str.length, byteSize), padding);
}

exports.sanitizeBytes = sanitizeBytes;

function padLeft(str, length, padding = STRING_ZERO) {
  return padString(str, length, true, padding);
}

exports.padLeft = padLeft;

function padRight(str, length, padding = STRING_ZERO) {
  return padString(str, length, false, padding);
}

exports.padRight = padRight;

function removeHexPrefix(hex) {
  return hex.replace(/^0x/, '');
}

exports.removeHexPrefix = removeHexPrefix;

function addHexPrefix(hex) {
  return hex.startsWith('0x') ? hex : `0x${hex}`;
}

exports.addHexPrefix = addHexPrefix;

function sanitizeHex(hex) {
  hex = removeHexPrefix(hex);
  hex = sanitizeBytes(hex, 2);

  if (hex) {
    hex = addHexPrefix(hex);
  }

  return hex;
}

exports.sanitizeHex = sanitizeHex;

function removeHexLeadingZeros(hex) {
  const prefixed = hex.startsWith('0x');
  hex = removeHexPrefix(hex);
  hex = hex.startsWith(STRING_ZERO) ? hex.substring(1) : hex;
  return prefixed ? addHexPrefix(hex) : hex;
}

exports.removeHexLeadingZeros = removeHexLeadingZeros;

function isUndefined(value) {
  return typeof value === 'undefined';
}

function isDefined(value) {
  return !isUndefined(value);
}

function assert(assertion, errorMessage) {
  if (!assertion) {
    throw new Error(errorMessage);
  }
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

function padString(str, length, left, padding = STRING_ZERO) {
  const diff = length - str.length;
  let result = str;

  if (diff > 0) {
    const pad = padding.repeat(diff);
    result = left ? pad + str : str + pad;
  }

  return result;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty,
    prefix = '~';
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */

function Events() {} //
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//


if (Object.create) {
  Events.prototype = Object.create(null); //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //

  if (!new Events().__proto__) prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */


function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */


function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once),
      evt = prefix ? prefix + event : event;
  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);else emitter._events[evt] = [emitter._events[evt], listener];
  return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */


function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */


function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */


EventEmitter.prototype.eventNames = function eventNames() {
  var names = [],
      events,
      name;
  if (this._eventsCount === 0) return names;

  for (name in events = this._events) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */


EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event,
      handlers = this._events[evt];
  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */


EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event,
      listeners = this._events[evt];
  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */


EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;
  if (!this._events[evt]) return false;
  var listeners = this._events[evt],
      len = arguments.length,
      args,
      i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1:
        return listeners.fn.call(listeners.context), true;

      case 2:
        return listeners.fn.call(listeners.context, a1), true;

      case 3:
        return listeners.fn.call(listeners.context, a1, a2), true;

      case 4:
        return listeners.fn.call(listeners.context, a1, a2, a3), true;

      case 5:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;

      case 6:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len - 1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length,
        j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1:
          listeners[i].fn.call(listeners[i].context);
          break;

        case 2:
          listeners[i].fn.call(listeners[i].context, a1);
          break;

        case 3:
          listeners[i].fn.call(listeners[i].context, a1, a2);
          break;

        case 4:
          listeners[i].fn.call(listeners[i].context, a1, a2, a3);
          break;

        default:
          if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
            args[j - 1] = arguments[j];
          }
          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;
  if (!this._events[evt]) return this;

  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
        events.push(listeners[i]);
      }
    } //
    // Reset the array, or remove it completely if we have no more listeners.
    //


    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else clearEvent(this, evt);
  }

  return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
}; //
// Alias methods names because people roll like that.
//


EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on; //
// Expose the prefix.
//

EventEmitter.prefixed = prefix; //
// Allow `EventEmitter` to be imported as module namespace.
//

EventEmitter.EventEmitter = EventEmitter; //
// Expose the module.
//

if (true) {
  module.exports = EventEmitter;
}

/***/ }),

/***/ "./node_modules/https-browserify/index.js":
/*!************************************************!*\
  !*** ./node_modules/https-browserify/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var http = __webpack_require__(/*! http */ "./node_modules/stream-http/index.js");

var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

var https = module.exports;

for (var key in http) {
  if (http.hasOwnProperty(key)) https[key] = http[key];
}

https.request = function (params, cb) {
  params = validateParams(params);
  return http.request.call(this, params, cb);
};

https.get = function (params, cb) {
  params = validateParams(params);
  return http.get.call(this, params, cb);
};

function validateParams(params) {
  if (typeof params === 'string') {
    params = url.parse(params);
  }

  if (!params.protocol) {
    params.protocol = 'https:';
  }

  if (params.protocol !== 'https:') {
    throw new Error('Protocol "' + params.protocol + '" not supported. Expected "https:"');
  }

  return params;
}

/***/ }),

/***/ "./node_modules/is-typedarray/index.js":
/*!*********************************************!*\
  !*** ./node_modules/is-typedarray/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = isTypedArray;
isTypedArray.strict = isStrictTypedArray;
isTypedArray.loose = isLooseTypedArray;
var toString = Object.prototype.toString;
var names = {
  '[object Int8Array]': true,
  '[object Int16Array]': true,
  '[object Int32Array]': true,
  '[object Uint8Array]': true,
  '[object Uint8ClampedArray]': true,
  '[object Uint16Array]': true,
  '[object Uint32Array]': true,
  '[object Float32Array]': true,
  '[object Float64Array]': true
};

function isTypedArray(arr) {
  return isStrictTypedArray(arr) || isLooseTypedArray(arr);
}

function isStrictTypedArray(arr) {
  return arr instanceof Int8Array || arr instanceof Int16Array || arr instanceof Int32Array || arr instanceof Uint8Array || arr instanceof Uint8ClampedArray || arr instanceof Uint16Array || arr instanceof Uint32Array || arr instanceof Float32Array || arr instanceof Float64Array;
}

function isLooseTypedArray(arr) {
  return names[toString.call(arr)];
}

/***/ }),

/***/ "./node_modules/os-browserify/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/os-browserify/browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.endianness = function () {
  return 'LE';
};

exports.hostname = function () {
  if (typeof location !== 'undefined') {
    return location.hostname;
  } else return '';
};

exports.loadavg = function () {
  return [];
};

exports.uptime = function () {
  return 0;
};

exports.freemem = function () {
  return Number.MAX_VALUE;
};

exports.totalmem = function () {
  return Number.MAX_VALUE;
};

exports.cpus = function () {
  return [];
};

exports.type = function () {
  return 'Browser';
};

exports.release = function () {
  if (typeof navigator !== 'undefined') {
    return navigator.appVersion;
  }

  return '';
};

exports.networkInterfaces = exports.getNetworkInterfaces = function () {
  return {};
};

exports.arch = function () {
  return 'javascript';
};

exports.platform = function () {
  return 'browser';
};

exports.tmpdir = exports.tmpDir = function () {
  return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
  return '/';
};

/***/ }),

/***/ "./node_modules/preact/compat/dist/compat.module.js":
/*!**********************************************************!*\
  !*** ./node_modules/preact/compat/dist/compat.module.js ***!
  \**********************************************************/
/*! exports provided: useState, useReducer, useEffect, useLayoutEffect, useRef, useImperativeHandle, useMemo, useCallback, useContext, useDebugValue, useErrorBoundary, createElement, createContext, createRef, Fragment, Component, default, version, Children, render, hydrate, unmountComponentAtNode, createPortal, createFactory, cloneElement, isValidElement, findDOMNode, PureComponent, memo, forwardRef, unstable_batchedUpdates, Suspense, SuspenseList, lazy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return B; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return R; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return V; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return Q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPortal", function() { return z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return G; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return K; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return J; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return X; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return C; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memo", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forwardRef", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_batchedUpdates", function() { return Y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Suspense", function() { return U; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuspenseList", function() { return O; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lazy", function() { return L; });
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReducer", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useReducer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEffect", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useEffect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLayoutEffect", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRef", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useImperativeHandle", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useImperativeHandle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useMemo", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useMemo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCallback", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useContext", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useDebugValue", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useDebugValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useErrorBoundary", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useErrorBoundary"]; });

/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["createElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["createContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["createRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["Fragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["Component"]; });






function E(n, t) {
  for (var e in t) n[e] = t[e];

  return n;
}

function w(n, t) {
  for (var e in n) if ("__source" !== e && !(e in t)) return !0;

  for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;

  return !1;
}

var C = function (n) {
  var t, e;

  function r(t) {
    var e;
    return (e = n.call(this, t) || this).isPureReactComponent = !0, e;
  }

  return e = n, (t = r).prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e, r.prototype.shouldComponentUpdate = function (n, t) {
    return w(this.props, n) || w(this.state, t);
  }, r;
}(preact__WEBPACK_IMPORTED_MODULE_1__["Component"]);

function _(n, t) {
  function e(n) {
    var e = this.props.ref,
        r = e == n.ref;
    return !r && e && (e.call ? e(null) : e.current = null), t ? !t(this.props, n) || !r : w(this.props, n);
  }

  function r(t) {
    return this.shouldComponentUpdate = e, Object(preact__WEBPACK_IMPORTED_MODULE_1__["createElement"])(n, E({}, t));
  }

  return r.prototype.isReactComponent = !0, r.displayName = "Memo(" + (n.displayName || n.name) + ")", r.t = !0, r;
}

var A = preact__WEBPACK_IMPORTED_MODULE_1__["options"].__b;

function S(n) {
  function t(t) {
    var e = E({}, t);
    return delete e.ref, n(e, t.ref);
  }

  return t.prototype.isReactComponent = t.t = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}

preact__WEBPACK_IMPORTED_MODULE_1__["options"].__b = function (n) {
  n.type && n.type.t && n.ref && (n.props.ref = n.ref, n.ref = null), A && A(n);
};

var k = function (n, t) {
  return n ? Object(preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"])(n).reduce(function (n, e, r) {
    return n.concat(t(e, r));
  }, []) : null;
},
    R = {
  map: k,
  forEach: k,
  count: function (n) {
    return n ? Object(preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"])(n).length : 0;
  },
  only: function (n) {
    if (1 !== (n = Object(preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"])(n)).length) throw new Error("Children.only() expects only one child.");
    return n[0];
  },
  toArray: preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"]
},
    F = preact__WEBPACK_IMPORTED_MODULE_1__["options"].__e;

function N(n) {
  return n && ((n = E({}, n)).__c = null, n.__k = n.__k && n.__k.map(N)), n;
}

function U() {
  this.__u = 0, this.o = null, this.__b = null;
}

function M(n) {
  var t = n.__.__c;
  return t && t.u && t.u(n);
}

function L(n) {
  var t, e, r;

  function o(o) {
    if (t || (t = n()).then(function (n) {
      e = n.default || n;
    }, function (n) {
      r = n;
    }), r) throw r;
    if (!e) throw t;
    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["createElement"])(e, o);
  }

  return o.displayName = "Lazy", o.t = !0, o;
}

function O() {
  this.i = null, this.l = null;
}

preact__WEBPACK_IMPORTED_MODULE_1__["options"].__e = function (n, t, e) {
  if (n.then) for (var r, o = t; o = o.__;) if ((r = o.__c) && r.__c) return r.__c(n, t.__c);
  F(n, t, e);
}, (U.prototype = new preact__WEBPACK_IMPORTED_MODULE_1__["Component"]()).__c = function (n, t) {
  var e = this;
  null == e.o && (e.o = []), e.o.push(t);

  var r = M(e.__v),
      o = !1,
      u = function () {
    o || (o = !0, r ? r(i) : i());
  };

  t.__c = t.componentWillUnmount, t.componentWillUnmount = function () {
    u(), t.__c && t.__c();
  };

  var i = function () {
    var n;
    if (! --e.__u) for (e.__v.__k[0] = e.state.u, e.setState({
      u: e.__b = null
    }); n = e.o.pop();) n.forceUpdate();
  };

  e.__u++ || e.setState({
    u: e.__b = e.__v.__k[0]
  }), n.then(u, u);
}, U.prototype.render = function (n, t) {
  return this.__b && (this.__v.__k[0] = N(this.__b), this.__b = null), [Object(preact__WEBPACK_IMPORTED_MODULE_1__["createElement"])(preact__WEBPACK_IMPORTED_MODULE_1__["Component"], null, t.u ? null : n.children), t.u && n.fallback];
};

var P = function (n, t, e) {
  if (++e[1] === e[0] && n.l.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for (e = n.i; e;) {
    for (; e.length > 3;) e.pop()();

    if (e[1] < e[0]) break;
    n.i = e = e[2];
  }
};

(O.prototype = new preact__WEBPACK_IMPORTED_MODULE_1__["Component"]()).u = function (n) {
  var t = this,
      e = M(t.__v),
      r = t.l.get(n);
  return r[0]++, function (o) {
    var u = function () {
      t.props.revealOrder ? (r.push(o), P(t, n, r)) : o();
    };

    e ? e(u) : u();
  };
}, O.prototype.render = function (n) {
  this.i = null, this.l = new Map();
  var t = Object(preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"])(n.children);
  n.revealOrder && "b" === n.revealOrder[0] && t.reverse();

  for (var e = t.length; e--;) this.l.set(t[e], this.i = [1, 0, this.i]);

  return n.children;
}, O.prototype.componentDidUpdate = O.prototype.componentDidMount = function () {
  var n = this;
  n.l.forEach(function (t, e) {
    P(n, e, t);
  });
};

var W = function () {
  function n() {}

  var t = n.prototype;
  return t.getChildContext = function () {
    return this.props.context;
  }, t.render = function (n) {
    return n.children;
  }, n;
}();

function j(n) {
  var t = this,
      e = n.container,
      r = Object(preact__WEBPACK_IMPORTED_MODULE_1__["createElement"])(W, {
    context: t.context
  }, n.vnode);
  return t.s && t.s !== e && (t.v.parentNode && t.s.removeChild(t.v), Object(preact__WEBPACK_IMPORTED_MODULE_1__["_unmount"])(t.h), t.p = !1), n.vnode ? t.p ? (e.__k = t.__k, Object(preact__WEBPACK_IMPORTED_MODULE_1__["render"])(r, e), t.__k = e.__k) : (t.v = document.createTextNode(""), Object(preact__WEBPACK_IMPORTED_MODULE_1__["hydrate"])("", e), e.appendChild(t.v), t.p = !0, t.s = e, Object(preact__WEBPACK_IMPORTED_MODULE_1__["render"])(r, e, t.v), t.__k = t.v.__k) : t.p && (t.v.parentNode && t.s.removeChild(t.v), Object(preact__WEBPACK_IMPORTED_MODULE_1__["_unmount"])(t.h)), t.h = r, t.componentWillUnmount = function () {
    t.v.parentNode && t.s.removeChild(t.v), Object(preact__WEBPACK_IMPORTED_MODULE_1__["_unmount"])(t.h);
  }, null;
}

function z(n, t) {
  return Object(preact__WEBPACK_IMPORTED_MODULE_1__["createElement"])(j, {
    vnode: n,
    container: t
  });
}

var D = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
preact__WEBPACK_IMPORTED_MODULE_1__["Component"].prototype.isReactComponent = {};
var H = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;

function T(n, t, e) {
  if (null == t.__k) for (; t.firstChild;) t.removeChild(t.firstChild);
  return Object(preact__WEBPACK_IMPORTED_MODULE_1__["render"])(n, t), "function" == typeof e && e(), n ? n.__c : null;
}

function V(n, t, e) {
  return Object(preact__WEBPACK_IMPORTED_MODULE_1__["hydrate"])(n, t), "function" == typeof e && e(), n ? n.__c : null;
}

var Z = preact__WEBPACK_IMPORTED_MODULE_1__["options"].event;

function I(n, t) {
  n["UNSAFE_" + t] && !n[t] && Object.defineProperty(n, t, {
    configurable: !1,
    get: function () {
      return this["UNSAFE_" + t];
    },
    set: function (n) {
      this["UNSAFE_" + t] = n;
    }
  });
}

preact__WEBPACK_IMPORTED_MODULE_1__["options"].event = function (n) {
  Z && (n = Z(n)), n.persist = function () {};
  var t = !1,
      e = !1,
      r = n.stopPropagation;

  n.stopPropagation = function () {
    r.call(n), t = !0;
  };

  var o = n.preventDefault;
  return n.preventDefault = function () {
    o.call(n), e = !0;
  }, n.isPropagationStopped = function () {
    return t;
  }, n.isDefaultPrevented = function () {
    return e;
  }, n.nativeEvent = n;
};

var $ = {
  configurable: !0,
  get: function () {
    return this.class;
  }
},
    q = preact__WEBPACK_IMPORTED_MODULE_1__["options"].vnode;

preact__WEBPACK_IMPORTED_MODULE_1__["options"].vnode = function (n) {
  n.$$typeof = H;
  var t = n.type,
      e = n.props;

  if (t) {
    if (e.class != e.className && ($.enumerable = "className" in e, null != e.className && (e.class = e.className), Object.defineProperty(e, "className", $)), "function" != typeof t) {
      var r, o, u;

      for (u in e.defaultValue && void 0 !== e.value && (e.value || 0 === e.value || (e.value = e.defaultValue), delete e.defaultValue), Array.isArray(e.value) && e.multiple && "select" === t && (Object(preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"])(e.children).forEach(function (n) {
        -1 != e.value.indexOf(n.props.value) && (n.props.selected = !0);
      }), delete e.value), e) if (r = D.test(u)) break;

      if (r) for (u in o = n.props = {}, e) o[D.test(u) ? u.replace(/[A-Z0-9]/, "-$&").toLowerCase() : u] = e[u];
    }

    !function (t) {
      var e = n.type,
          r = n.props;

      if (r && "string" == typeof e) {
        var o = {};

        for (var u in r) /^on(Ani|Tra|Tou)/.test(u) && (r[u.toLowerCase()] = r[u], delete r[u]), o[u.toLowerCase()] = u;

        if (o.ondoubleclick && (r.ondblclick = r[o.ondoubleclick], delete r[o.ondoubleclick]), o.onbeforeinput && (r.onbeforeinput = r[o.onbeforeinput], delete r[o.onbeforeinput]), o.onchange && ("textarea" === e || "input" === e.toLowerCase() && !/^fil|che|ra/i.test(r.type))) {
          var i = o.oninput || "oninput";
          r[i] || (r[i] = r[o.onchange], delete r[o.onchange]);
        }
      }
    }(), "function" == typeof t && !t.m && t.prototype && (I(t.prototype, "componentWillMount"), I(t.prototype, "componentWillReceiveProps"), I(t.prototype, "componentWillUpdate"), t.m = !0);
  }

  q && q(n);
};

var B = "16.8.0";

function G(n) {
  return preact__WEBPACK_IMPORTED_MODULE_1__["createElement"].bind(null, n);
}

function J(n) {
  return !!n && n.$$typeof === H;
}

function K(n) {
  return J(n) ? preact__WEBPACK_IMPORTED_MODULE_1__["cloneElement"].apply(null, arguments) : n;
}

function Q(n) {
  return !!n.__k && (Object(preact__WEBPACK_IMPORTED_MODULE_1__["render"])(null, n), !0);
}

function X(n) {
  return n && (n.base || 1 === n.nodeType && n) || null;
}

var Y = function (n, t) {
  return n(t);
};

/* harmony default export */ __webpack_exports__["default"] = ({
  useState: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useState"],
  useReducer: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useReducer"],
  useEffect: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useEffect"],
  useLayoutEffect: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"],
  useRef: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useRef"],
  useImperativeHandle: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useImperativeHandle"],
  useMemo: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useMemo"],
  useCallback: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useCallback"],
  useContext: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useContext"],
  useDebugValue: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useDebugValue"],
  version: "16.8.0",
  Children: R,
  render: T,
  hydrate: T,
  unmountComponentAtNode: Q,
  createPortal: z,
  createElement: preact__WEBPACK_IMPORTED_MODULE_1__["createElement"],
  createContext: preact__WEBPACK_IMPORTED_MODULE_1__["createContext"],
  createFactory: G,
  cloneElement: K,
  createRef: preact__WEBPACK_IMPORTED_MODULE_1__["createRef"],
  Fragment: preact__WEBPACK_IMPORTED_MODULE_1__["Fragment"],
  isValidElement: J,
  findDOMNode: X,
  Component: preact__WEBPACK_IMPORTED_MODULE_1__["Component"],
  PureComponent: C,
  memo: _,
  forwardRef: S,
  unstable_batchedUpdates: Y,
  Suspense: U,
  SuspenseList: O,
  lazy: L
});


/***/ }),

/***/ "./node_modules/preact/dist/preact.module.js":
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/*! exports provided: render, hydrate, createElement, h, Fragment, createRef, isValidElement, Component, cloneElement, createContext, toChildArray, _unmount, options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return H; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return I; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return L; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return M; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toChildArray", function() { return x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_unmount", function() { return D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return n; });
var n,
    l,
    u,
    i,
    t,
    r,
    o,
    f,
    e = {},
    c = [],
    s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

function a(n, l) {
  for (var u in l) n[u] = l[u];

  return n;
}

function v(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function h(n, l, u) {
  var i,
      t = arguments,
      r = {};

  for (i in l) "key" !== i && "ref" !== i && (r[i] = l[i]);

  if (arguments.length > 3) for (u = [u], i = 3; i < arguments.length; i++) u.push(t[i]);
  if (null != u && (r.children = u), "function" == typeof n && null != n.defaultProps) for (i in n.defaultProps) void 0 === r[i] && (r[i] = n.defaultProps[i]);
  return p(n, r, l && l.key, l && l.ref, null);
}

function p(l, u, i, t, r) {
  var o = {
    type: l,
    props: u,
    key: i,
    ref: t,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    constructor: void 0,
    __v: r
  };
  return null == r && (o.__v = o), n.vnode && n.vnode(o), o;
}

function y() {
  return {};
}

function d(n) {
  return n.children;
}

function m(n, l) {
  this.props = n, this.context = l;
}

function w(n, l) {
  if (null == l) return n.__ ? w(n.__, n.__.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

  return "function" == typeof n.type ? w(n) : null;
}

function k(n) {
  var l, u;

  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
      n.__e = n.__c.base = u.__e;
      break;
    }

    return k(n);
  }
}

function g(l) {
  (!l.__d && (l.__d = !0) && u.push(l) && !i++ || r !== n.debounceRendering) && ((r = n.debounceRendering) || t)(_);
}

function _() {
  for (var n; i = u.length;) n = u.sort(function (n, l) {
    return n.__v.__b - l.__v.__b;
  }), u = [], n.some(function (n) {
    var l, u, i, t, r, o, f;
    n.__d && (o = (r = (l = n).__v).__e, (f = l.__P) && (u = [], (i = a({}, r)).__v = i, t = A(f, r, i, l.__n, void 0 !== f.ownerSVGElement, null, u, null == o ? w(r) : o), T(u, r), t != o && k(r)));
  });
}

function b(n, l, u, i, t, r, o, f, s) {
  var a,
      h,
      p,
      y,
      d,
      m,
      k,
      g = u && u.__k || c,
      _ = g.length;
  if (f == e && (f = null != r ? r[0] : _ ? w(u, 0) : null), a = 0, l.__k = x(l.__k, function (u) {
    if (null != u) {
      if (u.__ = l, u.__b = l.__b + 1, null === (p = g[a]) || p && u.key == p.key && u.type === p.type) g[a] = void 0;else for (h = 0; h < _; h++) {
        if ((p = g[h]) && u.key == p.key && u.type === p.type) {
          g[h] = void 0;
          break;
        }

        p = null;
      }

      if (y = A(n, u, p = p || e, i, t, r, o, f, s), (h = u.ref) && p.ref != h && (k || (k = []), p.ref && k.push(p.ref, null, u), k.push(h, u.__c || y, u)), null != y) {
        var c;
        if (null == m && (m = y), void 0 !== u.__d) c = u.__d, u.__d = void 0;else if (r == p || y != f || null == y.parentNode) {
          n: if (null == f || f.parentNode !== n) n.appendChild(y), c = null;else {
            for (d = f, h = 0; (d = d.nextSibling) && h < _; h += 2) if (d == y) break n;

            n.insertBefore(y, f), c = f;
          }

          "option" == l.type && (n.value = "");
        }
        f = void 0 !== c ? c : y.nextSibling, "function" == typeof l.type && (l.__d = f);
      } else f && p.__e == f && f.parentNode != n && (f = w(p));
    }

    return a++, u;
  }), l.__e = m, null != r && "function" != typeof l.type) for (a = r.length; a--;) null != r[a] && v(r[a]);

  for (a = _; a--;) null != g[a] && D(g[a], g[a]);

  if (k) for (a = 0; a < k.length; a++) j(k[a], k[++a], k[++a]);
}

function x(n, l, u) {
  if (null == u && (u = []), null == n || "boolean" == typeof n) l && u.push(l(null));else if (Array.isArray(n)) for (var i = 0; i < n.length; i++) x(n[i], l, u);else u.push(l ? l("string" == typeof n || "number" == typeof n ? p(null, n, null, null, n) : null != n.__e || null != n.__c ? p(n.type, n.props, n.key, null, n.__v) : n) : n);
  return u;
}

function P(n, l, u, i, t) {
  var r;

  for (r in u) "children" === r || "key" === r || r in l || N(n, r, null, u[r], i);

  for (r in l) t && "function" != typeof l[r] || "children" === r || "key" === r || "value" === r || "checked" === r || u[r] === l[r] || N(n, r, l[r], u[r], i);
}

function C(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === s.test(l) ? u + "px" : null == u ? "" : u;
}

function N(n, l, u, i, t) {
  var r, o, f, e, c;
  if (t ? "className" === l && (l = "class") : "class" === l && (l = "className"), "style" === l) {
    if (r = n.style, "string" == typeof u) r.cssText = u;else {
      if ("string" == typeof i && (r.cssText = "", i = null), i) for (e in i) u && e in u || C(r, e, "");
      if (u) for (c in u) i && u[c] === i[c] || C(r, c, u[c]);
    }
  } else "o" === l[0] && "n" === l[1] ? (o = l !== (l = l.replace(/Capture$/, "")), f = l.toLowerCase(), l = (f in n ? f : l).slice(2), u ? (i || n.addEventListener(l, z, o), (n.l || (n.l = {}))[l] = u) : n.removeEventListener(l, z, o)) : "list" !== l && "tagName" !== l && "form" !== l && "type" !== l && "size" !== l && !t && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u && !/^ar/.test(l) ? n.removeAttribute(l) : n.setAttribute(l, u));
}

function z(l) {
  this.l[l.type](n.event ? n.event(l) : l);
}

function A(l, u, i, t, r, o, f, e, c) {
  var s,
      v,
      h,
      p,
      y,
      w,
      k,
      g,
      _,
      x,
      P = u.type;

  if (void 0 !== u.constructor) return null;
  (s = n.__b) && s(u);

  try {
    n: if ("function" == typeof P) {
      if (g = u.props, _ = (s = P.contextType) && t[s.__c], x = s ? _ ? _.props.value : s.__ : t, i.__c ? k = (v = u.__c = i.__c).__ = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(g, x) : (u.__c = v = new m(g, x), v.constructor = P, v.render = E), _ && _.sub(v), v.props = g, v.state || (v.state = {}), v.context = x, v.__n = t, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != P.getDerivedStateFromProps && (v.__s == v.state && (v.__s = a({}, v.__s)), a(v.__s, P.getDerivedStateFromProps(g, v.__s))), p = v.props, y = v.state, h) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && v.__h.push(v.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && g !== p && null != v.componentWillReceiveProps && v.componentWillReceiveProps(g, x), !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(g, v.__s, x) || u.__v === i.__v && !v.__) {
          for (v.props = g, v.state = v.__s, u.__v !== i.__v && (v.__d = !1), v.__v = u, u.__e = i.__e, u.__k = i.__k, v.__h.length && f.push(v), s = 0; s < u.__k.length; s++) u.__k[s] && (u.__k[s].__ = u);

          break n;
        }

        null != v.componentWillUpdate && v.componentWillUpdate(g, v.__s, x), null != v.componentDidUpdate && v.__h.push(function () {
          v.componentDidUpdate(p, y, w);
        });
      }
      v.context = x, v.props = g, v.state = v.__s, (s = n.__r) && s(u), v.__d = !1, v.__v = u, v.__P = l, s = v.render(v.props, v.state, v.context), u.__k = null != s && s.type == d && null == s.key ? s.props.children : Array.isArray(s) ? s : [s], null != v.getChildContext && (t = a(a({}, t), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (w = v.getSnapshotBeforeUpdate(p, y)), b(l, u, i, t, r, o, f, e, c), v.base = u.__e, v.__h.length && f.push(v), k && (v.__E = v.__ = null), v.__e = !1;
    } else null == o && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = $(i.__e, u, i, t, r, o, f, c);

    (s = n.diffed) && s(u);
  } catch (l) {
    u.__v = null, n.__e(l, u, i);
  }

  return u.__e;
}

function T(l, u) {
  n.__c && n.__c(u, l), l.some(function (u) {
    try {
      l = u.__h, u.__h = [], l.some(function (n) {
        n.call(u);
      });
    } catch (l) {
      n.__e(l, u.__v);
    }
  });
}

function $(n, l, u, i, t, r, o, f) {
  var s,
      a,
      v,
      h,
      p,
      y = u.props,
      d = l.props;
  if (t = "svg" === l.type || t, null != r) for (s = 0; s < r.length; s++) if (null != (a = r[s]) && ((null === l.type ? 3 === a.nodeType : a.localName === l.type) || n == a)) {
    n = a, r[s] = null;
    break;
  }

  if (null == n) {
    if (null === l.type) return document.createTextNode(d);
    n = t ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type, d.is && {
      is: d.is
    }), r = null, f = !1;
  }

  if (null === l.type) y !== d && n.data != d && (n.data = d);else {
    if (null != r && (r = c.slice.call(n.childNodes)), v = (y = u.props || e).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !f) {
      if (y === e) for (y = {}, p = 0; p < n.attributes.length; p++) y[n.attributes[p].name] = n.attributes[p].value;
      (h || v) && (h && v && h.__html == v.__html || (n.innerHTML = h && h.__html || ""));
    }

    P(n, d, y, t, f), h ? l.__k = [] : (l.__k = l.props.children, b(n, l, u, i, "foreignObject" !== l.type && t, r, o, e, f)), f || ("value" in d && void 0 !== (s = d.value) && s !== n.value && N(n, "value", s, y.value, !1), "checked" in d && void 0 !== (s = d.checked) && s !== n.checked && N(n, "checked", s, y.checked, !1));
  }
  return n;
}

function j(l, u, i) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, i);
  }
}

function D(l, u, i) {
  var t, r, o;

  if (n.unmount && n.unmount(l), (t = l.ref) && (t.current && t.current !== l.__e || j(t, null, u)), i || "function" == typeof l.type || (i = null != (r = l.__e)), l.__e = l.__d = void 0, null != (t = l.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }
    t.base = t.__P = null;
  }

  if (t = l.__k) for (o = 0; o < t.length; o++) t[o] && D(t[o], u, i);
  null != r && v(r);
}

function E(n, l, u) {
  return this.constructor(n, u);
}

function H(l, u, i) {
  var t, r, f;
  n.__ && n.__(l, u), r = (t = i === o) ? null : i && i.__k || u.__k, l = h(d, null, [l]), f = [], A(u, (t ? u : i || u).__k = l, r || e, e, void 0 !== u.ownerSVGElement, i && !t ? [i] : r ? null : c.slice.call(u.childNodes), f, i || e, t), T(f, l);
}

function I(n, l) {
  H(n, l, o);
}

function L(n, l) {
  var u, i;

  for (i in l = a(a({}, n.props), l), arguments.length > 2 && (l.children = c.slice.call(arguments, 2)), u = {}, l) "key" !== i && "ref" !== i && (u[i] = l[i]);

  return p(n.type, u, l.key || n.key, l.ref || n.ref, null);
}

function M(n) {
  var l = {},
      u = {
    __c: "__cC" + f++,
    __: n,
    Consumer: function (n, l) {
      return n.children(l);
    },
    Provider: function (n) {
      var i,
          t = this;
      return this.getChildContext || (i = [], this.getChildContext = function () {
        return l[u.__c] = t, l;
      }, this.shouldComponentUpdate = function (n) {
        t.props.value !== n.value && i.some(function (l) {
          l.context = n.value, g(l);
        });
      }, this.sub = function (n) {
        i.push(n);
        var l = n.componentWillUnmount;

        n.componentWillUnmount = function () {
          i.splice(i.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Consumer.contextType = u, u.Provider.__ = u, u;
}

n = {
  __e: function (n, l) {
    for (var u, i; l = l.__;) if ((u = l.__c) && !u.__) try {
      if (u.constructor && null != u.constructor.getDerivedStateFromError && (i = !0, u.setState(u.constructor.getDerivedStateFromError(n))), null != u.componentDidCatch && (i = !0, u.componentDidCatch(n)), i) return g(u.__E = u);
    } catch (l) {
      n = l;
    }

    throw n;
  }
}, l = function (n) {
  return null != n && void 0 === n.constructor;
}, m.prototype.setState = function (n, l) {
  var u;
  u = this.__s !== this.state ? this.__s : this.__s = a({}, this.state), "function" == typeof n && (n = n(u, this.props)), n && a(u, n), null != n && this.__v && (l && this.__h.push(l), g(this));
}, m.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), g(this));
}, m.prototype.render = d, u = [], i = 0, t = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = e, f = 0;


/***/ }),

/***/ "./node_modules/preact/hooks/dist/hooks.module.js":
/*!********************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************/
/*! exports provided: useState, useReducer, useEffect, useLayoutEffect, useRef, useImperativeHandle, useMemo, useCallback, useContext, useDebugValue, useErrorBoundary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useReducer", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useEffect", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLayoutEffect", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRef", function() { return d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useImperativeHandle", function() { return s; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMemo", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCallback", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useContext", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDebugValue", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useErrorBoundary", function() { return F; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var t,
    u,
    r,
    i = 0,
    o = [],
    c = preact__WEBPACK_IMPORTED_MODULE_0__["options"].__r,
    f = preact__WEBPACK_IMPORTED_MODULE_0__["options"].diffed,
    e = preact__WEBPACK_IMPORTED_MODULE_0__["options"].__c,
    a = preact__WEBPACK_IMPORTED_MODULE_0__["options"].unmount;

function v(t, r) {
  preact__WEBPACK_IMPORTED_MODULE_0__["options"].__h && preact__WEBPACK_IMPORTED_MODULE_0__["options"].__h(u, t, i || r), i = 0;
  var o = u.__H || (u.__H = {
    __: [],
    __h: []
  });
  return t >= o.__.length && o.__.push({}), o.__[t];
}

function m(n) {
  return i = 1, p(E, n);
}

function p(n, r, i) {
  var o = v(t++, 2);
  return o.__c || (o.__c = u, o.__ = [i ? i(r) : E(void 0, r), function (t) {
    var u = n(o.__[0], t);
    o.__[0] !== u && (o.__[0] = u, o.__c.setState({}));
  }]), o.__;
}

function l(r, i) {
  var o = v(t++, 3);
  !preact__WEBPACK_IMPORTED_MODULE_0__["options"].__s && x(o.__H, i) && (o.__ = r, o.__H = i, u.__H.__h.push(o));
}

function y(r, i) {
  var o = v(t++, 4);
  !preact__WEBPACK_IMPORTED_MODULE_0__["options"].__s && x(o.__H, i) && (o.__ = r, o.__H = i, u.__h.push(o));
}

function d(n) {
  return i = 5, h(function () {
    return {
      current: n
    };
  }, []);
}

function s(n, t, u) {
  i = 6, y(function () {
    "function" == typeof n ? n(t()) : n && (n.current = t());
  }, null == u ? u : u.concat(n));
}

function h(n, u) {
  var r = v(t++, 7);
  return x(r.__H, u) ? (r.__H = u, r.__h = n, r.__ = n()) : r.__;
}

function T(n, t) {
  return i = 8, h(function () {
    return n;
  }, t);
}

function w(n) {
  var r = u.context[n.__c],
      i = v(t++, 9);
  return i.__c = n, r ? (null == i.__ && (i.__ = !0, r.sub(u)), r.props.value) : n.__;
}

function A(t, u) {
  preact__WEBPACK_IMPORTED_MODULE_0__["options"].useDebugValue && preact__WEBPACK_IMPORTED_MODULE_0__["options"].useDebugValue(u ? u(t) : t);
}

function F(n) {
  var r = v(t++, 10),
      i = m();
  return r.__ = n, u.componentDidCatch || (u.componentDidCatch = function (n) {
    r.__ && r.__(n), i[1](n);
  }), [i[0], function () {
    i[1](void 0);
  }];
}

function _() {
  o.some(function (t) {
    if (t.__P) try {
      t.__H.__h.forEach(g), t.__H.__h.forEach(q), t.__H.__h = [];
    } catch (u) {
      return t.__H.__h = [], preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(u, t.__v), !0;
    }
  }), o = [];
}

function g(n) {
  n.t && n.t();
}

function q(n) {
  var t = n.__();

  "function" == typeof t && (n.t = t);
}

function x(n, t) {
  return !n || t.some(function (t, u) {
    return t !== n[u];
  });
}

function E(n, t) {
  return "function" == typeof t ? t(n) : t;
}

preact__WEBPACK_IMPORTED_MODULE_0__["options"].__r = function (n) {
  c && c(n), t = 0, (u = n.__c).__H && (u.__H.__h.forEach(g), u.__H.__h.forEach(q), u.__H.__h = []);
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].diffed = function (t) {
  f && f(t);
  var u = t.__c;

  if (u) {
    var i = u.__H;
    i && i.__h.length && (1 !== o.push(u) && r === preact__WEBPACK_IMPORTED_MODULE_0__["options"].requestAnimationFrame || ((r = preact__WEBPACK_IMPORTED_MODULE_0__["options"].requestAnimationFrame) || function (n) {
      var t,
          u = function () {
        clearTimeout(r), cancelAnimationFrame(t), setTimeout(n);
      },
          r = setTimeout(u, 100);

      "undefined" != typeof window && (t = requestAnimationFrame(u));
    })(_));
  }
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].__c = function (t, u) {
  u.some(function (t) {
    try {
      t.__h.forEach(g), t.__h = t.__h.filter(function (n) {
        return !n.__ || q(n);
      });
    } catch (r) {
      u.some(function (n) {
        n.__h && (n.__h = []);
      }), u = [], preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(r, t.__v);
    }
  }), e && e(t, u);
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].unmount = function (t) {
  a && a(t);
  var u = t.__c;

  if (u) {
    var r = u.__H;
    if (r) try {
      r.__.forEach(function (n) {
        return n.t && n.t();
      });
    } catch (t) {
      preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(t, u.__v);
    }
  }
};


/***/ }),

/***/ "./node_modules/qrcode/lib/browser.js":
/*!********************************************!*\
  !*** ./node_modules/qrcode/lib/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var canPromise = __webpack_require__(/*! ./can-promise */ "./node_modules/qrcode/lib/can-promise.js");

var QRCode = __webpack_require__(/*! ./core/qrcode */ "./node_modules/qrcode/lib/core/qrcode.js");

var CanvasRenderer = __webpack_require__(/*! ./renderer/canvas */ "./node_modules/qrcode/lib/renderer/canvas.js");

var SvgRenderer = __webpack_require__(/*! ./renderer/svg-tag.js */ "./node_modules/qrcode/lib/renderer/svg-tag.js");

function renderCanvas(renderFunc, canvas, text, opts, cb) {
  var args = [].slice.call(arguments, 1);
  var argsNum = args.length;
  var isLastArgCb = typeof args[argsNum - 1] === 'function';

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument');
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided');
    }

    if (argsNum === 2) {
      cb = text;
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts;
        opts = undefined;
      } else {
        cb = opts;
        opts = text;
        text = canvas;
        canvas = undefined;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided');
    }

    if (argsNum === 1) {
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text;
      text = canvas;
      canvas = undefined;
    }

    return new Promise(function (resolve, reject) {
      try {
        var data = QRCode.create(text, opts);
        resolve(renderFunc(data, canvas, opts));
      } catch (e) {
        reject(e);
      }
    });
  }

  try {
    var data = QRCode.create(text, opts);
    cb(null, renderFunc(data, canvas, opts));
  } catch (e) {
    cb(e);
  }
}

exports.create = QRCode.create;
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL); // only svg for now.

exports.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts);
});

/***/ }),

/***/ "./node_modules/qrcode/lib/can-promise.js":
/*!************************************************!*\
  !*** ./node_modules/qrcode/lib/can-promise.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
module.exports = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/alignment-pattern.js":
/*!***********************************************************!*\
  !*** ./node_modules/qrcode/lib/core/alignment-pattern.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */
var getSymbolSize = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js").getSymbolSize;
/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */


exports.getRowColCoords = function getRowColCoords(version) {
  if (version === 1) return [];
  var posCount = Math.floor(version / 7) + 2;
  var size = getSymbolSize(version);
  var intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
  var positions = [size - 7]; // Last coord is always (size - 7)

  for (var i = 1; i < posCount - 1; i++) {
    positions[i] = positions[i - 1] - intervals;
  }

  positions.push(6); // First coord is always 6

  return positions.reverse();
};
/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * var pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */


exports.getPositions = function getPositions(version) {
  var coords = [];
  var pos = exports.getRowColCoords(version);
  var posLength = pos.length;

  for (var i = 0; i < posLength; i++) {
    for (var j = 0; j < posLength; j++) {
      // Skip if position is occupied by finder patterns
      if (i === 0 && j === 0 || // top-left
      i === 0 && j === posLength - 1 || // bottom-left
      i === posLength - 1 && j === 0) {
        // top-right
        continue;
      }

      coords.push([pos[i], pos[j]]);
    }
  }

  return coords;
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/alphanumeric-data.js":
/*!***********************************************************!*\
  !*** ./node_modules/qrcode/lib/core/alphanumeric-data.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js");
/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */


var ALPHA_NUM_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':'];

function AlphanumericData(data) {
  this.mode = Mode.ALPHANUMERIC;
  this.data = data;
}

AlphanumericData.getBitsLength = function getBitsLength(length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2);
};

AlphanumericData.prototype.getLength = function getLength() {
  return this.data.length;
};

AlphanumericData.prototype.getBitsLength = function getBitsLength() {
  return AlphanumericData.getBitsLength(this.data.length);
};

AlphanumericData.prototype.write = function write(bitBuffer) {
  var i; // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.

  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    var value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45; // The character value of the second digit is added to the product

    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]); // The sum is then stored as 11-bit binary number

    bitBuffer.put(value, 11);
  } // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.


  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};

module.exports = AlphanumericData;

/***/ }),

/***/ "./node_modules/qrcode/lib/core/bit-buffer.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/bit-buffer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function BitBuffer() {
  this.buffer = [];
  this.length = 0;
}

BitBuffer.prototype = {
  get: function (index) {
    var bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
  },
  put: function (num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) === 1);
    }
  },
  getLengthInBits: function () {
    return this.length;
  },
  putBit: function (bit) {
    var bufIndex = Math.floor(this.length / 8);

    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }

    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }

    this.length++;
  }
};
module.exports = BitBuffer;

/***/ }),

/***/ "./node_modules/qrcode/lib/core/bit-matrix.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/bit-matrix.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ "./node_modules/qrcode/lib/utils/typedarray-buffer.js");
/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */


function BitMatrix(size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0');
  }

  this.size = size;
  this.data = BufferUtil.alloc(size * size);
  this.reservedBit = BufferUtil.alloc(size * size);
}
/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */


BitMatrix.prototype.set = function (row, col, value, reserved) {
  var index = row * this.size + col;
  this.data[index] = value;
  if (reserved) this.reservedBit[index] = true;
};
/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */


BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col];
};
/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */


BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value;
};
/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */


BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col];
};

module.exports = BitMatrix;

/***/ }),

/***/ "./node_modules/qrcode/lib/core/byte-data.js":
/*!***************************************************!*\
  !*** ./node_modules/qrcode/lib/core/byte-data.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ "./node_modules/qrcode/lib/utils/typedarray-buffer.js");

var Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js");

function ByteData(data) {
  this.mode = Mode.BYTE;
  this.data = BufferUtil.from(data);
}

ByteData.getBitsLength = function getBitsLength(length) {
  return length * 8;
};

ByteData.prototype.getLength = function getLength() {
  return this.data.length;
};

ByteData.prototype.getBitsLength = function getBitsLength() {
  return ByteData.getBitsLength(this.data.length);
};

ByteData.prototype.write = function (bitBuffer) {
  for (var i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8);
  }
};

module.exports = ByteData;

/***/ }),

/***/ "./node_modules/qrcode/lib/core/error-correction-code.js":
/*!***************************************************************!*\
  !*** ./node_modules/qrcode/lib/core/error-correction-code.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ECLevel = __webpack_require__(/*! ./error-correction-level */ "./node_modules/qrcode/lib/core/error-correction-level.js");

var EC_BLOCKS_TABLE = [// L  M  Q  H
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81];
var EC_CODEWORDS_TABLE = [// L  M  Q  H
7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];
/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */

exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];

    case ECLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];

    case ECLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];

    case ECLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];

    default:
      return undefined;
  }
};
/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */


exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];

    case ECLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];

    case ECLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];

    case ECLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];

    default:
      return undefined;
  }
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/error-correction-level.js":
/*!****************************************************************!*\
  !*** ./node_modules/qrcode/lib/core/error-correction-level.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.L = {
  bit: 1
};
exports.M = {
  bit: 0
};
exports.Q = {
  bit: 3
};
exports.H = {
  bit: 2
};

function fromString(string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string');
  }

  var lcStr = string.toLowerCase();

  switch (lcStr) {
    case 'l':
    case 'low':
      return exports.L;

    case 'm':
    case 'medium':
      return exports.M;

    case 'q':
    case 'quartile':
      return exports.Q;

    case 'h':
    case 'high':
      return exports.H;

    default:
      throw new Error('Unknown EC Level: ' + string);
  }
}

exports.isValid = function isValid(level) {
  return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
};

exports.from = function from(value, defaultValue) {
  if (exports.isValid(value)) {
    return value;
  }

  try {
    return fromString(value);
  } catch (e) {
    return defaultValue;
  }
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/finder-pattern.js":
/*!********************************************************!*\
  !*** ./node_modules/qrcode/lib/core/finder-pattern.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getSymbolSize = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js").getSymbolSize;

var FINDER_PATTERN_SIZE = 7;
/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */

exports.getPositions = function getPositions(version) {
  var size = getSymbolSize(version);
  return [// top-left
  [0, 0], // top-right
  [size - FINDER_PATTERN_SIZE, 0], // bottom-left
  [0, size - FINDER_PATTERN_SIZE]];
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/format-info.js":
/*!*****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/format-info.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js");

var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
var G15_BCH = Utils.getBCHDigit(G15);
/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */

exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
  var data = errorCorrectionLevel.bit << 3 | mask;
  var d = data << 10;

  while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
  } // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string


  return (data << 10 | d) ^ G15_MASK;
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/galois-field.js":
/*!******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/galois-field.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ "./node_modules/qrcode/lib/utils/typedarray-buffer.js");

var EXP_TABLE = BufferUtil.alloc(512);
var LOG_TABLE = BufferUtil.alloc(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */
;

(function initTables() {
  var x = 1;

  for (var i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x <<= 1; // multiply by 2
    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.

    if (x & 0x100) {
      // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D;
    }
  } // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}


  for (i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255];
  }
})();
/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */


exports.log = function log(n) {
  if (n < 1) throw new Error('log(' + n + ')');
  return LOG_TABLE[n];
};
/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */


exports.exp = function exp(n) {
  return EXP_TABLE[n];
};
/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */


exports.mul = function mul(x, y) {
  if (x === 0 || y === 0) return 0; // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}

  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/kanji-data.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/kanji-data.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js");

var Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js");

function KanjiData(data) {
  this.mode = Mode.KANJI;
  this.data = data;
}

KanjiData.getBitsLength = function getBitsLength(length) {
  return length * 13;
};

KanjiData.prototype.getLength = function getLength() {
  return this.data.length;
};

KanjiData.prototype.getBitsLength = function getBitsLength() {
  return KanjiData.getBitsLength(this.data.length);
};

KanjiData.prototype.write = function (bitBuffer) {
  var i; // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.

  for (i = 0; i < this.data.length; i++) {
    var value = Utils.toSJIS(this.data[i]); // For characters with Shift JIS values from 0x8140 to 0x9FFC:

    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140; // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140;
    } else {
      throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
    } // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product


    value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff); // Convert result to a 13-bit binary string

    bitBuffer.put(value, 13);
  }
};

module.exports = KanjiData;

/***/ }),

/***/ "./node_modules/qrcode/lib/core/mask-pattern.js":
/*!******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/mask-pattern.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Data mask pattern reference
 * @type {Object}
 */
exports.Patterns = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */

var PenaltyScores = {
  N1: 3,
  N2: 3,
  N3: 40,
  N4: 10
};
/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */

exports.isValid = function isValid(mask) {
  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
};
/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */


exports.from = function from(value) {
  return exports.isValid(value) ? parseInt(value, 10) : undefined;
};
/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/


exports.getPenaltyN1 = function getPenaltyN1(data) {
  var size = data.size;
  var points = 0;
  var sameCountCol = 0;
  var sameCountRow = 0;
  var lastCol = null;
  var lastRow = null;

  for (var row = 0; row < size; row++) {
    sameCountCol = sameCountRow = 0;
    lastCol = lastRow = null;

    for (var col = 0; col < size; col++) {
      var module = data.get(row, col);

      if (module === lastCol) {
        sameCountCol++;
      } else {
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        lastCol = module;
        sameCountCol = 1;
      }

      module = data.get(col, row);

      if (module === lastRow) {
        sameCountRow++;
      } else {
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
        lastRow = module;
        sameCountRow = 1;
      }
    }

    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
  }

  return points;
};
/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */


exports.getPenaltyN2 = function getPenaltyN2(data) {
  var size = data.size;
  var points = 0;

  for (var row = 0; row < size - 1; row++) {
    for (var col = 0; col < size - 1; col++) {
      var last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
      if (last === 4 || last === 0) points++;
    }
  }

  return points * PenaltyScores.N2;
};
/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */


exports.getPenaltyN3 = function getPenaltyN3(data) {
  var size = data.size;
  var points = 0;
  var bitsCol = 0;
  var bitsRow = 0;

  for (var row = 0; row < size; row++) {
    bitsCol = bitsRow = 0;

    for (var col = 0; col < size; col++) {
      bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
      bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
    }
  }

  return points * PenaltyScores.N3;
};
/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */


exports.getPenaltyN4 = function getPenaltyN4(data) {
  var darkCount = 0;
  var modulesCount = data.data.length;

  for (var i = 0; i < modulesCount; i++) darkCount += data.data[i];

  var k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
  return k * PenaltyScores.N4;
};
/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */


function getMaskAt(maskPattern, i, j) {
  switch (maskPattern) {
    case exports.Patterns.PATTERN000:
      return (i + j) % 2 === 0;

    case exports.Patterns.PATTERN001:
      return i % 2 === 0;

    case exports.Patterns.PATTERN010:
      return j % 3 === 0;

    case exports.Patterns.PATTERN011:
      return (i + j) % 3 === 0;

    case exports.Patterns.PATTERN100:
      return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;

    case exports.Patterns.PATTERN101:
      return i * j % 2 + i * j % 3 === 0;

    case exports.Patterns.PATTERN110:
      return (i * j % 2 + i * j % 3) % 2 === 0;

    case exports.Patterns.PATTERN111:
      return (i * j % 3 + (i + j) % 2) % 2 === 0;

    default:
      throw new Error('bad maskPattern:' + maskPattern);
  }
}
/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */


exports.applyMask = function applyMask(pattern, data) {
  var size = data.size;

  for (var col = 0; col < size; col++) {
    for (var row = 0; row < size; row++) {
      if (data.isReserved(row, col)) continue;
      data.xor(row, col, getMaskAt(pattern, row, col));
    }
  }
};
/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */


exports.getBestMask = function getBestMask(data, setupFormatFunc) {
  var numPatterns = Object.keys(exports.Patterns).length;
  var bestPattern = 0;
  var lowerPenalty = Infinity;

  for (var p = 0; p < numPatterns; p++) {
    setupFormatFunc(p);
    exports.applyMask(p, data); // Calculate penalty

    var penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data); // Undo previously applied mask

    exports.applyMask(p, data);

    if (penalty < lowerPenalty) {
      lowerPenalty = penalty;
      bestPattern = p;
    }
  }

  return bestPattern;
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/mode.js":
/*!**********************************************!*\
  !*** ./node_modules/qrcode/lib/core/mode.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var VersionCheck = __webpack_require__(/*! ./version-check */ "./node_modules/qrcode/lib/core/version-check.js");

var Regex = __webpack_require__(/*! ./regex */ "./node_modules/qrcode/lib/core/regex.js");
/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */


exports.NUMERIC = {
  id: 'Numeric',
  bit: 1 << 0,
  ccBits: [10, 12, 14]
};
/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */

exports.ALPHANUMERIC = {
  id: 'Alphanumeric',
  bit: 1 << 1,
  ccBits: [9, 11, 13]
};
/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */

exports.BYTE = {
  id: 'Byte',
  bit: 1 << 2,
  ccBits: [8, 16, 16]
};
/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */

exports.KANJI = {
  id: 'Kanji',
  bit: 1 << 3,
  ccBits: [8, 10, 12]
};
/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */

exports.MIXED = {
  bit: -1
};
/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */

exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);

  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid version: ' + version);
  }

  if (version >= 1 && version < 10) return mode.ccBits[0];else if (version < 27) return mode.ccBits[1];
  return mode.ccBits[2];
};
/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */


exports.getBestModeForData = function getBestModeForData(dataStr) {
  if (Regex.testNumeric(dataStr)) return exports.NUMERIC;else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;else if (Regex.testKanji(dataStr)) return exports.KANJI;else return exports.BYTE;
};
/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */


exports.toString = function toString(mode) {
  if (mode && mode.id) return mode.id;
  throw new Error('Invalid mode');
};
/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */


exports.isValid = function isValid(mode) {
  return mode && mode.bit && mode.ccBits;
};
/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */


function fromString(string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string');
  }

  var lcStr = string.toLowerCase();

  switch (lcStr) {
    case 'numeric':
      return exports.NUMERIC;

    case 'alphanumeric':
      return exports.ALPHANUMERIC;

    case 'kanji':
      return exports.KANJI;

    case 'byte':
      return exports.BYTE;

    default:
      throw new Error('Unknown mode: ' + string);
  }
}
/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */


exports.from = function from(value, defaultValue) {
  if (exports.isValid(value)) {
    return value;
  }

  try {
    return fromString(value);
  } catch (e) {
    return defaultValue;
  }
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/numeric-data.js":
/*!******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/numeric-data.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js");

function NumericData(data) {
  this.mode = Mode.NUMERIC;
  this.data = data.toString();
}

NumericData.getBitsLength = function getBitsLength(length) {
  return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};

NumericData.prototype.getLength = function getLength() {
  return this.data.length;
};

NumericData.prototype.getBitsLength = function getBitsLength() {
  return NumericData.getBitsLength(this.data.length);
};

NumericData.prototype.write = function write(bitBuffer) {
  var i, group, value; // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.

  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);
    bitBuffer.put(value, 10);
  } // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.


  var remainingNum = this.data.length - i;

  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);
    bitBuffer.put(value, remainingNum * 3 + 1);
  }
};

module.exports = NumericData;

/***/ }),

/***/ "./node_modules/qrcode/lib/core/polynomial.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/polynomial.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ "./node_modules/qrcode/lib/utils/typedarray-buffer.js");

var GF = __webpack_require__(/*! ./galois-field */ "./node_modules/qrcode/lib/core/galois-field.js");
/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Buffer} p1 Polynomial
 * @param  {Buffer} p2 Polynomial
 * @return {Buffer}    Product of p1 and p2
 */


exports.mul = function mul(p1, p2) {
  var coeff = BufferUtil.alloc(p1.length + p2.length - 1);

  for (var i = 0; i < p1.length; i++) {
    for (var j = 0; j < p2.length; j++) {
      coeff[i + j] ^= GF.mul(p1[i], p2[j]);
    }
  }

  return coeff;
};
/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Buffer} divident Polynomial
 * @param  {Buffer} divisor  Polynomial
 * @return {Buffer}          Remainder
 */


exports.mod = function mod(divident, divisor) {
  var result = BufferUtil.from(divident);

  while (result.length - divisor.length >= 0) {
    var coeff = result[0];

    for (var i = 0; i < divisor.length; i++) {
      result[i] ^= GF.mul(divisor[i], coeff);
    } // remove all zeros from buffer head


    var offset = 0;

    while (offset < result.length && result[offset] === 0) offset++;

    result = result.slice(offset);
  }

  return result;
};
/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Buffer}        Buffer containing polynomial coefficients
 */


exports.generateECPolynomial = function generateECPolynomial(degree) {
  var poly = BufferUtil.from([1]);

  for (var i = 0; i < degree; i++) {
    poly = exports.mul(poly, [1, GF.exp(i)]);
  }

  return poly;
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/qrcode.js":
/*!************************************************!*\
  !*** ./node_modules/qrcode/lib/core/qrcode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ "./node_modules/qrcode/lib/utils/typedarray-buffer.js");

var Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js");

var ECLevel = __webpack_require__(/*! ./error-correction-level */ "./node_modules/qrcode/lib/core/error-correction-level.js");

var BitBuffer = __webpack_require__(/*! ./bit-buffer */ "./node_modules/qrcode/lib/core/bit-buffer.js");

var BitMatrix = __webpack_require__(/*! ./bit-matrix */ "./node_modules/qrcode/lib/core/bit-matrix.js");

var AlignmentPattern = __webpack_require__(/*! ./alignment-pattern */ "./node_modules/qrcode/lib/core/alignment-pattern.js");

var FinderPattern = __webpack_require__(/*! ./finder-pattern */ "./node_modules/qrcode/lib/core/finder-pattern.js");

var MaskPattern = __webpack_require__(/*! ./mask-pattern */ "./node_modules/qrcode/lib/core/mask-pattern.js");

var ECCode = __webpack_require__(/*! ./error-correction-code */ "./node_modules/qrcode/lib/core/error-correction-code.js");

var ReedSolomonEncoder = __webpack_require__(/*! ./reed-solomon-encoder */ "./node_modules/qrcode/lib/core/reed-solomon-encoder.js");

var Version = __webpack_require__(/*! ./version */ "./node_modules/qrcode/lib/core/version.js");

var FormatInfo = __webpack_require__(/*! ./format-info */ "./node_modules/qrcode/lib/core/format-info.js");

var Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js");

var Segments = __webpack_require__(/*! ./segments */ "./node_modules/qrcode/lib/core/segments.js");

var isArray = __webpack_require__(/*! isarray */ "./node_modules/qrcode/node_modules/isarray/index.js");
/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */


function setupFinderPattern(matrix, version) {
  var size = matrix.size;
  var pos = FinderPattern.getPositions(version);

  for (var i = 0; i < pos.length; i++) {
    var row = pos[i][0];
    var col = pos[i][1];

    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue;

      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue;

        if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}
/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */


function setupTimingPattern(matrix) {
  var size = matrix.size;

  for (var r = 8; r < size - 8; r++) {
    var value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}
/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */


function setupAlignmentPattern(matrix, version) {
  var pos = AlignmentPattern.getPositions(version);

  for (var i = 0; i < pos.length; i++) {
    var row = pos[i][0];
    var col = pos[i][1];

    for (var r = -2; r <= 2; r++) {
      for (var c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}
/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */


function setupVersionInfo(matrix, version) {
  var size = matrix.size;
  var bits = Version.getEncodedBits(version);
  var row, col, mod;

  for (var i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = (bits >> i & 1) === 1;
    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}
/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */


function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
  var size = matrix.size;
  var bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
  var i, mod;

  for (i = 0; i < 15; i++) {
    mod = (bits >> i & 1) === 1; // vertical

    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    } // horizontal


    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  } // fixed module


  matrix.set(size - 8, 8, 1, true);
}
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix} matrix Modules matrix
 * @param  {Buffer}    data   Data codewords
 */


function setupData(matrix, data) {
  var size = matrix.size;
  var inc = -1;
  var row = size - 1;
  var bitIndex = 7;
  var byteIndex = 0;

  for (var col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;

    while (true) {
      for (var c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          var dark = false;

          if (byteIndex < data.length) {
            dark = (data[byteIndex] >>> bitIndex & 1) === 1;
          }

          matrix.set(row, col - c, dark);
          bitIndex--;

          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }

      row += inc;

      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
}
/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Buffer}                        Buffer containing encoded codewords
 */


function createData(version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  var buffer = new BitBuffer();
  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4); // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.

    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version)); // add binary data sequence to buffer

    data.write(buffer);
  }); // Calculate required number of bits

  var totalCodewords = Utils.getSymbolTotalCodewords(version);
  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
  var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8; // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.

  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  } // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.
  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.


  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  } // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.


  var remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;

  for (var i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8);
  }

  return createCodewords(buffer, version, errorCorrectionLevel);
}
/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Buffer}                         Buffer containing encoded codewords
 */


function createCodewords(bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  var totalCodewords = Utils.getSymbolTotalCodewords(version); // Total number of error correction codewords

  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel); // Total number of data codewords

  var dataTotalCodewords = totalCodewords - ecTotalCodewords; // Total number of blocks

  var ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel); // Calculate how many blocks each group should contain

  var blocksInGroup2 = totalCodewords % ecTotalBlocks;
  var blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
  var totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
  var dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  var dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1; // Number of EC codewords is the same for both groups

  var ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1; // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount

  var rs = new ReedSolomonEncoder(ecCount);
  var offset = 0;
  var dcData = new Array(ecTotalBlocks);
  var ecData = new Array(ecTotalBlocks);
  var maxDataSize = 0;
  var buffer = BufferUtil.from(bitBuffer.buffer); // Divide the buffer into the required number of blocks

  for (var b = 0; b < ecTotalBlocks; b++) {
    var dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2; // extract a block of data from buffer

    dcData[b] = buffer.slice(offset, offset + dataSize); // Calculate EC codewords for this data block

    ecData[b] = rs.encode(dcData[b]);
    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  } // Create final data
  // Interleave the data and error correction codewords from each block


  var data = BufferUtil.alloc(totalCodewords);
  var index = 0;
  var i, r; // Add data codewords

  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  } // Apped EC codewords


  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }

  return data;
}
/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */


function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
  var segments;

  if (isArray(data)) {
    segments = Segments.fromArray(data);
  } else if (typeof data === 'string') {
    var estimatedVersion = version;

    if (!estimatedVersion) {
      var rawSegments = Segments.rawSplit(data); // Estimate best version that can contain raw splitted segments

      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
    } // Build optimized segments
    // If estimated version is undefined, try with the highest version


    segments = Segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error('Invalid data');
  } // Get the min version that can contain data


  var bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel); // If no version is found, data cannot be stored

  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code');
  } // If not specified, use min version as default


  if (!version) {
    version = bestVersion; // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' + 'The chosen QR Code version cannot contain this amount of data.\n' + 'Minimum version required to store current data is: ' + bestVersion + '.\n');
  }

  var dataBits = createData(version, errorCorrectionLevel, segments); // Allocate matrix buffer

  var moduleCount = Utils.getSymbolSize(version);
  var modules = new BitMatrix(moduleCount); // Add function modules

  setupFinderPattern(modules, version);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version); // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.

  setupFormatInfo(modules, errorCorrectionLevel, 0);

  if (version >= 7) {
    setupVersionInfo(modules, version);
  } // Add data codewords


  setupData(modules, dataBits);

  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
  } // Apply mask pattern


  MaskPattern.applyMask(maskPattern, modules); // Replace format info bits with correct values

  setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments
  };
}
/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */


exports.create = function create(data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text');
  }

  var errorCorrectionLevel = ECLevel.M;
  var version;
  var mask;

  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
    version = Version.from(options.version);
    mask = MaskPattern.from(options.maskPattern);

    if (options.toSJISFunc) {
      Utils.setToSJISFunction(options.toSJISFunc);
    }
  }

  return createSymbol(data, version, errorCorrectionLevel, mask);
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/reed-solomon-encoder.js":
/*!**************************************************************!*\
  !*** ./node_modules/qrcode/lib/core/reed-solomon-encoder.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ "./node_modules/qrcode/lib/utils/typedarray-buffer.js");

var Polynomial = __webpack_require__(/*! ./polynomial */ "./node_modules/qrcode/lib/core/polynomial.js");

var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js").Buffer;

function ReedSolomonEncoder(degree) {
  this.genPoly = undefined;
  this.degree = degree;
  if (this.degree) this.initialize(this.degree);
}
/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */


ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
  // create an irreducible generator polynomial
  this.degree = degree;
  this.genPoly = Polynomial.generateECPolynomial(this.degree);
};
/**
 * Encodes a chunk of data
 *
 * @param  {Buffer} data Buffer containing input data
 * @return {Buffer}      Buffer containing encoded data
 */


ReedSolomonEncoder.prototype.encode = function encode(data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized');
  } // Calculate EC for this data block
  // extends data size to data+genPoly size


  var pad = BufferUtil.alloc(this.degree);
  var paddedData = Buffer.concat([data, pad], data.length + this.degree); // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial

  var remainder = Polynomial.mod(paddedData, this.genPoly); // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients

  var start = this.degree - remainder.length;

  if (start > 0) {
    var buff = BufferUtil.alloc(this.degree);
    remainder.copy(buff, start);
    return buff;
  }

  return remainder;
};

module.exports = ReedSolomonEncoder;

/***/ }),

/***/ "./node_modules/qrcode/lib/core/regex.js":
/*!***********************************************!*\
  !*** ./node_modules/qrcode/lib/core/regex.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var numeric = '[0-9]+';
var alphanumeric = '[A-Z $%*+\\-./:]+';
var kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' + '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' + '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' + '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, '\\u');
var byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
exports.KANJI = new RegExp(kanji, 'g');
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
exports.BYTE = new RegExp(byte, 'g');
exports.NUMERIC = new RegExp(numeric, 'g');
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
var TEST_KANJI = new RegExp('^' + kanji + '$');
var TEST_NUMERIC = new RegExp('^' + numeric + '$');
var TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');

exports.testKanji = function testKanji(str) {
  return TEST_KANJI.test(str);
};

exports.testNumeric = function testNumeric(str) {
  return TEST_NUMERIC.test(str);
};

exports.testAlphanumeric = function testAlphanumeric(str) {
  return TEST_ALPHANUMERIC.test(str);
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/segments.js":
/*!**************************************************!*\
  !*** ./node_modules/qrcode/lib/core/segments.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js");

var NumericData = __webpack_require__(/*! ./numeric-data */ "./node_modules/qrcode/lib/core/numeric-data.js");

var AlphanumericData = __webpack_require__(/*! ./alphanumeric-data */ "./node_modules/qrcode/lib/core/alphanumeric-data.js");

var ByteData = __webpack_require__(/*! ./byte-data */ "./node_modules/qrcode/lib/core/byte-data.js");

var KanjiData = __webpack_require__(/*! ./kanji-data */ "./node_modules/qrcode/lib/core/kanji-data.js");

var Regex = __webpack_require__(/*! ./regex */ "./node_modules/qrcode/lib/core/regex.js");

var Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js");

var dijkstra = __webpack_require__(/*! dijkstrajs */ "./node_modules/dijkstrajs/dijkstra.js");
/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */


function getStringByteLength(str) {
  return unescape(encodeURIComponent(str)).length;
}
/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */


function getSegments(regex, mode, str) {
  var segments = [];
  var result;

  while ((result = regex.exec(str)) !== null) {
    segments.push({
      data: result[0],
      index: result.index,
      mode: mode,
      length: result[0].length
    });
  }

  return segments;
}
/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */


function getSegmentsFromString(dataStr) {
  var numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
  var alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
  var byteSegs;
  var kanjiSegs;

  if (Utils.isKanjiModeEnabled()) {
    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
  } else {
    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
    kanjiSegs = [];
  }

  var segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
  return segs.sort(function (s1, s2) {
    return s1.index - s2.index;
  }).map(function (obj) {
    return {
      data: obj.data,
      mode: obj.mode,
      length: obj.length
    };
  });
}
/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */


function getSegmentBitsLength(length, mode) {
  switch (mode) {
    case Mode.NUMERIC:
      return NumericData.getBitsLength(length);

    case Mode.ALPHANUMERIC:
      return AlphanumericData.getBitsLength(length);

    case Mode.KANJI:
      return KanjiData.getBitsLength(length);

    case Mode.BYTE:
      return ByteData.getBitsLength(length);
  }
}
/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */


function mergeSegments(segs) {
  return segs.reduce(function (acc, curr) {
    var prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;

    if (prevSeg && prevSeg.mode === curr.mode) {
      acc[acc.length - 1].data += curr.data;
      return acc;
    }

    acc.push(curr);
    return acc;
  }, []);
}
/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */


function buildNodes(segs) {
  var nodes = [];

  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];

    switch (seg.mode) {
      case Mode.NUMERIC:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.ALPHANUMERIC,
          length: seg.length
        }, {
          data: seg.data,
          mode: Mode.BYTE,
          length: seg.length
        }]);
        break;

      case Mode.ALPHANUMERIC:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.BYTE,
          length: seg.length
        }]);
        break;

      case Mode.KANJI:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.BYTE,
          length: getStringByteLength(seg.data)
        }]);
        break;

      case Mode.BYTE:
        nodes.push([{
          data: seg.data,
          mode: Mode.BYTE,
          length: getStringByteLength(seg.data)
        }]);
    }
  }

  return nodes;
}
/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */


function buildGraph(nodes, version) {
  var table = {};
  var graph = {
    'start': {}
  };
  var prevNodeIds = ['start'];

  for (var i = 0; i < nodes.length; i++) {
    var nodeGroup = nodes[i];
    var currentNodeIds = [];

    for (var j = 0; j < nodeGroup.length; j++) {
      var node = nodeGroup[j];
      var key = '' + i + j;
      currentNodeIds.push(key);
      table[key] = {
        node: node,
        lastCount: 0
      };
      graph[key] = {};

      for (var n = 0; n < prevNodeIds.length; n++) {
        var prevNodeId = prevNodeIds[n];

        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
          graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
          table[prevNodeId].lastCount += node.length;
        } else {
          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
        }
      }
    }

    prevNodeIds = currentNodeIds;
  }

  for (n = 0; n < prevNodeIds.length; n++) {
    graph[prevNodeIds[n]]['end'] = 0;
  }

  return {
    map: graph,
    table: table
  };
}
/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */


function buildSingleSegment(data, modesHint) {
  var mode;
  var bestMode = Mode.getBestModeForData(data);
  mode = Mode.from(modesHint, bestMode); // Make sure data can be encoded

  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
    throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\n Suggested mode is: ' + Mode.toString(bestMode));
  } // Use Mode.BYTE if Kanji support is disabled


  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
    mode = Mode.BYTE;
  }

  switch (mode) {
    case Mode.NUMERIC:
      return new NumericData(data);

    case Mode.ALPHANUMERIC:
      return new AlphanumericData(data);

    case Mode.KANJI:
      return new KanjiData(data);

    case Mode.BYTE:
      return new ByteData(data);
  }
}
/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */


exports.fromArray = function fromArray(array) {
  return array.reduce(function (acc, seg) {
    if (typeof seg === 'string') {
      acc.push(buildSingleSegment(seg, null));
    } else if (seg.data) {
      acc.push(buildSingleSegment(seg.data, seg.mode));
    }

    return acc;
  }, []);
};
/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */


exports.fromString = function fromString(data, version) {
  var segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
  var nodes = buildNodes(segs);
  var graph = buildGraph(nodes, version);
  var path = dijkstra.find_path(graph.map, 'start', 'end');
  var optimizedSegs = [];

  for (var i = 1; i < path.length - 1; i++) {
    optimizedSegs.push(graph.table[path[i]].node);
  }

  return exports.fromArray(mergeSegments(optimizedSegs));
};
/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */


exports.rawSplit = function rawSplit(data) {
  return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/utils.js":
/*!***********************************************!*\
  !*** ./node_modules/qrcode/lib/core/utils.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toSJISFunction;
var CODEWORDS_COUNT = [0, // Not used
26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];
/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */

exports.getSymbolSize = function getSymbolSize(version) {
  if (!version) throw new Error('"version" cannot be null or undefined');
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
  return version * 4 + 17;
};
/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */


exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
  return CODEWORDS_COUNT[version];
};
/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */


exports.getBCHDigit = function (data) {
  var digit = 0;

  while (data !== 0) {
    digit++;
    data >>>= 1;
  }

  return digit;
};

exports.setToSJISFunction = function setToSJISFunction(f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.');
  }

  toSJISFunction = f;
};

exports.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined';
};

exports.toSJIS = function toSJIS(kanji) {
  return toSJISFunction(kanji);
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/version-check.js":
/*!*******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/version-check.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */
exports.isValid = function isValid(version) {
  return !isNaN(version) && version >= 1 && version <= 40;
};

/***/ }),

/***/ "./node_modules/qrcode/lib/core/version.js":
/*!*************************************************!*\
  !*** ./node_modules/qrcode/lib/core/version.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js");

var ECCode = __webpack_require__(/*! ./error-correction-code */ "./node_modules/qrcode/lib/core/error-correction-code.js");

var ECLevel = __webpack_require__(/*! ./error-correction-level */ "./node_modules/qrcode/lib/core/error-correction-level.js");

var Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js");

var VersionCheck = __webpack_require__(/*! ./version-check */ "./node_modules/qrcode/lib/core/version-check.js");

var isArray = __webpack_require__(/*! isarray */ "./node_modules/qrcode/node_modules/isarray/index.js"); // Generator polynomial used to encode version information


var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
var G18_BCH = Utils.getBCHDigit(G18);

function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
  for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
      return currentVersion;
    }
  }

  return undefined;
}

function getReservedBitsCount(mode, version) {
  // Character count indicator + mode indicator bits
  return Mode.getCharCountIndicator(mode, version) + 4;
}

function getTotalBitsFromDataArray(segments, version) {
  var totalBits = 0;
  segments.forEach(function (data) {
    var reservedBits = getReservedBitsCount(data.mode, version);
    totalBits += reservedBits + data.getBitsLength();
  });
  return totalBits;
}

function getBestVersionForMixedData(segments, errorCorrectionLevel) {
  for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
    var length = getTotalBitsFromDataArray(segments, currentVersion);

    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
      return currentVersion;
    }
  }

  return undefined;
}
/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */


exports.from = function from(value, defaultValue) {
  if (VersionCheck.isValid(value)) {
    return parseInt(value, 10);
  }

  return defaultValue;
};
/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */


exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid QR Code version');
  } // Use Byte mode as default


  if (typeof mode === 'undefined') mode = Mode.BYTE; // Total codewords for this QR code version (Data + Error correction)

  var totalCodewords = Utils.getSymbolTotalCodewords(version); // Total number of error correction codewords

  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel); // Total number of data codewords

  var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
  if (mode === Mode.MIXED) return dataTotalCodewordsBits;
  var usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version); // Return max number of storable codewords

  switch (mode) {
    case Mode.NUMERIC:
      return Math.floor(usableBits / 10 * 3);

    case Mode.ALPHANUMERIC:
      return Math.floor(usableBits / 11 * 2);

    case Mode.KANJI:
      return Math.floor(usableBits / 13);

    case Mode.BYTE:
    default:
      return Math.floor(usableBits / 8);
  }
};
/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */


exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
  var seg;
  var ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);

  if (isArray(data)) {
    if (data.length > 1) {
      return getBestVersionForMixedData(data, ecl);
    }

    if (data.length === 0) {
      return 1;
    }

    seg = data[0];
  } else {
    seg = data;
  }

  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
};
/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */


exports.getEncodedBits = function getEncodedBits(version) {
  if (!VersionCheck.isValid(version) || version < 7) {
    throw new Error('Invalid QR Code version');
  }

  var d = version << 12;

  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
    d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
  }

  return version << 12 | d;
};

/***/ }),

/***/ "./node_modules/qrcode/lib/renderer/canvas.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/renderer/canvas.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/renderer/utils.js");

function clearCanvas(ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!canvas.style) canvas.style = {};
  canvas.height = size;
  canvas.width = size;
  canvas.style.height = size + 'px';
  canvas.style.width = size + 'px';
}

function getCanvasElement() {
  try {
    return document.createElement('canvas');
  } catch (e) {
    throw new Error('You need to specify a canvas element');
  }
}

exports.render = function render(qrData, canvas, options) {
  var opts = options;
  var canvasEl = canvas;

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }

  if (!canvas) {
    canvasEl = getCanvasElement();
  }

  opts = Utils.getOptions(opts);
  var size = Utils.getImageWidth(qrData.modules.size, opts);
  var ctx = canvasEl.getContext('2d');
  var image = ctx.createImageData(size, size);
  Utils.qrToImageData(image.data, qrData, opts);
  clearCanvas(ctx, canvasEl, size);
  ctx.putImageData(image, 0, 0);
  return canvasEl;
};

exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
  var opts = options;

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }

  if (!opts) opts = {};
  var canvasEl = exports.render(qrData, canvas, opts);
  var type = opts.type || 'image/png';
  var rendererOpts = opts.rendererOpts || {};
  return canvasEl.toDataURL(type, rendererOpts.quality);
};

/***/ }),

/***/ "./node_modules/qrcode/lib/renderer/svg-tag.js":
/*!*****************************************************!*\
  !*** ./node_modules/qrcode/lib/renderer/svg-tag.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/renderer/utils.js");

function getColorAttrib(color, attrib) {
  var alpha = color.a / 255;
  var str = attrib + '="' + color.hex + '"';
  return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}

function svgCmd(cmd, x, y) {
  var str = cmd + x;
  if (typeof y !== 'undefined') str += ' ' + y;
  return str;
}

function qrToPath(data, size, margin) {
  var path = '';
  var moveBy = 0;
  var newRow = false;
  var lineLength = 0;

  for (var i = 0; i < data.length; i++) {
    var col = Math.floor(i % size);
    var row = Math.floor(i / size);
    if (!col && !newRow) newRow = true;

    if (data[i]) {
      lineLength++;

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
        moveBy = 0;
        newRow = false;
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }

  return path;
}

exports.render = function render(qrData, options, cb) {
  var opts = Utils.getOptions(options);
  var size = qrData.modules.size;
  var data = qrData.modules.data;
  var qrcodesize = size + opts.margin * 2;
  var bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
  var path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
  var viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
  var width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
  var svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';

  if (typeof cb === 'function') {
    cb(null, svgTag);
  }

  return svgTag;
};

/***/ }),

/***/ "./node_modules/qrcode/lib/renderer/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/qrcode/lib/renderer/utils.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function hex2rgba(hex) {
  if (typeof hex === 'number') {
    hex = hex.toString();
  }

  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string');
  }

  var hexCode = hex.slice().replace('#', '').split('');

  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex);
  } // Convert from short to long form (fff -> ffffff)


  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
      return [c, c];
    }));
  } // Add default alpha value


  if (hexCode.length === 6) hexCode.push('F', 'F');
  var hexValue = parseInt(hexCode.join(''), 16);
  return {
    r: hexValue >> 24 & 255,
    g: hexValue >> 16 & 255,
    b: hexValue >> 8 & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join('')
  };
}

exports.getOptions = function getOptions(options) {
  if (!options) options = {};
  if (!options.color) options.color = {};
  var margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
  var width = options.width && options.width >= 21 ? options.width : undefined;
  var scale = options.scale || 4;
  return {
    width: width,
    scale: width ? 4 : scale,
    margin: margin,
    color: {
      dark: hex2rgba(options.color.dark || '#000000ff'),
      light: hex2rgba(options.color.light || '#ffffffff')
    },
    type: options.type,
    rendererOpts: options.rendererOpts || {}
  };
};

exports.getScale = function getScale(qrSize, opts) {
  return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
};

exports.getImageWidth = function getImageWidth(qrSize, opts) {
  var scale = exports.getScale(qrSize, opts);
  return Math.floor((qrSize + opts.margin * 2) * scale);
};

exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
  var size = qr.modules.size;
  var data = qr.modules.data;
  var scale = exports.getScale(size, opts);
  var symbolSize = Math.floor((size + opts.margin * 2) * scale);
  var scaledMargin = opts.margin * scale;
  var palette = [opts.color.light, opts.color.dark];

  for (var i = 0; i < symbolSize; i++) {
    for (var j = 0; j < symbolSize; j++) {
      var posDst = (i * symbolSize + j) * 4;
      var pxColor = opts.color.light;

      if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        var iSrc = Math.floor((i - scaledMargin) / scale);
        var jSrc = Math.floor((j - scaledMargin) / scale);
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
      }

      imgData[posDst++] = pxColor.r;
      imgData[posDst++] = pxColor.g;
      imgData[posDst++] = pxColor.b;
      imgData[posDst] = pxColor.a;
    }
  }
};

/***/ }),

/***/ "./node_modules/qrcode/lib/utils/typedarray-buffer.js":
/*!************************************************************!*\
  !*** ./node_modules/qrcode/lib/utils/typedarray-buffer.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Implementation of a subset of node.js Buffer methods for the browser.
 * Based on https://github.com/feross/buffer
 */

/* eslint-disable no-proto */


var isArray = __webpack_require__(/*! isarray */ "./node_modules/qrcode/node_modules/isarray/index.js");

function typedArraySupport() {
  // Can typed array instances be augmented?
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {
      __proto__: Uint8Array.prototype,
      foo: function () {
        return 42;
      }
    };
    return arr.foo() === 42;
  } catch (e) {
    return false;
  }
}

Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
var K_MAX_LENGTH = Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;

function Buffer(arg, offset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, offset, length);
  }

  if (typeof arg === 'number') {
    return allocUnsafe(this, arg);
  }

  return from(this, arg, offset, length);
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array; // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97

  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true,
      enumerable: false,
      writable: false
    });
  }
}

function checked(length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
  }

  return length | 0;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}

function createBuffer(that, length) {
  var buf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    buf = new Uint8Array(length);
    buf.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    buf = that;

    if (buf === null) {
      buf = new Buffer(length);
    }

    buf.length = length;
  }

  return buf;
}

function allocUnsafe(that, size) {
  var buf = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      buf[i] = 0;
    }
  }

  return buf;
}

function fromString(that, string) {
  var length = byteLength(string) | 0;
  var buf = createBuffer(that, length);
  var actual = buf.write(string);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
  }

  return buf;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  var buf = createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }

  return buf;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  var buf;

  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array);
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset);
  } else {
    buf = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    buf.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    buf = fromArrayLike(that, buf);
  }

  return buf;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    var buf = createBuffer(that, len);

    if (buf.length === 0) {
      return buf;
    }

    obj.copy(buf, 0, 0, len);
    return buf;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }

      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function byteLength(string) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;
  return utf8ToBytes(string).length;
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function from(that, value, offset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, offset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, offset);
  }

  return fromObject(that, value);
}

Buffer.prototype.write = function write(string, offset, length) {
  // Buffer#write(string)
  if (offset === undefined) {
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length])
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
    } else {
      length = undefined;
    }
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  return utf8Write(this, string, offset, length);
};

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end); // Return an augmented `Uint8Array` instance

    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);

    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

Buffer.prototype.fill = function fill(val, start, end) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      end = this.length;
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (code < 256) {
        val = code;
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : new Buffer(val);
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return createBuffer(null, 0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = allocUnsafe(null, length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

Buffer.byteLength = byteLength;
Buffer.prototype._isBuffer = true;

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

module.exports.alloc = function (size) {
  var buffer = new Buffer(size);
  buffer.fill(0);
  return buffer;
};

module.exports.from = function (data) {
  return new Buffer(data);
};

/***/ }),

/***/ "./node_modules/qrcode/node_modules/isarray/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/qrcode/node_modules/isarray/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),

/***/ "./node_modules/safe-json-utils/dist/cjs/index.js":
/*!********************************************************!*\
  !*** ./node_modules/safe-json-utils/dist/cjs/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch (_a) {
    return value;
  }
}

exports.safeJsonParse = safeJsonParse;

function safeJsonStringify(value) {
  return typeof value === 'string' ? value : JSON.stringify(value, (key, value) => typeof value === 'undefined' ? null : value);
}

exports.safeJsonStringify = safeJsonStringify;

/***/ }),

/***/ "./node_modules/semaphore/lib/semaphore.js":
/*!*************************************************!*\
  !*** ./node_modules/semaphore/lib/semaphore.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {;

(function (global) {
  'use strict';

  var nextTick = function (fn) {
    setTimeout(fn, 0);
  };

  if (typeof process != 'undefined' && process && typeof process.nextTick == 'function') {
    // node.js and the like
    nextTick = process.nextTick;
  }

  function semaphore(capacity) {
    var semaphore = {
      capacity: capacity || 1,
      current: 0,
      queue: [],
      firstHere: false,
      take: function () {
        if (semaphore.firstHere === false) {
          semaphore.current++;
          semaphore.firstHere = true;
          var isFirst = 1;
        } else {
          var isFirst = 0;
        }

        var item = {
          n: 1
        };

        if (typeof arguments[0] == 'function') {
          item.task = arguments[0];
        } else {
          item.n = arguments[0];
        }

        if (arguments.length >= 2) {
          if (typeof arguments[1] == 'function') item.task = arguments[1];else item.n = arguments[1];
        }

        var task = item.task;

        item.task = function () {
          task(semaphore.leave);
        };

        if (semaphore.current + item.n - isFirst > semaphore.capacity) {
          if (isFirst === 1) {
            semaphore.current--;
            semaphore.firstHere = false;
          }

          return semaphore.queue.push(item);
        }

        semaphore.current += item.n - isFirst;
        item.task(semaphore.leave);
        if (isFirst === 1) semaphore.firstHere = false;
      },
      leave: function (n) {
        n = n || 1;
        semaphore.current -= n;

        if (!semaphore.queue.length) {
          if (semaphore.current < 0) {
            throw new Error('leave called too many times.');
          }

          return;
        }

        var item = semaphore.queue[0];

        if (item.n + semaphore.current > semaphore.capacity) {
          return;
        }

        semaphore.queue.shift();
        semaphore.current += item.n;
        nextTick(item.task);
      },
      available: function (n) {
        n = n || 1;
        return semaphore.current + n <= semaphore.capacity;
      }
    };
    return semaphore;
  }

  ;

  if (true) {
    // node export
    module.exports = semaphore;
  } else {}
})(this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/split-on-first/index.js":
/*!**********************************************!*\
  !*** ./node_modules/split-on-first/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (string, separator) => {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`');
  }

  if (separator === '') {
    return [string];
  }

  const separatorIndex = string.indexOf(separator);

  if (separatorIndex === -1) {
    return [string];
  }

  return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
};

/***/ }),

/***/ "./node_modules/stream-http/index.js":
/*!*******************************************!*\
  !*** ./node_modules/stream-http/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var ClientRequest = __webpack_require__(/*! ./lib/request */ "./node_modules/stream-http/lib/request.js");

var response = __webpack_require__(/*! ./lib/response */ "./node_modules/stream-http/lib/response.js");

var extend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js");

var statusCodes = __webpack_require__(/*! builtin-status-codes */ "./node_modules/builtin-status-codes/browser.js");

var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

var http = exports;

http.request = function (opts, cb) {
  if (typeof opts === 'string') opts = url.parse(opts);else opts = extend(opts); // Normally, the page is loaded from http or https, so not specifying a protocol
  // will result in a (valid) protocol-relative url. However, this won't work if
  // the protocol is something else, like 'file:'

  var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : '';
  var protocol = opts.protocol || defaultProtocol;
  var host = opts.hostname || opts.host;
  var port = opts.port;
  var path = opts.path || '/'; // Necessary for IPv6 addresses

  if (host && host.indexOf(':') !== -1) host = '[' + host + ']'; // This may be a relative url. The browser should always be able to interpret it correctly.

  opts.url = (host ? protocol + '//' + host : '') + (port ? ':' + port : '') + path;
  opts.method = (opts.method || 'GET').toUpperCase();
  opts.headers = opts.headers || {}; // Also valid opts.auth, opts.mode

  var req = new ClientRequest(opts);
  if (cb) req.on('response', cb);
  return req;
};

http.get = function get(opts, cb) {
  var req = http.request(opts, cb);
  req.end();
  return req;
};

http.ClientRequest = ClientRequest;
http.IncomingMessage = response.IncomingMessage;

http.Agent = function () {};

http.Agent.defaultMaxSockets = 4;
http.globalAgent = new http.Agent();
http.STATUS_CODES = statusCodes;
http.METHODS = ['CHECKOUT', 'CONNECT', 'COPY', 'DELETE', 'GET', 'HEAD', 'LOCK', 'M-SEARCH', 'MERGE', 'MKACTIVITY', 'MKCOL', 'MOVE', 'NOTIFY', 'OPTIONS', 'PATCH', 'POST', 'PROPFIND', 'PROPPATCH', 'PURGE', 'PUT', 'REPORT', 'SEARCH', 'SUBSCRIBE', 'TRACE', 'UNLOCK', 'UNSUBSCRIBE'];
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/capability.js":
/*!****************************************************!*\
  !*** ./node_modules/stream-http/lib/capability.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream);
exports.writableStream = isFunction(global.WritableStream);
exports.abortController = isFunction(global.AbortController);
exports.blobConstructor = false;

try {
  new Blob([new ArrayBuffer(1)]);
  exports.blobConstructor = true;
} catch (e) {} // The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.


var xhr;

function getXHR() {
  // Cache the xhr value
  if (xhr !== undefined) return xhr;

  if (global.XMLHttpRequest) {
    xhr = new global.XMLHttpRequest(); // If XDomainRequest is available (ie only, where xhr might not work
    // cross domain), use the page location. Otherwise use example.com
    // Note: this doesn't actually make an http request.

    try {
      xhr.open('GET', global.XDomainRequest ? '/' : 'https://example.com');
    } catch (e) {
      xhr = null;
    }
  } else {
    // Service workers don't have XHR
    xhr = null;
  }

  return xhr;
}

function checkTypeSupport(type) {
  var xhr = getXHR();
  if (!xhr) return false;

  try {
    xhr.responseType = type;
    return xhr.responseType === type;
  } catch (e) {}

  return false;
} // For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
// Safari 7.1 appears to have fixed this bug.


var haveArrayBuffer = typeof global.ArrayBuffer !== 'undefined';
var haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice); // If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().

exports.arraybuffer = exports.fetch || haveArrayBuffer && checkTypeSupport('arraybuffer'); // These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.

exports.msstream = !exports.fetch && haveSlice && checkTypeSupport('ms-stream');
exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer && checkTypeSupport('moz-chunked-arraybuffer'); // If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().

exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false);
exports.vbArray = isFunction(global.VBArray);

function isFunction(value) {
  return typeof value === 'function';
}

xhr = null; // Help gc
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/request.js":
/*!*************************************************!*\
  !*** ./node_modules/stream-http/lib/request.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {var capability = __webpack_require__(/*! ./capability */ "./node_modules/stream-http/lib/capability.js");

var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

var response = __webpack_require__(/*! ./response */ "./node_modules/stream-http/lib/response.js");

var stream = __webpack_require__(/*! readable-stream */ "./node_modules/stream-http/node_modules/readable-stream/readable-browser.js");

var toArrayBuffer = __webpack_require__(/*! to-arraybuffer */ "./node_modules/to-arraybuffer/index.js");

var IncomingMessage = response.IncomingMessage;
var rStates = response.readyStates;

function decideMode(preferBinary, useFetch) {
  if (capability.fetch && useFetch) {
    return 'fetch';
  } else if (capability.mozchunkedarraybuffer) {
    return 'moz-chunked-arraybuffer';
  } else if (capability.msstream) {
    return 'ms-stream';
  } else if (capability.arraybuffer && preferBinary) {
    return 'arraybuffer';
  } else if (capability.vbArray && preferBinary) {
    return 'text:vbarray';
  } else {
    return 'text';
  }
}

var ClientRequest = module.exports = function (opts) {
  var self = this;
  stream.Writable.call(self);
  self._opts = opts;
  self._body = [];
  self._headers = {};
  if (opts.auth) self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'));
  Object.keys(opts.headers).forEach(function (name) {
    self.setHeader(name, opts.headers[name]);
  });
  var preferBinary;
  var useFetch = true;

  if (opts.mode === 'disable-fetch' || 'requestTimeout' in opts && !capability.abortController) {
    // If the use of XHR should be preferred. Not typically needed.
    useFetch = false;
    preferBinary = true;
  } else if (opts.mode === 'prefer-streaming') {
    // If streaming is a high priority but binary compatibility and
    // the accuracy of the 'content-type' header aren't
    preferBinary = false;
  } else if (opts.mode === 'allow-wrong-content-type') {
    // If streaming is more important than preserving the 'content-type' header
    preferBinary = !capability.overrideMimeType;
  } else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
    // Use binary if text streaming may corrupt data or the content-type header, or for speed
    preferBinary = true;
  } else {
    throw new Error('Invalid value for opts.mode');
  }

  self._mode = decideMode(preferBinary, useFetch);
  self._fetchTimer = null;
  self.on('finish', function () {
    self._onFinish();
  });
};

inherits(ClientRequest, stream.Writable);

ClientRequest.prototype.setHeader = function (name, value) {
  var self = this;
  var lowerName = name.toLowerCase(); // This check is not necessary, but it prevents warnings from browsers about setting unsafe
  // headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
  // http-browserify did it, so I will too.

  if (unsafeHeaders.indexOf(lowerName) !== -1) return;
  self._headers[lowerName] = {
    name: name,
    value: value
  };
};

ClientRequest.prototype.getHeader = function (name) {
  var header = this._headers[name.toLowerCase()];

  if (header) return header.value;
  return null;
};

ClientRequest.prototype.removeHeader = function (name) {
  var self = this;
  delete self._headers[name.toLowerCase()];
};

ClientRequest.prototype._onFinish = function () {
  var self = this;
  if (self._destroyed) return;
  var opts = self._opts;
  var headersObj = self._headers;
  var body = null;

  if (opts.method !== 'GET' && opts.method !== 'HEAD') {
    if (capability.arraybuffer) {
      body = toArrayBuffer(Buffer.concat(self._body));
    } else if (capability.blobConstructor) {
      body = new global.Blob(self._body.map(function (buffer) {
        return toArrayBuffer(buffer);
      }), {
        type: (headersObj['content-type'] || {}).value || ''
      });
    } else {
      // get utf8 string
      body = Buffer.concat(self._body).toString();
    }
  } // create flattened list of headers


  var headersList = [];
  Object.keys(headersObj).forEach(function (keyName) {
    var name = headersObj[keyName].name;
    var value = headersObj[keyName].value;

    if (Array.isArray(value)) {
      value.forEach(function (v) {
        headersList.push([name, v]);
      });
    } else {
      headersList.push([name, value]);
    }
  });

  if (self._mode === 'fetch') {
    var signal = null;
    var fetchTimer = null;

    if (capability.abortController) {
      var controller = new AbortController();
      signal = controller.signal;
      self._fetchAbortController = controller;

      if ('requestTimeout' in opts && opts.requestTimeout !== 0) {
        self._fetchTimer = global.setTimeout(function () {
          self.emit('requestTimeout');
          if (self._fetchAbortController) self._fetchAbortController.abort();
        }, opts.requestTimeout);
      }
    }

    global.fetch(self._opts.url, {
      method: self._opts.method,
      headers: headersList,
      body: body || undefined,
      mode: 'cors',
      credentials: opts.withCredentials ? 'include' : 'same-origin',
      signal: signal
    }).then(function (response) {
      self._fetchResponse = response;

      self._connect();
    }, function (reason) {
      global.clearTimeout(self._fetchTimer);
      if (!self._destroyed) self.emit('error', reason);
    });
  } else {
    var xhr = self._xhr = new global.XMLHttpRequest();

    try {
      xhr.open(self._opts.method, self._opts.url, true);
    } catch (err) {
      process.nextTick(function () {
        self.emit('error', err);
      });
      return;
    } // Can't set responseType on really old browsers


    if ('responseType' in xhr) xhr.responseType = self._mode.split(':')[0];
    if ('withCredentials' in xhr) xhr.withCredentials = !!opts.withCredentials;
    if (self._mode === 'text' && 'overrideMimeType' in xhr) xhr.overrideMimeType('text/plain; charset=x-user-defined');

    if ('requestTimeout' in opts) {
      xhr.timeout = opts.requestTimeout;

      xhr.ontimeout = function () {
        self.emit('requestTimeout');
      };
    }

    headersList.forEach(function (header) {
      xhr.setRequestHeader(header[0], header[1]);
    });
    self._response = null;

    xhr.onreadystatechange = function () {
      switch (xhr.readyState) {
        case rStates.LOADING:
        case rStates.DONE:
          self._onXHRProgress();

          break;
      }
    }; // Necessary for streaming in Firefox, since xhr.response is ONLY defined
    // in onprogress, not in onreadystatechange with xhr.readyState = 3


    if (self._mode === 'moz-chunked-arraybuffer') {
      xhr.onprogress = function () {
        self._onXHRProgress();
      };
    }

    xhr.onerror = function () {
      if (self._destroyed) return;
      self.emit('error', new Error('XHR error'));
    };

    try {
      xhr.send(body);
    } catch (err) {
      process.nextTick(function () {
        self.emit('error', err);
      });
      return;
    }
  }
};
/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */


function statusValid(xhr) {
  try {
    var status = xhr.status;
    return status !== null && status !== 0;
  } catch (e) {
    return false;
  }
}

ClientRequest.prototype._onXHRProgress = function () {
  var self = this;
  if (!statusValid(self._xhr) || self._destroyed) return;
  if (!self._response) self._connect();

  self._response._onXHRProgress();
};

ClientRequest.prototype._connect = function () {
  var self = this;
  if (self._destroyed) return;
  self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode, self._fetchTimer);

  self._response.on('error', function (err) {
    self.emit('error', err);
  });

  self.emit('response', self._response);
};

ClientRequest.prototype._write = function (chunk, encoding, cb) {
  var self = this;

  self._body.push(chunk);

  cb();
};

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
  var self = this;
  self._destroyed = true;
  global.clearTimeout(self._fetchTimer);
  if (self._response) self._response._destroyed = true;
  if (self._xhr) self._xhr.abort();else if (self._fetchAbortController) self._fetchAbortController.abort();
};

ClientRequest.prototype.end = function (data, encoding, cb) {
  var self = this;

  if (typeof data === 'function') {
    cb = data;
    data = undefined;
  }

  stream.Writable.prototype.end.call(self, data, encoding, cb);
};

ClientRequest.prototype.flushHeaders = function () {};

ClientRequest.prototype.setTimeout = function () {};

ClientRequest.prototype.setNoDelay = function () {};

ClientRequest.prototype.setSocketKeepAlive = function () {}; // Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method


var unsafeHeaders = ['accept-charset', 'accept-encoding', 'access-control-request-headers', 'access-control-request-method', 'connection', 'content-length', 'cookie', 'cookie2', 'date', 'dnt', 'expect', 'host', 'keep-alive', 'origin', 'referer', 'te', 'trailer', 'transfer-encoding', 'upgrade', 'via'];
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/response.js":
/*!**************************************************!*\
  !*** ./node_modules/stream-http/lib/response.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer, global) {var capability = __webpack_require__(/*! ./capability */ "./node_modules/stream-http/lib/capability.js");

var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

var stream = __webpack_require__(/*! readable-stream */ "./node_modules/stream-http/node_modules/readable-stream/readable-browser.js");

var rStates = exports.readyStates = {
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4
};

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode, fetchTimer) {
  var self = this;
  stream.Readable.call(self);
  self._mode = mode;
  self.headers = {};
  self.rawHeaders = [];
  self.trailers = {};
  self.rawTrailers = []; // Fake the 'close' event, but only once 'end' fires

  self.on('end', function () {
    // The nextTick is necessary to prevent the 'request' module from causing an infinite loop
    process.nextTick(function () {
      self.emit('close');
    });
  });

  if (mode === 'fetch') {
    self._fetchResponse = response;
    self.url = response.url;
    self.statusCode = response.status;
    self.statusMessage = response.statusText;
    response.headers.forEach(function (header, key) {
      self.headers[key.toLowerCase()] = header;
      self.rawHeaders.push(key, header);
    });

    if (capability.writableStream) {
      var writable = new WritableStream({
        write: function (chunk) {
          return new Promise(function (resolve, reject) {
            if (self._destroyed) {
              reject();
            } else if (self.push(new Buffer(chunk))) {
              resolve();
            } else {
              self._resumeFetch = resolve;
            }
          });
        },
        close: function () {
          global.clearTimeout(fetchTimer);
          if (!self._destroyed) self.push(null);
        },
        abort: function (err) {
          if (!self._destroyed) self.emit('error', err);
        }
      });

      try {
        response.body.pipeTo(writable).catch(function (err) {
          global.clearTimeout(fetchTimer);
          if (!self._destroyed) self.emit('error', err);
        });
        return;
      } catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this

    } // fallback for when writableStream or pipeTo aren't available


    var reader = response.body.getReader();

    function read() {
      reader.read().then(function (result) {
        if (self._destroyed) return;

        if (result.done) {
          global.clearTimeout(fetchTimer);
          self.push(null);
          return;
        }

        self.push(new Buffer(result.value));
        read();
      }).catch(function (err) {
        global.clearTimeout(fetchTimer);
        if (!self._destroyed) self.emit('error', err);
      });
    }

    read();
  } else {
    self._xhr = xhr;
    self._pos = 0;
    self.url = xhr.responseURL;
    self.statusCode = xhr.status;
    self.statusMessage = xhr.statusText;
    var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
    headers.forEach(function (header) {
      var matches = header.match(/^([^:]+):\s*(.*)/);

      if (matches) {
        var key = matches[1].toLowerCase();

        if (key === 'set-cookie') {
          if (self.headers[key] === undefined) {
            self.headers[key] = [];
          }

          self.headers[key].push(matches[2]);
        } else if (self.headers[key] !== undefined) {
          self.headers[key] += ', ' + matches[2];
        } else {
          self.headers[key] = matches[2];
        }

        self.rawHeaders.push(matches[1], matches[2]);
      }
    });
    self._charset = 'x-user-defined';

    if (!capability.overrideMimeType) {
      var mimeType = self.rawHeaders['mime-type'];

      if (mimeType) {
        var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/);

        if (charsetMatch) {
          self._charset = charsetMatch[1].toLowerCase();
        }
      }

      if (!self._charset) self._charset = 'utf-8'; // best guess
    }
  }
};

inherits(IncomingMessage, stream.Readable);

IncomingMessage.prototype._read = function () {
  var self = this;
  var resolve = self._resumeFetch;

  if (resolve) {
    self._resumeFetch = null;
    resolve();
  }
};

IncomingMessage.prototype._onXHRProgress = function () {
  var self = this;
  var xhr = self._xhr;
  var response = null;

  switch (self._mode) {
    case 'text:vbarray':
      // For IE9
      if (xhr.readyState !== rStates.DONE) break;

      try {
        // This fails in IE8
        response = new global.VBArray(xhr.responseBody).toArray();
      } catch (e) {}

      if (response !== null) {
        self.push(new Buffer(response));
        break;
      }

    // Falls through in IE8	

    case 'text':
      try {
        // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
        response = xhr.responseText;
      } catch (e) {
        self._mode = 'text:vbarray';
        break;
      }

      if (response.length > self._pos) {
        var newData = response.substr(self._pos);

        if (self._charset === 'x-user-defined') {
          var buffer = new Buffer(newData.length);

          for (var i = 0; i < newData.length; i++) buffer[i] = newData.charCodeAt(i) & 0xff;

          self.push(buffer);
        } else {
          self.push(newData, self._charset);
        }

        self._pos = response.length;
      }

      break;

    case 'arraybuffer':
      if (xhr.readyState !== rStates.DONE || !xhr.response) break;
      response = xhr.response;
      self.push(new Buffer(new Uint8Array(response)));
      break;

    case 'moz-chunked-arraybuffer':
      // take whole
      response = xhr.response;
      if (xhr.readyState !== rStates.LOADING || !response) break;
      self.push(new Buffer(new Uint8Array(response)));
      break;

    case 'ms-stream':
      response = xhr.response;
      if (xhr.readyState !== rStates.LOADING) break;
      var reader = new global.MSStreamReader();

      reader.onprogress = function () {
        if (reader.result.byteLength > self._pos) {
          self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))));
          self._pos = reader.result.byteLength;
        }
      };

      reader.onload = function () {
        self.push(null);
      }; // reader.onerror = ??? // TODO: this


      reader.readAsArrayBuffer(response);
      break;
  } // The ms-stream case handles end separately in reader.onload()


  if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
    self.push(null);
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

/*<replacement>*/


var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;
/*<replacement>*/

var util = Object.create(__webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js"));
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

var Readable = __webpack_require__(/*! ./_stream_readable */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_readable.js");

var Writable = __webpack_require__(/*! ./_stream_writable */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_writable.js");

util.inherits(Duplex, Readable);
{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  if (options && options.readable === false) this.readable = false;
  if (options && options.writable === false) this.writable = false;
  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
}); // the no-half-open enforcer

function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();
  pna.nextTick(cb, err);
};

/***/ }),

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_passthrough.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/stream-http/node_modules/readable-stream/lib/_stream_passthrough.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.


module.exports = PassThrough;

var Transform = __webpack_require__(/*! ./_stream_transform */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_transform.js");
/*<replacement>*/


var util = Object.create(__webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js"));
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_readable.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/stream-http/node_modules/readable-stream/lib/_stream_readable.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/


module.exports = Readable;
/*<replacement>*/

var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
/*</replacement>*/

/*<replacement>*/


var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = __webpack_require__(/*! ./internal/streams/stream */ "./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/

/*<replacement>*/


var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/


var util = Object.create(__webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js"));
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

/*<replacement>*/

var debugUtil = __webpack_require__(/*! util */ 20);

var debug = void 0;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/


var BufferList = __webpack_require__(/*! ./internal/streams/BufferList */ "./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/BufferList.js");

var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/destroy.js");

var StringDecoder;
util.inherits(Readable, Stream);
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js");
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  var isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm; // cast to ints.

  this.highWaterMark = Math.floor(this.highWaterMark); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(/*! string_decoder/ */ "./node_modules/node-libs-browser/node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js");
  if (!(this instanceof Readable)) return new Readable(options);
  this._readableState = new ReadableState(options, this); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }

  return er;
} // if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.


function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(/*! string_decoder/ */ "./node_modules/node-libs-browser/node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
}; // Don't raise the hwm > 8MB


var MAX_HWM = 0x800000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true; // emit 'readable' now to make sure it gets picked up.

  emitReadable(stream);
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;

  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;else len = state.length;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  } // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.


  var increasedAwaitDrain = false;
  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);

    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;

    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;

      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }

  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {}
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList; // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }
  return ret;
} // Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.


function fromListPartial(n, list, hasStrings) {
  var ret;

  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }

  return ret;
} // Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.


function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;

  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;

    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }

      break;
    }

    ++c;
  }

  list.length -= c;
  return ret;
} // Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.


function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;

  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;

    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }

      break;
    }

    ++c;
  }

  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState; // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.

  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_transform.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/stream-http/node_modules/readable-stream/lib/_stream_transform.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.


module.exports = Transform;

var Duplex = __webpack_require__(/*! ./_stream_duplex */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js");
/*<replacement>*/


var util = Object.create(__webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js"));
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);

    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');
  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');
  return stream.push(null);
}

/***/ }),

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_writable.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/stream-http/node_modules/readable-stream/lib/_stream_writable.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/


module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/

var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var util = Object.create(__webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js"));
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

/*<replacement>*/

var internalUtil = {
  deprecate: __webpack_require__(/*! util-deprecate */ "./node_modules/util-deprecate/browser.js")
};
/*</replacement>*/

/*<replacement>*/

var Stream = __webpack_require__(/*! ./internal/streams/stream */ "./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/

/*<replacement>*/


var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/


var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/destroy.js");

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js");
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  var isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm; // cast to ints.

  this.highWaterMark = Math.floor(this.highWaterMark); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js"); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.

  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end'); // TODO: defer error events consistently everywhere, not just the cb

  stream.emit('error', er);
  pna.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }

  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }

  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;
  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      stream.emit('error', err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }

  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/BufferList.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/BufferList.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer;

var util = __webpack_require__(/*! util */ 21);

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = {
      data: v,
      next: null
    };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = {
      data: v,
      next: this.head
    };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;

    while (p = p.next) {
      ret += s + p.data;
    }

    return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;

    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }

    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({
      length: this.length
    });
    return this.constructor.name + ' ' + obj;
  };
}

/***/ }),

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/destroy.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/destroy.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/
// undocumented cb() API, needed for core, not for public API


function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);

      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;

/***/ }),

/***/ "./node_modules/stream-http/node_modules/readable-stream/readable-browser.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/stream-http/node_modules/readable-stream/readable-browser.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ./lib/_stream_readable.js */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_readable.js");
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(/*! ./lib/_stream_writable.js */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_writable.js");
exports.Duplex = __webpack_require__(/*! ./lib/_stream_duplex.js */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js");
exports.Transform = __webpack_require__(/*! ./lib/_stream_transform.js */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_transform.js");
exports.PassThrough = __webpack_require__(/*! ./lib/_stream_passthrough.js */ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_passthrough.js");

/***/ }),

/***/ "./node_modules/to-arraybuffer/index.js":
/*!**********************************************!*\
  !*** ./node_modules/to-arraybuffer/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js").Buffer;

module.exports = function (buf) {
  // If the buffer is backed by a Uint8Array, a faster version will work
  if (buf instanceof Uint8Array) {
    // If the buffer isn't a subarray, return the underlying ArrayBuffer
    if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
      return buf.buffer;
    } else if (typeof buf.buffer.slice === 'function') {
      // Otherwise we need to get a proper copy
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
  }

  if (Buffer.isBuffer(buf)) {
    // This is the slow version that will work with any Buffer
    // implementation (even in old browsers)
    var arrayCopy = new Uint8Array(buf.length);
    var len = buf.length;

    for (var i = 0; i < len; i++) {
      arrayCopy[i] = buf[i];
    }

    return arrayCopy.buffer;
  } else {
    throw new Error('Argument must be a Buffer');
  }
};

/***/ }),

/***/ "./node_modules/typedarray-to-buffer/index.js":
/*!****************************************************!*\
  !*** ./node_modules/typedarray-to-buffer/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Convert a typed array to a Buffer without a copy
 *
 * Author:   Feross Aboukhadijeh <https://feross.org>
 * License:  MIT
 *
 * `npm install typedarray-to-buffer`
 */
var isTypedArray = __webpack_require__(/*! is-typedarray */ "./node_modules/is-typedarray/index.js").strict;

module.exports = function typedarrayToBuffer(arr) {
  if (isTypedArray(arr)) {
    // To avoid a copy, use the typed array's underlying ArrayBuffer to back new Buffer
    var buf = Buffer.from(arr.buffer);

    if (arr.byteLength !== arr.buffer.byteLength) {
      // Respect the "view", i.e. byteOffset and byteLength, without doing a copy
      buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
    }

    return buf;
  } else {
    // Pass through all other types to `Buffer.from`
    return Buffer.from(arr);
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/window-getters/dist/cjs/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/window-getters/dist/cjs/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getFromWindow(name) {
  let res = undefined;

  if (typeof window !== 'undefined' && typeof window[name] !== 'undefined') {
    res = window[name];
  }

  return res;
}

exports.getFromWindow = getFromWindow;

function getFromWindowOrThrow(name) {
  const res = getFromWindow(name);

  if (!res) {
    throw new Error(`${name} is not defined in Window`);
  }

  return res;
}

exports.getFromWindowOrThrow = getFromWindowOrThrow;

function getDocumentOrThrow() {
  return getFromWindowOrThrow('document');
}

exports.getDocumentOrThrow = getDocumentOrThrow;

function getDocument() {
  return getFromWindow('document');
}

exports.getDocument = getDocument;

function getNavigatorOrThrow() {
  return getFromWindowOrThrow('navigator');
}

exports.getNavigatorOrThrow = getNavigatorOrThrow;

function getNavigator() {
  return getFromWindow('navigator');
}

exports.getNavigator = getNavigator;

function getLocationOrThrow() {
  return getFromWindowOrThrow('location');
}

exports.getLocationOrThrow = getLocationOrThrow;

function getLocation() {
  return getFromWindow('location');
}

exports.getLocation = getLocation;

function getCryptoOrThrow() {
  return getFromWindowOrThrow('crypto');
}

exports.getCryptoOrThrow = getCryptoOrThrow;

function getCrypto() {
  return getFromWindow('crypto');
}

exports.getCrypto = getCrypto;

function getLocalStorageOrThrow() {
  return getFromWindowOrThrow('localStorage');
}

exports.getLocalStorageOrThrow = getLocalStorageOrThrow;

function getLocalStorage() {
  return getFromWindow('localStorage');
}

exports.getLocalStorage = getLocalStorage;

/***/ }),

/***/ "./node_modules/window-metadata/dist/cjs/index.js":
/*!********************************************************!*\
  !*** ./node_modules/window-metadata/dist/cjs/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const window_getters_1 = __webpack_require__(/*! window-getters */ "./node_modules/window-getters/dist/cjs/index.js");

function getWindowMetadata() {
  let doc;
  let loc;

  try {
    doc = window_getters_1.getDocumentOrThrow();
    loc = window_getters_1.getLocationOrThrow();
  } catch (e) {
    return null;
  }

  function getIcons() {
    const links = doc.getElementsByTagName('link');
    const icons = [];

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const rel = link.getAttribute('rel');

      if (rel) {
        if (rel.toLowerCase().indexOf('icon') > -1) {
          const href = link.getAttribute('href');

          if (href) {
            if (href.toLowerCase().indexOf('https:') === -1 && href.toLowerCase().indexOf('http:') === -1 && href.indexOf('//') !== 0) {
              let absoluteHref = loc.protocol + '//' + loc.host;

              if (href.indexOf('/') === 0) {
                absoluteHref += href;
              } else {
                const path = loc.pathname.split('/');
                path.pop();
                const finalPath = path.join('/');
                absoluteHref += finalPath + '/' + href;
              }

              icons.push(absoluteHref);
            } else if (href.indexOf('//') === 0) {
              const absoluteUrl = loc.protocol + href;
              icons.push(absoluteUrl);
            } else {
              icons.push(href);
            }
          }
        }
      }
    }

    return icons;
  }

  function getWindowMetadataOfAny(...args) {
    const metaTags = doc.getElementsByTagName('meta');

    for (let i = 0; i < metaTags.length; i++) {
      const tag = metaTags[i];
      const attributes = ['itemprop', 'property', 'name'].map(target => tag.getAttribute(target)).filter(attr => {
        if (attr) {
          return args.includes(attr);
        }

        return false;
      });

      if (attributes.length && attributes) {
        const content = tag.getAttribute('content');

        if (content) {
          return content;
        }
      }
    }

    return '';
  }

  function getName() {
    let name = getWindowMetadataOfAny('name', 'og:site_name', 'og:title', 'twitter:title');

    if (!name) {
      name = doc.title;
    }

    return name;
  }

  function getDescription() {
    const description = getWindowMetadataOfAny('description', 'og:description', 'twitter:description', 'keywords');
    return description;
  }

  const name = getName();
  const description = getDescription();
  const url = loc.origin;
  const icons = getIcons();
  const meta = {
    description,
    url,
    icons,
    name
  };
  return meta;
}

exports.getWindowMetadata = getWindowMetadata;

/***/ }),

/***/ "./node_modules/xhr2-cookies/dist/errors.js":
/*!**************************************************!*\
  !*** ./node_modules/xhr2-cookies/dist/errors.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SecurityError =
/** @class */
function (_super) {
  __extends(SecurityError, _super);

  function SecurityError() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return SecurityError;
}(Error);

exports.SecurityError = SecurityError;

var InvalidStateError =
/** @class */
function (_super) {
  __extends(InvalidStateError, _super);

  function InvalidStateError() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return InvalidStateError;
}(Error);

exports.InvalidStateError = InvalidStateError;

var NetworkError =
/** @class */
function (_super) {
  __extends(NetworkError, _super);

  function NetworkError() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return NetworkError;
}(Error);

exports.NetworkError = NetworkError;

var SyntaxError =
/** @class */
function (_super) {
  __extends(SyntaxError, _super);

  function SyntaxError() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return SyntaxError;
}(Error);

exports.SyntaxError = SyntaxError;

/***/ }),

/***/ "./node_modules/xhr2-cookies/dist/index.js":
/*!*************************************************!*\
  !*** ./node_modules/xhr2-cookies/dist/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__(/*! ./xml-http-request */ "./node_modules/xhr2-cookies/dist/xml-http-request.js"));

var xml_http_request_event_target_1 = __webpack_require__(/*! ./xml-http-request-event-target */ "./node_modules/xhr2-cookies/dist/xml-http-request-event-target.js");

exports.XMLHttpRequestEventTarget = xml_http_request_event_target_1.XMLHttpRequestEventTarget;

/***/ }),

/***/ "./node_modules/xhr2-cookies/dist/progress-event.js":
/*!**********************************************************!*\
  !*** ./node_modules/xhr2-cookies/dist/progress-event.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ProgressEvent =
/** @class */
function () {
  function ProgressEvent(type) {
    this.type = type;
    this.bubbles = false;
    this.cancelable = false;
    this.loaded = 0;
    this.lengthComputable = false;
    this.total = 0;
  }

  return ProgressEvent;
}();

exports.ProgressEvent = ProgressEvent;

/***/ }),

/***/ "./node_modules/xhr2-cookies/dist/xml-http-request-event-target.js":
/*!*************************************************************************!*\
  !*** ./node_modules/xhr2-cookies/dist/xml-http-request-event-target.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var XMLHttpRequestEventTarget =
/** @class */
function () {
  function XMLHttpRequestEventTarget() {
    this.listeners = {};
  }

  XMLHttpRequestEventTarget.prototype.addEventListener = function (eventType, listener) {
    eventType = eventType.toLowerCase();
    this.listeners[eventType] = this.listeners[eventType] || [];
    this.listeners[eventType].push(listener.handleEvent || listener);
  };

  XMLHttpRequestEventTarget.prototype.removeEventListener = function (eventType, listener) {
    eventType = eventType.toLowerCase();

    if (!this.listeners[eventType]) {
      return;
    }

    var index = this.listeners[eventType].indexOf(listener.handleEvent || listener);

    if (index < 0) {
      return;
    }

    this.listeners[eventType].splice(index, 1);
  };

  XMLHttpRequestEventTarget.prototype.dispatchEvent = function (event) {
    var eventType = event.type.toLowerCase();
    event.target = this; // TODO: set event.currentTarget?

    if (this.listeners[eventType]) {
      for (var _i = 0, _a = this.listeners[eventType]; _i < _a.length; _i++) {
        var listener_1 = _a[_i];
        listener_1.call(this, event);
      }
    }

    var listener = this["on" + eventType];

    if (listener) {
      listener.call(this, event);
    }

    return true;
  };

  return XMLHttpRequestEventTarget;
}();

exports.XMLHttpRequestEventTarget = XMLHttpRequestEventTarget;

/***/ }),

/***/ "./node_modules/xhr2-cookies/dist/xml-http-request-upload.js":
/*!*******************************************************************!*\
  !*** ./node_modules/xhr2-cookies/dist/xml-http-request-upload.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var xml_http_request_event_target_1 = __webpack_require__(/*! ./xml-http-request-event-target */ "./node_modules/xhr2-cookies/dist/xml-http-request-event-target.js");

var XMLHttpRequestUpload =
/** @class */
function (_super) {
  __extends(XMLHttpRequestUpload, _super);

  function XMLHttpRequestUpload() {
    var _this = _super.call(this) || this;

    _this._contentType = null;
    _this._body = null;

    _this._reset();

    return _this;
  }

  XMLHttpRequestUpload.prototype._reset = function () {
    this._contentType = null;
    this._body = null;
  };

  XMLHttpRequestUpload.prototype._setData = function (data) {
    if (data == null) {
      return;
    }

    if (typeof data === 'string') {
      if (data.length !== 0) {
        this._contentType = 'text/plain;charset=UTF-8';
      }

      this._body = new Buffer(data, 'utf-8');
    } else if (Buffer.isBuffer(data)) {
      this._body = data;
    } else if (data instanceof ArrayBuffer) {
      var body = new Buffer(data.byteLength);
      var view = new Uint8Array(data);

      for (var i = 0; i < data.byteLength; i++) {
        body[i] = view[i];
      }

      this._body = body;
    } else if (data.buffer && data.buffer instanceof ArrayBuffer) {
      var body = new Buffer(data.byteLength);
      var offset = data.byteOffset;
      var view = new Uint8Array(data.buffer);

      for (var i = 0; i < data.byteLength; i++) {
        body[i] = view[i + offset];
      }

      this._body = body;
    } else {
      throw new Error("Unsupported send() data " + data);
    }
  };

  XMLHttpRequestUpload.prototype._finalizeHeaders = function (headers, loweredHeaders) {
    if (this._contentType && !loweredHeaders['content-type']) {
      headers['Content-Type'] = this._contentType;
    }

    if (this._body) {
      headers['Content-Length'] = this._body.length.toString();
    }
  };

  XMLHttpRequestUpload.prototype._startUpload = function (request) {
    if (this._body) {
      request.write(this._body);
    }

    request.end();
  };

  return XMLHttpRequestUpload;
}(xml_http_request_event_target_1.XMLHttpRequestEventTarget);

exports.XMLHttpRequestUpload = XMLHttpRequestUpload;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/xhr2-cookies/dist/xml-http-request.js":
/*!************************************************************!*\
  !*** ./node_modules/xhr2-cookies/dist/xml-http-request.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, Buffer) {

var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];

    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
  }

  return t;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var http = __webpack_require__(/*! http */ "./node_modules/stream-http/index.js");

var https = __webpack_require__(/*! https */ "./node_modules/https-browserify/index.js");

var os = __webpack_require__(/*! os */ "./node_modules/os-browserify/browser.js");

var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

var progress_event_1 = __webpack_require__(/*! ./progress-event */ "./node_modules/xhr2-cookies/dist/progress-event.js");

var errors_1 = __webpack_require__(/*! ./errors */ "./node_modules/xhr2-cookies/dist/errors.js");

var xml_http_request_event_target_1 = __webpack_require__(/*! ./xml-http-request-event-target */ "./node_modules/xhr2-cookies/dist/xml-http-request-event-target.js");

var xml_http_request_upload_1 = __webpack_require__(/*! ./xml-http-request-upload */ "./node_modules/xhr2-cookies/dist/xml-http-request-upload.js");

var Cookie = __webpack_require__(/*! cookiejar */ "./node_modules/cookiejar/cookiejar.js");

var XMLHttpRequest =
/** @class */
function (_super) {
  __extends(XMLHttpRequest, _super);

  function XMLHttpRequest(options) {
    if (options === void 0) {
      options = {};
    }

    var _this = _super.call(this) || this;

    _this.UNSENT = XMLHttpRequest.UNSENT;
    _this.OPENED = XMLHttpRequest.OPENED;
    _this.HEADERS_RECEIVED = XMLHttpRequest.HEADERS_RECEIVED;
    _this.LOADING = XMLHttpRequest.LOADING;
    _this.DONE = XMLHttpRequest.DONE;
    _this.onreadystatechange = null;
    _this.readyState = XMLHttpRequest.UNSENT;
    _this.response = null;
    _this.responseText = '';
    _this.responseType = '';
    _this.status = 0; // TODO: UNSENT?

    _this.statusText = '';
    _this.timeout = 0;
    _this.upload = new xml_http_request_upload_1.XMLHttpRequestUpload();
    _this.responseUrl = '';
    _this.withCredentials = false;
    _this._method = null;
    _this._url = null;
    _this._sync = false;
    _this._headers = {};
    _this._loweredHeaders = {};
    _this._mimeOverride = null; // TODO: is type right?

    _this._request = null;
    _this._response = null;
    _this._responseParts = null;
    _this._responseHeaders = null;
    _this._aborting = null; // TODO: type?

    _this._error = null; // TODO: type?

    _this._loadedBytes = 0;
    _this._totalBytes = 0;
    _this._lengthComputable = false;
    _this._restrictedMethods = {
      CONNECT: true,
      TRACE: true,
      TRACK: true
    };
    _this._restrictedHeaders = {
      'accept-charset': true,
      'accept-encoding': true,
      'access-control-request-headers': true,
      'access-control-request-method': true,
      connection: true,
      'content-length': true,
      cookie: true,
      cookie2: true,
      date: true,
      dnt: true,
      expect: true,
      host: true,
      'keep-alive': true,
      origin: true,
      referer: true,
      te: true,
      trailer: true,
      'transfer-encoding': true,
      upgrade: true,
      'user-agent': true,
      via: true
    };
    _this._privateHeaders = {
      'set-cookie': true,
      'set-cookie2': true
    };
    _this._userAgent = "Mozilla/5.0 (" + os.type() + " " + os.arch() + ") node.js/" + process.versions.node + " v8/" + process.versions.v8;
    _this._anonymous = options.anon || false;
    return _this;
  }

  XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    if (async === void 0) {
      async = true;
    }

    method = method.toUpperCase();

    if (this._restrictedMethods[method]) {
      throw new XMLHttpRequest.SecurityError("HTTP method " + method + " is not allowed in XHR");
    }

    ;

    var xhrUrl = this._parseUrl(url, user, password);

    if (this.readyState === XMLHttpRequest.HEADERS_RECEIVED || this.readyState === XMLHttpRequest.LOADING) {// TODO(pwnall): terminate abort(), terminate send()
    }

    this._method = method;
    this._url = xhrUrl;
    this._sync = !async;
    this._headers = {};
    this._loweredHeaders = {};
    this._mimeOverride = null;

    this._setReadyState(XMLHttpRequest.OPENED);

    this._request = null;
    this._response = null;
    this.status = 0;
    this.statusText = '';
    this._responseParts = [];
    this._responseHeaders = null;
    this._loadedBytes = 0;
    this._totalBytes = 0;
    this._lengthComputable = false;
  };

  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    if (this.readyState !== XMLHttpRequest.OPENED) {
      throw new XMLHttpRequest.InvalidStateError('XHR readyState must be OPENED');
    }

    var loweredName = name.toLowerCase();

    if (this._restrictedHeaders[loweredName] || /^sec-/.test(loweredName) || /^proxy-/.test(loweredName)) {
      console.warn("Refused to set unsafe header \"" + name + "\"");
      return;
    }

    value = value.toString();

    if (this._loweredHeaders[loweredName] != null) {
      name = this._loweredHeaders[loweredName];
      this._headers[name] = this._headers[name] + ", " + value;
    } else {
      this._loweredHeaders[loweredName] = name;
      this._headers[name] = value;
    }
  };

  XMLHttpRequest.prototype.send = function (data) {
    if (this.readyState !== XMLHttpRequest.OPENED) {
      throw new XMLHttpRequest.InvalidStateError('XHR readyState must be OPENED');
    }

    if (this._request) {
      throw new XMLHttpRequest.InvalidStateError('send() already called');
    }

    switch (this._url.protocol) {
      case 'file:':
        return this._sendFile(data);

      case 'http:':
      case 'https:':
        return this._sendHttp(data);

      default:
        throw new XMLHttpRequest.NetworkError("Unsupported protocol " + this._url.protocol);
    }
  };

  XMLHttpRequest.prototype.abort = function () {
    if (this._request == null) {
      return;
    }

    this._request.abort();

    this._setError();

    this._dispatchProgress('abort');

    this._dispatchProgress('loadend');
  };

  XMLHttpRequest.prototype.getResponseHeader = function (name) {
    if (this._responseHeaders == null || name == null) {
      return null;
    }

    var loweredName = name.toLowerCase();
    return this._responseHeaders.hasOwnProperty(loweredName) ? this._responseHeaders[name.toLowerCase()] : null;
  };

  XMLHttpRequest.prototype.getAllResponseHeaders = function () {
    var _this = this;

    if (this._responseHeaders == null) {
      return '';
    }

    return Object.keys(this._responseHeaders).map(function (key) {
      return key + ": " + _this._responseHeaders[key];
    }).join('\r\n');
  };

  XMLHttpRequest.prototype.overrideMimeType = function (mimeType) {
    if (this.readyState === XMLHttpRequest.LOADING || this.readyState === XMLHttpRequest.DONE) {
      throw new XMLHttpRequest.InvalidStateError('overrideMimeType() not allowed in LOADING or DONE');
    }

    this._mimeOverride = mimeType.toLowerCase();
  };

  XMLHttpRequest.prototype.nodejsSet = function (options) {
    this.nodejsHttpAgent = options.httpAgent || this.nodejsHttpAgent;
    this.nodejsHttpsAgent = options.httpsAgent || this.nodejsHttpsAgent;

    if (options.hasOwnProperty('baseUrl')) {
      if (options.baseUrl != null) {
        var parsedUrl = url.parse(options.baseUrl, false, true);

        if (!parsedUrl.protocol) {
          throw new XMLHttpRequest.SyntaxError("baseUrl must be an absolute URL");
        }
      }

      this.nodejsBaseUrl = options.baseUrl;
    }
  };

  XMLHttpRequest.nodejsSet = function (options) {
    XMLHttpRequest.prototype.nodejsSet(options);
  };

  XMLHttpRequest.prototype._setReadyState = function (readyState) {
    this.readyState = readyState;
    this.dispatchEvent(new progress_event_1.ProgressEvent('readystatechange'));
  };

  XMLHttpRequest.prototype._sendFile = function (data) {
    // TODO
    throw new Error('Protocol file: not implemented');
  };

  XMLHttpRequest.prototype._sendHttp = function (data) {
    if (this._sync) {
      throw new Error('Synchronous XHR processing not implemented');
    }

    if (data && (this._method === 'GET' || this._method === 'HEAD')) {
      console.warn("Discarding entity body for " + this._method + " requests");
      data = null;
    } else {
      data = data || '';
    }

    this.upload._setData(data);

    this._finalizeHeaders();

    this._sendHxxpRequest();
  };

  XMLHttpRequest.prototype._sendHxxpRequest = function () {
    var _this = this;

    if (this.withCredentials) {
      var cookie = XMLHttpRequest.cookieJar.getCookies(Cookie.CookieAccessInfo(this._url.hostname, this._url.pathname, this._url.protocol === 'https:')).toValueString();
      this._headers.cookie = this._headers.cookie2 = cookie;
    }

    var _a = this._url.protocol === 'http:' ? [http, this.nodejsHttpAgent] : [https, this.nodejsHttpsAgent],
        hxxp = _a[0],
        agent = _a[1];

    var requestMethod = hxxp.request.bind(hxxp);
    var request = requestMethod({
      hostname: this._url.hostname,
      port: +this._url.port,
      path: this._url.path,
      auth: this._url.auth,
      method: this._method,
      headers: this._headers,
      agent: agent
    });
    this._request = request;

    if (this.timeout) {
      request.setTimeout(this.timeout, function () {
        return _this._onHttpTimeout(request);
      });
    }

    request.on('response', function (response) {
      return _this._onHttpResponse(request, response);
    });
    request.on('error', function (error) {
      return _this._onHttpRequestError(request, error);
    });

    this.upload._startUpload(request);

    if (this._request === request) {
      this._dispatchProgress('loadstart');
    }
  };

  XMLHttpRequest.prototype._finalizeHeaders = function () {
    this._headers = __assign({}, this._headers, {
      Connection: 'keep-alive',
      Host: this._url.host,
      'User-Agent': this._userAgent
    }, this._anonymous ? {
      Referer: 'about:blank'
    } : {});

    this.upload._finalizeHeaders(this._headers, this._loweredHeaders);
  };

  XMLHttpRequest.prototype._onHttpResponse = function (request, response) {
    var _this = this;

    if (this._request !== request) {
      return;
    }

    if (this.withCredentials && (response.headers['set-cookie'] || response.headers['set-cookie2'])) {
      XMLHttpRequest.cookieJar.setCookies(response.headers['set-cookie'] || response.headers['set-cookie2']);
    }

    if ([301, 302, 303, 307, 308].indexOf(response.statusCode) >= 0) {
      this._url = this._parseUrl(response.headers.location);
      this._method = 'GET';

      if (this._loweredHeaders['content-type']) {
        delete this._headers[this._loweredHeaders['content-type']];
        delete this._loweredHeaders['content-type'];
      }

      if (this._headers['Content-Type'] != null) {
        delete this._headers['Content-Type'];
      }

      delete this._headers['Content-Length'];

      this.upload._reset();

      this._finalizeHeaders();

      this._sendHxxpRequest();

      return;
    }

    this._response = response;

    this._response.on('data', function (data) {
      return _this._onHttpResponseData(response, data);
    });

    this._response.on('end', function () {
      return _this._onHttpResponseEnd(response);
    });

    this._response.on('close', function () {
      return _this._onHttpResponseClose(response);
    });

    this.responseUrl = this._url.href.split('#')[0];
    this.status = response.statusCode;
    this.statusText = http.STATUS_CODES[this.status];

    this._parseResponseHeaders(response);

    var lengthString = this._responseHeaders['content-length'] || '';
    this._totalBytes = +lengthString;
    this._lengthComputable = !!lengthString;

    this._setReadyState(XMLHttpRequest.HEADERS_RECEIVED);
  };

  XMLHttpRequest.prototype._onHttpResponseData = function (response, data) {
    if (this._response !== response) {
      return;
    }

    this._responseParts.push(new Buffer(data));

    this._loadedBytes += data.length;

    if (this.readyState !== XMLHttpRequest.LOADING) {
      this._setReadyState(XMLHttpRequest.LOADING);
    }

    this._dispatchProgress('progress');
  };

  XMLHttpRequest.prototype._onHttpResponseEnd = function (response) {
    if (this._response !== response) {
      return;
    }

    this._parseResponse();

    this._request = null;
    this._response = null;

    this._setReadyState(XMLHttpRequest.DONE);

    this._dispatchProgress('load');

    this._dispatchProgress('loadend');
  };

  XMLHttpRequest.prototype._onHttpResponseClose = function (response) {
    if (this._response !== response) {
      return;
    }

    var request = this._request;

    this._setError();

    request.abort();

    this._setReadyState(XMLHttpRequest.DONE);

    this._dispatchProgress('error');

    this._dispatchProgress('loadend');
  };

  XMLHttpRequest.prototype._onHttpTimeout = function (request) {
    if (this._request !== request) {
      return;
    }

    this._setError();

    request.abort();

    this._setReadyState(XMLHttpRequest.DONE);

    this._dispatchProgress('timeout');

    this._dispatchProgress('loadend');
  };

  XMLHttpRequest.prototype._onHttpRequestError = function (request, error) {
    if (this._request !== request) {
      return;
    }

    this._setError();

    request.abort();

    this._setReadyState(XMLHttpRequest.DONE);

    this._dispatchProgress('error');

    this._dispatchProgress('loadend');
  };

  XMLHttpRequest.prototype._dispatchProgress = function (eventType) {
    var event = new XMLHttpRequest.ProgressEvent(eventType);
    event.lengthComputable = this._lengthComputable;
    event.loaded = this._loadedBytes;
    event.total = this._totalBytes;
    this.dispatchEvent(event);
  };

  XMLHttpRequest.prototype._setError = function () {
    this._request = null;
    this._response = null;
    this._responseHeaders = null;
    this._responseParts = null;
  };

  XMLHttpRequest.prototype._parseUrl = function (urlString, user, password) {
    var absoluteUrl = this.nodejsBaseUrl == null ? urlString : url.resolve(this.nodejsBaseUrl, urlString);
    var xhrUrl = url.parse(absoluteUrl, false, true);
    xhrUrl.hash = null;

    var _a = (xhrUrl.auth || '').split(':'),
        xhrUser = _a[0],
        xhrPassword = _a[1];

    if (xhrUser || xhrPassword || user || password) {
      xhrUrl.auth = (user || xhrUser || '') + ":" + (password || xhrPassword || '');
    }

    return xhrUrl;
  };

  XMLHttpRequest.prototype._parseResponseHeaders = function (response) {
    this._responseHeaders = {};

    for (var name_1 in response.headers) {
      var loweredName = name_1.toLowerCase();

      if (this._privateHeaders[loweredName]) {
        continue;
      }

      this._responseHeaders[loweredName] = response.headers[name_1];
    }

    if (this._mimeOverride != null) {
      this._responseHeaders['content-type'] = this._mimeOverride;
    }
  };

  XMLHttpRequest.prototype._parseResponse = function () {
    var buffer = Buffer.concat(this._responseParts);
    this._responseParts = null;

    switch (this.responseType) {
      case 'json':
        this.responseText = null;

        try {
          this.response = JSON.parse(buffer.toString('utf-8'));
        } catch (_a) {
          this.response = null;
        }

        return;

      case 'buffer':
        this.responseText = null;
        this.response = buffer;
        return;

      case 'arraybuffer':
        this.responseText = null;
        var arrayBuffer = new ArrayBuffer(buffer.length);
        var view = new Uint8Array(arrayBuffer);

        for (var i = 0; i < buffer.length; i++) {
          view[i] = buffer[i];
        }

        this.response = arrayBuffer;
        return;

      case 'text':
      default:
        try {
          this.responseText = buffer.toString(this._parseResponseEncoding());
        } catch (_b) {
          this.responseText = buffer.toString('binary');
        }

        this.response = this.responseText;
    }
  };

  XMLHttpRequest.prototype._parseResponseEncoding = function () {
    return /;\s*charset=(.*)$/.exec(this._responseHeaders['content-type'] || '')[1] || 'utf-8';
  };

  XMLHttpRequest.ProgressEvent = progress_event_1.ProgressEvent;
  XMLHttpRequest.InvalidStateError = errors_1.InvalidStateError;
  XMLHttpRequest.NetworkError = errors_1.NetworkError;
  XMLHttpRequest.SecurityError = errors_1.SecurityError;
  XMLHttpRequest.SyntaxError = errors_1.SyntaxError;
  XMLHttpRequest.XMLHttpRequestUpload = xml_http_request_upload_1.XMLHttpRequestUpload;
  XMLHttpRequest.UNSENT = 0;
  XMLHttpRequest.OPENED = 1;
  XMLHttpRequest.HEADERS_RECEIVED = 2;
  XMLHttpRequest.LOADING = 3;
  XMLHttpRequest.DONE = 4;
  XMLHttpRequest.cookieJar = Cookie.CookieJar();
  return XMLHttpRequest;
}(xml_http_request_event_target_1.XMLHttpRequestEventTarget);

exports.XMLHttpRequest = XMLHttpRequest;
XMLHttpRequest.prototype.nodejsHttpAgent = http.globalAgent;
XMLHttpRequest.prototype.nodejsHttpsAgent = https.globalAgent;
XMLHttpRequest.prototype.nodejsBaseUrl = null;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ })

}]);
//# sourceMappingURL=2.chunk.js.map