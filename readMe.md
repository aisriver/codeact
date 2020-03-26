# codeact

### 介绍

- 执行命令的时候会在项目根目录添加 code-act-service 目录，并且自动安装依赖并启动；

- 通过 code-act-service 的交互，来实时添加、编辑项目代码，后期目标通过网页配置方式，直接在项目生成各模块的代码到对应位置。

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

## Code Act Service 说明

![md_1](https://github.com/aisriver/codeact/blob/master/docs/images/01.png?raw=true)

![md_1](https://github.com/aisriver/codeact/blob/master/docs/images/02.png?raw=true)

配合命令行工具 codeact 使用的一项辅助开发的解决方案

## 文件操作类接口说明

- baseUrl http://localhost:7001

- Folder 相关

| 地址              | 类型 |                            参数 |                     说明 |
| :---------------- | :--: | ------------------------------: | -----------------------: |
| /folder/add       | GET  |                path、folderName |               新增文件夹 |
| /folder/delete    | GET  |                path、folderName |               删除文件夹 |
| /folder/rename    | GET  | path、folderName、newFolderName |             文件夹重命名 |
| /folder/structure | GET  |                                 | 获取工程下的文件结构数据 |

- File 相关

| 地址         | 类型 |           参数 |         说明 |
| :----------- | :--: | -------------: | -----------: |
| /file/add    | GET  | path、fileName |     新增文件 |
| /file/delete | POST |           path |     删除文件 |
| /file/read   | GET  |           path | 文件内容读取 |
| /file/modify | GET  |     path、text | 文件内容修改 |

### 拓展及说明

- codeact 会生成配置文件 你可以自己搭建一个服务关联到 codeact，一切都可以自定义

- 本服务添加了一个代码生成器与文件直接关联的示例（Grid 布局生成器），其他生成器可自行拓展

- 保存快捷键与常用编辑器一致

- [Code Act Service](https://github.com/aisriver/code-act-service.git)

##### 遇到问题？或者你有更好的建议，欢迎一起讨论

- WeChat：mrliaojun Email：767882503@qq.com

### github

[Jared](https://github.com/aisriver/codect.git)
