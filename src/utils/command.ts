#! /usr/bin/env node
/*
 * @文件描述: command
 * @作者: 廖军
 * @Date: 2020-03-18 23:07:03
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-19 22:48:17
 */

export interface CommandConfig {
  addFolder: string;
  delete: string;
  rename: string;
}

export const baseConfig = Object.freeze({
  addFolder: {
    windows: 'md',
    mac: 'mkdir',
  },
  delete: {
    windows: 'del',
    mac: 'rm -fr',
  },
  rename: {
    windows: 'ren',
    mac: 'mv',
  },
});

/**
 * 获取当前系统应该使用的关键命令
 */
export const getCommandConfig = () => {
  let systemKeyword = '';
  const config = {};
  if (process.platform === 'win32') {
    systemKeyword = 'windows';
  } else {
    systemKeyword = 'mac';
  }
  Object.keys(baseConfig).forEach(key => {
    config[key] = baseConfig[key][systemKeyword];
  });
  return config as CommandConfig;
};

// 当前系统应该使用的关键命令
export const commandConfig = getCommandConfig();
