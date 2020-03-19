#! /usr/bin/env node
import commander from 'commander';
import colors from 'colors';
import { ExecReturn, Config } from './interfaces/common';
import { logMessage, execPromise, getConfig } from './utils/process';
import { commandConfig } from './utils/command';

// 配置
const defaultConfig: Config = {
  // code-act-service git地址
  gitAddress: 'https://github.com/aisriver/code-act-service.git',
  // 服务文件夹
  serviceFolderName: 'code-act-service',
  // 服务终止命令
  serviceStop: 'npm run stop',
  // 服务开始命令
  serviceStart: 'npm run start',
};

commander
  .version(require('../package.json').version)
  .usage('[options] [project name]')
  .option(
    '-f, --find [value]',
    '查看service相关配置，gitAddress（服务端git地址）、serviceFolderName（服务文件夹名称）、serviceStop（服务终止命令）、serviceStart（服务开始命令）',
  )
  //自定义帮助信息
  .on('--help', () => {
    logMessage('\n\nCommands：', colors.white, '');
    logMessage('init        初始化\n', colors.green, '');
  })
  .parse(process.argv);

const [firstCommander] = commander.args;

/**
 * 进入服务目录
 */
const cdServiceDirectory = async (config: Config) => {
  const { gitAddress, serviceFolderName } = config;
  logMessage(`准备进入 ${serviceFolderName} 文件夹`);
  const result: ExecReturn = await execPromise(`cd ${serviceFolderName}`);
  if (result.error) {
    // 如果没有就创建一个
    logMessage(`未发现 ${serviceFolderName} 文件夹，开始创建`, colors.red);
    const createResult = await execPromise(`git clone ${gitAddress} ${serviceFolderName}`);
    if (createResult.error) {
      logMessage(`创建服务遇到些问题：${createResult.error}`, colors.red);
      return;
    }
    logMessage(`创建 ${serviceFolderName} 成功!`, colors.green);
    cdServiceDirectory(config);
    return;
  }
  logMessage(`进入 ${serviceFolderName} 成功!`, colors.green);
  startService(config);
};

/**
 * 启动项目
 */
const startService = async (config: Config) => {
  const { serviceFolderName, serviceStop, serviceStart } = config;
  logMessage(`更新/安装依赖，请耐心等待...`);
  const installResult = await execPromise(`cd ${serviceFolderName} && npm install`);
  if (installResult.error) {
    logMessage(`更新/安装依赖遇到些问题：${installResult.error}`, colors.red);
    return;
  }
  logMessage(`依赖安装成功！`, colors.green);
  logMessage(`开始启动...`);
  await execPromise(`cd ${serviceFolderName} && ${serviceStop}`);
  const startResult = await execPromise(`cd ${serviceFolderName} && ${serviceStart}`);
  if (startResult.error) {
    logMessage(`服务启动遇到些问题：${startResult.error}`, colors.red);
    return;
  }
  logMessage(`启动成功！OPEN: http://localhost:7001`, colors.green);
};

/**
 * 执行
 */
const codeAct = async () => {
  // 读取/写入配置文件
  const result = await getConfig(defaultConfig);
  if (!result.isContinue) {
    return;
  }
  const config = result.config;
  // 配置查询
  if (commander.find) {
    const findValue = config[commander.find];
    if (findValue) {
      logMessage(findValue, colors.green, '');
    } else {
      let message = `${commander.find}不在查询范围`;
      if (typeof commander.find === 'boolean') {
        message = '请输入查询参数';
      }
      logMessage(
        `${message}，可查询参数（gitAddress | serviceFolderName | serviceStop | serviceStart）`,
        colors.red,
        '',
      );
    }
    return;
  }
  // 初始化项目
  if (firstCommander === 'init') {
    // 初始化状态先删除对应的文件夹
    logMessage(`初始化...`);
    await execPromise(`${commandConfig.delete} ${config.serviceFolderName}`);
  }
  cdServiceDirectory(config);
};

codeAct();
