# 像素市场 - 前端文档

- 后端仓库：*https://github.com/ligeaaa/west2-5*
- 演示视频：*https://e1xhwsf2hde.feishu.cn/docx/OnbzdvDSBoDZmQxWTk7cuT0bn5f*

#### 技术栈

Vue 2.x + Vuetify

#### 完成情况

- 基本交易功能 ✅ 
- 后台管理界面 ✅ 

#### 项目亮点

- **封装完成度**
  - 实现路由拆分和api封装，提高代码的可扩展性。
  - 统一请求和响应格式，实现全局异常拦截与消息弹窗处理，增强系统的用户体验。
- **安全性能**
  - 使用路由拦截，确保只有授权的用户能够访问特定资源。
- **造可复用的组件**
  - 实现的图片上传预览。
  - 在订单中心和后台管理中使用切换栏组件，避免类似页面需要写冗杂的代码。

#### 未解决的问题

- 聊天功能 ❓ （前后端都尝试写了代码，但没成功连接起来）

#### **项目结构树**

```
pixel-market
├─ package.json
├─ public
├─ src
│  ├─ App.vue
│  ├─ main.js
│  ├─ apis
│  ├─ assets
│  ├─ components
│  ├─ plugins
│  ├─ router
│  ├─ store
│  ├─ utils
│  └─ views
│     ├─ admin
│     ├─ basic
│     ├─ management
│     ├─ merchandise
│     ├─ message
└─ vue.config.js

```