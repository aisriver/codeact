### 介绍

执行命令的时候会在项目根目录添加 code-act-service 目录，并且自动安装依赖并启动；
通过 code-act-service 的交互，来实时添加、编辑项目代码，后期目标通过网页配置方式，直接在项目生成各模块的代码到对应位置。

### 安装

npm install -g codeact

### 使用

- 1、在项目根目录执行 codeact，第一次默认会在根目录生成 codeact.config.js 配置文件，后续可以直接修改配置做定制化功能
- 2、可以通过 codeact init 重新初始化 code-act-service 文件

#### 命令说明

| 短名字 | 长名字   | 介绍                                                                             |
| ------ | -------- | -------------------------------------------------------------------------------- |
| -V     | --vision | 查看版本号                                                                       |
| -h     | --help   | 查看帮助文档                                                                     |
| -f     | --find   | 查看属性，可查询参数（gitAddress、serviceFolderName、serviceStop、serviceStart） |
| init   |          | 重新初始化                                                                       |

### 说明

code-act-service 目前还在完善中，将在后期迭代中开放使用

### github

[Jared](https://github.com/aisriver/codect.git)
