#! /usr/bin/env node
import _regeneratorRuntime from "@babel/runtime/regenerator";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import commander from 'commander';
import colors from 'colors';
import { logMessage, execPromise, getConfig } from './utils/process';
import { commandConfig } from './utils/command'; // 配置

var defaultConfig = {
  // code-act-service git地址
  gitAddress: 'https://github.com/aisriver/code-act-service.git',
  // 服务文件夹
  serviceFolderName: 'code-act-service',
  // 服务终止命令
  serviceStop: 'npm run stop',
  // 服务开始命令
  serviceStart: 'npm run start'
};
commander.version(require('../package.json').version).usage('[options] [project name]').option('-f, --find [value]', '查看service相关配置，gitAddress（服务端git地址）、serviceFolderName（服务文件夹名称）、serviceStop（服务终止命令）、serviceStart（服务开始命令）') //自定义帮助信息
.on('--help', function () {
  logMessage('\n\nCommands：', colors.white, '');
  logMessage('init        初始化\n', colors.green, '');
}).parse(process.argv);

var _commander$args = _slicedToArray(commander.args, 1),
    firstCommander = _commander$args[0];

var isInit = firstCommander === 'init';
/**
 * 进入服务目录
 */

var cdServiceDirectory = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(config) {
    var gitAddress, serviceFolderName, result, createResult;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            gitAddress = config.gitAddress, serviceFolderName = config.serviceFolderName;
            logMessage("\u51C6\u5907\u8FDB\u5165 ".concat(serviceFolderName, " \u6587\u4EF6\u5939"));
            _context.next = 4;
            return execPromise("cd ".concat(serviceFolderName));

          case 4:
            result = _context.sent;

            if (!result.error) {
              _context.next = 16;
              break;
            }

            // 如果没有就创建一个
            logMessage("\u672A\u53D1\u73B0 ".concat(serviceFolderName, " \u6587\u4EF6\u5939\uFF0C\u5F00\u59CB\u521B\u5EFA"), colors.red);
            _context.next = 9;
            return execPromise("git clone ".concat(gitAddress, " ").concat(serviceFolderName));

          case 9:
            createResult = _context.sent;

            if (!createResult.error) {
              _context.next = 13;
              break;
            }

            logMessage("\u521B\u5EFA\u670D\u52A1\u9047\u5230\u4E9B\u95EE\u9898\uD83D\uDE28\uFF1A".concat(createResult.error), colors.red);
            return _context.abrupt("return");

          case 13:
            logMessage("\u521B\u5EFA ".concat(serviceFolderName, " \u6210\u529F!\uD83D\uDE00"), colors.green);
            cdServiceDirectory(config);
            return _context.abrupt("return");

          case 16:
            logMessage("\u8FDB\u5165 ".concat(serviceFolderName, " \u6210\u529F!\uD83D\uDE03"), colors.green);
            startService(config);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function cdServiceDirectory(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 启动项目
 */


var startService = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(config) {
    var serviceFolderName, serviceStop, serviceStart, installResult, startResult;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            serviceFolderName = config.serviceFolderName, serviceStop = config.serviceStop, serviceStart = config.serviceStart;
            logMessage("\u66F4\u65B0/\u5B89\u88C5\u4F9D\u8D56\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85".concat(isInit ? '（当前为初始化状态，时间可能会长一些😊）' : '😉', "..."));
            _context2.next = 4;
            return execPromise("cd ".concat(serviceFolderName, " && git stash && git pull && npm install"));

          case 4:
            installResult = _context2.sent;

            if (!installResult.error) {
              _context2.next = 8;
              break;
            }

            logMessage("\u66F4\u65B0/\u5B89\u88C5\u4F9D\u8D56\u9047\u5230\u4E9B\u95EE\u9898\uD83D\uDE2D\uFF1A".concat(installResult.error), colors.red);
            return _context2.abrupt("return");

          case 8:
            logMessage("\u4F9D\u8D56\u5B89\u88C5\u6210\u529F\uFF01\uD83D\uDE06", colors.green);
            logMessage("\u5F00\u59CB\u542F\u52A8\uD83D\uDE07...");
            _context2.next = 12;
            return execPromise("cd ".concat(serviceFolderName, " && ").concat(serviceStop));

          case 12:
            _context2.next = 14;
            return execPromise("cd ".concat(serviceFolderName, " && ").concat(serviceStart));

          case 14:
            startResult = _context2.sent;

            if (!startResult.error) {
              _context2.next = 18;
              break;
            }

            logMessage("\u670D\u52A1\u542F\u52A8\u9047\u5230\u4E9B\u95EE\u9898\uD83D\uDE23\uFF1A".concat(startResult.error), colors.red);
            return _context2.abrupt("return");

          case 18:
            logMessage("\u542F\u52A8\u6210\u529F\uFF01OPEN: http://localhost:7001", colors.green);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function startService(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * 执行
 */


var codeAct = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var result, config, findValue, message;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getConfig(defaultConfig);

          case 2:
            result = _context3.sent;

            if (result.isContinue) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return");

          case 5:
            config = result.config; // 配置查询

            if (!commander.find) {
              _context3.next = 10;
              break;
            }

            findValue = config[commander.find];

            if (findValue) {
              logMessage(findValue, colors.green, '');
            } else {
              message = "".concat(commander.find, "\u4E0D\u5728\u67E5\u8BE2\u8303\u56F4");

              if (typeof commander.find === 'boolean') {
                message = '请输入查询参数';
              }

              logMessage("".concat(message, "\uFF0C\u53EF\u67E5\u8BE2\u53C2\u6570\uFF08gitAddress | serviceFolderName | serviceStop | serviceStart\uFF09"), colors.red, '');
            }

            return _context3.abrupt("return");

          case 10:
            if (!isInit) {
              _context3.next = 14;
              break;
            }

            // 初始化状态先删除对应的文件夹
            logMessage("\u521D\u59CB\u5316...");
            _context3.next = 14;
            return execPromise("".concat(commandConfig["delete"], " ").concat(config.serviceFolderName));

          case 14:
            cdServiceDirectory(config);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function codeAct() {
    return _ref3.apply(this, arguments);
  };
}();

codeAct();
//# sourceMappingURL=index.js.map
