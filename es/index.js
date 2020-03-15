#! /usr/bin/env node
var _regeneratorRuntime = require('./runtime.js');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === '[object Arguments]'
    )
  ) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

import { exec } from 'child_process';
import commander from 'commander';
import colors from 'colors';
commander
  .version(require('../package.json').version)
  .usage('[options] [project name]')
  .parse(process.argv);

var _commander$args = _slicedToArray(commander.args, 1),
  firstCommander = _commander$args[0];
/**
 * 封装exec Promise
 * @param command
 * @param option
 */

var execPromise = function execPromise(command, option) {
  return new Promise(function(resolve) {
    var childProcess = exec(command, option, function(error, stdout, stderr) {
      resolve({
        error: error,
        stdout: stdout,
        stderr: stderr,
        childProcess: childProcess,
      });
    });
  });
};
/**
 * 日志打印
 * @param message
 */

var logMessage = function logMessage(message) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : colors.white;
  return console.log(color('>>>>>> '.concat(message)));
}; // 服务文件夹

var serviceDirectoryName = 'code-act-service';
/**
 * 进入服务目录
 */

var cdServiceDirectory = /*#__PURE__*/ (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime.mark(function _callee() {
      var result, createResult;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              logMessage(
                '\u51C6\u5907\u8FDB\u5165 '.concat(serviceDirectoryName, ' \u6587\u4EF6\u5939'),
              );
              _context.next = 3;
              return execPromise('cd '.concat(serviceDirectoryName));

            case 3:
              result = _context.sent;

              if (!result.error) {
                _context.next = 15;
                break;
              }

              // 如果没有就创建一个
              logMessage(
                '\u672A\u53D1\u73B0 '.concat(
                  serviceDirectoryName,
                  ' \u6587\u4EF6\u5939\uFF0C\u5F00\u59CB\u521B\u5EFA',
                ),
                colors.red,
              ); // await execPromise(`mkdir ${serviceDirectoryName}`);

              _context.next = 8;
              return execPromise(
                'git clone https://github.com/aisriver/code-act-service.git '.concat(
                  serviceDirectoryName,
                ),
              );

            case 8:
              createResult = _context.sent;

              if (!createResult.error) {
                _context.next = 12;
                break;
              }

              logMessage(
                '\u521B\u5EFA\u670D\u52A1\u9047\u5230\u4E9B\u95EE\u9898\uFF1A'.concat(
                  createResult.error,
                ),
                colors.red,
              );
              return _context.abrupt('return');

            case 12:
              logMessage(
                '\u521B\u5EFA '.concat(serviceDirectoryName, ' \u6210\u529F!'),
                colors.green,
              );
              cdServiceDirectory();
              return _context.abrupt('return');

            case 15:
              logMessage(
                '\u8FDB\u5165 '.concat(serviceDirectoryName, ' \u6210\u529F!'),
                colors.green,
              );
              startService();

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );

  return function cdServiceDirectory() {
    return _ref.apply(this, arguments);
  };
})();
/**
 * 启动项目
 */

var startService = /*#__PURE__*/ (function() {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime.mark(function _callee2() {
      var installResult, startResult;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              logMessage('\u5B89\u88C5\u4F9D\u8D56\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85...');
              _context2.next = 3;
              return execPromise('cd '.concat(serviceDirectoryName, ' && npm install'));

            case 3:
              installResult = _context2.sent;

              if (!installResult.error) {
                _context2.next = 7;
                break;
              }

              logMessage(
                '\u5B89\u88C5\u4F9D\u8D56\u9047\u5230\u4E9B\u95EE\u9898\uFF1A'.concat(
                  installResult.error,
                ),
                colors.red,
              );
              return _context2.abrupt('return');

            case 7:
              logMessage('\u4F9D\u8D56\u5B89\u88C5\u6210\u529F\uFF01', colors.green);
              logMessage('\u5F00\u59CB\u542F\u52A8...');
              _context2.next = 11;
              return execPromise('cd '.concat(serviceDirectoryName, ' && npm run stop'));

            case 11:
              _context2.next = 13;
              return execPromise('cd '.concat(serviceDirectoryName, ' && npm run start'));

            case 13:
              startResult = _context2.sent;

              if (!startResult.error) {
                _context2.next = 17;
                break;
              }

              logMessage(
                '\u670D\u52A1\u542F\u52A8\u9047\u5230\u4E9B\u95EE\u9898\uFF1A'.concat(
                  startResult.error,
                ),
                colors.red,
              );
              return _context2.abrupt('return');

            case 17:
              logMessage('\u542F\u52A8\u6210\u529F\uFF01OPEN: http://localhost:7001', colors.green);

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    }),
  );

  return function startService() {
    return _ref2.apply(this, arguments);
  };
})();

var codeAct = /*#__PURE__*/ (function() {
  var _ref3 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime.mark(function _callee3() {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              if (!(firstCommander === 'init')) {
                _context3.next = 4;
                break;
              }

              // 初始化状态先删除对应的文件夹
              logMessage('\u521D\u59CB\u5316...');
              _context3.next = 4;
              return execPromise('rm -fr '.concat(serviceDirectoryName));

            case 4:
              cdServiceDirectory();

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3);
    }),
  );

  return function codeAct() {
    return _ref3.apply(this, arguments);
  };
})();

codeAct();
//# sourceMappingURL=index.js.map
