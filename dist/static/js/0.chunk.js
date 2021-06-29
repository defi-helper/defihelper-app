(this["webpackJsonpstaking"] = this["webpackJsonpstaking"] || []).push([[0],{

/***/ "./node_modules/@metamask/safe-event-emitter/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@metamask/safe-event-emitter/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");

function safeApply(handler, context, args) {
  try {
    Reflect.apply(handler, context, args);
  } catch (err) {
    // Throw error after timeout so as not to interrupt the stack
    setTimeout(() => {
      throw err;
    });
  }
}

function arrayClone(arr) {
  const n = arr.length;
  const copy = new Array(n);

  for (let i = 0; i < n; i += 1) {
    copy[i] = arr[i];
  }

  return copy;
}

class SafeEventEmitter extends events_1.EventEmitter {
  emit(type, ...args) {
    let doError = type === 'error';
    const events = this._events;

    if (events !== undefined) {
      doError = doError && events.error === undefined;
    } else if (!doError) {
      return false;
    } // If there is no 'error' event listener then throw.


    if (doError) {
      let er;

      if (args.length > 0) {
        [er] = args;
      }

      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      } // At least give some kind of context to the user


      const err = new Error(`Unhandled error.${er ? ` (${er.message})` : ''}`);
      err.context = er;
      throw err; // Unhandled 'error' event
    }

    const handler = events[type];

    if (handler === undefined) {
      return false;
    }

    if (typeof handler === 'function') {
      safeApply(handler, this, args);
    } else {
      const len = handler.length;
      const listeners = arrayClone(handler);

      for (let i = 0; i < len; i += 1) {
        safeApply(listeners[i], this, args);
      }
    }

    return true;
  }

}

exports.default = SafeEventEmitter;

/***/ }),

/***/ "./node_modules/async-mutex/es6/Mutex.js":
/*!***********************************************!*\
  !*** ./node_modules/async-mutex/es6/Mutex.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Semaphore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Semaphore */ "./node_modules/async-mutex/es6/Semaphore.js");



var Mutex =
/** @class */
function () {
  function Mutex() {
    this._semaphore = new _Semaphore__WEBPACK_IMPORTED_MODULE_1__["default"](1);
  }

  Mutex.prototype.acquire = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var _a, releaser;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , this._semaphore.acquire()];

          case 1:
            _a = _b.sent(), releaser = _a[1];
            return [2
            /*return*/
            , releaser];
        }
      });
    });
  };

  Mutex.prototype.runExclusive = function (callback) {
    return this._semaphore.runExclusive(function () {
      return callback();
    });
  };

  Mutex.prototype.isLocked = function () {
    return this._semaphore.isLocked();
  };

  Mutex.prototype.release = function () {
    this._semaphore.release();
  };

  return Mutex;
}();

/* harmony default export */ __webpack_exports__["default"] = (Mutex);

/***/ }),

/***/ "./node_modules/async-mutex/es6/Semaphore.js":
/*!***************************************************!*\
  !*** ./node_modules/async-mutex/es6/Semaphore.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");


var Semaphore =
/** @class */
function () {
  function Semaphore(_maxConcurrency) {
    this._maxConcurrency = _maxConcurrency;
    this._queue = [];

    if (_maxConcurrency <= 0) {
      throw new Error('semaphore must be initialized to a positive value');
    }

    this._value = _maxConcurrency;
  }

  Semaphore.prototype.acquire = function () {
    var _this = this;

    var locked = this.isLocked();
    var ticket = new Promise(function (r) {
      return _this._queue.push(r);
    });
    if (!locked) this._dispatch();
    return ticket;
  };

  Semaphore.prototype.runExclusive = function (callback) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var _a, value, release;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , this.acquire()];

          case 1:
            _a = _b.sent(), value = _a[0], release = _a[1];
            _b.label = 2;

          case 2:
            _b.trys.push([2,, 4, 5]);

            return [4
            /*yield*/
            , callback(value)];

          case 3:
            return [2
            /*return*/
            , _b.sent()];

          case 4:
            release();
            return [7
            /*endfinally*/
            ];

          case 5:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Semaphore.prototype.isLocked = function () {
    return this._value <= 0;
  };

  Semaphore.prototype.release = function () {
    if (this._maxConcurrency > 1) {
      throw new Error('this method is unavailabel on semaphores with concurrency > 1; use the scoped release returned by acquire instead');
    }

    if (this._currentReleaser) {
      var releaser = this._currentReleaser;
      this._currentReleaser = undefined;
      releaser();
    }
  };

  Semaphore.prototype._dispatch = function () {
    var _this = this;

    var nextConsumer = this._queue.shift();

    if (!nextConsumer) return;
    var released = false;

    this._currentReleaser = function () {
      if (released) return;
      released = true;
      _this._value++;

      _this._dispatch();
    };

    nextConsumer([this._value--, this._currentReleaser]);
  };

  return Semaphore;
}();

/* harmony default export */ __webpack_exports__["default"] = (Semaphore);

/***/ }),

/***/ "./node_modules/async-mutex/es6/index.js":
/*!***********************************************!*\
  !*** ./node_modules/async-mutex/es6/index.js ***!
  \***********************************************/
/*! exports provided: Mutex, Semaphore, withTimeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mutex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mutex */ "./node_modules/async-mutex/es6/Mutex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mutex", function() { return _Mutex__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Semaphore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Semaphore */ "./node_modules/async-mutex/es6/Semaphore.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Semaphore", function() { return _Semaphore__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _withTimeout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./withTimeout */ "./node_modules/async-mutex/es6/withTimeout.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withTimeout", function() { return _withTimeout__WEBPACK_IMPORTED_MODULE_2__["withTimeout"]; });





/***/ }),

/***/ "./node_modules/async-mutex/es6/withTimeout.js":
/*!*****************************************************!*\
  !*** ./node_modules/async-mutex/es6/withTimeout.js ***!
  \*****************************************************/
/*! exports provided: withTimeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTimeout", function() { return withTimeout; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
 // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

function withTimeout(sync, timeout, timeoutError) {
  var _this = this;

  if (timeoutError === void 0) {
    timeoutError = new Error('timeout');
  }

  return {
    acquire: function () {
      return new Promise(function (resolve, reject) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
          var isTimeout, ticket, release;
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
              case 0:
                isTimeout = false;
                setTimeout(function () {
                  isTimeout = true;
                  reject(timeoutError);
                }, timeout);
                return [4
                /*yield*/
                , sync.acquire()];

              case 1:
                ticket = _a.sent();

                if (isTimeout) {
                  release = Array.isArray(ticket) ? ticket[1] : ticket;
                  release();
                } else {
                  resolve(ticket);
                }

                return [2
                /*return*/
                ];
            }
          });
        });
      });
    },
    runExclusive: function (callback) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        var release, ticket;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
          switch (_a.label) {
            case 0:
              release = function () {
                return undefined;
              };

              _a.label = 1;

            case 1:
              _a.trys.push([1,, 7, 8]);

              return [4
              /*yield*/
              , this.acquire()];

            case 2:
              ticket = _a.sent();
              if (!Array.isArray(ticket)) return [3
              /*break*/
              , 4];
              release = ticket[1];
              return [4
              /*yield*/
              , callback(ticket[0])];

            case 3:
              return [2
              /*return*/
              , _a.sent()];

            case 4:
              release = ticket;
              return [4
              /*yield*/
              , callback()];

            case 5:
              return [2
              /*return*/
              , _a.sent()];

            case 6:
              return [3
              /*break*/
              , 8];

            case 7:
              release();
              return [7
              /*endfinally*/
              ];

            case 8:
              return [2
              /*return*/
              ];
          }
        });
      });
    },
    release: function () {
      sync.release();
    },
    isLocked: function () {
      return sync.isLocked();
    }
  };
}

/***/ }),

/***/ "./node_modules/eth-block-tracker/node_modules/pify/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/eth-block-tracker/node_modules/pify/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const processFn = (fn, opts) => function () {
  const P = opts.promiseModule;
  const args = new Array(arguments.length);

  for (let i = 0; i < arguments.length; i++) {
    args[i] = arguments[i];
  }

  return new P((resolve, reject) => {
    if (opts.errorFirst) {
      args.push(function (err, result) {
        if (opts.multiArgs) {
          const results = new Array(arguments.length - 1);

          for (let i = 1; i < arguments.length; i++) {
            results[i - 1] = arguments[i];
          }

          if (err) {
            results.unshift(err);
            reject(results);
          } else {
            resolve(results);
          }
        } else if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else {
      args.push(function (result) {
        if (opts.multiArgs) {
          const results = new Array(arguments.length - 1);

          for (let i = 0; i < arguments.length; i++) {
            results[i] = arguments[i];
          }

          resolve(results);
        } else {
          resolve(result);
        }
      });
    }

    fn.apply(this, args);
  });
};

module.exports = (obj, opts) => {
  opts = Object.assign({
    exclude: [/.+(Sync|Stream)$/],
    errorFirst: true,
    promiseModule: Promise
  }, opts);

  const filter = key => {
    const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);

    return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
  };

  let ret;

  if (typeof obj === 'function') {
    ret = function () {
      if (opts.excludeMain) {
        return obj.apply(this, arguments);
      }

      return processFn(obj, opts).apply(this, arguments);
    };
  } else {
    ret = Object.create(Object.getPrototypeOf(obj));
  }

  for (const key in obj) {
    // eslint-disable-line guard-for-in
    const x = obj[key];
    ret[key] = typeof x === 'function' && filter(key) ? processFn(x, opts) : x;
  }

  return ret;
};

/***/ }),

/***/ "./node_modules/eth-block-tracker/src/base.js":
/*!****************************************************!*\
  !*** ./node_modules/eth-block-tracker/src/base.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EthQuery = __webpack_require__(/*! eth-query */ "./node_modules/eth-query/index.js");

const pify = __webpack_require__(/*! pify */ "./node_modules/eth-block-tracker/node_modules/pify/index.js");

const SafeEventEmitter = __webpack_require__(/*! safe-event-emitter */ "./node_modules/safe-event-emitter/index.js");

const sec = 1000;

const calculateSum = (accumulator, currentValue) => accumulator + currentValue;

const blockTrackerEvents = ['sync', 'latest'];

class BaseBlockTracker extends SafeEventEmitter {
  //
  // public
  //
  constructor(opts = {}) {
    super(); // config

    this._blockResetDuration = opts.blockResetDuration || 20 * sec; // state

    this._blockResetTimeout;
    this._currentBlock = null;
    this._isRunning = false; // bind functions for internal use

    this._onNewListener = this._onNewListener.bind(this);
    this._onRemoveListener = this._onRemoveListener.bind(this);
    this._resetCurrentBlock = this._resetCurrentBlock.bind(this); // listen for handler changes

    this._setupInternalEvents();
  }

  isRunning() {
    return this._isRunning;
  }

  getCurrentBlock() {
    return this._currentBlock;
  }

  async getLatestBlock() {
    // return if available
    if (this._currentBlock) return this._currentBlock; // wait for a new latest block

    const latestBlock = await new Promise(resolve => this.once('latest', resolve)); // return newly set current block

    return latestBlock;
  } // dont allow module consumer to remove our internal event listeners


  removeAllListeners(eventName) {
    // perform default behavior, preserve fn arity
    if (eventName) {
      super.removeAllListeners(eventName);
    } else {
      super.removeAllListeners();
    } // re-add internal events


    this._setupInternalEvents(); // trigger stop check just in case


    this._onRemoveListener();
  } //
  // to be implemented in subclass
  //


  _start() {// default behavior is noop
  }

  _end() {// default behavior is noop
  } //
  // private
  //


  _setupInternalEvents() {
    // first remove listeners for idempotence
    this.removeListener('newListener', this._onNewListener);
    this.removeListener('removeListener', this._onRemoveListener); // then add them

    this.on('newListener', this._onNewListener);
    this.on('removeListener', this._onRemoveListener);
  }

  _onNewListener(eventName, handler) {
    // `newListener` is called *before* the listener is added
    if (!blockTrackerEvents.includes(eventName)) return;

    this._maybeStart();
  }

  _onRemoveListener(eventName, handler) {
    // `removeListener` is called *after* the listener is removed
    if (this._getBlockTrackerEventCount() > 0) return;

    this._maybeEnd();
  }

  _maybeStart() {
    if (this._isRunning) return;
    this._isRunning = true; // cancel setting latest block to stale

    this._cancelBlockResetTimeout();

    this._start();
  }

  _maybeEnd() {
    if (!this._isRunning) return;
    this._isRunning = false;

    this._setupBlockResetTimeout();

    this._end();
  }

  _getBlockTrackerEventCount() {
    return blockTrackerEvents.map(eventName => this.listenerCount(eventName)).reduce(calculateSum);
  }

  _newPotentialLatest(newBlock) {
    const currentBlock = this._currentBlock; // only update if blok number is higher

    if (currentBlock && hexToInt(newBlock) <= hexToInt(currentBlock)) return;

    this._setCurrentBlock(newBlock);
  }

  _setCurrentBlock(newBlock) {
    const oldBlock = this._currentBlock;
    this._currentBlock = newBlock;
    this.emit('latest', newBlock);
    this.emit('sync', {
      oldBlock,
      newBlock
    });
  }

  _setupBlockResetTimeout() {
    // clear any existing timeout
    this._cancelBlockResetTimeout(); // clear latest block when stale


    this._blockResetTimeout = setTimeout(this._resetCurrentBlock, this._blockResetDuration); // nodejs - dont hold process open

    if (this._blockResetTimeout.unref) {
      this._blockResetTimeout.unref();
    }
  }

  _cancelBlockResetTimeout() {
    clearTimeout(this._blockResetTimeout);
  }

  _resetCurrentBlock() {
    this._currentBlock = null;
  }

}

module.exports = BaseBlockTracker;

function hexToInt(hexInt) {
  return Number.parseInt(hexInt, 16);
}

/***/ }),

/***/ "./node_modules/eth-block-tracker/src/polling.js":
/*!*******************************************************!*\
  !*** ./node_modules/eth-block-tracker/src/polling.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const pify = __webpack_require__(/*! pify */ "./node_modules/eth-block-tracker/node_modules/pify/index.js");

const BaseBlockTracker = __webpack_require__(/*! ./base */ "./node_modules/eth-block-tracker/src/base.js");

const sec = 1000;

class PollingBlockTracker extends BaseBlockTracker {
  constructor(opts = {}) {
    // parse + validate args
    if (!opts.provider) throw new Error('PollingBlockTracker - no provider specified.');
    const pollingInterval = opts.pollingInterval || 20 * sec;
    const retryTimeout = opts.retryTimeout || pollingInterval / 10;
    const keepEventLoopActive = opts.keepEventLoopActive !== undefined ? opts.keepEventLoopActive : true;
    const setSkipCacheFlag = opts.setSkipCacheFlag || false; // BaseBlockTracker constructor

    super(Object.assign({
      blockResetDuration: pollingInterval
    }, opts)); // config

    this._provider = opts.provider;
    this._pollingInterval = pollingInterval;
    this._retryTimeout = retryTimeout;
    this._keepEventLoopActive = keepEventLoopActive;
    this._setSkipCacheFlag = setSkipCacheFlag;
  } //
  // public
  //
  // trigger block polling


  async checkForLatestBlock() {
    await this._updateLatestBlock();
    return await this.getLatestBlock();
  } //
  // private
  //


  _start() {
    this._performSync().catch(err => this.emit('error', err));
  }

  async _performSync() {
    while (this._isRunning) {
      try {
        await this._updateLatestBlock();
        await timeout(this._pollingInterval, !this._keepEventLoopActive);
      } catch (err) {
        const newErr = new Error(`PollingBlockTracker - encountered an error while attempting to update latest block:\n${err.stack}`);

        try {
          this.emit('error', newErr);
        } catch (emitErr) {
          console.error(newErr);
        }

        await timeout(this._retryTimeout, !this._keepEventLoopActive);
      }
    }
  }

  async _updateLatestBlock() {
    // fetch + set latest block
    const latestBlock = await this._fetchLatestBlock();

    this._newPotentialLatest(latestBlock);
  }

  async _fetchLatestBlock() {
    const req = {
      jsonrpc: "2.0",
      id: 1,
      method: 'eth_blockNumber',
      params: []
    };
    if (this._setSkipCacheFlag) req.skipCache = true;
    const res = await pify(cb => this._provider.sendAsync(req, cb))();
    if (res.error) throw new Error(`PollingBlockTracker - encountered error fetching block:\n${res.error}`);
    return res.result;
  }

}

module.exports = PollingBlockTracker;

function timeout(duration, unref) {
  return new Promise(resolve => {
    const timoutRef = setTimeout(resolve, duration); // don't keep process open

    if (timoutRef.unref && unref) {
      timoutRef.unref();
    }
  });
}

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/base-filter-history.js":
/*!******************************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/base-filter-history.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const BaseFilter = __webpack_require__(/*! ./base-filter */ "./node_modules/eth-json-rpc-filters/base-filter.js"); // tracks all results ever recorded


class BaseFilterWithHistory extends BaseFilter {
  constructor() {
    super();
    this.allResults = [];
  }

  async update() {
    throw new Error('BaseFilterWithHistory - no update method specified');
  }

  addResults(newResults) {
    this.allResults = this.allResults.concat(newResults);
    super.addResults(newResults);
  }

  addInitialResults(newResults) {
    this.allResults = this.allResults.concat(newResults);
    super.addInitialResults(newResults);
  }

  getAllResults() {
    return this.allResults;
  }

}

module.exports = BaseFilterWithHistory;

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/base-filter.js":
/*!**********************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/base-filter.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const SafeEventEmitter = __webpack_require__(/*! @metamask/safe-event-emitter */ "./node_modules/@metamask/safe-event-emitter/index.js").default;

class BaseFilter extends SafeEventEmitter {
  constructor() {
    super();
    this.updates = [];
  }

  async initialize() {}

  async update() {
    throw new Error('BaseFilter - no update method specified');
  }

  addResults(newResults) {
    this.updates = this.updates.concat(newResults);
    newResults.forEach(result => this.emit('update', result));
  }

  addInitialResults(newResults) {}

  getChangesAndClear() {
    const updates = this.updates;
    this.updates = [];
    return updates;
  }

}

module.exports = BaseFilter;

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/block-filter.js":
/*!***********************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/block-filter.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const BaseFilter = __webpack_require__(/*! ./base-filter */ "./node_modules/eth-json-rpc-filters/base-filter.js");

const getBlocksForRange = __webpack_require__(/*! ./getBlocksForRange */ "./node_modules/eth-json-rpc-filters/getBlocksForRange.js");

const {
  incrementHexInt
} = __webpack_require__(/*! ./hexUtils */ "./node_modules/eth-json-rpc-filters/hexUtils.js");

class BlockFilter extends BaseFilter {
  constructor({
    provider,
    params
  }) {
    super();
    this.type = 'block';
    this.provider = provider;
  }

  async update({
    oldBlock,
    newBlock
  }) {
    const toBlock = newBlock;
    const fromBlock = incrementHexInt(oldBlock);
    const blockBodies = await getBlocksForRange({
      provider: this.provider,
      fromBlock,
      toBlock
    });
    const blockHashes = blockBodies.map(block => block.hash);
    this.addResults(blockHashes);
  }

}

module.exports = BlockFilter;

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/getBlocksForRange.js":
/*!****************************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/getBlocksForRange.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = getBlocksForRange;

async function getBlocksForRange({
  provider,
  fromBlock,
  toBlock
}) {
  if (!fromBlock) fromBlock = toBlock;
  const fromBlockNumber = hexToInt(fromBlock);
  const toBlockNumber = hexToInt(toBlock);
  const blockCountToQuery = toBlockNumber - fromBlockNumber + 1; // load all blocks from old to new (inclusive)

  const missingBlockNumbers = Array(blockCountToQuery).fill().map((_, index) => fromBlockNumber + index).map(intToHex);
  const blockBodies = await Promise.all(missingBlockNumbers.map(blockNum => query(provider, 'eth_getBlockByNumber', [blockNum, false])));
  return blockBodies;
}

function hexToInt(hexString) {
  if (hexString === undefined || hexString === null) return hexString;
  return Number.parseInt(hexString, 16);
}

function incrementHexInt(hexString) {
  if (hexString === undefined || hexString === null) return hexString;
  const value = hexToInt(hexString);
  return intToHex(value + 1);
}

function intToHex(int) {
  if (int === undefined || int === null) return int;
  const hexString = int.toString(16);
  return '0x' + hexString;
}

function query(provider, method, params) {
  return new Promise((resolve, reject) => {
    provider.sendAsync({
      id: 1,
      jsonrpc: '2.0',
      method,
      params
    }, (err, res) => {
      if (err) return reject(err);
      resolve(res.result);
    });
  });
}

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/hexUtils.js":
/*!*******************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/hexUtils.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  minBlockRef,
  maxBlockRef,
  sortBlockRefs,
  bnToHex,
  blockRefIsNumber,
  hexToInt,
  incrementHexInt,
  intToHex,
  unsafeRandomBytes
};

function minBlockRef(...refs) {
  const sortedRefs = sortBlockRefs(refs);
  return sortedRefs[0];
}

function maxBlockRef(...refs) {
  const sortedRefs = sortBlockRefs(refs);
  return sortedRefs[sortedRefs.length - 1];
}

function sortBlockRefs(refs) {
  return refs.sort((refA, refB) => {
    if (refA === 'latest' || refB === 'earliest') return 1;
    if (refB === 'latest' || refA === 'earliest') return -1;
    return hexToInt(refA) - hexToInt(refB);
  });
}

function bnToHex(bn) {
  return '0x' + bn.toString(16);
}

function blockRefIsNumber(blockRef) {
  return blockRef && !['earliest', 'latest', 'pending'].includes(blockRef);
}

function hexToInt(hexString) {
  if (hexString === undefined || hexString === null) return hexString;
  return Number.parseInt(hexString, 16);
}

function incrementHexInt(hexString) {
  if (hexString === undefined || hexString === null) return hexString;
  const value = hexToInt(hexString);
  return intToHex(value + 1);
}

function intToHex(int) {
  if (int === undefined || int === null) return int;
  let hexString = int.toString(16);
  const needsLeftPad = hexString.length % 2;
  if (needsLeftPad) hexString = '0' + hexString;
  return '0x' + hexString;
}

function unsafeRandomBytes(byteCount) {
  let result = '0x';

  for (let i = 0; i < byteCount; i++) {
    result += unsafeRandomNibble();
    result += unsafeRandomNibble();
  }

  return result;
}

function unsafeRandomNibble() {
  return Math.floor(Math.random() * 16).toString(16);
}

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/index.js":
/*!****************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Mutex = __webpack_require__(/*! async-mutex */ "./node_modules/async-mutex/es6/index.js").Mutex;

const {
  createAsyncMiddleware
} = __webpack_require__(/*! json-rpc-engine */ "./node_modules/json-rpc-engine/dist/index.js");

const createJsonRpcMiddleware = __webpack_require__(/*! eth-json-rpc-middleware/scaffold */ "./node_modules/eth-json-rpc-filters/node_modules/eth-json-rpc-middleware/scaffold.js");

const LogFilter = __webpack_require__(/*! ./log-filter.js */ "./node_modules/eth-json-rpc-filters/log-filter.js");

const BlockFilter = __webpack_require__(/*! ./block-filter.js */ "./node_modules/eth-json-rpc-filters/block-filter.js");

const TxFilter = __webpack_require__(/*! ./tx-filter.js */ "./node_modules/eth-json-rpc-filters/tx-filter.js");

const {
  intToHex,
  hexToInt
} = __webpack_require__(/*! ./hexUtils */ "./node_modules/eth-json-rpc-filters/hexUtils.js");

module.exports = createEthFilterMiddleware;

function createEthFilterMiddleware({
  blockTracker,
  provider
}) {
  // create filter collection
  let filterIndex = 0;
  let filters = {}; // create update mutex

  const mutex = new Mutex();
  const waitForFree = mutexMiddlewareWrapper({
    mutex
  });
  const middleware = createJsonRpcMiddleware({
    // install filters
    eth_newFilter: waitForFree(toFilterCreationMiddleware(newLogFilter)),
    eth_newBlockFilter: waitForFree(toFilterCreationMiddleware(newBlockFilter)),
    eth_newPendingTransactionFilter: waitForFree(toFilterCreationMiddleware(newPendingTransactionFilter)),
    // uninstall filters
    eth_uninstallFilter: waitForFree(toAsyncRpcMiddleware(uninstallFilterHandler)),
    // checking filter changes
    eth_getFilterChanges: waitForFree(toAsyncRpcMiddleware(getFilterChanges)),
    eth_getFilterLogs: waitForFree(toAsyncRpcMiddleware(getFilterLogs))
  }); // setup filter updating and destroy handler

  const filterUpdater = async ({
    oldBlock,
    newBlock
  }) => {
    if (filters.length === 0) return; // lock update reads

    const releaseLock = await mutex.acquire();

    try {
      // process all filters in parallel
      await Promise.all(objValues(filters).map(async filter => {
        try {
          await filter.update({
            oldBlock,
            newBlock
          });
        } catch (err) {
          // handle each error individually so filter update errors don't affect other filters
          console.error(err);
        }
      }));
    } catch (err) {
      // log error so we don't skip the releaseLock
      console.error(err);
    } // unlock update reads


    releaseLock();
  }; // expose filter methods directly


  middleware.newLogFilter = newLogFilter;
  middleware.newBlockFilter = newBlockFilter;
  middleware.newPendingTransactionFilter = newPendingTransactionFilter;
  middleware.uninstallFilter = uninstallFilterHandler;
  middleware.getFilterChanges = getFilterChanges;
  middleware.getFilterLogs = getFilterLogs; // expose destroy method for cleanup

  middleware.destroy = () => {
    uninstallAllFilters();
  };

  return middleware; //
  // new filters
  //

  async function newLogFilter(params) {
    const filter = new LogFilter({
      provider,
      params
    });
    const filterIndex = await installFilter(filter);
    return filter;
  }

  async function newBlockFilter() {
    const filter = new BlockFilter({
      provider
    });
    const filterIndex = await installFilter(filter);
    return filter;
  }

  async function newPendingTransactionFilter() {
    const filter = new TxFilter({
      provider
    });
    const filterIndex = await installFilter(filter);
    return filter;
  } //
  // get filter changes
  //


  async function getFilterChanges(filterIndexHex) {
    const filterIndex = hexToInt(filterIndexHex);
    const filter = filters[filterIndex];

    if (!filter) {
      throw new Error(`No filter for index "${filterIndex}"`);
    }

    const results = filter.getChangesAndClear();
    return results;
  }

  async function getFilterLogs(filterIndexHex) {
    const filterIndex = hexToInt(filterIndexHex);
    const filter = filters[filterIndex];

    if (!filter) {
      throw new Error(`No filter for index "${filterIndex}"`);
    } // only return results for log filters


    if (filter.type === 'log') {
      results = filter.getAllResults();
    } else {
      results = [];
    }

    return results;
  } //
  // remove filters
  //


  async function uninstallFilterHandler(filterIndexHex) {
    // check filter exists
    const filterIndex = hexToInt(filterIndexHex);
    const filter = filters[filterIndex];
    const result = Boolean(filter); // uninstall filter

    if (result) {
      await uninstallFilter(filterIndex);
    }

    return result;
  } //
  // utils
  //


  async function installFilter(filter) {
    const prevFilterCount = objValues(filters).length; // install filter

    const currentBlock = await blockTracker.getLatestBlock();
    await filter.initialize({
      currentBlock
    });
    filterIndex++;
    filters[filterIndex] = filter;
    filter.id = filterIndex;
    filter.idHex = intToHex(filterIndex); // update block tracker subs

    const newFilterCount = objValues(filters).length;
    updateBlockTrackerSubs({
      prevFilterCount,
      newFilterCount
    });
    return filterIndex;
  }

  async function uninstallFilter(filterIndex) {
    const prevFilterCount = objValues(filters).length;
    delete filters[filterIndex]; // update block tracker subs

    const newFilterCount = objValues(filters).length;
    updateBlockTrackerSubs({
      prevFilterCount,
      newFilterCount
    });
  }

  async function uninstallAllFilters() {
    const prevFilterCount = objValues(filters).length;
    filters = {}; // update block tracker subs

    updateBlockTrackerSubs({
      prevFilterCount,
      newFilterCount: 0
    });
  }

  function updateBlockTrackerSubs({
    prevFilterCount,
    newFilterCount
  }) {
    // subscribe
    if (prevFilterCount === 0 && newFilterCount > 0) {
      blockTracker.on('sync', filterUpdater);
      return;
    } // unsubscribe


    if (prevFilterCount > 0 && newFilterCount === 0) {
      blockTracker.removeListener('sync', filterUpdater);
      return;
    }
  }
} // helper for turning filter constructors into rpc middleware


function toFilterCreationMiddleware(createFilterFn) {
  return toAsyncRpcMiddleware(async (...args) => {
    const filter = await createFilterFn(...args);
    const result = intToHex(filter.id);
    return result;
  });
} // helper for pulling out req.params and setting res.result


function toAsyncRpcMiddleware(asyncFn) {
  return createAsyncMiddleware(async (req, res) => {
    const result = await asyncFn.apply(null, req.params);
    res.result = result;
  });
}

function mutexMiddlewareWrapper({
  mutex
}) {
  return middleware => {
    return async (req, res, next, end) => {
      // wait for mutex available
      // we can release immediately because
      // we just need to make sure updates aren't active
      const releaseLock = await mutex.acquire();
      releaseLock();
      middleware(req, res, next, end);
    };
  };
}

function objValues(obj, fn) {
  const values = [];

  for (let key in obj) {
    values.push(obj[key]);
  }

  return values;
}

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/log-filter.js":
/*!*********************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/log-filter.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EthQuery = __webpack_require__(/*! eth-query */ "./node_modules/eth-query/index.js");

const pify = __webpack_require__(/*! pify */ "./node_modules/eth-json-rpc-filters/node_modules/pify/index.js");

const BaseFilterWithHistory = __webpack_require__(/*! ./base-filter-history */ "./node_modules/eth-json-rpc-filters/base-filter-history.js");

const {
  bnToHex,
  hexToInt,
  incrementHexInt,
  minBlockRef,
  blockRefIsNumber
} = __webpack_require__(/*! ./hexUtils */ "./node_modules/eth-json-rpc-filters/hexUtils.js");

class LogFilter extends BaseFilterWithHistory {
  constructor({
    provider,
    params
  }) {
    super();
    this.type = 'log';
    this.ethQuery = new EthQuery(provider);
    this.params = Object.assign({
      fromBlock: 'latest',
      toBlock: 'latest',
      address: undefined,
      topics: []
    }, params); // normalize address parameter

    if (this.params.address) {
      // ensure array
      if (!Array.isArray(this.params.address)) {
        this.params.address = [this.params.address];
      } // ensure lowercase


      this.params.address = this.params.address.map(address => address.toLowerCase());
    }
  }

  async initialize({
    currentBlock
  }) {
    // resolve params.fromBlock
    let fromBlock = this.params.fromBlock;
    if (['latest', 'pending'].includes(fromBlock)) fromBlock = currentBlock;
    if ('earliest' === fromBlock) fromBlock = '0x0';
    this.params.fromBlock = fromBlock; // set toBlock for initial lookup

    const toBlock = minBlockRef(this.params.toBlock, currentBlock);
    const params = Object.assign({}, this.params, {
      toBlock
    }); // fetch logs and add to results

    const newLogs = await this._fetchLogs(params);
    this.addInitialResults(newLogs);
  }

  async update({
    oldBlock,
    newBlock
  }) {
    // configure params for this update
    const toBlock = newBlock;
    let fromBlock; // oldBlock is empty on first sync

    if (oldBlock) {
      fromBlock = incrementHexInt(oldBlock);
    } else {
      fromBlock = newBlock;
    } // fetch logs


    const params = Object.assign({}, this.params, {
      fromBlock,
      toBlock
    });
    const newLogs = await this._fetchLogs(params);
    const matchingLogs = newLogs.filter(log => this.matchLog(log)); // add to results

    this.addResults(matchingLogs);
  }

  async _fetchLogs(params) {
    const newLogs = await pify(cb => this.ethQuery.getLogs(params, cb))(); // add to results

    return newLogs;
  }

  matchLog(log) {
    // check if block number in bounds:
    if (hexToInt(this.params.fromBlock) >= hexToInt(log.blockNumber)) return false;
    if (blockRefIsNumber(this.params.toBlock) && hexToInt(this.params.toBlock) <= hexToInt(log.blockNumber)) return false; // address is correct:

    const normalizedLogAddress = log.address && log.address.toLowerCase();
    if (this.params.address && normalizedLogAddress && !this.params.address.includes(normalizedLogAddress)) return false; // topics match:
    // topics are position-dependant
    // topics can be nested to represent `or` [[a || b], c]
    // topics can be null, representing a wild card for that position

    const topicsMatch = this.params.topics.every((topicPattern, index) => {
      // pattern is longer than actual topics
      let logTopic = log.topics[index];
      if (!logTopic) return false;
      logTopic = logTopic.toLowerCase(); // normalize subTopics

      let subtopicsToMatch = Array.isArray(topicPattern) ? topicPattern : [topicPattern]; // check for wild card

      const subtopicsIncludeWildcard = subtopicsToMatch.includes(null);
      if (subtopicsIncludeWildcard) return true;
      subtopicsToMatch = subtopicsToMatch.map(topic => topic.toLowerCase()); // check each possible matching topic

      const topicDoesMatch = subtopicsToMatch.includes(logTopic);
      return topicDoesMatch;
    });
    return topicsMatch;
  }

}

module.exports = LogFilter;

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/node_modules/eth-json-rpc-middleware/node_modules/json-rpc-engine/src/createScaffoldMiddleware.js":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/node_modules/eth-json-rpc-middleware/node_modules/json-rpc-engine/src/createScaffoldMiddleware.js ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function createScaffoldMiddleware(handlers) {
  return (req, res, next, end) => {
    const handler = handlers[req.method]; // if no handler, return

    if (handler === undefined) {
      return next();
    } // if handler is fn, call as middleware


    if (typeof handler === 'function') {
      return handler(req, res, next, end);
    } // if handler is some other value, use as result


    res.result = handler;
    return end();
  };
};

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/node_modules/eth-json-rpc-middleware/scaffold.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/node_modules/eth-json-rpc-middleware/scaffold.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// for backwards compat
module.exports = __webpack_require__(/*! json-rpc-engine/src/createScaffoldMiddleware */ "./node_modules/eth-json-rpc-filters/node_modules/eth-json-rpc-middleware/node_modules/json-rpc-engine/src/createScaffoldMiddleware.js");

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/node_modules/pify/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/node_modules/pify/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const processFn = (fn, options, proxy, unwrapped) => function (...arguments_) {
  const P = options.promiseModule;
  return new P((resolve, reject) => {
    if (options.multiArgs) {
      arguments_.push((...result) => {
        if (options.errorFirst) {
          if (result[0]) {
            reject(result);
          } else {
            result.shift();
            resolve(result);
          }
        } else {
          resolve(result);
        }
      });
    } else if (options.errorFirst) {
      arguments_.push((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    } else {
      arguments_.push(resolve);
    }

    const self = this === proxy ? unwrapped : this;
    Reflect.apply(fn, self, arguments_);
  });
};

const filterCache = new WeakMap();

module.exports = (input, options) => {
  options = {
    exclude: [/.+(?:Sync|Stream)$/],
    errorFirst: true,
    promiseModule: Promise,
    ...options
  };
  const objectType = typeof input;

  if (!(input !== null && (objectType === 'object' || objectType === 'function'))) {
    throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? 'null' : objectType}\``);
  }

  const filter = (target, key) => {
    let cached = filterCache.get(target);

    if (!cached) {
      cached = {};
      filterCache.set(target, cached);
    }

    if (key in cached) {
      return cached[key];
    }

    const match = pattern => typeof pattern === 'string' || typeof key === 'symbol' ? key === pattern : pattern.test(key);

    const desc = Reflect.getOwnPropertyDescriptor(target, key);
    const writableOrConfigurableOwn = desc === undefined || desc.writable || desc.configurable;
    const included = options.include ? options.include.some(match) : !options.exclude.some(match);
    const shouldFilter = included && writableOrConfigurableOwn;
    cached[key] = shouldFilter;
    return shouldFilter;
  };

  const cache = new WeakMap();
  const proxy = new Proxy(input, {
    apply(target, thisArg, args) {
      const cached = cache.get(target);

      if (cached) {
        return Reflect.apply(cached, thisArg, args);
      }

      const pified = options.excludeMain ? target : processFn(target, options, proxy, target);
      cache.set(target, pified);
      return Reflect.apply(pified, thisArg, args);
    },

    get(target, key) {
      const property = target[key]; // eslint-disable-next-line no-use-extend-native/no-use-extend-native

      if (!filter(target, key) || property === Function.prototype[key]) {
        return property;
      }

      const cached = cache.get(property);

      if (cached) {
        return cached;
      }

      if (typeof property === 'function') {
        const pified = processFn(property, options, proxy, target);
        cache.set(property, pified);
        return pified;
      }

      return property;
    }

  });
  return proxy;
};

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/subscriptionManager.js":
/*!******************************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/subscriptionManager.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const SafeEventEmitter = __webpack_require__(/*! @metamask/safe-event-emitter */ "./node_modules/@metamask/safe-event-emitter/index.js").default;

const createScaffoldMiddleware = __webpack_require__(/*! eth-json-rpc-middleware/scaffold */ "./node_modules/eth-json-rpc-filters/node_modules/eth-json-rpc-middleware/scaffold.js");

const {
  createAsyncMiddleware
} = __webpack_require__(/*! json-rpc-engine */ "./node_modules/json-rpc-engine/dist/index.js");

const createFilterMiddleware = __webpack_require__(/*! ./index.js */ "./node_modules/eth-json-rpc-filters/index.js");

const {
  unsafeRandomBytes,
  incrementHexInt
} = __webpack_require__(/*! ./hexUtils.js */ "./node_modules/eth-json-rpc-filters/hexUtils.js");

const getBlocksForRange = __webpack_require__(/*! ./getBlocksForRange.js */ "./node_modules/eth-json-rpc-filters/getBlocksForRange.js");

module.exports = createSubscriptionMiddleware;

function createSubscriptionMiddleware({
  blockTracker,
  provider
}) {
  // state and utilities for handling subscriptions
  const subscriptions = {};
  const filterManager = createFilterMiddleware({
    blockTracker,
    provider
  }); // internal flag

  let isDestroyed = false; // create subscriptionManager api object

  const events = new SafeEventEmitter();
  const middleware = createScaffoldMiddleware({
    eth_subscribe: createAsyncMiddleware(subscribe),
    eth_unsubscribe: createAsyncMiddleware(unsubscribe)
  });
  middleware.destroy = destroy;
  return {
    events,
    middleware
  };

  async function subscribe(req, res) {
    if (isDestroyed) throw new Error('SubscriptionManager - attempting to use after destroying');
    const subscriptionType = req.params[0]; // subId is 16 byte hex string

    const subId = unsafeRandomBytes(16); // create sub

    let sub;

    switch (subscriptionType) {
      case 'newHeads':
        sub = createSubNewHeads({
          subId
        });
        break;

      case 'logs':
        const filterParams = req.params[1];
        const filter = await filterManager.newLogFilter(filterParams);
        sub = createSubFromFilter({
          subId,
          filter
        });
        break;

      default:
        throw new Error(`SubscriptionManager - unsupported subscription type "${subscriptionType}"`);
    }

    subscriptions[subId] = sub;
    res.result = subId;
    return;

    function createSubNewHeads({
      subId
    }) {
      const sub = {
        type: subscriptionType,
        destroy: async () => {
          blockTracker.removeListener('sync', sub.update);
        },
        update: async ({
          oldBlock,
          newBlock
        }) => {
          // for newHeads
          const toBlock = newBlock;
          const fromBlock = incrementHexInt(oldBlock);
          const rawBlocks = await getBlocksForRange({
            provider,
            fromBlock,
            toBlock
          });
          const results = rawBlocks.map(normalizeBlock);
          results.forEach(value => {
            _emitSubscriptionResult(subId, value);
          });
        }
      }; // check for subscription updates on new block

      blockTracker.on('sync', sub.update);
      return sub;
    }

    function createSubFromFilter({
      subId,
      filter
    }) {
      filter.on('update', result => _emitSubscriptionResult(subId, result));
      const sub = {
        type: subscriptionType,
        destroy: async () => {
          return await filterManager.uninstallFilter(filter.idHex);
        }
      };
      return sub;
    }
  }

  async function unsubscribe(req, res) {
    if (isDestroyed) throw new Error('SubscriptionManager - attempting to use after destroying');
    const id = req.params[0];
    const subscription = subscriptions[id]; // if missing, return "false" to indicate it was not removed

    if (!subscription) {
      res.result = false;
      return;
    } // cleanup subscription


    delete subscriptions[id];
    await subscription.destroy();
    res.result = true;
  }

  function _emitSubscriptionResult(filterIdHex, value) {
    events.emit('notification', {
      jsonrpc: '2.0',
      method: 'eth_subscription',
      params: {
        subscription: filterIdHex,
        result: value
      }
    });
  }

  function destroy() {
    events.removeAllListeners();

    for (const id in subscriptions) {
      subscriptions[id].destroy();
      delete subscriptions[id];
    }

    isDestroyed = true;
  }
}

function normalizeBlock(block) {
  return {
    hash: block.hash,
    parentHash: block.parentHash,
    sha3Uncles: block.sha3Uncles,
    miner: block.miner,
    stateRoot: block.stateRoot,
    transactionsRoot: block.transactionsRoot,
    receiptsRoot: block.receiptsRoot,
    logsBloom: block.logsBloom,
    difficulty: block.difficulty,
    number: block.number,
    gasLimit: block.gasLimit,
    gasUsed: block.gasUsed,
    nonce: block.nonce,
    mixHash: block.mixHash,
    timestamp: block.timestamp,
    extraData: block.extraData
  };
}

/***/ }),

/***/ "./node_modules/eth-json-rpc-filters/tx-filter.js":
/*!********************************************************!*\
  !*** ./node_modules/eth-json-rpc-filters/tx-filter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const BaseFilter = __webpack_require__(/*! ./base-filter */ "./node_modules/eth-json-rpc-filters/base-filter.js");

const getBlocksForRange = __webpack_require__(/*! ./getBlocksForRange */ "./node_modules/eth-json-rpc-filters/getBlocksForRange.js");

const {
  incrementHexInt
} = __webpack_require__(/*! ./hexUtils */ "./node_modules/eth-json-rpc-filters/hexUtils.js");

class TxFilter extends BaseFilter {
  constructor({
    provider
  }) {
    super();
    this.type = 'tx';
    this.provider = provider;
  }

  async update({
    oldBlock
  }) {
    const toBlock = oldBlock;
    const fromBlock = incrementHexInt(oldBlock);
    const blocks = await getBlocksForRange({
      provider: this.provider,
      fromBlock,
      toBlock
    });
    const blockTxHashes = [];

    for (const block of blocks) {
      blockTxHashes.push(...block.transactions);
    } // add to results


    this.addResults(blockTxHashes);
  }

}

module.exports = TxFilter;

/***/ }),

/***/ "./node_modules/fast-safe-stringify/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fast-safe-stringify/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = stringify;
stringify.default = stringify;
stringify.stable = deterministicStringify;
stringify.stableStringify = deterministicStringify;
var arr = [];
var replacerStack = []; // Regular stringify

function stringify(obj, replacer, spacer) {
  decirc(obj, '', [], undefined);
  var res;

  if (replacerStack.length === 0) {
    res = JSON.stringify(obj, replacer, spacer);
  } else {
    res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
  }

  while (arr.length !== 0) {
    var part = arr.pop();

    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3]);
    } else {
      part[0][part[1]] = part[2];
    }
  }

  return res;
}

function decirc(val, k, stack, parent) {
  var i;

  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);

        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, {
              value: '[Circular]'
            });
            arr.push([parent, k, val, propertyDescriptor]);
          } else {
            replacerStack.push([val, k]);
          }
        } else {
          parent[k] = '[Circular]';
          arr.push([parent, k, val]);
        }

        return;
      }
    }

    stack.push(val); // Optimize for Arrays. Big arrays could kill the performance otherwise!

    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, stack, val);
      }
    } else {
      var keys = Object.keys(val);

      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        decirc(val[key], key, stack, val);
      }
    }

    stack.pop();
  }
} // Stable-stringify


function compareFunction(a, b) {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

function deterministicStringify(obj, replacer, spacer) {
  var tmp = deterministicDecirc(obj, '', [], undefined) || obj;
  var res;

  if (replacerStack.length === 0) {
    res = JSON.stringify(tmp, replacer, spacer);
  } else {
    res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
  }

  while (arr.length !== 0) {
    var part = arr.pop();

    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3]);
    } else {
      part[0][part[1]] = part[2];
    }
  }

  return res;
}

function deterministicDecirc(val, k, stack, parent) {
  var i;

  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);

        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, {
              value: '[Circular]'
            });
            arr.push([parent, k, val, propertyDescriptor]);
          } else {
            replacerStack.push([val, k]);
          }
        } else {
          parent[k] = '[Circular]';
          arr.push([parent, k, val]);
        }

        return;
      }
    }

    if (typeof val.toJSON === 'function') {
      return;
    }

    stack.push(val); // Optimize for Arrays. Big arrays could kill the performance otherwise!

    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, stack, val);
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {};
      var keys = Object.keys(val).sort(compareFunction);

      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        deterministicDecirc(val[key], key, stack, val);
        tmp[key] = val[key];
      }

      if (parent !== undefined) {
        arr.push([parent, k, val]);
        parent[k] = tmp;
      } else {
        return tmp;
      }
    }

    stack.pop();
  }
} // wraps replacer function to handle values we couldn't replace
// and mark them as [Circular]


function replaceGetterValues(replacer) {
  replacer = replacer !== undefined ? replacer : function (k, v) {
    return v;
  };
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i];

        if (part[1] === key && part[0] === val) {
          val = '[Circular]';
          replacerStack.splice(i, 1);
          break;
        }
      }
    }

    return replacer.call(this, key, val);
  };
}

/***/ }),

/***/ "./node_modules/json-rpc-engine/dist/JsonRpcEngine.js":
/*!************************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/JsonRpcEngine.js ***!
  \************************************************************/
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
exports.JsonRpcEngine = void 0;

const safe_event_emitter_1 = __importDefault(__webpack_require__(/*! @metamask/safe-event-emitter */ "./node_modules/@metamask/safe-event-emitter/index.js"));

const eth_rpc_errors_1 = __webpack_require__(/*! eth-rpc-errors */ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/index.js");
/**
 * A JSON-RPC request and response processor.
 * Give it a stack of middleware, pass it requests, and get back responses.
 */


class JsonRpcEngine extends safe_event_emitter_1.default {
  constructor() {
    super();
    this._middleware = [];
  }
  /**
   * Add a middleware function to the engine's middleware stack.
   *
   * @param middleware - The middleware function to add.
   */


  push(middleware) {
    this._middleware.push(middleware);
  }

  handle(req, cb) {
    if (cb && typeof cb !== 'function') {
      throw new Error('"callback" must be a function if provided.');
    }

    if (Array.isArray(req)) {
      if (cb) {
        return this._handleBatch(req, cb);
      }

      return this._handleBatch(req);
    }

    if (cb) {
      return this._handle(req, cb);
    }

    return this._promiseHandle(req);
  }
  /**
   * Returns this engine as a middleware function that can be pushed to other
   * engines.
   *
   * @returns This engine as a middleware function.
   */


  asMiddleware() {
    return async (req, res, next, end) => {
      try {
        const [middlewareError, isComplete, returnHandlers] = await JsonRpcEngine._runAllMiddleware(req, res, this._middleware);

        if (isComplete) {
          await JsonRpcEngine._runReturnHandlers(returnHandlers);
          return end(middlewareError);
        }

        return next(async handlerCallback => {
          try {
            await JsonRpcEngine._runReturnHandlers(returnHandlers);
          } catch (error) {
            return handlerCallback(error);
          }

          return handlerCallback();
        });
      } catch (error) {
        return end(error);
      }
    };
  }

  async _handleBatch(reqs, cb) {
    // The order here is important
    try {
      // 2. Wait for all requests to finish, or throw on some kind of fatal
      // error
      const responses = await Promise.all( // 1. Begin executing each request in the order received
      reqs.map(this._promiseHandle.bind(this))); // 3. Return batch response

      if (cb) {
        return cb(null, responses);
      }

      return responses;
    } catch (error) {
      if (cb) {
        return cb(error);
      }

      throw error;
    }
  }
  /**
   * A promise-wrapped _handle.
   */


  _promiseHandle(req) {
    return new Promise(resolve => {
      this._handle(req, (_err, res) => {
        // There will always be a response, and it will always have any error
        // that is caught and propagated.
        resolve(res);
      });
    });
  }
  /**
   * Ensures that the request object is valid, processes it, and passes any
   * error and the response object to the given callback.
   *
   * Does not reject.
   */


  async _handle(callerReq, cb) {
    if (!callerReq || Array.isArray(callerReq) || typeof callerReq !== 'object') {
      const error = new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.invalidRequest, `Requests must be plain objects. Received: ${typeof callerReq}`, {
        request: callerReq
      });
      return cb(error, {
        id: undefined,
        jsonrpc: '2.0',
        error
      });
    }

    if (typeof callerReq.method !== 'string') {
      const error = new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.invalidRequest, `Must specify a string method. Received: ${typeof callerReq.method}`, {
        request: callerReq
      });
      return cb(error, {
        id: callerReq.id,
        jsonrpc: '2.0',
        error
      });
    }

    const req = Object.assign({}, callerReq);
    const res = {
      id: req.id,
      jsonrpc: req.jsonrpc
    };
    let error = null;

    try {
      await this._processRequest(req, res);
    } catch (_error) {
      // A request handler error, a re-thrown middleware error, or something
      // unexpected.
      error = _error;
    }

    if (error) {
      // Ensure no result is present on an errored response
      delete res.result;

      if (!res.error) {
        res.error = eth_rpc_errors_1.serializeError(error);
      }
    }

    return cb(error, res);
  }
  /**
   * For the given request and response, runs all middleware and their return
   * handlers, if any, and ensures that internal request processing semantics
   * are satisfied.
   */


  async _processRequest(req, res) {
    const [error, isComplete, returnHandlers] = await JsonRpcEngine._runAllMiddleware(req, res, this._middleware); // Throw if "end" was not called, or if the response has neither a result
    // nor an error.

    JsonRpcEngine._checkForCompletion(req, res, isComplete); // The return handlers should run even if an error was encountered during
    // middleware processing.


    await JsonRpcEngine._runReturnHandlers(returnHandlers); // Now we re-throw the middleware processing error, if any, to catch it
    // further up the call chain.

    if (error) {
      throw error;
    }
  }
  /**
   * Serially executes the given stack of middleware.
   *
   * @returns An array of any error encountered during middleware execution,
   * a boolean indicating whether the request was completed, and an array of
   * middleware-defined return handlers.
   */


  static async _runAllMiddleware(req, res, middlewareStack) {
    const returnHandlers = [];
    let error = null;
    let isComplete = false; // Go down stack of middleware, call and collect optional returnHandlers

    for (const middleware of middlewareStack) {
      [error, isComplete] = await JsonRpcEngine._runMiddleware(req, res, middleware, returnHandlers);

      if (isComplete) {
        break;
      }
    }

    return [error, isComplete, returnHandlers.reverse()];
  }
  /**
   * Runs an individual middleware.
   *
   * @returns An array of any error encountered during middleware exection,
   * and a boolean indicating whether the request should end.
   */


  static _runMiddleware(req, res, middleware, returnHandlers) {
    return new Promise(resolve => {
      const end = err => {
        const error = err || res.error;

        if (error) {
          res.error = eth_rpc_errors_1.serializeError(error);
        } // True indicates that the request should end


        resolve([error, true]);
      };

      const next = returnHandler => {
        if (res.error) {
          end(res.error);
        } else {
          if (returnHandler) {
            if (typeof returnHandler !== 'function') {
              end(new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: "next" return handlers must be functions. ` + `Received "${typeof returnHandler}" for request:\n${jsonify(req)}`, {
                request: req
              }));
            }

            returnHandlers.push(returnHandler);
          } // False indicates that the request should not end


          resolve([null, false]);
        }
      };

      try {
        middleware(req, res, next, end);
      } catch (error) {
        end(error);
      }
    });
  }
  /**
   * Serially executes array of return handlers. The request and response are
   * assumed to be in their scope.
   */


  static async _runReturnHandlers(handlers) {
    for (const handler of handlers) {
      await new Promise((resolve, reject) => {
        handler(err => err ? reject(err) : resolve());
      });
    }
  }
  /**
   * Throws an error if the response has neither a result nor an error, or if
   * the "isComplete" flag is falsy.
   */


  static _checkForCompletion(req, res, isComplete) {
    if (!('result' in res) && !('error' in res)) {
      throw new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: Response has no error or result for request:\n${jsonify(req)}`, {
        request: req
      });
    }

    if (!isComplete) {
      throw new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: Nothing ended request:\n${jsonify(req)}`, {
        request: req
      });
    }
  }

}

exports.JsonRpcEngine = JsonRpcEngine;

function jsonify(request) {
  return JSON.stringify(request, null, 2);
}

/***/ }),

/***/ "./node_modules/json-rpc-engine/dist/createAsyncMiddleware.js":
/*!********************************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/createAsyncMiddleware.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAsyncMiddleware = void 0;
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

function createAsyncMiddleware(asyncMiddleware) {
  return async (req, res, next, end) => {
    // nextPromise is the key to the implementation
    // it is resolved by the return handler passed to the
    // "next" function
    let resolveNextPromise;
    const nextPromise = new Promise(resolve => {
      resolveNextPromise = resolve;
    });
    let returnHandlerCallback = null;
    let nextWasCalled = false; // This will be called by the consumer's async middleware.

    const asyncNext = async () => {
      nextWasCalled = true; // We pass a return handler to next(). When it is called by the engine,
      // the consumer's async middleware will resume executing.
      // eslint-disable-next-line node/callback-return

      next(runReturnHandlersCallback => {
        // This callback comes from JsonRpcEngine._runReturnHandlers
        returnHandlerCallback = runReturnHandlersCallback;
        resolveNextPromise();
      });
      await nextPromise;
    };

    try {
      await asyncMiddleware(req, res, asyncNext);

      if (nextWasCalled) {
        await nextPromise; // we must wait until the return handler is called

        returnHandlerCallback(null);
      } else {
        end(null);
      }
    } catch (error) {
      if (returnHandlerCallback) {
        returnHandlerCallback(error);
      } else {
        end(error);
      }
    }
  };
}

exports.createAsyncMiddleware = createAsyncMiddleware;

/***/ }),

/***/ "./node_modules/json-rpc-engine/dist/createScaffoldMiddleware.js":
/*!***********************************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/createScaffoldMiddleware.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScaffoldMiddleware = void 0;

function createScaffoldMiddleware(handlers) {
  return (req, res, next, end) => {
    const handler = handlers[req.method]; // if no handler, return

    if (handler === undefined) {
      return next();
    } // if handler is fn, call as middleware


    if (typeof handler === 'function') {
      return handler(req, res, next, end);
    } // if handler is some other value, use as result


    res.result = handler;
    return end();
  };
}

exports.createScaffoldMiddleware = createScaffoldMiddleware;

/***/ }),

/***/ "./node_modules/json-rpc-engine/dist/getUniqueId.js":
/*!**********************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/getUniqueId.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUniqueId = void 0; // uint32 (two's complement) max
// more conservative than Number.MAX_SAFE_INTEGER

const MAX = 4294967295;
let idCounter = Math.floor(Math.random() * MAX);

function getUniqueId() {
  idCounter = (idCounter + 1) % MAX;
  return idCounter;
}

exports.getUniqueId = getUniqueId;

/***/ }),

/***/ "./node_modules/json-rpc-engine/dist/idRemapMiddleware.js":
/*!****************************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/idRemapMiddleware.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIdRemapMiddleware = void 0;

const getUniqueId_1 = __webpack_require__(/*! ./getUniqueId */ "./node_modules/json-rpc-engine/dist/getUniqueId.js");

function createIdRemapMiddleware() {
  return (req, res, next, _end) => {
    const originalId = req.id;
    const newId = getUniqueId_1.getUniqueId();
    req.id = newId;
    res.id = newId;
    next(done => {
      req.id = originalId;
      res.id = originalId;
      done();
    });
  };
}

exports.createIdRemapMiddleware = createIdRemapMiddleware;

/***/ }),

/***/ "./node_modules/json-rpc-engine/dist/index.js":
/*!****************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/index.js ***!
  \****************************************************/
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
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(/*! ./idRemapMiddleware */ "./node_modules/json-rpc-engine/dist/idRemapMiddleware.js"), exports);

__exportStar(__webpack_require__(/*! ./createAsyncMiddleware */ "./node_modules/json-rpc-engine/dist/createAsyncMiddleware.js"), exports);

__exportStar(__webpack_require__(/*! ./createScaffoldMiddleware */ "./node_modules/json-rpc-engine/dist/createScaffoldMiddleware.js"), exports);

__exportStar(__webpack_require__(/*! ./getUniqueId */ "./node_modules/json-rpc-engine/dist/getUniqueId.js"), exports);

__exportStar(__webpack_require__(/*! ./JsonRpcEngine */ "./node_modules/json-rpc-engine/dist/JsonRpcEngine.js"), exports);

__exportStar(__webpack_require__(/*! ./mergeMiddleware */ "./node_modules/json-rpc-engine/dist/mergeMiddleware.js"), exports);

/***/ }),

/***/ "./node_modules/json-rpc-engine/dist/mergeMiddleware.js":
/*!**************************************************************!*\
  !*** ./node_modules/json-rpc-engine/dist/mergeMiddleware.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeMiddleware = void 0;

const JsonRpcEngine_1 = __webpack_require__(/*! ./JsonRpcEngine */ "./node_modules/json-rpc-engine/dist/JsonRpcEngine.js");

function mergeMiddleware(middlewareStack) {
  const engine = new JsonRpcEngine_1.JsonRpcEngine();
  middlewareStack.forEach(middleware => engine.push(middleware));
  return engine.asMiddleware();
}

exports.mergeMiddleware = mergeMiddleware;

/***/ }),

/***/ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/classes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/classes.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EthereumProviderError = exports.EthereumRpcError = void 0;

const fast_safe_stringify_1 = __webpack_require__(/*! fast-safe-stringify */ "./node_modules/fast-safe-stringify/index.js");
/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors
 * per EIP-1474.
 * Permits any integer error code.
 */


class EthereumRpcError extends Error {
  constructor(code, message, data) {
    if (!Number.isInteger(code)) {
      throw new Error('"code" must be an integer.');
    }

    if (!message || typeof message !== 'string') {
      throw new Error('"message" must be a nonempty string.');
    }

    super(message);
    this.code = code;

    if (data !== undefined) {
      this.data = data;
    }
  }
  /**
   * Returns a plain object with all public class properties.
   */


  serialize() {
    const serialized = {
      code: this.code,
      message: this.message
    };

    if (this.data !== undefined) {
      serialized.data = this.data;
    }

    if (this.stack) {
      serialized.stack = this.stack;
    }

    return serialized;
  }
  /**
   * Return a string representation of the serialized error, omitting
   * any circular references.
   */


  toString() {
    return fast_safe_stringify_1.default(this.serialize(), stringifyReplacer, 2);
  }

}

exports.EthereumRpcError = EthereumRpcError;
/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * Permits integer error codes in the [ 1000 <= 4999 ] range.
 */

class EthereumProviderError extends EthereumRpcError {
  /**
   * Create an Ethereum Provider JSON-RPC error.
   * `code` must be an integer in the 1000 <= 4999 range.
   */
  constructor(code, message, data) {
    if (!isValidEthProviderCode(code)) {
      throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
    }

    super(code, message, data);
  }

}

exports.EthereumProviderError = EthereumProviderError; // Internal

function isValidEthProviderCode(code) {
  return Number.isInteger(code) && code >= 1000 && code <= 4999;
}

function stringifyReplacer(_, value) {
  if (value === '[Circular]') {
    return undefined;
  }

  return value;
}

/***/ }),

/***/ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/error-constants.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/error-constants.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorValues = exports.errorCodes = void 0;
exports.errorCodes = {
  rpc: {
    invalidInput: -32000,
    resourceNotFound: -32001,
    resourceUnavailable: -32002,
    transactionRejected: -32003,
    methodNotSupported: -32004,
    limitExceeded: -32005,
    parse: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internal: -32603
  },
  provider: {
    userRejectedRequest: 4001,
    unauthorized: 4100,
    unsupportedMethod: 4200,
    disconnected: 4900,
    chainDisconnected: 4901
  }
};
exports.errorValues = {
  '-32700': {
    standard: 'JSON RPC 2.0',
    message: 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.'
  },
  '-32600': {
    standard: 'JSON RPC 2.0',
    message: 'The JSON sent is not a valid Request object.'
  },
  '-32601': {
    standard: 'JSON RPC 2.0',
    message: 'The method does not exist / is not available.'
  },
  '-32602': {
    standard: 'JSON RPC 2.0',
    message: 'Invalid method parameter(s).'
  },
  '-32603': {
    standard: 'JSON RPC 2.0',
    message: 'Internal JSON-RPC error.'
  },
  '-32000': {
    standard: 'EIP-1474',
    message: 'Invalid input.'
  },
  '-32001': {
    standard: 'EIP-1474',
    message: 'Resource not found.'
  },
  '-32002': {
    standard: 'EIP-1474',
    message: 'Resource unavailable.'
  },
  '-32003': {
    standard: 'EIP-1474',
    message: 'Transaction rejected.'
  },
  '-32004': {
    standard: 'EIP-1474',
    message: 'Method not supported.'
  },
  '-32005': {
    standard: 'EIP-1474',
    message: 'Request limit exceeded.'
  },
  '4001': {
    standard: 'EIP-1193',
    message: 'User rejected the request.'
  },
  '4100': {
    standard: 'EIP-1193',
    message: 'The requested account and/or method has not been authorized by the user.'
  },
  '4200': {
    standard: 'EIP-1193',
    message: 'The requested method is not supported by this Ethereum provider.'
  },
  '4900': {
    standard: 'EIP-1193',
    message: 'The provider is disconnected from all chains.'
  },
  '4901': {
    standard: 'EIP-1193',
    message: 'The provider is disconnected from the specified chain.'
  }
};

/***/ }),

/***/ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/errors.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/errors.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ethErrors = void 0;

const classes_1 = __webpack_require__(/*! ./classes */ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/classes.js");

const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/utils.js");

const error_constants_1 = __webpack_require__(/*! ./error-constants */ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/error-constants.js");

exports.ethErrors = {
  rpc: {
    /**
     * Get a JSON RPC 2.0 Parse (-32700) error.
     */
    parse: arg => getEthJsonRpcError(error_constants_1.errorCodes.rpc.parse, arg),

    /**
     * Get a JSON RPC 2.0 Invalid Request (-32600) error.
     */
    invalidRequest: arg => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidRequest, arg),

    /**
     * Get a JSON RPC 2.0 Invalid Params (-32602) error.
     */
    invalidParams: arg => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidParams, arg),

    /**
     * Get a JSON RPC 2.0 Method Not Found (-32601) error.
     */
    methodNotFound: arg => getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotFound, arg),

    /**
     * Get a JSON RPC 2.0 Internal (-32603) error.
     */
    internal: arg => getEthJsonRpcError(error_constants_1.errorCodes.rpc.internal, arg),

    /**
     * Get a JSON RPC 2.0 Server error.
     * Permits integer error codes in the [ -32099 <= -32005 ] range.
     * Codes -32000 through -32004 are reserved by EIP-1474.
     */
    server: opts => {
      if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
        throw new Error('Ethereum RPC Server errors must provide single object argument.');
      }

      const {
        code
      } = opts;

      if (!Number.isInteger(code) || code > -32005 || code < -32099) {
        throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
      }

      return getEthJsonRpcError(code, opts);
    },

    /**
     * Get an Ethereum JSON RPC Invalid Input (-32000) error.
     */
    invalidInput: arg => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidInput, arg),

    /**
     * Get an Ethereum JSON RPC Resource Not Found (-32001) error.
     */
    resourceNotFound: arg => getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceNotFound, arg),

    /**
     * Get an Ethereum JSON RPC Resource Unavailable (-32002) error.
     */
    resourceUnavailable: arg => getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceUnavailable, arg),

    /**
     * Get an Ethereum JSON RPC Transaction Rejected (-32003) error.
     */
    transactionRejected: arg => getEthJsonRpcError(error_constants_1.errorCodes.rpc.transactionRejected, arg),

    /**
     * Get an Ethereum JSON RPC Method Not Supported (-32004) error.
     */
    methodNotSupported: arg => getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotSupported, arg),

    /**
     * Get an Ethereum JSON RPC Limit Exceeded (-32005) error.
     */
    limitExceeded: arg => getEthJsonRpcError(error_constants_1.errorCodes.rpc.limitExceeded, arg)
  },
  provider: {
    /**
     * Get an Ethereum Provider User Rejected Request (4001) error.
     */
    userRejectedRequest: arg => {
      return getEthProviderError(error_constants_1.errorCodes.provider.userRejectedRequest, arg);
    },

    /**
     * Get an Ethereum Provider Unauthorized (4100) error.
     */
    unauthorized: arg => {
      return getEthProviderError(error_constants_1.errorCodes.provider.unauthorized, arg);
    },

    /**
     * Get an Ethereum Provider Unsupported Method (4200) error.
     */
    unsupportedMethod: arg => {
      return getEthProviderError(error_constants_1.errorCodes.provider.unsupportedMethod, arg);
    },

    /**
     * Get an Ethereum Provider Not Connected (4900) error.
     */
    disconnected: arg => {
      return getEthProviderError(error_constants_1.errorCodes.provider.disconnected, arg);
    },

    /**
     * Get an Ethereum Provider Chain Not Connected (4901) error.
     */
    chainDisconnected: arg => {
      return getEthProviderError(error_constants_1.errorCodes.provider.chainDisconnected, arg);
    },

    /**
     * Get a custom Ethereum Provider error.
     */
    custom: opts => {
      if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
        throw new Error('Ethereum Provider custom errors must provide single object argument.');
      }

      const {
        code,
        message,
        data
      } = opts;

      if (!message || typeof message !== 'string') {
        throw new Error('"message" must be a nonempty string');
      }

      return new classes_1.EthereumProviderError(code, message, data);
    }
  }
}; // Internal

function getEthJsonRpcError(code, arg) {
  const [message, data] = parseOpts(arg);
  return new classes_1.EthereumRpcError(code, message || utils_1.getMessageFromCode(code), data);
}

function getEthProviderError(code, arg) {
  const [message, data] = parseOpts(arg);
  return new classes_1.EthereumProviderError(code, message || utils_1.getMessageFromCode(code), data);
}

function parseOpts(arg) {
  if (arg) {
    if (typeof arg === 'string') {
      return [arg];
    } else if (typeof arg === 'object' && !Array.isArray(arg)) {
      const {
        message,
        data
      } = arg;

      if (message && typeof message !== 'string') {
        throw new Error('Must specify string message.');
      }

      return [message || undefined, data];
    }
  }

  return [];
}

/***/ }),

/***/ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessageFromCode = exports.serializeError = exports.EthereumProviderError = exports.EthereumRpcError = exports.ethErrors = exports.errorCodes = void 0;

const classes_1 = __webpack_require__(/*! ./classes */ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/classes.js");

Object.defineProperty(exports, "EthereumRpcError", {
  enumerable: true,
  get: function () {
    return classes_1.EthereumRpcError;
  }
});
Object.defineProperty(exports, "EthereumProviderError", {
  enumerable: true,
  get: function () {
    return classes_1.EthereumProviderError;
  }
});

const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/utils.js");

Object.defineProperty(exports, "serializeError", {
  enumerable: true,
  get: function () {
    return utils_1.serializeError;
  }
});
Object.defineProperty(exports, "getMessageFromCode", {
  enumerable: true,
  get: function () {
    return utils_1.getMessageFromCode;
  }
});

const errors_1 = __webpack_require__(/*! ./errors */ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/errors.js");

Object.defineProperty(exports, "ethErrors", {
  enumerable: true,
  get: function () {
    return errors_1.ethErrors;
  }
});

const error_constants_1 = __webpack_require__(/*! ./error-constants */ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/error-constants.js");

Object.defineProperty(exports, "errorCodes", {
  enumerable: true,
  get: function () {
    return error_constants_1.errorCodes;
  }
});

/***/ }),

/***/ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/utils.js":
/*!********************************************************************************!*\
  !*** ./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/utils.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeError = exports.isValidCode = exports.getMessageFromCode = exports.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;

const error_constants_1 = __webpack_require__(/*! ./error-constants */ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/error-constants.js");

const classes_1 = __webpack_require__(/*! ./classes */ "./node_modules/json-rpc-engine/node_modules/eth-rpc-errors/dist/classes.js");

const FALLBACK_ERROR_CODE = error_constants_1.errorCodes.rpc.internal;
const FALLBACK_MESSAGE = 'Unspecified error message. This is a bug, please report it.';
const FALLBACK_ERROR = {
  code: FALLBACK_ERROR_CODE,
  message: getMessageFromCode(FALLBACK_ERROR_CODE)
};
exports.JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.';
/**
 * Gets the message for a given code, or a fallback message if the code has
 * no corresponding message.
 */

function getMessageFromCode(code, fallbackMessage = FALLBACK_MESSAGE) {
  if (Number.isInteger(code)) {
    const codeString = code.toString();

    if (hasKey(error_constants_1.errorValues, codeString)) {
      return error_constants_1.errorValues[codeString].message;
    }

    if (isJsonRpcServerError(code)) {
      return exports.JSON_RPC_SERVER_ERROR_MESSAGE;
    }
  }

  return fallbackMessage;
}

exports.getMessageFromCode = getMessageFromCode;
/**
 * Returns whether the given code is valid.
 * A code is only valid if it has a message.
 */

function isValidCode(code) {
  if (!Number.isInteger(code)) {
    return false;
  }

  const codeString = code.toString();

  if (error_constants_1.errorValues[codeString]) {
    return true;
  }

  if (isJsonRpcServerError(code)) {
    return true;
  }

  return false;
}

exports.isValidCode = isValidCode;
/**
 * Serializes the given error to an Ethereum JSON RPC-compatible error object.
 * Merely copies the given error's values if it is already compatible.
 * If the given error is not fully compatible, it will be preserved on the
 * returned object's data.originalError property.
 */

function serializeError(error, {
  fallbackError = FALLBACK_ERROR,
  shouldIncludeStack = false
} = {}) {
  var _a, _b;

  if (!fallbackError || !Number.isInteger(fallbackError.code) || typeof fallbackError.message !== 'string') {
    throw new Error('Must provide fallback error with integer number code and string message.');
  }

  if (error instanceof classes_1.EthereumRpcError) {
    return error.serialize();
  }

  const serialized = {};

  if (error && typeof error === 'object' && !Array.isArray(error) && hasKey(error, 'code') && isValidCode(error.code)) {
    const _error = error;
    serialized.code = _error.code;

    if (_error.message && typeof _error.message === 'string') {
      serialized.message = _error.message;

      if (hasKey(_error, 'data')) {
        serialized.data = _error.data;
      }
    } else {
      serialized.message = getMessageFromCode(serialized.code);
      serialized.data = {
        originalError: assignOriginalError(error)
      };
    }
  } else {
    serialized.code = fallbackError.code;
    const message = (_a = error) === null || _a === void 0 ? void 0 : _a.message;
    serialized.message = message && typeof message === 'string' ? message : fallbackError.message;
    serialized.data = {
      originalError: assignOriginalError(error)
    };
  }

  const stack = (_b = error) === null || _b === void 0 ? void 0 : _b.stack;

  if (shouldIncludeStack && error && stack && typeof stack === 'string') {
    serialized.stack = stack;
  }

  return serialized;
}

exports.serializeError = serializeError; // Internal

function isJsonRpcServerError(code) {
  return code >= -32099 && code <= -32000;
}

function assignOriginalError(error) {
  if (error && typeof error === 'object' && !Array.isArray(error)) {
    return Object.assign({}, error);
  }

  return error;
}

function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/***/ }),

/***/ "./node_modules/safe-event-emitter/index.js":
/*!**************************************************!*\
  !*** ./node_modules/safe-event-emitter/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const util = __webpack_require__(/*! util */ "./node_modules/util/util.js");

const EventEmitter = __webpack_require__(/*! events/ */ "./node_modules/events/events.js");

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
module.exports = SafeEventEmitter;

function SafeEventEmitter() {
  EventEmitter.call(this);
}

util.inherits(SafeEventEmitter, EventEmitter);

SafeEventEmitter.prototype.emit = function (type) {
  // copied from https://github.com/Gozala/events/blob/master/events.js
  // modified lines are commented with "edited:"
  var args = [];

  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);

  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

  if (doError) {
    var er;
    if (args.length > 0) er = args[0];

    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    } // At least give some kind of context to the user


    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    // edited: using safeApply
    safeApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) // edited: using safeApply
    safeApply(listeners[i], this, args);
  }

  return true;
};

function safeApply(handler, context, args) {
  try {
    ReflectApply(handler, context, args);
  } catch (err) {
    // throw error after timeout so as not to interupt the stack
    setTimeout(() => {
      throw err;
    });
  }
}

function arrayClone(arr, n) {
  var copy = new Array(n);

  for (var i = 0; i < n; ++i) copy[i] = arr[i];

  return copy;
}

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
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
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
var __createBinding = Object.create ? function (o, m, k, k2) {
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
};
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
/** @deprecated */

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
/** @deprecated */

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}
function __spreadArray(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

  return to;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}
;

var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}

/***/ })

}]);
//# sourceMappingURL=0.chunk.js.map