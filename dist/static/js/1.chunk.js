(this["webpackJsonpstaking"] = this["webpackJsonpstaking"] || []).push([[1],{

/***/ "./node_modules/bind-decorator/index.js":
/*!**********************************************!*\
  !*** ./node_modules/bind-decorator/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var constants;

(function (constants) {
  constants.typeOfFunction = 'function';
  constants.boolTrue = true;
})(constants || (constants = {}));

function bind(target, propertyKey, descriptor) {
  if (!descriptor || typeof descriptor.value !== constants.typeOfFunction) {
    throw new TypeError("Only methods can be decorated with @bind. <" + propertyKey + "> is not a method!");
  }

  return {
    configurable: constants.boolTrue,
    get: function () {
      var bound = descriptor.value.bind(this); // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.

      Object.defineProperty(this, propertyKey, {
        value: bound,
        configurable: constants.boolTrue,
        writable: constants.boolTrue
      });
      return bound;
    }
  };
}

exports.bind = bind;
exports.default = bind;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/index.js":
/*!******************************************!*\
  !*** ./node_modules/rxjs/_esm5/index.js ***!
  \******************************************/
/*! exports provided: Observable, ConnectableObservable, GroupedObservable, observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, asap, asapScheduler, async, asyncScheduler, queue, queueScheduler, animationFrame, animationFrameScheduler, VirtualTimeScheduler, VirtualAction, Scheduler, Subscription, Subscriber, Notification, NotificationKind, pipe, noop, identity, isObservable, ArgumentOutOfRangeError, EmptyError, ObjectUnsubscribedError, UnsubscriptionError, TimeoutError, bindCallback, bindNodeCallback, combineLatest, concat, defer, empty, forkJoin, from, fromEvent, fromEventPattern, generate, iif, interval, merge, never, of, onErrorResumeNext, pairs, partition, race, range, throwError, timer, using, zip, scheduled, EMPTY, NEVER, config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return _internal_Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"]; });

/* harmony import */ var _internal_observable_ConnectableObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/observable/ConnectableObservable */ "./node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConnectableObservable", function() { return _internal_observable_ConnectableObservable__WEBPACK_IMPORTED_MODULE_1__["ConnectableObservable"]; });

/* harmony import */ var _internal_operators_groupBy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/operators/groupBy */ "./node_modules/rxjs/_esm5/internal/operators/groupBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupedObservable", function() { return _internal_operators_groupBy__WEBPACK_IMPORTED_MODULE_2__["GroupedObservable"]; });

/* harmony import */ var _internal_symbol_observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/symbol/observable */ "./node_modules/rxjs/_esm5/internal/symbol/observable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "observable", function() { return _internal_symbol_observable__WEBPACK_IMPORTED_MODULE_3__["observable"]; });

/* harmony import */ var _internal_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return _internal_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]; });

/* harmony import */ var _internal_BehaviorSubject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/BehaviorSubject */ "./node_modules/rxjs/_esm5/internal/BehaviorSubject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BehaviorSubject", function() { return _internal_BehaviorSubject__WEBPACK_IMPORTED_MODULE_5__["BehaviorSubject"]; });

/* harmony import */ var _internal_ReplaySubject__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internal/ReplaySubject */ "./node_modules/rxjs/_esm5/internal/ReplaySubject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReplaySubject", function() { return _internal_ReplaySubject__WEBPACK_IMPORTED_MODULE_6__["ReplaySubject"]; });

/* harmony import */ var _internal_AsyncSubject__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./internal/AsyncSubject */ "./node_modules/rxjs/_esm5/internal/AsyncSubject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AsyncSubject", function() { return _internal_AsyncSubject__WEBPACK_IMPORTED_MODULE_7__["AsyncSubject"]; });

/* harmony import */ var _internal_scheduler_asap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./internal/scheduler/asap */ "./node_modules/rxjs/_esm5/internal/scheduler/asap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asap", function() { return _internal_scheduler_asap__WEBPACK_IMPORTED_MODULE_8__["asap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asapScheduler", function() { return _internal_scheduler_asap__WEBPACK_IMPORTED_MODULE_8__["asapScheduler"]; });

/* harmony import */ var _internal_scheduler_async__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./internal/scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "async", function() { return _internal_scheduler_async__WEBPACK_IMPORTED_MODULE_9__["async"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return _internal_scheduler_async__WEBPACK_IMPORTED_MODULE_9__["asyncScheduler"]; });

/* harmony import */ var _internal_scheduler_queue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./internal/scheduler/queue */ "./node_modules/rxjs/_esm5/internal/scheduler/queue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queue", function() { return _internal_scheduler_queue__WEBPACK_IMPORTED_MODULE_10__["queue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueScheduler", function() { return _internal_scheduler_queue__WEBPACK_IMPORTED_MODULE_10__["queueScheduler"]; });

/* harmony import */ var _internal_scheduler_animationFrame__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./internal/scheduler/animationFrame */ "./node_modules/rxjs/_esm5/internal/scheduler/animationFrame.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrame", function() { return _internal_scheduler_animationFrame__WEBPACK_IMPORTED_MODULE_11__["animationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameScheduler", function() { return _internal_scheduler_animationFrame__WEBPACK_IMPORTED_MODULE_11__["animationFrameScheduler"]; });

/* harmony import */ var _internal_scheduler_VirtualTimeScheduler__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./internal/scheduler/VirtualTimeScheduler */ "./node_modules/rxjs/_esm5/internal/scheduler/VirtualTimeScheduler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VirtualTimeScheduler", function() { return _internal_scheduler_VirtualTimeScheduler__WEBPACK_IMPORTED_MODULE_12__["VirtualTimeScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VirtualAction", function() { return _internal_scheduler_VirtualTimeScheduler__WEBPACK_IMPORTED_MODULE_12__["VirtualAction"]; });

/* harmony import */ var _internal_Scheduler__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./internal/Scheduler */ "./node_modules/rxjs/_esm5/internal/Scheduler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scheduler", function() { return _internal_Scheduler__WEBPACK_IMPORTED_MODULE_13__["Scheduler"]; });

/* harmony import */ var _internal_Subscription__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./internal/Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subscription", function() { return _internal_Subscription__WEBPACK_IMPORTED_MODULE_14__["Subscription"]; });

/* harmony import */ var _internal_Subscriber__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./internal/Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subscriber", function() { return _internal_Subscriber__WEBPACK_IMPORTED_MODULE_15__["Subscriber"]; });

/* harmony import */ var _internal_Notification__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./internal/Notification */ "./node_modules/rxjs/_esm5/internal/Notification.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Notification", function() { return _internal_Notification__WEBPACK_IMPORTED_MODULE_16__["Notification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotificationKind", function() { return _internal_Notification__WEBPACK_IMPORTED_MODULE_16__["NotificationKind"]; });

/* harmony import */ var _internal_util_pipe__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./internal/util/pipe */ "./node_modules/rxjs/_esm5/internal/util/pipe.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return _internal_util_pipe__WEBPACK_IMPORTED_MODULE_17__["pipe"]; });

/* harmony import */ var _internal_util_noop__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./internal/util/noop */ "./node_modules/rxjs/_esm5/internal/util/noop.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return _internal_util_noop__WEBPACK_IMPORTED_MODULE_18__["noop"]; });

/* harmony import */ var _internal_util_identity__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./internal/util/identity */ "./node_modules/rxjs/_esm5/internal/util/identity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return _internal_util_identity__WEBPACK_IMPORTED_MODULE_19__["identity"]; });

/* harmony import */ var _internal_util_isObservable__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./internal/util/isObservable */ "./node_modules/rxjs/_esm5/internal/util/isObservable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isObservable", function() { return _internal_util_isObservable__WEBPACK_IMPORTED_MODULE_20__["isObservable"]; });

/* harmony import */ var _internal_util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./internal/util/ArgumentOutOfRangeError */ "./node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArgumentOutOfRangeError", function() { return _internal_util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_21__["ArgumentOutOfRangeError"]; });

/* harmony import */ var _internal_util_EmptyError__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./internal/util/EmptyError */ "./node_modules/rxjs/_esm5/internal/util/EmptyError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmptyError", function() { return _internal_util_EmptyError__WEBPACK_IMPORTED_MODULE_22__["EmptyError"]; });

/* harmony import */ var _internal_util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./internal/util/ObjectUnsubscribedError */ "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectUnsubscribedError", function() { return _internal_util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_23__["ObjectUnsubscribedError"]; });

/* harmony import */ var _internal_util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./internal/util/UnsubscriptionError */ "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnsubscriptionError", function() { return _internal_util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_24__["UnsubscriptionError"]; });

/* harmony import */ var _internal_util_TimeoutError__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./internal/util/TimeoutError */ "./node_modules/rxjs/_esm5/internal/util/TimeoutError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeoutError", function() { return _internal_util_TimeoutError__WEBPACK_IMPORTED_MODULE_25__["TimeoutError"]; });

/* harmony import */ var _internal_observable_bindCallback__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./internal/observable/bindCallback */ "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bindCallback", function() { return _internal_observable_bindCallback__WEBPACK_IMPORTED_MODULE_26__["bindCallback"]; });

/* harmony import */ var _internal_observable_bindNodeCallback__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./internal/observable/bindNodeCallback */ "./node_modules/rxjs/_esm5/internal/observable/bindNodeCallback.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bindNodeCallback", function() { return _internal_observable_bindNodeCallback__WEBPACK_IMPORTED_MODULE_27__["bindNodeCallback"]; });

/* harmony import */ var _internal_observable_combineLatest__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./internal/observable/combineLatest */ "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "combineLatest", function() { return _internal_observable_combineLatest__WEBPACK_IMPORTED_MODULE_28__["combineLatest"]; });

/* harmony import */ var _internal_observable_concat__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./internal/observable/concat */ "./node_modules/rxjs/_esm5/internal/observable/concat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return _internal_observable_concat__WEBPACK_IMPORTED_MODULE_29__["concat"]; });

/* harmony import */ var _internal_observable_defer__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./internal/observable/defer */ "./node_modules/rxjs/_esm5/internal/observable/defer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defer", function() { return _internal_observable_defer__WEBPACK_IMPORTED_MODULE_30__["defer"]; });

/* harmony import */ var _internal_observable_empty__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./internal/observable/empty */ "./node_modules/rxjs/_esm5/internal/observable/empty.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return _internal_observable_empty__WEBPACK_IMPORTED_MODULE_31__["empty"]; });

/* harmony import */ var _internal_observable_forkJoin__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./internal/observable/forkJoin */ "./node_modules/rxjs/_esm5/internal/observable/forkJoin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forkJoin", function() { return _internal_observable_forkJoin__WEBPACK_IMPORTED_MODULE_32__["forkJoin"]; });

/* harmony import */ var _internal_observable_from__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./internal/observable/from */ "./node_modules/rxjs/_esm5/internal/observable/from.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "from", function() { return _internal_observable_from__WEBPACK_IMPORTED_MODULE_33__["from"]; });

/* harmony import */ var _internal_observable_fromEvent__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./internal/observable/fromEvent */ "./node_modules/rxjs/_esm5/internal/observable/fromEvent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _internal_observable_fromEvent__WEBPACK_IMPORTED_MODULE_34__["fromEvent"]; });

/* harmony import */ var _internal_observable_fromEventPattern__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./internal/observable/fromEventPattern */ "./node_modules/rxjs/_esm5/internal/observable/fromEventPattern.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEventPattern", function() { return _internal_observable_fromEventPattern__WEBPACK_IMPORTED_MODULE_35__["fromEventPattern"]; });

/* harmony import */ var _internal_observable_generate__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./internal/observable/generate */ "./node_modules/rxjs/_esm5/internal/observable/generate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generate", function() { return _internal_observable_generate__WEBPACK_IMPORTED_MODULE_36__["generate"]; });

/* harmony import */ var _internal_observable_iif__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./internal/observable/iif */ "./node_modules/rxjs/_esm5/internal/observable/iif.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "iif", function() { return _internal_observable_iif__WEBPACK_IMPORTED_MODULE_37__["iif"]; });

/* harmony import */ var _internal_observable_interval__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./internal/observable/interval */ "./node_modules/rxjs/_esm5/internal/observable/interval.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _internal_observable_interval__WEBPACK_IMPORTED_MODULE_38__["interval"]; });

/* harmony import */ var _internal_observable_merge__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./internal/observable/merge */ "./node_modules/rxjs/_esm5/internal/observable/merge.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return _internal_observable_merge__WEBPACK_IMPORTED_MODULE_39__["merge"]; });

/* harmony import */ var _internal_observable_never__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./internal/observable/never */ "./node_modules/rxjs/_esm5/internal/observable/never.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "never", function() { return _internal_observable_never__WEBPACK_IMPORTED_MODULE_40__["never"]; });

/* harmony import */ var _internal_observable_of__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./internal/observable/of */ "./node_modules/rxjs/_esm5/internal/observable/of.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "of", function() { return _internal_observable_of__WEBPACK_IMPORTED_MODULE_41__["of"]; });

/* harmony import */ var _internal_observable_onErrorResumeNext__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./internal/observable/onErrorResumeNext */ "./node_modules/rxjs/_esm5/internal/observable/onErrorResumeNext.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onErrorResumeNext", function() { return _internal_observable_onErrorResumeNext__WEBPACK_IMPORTED_MODULE_42__["onErrorResumeNext"]; });

/* harmony import */ var _internal_observable_pairs__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./internal/observable/pairs */ "./node_modules/rxjs/_esm5/internal/observable/pairs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pairs", function() { return _internal_observable_pairs__WEBPACK_IMPORTED_MODULE_43__["pairs"]; });

/* harmony import */ var _internal_observable_partition__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./internal/observable/partition */ "./node_modules/rxjs/_esm5/internal/observable/partition.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "partition", function() { return _internal_observable_partition__WEBPACK_IMPORTED_MODULE_44__["partition"]; });

/* harmony import */ var _internal_observable_race__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./internal/observable/race */ "./node_modules/rxjs/_esm5/internal/observable/race.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "race", function() { return _internal_observable_race__WEBPACK_IMPORTED_MODULE_45__["race"]; });

/* harmony import */ var _internal_observable_range__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./internal/observable/range */ "./node_modules/rxjs/_esm5/internal/observable/range.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "range", function() { return _internal_observable_range__WEBPACK_IMPORTED_MODULE_46__["range"]; });

/* harmony import */ var _internal_observable_throwError__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./internal/observable/throwError */ "./node_modules/rxjs/_esm5/internal/observable/throwError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "throwError", function() { return _internal_observable_throwError__WEBPACK_IMPORTED_MODULE_47__["throwError"]; });

/* harmony import */ var _internal_observable_timer__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./internal/observable/timer */ "./node_modules/rxjs/_esm5/internal/observable/timer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return _internal_observable_timer__WEBPACK_IMPORTED_MODULE_48__["timer"]; });

/* harmony import */ var _internal_observable_using__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./internal/observable/using */ "./node_modules/rxjs/_esm5/internal/observable/using.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "using", function() { return _internal_observable_using__WEBPACK_IMPORTED_MODULE_49__["using"]; });

/* harmony import */ var _internal_observable_zip__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./internal/observable/zip */ "./node_modules/rxjs/_esm5/internal/observable/zip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return _internal_observable_zip__WEBPACK_IMPORTED_MODULE_50__["zip"]; });

/* harmony import */ var _internal_scheduled_scheduled__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./internal/scheduled/scheduled */ "./node_modules/rxjs/_esm5/internal/scheduled/scheduled.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scheduled", function() { return _internal_scheduled_scheduled__WEBPACK_IMPORTED_MODULE_51__["scheduled"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EMPTY", function() { return _internal_observable_empty__WEBPACK_IMPORTED_MODULE_31__["EMPTY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NEVER", function() { return _internal_observable_never__WEBPACK_IMPORTED_MODULE_40__["NEVER"]; });

/* harmony import */ var _internal_config__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./internal/config */ "./node_modules/rxjs/_esm5/internal/config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "config", function() { return _internal_config__WEBPACK_IMPORTED_MODULE_52__["config"]; });

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
























































/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/AsyncSubject.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/AsyncSubject.js ***!
  \**********************************************************/
/*! exports provided: AsyncSubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncSubject", function() { return AsyncSubject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */




var AsyncSubject = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AsyncSubject, _super);

  function AsyncSubject() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.value = null;
    _this.hasNext = false;
    _this.hasCompleted = false;
    return _this;
  }

  AsyncSubject.prototype._subscribe = function (subscriber) {
    if (this.hasError) {
      subscriber.error(this.thrownError);
      return _Subscription__WEBPACK_IMPORTED_MODULE_2__["Subscription"].EMPTY;
    } else if (this.hasCompleted && this.hasNext) {
      subscriber.next(this.value);
      subscriber.complete();
      return _Subscription__WEBPACK_IMPORTED_MODULE_2__["Subscription"].EMPTY;
    }

    return _super.prototype._subscribe.call(this, subscriber);
  };

  AsyncSubject.prototype.next = function (value) {
    if (!this.hasCompleted) {
      this.value = value;
      this.hasNext = true;
    }
  };

  AsyncSubject.prototype.error = function (error) {
    if (!this.hasCompleted) {
      _super.prototype.error.call(this, error);
    }
  };

  AsyncSubject.prototype.complete = function () {
    this.hasCompleted = true;

    if (this.hasNext) {
      _super.prototype.next.call(this, this.value);
    }

    _super.prototype.complete.call(this);
  };

  return AsyncSubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/BehaviorSubject.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/BehaviorSubject.js ***!
  \*************************************************************/
/*! exports provided: BehaviorSubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BehaviorSubject", function() { return BehaviorSubject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/ObjectUnsubscribedError */ "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js");
/** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */




var BehaviorSubject = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BehaviorSubject, _super);

  function BehaviorSubject(_value) {
    var _this = _super.call(this) || this;

    _this._value = _value;
    return _this;
  }

  Object.defineProperty(BehaviorSubject.prototype, "value", {
    get: function () {
      return this.getValue();
    },
    enumerable: true,
    configurable: true
  });

  BehaviorSubject.prototype._subscribe = function (subscriber) {
    var subscription = _super.prototype._subscribe.call(this, subscriber);

    if (subscription && !subscription.closed) {
      subscriber.next(this._value);
    }

    return subscription;
  };

  BehaviorSubject.prototype.getValue = function () {
    if (this.hasError) {
      throw this.thrownError;
    } else if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_2__["ObjectUnsubscribedError"]();
    } else {
      return this._value;
    }
  };

  BehaviorSubject.prototype.next = function (value) {
    _super.prototype.next.call(this, this._value = value);
  };

  return BehaviorSubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/InnerSubscriber.js ***!
  \*************************************************************/
/*! exports provided: InnerSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InnerSubscriber", function() { return InnerSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */



var InnerSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](InnerSubscriber, _super);

  function InnerSubscriber(parent, outerValue, outerIndex) {
    var _this = _super.call(this) || this;

    _this.parent = parent;
    _this.outerValue = outerValue;
    _this.outerIndex = outerIndex;
    _this.index = 0;
    return _this;
  }

  InnerSubscriber.prototype._next = function (value) {
    this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
  };

  InnerSubscriber.prototype._error = function (error) {
    this.parent.notifyError(error, this);
    this.unsubscribe();
  };

  InnerSubscriber.prototype._complete = function () {
    this.parent.notifyComplete(this);
    this.unsubscribe();
  };

  return InnerSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/Notification.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/Notification.js ***!
  \**********************************************************/
/*! exports provided: NotificationKind, Notification */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationKind", function() { return NotificationKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notification", function() { return Notification; });
/* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observable/empty */ "./node_modules/rxjs/_esm5/internal/observable/empty.js");
/* harmony import */ var _observable_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observable/of */ "./node_modules/rxjs/_esm5/internal/observable/of.js");
/* harmony import */ var _observable_throwError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observable/throwError */ "./node_modules/rxjs/_esm5/internal/observable/throwError.js");
/** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */



var NotificationKind;
/*@__PURE__*/

(function (NotificationKind) {
  NotificationKind["NEXT"] = "N";
  NotificationKind["ERROR"] = "E";
  NotificationKind["COMPLETE"] = "C";
})(NotificationKind || (NotificationKind = {}));

var Notification = /*@__PURE__*/function () {
  function Notification(kind, value, error) {
    this.kind = kind;
    this.value = value;
    this.error = error;
    this.hasValue = kind === 'N';
  }

  Notification.prototype.observe = function (observer) {
    switch (this.kind) {
      case 'N':
        return observer.next && observer.next(this.value);

      case 'E':
        return observer.error && observer.error(this.error);

      case 'C':
        return observer.complete && observer.complete();
    }
  };

  Notification.prototype.do = function (next, error, complete) {
    var kind = this.kind;

    switch (kind) {
      case 'N':
        return next && next(this.value);

      case 'E':
        return error && error(this.error);

      case 'C':
        return complete && complete();
    }
  };

  Notification.prototype.accept = function (nextOrObserver, error, complete) {
    if (nextOrObserver && typeof nextOrObserver.next === 'function') {
      return this.observe(nextOrObserver);
    } else {
      return this.do(nextOrObserver, error, complete);
    }
  };

  Notification.prototype.toObservable = function () {
    var kind = this.kind;

    switch (kind) {
      case 'N':
        return Object(_observable_of__WEBPACK_IMPORTED_MODULE_1__["of"])(this.value);

      case 'E':
        return Object(_observable_throwError__WEBPACK_IMPORTED_MODULE_2__["throwError"])(this.error);

      case 'C':
        return Object(_observable_empty__WEBPACK_IMPORTED_MODULE_0__["empty"])();
    }

    throw new Error('unexpected notification kind value');
  };

  Notification.createNext = function (value) {
    if (typeof value !== 'undefined') {
      return new Notification('N', value);
    }

    return Notification.undefinedValueNotification;
  };

  Notification.createError = function (err) {
    return new Notification('E', undefined, err);
  };

  Notification.createComplete = function () {
    return Notification.completeNotification;
  };

  Notification.completeNotification = new Notification('C');
  Notification.undefinedValueNotification = new Notification('N', undefined);
  return Notification;
}();



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/Observable.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/Observable.js ***!
  \********************************************************/
/*! exports provided: Observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return Observable; });
/* harmony import */ var _util_canReportError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/canReportError */ "./node_modules/rxjs/_esm5/internal/util/canReportError.js");
/* harmony import */ var _util_toSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/toSubscriber */ "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol/observable */ "./node_modules/rxjs/_esm5/internal/symbol/observable.js");
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/pipe */ "./node_modules/rxjs/_esm5/internal/util/pipe.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/_esm5/internal/config.js");
/** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */






var Observable = /*@__PURE__*/function () {
  function Observable(subscribe) {
    this._isScalar = false;

    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  Observable.prototype.lift = function (operator) {
    var observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  };

  Observable.prototype.subscribe = function (observerOrNext, error, complete) {
    var operator = this.operator;
    var sink = Object(_util_toSubscriber__WEBPACK_IMPORTED_MODULE_1__["toSubscriber"])(observerOrNext, error, complete);

    if (operator) {
      sink.add(operator.call(sink, this.source));
    } else {
      sink.add(this.source || _config__WEBPACK_IMPORTED_MODULE_4__["config"].useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
    }

    if (_config__WEBPACK_IMPORTED_MODULE_4__["config"].useDeprecatedSynchronousErrorHandling) {
      if (sink.syncErrorThrowable) {
        sink.syncErrorThrowable = false;

        if (sink.syncErrorThrown) {
          throw sink.syncErrorValue;
        }
      }
    }

    return sink;
  };

  Observable.prototype._trySubscribe = function (sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      if (_config__WEBPACK_IMPORTED_MODULE_4__["config"].useDeprecatedSynchronousErrorHandling) {
        sink.syncErrorThrown = true;
        sink.syncErrorValue = err;
      }

      if (Object(_util_canReportError__WEBPACK_IMPORTED_MODULE_0__["canReportError"])(sink)) {
        sink.error(err);
      } else {
        console.warn(err);
      }
    }
  };

  Observable.prototype.forEach = function (next, promiseCtor) {
    var _this = this;

    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function (resolve, reject) {
      var subscription;
      subscription = _this.subscribe(function (value) {
        try {
          next(value);
        } catch (err) {
          reject(err);

          if (subscription) {
            subscription.unsubscribe();
          }
        }
      }, reject, resolve);
    });
  };

  Observable.prototype._subscribe = function (subscriber) {
    var source = this.source;
    return source && source.subscribe(subscriber);
  };

  Observable.prototype[_symbol_observable__WEBPACK_IMPORTED_MODULE_2__["observable"]] = function () {
    return this;
  };

  Observable.prototype.pipe = function () {
    var operations = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }

    if (operations.length === 0) {
      return this;
    }

    return Object(_util_pipe__WEBPACK_IMPORTED_MODULE_3__["pipeFromArray"])(operations)(this);
  };

  Observable.prototype.toPromise = function (promiseCtor) {
    var _this = this;

    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function (resolve, reject) {
      var value;

      _this.subscribe(function (x) {
        return value = x;
      }, function (err) {
        return reject(err);
      }, function () {
        return resolve(value);
      });
    });
  };

  Observable.create = function (subscribe) {
    return new Observable(subscribe);
  };

  return Observable;
}();



function getPromiseCtor(promiseCtor) {
  if (!promiseCtor) {
    promiseCtor = _config__WEBPACK_IMPORTED_MODULE_4__["config"].Promise || Promise;
  }

  if (!promiseCtor) {
    throw new Error('no Promise impl found');
  }

  return promiseCtor;
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/Observer.js":
/*!******************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/Observer.js ***!
  \******************************************************/
/*! exports provided: empty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/_esm5/internal/config.js");
/* harmony import */ var _util_hostReportError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/hostReportError */ "./node_modules/rxjs/_esm5/internal/util/hostReportError.js");
/** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */


var empty = {
  closed: true,
  next: function (value) {},
  error: function (err) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__["config"].useDeprecatedSynchronousErrorHandling) {
      throw err;
    } else {
      Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_1__["hostReportError"])(err);
    }
  },
  complete: function () {}
};

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/OuterSubscriber.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/OuterSubscriber.js ***!
  \*************************************************************/
/*! exports provided: OuterSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OuterSubscriber", function() { return OuterSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */



var OuterSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](OuterSubscriber, _super);

  function OuterSubscriber() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
    this.destination.next(innerValue);
  };

  OuterSubscriber.prototype.notifyError = function (error, innerSub) {
    this.destination.error(error);
  };

  OuterSubscriber.prototype.notifyComplete = function (innerSub) {
    this.destination.complete();
  };

  return OuterSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/ReplaySubject.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/ReplaySubject.js ***!
  \***********************************************************/
/*! exports provided: ReplaySubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReplaySubject", function() { return ReplaySubject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _scheduler_queue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scheduler/queue */ "./node_modules/rxjs/_esm5/internal/scheduler/queue.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _operators_observeOn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./operators/observeOn */ "./node_modules/rxjs/_esm5/internal/operators/observeOn.js");
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/ObjectUnsubscribedError */ "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js");
/* harmony import */ var _SubjectSubscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SubjectSubscription */ "./node_modules/rxjs/_esm5/internal/SubjectSubscription.js");
/** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */








var ReplaySubject = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ReplaySubject, _super);

  function ReplaySubject(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) {
      bufferSize = Number.POSITIVE_INFINITY;
    }

    if (windowTime === void 0) {
      windowTime = Number.POSITIVE_INFINITY;
    }

    var _this = _super.call(this) || this;

    _this.scheduler = scheduler;
    _this._events = [];
    _this._infiniteTimeWindow = false;
    _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
    _this._windowTime = windowTime < 1 ? 1 : windowTime;

    if (windowTime === Number.POSITIVE_INFINITY) {
      _this._infiniteTimeWindow = true;
      _this.next = _this.nextInfiniteTimeWindow;
    } else {
      _this.next = _this.nextTimeWindow;
    }

    return _this;
  }

  ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
    if (!this.isStopped) {
      var _events = this._events;

      _events.push(value);

      if (_events.length > this._bufferSize) {
        _events.shift();
      }
    }

    _super.prototype.next.call(this, value);
  };

  ReplaySubject.prototype.nextTimeWindow = function (value) {
    if (!this.isStopped) {
      this._events.push(new ReplayEvent(this._getNow(), value));

      this._trimBufferThenGetEvents();
    }

    _super.prototype.next.call(this, value);
  };

  ReplaySubject.prototype._subscribe = function (subscriber) {
    var _infiniteTimeWindow = this._infiniteTimeWindow;

    var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();

    var scheduler = this.scheduler;
    var len = _events.length;
    var subscription;

    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_5__["ObjectUnsubscribedError"]();
    } else if (this.isStopped || this.hasError) {
      subscription = _Subscription__WEBPACK_IMPORTED_MODULE_3__["Subscription"].EMPTY;
    } else {
      this.observers.push(subscriber);
      subscription = new _SubjectSubscription__WEBPACK_IMPORTED_MODULE_6__["SubjectSubscription"](this, subscriber);
    }

    if (scheduler) {
      subscriber.add(subscriber = new _operators_observeOn__WEBPACK_IMPORTED_MODULE_4__["ObserveOnSubscriber"](subscriber, scheduler));
    }

    if (_infiniteTimeWindow) {
      for (var i = 0; i < len && !subscriber.closed; i++) {
        subscriber.next(_events[i]);
      }
    } else {
      for (var i = 0; i < len && !subscriber.closed; i++) {
        subscriber.next(_events[i].value);
      }
    }

    if (this.hasError) {
      subscriber.error(this.thrownError);
    } else if (this.isStopped) {
      subscriber.complete();
    }

    return subscription;
  };

  ReplaySubject.prototype._getNow = function () {
    return (this.scheduler || _scheduler_queue__WEBPACK_IMPORTED_MODULE_2__["queue"]).now();
  };

  ReplaySubject.prototype._trimBufferThenGetEvents = function () {
    var now = this._getNow();

    var _bufferSize = this._bufferSize;
    var _windowTime = this._windowTime;
    var _events = this._events;
    var eventsCount = _events.length;
    var spliceCount = 0;

    while (spliceCount < eventsCount) {
      if (now - _events[spliceCount].time < _windowTime) {
        break;
      }

      spliceCount++;
    }

    if (eventsCount > _bufferSize) {
      spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
    }

    if (spliceCount > 0) {
      _events.splice(0, spliceCount);
    }

    return _events;
  };

  return ReplaySubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]);



var ReplayEvent = /*@__PURE__*/function () {
  function ReplayEvent(time, value) {
    this.time = time;
    this.value = value;
  }

  return ReplayEvent;
}();

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/Scheduler.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/Scheduler.js ***!
  \*******************************************************/
/*! exports provided: Scheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scheduler", function() { return Scheduler; });
var Scheduler = /*@__PURE__*/function () {
  function Scheduler(SchedulerAction, now) {
    if (now === void 0) {
      now = Scheduler.now;
    }

    this.SchedulerAction = SchedulerAction;
    this.now = now;
  }

  Scheduler.prototype.schedule = function (work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }

    return new this.SchedulerAction(this, work).schedule(state, delay);
  };

  Scheduler.now = function () {
    return Date.now();
  };

  return Scheduler;
}();



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/Subject.js":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/Subject.js ***!
  \*****************************************************/
/*! exports provided: SubjectSubscriber, Subject, AnonymousSubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectSubscriber", function() { return SubjectSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return Subject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnonymousSubject", function() { return AnonymousSubject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/ObjectUnsubscribedError */ "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js");
/* harmony import */ var _SubjectSubscription__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SubjectSubscription */ "./node_modules/rxjs/_esm5/internal/SubjectSubscription.js");
/* harmony import */ var _internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../internal/symbol/rxSubscriber */ "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js");
/** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */








var SubjectSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SubjectSubscriber, _super);

  function SubjectSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    return _this;
  }

  return SubjectSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_2__["Subscriber"]);



var Subject = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Subject, _super);

  function Subject() {
    var _this = _super.call(this) || this;

    _this.observers = [];
    _this.closed = false;
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }

  Subject.prototype[_internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_6__["rxSubscriber"]] = function () {
    return new SubjectSubscriber(this);
  };

  Subject.prototype.lift = function (operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };

  Subject.prototype.next = function (value) {
    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__["ObjectUnsubscribedError"]();
    }

    if (!this.isStopped) {
      var observers = this.observers;
      var len = observers.length;
      var copy = observers.slice();

      for (var i = 0; i < len; i++) {
        copy[i].next(value);
      }
    }
  };

  Subject.prototype.error = function (err) {
    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__["ObjectUnsubscribedError"]();
    }

    this.hasError = true;
    this.thrownError = err;
    this.isStopped = true;
    var observers = this.observers;
    var len = observers.length;
    var copy = observers.slice();

    for (var i = 0; i < len; i++) {
      copy[i].error(err);
    }

    this.observers.length = 0;
  };

  Subject.prototype.complete = function () {
    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__["ObjectUnsubscribedError"]();
    }

    this.isStopped = true;
    var observers = this.observers;
    var len = observers.length;
    var copy = observers.slice();

    for (var i = 0; i < len; i++) {
      copy[i].complete();
    }

    this.observers.length = 0;
  };

  Subject.prototype.unsubscribe = function () {
    this.isStopped = true;
    this.closed = true;
    this.observers = null;
  };

  Subject.prototype._trySubscribe = function (subscriber) {
    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__["ObjectUnsubscribedError"]();
    } else {
      return _super.prototype._trySubscribe.call(this, subscriber);
    }
  };

  Subject.prototype._subscribe = function (subscriber) {
    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_4__["ObjectUnsubscribedError"]();
    } else if (this.hasError) {
      subscriber.error(this.thrownError);
      return _Subscription__WEBPACK_IMPORTED_MODULE_3__["Subscription"].EMPTY;
    } else if (this.isStopped) {
      subscriber.complete();
      return _Subscription__WEBPACK_IMPORTED_MODULE_3__["Subscription"].EMPTY;
    } else {
      this.observers.push(subscriber);
      return new _SubjectSubscription__WEBPACK_IMPORTED_MODULE_5__["SubjectSubscription"](this, subscriber);
    }
  };

  Subject.prototype.asObservable = function () {
    var observable = new _Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"]();
    observable.source = this;
    return observable;
  };

  Subject.create = function (destination, source) {
    return new AnonymousSubject(destination, source);
  };

  return Subject;
}(_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"]);



var AnonymousSubject = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AnonymousSubject, _super);

  function AnonymousSubject(destination, source) {
    var _this = _super.call(this) || this;

    _this.destination = destination;
    _this.source = source;
    return _this;
  }

  AnonymousSubject.prototype.next = function (value) {
    var destination = this.destination;

    if (destination && destination.next) {
      destination.next(value);
    }
  };

  AnonymousSubject.prototype.error = function (err) {
    var destination = this.destination;

    if (destination && destination.error) {
      this.destination.error(err);
    }
  };

  AnonymousSubject.prototype.complete = function () {
    var destination = this.destination;

    if (destination && destination.complete) {
      this.destination.complete();
    }
  };

  AnonymousSubject.prototype._subscribe = function (subscriber) {
    var source = this.source;

    if (source) {
      return this.source.subscribe(subscriber);
    } else {
      return _Subscription__WEBPACK_IMPORTED_MODULE_3__["Subscription"].EMPTY;
    }
  };

  return AnonymousSubject;
}(Subject);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/SubjectSubscription.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/SubjectSubscription.js ***!
  \*****************************************************************/
/*! exports provided: SubjectSubscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectSubscription", function() { return SubjectSubscription; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */



var SubjectSubscription = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SubjectSubscription, _super);

  function SubjectSubscription(subject, subscriber) {
    var _this = _super.call(this) || this;

    _this.subject = subject;
    _this.subscriber = subscriber;
    _this.closed = false;
    return _this;
  }

  SubjectSubscription.prototype.unsubscribe = function () {
    if (this.closed) {
      return;
    }

    this.closed = true;
    var subject = this.subject;
    var observers = subject.observers;
    this.subject = null;

    if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
      return;
    }

    var subscriberIndex = observers.indexOf(this.subscriber);

    if (subscriberIndex !== -1) {
      observers.splice(subscriberIndex, 1);
    }
  };

  return SubjectSubscription;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__["Subscription"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/Subscriber.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/Subscriber.js ***!
  \********************************************************/
/*! exports provided: Subscriber, SafeSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subscriber", function() { return Subscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafeSubscriber", function() { return SafeSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/_esm5/internal/util/isFunction.js");
/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Observer */ "./node_modules/rxjs/_esm5/internal/Observer.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../internal/symbol/rxSubscriber */ "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/_esm5/internal/config.js");
/* harmony import */ var _util_hostReportError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/hostReportError */ "./node_modules/rxjs/_esm5/internal/util/hostReportError.js");
/** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */








var Subscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Subscriber, _super);

  function Subscriber(destinationOrNext, error, complete) {
    var _this = _super.call(this) || this;

    _this.syncErrorValue = null;
    _this.syncErrorThrown = false;
    _this.syncErrorThrowable = false;
    _this.isStopped = false;

    switch (arguments.length) {
      case 0:
        _this.destination = _Observer__WEBPACK_IMPORTED_MODULE_2__["empty"];
        break;

      case 1:
        if (!destinationOrNext) {
          _this.destination = _Observer__WEBPACK_IMPORTED_MODULE_2__["empty"];
          break;
        }

        if (typeof destinationOrNext === 'object') {
          if (destinationOrNext instanceof Subscriber) {
            _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
            _this.destination = destinationOrNext;
            destinationOrNext.add(_this);
          } else {
            _this.syncErrorThrowable = true;
            _this.destination = new SafeSubscriber(_this, destinationOrNext);
          }

          break;
        }

      default:
        _this.syncErrorThrowable = true;
        _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
        break;
    }

    return _this;
  }

  Subscriber.prototype[_internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_4__["rxSubscriber"]] = function () {
    return this;
  };

  Subscriber.create = function (next, error, complete) {
    var subscriber = new Subscriber(next, error, complete);
    subscriber.syncErrorThrowable = false;
    return subscriber;
  };

  Subscriber.prototype.next = function (value) {
    if (!this.isStopped) {
      this._next(value);
    }
  };

  Subscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      this.isStopped = true;

      this._error(err);
    }
  };

  Subscriber.prototype.complete = function () {
    if (!this.isStopped) {
      this.isStopped = true;

      this._complete();
    }
  };

  Subscriber.prototype.unsubscribe = function () {
    if (this.closed) {
      return;
    }

    this.isStopped = true;

    _super.prototype.unsubscribe.call(this);
  };

  Subscriber.prototype._next = function (value) {
    this.destination.next(value);
  };

  Subscriber.prototype._error = function (err) {
    this.destination.error(err);
    this.unsubscribe();
  };

  Subscriber.prototype._complete = function () {
    this.destination.complete();
    this.unsubscribe();
  };

  Subscriber.prototype._unsubscribeAndRecycle = function () {
    var _parentOrParents = this._parentOrParents;
    this._parentOrParents = null;
    this.unsubscribe();
    this.closed = false;
    this.isStopped = false;
    this._parentOrParents = _parentOrParents;
    return this;
  };

  return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_3__["Subscription"]);



var SafeSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SafeSubscriber, _super);

  function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
    var _this = _super.call(this) || this;

    _this._parentSubscriber = _parentSubscriber;
    var next;
    var context = _this;

    if (Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(observerOrNext)) {
      next = observerOrNext;
    } else if (observerOrNext) {
      next = observerOrNext.next;
      error = observerOrNext.error;
      complete = observerOrNext.complete;

      if (observerOrNext !== _Observer__WEBPACK_IMPORTED_MODULE_2__["empty"]) {
        context = Object.create(observerOrNext);

        if (Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(context.unsubscribe)) {
          _this.add(context.unsubscribe.bind(context));
        }

        context.unsubscribe = _this.unsubscribe.bind(_this);
      }
    }

    _this._context = context;
    _this._next = next;
    _this._error = error;
    _this._complete = complete;
    return _this;
  }

  SafeSubscriber.prototype.next = function (value) {
    if (!this.isStopped && this._next) {
      var _parentSubscriber = this._parentSubscriber;

      if (!_config__WEBPACK_IMPORTED_MODULE_5__["config"].useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
        this.__tryOrUnsub(this._next, value);
      } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;
      var useDeprecatedSynchronousErrorHandling = _config__WEBPACK_IMPORTED_MODULE_5__["config"].useDeprecatedSynchronousErrorHandling;

      if (this._error) {
        if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(this._error, err);

          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, this._error, err);

          this.unsubscribe();
        }
      } else if (!_parentSubscriber.syncErrorThrowable) {
        this.unsubscribe();

        if (useDeprecatedSynchronousErrorHandling) {
          throw err;
        }

        Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__["hostReportError"])(err);
      } else {
        if (useDeprecatedSynchronousErrorHandling) {
          _parentSubscriber.syncErrorValue = err;
          _parentSubscriber.syncErrorThrown = true;
        } else {
          Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__["hostReportError"])(err);
        }

        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.complete = function () {
    var _this = this;

    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;

      if (this._complete) {
        var wrappedComplete = function () {
          return _this._complete.call(_this._context);
        };

        if (!_config__WEBPACK_IMPORTED_MODULE_5__["config"].useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(wrappedComplete);

          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, wrappedComplete);

          this.unsubscribe();
        }
      } else {
        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
    try {
      fn.call(this._context, value);
    } catch (err) {
      this.unsubscribe();

      if (_config__WEBPACK_IMPORTED_MODULE_5__["config"].useDeprecatedSynchronousErrorHandling) {
        throw err;
      } else {
        Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__["hostReportError"])(err);
      }
    }
  };

  SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
    if (!_config__WEBPACK_IMPORTED_MODULE_5__["config"].useDeprecatedSynchronousErrorHandling) {
      throw new Error('bad call');
    }

    try {
      fn.call(this._context, value);
    } catch (err) {
      if (_config__WEBPACK_IMPORTED_MODULE_5__["config"].useDeprecatedSynchronousErrorHandling) {
        parent.syncErrorValue = err;
        parent.syncErrorThrown = true;
        return true;
      } else {
        Object(_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__["hostReportError"])(err);
        return true;
      }
    }

    return false;
  };

  SafeSubscriber.prototype._unsubscribe = function () {
    var _parentSubscriber = this._parentSubscriber;
    this._context = null;
    this._parentSubscriber = null;

    _parentSubscriber.unsubscribe();
  };

  return SafeSubscriber;
}(Subscriber);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/Subscription.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/Subscription.js ***!
  \**********************************************************/
/*! exports provided: Subscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subscription", function() { return Subscription; });
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _util_isObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/isObject */ "./node_modules/rxjs/_esm5/internal/util/isObject.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/_esm5/internal/util/isFunction.js");
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/UnsubscriptionError */ "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js");
/** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */





var Subscription = /*@__PURE__*/function () {
  function Subscription(unsubscribe) {
    this.closed = false;
    this._parentOrParents = null;
    this._subscriptions = null;

    if (unsubscribe) {
      this._ctorUnsubscribe = true;
      this._unsubscribe = unsubscribe;
    }
  }

  Subscription.prototype.unsubscribe = function () {
    var errors;

    if (this.closed) {
      return;
    }

    var _a = this,
        _parentOrParents = _a._parentOrParents,
        _ctorUnsubscribe = _a._ctorUnsubscribe,
        _unsubscribe = _a._unsubscribe,
        _subscriptions = _a._subscriptions;

    this.closed = true;
    this._parentOrParents = null;
    this._subscriptions = null;

    if (_parentOrParents instanceof Subscription) {
      _parentOrParents.remove(this);
    } else if (_parentOrParents !== null) {
      for (var index = 0; index < _parentOrParents.length; ++index) {
        var parent_1 = _parentOrParents[index];
        parent_1.remove(this);
      }
    }

    if (Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(_unsubscribe)) {
      if (_ctorUnsubscribe) {
        this._unsubscribe = undefined;
      }

      try {
        _unsubscribe.call(this);
      } catch (e) {
        errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_3__["UnsubscriptionError"] ? flattenUnsubscriptionErrors(e.errors) : [e];
      }
    }

    if (Object(_util_isArray__WEBPACK_IMPORTED_MODULE_0__["isArray"])(_subscriptions)) {
      var index = -1;
      var len = _subscriptions.length;

      while (++index < len) {
        var sub = _subscriptions[index];

        if (Object(_util_isObject__WEBPACK_IMPORTED_MODULE_1__["isObject"])(sub)) {
          try {
            sub.unsubscribe();
          } catch (e) {
            errors = errors || [];

            if (e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_3__["UnsubscriptionError"]) {
              errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
            } else {
              errors.push(e);
            }
          }
        }
      }
    }

    if (errors) {
      throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_3__["UnsubscriptionError"](errors);
    }
  };

  Subscription.prototype.add = function (teardown) {
    var subscription = teardown;

    if (!teardown) {
      return Subscription.EMPTY;
    }

    switch (typeof teardown) {
      case 'function':
        subscription = new Subscription(teardown);

      case 'object':
        if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
          return subscription;
        } else if (this.closed) {
          subscription.unsubscribe();
          return subscription;
        } else if (!(subscription instanceof Subscription)) {
          var tmp = subscription;
          subscription = new Subscription();
          subscription._subscriptions = [tmp];
        }

        break;

      default:
        {
          throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
    }

    var _parentOrParents = subscription._parentOrParents;

    if (_parentOrParents === null) {
      subscription._parentOrParents = this;
    } else if (_parentOrParents instanceof Subscription) {
      if (_parentOrParents === this) {
        return subscription;
      }

      subscription._parentOrParents = [_parentOrParents, this];
    } else if (_parentOrParents.indexOf(this) === -1) {
      _parentOrParents.push(this);
    } else {
      return subscription;
    }

    var subscriptions = this._subscriptions;

    if (subscriptions === null) {
      this._subscriptions = [subscription];
    } else {
      subscriptions.push(subscription);
    }

    return subscription;
  };

  Subscription.prototype.remove = function (subscription) {
    var subscriptions = this._subscriptions;

    if (subscriptions) {
      var subscriptionIndex = subscriptions.indexOf(subscription);

      if (subscriptionIndex !== -1) {
        subscriptions.splice(subscriptionIndex, 1);
      }
    }
  };

  Subscription.EMPTY = function (empty) {
    empty.closed = true;
    return empty;
  }(new Subscription());

  return Subscription;
}();



function flattenUnsubscriptionErrors(errors) {
  return errors.reduce(function (errs, err) {
    return errs.concat(err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_3__["UnsubscriptionError"] ? err.errors : err);
  }, []);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/config.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/config.js ***!
  \****************************************************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config = {
  Promise: undefined,

  set useDeprecatedSynchronousErrorHandling(value) {
    if (value) {
      var error = /*@__PURE__*/new Error();
      /*@__PURE__*/

      console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
    } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
      /*@__PURE__*/
      console.log('RxJS: Back to a better error behavior. Thank you. <3');
    }

    _enable_super_gross_mode_that_will_cause_bad_things = value;
  },

  get useDeprecatedSynchronousErrorHandling() {
    return _enable_super_gross_mode_that_will_cause_bad_things;
  }

};

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/innerSubscribe.js ***!
  \************************************************************/
/*! exports provided: SimpleInnerSubscriber, ComplexInnerSubscriber, SimpleOuterSubscriber, ComplexOuterSubscriber, innerSubscribe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleInnerSubscriber", function() { return SimpleInnerSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplexInnerSubscriber", function() { return ComplexInnerSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleOuterSubscriber", function() { return SimpleOuterSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComplexOuterSubscriber", function() { return ComplexOuterSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "innerSubscribe", function() { return innerSubscribe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _util_subscribeTo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/subscribeTo */ "./node_modules/rxjs/_esm5/internal/util/subscribeTo.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_util_subscribeTo PURE_IMPORTS_END */





var SimpleInnerSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SimpleInnerSubscriber, _super);

  function SimpleInnerSubscriber(parent) {
    var _this = _super.call(this) || this;

    _this.parent = parent;
    return _this;
  }

  SimpleInnerSubscriber.prototype._next = function (value) {
    this.parent.notifyNext(value);
  };

  SimpleInnerSubscriber.prototype._error = function (error) {
    this.parent.notifyError(error);
    this.unsubscribe();
  };

  SimpleInnerSubscriber.prototype._complete = function () {
    this.parent.notifyComplete();
    this.unsubscribe();
  };

  return SimpleInnerSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);



var ComplexInnerSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ComplexInnerSubscriber, _super);

  function ComplexInnerSubscriber(parent, outerValue, outerIndex) {
    var _this = _super.call(this) || this;

    _this.parent = parent;
    _this.outerValue = outerValue;
    _this.outerIndex = outerIndex;
    return _this;
  }

  ComplexInnerSubscriber.prototype._next = function (value) {
    this.parent.notifyNext(this.outerValue, value, this.outerIndex, this);
  };

  ComplexInnerSubscriber.prototype._error = function (error) {
    this.parent.notifyError(error);
    this.unsubscribe();
  };

  ComplexInnerSubscriber.prototype._complete = function () {
    this.parent.notifyComplete(this);
    this.unsubscribe();
  };

  return ComplexInnerSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);



var SimpleOuterSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SimpleOuterSubscriber, _super);

  function SimpleOuterSubscriber() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  SimpleOuterSubscriber.prototype.notifyNext = function (innerValue) {
    this.destination.next(innerValue);
  };

  SimpleOuterSubscriber.prototype.notifyError = function (err) {
    this.destination.error(err);
  };

  SimpleOuterSubscriber.prototype.notifyComplete = function () {
    this.destination.complete();
  };

  return SimpleOuterSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);



var ComplexOuterSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ComplexOuterSubscriber, _super);

  function ComplexOuterSubscriber() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ComplexOuterSubscriber.prototype.notifyNext = function (_outerValue, innerValue, _outerIndex, _innerSub) {
    this.destination.next(innerValue);
  };

  ComplexOuterSubscriber.prototype.notifyError = function (error) {
    this.destination.error(error);
  };

  ComplexOuterSubscriber.prototype.notifyComplete = function (_innerSub) {
    this.destination.complete();
  };

  return ComplexOuterSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);


function innerSubscribe(result, innerSubscriber) {
  if (innerSubscriber.closed) {
    return undefined;
  }

  if (result instanceof _Observable__WEBPACK_IMPORTED_MODULE_2__["Observable"]) {
    return result.subscribe(innerSubscriber);
  }

  var subscription;

  try {
    subscription = Object(_util_subscribeTo__WEBPACK_IMPORTED_MODULE_3__["subscribeTo"])(result)(innerSubscriber);
  } catch (error) {
    innerSubscriber.error(error);
  }

  return subscription;
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js ***!
  \******************************************************************************/
/*! exports provided: ConnectableObservable, connectableObservableDescriptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectableObservable", function() { return ConnectableObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectableObservableDescriptor", function() { return connectableObservableDescriptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _operators_refCount__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../operators/refCount */ "./node_modules/rxjs/_esm5/internal/operators/refCount.js");
/** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */







var ConnectableObservable = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ConnectableObservable, _super);

  function ConnectableObservable(source, subjectFactory) {
    var _this = _super.call(this) || this;

    _this.source = source;
    _this.subjectFactory = subjectFactory;
    _this._refCount = 0;
    _this._isComplete = false;
    return _this;
  }

  ConnectableObservable.prototype._subscribe = function (subscriber) {
    return this.getSubject().subscribe(subscriber);
  };

  ConnectableObservable.prototype.getSubject = function () {
    var subject = this._subject;

    if (!subject || subject.isStopped) {
      this._subject = this.subjectFactory();
    }

    return this._subject;
  };

  ConnectableObservable.prototype.connect = function () {
    var connection = this._connection;

    if (!connection) {
      this._isComplete = false;
      connection = this._connection = new _Subscription__WEBPACK_IMPORTED_MODULE_4__["Subscription"]();
      connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));

      if (connection.closed) {
        this._connection = null;
        connection = _Subscription__WEBPACK_IMPORTED_MODULE_4__["Subscription"].EMPTY;
      }
    }

    return connection;
  };

  ConnectableObservable.prototype.refCount = function () {
    return Object(_operators_refCount__WEBPACK_IMPORTED_MODULE_5__["refCount"])()(this);
  };

  return ConnectableObservable;
}(_Observable__WEBPACK_IMPORTED_MODULE_2__["Observable"]);


var connectableObservableDescriptor = /*@__PURE__*/function () {
  var connectableProto = ConnectableObservable.prototype;
  return {
    operator: {
      value: null
    },
    _refCount: {
      value: 0,
      writable: true
    },
    _subject: {
      value: null,
      writable: true
    },
    _connection: {
      value: null,
      writable: true
    },
    _subscribe: {
      value: connectableProto._subscribe
    },
    _isComplete: {
      value: connectableProto._isComplete,
      writable: true
    },
    getSubject: {
      value: connectableProto.getSubject
    },
    connect: {
      value: connectableProto.connect
    },
    refCount: {
      value: connectableProto.refCount
    }
  };
}();

var ConnectableSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ConnectableSubscriber, _super);

  function ConnectableSubscriber(destination, connectable) {
    var _this = _super.call(this, destination) || this;

    _this.connectable = connectable;
    return _this;
  }

  ConnectableSubscriber.prototype._error = function (err) {
    this._unsubscribe();

    _super.prototype._error.call(this, err);
  };

  ConnectableSubscriber.prototype._complete = function () {
    this.connectable._isComplete = true;

    this._unsubscribe();

    _super.prototype._complete.call(this);
  };

  ConnectableSubscriber.prototype._unsubscribe = function () {
    var connectable = this.connectable;

    if (connectable) {
      this.connectable = null;
      var connection = connectable._connection;
      connectable._refCount = 0;
      connectable._subject = null;
      connectable._connection = null;

      if (connection) {
        connection.unsubscribe();
      }
    }
  };

  return ConnectableSubscriber;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__["SubjectSubscriber"]);

var RefCountOperator = /*@__PURE__*/function () {
  function RefCountOperator(connectable) {
    this.connectable = connectable;
  }

  RefCountOperator.prototype.call = function (subscriber, source) {
    var connectable = this.connectable;
    connectable._refCount++;
    var refCounter = new RefCountSubscriber(subscriber, connectable);
    var subscription = source.subscribe(refCounter);

    if (!refCounter.closed) {
      refCounter.connection = connectable.connect();
    }

    return subscription;
  };

  return RefCountOperator;
}();

var RefCountSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RefCountSubscriber, _super);

  function RefCountSubscriber(destination, connectable) {
    var _this = _super.call(this, destination) || this;

    _this.connectable = connectable;
    return _this;
  }

  RefCountSubscriber.prototype._unsubscribe = function () {
    var connectable = this.connectable;

    if (!connectable) {
      this.connection = null;
      return;
    }

    this.connectable = null;
    var refCount = connectable._refCount;

    if (refCount <= 0) {
      this.connection = null;
      return;
    }

    connectable._refCount = refCount - 1;

    if (refCount > 1) {
      this.connection = null;
      return;
    }

    var connection = this.connection;
    var sharedConnection = connectable._connection;
    this.connection = null;

    if (sharedConnection && (!connection || sharedConnection === connection)) {
      sharedConnection.unsubscribe();
    }
  };

  return RefCountSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_3__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/SubscribeOnObservable.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/SubscribeOnObservable.js ***!
  \******************************************************************************/
/*! exports provided: SubscribeOnObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscribeOnObservable", function() { return SubscribeOnObservable; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _scheduler_asap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scheduler/asap */ "./node_modules/rxjs/_esm5/internal/scheduler/asap.js");
/* harmony import */ var _util_isNumeric__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isNumeric */ "./node_modules/rxjs/_esm5/internal/util/isNumeric.js");
/** PURE_IMPORTS_START tslib,_Observable,_scheduler_asap,_util_isNumeric PURE_IMPORTS_END */





var SubscribeOnObservable = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SubscribeOnObservable, _super);

  function SubscribeOnObservable(source, delayTime, scheduler) {
    if (delayTime === void 0) {
      delayTime = 0;
    }

    if (scheduler === void 0) {
      scheduler = _scheduler_asap__WEBPACK_IMPORTED_MODULE_2__["asap"];
    }

    var _this = _super.call(this) || this;

    _this.source = source;
    _this.delayTime = delayTime;
    _this.scheduler = scheduler;

    if (!Object(_util_isNumeric__WEBPACK_IMPORTED_MODULE_3__["isNumeric"])(delayTime) || delayTime < 0) {
      _this.delayTime = 0;
    }

    if (!scheduler || typeof scheduler.schedule !== 'function') {
      _this.scheduler = _scheduler_asap__WEBPACK_IMPORTED_MODULE_2__["asap"];
    }

    return _this;
  }

  SubscribeOnObservable.create = function (source, delay, scheduler) {
    if (delay === void 0) {
      delay = 0;
    }

    if (scheduler === void 0) {
      scheduler = _scheduler_asap__WEBPACK_IMPORTED_MODULE_2__["asap"];
    }

    return new SubscribeOnObservable(source, delay, scheduler);
  };

  SubscribeOnObservable.dispatch = function (arg) {
    var source = arg.source,
        subscriber = arg.subscriber;
    return this.add(source.subscribe(subscriber));
  };

  SubscribeOnObservable.prototype._subscribe = function (subscriber) {
    var delay = this.delayTime;
    var source = this.source;
    var scheduler = this.scheduler;
    return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
      source: source,
      subscriber: subscriber
    });
  };

  return SubscribeOnObservable;
}(_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/bindCallback.js ***!
  \*********************************************************************/
/*! exports provided: bindCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindCallback", function() { return bindCallback; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _AsyncSubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AsyncSubject */ "./node_modules/rxjs/_esm5/internal/AsyncSubject.js");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/* harmony import */ var _util_canReportError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/canReportError */ "./node_modules/rxjs/_esm5/internal/util/canReportError.js");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js");
/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isArray,_util_isScheduler PURE_IMPORTS_END */






function bindCallback(callbackFunc, resultSelector, scheduler) {
  if (resultSelector) {
    if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_5__["isScheduler"])(resultSelector)) {
      scheduler = resultSelector;
    } else {
      return function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        return bindCallback(callbackFunc, scheduler).apply(void 0, args).pipe(Object(_operators_map__WEBPACK_IMPORTED_MODULE_2__["map"])(function (args) {
          return Object(_util_isArray__WEBPACK_IMPORTED_MODULE_4__["isArray"])(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
        }));
      };
    }
  }

  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var context = this;
    var subject;
    var params = {
      context: context,
      subject: subject,
      callbackFunc: callbackFunc,
      scheduler: scheduler
    };
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
      if (!scheduler) {
        if (!subject) {
          subject = new _AsyncSubject__WEBPACK_IMPORTED_MODULE_1__["AsyncSubject"]();

          var handler = function () {
            var innerArgs = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              innerArgs[_i] = arguments[_i];
            }

            subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
            subject.complete();
          };

          try {
            callbackFunc.apply(context, args.concat([handler]));
          } catch (err) {
            if (Object(_util_canReportError__WEBPACK_IMPORTED_MODULE_3__["canReportError"])(subject)) {
              subject.error(err);
            } else {
              console.warn(err);
            }
          }
        }

        return subject.subscribe(subscriber);
      } else {
        var state = {
          args: args,
          subscriber: subscriber,
          params: params
        };
        return scheduler.schedule(dispatch, 0, state);
      }
    });
  };
}

function dispatch(state) {
  var _this = this;

  var self = this;
  var args = state.args,
      subscriber = state.subscriber,
      params = state.params;
  var callbackFunc = params.callbackFunc,
      context = params.context,
      scheduler = params.scheduler;
  var subject = params.subject;

  if (!subject) {
    subject = params.subject = new _AsyncSubject__WEBPACK_IMPORTED_MODULE_1__["AsyncSubject"]();

    var handler = function () {
      var innerArgs = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        innerArgs[_i] = arguments[_i];
      }

      var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;

      _this.add(scheduler.schedule(dispatchNext, 0, {
        value: value,
        subject: subject
      }));
    };

    try {
      callbackFunc.apply(context, args.concat([handler]));
    } catch (err) {
      subject.error(err);
    }
  }

  this.add(subject.subscribe(subscriber));
}

function dispatchNext(state) {
  var value = state.value,
      subject = state.subject;
  subject.next(value);
  subject.complete();
}

function dispatchError(state) {
  var err = state.err,
      subject = state.subject;
  subject.error(err);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/bindNodeCallback.js":
/*!*************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/bindNodeCallback.js ***!
  \*************************************************************************/
/*! exports provided: bindNodeCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindNodeCallback", function() { return bindNodeCallback; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _AsyncSubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AsyncSubject */ "./node_modules/rxjs/_esm5/internal/AsyncSubject.js");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/* harmony import */ var _util_canReportError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/canReportError */ "./node_modules/rxjs/_esm5/internal/util/canReportError.js");
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isScheduler,_util_isArray PURE_IMPORTS_END */






function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
  if (resultSelector) {
    if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_4__["isScheduler"])(resultSelector)) {
      scheduler = resultSelector;
    } else {
      return function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        return bindNodeCallback(callbackFunc, scheduler).apply(void 0, args).pipe(Object(_operators_map__WEBPACK_IMPORTED_MODULE_2__["map"])(function (args) {
          return Object(_util_isArray__WEBPACK_IMPORTED_MODULE_5__["isArray"])(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
        }));
      };
    }
  }

  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var params = {
      subject: undefined,
      args: args,
      callbackFunc: callbackFunc,
      scheduler: scheduler,
      context: this
    };
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
      var context = params.context;
      var subject = params.subject;

      if (!scheduler) {
        if (!subject) {
          subject = params.subject = new _AsyncSubject__WEBPACK_IMPORTED_MODULE_1__["AsyncSubject"]();

          var handler = function () {
            var innerArgs = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              innerArgs[_i] = arguments[_i];
            }

            var err = innerArgs.shift();

            if (err) {
              subject.error(err);
              return;
            }

            subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
            subject.complete();
          };

          try {
            callbackFunc.apply(context, args.concat([handler]));
          } catch (err) {
            if (Object(_util_canReportError__WEBPACK_IMPORTED_MODULE_3__["canReportError"])(subject)) {
              subject.error(err);
            } else {
              console.warn(err);
            }
          }
        }

        return subject.subscribe(subscriber);
      } else {
        return scheduler.schedule(dispatch, 0, {
          params: params,
          subscriber: subscriber,
          context: context
        });
      }
    });
  };
}

function dispatch(state) {
  var _this = this;

  var params = state.params,
      subscriber = state.subscriber,
      context = state.context;
  var callbackFunc = params.callbackFunc,
      args = params.args,
      scheduler = params.scheduler;
  var subject = params.subject;

  if (!subject) {
    subject = params.subject = new _AsyncSubject__WEBPACK_IMPORTED_MODULE_1__["AsyncSubject"]();

    var handler = function () {
      var innerArgs = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        innerArgs[_i] = arguments[_i];
      }

      var err = innerArgs.shift();

      if (err) {
        _this.add(scheduler.schedule(dispatchError, 0, {
          err: err,
          subject: subject
        }));
      } else {
        var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;

        _this.add(scheduler.schedule(dispatchNext, 0, {
          value: value,
          subject: subject
        }));
      }
    };

    try {
      callbackFunc.apply(context, args.concat([handler]));
    } catch (err) {
      this.add(scheduler.schedule(dispatchError, 0, {
        err: err,
        subject: subject
      }));
    }
  }

  this.add(subject.subscribe(subscriber));
}

function dispatchNext(arg) {
  var value = arg.value,
      subject = arg.subject;
  subject.next(value);
  subject.complete();
}

function dispatchError(arg) {
  var err = arg.err,
      subject = arg.subject;
  subject.error(err);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/combineLatest.js ***!
  \**********************************************************************/
/*! exports provided: combineLatest, CombineLatestOperator, CombineLatestSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineLatest", function() { return combineLatest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CombineLatestOperator", function() { return CombineLatestOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CombineLatestSubscriber", function() { return CombineLatestSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../OuterSubscriber */ "./node_modules/rxjs/_esm5/internal/OuterSubscriber.js");
/* harmony import */ var _util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/subscribeToResult */ "./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js");
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fromArray */ "./node_modules/rxjs/_esm5/internal/observable/fromArray.js");
/** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */






var NONE = {};
function combineLatest() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  var resultSelector = undefined;
  var scheduler = undefined;

  if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_1__["isScheduler"])(observables[observables.length - 1])) {
    scheduler = observables.pop();
  }

  if (typeof observables[observables.length - 1] === 'function') {
    resultSelector = observables.pop();
  }

  if (observables.length === 1 && Object(_util_isArray__WEBPACK_IMPORTED_MODULE_2__["isArray"])(observables[0])) {
    observables = observables[0];
  }

  return Object(_fromArray__WEBPACK_IMPORTED_MODULE_5__["fromArray"])(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
}

var CombineLatestOperator = /*@__PURE__*/function () {
  function CombineLatestOperator(resultSelector) {
    this.resultSelector = resultSelector;
  }

  CombineLatestOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new CombineLatestSubscriber(subscriber, this.resultSelector));
  };

  return CombineLatestOperator;
}();



var CombineLatestSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CombineLatestSubscriber, _super);

  function CombineLatestSubscriber(destination, resultSelector) {
    var _this = _super.call(this, destination) || this;

    _this.resultSelector = resultSelector;
    _this.active = 0;
    _this.values = [];
    _this.observables = [];
    return _this;
  }

  CombineLatestSubscriber.prototype._next = function (observable) {
    this.values.push(NONE);
    this.observables.push(observable);
  };

  CombineLatestSubscriber.prototype._complete = function () {
    var observables = this.observables;
    var len = observables.length;

    if (len === 0) {
      this.destination.complete();
    } else {
      this.active = len;
      this.toRespond = len;

      for (var i = 0; i < len; i++) {
        var observable = observables[i];
        this.add(Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__["subscribeToResult"])(this, observable, undefined, i));
      }
    }
  };

  CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
    if ((this.active -= 1) === 0) {
      this.destination.complete();
    }
  };

  CombineLatestSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
    var values = this.values;
    var oldVal = values[outerIndex];
    var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
    values[outerIndex] = innerValue;

    if (toRespond === 0) {
      if (this.resultSelector) {
        this._tryResultSelector(values);
      } else {
        this.destination.next(values.slice());
      }
    }
  };

  CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
    var result;

    try {
      result = this.resultSelector.apply(this, values);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.next(result);
  };

  return CombineLatestSubscriber;
}(_OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__["OuterSubscriber"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/concat.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/concat.js ***!
  \***************************************************************/
/*! exports provided: concat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return concat; });
/* harmony import */ var _of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./of */ "./node_modules/rxjs/_esm5/internal/observable/of.js");
/* harmony import */ var _operators_concatAll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/concatAll */ "./node_modules/rxjs/_esm5/internal/operators/concatAll.js");
/** PURE_IMPORTS_START _of,_operators_concatAll PURE_IMPORTS_END */


function concat() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  return Object(_operators_concatAll__WEBPACK_IMPORTED_MODULE_1__["concatAll"])()(_of__WEBPACK_IMPORTED_MODULE_0__["of"].apply(void 0, observables));
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/defer.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/defer.js ***!
  \**************************************************************/
/*! exports provided: defer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defer", function() { return defer; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./from */ "./node_modules/rxjs/_esm5/internal/observable/from.js");
/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./empty */ "./node_modules/rxjs/_esm5/internal/observable/empty.js");
/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */



function defer(observableFactory) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    var input;

    try {
      input = observableFactory();
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }

    var source = input ? Object(_from__WEBPACK_IMPORTED_MODULE_1__["from"])(input) : Object(_empty__WEBPACK_IMPORTED_MODULE_2__["empty"])();
    return source.subscribe(subscriber);
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/empty.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/empty.js ***!
  \**************************************************************/
/*! exports provided: EMPTY, empty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY", function() { return EMPTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

var EMPTY = /*@__PURE__*/new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
  return subscriber.complete();
});
function empty(scheduler) {
  return scheduler ? emptyScheduled(scheduler) : EMPTY;
}

function emptyScheduled(scheduler) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    return scheduler.schedule(function () {
      return subscriber.complete();
    });
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/forkJoin.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/forkJoin.js ***!
  \*****************************************************************/
/*! exports provided: forkJoin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forkJoin", function() { return forkJoin; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/* harmony import */ var _util_isObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isObject */ "./node_modules/rxjs/_esm5/internal/util/isObject.js");
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./from */ "./node_modules/rxjs/_esm5/internal/observable/from.js");
/** PURE_IMPORTS_START _Observable,_util_isArray,_operators_map,_util_isObject,_from PURE_IMPORTS_END */





function forkJoin() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  if (sources.length === 1) {
    var first_1 = sources[0];

    if (Object(_util_isArray__WEBPACK_IMPORTED_MODULE_1__["isArray"])(first_1)) {
      return forkJoinInternal(first_1, null);
    }

    if (Object(_util_isObject__WEBPACK_IMPORTED_MODULE_3__["isObject"])(first_1) && Object.getPrototypeOf(first_1) === Object.prototype) {
      var keys = Object.keys(first_1);
      return forkJoinInternal(keys.map(function (key) {
        return first_1[key];
      }), keys);
    }
  }

  if (typeof sources[sources.length - 1] === 'function') {
    var resultSelector_1 = sources.pop();
    sources = sources.length === 1 && Object(_util_isArray__WEBPACK_IMPORTED_MODULE_1__["isArray"])(sources[0]) ? sources[0] : sources;
    return forkJoinInternal(sources, null).pipe(Object(_operators_map__WEBPACK_IMPORTED_MODULE_2__["map"])(function (args) {
      return resultSelector_1.apply(void 0, args);
    }));
  }

  return forkJoinInternal(sources, null);
}

function forkJoinInternal(sources, keys) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    var len = sources.length;

    if (len === 0) {
      subscriber.complete();
      return;
    }

    var values = new Array(len);
    var completed = 0;
    var emitted = 0;

    var _loop_1 = function (i) {
      var source = Object(_from__WEBPACK_IMPORTED_MODULE_4__["from"])(sources[i]);
      var hasValue = false;
      subscriber.add(source.subscribe({
        next: function (value) {
          if (!hasValue) {
            hasValue = true;
            emitted++;
          }

          values[i] = value;
        },
        error: function (err) {
          return subscriber.error(err);
        },
        complete: function () {
          completed++;

          if (completed === len || !hasValue) {
            if (emitted === len) {
              subscriber.next(keys ? keys.reduce(function (result, key, i) {
                return result[key] = values[i], result;
              }, {}) : values);
            }

            subscriber.complete();
          }
        }
      }));
    };

    for (var i = 0; i < len; i++) {
      _loop_1(i);
    }
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/from.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/from.js ***!
  \*************************************************************/
/*! exports provided: from */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return from; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _util_subscribeTo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/subscribeTo */ "./node_modules/rxjs/_esm5/internal/util/subscribeTo.js");
/* harmony import */ var _scheduled_scheduled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scheduled/scheduled */ "./node_modules/rxjs/_esm5/internal/scheduled/scheduled.js");
/** PURE_IMPORTS_START _Observable,_util_subscribeTo,_scheduled_scheduled PURE_IMPORTS_END */



function from(input, scheduler) {
  if (!scheduler) {
    if (input instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"]) {
      return input;
    }

    return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](Object(_util_subscribeTo__WEBPACK_IMPORTED_MODULE_1__["subscribeTo"])(input));
  } else {
    return Object(_scheduled_scheduled__WEBPACK_IMPORTED_MODULE_2__["scheduled"])(input, scheduler);
  }
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/fromArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/fromArray.js ***!
  \******************************************************************/
/*! exports provided: fromArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromArray", function() { return fromArray; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _util_subscribeToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/subscribeToArray */ "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js");
/* harmony import */ var _scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scheduled/scheduleArray */ "./node_modules/rxjs/_esm5/internal/scheduled/scheduleArray.js");
/** PURE_IMPORTS_START _Observable,_util_subscribeToArray,_scheduled_scheduleArray PURE_IMPORTS_END */



function fromArray(input, scheduler) {
  if (!scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](Object(_util_subscribeToArray__WEBPACK_IMPORTED_MODULE_1__["subscribeToArray"])(input));
  } else {
    return Object(_scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_2__["scheduleArray"])(input, scheduler);
  }
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/fromEvent.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/fromEvent.js ***!
  \******************************************************************/
/*! exports provided: fromEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return fromEvent; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/_esm5/internal/util/isFunction.js");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../operators/map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */





var toString = /*@__PURE__*/function () {
  return Object.prototype.toString;
}();

function fromEvent(target, eventName, options, resultSelector) {
  if (Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(options)) {
    resultSelector = options;
    options = undefined;
  }

  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(Object(_operators_map__WEBPACK_IMPORTED_MODULE_3__["map"])(function (args) {
      return Object(_util_isArray__WEBPACK_IMPORTED_MODULE_1__["isArray"])(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
    }));
  }

  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    function handler(e) {
      if (arguments.length > 1) {
        subscriber.next(Array.prototype.slice.call(arguments));
      } else {
        subscriber.next(e);
      }
    }

    setupSubscription(target, eventName, handler, subscriber, options);
  });
}

function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
  var unsubscribe;

  if (isEventTarget(sourceObj)) {
    var source_1 = sourceObj;
    sourceObj.addEventListener(eventName, handler, options);

    unsubscribe = function () {
      return source_1.removeEventListener(eventName, handler, options);
    };
  } else if (isJQueryStyleEventEmitter(sourceObj)) {
    var source_2 = sourceObj;
    sourceObj.on(eventName, handler);

    unsubscribe = function () {
      return source_2.off(eventName, handler);
    };
  } else if (isNodeStyleEventEmitter(sourceObj)) {
    var source_3 = sourceObj;
    sourceObj.addListener(eventName, handler);

    unsubscribe = function () {
      return source_3.removeListener(eventName, handler);
    };
  } else if (sourceObj && sourceObj.length) {
    for (var i = 0, len = sourceObj.length; i < len; i++) {
      setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
    }
  } else {
    throw new TypeError('Invalid event target');
  }

  subscriber.add(unsubscribe);
}

function isNodeStyleEventEmitter(sourceObj) {
  return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}

function isJQueryStyleEventEmitter(sourceObj) {
  return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}

function isEventTarget(sourceObj) {
  return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/fromEventPattern.js":
/*!*************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/fromEventPattern.js ***!
  \*************************************************************************/
/*! exports provided: fromEventPattern */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromEventPattern", function() { return fromEventPattern; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/_esm5/internal/util/isFunction.js");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../operators/map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */




function fromEventPattern(addHandler, removeHandler, resultSelector) {
  if (resultSelector) {
    return fromEventPattern(addHandler, removeHandler).pipe(Object(_operators_map__WEBPACK_IMPORTED_MODULE_3__["map"])(function (args) {
      return Object(_util_isArray__WEBPACK_IMPORTED_MODULE_1__["isArray"])(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
    }));
  }

  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    var handler = function () {
      var e = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        e[_i] = arguments[_i];
      }

      return subscriber.next(e.length === 1 ? e[0] : e);
    };

    var retValue;

    try {
      retValue = addHandler(handler);
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }

    if (!Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(removeHandler)) {
      return undefined;
    }

    return function () {
      return removeHandler(handler, retValue);
    };
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/generate.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/generate.js ***!
  \*****************************************************************/
/*! exports provided: generate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generate", function() { return generate; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/identity */ "./node_modules/rxjs/_esm5/internal/util/identity.js");
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js");
/** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */



function generate(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
  var resultSelector;
  var initialState;

  if (arguments.length == 1) {
    var options = initialStateOrOptions;
    initialState = options.initialState;
    condition = options.condition;
    iterate = options.iterate;
    resultSelector = options.resultSelector || _util_identity__WEBPACK_IMPORTED_MODULE_1__["identity"];
    scheduler = options.scheduler;
  } else if (resultSelectorOrObservable === undefined || Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_2__["isScheduler"])(resultSelectorOrObservable)) {
    initialState = initialStateOrOptions;
    resultSelector = _util_identity__WEBPACK_IMPORTED_MODULE_1__["identity"];
    scheduler = resultSelectorOrObservable;
  } else {
    initialState = initialStateOrOptions;
    resultSelector = resultSelectorOrObservable;
  }

  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    var state = initialState;

    if (scheduler) {
      return scheduler.schedule(dispatch, 0, {
        subscriber: subscriber,
        iterate: iterate,
        condition: condition,
        resultSelector: resultSelector,
        state: state
      });
    }

    do {
      if (condition) {
        var conditionResult = void 0;

        try {
          conditionResult = condition(state);
        } catch (err) {
          subscriber.error(err);
          return undefined;
        }

        if (!conditionResult) {
          subscriber.complete();
          break;
        }
      }

      var value = void 0;

      try {
        value = resultSelector(state);
      } catch (err) {
        subscriber.error(err);
        return undefined;
      }

      subscriber.next(value);

      if (subscriber.closed) {
        break;
      }

      try {
        state = iterate(state);
      } catch (err) {
        subscriber.error(err);
        return undefined;
      }
    } while (true);

    return undefined;
  });
}

function dispatch(state) {
  var subscriber = state.subscriber,
      condition = state.condition;

  if (subscriber.closed) {
    return undefined;
  }

  if (state.needIterate) {
    try {
      state.state = state.iterate(state.state);
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }
  } else {
    state.needIterate = true;
  }

  if (condition) {
    var conditionResult = void 0;

    try {
      conditionResult = condition(state.state);
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }

    if (!conditionResult) {
      subscriber.complete();
      return undefined;
    }

    if (subscriber.closed) {
      return undefined;
    }
  }

  var value;

  try {
    value = state.resultSelector(state.state);
  } catch (err) {
    subscriber.error(err);
    return undefined;
  }

  if (subscriber.closed) {
    return undefined;
  }

  subscriber.next(value);

  if (subscriber.closed) {
    return undefined;
  }

  return this.schedule(state);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/iif.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/iif.js ***!
  \************************************************************/
/*! exports provided: iif */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iif", function() { return iif; });
/* harmony import */ var _defer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defer */ "./node_modules/rxjs/_esm5/internal/observable/defer.js");
/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty */ "./node_modules/rxjs/_esm5/internal/observable/empty.js");
/** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */


function iif(condition, trueResult, falseResult) {
  if (trueResult === void 0) {
    trueResult = _empty__WEBPACK_IMPORTED_MODULE_1__["EMPTY"];
  }

  if (falseResult === void 0) {
    falseResult = _empty__WEBPACK_IMPORTED_MODULE_1__["EMPTY"];
  }

  return Object(_defer__WEBPACK_IMPORTED_MODULE_0__["defer"])(function () {
    return condition() ? trueResult : falseResult;
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/interval.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/interval.js ***!
  \*****************************************************************/
/*! exports provided: interval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return interval; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony import */ var _util_isNumeric__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isNumeric */ "./node_modules/rxjs/_esm5/internal/util/isNumeric.js");
/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */



function interval(period, scheduler) {
  if (period === void 0) {
    period = 0;
  }

  if (scheduler === void 0) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_1__["async"];
  }

  if (!Object(_util_isNumeric__WEBPACK_IMPORTED_MODULE_2__["isNumeric"])(period) || period < 0) {
    period = 0;
  }

  if (!scheduler || typeof scheduler.schedule !== 'function') {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_1__["async"];
  }

  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    subscriber.add(scheduler.schedule(dispatch, period, {
      subscriber: subscriber,
      counter: 0,
      period: period
    }));
    return subscriber;
  });
}

function dispatch(state) {
  var subscriber = state.subscriber,
      counter = state.counter,
      period = state.period;
  subscriber.next(counter);
  this.schedule({
    subscriber: subscriber,
    counter: counter + 1,
    period: period
  }, period);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/merge.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/merge.js ***!
  \**************************************************************/
/*! exports provided: merge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js");
/* harmony import */ var _operators_mergeAll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/mergeAll */ "./node_modules/rxjs/_esm5/internal/operators/mergeAll.js");
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fromArray */ "./node_modules/rxjs/_esm5/internal/observable/fromArray.js");
/** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */




function merge() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  var concurrent = Number.POSITIVE_INFINITY;
  var scheduler = null;
  var last = observables[observables.length - 1];

  if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_1__["isScheduler"])(last)) {
    scheduler = observables.pop();

    if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
      concurrent = observables.pop();
    }
  } else if (typeof last === 'number') {
    concurrent = observables.pop();
  }

  if (scheduler === null && observables.length === 1 && observables[0] instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"]) {
    return observables[0];
  }

  return Object(_operators_mergeAll__WEBPACK_IMPORTED_MODULE_2__["mergeAll"])(concurrent)(Object(_fromArray__WEBPACK_IMPORTED_MODULE_3__["fromArray"])(observables, scheduler));
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/never.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/never.js ***!
  \**************************************************************/
/*! exports provided: NEVER, never */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEVER", function() { return NEVER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "never", function() { return never; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/noop */ "./node_modules/rxjs/_esm5/internal/util/noop.js");
/** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */


var NEVER = /*@__PURE__*/new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](_util_noop__WEBPACK_IMPORTED_MODULE_1__["noop"]);
function never() {
  return NEVER;
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/of.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/of.js ***!
  \***********************************************************/
/*! exports provided: of */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "of", function() { return of; });
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js");
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fromArray */ "./node_modules/rxjs/_esm5/internal/observable/fromArray.js");
/* harmony import */ var _scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scheduled/scheduleArray */ "./node_modules/rxjs/_esm5/internal/scheduled/scheduleArray.js");
/** PURE_IMPORTS_START _util_isScheduler,_fromArray,_scheduled_scheduleArray PURE_IMPORTS_END */



function of() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var scheduler = args[args.length - 1];

  if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_0__["isScheduler"])(scheduler)) {
    args.pop();
    return Object(_scheduled_scheduleArray__WEBPACK_IMPORTED_MODULE_2__["scheduleArray"])(args, scheduler);
  } else {
    return Object(_fromArray__WEBPACK_IMPORTED_MODULE_1__["fromArray"])(args);
  }
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/onErrorResumeNext.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/onErrorResumeNext.js ***!
  \**************************************************************************/
/*! exports provided: onErrorResumeNext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onErrorResumeNext", function() { return onErrorResumeNext; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./from */ "./node_modules/rxjs/_esm5/internal/observable/from.js");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./empty */ "./node_modules/rxjs/_esm5/internal/observable/empty.js");
/** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */




function onErrorResumeNext() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  if (sources.length === 0) {
    return _empty__WEBPACK_IMPORTED_MODULE_3__["EMPTY"];
  }

  var first = sources[0],
      remainder = sources.slice(1);

  if (sources.length === 1 && Object(_util_isArray__WEBPACK_IMPORTED_MODULE_2__["isArray"])(first)) {
    return onErrorResumeNext.apply(void 0, first);
  }

  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    var subNext = function () {
      return subscriber.add(onErrorResumeNext.apply(void 0, remainder).subscribe(subscriber));
    };

    return Object(_from__WEBPACK_IMPORTED_MODULE_1__["from"])(first).subscribe({
      next: function (value) {
        subscriber.next(value);
      },
      error: subNext,
      complete: subNext
    });
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/pairs.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/pairs.js ***!
  \**************************************************************/
/*! exports provided: pairs, dispatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pairs", function() { return pairs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return dispatch; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */


function pairs(obj, scheduler) {
  if (!scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
      var keys = Object.keys(obj);

      for (var i = 0; i < keys.length && !subscriber.closed; i++) {
        var key = keys[i];

        if (obj.hasOwnProperty(key)) {
          subscriber.next([key, obj[key]]);
        }
      }

      subscriber.complete();
    });
  } else {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
      var keys = Object.keys(obj);
      var subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
      subscription.add(scheduler.schedule(dispatch, 0, {
        keys: keys,
        index: 0,
        subscriber: subscriber,
        subscription: subscription,
        obj: obj
      }));
      return subscription;
    });
  }
}
function dispatch(state) {
  var keys = state.keys,
      index = state.index,
      subscriber = state.subscriber,
      subscription = state.subscription,
      obj = state.obj;

  if (!subscriber.closed) {
    if (index < keys.length) {
      var key = keys[index];
      subscriber.next([key, obj[key]]);
      subscription.add(this.schedule({
        keys: keys,
        index: index + 1,
        subscriber: subscriber,
        subscription: subscription,
        obj: obj
      }));
    } else {
      subscriber.complete();
    }
  }
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/partition.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/partition.js ***!
  \******************************************************************/
/*! exports provided: partition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "partition", function() { return partition; });
/* harmony import */ var _util_not__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/not */ "./node_modules/rxjs/_esm5/internal/util/not.js");
/* harmony import */ var _util_subscribeTo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/subscribeTo */ "./node_modules/rxjs/_esm5/internal/util/subscribeTo.js");
/* harmony import */ var _operators_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/filter */ "./node_modules/rxjs/_esm5/internal/operators/filter.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/** PURE_IMPORTS_START _util_not,_util_subscribeTo,_operators_filter,_Observable PURE_IMPORTS_END */




function partition(source, predicate, thisArg) {
  return [Object(_operators_filter__WEBPACK_IMPORTED_MODULE_2__["filter"])(predicate, thisArg)(new _Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"](Object(_util_subscribeTo__WEBPACK_IMPORTED_MODULE_1__["subscribeTo"])(source))), Object(_operators_filter__WEBPACK_IMPORTED_MODULE_2__["filter"])(Object(_util_not__WEBPACK_IMPORTED_MODULE_0__["not"])(predicate, thisArg))(new _Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"](Object(_util_subscribeTo__WEBPACK_IMPORTED_MODULE_1__["subscribeTo"])(source)))];
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/race.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/race.js ***!
  \*************************************************************/
/*! exports provided: race, RaceOperator, RaceSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "race", function() { return race; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RaceOperator", function() { return RaceOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RaceSubscriber", function() { return RaceSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fromArray */ "./node_modules/rxjs/_esm5/internal/observable/fromArray.js");
/* harmony import */ var _OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../OuterSubscriber */ "./node_modules/rxjs/_esm5/internal/OuterSubscriber.js");
/* harmony import */ var _util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/subscribeToResult */ "./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js");
/** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function race() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  if (observables.length === 1) {
    if (Object(_util_isArray__WEBPACK_IMPORTED_MODULE_1__["isArray"])(observables[0])) {
      observables = observables[0];
    } else {
      return observables[0];
    }
  }

  return Object(_fromArray__WEBPACK_IMPORTED_MODULE_2__["fromArray"])(observables, undefined).lift(new RaceOperator());
}

var RaceOperator = /*@__PURE__*/function () {
  function RaceOperator() {}

  RaceOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new RaceSubscriber(subscriber));
  };

  return RaceOperator;
}();



var RaceSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RaceSubscriber, _super);

  function RaceSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.hasFirst = false;
    _this.observables = [];
    _this.subscriptions = [];
    return _this;
  }

  RaceSubscriber.prototype._next = function (observable) {
    this.observables.push(observable);
  };

  RaceSubscriber.prototype._complete = function () {
    var observables = this.observables;
    var len = observables.length;

    if (len === 0) {
      this.destination.complete();
    } else {
      for (var i = 0; i < len && !this.hasFirst; i++) {
        var observable = observables[i];
        var subscription = Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__["subscribeToResult"])(this, observable, undefined, i);

        if (this.subscriptions) {
          this.subscriptions.push(subscription);
        }

        this.add(subscription);
      }

      this.observables = null;
    }
  };

  RaceSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
    if (!this.hasFirst) {
      this.hasFirst = true;

      for (var i = 0; i < this.subscriptions.length; i++) {
        if (i !== outerIndex) {
          var subscription = this.subscriptions[i];
          subscription.unsubscribe();
          this.remove(subscription);
        }
      }

      this.subscriptions = null;
    }

    this.destination.next(innerValue);
  };

  return RaceSubscriber;
}(_OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__["OuterSubscriber"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/range.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/range.js ***!
  \**************************************************************/
/*! exports provided: range, dispatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return dispatch; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function range(start, count, scheduler) {
  if (start === void 0) {
    start = 0;
  }

  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    if (count === undefined) {
      count = start;
      start = 0;
    }

    var index = 0;
    var current = start;

    if (scheduler) {
      return scheduler.schedule(dispatch, 0, {
        index: index,
        count: count,
        start: start,
        subscriber: subscriber
      });
    } else {
      do {
        if (index++ >= count) {
          subscriber.complete();
          break;
        }

        subscriber.next(current++);

        if (subscriber.closed) {
          break;
        }
      } while (true);
    }

    return undefined;
  });
}
function dispatch(state) {
  var start = state.start,
      index = state.index,
      count = state.count,
      subscriber = state.subscriber;

  if (index >= count) {
    subscriber.complete();
    return;
  }

  subscriber.next(start);

  if (subscriber.closed) {
    return;
  }

  state.index = index + 1;
  state.start = start + 1;
  this.schedule(state);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/throwError.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/throwError.js ***!
  \*******************************************************************/
/*! exports provided: throwError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwError", function() { return throwError; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function throwError(error, scheduler) {
  if (!scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
      return subscriber.error(error);
    });
  } else {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
      return scheduler.schedule(dispatch, 0, {
        error: error,
        subscriber: subscriber
      });
    });
  }
}

function dispatch(_a) {
  var error = _a.error,
      subscriber = _a.subscriber;
  subscriber.error(error);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/timer.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/timer.js ***!
  \**************************************************************/
/*! exports provided: timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return timer; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony import */ var _util_isNumeric__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isNumeric */ "./node_modules/rxjs/_esm5/internal/util/isNumeric.js");
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js");
/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */




function timer(dueTime, periodOrScheduler, scheduler) {
  if (dueTime === void 0) {
    dueTime = 0;
  }

  var period = -1;

  if (Object(_util_isNumeric__WEBPACK_IMPORTED_MODULE_2__["isNumeric"])(periodOrScheduler)) {
    period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
  } else if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_3__["isScheduler"])(periodOrScheduler)) {
    scheduler = periodOrScheduler;
  }

  if (!Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_3__["isScheduler"])(scheduler)) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_1__["async"];
  }

  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    var due = Object(_util_isNumeric__WEBPACK_IMPORTED_MODULE_2__["isNumeric"])(dueTime) ? dueTime : +dueTime - scheduler.now();
    return scheduler.schedule(dispatch, due, {
      index: 0,
      period: period,
      subscriber: subscriber
    });
  });
}

function dispatch(state) {
  var index = state.index,
      period = state.period,
      subscriber = state.subscriber;
  subscriber.next(index);

  if (subscriber.closed) {
    return;
  } else if (period === -1) {
    return subscriber.complete();
  }

  state.index = index + 1;
  this.schedule(state, period);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/using.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/using.js ***!
  \**************************************************************/
/*! exports provided: using */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "using", function() { return using; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./from */ "./node_modules/rxjs/_esm5/internal/observable/from.js");
/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./empty */ "./node_modules/rxjs/_esm5/internal/observable/empty.js");
/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */



function using(resourceFactory, observableFactory) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    var resource;

    try {
      resource = resourceFactory();
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }

    var result;

    try {
      result = observableFactory(resource);
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }

    var source = result ? Object(_from__WEBPACK_IMPORTED_MODULE_1__["from"])(result) : _empty__WEBPACK_IMPORTED_MODULE_2__["EMPTY"];
    var subscription = source.subscribe(subscriber);
    return function () {
      subscription.unsubscribe();

      if (resource) {
        resource.unsubscribe();
      }
    };
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/zip.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/zip.js ***!
  \************************************************************/
/*! exports provided: zip, ZipOperator, ZipSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return zip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZipOperator", function() { return ZipOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZipSubscriber", function() { return ZipSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fromArray */ "./node_modules/rxjs/_esm5/internal/observable/fromArray.js");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../internal/symbol/iterator */ "./node_modules/rxjs/_esm5/internal/symbol/iterator.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_.._internal_symbol_iterator,_innerSubscribe PURE_IMPORTS_END */






function zip() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  var resultSelector = observables[observables.length - 1];

  if (typeof resultSelector === 'function') {
    observables.pop();
  }

  return Object(_fromArray__WEBPACK_IMPORTED_MODULE_1__["fromArray"])(observables, undefined).lift(new ZipOperator(resultSelector));
}

var ZipOperator = /*@__PURE__*/function () {
  function ZipOperator(resultSelector) {
    this.resultSelector = resultSelector;
  }

  ZipOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new ZipSubscriber(subscriber, this.resultSelector));
  };

  return ZipOperator;
}();



var ZipSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ZipSubscriber, _super);

  function ZipSubscriber(destination, resultSelector, values) {
    if (values === void 0) {
      values = Object.create(null);
    }

    var _this = _super.call(this, destination) || this;

    _this.resultSelector = resultSelector;
    _this.iterators = [];
    _this.active = 0;
    _this.resultSelector = typeof resultSelector === 'function' ? resultSelector : undefined;
    return _this;
  }

  ZipSubscriber.prototype._next = function (value) {
    var iterators = this.iterators;

    if (Object(_util_isArray__WEBPACK_IMPORTED_MODULE_2__["isArray"])(value)) {
      iterators.push(new StaticArrayIterator(value));
    } else if (typeof value[_internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_4__["iterator"]] === 'function') {
      iterators.push(new StaticIterator(value[_internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_4__["iterator"]]()));
    } else {
      iterators.push(new ZipBufferIterator(this.destination, this, value));
    }
  };

  ZipSubscriber.prototype._complete = function () {
    var iterators = this.iterators;
    var len = iterators.length;
    this.unsubscribe();

    if (len === 0) {
      this.destination.complete();
      return;
    }

    this.active = len;

    for (var i = 0; i < len; i++) {
      var iterator = iterators[i];

      if (iterator.stillUnsubscribed) {
        var destination = this.destination;
        destination.add(iterator.subscribe());
      } else {
        this.active--;
      }
    }
  };

  ZipSubscriber.prototype.notifyInactive = function () {
    this.active--;

    if (this.active === 0) {
      this.destination.complete();
    }
  };

  ZipSubscriber.prototype.checkIterators = function () {
    var iterators = this.iterators;
    var len = iterators.length;
    var destination = this.destination;

    for (var i = 0; i < len; i++) {
      var iterator = iterators[i];

      if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
        return;
      }
    }

    var shouldComplete = false;
    var args = [];

    for (var i = 0; i < len; i++) {
      var iterator = iterators[i];
      var result = iterator.next();

      if (iterator.hasCompleted()) {
        shouldComplete = true;
      }

      if (result.done) {
        destination.complete();
        return;
      }

      args.push(result.value);
    }

    if (this.resultSelector) {
      this._tryresultSelector(args);
    } else {
      destination.next(args);
    }

    if (shouldComplete) {
      destination.complete();
    }
  };

  ZipSubscriber.prototype._tryresultSelector = function (args) {
    var result;

    try {
      result = this.resultSelector.apply(this, args);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.next(result);
  };

  return ZipSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_3__["Subscriber"]);



var StaticIterator = /*@__PURE__*/function () {
  function StaticIterator(iterator) {
    this.iterator = iterator;
    this.nextResult = iterator.next();
  }

  StaticIterator.prototype.hasValue = function () {
    return true;
  };

  StaticIterator.prototype.next = function () {
    var result = this.nextResult;
    this.nextResult = this.iterator.next();
    return result;
  };

  StaticIterator.prototype.hasCompleted = function () {
    var nextResult = this.nextResult;
    return Boolean(nextResult && nextResult.done);
  };

  return StaticIterator;
}();

var StaticArrayIterator = /*@__PURE__*/function () {
  function StaticArrayIterator(array) {
    this.array = array;
    this.index = 0;
    this.length = 0;
    this.length = array.length;
  }

  StaticArrayIterator.prototype[_internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_4__["iterator"]] = function () {
    return this;
  };

  StaticArrayIterator.prototype.next = function (value) {
    var i = this.index++;
    var array = this.array;
    return i < this.length ? {
      value: array[i],
      done: false
    } : {
      value: null,
      done: true
    };
  };

  StaticArrayIterator.prototype.hasValue = function () {
    return this.array.length > this.index;
  };

  StaticArrayIterator.prototype.hasCompleted = function () {
    return this.array.length === this.index;
  };

  return StaticArrayIterator;
}();

var ZipBufferIterator = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ZipBufferIterator, _super);

  function ZipBufferIterator(destination, parent, observable) {
    var _this = _super.call(this, destination) || this;

    _this.parent = parent;
    _this.observable = observable;
    _this.stillUnsubscribed = true;
    _this.buffer = [];
    _this.isComplete = false;
    return _this;
  }

  ZipBufferIterator.prototype[_internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_4__["iterator"]] = function () {
    return this;
  };

  ZipBufferIterator.prototype.next = function () {
    var buffer = this.buffer;

    if (buffer.length === 0 && this.isComplete) {
      return {
        value: null,
        done: true
      };
    } else {
      return {
        value: buffer.shift(),
        done: false
      };
    }
  };

  ZipBufferIterator.prototype.hasValue = function () {
    return this.buffer.length > 0;
  };

  ZipBufferIterator.prototype.hasCompleted = function () {
    return this.buffer.length === 0 && this.isComplete;
  };

  ZipBufferIterator.prototype.notifyComplete = function () {
    if (this.buffer.length > 0) {
      this.isComplete = true;
      this.parent.notifyInactive();
    } else {
      this.destination.complete();
    }
  };

  ZipBufferIterator.prototype.notifyNext = function (innerValue) {
    this.buffer.push(innerValue);
    this.parent.checkIterators();
  };

  ZipBufferIterator.prototype.subscribe = function () {
    return Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_5__["innerSubscribe"])(this.observable, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_5__["SimpleInnerSubscriber"](this));
  };

  return ZipBufferIterator;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_5__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/audit.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/audit.js ***!
  \*************************************************************/
/*! exports provided: audit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "audit", function() { return audit; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function audit(durationSelector) {
  return function auditOperatorFunction(source) {
    return source.lift(new AuditOperator(durationSelector));
  };
}

var AuditOperator = /*@__PURE__*/function () {
  function AuditOperator(durationSelector) {
    this.durationSelector = durationSelector;
  }

  AuditOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
  };

  return AuditOperator;
}();

var AuditSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AuditSubscriber, _super);

  function AuditSubscriber(destination, durationSelector) {
    var _this = _super.call(this, destination) || this;

    _this.durationSelector = durationSelector;
    _this.hasValue = false;
    return _this;
  }

  AuditSubscriber.prototype._next = function (value) {
    this.value = value;
    this.hasValue = true;

    if (!this.throttled) {
      var duration = void 0;

      try {
        var durationSelector = this.durationSelector;
        duration = durationSelector(value);
      } catch (err) {
        return this.destination.error(err);
      }

      var innerSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(duration, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](this));

      if (!innerSubscription || innerSubscription.closed) {
        this.clearThrottle();
      } else {
        this.add(this.throttled = innerSubscription);
      }
    }
  };

  AuditSubscriber.prototype.clearThrottle = function () {
    var _a = this,
        value = _a.value,
        hasValue = _a.hasValue,
        throttled = _a.throttled;

    if (throttled) {
      this.remove(throttled);
      this.throttled = undefined;
      throttled.unsubscribe();
    }

    if (hasValue) {
      this.value = undefined;
      this.hasValue = false;
      this.destination.next(value);
    }
  };

  AuditSubscriber.prototype.notifyNext = function () {
    this.clearThrottle();
  };

  AuditSubscriber.prototype.notifyComplete = function () {
    this.clearThrottle();
  };

  return AuditSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/auditTime.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/auditTime.js ***!
  \*****************************************************************/
/*! exports provided: auditTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auditTime", function() { return auditTime; });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony import */ var _audit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audit */ "./node_modules/rxjs/_esm5/internal/operators/audit.js");
/* harmony import */ var _observable_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/timer */ "./node_modules/rxjs/_esm5/internal/observable/timer.js");
/** PURE_IMPORTS_START _scheduler_async,_audit,_observable_timer PURE_IMPORTS_END */



function auditTime(duration, scheduler) {
  if (scheduler === void 0) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__["async"];
  }

  return Object(_audit__WEBPACK_IMPORTED_MODULE_1__["audit"])(function () {
    return Object(_observable_timer__WEBPACK_IMPORTED_MODULE_2__["timer"])(duration, scheduler);
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/buffer.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/buffer.js ***!
  \**************************************************************/
/*! exports provided: buffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buffer", function() { return buffer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function buffer(closingNotifier) {
  return function bufferOperatorFunction(source) {
    return source.lift(new BufferOperator(closingNotifier));
  };
}

var BufferOperator = /*@__PURE__*/function () {
  function BufferOperator(closingNotifier) {
    this.closingNotifier = closingNotifier;
  }

  BufferOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
  };

  return BufferOperator;
}();

var BufferSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BufferSubscriber, _super);

  function BufferSubscriber(destination, closingNotifier) {
    var _this = _super.call(this, destination) || this;

    _this.buffer = [];

    _this.add(Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(closingNotifier, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](_this)));

    return _this;
  }

  BufferSubscriber.prototype._next = function (value) {
    this.buffer.push(value);
  };

  BufferSubscriber.prototype.notifyNext = function () {
    var buffer = this.buffer;
    this.buffer = [];
    this.destination.next(buffer);
  };

  return BufferSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/bufferCount.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/bufferCount.js ***!
  \*******************************************************************/
/*! exports provided: bufferCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bufferCount", function() { return bufferCount; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function bufferCount(bufferSize, startBufferEvery) {
  if (startBufferEvery === void 0) {
    startBufferEvery = null;
  }

  return function bufferCountOperatorFunction(source) {
    return source.lift(new BufferCountOperator(bufferSize, startBufferEvery));
  };
}

var BufferCountOperator = /*@__PURE__*/function () {
  function BufferCountOperator(bufferSize, startBufferEvery) {
    this.bufferSize = bufferSize;
    this.startBufferEvery = startBufferEvery;

    if (!startBufferEvery || bufferSize === startBufferEvery) {
      this.subscriberClass = BufferCountSubscriber;
    } else {
      this.subscriberClass = BufferSkipCountSubscriber;
    }
  }

  BufferCountOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
  };

  return BufferCountOperator;
}();

var BufferCountSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BufferCountSubscriber, _super);

  function BufferCountSubscriber(destination, bufferSize) {
    var _this = _super.call(this, destination) || this;

    _this.bufferSize = bufferSize;
    _this.buffer = [];
    return _this;
  }

  BufferCountSubscriber.prototype._next = function (value) {
    var buffer = this.buffer;
    buffer.push(value);

    if (buffer.length == this.bufferSize) {
      this.destination.next(buffer);
      this.buffer = [];
    }
  };

  BufferCountSubscriber.prototype._complete = function () {
    var buffer = this.buffer;

    if (buffer.length > 0) {
      this.destination.next(buffer);
    }

    _super.prototype._complete.call(this);
  };

  return BufferCountSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

var BufferSkipCountSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BufferSkipCountSubscriber, _super);

  function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
    var _this = _super.call(this, destination) || this;

    _this.bufferSize = bufferSize;
    _this.startBufferEvery = startBufferEvery;
    _this.buffers = [];
    _this.count = 0;
    return _this;
  }

  BufferSkipCountSubscriber.prototype._next = function (value) {
    var _a = this,
        bufferSize = _a.bufferSize,
        startBufferEvery = _a.startBufferEvery,
        buffers = _a.buffers,
        count = _a.count;

    this.count++;

    if (count % startBufferEvery === 0) {
      buffers.push([]);
    }

    for (var i = buffers.length; i--;) {
      var buffer = buffers[i];
      buffer.push(value);

      if (buffer.length === bufferSize) {
        buffers.splice(i, 1);
        this.destination.next(buffer);
      }
    }
  };

  BufferSkipCountSubscriber.prototype._complete = function () {
    var _a = this,
        buffers = _a.buffers,
        destination = _a.destination;

    while (buffers.length > 0) {
      var buffer = buffers.shift();

      if (buffer.length > 0) {
        destination.next(buffer);
      }
    }

    _super.prototype._complete.call(this);
  };

  return BufferSkipCountSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/bufferTime.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/bufferTime.js ***!
  \******************************************************************/
/*! exports provided: bufferTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bufferTime", function() { return bufferTime; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js");
/** PURE_IMPORTS_START tslib,_scheduler_async,_Subscriber,_util_isScheduler PURE_IMPORTS_END */




function bufferTime(bufferTimeSpan) {
  var length = arguments.length;
  var scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_1__["async"];

  if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_3__["isScheduler"])(arguments[arguments.length - 1])) {
    scheduler = arguments[arguments.length - 1];
    length--;
  }

  var bufferCreationInterval = null;

  if (length >= 2) {
    bufferCreationInterval = arguments[1];
  }

  var maxBufferSize = Number.POSITIVE_INFINITY;

  if (length >= 3) {
    maxBufferSize = arguments[2];
  }

  return function bufferTimeOperatorFunction(source) {
    return source.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
  };
}

var BufferTimeOperator = /*@__PURE__*/function () {
  function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
    this.bufferTimeSpan = bufferTimeSpan;
    this.bufferCreationInterval = bufferCreationInterval;
    this.maxBufferSize = maxBufferSize;
    this.scheduler = scheduler;
  }

  BufferTimeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
  };

  return BufferTimeOperator;
}();

var Context = /*@__PURE__*/function () {
  function Context() {
    this.buffer = [];
  }

  return Context;
}();

var BufferTimeSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BufferTimeSubscriber, _super);

  function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.bufferTimeSpan = bufferTimeSpan;
    _this.bufferCreationInterval = bufferCreationInterval;
    _this.maxBufferSize = maxBufferSize;
    _this.scheduler = scheduler;
    _this.contexts = [];

    var context = _this.openContext();

    _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;

    if (_this.timespanOnly) {
      var timeSpanOnlyState = {
        subscriber: _this,
        context: context,
        bufferTimeSpan: bufferTimeSpan
      };

      _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
    } else {
      var closeState = {
        subscriber: _this,
        context: context
      };
      var creationState = {
        bufferTimeSpan: bufferTimeSpan,
        bufferCreationInterval: bufferCreationInterval,
        subscriber: _this,
        scheduler: scheduler
      };

      _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));

      _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
    }

    return _this;
  }

  BufferTimeSubscriber.prototype._next = function (value) {
    var contexts = this.contexts;
    var len = contexts.length;
    var filledBufferContext;

    for (var i = 0; i < len; i++) {
      var context_1 = contexts[i];
      var buffer = context_1.buffer;
      buffer.push(value);

      if (buffer.length == this.maxBufferSize) {
        filledBufferContext = context_1;
      }
    }

    if (filledBufferContext) {
      this.onBufferFull(filledBufferContext);
    }
  };

  BufferTimeSubscriber.prototype._error = function (err) {
    this.contexts.length = 0;

    _super.prototype._error.call(this, err);
  };

  BufferTimeSubscriber.prototype._complete = function () {
    var _a = this,
        contexts = _a.contexts,
        destination = _a.destination;

    while (contexts.length > 0) {
      var context_2 = contexts.shift();
      destination.next(context_2.buffer);
    }

    _super.prototype._complete.call(this);
  };

  BufferTimeSubscriber.prototype._unsubscribe = function () {
    this.contexts = null;
  };

  BufferTimeSubscriber.prototype.onBufferFull = function (context) {
    this.closeContext(context);
    var closeAction = context.closeAction;
    closeAction.unsubscribe();
    this.remove(closeAction);

    if (!this.closed && this.timespanOnly) {
      context = this.openContext();
      var bufferTimeSpan = this.bufferTimeSpan;
      var timeSpanOnlyState = {
        subscriber: this,
        context: context,
        bufferTimeSpan: bufferTimeSpan
      };
      this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
    }
  };

  BufferTimeSubscriber.prototype.openContext = function () {
    var context = new Context();
    this.contexts.push(context);
    return context;
  };

  BufferTimeSubscriber.prototype.closeContext = function (context) {
    this.destination.next(context.buffer);
    var contexts = this.contexts;
    var spliceIndex = contexts ? contexts.indexOf(context) : -1;

    if (spliceIndex >= 0) {
      contexts.splice(contexts.indexOf(context), 1);
    }
  };

  return BufferTimeSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_2__["Subscriber"]);

function dispatchBufferTimeSpanOnly(state) {
  var subscriber = state.subscriber;
  var prevContext = state.context;

  if (prevContext) {
    subscriber.closeContext(prevContext);
  }

  if (!subscriber.closed) {
    state.context = subscriber.openContext();
    state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
  }
}

function dispatchBufferCreation(state) {
  var bufferCreationInterval = state.bufferCreationInterval,
      bufferTimeSpan = state.bufferTimeSpan,
      subscriber = state.subscriber,
      scheduler = state.scheduler;
  var context = subscriber.openContext();
  var action = this;

  if (!subscriber.closed) {
    subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, {
      subscriber: subscriber,
      context: context
    }));
    action.schedule(state, bufferCreationInterval);
  }
}

function dispatchBufferClose(arg) {
  var subscriber = arg.subscriber,
      context = arg.context;
  subscriber.closeContext(context);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/bufferToggle.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/bufferToggle.js ***!
  \********************************************************************/
/*! exports provided: bufferToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bufferToggle", function() { return bufferToggle; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _util_subscribeToResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/subscribeToResult */ "./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js");
/* harmony import */ var _OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../OuterSubscriber */ "./node_modules/rxjs/_esm5/internal/OuterSubscriber.js");
/** PURE_IMPORTS_START tslib,_Subscription,_util_subscribeToResult,_OuterSubscriber PURE_IMPORTS_END */




function bufferToggle(openings, closingSelector) {
  return function bufferToggleOperatorFunction(source) {
    return source.lift(new BufferToggleOperator(openings, closingSelector));
  };
}

var BufferToggleOperator = /*@__PURE__*/function () {
  function BufferToggleOperator(openings, closingSelector) {
    this.openings = openings;
    this.closingSelector = closingSelector;
  }

  BufferToggleOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
  };

  return BufferToggleOperator;
}();

var BufferToggleSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BufferToggleSubscriber, _super);

  function BufferToggleSubscriber(destination, openings, closingSelector) {
    var _this = _super.call(this, destination) || this;

    _this.closingSelector = closingSelector;
    _this.contexts = [];

    _this.add(Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_2__["subscribeToResult"])(_this, openings));

    return _this;
  }

  BufferToggleSubscriber.prototype._next = function (value) {
    var contexts = this.contexts;
    var len = contexts.length;

    for (var i = 0; i < len; i++) {
      contexts[i].buffer.push(value);
    }
  };

  BufferToggleSubscriber.prototype._error = function (err) {
    var contexts = this.contexts;

    while (contexts.length > 0) {
      var context_1 = contexts.shift();
      context_1.subscription.unsubscribe();
      context_1.buffer = null;
      context_1.subscription = null;
    }

    this.contexts = null;

    _super.prototype._error.call(this, err);
  };

  BufferToggleSubscriber.prototype._complete = function () {
    var contexts = this.contexts;

    while (contexts.length > 0) {
      var context_2 = contexts.shift();
      this.destination.next(context_2.buffer);
      context_2.subscription.unsubscribe();
      context_2.buffer = null;
      context_2.subscription = null;
    }

    this.contexts = null;

    _super.prototype._complete.call(this);
  };

  BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue) {
    outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
  };

  BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
    this.closeBuffer(innerSub.context);
  };

  BufferToggleSubscriber.prototype.openBuffer = function (value) {
    try {
      var closingSelector = this.closingSelector;
      var closingNotifier = closingSelector.call(this, value);

      if (closingNotifier) {
        this.trySubscribe(closingNotifier);
      }
    } catch (err) {
      this._error(err);
    }
  };

  BufferToggleSubscriber.prototype.closeBuffer = function (context) {
    var contexts = this.contexts;

    if (contexts && context) {
      var buffer = context.buffer,
          subscription = context.subscription;
      this.destination.next(buffer);
      contexts.splice(contexts.indexOf(context), 1);
      this.remove(subscription);
      subscription.unsubscribe();
    }
  };

  BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
    var contexts = this.contexts;
    var buffer = [];
    var subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
    var context = {
      buffer: buffer,
      subscription: subscription
    };
    contexts.push(context);
    var innerSubscription = Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_2__["subscribeToResult"])(this, closingNotifier, context);

    if (!innerSubscription || innerSubscription.closed) {
      this.closeBuffer(context);
    } else {
      innerSubscription.context = context;
      this.add(innerSubscription);
      subscription.add(innerSubscription);
    }
  };

  return BufferToggleSubscriber;
}(_OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__["OuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/bufferWhen.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/bufferWhen.js ***!
  \******************************************************************/
/*! exports provided: bufferWhen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bufferWhen", function() { return bufferWhen; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_Subscription,_innerSubscribe PURE_IMPORTS_END */



function bufferWhen(closingSelector) {
  return function (source) {
    return source.lift(new BufferWhenOperator(closingSelector));
  };
}

var BufferWhenOperator = /*@__PURE__*/function () {
  function BufferWhenOperator(closingSelector) {
    this.closingSelector = closingSelector;
  }

  BufferWhenOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
  };

  return BufferWhenOperator;
}();

var BufferWhenSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BufferWhenSubscriber, _super);

  function BufferWhenSubscriber(destination, closingSelector) {
    var _this = _super.call(this, destination) || this;

    _this.closingSelector = closingSelector;
    _this.subscribing = false;

    _this.openBuffer();

    return _this;
  }

  BufferWhenSubscriber.prototype._next = function (value) {
    this.buffer.push(value);
  };

  BufferWhenSubscriber.prototype._complete = function () {
    var buffer = this.buffer;

    if (buffer) {
      this.destination.next(buffer);
    }

    _super.prototype._complete.call(this);
  };

  BufferWhenSubscriber.prototype._unsubscribe = function () {
    this.buffer = undefined;
    this.subscribing = false;
  };

  BufferWhenSubscriber.prototype.notifyNext = function () {
    this.openBuffer();
  };

  BufferWhenSubscriber.prototype.notifyComplete = function () {
    if (this.subscribing) {
      this.complete();
    } else {
      this.openBuffer();
    }
  };

  BufferWhenSubscriber.prototype.openBuffer = function () {
    var closingSubscription = this.closingSubscription;

    if (closingSubscription) {
      this.remove(closingSubscription);
      closingSubscription.unsubscribe();
    }

    var buffer = this.buffer;

    if (this.buffer) {
      this.destination.next(buffer);
    }

    this.buffer = [];
    var closingNotifier;

    try {
      var closingSelector = this.closingSelector;
      closingNotifier = closingSelector();
    } catch (err) {
      return this.error(err);
    }

    closingSubscription = new _Subscription__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
    this.closingSubscription = closingSubscription;
    this.add(closingSubscription);
    this.subscribing = true;
    closingSubscription.add(Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["innerSubscribe"])(closingNotifier, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["SimpleInnerSubscriber"](this)));
    this.subscribing = false;
  };

  return BufferWhenSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/catchError.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/catchError.js ***!
  \******************************************************************/
/*! exports provided: catchError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "catchError", function() { return catchError; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function catchError(selector) {
  return function catchErrorOperatorFunction(source) {
    var operator = new CatchOperator(selector);
    var caught = source.lift(operator);
    return operator.caught = caught;
  };
}

var CatchOperator = /*@__PURE__*/function () {
  function CatchOperator(selector) {
    this.selector = selector;
  }

  CatchOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
  };

  return CatchOperator;
}();

var CatchSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CatchSubscriber, _super);

  function CatchSubscriber(destination, selector, caught) {
    var _this = _super.call(this, destination) || this;

    _this.selector = selector;
    _this.caught = caught;
    return _this;
  }

  CatchSubscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      var result = void 0;

      try {
        result = this.selector(err, this.caught);
      } catch (err2) {
        _super.prototype.error.call(this, err2);

        return;
      }

      this._unsubscribeAndRecycle();

      var innerSubscriber = new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](this);
      this.add(innerSubscriber);
      var innerSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(result, innerSubscriber);

      if (innerSubscription !== innerSubscriber) {
        this.add(innerSubscription);
      }
    }
  };

  return CatchSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/combineAll.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/combineAll.js ***!
  \******************************************************************/
/*! exports provided: combineAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineAll", function() { return combineAll; });
/* harmony import */ var _observable_combineLatest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/combineLatest */ "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js");
/** PURE_IMPORTS_START _observable_combineLatest PURE_IMPORTS_END */

function combineAll(project) {
  return function (source) {
    return source.lift(new _observable_combineLatest__WEBPACK_IMPORTED_MODULE_0__["CombineLatestOperator"](project));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/combineLatest.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/combineLatest.js ***!
  \*********************************************************************/
/*! exports provided: combineLatest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineLatest", function() { return combineLatest; });
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _observable_combineLatest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../observable/combineLatest */ "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js");
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/from */ "./node_modules/rxjs/_esm5/internal/observable/from.js");
/** PURE_IMPORTS_START _util_isArray,_observable_combineLatest,_observable_from PURE_IMPORTS_END */



var none = {};
function combineLatest() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  var project = null;

  if (typeof observables[observables.length - 1] === 'function') {
    project = observables.pop();
  }

  if (observables.length === 1 && Object(_util_isArray__WEBPACK_IMPORTED_MODULE_0__["isArray"])(observables[0])) {
    observables = observables[0].slice();
  }

  return function (source) {
    return source.lift.call(Object(_observable_from__WEBPACK_IMPORTED_MODULE_2__["from"])([source].concat(observables)), new _observable_combineLatest__WEBPACK_IMPORTED_MODULE_1__["CombineLatestOperator"](project));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/concat.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/concat.js ***!
  \**************************************************************/
/*! exports provided: concat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return concat; });
/* harmony import */ var _observable_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/concat */ "./node_modules/rxjs/_esm5/internal/observable/concat.js");
/** PURE_IMPORTS_START _observable_concat PURE_IMPORTS_END */

function concat() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  return function (source) {
    return source.lift.call(_observable_concat__WEBPACK_IMPORTED_MODULE_0__["concat"].apply(void 0, [source].concat(observables)));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/concatAll.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/concatAll.js ***!
  \*****************************************************************/
/*! exports provided: concatAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concatAll", function() { return concatAll; });
/* harmony import */ var _mergeAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeAll */ "./node_modules/rxjs/_esm5/internal/operators/mergeAll.js");
/** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

function concatAll() {
  return Object(_mergeAll__WEBPACK_IMPORTED_MODULE_0__["mergeAll"])(1);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/concatMap.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/concatMap.js ***!
  \*****************************************************************/
/*! exports provided: concatMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concatMap", function() { return concatMap; });
/* harmony import */ var _mergeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeMap */ "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js");
/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

function concatMap(project, resultSelector) {
  return Object(_mergeMap__WEBPACK_IMPORTED_MODULE_0__["mergeMap"])(project, resultSelector, 1);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/concatMapTo.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/concatMapTo.js ***!
  \*******************************************************************/
/*! exports provided: concatMapTo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concatMapTo", function() { return concatMapTo; });
/* harmony import */ var _concatMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./concatMap */ "./node_modules/rxjs/_esm5/internal/operators/concatMap.js");
/** PURE_IMPORTS_START _concatMap PURE_IMPORTS_END */

function concatMapTo(innerObservable, resultSelector) {
  return Object(_concatMap__WEBPACK_IMPORTED_MODULE_0__["concatMap"])(function () {
    return innerObservable;
  }, resultSelector);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/count.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/count.js ***!
  \*************************************************************/
/*! exports provided: count */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "count", function() { return count; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function count(predicate) {
  return function (source) {
    return source.lift(new CountOperator(predicate, source));
  };
}

var CountOperator = /*@__PURE__*/function () {
  function CountOperator(predicate, source) {
    this.predicate = predicate;
    this.source = source;
  }

  CountOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
  };

  return CountOperator;
}();

var CountSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CountSubscriber, _super);

  function CountSubscriber(destination, predicate, source) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.source = source;
    _this.count = 0;
    _this.index = 0;
    return _this;
  }

  CountSubscriber.prototype._next = function (value) {
    if (this.predicate) {
      this._tryPredicate(value);
    } else {
      this.count++;
    }
  };

  CountSubscriber.prototype._tryPredicate = function (value) {
    var result;

    try {
      result = this.predicate(value, this.index++, this.source);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    if (result) {
      this.count++;
    }
  };

  CountSubscriber.prototype._complete = function () {
    this.destination.next(this.count);
    this.destination.complete();
  };

  return CountSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/debounce.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/debounce.js ***!
  \****************************************************************/
/*! exports provided: debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function debounce(durationSelector) {
  return function (source) {
    return source.lift(new DebounceOperator(durationSelector));
  };
}

var DebounceOperator = /*@__PURE__*/function () {
  function DebounceOperator(durationSelector) {
    this.durationSelector = durationSelector;
  }

  DebounceOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
  };

  return DebounceOperator;
}();

var DebounceSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DebounceSubscriber, _super);

  function DebounceSubscriber(destination, durationSelector) {
    var _this = _super.call(this, destination) || this;

    _this.durationSelector = durationSelector;
    _this.hasValue = false;
    return _this;
  }

  DebounceSubscriber.prototype._next = function (value) {
    try {
      var result = this.durationSelector.call(this, value);

      if (result) {
        this._tryNext(value, result);
      }
    } catch (err) {
      this.destination.error(err);
    }
  };

  DebounceSubscriber.prototype._complete = function () {
    this.emitValue();
    this.destination.complete();
  };

  DebounceSubscriber.prototype._tryNext = function (value, duration) {
    var subscription = this.durationSubscription;
    this.value = value;
    this.hasValue = true;

    if (subscription) {
      subscription.unsubscribe();
      this.remove(subscription);
    }

    subscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(duration, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](this));

    if (subscription && !subscription.closed) {
      this.add(this.durationSubscription = subscription);
    }
  };

  DebounceSubscriber.prototype.notifyNext = function () {
    this.emitValue();
  };

  DebounceSubscriber.prototype.notifyComplete = function () {
    this.emitValue();
  };

  DebounceSubscriber.prototype.emitValue = function () {
    if (this.hasValue) {
      var value = this.value;
      var subscription = this.durationSubscription;

      if (subscription) {
        this.durationSubscription = undefined;
        subscription.unsubscribe();
        this.remove(subscription);
      }

      this.value = undefined;
      this.hasValue = false;

      _super.prototype._next.call(this, value);
    }
  };

  return DebounceSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/debounceTime.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/debounceTime.js ***!
  \********************************************************************/
/*! exports provided: debounceTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounceTime", function() { return debounceTime; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */



function debounceTime(dueTime, scheduler) {
  if (scheduler === void 0) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_2__["async"];
  }

  return function (source) {
    return source.lift(new DebounceTimeOperator(dueTime, scheduler));
  };
}

var DebounceTimeOperator = /*@__PURE__*/function () {
  function DebounceTimeOperator(dueTime, scheduler) {
    this.dueTime = dueTime;
    this.scheduler = scheduler;
  }

  DebounceTimeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
  };

  return DebounceTimeOperator;
}();

var DebounceTimeSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DebounceTimeSubscriber, _super);

  function DebounceTimeSubscriber(destination, dueTime, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.dueTime = dueTime;
    _this.scheduler = scheduler;
    _this.debouncedSubscription = null;
    _this.lastValue = null;
    _this.hasValue = false;
    return _this;
  }

  DebounceTimeSubscriber.prototype._next = function (value) {
    this.clearDebounce();
    this.lastValue = value;
    this.hasValue = true;
    this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
  };

  DebounceTimeSubscriber.prototype._complete = function () {
    this.debouncedNext();
    this.destination.complete();
  };

  DebounceTimeSubscriber.prototype.debouncedNext = function () {
    this.clearDebounce();

    if (this.hasValue) {
      var lastValue = this.lastValue;
      this.lastValue = null;
      this.hasValue = false;
      this.destination.next(lastValue);
    }
  };

  DebounceTimeSubscriber.prototype.clearDebounce = function () {
    var debouncedSubscription = this.debouncedSubscription;

    if (debouncedSubscription !== null) {
      this.remove(debouncedSubscription);
      debouncedSubscription.unsubscribe();
      this.debouncedSubscription = null;
    }
  };

  return DebounceTimeSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

function dispatchNext(subscriber) {
  subscriber.debouncedNext();
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/defaultIfEmpty.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/defaultIfEmpty.js ***!
  \**********************************************************************/
/*! exports provided: defaultIfEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultIfEmpty", function() { return defaultIfEmpty; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function defaultIfEmpty(defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = null;
  }

  return function (source) {
    return source.lift(new DefaultIfEmptyOperator(defaultValue));
  };
}

var DefaultIfEmptyOperator = /*@__PURE__*/function () {
  function DefaultIfEmptyOperator(defaultValue) {
    this.defaultValue = defaultValue;
  }

  DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
  };

  return DefaultIfEmptyOperator;
}();

var DefaultIfEmptySubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DefaultIfEmptySubscriber, _super);

  function DefaultIfEmptySubscriber(destination, defaultValue) {
    var _this = _super.call(this, destination) || this;

    _this.defaultValue = defaultValue;
    _this.isEmpty = true;
    return _this;
  }

  DefaultIfEmptySubscriber.prototype._next = function (value) {
    this.isEmpty = false;
    this.destination.next(value);
  };

  DefaultIfEmptySubscriber.prototype._complete = function () {
    if (this.isEmpty) {
      this.destination.next(this.defaultValue);
    }

    this.destination.complete();
  };

  return DefaultIfEmptySubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/delay.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/delay.js ***!
  \*************************************************************/
/*! exports provided: delay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return delay; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony import */ var _util_isDate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isDate */ "./node_modules/rxjs/_esm5/internal/util/isDate.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Notification */ "./node_modules/rxjs/_esm5/internal/Notification.js");
/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_Subscriber,_Notification PURE_IMPORTS_END */





function delay(delay, scheduler) {
  if (scheduler === void 0) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_1__["async"];
  }

  var absoluteDelay = Object(_util_isDate__WEBPACK_IMPORTED_MODULE_2__["isDate"])(delay);
  var delayFor = absoluteDelay ? +delay - scheduler.now() : Math.abs(delay);
  return function (source) {
    return source.lift(new DelayOperator(delayFor, scheduler));
  };
}

var DelayOperator = /*@__PURE__*/function () {
  function DelayOperator(delay, scheduler) {
    this.delay = delay;
    this.scheduler = scheduler;
  }

  DelayOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
  };

  return DelayOperator;
}();

var DelaySubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DelaySubscriber, _super);

  function DelaySubscriber(destination, delay, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.delay = delay;
    _this.scheduler = scheduler;
    _this.queue = [];
    _this.active = false;
    _this.errored = false;
    return _this;
  }

  DelaySubscriber.dispatch = function (state) {
    var source = state.source;
    var queue = source.queue;
    var scheduler = state.scheduler;
    var destination = state.destination;

    while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
      queue.shift().notification.observe(destination);
    }

    if (queue.length > 0) {
      var delay_1 = Math.max(0, queue[0].time - scheduler.now());
      this.schedule(state, delay_1);
    } else {
      this.unsubscribe();
      source.active = false;
    }
  };

  DelaySubscriber.prototype._schedule = function (scheduler) {
    this.active = true;
    var destination = this.destination;
    destination.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
      source: this,
      destination: this.destination,
      scheduler: scheduler
    }));
  };

  DelaySubscriber.prototype.scheduleNotification = function (notification) {
    if (this.errored === true) {
      return;
    }

    var scheduler = this.scheduler;
    var message = new DelayMessage(scheduler.now() + this.delay, notification);
    this.queue.push(message);

    if (this.active === false) {
      this._schedule(scheduler);
    }
  };

  DelaySubscriber.prototype._next = function (value) {
    this.scheduleNotification(_Notification__WEBPACK_IMPORTED_MODULE_4__["Notification"].createNext(value));
  };

  DelaySubscriber.prototype._error = function (err) {
    this.errored = true;
    this.queue = [];
    this.destination.error(err);
    this.unsubscribe();
  };

  DelaySubscriber.prototype._complete = function () {
    this.scheduleNotification(_Notification__WEBPACK_IMPORTED_MODULE_4__["Notification"].createComplete());
    this.unsubscribe();
  };

  return DelaySubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_3__["Subscriber"]);

var DelayMessage = /*@__PURE__*/function () {
  function DelayMessage(time, notification) {
    this.time = time;
    this.notification = notification;
  }

  return DelayMessage;
}();

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/delayWhen.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/delayWhen.js ***!
  \*****************************************************************/
/*! exports provided: delayWhen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delayWhen", function() { return delayWhen; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../OuterSubscriber */ "./node_modules/rxjs/_esm5/internal/OuterSubscriber.js");
/* harmony import */ var _util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/subscribeToResult */ "./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function delayWhen(delayDurationSelector, subscriptionDelay) {
  if (subscriptionDelay) {
    return function (source) {
      return new SubscriptionDelayObservable(source, subscriptionDelay).lift(new DelayWhenOperator(delayDurationSelector));
    };
  }

  return function (source) {
    return source.lift(new DelayWhenOperator(delayDurationSelector));
  };
}

var DelayWhenOperator = /*@__PURE__*/function () {
  function DelayWhenOperator(delayDurationSelector) {
    this.delayDurationSelector = delayDurationSelector;
  }

  DelayWhenOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
  };

  return DelayWhenOperator;
}();

var DelayWhenSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DelayWhenSubscriber, _super);

  function DelayWhenSubscriber(destination, delayDurationSelector) {
    var _this = _super.call(this, destination) || this;

    _this.delayDurationSelector = delayDurationSelector;
    _this.completed = false;
    _this.delayNotifierSubscriptions = [];
    _this.index = 0;
    return _this;
  }

  DelayWhenSubscriber.prototype.notifyNext = function (outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
    this.destination.next(outerValue);
    this.removeSubscription(innerSub);
    this.tryComplete();
  };

  DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
    this._error(error);
  };

  DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
    var value = this.removeSubscription(innerSub);

    if (value) {
      this.destination.next(value);
    }

    this.tryComplete();
  };

  DelayWhenSubscriber.prototype._next = function (value) {
    var index = this.index++;

    try {
      var delayNotifier = this.delayDurationSelector(value, index);

      if (delayNotifier) {
        this.tryDelay(delayNotifier, value);
      }
    } catch (err) {
      this.destination.error(err);
    }
  };

  DelayWhenSubscriber.prototype._complete = function () {
    this.completed = true;
    this.tryComplete();
    this.unsubscribe();
  };

  DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
    subscription.unsubscribe();
    var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);

    if (subscriptionIdx !== -1) {
      this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
    }

    return subscription.outerValue;
  };

  DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
    var notifierSubscription = Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__["subscribeToResult"])(this, delayNotifier, value);

    if (notifierSubscription && !notifierSubscription.closed) {
      var destination = this.destination;
      destination.add(notifierSubscription);
      this.delayNotifierSubscriptions.push(notifierSubscription);
    }
  };

  DelayWhenSubscriber.prototype.tryComplete = function () {
    if (this.completed && this.delayNotifierSubscriptions.length === 0) {
      this.destination.complete();
    }
  };

  return DelayWhenSubscriber;
}(_OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__["OuterSubscriber"]);

var SubscriptionDelayObservable = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SubscriptionDelayObservable, _super);

  function SubscriptionDelayObservable(source, subscriptionDelay) {
    var _this = _super.call(this) || this;

    _this.source = source;
    _this.subscriptionDelay = subscriptionDelay;
    return _this;
  }

  SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
    this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
  };

  return SubscriptionDelayObservable;
}(_Observable__WEBPACK_IMPORTED_MODULE_2__["Observable"]);

var SubscriptionDelaySubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SubscriptionDelaySubscriber, _super);

  function SubscriptionDelaySubscriber(parent, source) {
    var _this = _super.call(this) || this;

    _this.parent = parent;
    _this.source = source;
    _this.sourceSubscribed = false;
    return _this;
  }

  SubscriptionDelaySubscriber.prototype._next = function (unused) {
    this.subscribeToSource();
  };

  SubscriptionDelaySubscriber.prototype._error = function (err) {
    this.unsubscribe();
    this.parent.error(err);
  };

  SubscriptionDelaySubscriber.prototype._complete = function () {
    this.unsubscribe();
    this.subscribeToSource();
  };

  SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
    if (!this.sourceSubscribed) {
      this.sourceSubscribed = true;
      this.unsubscribe();
      this.source.subscribe(this.parent);
    }
  };

  return SubscriptionDelaySubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/dematerialize.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/dematerialize.js ***!
  \*********************************************************************/
/*! exports provided: dematerialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dematerialize", function() { return dematerialize; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function dematerialize() {
  return function dematerializeOperatorFunction(source) {
    return source.lift(new DeMaterializeOperator());
  };
}

var DeMaterializeOperator = /*@__PURE__*/function () {
  function DeMaterializeOperator() {}

  DeMaterializeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new DeMaterializeSubscriber(subscriber));
  };

  return DeMaterializeOperator;
}();

var DeMaterializeSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DeMaterializeSubscriber, _super);

  function DeMaterializeSubscriber(destination) {
    return _super.call(this, destination) || this;
  }

  DeMaterializeSubscriber.prototype._next = function (value) {
    value.observe(this.destination);
  };

  return DeMaterializeSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/distinct.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/distinct.js ***!
  \****************************************************************/
/*! exports provided: distinct, DistinctSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distinct", function() { return distinct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistinctSubscriber", function() { return DistinctSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function distinct(keySelector, flushes) {
  return function (source) {
    return source.lift(new DistinctOperator(keySelector, flushes));
  };
}

var DistinctOperator = /*@__PURE__*/function () {
  function DistinctOperator(keySelector, flushes) {
    this.keySelector = keySelector;
    this.flushes = flushes;
  }

  DistinctOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
  };

  return DistinctOperator;
}();

var DistinctSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DistinctSubscriber, _super);

  function DistinctSubscriber(destination, keySelector, flushes) {
    var _this = _super.call(this, destination) || this;

    _this.keySelector = keySelector;
    _this.values = new Set();

    if (flushes) {
      _this.add(Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(flushes, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](_this)));
    }

    return _this;
  }

  DistinctSubscriber.prototype.notifyNext = function () {
    this.values.clear();
  };

  DistinctSubscriber.prototype.notifyError = function (error) {
    this._error(error);
  };

  DistinctSubscriber.prototype._next = function (value) {
    if (this.keySelector) {
      this._useKeySelector(value);
    } else {
      this._finalizeNext(value, value);
    }
  };

  DistinctSubscriber.prototype._useKeySelector = function (value) {
    var key;
    var destination = this.destination;

    try {
      key = this.keySelector(value);
    } catch (err) {
      destination.error(err);
      return;
    }

    this._finalizeNext(key, value);
  };

  DistinctSubscriber.prototype._finalizeNext = function (key, value) {
    var values = this.values;

    if (!values.has(key)) {
      values.add(key);
      this.destination.next(value);
    }
  };

  return DistinctSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/distinctUntilChanged.js":
/*!****************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/distinctUntilChanged.js ***!
  \****************************************************************************/
/*! exports provided: distinctUntilChanged */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distinctUntilChanged", function() { return distinctUntilChanged; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function distinctUntilChanged(compare, keySelector) {
  return function (source) {
    return source.lift(new DistinctUntilChangedOperator(compare, keySelector));
  };
}

var DistinctUntilChangedOperator = /*@__PURE__*/function () {
  function DistinctUntilChangedOperator(compare, keySelector) {
    this.compare = compare;
    this.keySelector = keySelector;
  }

  DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
  };

  return DistinctUntilChangedOperator;
}();

var DistinctUntilChangedSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DistinctUntilChangedSubscriber, _super);

  function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
    var _this = _super.call(this, destination) || this;

    _this.keySelector = keySelector;
    _this.hasKey = false;

    if (typeof compare === 'function') {
      _this.compare = compare;
    }

    return _this;
  }

  DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
    return x === y;
  };

  DistinctUntilChangedSubscriber.prototype._next = function (value) {
    var key;

    try {
      var keySelector = this.keySelector;
      key = keySelector ? keySelector(value) : value;
    } catch (err) {
      return this.destination.error(err);
    }

    var result = false;

    if (this.hasKey) {
      try {
        var compare = this.compare;
        result = compare(this.key, key);
      } catch (err) {
        return this.destination.error(err);
      }
    } else {
      this.hasKey = true;
    }

    if (!result) {
      this.key = key;
      this.destination.next(value);
    }
  };

  return DistinctUntilChangedSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/distinctUntilKeyChanged.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/distinctUntilKeyChanged.js ***!
  \*******************************************************************************/
/*! exports provided: distinctUntilKeyChanged */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distinctUntilKeyChanged", function() { return distinctUntilKeyChanged; });
/* harmony import */ var _distinctUntilChanged__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./distinctUntilChanged */ "./node_modules/rxjs/_esm5/internal/operators/distinctUntilChanged.js");
/** PURE_IMPORTS_START _distinctUntilChanged PURE_IMPORTS_END */

function distinctUntilKeyChanged(key, compare) {
  return Object(_distinctUntilChanged__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])(function (x, y) {
    return compare ? compare(x[key], y[key]) : x[key] === y[key];
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/elementAt.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/elementAt.js ***!
  \*****************************************************************/
/*! exports provided: elementAt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementAt", function() { return elementAt; });
/* harmony import */ var _util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/ArgumentOutOfRangeError */ "./node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js");
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ "./node_modules/rxjs/_esm5/internal/operators/filter.js");
/* harmony import */ var _throwIfEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./throwIfEmpty */ "./node_modules/rxjs/_esm5/internal/operators/throwIfEmpty.js");
/* harmony import */ var _defaultIfEmpty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultIfEmpty */ "./node_modules/rxjs/_esm5/internal/operators/defaultIfEmpty.js");
/* harmony import */ var _take__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./take */ "./node_modules/rxjs/_esm5/internal/operators/take.js");
/** PURE_IMPORTS_START _util_ArgumentOutOfRangeError,_filter,_throwIfEmpty,_defaultIfEmpty,_take PURE_IMPORTS_END */





function elementAt(index, defaultValue) {
  if (index < 0) {
    throw new _util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_0__["ArgumentOutOfRangeError"]();
  }

  var hasDefaultValue = arguments.length >= 2;
  return function (source) {
    return source.pipe(Object(_filter__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (v, i) {
      return i === index;
    }), Object(_take__WEBPACK_IMPORTED_MODULE_4__["take"])(1), hasDefaultValue ? Object(_defaultIfEmpty__WEBPACK_IMPORTED_MODULE_3__["defaultIfEmpty"])(defaultValue) : Object(_throwIfEmpty__WEBPACK_IMPORTED_MODULE_2__["throwIfEmpty"])(function () {
      return new _util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_0__["ArgumentOutOfRangeError"]();
    }));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/endWith.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/endWith.js ***!
  \***************************************************************/
/*! exports provided: endWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endWith", function() { return endWith; });
/* harmony import */ var _observable_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/concat */ "./node_modules/rxjs/_esm5/internal/observable/concat.js");
/* harmony import */ var _observable_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../observable/of */ "./node_modules/rxjs/_esm5/internal/observable/of.js");
/** PURE_IMPORTS_START _observable_concat,_observable_of PURE_IMPORTS_END */


function endWith() {
  var array = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    array[_i] = arguments[_i];
  }

  return function (source) {
    return Object(_observable_concat__WEBPACK_IMPORTED_MODULE_0__["concat"])(source, _observable_of__WEBPACK_IMPORTED_MODULE_1__["of"].apply(void 0, array));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/every.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/every.js ***!
  \*************************************************************/
/*! exports provided: every */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "every", function() { return every; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function every(predicate, thisArg) {
  return function (source) {
    return source.lift(new EveryOperator(predicate, thisArg, source));
  };
}

var EveryOperator = /*@__PURE__*/function () {
  function EveryOperator(predicate, thisArg, source) {
    this.predicate = predicate;
    this.thisArg = thisArg;
    this.source = source;
  }

  EveryOperator.prototype.call = function (observer, source) {
    return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
  };

  return EveryOperator;
}();

var EverySubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EverySubscriber, _super);

  function EverySubscriber(destination, predicate, thisArg, source) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.thisArg = thisArg;
    _this.source = source;
    _this.index = 0;
    _this.thisArg = thisArg || _this;
    return _this;
  }

  EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
    this.destination.next(everyValueMatch);
    this.destination.complete();
  };

  EverySubscriber.prototype._next = function (value) {
    var result = false;

    try {
      result = this.predicate.call(this.thisArg, value, this.index++, this.source);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    if (!result) {
      this.notifyComplete(false);
    }
  };

  EverySubscriber.prototype._complete = function () {
    this.notifyComplete(true);
  };

  return EverySubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/exhaust.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/exhaust.js ***!
  \***************************************************************/
/*! exports provided: exhaust */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exhaust", function() { return exhaust; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function exhaust() {
  return function (source) {
    return source.lift(new SwitchFirstOperator());
  };
}

var SwitchFirstOperator = /*@__PURE__*/function () {
  function SwitchFirstOperator() {}

  SwitchFirstOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new SwitchFirstSubscriber(subscriber));
  };

  return SwitchFirstOperator;
}();

var SwitchFirstSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SwitchFirstSubscriber, _super);

  function SwitchFirstSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.hasCompleted = false;
    _this.hasSubscription = false;
    return _this;
  }

  SwitchFirstSubscriber.prototype._next = function (value) {
    if (!this.hasSubscription) {
      this.hasSubscription = true;
      this.add(Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(value, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](this)));
    }
  };

  SwitchFirstSubscriber.prototype._complete = function () {
    this.hasCompleted = true;

    if (!this.hasSubscription) {
      this.destination.complete();
    }
  };

  SwitchFirstSubscriber.prototype.notifyComplete = function () {
    this.hasSubscription = false;

    if (this.hasCompleted) {
      this.destination.complete();
    }
  };

  return SwitchFirstSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/exhaustMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/exhaustMap.js ***!
  \******************************************************************/
/*! exports provided: exhaustMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exhaustMap", function() { return exhaustMap; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/from */ "./node_modules/rxjs/_esm5/internal/observable/from.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_map,_observable_from,_innerSubscribe PURE_IMPORTS_END */




function exhaustMap(project, resultSelector) {
  if (resultSelector) {
    return function (source) {
      return source.pipe(exhaustMap(function (a, i) {
        return Object(_observable_from__WEBPACK_IMPORTED_MODULE_2__["from"])(project(a, i)).pipe(Object(_map__WEBPACK_IMPORTED_MODULE_1__["map"])(function (b, ii) {
          return resultSelector(a, b, i, ii);
        }));
      }));
    };
  }

  return function (source) {
    return source.lift(new ExhaustMapOperator(project));
  };
}

var ExhaustMapOperator = /*@__PURE__*/function () {
  function ExhaustMapOperator(project) {
    this.project = project;
  }

  ExhaustMapOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new ExhaustMapSubscriber(subscriber, this.project));
  };

  return ExhaustMapOperator;
}();

var ExhaustMapSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ExhaustMapSubscriber, _super);

  function ExhaustMapSubscriber(destination, project) {
    var _this = _super.call(this, destination) || this;

    _this.project = project;
    _this.hasSubscription = false;
    _this.hasCompleted = false;
    _this.index = 0;
    return _this;
  }

  ExhaustMapSubscriber.prototype._next = function (value) {
    if (!this.hasSubscription) {
      this.tryNext(value);
    }
  };

  ExhaustMapSubscriber.prototype.tryNext = function (value) {
    var result;
    var index = this.index++;

    try {
      result = this.project(value, index);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.hasSubscription = true;

    this._innerSub(result);
  };

  ExhaustMapSubscriber.prototype._innerSub = function (result) {
    var innerSubscriber = new _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["SimpleInnerSubscriber"](this);
    var destination = this.destination;
    destination.add(innerSubscriber);
    var innerSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["innerSubscribe"])(result, innerSubscriber);

    if (innerSubscription !== innerSubscriber) {
      destination.add(innerSubscription);
    }
  };

  ExhaustMapSubscriber.prototype._complete = function () {
    this.hasCompleted = true;

    if (!this.hasSubscription) {
      this.destination.complete();
    }

    this.unsubscribe();
  };

  ExhaustMapSubscriber.prototype.notifyNext = function (innerValue) {
    this.destination.next(innerValue);
  };

  ExhaustMapSubscriber.prototype.notifyError = function (err) {
    this.destination.error(err);
  };

  ExhaustMapSubscriber.prototype.notifyComplete = function () {
    this.hasSubscription = false;

    if (this.hasCompleted) {
      this.destination.complete();
    }
  };

  return ExhaustMapSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/expand.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/expand.js ***!
  \**************************************************************/
/*! exports provided: expand, ExpandOperator, ExpandSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expand", function() { return expand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpandOperator", function() { return ExpandOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpandSubscriber", function() { return ExpandSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function expand(project, concurrent, scheduler) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }

  concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
  return function (source) {
    return source.lift(new ExpandOperator(project, concurrent, scheduler));
  };
}

var ExpandOperator = /*@__PURE__*/function () {
  function ExpandOperator(project, concurrent, scheduler) {
    this.project = project;
    this.concurrent = concurrent;
    this.scheduler = scheduler;
  }

  ExpandOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
  };

  return ExpandOperator;
}();



var ExpandSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ExpandSubscriber, _super);

  function ExpandSubscriber(destination, project, concurrent, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.project = project;
    _this.concurrent = concurrent;
    _this.scheduler = scheduler;
    _this.index = 0;
    _this.active = 0;
    _this.hasCompleted = false;

    if (concurrent < Number.POSITIVE_INFINITY) {
      _this.buffer = [];
    }

    return _this;
  }

  ExpandSubscriber.dispatch = function (arg) {
    var subscriber = arg.subscriber,
        result = arg.result,
        value = arg.value,
        index = arg.index;
    subscriber.subscribeToProjection(result, value, index);
  };

  ExpandSubscriber.prototype._next = function (value) {
    var destination = this.destination;

    if (destination.closed) {
      this._complete();

      return;
    }

    var index = this.index++;

    if (this.active < this.concurrent) {
      destination.next(value);

      try {
        var project = this.project;
        var result = project(value, index);

        if (!this.scheduler) {
          this.subscribeToProjection(result, value, index);
        } else {
          var state = {
            subscriber: this,
            result: result,
            value: value,
            index: index
          };
          var destination_1 = this.destination;
          destination_1.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
        }
      } catch (e) {
        destination.error(e);
      }
    } else {
      this.buffer.push(value);
    }
  };

  ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
    this.active++;
    var destination = this.destination;
    destination.add(Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(result, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](this)));
  };

  ExpandSubscriber.prototype._complete = function () {
    this.hasCompleted = true;

    if (this.hasCompleted && this.active === 0) {
      this.destination.complete();
    }

    this.unsubscribe();
  };

  ExpandSubscriber.prototype.notifyNext = function (innerValue) {
    this._next(innerValue);
  };

  ExpandSubscriber.prototype.notifyComplete = function () {
    var buffer = this.buffer;
    this.active--;

    if (buffer && buffer.length > 0) {
      this._next(buffer.shift());
    }

    if (this.hasCompleted && this.active === 0) {
      this.destination.complete();
    }
  };

  return ExpandSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/filter.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/filter.js ***!
  \**************************************************************/
/*! exports provided: filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function filter(predicate, thisArg) {
  return function filterOperatorFunction(source) {
    return source.lift(new FilterOperator(predicate, thisArg));
  };
}

var FilterOperator = /*@__PURE__*/function () {
  function FilterOperator(predicate, thisArg) {
    this.predicate = predicate;
    this.thisArg = thisArg;
  }

  FilterOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
  };

  return FilterOperator;
}();

var FilterSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FilterSubscriber, _super);

  function FilterSubscriber(destination, predicate, thisArg) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.thisArg = thisArg;
    _this.count = 0;
    return _this;
  }

  FilterSubscriber.prototype._next = function (value) {
    var result;

    try {
      result = this.predicate.call(this.thisArg, value, this.count++);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    if (result) {
      this.destination.next(value);
    }
  };

  return FilterSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/finalize.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/finalize.js ***!
  \****************************************************************/
/*! exports provided: finalize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "finalize", function() { return finalize; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription PURE_IMPORTS_END */



function finalize(callback) {
  return function (source) {
    return source.lift(new FinallyOperator(callback));
  };
}

var FinallyOperator = /*@__PURE__*/function () {
  function FinallyOperator(callback) {
    this.callback = callback;
  }

  FinallyOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new FinallySubscriber(subscriber, this.callback));
  };

  return FinallyOperator;
}();

var FinallySubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FinallySubscriber, _super);

  function FinallySubscriber(destination, callback) {
    var _this = _super.call(this, destination) || this;

    _this.add(new _Subscription__WEBPACK_IMPORTED_MODULE_2__["Subscription"](callback));

    return _this;
  }

  return FinallySubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/find.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/find.js ***!
  \************************************************************/
/*! exports provided: find, FindValueOperator, FindValueSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindValueOperator", function() { return FindValueOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindValueSubscriber", function() { return FindValueSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function find(predicate, thisArg) {
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate is not a function');
  }

  return function (source) {
    return source.lift(new FindValueOperator(predicate, source, false, thisArg));
  };
}

var FindValueOperator = /*@__PURE__*/function () {
  function FindValueOperator(predicate, source, yieldIndex, thisArg) {
    this.predicate = predicate;
    this.source = source;
    this.yieldIndex = yieldIndex;
    this.thisArg = thisArg;
  }

  FindValueOperator.prototype.call = function (observer, source) {
    return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
  };

  return FindValueOperator;
}();



var FindValueSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FindValueSubscriber, _super);

  function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.source = source;
    _this.yieldIndex = yieldIndex;
    _this.thisArg = thisArg;
    _this.index = 0;
    return _this;
  }

  FindValueSubscriber.prototype.notifyComplete = function (value) {
    var destination = this.destination;
    destination.next(value);
    destination.complete();
    this.unsubscribe();
  };

  FindValueSubscriber.prototype._next = function (value) {
    var _a = this,
        predicate = _a.predicate,
        thisArg = _a.thisArg;

    var index = this.index++;

    try {
      var result = predicate.call(thisArg || this, value, index, this.source);

      if (result) {
        this.notifyComplete(this.yieldIndex ? index : value);
      }
    } catch (err) {
      this.destination.error(err);
    }
  };

  FindValueSubscriber.prototype._complete = function () {
    this.notifyComplete(this.yieldIndex ? -1 : undefined);
  };

  return FindValueSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/findIndex.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/findIndex.js ***!
  \*****************************************************************/
/*! exports provided: findIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return findIndex; });
/* harmony import */ var _operators_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../operators/find */ "./node_modules/rxjs/_esm5/internal/operators/find.js");
/** PURE_IMPORTS_START _operators_find PURE_IMPORTS_END */

function findIndex(predicate, thisArg) {
  return function (source) {
    return source.lift(new _operators_find__WEBPACK_IMPORTED_MODULE_0__["FindValueOperator"](predicate, source, true, thisArg));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/first.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/first.js ***!
  \*************************************************************/
/*! exports provided: first */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "first", function() { return first; });
/* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/EmptyError */ "./node_modules/rxjs/_esm5/internal/util/EmptyError.js");
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ "./node_modules/rxjs/_esm5/internal/operators/filter.js");
/* harmony import */ var _take__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./take */ "./node_modules/rxjs/_esm5/internal/operators/take.js");
/* harmony import */ var _defaultIfEmpty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultIfEmpty */ "./node_modules/rxjs/_esm5/internal/operators/defaultIfEmpty.js");
/* harmony import */ var _throwIfEmpty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./throwIfEmpty */ "./node_modules/rxjs/_esm5/internal/operators/throwIfEmpty.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/identity */ "./node_modules/rxjs/_esm5/internal/util/identity.js");
/** PURE_IMPORTS_START _util_EmptyError,_filter,_take,_defaultIfEmpty,_throwIfEmpty,_util_identity PURE_IMPORTS_END */






function first(predicate, defaultValue) {
  var hasDefaultValue = arguments.length >= 2;
  return function (source) {
    return source.pipe(predicate ? Object(_filter__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (v, i) {
      return predicate(v, i, source);
    }) : _util_identity__WEBPACK_IMPORTED_MODULE_5__["identity"], Object(_take__WEBPACK_IMPORTED_MODULE_2__["take"])(1), hasDefaultValue ? Object(_defaultIfEmpty__WEBPACK_IMPORTED_MODULE_3__["defaultIfEmpty"])(defaultValue) : Object(_throwIfEmpty__WEBPACK_IMPORTED_MODULE_4__["throwIfEmpty"])(function () {
      return new _util_EmptyError__WEBPACK_IMPORTED_MODULE_0__["EmptyError"]();
    }));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/groupBy.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/groupBy.js ***!
  \***************************************************************/
/*! exports provided: groupBy, GroupedObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupBy", function() { return groupBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupedObservable", function() { return GroupedObservable; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */





function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
  return function (source) {
    return source.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
  };
}

var GroupByOperator = /*@__PURE__*/function () {
  function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
    this.keySelector = keySelector;
    this.elementSelector = elementSelector;
    this.durationSelector = durationSelector;
    this.subjectSelector = subjectSelector;
  }

  GroupByOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
  };

  return GroupByOperator;
}();

var GroupBySubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GroupBySubscriber, _super);

  function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
    var _this = _super.call(this, destination) || this;

    _this.keySelector = keySelector;
    _this.elementSelector = elementSelector;
    _this.durationSelector = durationSelector;
    _this.subjectSelector = subjectSelector;
    _this.groups = null;
    _this.attemptedToUnsubscribe = false;
    _this.count = 0;
    return _this;
  }

  GroupBySubscriber.prototype._next = function (value) {
    var key;

    try {
      key = this.keySelector(value);
    } catch (err) {
      this.error(err);
      return;
    }

    this._group(value, key);
  };

  GroupBySubscriber.prototype._group = function (value, key) {
    var groups = this.groups;

    if (!groups) {
      groups = this.groups = new Map();
    }

    var group = groups.get(key);
    var element;

    if (this.elementSelector) {
      try {
        element = this.elementSelector(value);
      } catch (err) {
        this.error(err);
      }
    } else {
      element = value;
    }

    if (!group) {
      group = this.subjectSelector ? this.subjectSelector() : new _Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
      groups.set(key, group);
      var groupedObservable = new GroupedObservable(key, group, this);
      this.destination.next(groupedObservable);

      if (this.durationSelector) {
        var duration = void 0;

        try {
          duration = this.durationSelector(new GroupedObservable(key, group));
        } catch (err) {
          this.error(err);
          return;
        }

        this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
      }
    }

    if (!group.closed) {
      group.next(element);
    }
  };

  GroupBySubscriber.prototype._error = function (err) {
    var groups = this.groups;

    if (groups) {
      groups.forEach(function (group, key) {
        group.error(err);
      });
      groups.clear();
    }

    this.destination.error(err);
  };

  GroupBySubscriber.prototype._complete = function () {
    var groups = this.groups;

    if (groups) {
      groups.forEach(function (group, key) {
        group.complete();
      });
      groups.clear();
    }

    this.destination.complete();
  };

  GroupBySubscriber.prototype.removeGroup = function (key) {
    this.groups.delete(key);
  };

  GroupBySubscriber.prototype.unsubscribe = function () {
    if (!this.closed) {
      this.attemptedToUnsubscribe = true;

      if (this.count === 0) {
        _super.prototype.unsubscribe.call(this);
      }
    }
  };

  return GroupBySubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

var GroupDurationSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GroupDurationSubscriber, _super);

  function GroupDurationSubscriber(key, group, parent) {
    var _this = _super.call(this, group) || this;

    _this.key = key;
    _this.group = group;
    _this.parent = parent;
    return _this;
  }

  GroupDurationSubscriber.prototype._next = function (value) {
    this.complete();
  };

  GroupDurationSubscriber.prototype._unsubscribe = function () {
    var _a = this,
        parent = _a.parent,
        key = _a.key;

    this.key = this.parent = null;

    if (parent) {
      parent.removeGroup(key);
    }
  };

  return GroupDurationSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

var GroupedObservable = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GroupedObservable, _super);

  function GroupedObservable(key, groupSubject, refCountSubscription) {
    var _this = _super.call(this) || this;

    _this.key = key;
    _this.groupSubject = groupSubject;
    _this.refCountSubscription = refCountSubscription;
    return _this;
  }

  GroupedObservable.prototype._subscribe = function (subscriber) {
    var subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();

    var _a = this,
        refCountSubscription = _a.refCountSubscription,
        groupSubject = _a.groupSubject;

    if (refCountSubscription && !refCountSubscription.closed) {
      subscription.add(new InnerRefCountSubscription(refCountSubscription));
    }

    subscription.add(groupSubject.subscribe(subscriber));
    return subscription;
  };

  return GroupedObservable;
}(_Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"]);



var InnerRefCountSubscription = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](InnerRefCountSubscription, _super);

  function InnerRefCountSubscription(parent) {
    var _this = _super.call(this) || this;

    _this.parent = parent;
    parent.count++;
    return _this;
  }

  InnerRefCountSubscription.prototype.unsubscribe = function () {
    var parent = this.parent;

    if (!parent.closed && !this.closed) {
      _super.prototype.unsubscribe.call(this);

      parent.count -= 1;

      if (parent.count === 0 && parent.attemptedToUnsubscribe) {
        parent.unsubscribe();
      }
    }
  };

  return InnerRefCountSubscription;
}(_Subscription__WEBPACK_IMPORTED_MODULE_2__["Subscription"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/ignoreElements.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/ignoreElements.js ***!
  \**********************************************************************/
/*! exports provided: ignoreElements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ignoreElements", function() { return ignoreElements; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function ignoreElements() {
  return function ignoreElementsOperatorFunction(source) {
    return source.lift(new IgnoreElementsOperator());
  };
}

var IgnoreElementsOperator = /*@__PURE__*/function () {
  function IgnoreElementsOperator() {}

  IgnoreElementsOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new IgnoreElementsSubscriber(subscriber));
  };

  return IgnoreElementsOperator;
}();

var IgnoreElementsSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](IgnoreElementsSubscriber, _super);

  function IgnoreElementsSubscriber() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  IgnoreElementsSubscriber.prototype._next = function (unused) {};

  return IgnoreElementsSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/isEmpty.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/isEmpty.js ***!
  \***************************************************************/
/*! exports provided: isEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function isEmpty() {
  return function (source) {
    return source.lift(new IsEmptyOperator());
  };
}

var IsEmptyOperator = /*@__PURE__*/function () {
  function IsEmptyOperator() {}

  IsEmptyOperator.prototype.call = function (observer, source) {
    return source.subscribe(new IsEmptySubscriber(observer));
  };

  return IsEmptyOperator;
}();

var IsEmptySubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](IsEmptySubscriber, _super);

  function IsEmptySubscriber(destination) {
    return _super.call(this, destination) || this;
  }

  IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
    var destination = this.destination;
    destination.next(isEmpty);
    destination.complete();
  };

  IsEmptySubscriber.prototype._next = function (value) {
    this.notifyComplete(false);
  };

  IsEmptySubscriber.prototype._complete = function () {
    this.notifyComplete(true);
  };

  return IsEmptySubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/last.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/last.js ***!
  \************************************************************/
/*! exports provided: last */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "last", function() { return last; });
/* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/EmptyError */ "./node_modules/rxjs/_esm5/internal/util/EmptyError.js");
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ "./node_modules/rxjs/_esm5/internal/operators/filter.js");
/* harmony import */ var _takeLast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./takeLast */ "./node_modules/rxjs/_esm5/internal/operators/takeLast.js");
/* harmony import */ var _throwIfEmpty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./throwIfEmpty */ "./node_modules/rxjs/_esm5/internal/operators/throwIfEmpty.js");
/* harmony import */ var _defaultIfEmpty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaultIfEmpty */ "./node_modules/rxjs/_esm5/internal/operators/defaultIfEmpty.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/identity */ "./node_modules/rxjs/_esm5/internal/util/identity.js");
/** PURE_IMPORTS_START _util_EmptyError,_filter,_takeLast,_throwIfEmpty,_defaultIfEmpty,_util_identity PURE_IMPORTS_END */






function last(predicate, defaultValue) {
  var hasDefaultValue = arguments.length >= 2;
  return function (source) {
    return source.pipe(predicate ? Object(_filter__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (v, i) {
      return predicate(v, i, source);
    }) : _util_identity__WEBPACK_IMPORTED_MODULE_5__["identity"], Object(_takeLast__WEBPACK_IMPORTED_MODULE_2__["takeLast"])(1), hasDefaultValue ? Object(_defaultIfEmpty__WEBPACK_IMPORTED_MODULE_4__["defaultIfEmpty"])(defaultValue) : Object(_throwIfEmpty__WEBPACK_IMPORTED_MODULE_3__["throwIfEmpty"])(function () {
      return new _util_EmptyError__WEBPACK_IMPORTED_MODULE_0__["EmptyError"]();
    }));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/map.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/map.js ***!
  \***********************************************************/
/*! exports provided: map, MapOperator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapOperator", function() { return MapOperator; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function map(project, thisArg) {
  return function mapOperation(source) {
    if (typeof project !== 'function') {
      throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }

    return source.lift(new MapOperator(project, thisArg));
  };
}

var MapOperator = /*@__PURE__*/function () {
  function MapOperator(project, thisArg) {
    this.project = project;
    this.thisArg = thisArg;
  }

  MapOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
  };

  return MapOperator;
}();



var MapSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MapSubscriber, _super);

  function MapSubscriber(destination, project, thisArg) {
    var _this = _super.call(this, destination) || this;

    _this.project = project;
    _this.count = 0;
    _this.thisArg = thisArg || _this;
    return _this;
  }

  MapSubscriber.prototype._next = function (value) {
    var result;

    try {
      result = this.project.call(this.thisArg, value, this.count++);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.next(result);
  };

  return MapSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/mapTo.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/mapTo.js ***!
  \*************************************************************/
/*! exports provided: mapTo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapTo", function() { return mapTo; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function mapTo(value) {
  return function (source) {
    return source.lift(new MapToOperator(value));
  };
}

var MapToOperator = /*@__PURE__*/function () {
  function MapToOperator(value) {
    this.value = value;
  }

  MapToOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new MapToSubscriber(subscriber, this.value));
  };

  return MapToOperator;
}();

var MapToSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MapToSubscriber, _super);

  function MapToSubscriber(destination, value) {
    var _this = _super.call(this, destination) || this;

    _this.value = value;
    return _this;
  }

  MapToSubscriber.prototype._next = function (x) {
    this.destination.next(this.value);
  };

  return MapToSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/materialize.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/materialize.js ***!
  \*******************************************************************/
/*! exports provided: materialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "materialize", function() { return materialize; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Notification */ "./node_modules/rxjs/_esm5/internal/Notification.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */



function materialize() {
  return function materializeOperatorFunction(source) {
    return source.lift(new MaterializeOperator());
  };
}

var MaterializeOperator = /*@__PURE__*/function () {
  function MaterializeOperator() {}

  MaterializeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new MaterializeSubscriber(subscriber));
  };

  return MaterializeOperator;
}();

var MaterializeSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MaterializeSubscriber, _super);

  function MaterializeSubscriber(destination) {
    return _super.call(this, destination) || this;
  }

  MaterializeSubscriber.prototype._next = function (value) {
    this.destination.next(_Notification__WEBPACK_IMPORTED_MODULE_2__["Notification"].createNext(value));
  };

  MaterializeSubscriber.prototype._error = function (err) {
    var destination = this.destination;
    destination.next(_Notification__WEBPACK_IMPORTED_MODULE_2__["Notification"].createError(err));
    destination.complete();
  };

  MaterializeSubscriber.prototype._complete = function () {
    var destination = this.destination;
    destination.next(_Notification__WEBPACK_IMPORTED_MODULE_2__["Notification"].createComplete());
    destination.complete();
  };

  return MaterializeSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/max.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/max.js ***!
  \***********************************************************/
/*! exports provided: max */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reduce */ "./node_modules/rxjs/_esm5/internal/operators/reduce.js");
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

function max(comparer) {
  var max = typeof comparer === 'function' ? function (x, y) {
    return comparer(x, y) > 0 ? x : y;
  } : function (x, y) {
    return x > y ? x : y;
  };
  return Object(_reduce__WEBPACK_IMPORTED_MODULE_0__["reduce"])(max);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/merge.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/merge.js ***!
  \*************************************************************/
/*! exports provided: merge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony import */ var _observable_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/merge */ "./node_modules/rxjs/_esm5/internal/observable/merge.js");
/** PURE_IMPORTS_START _observable_merge PURE_IMPORTS_END */

function merge() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  return function (source) {
    return source.lift.call(_observable_merge__WEBPACK_IMPORTED_MODULE_0__["merge"].apply(void 0, [source].concat(observables)));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/mergeAll.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/mergeAll.js ***!
  \****************************************************************/
/*! exports provided: mergeAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeAll", function() { return mergeAll; });
/* harmony import */ var _mergeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeMap */ "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/identity */ "./node_modules/rxjs/_esm5/internal/util/identity.js");
/** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */


function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }

  return Object(_mergeMap__WEBPACK_IMPORTED_MODULE_0__["mergeMap"])(_util_identity__WEBPACK_IMPORTED_MODULE_1__["identity"], concurrent);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/mergeMap.js ***!
  \****************************************************************/
/*! exports provided: mergeMap, MergeMapOperator, MergeMapSubscriber, flatMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeMap", function() { return mergeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeMapOperator", function() { return MergeMapOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeMapSubscriber", function() { return MergeMapSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatMap", function() { return flatMap; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/from */ "./node_modules/rxjs/_esm5/internal/observable/from.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_map,_observable_from,_innerSubscribe PURE_IMPORTS_END */




function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }

  if (typeof resultSelector === 'function') {
    return function (source) {
      return source.pipe(mergeMap(function (a, i) {
        return Object(_observable_from__WEBPACK_IMPORTED_MODULE_2__["from"])(project(a, i)).pipe(Object(_map__WEBPACK_IMPORTED_MODULE_1__["map"])(function (b, ii) {
          return resultSelector(a, b, i, ii);
        }));
      }, concurrent));
    };
  } else if (typeof resultSelector === 'number') {
    concurrent = resultSelector;
  }

  return function (source) {
    return source.lift(new MergeMapOperator(project, concurrent));
  };
}

var MergeMapOperator = /*@__PURE__*/function () {
  function MergeMapOperator(project, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }

    this.project = project;
    this.concurrent = concurrent;
  }

  MergeMapOperator.prototype.call = function (observer, source) {
    return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
  };

  return MergeMapOperator;
}();



var MergeMapSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MergeMapSubscriber, _super);

  function MergeMapSubscriber(destination, project, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }

    var _this = _super.call(this, destination) || this;

    _this.project = project;
    _this.concurrent = concurrent;
    _this.hasCompleted = false;
    _this.buffer = [];
    _this.active = 0;
    _this.index = 0;
    return _this;
  }

  MergeMapSubscriber.prototype._next = function (value) {
    if (this.active < this.concurrent) {
      this._tryNext(value);
    } else {
      this.buffer.push(value);
    }
  };

  MergeMapSubscriber.prototype._tryNext = function (value) {
    var result;
    var index = this.index++;

    try {
      result = this.project(value, index);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.active++;

    this._innerSub(result);
  };

  MergeMapSubscriber.prototype._innerSub = function (ish) {
    var innerSubscriber = new _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["SimpleInnerSubscriber"](this);
    var destination = this.destination;
    destination.add(innerSubscriber);
    var innerSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["innerSubscribe"])(ish, innerSubscriber);

    if (innerSubscription !== innerSubscriber) {
      destination.add(innerSubscription);
    }
  };

  MergeMapSubscriber.prototype._complete = function () {
    this.hasCompleted = true;

    if (this.active === 0 && this.buffer.length === 0) {
      this.destination.complete();
    }

    this.unsubscribe();
  };

  MergeMapSubscriber.prototype.notifyNext = function (innerValue) {
    this.destination.next(innerValue);
  };

  MergeMapSubscriber.prototype.notifyComplete = function () {
    var buffer = this.buffer;
    this.active--;

    if (buffer.length > 0) {
      this._next(buffer.shift());
    } else if (this.active === 0 && this.hasCompleted) {
      this.destination.complete();
    }
  };

  return MergeMapSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["SimpleOuterSubscriber"]);


var flatMap = mergeMap;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/mergeMapTo.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/mergeMapTo.js ***!
  \******************************************************************/
/*! exports provided: mergeMapTo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeMapTo", function() { return mergeMapTo; });
/* harmony import */ var _mergeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeMap */ "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js");
/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

function mergeMapTo(innerObservable, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }

  if (typeof resultSelector === 'function') {
    return Object(_mergeMap__WEBPACK_IMPORTED_MODULE_0__["mergeMap"])(function () {
      return innerObservable;
    }, resultSelector, concurrent);
  }

  if (typeof resultSelector === 'number') {
    concurrent = resultSelector;
  }

  return Object(_mergeMap__WEBPACK_IMPORTED_MODULE_0__["mergeMap"])(function () {
    return innerObservable;
  }, concurrent);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/mergeScan.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/mergeScan.js ***!
  \*****************************************************************/
/*! exports provided: mergeScan, MergeScanOperator, MergeScanSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeScan", function() { return mergeScan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeScanOperator", function() { return MergeScanOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeScanSubscriber", function() { return MergeScanSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function mergeScan(accumulator, seed, concurrent) {
  if (concurrent === void 0) {
    concurrent = Number.POSITIVE_INFINITY;
  }

  return function (source) {
    return source.lift(new MergeScanOperator(accumulator, seed, concurrent));
  };
}

var MergeScanOperator = /*@__PURE__*/function () {
  function MergeScanOperator(accumulator, seed, concurrent) {
    this.accumulator = accumulator;
    this.seed = seed;
    this.concurrent = concurrent;
  }

  MergeScanOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
  };

  return MergeScanOperator;
}();



var MergeScanSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MergeScanSubscriber, _super);

  function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
    var _this = _super.call(this, destination) || this;

    _this.accumulator = accumulator;
    _this.acc = acc;
    _this.concurrent = concurrent;
    _this.hasValue = false;
    _this.hasCompleted = false;
    _this.buffer = [];
    _this.active = 0;
    _this.index = 0;
    return _this;
  }

  MergeScanSubscriber.prototype._next = function (value) {
    if (this.active < this.concurrent) {
      var index = this.index++;
      var destination = this.destination;
      var ish = void 0;

      try {
        var accumulator = this.accumulator;
        ish = accumulator(this.acc, value, index);
      } catch (e) {
        return destination.error(e);
      }

      this.active++;

      this._innerSub(ish);
    } else {
      this.buffer.push(value);
    }
  };

  MergeScanSubscriber.prototype._innerSub = function (ish) {
    var innerSubscriber = new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](this);
    var destination = this.destination;
    destination.add(innerSubscriber);
    var innerSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(ish, innerSubscriber);

    if (innerSubscription !== innerSubscriber) {
      destination.add(innerSubscription);
    }
  };

  MergeScanSubscriber.prototype._complete = function () {
    this.hasCompleted = true;

    if (this.active === 0 && this.buffer.length === 0) {
      if (this.hasValue === false) {
        this.destination.next(this.acc);
      }

      this.destination.complete();
    }

    this.unsubscribe();
  };

  MergeScanSubscriber.prototype.notifyNext = function (innerValue) {
    var destination = this.destination;
    this.acc = innerValue;
    this.hasValue = true;
    destination.next(innerValue);
  };

  MergeScanSubscriber.prototype.notifyComplete = function () {
    var buffer = this.buffer;
    this.active--;

    if (buffer.length > 0) {
      this._next(buffer.shift());
    } else if (this.active === 0 && this.hasCompleted) {
      if (this.hasValue === false) {
        this.destination.next(this.acc);
      }

      this.destination.complete();
    }
  };

  return MergeScanSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/min.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/min.js ***!
  \***********************************************************/
/*! exports provided: min */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reduce */ "./node_modules/rxjs/_esm5/internal/operators/reduce.js");
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

function min(comparer) {
  var min = typeof comparer === 'function' ? function (x, y) {
    return comparer(x, y) < 0 ? x : y;
  } : function (x, y) {
    return x < y ? x : y;
  };
  return Object(_reduce__WEBPACK_IMPORTED_MODULE_0__["reduce"])(min);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/multicast.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/multicast.js ***!
  \*****************************************************************/
/*! exports provided: multicast, MulticastOperator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multicast", function() { return multicast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MulticastOperator", function() { return MulticastOperator; });
/* harmony import */ var _observable_ConnectableObservable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/ConnectableObservable */ "./node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js");
/** PURE_IMPORTS_START _observable_ConnectableObservable PURE_IMPORTS_END */

function multicast(subjectOrSubjectFactory, selector) {
  return function multicastOperatorFunction(source) {
    var subjectFactory;

    if (typeof subjectOrSubjectFactory === 'function') {
      subjectFactory = subjectOrSubjectFactory;
    } else {
      subjectFactory = function subjectFactory() {
        return subjectOrSubjectFactory;
      };
    }

    if (typeof selector === 'function') {
      return source.lift(new MulticastOperator(subjectFactory, selector));
    }

    var connectable = Object.create(source, _observable_ConnectableObservable__WEBPACK_IMPORTED_MODULE_0__["connectableObservableDescriptor"]);
    connectable.source = source;
    connectable.subjectFactory = subjectFactory;
    return connectable;
  };
}

var MulticastOperator = /*@__PURE__*/function () {
  function MulticastOperator(subjectFactory, selector) {
    this.subjectFactory = subjectFactory;
    this.selector = selector;
  }

  MulticastOperator.prototype.call = function (subscriber, source) {
    var selector = this.selector;
    var subject = this.subjectFactory();
    var subscription = selector(subject).subscribe(subscriber);
    subscription.add(source.subscribe(subject));
    return subscription;
  };

  return MulticastOperator;
}();



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/observeOn.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/observeOn.js ***!
  \*****************************************************************/
/*! exports provided: observeOn, ObserveOnOperator, ObserveOnSubscriber, ObserveOnMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observeOn", function() { return observeOn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObserveOnOperator", function() { return ObserveOnOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObserveOnSubscriber", function() { return ObserveOnSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObserveOnMessage", function() { return ObserveOnMessage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Notification */ "./node_modules/rxjs/_esm5/internal/Notification.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */



function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  return function observeOnOperatorFunction(source) {
    return source.lift(new ObserveOnOperator(scheduler, delay));
  };
}

var ObserveOnOperator = /*@__PURE__*/function () {
  function ObserveOnOperator(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    this.scheduler = scheduler;
    this.delay = delay;
  }

  ObserveOnOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
  };

  return ObserveOnOperator;
}();



var ObserveOnSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ObserveOnSubscriber, _super);

  function ObserveOnSubscriber(destination, scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    var _this = _super.call(this, destination) || this;

    _this.scheduler = scheduler;
    _this.delay = delay;
    return _this;
  }

  ObserveOnSubscriber.dispatch = function (arg) {
    var notification = arg.notification,
        destination = arg.destination;
    notification.observe(destination);
    this.unsubscribe();
  };

  ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
    var destination = this.destination;
    destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
  };

  ObserveOnSubscriber.prototype._next = function (value) {
    this.scheduleMessage(_Notification__WEBPACK_IMPORTED_MODULE_2__["Notification"].createNext(value));
  };

  ObserveOnSubscriber.prototype._error = function (err) {
    this.scheduleMessage(_Notification__WEBPACK_IMPORTED_MODULE_2__["Notification"].createError(err));
    this.unsubscribe();
  };

  ObserveOnSubscriber.prototype._complete = function () {
    this.scheduleMessage(_Notification__WEBPACK_IMPORTED_MODULE_2__["Notification"].createComplete());
    this.unsubscribe();
  };

  return ObserveOnSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);



var ObserveOnMessage = /*@__PURE__*/function () {
  function ObserveOnMessage(notification, destination) {
    this.notification = notification;
    this.destination = destination;
  }

  return ObserveOnMessage;
}();



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js":
/*!*************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js ***!
  \*************************************************************************/
/*! exports provided: onErrorResumeNext, onErrorResumeNextStatic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onErrorResumeNext", function() { return onErrorResumeNext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onErrorResumeNextStatic", function() { return onErrorResumeNextStatic; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../observable/from */ "./node_modules/rxjs/_esm5/internal/observable/from.js");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_observable_from,_util_isArray,_innerSubscribe PURE_IMPORTS_END */




function onErrorResumeNext() {
  var nextSources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    nextSources[_i] = arguments[_i];
  }

  if (nextSources.length === 1 && Object(_util_isArray__WEBPACK_IMPORTED_MODULE_2__["isArray"])(nextSources[0])) {
    nextSources = nextSources[0];
  }

  return function (source) {
    return source.lift(new OnErrorResumeNextOperator(nextSources));
  };
}
function onErrorResumeNextStatic() {
  var nextSources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    nextSources[_i] = arguments[_i];
  }

  var source = undefined;

  if (nextSources.length === 1 && Object(_util_isArray__WEBPACK_IMPORTED_MODULE_2__["isArray"])(nextSources[0])) {
    nextSources = nextSources[0];
  }

  source = nextSources.shift();
  return Object(_observable_from__WEBPACK_IMPORTED_MODULE_1__["from"])(source).lift(new OnErrorResumeNextOperator(nextSources));
}

var OnErrorResumeNextOperator = /*@__PURE__*/function () {
  function OnErrorResumeNextOperator(nextSources) {
    this.nextSources = nextSources;
  }

  OnErrorResumeNextOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
  };

  return OnErrorResumeNextOperator;
}();

var OnErrorResumeNextSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](OnErrorResumeNextSubscriber, _super);

  function OnErrorResumeNextSubscriber(destination, nextSources) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    _this.nextSources = nextSources;
    return _this;
  }

  OnErrorResumeNextSubscriber.prototype.notifyError = function () {
    this.subscribeToNextSource();
  };

  OnErrorResumeNextSubscriber.prototype.notifyComplete = function () {
    this.subscribeToNextSource();
  };

  OnErrorResumeNextSubscriber.prototype._error = function (err) {
    this.subscribeToNextSource();
    this.unsubscribe();
  };

  OnErrorResumeNextSubscriber.prototype._complete = function () {
    this.subscribeToNextSource();
    this.unsubscribe();
  };

  OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
    var next = this.nextSources.shift();

    if (!!next) {
      var innerSubscriber = new _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["SimpleInnerSubscriber"](this);
      var destination = this.destination;
      destination.add(innerSubscriber);
      var innerSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["innerSubscribe"])(next, innerSubscriber);

      if (innerSubscription !== innerSubscriber) {
        destination.add(innerSubscription);
      }
    } else {
      this.destination.complete();
    }
  };

  return OnErrorResumeNextSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/pairwise.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/pairwise.js ***!
  \****************************************************************/
/*! exports provided: pairwise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pairwise", function() { return pairwise; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function pairwise() {
  return function (source) {
    return source.lift(new PairwiseOperator());
  };
}

var PairwiseOperator = /*@__PURE__*/function () {
  function PairwiseOperator() {}

  PairwiseOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new PairwiseSubscriber(subscriber));
  };

  return PairwiseOperator;
}();

var PairwiseSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PairwiseSubscriber, _super);

  function PairwiseSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.hasPrev = false;
    return _this;
  }

  PairwiseSubscriber.prototype._next = function (value) {
    var pair;

    if (this.hasPrev) {
      pair = [this.prev, value];
    } else {
      this.hasPrev = true;
    }

    this.prev = value;

    if (pair) {
      this.destination.next(pair);
    }
  };

  return PairwiseSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/partition.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/partition.js ***!
  \*****************************************************************/
/*! exports provided: partition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "partition", function() { return partition; });
/* harmony import */ var _util_not__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/not */ "./node_modules/rxjs/_esm5/internal/util/not.js");
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ "./node_modules/rxjs/_esm5/internal/operators/filter.js");
/** PURE_IMPORTS_START _util_not,_filter PURE_IMPORTS_END */


function partition(predicate, thisArg) {
  return function (source) {
    return [Object(_filter__WEBPACK_IMPORTED_MODULE_1__["filter"])(predicate, thisArg)(source), Object(_filter__WEBPACK_IMPORTED_MODULE_1__["filter"])(Object(_util_not__WEBPACK_IMPORTED_MODULE_0__["not"])(predicate, thisArg))(source)];
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/pluck.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/pluck.js ***!
  \*************************************************************/
/*! exports provided: pluck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pluck", function() { return pluck; });
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/** PURE_IMPORTS_START _map PURE_IMPORTS_END */

function pluck() {
  var properties = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    properties[_i] = arguments[_i];
  }

  var length = properties.length;

  if (length === 0) {
    throw new Error('list of properties cannot be empty.');
  }

  return function (source) {
    return Object(_map__WEBPACK_IMPORTED_MODULE_0__["map"])(plucker(properties, length))(source);
  };
}

function plucker(props, length) {
  var mapper = function (x) {
    var currentProp = x;

    for (var i = 0; i < length; i++) {
      var p = currentProp != null ? currentProp[props[i]] : undefined;

      if (p !== void 0) {
        currentProp = p;
      } else {
        return undefined;
      }
    }

    return currentProp;
  };

  return mapper;
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/publish.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/publish.js ***!
  \***************************************************************/
/*! exports provided: publish */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _multicast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./multicast */ "./node_modules/rxjs/_esm5/internal/operators/multicast.js");
/** PURE_IMPORTS_START _Subject,_multicast PURE_IMPORTS_END */


function publish(selector) {
  return selector ? Object(_multicast__WEBPACK_IMPORTED_MODULE_1__["multicast"])(function () {
    return new _Subject__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
  }, selector) : Object(_multicast__WEBPACK_IMPORTED_MODULE_1__["multicast"])(new _Subject__WEBPACK_IMPORTED_MODULE_0__["Subject"]());
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/publishBehavior.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/publishBehavior.js ***!
  \***********************************************************************/
/*! exports provided: publishBehavior */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publishBehavior", function() { return publishBehavior; });
/* harmony import */ var _BehaviorSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BehaviorSubject */ "./node_modules/rxjs/_esm5/internal/BehaviorSubject.js");
/* harmony import */ var _multicast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./multicast */ "./node_modules/rxjs/_esm5/internal/operators/multicast.js");
/** PURE_IMPORTS_START _BehaviorSubject,_multicast PURE_IMPORTS_END */


function publishBehavior(value) {
  return function (source) {
    return Object(_multicast__WEBPACK_IMPORTED_MODULE_1__["multicast"])(new _BehaviorSubject__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](value))(source);
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/publishLast.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/publishLast.js ***!
  \*******************************************************************/
/*! exports provided: publishLast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publishLast", function() { return publishLast; });
/* harmony import */ var _AsyncSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AsyncSubject */ "./node_modules/rxjs/_esm5/internal/AsyncSubject.js");
/* harmony import */ var _multicast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./multicast */ "./node_modules/rxjs/_esm5/internal/operators/multicast.js");
/** PURE_IMPORTS_START _AsyncSubject,_multicast PURE_IMPORTS_END */


function publishLast() {
  return function (source) {
    return Object(_multicast__WEBPACK_IMPORTED_MODULE_1__["multicast"])(new _AsyncSubject__WEBPACK_IMPORTED_MODULE_0__["AsyncSubject"]())(source);
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/publishReplay.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/publishReplay.js ***!
  \*********************************************************************/
/*! exports provided: publishReplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publishReplay", function() { return publishReplay; });
/* harmony import */ var _ReplaySubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ReplaySubject */ "./node_modules/rxjs/_esm5/internal/ReplaySubject.js");
/* harmony import */ var _multicast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./multicast */ "./node_modules/rxjs/_esm5/internal/operators/multicast.js");
/** PURE_IMPORTS_START _ReplaySubject,_multicast PURE_IMPORTS_END */


function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
  if (selectorOrScheduler && typeof selectorOrScheduler !== 'function') {
    scheduler = selectorOrScheduler;
  }

  var selector = typeof selectorOrScheduler === 'function' ? selectorOrScheduler : undefined;
  var subject = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](bufferSize, windowTime, scheduler);
  return function (source) {
    return Object(_multicast__WEBPACK_IMPORTED_MODULE_1__["multicast"])(function () {
      return subject;
    }, selector)(source);
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/race.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/race.js ***!
  \************************************************************/
/*! exports provided: race */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "race", function() { return race; });
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _observable_race__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../observable/race */ "./node_modules/rxjs/_esm5/internal/observable/race.js");
/** PURE_IMPORTS_START _util_isArray,_observable_race PURE_IMPORTS_END */


function race() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  return function raceOperatorFunction(source) {
    if (observables.length === 1 && Object(_util_isArray__WEBPACK_IMPORTED_MODULE_0__["isArray"])(observables[0])) {
      observables = observables[0];
    }

    return source.lift.call(_observable_race__WEBPACK_IMPORTED_MODULE_1__["race"].apply(void 0, [source].concat(observables)));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/reduce.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/reduce.js ***!
  \**************************************************************/
/*! exports provided: reduce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return reduce; });
/* harmony import */ var _scan__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scan */ "./node_modules/rxjs/_esm5/internal/operators/scan.js");
/* harmony import */ var _takeLast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./takeLast */ "./node_modules/rxjs/_esm5/internal/operators/takeLast.js");
/* harmony import */ var _defaultIfEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultIfEmpty */ "./node_modules/rxjs/_esm5/internal/operators/defaultIfEmpty.js");
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/pipe */ "./node_modules/rxjs/_esm5/internal/util/pipe.js");
/** PURE_IMPORTS_START _scan,_takeLast,_defaultIfEmpty,_util_pipe PURE_IMPORTS_END */




function reduce(accumulator, seed) {
  if (arguments.length >= 2) {
    return function reduceOperatorFunctionWithSeed(source) {
      return Object(_util_pipe__WEBPACK_IMPORTED_MODULE_3__["pipe"])(Object(_scan__WEBPACK_IMPORTED_MODULE_0__["scan"])(accumulator, seed), Object(_takeLast__WEBPACK_IMPORTED_MODULE_1__["takeLast"])(1), Object(_defaultIfEmpty__WEBPACK_IMPORTED_MODULE_2__["defaultIfEmpty"])(seed))(source);
    };
  }

  return function reduceOperatorFunction(source) {
    return Object(_util_pipe__WEBPACK_IMPORTED_MODULE_3__["pipe"])(Object(_scan__WEBPACK_IMPORTED_MODULE_0__["scan"])(function (acc, value, index) {
      return accumulator(acc, value, index + 1);
    }), Object(_takeLast__WEBPACK_IMPORTED_MODULE_1__["takeLast"])(1))(source);
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/refCount.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/refCount.js ***!
  \****************************************************************/
/*! exports provided: refCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refCount", function() { return refCount; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function refCount() {
  return function refCountOperatorFunction(source) {
    return source.lift(new RefCountOperator(source));
  };
}

var RefCountOperator = /*@__PURE__*/function () {
  function RefCountOperator(connectable) {
    this.connectable = connectable;
  }

  RefCountOperator.prototype.call = function (subscriber, source) {
    var connectable = this.connectable;
    connectable._refCount++;
    var refCounter = new RefCountSubscriber(subscriber, connectable);
    var subscription = source.subscribe(refCounter);

    if (!refCounter.closed) {
      refCounter.connection = connectable.connect();
    }

    return subscription;
  };

  return RefCountOperator;
}();

var RefCountSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RefCountSubscriber, _super);

  function RefCountSubscriber(destination, connectable) {
    var _this = _super.call(this, destination) || this;

    _this.connectable = connectable;
    return _this;
  }

  RefCountSubscriber.prototype._unsubscribe = function () {
    var connectable = this.connectable;

    if (!connectable) {
      this.connection = null;
      return;
    }

    this.connectable = null;
    var refCount = connectable._refCount;

    if (refCount <= 0) {
      this.connection = null;
      return;
    }

    connectable._refCount = refCount - 1;

    if (refCount > 1) {
      this.connection = null;
      return;
    }

    var connection = this.connection;
    var sharedConnection = connectable._connection;
    this.connection = null;

    if (sharedConnection && (!connection || sharedConnection === connection)) {
      sharedConnection.unsubscribe();
    }
  };

  return RefCountSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/repeat.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/repeat.js ***!
  \**************************************************************/
/*! exports provided: repeat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return repeat; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/empty */ "./node_modules/rxjs/_esm5/internal/observable/empty.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_observable_empty PURE_IMPORTS_END */



function repeat(count) {
  if (count === void 0) {
    count = -1;
  }

  return function (source) {
    if (count === 0) {
      return Object(_observable_empty__WEBPACK_IMPORTED_MODULE_2__["empty"])();
    } else if (count < 0) {
      return source.lift(new RepeatOperator(-1, source));
    } else {
      return source.lift(new RepeatOperator(count - 1, source));
    }
  };
}

var RepeatOperator = /*@__PURE__*/function () {
  function RepeatOperator(count, source) {
    this.count = count;
    this.source = source;
  }

  RepeatOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
  };

  return RepeatOperator;
}();

var RepeatSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RepeatSubscriber, _super);

  function RepeatSubscriber(destination, count, source) {
    var _this = _super.call(this, destination) || this;

    _this.count = count;
    _this.source = source;
    return _this;
  }

  RepeatSubscriber.prototype.complete = function () {
    if (!this.isStopped) {
      var _a = this,
          source = _a.source,
          count = _a.count;

      if (count === 0) {
        return _super.prototype.complete.call(this);
      } else if (count > -1) {
        this.count = count - 1;
      }

      source.subscribe(this._unsubscribeAndRecycle());
    }
  };

  return RepeatSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/repeatWhen.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/repeatWhen.js ***!
  \******************************************************************/
/*! exports provided: repeatWhen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repeatWhen", function() { return repeatWhen; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_Subject,_innerSubscribe PURE_IMPORTS_END */



function repeatWhen(notifier) {
  return function (source) {
    return source.lift(new RepeatWhenOperator(notifier));
  };
}

var RepeatWhenOperator = /*@__PURE__*/function () {
  function RepeatWhenOperator(notifier) {
    this.notifier = notifier;
  }

  RepeatWhenOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
  };

  return RepeatWhenOperator;
}();

var RepeatWhenSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RepeatWhenSubscriber, _super);

  function RepeatWhenSubscriber(destination, notifier, source) {
    var _this = _super.call(this, destination) || this;

    _this.notifier = notifier;
    _this.source = source;
    _this.sourceIsBeingSubscribedTo = true;
    return _this;
  }

  RepeatWhenSubscriber.prototype.notifyNext = function () {
    this.sourceIsBeingSubscribedTo = true;
    this.source.subscribe(this);
  };

  RepeatWhenSubscriber.prototype.notifyComplete = function () {
    if (this.sourceIsBeingSubscribedTo === false) {
      return _super.prototype.complete.call(this);
    }
  };

  RepeatWhenSubscriber.prototype.complete = function () {
    this.sourceIsBeingSubscribedTo = false;

    if (!this.isStopped) {
      if (!this.retries) {
        this.subscribeToRetries();
      }

      if (!this.retriesSubscription || this.retriesSubscription.closed) {
        return _super.prototype.complete.call(this);
      }

      this._unsubscribeAndRecycle();

      this.notifications.next(undefined);
    }
  };

  RepeatWhenSubscriber.prototype._unsubscribe = function () {
    var _a = this,
        notifications = _a.notifications,
        retriesSubscription = _a.retriesSubscription;

    if (notifications) {
      notifications.unsubscribe();
      this.notifications = undefined;
    }

    if (retriesSubscription) {
      retriesSubscription.unsubscribe();
      this.retriesSubscription = undefined;
    }

    this.retries = undefined;
  };

  RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
    var _unsubscribe = this._unsubscribe;
    this._unsubscribe = null;

    _super.prototype._unsubscribeAndRecycle.call(this);

    this._unsubscribe = _unsubscribe;
    return this;
  };

  RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
    this.notifications = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    var retries;

    try {
      var notifier = this.notifier;
      retries = notifier(this.notifications);
    } catch (e) {
      return _super.prototype.complete.call(this);
    }

    this.retries = retries;
    this.retriesSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["innerSubscribe"])(retries, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["SimpleInnerSubscriber"](this));
  };

  return RepeatWhenSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/retry.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/retry.js ***!
  \*************************************************************/
/*! exports provided: retry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retry", function() { return retry; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function retry(count) {
  if (count === void 0) {
    count = -1;
  }

  return function (source) {
    return source.lift(new RetryOperator(count, source));
  };
}

var RetryOperator = /*@__PURE__*/function () {
  function RetryOperator(count, source) {
    this.count = count;
    this.source = source;
  }

  RetryOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new RetrySubscriber(subscriber, this.count, this.source));
  };

  return RetryOperator;
}();

var RetrySubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RetrySubscriber, _super);

  function RetrySubscriber(destination, count, source) {
    var _this = _super.call(this, destination) || this;

    _this.count = count;
    _this.source = source;
    return _this;
  }

  RetrySubscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      var _a = this,
          source = _a.source,
          count = _a.count;

      if (count === 0) {
        return _super.prototype.error.call(this, err);
      } else if (count > -1) {
        this.count = count - 1;
      }

      source.subscribe(this._unsubscribeAndRecycle());
    }
  };

  return RetrySubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/retryWhen.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/retryWhen.js ***!
  \*****************************************************************/
/*! exports provided: retryWhen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retryWhen", function() { return retryWhen; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_Subject,_innerSubscribe PURE_IMPORTS_END */



function retryWhen(notifier) {
  return function (source) {
    return source.lift(new RetryWhenOperator(notifier, source));
  };
}

var RetryWhenOperator = /*@__PURE__*/function () {
  function RetryWhenOperator(notifier, source) {
    this.notifier = notifier;
    this.source = source;
  }

  RetryWhenOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
  };

  return RetryWhenOperator;
}();

var RetryWhenSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](RetryWhenSubscriber, _super);

  function RetryWhenSubscriber(destination, notifier, source) {
    var _this = _super.call(this, destination) || this;

    _this.notifier = notifier;
    _this.source = source;
    return _this;
  }

  RetryWhenSubscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      var errors = this.errors;
      var retries = this.retries;
      var retriesSubscription = this.retriesSubscription;

      if (!retries) {
        errors = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();

        try {
          var notifier = this.notifier;
          retries = notifier(errors);
        } catch (e) {
          return _super.prototype.error.call(this, e);
        }

        retriesSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["innerSubscribe"])(retries, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["SimpleInnerSubscriber"](this));
      } else {
        this.errors = undefined;
        this.retriesSubscription = undefined;
      }

      this._unsubscribeAndRecycle();

      this.errors = errors;
      this.retries = retries;
      this.retriesSubscription = retriesSubscription;
      errors.next(err);
    }
  };

  RetryWhenSubscriber.prototype._unsubscribe = function () {
    var _a = this,
        errors = _a.errors,
        retriesSubscription = _a.retriesSubscription;

    if (errors) {
      errors.unsubscribe();
      this.errors = undefined;
    }

    if (retriesSubscription) {
      retriesSubscription.unsubscribe();
      this.retriesSubscription = undefined;
    }

    this.retries = undefined;
  };

  RetryWhenSubscriber.prototype.notifyNext = function () {
    var _unsubscribe = this._unsubscribe;
    this._unsubscribe = null;

    this._unsubscribeAndRecycle();

    this._unsubscribe = _unsubscribe;
    this.source.subscribe(this);
  };

  return RetryWhenSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/sample.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/sample.js ***!
  \**************************************************************/
/*! exports provided: sample */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sample", function() { return sample; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function sample(notifier) {
  return function (source) {
    return source.lift(new SampleOperator(notifier));
  };
}

var SampleOperator = /*@__PURE__*/function () {
  function SampleOperator(notifier) {
    this.notifier = notifier;
  }

  SampleOperator.prototype.call = function (subscriber, source) {
    var sampleSubscriber = new SampleSubscriber(subscriber);
    var subscription = source.subscribe(sampleSubscriber);
    subscription.add(Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(this.notifier, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](sampleSubscriber)));
    return subscription;
  };

  return SampleOperator;
}();

var SampleSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SampleSubscriber, _super);

  function SampleSubscriber() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.hasValue = false;
    return _this;
  }

  SampleSubscriber.prototype._next = function (value) {
    this.value = value;
    this.hasValue = true;
  };

  SampleSubscriber.prototype.notifyNext = function () {
    this.emitValue();
  };

  SampleSubscriber.prototype.notifyComplete = function () {
    this.emitValue();
  };

  SampleSubscriber.prototype.emitValue = function () {
    if (this.hasValue) {
      this.hasValue = false;
      this.destination.next(this.value);
    }
  };

  return SampleSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/sampleTime.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/sampleTime.js ***!
  \******************************************************************/
/*! exports provided: sampleTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sampleTime", function() { return sampleTime; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */



function sampleTime(period, scheduler) {
  if (scheduler === void 0) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_2__["async"];
  }

  return function (source) {
    return source.lift(new SampleTimeOperator(period, scheduler));
  };
}

var SampleTimeOperator = /*@__PURE__*/function () {
  function SampleTimeOperator(period, scheduler) {
    this.period = period;
    this.scheduler = scheduler;
  }

  SampleTimeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
  };

  return SampleTimeOperator;
}();

var SampleTimeSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SampleTimeSubscriber, _super);

  function SampleTimeSubscriber(destination, period, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.period = period;
    _this.scheduler = scheduler;
    _this.hasValue = false;

    _this.add(scheduler.schedule(dispatchNotification, period, {
      subscriber: _this,
      period: period
    }));

    return _this;
  }

  SampleTimeSubscriber.prototype._next = function (value) {
    this.lastValue = value;
    this.hasValue = true;
  };

  SampleTimeSubscriber.prototype.notifyNext = function () {
    if (this.hasValue) {
      this.hasValue = false;
      this.destination.next(this.lastValue);
    }
  };

  return SampleTimeSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

function dispatchNotification(state) {
  var subscriber = state.subscriber,
      period = state.period;
  subscriber.notifyNext();
  this.schedule(state, period);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/scan.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/scan.js ***!
  \************************************************************/
/*! exports provided: scan */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return scan; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function scan(accumulator, seed) {
  var hasSeed = false;

  if (arguments.length >= 2) {
    hasSeed = true;
  }

  return function scanOperatorFunction(source) {
    return source.lift(new ScanOperator(accumulator, seed, hasSeed));
  };
}

var ScanOperator = /*@__PURE__*/function () {
  function ScanOperator(accumulator, seed, hasSeed) {
    if (hasSeed === void 0) {
      hasSeed = false;
    }

    this.accumulator = accumulator;
    this.seed = seed;
    this.hasSeed = hasSeed;
  }

  ScanOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
  };

  return ScanOperator;
}();

var ScanSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ScanSubscriber, _super);

  function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
    var _this = _super.call(this, destination) || this;

    _this.accumulator = accumulator;
    _this._seed = _seed;
    _this.hasSeed = hasSeed;
    _this.index = 0;
    return _this;
  }

  Object.defineProperty(ScanSubscriber.prototype, "seed", {
    get: function () {
      return this._seed;
    },
    set: function (value) {
      this.hasSeed = true;
      this._seed = value;
    },
    enumerable: true,
    configurable: true
  });

  ScanSubscriber.prototype._next = function (value) {
    if (!this.hasSeed) {
      this.seed = value;
      this.destination.next(value);
    } else {
      return this._tryNext(value);
    }
  };

  ScanSubscriber.prototype._tryNext = function (value) {
    var index = this.index++;
    var result;

    try {
      result = this.accumulator(this.seed, value, index);
    } catch (err) {
      this.destination.error(err);
    }

    this.seed = result;
    this.destination.next(result);
  };

  return ScanSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/sequenceEqual.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/sequenceEqual.js ***!
  \*********************************************************************/
/*! exports provided: sequenceEqual, SequenceEqualOperator, SequenceEqualSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sequenceEqual", function() { return sequenceEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SequenceEqualOperator", function() { return SequenceEqualOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SequenceEqualSubscriber", function() { return SequenceEqualSubscriber; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function sequenceEqual(compareTo, comparator) {
  return function (source) {
    return source.lift(new SequenceEqualOperator(compareTo, comparator));
  };
}

var SequenceEqualOperator = /*@__PURE__*/function () {
  function SequenceEqualOperator(compareTo, comparator) {
    this.compareTo = compareTo;
    this.comparator = comparator;
  }

  SequenceEqualOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparator));
  };

  return SequenceEqualOperator;
}();



var SequenceEqualSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SequenceEqualSubscriber, _super);

  function SequenceEqualSubscriber(destination, compareTo, comparator) {
    var _this = _super.call(this, destination) || this;

    _this.compareTo = compareTo;
    _this.comparator = comparator;
    _this._a = [];
    _this._b = [];
    _this._oneComplete = false;

    _this.destination.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, _this)));

    return _this;
  }

  SequenceEqualSubscriber.prototype._next = function (value) {
    if (this._oneComplete && this._b.length === 0) {
      this.emit(false);
    } else {
      this._a.push(value);

      this.checkValues();
    }
  };

  SequenceEqualSubscriber.prototype._complete = function () {
    if (this._oneComplete) {
      this.emit(this._a.length === 0 && this._b.length === 0);
    } else {
      this._oneComplete = true;
    }

    this.unsubscribe();
  };

  SequenceEqualSubscriber.prototype.checkValues = function () {
    var _c = this,
        _a = _c._a,
        _b = _c._b,
        comparator = _c.comparator;

    while (_a.length > 0 && _b.length > 0) {
      var a = _a.shift();

      var b = _b.shift();

      var areEqual = false;

      try {
        areEqual = comparator ? comparator(a, b) : a === b;
      } catch (e) {
        this.destination.error(e);
      }

      if (!areEqual) {
        this.emit(false);
      }
    }
  };

  SequenceEqualSubscriber.prototype.emit = function (value) {
    var destination = this.destination;
    destination.next(value);
    destination.complete();
  };

  SequenceEqualSubscriber.prototype.nextB = function (value) {
    if (this._oneComplete && this._a.length === 0) {
      this.emit(false);
    } else {
      this._b.push(value);

      this.checkValues();
    }
  };

  SequenceEqualSubscriber.prototype.completeB = function () {
    if (this._oneComplete) {
      this.emit(this._a.length === 0 && this._b.length === 0);
    } else {
      this._oneComplete = true;
    }
  };

  return SequenceEqualSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);



var SequenceEqualCompareToSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SequenceEqualCompareToSubscriber, _super);

  function SequenceEqualCompareToSubscriber(destination, parent) {
    var _this = _super.call(this, destination) || this;

    _this.parent = parent;
    return _this;
  }

  SequenceEqualCompareToSubscriber.prototype._next = function (value) {
    this.parent.nextB(value);
  };

  SequenceEqualCompareToSubscriber.prototype._error = function (err) {
    this.parent.error(err);
    this.unsubscribe();
  };

  SequenceEqualCompareToSubscriber.prototype._complete = function () {
    this.parent.completeB();
    this.unsubscribe();
  };

  return SequenceEqualCompareToSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/share.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/share.js ***!
  \*************************************************************/
/*! exports provided: share */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "share", function() { return share; });
/* harmony import */ var _multicast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./multicast */ "./node_modules/rxjs/_esm5/internal/operators/multicast.js");
/* harmony import */ var _refCount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./refCount */ "./node_modules/rxjs/_esm5/internal/operators/refCount.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/** PURE_IMPORTS_START _multicast,_refCount,_Subject PURE_IMPORTS_END */




function shareSubjectFactory() {
  return new _Subject__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
}

function share() {
  return function (source) {
    return Object(_refCount__WEBPACK_IMPORTED_MODULE_1__["refCount"])()(Object(_multicast__WEBPACK_IMPORTED_MODULE_0__["multicast"])(shareSubjectFactory)(source));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/shareReplay.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/shareReplay.js ***!
  \*******************************************************************/
/*! exports provided: shareReplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareReplay", function() { return shareReplay; });
/* harmony import */ var _ReplaySubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ReplaySubject */ "./node_modules/rxjs/_esm5/internal/ReplaySubject.js");
/** PURE_IMPORTS_START _ReplaySubject PURE_IMPORTS_END */

function shareReplay(configOrBufferSize, windowTime, scheduler) {
  var config;

  if (configOrBufferSize && typeof configOrBufferSize === 'object') {
    config = configOrBufferSize;
  } else {
    config = {
      bufferSize: configOrBufferSize,
      windowTime: windowTime,
      refCount: false,
      scheduler: scheduler
    };
  }

  return function (source) {
    return source.lift(shareReplayOperator(config));
  };
}

function shareReplayOperator(_a) {
  var _b = _a.bufferSize,
      bufferSize = _b === void 0 ? Number.POSITIVE_INFINITY : _b,
      _c = _a.windowTime,
      windowTime = _c === void 0 ? Number.POSITIVE_INFINITY : _c,
      useRefCount = _a.refCount,
      scheduler = _a.scheduler;
  var subject;
  var refCount = 0;
  var subscription;
  var hasError = false;
  var isComplete = false;
  return function shareReplayOperation(source) {
    refCount++;
    var innerSub;

    if (!subject || hasError) {
      hasError = false;
      subject = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](bufferSize, windowTime, scheduler);
      innerSub = subject.subscribe(this);
      subscription = source.subscribe({
        next: function (value) {
          subject.next(value);
        },
        error: function (err) {
          hasError = true;
          subject.error(err);
        },
        complete: function () {
          isComplete = true;
          subscription = undefined;
          subject.complete();
        }
      });

      if (isComplete) {
        subscription = undefined;
      }
    } else {
      innerSub = subject.subscribe(this);
    }

    this.add(function () {
      refCount--;
      innerSub.unsubscribe();
      innerSub = undefined;

      if (subscription && !isComplete && useRefCount && refCount === 0) {
        subscription.unsubscribe();
        subscription = undefined;
        subject = undefined;
      }
    });
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/single.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/single.js ***!
  \**************************************************************/
/*! exports provided: single */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "single", function() { return single; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/EmptyError */ "./node_modules/rxjs/_esm5/internal/util/EmptyError.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_util_EmptyError PURE_IMPORTS_END */



function single(predicate) {
  return function (source) {
    return source.lift(new SingleOperator(predicate, source));
  };
}

var SingleOperator = /*@__PURE__*/function () {
  function SingleOperator(predicate, source) {
    this.predicate = predicate;
    this.source = source;
  }

  SingleOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
  };

  return SingleOperator;
}();

var SingleSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SingleSubscriber, _super);

  function SingleSubscriber(destination, predicate, source) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.source = source;
    _this.seenValue = false;
    _this.index = 0;
    return _this;
  }

  SingleSubscriber.prototype.applySingleValue = function (value) {
    if (this.seenValue) {
      this.destination.error('Sequence contains more than one element');
    } else {
      this.seenValue = true;
      this.singleValue = value;
    }
  };

  SingleSubscriber.prototype._next = function (value) {
    var index = this.index++;

    if (this.predicate) {
      this.tryNext(value, index);
    } else {
      this.applySingleValue(value);
    }
  };

  SingleSubscriber.prototype.tryNext = function (value, index) {
    try {
      if (this.predicate(value, index, this.source)) {
        this.applySingleValue(value);
      }
    } catch (err) {
      this.destination.error(err);
    }
  };

  SingleSubscriber.prototype._complete = function () {
    var destination = this.destination;

    if (this.index > 0) {
      destination.next(this.seenValue ? this.singleValue : undefined);
      destination.complete();
    } else {
      destination.error(new _util_EmptyError__WEBPACK_IMPORTED_MODULE_2__["EmptyError"]());
    }
  };

  return SingleSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/skip.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/skip.js ***!
  \************************************************************/
/*! exports provided: skip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skip", function() { return skip; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function skip(count) {
  return function (source) {
    return source.lift(new SkipOperator(count));
  };
}

var SkipOperator = /*@__PURE__*/function () {
  function SkipOperator(total) {
    this.total = total;
  }

  SkipOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new SkipSubscriber(subscriber, this.total));
  };

  return SkipOperator;
}();

var SkipSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SkipSubscriber, _super);

  function SkipSubscriber(destination, total) {
    var _this = _super.call(this, destination) || this;

    _this.total = total;
    _this.count = 0;
    return _this;
  }

  SkipSubscriber.prototype._next = function (x) {
    if (++this.count > this.total) {
      this.destination.next(x);
    }
  };

  return SkipSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/skipLast.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/skipLast.js ***!
  \****************************************************************/
/*! exports provided: skipLast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skipLast", function() { return skipLast; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/ArgumentOutOfRangeError */ "./node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError PURE_IMPORTS_END */



function skipLast(count) {
  return function (source) {
    return source.lift(new SkipLastOperator(count));
  };
}

var SkipLastOperator = /*@__PURE__*/function () {
  function SkipLastOperator(_skipCount) {
    this._skipCount = _skipCount;

    if (this._skipCount < 0) {
      throw new _util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_2__["ArgumentOutOfRangeError"]();
    }
  }

  SkipLastOperator.prototype.call = function (subscriber, source) {
    if (this._skipCount === 0) {
      return source.subscribe(new _Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"](subscriber));
    } else {
      return source.subscribe(new SkipLastSubscriber(subscriber, this._skipCount));
    }
  };

  return SkipLastOperator;
}();

var SkipLastSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SkipLastSubscriber, _super);

  function SkipLastSubscriber(destination, _skipCount) {
    var _this = _super.call(this, destination) || this;

    _this._skipCount = _skipCount;
    _this._count = 0;
    _this._ring = new Array(_skipCount);
    return _this;
  }

  SkipLastSubscriber.prototype._next = function (value) {
    var skipCount = this._skipCount;
    var count = this._count++;

    if (count < skipCount) {
      this._ring[count] = value;
    } else {
      var currentIndex = count % skipCount;
      var ring = this._ring;
      var oldValue = ring[currentIndex];
      ring[currentIndex] = value;
      this.destination.next(oldValue);
    }
  };

  return SkipLastSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/skipUntil.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/skipUntil.js ***!
  \*****************************************************************/
/*! exports provided: skipUntil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skipUntil", function() { return skipUntil; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function skipUntil(notifier) {
  return function (source) {
    return source.lift(new SkipUntilOperator(notifier));
  };
}

var SkipUntilOperator = /*@__PURE__*/function () {
  function SkipUntilOperator(notifier) {
    this.notifier = notifier;
  }

  SkipUntilOperator.prototype.call = function (destination, source) {
    return source.subscribe(new SkipUntilSubscriber(destination, this.notifier));
  };

  return SkipUntilOperator;
}();

var SkipUntilSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SkipUntilSubscriber, _super);

  function SkipUntilSubscriber(destination, notifier) {
    var _this = _super.call(this, destination) || this;

    _this.hasValue = false;
    var innerSubscriber = new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](_this);

    _this.add(innerSubscriber);

    _this.innerSubscription = innerSubscriber;
    var innerSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(notifier, innerSubscriber);

    if (innerSubscription !== innerSubscriber) {
      _this.add(innerSubscription);

      _this.innerSubscription = innerSubscription;
    }

    return _this;
  }

  SkipUntilSubscriber.prototype._next = function (value) {
    if (this.hasValue) {
      _super.prototype._next.call(this, value);
    }
  };

  SkipUntilSubscriber.prototype.notifyNext = function () {
    this.hasValue = true;

    if (this.innerSubscription) {
      this.innerSubscription.unsubscribe();
    }
  };

  SkipUntilSubscriber.prototype.notifyComplete = function () {};

  return SkipUntilSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/skipWhile.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/skipWhile.js ***!
  \*****************************************************************/
/*! exports provided: skipWhile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skipWhile", function() { return skipWhile; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function skipWhile(predicate) {
  return function (source) {
    return source.lift(new SkipWhileOperator(predicate));
  };
}

var SkipWhileOperator = /*@__PURE__*/function () {
  function SkipWhileOperator(predicate) {
    this.predicate = predicate;
  }

  SkipWhileOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
  };

  return SkipWhileOperator;
}();

var SkipWhileSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SkipWhileSubscriber, _super);

  function SkipWhileSubscriber(destination, predicate) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.skipping = true;
    _this.index = 0;
    return _this;
  }

  SkipWhileSubscriber.prototype._next = function (value) {
    var destination = this.destination;

    if (this.skipping) {
      this.tryCallPredicate(value);
    }

    if (!this.skipping) {
      destination.next(value);
    }
  };

  SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
    try {
      var result = this.predicate(value, this.index++);
      this.skipping = Boolean(result);
    } catch (err) {
      this.destination.error(err);
    }
  };

  return SkipWhileSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/startWith.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/startWith.js ***!
  \*****************************************************************/
/*! exports provided: startWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startWith", function() { return startWith; });
/* harmony import */ var _observable_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/concat */ "./node_modules/rxjs/_esm5/internal/observable/concat.js");
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js");
/** PURE_IMPORTS_START _observable_concat,_util_isScheduler PURE_IMPORTS_END */


function startWith() {
  var array = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    array[_i] = arguments[_i];
  }

  var scheduler = array[array.length - 1];

  if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_1__["isScheduler"])(scheduler)) {
    array.pop();
    return function (source) {
      return Object(_observable_concat__WEBPACK_IMPORTED_MODULE_0__["concat"])(array, source, scheduler);
    };
  } else {
    return function (source) {
      return Object(_observable_concat__WEBPACK_IMPORTED_MODULE_0__["concat"])(array, source);
    };
  }
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/subscribeOn.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/subscribeOn.js ***!
  \*******************************************************************/
/*! exports provided: subscribeOn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeOn", function() { return subscribeOn; });
/* harmony import */ var _observable_SubscribeOnObservable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/SubscribeOnObservable */ "./node_modules/rxjs/_esm5/internal/observable/SubscribeOnObservable.js");
/** PURE_IMPORTS_START _observable_SubscribeOnObservable PURE_IMPORTS_END */

function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  return function subscribeOnOperatorFunction(source) {
    return source.lift(new SubscribeOnOperator(scheduler, delay));
  };
}

var SubscribeOnOperator = /*@__PURE__*/function () {
  function SubscribeOnOperator(scheduler, delay) {
    this.scheduler = scheduler;
    this.delay = delay;
  }

  SubscribeOnOperator.prototype.call = function (subscriber, source) {
    return new _observable_SubscribeOnObservable__WEBPACK_IMPORTED_MODULE_0__["SubscribeOnObservable"](source, this.delay, this.scheduler).subscribe(subscriber);
  };

  return SubscribeOnOperator;
}();

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/switchAll.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/switchAll.js ***!
  \*****************************************************************/
/*! exports provided: switchAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchAll", function() { return switchAll; });
/* harmony import */ var _switchMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./switchMap */ "./node_modules/rxjs/_esm5/internal/operators/switchMap.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/identity */ "./node_modules/rxjs/_esm5/internal/util/identity.js");
/** PURE_IMPORTS_START _switchMap,_util_identity PURE_IMPORTS_END */


function switchAll() {
  return Object(_switchMap__WEBPACK_IMPORTED_MODULE_0__["switchMap"])(_util_identity__WEBPACK_IMPORTED_MODULE_1__["identity"]);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/switchMap.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/switchMap.js ***!
  \*****************************************************************/
/*! exports provided: switchMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchMap", function() { return switchMap; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/from */ "./node_modules/rxjs/_esm5/internal/observable/from.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_map,_observable_from,_innerSubscribe PURE_IMPORTS_END */




function switchMap(project, resultSelector) {
  if (typeof resultSelector === 'function') {
    return function (source) {
      return source.pipe(switchMap(function (a, i) {
        return Object(_observable_from__WEBPACK_IMPORTED_MODULE_2__["from"])(project(a, i)).pipe(Object(_map__WEBPACK_IMPORTED_MODULE_1__["map"])(function (b, ii) {
          return resultSelector(a, b, i, ii);
        }));
      }));
    };
  }

  return function (source) {
    return source.lift(new SwitchMapOperator(project));
  };
}

var SwitchMapOperator = /*@__PURE__*/function () {
  function SwitchMapOperator(project) {
    this.project = project;
  }

  SwitchMapOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new SwitchMapSubscriber(subscriber, this.project));
  };

  return SwitchMapOperator;
}();

var SwitchMapSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SwitchMapSubscriber, _super);

  function SwitchMapSubscriber(destination, project) {
    var _this = _super.call(this, destination) || this;

    _this.project = project;
    _this.index = 0;
    return _this;
  }

  SwitchMapSubscriber.prototype._next = function (value) {
    var result;
    var index = this.index++;

    try {
      result = this.project(value, index);
    } catch (error) {
      this.destination.error(error);
      return;
    }

    this._innerSub(result);
  };

  SwitchMapSubscriber.prototype._innerSub = function (result) {
    var innerSubscription = this.innerSubscription;

    if (innerSubscription) {
      innerSubscription.unsubscribe();
    }

    var innerSubscriber = new _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["SimpleInnerSubscriber"](this);
    var destination = this.destination;
    destination.add(innerSubscriber);
    this.innerSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["innerSubscribe"])(result, innerSubscriber);

    if (this.innerSubscription !== innerSubscriber) {
      destination.add(this.innerSubscription);
    }
  };

  SwitchMapSubscriber.prototype._complete = function () {
    var innerSubscription = this.innerSubscription;

    if (!innerSubscription || innerSubscription.closed) {
      _super.prototype._complete.call(this);
    }

    this.unsubscribe();
  };

  SwitchMapSubscriber.prototype._unsubscribe = function () {
    this.innerSubscription = undefined;
  };

  SwitchMapSubscriber.prototype.notifyComplete = function () {
    this.innerSubscription = undefined;

    if (this.isStopped) {
      _super.prototype._complete.call(this);
    }
  };

  SwitchMapSubscriber.prototype.notifyNext = function (innerValue) {
    this.destination.next(innerValue);
  };

  return SwitchMapSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/switchMapTo.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/switchMapTo.js ***!
  \*******************************************************************/
/*! exports provided: switchMapTo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchMapTo", function() { return switchMapTo; });
/* harmony import */ var _switchMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./switchMap */ "./node_modules/rxjs/_esm5/internal/operators/switchMap.js");
/** PURE_IMPORTS_START _switchMap PURE_IMPORTS_END */

function switchMapTo(innerObservable, resultSelector) {
  return resultSelector ? Object(_switchMap__WEBPACK_IMPORTED_MODULE_0__["switchMap"])(function () {
    return innerObservable;
  }, resultSelector) : Object(_switchMap__WEBPACK_IMPORTED_MODULE_0__["switchMap"])(function () {
    return innerObservable;
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/take.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/take.js ***!
  \************************************************************/
/*! exports provided: take */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "take", function() { return take; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/ArgumentOutOfRangeError */ "./node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js");
/* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../observable/empty */ "./node_modules/rxjs/_esm5/internal/observable/empty.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */




function take(count) {
  return function (source) {
    if (count === 0) {
      return Object(_observable_empty__WEBPACK_IMPORTED_MODULE_3__["empty"])();
    } else {
      return source.lift(new TakeOperator(count));
    }
  };
}

var TakeOperator = /*@__PURE__*/function () {
  function TakeOperator(total) {
    this.total = total;

    if (this.total < 0) {
      throw new _util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_2__["ArgumentOutOfRangeError"]();
    }
  }

  TakeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new TakeSubscriber(subscriber, this.total));
  };

  return TakeOperator;
}();

var TakeSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TakeSubscriber, _super);

  function TakeSubscriber(destination, total) {
    var _this = _super.call(this, destination) || this;

    _this.total = total;
    _this.count = 0;
    return _this;
  }

  TakeSubscriber.prototype._next = function (value) {
    var total = this.total;
    var count = ++this.count;

    if (count <= total) {
      this.destination.next(value);

      if (count === total) {
        this.destination.complete();
        this.unsubscribe();
      }
    }
  };

  return TakeSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/takeLast.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/takeLast.js ***!
  \****************************************************************/
/*! exports provided: takeLast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "takeLast", function() { return takeLast; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/ArgumentOutOfRangeError */ "./node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js");
/* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../observable/empty */ "./node_modules/rxjs/_esm5/internal/observable/empty.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */




function takeLast(count) {
  return function takeLastOperatorFunction(source) {
    if (count === 0) {
      return Object(_observable_empty__WEBPACK_IMPORTED_MODULE_3__["empty"])();
    } else {
      return source.lift(new TakeLastOperator(count));
    }
  };
}

var TakeLastOperator = /*@__PURE__*/function () {
  function TakeLastOperator(total) {
    this.total = total;

    if (this.total < 0) {
      throw new _util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_2__["ArgumentOutOfRangeError"]();
    }
  }

  TakeLastOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
  };

  return TakeLastOperator;
}();

var TakeLastSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TakeLastSubscriber, _super);

  function TakeLastSubscriber(destination, total) {
    var _this = _super.call(this, destination) || this;

    _this.total = total;
    _this.ring = new Array();
    _this.count = 0;
    return _this;
  }

  TakeLastSubscriber.prototype._next = function (value) {
    var ring = this.ring;
    var total = this.total;
    var count = this.count++;

    if (ring.length < total) {
      ring.push(value);
    } else {
      var index = count % total;
      ring[index] = value;
    }
  };

  TakeLastSubscriber.prototype._complete = function () {
    var destination = this.destination;
    var count = this.count;

    if (count > 0) {
      var total = this.count >= this.total ? this.total : this.count;
      var ring = this.ring;

      for (var i = 0; i < total; i++) {
        var idx = count++ % total;
        destination.next(ring[idx]);
      }
    }

    destination.complete();
  };

  return TakeLastSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/takeUntil.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/takeUntil.js ***!
  \*****************************************************************/
/*! exports provided: takeUntil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "takeUntil", function() { return takeUntil; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


function takeUntil(notifier) {
  return function (source) {
    return source.lift(new TakeUntilOperator(notifier));
  };
}

var TakeUntilOperator = /*@__PURE__*/function () {
  function TakeUntilOperator(notifier) {
    this.notifier = notifier;
  }

  TakeUntilOperator.prototype.call = function (subscriber, source) {
    var takeUntilSubscriber = new TakeUntilSubscriber(subscriber);
    var notifierSubscription = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(this.notifier, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](takeUntilSubscriber));

    if (notifierSubscription && !takeUntilSubscriber.seenValue) {
      takeUntilSubscriber.add(notifierSubscription);
      return source.subscribe(takeUntilSubscriber);
    }

    return takeUntilSubscriber;
  };

  return TakeUntilOperator;
}();

var TakeUntilSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TakeUntilSubscriber, _super);

  function TakeUntilSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.seenValue = false;
    return _this;
  }

  TakeUntilSubscriber.prototype.notifyNext = function () {
    this.seenValue = true;
    this.complete();
  };

  TakeUntilSubscriber.prototype.notifyComplete = function () {};

  return TakeUntilSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/takeWhile.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/takeWhile.js ***!
  \*****************************************************************/
/*! exports provided: takeWhile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "takeWhile", function() { return takeWhile; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function takeWhile(predicate, inclusive) {
  if (inclusive === void 0) {
    inclusive = false;
  }

  return function (source) {
    return source.lift(new TakeWhileOperator(predicate, inclusive));
  };
}

var TakeWhileOperator = /*@__PURE__*/function () {
  function TakeWhileOperator(predicate, inclusive) {
    this.predicate = predicate;
    this.inclusive = inclusive;
  }

  TakeWhileOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new TakeWhileSubscriber(subscriber, this.predicate, this.inclusive));
  };

  return TakeWhileOperator;
}();

var TakeWhileSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TakeWhileSubscriber, _super);

  function TakeWhileSubscriber(destination, predicate, inclusive) {
    var _this = _super.call(this, destination) || this;

    _this.predicate = predicate;
    _this.inclusive = inclusive;
    _this.index = 0;
    return _this;
  }

  TakeWhileSubscriber.prototype._next = function (value) {
    var destination = this.destination;
    var result;

    try {
      result = this.predicate(value, this.index++);
    } catch (err) {
      destination.error(err);
      return;
    }

    this.nextOrComplete(value, result);
  };

  TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
    var destination = this.destination;

    if (Boolean(predicateResult)) {
      destination.next(value);
    } else {
      if (this.inclusive) {
        destination.next(value);
      }

      destination.complete();
    }
  };

  return TakeWhileSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/tap.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/tap.js ***!
  \***********************************************************/
/*! exports provided: tap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return tap; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/noop */ "./node_modules/rxjs/_esm5/internal/util/noop.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/_esm5/internal/util/isFunction.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_util_noop,_util_isFunction PURE_IMPORTS_END */




function tap(nextOrObserver, error, complete) {
  return function tapOperatorFunction(source) {
    return source.lift(new DoOperator(nextOrObserver, error, complete));
  };
}

var DoOperator = /*@__PURE__*/function () {
  function DoOperator(nextOrObserver, error, complete) {
    this.nextOrObserver = nextOrObserver;
    this.error = error;
    this.complete = complete;
  }

  DoOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
  };

  return DoOperator;
}();

var TapSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TapSubscriber, _super);

  function TapSubscriber(destination, observerOrNext, error, complete) {
    var _this = _super.call(this, destination) || this;

    _this._tapNext = _util_noop__WEBPACK_IMPORTED_MODULE_2__["noop"];
    _this._tapError = _util_noop__WEBPACK_IMPORTED_MODULE_2__["noop"];
    _this._tapComplete = _util_noop__WEBPACK_IMPORTED_MODULE_2__["noop"];
    _this._tapError = error || _util_noop__WEBPACK_IMPORTED_MODULE_2__["noop"];
    _this._tapComplete = complete || _util_noop__WEBPACK_IMPORTED_MODULE_2__["noop"];

    if (Object(_util_isFunction__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(observerOrNext)) {
      _this._context = _this;
      _this._tapNext = observerOrNext;
    } else if (observerOrNext) {
      _this._context = observerOrNext;
      _this._tapNext = observerOrNext.next || _util_noop__WEBPACK_IMPORTED_MODULE_2__["noop"];
      _this._tapError = observerOrNext.error || _util_noop__WEBPACK_IMPORTED_MODULE_2__["noop"];
      _this._tapComplete = observerOrNext.complete || _util_noop__WEBPACK_IMPORTED_MODULE_2__["noop"];
    }

    return _this;
  }

  TapSubscriber.prototype._next = function (value) {
    try {
      this._tapNext.call(this._context, value);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.next(value);
  };

  TapSubscriber.prototype._error = function (err) {
    try {
      this._tapError.call(this._context, err);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.error(err);
  };

  TapSubscriber.prototype._complete = function () {
    try {
      this._tapComplete.call(this._context);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    return this.destination.complete();
  };

  return TapSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/throttle.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/throttle.js ***!
  \****************************************************************/
/*! exports provided: defaultThrottleConfig, throttle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultThrottleConfig", function() { return defaultThrottleConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */


var defaultThrottleConfig = {
  leading: true,
  trailing: false
};
function throttle(durationSelector, config) {
  if (config === void 0) {
    config = defaultThrottleConfig;
  }

  return function (source) {
    return source.lift(new ThrottleOperator(durationSelector, !!config.leading, !!config.trailing));
  };
}

var ThrottleOperator = /*@__PURE__*/function () {
  function ThrottleOperator(durationSelector, leading, trailing) {
    this.durationSelector = durationSelector;
    this.leading = leading;
    this.trailing = trailing;
  }

  ThrottleOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
  };

  return ThrottleOperator;
}();

var ThrottleSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ThrottleSubscriber, _super);

  function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    _this.durationSelector = durationSelector;
    _this._leading = _leading;
    _this._trailing = _trailing;
    _this._hasValue = false;
    return _this;
  }

  ThrottleSubscriber.prototype._next = function (value) {
    this._hasValue = true;
    this._sendValue = value;

    if (!this._throttled) {
      if (this._leading) {
        this.send();
      } else {
        this.throttle(value);
      }
    }
  };

  ThrottleSubscriber.prototype.send = function () {
    var _a = this,
        _hasValue = _a._hasValue,
        _sendValue = _a._sendValue;

    if (_hasValue) {
      this.destination.next(_sendValue);
      this.throttle(_sendValue);
    }

    this._hasValue = false;
    this._sendValue = undefined;
  };

  ThrottleSubscriber.prototype.throttle = function (value) {
    var duration = this.tryDurationSelector(value);

    if (!!duration) {
      this.add(this._throttled = Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["innerSubscribe"])(duration, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleInnerSubscriber"](this)));
    }
  };

  ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
    try {
      return this.durationSelector(value);
    } catch (err) {
      this.destination.error(err);
      return null;
    }
  };

  ThrottleSubscriber.prototype.throttlingDone = function () {
    var _a = this,
        _throttled = _a._throttled,
        _trailing = _a._trailing;

    if (_throttled) {
      _throttled.unsubscribe();
    }

    this._throttled = undefined;

    if (_trailing) {
      this.send();
    }
  };

  ThrottleSubscriber.prototype.notifyNext = function () {
    this.throttlingDone();
  };

  ThrottleSubscriber.prototype.notifyComplete = function () {
    this.throttlingDone();
  };

  return ThrottleSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_1__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/throttleTime.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/throttleTime.js ***!
  \********************************************************************/
/*! exports provided: throttleTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttleTime", function() { return throttleTime; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony import */ var _throttle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./throttle */ "./node_modules/rxjs/_esm5/internal/operators/throttle.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async,_throttle PURE_IMPORTS_END */




function throttleTime(duration, scheduler, config) {
  if (scheduler === void 0) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_2__["async"];
  }

  if (config === void 0) {
    config = _throttle__WEBPACK_IMPORTED_MODULE_3__["defaultThrottleConfig"];
  }

  return function (source) {
    return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing));
  };
}

var ThrottleTimeOperator = /*@__PURE__*/function () {
  function ThrottleTimeOperator(duration, scheduler, leading, trailing) {
    this.duration = duration;
    this.scheduler = scheduler;
    this.leading = leading;
    this.trailing = trailing;
  }

  ThrottleTimeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
  };

  return ThrottleTimeOperator;
}();

var ThrottleTimeSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ThrottleTimeSubscriber, _super);

  function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
    var _this = _super.call(this, destination) || this;

    _this.duration = duration;
    _this.scheduler = scheduler;
    _this.leading = leading;
    _this.trailing = trailing;
    _this._hasTrailingValue = false;
    _this._trailingValue = null;
    return _this;
  }

  ThrottleTimeSubscriber.prototype._next = function (value) {
    if (this.throttled) {
      if (this.trailing) {
        this._trailingValue = value;
        this._hasTrailingValue = true;
      }
    } else {
      this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, {
        subscriber: this
      }));

      if (this.leading) {
        this.destination.next(value);
      } else if (this.trailing) {
        this._trailingValue = value;
        this._hasTrailingValue = true;
      }
    }
  };

  ThrottleTimeSubscriber.prototype._complete = function () {
    if (this._hasTrailingValue) {
      this.destination.next(this._trailingValue);
      this.destination.complete();
    } else {
      this.destination.complete();
    }
  };

  ThrottleTimeSubscriber.prototype.clearThrottle = function () {
    var throttled = this.throttled;

    if (throttled) {
      if (this.trailing && this._hasTrailingValue) {
        this.destination.next(this._trailingValue);
        this._trailingValue = null;
        this._hasTrailingValue = false;
      }

      throttled.unsubscribe();
      this.remove(throttled);
      this.throttled = null;
    }
  };

  return ThrottleTimeSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

function dispatchNext(arg) {
  var subscriber = arg.subscriber;
  subscriber.clearThrottle();
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/throwIfEmpty.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/throwIfEmpty.js ***!
  \********************************************************************/
/*! exports provided: throwIfEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwIfEmpty", function() { return throwIfEmpty; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/EmptyError */ "./node_modules/rxjs/_esm5/internal/util/EmptyError.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_util_EmptyError,_Subscriber PURE_IMPORTS_END */



function throwIfEmpty(errorFactory) {
  if (errorFactory === void 0) {
    errorFactory = defaultErrorFactory;
  }

  return function (source) {
    return source.lift(new ThrowIfEmptyOperator(errorFactory));
  };
}

var ThrowIfEmptyOperator = /*@__PURE__*/function () {
  function ThrowIfEmptyOperator(errorFactory) {
    this.errorFactory = errorFactory;
  }

  ThrowIfEmptyOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new ThrowIfEmptySubscriber(subscriber, this.errorFactory));
  };

  return ThrowIfEmptyOperator;
}();

var ThrowIfEmptySubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ThrowIfEmptySubscriber, _super);

  function ThrowIfEmptySubscriber(destination, errorFactory) {
    var _this = _super.call(this, destination) || this;

    _this.errorFactory = errorFactory;
    _this.hasValue = false;
    return _this;
  }

  ThrowIfEmptySubscriber.prototype._next = function (value) {
    this.hasValue = true;
    this.destination.next(value);
  };

  ThrowIfEmptySubscriber.prototype._complete = function () {
    if (!this.hasValue) {
      var err = void 0;

      try {
        err = this.errorFactory();
      } catch (e) {
        err = e;
      }

      this.destination.error(err);
    } else {
      return this.destination.complete();
    }
  };

  return ThrowIfEmptySubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_2__["Subscriber"]);

function defaultErrorFactory() {
  return new _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__["EmptyError"]();
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/timeInterval.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/timeInterval.js ***!
  \********************************************************************/
/*! exports provided: timeInterval, TimeInterval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeInterval", function() { return timeInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeInterval", function() { return TimeInterval; });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony import */ var _scan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scan */ "./node_modules/rxjs/_esm5/internal/operators/scan.js");
/* harmony import */ var _observable_defer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/defer */ "./node_modules/rxjs/_esm5/internal/observable/defer.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/** PURE_IMPORTS_START _scheduler_async,_scan,_observable_defer,_map PURE_IMPORTS_END */




function timeInterval(scheduler) {
  if (scheduler === void 0) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__["async"];
  }

  return function (source) {
    return Object(_observable_defer__WEBPACK_IMPORTED_MODULE_2__["defer"])(function () {
      return source.pipe(Object(_scan__WEBPACK_IMPORTED_MODULE_1__["scan"])(function (_a, value) {
        var current = _a.current;
        return {
          value: value,
          current: scheduler.now(),
          last: current
        };
      }, {
        current: scheduler.now(),
        value: undefined,
        last: undefined
      }), Object(_map__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
        var current = _a.current,
            last = _a.last,
            value = _a.value;
        return new TimeInterval(value, current - last);
      }));
    });
  };
}

var TimeInterval = /*@__PURE__*/function () {
  function TimeInterval(value, interval) {
    this.value = value;
    this.interval = interval;
  }

  return TimeInterval;
}();



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/timeout.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/timeout.js ***!
  \***************************************************************/
/*! exports provided: timeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeout", function() { return timeout; });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony import */ var _util_TimeoutError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/TimeoutError */ "./node_modules/rxjs/_esm5/internal/util/TimeoutError.js");
/* harmony import */ var _timeoutWith__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timeoutWith */ "./node_modules/rxjs/_esm5/internal/operators/timeoutWith.js");
/* harmony import */ var _observable_throwError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../observable/throwError */ "./node_modules/rxjs/_esm5/internal/observable/throwError.js");
/** PURE_IMPORTS_START _scheduler_async,_util_TimeoutError,_timeoutWith,_observable_throwError PURE_IMPORTS_END */




function timeout(due, scheduler) {
  if (scheduler === void 0) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__["async"];
  }

  return Object(_timeoutWith__WEBPACK_IMPORTED_MODULE_2__["timeoutWith"])(due, Object(_observable_throwError__WEBPACK_IMPORTED_MODULE_3__["throwError"])(new _util_TimeoutError__WEBPACK_IMPORTED_MODULE_1__["TimeoutError"]()), scheduler);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/timeoutWith.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/timeoutWith.js ***!
  \*******************************************************************/
/*! exports provided: timeoutWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeoutWith", function() { return timeoutWith; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony import */ var _util_isDate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isDate */ "./node_modules/rxjs/_esm5/internal/util/isDate.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_innerSubscribe PURE_IMPORTS_END */




function timeoutWith(due, withObservable, scheduler) {
  if (scheduler === void 0) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_1__["async"];
  }

  return function (source) {
    var absoluteTimeout = Object(_util_isDate__WEBPACK_IMPORTED_MODULE_2__["isDate"])(due);
    var waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(due);
    return source.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
  };
}

var TimeoutWithOperator = /*@__PURE__*/function () {
  function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
    this.waitFor = waitFor;
    this.absoluteTimeout = absoluteTimeout;
    this.withObservable = withObservable;
    this.scheduler = scheduler;
  }

  TimeoutWithOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
  };

  return TimeoutWithOperator;
}();

var TimeoutWithSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TimeoutWithSubscriber, _super);

  function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.absoluteTimeout = absoluteTimeout;
    _this.waitFor = waitFor;
    _this.withObservable = withObservable;
    _this.scheduler = scheduler;

    _this.scheduleTimeout();

    return _this;
  }

  TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
    var withObservable = subscriber.withObservable;

    subscriber._unsubscribeAndRecycle();

    subscriber.add(Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["innerSubscribe"])(withObservable, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["SimpleInnerSubscriber"](subscriber)));
  };

  TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
    var action = this.action;

    if (action) {
      this.action = action.schedule(this, this.waitFor);
    } else {
      this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
    }
  };

  TimeoutWithSubscriber.prototype._next = function (value) {
    if (!this.absoluteTimeout) {
      this.scheduleTimeout();
    }

    _super.prototype._next.call(this, value);
  };

  TimeoutWithSubscriber.prototype._unsubscribe = function () {
    this.action = undefined;
    this.scheduler = null;
    this.withObservable = null;
  };

  return TimeoutWithSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_3__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/timestamp.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/timestamp.js ***!
  \*****************************************************************/
/*! exports provided: timestamp, Timestamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timestamp", function() { return timestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timestamp", function() { return Timestamp; });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/** PURE_IMPORTS_START _scheduler_async,_map PURE_IMPORTS_END */


function timestamp(scheduler) {
  if (scheduler === void 0) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__["async"];
  }

  return Object(_map__WEBPACK_IMPORTED_MODULE_1__["map"])(function (value) {
    return new Timestamp(value, scheduler.now());
  });
}

var Timestamp = /*@__PURE__*/function () {
  function Timestamp(value, timestamp) {
    this.value = value;
    this.timestamp = timestamp;
  }

  return Timestamp;
}();



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/toArray.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/toArray.js ***!
  \***************************************************************/
/*! exports provided: toArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reduce */ "./node_modules/rxjs/_esm5/internal/operators/reduce.js");
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */


function toArrayReducer(arr, item, index) {
  if (index === 0) {
    return [item];
  }

  arr.push(item);
  return arr;
}

function toArray() {
  return Object(_reduce__WEBPACK_IMPORTED_MODULE_0__["reduce"])(toArrayReducer, []);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/window.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/window.js ***!
  \**************************************************************/
/*! exports provided: window */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "window", function() { return window; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _innerSubscribe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../innerSubscribe */ "./node_modules/rxjs/_esm5/internal/innerSubscribe.js");
/** PURE_IMPORTS_START tslib,_Subject,_innerSubscribe PURE_IMPORTS_END */



function window(windowBoundaries) {
  return function windowOperatorFunction(source) {
    return source.lift(new WindowOperator(windowBoundaries));
  };
}

var WindowOperator = /*@__PURE__*/function () {
  function WindowOperator(windowBoundaries) {
    this.windowBoundaries = windowBoundaries;
  }

  WindowOperator.prototype.call = function (subscriber, source) {
    var windowSubscriber = new WindowSubscriber(subscriber);
    var sourceSubscription = source.subscribe(windowSubscriber);

    if (!sourceSubscription.closed) {
      windowSubscriber.add(Object(_innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["innerSubscribe"])(this.windowBoundaries, new _innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["SimpleInnerSubscriber"](windowSubscriber)));
    }

    return sourceSubscription;
  };

  return WindowOperator;
}();

var WindowSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WindowSubscriber, _super);

  function WindowSubscriber(destination) {
    var _this = _super.call(this, destination) || this;

    _this.window = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    destination.next(_this.window);
    return _this;
  }

  WindowSubscriber.prototype.notifyNext = function () {
    this.openWindow();
  };

  WindowSubscriber.prototype.notifyError = function (error) {
    this._error(error);
  };

  WindowSubscriber.prototype.notifyComplete = function () {
    this._complete();
  };

  WindowSubscriber.prototype._next = function (value) {
    this.window.next(value);
  };

  WindowSubscriber.prototype._error = function (err) {
    this.window.error(err);
    this.destination.error(err);
  };

  WindowSubscriber.prototype._complete = function () {
    this.window.complete();
    this.destination.complete();
  };

  WindowSubscriber.prototype._unsubscribe = function () {
    this.window = null;
  };

  WindowSubscriber.prototype.openWindow = function () {
    var prevWindow = this.window;

    if (prevWindow) {
      prevWindow.complete();
    }

    var destination = this.destination;
    var newWindow = this.window = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    destination.next(newWindow);
  };

  return WindowSubscriber;
}(_innerSubscribe__WEBPACK_IMPORTED_MODULE_2__["SimpleOuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/windowCount.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/windowCount.js ***!
  \*******************************************************************/
/*! exports provided: windowCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowCount", function() { return windowCount; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/** PURE_IMPORTS_START tslib,_Subscriber,_Subject PURE_IMPORTS_END */



function windowCount(windowSize, startWindowEvery) {
  if (startWindowEvery === void 0) {
    startWindowEvery = 0;
  }

  return function windowCountOperatorFunction(source) {
    return source.lift(new WindowCountOperator(windowSize, startWindowEvery));
  };
}

var WindowCountOperator = /*@__PURE__*/function () {
  function WindowCountOperator(windowSize, startWindowEvery) {
    this.windowSize = windowSize;
    this.startWindowEvery = startWindowEvery;
  }

  WindowCountOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
  };

  return WindowCountOperator;
}();

var WindowCountSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WindowCountSubscriber, _super);

  function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    _this.windowSize = windowSize;
    _this.startWindowEvery = startWindowEvery;
    _this.windows = [new _Subject__WEBPACK_IMPORTED_MODULE_2__["Subject"]()];
    _this.count = 0;
    destination.next(_this.windows[0]);
    return _this;
  }

  WindowCountSubscriber.prototype._next = function (value) {
    var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
    var destination = this.destination;
    var windowSize = this.windowSize;
    var windows = this.windows;
    var len = windows.length;

    for (var i = 0; i < len && !this.closed; i++) {
      windows[i].next(value);
    }

    var c = this.count - windowSize + 1;

    if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
      windows.shift().complete();
    }

    if (++this.count % startWindowEvery === 0 && !this.closed) {
      var window_1 = new _Subject__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
      windows.push(window_1);
      destination.next(window_1);
    }
  };

  WindowCountSubscriber.prototype._error = function (err) {
    var windows = this.windows;

    if (windows) {
      while (windows.length > 0 && !this.closed) {
        windows.shift().error(err);
      }
    }

    this.destination.error(err);
  };

  WindowCountSubscriber.prototype._complete = function () {
    var windows = this.windows;

    if (windows) {
      while (windows.length > 0 && !this.closed) {
        windows.shift().complete();
      }
    }

    this.destination.complete();
  };

  WindowCountSubscriber.prototype._unsubscribe = function () {
    this.count = 0;
    this.windows = null;
  };

  return WindowCountSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__["Subscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/windowTime.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/windowTime.js ***!
  \******************************************************************/
/*! exports provided: windowTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowTime", function() { return windowTime; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/_esm5/internal/scheduler/async.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _util_isNumeric__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isNumeric */ "./node_modules/rxjs/_esm5/internal/util/isNumeric.js");
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js");
/** PURE_IMPORTS_START tslib,_Subject,_scheduler_async,_Subscriber,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */






function windowTime(windowTimeSpan) {
  var scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_2__["async"];
  var windowCreationInterval = null;
  var maxWindowSize = Number.POSITIVE_INFINITY;

  if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_5__["isScheduler"])(arguments[3])) {
    scheduler = arguments[3];
  }

  if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_5__["isScheduler"])(arguments[2])) {
    scheduler = arguments[2];
  } else if (Object(_util_isNumeric__WEBPACK_IMPORTED_MODULE_4__["isNumeric"])(arguments[2])) {
    maxWindowSize = Number(arguments[2]);
  }

  if (Object(_util_isScheduler__WEBPACK_IMPORTED_MODULE_5__["isScheduler"])(arguments[1])) {
    scheduler = arguments[1];
  } else if (Object(_util_isNumeric__WEBPACK_IMPORTED_MODULE_4__["isNumeric"])(arguments[1])) {
    windowCreationInterval = Number(arguments[1]);
  }

  return function windowTimeOperatorFunction(source) {
    return source.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
  };
}

var WindowTimeOperator = /*@__PURE__*/function () {
  function WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
    this.windowTimeSpan = windowTimeSpan;
    this.windowCreationInterval = windowCreationInterval;
    this.maxWindowSize = maxWindowSize;
    this.scheduler = scheduler;
  }

  WindowTimeOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
  };

  return WindowTimeOperator;
}();

var CountedSubject = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CountedSubject, _super);

  function CountedSubject() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._numberOfNextedValues = 0;
    return _this;
  }

  CountedSubject.prototype.next = function (value) {
    this._numberOfNextedValues++;

    _super.prototype.next.call(this, value);
  };

  Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
    get: function () {
      return this._numberOfNextedValues;
    },
    enumerable: true,
    configurable: true
  });
  return CountedSubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]);

var WindowTimeSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WindowTimeSubscriber, _super);

  function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    _this.windowTimeSpan = windowTimeSpan;
    _this.windowCreationInterval = windowCreationInterval;
    _this.maxWindowSize = maxWindowSize;
    _this.scheduler = scheduler;
    _this.windows = [];

    var window = _this.openWindow();

    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
      var closeState = {
        subscriber: _this,
        window: window,
        context: null
      };
      var creationState = {
        windowTimeSpan: windowTimeSpan,
        windowCreationInterval: windowCreationInterval,
        subscriber: _this,
        scheduler: scheduler
      };

      _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));

      _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
    } else {
      var timeSpanOnlyState = {
        subscriber: _this,
        window: window,
        windowTimeSpan: windowTimeSpan
      };

      _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
    }

    return _this;
  }

  WindowTimeSubscriber.prototype._next = function (value) {
    var windows = this.windows;
    var len = windows.length;

    for (var i = 0; i < len; i++) {
      var window_1 = windows[i];

      if (!window_1.closed) {
        window_1.next(value);

        if (window_1.numberOfNextedValues >= this.maxWindowSize) {
          this.closeWindow(window_1);
        }
      }
    }
  };

  WindowTimeSubscriber.prototype._error = function (err) {
    var windows = this.windows;

    while (windows.length > 0) {
      windows.shift().error(err);
    }

    this.destination.error(err);
  };

  WindowTimeSubscriber.prototype._complete = function () {
    var windows = this.windows;

    while (windows.length > 0) {
      var window_2 = windows.shift();

      if (!window_2.closed) {
        window_2.complete();
      }
    }

    this.destination.complete();
  };

  WindowTimeSubscriber.prototype.openWindow = function () {
    var window = new CountedSubject();
    this.windows.push(window);
    var destination = this.destination;
    destination.next(window);
    return window;
  };

  WindowTimeSubscriber.prototype.closeWindow = function (window) {
    window.complete();
    var windows = this.windows;
    windows.splice(windows.indexOf(window), 1);
  };

  return WindowTimeSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_3__["Subscriber"]);

function dispatchWindowTimeSpanOnly(state) {
  var subscriber = state.subscriber,
      windowTimeSpan = state.windowTimeSpan,
      window = state.window;

  if (window) {
    subscriber.closeWindow(window);
  }

  state.window = subscriber.openWindow();
  this.schedule(state, windowTimeSpan);
}

function dispatchWindowCreation(state) {
  var windowTimeSpan = state.windowTimeSpan,
      subscriber = state.subscriber,
      scheduler = state.scheduler,
      windowCreationInterval = state.windowCreationInterval;
  var window = subscriber.openWindow();
  var action = this;
  var context = {
    action: action,
    subscription: null
  };
  var timeSpanState = {
    subscriber: subscriber,
    window: window,
    context: context
  };
  context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
  action.add(context.subscription);
  action.schedule(state, windowCreationInterval);
}

function dispatchWindowClose(state) {
  var subscriber = state.subscriber,
      window = state.window,
      context = state.context;

  if (context && context.action && context.subscription) {
    context.action.remove(context.subscription);
  }

  subscriber.closeWindow(window);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/windowToggle.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/windowToggle.js ***!
  \********************************************************************/
/*! exports provided: windowToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowToggle", function() { return windowToggle; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../OuterSubscriber */ "./node_modules/rxjs/_esm5/internal/OuterSubscriber.js");
/* harmony import */ var _util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/subscribeToResult */ "./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js");
/** PURE_IMPORTS_START tslib,_Subject,_Subscription,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function windowToggle(openings, closingSelector) {
  return function (source) {
    return source.lift(new WindowToggleOperator(openings, closingSelector));
  };
}

var WindowToggleOperator = /*@__PURE__*/function () {
  function WindowToggleOperator(openings, closingSelector) {
    this.openings = openings;
    this.closingSelector = closingSelector;
  }

  WindowToggleOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
  };

  return WindowToggleOperator;
}();

var WindowToggleSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WindowToggleSubscriber, _super);

  function WindowToggleSubscriber(destination, openings, closingSelector) {
    var _this = _super.call(this, destination) || this;

    _this.openings = openings;
    _this.closingSelector = closingSelector;
    _this.contexts = [];

    _this.add(_this.openSubscription = Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__["subscribeToResult"])(_this, openings, openings));

    return _this;
  }

  WindowToggleSubscriber.prototype._next = function (value) {
    var contexts = this.contexts;

    if (contexts) {
      var len = contexts.length;

      for (var i = 0; i < len; i++) {
        contexts[i].window.next(value);
      }
    }
  };

  WindowToggleSubscriber.prototype._error = function (err) {
    var contexts = this.contexts;
    this.contexts = null;

    if (contexts) {
      var len = contexts.length;
      var index = -1;

      while (++index < len) {
        var context_1 = contexts[index];
        context_1.window.error(err);
        context_1.subscription.unsubscribe();
      }
    }

    _super.prototype._error.call(this, err);
  };

  WindowToggleSubscriber.prototype._complete = function () {
    var contexts = this.contexts;
    this.contexts = null;

    if (contexts) {
      var len = contexts.length;
      var index = -1;

      while (++index < len) {
        var context_2 = contexts[index];
        context_2.window.complete();
        context_2.subscription.unsubscribe();
      }
    }

    _super.prototype._complete.call(this);
  };

  WindowToggleSubscriber.prototype._unsubscribe = function () {
    var contexts = this.contexts;
    this.contexts = null;

    if (contexts) {
      var len = contexts.length;
      var index = -1;

      while (++index < len) {
        var context_3 = contexts[index];
        context_3.window.unsubscribe();
        context_3.subscription.unsubscribe();
      }
    }
  };

  WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
    if (outerValue === this.openings) {
      var closingNotifier = void 0;

      try {
        var closingSelector = this.closingSelector;
        closingNotifier = closingSelector(innerValue);
      } catch (e) {
        return this.error(e);
      }

      var window_1 = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
      var subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();
      var context_4 = {
        window: window_1,
        subscription: subscription
      };
      this.contexts.push(context_4);
      var innerSubscription = Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_4__["subscribeToResult"])(this, closingNotifier, context_4);

      if (innerSubscription.closed) {
        this.closeWindow(this.contexts.length - 1);
      } else {
        innerSubscription.context = context_4;
        subscription.add(innerSubscription);
      }

      this.destination.next(window_1);
    } else {
      this.closeWindow(this.contexts.indexOf(outerValue));
    }
  };

  WindowToggleSubscriber.prototype.notifyError = function (err) {
    this.error(err);
  };

  WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
    if (inner !== this.openSubscription) {
      this.closeWindow(this.contexts.indexOf(inner.context));
    }
  };

  WindowToggleSubscriber.prototype.closeWindow = function (index) {
    if (index === -1) {
      return;
    }

    var contexts = this.contexts;
    var context = contexts[index];
    var window = context.window,
        subscription = context.subscription;
    contexts.splice(index, 1);
    window.complete();
    subscription.unsubscribe();
  };

  return WindowToggleSubscriber;
}(_OuterSubscriber__WEBPACK_IMPORTED_MODULE_3__["OuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/windowWhen.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/windowWhen.js ***!
  \******************************************************************/
/*! exports provided: windowWhen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowWhen", function() { return windowWhen; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _OuterSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../OuterSubscriber */ "./node_modules/rxjs/_esm5/internal/OuterSubscriber.js");
/* harmony import */ var _util_subscribeToResult__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/subscribeToResult */ "./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js");
/** PURE_IMPORTS_START tslib,_Subject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */




function windowWhen(closingSelector) {
  return function windowWhenOperatorFunction(source) {
    return source.lift(new WindowOperator(closingSelector));
  };
}

var WindowOperator = /*@__PURE__*/function () {
  function WindowOperator(closingSelector) {
    this.closingSelector = closingSelector;
  }

  WindowOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new WindowSubscriber(subscriber, this.closingSelector));
  };

  return WindowOperator;
}();

var WindowSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WindowSubscriber, _super);

  function WindowSubscriber(destination, closingSelector) {
    var _this = _super.call(this, destination) || this;

    _this.destination = destination;
    _this.closingSelector = closingSelector;

    _this.openWindow();

    return _this;
  }

  WindowSubscriber.prototype.notifyNext = function (_outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
    this.openWindow(innerSub);
  };

  WindowSubscriber.prototype.notifyError = function (error) {
    this._error(error);
  };

  WindowSubscriber.prototype.notifyComplete = function (innerSub) {
    this.openWindow(innerSub);
  };

  WindowSubscriber.prototype._next = function (value) {
    this.window.next(value);
  };

  WindowSubscriber.prototype._error = function (err) {
    this.window.error(err);
    this.destination.error(err);
    this.unsubscribeClosingNotification();
  };

  WindowSubscriber.prototype._complete = function () {
    this.window.complete();
    this.destination.complete();
    this.unsubscribeClosingNotification();
  };

  WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
    if (this.closingNotification) {
      this.closingNotification.unsubscribe();
    }
  };

  WindowSubscriber.prototype.openWindow = function (innerSub) {
    if (innerSub === void 0) {
      innerSub = null;
    }

    if (innerSub) {
      this.remove(innerSub);
      innerSub.unsubscribe();
    }

    var prevWindow = this.window;

    if (prevWindow) {
      prevWindow.complete();
    }

    var window = this.window = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    this.destination.next(window);
    var closingNotifier;

    try {
      var closingSelector = this.closingSelector;
      closingNotifier = closingSelector();
    } catch (e) {
      this.destination.error(e);
      this.window.error(e);
      return;
    }

    this.add(this.closingNotification = Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_3__["subscribeToResult"])(this, closingNotifier));
  };

  return WindowSubscriber;
}(_OuterSubscriber__WEBPACK_IMPORTED_MODULE_2__["OuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/withLatestFrom.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/withLatestFrom.js ***!
  \**********************************************************************/
/*! exports provided: withLatestFrom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withLatestFrom", function() { return withLatestFrom; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _OuterSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../OuterSubscriber */ "./node_modules/rxjs/_esm5/internal/OuterSubscriber.js");
/* harmony import */ var _util_subscribeToResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/subscribeToResult */ "./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js");
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function withLatestFrom() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return function (source) {
    var project;

    if (typeof args[args.length - 1] === 'function') {
      project = args.pop();
    }

    var observables = args;
    return source.lift(new WithLatestFromOperator(observables, project));
  };
}

var WithLatestFromOperator = /*@__PURE__*/function () {
  function WithLatestFromOperator(observables, project) {
    this.observables = observables;
    this.project = project;
  }

  WithLatestFromOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
  };

  return WithLatestFromOperator;
}();

var WithLatestFromSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WithLatestFromSubscriber, _super);

  function WithLatestFromSubscriber(destination, observables, project) {
    var _this = _super.call(this, destination) || this;

    _this.observables = observables;
    _this.project = project;
    _this.toRespond = [];
    var len = observables.length;
    _this.values = new Array(len);

    for (var i = 0; i < len; i++) {
      _this.toRespond.push(i);
    }

    for (var i = 0; i < len; i++) {
      var observable = observables[i];

      _this.add(Object(_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_2__["subscribeToResult"])(_this, observable, undefined, i));
    }

    return _this;
  }

  WithLatestFromSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
    this.values[outerIndex] = innerValue;
    var toRespond = this.toRespond;

    if (toRespond.length > 0) {
      var found = toRespond.indexOf(outerIndex);

      if (found !== -1) {
        toRespond.splice(found, 1);
      }
    }
  };

  WithLatestFromSubscriber.prototype.notifyComplete = function () {};

  WithLatestFromSubscriber.prototype._next = function (value) {
    if (this.toRespond.length === 0) {
      var args = [value].concat(this.values);

      if (this.project) {
        this._tryProject(args);
      } else {
        this.destination.next(args);
      }
    }
  };

  WithLatestFromSubscriber.prototype._tryProject = function (args) {
    var result;

    try {
      result = this.project.apply(this, args);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.next(result);
  };

  return WithLatestFromSubscriber;
}(_OuterSubscriber__WEBPACK_IMPORTED_MODULE_1__["OuterSubscriber"]);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/zip.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/zip.js ***!
  \***********************************************************/
/*! exports provided: zip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return zip; });
/* harmony import */ var _observable_zip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/zip */ "./node_modules/rxjs/_esm5/internal/observable/zip.js");
/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

function zip() {
  var observables = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i] = arguments[_i];
  }

  return function zipOperatorFunction(source) {
    return source.lift.call(_observable_zip__WEBPACK_IMPORTED_MODULE_0__["zip"].apply(void 0, [source].concat(observables)));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/zipAll.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/zipAll.js ***!
  \**************************************************************/
/*! exports provided: zipAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zipAll", function() { return zipAll; });
/* harmony import */ var _observable_zip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/zip */ "./node_modules/rxjs/_esm5/internal/observable/zip.js");
/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

function zipAll(project) {
  return function (source) {
    return source.lift(new _observable_zip__WEBPACK_IMPORTED_MODULE_0__["ZipOperator"](project));
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduled/scheduleArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduled/scheduleArray.js ***!
  \*********************************************************************/
/*! exports provided: scheduleArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheduleArray", function() { return scheduleArray; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */


function scheduleArray(input, scheduler) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    var sub = new _Subscription__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
    var i = 0;
    sub.add(scheduler.schedule(function () {
      if (i === input.length) {
        subscriber.complete();
        return;
      }

      subscriber.next(input[i++]);

      if (!subscriber.closed) {
        sub.add(this.schedule());
      }
    }));
    return sub;
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduled/scheduleIterable.js":
/*!************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduled/scheduleIterable.js ***!
  \************************************************************************/
/*! exports provided: scheduleIterable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheduleIterable", function() { return scheduleIterable; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/_esm5/internal/symbol/iterator.js");
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator PURE_IMPORTS_END */



function scheduleIterable(input, scheduler) {
  if (!input) {
    throw new Error('Iterable cannot be null');
  }

  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    var sub = new _Subscription__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
    var iterator;
    sub.add(function () {
      if (iterator && typeof iterator.return === 'function') {
        iterator.return();
      }
    });
    sub.add(scheduler.schedule(function () {
      iterator = input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__["iterator"]]();
      sub.add(scheduler.schedule(function () {
        if (subscriber.closed) {
          return;
        }

        var value;
        var done;

        try {
          var result = iterator.next();
          value = result.value;
          done = result.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }

        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
          this.schedule();
        }
      }));
    }));
    return sub;
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduled/scheduleObservable.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduled/scheduleObservable.js ***!
  \**************************************************************************/
/*! exports provided: scheduleObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheduleObservable", function() { return scheduleObservable; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/_esm5/internal/symbol/observable.js");
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable PURE_IMPORTS_END */



function scheduleObservable(input, scheduler) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    var sub = new _Subscription__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
    sub.add(scheduler.schedule(function () {
      var observable = input[_symbol_observable__WEBPACK_IMPORTED_MODULE_2__["observable"]]();
      sub.add(observable.subscribe({
        next: function (value) {
          sub.add(scheduler.schedule(function () {
            return subscriber.next(value);
          }));
        },
        error: function (err) {
          sub.add(scheduler.schedule(function () {
            return subscriber.error(err);
          }));
        },
        complete: function () {
          sub.add(scheduler.schedule(function () {
            return subscriber.complete();
          }));
        }
      }));
    }));
    return sub;
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduled/schedulePromise.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduled/schedulePromise.js ***!
  \***********************************************************************/
/*! exports provided: schedulePromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schedulePromise", function() { return schedulePromise; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */


function schedulePromise(input, scheduler) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    var sub = new _Subscription__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
    sub.add(scheduler.schedule(function () {
      return input.then(function (value) {
        sub.add(scheduler.schedule(function () {
          subscriber.next(value);
          sub.add(scheduler.schedule(function () {
            return subscriber.complete();
          }));
        }));
      }, function (err) {
        sub.add(scheduler.schedule(function () {
          return subscriber.error(err);
        }));
      });
    }));
    return sub;
  });
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduled/scheduled.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduled/scheduled.js ***!
  \*****************************************************************/
/*! exports provided: scheduled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheduled", function() { return scheduled; });
/* harmony import */ var _scheduleObservable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduleObservable */ "./node_modules/rxjs/_esm5/internal/scheduled/scheduleObservable.js");
/* harmony import */ var _schedulePromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedulePromise */ "./node_modules/rxjs/_esm5/internal/scheduled/schedulePromise.js");
/* harmony import */ var _scheduleArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scheduleArray */ "./node_modules/rxjs/_esm5/internal/scheduled/scheduleArray.js");
/* harmony import */ var _scheduleIterable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scheduleIterable */ "./node_modules/rxjs/_esm5/internal/scheduled/scheduleIterable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isInteropObservable */ "./node_modules/rxjs/_esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/isPromise */ "./node_modules/rxjs/_esm5/internal/util/isPromise.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isArrayLike */ "./node_modules/rxjs/_esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/isIterable */ "./node_modules/rxjs/_esm5/internal/util/isIterable.js");
/** PURE_IMPORTS_START _scheduleObservable,_schedulePromise,_scheduleArray,_scheduleIterable,_util_isInteropObservable,_util_isPromise,_util_isArrayLike,_util_isIterable PURE_IMPORTS_END */








function scheduled(input, scheduler) {
  if (input != null) {
    if (Object(_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_4__["isInteropObservable"])(input)) {
      return Object(_scheduleObservable__WEBPACK_IMPORTED_MODULE_0__["scheduleObservable"])(input, scheduler);
    } else if (Object(_util_isPromise__WEBPACK_IMPORTED_MODULE_5__["isPromise"])(input)) {
      return Object(_schedulePromise__WEBPACK_IMPORTED_MODULE_1__["schedulePromise"])(input, scheduler);
    } else if (Object(_util_isArrayLike__WEBPACK_IMPORTED_MODULE_6__["isArrayLike"])(input)) {
      return Object(_scheduleArray__WEBPACK_IMPORTED_MODULE_2__["scheduleArray"])(input, scheduler);
    } else if (Object(_util_isIterable__WEBPACK_IMPORTED_MODULE_7__["isIterable"])(input) || typeof input === 'string') {
      return Object(_scheduleIterable__WEBPACK_IMPORTED_MODULE_3__["scheduleIterable"])(input, scheduler);
    }
  }

  throw new TypeError((input !== null && typeof input || input) + ' is not observable');
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/Action.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/Action.js ***!
  \**************************************************************/
/*! exports provided: Action */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return Action; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */



var Action = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Action, _super);

  function Action(scheduler, work) {
    return _super.call(this) || this;
  }

  Action.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return this;
  };

  return Action;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__["Subscription"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js":
/*!****************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js ***!
  \****************************************************************************/
/*! exports provided: AnimationFrameAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationFrameAction", function() { return AnimationFrameAction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncAction */ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js");
/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */



var AnimationFrameAction = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AnimationFrameAction, _super);

  function AnimationFrameAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }

  AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
    }

    scheduler.actions.push(this);
    return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () {
      return scheduler.flush(null);
    }));
  };

  AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
    }

    if (scheduler.actions.length === 0) {
      cancelAnimationFrame(id);
      scheduler.scheduled = undefined;
    }

    return undefined;
  };

  return AnimationFrameAction;
}(_AsyncAction__WEBPACK_IMPORTED_MODULE_1__["AsyncAction"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameScheduler.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameScheduler.js ***!
  \*******************************************************************************/
/*! exports provided: AnimationFrameScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationFrameScheduler", function() { return AnimationFrameScheduler; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncScheduler */ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js");
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */



var AnimationFrameScheduler = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AnimationFrameScheduler, _super);

  function AnimationFrameScheduler() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AnimationFrameScheduler.prototype.flush = function (action) {
    this.active = true;
    this.scheduled = undefined;
    var actions = this.actions;
    var error;
    var index = -1;
    var count = actions.length;
    action = action || actions.shift();

    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (++index < count && (action = actions.shift()));

    this.active = false;

    if (error) {
      while (++index < count && (action = actions.shift())) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  return AnimationFrameScheduler;
}(_AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__["AsyncScheduler"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/AsapAction.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/AsapAction.js ***!
  \******************************************************************/
/*! exports provided: AsapAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsapAction", function() { return AsapAction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_Immediate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Immediate */ "./node_modules/rxjs/_esm5/internal/util/Immediate.js");
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AsyncAction */ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js");
/** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */




var AsapAction = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AsapAction, _super);

  function AsapAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }

  AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
    }

    scheduler.actions.push(this);
    return scheduler.scheduled || (scheduler.scheduled = _util_Immediate__WEBPACK_IMPORTED_MODULE_1__["Immediate"].setImmediate(scheduler.flush.bind(scheduler, null)));
  };

  AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
    }

    if (scheduler.actions.length === 0) {
      _util_Immediate__WEBPACK_IMPORTED_MODULE_1__["Immediate"].clearImmediate(id);
      scheduler.scheduled = undefined;
    }

    return undefined;
  };

  return AsapAction;
}(_AsyncAction__WEBPACK_IMPORTED_MODULE_2__["AsyncAction"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/AsapScheduler.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/AsapScheduler.js ***!
  \*********************************************************************/
/*! exports provided: AsapScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsapScheduler", function() { return AsapScheduler; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncScheduler */ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js");
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */



var AsapScheduler = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AsapScheduler, _super);

  function AsapScheduler() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AsapScheduler.prototype.flush = function (action) {
    this.active = true;
    this.scheduled = undefined;
    var actions = this.actions;
    var error;
    var index = -1;
    var count = actions.length;
    action = action || actions.shift();

    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (++index < count && (action = actions.shift()));

    this.active = false;

    if (error) {
      while (++index < count && (action = actions.shift())) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  return AsapScheduler;
}(_AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__["AsyncScheduler"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js ***!
  \*******************************************************************/
/*! exports provided: AsyncAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncAction", function() { return AsyncAction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Action */ "./node_modules/rxjs/_esm5/internal/scheduler/Action.js");
/** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */



var AsyncAction = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AsyncAction, _super);

  function AsyncAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }

  AsyncAction.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (this.closed) {
      return this;
    }

    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;

    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }

    this.pending = true;
    this.delay = delay;
    this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
    return this;
  };

  AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return setInterval(scheduler.flush.bind(scheduler, this), delay);
  };

  AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && this.delay === delay && this.pending === false) {
      return id;
    }

    clearInterval(id);
    return undefined;
  };

  AsyncAction.prototype.execute = function (state, delay) {
    if (this.closed) {
      return new Error('executing a cancelled action');
    }

    this.pending = false;

    var error = this._execute(state, delay);

    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };

  AsyncAction.prototype._execute = function (state, delay) {
    var errored = false;
    var errorValue = undefined;

    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = !!e && e || new Error(e);
    }

    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };

  AsyncAction.prototype._unsubscribe = function () {
    var id = this.id;
    var scheduler = this.scheduler;
    var actions = scheduler.actions;
    var index = actions.indexOf(this);
    this.work = null;
    this.state = null;
    this.pending = false;
    this.scheduler = null;

    if (index !== -1) {
      actions.splice(index, 1);
    }

    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, null);
    }

    this.delay = null;
  };

  return AsyncAction;
}(_Action__WEBPACK_IMPORTED_MODULE_1__["Action"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js ***!
  \**********************************************************************/
/*! exports provided: AsyncScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncScheduler", function() { return AsyncScheduler; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Scheduler */ "./node_modules/rxjs/_esm5/internal/Scheduler.js");
/** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */



var AsyncScheduler = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AsyncScheduler, _super);

  function AsyncScheduler(SchedulerAction, now) {
    if (now === void 0) {
      now = _Scheduler__WEBPACK_IMPORTED_MODULE_1__["Scheduler"].now;
    }

    var _this = _super.call(this, SchedulerAction, function () {
      if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
        return AsyncScheduler.delegate.now();
      } else {
        return now();
      }
    }) || this;

    _this.actions = [];
    _this.active = false;
    _this.scheduled = undefined;
    return _this;
  }

  AsyncScheduler.prototype.schedule = function (work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }

    if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
      return AsyncScheduler.delegate.schedule(work, delay, state);
    } else {
      return _super.prototype.schedule.call(this, work, delay, state);
    }
  };

  AsyncScheduler.prototype.flush = function (action) {
    var actions = this.actions;

    if (this.active) {
      actions.push(action);
      return;
    }

    var error;
    this.active = true;

    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());

    this.active = false;

    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  return AsyncScheduler;
}(_Scheduler__WEBPACK_IMPORTED_MODULE_1__["Scheduler"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js ***!
  \*******************************************************************/
/*! exports provided: QueueAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueAction", function() { return QueueAction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncAction */ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js");
/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */



var QueueAction = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueueAction, _super);

  function QueueAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }

  QueueAction.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay > 0) {
      return _super.prototype.schedule.call(this, state, delay);
    }

    this.delay = delay;
    this.state = state;
    this.scheduler.flush(this);
    return this;
  };

  QueueAction.prototype.execute = function (state, delay) {
    return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
  };

  QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
    }

    return scheduler.flush(this);
  };

  return QueueAction;
}(_AsyncAction__WEBPACK_IMPORTED_MODULE_1__["AsyncAction"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js ***!
  \**********************************************************************/
/*! exports provided: QueueScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueScheduler", function() { return QueueScheduler; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncScheduler */ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js");
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */



var QueueScheduler = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueueScheduler, _super);

  function QueueScheduler() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return QueueScheduler;
}(_AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__["AsyncScheduler"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/VirtualTimeScheduler.js":
/*!****************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/VirtualTimeScheduler.js ***!
  \****************************************************************************/
/*! exports provided: VirtualTimeScheduler, VirtualAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VirtualTimeScheduler", function() { return VirtualTimeScheduler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VirtualAction", function() { return VirtualAction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncAction */ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AsyncScheduler */ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js");
/** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */




var VirtualTimeScheduler = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](VirtualTimeScheduler, _super);

  function VirtualTimeScheduler(SchedulerAction, maxFrames) {
    if (SchedulerAction === void 0) {
      SchedulerAction = VirtualAction;
    }

    if (maxFrames === void 0) {
      maxFrames = Number.POSITIVE_INFINITY;
    }

    var _this = _super.call(this, SchedulerAction, function () {
      return _this.frame;
    }) || this;

    _this.maxFrames = maxFrames;
    _this.frame = 0;
    _this.index = -1;
    return _this;
  }

  VirtualTimeScheduler.prototype.flush = function () {
    var _a = this,
        actions = _a.actions,
        maxFrames = _a.maxFrames;

    var error, action;

    while ((action = actions[0]) && action.delay <= maxFrames) {
      actions.shift();
      this.frame = action.delay;

      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    }

    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  VirtualTimeScheduler.frameTimeFactor = 10;
  return VirtualTimeScheduler;
}(_AsyncScheduler__WEBPACK_IMPORTED_MODULE_2__["AsyncScheduler"]);



var VirtualAction = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](VirtualAction, _super);

  function VirtualAction(scheduler, work, index) {
    if (index === void 0) {
      index = scheduler.index += 1;
    }

    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    _this.index = index;
    _this.active = true;
    _this.index = scheduler.index = index;
    return _this;
  }

  VirtualAction.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (!this.id) {
      return _super.prototype.schedule.call(this, state, delay);
    }

    this.active = false;
    var action = new VirtualAction(this.scheduler, this.work);
    this.add(action);
    return action.schedule(state, delay);
  };

  VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    this.delay = scheduler.frame + delay;
    var actions = scheduler.actions;
    actions.push(this);
    actions.sort(VirtualAction.sortActions);
    return true;
  };

  VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return undefined;
  };

  VirtualAction.prototype._execute = function (state, delay) {
    if (this.active === true) {
      return _super.prototype._execute.call(this, state, delay);
    }
  };

  VirtualAction.sortActions = function (a, b) {
    if (a.delay === b.delay) {
      if (a.index === b.index) {
        return 0;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return -1;
      }
    } else if (a.delay > b.delay) {
      return 1;
    } else {
      return -1;
    }
  };

  return VirtualAction;
}(_AsyncAction__WEBPACK_IMPORTED_MODULE_1__["AsyncAction"]);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/animationFrame.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/animationFrame.js ***!
  \**********************************************************************/
/*! exports provided: animationFrameScheduler, animationFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationFrameScheduler", function() { return animationFrameScheduler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationFrame", function() { return animationFrame; });
/* harmony import */ var _AnimationFrameAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnimationFrameAction */ "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js");
/* harmony import */ var _AnimationFrameScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnimationFrameScheduler */ "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameScheduler.js");
/** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */


var animationFrameScheduler = /*@__PURE__*/new _AnimationFrameScheduler__WEBPACK_IMPORTED_MODULE_1__["AnimationFrameScheduler"](_AnimationFrameAction__WEBPACK_IMPORTED_MODULE_0__["AnimationFrameAction"]);
var animationFrame = animationFrameScheduler;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/asap.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/asap.js ***!
  \************************************************************/
/*! exports provided: asapScheduler, asap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asapScheduler", function() { return asapScheduler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asap", function() { return asap; });
/* harmony import */ var _AsapAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsapAction */ "./node_modules/rxjs/_esm5/internal/scheduler/AsapAction.js");
/* harmony import */ var _AsapScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsapScheduler */ "./node_modules/rxjs/_esm5/internal/scheduler/AsapScheduler.js");
/** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */


var asapScheduler = /*@__PURE__*/new _AsapScheduler__WEBPACK_IMPORTED_MODULE_1__["AsapScheduler"](_AsapAction__WEBPACK_IMPORTED_MODULE_0__["AsapAction"]);
var asap = asapScheduler;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/async.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/async.js ***!
  \*************************************************************/
/*! exports provided: asyncScheduler, async */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return asyncScheduler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "async", function() { return async; });
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncAction */ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncScheduler */ "./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js");
/** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */


var asyncScheduler = /*@__PURE__*/new _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__["AsyncScheduler"](_AsyncAction__WEBPACK_IMPORTED_MODULE_0__["AsyncAction"]);
var async = asyncScheduler;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/scheduler/queue.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/scheduler/queue.js ***!
  \*************************************************************/
/*! exports provided: queueScheduler, queue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueScheduler", function() { return queueScheduler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queue", function() { return queue; });
/* harmony import */ var _QueueAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QueueAction */ "./node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js");
/* harmony import */ var _QueueScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueueScheduler */ "./node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js");
/** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */


var queueScheduler = /*@__PURE__*/new _QueueScheduler__WEBPACK_IMPORTED_MODULE_1__["QueueScheduler"](_QueueAction__WEBPACK_IMPORTED_MODULE_0__["QueueAction"]);
var queue = queueScheduler;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/symbol/iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/symbol/iterator.js ***!
  \*************************************************************/
/*! exports provided: getSymbolIterator, iterator, $$iterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSymbolIterator", function() { return getSymbolIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iterator", function() { return iterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$$iterator", function() { return $$iterator; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function getSymbolIterator() {
  if (typeof Symbol !== 'function' || !Symbol.iterator) {
    return '@@iterator';
  }

  return Symbol.iterator;
}
var iterator = /*@__PURE__*/getSymbolIterator();
var $$iterator = iterator;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/symbol/observable.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/symbol/observable.js ***!
  \***************************************************************/
/*! exports provided: observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observable", function() { return observable; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var observable = /*@__PURE__*/function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js ***!
  \*****************************************************************/
/*! exports provided: rxSubscriber, $$rxSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rxSubscriber", function() { return rxSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$$rxSubscriber", function() { return $$rxSubscriber; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var rxSubscriber = /*@__PURE__*/function () {
  return typeof Symbol === 'function' ? /*@__PURE__*/Symbol('rxSubscriber') : '@@rxSubscriber_' + /*@__PURE__*/Math.random();
}();
var $$rxSubscriber = rxSubscriber;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js ***!
  \**************************************************************************/
/*! exports provided: ArgumentOutOfRangeError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArgumentOutOfRangeError", function() { return ArgumentOutOfRangeError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var ArgumentOutOfRangeErrorImpl = /*@__PURE__*/function () {
  function ArgumentOutOfRangeErrorImpl() {
    Error.call(this);
    this.message = 'argument out of range';
    this.name = 'ArgumentOutOfRangeError';
    return this;
  }

  ArgumentOutOfRangeErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
  return ArgumentOutOfRangeErrorImpl;
}();

var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/EmptyError.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/EmptyError.js ***!
  \*************************************************************/
/*! exports provided: EmptyError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptyError", function() { return EmptyError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var EmptyErrorImpl = /*@__PURE__*/function () {
  function EmptyErrorImpl() {
    Error.call(this);
    this.message = 'no elements in sequence';
    this.name = 'EmptyError';
    return this;
  }

  EmptyErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
  return EmptyErrorImpl;
}();

var EmptyError = EmptyErrorImpl;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/Immediate.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/Immediate.js ***!
  \************************************************************/
/*! exports provided: Immediate, TestTools */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Immediate", function() { return Immediate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestTools", function() { return TestTools; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var nextHandle = 1;

var RESOLVED = /*@__PURE__*/function () {
  return /*@__PURE__*/Promise.resolve();
}();

var activeHandles = {};

function findAndClearHandle(handle) {
  if (handle in activeHandles) {
    delete activeHandles[handle];
    return true;
  }

  return false;
}

var Immediate = {
  setImmediate: function (cb) {
    var handle = nextHandle++;
    activeHandles[handle] = true;
    RESOLVED.then(function () {
      return findAndClearHandle(handle) && cb();
    });
    return handle;
  },
  clearImmediate: function (handle) {
    findAndClearHandle(handle);
  }
};
var TestTools = {
  pending: function () {
    return Object.keys(activeHandles).length;
  }
};

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js ***!
  \**************************************************************************/
/*! exports provided: ObjectUnsubscribedError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectUnsubscribedError", function() { return ObjectUnsubscribedError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var ObjectUnsubscribedErrorImpl = /*@__PURE__*/function () {
  function ObjectUnsubscribedErrorImpl() {
    Error.call(this);
    this.message = 'object unsubscribed';
    this.name = 'ObjectUnsubscribedError';
    return this;
  }

  ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
  return ObjectUnsubscribedErrorImpl;
}();

var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/TimeoutError.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/TimeoutError.js ***!
  \***************************************************************/
/*! exports provided: TimeoutError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeoutError", function() { return TimeoutError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var TimeoutErrorImpl = /*@__PURE__*/function () {
  function TimeoutErrorImpl() {
    Error.call(this);
    this.message = 'Timeout has occurred';
    this.name = 'TimeoutError';
    return this;
  }

  TimeoutErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
  return TimeoutErrorImpl;
}();

var TimeoutError = TimeoutErrorImpl;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js ***!
  \**********************************************************************/
/*! exports provided: UnsubscriptionError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnsubscriptionError", function() { return UnsubscriptionError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var UnsubscriptionErrorImpl = /*@__PURE__*/function () {
  function UnsubscriptionErrorImpl(errors) {
    Error.call(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
      return i + 1 + ") " + err.toString();
    }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
    return this;
  }

  UnsubscriptionErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
  return UnsubscriptionErrorImpl;
}();

var UnsubscriptionError = UnsubscriptionErrorImpl;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/canReportError.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/canReportError.js ***!
  \*****************************************************************/
/*! exports provided: canReportError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canReportError", function() { return canReportError; });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */

function canReportError(observer) {
  while (observer) {
    var _a = observer,
        closed_1 = _a.closed,
        destination = _a.destination,
        isStopped = _a.isStopped;

    if (closed_1 || isStopped) {
      return false;
    } else if (destination && destination instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__["Subscriber"]) {
      observer = destination;
    } else {
      observer = null;
    }
  }

  return true;
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/hostReportError.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/hostReportError.js ***!
  \******************************************************************/
/*! exports provided: hostReportError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hostReportError", function() { return hostReportError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function hostReportError(err) {
  setTimeout(function () {
    throw err;
  }, 0);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/identity.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/identity.js ***!
  \***********************************************************/
/*! exports provided: identity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function identity(x) {
  return x;
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isArray.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isArray.js ***!
  \**********************************************************/
/*! exports provided: isArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray = /*@__PURE__*/function () {
  return Array.isArray || function (x) {
    return x && typeof x.length === 'number';
  };
}();

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isArrayLike.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isArrayLike.js ***!
  \**************************************************************/
/*! exports provided: isArrayLike */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayLike", function() { return isArrayLike; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = function (x) {
  return x && typeof x.length === 'number' && typeof x !== 'function';
};

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isDate.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isDate.js ***!
  \*********************************************************/
/*! exports provided: isDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDate", function() { return isDate; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isDate(value) {
  return value instanceof Date && !isNaN(+value);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isFunction.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isFunction.js ***!
  \*************************************************************/
/*! exports provided: isFunction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
  return typeof x === 'function';
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isInteropObservable.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isInteropObservable.js ***!
  \**********************************************************************/
/*! exports provided: isInteropObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInteropObservable", function() { return isInteropObservable; });
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/_esm5/internal/symbol/observable.js");
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

function isInteropObservable(input) {
  return input && typeof input[_symbol_observable__WEBPACK_IMPORTED_MODULE_0__["observable"]] === 'function';
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isIterable.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isIterable.js ***!
  \*************************************************************/
/*! exports provided: isIterable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIterable", function() { return isIterable; });
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/_esm5/internal/symbol/iterator.js");
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

function isIterable(input) {
  return input && typeof input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__["iterator"]] === 'function';
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isNumeric.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isNumeric.js ***!
  \************************************************************/
/*! exports provided: isNumeric */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumeric", function() { return isNumeric; });
/* harmony import */ var _isArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */

function isNumeric(val) {
  return !Object(_isArray__WEBPACK_IMPORTED_MODULE_0__["isArray"])(val) && val - parseFloat(val) + 1 >= 0;
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isObject.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isObject.js ***!
  \***********************************************************/
/*! exports provided: isObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
  return x !== null && typeof x === 'object';
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isObservable.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isObservable.js ***!
  \***************************************************************/
/*! exports provided: isObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservable", function() { return isObservable; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function isObservable(obj) {
  return !!obj && (obj instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"] || typeof obj.lift === 'function' && typeof obj.subscribe === 'function');
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isPromise.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isPromise.js ***!
  \************************************************************/
/*! exports provided: isPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return isPromise; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
  return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isScheduler.js ***!
  \**************************************************************/
/*! exports provided: isScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isScheduler", function() { return isScheduler; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
  return value && typeof value.schedule === 'function';
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/noop.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/noop.js ***!
  \*******************************************************/
/*! exports provided: noop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop() {}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/not.js":
/*!******************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/not.js ***!
  \******************************************************/
/*! exports provided: not */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "not", function() { return not; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function not(pred, thisArg) {
  function notPred() {
    return !notPred.pred.apply(notPred.thisArg, arguments);
  }

  notPred.pred = pred;
  notPred.thisArg = thisArg;
  return notPred;
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/pipe.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/pipe.js ***!
  \*******************************************************/
/*! exports provided: pipe, pipeFromArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipeFromArray", function() { return pipeFromArray; });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ "./node_modules/rxjs/_esm5/internal/util/identity.js");
/** PURE_IMPORTS_START _identity PURE_IMPORTS_END */

function pipe() {
  var fns = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i];
  }

  return pipeFromArray(fns);
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return _identity__WEBPACK_IMPORTED_MODULE_0__["identity"];
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input) {
    return fns.reduce(function (prev, fn) {
      return fn(prev);
    }, input);
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/subscribeTo.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/subscribeTo.js ***!
  \**************************************************************/
/*! exports provided: subscribeTo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeTo", function() { return subscribeTo; });
/* harmony import */ var _subscribeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribeToArray */ "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js");
/* harmony import */ var _subscribeToPromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subscribeToPromise */ "./node_modules/rxjs/_esm5/internal/util/subscribeToPromise.js");
/* harmony import */ var _subscribeToIterable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subscribeToIterable */ "./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js");
/* harmony import */ var _subscribeToObservable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./subscribeToObservable */ "./node_modules/rxjs/_esm5/internal/util/subscribeToObservable.js");
/* harmony import */ var _isArrayLike__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isArrayLike */ "./node_modules/rxjs/_esm5/internal/util/isArrayLike.js");
/* harmony import */ var _isPromise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isPromise */ "./node_modules/rxjs/_esm5/internal/util/isPromise.js");
/* harmony import */ var _isObject__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isObject */ "./node_modules/rxjs/_esm5/internal/util/isObject.js");
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/_esm5/internal/symbol/iterator.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/_esm5/internal/symbol/observable.js");
/** PURE_IMPORTS_START _subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */









var subscribeTo = function (result) {
  if (!!result && typeof result[_symbol_observable__WEBPACK_IMPORTED_MODULE_8__["observable"]] === 'function') {
    return Object(_subscribeToObservable__WEBPACK_IMPORTED_MODULE_3__["subscribeToObservable"])(result);
  } else if (Object(_isArrayLike__WEBPACK_IMPORTED_MODULE_4__["isArrayLike"])(result)) {
    return Object(_subscribeToArray__WEBPACK_IMPORTED_MODULE_0__["subscribeToArray"])(result);
  } else if (Object(_isPromise__WEBPACK_IMPORTED_MODULE_5__["isPromise"])(result)) {
    return Object(_subscribeToPromise__WEBPACK_IMPORTED_MODULE_1__["subscribeToPromise"])(result);
  } else if (!!result && typeof result[_symbol_iterator__WEBPACK_IMPORTED_MODULE_7__["iterator"]] === 'function') {
    return Object(_subscribeToIterable__WEBPACK_IMPORTED_MODULE_2__["subscribeToIterable"])(result);
  } else {
    var value = Object(_isObject__WEBPACK_IMPORTED_MODULE_6__["isObject"])(result) ? 'an invalid object' : "'" + result + "'";
    var msg = "You provided " + value + " where a stream was expected." + ' You can provide an Observable, Promise, Array, or Iterable.';
    throw new TypeError(msg);
  }
};

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js ***!
  \*******************************************************************/
/*! exports provided: subscribeToArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToArray", function() { return subscribeToArray; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var subscribeToArray = function (array) {
  return function (subscriber) {
    for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }

    subscriber.complete();
  };
};

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js ***!
  \**********************************************************************/
/*! exports provided: subscribeToIterable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToIterable", function() { return subscribeToIterable; });
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/_esm5/internal/symbol/iterator.js");
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

var subscribeToIterable = function (iterable) {
  return function (subscriber) {
    var iterator = iterable[_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__["iterator"]]();

    do {
      var item = void 0;

      try {
        item = iterator.next();
      } catch (err) {
        subscriber.error(err);
        return subscriber;
      }

      if (item.done) {
        subscriber.complete();
        break;
      }

      subscriber.next(item.value);

      if (subscriber.closed) {
        break;
      }
    } while (true);

    if (typeof iterator.return === 'function') {
      subscriber.add(function () {
        if (iterator.return) {
          iterator.return();
        }
      });
    }

    return subscriber;
  };
};

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/subscribeToObservable.js":
/*!************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/subscribeToObservable.js ***!
  \************************************************************************/
/*! exports provided: subscribeToObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToObservable", function() { return subscribeToObservable; });
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/_esm5/internal/symbol/observable.js");
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

var subscribeToObservable = function (obj) {
  return function (subscriber) {
    var obs = obj[_symbol_observable__WEBPACK_IMPORTED_MODULE_0__["observable"]]();

    if (typeof obs.subscribe !== 'function') {
      throw new TypeError('Provided object does not correctly implement Symbol.observable');
    } else {
      return obs.subscribe(subscriber);
    }
  };
};

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/subscribeToPromise.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/subscribeToPromise.js ***!
  \*********************************************************************/
/*! exports provided: subscribeToPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToPromise", function() { return subscribeToPromise; });
/* harmony import */ var _hostReportError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hostReportError */ "./node_modules/rxjs/_esm5/internal/util/hostReportError.js");
/** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */

var subscribeToPromise = function (promise) {
  return function (subscriber) {
    promise.then(function (value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function (err) {
      return subscriber.error(err);
    }).then(null, _hostReportError__WEBPACK_IMPORTED_MODULE_0__["hostReportError"]);
    return subscriber;
  };
};

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js ***!
  \********************************************************************/
/*! exports provided: subscribeToResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeToResult", function() { return subscribeToResult; });
/* harmony import */ var _InnerSubscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../InnerSubscriber */ "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js");
/* harmony import */ var _subscribeTo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subscribeTo */ "./node_modules/rxjs/_esm5/internal/util/subscribeTo.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo,_Observable PURE_IMPORTS_END */



function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, innerSubscriber) {
  if (innerSubscriber === void 0) {
    innerSubscriber = new _InnerSubscriber__WEBPACK_IMPORTED_MODULE_0__["InnerSubscriber"](outerSubscriber, outerValue, outerIndex);
  }

  if (innerSubscriber.closed) {
    return undefined;
  }

  if (result instanceof _Observable__WEBPACK_IMPORTED_MODULE_2__["Observable"]) {
    return result.subscribe(innerSubscriber);
  }

  return Object(_subscribeTo__WEBPACK_IMPORTED_MODULE_1__["subscribeTo"])(result)(innerSubscriber);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/toSubscriber.js ***!
  \***************************************************************/
/*! exports provided: toSubscriber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toSubscriber", function() { return toSubscriber; });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/rxSubscriber */ "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js");
/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Observer */ "./node_modules/rxjs/_esm5/internal/Observer.js");
/** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */



function toSubscriber(nextOrObserver, error, complete) {
  if (nextOrObserver) {
    if (nextOrObserver instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__["Subscriber"]) {
      return nextOrObserver;
    }

    if (nextOrObserver[_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_1__["rxSubscriber"]]) {
      return nextOrObserver[_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_1__["rxSubscriber"]]();
    }
  }

  if (!nextOrObserver && !error && !complete) {
    return new _Subscriber__WEBPACK_IMPORTED_MODULE_0__["Subscriber"](_Observer__WEBPACK_IMPORTED_MODULE_2__["empty"]);
  }

  return new _Subscriber__WEBPACK_IMPORTED_MODULE_0__["Subscriber"](nextOrObserver, error, complete);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/operators/index.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/_esm5/operators/index.js ***!
  \****************************************************/
/*! exports provided: audit, auditTime, buffer, bufferCount, bufferTime, bufferToggle, bufferWhen, catchError, combineAll, combineLatest, concat, concatAll, concatMap, concatMapTo, count, debounce, debounceTime, defaultIfEmpty, delay, delayWhen, dematerialize, distinct, distinctUntilChanged, distinctUntilKeyChanged, elementAt, endWith, every, exhaust, exhaustMap, expand, filter, finalize, find, findIndex, first, groupBy, ignoreElements, isEmpty, last, map, mapTo, materialize, max, merge, mergeAll, mergeMap, flatMap, mergeMapTo, mergeScan, min, multicast, observeOn, onErrorResumeNext, pairwise, partition, pluck, publish, publishBehavior, publishLast, publishReplay, race, reduce, repeat, repeatWhen, retry, retryWhen, refCount, sample, sampleTime, scan, sequenceEqual, share, shareReplay, single, skip, skipLast, skipUntil, skipWhile, startWith, subscribeOn, switchAll, switchMap, switchMapTo, take, takeLast, takeUntil, takeWhile, tap, throttle, throttleTime, throwIfEmpty, timeInterval, timeout, timeoutWith, timestamp, toArray, window, windowCount, windowTime, windowToggle, windowWhen, withLatestFrom, zip, zipAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_operators_audit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/operators/audit */ "./node_modules/rxjs/_esm5/internal/operators/audit.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "audit", function() { return _internal_operators_audit__WEBPACK_IMPORTED_MODULE_0__["audit"]; });

/* harmony import */ var _internal_operators_auditTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/operators/auditTime */ "./node_modules/rxjs/_esm5/internal/operators/auditTime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "auditTime", function() { return _internal_operators_auditTime__WEBPACK_IMPORTED_MODULE_1__["auditTime"]; });

/* harmony import */ var _internal_operators_buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../internal/operators/buffer */ "./node_modules/rxjs/_esm5/internal/operators/buffer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buffer", function() { return _internal_operators_buffer__WEBPACK_IMPORTED_MODULE_2__["buffer"]; });

/* harmony import */ var _internal_operators_bufferCount__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../internal/operators/bufferCount */ "./node_modules/rxjs/_esm5/internal/operators/bufferCount.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bufferCount", function() { return _internal_operators_bufferCount__WEBPACK_IMPORTED_MODULE_3__["bufferCount"]; });

/* harmony import */ var _internal_operators_bufferTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../internal/operators/bufferTime */ "./node_modules/rxjs/_esm5/internal/operators/bufferTime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bufferTime", function() { return _internal_operators_bufferTime__WEBPACK_IMPORTED_MODULE_4__["bufferTime"]; });

/* harmony import */ var _internal_operators_bufferToggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../internal/operators/bufferToggle */ "./node_modules/rxjs/_esm5/internal/operators/bufferToggle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bufferToggle", function() { return _internal_operators_bufferToggle__WEBPACK_IMPORTED_MODULE_5__["bufferToggle"]; });

/* harmony import */ var _internal_operators_bufferWhen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../internal/operators/bufferWhen */ "./node_modules/rxjs/_esm5/internal/operators/bufferWhen.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bufferWhen", function() { return _internal_operators_bufferWhen__WEBPACK_IMPORTED_MODULE_6__["bufferWhen"]; });

/* harmony import */ var _internal_operators_catchError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../internal/operators/catchError */ "./node_modules/rxjs/_esm5/internal/operators/catchError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "catchError", function() { return _internal_operators_catchError__WEBPACK_IMPORTED_MODULE_7__["catchError"]; });

/* harmony import */ var _internal_operators_combineAll__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../internal/operators/combineAll */ "./node_modules/rxjs/_esm5/internal/operators/combineAll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "combineAll", function() { return _internal_operators_combineAll__WEBPACK_IMPORTED_MODULE_8__["combineAll"]; });

/* harmony import */ var _internal_operators_combineLatest__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../internal/operators/combineLatest */ "./node_modules/rxjs/_esm5/internal/operators/combineLatest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "combineLatest", function() { return _internal_operators_combineLatest__WEBPACK_IMPORTED_MODULE_9__["combineLatest"]; });

/* harmony import */ var _internal_operators_concat__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../internal/operators/concat */ "./node_modules/rxjs/_esm5/internal/operators/concat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return _internal_operators_concat__WEBPACK_IMPORTED_MODULE_10__["concat"]; });

/* harmony import */ var _internal_operators_concatAll__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../internal/operators/concatAll */ "./node_modules/rxjs/_esm5/internal/operators/concatAll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concatAll", function() { return _internal_operators_concatAll__WEBPACK_IMPORTED_MODULE_11__["concatAll"]; });

/* harmony import */ var _internal_operators_concatMap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../internal/operators/concatMap */ "./node_modules/rxjs/_esm5/internal/operators/concatMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concatMap", function() { return _internal_operators_concatMap__WEBPACK_IMPORTED_MODULE_12__["concatMap"]; });

/* harmony import */ var _internal_operators_concatMapTo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../internal/operators/concatMapTo */ "./node_modules/rxjs/_esm5/internal/operators/concatMapTo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concatMapTo", function() { return _internal_operators_concatMapTo__WEBPACK_IMPORTED_MODULE_13__["concatMapTo"]; });

/* harmony import */ var _internal_operators_count__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../internal/operators/count */ "./node_modules/rxjs/_esm5/internal/operators/count.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "count", function() { return _internal_operators_count__WEBPACK_IMPORTED_MODULE_14__["count"]; });

/* harmony import */ var _internal_operators_debounce__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../internal/operators/debounce */ "./node_modules/rxjs/_esm5/internal/operators/debounce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return _internal_operators_debounce__WEBPACK_IMPORTED_MODULE_15__["debounce"]; });

/* harmony import */ var _internal_operators_debounceTime__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../internal/operators/debounceTime */ "./node_modules/rxjs/_esm5/internal/operators/debounceTime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounceTime", function() { return _internal_operators_debounceTime__WEBPACK_IMPORTED_MODULE_16__["debounceTime"]; });

/* harmony import */ var _internal_operators_defaultIfEmpty__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../internal/operators/defaultIfEmpty */ "./node_modules/rxjs/_esm5/internal/operators/defaultIfEmpty.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultIfEmpty", function() { return _internal_operators_defaultIfEmpty__WEBPACK_IMPORTED_MODULE_17__["defaultIfEmpty"]; });

/* harmony import */ var _internal_operators_delay__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../internal/operators/delay */ "./node_modules/rxjs/_esm5/internal/operators/delay.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return _internal_operators_delay__WEBPACK_IMPORTED_MODULE_18__["delay"]; });

/* harmony import */ var _internal_operators_delayWhen__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../internal/operators/delayWhen */ "./node_modules/rxjs/_esm5/internal/operators/delayWhen.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "delayWhen", function() { return _internal_operators_delayWhen__WEBPACK_IMPORTED_MODULE_19__["delayWhen"]; });

/* harmony import */ var _internal_operators_dematerialize__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../internal/operators/dematerialize */ "./node_modules/rxjs/_esm5/internal/operators/dematerialize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dematerialize", function() { return _internal_operators_dematerialize__WEBPACK_IMPORTED_MODULE_20__["dematerialize"]; });

/* harmony import */ var _internal_operators_distinct__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../internal/operators/distinct */ "./node_modules/rxjs/_esm5/internal/operators/distinct.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinct", function() { return _internal_operators_distinct__WEBPACK_IMPORTED_MODULE_21__["distinct"]; });

/* harmony import */ var _internal_operators_distinctUntilChanged__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../internal/operators/distinctUntilChanged */ "./node_modules/rxjs/_esm5/internal/operators/distinctUntilChanged.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinctUntilChanged", function() { return _internal_operators_distinctUntilChanged__WEBPACK_IMPORTED_MODULE_22__["distinctUntilChanged"]; });

/* harmony import */ var _internal_operators_distinctUntilKeyChanged__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../internal/operators/distinctUntilKeyChanged */ "./node_modules/rxjs/_esm5/internal/operators/distinctUntilKeyChanged.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinctUntilKeyChanged", function() { return _internal_operators_distinctUntilKeyChanged__WEBPACK_IMPORTED_MODULE_23__["distinctUntilKeyChanged"]; });

/* harmony import */ var _internal_operators_elementAt__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../internal/operators/elementAt */ "./node_modules/rxjs/_esm5/internal/operators/elementAt.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "elementAt", function() { return _internal_operators_elementAt__WEBPACK_IMPORTED_MODULE_24__["elementAt"]; });

/* harmony import */ var _internal_operators_endWith__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../internal/operators/endWith */ "./node_modules/rxjs/_esm5/internal/operators/endWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "endWith", function() { return _internal_operators_endWith__WEBPACK_IMPORTED_MODULE_25__["endWith"]; });

/* harmony import */ var _internal_operators_every__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../internal/operators/every */ "./node_modules/rxjs/_esm5/internal/operators/every.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "every", function() { return _internal_operators_every__WEBPACK_IMPORTED_MODULE_26__["every"]; });

/* harmony import */ var _internal_operators_exhaust__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../internal/operators/exhaust */ "./node_modules/rxjs/_esm5/internal/operators/exhaust.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "exhaust", function() { return _internal_operators_exhaust__WEBPACK_IMPORTED_MODULE_27__["exhaust"]; });

/* harmony import */ var _internal_operators_exhaustMap__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../internal/operators/exhaustMap */ "./node_modules/rxjs/_esm5/internal/operators/exhaustMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "exhaustMap", function() { return _internal_operators_exhaustMap__WEBPACK_IMPORTED_MODULE_28__["exhaustMap"]; });

/* harmony import */ var _internal_operators_expand__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../internal/operators/expand */ "./node_modules/rxjs/_esm5/internal/operators/expand.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "expand", function() { return _internal_operators_expand__WEBPACK_IMPORTED_MODULE_29__["expand"]; });

/* harmony import */ var _internal_operators_filter__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../internal/operators/filter */ "./node_modules/rxjs/_esm5/internal/operators/filter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return _internal_operators_filter__WEBPACK_IMPORTED_MODULE_30__["filter"]; });

/* harmony import */ var _internal_operators_finalize__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../internal/operators/finalize */ "./node_modules/rxjs/_esm5/internal/operators/finalize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "finalize", function() { return _internal_operators_finalize__WEBPACK_IMPORTED_MODULE_31__["finalize"]; });

/* harmony import */ var _internal_operators_find__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../internal/operators/find */ "./node_modules/rxjs/_esm5/internal/operators/find.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "find", function() { return _internal_operators_find__WEBPACK_IMPORTED_MODULE_32__["find"]; });

/* harmony import */ var _internal_operators_findIndex__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../internal/operators/findIndex */ "./node_modules/rxjs/_esm5/internal/operators/findIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return _internal_operators_findIndex__WEBPACK_IMPORTED_MODULE_33__["findIndex"]; });

/* harmony import */ var _internal_operators_first__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../internal/operators/first */ "./node_modules/rxjs/_esm5/internal/operators/first.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "first", function() { return _internal_operators_first__WEBPACK_IMPORTED_MODULE_34__["first"]; });

/* harmony import */ var _internal_operators_groupBy__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../internal/operators/groupBy */ "./node_modules/rxjs/_esm5/internal/operators/groupBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "groupBy", function() { return _internal_operators_groupBy__WEBPACK_IMPORTED_MODULE_35__["groupBy"]; });

/* harmony import */ var _internal_operators_ignoreElements__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../internal/operators/ignoreElements */ "./node_modules/rxjs/_esm5/internal/operators/ignoreElements.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ignoreElements", function() { return _internal_operators_ignoreElements__WEBPACK_IMPORTED_MODULE_36__["ignoreElements"]; });

/* harmony import */ var _internal_operators_isEmpty__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../internal/operators/isEmpty */ "./node_modules/rxjs/_esm5/internal/operators/isEmpty.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return _internal_operators_isEmpty__WEBPACK_IMPORTED_MODULE_37__["isEmpty"]; });

/* harmony import */ var _internal_operators_last__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ../internal/operators/last */ "./node_modules/rxjs/_esm5/internal/operators/last.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "last", function() { return _internal_operators_last__WEBPACK_IMPORTED_MODULE_38__["last"]; });

/* harmony import */ var _internal_operators_map__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ../internal/operators/map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "map", function() { return _internal_operators_map__WEBPACK_IMPORTED_MODULE_39__["map"]; });

/* harmony import */ var _internal_operators_mapTo__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ../internal/operators/mapTo */ "./node_modules/rxjs/_esm5/internal/operators/mapTo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapTo", function() { return _internal_operators_mapTo__WEBPACK_IMPORTED_MODULE_40__["mapTo"]; });

/* harmony import */ var _internal_operators_materialize__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ../internal/operators/materialize */ "./node_modules/rxjs/_esm5/internal/operators/materialize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "materialize", function() { return _internal_operators_materialize__WEBPACK_IMPORTED_MODULE_41__["materialize"]; });

/* harmony import */ var _internal_operators_max__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ../internal/operators/max */ "./node_modules/rxjs/_esm5/internal/operators/max.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "max", function() { return _internal_operators_max__WEBPACK_IMPORTED_MODULE_42__["max"]; });

/* harmony import */ var _internal_operators_merge__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ../internal/operators/merge */ "./node_modules/rxjs/_esm5/internal/operators/merge.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return _internal_operators_merge__WEBPACK_IMPORTED_MODULE_43__["merge"]; });

/* harmony import */ var _internal_operators_mergeAll__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ../internal/operators/mergeAll */ "./node_modules/rxjs/_esm5/internal/operators/mergeAll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeAll", function() { return _internal_operators_mergeAll__WEBPACK_IMPORTED_MODULE_44__["mergeAll"]; });

/* harmony import */ var _internal_operators_mergeMap__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ../internal/operators/mergeMap */ "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeMap", function() { return _internal_operators_mergeMap__WEBPACK_IMPORTED_MODULE_45__["mergeMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flatMap", function() { return _internal_operators_mergeMap__WEBPACK_IMPORTED_MODULE_45__["flatMap"]; });

/* harmony import */ var _internal_operators_mergeMapTo__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ../internal/operators/mergeMapTo */ "./node_modules/rxjs/_esm5/internal/operators/mergeMapTo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeMapTo", function() { return _internal_operators_mergeMapTo__WEBPACK_IMPORTED_MODULE_46__["mergeMapTo"]; });

/* harmony import */ var _internal_operators_mergeScan__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ../internal/operators/mergeScan */ "./node_modules/rxjs/_esm5/internal/operators/mergeScan.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeScan", function() { return _internal_operators_mergeScan__WEBPACK_IMPORTED_MODULE_47__["mergeScan"]; });

/* harmony import */ var _internal_operators_min__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ../internal/operators/min */ "./node_modules/rxjs/_esm5/internal/operators/min.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "min", function() { return _internal_operators_min__WEBPACK_IMPORTED_MODULE_48__["min"]; });

/* harmony import */ var _internal_operators_multicast__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ../internal/operators/multicast */ "./node_modules/rxjs/_esm5/internal/operators/multicast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "multicast", function() { return _internal_operators_multicast__WEBPACK_IMPORTED_MODULE_49__["multicast"]; });

/* harmony import */ var _internal_operators_observeOn__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ../internal/operators/observeOn */ "./node_modules/rxjs/_esm5/internal/operators/observeOn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "observeOn", function() { return _internal_operators_observeOn__WEBPACK_IMPORTED_MODULE_50__["observeOn"]; });

/* harmony import */ var _internal_operators_onErrorResumeNext__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ../internal/operators/onErrorResumeNext */ "./node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onErrorResumeNext", function() { return _internal_operators_onErrorResumeNext__WEBPACK_IMPORTED_MODULE_51__["onErrorResumeNext"]; });

/* harmony import */ var _internal_operators_pairwise__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ../internal/operators/pairwise */ "./node_modules/rxjs/_esm5/internal/operators/pairwise.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pairwise", function() { return _internal_operators_pairwise__WEBPACK_IMPORTED_MODULE_52__["pairwise"]; });

/* harmony import */ var _internal_operators_partition__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ../internal/operators/partition */ "./node_modules/rxjs/_esm5/internal/operators/partition.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "partition", function() { return _internal_operators_partition__WEBPACK_IMPORTED_MODULE_53__["partition"]; });

/* harmony import */ var _internal_operators_pluck__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ../internal/operators/pluck */ "./node_modules/rxjs/_esm5/internal/operators/pluck.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pluck", function() { return _internal_operators_pluck__WEBPACK_IMPORTED_MODULE_54__["pluck"]; });

/* harmony import */ var _internal_operators_publish__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ../internal/operators/publish */ "./node_modules/rxjs/_esm5/internal/operators/publish.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return _internal_operators_publish__WEBPACK_IMPORTED_MODULE_55__["publish"]; });

/* harmony import */ var _internal_operators_publishBehavior__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ../internal/operators/publishBehavior */ "./node_modules/rxjs/_esm5/internal/operators/publishBehavior.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "publishBehavior", function() { return _internal_operators_publishBehavior__WEBPACK_IMPORTED_MODULE_56__["publishBehavior"]; });

/* harmony import */ var _internal_operators_publishLast__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ../internal/operators/publishLast */ "./node_modules/rxjs/_esm5/internal/operators/publishLast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "publishLast", function() { return _internal_operators_publishLast__WEBPACK_IMPORTED_MODULE_57__["publishLast"]; });

/* harmony import */ var _internal_operators_publishReplay__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ../internal/operators/publishReplay */ "./node_modules/rxjs/_esm5/internal/operators/publishReplay.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "publishReplay", function() { return _internal_operators_publishReplay__WEBPACK_IMPORTED_MODULE_58__["publishReplay"]; });

/* harmony import */ var _internal_operators_race__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ../internal/operators/race */ "./node_modules/rxjs/_esm5/internal/operators/race.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "race", function() { return _internal_operators_race__WEBPACK_IMPORTED_MODULE_59__["race"]; });

/* harmony import */ var _internal_operators_reduce__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ../internal/operators/reduce */ "./node_modules/rxjs/_esm5/internal/operators/reduce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return _internal_operators_reduce__WEBPACK_IMPORTED_MODULE_60__["reduce"]; });

/* harmony import */ var _internal_operators_repeat__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ../internal/operators/repeat */ "./node_modules/rxjs/_esm5/internal/operators/repeat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return _internal_operators_repeat__WEBPACK_IMPORTED_MODULE_61__["repeat"]; });

/* harmony import */ var _internal_operators_repeatWhen__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ../internal/operators/repeatWhen */ "./node_modules/rxjs/_esm5/internal/operators/repeatWhen.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "repeatWhen", function() { return _internal_operators_repeatWhen__WEBPACK_IMPORTED_MODULE_62__["repeatWhen"]; });

/* harmony import */ var _internal_operators_retry__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ../internal/operators/retry */ "./node_modules/rxjs/_esm5/internal/operators/retry.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "retry", function() { return _internal_operators_retry__WEBPACK_IMPORTED_MODULE_63__["retry"]; });

/* harmony import */ var _internal_operators_retryWhen__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ../internal/operators/retryWhen */ "./node_modules/rxjs/_esm5/internal/operators/retryWhen.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "retryWhen", function() { return _internal_operators_retryWhen__WEBPACK_IMPORTED_MODULE_64__["retryWhen"]; });

/* harmony import */ var _internal_operators_refCount__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ../internal/operators/refCount */ "./node_modules/rxjs/_esm5/internal/operators/refCount.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "refCount", function() { return _internal_operators_refCount__WEBPACK_IMPORTED_MODULE_65__["refCount"]; });

/* harmony import */ var _internal_operators_sample__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ../internal/operators/sample */ "./node_modules/rxjs/_esm5/internal/operators/sample.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sample", function() { return _internal_operators_sample__WEBPACK_IMPORTED_MODULE_66__["sample"]; });

/* harmony import */ var _internal_operators_sampleTime__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ../internal/operators/sampleTime */ "./node_modules/rxjs/_esm5/internal/operators/sampleTime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sampleTime", function() { return _internal_operators_sampleTime__WEBPACK_IMPORTED_MODULE_67__["sampleTime"]; });

/* harmony import */ var _internal_operators_scan__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ../internal/operators/scan */ "./node_modules/rxjs/_esm5/internal/operators/scan.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return _internal_operators_scan__WEBPACK_IMPORTED_MODULE_68__["scan"]; });

/* harmony import */ var _internal_operators_sequenceEqual__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ../internal/operators/sequenceEqual */ "./node_modules/rxjs/_esm5/internal/operators/sequenceEqual.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sequenceEqual", function() { return _internal_operators_sequenceEqual__WEBPACK_IMPORTED_MODULE_69__["sequenceEqual"]; });

/* harmony import */ var _internal_operators_share__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ../internal/operators/share */ "./node_modules/rxjs/_esm5/internal/operators/share.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "share", function() { return _internal_operators_share__WEBPACK_IMPORTED_MODULE_70__["share"]; });

/* harmony import */ var _internal_operators_shareReplay__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ../internal/operators/shareReplay */ "./node_modules/rxjs/_esm5/internal/operators/shareReplay.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shareReplay", function() { return _internal_operators_shareReplay__WEBPACK_IMPORTED_MODULE_71__["shareReplay"]; });

/* harmony import */ var _internal_operators_single__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ../internal/operators/single */ "./node_modules/rxjs/_esm5/internal/operators/single.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "single", function() { return _internal_operators_single__WEBPACK_IMPORTED_MODULE_72__["single"]; });

/* harmony import */ var _internal_operators_skip__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ../internal/operators/skip */ "./node_modules/rxjs/_esm5/internal/operators/skip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "skip", function() { return _internal_operators_skip__WEBPACK_IMPORTED_MODULE_73__["skip"]; });

/* harmony import */ var _internal_operators_skipLast__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ../internal/operators/skipLast */ "./node_modules/rxjs/_esm5/internal/operators/skipLast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "skipLast", function() { return _internal_operators_skipLast__WEBPACK_IMPORTED_MODULE_74__["skipLast"]; });

/* harmony import */ var _internal_operators_skipUntil__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ../internal/operators/skipUntil */ "./node_modules/rxjs/_esm5/internal/operators/skipUntil.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "skipUntil", function() { return _internal_operators_skipUntil__WEBPACK_IMPORTED_MODULE_75__["skipUntil"]; });

/* harmony import */ var _internal_operators_skipWhile__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ../internal/operators/skipWhile */ "./node_modules/rxjs/_esm5/internal/operators/skipWhile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "skipWhile", function() { return _internal_operators_skipWhile__WEBPACK_IMPORTED_MODULE_76__["skipWhile"]; });

/* harmony import */ var _internal_operators_startWith__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ../internal/operators/startWith */ "./node_modules/rxjs/_esm5/internal/operators/startWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "startWith", function() { return _internal_operators_startWith__WEBPACK_IMPORTED_MODULE_77__["startWith"]; });

/* harmony import */ var _internal_operators_subscribeOn__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ../internal/operators/subscribeOn */ "./node_modules/rxjs/_esm5/internal/operators/subscribeOn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscribeOn", function() { return _internal_operators_subscribeOn__WEBPACK_IMPORTED_MODULE_78__["subscribeOn"]; });

/* harmony import */ var _internal_operators_switchAll__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ../internal/operators/switchAll */ "./node_modules/rxjs/_esm5/internal/operators/switchAll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "switchAll", function() { return _internal_operators_switchAll__WEBPACK_IMPORTED_MODULE_79__["switchAll"]; });

/* harmony import */ var _internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ../internal/operators/switchMap */ "./node_modules/rxjs/_esm5/internal/operators/switchMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "switchMap", function() { return _internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_80__["switchMap"]; });

/* harmony import */ var _internal_operators_switchMapTo__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ../internal/operators/switchMapTo */ "./node_modules/rxjs/_esm5/internal/operators/switchMapTo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "switchMapTo", function() { return _internal_operators_switchMapTo__WEBPACK_IMPORTED_MODULE_81__["switchMapTo"]; });

/* harmony import */ var _internal_operators_take__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ../internal/operators/take */ "./node_modules/rxjs/_esm5/internal/operators/take.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "take", function() { return _internal_operators_take__WEBPACK_IMPORTED_MODULE_82__["take"]; });

/* harmony import */ var _internal_operators_takeLast__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ../internal/operators/takeLast */ "./node_modules/rxjs/_esm5/internal/operators/takeLast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "takeLast", function() { return _internal_operators_takeLast__WEBPACK_IMPORTED_MODULE_83__["takeLast"]; });

/* harmony import */ var _internal_operators_takeUntil__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ../internal/operators/takeUntil */ "./node_modules/rxjs/_esm5/internal/operators/takeUntil.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "takeUntil", function() { return _internal_operators_takeUntil__WEBPACK_IMPORTED_MODULE_84__["takeUntil"]; });

/* harmony import */ var _internal_operators_takeWhile__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ../internal/operators/takeWhile */ "./node_modules/rxjs/_esm5/internal/operators/takeWhile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "takeWhile", function() { return _internal_operators_takeWhile__WEBPACK_IMPORTED_MODULE_85__["takeWhile"]; });

/* harmony import */ var _internal_operators_tap__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ../internal/operators/tap */ "./node_modules/rxjs/_esm5/internal/operators/tap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return _internal_operators_tap__WEBPACK_IMPORTED_MODULE_86__["tap"]; });

/* harmony import */ var _internal_operators_throttle__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ../internal/operators/throttle */ "./node_modules/rxjs/_esm5/internal/operators/throttle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return _internal_operators_throttle__WEBPACK_IMPORTED_MODULE_87__["throttle"]; });

/* harmony import */ var _internal_operators_throttleTime__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ../internal/operators/throttleTime */ "./node_modules/rxjs/_esm5/internal/operators/throttleTime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "throttleTime", function() { return _internal_operators_throttleTime__WEBPACK_IMPORTED_MODULE_88__["throttleTime"]; });

/* harmony import */ var _internal_operators_throwIfEmpty__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ../internal/operators/throwIfEmpty */ "./node_modules/rxjs/_esm5/internal/operators/throwIfEmpty.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "throwIfEmpty", function() { return _internal_operators_throwIfEmpty__WEBPACK_IMPORTED_MODULE_89__["throwIfEmpty"]; });

/* harmony import */ var _internal_operators_timeInterval__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ../internal/operators/timeInterval */ "./node_modules/rxjs/_esm5/internal/operators/timeInterval.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeInterval", function() { return _internal_operators_timeInterval__WEBPACK_IMPORTED_MODULE_90__["timeInterval"]; });

/* harmony import */ var _internal_operators_timeout__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ../internal/operators/timeout */ "./node_modules/rxjs/_esm5/internal/operators/timeout.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeout", function() { return _internal_operators_timeout__WEBPACK_IMPORTED_MODULE_91__["timeout"]; });

/* harmony import */ var _internal_operators_timeoutWith__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ../internal/operators/timeoutWith */ "./node_modules/rxjs/_esm5/internal/operators/timeoutWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeoutWith", function() { return _internal_operators_timeoutWith__WEBPACK_IMPORTED_MODULE_92__["timeoutWith"]; });

/* harmony import */ var _internal_operators_timestamp__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ../internal/operators/timestamp */ "./node_modules/rxjs/_esm5/internal/operators/timestamp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timestamp", function() { return _internal_operators_timestamp__WEBPACK_IMPORTED_MODULE_93__["timestamp"]; });

/* harmony import */ var _internal_operators_toArray__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ../internal/operators/toArray */ "./node_modules/rxjs/_esm5/internal/operators/toArray.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return _internal_operators_toArray__WEBPACK_IMPORTED_MODULE_94__["toArray"]; });

/* harmony import */ var _internal_operators_window__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ../internal/operators/window */ "./node_modules/rxjs/_esm5/internal/operators/window.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "window", function() { return _internal_operators_window__WEBPACK_IMPORTED_MODULE_95__["window"]; });

/* harmony import */ var _internal_operators_windowCount__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ../internal/operators/windowCount */ "./node_modules/rxjs/_esm5/internal/operators/windowCount.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "windowCount", function() { return _internal_operators_windowCount__WEBPACK_IMPORTED_MODULE_96__["windowCount"]; });

/* harmony import */ var _internal_operators_windowTime__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ../internal/operators/windowTime */ "./node_modules/rxjs/_esm5/internal/operators/windowTime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "windowTime", function() { return _internal_operators_windowTime__WEBPACK_IMPORTED_MODULE_97__["windowTime"]; });

/* harmony import */ var _internal_operators_windowToggle__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ../internal/operators/windowToggle */ "./node_modules/rxjs/_esm5/internal/operators/windowToggle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "windowToggle", function() { return _internal_operators_windowToggle__WEBPACK_IMPORTED_MODULE_98__["windowToggle"]; });

/* harmony import */ var _internal_operators_windowWhen__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ../internal/operators/windowWhen */ "./node_modules/rxjs/_esm5/internal/operators/windowWhen.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "windowWhen", function() { return _internal_operators_windowWhen__WEBPACK_IMPORTED_MODULE_99__["windowWhen"]; });

/* harmony import */ var _internal_operators_withLatestFrom__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ../internal/operators/withLatestFrom */ "./node_modules/rxjs/_esm5/internal/operators/withLatestFrom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withLatestFrom", function() { return _internal_operators_withLatestFrom__WEBPACK_IMPORTED_MODULE_100__["withLatestFrom"]; });

/* harmony import */ var _internal_operators_zip__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ../internal/operators/zip */ "./node_modules/rxjs/_esm5/internal/operators/zip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return _internal_operators_zip__WEBPACK_IMPORTED_MODULE_101__["zip"]; });

/* harmony import */ var _internal_operators_zipAll__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ../internal/operators/zipAll */ "./node_modules/rxjs/_esm5/internal/operators/zipAll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zipAll", function() { return _internal_operators_zipAll__WEBPACK_IMPORTED_MODULE_102__["zipAll"]; });

/** PURE_IMPORTS_START  PURE_IMPORTS_END */








































































































/***/ }),

/***/ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/node_modules/tslib/tslib.es6.js ***!
  \***********************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
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
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
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
function __createBinding(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}
function __exportStar(m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
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
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}
;
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
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
}

/***/ }),

/***/ "./node_modules/walletlink/dist/WalletLink.js":
/*!****************************************************!*\
  !*** ./node_modules/walletlink/dist/WalletLink.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLink = void 0;

const url_1 = __importDefault(__webpack_require__(/*! url */ "./node_modules/url/url.js"));

const ScopedLocalStorage_1 = __webpack_require__(/*! ./lib/ScopedLocalStorage */ "./node_modules/walletlink/dist/lib/ScopedLocalStorage.js");

const WalletLinkProvider_1 = __webpack_require__(/*! ./provider/WalletLinkProvider */ "./node_modules/walletlink/dist/provider/WalletLinkProvider.js");

const WalletLinkSdkUI_1 = __webpack_require__(/*! ./provider/WalletLinkSdkUI */ "./node_modules/walletlink/dist/provider/WalletLinkSdkUI.js");

const WalletLinkRelay_1 = __webpack_require__(/*! ./relay/WalletLinkRelay */ "./node_modules/walletlink/dist/relay/WalletLinkRelay.js");

const WalletLinkRelayEventManager_1 = __webpack_require__(/*! ./relay/WalletLinkRelayEventManager */ "./node_modules/walletlink/dist/relay/WalletLinkRelayEventManager.js");

const util_1 = __webpack_require__(/*! ./util */ "./node_modules/walletlink/dist/util.js");

const WALLETLINK_URL = Object({"NODE_ENV":"development","PUBLIC_URL":"","WDS_SOCKET_HOST":undefined,"WDS_SOCKET_PATH":undefined,"WDS_SOCKET_PORT":undefined,"FAST_REFRESH":true,"REACT_APP_PORTIS_ID":"d470ce84-b4a4-486a-9060-0764937cad1f","REACT_APP_API_URL":"http://0.0.0.0/api","REACT_APP_SENTRY":"https://605df55dc7624fce8745521fa527f36c@o571207.ingest.sentry.io/5718983","REACT_APP_TREZOR_URL":"http://beta.bondappetit.io/","REACT_APP_TREZOR_EMAIL":"dummy@abc.xyz","REACT_APP_FORTMATIC_KEY":"","REACT_APP_WAVES_NODE_URL":"https://nodes-testnet.wavesnodes.com","REACT_APP_SID_LIFE_TIME":"10"}).WALLETLINK_URL || "https://www.walletlink.org";
const WALLETLINK_VERSION = Object({"NODE_ENV":"development","PUBLIC_URL":"","WDS_SOCKET_HOST":undefined,"WDS_SOCKET_PATH":undefined,"WDS_SOCKET_PORT":undefined,"FAST_REFRESH":true,"REACT_APP_PORTIS_ID":"d470ce84-b4a4-486a-9060-0764937cad1f","REACT_APP_API_URL":"http://0.0.0.0/api","REACT_APP_SENTRY":"https://605df55dc7624fce8745521fa527f36c@o571207.ingest.sentry.io/5718983","REACT_APP_TREZOR_URL":"http://beta.bondappetit.io/","REACT_APP_TREZOR_EMAIL":"dummy@abc.xyz","REACT_APP_FORTMATIC_KEY":"","REACT_APP_WAVES_NODE_URL":"https://nodes-testnet.wavesnodes.com","REACT_APP_SID_LIFE_TIME":"10"}).WALLETLINK_VERSION || __webpack_require__(/*! ../package.json */ "./node_modules/walletlink/package.json").version || "unknown";

class WalletLink {
  /**
   * Constructor
   * @param options WalletLink options object
   */
  constructor(options) {
    this._appName = "";
    this._appLogoUrl = null;
    this._relay = null;
    this._relayEventManager = null;
    let walletLinkUrl = options.walletLinkUrl || WALLETLINK_URL;
    let walletLinkUIConstructor;

    if (!options.walletLinkUIConstructor) {
      walletLinkUIConstructor = options => new WalletLinkSdkUI_1.WalletLinkSdkUI(options);
    } else {
      walletLinkUIConstructor = options.walletLinkUIConstructor;
    }

    if (typeof options.overrideIsMetaMask === "undefined") {
      this._overrideIsMetaMask = false;
    } else {
      this._overrideIsMetaMask = options.overrideIsMetaMask;
    }

    const u = url_1.default.parse(walletLinkUrl);
    const walletLinkOrigin = `${u.protocol}//${u.host}`;
    this._storage = new ScopedLocalStorage_1.ScopedLocalStorage(`-walletlink:${walletLinkOrigin}`);

    this._storage.setItem("version", WalletLink.VERSION);

    if (typeof window.walletLinkExtension !== "undefined") {
      return;
    }

    this._relayEventManager = new WalletLinkRelayEventManager_1.WalletLinkRelayEventManager();
    this._relay = new WalletLinkRelay_1.WalletLinkRelay({
      walletLinkUrl: walletLinkUrl,
      version: WALLETLINK_VERSION,
      darkMode: !!options.darkMode,
      walletLinkUIConstructor: walletLinkUIConstructor,
      storage: this._storage,
      relayEventManager: this._relayEventManager
    });
    this.setAppInfo(options.appName, options.appLogoUrl);

    this._relay.attachUI();
  }
  /**
   * Create a Web3 Provider object
   * @param jsonRpcUrl Ethereum JSON RPC URL (Default: "")
   * @param chainId Ethereum Chain ID (Default: 1)
   * @returns A Web3 Provider
   */


  makeWeb3Provider(jsonRpcUrl = "", chainId = 1) {
    if (typeof window.walletLinkExtension !== "undefined") {
      if ( //@ts-ignore
      typeof window.walletLinkExtension.isCipher !== "boolean" || //@ts-ignore
      !window.walletLinkExtension.isCipher) {
        //@ts-ignore
        window.walletLinkExtension.setProviderInfo(jsonRpcUrl, chainId);
      }

      return window.walletLinkExtension;
    }

    const relay = this._relay;

    if (!relay || !this._relayEventManager || !this._storage) {
      throw new Error("Relay not initialized, should never happen");
    }

    if (!jsonRpcUrl) relay.setConnectDisabled(true);
    return new WalletLinkProvider_1.WalletLinkProvider({
      relayProvider: () => Promise.resolve(relay),
      relayEventManager: this._relayEventManager,
      storage: this._storage,
      jsonRpcUrl,
      chainId,
      overrideIsMetaMask: this._overrideIsMetaMask
    });
  }
  /**
   * Set application information
   * @param appName Application name
   * @param appLogoUrl Application logo image URL
   */


  setAppInfo(appName, appLogoUrl) {
    var _a;

    this._appName = appName || "DApp";
    this._appLogoUrl = appLogoUrl || util_1.getFavicon();

    if (typeof window.walletLinkExtension !== "undefined") {
      if ( //@ts-ignore
      typeof window.walletLinkExtension.isCipher !== "boolean" || //@ts-ignore
      !window.walletLinkExtension.isCipher) {
        //@ts-ignore
        window.walletLinkExtension.setAppInfo(this._appName, this._appLogoUrl);
      }
    } else {
      (_a = this._relay) === null || _a === void 0 ? void 0 : _a.setAppInfo(this._appName, this._appLogoUrl);
    }
  }
  /**
   * Disconnect. After disconnecting, this will reload the web page to ensure
   * all potential stale state is cleared.
   */


  disconnect() {
    var _a;

    if (typeof window.walletLinkExtension !== "undefined") {
      window.walletLinkExtension.close();
    } else {
      (_a = this._relay) === null || _a === void 0 ? void 0 : _a.resetAndReload();
    }
  }

}

exports.WalletLink = WalletLink;
/**
 * WalletLink version
 */

WalletLink.VERSION = WALLETLINK_VERSION;

/***/ }),

/***/ "./node_modules/walletlink/dist/components/LinkDialog-css.js":
/*!*******************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/LinkDialog-css.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `.-walletlink-css-reset .-walletlink-link-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-walletlink-css-reset .-walletlink-link-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.33);transition:opacity .25s}.-walletlink-css-reset .-walletlink-link-dialog-backdrop-hidden{opacity:0}.-walletlink-css-reset .-walletlink-link-dialog-box{display:flex;position:relative;flex-direction:column;background-color:#f6f6f6;border-radius:16px;box-shadow:0px 16px 24px rgba(0,0,0,.1),0px 0px 8px rgba(0,0,0,.05);transform:scale(1);transition:opacity .25s,transform .25s;overflow:hidden}.-walletlink-css-reset .-walletlink-link-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-walletlink-css-reset .-walletlink-link-dialog-box-content{padding:24px;text-align:center}.-walletlink-css-reset .-walletlink-link-dialog-box-content h3{display:block;margin-bottom:24px;text-align:left;text-transform:uppercase;font-size:22px;font-weight:bold;line-height:1.2;color:#000}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode{position:relative;display:block;margin-bottom:24px;background-color:#f6f6f6;padding:16px;border-radius:16px;box-shadow:4px 4px 8px rgba(0,0,0,.15),-8px -8px 8px #fff;overflow:hidden}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-wrapper{display:block;width:232px;height:232px;padding:4px;border-radius:4px;background:#f4f4f4;margin-bottom:16px}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-wrapper img{display:block;width:224px;height:224px}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode>p{display:block;color:gray;font-weight:bold;font-size:12px;text-align:center}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-connecting{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(246,246,246,.98)}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-connecting p{margin-top:16px;color:#333;font-size:12px;font-weight:bold}.-walletlink-css-reset .-walletlink-link-dialog-box-content a{text-align:center;cursor:pointer;transition:color .1s;font-size:14px}.-walletlink-css-reset .-walletlink-link-dialog-box-content a,.-walletlink-css-reset .-walletlink-link-dialog-box-content a:link,.-walletlink-css-reset .-walletlink-link-dialog-box-content a:visited{color:#999}.-walletlink-css-reset .-walletlink-link-dialog-box-content a:hover,.-walletlink-css-reset .-walletlink-link-dialog-box-content a:active{color:#666;text-decoration:underline}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel{position:absolute;-webkit-appearance:none;display:flex;align-items:center;justify-content:center;top:24px;right:24px;width:24px;height:24px;border-radius:12px;background-color:#e7e7e7;cursor:pointer}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x{position:relative;display:block}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::before,.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::after{content:"";position:absolute;display:block;top:-1px;left:-7px;width:14px;height:2px;background-color:#999;transition:background-color .2s}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::before{transform:rotate(45deg)}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::after{transform:rotate(135deg)}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x-a,.-walletlink-css-reset .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x-b{background-color:#000}.-walletlink-css-reset .-walletlink-link-dialog-container{display:block}.-walletlink-css-reset .-walletlink-link-dialog-container-hidden{display:none}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box{background-color:#2a2a2a}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content h3{color:#ccc}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode{background-color:#2a2a2a;box-shadow:4px 4px 8px rgba(0,0,0,.5),-8px -8px 8px #343434}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode>p{color:#999}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode-connecting{background:rgba(42,42,42,.98)}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode-connecting p{color:#ddd}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:link,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:visited{color:#888}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:hover,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:active{color:#aaa}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel{background-color:#333}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel-x::before,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel-x::after{background-color:#aaa}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x::before,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x::after{background-color:#eee}`;

/***/ }),

/***/ "./node_modules/walletlink/dist/components/LinkDialog.js":
/*!***************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/LinkDialog.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkDialog = void 0;

const clsx_1 = __importDefault(__webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js"));

const preact_1 = __webpack_require__(/*! preact */ "./node_modules/walletlink/node_modules/preact/dist/preact.module.js");

const hooks_1 = __webpack_require__(/*! preact/hooks */ "./node_modules/walletlink/node_modules/preact/hooks/dist/hooks.module.js");

const LinkDialog_css_1 = __importDefault(__webpack_require__(/*! ./LinkDialog-css */ "./node_modules/walletlink/dist/components/LinkDialog-css.js"));

const QRCode_1 = __webpack_require__(/*! ./QRCode */ "./node_modules/walletlink/dist/components/QRCode.js");

const Spinner_1 = __webpack_require__(/*! ./Spinner */ "./node_modules/walletlink/dist/components/Spinner.js");

const LinkDialog = props => {
  const [isContainerHidden, setContainerHidden] = hooks_1.useState(!props.isOpen);
  const [isDialogHidden, setDialogHidden] = hooks_1.useState(!props.isOpen);
  hooks_1.useEffect(() => {
    const {
      isOpen
    } = props;
    const timers = [window.setTimeout(() => {
      setDialogHidden(!isOpen);
    }, 10)];

    if (isOpen) {
      setContainerHidden(false);
    } else {
      timers.push(window.setTimeout(() => {
        setContainerHidden(true);
      }, 360));
    }

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, [props.isOpen]);
  return preact_1.h("div", {
    class: clsx_1.default("-walletlink-link-dialog-container", props.darkMode && "-walletlink-link-dialog-container-dark", isContainerHidden && "-walletlink-link-dialog-container-hidden")
  }, preact_1.h("style", null, LinkDialog_css_1.default), preact_1.h("div", {
    class: clsx_1.default("-walletlink-link-dialog-backdrop", isDialogHidden && "-walletlink-link-dialog-backdrop-hidden")
  }), preact_1.h("div", {
    class: "-walletlink-link-dialog"
  }, preact_1.h("div", {
    class: clsx_1.default("-walletlink-link-dialog-box", isDialogHidden && "-walletlink-link-dialog-box-hidden")
  }, preact_1.h(ScanQRCode, {
    darkMode: props.darkMode,
    version: props.version,
    sessionId: props.sessionId,
    sessionSecret: props.sessionSecret,
    walletLinkUrl: props.walletLinkUrl,
    isConnected: props.isConnected,
    isParentConnection: props.isParentConnection
  }), props.onCancel && preact_1.h(CancelButton, {
    onClick: props.onCancel
  }))));
};

exports.LinkDialog = LinkDialog;

const ScanQRCode = props => {
  const serverUrl = window.encodeURIComponent(props.walletLinkUrl);
  const sessionIdKey = props.isParentConnection ? "parent-id" : "id";
  const qrUrl = `${props.walletLinkUrl}/#/link?${sessionIdKey}=${props.sessionId}&secret=${props.sessionSecret}&server=${serverUrl}&v=1`;
  return preact_1.h("div", {
    class: "-walletlink-link-dialog-box-content"
  }, preact_1.h("h3", null, "Scan to", preact_1.h("br", null), " Connect"), preact_1.h("div", {
    class: "-walletlink-link-dialog-box-content-qrcode"
  }, preact_1.h("div", {
    class: "-walletlink-link-dialog-box-content-qrcode-wrapper"
  }, preact_1.h(QRCode_1.QRCode, {
    content: qrUrl,
    width: 224,
    height: 224,
    fgColor: "#000",
    bgColor: "transparent"
  })), preact_1.h("input", {
    type: "hidden",
    value: qrUrl
  }), !props.isConnected && preact_1.h("div", {
    class: "-walletlink-link-dialog-box-content-qrcode-connecting"
  }, preact_1.h(Spinner_1.Spinner, {
    size: 128,
    color: props.darkMode ? "#fff" : "#000"
  }), preact_1.h("p", null, "Connecting...")), preact_1.h("p", {
    title: `WalletLink v${props.version}`
  }, "Powered by WalletLink")), preact_1.h("a", {
    href: `${props.walletLinkUrl}/#/wallets`,
    target: "_blank",
    rel: "noopener"
  }, "Don\u2019t have a wallet app?"));
};

const CancelButton = props => preact_1.h("button", {
  class: "-walletlink-link-dialog-box-cancel",
  onClick: props.onClick
}, preact_1.h("div", {
  class: "-walletlink-link-dialog-box-cancel-x"
}));

/***/ }),

/***/ "./node_modules/walletlink/dist/components/LinkFlow.js":
/*!*************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/LinkFlow.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkFlow = void 0;

const preact_1 = __webpack_require__(/*! preact */ "./node_modules/walletlink/node_modules/preact/dist/preact.module.js");

const rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

const LinkDialog_1 = __webpack_require__(/*! ./LinkDialog */ "./node_modules/walletlink/dist/components/LinkDialog.js");

const operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

const TryExtensionLinkDialog_1 = __webpack_require__(/*! ./TryExtensionLinkDialog */ "./node_modules/walletlink/dist/components/TryExtensionLinkDialog.js");

class LinkFlow {
  constructor(options) {
    this.extensionUI$ = new rxjs_1.BehaviorSubject({});
    this.subscriptions = new rxjs_1.Subscription();
    this.isConnected = false;
    this.isOpen = false;
    this.onCancel = null;
    this.root = null; // if true, hide QR code in LinkFlow (which happens if no jsonRpcUrl is provided)

    this.connectDisabled = false;
    this.darkMode = options.darkMode;
    this.version = options.version;
    this.sessionId = options.sessionId;
    this.sessionSecret = options.sessionSecret;
    this.walletLinkUrl = options.walletLinkUrl;
    this.isParentConnection = options.isParentConnection;
    this.connected$ = options.connected$; // Check if extension UI is enabled

    fetch("https://api.wallet.coinbase.com/rpc/v2/getFeatureFlags").then(res => res.json()).then(json => {
      const enabled = json.result.desktop.extension_ui;

      if (typeof enabled === "undefined") {
        this.extensionUI$.next({
          value: false
        });
      } else {
        this.extensionUI$.next({
          value: enabled
        });
      }
    }).catch(_ => {
      this.extensionUI$.next({
        value: false
      });
    });
  }

  attach(el) {
    this.root = document.createElement("div");
    this.root.className = "-walletlink-link-flow-root";
    el.appendChild(this.root);
    this.render();
    this.subscriptions.add(this.connected$.subscribe(v => {
      if (this.isConnected !== v) {
        this.isConnected = v;
        this.render();
      }
    }));
  }

  detach() {
    var _a;

    if (!this.root) {
      return;
    }

    this.subscriptions.unsubscribe();
    preact_1.render(null, this.root);
    (_a = this.root.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.root);
  }

  setConnectDisabled(connectDisabled) {
    this.connectDisabled = connectDisabled;
  }

  open(options) {
    this.isOpen = true;
    this.onCancel = options.onCancel;
    this.render();
  }

  close() {
    this.isOpen = false;
    this.onCancel = null;
    this.render();
  }

  render() {
    if (!this.root) {
      return;
    }

    const subscription = this.extensionUI$.pipe(operators_1.first(enabled => enabled.value !== undefined)) // wait for a valid value before rendering
    .subscribe(enabled => {
      if (!this.root) {
        return;
      }

      preact_1.render(enabled.value ? preact_1.h(TryExtensionLinkDialog_1.TryExtensionLinkDialog, {
        darkMode: this.darkMode,
        version: this.version,
        sessionId: this.sessionId,
        sessionSecret: this.sessionSecret,
        walletLinkUrl: this.walletLinkUrl,
        isOpen: this.isOpen,
        isConnected: this.isConnected,
        isParentConnection: this.isParentConnection,
        onCancel: this.onCancel,
        connectDisabled: this.connectDisabled
      }) : preact_1.h(LinkDialog_1.LinkDialog, {
        darkMode: this.darkMode,
        version: this.version,
        sessionId: this.sessionId,
        sessionSecret: this.sessionSecret,
        walletLinkUrl: this.walletLinkUrl,
        isOpen: this.isOpen,
        isConnected: this.isConnected,
        isParentConnection: this.isParentConnection,
        onCancel: this.onCancel
      }), this.root);
    });
    this.subscriptions.add(subscription);
  }

}

exports.LinkFlow = LinkFlow;

/***/ }),

/***/ "./node_modules/walletlink/dist/components/QRCode.js":
/*!***********************************************************!*\
  !*** ./node_modules/walletlink/dist/components/QRCode.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) { // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QRCode = void 0;

const preact_1 = __webpack_require__(/*! preact */ "./node_modules/walletlink/node_modules/preact/dist/preact.module.js");

const hooks_1 = __webpack_require__(/*! preact/hooks */ "./node_modules/walletlink/node_modules/preact/hooks/dist/hooks.module.js");

const qrcode_svg_1 = __importDefault(__webpack_require__(/*! ../vendor-js/qrcode-svg */ "./node_modules/walletlink/dist/vendor-js/qrcode-svg/index.js"));

const QRCode = props => {
  const [svg, setSvg] = hooks_1.useState("");
  hooks_1.useEffect(() => {
    var _a, _b;

    const qrcode = new qrcode_svg_1.default({
      content: props.content,
      background: props.bgColor || "#ffffff",
      color: props.fgColor || "#000000",
      container: "svg",
      ecl: "M",
      width: (_a = props.width) !== null && _a !== void 0 ? _a : 256,
      height: (_b = props.height) !== null && _b !== void 0 ? _b : 256,
      padding: 0,
      image: props.image
    });
    const base64 = Buffer.from(qrcode.svg(), "utf8").toString("base64");
    setSvg(`data:image/svg+xml;base64,${base64}`);
  });
  return svg ? preact_1.h("img", {
    src: svg,
    alt: "QR Code"
  }) : null;
};

exports.QRCode = QRCode;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/walletlink/dist/components/Snackbar-css.js":
/*!*****************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/Snackbar-css.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `.-walletlink-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-walletlink-css-reset .-gear-container *{user-select:none}.-walletlink-css-reset .-gear-container svg{opacity:0;position:absolute}.-walletlink-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-walletlink-css-reset .-walletlink-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-walletlink-css-reset .-walletlink-snackbar *{user-select:none}.-walletlink-css-reset .-walletlink-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-walletlink-css-reset .-walletlink-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-walletlink-css-reset .-walletlink-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-walletlink-css-reset .-walletlink-snackbar-instance-header *{cursor:pointer}.-walletlink-css-reset .-walletlink-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-walletlink-css-reset .-walletlink-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-walletlink-css-reset .-walletlink-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-walletlink-css-reset .-walletlink-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-walletlink-css-reset .-walletlink-snackbar-instance-expanded .-walletlink-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}`;

/***/ }),

/***/ "./node_modules/walletlink/dist/components/Snackbar.js":
/*!*************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/Snackbar.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snackbar = void 0;

const clsx_1 = __importDefault(__webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js"));

const preact_1 = __webpack_require__(/*! preact */ "./node_modules/walletlink/node_modules/preact/dist/preact.module.js");

const hooks_1 = __webpack_require__(/*! preact/hooks */ "./node_modules/walletlink/node_modules/preact/hooks/dist/hooks.module.js");

const Snackbar_css_1 = __importDefault(__webpack_require__(/*! ./Snackbar-css */ "./node_modules/walletlink/dist/components/Snackbar-css.js"));

const cblogo = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+`;
const gearIcon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=`;

class Snackbar {
  constructor(options) {
    this.items = new Map();
    this.nextItemKey = 0;
    this.root = null;
    this.darkMode = options.darkMode;
  }

  attach(el) {
    this.root = document.createElement("div");
    this.root.className = "-walletlink-snackbar-root";
    el.appendChild(this.root);
    this.render();
  }

  presentItem(itemProps) {
    const key = this.nextItemKey++;
    this.items.set(key, itemProps);
    this.render();
    return () => {
      this.items.delete(key);
      this.render();
    };
  }

  clear() {
    this.items.clear();
    this.render();
  }

  render() {
    if (!this.root) {
      return;
    }

    preact_1.render(preact_1.h("div", null, preact_1.h(SnackbarContainer, {
      darkMode: this.darkMode
    }, Array.from(this.items.entries()).map(([key, itemProps]) => preact_1.h(SnackbarInstance, Object.assign({}, itemProps, {
      key: key
    }))))), this.root);
  }

}

exports.Snackbar = Snackbar;

const SnackbarContainer = props => preact_1.h("div", {
  class: clsx_1.default("-walletlink-snackbar-container")
}, preact_1.h("style", null, Snackbar_css_1.default), preact_1.h("div", {
  class: "-walletlink-snackbar"
}, props.children));

const SnackbarInstance = ({
  message,
  menuItems
}) => {
  const [hidden, setHidden] = hooks_1.useState(true);
  const [expanded, setExpanded] = hooks_1.useState(false);
  hooks_1.useEffect(() => {
    const timers = [window.setTimeout(() => {
      setHidden(false);
    }, 1), window.setTimeout(() => {
      setExpanded(true);
    }, 10000)];
    return () => {
      timers.forEach(window.clearTimeout);
    };
  });

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return preact_1.h("div", {
    class: clsx_1.default("-walletlink-snackbar-instance", hidden && "-walletlink-snackbar-instance-hidden", expanded && "-walletlink-snackbar-instance-expanded")
  }, preact_1.h("div", {
    class: "-walletlink-snackbar-instance-header",
    onClick: toggleExpanded
  }, preact_1.h("img", {
    src: cblogo,
    class: "-walletlink-snackbar-instance-header-cblogo"
  }), preact_1.h("div", {
    class: "-walletlink-snackbar-instance-header-message"
  }, message), preact_1.h("div", {
    class: "-gear-container"
  }, !expanded && preact_1.h("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, preact_1.h("circle", {
    cx: "12",
    cy: "12",
    r: "12",
    fill: "#F5F7F8"
  })), preact_1.h("img", {
    src: gearIcon,
    class: "-gear-icon",
    title: "Expand"
  }))), menuItems && menuItems.length > 0 && preact_1.h("div", {
    class: "-walletlink-snackbar-instance-menu"
  }, menuItems.map((action, i) => preact_1.h("div", {
    class: clsx_1.default("-walletlink-snackbar-instance-menu-item", action.isRed && "-walletlink-snackbar-instance-menu-item-is-red"),
    onClick: action.onClick,
    key: i
  }, preact_1.h("svg", {
    width: action.svgWidth,
    height: action.svgHeight,
    viewBox: "0 0 10 11",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, preact_1.h("path", {
    "fill-rule": action.defaultFillRule,
    "clip-rule": action.defaultClipRule,
    d: action.path,
    fill: "#AAAAAA"
  })), preact_1.h("span", {
    class: clsx_1.default("-walletlink-snackbar-instance-menu-item-info", action.isRed && "-walletlink-snackbar-instance-menu-item-info-is-red")
  }, action.info)))));
};

/***/ }),

/***/ "./node_modules/walletlink/dist/components/Spinner-css.js":
/*!****************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/Spinner-css.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `.-walletlink-css-reset .-walletlink-spinner{display:inline-block}.-walletlink-css-reset .-walletlink-spinner svg{display:inline-block;animation:2s linear infinite -walletlink-spinner-svg}.-walletlink-css-reset .-walletlink-spinner svg circle{animation:1.9s ease-in-out infinite both -walletlink-spinner-circle;display:block;fill:transparent;stroke-dasharray:283;stroke-dashoffset:280;stroke-linecap:round;stroke-width:10px;transform-origin:50% 50%}@keyframes -walletlink-spinner-svg{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}@keyframes -walletlink-spinner-circle{0%,25%{stroke-dashoffset:280;transform:rotate(0)}50%,75%{stroke-dashoffset:75;transform:rotate(45deg)}100%{stroke-dashoffset:280;transform:rotate(360deg)}}`;

/***/ }),

/***/ "./node_modules/walletlink/dist/components/Spinner.js":
/*!************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/Spinner.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = void 0;

const preact_1 = __webpack_require__(/*! preact */ "./node_modules/walletlink/node_modules/preact/dist/preact.module.js");

const Spinner_css_1 = __importDefault(__webpack_require__(/*! ./Spinner-css */ "./node_modules/walletlink/dist/components/Spinner-css.js"));

const Spinner = props => {
  var _a;

  const size = (_a = props.size) !== null && _a !== void 0 ? _a : 64;
  const color = props.color || "#000";
  return preact_1.h("div", {
    class: "-walletlink-spinner"
  }, preact_1.h("style", null, Spinner_css_1.default), preact_1.h("svg", {
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      width: size,
      height: size
    }
  }, preact_1.h("circle", {
    style: {
      cx: 50,
      cy: 50,
      r: 45,
      stroke: color
    }
  })));
};

exports.Spinner = Spinner;

/***/ }),

/***/ "./node_modules/walletlink/dist/components/TryExtensionLinkDialog-css.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/TryExtensionLinkDialog-css.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `.-walletlink-css-reset .-walletlink-extension-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-walletlink-css-reset .-walletlink-extension-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);transition:opacity .25s}.-walletlink-css-reset .-walletlink-extension-dialog-backdrop-hidden{opacity:0}.-walletlink-css-reset .-walletlink-extension-dialog-box{display:flex;position:relative;max-width:500px;flex-direction:column;transform:scale(1);transition:opacity .25s,transform .25s}.-walletlink-css-reset .-walletlink-extension-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-walletlink-css-reset .-walletlink-extension-dialog-box-top{display:flex;flex-direction:row;background-color:#fff;border-radius:8px;overflow:hidden;min-height:300px}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-install-region{display:flex;flex-basis:50%;flex-direction:column;justify-content:center;padding:32px}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-install-region button{display:block;border-radius:8px;background-color:#1652f0;color:#fff;width:90%;min-width:fit-content;height:44px;margin-top:16px;font-size:16px;padding-left:16px;padding-right:16px;cursor:pointer;font-weight:500;text-align:center}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-info-region{display:flex;flex-basis:50%;flex-direction:column;justify-content:center;background-color:#fafbfc}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-description{display:flex;flex-direction:row;align-items:center;padding-top:14px;padding-bottom:14px;padding-left:24px;padding-right:32px}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-description-icon-wrapper{display:block;position:relative;width:40px;height:40px;flex-shrink:0;flex-grow:0;border-radius:20px;background-color:#fff;box-shadow:0px 0px 8px rgba(0,0,0,.04),0px 16px 24px rgba(0,0,0,.06)}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-description-icon-wrapper img{position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.-walletlink-css-reset .-walletlink-extension-dialog-box-top-description-text{margin-left:16px;flex-grow:1;font-size:13px;line-height:19px;color:#000;align-self:center}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom{display:flex;flex-direction:row;overflow:hidden;border-radius:8px;background-color:#fff;margin-top:8px}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-description-region{display:flex;flex-direction:column;justify-content:center;padding:32px;flex-grow:1}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-description{font-size:13px;line-height:19px;margin-top:12px;color:#aaa}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-description a{font-size:inherit;line-height:inherit;color:#1652f0;cursor:pointer}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-qr-region{position:relative;flex-shrink:0;display:flex;flex-direction:column;justify-content:center;padding-left:24px;padding-right:24px;padding-top:16px;padding-bottom:16px}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-qr-wrapper{position:relative;display:block;padding:8px;border-radius:8px;box-shadow:0px 4px 12px rgba(0,0,0,.1)}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-qr-wrapper img{display:block}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-qr-connecting{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:rgba(255,255,255,.95)}.-walletlink-css-reset .-walletlink-extension-dialog-box-bottom-qr-connecting>p{font-size:12px;font-weight:bold;color:#000;margin-top:16px}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel{position:absolute;-webkit-appearance:none;display:flex;align-items:center;justify-content:center;top:16px;right:16px;width:24px;height:24px;border-radius:12px;background-color:#fafbfc;cursor:pointer}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel-x{position:relative;display:block;cursor:pointer}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel-x::before,.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel-x::after{content:"";position:absolute;display:block;top:-1px;left:-7px;width:14px;height:1px;background-color:#000;transition:background-color .2s}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel-x::before{transform:rotate(45deg)}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel-x::after{transform:rotate(135deg)}.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x-a,.-walletlink-css-reset .-walletlink-extension-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x-b{background-color:#000}.-walletlink-css-reset .-walletlink-extension-dialog-container{display:block}.-walletlink-css-reset .-walletlink-extension-dialog-container-hidden{display:none}.-walletlink-css-reset .-walletlink-extension-dialog h2{display:block;text-align:left;font-size:22px;font-weight:600;line-height:28px;color:#000}`;

/***/ }),

/***/ "./node_modules/walletlink/dist/components/TryExtensionLinkDialog.js":
/*!***************************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/TryExtensionLinkDialog.js ***!
  \***************************************************************************/
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
exports.TryExtensionLinkDialog = void 0;

const clsx_1 = __importDefault(__webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js"));

const TryExtensionLinkDialog_css_1 = __importDefault(__webpack_require__(/*! ./TryExtensionLinkDialog-css */ "./node_modules/walletlink/dist/components/TryExtensionLinkDialog-css.js"));

const link_icon_svg_1 = __importDefault(__webpack_require__(/*! ./icons/link-icon-svg */ "./node_modules/walletlink/dist/components/icons/link-icon-svg.js"));

const globe_icon_svg_1 = __importDefault(__webpack_require__(/*! ./icons/globe-icon-svg */ "./node_modules/walletlink/dist/components/icons/globe-icon-svg.js"));

const lock_icon_svg_1 = __importDefault(__webpack_require__(/*! ./icons/lock-icon-svg */ "./node_modules/walletlink/dist/components/icons/lock-icon-svg.js"));

const QRLogo_1 = __importDefault(__webpack_require__(/*! ./icons/QRLogo */ "./node_modules/walletlink/dist/components/icons/QRLogo.js"));

const preact_1 = __webpack_require__(/*! preact */ "./node_modules/walletlink/node_modules/preact/dist/preact.module.js");

const hooks_1 = __webpack_require__(/*! preact/hooks */ "./node_modules/walletlink/node_modules/preact/hooks/dist/hooks.module.js");

const QRCode_1 = __webpack_require__(/*! ./QRCode */ "./node_modules/walletlink/dist/components/QRCode.js");

const Spinner_1 = __webpack_require__(/*! ./Spinner */ "./node_modules/walletlink/dist/components/Spinner.js");

const TryExtensionLinkDialog = props => {
  const [isContainerHidden, setContainerHidden] = hooks_1.useState(!props.isOpen);
  const [isDialogHidden, setDialogHidden] = hooks_1.useState(!props.isOpen);
  hooks_1.useEffect(() => {
    const {
      isOpen
    } = props;
    const timers = [window.setTimeout(() => {
      setDialogHidden(!isOpen);
    }, 10)];

    if (isOpen) {
      setContainerHidden(false);
    } else {
      timers.push(window.setTimeout(() => {
        setContainerHidden(true);
      }, 360));
    }

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, [props.isOpen]);
  return preact_1.h("div", {
    class: clsx_1.default("-walletlink-extension-dialog-container", isContainerHidden && "-walletlink-extension-dialog-container-hidden")
  }, preact_1.h("style", null, TryExtensionLinkDialog_css_1.default), preact_1.h("div", {
    class: clsx_1.default("-walletlink-extension-dialog-backdrop", isDialogHidden && "-walletlink-extension-dialog-backdrop-hidden")
  }), preact_1.h("div", {
    class: "-walletlink-extension-dialog"
  }, preact_1.h("div", {
    class: clsx_1.default("-walletlink-extension-dialog-box", isDialogHidden && "-walletlink-extension-dialog-box-hidden")
  }, preact_1.h(TryExtensionBox, {
    onInstallClick: () => {
      window.open("https://api.wallet.coinbase.com/rpc/v2/desktop/chrome", "_blank");
    }
  }), !props.connectDisabled ? preact_1.h(ScanQRBox, {
    darkMode: props.darkMode,
    version: props.version,
    sessionId: props.sessionId,
    sessionSecret: props.sessionSecret,
    walletLinkUrl: props.walletLinkUrl,
    isConnected: props.isConnected,
    isParentConnection: props.isParentConnection
  }) : null, props.onCancel && preact_1.h(CancelButton, {
    onClick: props.onCancel
  }))));
};

exports.TryExtensionLinkDialog = TryExtensionLinkDialog;

const TryExtensionBox = props => {
  return preact_1.h("div", {
    class: "-walletlink-extension-dialog-box-top"
  }, preact_1.h("div", {
    class: "-walletlink-extension-dialog-box-top-install-region"
  }, preact_1.h("h2", null, "Try Coinbase Wallet extension"), preact_1.h("button", {
    onClick: props.onInstallClick
  }, "Install")), preact_1.h("div", {
    class: "-walletlink-extension-dialog-box-top-info-region"
  }, preact_1.h(DescriptionItem, {
    icon: link_icon_svg_1.default,
    text: "Connect to crypto apps with one click"
  }), preact_1.h(DescriptionItem, {
    icon: lock_icon_svg_1.default,
    text: "Private keys remain secure on mobile app"
  }), preact_1.h(DescriptionItem, {
    icon: globe_icon_svg_1.default,
    text: "Compatible with all crypto apps"
  })));
};

const ScanQRBox = props => {
  const serverUrl = window.encodeURIComponent(props.walletLinkUrl);
  const sessionIdKey = props.isParentConnection ? "parent-id" : "id";
  const qrUrl = `${props.walletLinkUrl}/#/link?${sessionIdKey}=${props.sessionId}&secret=${props.sessionSecret}&server=${serverUrl}&v=1`;
  return preact_1.h("div", {
    class: "-walletlink-extension-dialog-box-bottom"
  }, preact_1.h("div", {
    class: "-walletlink-extension-dialog-box-bottom-description-region"
  }, preact_1.h("h2", null, "Or scan to connect"), preact_1.h("body", {
    class: "-walletlink-extension-dialog-box-bottom-description"
  }, "Open ", preact_1.h("a", {
    href: "https://wallet.coinbase.com/"
  }, "Coinbase Wallet"), " on your mobile phone and scan")), preact_1.h("div", {
    class: "-walletlink-extension-dialog-box-bottom-qr-region"
  }, preact_1.h("div", {
    class: "-walletlink-extension-dialog-box-bottom-qr-wrapper"
  }, preact_1.h(QRCode_1.QRCode, {
    content: qrUrl,
    width: 150,
    height: 150,
    fgColor: "#000",
    bgColor: "transparent",
    image: {
      svg: QRLogo_1.default,
      width: 34,
      height: 34
    }
  })), preact_1.h("input", {
    type: "hidden",
    value: qrUrl
  }), !props.isConnected && preact_1.h("div", {
    class: "-walletlink-extension-dialog-box-bottom-qr-connecting"
  }, preact_1.h(Spinner_1.Spinner, {
    size: 36,
    color: "#000"
  }), preact_1.h("p", null, "Connecting..."))));
};

const DescriptionItem = props => {
  return preact_1.h("div", {
    class: "-walletlink-extension-dialog-box-top-description"
  }, preact_1.h("div", {
    class: "-walletlink-extension-dialog-box-top-description-icon-wrapper"
  }, preact_1.h("img", {
    src: props.icon
  })), preact_1.h("body", {
    class: "-walletlink-extension-dialog-box-top-description-text"
  }, props.text));
};

const CancelButton = props => preact_1.h("button", {
  class: "-walletlink-extension-dialog-box-cancel",
  onClick: props.onClick
}, preact_1.h("div", {
  class: "-walletlink-extension-dialog-box-cancel-x"
}));

/***/ }),

/***/ "./node_modules/walletlink/dist/components/icons/QRLogo.js":
/*!*****************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/icons/QRLogo.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="50" cy="50" r="50" fill="white"/>
<circle cx="49.9996" cy="49.9996" r="43.6363" fill="#1B53E4"/>
<circle cx="49.9996" cy="49.9996" r="43.6363" stroke="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.3379 49.9484C19.3379 66.8508 33.04 80.553 49.9425 80.553C66.8449 80.553 80.5471 66.8508 80.5471 49.9484C80.5471 33.0459 66.8449 19.3438 49.9425 19.3438C33.04 19.3438 19.3379 33.0459 19.3379 49.9484ZM44.0817 40.0799C41.8725 40.0799 40.0817 41.8708 40.0817 44.0799V55.8029C40.0817 58.012 41.8725 59.8029 44.0817 59.8029H55.8046C58.0138 59.8029 59.8046 58.012 59.8046 55.8029V44.0799C59.8046 41.8708 58.0138 40.0799 55.8046 40.0799H44.0817Z" fill="white"/>
</svg>

`;

/***/ }),

/***/ "./node_modules/walletlink/dist/components/icons/globe-icon-svg.js":
/*!*************************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/icons/globe-icon-svg.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggMEMzLjU4IDAgMCAzLjU4IDAgOHMzLjU4IDggOCA4IDgtMy41OCA4LTgtMy41OC04LTgtOHptNS45MSA3aC0xLjk0Yy0uMS0xLjU3LS40Mi0zLS45MS00LjE1IDEuNDguODggMi41NSAyLjM4IDIuODUgNC4xNXpNOCAxNGMtLjQ1IDAtMS43Mi0xLjc3LTEuOTUtNWgzLjljLS4yMyAzLjIzLTEuNSA1LTEuOTUgNXpNNi4wNSA3QzYuMjggMy43NyA3LjU1IDIgOCAyYy40NSAwIDEuNzIgMS43NyAxLjk1IDVoLTMuOXpNNC45NCAyLjg1QzQuNDYgNCA0LjEzIDUuNDMgNC4wMyA3SDIuMDljLjMtMS43NyAxLjM3LTMuMjcgMi44NS00LjE1ek0yLjA5IDloMS45NGMuMSAxLjU3LjQyIDMgLjkxIDQuMTVBNS45OTggNS45OTggMCAwMTIuMDkgOXptOC45NyA0LjE1Yy40OC0xLjE1LjgxLTIuNTguOTEtNC4xNWgxLjk0YTUuOTk4IDUuOTk4IDAgMDEtMi44NSA0LjE1eiIgZmlsbD0iIzE2NTJGMCIvPjwvc3ZnPg==`;

/***/ }),

/***/ "./node_modules/walletlink/dist/components/icons/link-icon-svg.js":
/*!************************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/icons/link-icon-svg.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1LjYzNSAyLjExN2EzLjg4OSAzLjg4OSAwIDAwLTUuNTIxIDBMNi44OSA1LjMzNWEzLjg5NCAzLjg5NCAwIDAwLTEuMDkgMy40MDRjLjA4My41MDYuMjY4IDEuMDExLjU1MyAxLjQ2Ni4xNTEuMjUzLjMzNi40NzIuNTM3LjY5MWwuNjIxLjYyNCAxLjE0MS0xLjE0Ni0uNjItLjYyNGEyLjEwNSAyLjEwNSAwIDAxLS40ODctLjc0MSAyLjM0IDIuMzQgMCAwMS41MDMtMi41MWwzLjIwNi0zLjIyYTIuMjkzIDIuMjkzIDAgMDEzLjIzOSAwYy44OS44OTQuODkgMi4zNDMgMCAzLjI1M2wtMS41MjcgMS41MzNjLjIzNC42NC4zMzUgMS4zMzEuMzAyIDIuMDA1bDIuMzgzLTIuMzkyYzEuNTEtMS41MzQgMS40OTMtNC4wMjgtLjAxNy01LjU2MXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBkPSJNMTEuMjcxIDcuNzQ1YTMuMTMgMy4xMyAwIDAwLS41NTQtLjY5bC0uNjItLjYyNC0xLjE0MiAxLjE0Ni42MjEuNjIzYy4yMTguMjIuMzg2LjQ4OS40ODcuNzU4LjMzNS44MjYuMTY3IDEuODItLjUwNCAyLjQ5NGwtMy4yMDUgMy4yMTlhMi4yOTMgMi4yOTMgMCAwMS0zLjI0IDAgMi4zMTYgMi4zMTYgMCAwMTAtMy4yNTJsMS41MjgtMS41MzRhNC44MTUgNC44MTUgMCAwMS0uMjg1LTIuMDA1bC0yLjM4MyAyLjM5M2EzLjkyNyAzLjkyNyAwIDAwMCA1LjU0NCAzLjkwOSAzLjkwOSAwIDAwNS41MzggMGwzLjIwNS0zLjIxOWEzLjk1OCAzLjk1OCAwIDAwMS4wOTEtMy40MDQgNC4yMTEgNC4yMTEgMCAwMC0uNTM3LTEuNDQ5eiIgZmlsbD0iIzE2NTJGMCIvPjwvc3ZnPg==`;

/***/ }),

/***/ "./node_modules/walletlink/dist/components/icons/lock-icon-svg.js":
/*!************************************************************************!*\
  !*** ./node_modules/walletlink/dist/components/icons/lock-icon-svg.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgN3Y5aDE0VjdIMXptNy41IDQuMzlWMTRoLTF2LTIuNjFjLS40NC0uMTktLjc1LS42My0uNzUtMS4xNGExLjI1IDEuMjUgMCAwMTIuNSAwYzAgLjUxLS4zMS45NS0uNzUgMS4xNHpNNS42NyA2VjQuMzNDNS42NyAzLjA1IDYuNzEgMiA4IDJzMi4zMyAxLjA1IDIuMzMgMi4zM1Y2aDJWNC4zM0MxMi4zMyAxLjk0IDEwLjM5IDAgOCAwUzMuNjcgMS45NCAzLjY3IDQuMzNWNmgyeiIgZmlsbD0iIzE2NTJGMCIvPjwvc3ZnPg==`;

/***/ }),

/***/ "./node_modules/walletlink/dist/connection/ClientMessage.js":
/*!******************************************************************!*\
  !*** ./node_modules/walletlink/dist/connection/ClientMessage.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientMessagePublishEvent = exports.ClientMessageSetSessionConfig = exports.ClientMessageGetSessionConfig = exports.ClientMessageIsLinked = exports.ClientMessageHostSession = void 0;

function ClientMessageHostSession(params) {
  return Object.assign({
    type: "HostSession"
  }, params);
}

exports.ClientMessageHostSession = ClientMessageHostSession;

function ClientMessageIsLinked(params) {
  return Object.assign({
    type: "IsLinked"
  }, params);
}

exports.ClientMessageIsLinked = ClientMessageIsLinked;

function ClientMessageGetSessionConfig(params) {
  return Object.assign({
    type: "GetSessionConfig"
  }, params);
}

exports.ClientMessageGetSessionConfig = ClientMessageGetSessionConfig;

function ClientMessageSetSessionConfig(params) {
  return Object.assign({
    type: "SetSessionConfig"
  }, params);
}

exports.ClientMessageSetSessionConfig = ClientMessageSetSessionConfig;

function ClientMessagePublishEvent(params) {
  return Object.assign({
    type: "PublishEvent"
  }, params);
}

exports.ClientMessagePublishEvent = ClientMessagePublishEvent;

/***/ }),

/***/ "./node_modules/walletlink/dist/connection/RxWebSocket.js":
/*!****************************************************************!*\
  !*** ./node_modules/walletlink/dist/connection/RxWebSocket.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RxWebSocket = exports.ConnectionState = void 0;

const rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

const operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

var ConnectionState;

(function (ConnectionState) {
  ConnectionState[ConnectionState["DISCONNECTED"] = 0] = "DISCONNECTED";
  ConnectionState[ConnectionState["CONNECTING"] = 1] = "CONNECTING";
  ConnectionState[ConnectionState["CONNECTED"] = 2] = "CONNECTED";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
/**
 * Rx-ified WebSocket
 */


class RxWebSocket {
  /**
   * Constructor
   * @param url WebSocket server URL
   * @param [WebSocketClass] Custom WebSocket implementation
   */
  constructor(url, WebSocketClass = WebSocket) {
    this.WebSocketClass = WebSocketClass;
    this.webSocket = null;
    this.connectionStateSubject = new rxjs_1.BehaviorSubject(ConnectionState.DISCONNECTED);
    this.incomingDataSubject = new rxjs_1.Subject();
    this.url = url.replace(/^http/, "ws");
  }
  /**
   * Make a websocket connection
   * @returns an Observable that completes when connected
   */


  connect() {
    if (this.webSocket) {
      return rxjs_1.throwError(new Error("webSocket object is not null"));
    }

    return new rxjs_1.Observable(obs => {
      let webSocket;

      try {
        this.webSocket = webSocket = new this.WebSocketClass(this.url);
      } catch (err) {
        obs.error(err);
        return;
      }

      this.connectionStateSubject.next(ConnectionState.CONNECTING);

      webSocket.onclose = evt => {
        this.clearWebSocket();
        obs.error(new Error(`websocket error ${evt.code}: ${evt.reason}`));
        this.connectionStateSubject.next(ConnectionState.DISCONNECTED);
      };

      webSocket.onopen = _ => {
        obs.next();
        obs.complete();
        this.connectionStateSubject.next(ConnectionState.CONNECTED);
      };

      webSocket.onmessage = evt => {
        this.incomingDataSubject.next(evt.data);
      };
    }).pipe(operators_1.take(1));
  }
  /**
   * Disconnect from server
   */


  disconnect() {
    const {
      webSocket
    } = this;

    if (!webSocket) {
      return;
    }

    this.clearWebSocket();
    this.connectionStateSubject.next(ConnectionState.DISCONNECTED);

    try {
      webSocket.close();
    } catch (_a) {}
  }
  /**
   * Emit current connection state and subsequent changes
   * @returns an Observable for the connection state
   */


  get connectionState$() {
    return this.connectionStateSubject.asObservable();
  }
  /**
   * Emit incoming data from server
   * @returns an Observable for the data received
   */


  get incomingData$() {
    return this.incomingDataSubject.asObservable();
  }
  /**
   * Emit incoming JSON data from server. non-JSON data are ignored
   * @returns an Observable for parsed JSON data
   */


  get incomingJSONData$() {
    return this.incomingData$.pipe(operators_1.flatMap(m => {
      let j;

      try {
        j = JSON.parse(m);
      } catch (err) {
        return rxjs_1.empty();
      }

      return rxjs_1.of(j);
    }));
  }
  /**
   * Send data to server
   * @param data text to send
   */


  sendData(data) {
    const {
      webSocket
    } = this;

    if (!webSocket) {
      throw new Error("websocket is not connected");
    }

    webSocket.send(data);
  }

  clearWebSocket() {
    const {
      webSocket
    } = this;

    if (!webSocket) {
      return;
    }

    this.webSocket = null;
    webSocket.onclose = null;
    webSocket.onerror = null;
    webSocket.onmessage = null;
    webSocket.onopen = null;
  }

}

exports.RxWebSocket = RxWebSocket;

/***/ }),

/***/ "./node_modules/walletlink/dist/connection/ServerMessage.js":
/*!******************************************************************!*\
  !*** ./node_modules/walletlink/dist/connection/ServerMessage.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isServerMessageFail = void 0;

function isServerMessageFail(msg) {
  return msg && msg.type === "Fail" && typeof msg.id === "number" && typeof msg.sessionId === "string" && typeof msg.error === "string";
}

exports.isServerMessageFail = isServerMessageFail;

/***/ }),

/***/ "./node_modules/walletlink/dist/connection/WalletLinkConnection.js":
/*!*************************************************************************!*\
  !*** ./node_modules/walletlink/dist/connection/WalletLinkConnection.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkConnection = void 0;

const rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

const operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

const types_1 = __webpack_require__(/*! ../types */ "./node_modules/walletlink/dist/types.js");

const ClientMessage_1 = __webpack_require__(/*! ./ClientMessage */ "./node_modules/walletlink/dist/connection/ClientMessage.js");

const RxWebSocket_1 = __webpack_require__(/*! ./RxWebSocket */ "./node_modules/walletlink/dist/connection/RxWebSocket.js");

const ServerMessage_1 = __webpack_require__(/*! ./ServerMessage */ "./node_modules/walletlink/dist/connection/ServerMessage.js");

const HEARTBEAT_INTERVAL = 10000;
const REQUEST_TIMEOUT = 60000;
/**
 * WalletLink Connection
 */

class WalletLinkConnection {
  /**
   * Constructor
   * @param sessionId Session ID
   * @param sessionKey Session Key
   * @param serverUrl Walletlinkd RPC URL
   * @param [WebSocketClass] Custom WebSocket implementation
   */
  constructor(sessionId, sessionKey, serverUrl, WebSocketClass = WebSocket) {
    this.sessionId = sessionId;
    this.sessionKey = sessionKey;
    this.subscriptions = new rxjs_1.Subscription();
    this.destroyed = false;
    this.lastHeartbeatResponse = 0;
    this.nextReqId = types_1.IntNumber(1);
    this.connectedSubject = new rxjs_1.BehaviorSubject(false);
    this.linkedSubject = new rxjs_1.BehaviorSubject(false);
    this.sessionConfigSubject = new rxjs_1.ReplaySubject(1);
    const ws = new RxWebSocket_1.RxWebSocket(serverUrl + "/rpc", WebSocketClass);
    this.ws = ws; // attempt to reconnect every 5 seconds when disconnected

    this.subscriptions.add(ws.connectionState$.pipe( // ignore initial DISCONNECTED state
    operators_1.skip(1), // if DISCONNECTED and not destroyed
    operators_1.filter(cs => cs === RxWebSocket_1.ConnectionState.DISCONNECTED && !this.destroyed), // wait 5 seconds
    operators_1.delay(5000), // check whether it's destroyed again
    operators_1.filter(_ => !this.destroyed), // reconnect
    operators_1.flatMap(_ => ws.connect()), operators_1.retry()).subscribe()); // perform authentication upon connection

    this.subscriptions.add(ws.connectionState$.pipe( // ignore initial DISCONNECTED and CONNECTING states
    operators_1.skip(2), operators_1.switchMap(cs => rxjs_1.iif(() => cs === RxWebSocket_1.ConnectionState.CONNECTED, // if CONNECTED, authenticate, and then check link status
    this.authenticate().pipe(operators_1.tap(_ => this.sendIsLinked()), operators_1.tap(_ => this.sendGetSessionConfig()), operators_1.map(_ => true)), // if not CONNECTED, emit false immediately
    rxjs_1.of(false))), operators_1.distinctUntilChanged(), operators_1.catchError(_ => rxjs_1.of(false))).subscribe(connected => this.connectedSubject.next(connected))); // send heartbeat every n seconds while connected

    this.subscriptions.add(ws.connectionState$.pipe( // ignore initial DISCONNECTED state
    operators_1.skip(1), operators_1.switchMap(cs => rxjs_1.iif(() => cs === RxWebSocket_1.ConnectionState.CONNECTED, // if CONNECTED, start the heartbeat timer
    rxjs_1.timer(0, HEARTBEAT_INTERVAL)))).subscribe(i => // first timer event updates lastHeartbeat timestamp
    // subsequent calls send heartbeat message
    i === 0 ? this.updateLastHeartbeat() : this.heartbeat())); // handle server's heartbeat responses

    this.subscriptions.add(ws.incomingData$.pipe(operators_1.filter(m => m === "h")).subscribe(_ => this.updateLastHeartbeat())); // handle link status updates

    this.subscriptions.add(ws.incomingJSONData$.pipe(operators_1.filter(m => ["IsLinkedOK", "Linked"].includes(m.type))).subscribe(m => {
      const msg = m;
      this.linkedSubject.next(msg.linked || msg.onlineGuests > 0);
    })); // handle session config updates

    this.subscriptions.add(ws.incomingJSONData$.pipe(operators_1.filter(m => ["GetSessionConfigOK", "SessionConfigUpdated"].includes(m.type))).subscribe(m => {
      const msg = m;
      this.sessionConfigSubject.next({
        webhookId: msg.webhookId,
        webhookUrl: msg.webhookUrl,
        metadata: msg.metadata
      });
    }));
  }
  /**
   * Make a connection to the server
   */


  connect() {
    if (this.destroyed) {
      throw new Error("instance is destroyed");
    }

    this.ws.connect().subscribe();
  }
  /**
   * Terminate connection, and mark as destroyed. To reconnect, create a new
   * instance of WalletLinkConnection
   */


  destroy() {
    this.subscriptions.unsubscribe();
    this.ws.disconnect();
    this.destroyed = true;
  }
  /**
   * Emit true if connected and authenticated, else false
   * @returns an Observable
   */


  get connected$() {
    return this.connectedSubject.asObservable();
  }
  /**
   * Emit once connected
   * @returns an Observable
   */


  get onceConnected$() {
    return this.connected$.pipe(operators_1.filter(v => v), operators_1.take(1), operators_1.map(() => void 0));
  }
  /**
   * Emit true if linked (a guest has joined before)
   * @returns an Observable
   */


  get linked$() {
    return this.linkedSubject.asObservable();
  }
  /**
   * Emit once when linked
   * @returns an Observable
   */


  get onceLinked$() {
    return this.linked$.pipe(operators_1.filter(v => v), operators_1.take(1), operators_1.map(() => void 0));
  }
  /**
   * Emit current session config if available, and subsequent updates
   * @returns an Observable for the session config
   */


  get sessionConfig$() {
    return this.sessionConfigSubject.asObservable();
  }
  /**
   * Emit incoming Event messages
   * @returns an Observable for the messages
   */


  get incomingEvent$() {
    return this.ws.incomingJSONData$.pipe(operators_1.filter(m => {
      if (m.type !== "Event") {
        return false;
      }

      const sme = m;
      return typeof sme.sessionId === "string" && typeof sme.eventId === "string" && typeof sme.event === "string" && typeof sme.data === "string";
    }), operators_1.map(m => m));
  }
  /**
   * Set session metadata in SessionConfig object
   * @param key
   * @param value
   * @returns an Observable that completes when successful
   */


  setSessionMetadata(key, value) {
    const message = ClientMessage_1.ClientMessageSetSessionConfig({
      id: types_1.IntNumber(this.nextReqId++),
      sessionId: this.sessionId,
      metadata: {
        [key]: value
      }
    });
    return this.onceConnected$.pipe(operators_1.flatMap(_ => this.makeRequest(message)), operators_1.map(res => {
      if (ServerMessage_1.isServerMessageFail(res)) {
        throw new Error(res.error || "failed to set session metadata");
      }
    }));
  }
  /**
   * Publish an event and emit event ID when successful
   * @param event event name
   * @param data event data
   * @param callWebhook whether the webhook should be invoked
   * @returns an Observable that emits event ID when successful
   */


  publishEvent(event, data, callWebhook = false) {
    const message = ClientMessage_1.ClientMessagePublishEvent({
      id: types_1.IntNumber(this.nextReqId++),
      sessionId: this.sessionId,
      event,
      data,
      callWebhook
    });
    return this.onceLinked$.pipe(operators_1.flatMap(_ => this.makeRequest(message)), operators_1.map(res => {
      if (ServerMessage_1.isServerMessageFail(res)) {
        throw new Error(res.error || "failed to publish event");
      }

      return res.eventId;
    }));
  }

  sendData(message) {
    this.ws.sendData(JSON.stringify(message));
  }

  updateLastHeartbeat() {
    this.lastHeartbeatResponse = Date.now();
  }

  heartbeat() {
    if (Date.now() - this.lastHeartbeatResponse > HEARTBEAT_INTERVAL * 2) {
      this.ws.disconnect();
      return;
    }

    try {
      this.ws.sendData("h");
    } catch (_a) {}
  }

  makeRequest(message, timeout = REQUEST_TIMEOUT) {
    const reqId = message.id;

    try {
      this.sendData(message);
    } catch (err) {
      return rxjs_1.throwError(err);
    } // await server message with corresponding id


    return this.ws.incomingJSONData$.pipe(operators_1.timeoutWith(timeout, rxjs_1.throwError(new Error(`request ${reqId} timed out`))), operators_1.filter(m => m.id === reqId), operators_1.take(1));
  }

  authenticate() {
    const msg = ClientMessage_1.ClientMessageHostSession({
      id: types_1.IntNumber(this.nextReqId++),
      sessionId: this.sessionId,
      sessionKey: this.sessionKey
    });
    return this.makeRequest(msg).pipe(operators_1.map(res => {
      if (ServerMessage_1.isServerMessageFail(res)) {
        throw new Error(res.error || "failed to authentcate");
      }
    }));
  }

  sendIsLinked() {
    const msg = ClientMessage_1.ClientMessageIsLinked({
      id: types_1.IntNumber(this.nextReqId++),
      sessionId: this.sessionId
    });
    this.sendData(msg);
  }

  sendGetSessionConfig() {
    const msg = ClientMessage_1.ClientMessageGetSessionConfig({
      id: types_1.IntNumber(this.nextReqId++),
      sessionId: this.sessionId
    });
    this.sendData(msg);
  }

}

exports.WalletLinkConnection = WalletLinkConnection;

/***/ }),

/***/ "./node_modules/walletlink/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/walletlink/dist/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLink = exports.WalletLinkProvider = void 0;

const WalletLinkProvider_1 = __webpack_require__(/*! ./provider/WalletLinkProvider */ "./node_modules/walletlink/dist/provider/WalletLinkProvider.js");

const WalletLink_1 = __webpack_require__(/*! ./WalletLink */ "./node_modules/walletlink/dist/WalletLink.js");

var WalletLinkProvider_2 = __webpack_require__(/*! ./provider/WalletLinkProvider */ "./node_modules/walletlink/dist/provider/WalletLinkProvider.js");

Object.defineProperty(exports, "WalletLinkProvider", {
  enumerable: true,
  get: function () {
    return WalletLinkProvider_2.WalletLinkProvider;
  }
});

var WalletLink_2 = __webpack_require__(/*! ./WalletLink */ "./node_modules/walletlink/dist/WalletLink.js");

Object.defineProperty(exports, "WalletLink", {
  enumerable: true,
  get: function () {
    return WalletLink_2.WalletLink;
  }
});
exports.default = WalletLink_1.WalletLink;

if (typeof window !== "undefined") {
  window.WalletLink = WalletLink_1.WalletLink;
  window.WalletLinkProvider = WalletLinkProvider_1.WalletLinkProvider;
}

/***/ }),

/***/ "./node_modules/walletlink/dist/lib/ScopedLocalStorage.js":
/*!****************************************************************!*\
  !*** ./node_modules/walletlink/dist/lib/ScopedLocalStorage.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopedLocalStorage = void 0;

class ScopedLocalStorage {
  constructor(scope) {
    this.scope = scope;
  }

  setItem(key, value) {
    localStorage.setItem(this.scopedKey(key), value);
  }

  getItem(key) {
    return localStorage.getItem(this.scopedKey(key));
  }

  removeItem(key) {
    localStorage.removeItem(this.scopedKey(key));
  }

  clear() {
    const prefix = this.scopedKey("");
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (typeof key === "string" && key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
  }

  scopedKey(key) {
    return `${this.scope}:${key}`;
  }

}

exports.ScopedLocalStorage = ScopedLocalStorage;

/***/ }),

/***/ "./node_modules/walletlink/dist/lib/cssReset-css.js":
/*!**********************************************************!*\
  !*** ./node_modules/walletlink/dist/lib/cssReset-css.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `@namespace svg "http://www.w3.org/2000/svg";.-walletlink-css-reset,.-walletlink-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:transparent;background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;bottom:auto;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;content:normal;counter-increment:none;counter-reset:none;cursor:auto;direction:ltr;display:block;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;left:auto;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;max-height:none;max-width:none;min-height:0;min-width:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";right:auto;tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;top:auto;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;width:auto;word-spacing:normal;z-index:auto}.-walletlink-css-reset *{box-sizing:border-box;display:initial;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-walletlink-css-reset [class*=container]{margin:0;padding:0}.-walletlink-css-reset style{display:none}`;

/***/ }),

/***/ "./node_modules/walletlink/dist/lib/cssReset.js":
/*!******************************************************!*\
  !*** ./node_modules/walletlink/dist/lib/cssReset.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectCssReset = void 0;

const cssReset_css_1 = __importDefault(__webpack_require__(/*! ./cssReset-css */ "./node_modules/walletlink/dist/lib/cssReset-css.js"));

function injectCssReset() {
  const styleEl = document.createElement("style");
  styleEl.type = "text/css";
  styleEl.appendChild(document.createTextNode(cssReset_css_1.default));
  document.documentElement.appendChild(styleEl);
}

exports.injectCssReset = injectCssReset;

/***/ }),

/***/ "./node_modules/walletlink/dist/provider/FilterPolyfill.js":
/*!*****************************************************************!*\
  !*** ./node_modules/walletlink/dist/provider/FilterPolyfill.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterFromParam = exports.FilterPolyfill = void 0;

const types_1 = __webpack_require__(/*! ../types */ "./node_modules/walletlink/dist/types.js");

const util_1 = __webpack_require__(/*! ../util */ "./node_modules/walletlink/dist/util.js");

const TIMEOUT = 5 * 60 * 1000; // 5 minutes

const JSONRPC_TEMPLATE = {
  jsonrpc: "2.0",
  id: 0
};

class FilterPolyfill {
  constructor(provider) {
    this.logFilters = new Map(); // <id, filter>

    this.blockFilters = new Set(); // <id>

    this.pendingTransactionFilters = new Set(); // <id, true>

    this.cursors = new Map(); // <id, cursor>

    this.timeouts = new Map(); // <id, setTimeout id>

    this.nextFilterId = types_1.IntNumber(1);
    this.provider = provider;
  }

  async newFilter(param) {
    const filter = filterFromParam(param);
    const id = this.makeFilterId();
    const cursor = await this.setInitialCursorPosition(id, filter.fromBlock);
    console.log(`Installing new log filter(${id}):`, filter, "initial cursor position:", cursor);
    this.logFilters.set(id, filter);
    this.setFilterTimeout(id);
    return util_1.hexStringFromIntNumber(id);
  }

  async newBlockFilter() {
    const id = this.makeFilterId();
    const cursor = await this.setInitialCursorPosition(id, "latest");
    console.log(`Installing new block filter (${id}) with initial cursor position:`, cursor);
    this.blockFilters.add(id);
    this.setFilterTimeout(id);
    return util_1.hexStringFromIntNumber(id);
  }

  async newPendingTransactionFilter() {
    const id = this.makeFilterId();
    const cursor = await this.setInitialCursorPosition(id, "latest");
    console.log(`Installing new block filter (${id}) with initial cursor position:`, cursor);
    this.pendingTransactionFilters.add(id);
    this.setFilterTimeout(id);
    return util_1.hexStringFromIntNumber(id);
  }

  uninstallFilter(filterId) {
    const id = util_1.intNumberFromHexString(filterId);
    console.log(`Uninstalling filter (${id})`);
    this.deleteFilter(id);
    return true;
  }

  getFilterChanges(filterId) {
    const id = util_1.intNumberFromHexString(filterId);

    if (this.timeouts.has(id)) {
      // extend timeout
      this.setFilterTimeout(id);
    }

    if (this.logFilters.has(id)) {
      return this.getLogFilterChanges(id);
    } else if (this.blockFilters.has(id)) {
      return this.getBlockFilterChanges(id);
    } else if (this.pendingTransactionFilters.has(id)) {
      return this.getPendingTransactionFilterChanges(id);
    }

    return Promise.resolve(filterNotFoundError());
  }

  async getFilterLogs(filterId) {
    const id = util_1.intNumberFromHexString(filterId);
    const filter = this.logFilters.get(id);

    if (!filter) {
      return filterNotFoundError();
    }

    return this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
      method: "eth_getLogs",
      params: [paramFromFilter(filter)]
    }));
  }

  makeFilterId() {
    return types_1.IntNumber(++this.nextFilterId);
  }

  sendAsyncPromise(request) {
    return new Promise((resolve, reject) => {
      this.provider.sendAsync(request, (err, response) => {
        if (err) {
          return reject(err);
        }

        if (Array.isArray(response) || response == null) {
          return reject(new Error(`unexpected response received: ${JSON.stringify(response)}`));
        }

        resolve(response);
      });
    });
  }

  deleteFilter(id) {
    console.log(`Deleting filter (${id})`);
    this.logFilters.delete(id);
    this.blockFilters.delete(id);
    this.pendingTransactionFilters.delete(id);
    this.cursors.delete(id);
    this.timeouts.delete(id);
  }

  async getLogFilterChanges(id) {
    const filter = this.logFilters.get(id);
    const cursorPosition = this.cursors.get(id);

    if (!cursorPosition || !filter) {
      return filterNotFoundError();
    }

    const currentBlockHeight = await this.getCurrentBlockHeight();
    const toBlock = filter.toBlock === "latest" ? currentBlockHeight : filter.toBlock;

    if (cursorPosition > currentBlockHeight) {
      return emptyResult();
    }

    if (cursorPosition > filter.toBlock) {
      return emptyResult();
    }

    console.log(`Fetching logs from ${cursorPosition} to ${toBlock} for filter ${id}`);
    const response = await this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
      method: "eth_getLogs",
      params: [paramFromFilter(Object.assign(Object.assign({}, filter), {
        fromBlock: cursorPosition,
        toBlock
      }))]
    }));

    if (Array.isArray(response.result)) {
      const blocks = response.result.map(log => util_1.intNumberFromHexString(log.blockNumber || "0x0"));
      const highestBlock = Math.max(...blocks);

      if (highestBlock && highestBlock > cursorPosition) {
        const newCursorPosition = types_1.IntNumber(highestBlock + 1);
        console.log(`Moving cursor position for filter (${id}) from ${cursorPosition} to ${newCursorPosition}`);
        this.cursors.set(id, newCursorPosition);
      }
    }

    return response;
  }

  async getBlockFilterChanges(id) {
    const cursorPosition = this.cursors.get(id);

    if (!cursorPosition) {
      return filterNotFoundError();
    }

    const currentBlockHeight = await this.getCurrentBlockHeight();

    if (cursorPosition > currentBlockHeight) {
      return emptyResult();
    }

    console.log(`Fetching blocks from ${cursorPosition} to ${currentBlockHeight} for filter (${id})`);
    const blocks = (await Promise.all(util_1.range(cursorPosition, currentBlockHeight + 1).map(i => this.getBlockHashByNumber(types_1.IntNumber(i))))).filter(hash => !!hash);
    const newCursorPosition = types_1.IntNumber(cursorPosition + blocks.length);
    console.log(`Moving cursor position for filter (${id}) from ${cursorPosition} to ${newCursorPosition}`);
    this.cursors.set(id, newCursorPosition);
    return Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
      result: blocks
    });
  }

  async getPendingTransactionFilterChanges(_id) {
    // pending transaction filters are not supported
    return Promise.resolve(emptyResult());
  }

  async setInitialCursorPosition(id, startBlock) {
    const currentBlockHeight = await this.getCurrentBlockHeight();
    const initialCursorPosition = typeof startBlock === "number" && startBlock > currentBlockHeight ? startBlock : currentBlockHeight;
    this.cursors.set(id, initialCursorPosition);
    return initialCursorPosition;
  }

  setFilterTimeout(id) {
    const existing = this.timeouts.get(id);

    if (existing) {
      window.clearTimeout(existing);
    }

    const timeout = window.setTimeout(() => {
      console.log(`Filter (${id}) timed out`);
      this.deleteFilter(id);
    }, TIMEOUT);
    this.timeouts.set(id, timeout);
  }

  async getCurrentBlockHeight() {
    const {
      result
    } = await this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
      method: "eth_blockNumber",
      params: []
    }));
    return util_1.intNumberFromHexString(util_1.ensureHexString(result));
  }

  async getBlockHashByNumber(blockNumber) {
    const response = await this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
      method: "eth_getBlockByNumber",
      params: [util_1.hexStringFromIntNumber(blockNumber), false]
    }));

    if (response.result && typeof response.result.hash === "string") {
      return util_1.ensureHexString(response.result.hash);
    }

    return null;
  }

}

exports.FilterPolyfill = FilterPolyfill;

function filterFromParam(param) {
  return {
    fromBlock: intBlockHeightFromHexBlockHeight(param.fromBlock),
    toBlock: intBlockHeightFromHexBlockHeight(param.toBlock),
    addresses: param.address === undefined ? null : Array.isArray(param.address) ? param.address : [param.address],
    topics: param.topics || []
  };
}

exports.filterFromParam = filterFromParam;

function paramFromFilter(filter) {
  const param = {
    fromBlock: hexBlockHeightFromIntBlockHeight(filter.fromBlock),
    toBlock: hexBlockHeightFromIntBlockHeight(filter.toBlock),
    topics: filter.topics
  };

  if (filter.addresses !== null) {
    param.address = filter.addresses;
  }

  return param;
}

function intBlockHeightFromHexBlockHeight(value) {
  if (value === undefined || value === "latest" || value === "pending") {
    return "latest";
  } else if (value === "earliest") {
    return types_1.IntNumber(0);
  } else if (util_1.isHexString(value)) {
    return util_1.intNumberFromHexString(value);
  }

  throw new Error(`Invalid block option: ${value}`);
}

function hexBlockHeightFromIntBlockHeight(value) {
  if (value === "latest") {
    return value;
  }

  return util_1.hexStringFromIntNumber(value);
}

function filterNotFoundError() {
  return Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
    error: {
      code: -32000,
      message: "filter not found"
    }
  });
}

function emptyResult() {
  return Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
    result: []
  });
}

/***/ }),

/***/ "./node_modules/walletlink/dist/provider/JSONRPC.js":
/*!**********************************************************!*\
  !*** ./node_modules/walletlink/dist/provider/JSONRPC.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSONRPCMethod = void 0;
var JSONRPCMethod;

(function (JSONRPCMethod) {
  // synchronous or asynchronous
  JSONRPCMethod["eth_accounts"] = "eth_accounts";
  JSONRPCMethod["eth_coinbase"] = "eth_coinbase";
  JSONRPCMethod["net_version"] = "net_version";
  JSONRPCMethod["eth_chainId"] = "eth_chainId";
  JSONRPCMethod["eth_uninstallFilter"] = "eth_uninstallFilter"; // asynchronous only

  JSONRPCMethod["eth_requestAccounts"] = "eth_requestAccounts";
  JSONRPCMethod["eth_sign"] = "eth_sign";
  JSONRPCMethod["eth_ecRecover"] = "eth_ecRecover";
  JSONRPCMethod["personal_sign"] = "personal_sign";
  JSONRPCMethod["personal_ecRecover"] = "personal_ecRecover";
  JSONRPCMethod["eth_signTransaction"] = "eth_signTransaction";
  JSONRPCMethod["eth_sendRawTransaction"] = "eth_sendRawTransaction";
  JSONRPCMethod["eth_sendTransaction"] = "eth_sendTransaction";
  JSONRPCMethod["eth_signTypedData_v1"] = "eth_signTypedData_v1";
  JSONRPCMethod["eth_signTypedData_v2"] = "eth_signTypedData_v2";
  JSONRPCMethod["eth_signTypedData_v3"] = "eth_signTypedData_v3";
  JSONRPCMethod["eth_signTypedData_v4"] = "eth_signTypedData_v4";
  JSONRPCMethod["eth_signTypedData"] = "eth_signTypedData";
  JSONRPCMethod["walletlink_arbitrary"] = "walletlink_arbitrary"; // asynchronous pub/sub

  JSONRPCMethod["eth_subscribe"] = "eth_subscribe";
  JSONRPCMethod["eth_unsubscribe"] = "eth_unsubscribe"; // asynchronous filter methods

  JSONRPCMethod["eth_newFilter"] = "eth_newFilter";
  JSONRPCMethod["eth_newBlockFilter"] = "eth_newBlockFilter";
  JSONRPCMethod["eth_newPendingTransactionFilter"] = "eth_newPendingTransactionFilter";
  JSONRPCMethod["eth_getFilterChanges"] = "eth_getFilterChanges";
  JSONRPCMethod["eth_getFilterLogs"] = "eth_getFilterLogs";
})(JSONRPCMethod = exports.JSONRPCMethod || (exports.JSONRPCMethod = {}));

/***/ }),

/***/ "./node_modules/walletlink/dist/provider/SubscriptionManager.js":
/*!**********************************************************************!*\
  !*** ./node_modules/walletlink/dist/provider/SubscriptionManager.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionManager = void 0;

const PollingBlockTracker = __webpack_require__(/*! eth-block-tracker */ "./node_modules/eth-block-tracker/src/polling.js");

const createSubscriptionManager = __webpack_require__(/*! eth-json-rpc-filters/subscriptionManager */ "./node_modules/eth-json-rpc-filters/subscriptionManager.js");

const noop = () => {};

class SubscriptionManager {
  constructor(provider) {
    const blockTracker = new PollingBlockTracker({
      provider,
      pollingInterval: 15 * 1000,
      setSkipCacheFlag: true
    });
    const {
      events,
      middleware
    } = createSubscriptionManager({
      blockTracker,
      provider
    });
    this.events = events;
    this.subscriptionMiddleware = middleware;
  }

  async handleRequest(request) {
    const result = {};
    await this.subscriptionMiddleware(request, result, noop, noop);
    return result;
  }

  destroy() {
    this.subscriptionMiddleware.destroy();
  }

}

exports.SubscriptionManager = SubscriptionManager;

/***/ }),

/***/ "./node_modules/walletlink/dist/provider/WalletLinkProvider.js":
/*!*********************************************************************!*\
  !*** ./node_modules/walletlink/dist/provider/WalletLinkProvider.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) { // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkProvider = void 0;

const bn_js_1 = __importDefault(__webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js"));

const util_1 = __webpack_require__(/*! ../util */ "./node_modules/walletlink/dist/util.js");

const eth_eip712_util_1 = __importDefault(__webpack_require__(/*! ../vendor-js/eth-eip712-util */ "./node_modules/walletlink/dist/vendor-js/eth-eip712-util/index.js"));

const FilterPolyfill_1 = __webpack_require__(/*! ./FilterPolyfill */ "./node_modules/walletlink/dist/provider/FilterPolyfill.js");

const JSONRPC_1 = __webpack_require__(/*! ./JSONRPC */ "./node_modules/walletlink/dist/provider/JSONRPC.js");

const eth_rpc_errors_1 = __webpack_require__(/*! eth-rpc-errors */ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/index.js");

const safe_event_emitter_1 = __importDefault(__webpack_require__(/*! @metamask/safe-event-emitter */ "./node_modules/@metamask/safe-event-emitter/index.js"));

const SubscriptionManager_1 = __webpack_require__(/*! ./SubscriptionManager */ "./node_modules/walletlink/dist/provider/SubscriptionManager.js");

const LOCAL_STORAGE_ADDRESSES_KEY = "Addresses";

class WalletLinkProvider extends safe_event_emitter_1.default {
  constructor(options) {
    super();
    this._filterPolyfill = new FilterPolyfill_1.FilterPolyfill(this);
    this._subscriptionManager = new SubscriptionManager_1.SubscriptionManager(this);
    this._relay = null;
    this._addresses = [];
    this.hasMadeFirstChainChangedEmission = false;
    this._send = this.send;
    this._sendAsync = this.sendAsync;
    this._chainId = util_1.ensureIntNumber(options.chainId || 1);
    this._jsonRpcUrl = options.jsonRpcUrl;
    this._overrideIsMetaMask = options.overrideIsMetaMask;
    this._relayProvider = options.relayProvider;
    this._storage = options.storage;
    this._relayEventManager = options.relayEventManager;
    const chainIdStr = util_1.prepend0x(this._chainId.toString(16)); // indicate that we've connected, for EIP-1193 compliance

    this.emit("connect", {
      chainIdStr
    });

    const cachedAddresses = this._storage.getItem(LOCAL_STORAGE_ADDRESSES_KEY);

    if (cachedAddresses) {
      const addresses = cachedAddresses.split(" ");

      if (addresses[0] !== "") {
        this._addresses = addresses;
        this.emit("accountsChanged", addresses);
      }
    }

    this._subscriptionManager.events.on("notification", notification => {
      this.emit("message", {
        type: notification.method,
        data: notification.params
      });
    });

    if (this._addresses.length > 0) {
      this.initializeRelay();
    }
  }

  get selectedAddress() {
    return this._addresses[0] || undefined;
  }

  get networkVersion() {
    return this._chainId.toString(10);
  }

  get chainId() {
    return util_1.prepend0x(this._chainId.toString(16));
  }

  get isWalletLink() {
    return true;
  }
  /**
   * Some DApps (i.e. Alpha Homora) seem to require the window.ethereum object return
   * true for this method.
   */


  get isMetaMask() {
    return this._overrideIsMetaMask;
  }

  get host() {
    return this._jsonRpcUrl;
  }

  get connected() {
    return true;
  }

  isConnected() {
    return true;
  }

  setProviderInfo(jsonRpcUrl, chainId) {
    this._jsonRpcUrl = jsonRpcUrl;
    const originalChainId = this._chainId;
    this._chainId = util_1.ensureIntNumber(chainId);
    const chainChanged = this._chainId !== originalChainId;

    if (chainChanged || !this.hasMadeFirstChainChangedEmission) {
      this.emit("chainChanged", this._chainId);
      this.hasMadeFirstChainChangedEmission = true;
    }
  }

  setAppInfo(appName, appLogoUrl) {
    this.initializeRelay().then(relay => relay.setAppInfo(appName, appLogoUrl));
  }

  async enable() {
    if (this._addresses.length > 0) {
      return this._addresses;
    }

    return await this._send(JSONRPC_1.JSONRPCMethod.eth_requestAccounts);
  }

  close() {
    this.initializeRelay().then(relay => relay.resetAndReload());
  }

  send(requestOrMethod, callbackOrParams) {
    // send<T>(method, params): Promise<T>
    if (typeof requestOrMethod === "string") {
      const method = requestOrMethod;
      const params = Array.isArray(callbackOrParams) ? callbackOrParams : callbackOrParams !== undefined ? [callbackOrParams] : [];
      const request = {
        jsonrpc: "2.0",
        id: 0,
        method,
        params
      };
      return this._sendRequestAsync(request).then(res => res.result);
    } // send(JSONRPCRequest | JSONRPCRequest[], callback): void


    if (typeof callbackOrParams === "function") {
      const request = requestOrMethod;
      const callback = callbackOrParams;
      return this._sendAsync(request, callback);
    } // send(JSONRPCRequest[]): JSONRPCResponse[]


    if (Array.isArray(requestOrMethod)) {
      const requests = requestOrMethod;
      return requests.map(r => this._sendRequest(r));
    } // send(JSONRPCRequest): JSONRPCResponse


    const req = requestOrMethod;
    return this._sendRequest(req);
  }

  sendAsync(request, callback) {
    if (typeof callback !== "function") {
      throw new Error("callback is required");
    } // send(JSONRPCRequest[], callback): void


    if (Array.isArray(request)) {
      const arrayCb = callback;

      this._sendMultipleRequestsAsync(request).then(responses => arrayCb(null, responses)).catch(err => arrayCb(err, null));

      return;
    } // send(JSONRPCRequest, callback): void


    const cb = callback;

    this._sendRequestAsync(request).then(response => cb(null, response)).catch(err => cb(err, null));
  }

  async request(args) {
    if (!args || typeof args !== "object" || Array.isArray(args)) {
      throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({
        message: "Expected a single, non-array, object argument.",
        data: args
      });
    }

    const {
      method,
      params
    } = args;

    if (typeof method !== "string" || method.length === 0) {
      throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({
        message: "'args.method' must be a non-empty string.",
        data: args
      });
    }

    if (params !== undefined && !Array.isArray(params) && (typeof params !== "object" || params === null)) {
      throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({
        message: "'args.params' must be an object or array if provided.",
        data: args
      });
    }

    const newParams = params === undefined ? [] : params; // WalletLink Requests

    const id = this._relayEventManager.makeRequestId();

    const result = await this._sendRequestAsync({
      method,
      params: newParams,
      jsonrpc: "2.0",
      id
    });
    return result.result;
  }

  async scanQRCode(match) {
    const relay = await this.initializeRelay();
    const res = await relay.scanQRCode(util_1.ensureRegExpString(match));

    if (typeof res.result !== "string") {
      throw new Error("result was not a string");
    }

    return res.result;
  }

  async arbitraryRequest(data) {
    const relay = await this.initializeRelay();
    const res = await relay.arbitraryRequest(data);

    if (typeof res.result !== "string") {
      throw new Error("result was not a string");
    }

    return res.result;
  }

  async childRequestEthereumAccounts(childSessionId, childSessionSecret, dappName, dappLogoURL, dappURL) {
    const relay = await this.initializeRelay();
    await relay.childRequestEthereumAccounts(childSessionId, childSessionSecret, dappName, dappLogoURL, dappURL);
    return true;
  }

  supportsSubscriptions() {
    return false;
  }

  subscribe() {
    throw new Error("Subscriptions are not supported");
  }

  unsubscribe() {
    throw new Error("Subscriptions are not supported");
  }

  disconnect() {
    return true;
  }

  _sendRequest(request) {
    const response = {
      jsonrpc: "2.0",
      id: request.id
    };
    const {
      method
    } = request;
    response.result = this._handleSynchronousMethods(request);

    if (response.result === undefined) {
      throw new Error(`WalletLink does not support calling ${method} synchronously without ` + `a callback. Please provide a callback parameter to call ${method} ` + `asynchronously.`);
    }

    return response;
  }

  _setAddresses(addresses) {
    if (!Array.isArray(addresses)) {
      throw new Error("addresses is not an array");
    }

    this._addresses = addresses.map(address => util_1.ensureAddressString(address));
    this.emit("accountsChanged", this._addresses);

    this._storage.setItem(LOCAL_STORAGE_ADDRESSES_KEY, addresses.join(" "));

    window.dispatchEvent(new CustomEvent("walletlink:addresses", {
      detail: this._addresses
    }));
  }

  _sendRequestAsync(request) {
    return new Promise((resolve, reject) => {
      try {
        const syncResult = this._handleSynchronousMethods(request);

        if (syncResult !== undefined) {
          return resolve({
            jsonrpc: "2.0",
            id: request.id,
            result: syncResult
          });
        }

        const filterPromise = this._handleAsynchronousFilterMethods(request);

        if (filterPromise !== undefined) {
          filterPromise.then(res => resolve(Object.assign(Object.assign({}, res), {
            id: request.id
          }))).catch(err => reject(err));
          return;
        }

        const subscriptionPromise = this._handleSubscriptionMethods(request);

        if (subscriptionPromise !== undefined) {
          subscriptionPromise.then(res => resolve({
            jsonrpc: "2.0",
            id: request.id,
            result: res.result
          })).catch(err => reject(err));
          return;
        }
      } catch (err) {
        return reject(err);
      }

      this._handleAsynchronousMethods(request).then(res => resolve(Object.assign(Object.assign({}, res), {
        id: request.id
      }))).catch(err => reject(err));
    });
  }

  _sendMultipleRequestsAsync(requests) {
    return Promise.all(requests.map(r => this._sendRequestAsync(r)));
  }

  _handleSynchronousMethods(request) {
    const {
      method
    } = request;
    const params = request.params || [];

    switch (method) {
      case JSONRPC_1.JSONRPCMethod.eth_accounts:
        return this._eth_accounts();

      case JSONRPC_1.JSONRPCMethod.eth_coinbase:
        return this._eth_coinbase();

      case JSONRPC_1.JSONRPCMethod.eth_uninstallFilter:
        return this._eth_uninstallFilter(params);

      case JSONRPC_1.JSONRPCMethod.net_version:
        return this._net_version();

      case JSONRPC_1.JSONRPCMethod.eth_chainId:
        return this._eth_chainId();

      default:
        return undefined;
    }
  }

  _handleAsynchronousMethods(request) {
    const {
      method
    } = request;
    const params = request.params || [];

    switch (method) {
      case JSONRPC_1.JSONRPCMethod.eth_requestAccounts:
        return this._eth_requestAccounts();

      case JSONRPC_1.JSONRPCMethod.eth_sign:
        return this._eth_sign(params);

      case JSONRPC_1.JSONRPCMethod.eth_ecRecover:
        return this._eth_ecRecover(params);

      case JSONRPC_1.JSONRPCMethod.personal_sign:
        return this._personal_sign(params);

      case JSONRPC_1.JSONRPCMethod.personal_ecRecover:
        return this._personal_ecRecover(params);

      case JSONRPC_1.JSONRPCMethod.eth_signTransaction:
        return this._eth_signTransaction(params);

      case JSONRPC_1.JSONRPCMethod.eth_sendRawTransaction:
        return this._eth_sendRawTransaction(params);

      case JSONRPC_1.JSONRPCMethod.eth_sendTransaction:
        return this._eth_sendTransaction(params);

      case JSONRPC_1.JSONRPCMethod.eth_signTypedData_v1:
        return this._eth_signTypedData_v1(params);

      case JSONRPC_1.JSONRPCMethod.eth_signTypedData_v2:
        return this._throwUnsupportedMethodError();

      case JSONRPC_1.JSONRPCMethod.eth_signTypedData_v3:
        return this._eth_signTypedData_v3(params);

      case JSONRPC_1.JSONRPCMethod.eth_signTypedData_v4:
      case JSONRPC_1.JSONRPCMethod.eth_signTypedData:
        return this._eth_signTypedData_v4(params);

      case JSONRPC_1.JSONRPCMethod.walletlink_arbitrary:
        return this._walletlink_arbitrary(params);
    }

    if (!this._jsonRpcUrl) throw Error("Error: No jsonRpcUrl provided");
    return window.fetch(this._jsonRpcUrl, {
      method: "POST",
      body: JSON.stringify(request),
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(json => {
      if (!json) {
        throw eth_rpc_errors_1.ethErrors.rpc.parse({});
      }

      const response = json;
      const {
        error
      } = response;

      if (error) {
        throw eth_rpc_errors_1.serializeError(error);
      }

      return response;
    });
  }

  _handleAsynchronousFilterMethods(request) {
    const {
      method
    } = request;
    const params = request.params || [];

    switch (method) {
      case JSONRPC_1.JSONRPCMethod.eth_newFilter:
        return this._eth_newFilter(params);

      case JSONRPC_1.JSONRPCMethod.eth_newBlockFilter:
        return this._eth_newBlockFilter();

      case JSONRPC_1.JSONRPCMethod.eth_newPendingTransactionFilter:
        return this._eth_newPendingTransactionFilter();

      case JSONRPC_1.JSONRPCMethod.eth_getFilterChanges:
        return this._eth_getFilterChanges(params);

      case JSONRPC_1.JSONRPCMethod.eth_getFilterLogs:
        return this._eth_getFilterLogs(params);
    }

    return undefined;
  }

  _handleSubscriptionMethods(request) {
    switch (request.method) {
      case JSONRPC_1.JSONRPCMethod.eth_subscribe:
      case JSONRPC_1.JSONRPCMethod.eth_unsubscribe:
        return this._subscriptionManager.handleRequest(request);
    }

    return undefined;
  }

  _isKnownAddress(addressString) {
    try {
      const address = util_1.ensureAddressString(addressString);
      return this._addresses.includes(address);
    } catch (_a) {}

    return false;
  }

  _ensureKnownAddress(addressString) {
    if (!this._isKnownAddress(addressString)) {
      throw new Error("Unknown Ethereum address");
    }
  }

  _prepareTransactionParams(tx) {
    const fromAddress = tx.from ? util_1.ensureAddressString(tx.from) : this.selectedAddress;

    if (!fromAddress) {
      throw new Error("Ethereum address is unavailable");
    }

    this._ensureKnownAddress(fromAddress);

    const toAddress = tx.to ? util_1.ensureAddressString(tx.to) : null;
    const weiValue = tx.value != null ? util_1.ensureBN(tx.value) : new bn_js_1.default(0);
    const data = tx.data ? util_1.ensureBuffer(tx.data) : Buffer.alloc(0);
    const nonce = tx.nonce != null ? util_1.ensureIntNumber(tx.nonce) : null;
    const gasPriceInWei = tx.gasPrice != null ? util_1.ensureBN(tx.gasPrice) : null;
    const gasLimit = tx.gas != null ? util_1.ensureBN(tx.gas) : null;
    const chainId = this._chainId;
    return {
      fromAddress,
      toAddress,
      weiValue,
      data,
      nonce,
      gasPriceInWei,
      gasLimit,
      chainId
    };
  }

  _requireAuthorization() {
    if (this._addresses.length === 0) {
      throw eth_rpc_errors_1.ethErrors.provider.unauthorized({});
    }
  }

  _throwUnsupportedMethodError() {
    throw eth_rpc_errors_1.ethErrors.provider.unsupportedMethod({});
  }

  async _signEthereumMessage(message, address, addPrefix, typedDataJson) {
    this._ensureKnownAddress(address);

    try {
      const relay = await this.initializeRelay();
      const res = await relay.signEthereumMessage(message, address, addPrefix, typedDataJson);
      return {
        jsonrpc: "2.0",
        id: 0,
        result: res.result
      };
    } catch (err) {
      if (typeof err.message === "string" && err.message.match(/(denied|rejected)/i)) {
        throw eth_rpc_errors_1.ethErrors.provider.userRejectedRequest("User denied message signature");
      }

      throw err;
    }
  }

  async _ethereumAddressFromSignedMessage(message, signature, addPrefix) {
    const relay = await this.initializeRelay();
    const res = await relay.ethereumAddressFromSignedMessage(message, signature, addPrefix);
    return {
      jsonrpc: "2.0",
      id: 0,
      result: res.result
    };
  }

  _eth_accounts() {
    return this._addresses;
  }

  _eth_coinbase() {
    return this.selectedAddress || null;
  }

  _net_version() {
    return this._chainId.toString(10);
  }

  _eth_chainId() {
    return util_1.hexStringFromIntNumber(this._chainId);
  }

  async _eth_requestAccounts() {
    if (this._addresses.length > 0) {
      return Promise.resolve({
        jsonrpc: "2.0",
        id: 0,
        result: this._addresses
      });
    }

    let res;

    try {
      const relay = await this.initializeRelay();
      res = await relay.requestEthereumAccounts();
    } catch (err) {
      if (typeof err.message === "string" && err.message.match(/(denied|rejected)/i)) {
        throw eth_rpc_errors_1.ethErrors.provider.userRejectedRequest("User denied account authorization");
      }

      throw err;
    }

    if (!res.result) {
      throw new Error("accounts received is empty");
    }

    this._setAddresses(res.result);

    return {
      jsonrpc: "2.0",
      id: 0,
      result: this._addresses
    };
  }

  _eth_sign(params) {
    this._requireAuthorization();

    const address = util_1.ensureAddressString(params[0]);
    const message = util_1.ensureBuffer(params[1]);
    return this._signEthereumMessage(message, address, false);
  }

  _eth_ecRecover(params) {
    const message = util_1.ensureBuffer(params[0]);
    const signature = util_1.ensureBuffer(params[1]);
    return this._ethereumAddressFromSignedMessage(message, signature, false);
  }

  _personal_sign(params) {
    this._requireAuthorization();

    const message = util_1.ensureBuffer(params[0]);
    const address = util_1.ensureAddressString(params[1]);
    return this._signEthereumMessage(message, address, true);
  }

  _personal_ecRecover(params) {
    const message = util_1.ensureBuffer(params[0]);
    const signature = util_1.ensureBuffer(params[1]);
    return this._ethereumAddressFromSignedMessage(message, signature, true);
  }

  async _eth_signTransaction(params) {
    this._requireAuthorization();

    const tx = this._prepareTransactionParams(params[0] || {});

    try {
      const relay = await this.initializeRelay();
      const res = await relay.signEthereumTransaction(tx);
      return {
        jsonrpc: "2.0",
        id: 0,
        result: res.result
      };
    } catch (err) {
      if (typeof err.message === "string" && err.message.match(/(denied|rejected)/i)) {
        throw eth_rpc_errors_1.ethErrors.provider.userRejectedRequest("User denied transaction signature");
      }

      throw err;
    }
  }

  async _eth_sendRawTransaction(params) {
    const signedTransaction = util_1.ensureBuffer(params[0]);
    const relay = await this.initializeRelay();
    const res = await relay.submitEthereumTransaction(signedTransaction, this._chainId);
    return {
      jsonrpc: "2.0",
      id: 0,
      result: res.result
    };
  }

  async _eth_sendTransaction(params) {
    this._requireAuthorization();

    const tx = this._prepareTransactionParams(params[0] || {});

    try {
      const relay = await this.initializeRelay();
      const res = await relay.signAndSubmitEthereumTransaction(tx);
      return {
        jsonrpc: "2.0",
        id: 0,
        result: res.result
      };
    } catch (err) {
      if (typeof err.message === "string" && err.message.match(/(denied|rejected)/i)) {
        throw eth_rpc_errors_1.ethErrors.provider.userRejectedRequest("User denied transaction signature");
      }

      throw err;
    }
  }

  async _eth_signTypedData_v1(params) {
    this._requireAuthorization();

    const typedData = util_1.ensureParsedJSONObject(params[0]);
    const address = util_1.ensureAddressString(params[1]);

    this._ensureKnownAddress(address);

    const message = eth_eip712_util_1.default.hashForSignTypedDataLegacy({
      data: typedData
    });
    const typedDataJSON = JSON.stringify(typedData, null, 2);
    return this._signEthereumMessage(message, address, false, typedDataJSON);
  }

  async _eth_signTypedData_v3(params) {
    this._requireAuthorization();

    const address = util_1.ensureAddressString(params[0]);
    const typedData = util_1.ensureParsedJSONObject(params[1]);

    this._ensureKnownAddress(address);

    const message = eth_eip712_util_1.default.hashForSignTypedData_v3({
      data: typedData
    });
    const typedDataJSON = JSON.stringify(typedData, null, 2);
    return this._signEthereumMessage(message, address, false, typedDataJSON);
  }

  async _eth_signTypedData_v4(params) {
    this._requireAuthorization();

    const address = util_1.ensureAddressString(params[0]);
    const typedData = util_1.ensureParsedJSONObject(params[1]);

    this._ensureKnownAddress(address);

    const message = eth_eip712_util_1.default.hashForSignTypedData_v4({
      data: typedData
    });
    const typedDataJSON = JSON.stringify(typedData, null, 2);
    return this._signEthereumMessage(message, address, false, typedDataJSON);
  }

  async _walletlink_arbitrary(params) {
    const data = params[0];

    if (typeof data !== "string") {
      throw new Error("parameter must be a string");
    }

    const result = await this.arbitraryRequest(data);
    return {
      jsonrpc: "2.0",
      id: 0,
      result
    };
  }

  _eth_uninstallFilter(params) {
    const filterId = util_1.ensureHexString(params[0]);
    return this._filterPolyfill.uninstallFilter(filterId);
  }

  async _eth_newFilter(params) {
    const param = params[0];
    const filterId = await this._filterPolyfill.newFilter(param);
    return {
      jsonrpc: "2.0",
      id: 0,
      result: filterId
    };
  }

  async _eth_newBlockFilter() {
    const filterId = await this._filterPolyfill.newBlockFilter();
    return {
      jsonrpc: "2.0",
      id: 0,
      result: filterId
    };
  }

  async _eth_newPendingTransactionFilter() {
    const filterId = await this._filterPolyfill.newPendingTransactionFilter();
    return {
      jsonrpc: "2.0",
      id: 0,
      result: filterId
    };
  }

  _eth_getFilterChanges(params) {
    const filterId = util_1.ensureHexString(params[0]);
    return this._filterPolyfill.getFilterChanges(filterId);
  }

  _eth_getFilterLogs(params) {
    const filterId = util_1.ensureHexString(params[0]);
    return this._filterPolyfill.getFilterLogs(filterId);
  }

  initializeRelay() {
    if (this._relay) {
      return Promise.resolve(this._relay);
    }

    return this._relayProvider().then(relay => {
      relay.setChainIdCallback(chainId => this.setProviderInfo(this._jsonRpcUrl, parseInt(chainId, 10)));
      relay.setJsonRpcUrlCallback(jsonRpcUrl => this.setProviderInfo(jsonRpcUrl, this._chainId));
      this._relay = relay;
      return relay;
    });
  }

}

exports.WalletLinkProvider = WalletLinkProvider;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/walletlink/dist/provider/WalletLinkSdkUI.js":
/*!******************************************************************!*\
  !*** ./node_modules/walletlink/dist/provider/WalletLinkSdkUI.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkSdkUI = void 0;

const WalletLinkUI_1 = __webpack_require__(/*! ./WalletLinkUI */ "./node_modules/walletlink/dist/provider/WalletLinkUI.js");

const cssReset_1 = __webpack_require__(/*! ../lib/cssReset */ "./node_modules/walletlink/dist/lib/cssReset.js");

const LinkFlow_1 = __webpack_require__(/*! ../components/LinkFlow */ "./node_modules/walletlink/dist/components/LinkFlow.js");

const Snackbar_1 = __webpack_require__(/*! ../components/Snackbar */ "./node_modules/walletlink/dist/components/Snackbar.js");

class WalletLinkSdkUI extends WalletLinkUI_1.WalletLinkUI {
  constructor(options) {
    super(options);
    this.attached = false;
    this.snackbar = new Snackbar_1.Snackbar({
      darkMode: options.darkMode
    });
    this.linkFlow = new LinkFlow_1.LinkFlow({
      darkMode: options.darkMode,
      version: options.version,
      sessionId: options.session.id,
      sessionSecret: options.session.secret,
      walletLinkUrl: options.walletLinkUrl,
      connected$: options.connected$,
      isParentConnection: false
    });
  }

  attach() {
    if (this.attached) {
      throw new Error("WalletLinkUI is already attached");
    }

    const el = document.documentElement;
    const container = document.createElement("div");
    container.className = "-walletlink-css-reset";
    el.appendChild(container);
    this.linkFlow.attach(container);
    this.snackbar.attach(container);
    this.attached = true;
    cssReset_1.injectCssReset();
  }

  setConnectDisabled(connectDisabled) {
    this.linkFlow.setConnectDisabled(connectDisabled);
  }

  requestEthereumAccounts(options) {
    this.linkFlow.open({
      onCancel: options.onCancel
    });
  }

  hideRequestEthereumAccounts() {
    this.linkFlow.close();
  }

  showConnecting(options) {
    const snackbarProps = {
      message: "Confirm on phone",
      menuItems: [{
        isRed: true,
        info: "Cancel transaction",
        svgWidth: "11",
        svgHeight: "11",
        path: "M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z",
        defaultFillRule: "inherit",
        defaultClipRule: "inherit",
        onClick: options.onCancel
      }, {
        isRed: false,
        info: "Reset connection",
        svgWidth: "10",
        svgHeight: "11",
        path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
        defaultFillRule: "evenodd",
        defaultClipRule: "evenodd",
        onClick: options.onResetConnection
      }]
    };
    return this.snackbar.presentItem(snackbarProps);
  }

  reloadUI() {
    document.location.reload();
  }

  inlineAccountsResponse() {
    return false;
  }

}

exports.WalletLinkSdkUI = WalletLinkSdkUI;

/***/ }),

/***/ "./node_modules/walletlink/dist/provider/WalletLinkUI.js":
/*!***************************************************************!*\
  !*** ./node_modules/walletlink/dist/provider/WalletLinkUI.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkUI = void 0;

class WalletLinkUI {
  constructor(_) {}
  /**
   * We want to disable showing the qr code for in-page walletlink if the dapp hasn't provided a json rpc url
   */


  setConnectDisabled(_) {}

}

exports.WalletLinkUI = WalletLinkUI;

/***/ }),

/***/ "./node_modules/walletlink/dist/relay/RelayMessage.js":
/*!************************************************************!*\
  !*** ./node_modules/walletlink/dist/relay/RelayMessage.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelayMessageType = void 0;
var RelayMessageType;

(function (RelayMessageType) {
  RelayMessageType["SESSION_ID_REQUEST"] = "SESSION_ID_REQUEST";
  RelayMessageType["SESSION_ID_RESPONSE"] = "SESSION_ID_RESPONSE";
  RelayMessageType["LINKED"] = "LINKED";
  RelayMessageType["UNLINKED"] = "UNLINKED";
  RelayMessageType["WEB3_REQUEST"] = "WEB3_REQUEST";
  RelayMessageType["WEB3_REQUEST_CANCELED"] = "WEB3_REQUEST_CANCELED";
  RelayMessageType["WEB3_RESPONSE"] = "WEB3_RESPONSE";
})(RelayMessageType = exports.RelayMessageType || (exports.RelayMessageType = {}));

/***/ }),

/***/ "./node_modules/walletlink/dist/relay/Session.js":
/*!*******************************************************!*\
  !*** ./node_modules/walletlink/dist/relay/Session.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Session = void 0;

const crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "./node_modules/crypto-browserify/index.js"));

const rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

const operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

const STORAGE_KEY_SESSION_ID = "session:id";
const STORAGE_KEY_SESSION_SECRET = "session:secret";
const STORAGE_KEY_SESSION_LINKED = "session:linked";

class Session {
  constructor(storage, id, secret, linked) {
    this._storage = storage;
    this._id = id || crypto_1.default.randomBytes(16).toString("hex");
    this._secret = secret || crypto_1.default.randomBytes(32).toString("hex");
    this._key = crypto_1.default.createHash("sha256").update(`${this._id}, ${this._secret} WalletLink`, "ascii").digest("hex");
    this._linked = !!linked;
  }

  static load(storage) {
    const id = storage.getItem(STORAGE_KEY_SESSION_ID);
    const linked = storage.getItem(STORAGE_KEY_SESSION_LINKED);
    const secret = storage.getItem(STORAGE_KEY_SESSION_SECRET);

    if (id && secret) {
      return new Session(storage, id, secret, linked === "1");
    }

    return null;
  }

  static clear(storage) {
    storage.removeItem(STORAGE_KEY_SESSION_SECRET);
    storage.removeItem(STORAGE_KEY_SESSION_ID);
    storage.removeItem(STORAGE_KEY_SESSION_LINKED);
  }

  static get persistedSessionIdChange$() {
    return rxjs_1.fromEvent(window, "storage").pipe(operators_1.filter(evt => evt.key === STORAGE_KEY_SESSION_ID), operators_1.map(evt => ({
      oldValue: evt.oldValue || null,
      newValue: evt.newValue || null
    })));
  }

  get id() {
    return this._id;
  }

  get secret() {
    return this._secret;
  }

  get key() {
    return this._key;
  }

  get linked() {
    return this._linked;
  }

  set linked(val) {
    this._linked = val;
    this.persistLinked();
  }

  save() {
    this._storage.setItem(STORAGE_KEY_SESSION_ID, this._id);

    this._storage.setItem(STORAGE_KEY_SESSION_SECRET, this._secret);

    this.persistLinked();
    return this;
  }

  persistLinked() {
    this._storage.setItem(STORAGE_KEY_SESSION_LINKED, this._linked ? "1" : "0");
  }

}

exports.Session = Session;

/***/ }),

/***/ "./node_modules/walletlink/dist/relay/WalletLinkRelay.js":
/*!***************************************************************!*\
  !*** ./node_modules/walletlink/dist/relay/WalletLinkRelay.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

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

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

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
exports.WalletLinkRelay = void 0;

const bind_decorator_1 = __importDefault(__webpack_require__(/*! bind-decorator */ "./node_modules/bind-decorator/index.js"));

const crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "./node_modules/crypto-browserify/index.js"));

const rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

const operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

const WalletLinkConnection_1 = __webpack_require__(/*! ../connection/WalletLinkConnection */ "./node_modules/walletlink/dist/connection/WalletLinkConnection.js");

const util_1 = __webpack_require__(/*! ../util */ "./node_modules/walletlink/dist/util.js");

const aes256gcm = __importStar(__webpack_require__(/*! ./aes256gcm */ "./node_modules/walletlink/dist/relay/aes256gcm.js"));

const Session_1 = __webpack_require__(/*! ./Session */ "./node_modules/walletlink/dist/relay/Session.js");

const Web3Method_1 = __webpack_require__(/*! ./Web3Method */ "./node_modules/walletlink/dist/relay/Web3Method.js");

const Web3RequestCanceledMessage_1 = __webpack_require__(/*! ./Web3RequestCanceledMessage */ "./node_modules/walletlink/dist/relay/Web3RequestCanceledMessage.js");

const Web3RequestMessage_1 = __webpack_require__(/*! ./Web3RequestMessage */ "./node_modules/walletlink/dist/relay/Web3RequestMessage.js");

const Web3Response_1 = __webpack_require__(/*! ./Web3Response */ "./node_modules/walletlink/dist/relay/Web3Response.js");

const Web3ResponseMessage_1 = __webpack_require__(/*! ./Web3ResponseMessage */ "./node_modules/walletlink/dist/relay/Web3ResponseMessage.js");

const WalletLinkRelayAbstract_1 = __webpack_require__(/*! ./WalletLinkRelayAbstract */ "./node_modules/walletlink/dist/relay/WalletLinkRelayAbstract.js");

class WalletLinkRelay {
  constructor(options) {
    this.chainIdCallback = null;
    this.jsonRpcUrlCallback = null;
    this.appName = "";
    this.appLogoUrl = null;
    this.walletLinkUrl = options.walletLinkUrl;
    this.storage = options.storage;
    this.session = Session_1.Session.load(options.storage) || new Session_1.Session(options.storage).save();
    this.relayEventManager = options.relayEventManager;
    this.connection = new WalletLinkConnection_1.WalletLinkConnection(this.session.id, this.session.key, this.walletLinkUrl);
    this.connection.incomingEvent$.pipe(operators_1.filter(m => m.event === "Web3Response")).subscribe({
      next: this.handleIncomingEvent
    }); // if session is marked destroyed, reset and reload

    this.connection.sessionConfig$.pipe(operators_1.filter(c => !!c.metadata && c.metadata.__destroyed === "1")).subscribe({
      next: this.resetAndReload
    });
    this.connection.sessionConfig$.pipe(operators_1.filter(c => c.metadata && c.metadata.WalletUsername !== undefined)).pipe(operators_1.map(c => aes256gcm.decrypt(c.metadata.WalletUsername, this.session.secret))).subscribe({
      next: walletUsername => {
        this.storage.setItem(WalletLinkRelayAbstract_1.WALLET_USER_NAME_KEY, walletUsername);
      }
    });
    this.connection.sessionConfig$.pipe(operators_1.filter(c => c.metadata && c.metadata.ChainId !== undefined)).pipe(operators_1.map(c => aes256gcm.decrypt(c.metadata.ChainId, this.session.secret))).pipe(operators_1.distinctUntilChanged()).subscribe({
      next: chainId => {
        if (this.chainIdCallback) {
          this.chainIdCallback(chainId);
        }
      }
    });
    this.connection.sessionConfig$.pipe(operators_1.filter(c => c.metadata && c.metadata.JsonRpcUrl !== undefined)).pipe(operators_1.map(c => aes256gcm.decrypt(c.metadata.JsonRpcUrl, this.session.secret))).pipe(operators_1.distinctUntilChanged()).subscribe({
      next: jsonRpcURl => {
        if (this.jsonRpcUrlCallback) {
          this.jsonRpcUrlCallback(jsonRpcURl);
        }
      }
    });
    this.ui = options.walletLinkUIConstructor({
      walletLinkUrl: options.walletLinkUrl,
      version: options.version,
      darkMode: options.darkMode,
      session: this.session,
      connected$: this.connection.connected$
    });
    this.connection.connect();
  }

  attachUI() {
    this.ui.attach();
  }

  resetAndReload() {
    this.connection.setSessionMetadata("__destroyed", "1").pipe(operators_1.timeout(1000), operators_1.catchError(_ => rxjs_1.of(null))).subscribe(_ => {
      this.connection.destroy();
      this.storage.clear();
      this.ui.reloadUI();
    });
  }

  setAppInfo(appName, appLogoUrl) {
    this.appName = appName;
    this.appLogoUrl = appLogoUrl;
  }

  getStorageItem(key) {
    return this.storage.getItem(key);
  }

  setStorageItem(key, value) {
    this.storage.setItem(key, value);
  }

  childRequestEthereumAccounts(childSessionId, childSessionSecret, dappName, dappLogoURL, dappURL) {
    return this.sendRequest({
      method: Web3Method_1.Web3Method.childRequestEthereumAccounts,
      params: {
        sessionId: childSessionId,
        sessionSecret: childSessionSecret,
        appName: dappName,
        appLogoURL: dappLogoURL,
        appURL: dappURL
      }
    });
  }

  requestEthereumAccounts() {
    return this.sendRequest({
      method: Web3Method_1.Web3Method.requestEthereumAccounts,
      params: {
        appName: this.appName,
        appLogoUrl: this.appLogoUrl || null
      }
    });
  }

  signEthereumMessage(message, address, addPrefix, typedDataJson) {
    return this.sendRequest({
      method: Web3Method_1.Web3Method.signEthereumMessage,
      params: {
        message: util_1.hexStringFromBuffer(message, true),
        address,
        addPrefix,
        typedDataJson: typedDataJson || null
      }
    });
  }

  ethereumAddressFromSignedMessage(message, signature, addPrefix) {
    return this.sendRequest({
      method: Web3Method_1.Web3Method.ethereumAddressFromSignedMessage,
      params: {
        message: util_1.hexStringFromBuffer(message, true),
        signature: util_1.hexStringFromBuffer(signature, true),
        addPrefix
      }
    });
  }

  signEthereumTransaction(params) {
    return this.sendRequest({
      method: Web3Method_1.Web3Method.signEthereumTransaction,
      params: {
        fromAddress: params.fromAddress,
        toAddress: params.toAddress,
        weiValue: util_1.bigIntStringFromBN(params.weiValue),
        data: util_1.hexStringFromBuffer(params.data, true),
        nonce: params.nonce,
        gasPriceInWei: params.gasPriceInWei ? util_1.bigIntStringFromBN(params.gasPriceInWei) : null,
        gasLimit: params.gasLimit ? util_1.bigIntStringFromBN(params.gasLimit) : null,
        chainId: params.chainId,
        shouldSubmit: false
      }
    });
  }

  signAndSubmitEthereumTransaction(params) {
    return this.sendRequest({
      method: Web3Method_1.Web3Method.signEthereumTransaction,
      params: {
        fromAddress: params.fromAddress,
        toAddress: params.toAddress,
        weiValue: util_1.bigIntStringFromBN(params.weiValue),
        data: util_1.hexStringFromBuffer(params.data, true),
        nonce: params.nonce,
        gasPriceInWei: params.gasPriceInWei ? util_1.bigIntStringFromBN(params.gasPriceInWei) : null,
        gasLimit: params.gasLimit ? util_1.bigIntStringFromBN(params.gasLimit) : null,
        chainId: params.chainId,
        shouldSubmit: true
      }
    });
  }

  submitEthereumTransaction(signedTransaction, chainId) {
    return this.sendRequest({
      method: Web3Method_1.Web3Method.submitEthereumTransaction,
      params: {
        signedTransaction: util_1.hexStringFromBuffer(signedTransaction, true),
        chainId
      }
    });
  }

  scanQRCode(regExp) {
    return this.sendRequest({
      method: Web3Method_1.Web3Method.scanQRCode,
      params: {
        regExp
      }
    });
  }

  arbitraryRequest(data) {
    return this.sendRequest({
      method: Web3Method_1.Web3Method.arbitrary,
      params: {
        data
      }
    });
  }

  sendRequest(request) {
    return new Promise((resolve, reject) => {
      var _a;

      let hideSnackbarItem = null;
      const id = crypto_1.default.randomBytes(8).toString("hex");
      const isRequestAccounts = request.method === Web3Method_1.Web3Method.requestEthereumAccounts;

      const cancel = () => {
        this.publishWeb3RequestCanceledEvent(id);
        this.handleWeb3ResponseMessage(Web3ResponseMessage_1.Web3ResponseMessage({
          id,
          response: Web3Response_1.ErrorResponse(request.method, "User rejected request")
        }));
        hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
      };

      if (isRequestAccounts) {
        const userAgent = ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) || null;

        if (userAgent && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
          window.location.href = "https://go.cb-w.com/kQz6p7iFFfb";
          return;
        }

        if (this.ui.inlineAccountsResponse()) {
          const onAccounts = accounts => {
            this.handleWeb3ResponseMessage(Web3ResponseMessage_1.Web3ResponseMessage({
              id,
              response: Web3Response_1.RequestEthereumAccountsResponse(accounts)
            }));
          };

          this.ui.requestEthereumAccounts({
            onCancel: cancel,
            onAccounts: onAccounts
          });
        } else {
          this.ui.requestEthereumAccounts({
            onCancel: cancel
          });
        }

        WalletLinkRelay.accountRequestCallbackIds.add(id);
      } else {
        hideSnackbarItem = this.ui.showConnecting({
          onCancel: cancel,
          onResetConnection: this.resetAndReload
        });
      }

      this.relayEventManager.callbacks.set(id, response => {
        this.ui.hideRequestEthereumAccounts();
        hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();

        if (response.errorMessage) {
          return reject(new Error(response.errorMessage));
        }

        resolve(response);
      });

      if (!isRequestAccounts || !this.ui.inlineAccountsResponse()) {
        this.publishWeb3RequestEvent(id, request);
      }
    });
  }

  setConnectDisabled(disabled) {
    this.ui.setConnectDisabled(disabled);
  }

  setChainIdCallback(chainIdCallback) {
    this.chainIdCallback = chainIdCallback;
  }

  setJsonRpcUrlCallback(jsonRpcUrlCallback) {
    this.jsonRpcUrlCallback = jsonRpcUrlCallback;
  }

  publishWeb3RequestEvent(id, request) {
    const message = Web3RequestMessage_1.Web3RequestMessage({
      id,
      request
    });
    this.publishEvent("Web3Request", message, true).subscribe({
      error: err => {
        this.handleWeb3ResponseMessage(Web3ResponseMessage_1.Web3ResponseMessage({
          id: message.id,
          response: {
            method: message.request.method,
            errorMessage: err.message
          }
        }));
      }
    });
  }

  publishWeb3RequestCanceledEvent(id) {
    const message = Web3RequestCanceledMessage_1.Web3RequestCanceledMessage(id);
    this.publishEvent("Web3RequestCanceled", message, false).subscribe();
  }

  publishEvent(event, message, callWebhook) {
    const encrypted = aes256gcm.encrypt(JSON.stringify(Object.assign(Object.assign({}, message), {
      origin: location.origin
    })), this.session.secret);
    return this.connection.publishEvent(event, encrypted, callWebhook);
  }

  handleIncomingEvent(event) {
    let json;

    try {
      json = JSON.parse(aes256gcm.decrypt(event.data, this.session.secret));
    } catch (_a) {
      return;
    }

    const message = Web3ResponseMessage_1.isWeb3ResponseMessage(json) ? json : null;

    if (!message) {
      return;
    }

    this.handleWeb3ResponseMessage(message);
  }

  handleWeb3ResponseMessage(message) {
    const {
      response
    } = message;

    if (Web3Response_1.isRequestEthereumAccountsResponse(response)) {
      Array.from(WalletLinkRelay.accountRequestCallbackIds.values()).forEach(id => this.invokeCallback(Object.assign(Object.assign({}, message), {
        id
      })));
      WalletLinkRelay.accountRequestCallbackIds.clear();
      return;
    }

    this.invokeCallback(message);
  }

  invokeCallback(message) {
    const callback = this.relayEventManager.callbacks.get(message.id);

    if (callback) {
      callback(message.response);
      this.relayEventManager.callbacks.delete(message.id);
    }
  }

}

WalletLinkRelay.accountRequestCallbackIds = new Set();

__decorate([bind_decorator_1.default], WalletLinkRelay.prototype, "resetAndReload", null);

__decorate([bind_decorator_1.default], WalletLinkRelay.prototype, "handleIncomingEvent", null);

exports.WalletLinkRelay = WalletLinkRelay;

/***/ }),

/***/ "./node_modules/walletlink/dist/relay/WalletLinkRelayAbstract.js":
/*!***********************************************************************!*\
  !*** ./node_modules/walletlink/dist/relay/WalletLinkRelayAbstract.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkRelayAbstract = exports.WALLET_USER_NAME_KEY = void 0;
exports.WALLET_USER_NAME_KEY = "walletUsername";

class WalletLinkRelayAbstract {}

exports.WalletLinkRelayAbstract = WalletLinkRelayAbstract;

/***/ }),

/***/ "./node_modules/walletlink/dist/relay/WalletLinkRelayEventManager.js":
/*!***************************************************************************!*\
  !*** ./node_modules/walletlink/dist/relay/WalletLinkRelayEventManager.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletLinkRelayEventManager = void 0;

const util_1 = __webpack_require__(/*! ../util */ "./node_modules/walletlink/dist/util.js");

class WalletLinkRelayEventManager {
  constructor() {
    this._nextRequestId = 0;
    this.callbacks = new Map();
  }

  makeRequestId() {
    // max nextId == max int32 for compatibility with mobile
    this._nextRequestId = (this._nextRequestId + 1) % 0x7fffffff;
    const id = this._nextRequestId;
    const idStr = util_1.prepend0x(id.toString(16)); // unlikely that this will ever be an issue, but just to be safe

    const callback = this.callbacks.get(idStr);

    if (callback) {
      this.callbacks.delete(idStr);
    }

    return id;
  }

}

exports.WalletLinkRelayEventManager = WalletLinkRelayEventManager;

/***/ }),

/***/ "./node_modules/walletlink/dist/relay/Web3Method.js":
/*!**********************************************************!*\
  !*** ./node_modules/walletlink/dist/relay/Web3Method.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web3Method = void 0;
var Web3Method;

(function (Web3Method) {
  Web3Method["requestEthereumAccounts"] = "requestEthereumAccounts";
  Web3Method["signEthereumMessage"] = "signEthereumMessage";
  Web3Method["signEthereumTransaction"] = "signEthereumTransaction";
  Web3Method["submitEthereumTransaction"] = "submitEthereumTransaction";
  Web3Method["ethereumAddressFromSignedMessage"] = "ethereumAddressFromSignedMessage";
  Web3Method["scanQRCode"] = "scanQRCode";
  Web3Method["arbitrary"] = "arbitrary";
  Web3Method["childRequestEthereumAccounts"] = "childRequestEthereumAccounts";
})(Web3Method = exports.Web3Method || (exports.Web3Method = {}));

/***/ }),

/***/ "./node_modules/walletlink/dist/relay/Web3RequestCanceledMessage.js":
/*!**************************************************************************!*\
  !*** ./node_modules/walletlink/dist/relay/Web3RequestCanceledMessage.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web3RequestCanceledMessage = void 0;

const RelayMessage_1 = __webpack_require__(/*! ./RelayMessage */ "./node_modules/walletlink/dist/relay/RelayMessage.js");

function Web3RequestCanceledMessage(id) {
  return {
    type: RelayMessage_1.RelayMessageType.WEB3_REQUEST_CANCELED,
    id
  };
}

exports.Web3RequestCanceledMessage = Web3RequestCanceledMessage;

/***/ }),

/***/ "./node_modules/walletlink/dist/relay/Web3RequestMessage.js":
/*!******************************************************************!*\
  !*** ./node_modules/walletlink/dist/relay/Web3RequestMessage.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web3RequestMessage = void 0;

const RelayMessage_1 = __webpack_require__(/*! ./RelayMessage */ "./node_modules/walletlink/dist/relay/RelayMessage.js");

function Web3RequestMessage(params) {
  return Object.assign({
    type: RelayMessage_1.RelayMessageType.WEB3_REQUEST
  }, params);
}

exports.Web3RequestMessage = Web3RequestMessage;

/***/ }),

/***/ "./node_modules/walletlink/dist/relay/Web3Response.js":
/*!************************************************************!*\
  !*** ./node_modules/walletlink/dist/relay/Web3Response.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildRequestEthereumAccountsResponse = exports.isRequestEthereumAccountsResponse = exports.RequestEthereumAccountsResponse = exports.ErrorResponse = void 0;

const Web3Method_1 = __webpack_require__(/*! ./Web3Method */ "./node_modules/walletlink/dist/relay/Web3Method.js");

function ErrorResponse(method, errorMessage) {
  return {
    method,
    errorMessage
  };
}

exports.ErrorResponse = ErrorResponse;

function RequestEthereumAccountsResponse(addresses) {
  return {
    method: Web3Method_1.Web3Method.requestEthereumAccounts,
    result: addresses
  };
}

exports.RequestEthereumAccountsResponse = RequestEthereumAccountsResponse;

function isRequestEthereumAccountsResponse(res) {
  return res && res.method === Web3Method_1.Web3Method.requestEthereumAccounts;
}

exports.isRequestEthereumAccountsResponse = isRequestEthereumAccountsResponse;

function ChildRequestEthereumAccountsResponse(addresses) {
  return {
    method: Web3Method_1.Web3Method.childRequestEthereumAccounts,
    result: addresses
  };
}

exports.ChildRequestEthereumAccountsResponse = ChildRequestEthereumAccountsResponse;

/***/ }),

/***/ "./node_modules/walletlink/dist/relay/Web3ResponseMessage.js":
/*!*******************************************************************!*\
  !*** ./node_modules/walletlink/dist/relay/Web3ResponseMessage.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWeb3ResponseMessage = exports.Web3ResponseMessage = void 0;

const RelayMessage_1 = __webpack_require__(/*! ./RelayMessage */ "./node_modules/walletlink/dist/relay/RelayMessage.js");

function Web3ResponseMessage(params) {
  return Object.assign({
    type: RelayMessage_1.RelayMessageType.WEB3_RESPONSE
  }, params);
}

exports.Web3ResponseMessage = Web3ResponseMessage;

function isWeb3ResponseMessage(msg) {
  return msg && msg.type === RelayMessage_1.RelayMessageType.WEB3_RESPONSE;
}

exports.isWeb3ResponseMessage = isWeb3ResponseMessage;

/***/ }),

/***/ "./node_modules/walletlink/dist/relay/aes256gcm.js":
/*!*********************************************************!*\
  !*** ./node_modules/walletlink/dist/relay/aes256gcm.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) { // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrypt = exports.encrypt = void 0;

const crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "./node_modules/crypto-browserify/index.js"));

function encrypt(plainText, secret) {
  const iv = crypto_1.default.randomBytes(12);
  const cipher = crypto_1.default.createCipheriv("aes-256-gcm", Buffer.from(secret, "hex"), iv);
  const encrypted = Buffer.concat([cipher.update(Buffer.from(plainText, "utf8")), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("hex");
}

exports.encrypt = encrypt;

function decrypt(cipherText, secret) {
  const buf = Buffer.from(cipherText, "hex");
  const iv = buf.slice(0, 12);
  const authTag = buf.slice(12, 28);
  const encrypted = buf.slice(28);
  const decipher = crypto_1.default.createDecipheriv("aes-256-gcm", Buffer.from(secret, "hex"), iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}

exports.decrypt = decrypt;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/walletlink/dist/types.js":
/*!***********************************************!*\
  !*** ./node_modules/walletlink/dist/types.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegExpString = exports.IntNumber = exports.BigIntString = exports.AddressString = exports.HexString = exports.OpaqueType = void 0;

function OpaqueType() {
  return value => value;
}

exports.OpaqueType = OpaqueType;
exports.HexString = OpaqueType();
exports.AddressString = OpaqueType();
exports.BigIntString = OpaqueType();

function IntNumber(num) {
  return Math.floor(num);
}

exports.IntNumber = IntNumber;
exports.RegExpString = OpaqueType();

/***/ }),

/***/ "./node_modules/walletlink/dist/util.js":
/*!**********************************************!*\
  !*** ./node_modules/walletlink/dist/util.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) { // Copyright (c) 2018-2020 WalletLink.org <https://www.walletlink.org/>
// Copyright (c) 2018-2020 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFavicon = exports.range = exports.isBigNumber = exports.ensureParsedJSONObject = exports.ensureBN = exports.ensureRegExpString = exports.ensureIntNumber = exports.ensureBuffer = exports.ensureAddressString = exports.ensureEvenLengthHexString = exports.ensureHexString = exports.isHexString = exports.prepend0x = exports.strip0x = exports.has0xPrefix = exports.hexStringFromIntNumber = exports.intNumberFromHexString = exports.bigIntStringFromBN = exports.hexStringFromBuffer = void 0;

const bn_js_1 = __importDefault(__webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js"));

const types_1 = __webpack_require__(/*! ./types */ "./node_modules/walletlink/dist/types.js");

const INT_STRING_REGEX = /^[0-9]*$/;
const HEXADECIMAL_STRING_REGEX = /^[a-f0-9]*$/;

function hexStringFromBuffer(buf, includePrefix = false) {
  const hex = buf.toString("hex");
  return types_1.HexString(includePrefix ? "0x" + hex : hex);
}

exports.hexStringFromBuffer = hexStringFromBuffer;

function bigIntStringFromBN(bn) {
  return types_1.BigIntString(bn.toString(10));
}

exports.bigIntStringFromBN = bigIntStringFromBN;

function intNumberFromHexString(hex) {
  return types_1.IntNumber(new bn_js_1.default(ensureEvenLengthHexString(hex, false), 16).toNumber());
}

exports.intNumberFromHexString = intNumberFromHexString;

function hexStringFromIntNumber(num) {
  return types_1.HexString("0x" + new bn_js_1.default(num).toString(16));
}

exports.hexStringFromIntNumber = hexStringFromIntNumber;

function has0xPrefix(str) {
  return str.startsWith("0x") || str.startsWith("0X");
}

exports.has0xPrefix = has0xPrefix;

function strip0x(hex) {
  if (has0xPrefix(hex)) {
    return hex.slice(2);
  }

  return hex;
}

exports.strip0x = strip0x;

function prepend0x(hex) {
  if (has0xPrefix(hex)) {
    return "0x" + hex.slice(2);
  }

  return "0x" + hex;
}

exports.prepend0x = prepend0x;

function isHexString(hex) {
  if (typeof hex !== "string") {
    return false;
  }

  const s = strip0x(hex).toLowerCase();
  return HEXADECIMAL_STRING_REGEX.test(s);
}

exports.isHexString = isHexString;

function ensureHexString(hex, includePrefix = false) {
  if (typeof hex === "string") {
    const s = strip0x(hex).toLowerCase();

    if (HEXADECIMAL_STRING_REGEX.test(s)) {
      return types_1.HexString(includePrefix ? "0x" + s : s);
    }
  }

  throw new Error(`"${hex}" is not a hexadecimal string`);
}

exports.ensureHexString = ensureHexString;

function ensureEvenLengthHexString(hex, includePrefix = false) {
  let h = ensureHexString(hex, false);

  if (h.length % 2 === 1) {
    h = types_1.HexString("0" + h);
  }

  return includePrefix ? types_1.HexString("0x" + h) : h;
}

exports.ensureEvenLengthHexString = ensureEvenLengthHexString;

function ensureAddressString(str) {
  if (typeof str === "string") {
    const s = strip0x(str).toLowerCase();

    if (isHexString(s) && s.length === 40) {
      return types_1.AddressString(prepend0x(s));
    }
  }

  throw new Error(`Invalid Ethereum address: ${str}`);
}

exports.ensureAddressString = ensureAddressString;

function ensureBuffer(str) {
  if (Buffer.isBuffer(str)) {
    return str;
  }

  if (typeof str === "string") {
    if (isHexString(str)) {
      const s = ensureEvenLengthHexString(str, false);
      return Buffer.from(s, "hex");
    } else {
      return Buffer.from(str, "utf8");
    }
  }

  throw new Error(`Not binary data: ${str}`);
}

exports.ensureBuffer = ensureBuffer;

function ensureIntNumber(num) {
  if (typeof num === "number" && Number.isInteger(num)) {
    return types_1.IntNumber(num);
  }

  if (typeof num === "string") {
    if (INT_STRING_REGEX.test(num)) {
      return types_1.IntNumber(Number(num));
    }

    if (isHexString(num)) {
      return types_1.IntNumber(new bn_js_1.default(ensureEvenLengthHexString(num, false), 16).toNumber());
    }
  }

  throw new Error(`Not an integer: ${num}`);
}

exports.ensureIntNumber = ensureIntNumber;

function ensureRegExpString(regExp) {
  if (regExp instanceof RegExp) {
    return types_1.RegExpString(regExp.toString());
  }

  throw new Error(`Not a RegExp: ${regExp}`);
}

exports.ensureRegExpString = ensureRegExpString;

function ensureBN(val) {
  if (val != null && (bn_js_1.default.isBN(val) || isBigNumber(val))) {
    return new bn_js_1.default(val.toString(10), 10);
  }

  if (typeof val === "number") {
    return new bn_js_1.default(ensureIntNumber(val));
  }

  if (typeof val === "string") {
    if (INT_STRING_REGEX.test(val)) {
      return new bn_js_1.default(val, 10);
    }

    if (isHexString(val)) {
      return new bn_js_1.default(ensureEvenLengthHexString(val, false), 16);
    }
  }

  throw new Error(`Not an integer: ${val}`);
}

exports.ensureBN = ensureBN;

function ensureParsedJSONObject(val) {
  if (typeof val === "string") {
    return JSON.parse(val);
  }

  if (typeof val === "object") {
    return val;
  }

  throw new Error(`Not a JSON string or an object: ${val}`);
}

exports.ensureParsedJSONObject = ensureParsedJSONObject;

function isBigNumber(val) {
  if (val == null || typeof val.constructor !== "function") {
    return false;
  }

  const {
    constructor
  } = val;
  return typeof constructor.config === "function" && typeof constructor.EUCLID === "number";
}

exports.isBigNumber = isBigNumber;

function range(start, stop) {
  return Array.from({
    length: stop - start
  }, (_, i) => start + i);
}

exports.range = range;

function getFavicon() {
  const el = document.querySelector('link[sizes="192x192"]') || document.querySelector('link[sizes="180x180"]') || document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
  const {
    protocol,
    host
  } = document.location;
  const href = el ? el.getAttribute("href") : null;

  if (!href || href.startsWith("javascript:")) {
    return null;
  }

  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("data:")) {
    return href;
  }

  if (href.startsWith("//")) {
    return protocol + href;
  }

  return `${protocol}//${host}${href}`;
}

exports.getFavicon = getFavicon;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/walletlink/dist/vendor-js/eth-eip712-util/abi.js":
/*!***********************************************************************!*\
  !*** ./node_modules/walletlink/dist/vendor-js/eth-eip712-util/abi.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Extracted from https://github.com/ethereumjs/ethereumjs-abi and stripped out irrelevant code
// Original code licensed under the MIT License - Copyright (c) 2015 Alex Beregszaszi
const util = __webpack_require__(/*! ./util */ "./node_modules/walletlink/dist/vendor-js/eth-eip712-util/util.js");

const BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js"); // Convert from short to canonical names
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
} // Parse N from type<N>


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
    if (util.isHexString(arg)) {
      return new BN(util.stripHexPrefix(arg), 16);
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
} // Encodes a single item (can be dynamic array)
// @returns: Buffer


function encodeSingle(type, arg) {
  var size, num, ret, i;

  if (type === 'address') {
    return encodeSingle('uint160', parseNumber(arg));
  } else if (type === 'bool') {
    return encodeSingle('uint8', arg ? 1 : 0);
  } else if (type === 'string') {
    return encodeSingle('bytes', new Buffer(arg, 'utf8'));
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
    arg = new Buffer(arg);
    ret = Buffer.concat([encodeSingle('uint256', arg.length), arg]);

    if (arg.length % 32 !== 0) {
      ret = Buffer.concat([ret, util.zeros(32 - arg.length % 32)]);
    }

    return ret;
  } else if (type.startsWith('bytes')) {
    size = parseTypeN(type);

    if (size < 1 || size > 32) {
      throw new Error('Invalid bytes<N> width: ' + size);
    }

    return util.setLengthRight(arg, 32);
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


function rawEncode(types, values) {
  var output = [];
  var data = [];
  var headLength = 32 * types.length;

  for (var i in types) {
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
}

function solidityPack(types, values) {
  if (types.length !== values.length) {
    throw new Error('Number of types are not matching the values');
  }

  var size, num;
  var ret = [];

  for (var i = 0; i < types.length; i++) {
    var type = elementaryName(types[i]);
    var value = values[i];

    if (type === 'bytes') {
      ret.push(value);
    } else if (type === 'string') {
      ret.push(new Buffer(value, 'utf8'));
    } else if (type === 'bool') {
      ret.push(new Buffer(value ? '01' : '00', 'hex'));
    } else if (type === 'address') {
      ret.push(util.setLength(value, 20));
    } else if (type.startsWith('bytes')) {
      size = parseTypeN(type);

      if (size < 1 || size > 32) {
        throw new Error('Invalid bytes<N> width: ' + size);
      }

      ret.push(util.setLengthRight(value, size));
    } else if (type.startsWith('uint')) {
      size = parseTypeN(type);

      if (size % 8 || size < 8 || size > 256) {
        throw new Error('Invalid uint<N> width: ' + size);
      }

      num = parseNumber(value);

      if (num.bitLength() > size) {
        throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
      }

      ret.push(num.toArrayLike(Buffer, 'be', size / 8));
    } else if (type.startsWith('int')) {
      size = parseTypeN(type);

      if (size % 8 || size < 8 || size > 256) {
        throw new Error('Invalid int<N> width: ' + size);
      }

      num = parseNumber(value);

      if (num.bitLength() > size) {
        throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
      }

      ret.push(num.toTwos(size).toArrayLike(Buffer, 'be', size / 8));
    } else {
      // FIXME: support all other types
      throw new Error('Unsupported or invalid type: ' + type);
    }
  }

  return Buffer.concat(ret);
}

function soliditySHA3(types, values) {
  return util.keccak(solidityPack(types, values));
}

module.exports = {
  rawEncode,
  solidityPack,
  soliditySHA3
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/walletlink/dist/vendor-js/eth-eip712-util/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/walletlink/dist/vendor-js/eth-eip712-util/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const util = __webpack_require__(/*! ./util */ "./node_modules/walletlink/dist/vendor-js/eth-eip712-util/util.js");

const abi = __webpack_require__(/*! ./abi */ "./node_modules/walletlink/dist/vendor-js/eth-eip712-util/abi.js");

const TYPED_MESSAGE_SCHEMA = {
  type: 'object',
  properties: {
    types: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            type: {
              type: 'string'
            }
          },
          required: ['name', 'type']
        }
      }
    },
    primaryType: {
      type: 'string'
    },
    domain: {
      type: 'object'
    },
    message: {
      type: 'object'
    }
  },
  required: ['types', 'primaryType', 'domain', 'message']
};
/**
 * A collection of utility functions used for signing typed data
 */

const TypedDataUtils = {
  /**
   * Encodes an object by encoding and concatenating each of its members
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of an object
   */
  encodeData(primaryType, data, types, useV4 = true) {
    const encodedTypes = ['bytes32'];
    const encodedValues = [this.hashType(primaryType, types)];

    if (useV4) {
      const encodeField = (name, type, value) => {
        if (types[type] !== undefined) {
          return ['bytes32', value == null ? '0x0000000000000000000000000000000000000000000000000000000000000000' : util.keccak(this.encodeData(type, value, types, useV4))];
        }

        if (value === undefined) throw new Error(`missing value for field ${name} of type ${type}`);

        if (type === 'bytes') {
          return ['bytes32', util.keccak(value)];
        }

        if (type === 'string') {
          // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
          if (typeof value === 'string') {
            value = Buffer.from(value, 'utf8');
          }

          return ['bytes32', util.keccak(value)];
        }

        if (type.lastIndexOf(']') === type.length - 1) {
          const parsedType = type.slice(0, type.lastIndexOf('['));
          const typeValuePairs = value.map(item => encodeField(name, parsedType, item));
          return ['bytes32', util.keccak(abi.rawEncode(typeValuePairs.map(([type]) => type), typeValuePairs.map(([, value]) => value)))];
        }

        return [type, value];
      };

      for (const field of types[primaryType]) {
        const [type, value] = encodeField(field.name, field.type, data[field.name]);
        encodedTypes.push(type);
        encodedValues.push(value);
      }
    } else {
      for (const field of types[primaryType]) {
        let value = data[field.name];

        if (value !== undefined) {
          if (field.type === 'bytes') {
            encodedTypes.push('bytes32');
            value = util.keccak(value);
            encodedValues.push(value);
          } else if (field.type === 'string') {
            encodedTypes.push('bytes32'); // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex

            if (typeof value === 'string') {
              value = Buffer.from(value, 'utf8');
            }

            value = util.keccak(value);
            encodedValues.push(value);
          } else if (types[field.type] !== undefined) {
            encodedTypes.push('bytes32');
            value = util.keccak(this.encodeData(field.type, value, types, useV4));
            encodedValues.push(value);
          } else if (field.type.lastIndexOf(']') === field.type.length - 1) {
            throw new Error('Arrays currently unimplemented in encodeData');
          } else {
            encodedTypes.push(field.type);
            encodedValues.push(value);
          }
        }
      }
    }

    return abi.rawEncode(encodedTypes, encodedValues);
  },

  /**
   * Encodes the type of an object by encoding a comma delimited list of its members
   *
   * @param {string} primaryType - Root type to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of the type of an object
   */
  encodeType(primaryType, types) {
    let result = '';
    let deps = this.findTypeDependencies(primaryType, types).filter(dep => dep !== primaryType);
    deps = [primaryType].concat(deps.sort());

    for (const type of deps) {
      const children = types[type];

      if (!children) {
        throw new Error('No type definition specified: ' + type);
      }

      result += type + '(' + types[type].map(({
        name,
        type
      }) => type + ' ' + name).join(',') + ')';
    }

    return result;
  },

  /**
   * Finds all types within a type defintion object
   *
   * @param {string} primaryType - Root type
   * @param {Object} types - Type definitions
   * @param {Array} results - current set of accumulated types
   * @returns {Array} - Set of all types found in the type definition
   */
  findTypeDependencies(primaryType, types, results = []) {
    primaryType = primaryType.match(/^\w*/)[0];

    if (results.includes(primaryType) || types[primaryType] === undefined) {
      return results;
    }

    results.push(primaryType);

    for (const field of types[primaryType]) {
      for (const dep of this.findTypeDependencies(field.type, types, results)) {
        !results.includes(dep) && results.push(dep);
      }
    }

    return results;
  },

  /**
   * Hashes an object
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to hash
   * @param {Object} types - Type definitions
   * @returns {string} - Hash of an object
   */
  hashStruct(primaryType, data, types, useV4 = true) {
    return util.keccak(this.encodeData(primaryType, data, types, useV4));
  },

  /**
   * Hashes the type of an object
   *
   * @param {string} primaryType - Root type to hash
   * @param {Object} types - Type definitions
   * @returns {string} - Hash of an object
   */
  hashType(primaryType, types) {
    return util.keccak(this.encodeType(primaryType, types));
  },

  /**
   * Removes properties from a message object that are not defined per EIP-712
   *
   * @param {Object} data - typed message object
   * @returns {Object} - typed message object with only allowed fields
   */
  sanitizeData(data) {
    const sanitizedData = {};

    for (const key in TYPED_MESSAGE_SCHEMA.properties) {
      data[key] && (sanitizedData[key] = data[key]);
    }

    if (sanitizedData.types) {
      sanitizedData.types = Object.assign({
        EIP712Domain: []
      }, sanitizedData.types);
    }

    return sanitizedData;
  },

  /**
   * Returns the hash of a typed message as per EIP-712 for signing
   *
   * @param {Object} typedData - Types message data to sign
   * @returns {string} - sha3 hash for signing
   */
  hash(typedData, useV4 = true) {
    const sanitizedData = this.sanitizeData(typedData);
    const parts = [Buffer.from('1901', 'hex')];
    parts.push(this.hashStruct('EIP712Domain', sanitizedData.domain, sanitizedData.types, useV4));

    if (sanitizedData.primaryType !== 'EIP712Domain') {
      parts.push(this.hashStruct(sanitizedData.primaryType, sanitizedData.message, sanitizedData.types, useV4));
    }

    return util.keccak(Buffer.concat(parts));
  }

};
module.exports = {
  TYPED_MESSAGE_SCHEMA,
  TypedDataUtils,
  hashForSignTypedDataLegacy: function (msgParams) {
    return typedSignatureHashLegacy(msgParams.data);
  },
  hashForSignTypedData_v3: function (msgParams) {
    return TypedDataUtils.hash(msgParams.data, false);
  },
  hashForSignTypedData_v4: function (msgParams) {
    return TypedDataUtils.hash(msgParams.data);
  }
};
/**
 * @param typedData - Array of data along with types, as per EIP712.
 * @returns Buffer
 */

function typedSignatureHashLegacy(typedData) {
  const error = new Error('Expect argument to be non-empty array');
  if (typeof typedData !== 'object' || !typedData.length) throw error;
  const data = typedData.map(function (e) {
    return e.type === 'bytes' ? util.toBuffer(e.value) : e.value;
  });
  const types = typedData.map(function (e) {
    return e.type;
  });
  const schema = typedData.map(function (e) {
    if (!e.name) throw error;
    return e.type + ' ' + e.name;
  });
  return abi.soliditySHA3(['bytes32', 'bytes32'], [abi.soliditySHA3(new Array(typedData.length).fill('string'), schema), abi.soliditySHA3(types, data)]);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/walletlink/dist/vendor-js/eth-eip712-util/util.js":
/*!************************************************************************!*\
  !*** ./node_modules/walletlink/dist/vendor-js/eth-eip712-util/util.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Extracted from https://github.com/ethereumjs/ethereumjs-util and stripped out irrelevant code
// Original code licensed under the Mozilla Public License Version 2.0
const createKeccakHash = __webpack_require__(/*! ../keccak */ "./node_modules/walletlink/dist/vendor-js/keccak/index.js");

const BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");
/**
 * Returns a buffer filled with 0s
 * @method zeros
 * @param {Number} bytes  the number of bytes the buffer should be
 * @return {Buffer}
 */


function zeros(bytes) {
  return Buffer.allocUnsafe(bytes).fill(0);
}
/**
 * Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @method setLength
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @param {Boolean} [right=false] whether to start padding form the left or right
 * @return {Buffer|Array}
 */


function setLength(msg, length, right) {
  const buf = zeros(length);
  msg = toBuffer(msg);

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
}
/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @return {Buffer|Array}
 */


function setLengthRight(msg, length) {
  return setLength(msg, length, true);
}
/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.
 * @param {*} v the value
 */


function toBuffer(v) {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v);
    } else if (typeof v === 'string') {
      if (isHexString(v)) {
        v = Buffer.from(padToEven(stripHexPrefix(v)), 'hex');
      } else {
        v = Buffer.from(v);
      }
    } else if (typeof v === 'number') {
      v = intToBuffer(v);
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
}
/**
 * Converts a `Buffer` into a hex `String`
 * @param {Buffer} buf
 * @return {String}
 */


function bufferToHex(buf) {
  buf = toBuffer(buf);
  return '0x' + buf.toString('hex');
}
/**
 * Creates Keccak hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Number} [bits=256] the Keccak width
 * @return {Buffer}
 */


function keccak(a, bits) {
  a = toBuffer(a);
  if (!bits) bits = 256;
  return createKeccakHash('keccak' + bits).update(a).digest();
}

function padToEven(str) {
  return str.length % 2 ? '0' + str : str;
}

function isHexString(str) {
  return typeof str === 'string' && str.match(/^0x[0-9A-Fa-f]*$/);
}

function stripHexPrefix(str) {
  if (typeof str === 'string' && str.startsWith('0x')) {
    return str.slice(2);
  }

  return str;
}

module.exports = {
  zeros,
  setLength,
  setLengthRight,
  isHexString,
  stripHexPrefix,
  toBuffer,
  bufferToHex,
  keccak
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/walletlink/dist/vendor-js/keccak/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/walletlink/dist/vendor-js/keccak/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/api */ "./node_modules/walletlink/dist/vendor-js/keccak/lib/api/index.js")(__webpack_require__(/*! ./lib/keccak */ "./node_modules/walletlink/dist/vendor-js/keccak/lib/keccak.js"));

/***/ }),

/***/ "./node_modules/walletlink/dist/vendor-js/keccak/lib/api/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/walletlink/dist/vendor-js/keccak/lib/api/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const createKeccak = __webpack_require__(/*! ./keccak */ "./node_modules/walletlink/dist/vendor-js/keccak/lib/api/keccak.js");

const createShake = __webpack_require__(/*! ./shake */ "./node_modules/walletlink/dist/vendor-js/keccak/lib/api/shake.js");

module.exports = function (KeccakState) {
  const Keccak = createKeccak(KeccakState);
  const Shake = createShake(KeccakState);
  return function (algorithm, options) {
    const hash = typeof algorithm === 'string' ? algorithm.toLowerCase() : algorithm;

    switch (hash) {
      case 'keccak224':
        return new Keccak(1152, 448, null, 224, options);

      case 'keccak256':
        return new Keccak(1088, 512, null, 256, options);

      case 'keccak384':
        return new Keccak(832, 768, null, 384, options);

      case 'keccak512':
        return new Keccak(576, 1024, null, 512, options);

      case 'sha3-224':
        return new Keccak(1152, 448, 0x06, 224, options);

      case 'sha3-256':
        return new Keccak(1088, 512, 0x06, 256, options);

      case 'sha3-384':
        return new Keccak(832, 768, 0x06, 384, options);

      case 'sha3-512':
        return new Keccak(576, 1024, 0x06, 512, options);

      case 'shake128':
        return new Shake(1344, 256, 0x1f, options);

      case 'shake256':
        return new Shake(1088, 512, 0x1f, options);

      default:
        throw new Error('Invald algorithm: ' + algorithm);
    }
  };
};

/***/ }),

/***/ "./node_modules/walletlink/dist/vendor-js/keccak/lib/api/keccak.js":
/*!*************************************************************************!*\
  !*** ./node_modules/walletlink/dist/vendor-js/keccak/lib/api/keccak.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const {
  Transform
} = __webpack_require__(/*! stream */ "./node_modules/stream-browserify/index.js");

module.exports = KeccakState => class Keccak extends Transform {
  constructor(rate, capacity, delimitedSuffix, hashBitLength, options) {
    super(options);
    this._rate = rate;
    this._capacity = capacity;
    this._delimitedSuffix = delimitedSuffix;
    this._hashBitLength = hashBitLength;
    this._options = options;
    this._state = new KeccakState();

    this._state.initialize(rate, capacity);

    this._finalized = false;
  }

  _transform(chunk, encoding, callback) {
    let error = null;

    try {
      this.update(chunk, encoding);
    } catch (err) {
      error = err;
    }

    callback(error);
  }

  _flush(callback) {
    let error = null;

    try {
      this.push(this.digest());
    } catch (err) {
      error = err;
    }

    callback(error);
  }

  update(data, encoding) {
    if (!Buffer.isBuffer(data) && typeof data !== 'string') throw new TypeError('Data must be a string or a buffer');
    if (this._finalized) throw new Error('Digest already called');
    if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding);

    this._state.absorb(data);

    return this;
  }

  digest(encoding) {
    if (this._finalized) throw new Error('Digest already called');
    this._finalized = true;
    if (this._delimitedSuffix) this._state.absorbLastFewBits(this._delimitedSuffix);

    let digest = this._state.squeeze(this._hashBitLength / 8);

    if (encoding !== undefined) digest = digest.toString(encoding);

    this._resetState();

    return digest;
  } // remove result from memory


  _resetState() {
    this._state.initialize(this._rate, this._capacity);

    return this;
  } // because sometimes we need hash right now and little later


  _clone() {
    const clone = new Keccak(this._rate, this._capacity, this._delimitedSuffix, this._hashBitLength, this._options);

    this._state.copy(clone._state);

    clone._finalized = this._finalized;
    return clone;
  }

};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/walletlink/dist/vendor-js/keccak/lib/api/shake.js":
/*!************************************************************************!*\
  !*** ./node_modules/walletlink/dist/vendor-js/keccak/lib/api/shake.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const {
  Transform
} = __webpack_require__(/*! stream */ "./node_modules/stream-browserify/index.js");

module.exports = KeccakState => class Shake extends Transform {
  constructor(rate, capacity, delimitedSuffix, options) {
    super(options);
    this._rate = rate;
    this._capacity = capacity;
    this._delimitedSuffix = delimitedSuffix;
    this._options = options;
    this._state = new KeccakState();

    this._state.initialize(rate, capacity);

    this._finalized = false;
  }

  _transform(chunk, encoding, callback) {
    let error = null;

    try {
      this.update(chunk, encoding);
    } catch (err) {
      error = err;
    }

    callback(error);
  }

  _flush() {}

  _read(size) {
    this.push(this.squeeze(size));
  }

  update(data, encoding) {
    if (!Buffer.isBuffer(data) && typeof data !== 'string') throw new TypeError('Data must be a string or a buffer');
    if (this._finalized) throw new Error('Squeeze already called');
    if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding);

    this._state.absorb(data);

    return this;
  }

  squeeze(dataByteLength, encoding) {
    if (!this._finalized) {
      this._finalized = true;

      this._state.absorbLastFewBits(this._delimitedSuffix);
    }

    let data = this._state.squeeze(dataByteLength);

    if (encoding !== undefined) data = data.toString(encoding);
    return data;
  }

  _resetState() {
    this._state.initialize(this._rate, this._capacity);

    return this;
  }

  _clone() {
    const clone = new Shake(this._rate, this._capacity, this._delimitedSuffix, this._options);

    this._state.copy(clone._state);

    clone._finalized = this._finalized;
    return clone;
  }

};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/walletlink/dist/vendor-js/keccak/lib/keccak-state-unroll.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/walletlink/dist/vendor-js/keccak/lib/keccak-state-unroll.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const P1600_ROUND_CONSTANTS = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

exports.p1600 = function (s) {
  for (let round = 0; round < 24; ++round) {
    // theta
    const lo0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
    const hi0 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
    const lo1 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
    const hi1 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
    const lo2 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
    const hi2 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
    const lo3 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
    const hi3 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
    const lo4 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
    const hi4 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
    let lo = lo4 ^ (lo1 << 1 | hi1 >>> 31);
    let hi = hi4 ^ (hi1 << 1 | lo1 >>> 31);
    const t1slo0 = s[0] ^ lo;
    const t1shi0 = s[1] ^ hi;
    const t1slo5 = s[10] ^ lo;
    const t1shi5 = s[11] ^ hi;
    const t1slo10 = s[20] ^ lo;
    const t1shi10 = s[21] ^ hi;
    const t1slo15 = s[30] ^ lo;
    const t1shi15 = s[31] ^ hi;
    const t1slo20 = s[40] ^ lo;
    const t1shi20 = s[41] ^ hi;
    lo = lo0 ^ (lo2 << 1 | hi2 >>> 31);
    hi = hi0 ^ (hi2 << 1 | lo2 >>> 31);
    const t1slo1 = s[2] ^ lo;
    const t1shi1 = s[3] ^ hi;
    const t1slo6 = s[12] ^ lo;
    const t1shi6 = s[13] ^ hi;
    const t1slo11 = s[22] ^ lo;
    const t1shi11 = s[23] ^ hi;
    const t1slo16 = s[32] ^ lo;
    const t1shi16 = s[33] ^ hi;
    const t1slo21 = s[42] ^ lo;
    const t1shi21 = s[43] ^ hi;
    lo = lo1 ^ (lo3 << 1 | hi3 >>> 31);
    hi = hi1 ^ (hi3 << 1 | lo3 >>> 31);
    const t1slo2 = s[4] ^ lo;
    const t1shi2 = s[5] ^ hi;
    const t1slo7 = s[14] ^ lo;
    const t1shi7 = s[15] ^ hi;
    const t1slo12 = s[24] ^ lo;
    const t1shi12 = s[25] ^ hi;
    const t1slo17 = s[34] ^ lo;
    const t1shi17 = s[35] ^ hi;
    const t1slo22 = s[44] ^ lo;
    const t1shi22 = s[45] ^ hi;
    lo = lo2 ^ (lo4 << 1 | hi4 >>> 31);
    hi = hi2 ^ (hi4 << 1 | lo4 >>> 31);
    const t1slo3 = s[6] ^ lo;
    const t1shi3 = s[7] ^ hi;
    const t1slo8 = s[16] ^ lo;
    const t1shi8 = s[17] ^ hi;
    const t1slo13 = s[26] ^ lo;
    const t1shi13 = s[27] ^ hi;
    const t1slo18 = s[36] ^ lo;
    const t1shi18 = s[37] ^ hi;
    const t1slo23 = s[46] ^ lo;
    const t1shi23 = s[47] ^ hi;
    lo = lo3 ^ (lo0 << 1 | hi0 >>> 31);
    hi = hi3 ^ (hi0 << 1 | lo0 >>> 31);
    const t1slo4 = s[8] ^ lo;
    const t1shi4 = s[9] ^ hi;
    const t1slo9 = s[18] ^ lo;
    const t1shi9 = s[19] ^ hi;
    const t1slo14 = s[28] ^ lo;
    const t1shi14 = s[29] ^ hi;
    const t1slo19 = s[38] ^ lo;
    const t1shi19 = s[39] ^ hi;
    const t1slo24 = s[48] ^ lo;
    const t1shi24 = s[49] ^ hi; // rho & pi

    const t2slo0 = t1slo0;
    const t2shi0 = t1shi0;
    const t2slo16 = t1shi5 << 4 | t1slo5 >>> 28;
    const t2shi16 = t1slo5 << 4 | t1shi5 >>> 28;
    const t2slo7 = t1slo10 << 3 | t1shi10 >>> 29;
    const t2shi7 = t1shi10 << 3 | t1slo10 >>> 29;
    const t2slo23 = t1shi15 << 9 | t1slo15 >>> 23;
    const t2shi23 = t1slo15 << 9 | t1shi15 >>> 23;
    const t2slo14 = t1slo20 << 18 | t1shi20 >>> 14;
    const t2shi14 = t1shi20 << 18 | t1slo20 >>> 14;
    const t2slo10 = t1slo1 << 1 | t1shi1 >>> 31;
    const t2shi10 = t1shi1 << 1 | t1slo1 >>> 31;
    const t2slo1 = t1shi6 << 12 | t1slo6 >>> 20;
    const t2shi1 = t1slo6 << 12 | t1shi6 >>> 20;
    const t2slo17 = t1slo11 << 10 | t1shi11 >>> 22;
    const t2shi17 = t1shi11 << 10 | t1slo11 >>> 22;
    const t2slo8 = t1shi16 << 13 | t1slo16 >>> 19;
    const t2shi8 = t1slo16 << 13 | t1shi16 >>> 19;
    const t2slo24 = t1slo21 << 2 | t1shi21 >>> 30;
    const t2shi24 = t1shi21 << 2 | t1slo21 >>> 30;
    const t2slo20 = t1shi2 << 30 | t1slo2 >>> 2;
    const t2shi20 = t1slo2 << 30 | t1shi2 >>> 2;
    const t2slo11 = t1slo7 << 6 | t1shi7 >>> 26;
    const t2shi11 = t1shi7 << 6 | t1slo7 >>> 26;
    const t2slo2 = t1shi12 << 11 | t1slo12 >>> 21;
    const t2shi2 = t1slo12 << 11 | t1shi12 >>> 21;
    const t2slo18 = t1slo17 << 15 | t1shi17 >>> 17;
    const t2shi18 = t1shi17 << 15 | t1slo17 >>> 17;
    const t2slo9 = t1shi22 << 29 | t1slo22 >>> 3;
    const t2shi9 = t1slo22 << 29 | t1shi22 >>> 3;
    const t2slo5 = t1slo3 << 28 | t1shi3 >>> 4;
    const t2shi5 = t1shi3 << 28 | t1slo3 >>> 4;
    const t2slo21 = t1shi8 << 23 | t1slo8 >>> 9;
    const t2shi21 = t1slo8 << 23 | t1shi8 >>> 9;
    const t2slo12 = t1slo13 << 25 | t1shi13 >>> 7;
    const t2shi12 = t1shi13 << 25 | t1slo13 >>> 7;
    const t2slo3 = t1slo18 << 21 | t1shi18 >>> 11;
    const t2shi3 = t1shi18 << 21 | t1slo18 >>> 11;
    const t2slo19 = t1shi23 << 24 | t1slo23 >>> 8;
    const t2shi19 = t1slo23 << 24 | t1shi23 >>> 8;
    const t2slo15 = t1slo4 << 27 | t1shi4 >>> 5;
    const t2shi15 = t1shi4 << 27 | t1slo4 >>> 5;
    const t2slo6 = t1slo9 << 20 | t1shi9 >>> 12;
    const t2shi6 = t1shi9 << 20 | t1slo9 >>> 12;
    const t2slo22 = t1shi14 << 7 | t1slo14 >>> 25;
    const t2shi22 = t1slo14 << 7 | t1shi14 >>> 25;
    const t2slo13 = t1slo19 << 8 | t1shi19 >>> 24;
    const t2shi13 = t1shi19 << 8 | t1slo19 >>> 24;
    const t2slo4 = t1slo24 << 14 | t1shi24 >>> 18;
    const t2shi4 = t1shi24 << 14 | t1slo24 >>> 18; // chi

    s[0] = t2slo0 ^ ~t2slo1 & t2slo2;
    s[1] = t2shi0 ^ ~t2shi1 & t2shi2;
    s[10] = t2slo5 ^ ~t2slo6 & t2slo7;
    s[11] = t2shi5 ^ ~t2shi6 & t2shi7;
    s[20] = t2slo10 ^ ~t2slo11 & t2slo12;
    s[21] = t2shi10 ^ ~t2shi11 & t2shi12;
    s[30] = t2slo15 ^ ~t2slo16 & t2slo17;
    s[31] = t2shi15 ^ ~t2shi16 & t2shi17;
    s[40] = t2slo20 ^ ~t2slo21 & t2slo22;
    s[41] = t2shi20 ^ ~t2shi21 & t2shi22;
    s[2] = t2slo1 ^ ~t2slo2 & t2slo3;
    s[3] = t2shi1 ^ ~t2shi2 & t2shi3;
    s[12] = t2slo6 ^ ~t2slo7 & t2slo8;
    s[13] = t2shi6 ^ ~t2shi7 & t2shi8;
    s[22] = t2slo11 ^ ~t2slo12 & t2slo13;
    s[23] = t2shi11 ^ ~t2shi12 & t2shi13;
    s[32] = t2slo16 ^ ~t2slo17 & t2slo18;
    s[33] = t2shi16 ^ ~t2shi17 & t2shi18;
    s[42] = t2slo21 ^ ~t2slo22 & t2slo23;
    s[43] = t2shi21 ^ ~t2shi22 & t2shi23;
    s[4] = t2slo2 ^ ~t2slo3 & t2slo4;
    s[5] = t2shi2 ^ ~t2shi3 & t2shi4;
    s[14] = t2slo7 ^ ~t2slo8 & t2slo9;
    s[15] = t2shi7 ^ ~t2shi8 & t2shi9;
    s[24] = t2slo12 ^ ~t2slo13 & t2slo14;
    s[25] = t2shi12 ^ ~t2shi13 & t2shi14;
    s[34] = t2slo17 ^ ~t2slo18 & t2slo19;
    s[35] = t2shi17 ^ ~t2shi18 & t2shi19;
    s[44] = t2slo22 ^ ~t2slo23 & t2slo24;
    s[45] = t2shi22 ^ ~t2shi23 & t2shi24;
    s[6] = t2slo3 ^ ~t2slo4 & t2slo0;
    s[7] = t2shi3 ^ ~t2shi4 & t2shi0;
    s[16] = t2slo8 ^ ~t2slo9 & t2slo5;
    s[17] = t2shi8 ^ ~t2shi9 & t2shi5;
    s[26] = t2slo13 ^ ~t2slo14 & t2slo10;
    s[27] = t2shi13 ^ ~t2shi14 & t2shi10;
    s[36] = t2slo18 ^ ~t2slo19 & t2slo15;
    s[37] = t2shi18 ^ ~t2shi19 & t2shi15;
    s[46] = t2slo23 ^ ~t2slo24 & t2slo20;
    s[47] = t2shi23 ^ ~t2shi24 & t2shi20;
    s[8] = t2slo4 ^ ~t2slo0 & t2slo1;
    s[9] = t2shi4 ^ ~t2shi0 & t2shi1;
    s[18] = t2slo9 ^ ~t2slo5 & t2slo6;
    s[19] = t2shi9 ^ ~t2shi5 & t2shi6;
    s[28] = t2slo14 ^ ~t2slo10 & t2slo11;
    s[29] = t2shi14 ^ ~t2shi10 & t2shi11;
    s[38] = t2slo19 ^ ~t2slo15 & t2slo16;
    s[39] = t2shi19 ^ ~t2shi15 & t2shi16;
    s[48] = t2slo24 ^ ~t2slo20 & t2slo21;
    s[49] = t2shi24 ^ ~t2shi20 & t2shi21; // iota

    s[0] ^= P1600_ROUND_CONSTANTS[round * 2];
    s[1] ^= P1600_ROUND_CONSTANTS[round * 2 + 1];
  }
};

/***/ }),

/***/ "./node_modules/walletlink/dist/vendor-js/keccak/lib/keccak.js":
/*!*********************************************************************!*\
  !*** ./node_modules/walletlink/dist/vendor-js/keccak/lib/keccak.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const keccakState = __webpack_require__(/*! ./keccak-state-unroll */ "./node_modules/walletlink/dist/vendor-js/keccak/lib/keccak-state-unroll.js");

function Keccak() {
  // much faster than `new Array(50)`
  this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.blockSize = null;
  this.count = 0;
  this.squeezing = false;
}

Keccak.prototype.initialize = function (rate, capacity) {
  for (let i = 0; i < 50; ++i) this.state[i] = 0;

  this.blockSize = rate / 8;
  this.count = 0;
  this.squeezing = false;
};

Keccak.prototype.absorb = function (data) {
  for (let i = 0; i < data.length; ++i) {
    this.state[~~(this.count / 4)] ^= data[i] << 8 * (this.count % 4);
    this.count += 1;

    if (this.count === this.blockSize) {
      keccakState.p1600(this.state);
      this.count = 0;
    }
  }
};

Keccak.prototype.absorbLastFewBits = function (bits) {
  this.state[~~(this.count / 4)] ^= bits << 8 * (this.count % 4);
  if ((bits & 0x80) !== 0 && this.count === this.blockSize - 1) keccakState.p1600(this.state);
  this.state[~~((this.blockSize - 1) / 4)] ^= 0x80 << 8 * ((this.blockSize - 1) % 4);
  keccakState.p1600(this.state);
  this.count = 0;
  this.squeezing = true;
};

Keccak.prototype.squeeze = function (length) {
  if (!this.squeezing) this.absorbLastFewBits(0x01);
  const output = Buffer.alloc(length);

  for (let i = 0; i < length; ++i) {
    output[i] = this.state[~~(this.count / 4)] >>> 8 * (this.count % 4) & 0xff;
    this.count += 1;

    if (this.count === this.blockSize) {
      keccakState.p1600(this.state);
      this.count = 0;
    }
  }

  return output;
};

Keccak.prototype.copy = function (dest) {
  for (let i = 0; i < 50; ++i) dest.state[i] = this.state[i];

  dest.blockSize = this.blockSize;
  dest.count = this.count;
  dest.squeezing = this.squeezing;
};

module.exports = Keccak;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/walletlink/dist/vendor-js/qrcode-svg/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/walletlink/dist/vendor-js/qrcode-svg/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @fileoverview
 * - modified davidshimjs/qrcodejs library for use in node.js
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 *
 * @version 0.9.1 (2016-02-12)
 * @author davidshimjs, papnkukn
 * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
 * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
 * @see <a href="https://github.com/davidshimjs/qrcodejs" target="_blank">https://github.com/davidshimjs/qrcodejs</a>
 */
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
function QR8bitByte(data) {
  this.mode = QRMode.MODE_8BIT_BYTE;
  this.data = data;
  this.parsedData = []; // Added to support UTF-8 Characters

  for (var i = 0, l = this.data.length; i < l; i++) {
    var byteArray = [];
    var code = this.data.charCodeAt(i);

    if (code > 0x10000) {
      byteArray[0] = 0xF0 | (code & 0x1C0000) >>> 18;
      byteArray[1] = 0x80 | (code & 0x3F000) >>> 12;
      byteArray[2] = 0x80 | (code & 0xFC0) >>> 6;
      byteArray[3] = 0x80 | code & 0x3F;
    } else if (code > 0x800) {
      byteArray[0] = 0xE0 | (code & 0xF000) >>> 12;
      byteArray[1] = 0x80 | (code & 0xFC0) >>> 6;
      byteArray[2] = 0x80 | code & 0x3F;
    } else if (code > 0x80) {
      byteArray[0] = 0xC0 | (code & 0x7C0) >>> 6;
      byteArray[1] = 0x80 | code & 0x3F;
    } else {
      byteArray[0] = code;
    }

    this.parsedData.push(byteArray);
  }

  this.parsedData = Array.prototype.concat.apply([], this.parsedData);

  if (this.parsedData.length != this.data.length) {
    this.parsedData.unshift(191);
    this.parsedData.unshift(187);
    this.parsedData.unshift(239);
  }
}

QR8bitByte.prototype = {
  getLength: function (buffer) {
    return this.parsedData.length;
  },
  write: function (buffer) {
    for (var i = 0, l = this.parsedData.length; i < l; i++) {
      buffer.put(this.parsedData[i], 8);
    }
  }
};

function QRCodeModel(typeNumber, errorCorrectLevel) {
  this.typeNumber = typeNumber;
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null;
  this.moduleCount = 0;
  this.dataCache = null;
  this.dataList = [];
}

QRCodeModel.prototype = {
  addData: function (data) {
    var newData = new QR8bitByte(data);
    this.dataList.push(newData);
    this.dataCache = null;
  },
  isDark: function (row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      throw new Error(row + "," + col);
    }

    return this.modules[row][col];
  },
  getModuleCount: function () {
    return this.moduleCount;
  },
  make: function () {
    this.makeImpl(false, this.getBestMaskPattern());
  },
  makeImpl: function (test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);

    for (var row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount);

      for (var col = 0; col < this.moduleCount; col++) {
        this.modules[row][col] = null;
      }
    }

    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(test, maskPattern);

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(test);
    }

    if (this.dataCache == null) {
      this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
    }

    this.mapData(this.dataCache, maskPattern);
  },
  setupPositionProbePattern: function (row, col) {
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;

      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;

        if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  },
  getBestMaskPattern: function () {
    var minLostPoint = 0;
    var pattern = 0;

    for (var i = 0; i < 8; i++) {
      this.makeImpl(true, i);
      var lostPoint = QRUtil.getLostPoint(this);

      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }

    return pattern;
  },
  createMovieClip: function (target_mc, instance_name, depth) {
    var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
    var cs = 1;
    this.make();

    for (var row = 0; row < this.modules.length; row++) {
      var y = row * cs;

      for (var col = 0; col < this.modules[row].length; col++) {
        var x = col * cs;
        var dark = this.modules[row][col];

        if (dark) {
          qr_mc.beginFill(0, 100);
          qr_mc.moveTo(x, y);
          qr_mc.lineTo(x + cs, y);
          qr_mc.lineTo(x + cs, y + cs);
          qr_mc.lineTo(x, y + cs);
          qr_mc.endFill();
        }
      }
    }

    return qr_mc;
  },
  setupTimingPattern: function () {
    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }

      this.modules[r][6] = r % 2 == 0;
    }

    for (var c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules[6][c] != null) {
        continue;
      }

      this.modules[6][c] = c % 2 == 0;
    }
  },
  setupPositionAdjustPattern: function () {
    var pos = QRUtil.getPatternPosition(this.typeNumber);

    for (var i = 0; i < pos.length; i++) {
      for (var j = 0; j < pos.length; j++) {
        var row = pos[i];
        var col = pos[j];

        if (this.modules[row][col] != null) {
          continue;
        }

        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  },
  setupTypeNumber: function (test) {
    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

    for (var i = 0; i < 18; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
    }

    for (var i = 0; i < 18; i++) {
      var mod = !test && (bits >> i & 1) == 1;
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  setupTypeInfo: function (test, maskPattern) {
    var data = this.errorCorrectLevel << 3 | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data);

    for (var i = 0; i < 15; i++) {
      var mod = !test && (bits >> i & 1) == 1;

      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }
    }

    for (var i = 0; i < 15; i++) {
      var mod = !test && (bits >> i & 1) == 1;

      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }

    this.modules[this.moduleCount - 8][8] = !test;
  },
  mapData: function (data, maskPattern) {
    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;

    for (var col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;

      while (true) {
        for (var c = 0; c < 2; c++) {
          if (this.modules[row][col - c] == null) {
            var dark = false;

            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) == 1;
            }

            var mask = QRUtil.getMask(maskPattern, row, col - c);

            if (mask) {
              dark = !dark;
            }

            this.modules[row][col - c] = dark;
            bitIndex--;

            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }

        row += inc;

        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }
};
QRCodeModel.PAD0 = 0xEC;
QRCodeModel.PAD1 = 0x11;

QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
  var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
  var buffer = new QRBitBuffer();

  for (var i = 0; i < dataList.length; i++) {
    var data = dataList[i];
    buffer.put(data.mode, 4);
    buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
    data.write(buffer);
  }

  var totalDataCount = 0;

  for (var i = 0; i < rsBlocks.length; i++) {
    totalDataCount += rsBlocks[i].dataCount;
  }

  if (buffer.getLengthInBits() > totalDataCount * 8) {
    throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
  }

  if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
    buffer.put(0, 4);
  }

  while (buffer.getLengthInBits() % 8 != 0) {
    buffer.putBit(false);
  }

  while (true) {
    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }

    buffer.put(QRCodeModel.PAD0, 8);

    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }

    buffer.put(QRCodeModel.PAD1, 8);
  }

  return QRCodeModel.createBytes(buffer, rsBlocks);
};

QRCodeModel.createBytes = function (buffer, rsBlocks) {
  var offset = 0;
  var maxDcCount = 0;
  var maxEcCount = 0;
  var dcdata = new Array(rsBlocks.length);
  var ecdata = new Array(rsBlocks.length);

  for (var r = 0; r < rsBlocks.length; r++) {
    var dcCount = rsBlocks[r].dataCount;
    var ecCount = rsBlocks[r].totalCount - dcCount;
    maxDcCount = Math.max(maxDcCount, dcCount);
    maxEcCount = Math.max(maxEcCount, ecCount);
    dcdata[r] = new Array(dcCount);

    for (var i = 0; i < dcdata[r].length; i++) {
      dcdata[r][i] = 0xff & buffer.buffer[i + offset];
    }

    offset += dcCount;
    var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
    var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
    var modPoly = rawPoly.mod(rsPoly);
    ecdata[r] = new Array(rsPoly.getLength() - 1);

    for (var i = 0; i < ecdata[r].length; i++) {
      var modIndex = i + modPoly.getLength() - ecdata[r].length;
      ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
    }
  }

  var totalCodeCount = 0;

  for (var i = 0; i < rsBlocks.length; i++) {
    totalCodeCount += rsBlocks[i].totalCount;
  }

  var data = new Array(totalCodeCount);
  var index = 0;

  for (var i = 0; i < maxDcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < dcdata[r].length) {
        data[index++] = dcdata[r][i];
      }
    }
  }

  for (var i = 0; i < maxEcCount; i++) {
    for (var r = 0; r < rsBlocks.length; r++) {
      if (i < ecdata[r].length) {
        data[index++] = ecdata[r][i];
      }
    }
  }

  return data;
};

var QRMode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
};
var QRErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
var QRUtil = {
  PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
  G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  getBCHTypeInfo: function (data) {
    var d = data << 10;

    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
    }

    return (data << 10 | d) ^ QRUtil.G15_MASK;
  },
  getBCHTypeNumber: function (data) {
    var d = data << 12;

    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
    }

    return data << 12 | d;
  },
  getBCHDigit: function (data) {
    var digit = 0;

    while (data != 0) {
      digit++;
      data >>>= 1;
    }

    return digit;
  },
  getPatternPosition: function (typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  getMask: function (maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 == 0;

      case QRMaskPattern.PATTERN001:
        return i % 2 == 0;

      case QRMaskPattern.PATTERN010:
        return j % 3 == 0;

      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 == 0;

      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;

      case QRMaskPattern.PATTERN101:
        return i * j % 2 + i * j % 3 == 0;

      case QRMaskPattern.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 == 0;

      case QRMaskPattern.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 == 0;

      default:
        throw new Error("bad maskPattern:" + maskPattern);
    }
  },
  getErrorCorrectPolynomial: function (errorCorrectLength) {
    var a = new QRPolynomial([1], 0);

    for (var i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }

    return a;
  },
  getLengthInBits: function (mode, type) {
    if (1 <= type && type < 10) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 10;

        case QRMode.MODE_ALPHA_NUM:
          return 9;

        case QRMode.MODE_8BIT_BYTE:
          return 8;

        case QRMode.MODE_KANJI:
          return 8;

        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 27) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 12;

        case QRMode.MODE_ALPHA_NUM:
          return 11;

        case QRMode.MODE_8BIT_BYTE:
          return 16;

        case QRMode.MODE_KANJI:
          return 10;

        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 41) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 14;

        case QRMode.MODE_ALPHA_NUM:
          return 13;

        case QRMode.MODE_8BIT_BYTE:
          return 16;

        case QRMode.MODE_KANJI:
          return 12;

        default:
          throw new Error("mode:" + mode);
      }
    } else {
      throw new Error("type:" + type);
    }
  },
  getLostPoint: function (qrCode) {
    var moduleCount = qrCode.getModuleCount();
    var lostPoint = 0;

    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount; col++) {
        var sameCount = 0;
        var dark = qrCode.isDark(row, col);

        for (var r = -1; r <= 1; r++) {
          if (row + r < 0 || moduleCount <= row + r) {
            continue;
          }

          for (var c = -1; c <= 1; c++) {
            if (col + c < 0 || moduleCount <= col + c) {
              continue;
            }

            if (r == 0 && c == 0) {
              continue;
            }

            if (dark == qrCode.isDark(row + r, col + c)) {
              sameCount++;
            }
          }
        }

        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5;
        }
      }
    }

    for (var row = 0; row < moduleCount - 1; row++) {
      for (var col = 0; col < moduleCount - 1; col++) {
        var count = 0;
        if (qrCode.isDark(row, col)) count++;
        if (qrCode.isDark(row + 1, col)) count++;
        if (qrCode.isDark(row, col + 1)) count++;
        if (qrCode.isDark(row + 1, col + 1)) count++;

        if (count == 0 || count == 4) {
          lostPoint += 3;
        }
      }
    }

    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount - 6; col++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
          lostPoint += 40;
        }
      }
    }

    for (var col = 0; col < moduleCount; col++) {
      for (var row = 0; row < moduleCount - 6; row++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
          lostPoint += 40;
        }
      }
    }

    var darkCount = 0;

    for (var col = 0; col < moduleCount; col++) {
      for (var row = 0; row < moduleCount; row++) {
        if (qrCode.isDark(row, col)) {
          darkCount++;
        }
      }
    }

    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  }
};
var QRMath = {
  glog: function (n) {
    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }

    return QRMath.LOG_TABLE[n];
  },
  gexp: function (n) {
    while (n < 0) {
      n += 255;
    }

    while (n >= 256) {
      n -= 255;
    }

    return QRMath.EXP_TABLE[n];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
};

for (var i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}

for (var i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}

for (var i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}

function QRPolynomial(num, shift) {
  if (num.length == undefined) {
    throw new Error(num.length + "/" + shift);
  }

  var offset = 0;

  while (offset < num.length && num[offset] == 0) {
    offset++;
  }

  this.num = new Array(num.length - offset + shift);

  for (var i = 0; i < num.length - offset; i++) {
    this.num[i] = num[i + offset];
  }
}

QRPolynomial.prototype = {
  get: function (index) {
    return this.num[index];
  },
  getLength: function () {
    return this.num.length;
  },
  multiply: function (e) {
    var num = new Array(this.getLength() + e.getLength() - 1);

    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }

    return new QRPolynomial(num, 0);
  },
  mod: function (e) {
    if (this.getLength() - e.getLength() < 0) {
      return this;
    }

    var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
    var num = new Array(this.getLength());

    for (var i = 0; i < this.getLength(); i++) {
      num[i] = this.get(i);
    }

    for (var i = 0; i < e.getLength(); i++) {
      num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
    }

    return new QRPolynomial(num, 0).mod(e);
  }
};

function QRRSBlock(totalCount, dataCount) {
  this.totalCount = totalCount;
  this.dataCount = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];

QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
  var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

  if (rsBlock == undefined) {
    throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
  }

  var length = rsBlock.length / 3;
  var list = [];

  for (var i = 0; i < length; i++) {
    var count = rsBlock[i * 3 + 0];
    var totalCount = rsBlock[i * 3 + 1];
    var dataCount = rsBlock[i * 3 + 2];

    for (var j = 0; j < count; j++) {
      list.push(new QRRSBlock(totalCount, dataCount));
    }
  }

  return list;
};

QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
  switch (errorCorrectLevel) {
    case QRErrorCorrectLevel.L:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];

    case QRErrorCorrectLevel.M:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];

    case QRErrorCorrectLevel.Q:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];

    case QRErrorCorrectLevel.H:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];

    default:
      return undefined;
  }
};

function QRBitBuffer() {
  this.buffer = [];
  this.length = 0;
}

QRBitBuffer.prototype = {
  get: function (index) {
    var bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
  },
  put: function (num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) == 1);
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
var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
/** Constructor */

function QRCode(options) {
  var instance = this; //Default options

  this.options = {
    padding: 4,
    width: 256,
    height: 256,
    typeNumber: 4,
    color: "#000000",
    background: "#ffffff",
    ecl: "M",
    image: {
      svg: "",
      width: 0,
      height: 0
    }
  }; //In case the options is string

  if (typeof options === 'string') {
    options = {
      content: options
    };
  } //Merge options


  if (options) {
    for (var i in options) {
      this.options[i] = options[i];
    }
  }

  if (typeof this.options.content !== 'string') {
    throw new Error("Expected 'content' as string!");
  }

  if (this.options.content.length === 0
  /* || this.options.content.length > 7089 */
  ) {
      throw new Error("Expected 'content' to be non-empty!");
    }

  if (!(this.options.padding >= 0)) {
    throw new Error("Expected 'padding' value to be non-negative!");
  }

  if (!(this.options.width > 0) || !(this.options.height > 0)) {
    throw new Error("Expected 'width' or 'height' value to be higher than zero!");
  } //Gets the error correction level


  function _getErrorCorrectLevel(ecl) {
    switch (ecl) {
      case "L":
        return QRErrorCorrectLevel.L;

      case "M":
        return QRErrorCorrectLevel.M;

      case "Q":
        return QRErrorCorrectLevel.Q;

      case "H":
        return QRErrorCorrectLevel.H;

      default:
        throw new Error("Unknwon error correction level: " + ecl);
    }
  } //Get type number


  function _getTypeNumber(content, ecl) {
    var length = _getUTF8Length(content);

    var type = 1;
    var limit = 0;

    for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
      var table = QRCodeLimitLength[i];

      if (!table) {
        throw new Error("Content too long: expected " + limit + " but got " + length);
      }

      switch (ecl) {
        case "L":
          limit = table[0];
          break;

        case "M":
          limit = table[1];
          break;

        case "Q":
          limit = table[2];
          break;

        case "H":
          limit = table[3];
          break;

        default:
          throw new Error("Unknwon error correction level: " + ecl);
      }

      if (length <= limit) {
        break;
      }

      type++;
    }

    if (type > QRCodeLimitLength.length) {
      throw new Error("Content too long");
    }

    return type;
  } //Gets text length


  function _getUTF8Length(content) {
    var result = encodeURI(content).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
    return result.length + (result.length != content ? 3 : 0);
  } //Generate QR Code matrix


  var content = this.options.content;

  var type = _getTypeNumber(content, this.options.ecl);

  var ecl = _getErrorCorrectLevel(this.options.ecl);

  this.qrcode = new QRCodeModel(type, ecl);
  this.qrcode.addData(content);
  this.qrcode.make();
}
/** Generates QR Code as SVG image */


QRCode.prototype.svg = function (opt) {
  var options = this.options || {};
  var modules = this.qrcode.modules;

  if (typeof opt == "undefined") {
    opt = {
      container: options.container || "svg"
    };
  } //Apply new lines and indents in SVG?


  var pretty = typeof options.pretty != "undefined" ? !!options.pretty : true;
  var indent = pretty ? '  ' : '';
  var EOL = pretty ? '\r\n' : '';
  var width = options.width;
  var height = options.height;
  var length = modules.length;
  var xsize = width / (length + 2 * options.padding);
  var ysize = height / (length + 2 * options.padding); //Join (union, merge) rectangles into one shape?

  var join = typeof options.join != "undefined" ? !!options.join : false; //Swap the X and Y modules, pull request #2

  var swap = typeof options.swap != "undefined" ? !!options.swap : false; //Apply <?xml...?> declaration in SVG?

  var xmlDeclaration = typeof options.xmlDeclaration != "undefined" ? !!options.xmlDeclaration : true; //Populate with predefined shape instead of "rect" elements, thanks to @kkocdko

  var predefined = typeof options.predefined != "undefined" ? !!options.predefined : false;
  var defs = predefined ? indent + '<defs><path id="qrmodule" d="M0 0 h' + ysize + ' v' + xsize + ' H0 z" style="fill:' + options.color + ';shape-rendering:crispEdges;" /></defs>' + EOL : ''; //Background rectangle

  var bgrect = indent + '<rect x="0" y="0" width="' + width + '" height="' + height + '" style="fill:' + options.background + ';shape-rendering:crispEdges;"/>' + EOL; //Rectangles representing modules

  var modrect = '';
  var pathdata = '';

  for (var y = 0; y < length; y++) {
    for (var x = 0; x < length; x++) {
      var module = modules[x][y];

      if (module) {
        var px = x * xsize + options.padding * xsize;
        var py = y * ysize + options.padding * ysize; //Some users have had issues with the QR Code, thanks to @danioso for the solution

        if (swap) {
          var t = px;
          px = py;
          py = t;
        }

        if (join) {
          //Module as a part of svg path data, thanks to @danioso
          var w = xsize + px;
          var h = ysize + py;
          px = Number.isInteger(px) ? Number(px) : px.toFixed(2);
          py = Number.isInteger(py) ? Number(py) : py.toFixed(2);
          w = Number.isInteger(w) ? Number(w) : w.toFixed(2);
          h = Number.isInteger(h) ? Number(h) : h.toFixed(2);
          pathdata += 'M' + px + ',' + py + ' V' + h + ' H' + w + ' V' + py + ' H' + px + ' Z ';
        } else if (predefined) {
          //Module as a predefined shape, thanks to @kkocdko
          modrect += indent + '<use x="' + px.toString() + '" y="' + py.toString() + '" href="#qrmodule" />' + EOL;
        } else {
          //Module as rectangle element
          modrect += indent + '<rect x="' + px.toString() + '" y="' + py.toString() + '" width="' + xsize + '" height="' + ysize + '" style="fill:' + options.color + ';shape-rendering:crispEdges;"/>' + EOL;
        }
      }
    }
  }

  if (join) {
    modrect = indent + '<path x="0" y="0" style="fill:' + options.color + ';shape-rendering:crispEdges;" d="' + pathdata + '" />';
  }

  let imgSvg = "";

  if (this.options.image !== undefined && this.options.image.svg) {
    const imgWidth = width * this.options.image.width / 100;
    const imgHeight = height * this.options.image.height / 100;
    const imgX = width / 2 - imgWidth / 2;
    const imgY = height / 2 - imgHeight / 2;
    imgSvg += `<svg x="${imgX}" y="${imgY}" width="${imgWidth}" height="${imgHeight}" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">`;
    imgSvg += this.options.image.svg + EOL;
    imgSvg += '</svg>';
  }

  var svg = "";

  switch (opt.container) {
    //Wrapped in SVG document
    case "svg":
      if (xmlDeclaration) {
        svg += '<?xml version="1.0" standalone="yes"?>' + EOL;
      }

      svg += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + width + '" height="' + height + '">' + EOL;
      svg += defs + bgrect + modrect;
      svg += imgSvg;
      svg += '</svg>';
      break;
    //Viewbox for responsive use in a browser, thanks to @danioso

    case "svg-viewbox":
      if (xmlDeclaration) {
        svg += '<?xml version="1.0" standalone="yes"?>' + EOL;
      }

      svg += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' + width + ' ' + height + '">' + EOL;
      svg += defs + bgrect + modrect;
      svg += imgSvg;
      svg += '</svg>';
      break;
    //Wrapped in group element

    case "g":
      svg += '<g width="' + width + '" height="' + height + '">' + EOL;
      svg += defs + bgrect + modrect;
      svg += imgSvg;
      svg += '</g>';
      break;
    //Without a container

    default:
      svg += (defs + bgrect + modrect + imgSvg).replace(/^\s+/, ""); //Clear indents on each line

      break;
  }

  return svg;
};

module.exports = QRCode;

/***/ }),

/***/ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/classes.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/walletlink/node_modules/eth-rpc-errors/dist/classes.js ***!
  \*****************************************************************************/
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

/***/ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/error-constants.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/walletlink/node_modules/eth-rpc-errors/dist/error-constants.js ***!
  \*************************************************************************************/
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

/***/ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/errors.js":
/*!****************************************************************************!*\
  !*** ./node_modules/walletlink/node_modules/eth-rpc-errors/dist/errors.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ethErrors = void 0;

const classes_1 = __webpack_require__(/*! ./classes */ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/classes.js");

const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/utils.js");

const error_constants_1 = __webpack_require__(/*! ./error-constants */ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/error-constants.js");

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

/***/ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/walletlink/node_modules/eth-rpc-errors/dist/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessageFromCode = exports.serializeError = exports.EthereumProviderError = exports.EthereumRpcError = exports.ethErrors = exports.errorCodes = void 0;

const classes_1 = __webpack_require__(/*! ./classes */ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/classes.js");

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

const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/utils.js");

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

const errors_1 = __webpack_require__(/*! ./errors */ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/errors.js");

Object.defineProperty(exports, "ethErrors", {
  enumerable: true,
  get: function () {
    return errors_1.ethErrors;
  }
});

const error_constants_1 = __webpack_require__(/*! ./error-constants */ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/error-constants.js");

Object.defineProperty(exports, "errorCodes", {
  enumerable: true,
  get: function () {
    return error_constants_1.errorCodes;
  }
});

/***/ }),

/***/ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/utils.js":
/*!***************************************************************************!*\
  !*** ./node_modules/walletlink/node_modules/eth-rpc-errors/dist/utils.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeError = exports.isValidCode = exports.getMessageFromCode = exports.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;

const error_constants_1 = __webpack_require__(/*! ./error-constants */ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/error-constants.js");

const classes_1 = __webpack_require__(/*! ./classes */ "./node_modules/walletlink/node_modules/eth-rpc-errors/dist/classes.js");

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

/***/ "./node_modules/walletlink/node_modules/preact/dist/preact.module.js":
/*!***************************************************************************!*\
  !*** ./node_modules/walletlink/node_modules/preact/dist/preact.module.js ***!
  \***************************************************************************/
/*! exports provided: render, hydrate, createElement, h, Fragment, createRef, isValidElement, Component, cloneElement, createContext, toChildArray, options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return N; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return O; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toChildArray", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return n; });
var n,
    l,
    u,
    i,
    t,
    o,
    r = {},
    f = [],
    e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

function c(n, l) {
  for (var u in l) n[u] = l[u];

  return n;
}

function s(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function a(n, l, u) {
  var i,
      t,
      o,
      r = arguments,
      f = {};

  for (o in l) "key" == o ? i = l[o] : "ref" == o ? t = l[o] : f[o] = l[o];

  if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) u.push(r[o]);
  if (null != u && (f.children = u), "function" == typeof n && null != n.defaultProps) for (o in n.defaultProps) void 0 === f[o] && (f[o] = n.defaultProps[o]);
  return v(n, f, i, t, null);
}

function v(l, u, i, t, o) {
  var r = {
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
    __h: null,
    constructor: void 0,
    __v: null == o ? ++n.__v : o
  };
  return null != n.vnode && n.vnode(r), r;
}

function h() {
  return {
    current: null
  };
}

function y(n) {
  return n.children;
}

function p(n, l) {
  this.props = n, this.context = l;
}

function d(n, l) {
  if (null == l) return n.__ ? d(n.__, n.__.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

  return "function" == typeof n.type ? d(n) : null;
}

function _(n) {
  var l, u;

  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
      n.__e = n.__c.base = u.__e;
      break;
    }

    return _(n);
  }
}

function k(l) {
  (!l.__d && (l.__d = !0) && u.push(l) && !b.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(b);
}

function b() {
  for (var n; b.__r = u.length;) n = u.sort(function (n, l) {
    return n.__v.__b - l.__v.__b;
  }), u = [], n.some(function (n) {
    var l, u, i, t, o, r;
    n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = c({}, t)).__v = t.__v + 1, I(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [o] : null, u, null == o ? d(t) : o, t.__h), T(u, t), t.__e != o && _(t)));
  });
}

function m(n, l, u, i, t, o, e, c, s, a) {
  var h,
      p,
      _,
      k,
      b,
      m,
      w,
      A = i && i.__k || f,
      P = A.length;

  for (u.__k = [], h = 0; h < l.length; h++) if (null != (k = u.__k[h] = null == (k = l[h]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k || "bigint" == typeof k ? v(null, k, null, null, k) : Array.isArray(k) ? v(y, {
    children: k
  }, null, null, null) : k.__b > 0 ? v(k.type, k.props, k.key, null, k.__v) : k)) {
    if (k.__ = u, k.__b = u.__b + 1, null === (_ = A[h]) || _ && k.key == _.key && k.type === _.type) A[h] = void 0;else for (p = 0; p < P; p++) {
      if ((_ = A[p]) && k.key == _.key && k.type === _.type) {
        A[p] = void 0;
        break;
      }

      _ = null;
    }
    I(n, k, _ = _ || r, t, o, e, c, s, a), b = k.__e, (p = k.ref) && _.ref != p && (w || (w = []), _.ref && w.push(_.ref, null, k), w.push(p, k.__c || b, k)), null != b ? (null == m && (m = b), "function" == typeof k.type && null != k.__k && k.__k === _.__k ? k.__d = s = g(k, s, n) : s = x(n, k, _, A, b, s), a || "option" !== u.type ? "function" == typeof u.type && (u.__d = s) : n.value = "") : s && _.__e == s && s.parentNode != n && (s = d(_));
  }

  for (u.__e = m, h = P; h--;) null != A[h] && ("function" == typeof u.type && null != A[h].__e && A[h].__e == u.__d && (u.__d = d(i, h + 1)), L(A[h], A[h]));

  if (w) for (h = 0; h < w.length; h++) z(w[h], w[++h], w[++h]);
}

function g(n, l, u) {
  var i, t;

  for (i = 0; i < n.__k.length; i++) (t = n.__k[i]) && (t.__ = n, l = "function" == typeof t.type ? g(t, l, u) : x(u, t, t, n.__k, t.__e, l));

  return l;
}

function w(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    w(n, l);
  }) : l.push(n)), l;
}

function x(n, l, u, i, t, o) {
  var r, f, e;
  if (void 0 !== l.__d) r = l.__d, l.__d = void 0;else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), r = null;else {
    for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2) if (f == t) break n;

    n.insertBefore(t, o), r = o;
  }
  return void 0 !== r ? r : t.nextSibling;
}

function A(n, l, u, i, t) {
  var o;

  for (o in u) "children" === o || "key" === o || o in l || C(n, o, null, u[o], i);

  for (o in l) t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || C(n, o, l[o], u[o], i);
}

function P(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || e.test(l) ? u : u + "px";
}

function C(n, l, u, i, t) {
  var o;

  n: if ("style" === l) {
    if ("string" == typeof u) n.style.cssText = u;else {
      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) u && l in u || P(n.style, l, "");
      if (u) for (l in u) i && u[l] === i[l] || P(n.style, l, u[l]);
    }
  } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? H : $, o) : n.removeEventListener(l, o ? H : $, o);else if ("dangerouslySetInnerHTML" !== l) {
    if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
      n[l] = null == u ? "" : u;
      break n;
    } catch (n) {}
    "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
  }
}

function $(l) {
  this.l[l.type + !1](n.event ? n.event(l) : l);
}

function H(l) {
  this.l[l.type + !0](n.event ? n.event(l) : l);
}

function I(l, u, i, t, o, r, f, e, s) {
  var a,
      v,
      h,
      d,
      _,
      k,
      b,
      g,
      w,
      x,
      A,
      P = u.type;

  if (void 0 !== u.constructor) return null;
  null != i.__h && (s = i.__h, e = u.__e = i.__e, u.__h = null, r = [e]), (a = n.__b) && a(u);

  try {
    n: if ("function" == typeof P) {
      if (g = u.props, w = (a = P.contextType) && t[a.__c], x = a ? w ? w.props.value : a.__ : t, i.__c ? b = (v = u.__c = i.__c).__ = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(g, x) : (u.__c = v = new p(g, x), v.constructor = P, v.render = M), w && w.sub(v), v.props = g, v.state || (v.state = {}), v.context = x, v.__n = t, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != P.getDerivedStateFromProps && (v.__s == v.state && (v.__s = c({}, v.__s)), c(v.__s, P.getDerivedStateFromProps(g, v.__s))), d = v.props, _ = v.state, h) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && v.__h.push(v.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && g !== d && null != v.componentWillReceiveProps && v.componentWillReceiveProps(g, x), !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(g, v.__s, x) || u.__v === i.__v) {
          v.props = g, v.state = v.__s, u.__v !== i.__v && (v.__d = !1), v.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
            n && (n.__ = u);
          }), v.__h.length && f.push(v);
          break n;
        }

        null != v.componentWillUpdate && v.componentWillUpdate(g, v.__s, x), null != v.componentDidUpdate && v.__h.push(function () {
          v.componentDidUpdate(d, _, k);
        });
      }
      v.context = x, v.props = g, v.state = v.__s, (a = n.__r) && a(u), v.__d = !1, v.__v = u, v.__P = l, a = v.render(v.props, v.state, v.context), v.state = v.__s, null != v.getChildContext && (t = c(c({}, t), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (k = v.getSnapshotBeforeUpdate(d, _)), A = null != a && a.type === y && null == a.key ? a.props.children : a, m(l, Array.isArray(A) ? A : [A], u, i, t, o, r, f, e, s), v.base = u.__e, u.__h = null, v.__h.length && f.push(v), b && (v.__E = v.__ = null), v.__e = !1;
    } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = j(i.__e, u, i, t, o, r, f, s);

    (a = n.diffed) && a(u);
  } catch (l) {
    u.__v = null, (s || null != r) && (u.__e = e, u.__h = !!s, r[r.indexOf(e)] = null), n.__e(l, u, i);
  }
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

function j(n, l, u, i, t, o, e, c) {
  var a,
      v,
      h,
      y,
      p = u.props,
      d = l.props,
      _ = l.type,
      k = 0;
  if ("svg" === _ && (t = !0), null != o) for (; k < o.length; k++) if ((a = o[k]) && (a === n || (_ ? a.localName == _ : 3 == a.nodeType))) {
    n = a, o[k] = null;
    break;
  }

  if (null == n) {
    if (null === _) return document.createTextNode(d);
    n = t ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_, d.is && d), o = null, c = !1;
  }

  if (null === _) p === d || c && n.data === d || (n.data = d);else {
    if (o = o && f.slice.call(n.childNodes), v = (p = u.props || r).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !c) {
      if (null != o) for (p = {}, y = 0; y < n.attributes.length; y++) p[n.attributes[y].name] = n.attributes[y].value;
      (h || v) && (h && (v && h.__html == v.__html || h.__html === n.innerHTML) || (n.innerHTML = h && h.__html || ""));
    }

    if (A(n, d, p, t, c), h) l.__k = [];else if (k = l.props.children, m(n, Array.isArray(k) ? k : [k], l, u, i, t && "foreignObject" !== _, o, e, n.firstChild, c), null != o) for (k = o.length; k--;) null != o[k] && s(o[k]);
    c || ("value" in d && void 0 !== (k = d.value) && (k !== n.value || "progress" === _ && !k) && C(n, "value", k, p.value, !1), "checked" in d && void 0 !== (k = d.checked) && k !== n.checked && C(n, "checked", k, p.checked, !1));
  }
  return n;
}

function z(l, u, i) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, i);
  }
}

function L(l, u, i) {
  var t, o, r;

  if (n.unmount && n.unmount(l), (t = l.ref) && (t.current && t.current !== l.__e || z(t, null, u)), i || "function" == typeof l.type || (i = null != (o = l.__e)), l.__e = l.__d = void 0, null != (t = l.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }
    t.base = t.__P = null;
  }

  if (t = l.__k) for (r = 0; r < t.length; r++) t[r] && L(t[r], u, i);
  null != o && s(o);
}

function M(n, l, u) {
  return this.constructor(n, u);
}

function N(l, u, i) {
  var t, o, e;
  n.__ && n.__(l, u), o = (t = "function" == typeof i) ? null : i && i.__k || u.__k, e = [], I(u, l = (!t && i || u).__k = a(y, null, [l]), o || r, r, void 0 !== u.ownerSVGElement, !t && i ? [i] : o ? null : u.firstChild ? f.slice.call(u.childNodes) : null, e, !t && i ? i : o ? o.__e : u.firstChild, t), T(e, l);
}

function O(n, l) {
  N(n, l, O);
}

function S(n, l, u) {
  var i,
      t,
      o,
      r = arguments,
      f = c({}, n.props);

  for (o in l) "key" == o ? i = l[o] : "ref" == o ? t = l[o] : f[o] = l[o];

  if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) u.push(r[o]);
  return null != u && (f.children = u), v(n.type, f, i || n.key, t || n.ref, null);
}

function q(n, l) {
  var u = {
    __c: l = "__cC" + o++,
    __: n,
    Consumer: function (n, l) {
      return n.children(l);
    },
    Provider: function (n) {
      var u, i;
      return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
        return i;
      }, this.shouldComponentUpdate = function (n) {
        this.props.value !== n.value && u.some(k);
      }, this.sub = function (n) {
        u.push(n);
        var l = n.componentWillUnmount;

        n.componentWillUnmount = function () {
          u.splice(u.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Provider.__ = u.Consumer.contextType = u;
}

n = {
  __e: function (n, l) {
    for (var u, i, t; l = l.__;) if ((u = l.__c) && !u.__) try {
      if ((i = u.constructor) && null != i.getDerivedStateFromError && (u.setState(i.getDerivedStateFromError(n)), t = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), t = u.__d), t) return u.__E = u;
    } catch (l) {
      n = l;
    }

    throw n;
  },
  __v: 0
}, l = function (n) {
  return null != n && void 0 === n.constructor;
}, p.prototype.setState = function (n, l) {
  var u;
  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), "function" == typeof n && (n = n(c({}, u), this.props)), n && c(u, n), null != n && this.__v && (l && this.__h.push(l), k(this));
}, p.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), k(this));
}, p.prototype.render = y, u = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, o = 0;


/***/ }),

/***/ "./node_modules/walletlink/node_modules/preact/hooks/dist/hooks.module.js":
/*!********************************************************************************!*\
  !*** ./node_modules/walletlink/node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************************************/
/*! exports provided: useState, useReducer, useEffect, useLayoutEffect, useRef, useImperativeHandle, useMemo, useCallback, useContext, useDebugValue, useErrorBoundary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useReducer", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useEffect", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLayoutEffect", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRef", function() { return s; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useImperativeHandle", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMemo", function() { return d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCallback", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useContext", function() { return F; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDebugValue", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useErrorBoundary", function() { return q; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/walletlink/node_modules/preact/dist/preact.module.js");

var t,
    u,
    r,
    o = 0,
    i = [],
    c = preact__WEBPACK_IMPORTED_MODULE_0__["options"].__b,
    f = preact__WEBPACK_IMPORTED_MODULE_0__["options"].__r,
    e = preact__WEBPACK_IMPORTED_MODULE_0__["options"].diffed,
    a = preact__WEBPACK_IMPORTED_MODULE_0__["options"].__c,
    v = preact__WEBPACK_IMPORTED_MODULE_0__["options"].unmount;

function m(t, r) {
  preact__WEBPACK_IMPORTED_MODULE_0__["options"].__h && preact__WEBPACK_IMPORTED_MODULE_0__["options"].__h(u, t, o || r), o = 0;
  var i = u.__H || (u.__H = {
    __: [],
    __h: []
  });
  return t >= i.__.length && i.__.push({}), i.__[t];
}

function l(n) {
  return o = 1, p(w, n);
}

function p(n, r, o) {
  var i = m(t++, 2);
  return i.t = n, i.__c || (i.__ = [o ? o(r) : w(void 0, r), function (n) {
    var t = i.t(i.__[0], n);
    i.__[0] !== t && (i.__ = [t, i.__[1]], i.__c.setState({}));
  }], i.__c = u), i.__;
}

function y(r, o) {
  var i = m(t++, 3);
  !preact__WEBPACK_IMPORTED_MODULE_0__["options"].__s && k(i.__H, o) && (i.__ = r, i.__H = o, u.__H.__h.push(i));
}

function h(r, o) {
  var i = m(t++, 4);
  !preact__WEBPACK_IMPORTED_MODULE_0__["options"].__s && k(i.__H, o) && (i.__ = r, i.__H = o, u.__h.push(i));
}

function s(n) {
  return o = 5, d(function () {
    return {
      current: n
    };
  }, []);
}

function _(n, t, u) {
  o = 6, h(function () {
    "function" == typeof n ? n(t()) : n && (n.current = t());
  }, null == u ? u : u.concat(n));
}

function d(n, u) {
  var r = m(t++, 7);
  return k(r.__H, u) && (r.__ = n(), r.__H = u, r.__h = n), r.__;
}

function A(n, t) {
  return o = 8, d(function () {
    return n;
  }, t);
}

function F(n) {
  var r = u.context[n.__c],
      o = m(t++, 9);
  return o.__c = n, r ? (null == o.__ && (o.__ = !0, r.sub(u)), r.props.value) : n.__;
}

function T(t, u) {
  preact__WEBPACK_IMPORTED_MODULE_0__["options"].useDebugValue && preact__WEBPACK_IMPORTED_MODULE_0__["options"].useDebugValue(u ? u(t) : t);
}

function q(n) {
  var r = m(t++, 10),
      o = l();
  return r.__ = n, u.componentDidCatch || (u.componentDidCatch = function (n) {
    r.__ && r.__(n), o[1](n);
  }), [o[0], function () {
    o[1](void 0);
  }];
}

function x() {
  i.forEach(function (t) {
    if (t.__P) try {
      t.__H.__h.forEach(g), t.__H.__h.forEach(j), t.__H.__h = [];
    } catch (u) {
      t.__H.__h = [], preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(u, t.__v);
    }
  }), i = [];
}

preact__WEBPACK_IMPORTED_MODULE_0__["options"].__b = function (n) {
  u = null, c && c(n);
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].__r = function (n) {
  f && f(n), t = 0;
  var r = (u = n.__c).__H;
  r && (r.__h.forEach(g), r.__h.forEach(j), r.__h = []);
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].diffed = function (t) {
  e && e(t);
  var o = t.__c;
  o && o.__H && o.__H.__h.length && (1 !== i.push(o) && r === preact__WEBPACK_IMPORTED_MODULE_0__["options"].requestAnimationFrame || ((r = preact__WEBPACK_IMPORTED_MODULE_0__["options"].requestAnimationFrame) || function (n) {
    var t,
        u = function () {
      clearTimeout(r), b && cancelAnimationFrame(t), setTimeout(n);
    },
        r = setTimeout(u, 100);

    b && (t = requestAnimationFrame(u));
  })(x)), u = void 0;
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].__c = function (t, u) {
  u.some(function (t) {
    try {
      t.__h.forEach(g), t.__h = t.__h.filter(function (n) {
        return !n.__ || j(n);
      });
    } catch (r) {
      u.some(function (n) {
        n.__h && (n.__h = []);
      }), u = [], preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(r, t.__v);
    }
  }), a && a(t, u);
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].unmount = function (t) {
  v && v(t);
  var u = t.__c;
  if (u && u.__H) try {
    u.__H.__.forEach(g);
  } catch (t) {
    preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(t, u.__v);
  }
};
var b = "function" == typeof requestAnimationFrame;

function g(n) {
  var t = u;
  "function" == typeof n.__c && n.__c(), u = t;
}

function j(n) {
  var t = u;
  n.__c = n.__(), u = t;
}

function k(n, t) {
  return !n || n.length !== t.length || t.some(function (t, u) {
    return t !== n[u];
  });
}

function w(n, t) {
  return "function" == typeof t ? t(n) : t;
}



/***/ }),

/***/ "./node_modules/walletlink/package.json":
/*!**********************************************!*\
  !*** ./node_modules/walletlink/package.json ***!
  \**********************************************/
/*! exports provided: name, version, description, keywords, main, types, repository, author, license, scripts, dependencies, devDependencies, engines, jest, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"walletlink\",\"version\":\"2.1.5\",\"description\":\"WalletLink JavaScript SDK\",\"keywords\":[\"cipher\",\"cipherbrowser\",\"coinbase\",\"coinbasewallet\",\"eth\",\"ether\",\"ethereum\",\"etherium\",\"injection\",\"toshi\",\"wallet\",\"walletlink\",\"web3\"],\"main\":\"dist/index.js\",\"types\":\"dist/index.d.ts\",\"repository\":\"https://github.com/walletlink/walletlink.git\",\"author\":\"Coinbase, Inc.\",\"license\":\"Apache-2.0\",\"scripts\":{\"tsc\":\"tsc --noEmit --pretty\",\"test\":\"jest\",\"test:watch\":\"jest --watch\",\"build\":\"node compile-assets.js && webpack --config webpack.config.js\",\"build-chrome\":\"webpack --config webpack.config.chrome.js\",\"build-npm\":\"tsc -p ./tsconfig.build.json\",\"build:dev\":\"export WALLETLINK_URL='http://localhost:3000'; yarn build && yarn build-chrome\",\"build:dev:watch\":\"nodemon -e 'ts,tsx,js,json,css,scss,svg' --ignore 'src/**/*-css.ts' --ignore 'src/**/*-svg.ts' --watch src/ --watch chrome/ --exec 'yarn build:dev'\",\"build:prod\":\"yarn build && yarn build-chrome && yarn build-npm && cp ./package.json ../README.md ../LICENSE build/npm && cp -a src/vendor-js build/npm/dist && sed -i.bak 's|  \\\"private\\\": true,||g' build/npm/package.json && rm -f build/npm/package.json.bak\",\"lint\":\"tslint -p . 'src/**/*.ts{,x}'\",\"lint:watch\":\"nodemon -e ts,tsx,js,json,css,scss,svg --watch src/ --exec 'yarn tsc && yarn lint'\"},\"dependencies\":{\"bind-decorator\":\"^1.0.11\",\"bn.js\":\"^5.1.1\",\"clsx\":\"^1.1.0\",\"preact\":\"^10.5.9\",\"rxjs\":\"^6.6.3\",\"eth-rpc-errors\":\"4.0.2\",\"@metamask/safe-event-emitter\":\"2.0.0\",\"eth-json-rpc-filters\":\"4.2.2\",\"eth-block-tracker\":\"4.4.3\",\"json-rpc-engine\":\"6.1.0\"},\"devDependencies\":{\"@types/bn.js\":\"^4.11.6\",\"@types/jest\":\"^26.0.19\",\"@types/node\":\"^14.14.20\",\"copy-webpack-plugin\":\"^6.4.1\",\"core-js\":\"^3.8.2\",\"jest\":\"^26.6.3\",\"nodemon\":\"^2.0.6\",\"raw-loader\":\"^4.0.2\",\"regenerator-runtime\":\"^0.13.7\",\"rxjs-tslint\":\"^0.1.7\",\"sass\":\"^1.32.0\",\"svgo\":\"^1.3.2\",\"ts-jest\":\"^26.4.4\",\"ts-loader\":\"^8.0.13\",\"tslib\":\"^2.0.3\",\"tslint\":\"^6.1.3\",\"tslint-config-prettier\":\"^1.18.0\",\"tslint-config-security\":\"^1.16.0\",\"tslint-microsoft-contrib\":\"^6.2.0\",\"typescript\":\"^4.1.3\",\"webpack\":\"^4.44.2\",\"webpack-cli\":\"^3.3.12\",\"whatwg-fetch\":\"^3.5.0\"},\"engines\":{\"node\":\">= 10.0.0\"},\"jest\":{\"transform\":{\"^.+\\\\.tsx?$\":\"ts-jest\"},\"testEnvironment\":\"node\",\"testPathIgnorePatterns\":[\"<rootDir>/dist/\",\"<rootDir>/node_modules/\"],\"testRegex\":\"(/__tests__/.*|\\\\.(test|spec))\\\\.(ts|tsx|js)$\",\"moduleFileExtensions\":[\"ts\",\"js\",\"json\"]}}");

/***/ })

}]);
//# sourceMappingURL=1.chunk.js.map