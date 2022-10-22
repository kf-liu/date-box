"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.counter = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _cronParser = _interopRequireDefault(require("cron-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var RECORD_SEPARATOR = ' _ ';
var RECORDS_SEPARATOR = ' | ';
var parseRecord = function parseRecord(record) {
  var _ref = (record === null || record === void 0 ? void 0 : record.split(RECORD_SEPARATOR)) || [],
    _ref2 = _slicedToArray(_ref, 2),
    time = _ref2[0],
    event = _ref2[1];
  if (!time) return [];
  var nextMoment;
  try {
    nextMoment = (0, _moment["default"])(_cronParser["default"].parseExpression(time).next().toString());
  } catch (error) {
    nextMoment = (0, _moment["default"])(time);
  }
  var diff = nextMoment.diff((0, _moment["default"])().startOf('day'), 'day');
  return [diff, event];
};
var counter = function counter(record) {
  var _parseRecord = parseRecord(record),
    _parseRecord2 = _slicedToArray(_parseRecord, 2),
    diff = _parseRecord2[0],
    event = _parseRecord2[1];
  if (diff === 0) {
    return {
      diff: diff,
      absDiff: diff,
      negative: false,
      content: "\uD83C\uDF81\uD83C\uDF81\uD83C\uDF81 Today is ".concat(event)
    };
  }
  if (!diff) return false;
  var absDiff = Math.abs(diff);
  var negative = Boolean(diff < 0);
  return {
    diff: diff,
    absDiff: absDiff,
    negative: negative,
    content: "\uD83D\uDDD3 ".concat(Math.abs(diff), " ").concat(absDiff === 1 ? 'day' : 'days', " ").concat(negative ? 'after' : 'before', " ").concat(event)
  };
};
exports.counter = counter;
var _default = function _default(records) {
  var _recordsArr$map, _recordsArr$map$filte, _recordsArr$map$filte2, _recordsArr$map$filte3;
  var recordsArr = records === null || records === void 0 ? void 0 : records.split(RECORDS_SEPARATOR);
  if (!(recordsArr !== null && recordsArr !== void 0 && recordsArr.length)) return '';
  var contents = recordsArr === null || recordsArr === void 0 ? void 0 : (_recordsArr$map = recordsArr.map(function (record) {
    return counter(record);
  })) === null || _recordsArr$map === void 0 ? void 0 : (_recordsArr$map$filte = _recordsArr$map.filter(Boolean)) === null || _recordsArr$map$filte === void 0 ? void 0 : (_recordsArr$map$filte2 = _recordsArr$map$filte.sort(function (a, b) {
    return a.absDiff - b.absDiff;
  })) === null || _recordsArr$map$filte2 === void 0 ? void 0 : (_recordsArr$map$filte3 = _recordsArr$map$filte2.map(function (record) {
    return record.content || '🎁';
  })) === null || _recordsArr$map$filte3 === void 0 ? void 0 : _recordsArr$map$filte3.join('\n');
  return contents;
};
exports["default"] = _default;