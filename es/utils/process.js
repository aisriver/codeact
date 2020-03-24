#! /usr/bin/env nod
import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { exec } from 'child_process';
import colors from 'colors';
import path from 'path';
import fs from 'fs';
/**
 * 封装exec Promise
 * @param command
 * @param option
 */

export var execPromise = function execPromise(command, option) {
  return new Promise(function (resolve) {
    var childProcess = exec(command, option, function (error, stdout, stderr) {
      resolve({
        error: error,
        stdout: stdout,
        stderr: stderr,
        childProcess: childProcess
      });
    });
  });
};
/**
 * 日志打印
 * @param message
 */

export var logMessage = function logMessage(message) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : colors.white;
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '>>>>>>';
  return console.log(color("".concat(prefix, " ").concat(message)));
};
/**
 * 从多个命令的数组得到命令
 * @param commands
 */

export var getCommandByArray = function getCommandByArray(commands) {
  return commands.join(' && ');
};
/**
 * 从项目根目录读取配置文件
 * @param defaultConfig
 */

export var getConfig = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(defaultConfig) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve) {
              var fileName = 'codeact.config.js';
              var configPath = path.join(process.cwd(), fileName);
              var config = {}; // 是否继续后续操作

              var isContinue = true;

              if (fs.existsSync(configPath)) {
                try {
                  config = eval(fs.readFileSync(configPath, 'utf-8'));
                } catch (e) {
                  logMessage("\u8BFB\u53D6".concat(fileName, "\u6587\u4EF6\u5931\u8D25"), colors.red);
                  isContinue = false;
                }
              } else {
                logMessage("".concat(fileName, "\u6587\u4EF6\u4E0D\u5B58\u5728\uFF0C\u5F00\u59CB\u91CD\u65B0\u521B\u5EFA"), colors.red);

                try {
                  fs.writeFileSync(fileName, "'use strict';\n\nmodule.exports = {\n  // code-act-service git\u5730\u5740\n  gitAddress: 'https://github.com/aisriver/code-act-service.git',\n  // \u670D\u52A1\u6587\u4EF6\u5939\n  serviceFolderName: 'code-act-service',\n  // \u670D\u52A1\u7EC8\u6B62\u547D\u4EE4\n  serviceStop: 'npm run stop',\n  // \u670D\u52A1\u5F00\u59CB\u547D\u4EE4\n  serviceStart: 'npm run start',\n}", 'utf-8');
                } catch (error) {
                  logMessage("\u521B\u5EFA".concat(fileName, "\u6587\u4EF6\u5931\u8D25"), colors.red);
                  isContinue = false;
                }
              }

              var result = {
                config: _objectSpread({}, defaultConfig, {}, config),
                isContinue: isContinue
              };
              resolve(result);
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getConfig(_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=process.js.map
