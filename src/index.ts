#! /usr/bin/env node
import { exec, ExecException } from 'child_process';
import commander from 'commander';
import colors, { Color } from 'colors';
import { ExecReturn, ExecOption } from './interfaces/common';

commander
  .version(require('../package.json').version)
  .usage('[options] [project name]')
  .parse(process.argv);

const [firstCommander] = commander.args;

/**
 * 封装exec Promise
 * @param command
 * @param option
 */
const execPromise = (command: string, option?: ExecOption) =>
  new Promise((resolve: (result: ExecReturn) => void) => {
    const childProcess = exec(
      command,
      option,
      (error: ExecException | null, stdout: string | Buffer, stderr: string | Buffer) => {
        resolve({ error, stdout, stderr, childProcess });
      },
    );
  });

/**
 * 日志打印
 * @param message
 */
const logMessage = (message: string, color: Color = colors.white) =>
  console.log(color(`>>>>>> ${message}`));

// 服务文件夹
const serviceDirectoryName = 'code-act-service';

/**
 * 进入服务目录
 */
const cdServiceDirectory = async () => {
  logMessage(`准备进入 ${serviceDirectoryName} 文件夹`);
  const result: ExecReturn = await execPromise(`cd ${serviceDirectoryName}`);
  if (result.error) {
    // 如果没有就创建一个
    logMessage(`未发现 ${serviceDirectoryName} 文件夹，开始创建`, colors.red);
    // await execPromise(`mkdir ${serviceDirectoryName}`);
    const createResult = await execPromise(
      `git clone https://github.com/aisriver/code-act-service.git ${serviceDirectoryName}`,
    );
    if (createResult.error) {
      logMessage(`创建服务遇到些问题：${createResult.error}`, colors.red);
      return;
    }
    logMessage(`创建 ${serviceDirectoryName} 成功!`, colors.green);
    cdServiceDirectory();
    return;
  }
  logMessage(`进入 ${serviceDirectoryName} 成功!`, colors.green);
  startService();
};

/**
 * 启动项目
 */
const startService = async () => {
  logMessage(`安装依赖，请耐心等待...`);
  const installResult = await execPromise(`cd ${serviceDirectoryName} && npm install`);
  if (installResult.error) {
    logMessage(`安装依赖遇到些问题：${installResult.error}`, colors.red);
    return;
  }
  logMessage(`依赖安装成功！`, colors.green);
  logMessage(`开始启动...`);
  await execPromise(`cd ${serviceDirectoryName} && npm run stop`);
  const startResult = await execPromise(`cd ${serviceDirectoryName} && npm run start`);
  if (startResult.error) {
    logMessage(`服务启动遇到些问题：${startResult.error}`, colors.red);
    return;
  }
  logMessage(`启动成功！OPEN: http://localhost:7001`, colors.green);
};

const codeAct = async () => {
  if (firstCommander === 'init') {
    // 初始化状态先删除对应的文件夹
    logMessage(`初始化...`);
    await execPromise(`rm -fr ${serviceDirectoryName}`);
  }
  cdServiceDirectory();
};

codeAct();
