#! /usr/bin/env node
export interface CommandConfig {
    addFolder: string;
    delete: string;
    rename: string;
}
export declare const baseConfig: Readonly<{
    addFolder: {
        windows: string;
        mac: string;
    };
    delete: {
        windows: string;
        mac: string;
    };
    rename: {
        windows: string;
        mac: string;
    };
}>;
/**
 * 获取当前系统应该使用的关键命令
 */
export declare const getCommandConfig: () => CommandConfig;
export declare const commandConfig: CommandConfig;
