#! /usr/bin/env nod
import { exec, ExecException } from 'child_process';
import colors from 'colors';
import { ExecReturn, ExecOption, Config } from '../interfaces/common';
import path from 'path';
import fs from 'fs';

/**
 * 封装exec Promise
 * @param command
 * @param option
 */
export const execPromise = (command: string, option?: ExecOption) =>
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
export const logMessage = (message: string, color = colors.white, prefix = '>>>>>>') =>
  console.log(color(`${prefix} ${message}`));

/**
 * 从多个命令的数组得到命令
 * @param commands
 */
export const getCommandByArray = (commands: string[]) => commands.join(' && ');

/**
 * 从项目根目录读取配置文件
 * @param defaultConfig
 */
export const getConfig = async (defaultConfig: Config) =>
  new Promise((resolve: (result: { config: Config; isContinue: boolean }) => void) => {
    const fileName = 'codeact.config.js';
    const configPath = path.join(process.cwd(), fileName);
    let config = {};
    // 是否继续后续操作
    let isContinue = true;
    if (fs.existsSync(configPath)) {
      try {
        config = eval(fs.readFileSync(configPath, 'utf-8'));
      } catch (e) {
        logMessage(`读取${fileName}文件失败`, colors.red);
        isContinue = false;
      }
    } else {
      logMessage(`${fileName}文件不存在，开始重新创建`, colors.red);
      try {
        fs.writeFileSync(
          fileName,
          `'use strict';

module.exports = {
  // code-act-service git地址
  gitAddress: 'https://github.com/aisriver/code-act-service.git',
  // 服务文件夹
  serviceFolderName: 'code-act-service',
  // 服务终止命令
  serviceStop: 'npm run stop',
  // 服务开始命令
  serviceStart: 'npm run start',
}`,
          'utf-8',
        );
      } catch (error) {
        logMessage(`创建${fileName}文件失败`, colors.red);
        isContinue = false;
      }
    }
    const result = {
      config: { ...defaultConfig, ...config },
      isContinue,
    };
    resolve(result);
  });
