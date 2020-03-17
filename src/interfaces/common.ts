import { ExecException, ExecOptions, ChildProcess } from 'child_process';

export interface ExecReturn {
  error: ExecException | null;
  stdout: string | Buffer;
  stderr: string | Buffer;
  childProcess: ChildProcess;
}

export interface ExecOption extends ExecOptions {
  encoding: 'buffer' | null | string | BufferEncoding;
}

/**
 * 基础配置
 */
export interface Config {
  gitAddress: string;
  serviceFolderName: string;
  serviceStop: string;
  serviceStart: string;
}
