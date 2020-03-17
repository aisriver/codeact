#! /usr/bin/env nod
import colors from 'colors';
import { ExecReturn, ExecOption, Config } from '../interfaces/common';
/**
 * 封装exec Promise
 * @param command
 * @param option
 */
export declare const execPromise: (command: string, option?: ExecOption | undefined) => Promise<ExecReturn>;
/**
 * 日志打印
 * @param message
 */
export declare const logMessage: (message: string, color?: colors.Color, prefix?: string) => void;
/**
 * 从多个命令的数组得到命令
 * @param commands
 */
export declare const getCommandByArray: (commands: string[]) => string;
/**
 * 从项目根目录读取配置文件
 * @param defaultConfig
 */
export declare const getConfig: (defaultConfig: Config) => Promise<{
    config: Config;
    isContinue: boolean;
}>;
