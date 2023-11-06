# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## 二、搭建后台管理系统模板


项目参考：
git clone https://github.com/HalseySpicy/Hooks-Admin.git

### 项目功能

- 🚀 采用最新技术找开发：React18、React-Router v6、React-Hooks、TypeScript、Vite2
- 🚀 采用 Vite2 作为项目开发、打包工具（配置了 Gzip 打包、跨域代理、打包预览工具…）
- 🚀 整个项目集成了 TypeScript （完全是为了想学习 🤣）
- 🚀 使用 redux 做状态管理，集成 immer、react-redux、redux-persist 开发
- 🚀 集成了两套状态管理，master 分支使用的是 redux || redux-toolkit 分支使用的是 redux-toolkit
- 🚀 使用 TypeScript 对 Axios 二次封装 （错误拦截、常用请求封装、全局请求 Loading、取消重复请求…）
- 🚀 支持 Antd 组件大小切换、暗黑 && 灰色 && 色弱模式、i18n 国际化（i18n 暂时没配置所有文件）
- 🚀 使用 自定义高阶组件 进行路由权限拦截（403 页面）、页面按钮权限配置
- 🚀 支持 React-Router v6 路由懒加载配置、菜单手风琴模式、无限级菜单、多标签页、面包屑导航
- 🚀 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范（项目规范配置）
- 🚀 使用 husky、lint-staged、commitlint、commitizen、cz-git 规范提交信息（项目规范配置）


### 2.1项目初始化

今天来带大家从0开始搭建一个vue3版本的后台管理系统。一个项目要有统一的规范，需要使用eslint+stylelint+prettier来对我们的代码质量做检测和修复，需要使用husky来做commit拦截，需要使用commitlint来统一提交规范，需要使用preinstall来统一包管理工具。

下面我们就用这一套规范来初始化我们的项目，集成一个规范的模版。

#### 2.1.1环境准备

- node v16.14.2
- pnpm 8.0.0

#### 2.1.2初始化项目

本项目使用vite进行构建，vite官方中文文档参考：[cn.vitejs.dev/guide/](https://cn.vitejs.dev/guide/)

**pnpm:performant npm ，意味“高性能的 npm”。[pnpm](https://so.csdn.net/so/search?q=pnpm&spm=1001.2101.3001.7020)由npm/yarn衍生而来，解决了npm/yarn内部潜在的bug，极大的优化了性能，扩展了使用场景。被誉为“最先进的包管理工具”**

pnpm安装指令

```
npm i -g pnpm
```

项目初始化命令:

```
pnpm create vite
```

创建的项目选择react 、ts
进入到项目根目录pnpm install安装全部依赖.安装完依赖运行程序:pnpm run dev


### 2.2项目配置

#### 一、eslint配置

**eslint中文官网:http://eslint.cn/**

ESLint最初是由[Nicholas C. Zakas](http://nczonline.net/) 于2013年6月创建的开源项目。它的目标是提供一个插件化的**javascript代码检测工具**

首先安装eslint

```
pnpm i eslint -D
```

生成配置文件:.eslint.cjs

```
npx eslint --init
```

**.eslint.cjs配置文件**

```

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /* 指定如何解析语法 */
  parser: '@typescript-eslint/parser',
  /** 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* 继承已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react-refresh'],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'warn', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'warn', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'off', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/semi': 'off',

    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    
  },
}

```

##### 1.1vue3环境代码校验插件


安装指令

```
pnpm install -D  eslint-plugin-prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks 
```

##### 1.2修改.eslintrc.cjs配置文件

```
// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /* 指定如何解析语法 */
  parser: 'vue-eslint-parser',
  /** 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* 继承已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', '@typescript-eslint'],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/semi': 'off',

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
    'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
  },
}

```

##### 1.3.eslintignore忽略文件

```
dist
node_modules
```

##### 1.4运行脚本

package.json新增两个运行脚本

```
"scripts": {
    "lint": "eslint src",
    "fix": "eslint src --fix",
}
```

#### 二、配置**prettier**

有了eslint，为什么还要有prettier？eslint针对的是javascript，他是一个检测工具，包含js语法以及少部分格式问题，在eslint看来，语法对了就能保证代码正常运行，格式问题属于其次；

而prettier属于格式化工具，它看不惯格式不统一，所以它就把eslint没干好的事接着干，另外，prettier支持

包含js在内的多种语言。

总结起来，**eslint和prettier这俩兄弟一个保证js代码质量，一个保证代码美观。**

##### 2.1安装依赖包

```
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
```

##### 2.2.prettierrc.json添加规则

```
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

##### 2.3.prettierignore忽略文件

```
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```

**通过pnpm run lint去检测语法，如果出现不规范格式,通过pnpm run fix 修改**

#### 三、配置stylelint

[stylelint](https://stylelint.io/)为css的lint工具。可格式化css代码，检查css语法错误与不合理的写法，指定css书写顺序等。

我们的项目中使用scss作为预处理器，安装以下依赖：

```
pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D

```

##### 3.1`.stylelintrc.cjs`**配置文件**

**官网:https://stylelint.bootcss.com/**

```
// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```

##### 3.2.stylelintignore忽略文件

```
/node_modules/*
/dist/*
/html/*
/public/*
```

##### 3.3运行脚本

```
"scripts": {
	"lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
}
```

最后配置统一的prettier来格式化我们的js和css，html代码

```
 "scripts": {
    "dev": "vite --open",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "fix": "eslint src --fix",
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
    "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
  },
```

**当我们运行`pnpm run format`的时候，会把代码直接格式化**

#### 四、配置husky

在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。

要做到这件事情，就需要利用husky在代码提交之前触发git hook(git在客户端的钩子)，然后执行`pnpm run format`来自动的格式化我们的代码。

安装`husky`

```
pnpm install -D husky
```

执行

```
npx husky-init
```

会在根目录下生成个一个.husky目录，在这个目录下面会有一个pre-commit文件，这个文件里面的命令在我们执行commit的时候就会执行

在`.husky/pre-commit`文件添加如下命令：

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm run format
```

当我们对代码进行commit操作的时候，就会执行命令，对代码进行格式化，然后再提交。
我的github账户： asd3884 asd2477648486

注意：配置husky之前，1.在项目根目录下执行 git init 初始化git仓库2.在github上创建一个远程仓库 名为：react_admin_templates 3.将本地仓库与远程仓库关联：
git remote add origin https://github.com/asd3884/react_admin_templates.git

git add .

```
echo "# vue3_admin_templates" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/asd3884/vue3_admin_templates.git
git push -u origin main
```

#### 五、配置commitlint

对于我们的commit信息，也是有统一规范的，不能随便写,要让每个人都按照统一的标准来执行，我们可以利用**commitlint**来实现。

安装包

```
pnpm add @commitlint/config-conventional @commitlint/cli -D
```

添加配置文件，新建`commitlint.config.cjs`(注意是cjs)，然后添加下面的代码：

```
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
```

在`package.json`中配置scripts命令

```
# 在scrips中添加下面的代码
{
"scripts": {
    "commitlint": "commitlint --config commitlint.config.cjs -e -V"
  },
}
```

配置结束，现在当我们填写`commit`信息的时候，前面就需要带着下面的`subject`

```
'feat',//新特性、新功能
'fix',//修改bug
'docs',//文档修改
'style',//代码格式修改, 注意不是 css 修改
'refactor',//代码重构
'perf',//优化相关，比如提升性能、体验
'test',//测试用例修改
'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
'revert',//回滚到上一个版本
'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动
```

配置husky

```
npx husky add .husky/commit-msg
```

在生成的commit-msg文件中添加下面的命令

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm commitlint
```

当我们 commit 提交信息时，就不能再随意写了，必须是 git commit -m 'fix: xxx' 符合类型的才可以，**需要注意的是类型的后面需要用英文的 :，并且冒号后面是需要空一格的，这个是不能省略的**

#### 六、强制使用pnpm包管理器工具

团队开发项目的时候，需要统一包管理器工具,因为不同包管理器工具下载同一个依赖,可能版本不一样,

导致项目出现bug问题,因此包管理器工具需要统一管理！！！

在根目录创建`scritps/preinstall.js`文件，添加下面的内容

```
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
    ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}
```

配置命令

```
"scripts": {
	"preinstall": "node ./scripts/preinstall.js"
}
```

**当我们使用npm或者yarn来安装包的时候，就会报错了。原理就是在install的时候会触发preinstall（npm提供的生命周期钩子）这个文件里面的代码。**

## 三、项目集成

### 3.1集成antd

硅谷甄选运营平台,UI组件库采用的antd，因此需要集成antd插件！！！


```
pnpm install antd
```

**入口文件main.ts全局安装element-plus,element-plus默认支持语言英语设置为中文**



### 3.2src别名的配置

在开发项目的时候文件与文件关系可能很复杂，因此我们需要给src文件夹配置一个别名！！！

```
// vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    }
  }
})
```

**TypeScript 编译配置**

```
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { //路径映射，相对于baseUrl
      "@/*": ["src/*"]
    }
  }
}
```

### 3.3环境变量的配置

**项目开发过程中，至少会经历开发环境、测试环境和生产环境(即正式环境)三个阶段。不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。**

开发环境（development）
顾名思义，开发使用的环境，每位开发人员在自己的dev分支上干活，开发到一定程度，同事会合并代码，进行联调。

测试环境（testing）
测试同事干活的环境啦，一般会由测试同事自己来部署，然后在此环境进行测试

生产环境（production）
生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(正式提供给客户使用的环境。)

注意:一般情况下，一个环境对应一台服务器,也有的公司开发与测试环境是一台服务器！！！

项目根目录分别添加 开发、生产和测试环境的文件!

```
.env.development
.env.production
.env.test
```

文件内容

```
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/dev-api'
```

```
NODE_ENV = 'production'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/prod-api'
```

```
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'test'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/test-api'
```

配置运行命令：package.json

```
 "scripts": {
    "dev": "vite --open",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pro": "vue-tsc && vite build --mode production",
    "preview": "vite preview"
  },
```

通过import.meta.env获取环境变量

### 3.4SVG图标配置

在开发项目的时候经常会用到svg矢量图,而且我们使用SVG以后，页面上加载的不再是图片资源,

这对页面性能来说是个很大的提升，而且我们SVG文件比img要小的很多，放在项目中几乎不占用资源。

**安装SVG依赖插件**

```
pnpm install vite-plugin-svg-icons -D
```

**在`vite.config.ts`中配置插件**

```
import react from @vitejs/plugin-react
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
export default () => {
  return {
    plugins: [
      react(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  }
}
```



### 3.5集成sass

我们目前在组件内部已经可以使用scss样式,因为在配置styleLint工具的时候，项目当中已经安装过sass sass-loader,因此我们再组件内可以使用scss语法！！！需要加上lang="scss"

```
<style scoped lang="scss"></style>
```

接下来我们为项目添加一些全局的样式

在src/styles目录下创建一个index.scss文件，当然项目中需要用到清除默认样式，因此在index.scss引入reset.scss

```
@import reset.scss
```

在入口文件引入

```
import '@/styles'
```

但是你会发现在src/styles/index.scss全局样式文件中没有办法使用$变量.因此需要给项目中引入全局变量$.

在style/variable.scss创建一个variable.scss文件！

在vite.config.ts文件配置如下:

```
export default defineConfig((config) => {
  //层级别搞错了
	css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
	}
}
```

**`@import "./src/styles/variable.scss";`后面的`;`不要忘记，不然会报错**!

配置完毕你会发现scss提供这些全局变量可以在组件样式中使用了！！！

### 3.6mock数据

安装依赖:

```
pnpm install -D vite-plugin-mock mockjs
```

注意：vite-plugin-mock版本为2.9.6
在 vite.config.js 配置文件启用插件。

```
import { UserConfigExport, configEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
export default ({ command })=> {
  return {
    plugins: [
      vue(),
      viteMockServe({
        //localEnabled: command === 'serve',
         enabled: command === 'serve',
      }),
    ],
  }
}
```

在根目录创建mock文件夹:去创建我们需要mock数据与接口！！！

在mock文件夹内部创建一个user.ts文件

```
//用户信息数据
function createUserList() {
    return [
        {
            userId: 1,
            avatar:
            'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}

export default [
    // 用户登录接口
    {
        url: '/api/user/login',//请求地址
        method: 'post',//请求方式
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码
            const { username, password } = body;
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
            )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            //如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: {checkUser} }
        },
    },
]
```

**安装axios**

```
pnpm install axios
```

最后通过axios测试接口！！！

在main.js中测试mock接口

```
//测试代码：测试mock的接口能否使用
import axios from 'axios'

//登录接口
axios({
  url:'/api/user/login',
  method:'post',
  data:{
    username: 'admin',
    password: '111111'
  }
})
```

### 3.7axios二次封装

在开发项目的时候避免不了与后端进行交互,因此我们需要使用axios插件实现发送网络请求。在开发项目的时候

我们经常会把axios进行二次封装。

目的:

1:使用请求拦截器，可以在请求拦截器中处理一些业务(开始进度条、请求头携带公共参数)

2:使用响应拦截器，可以在响应拦截器中处理一些业务(进度条结束、简化服务器返回的数据、处理http网络错误)

在根目录下创建utils/request.ts

```
import axios from 'axios'
import { message } from 'antd';

const [messageApi] = message.useMessage();

//创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config) => {
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    //处理网络错误
    let msg = ''
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    messageApi.open({
      type: 'error',
      content: msg,
    });
    return Promise.reject(error)
  },
)
export default request

```



### 3.8API接口统一管理

创建用户模块接口：
api/user/index.ts



### 4.路由配置
安装路由依赖
pnpm install react-router-dom

在根目录下创建views文件夹
包括：登录页(Login)、首页(Home)
在根目录下创建router


router/index.tsx
```
import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/routers/interface";
import Login from "@/views/Login/index";

// * 导入所有router (批量导入) 
const metaRouters = import.meta.globEager("./modules/*.tsx");

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	...routerArray,
	{
		path: "*",
		element: <Navigate to="/404" />
	}
];

//使用useRoutes方法传入routesList生成Routes组件，配置路由表
const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;

```

如此配置后，我们的路由组件的访问的根路径/ 直接跳转到/login登录页


在App跟组件中，使用路由组件

```
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { HashRouter } from "react-router-dom";
import Router from "@/router/index"; //注册好的路由表
import './App.scss'

import {RemoveIcon, LoveIcon } from '@/components/IconImage'

/**
 * 
 * react-router-dom V6中启用全局路由模式
 * 全局路由有常用两种路由模式可选：HashRouter 和 BrowserRouter 
 * 当前我们采用HashRouter
 */

function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <Router></Router>
    </HashRouter>
  )
}

export default App

```

### 完成登录页面的静态


配置国际化
pnpm install react-i18next -S

pnpm install i18next -S

pnpm install moment -S


src目录下创建一个language文件夹配置国际化，包括如下
language/modules/en.ts
language/modules/zh.ts
language/index.ts

```
/*
* language/modules/en.ts
*/
export default {
	login: {
		confirm: "Login",
		reset: "Reset"
	},

};
```


```
/*
* language/modules/zh.ts
*/
export default {
	login: {
		confirm: "登录",
		reset: "重置"
	},

};

```

```
/**
** language/index.ts
*/

import i18n from "i18next";
import enUsTrans from "./modules/en";
import zhCnTrans from "./modules/zh";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enUsTrans
		},
		zh: {
			translation: zhCnTrans
		}
	},
	// 选择默认语言，选择内容为上述配置中的 key，即 en/zh
	fallbackLng: "zh",
	debug: false,
	interpolation: {
		escapeValue: false // not needed for react as it escapes by default
	}
});

export default i18n;

```

在入口文件main.tsx中引入language
```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@/language/index"; //国际化
```

在App根组件中使用
```
//antd组件全局设置使用ConfigProvider
import { ConfigProvider } from "antd";
import { HashRouter } from "react-router-dom";
import Router from "@/router/index";
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import i18n from "i18next";
import "moment/dist/locale/zh-cn";


function App() {
  const [i18nLocale, setI18nLocale] = useState(zhCN);

  return (
    <HashRouter>  
      <!-- 全局设置国际化-->
      <ConfigProvider locale={i18nLocale}>
      <Router></Router>
      </ConfigProvider>
    </HashRouter>
  )
}
```

封装的登录表单 LoginForm：
```
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next"; //多语言
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";

const LoginForm = (props: any) => {
	const [form] = Form.useForm();
  const { t } = useTranslation(); //多语言

	// 登录
	const onFinish = () => {
    console.log(`------`)
	};

	const onFinishFailed = () => {

	};

	return (
		<Form
      className="login_form"
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
      <h1>Hello</h1>
      <h2>欢迎来到硅谷甑选</h2>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login_btn">
         {/** 
				<Button
					onClick={() => {
						form.resetFields();
					}}
					icon={<CloseCircleOutlined />}
				>
					{t("login.reset")}
				</Button>
        */}
				<Button type="primary" htmlType="submit" icon={<UserOutlined />}>
					{t("login.confirm")}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm
```

## 配置服务器的跨域


1.封装请求拦截器和响应拦截器：utils/request.ts文件
2.配置跨域 vite.config.ts中跨域配置
3.环境变量的配置




//utils/reauest.ts
```
//进行axios二次封装:使用请求与响应拦截器
import axios from 'axios'
import { message, notification } from 'antd';
//const [messageApi, contextHolder] = message.useMessage();

//第一步:利用axios对象的create方法,去创建axios实例(其他的配置:基础路径、超时的时间)
const request = axios.create({
  //基础路径  import.meta.env.VITE_APP_BASE_API,
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带环境变量中配置的
  timeout: 5000, //超时的时间的设置
})
//第二步:request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  //获取用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
  //const userStore = useUserStore()
  const userStore = localStorage.getItem('TOKEN')
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  //config配置对象,headers属性请求头,经常给服务器端携带公共参数
  //返回配置对象
  return config
})

//第三步:响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调
    //简化数据
    return response.data
  },
  (error) => {
    //失败回调:处理http网络错误的
    //定义一个变量:存储网络错误信息
    let message = ''
    //http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    //提示错误信息
  /*  messageApi.open({
      type: 'error',
      content: message,
    });*/
    notification.config({
      description:message,
      placement: 'bottomRight',
      bottom: 50,
      duration: 3,
      rtl: true,
    });
    return Promise.reject(error)
  },
)
//对外暴露
export default request

```

2.vite.config.ts中
```
      //代理跨域
    server: {
      proxy: {
        '/dev-api': {
          //获取数据的服务器地址设置
          target: 'http://gmall-h5-api.atguigu.cn',
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
    },
```

环境变量的配置：
.env.development 开发环境如下：
```
# 本地环境
NODE_ENV = 'development'

# 本地环境接口地址

VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/dev-api'
VITE_SERVE="http://gmall-h5-api.atguigu.cn"
```



## login业务
```
登录成功，路由跳转到首页
//编程式路由跳转 使用useNavigate钩子函数
//useNavigate钩子函数生成navigate函数，可以通过 JS 代码完成路由跳转
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
message.success("登录成功！")
navigate(HOME_URL) 
```

## Home 首页静态



## 关于项目中的状态管理
目前项目中的state状态管理分为：global、menu两个模块
分别位于 store/modules/global、 store/modules/menu

本项目中用到的关于redux的依赖包：
	"react-redux": "^8.0.2",
  "redux": "^4.2.0",
  "redux-persist": "^6.0.0",
  "redux-promise": "^0.6.0",
  "redux-thunk": "^2.4.1",


react-redux:redux与react的绑定库
redux-persist:将redux的store中的数据自动缓存到浏览器的 localStorage 中
redux-promise:redux的中间件
redux-thunk:redux的中间件

1.安装依赖：
pnpm install redux react-redux redux-persist redux-promise redux-thunk -S

2.在src目录下创建store文件夹管理状态
store/index.ts

备注：整个项目中的state状态管理为 global、menu 。。。模块

//store/index.ts代码如下
```
import { legacy_createStore as createStore, combineReducers, Store, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";

// 创建reducer(拆分reducer)
const reducer = combineReducers({

});

// redux 持久化配置
const persistConfig = {
  key: "redux-state",
  storage: storage
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启 redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// 创建 store
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleWares));

// 创建持久化 store
const persistor = persistStore(store);

export { store, persistor };
```

3.在main.ts入口文件中
```
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
```
4.App根组件中使用connect 
  connect 函数接收 mapStateProps 函数，获取 mapStateProps 返回的最终组合后的状态，然后将其注入到 App 组件中，返回一个新的组件，然后交给 export default 导出。

```
import { connect } from "react-redux";

const App = (props: any) => {
....


//将export default App修改为
//App中的state为store中的global全局模块
const mapStateToProps = (state: any) => state.global; 
export default connect(mapStateToProps)(App);

}
```

ok,自此redux构建完成，接下来编写各个模块的reducer、action

### reducer及action
安装依赖 immer
pnpm install immer@9.0.15 -S
1.在store目录下创建modules
2.创建menu菜单模块的状态管理 【目前确认为：global、menu两个模块的状态管理】
  modules/menu/action.ts
  modules/menu/reducer.ts
3.store.index中添加菜单menu模块的reducer
4.组件中使用store中保存的状态




操作如下：
2. //modules/menu/action.ts 代码如下:
```
import * as types from "@/store/mutation-types";

// * updateCollapse
export const updateCollapse = (isCollapse: boolean) => ({
  type: types.UPDATE_COLLAPSE,
  isCollapse
});

```


2. // modules/menu/reducer.ts代码如下

```
import { AnyAction } from "redux";
import produce from "immer";
import * as types from "@/store/mutation-types";

/* MenuState */
export interface MenuState {
  isCollapse: boolean;
}

const menuState: MenuState = {
  isCollapse: false,
};

// menu reducer
const menu = (state: MenuState = menuState, action: AnyAction) =>
  produce(state, draftState => {
    switch (action.type) {
      case types.UPDATE_COLLAPSE:
        draftState.isCollapse = action.isCollapse;
        break;
      default:
        return draftState;
    }
  });

export default menu;

```



3. //store/index.ts添加menu的reducer
```
import menu from '@/store/modules/menu/reducer'

// 创建reducer(拆分reducer)
const reducer = combineReducers({
  menu   //添加menu
});
```




4. //组件中使用store中保存的isCollapse的state状态
```
import { connect } from "react-redux";
import { updadteCollapse } from "@/store/modules/menu/action";

//CollapseIcon组件，伸缩状态
const CollapseIcon=(props: any)=>{

const {isCollapse, updateCollapse}= props //redux中的状态可以从props中结构
 return(
   <div
			className="collapsed"
			onClick={() => {
				updateCollapse(!isCollapse);
			}}
		>
			{isCollapse ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
		</div>
  )
}



//connect提供的mapStateToProps，
const mapStateToProps = (state: any) => state.menu; 

//connect提供的mapDispatchToProps
const mapDispatchToProps = { updateCollapse };

export default connect(mapStateToProps, mapDispatchToProps)(CollapseIcon);


```

## 结合antd 完成LayoutHeader组件的开发
antd 开发手册：
https://ant-design-3x.gitee.io/docs/react/introduce-cn

项目中icon图标的设置





### 菜单路由的递归获取：
```

[{
"deleted": false,
"pid": "1",
"name": "权限管理",
"code": "Acl",
"level": 2,
"children": [{
      "name": "用户管理",
      "code": "User",
      "toCode": "",
      "level": 3,
      "children": [
          {
              "name": "添加用户",
              "code": "btn.User.add",
              "toCode": "",
              "type": 2,
              "level": 4,
              "children": [],
          },
          {
              "name": "删除用户",
              "code": "btn.User.remove",
              "toCode": "",
              "type": 2,
              "level": 4,
              "children": [],
              "select": false
          },
          {
              "name": "修改用户",
              "code": "btn.User.update",
              "toCode": "",
              "type": 2,
              "level": 4,
              "children": [],
              "select": false
          }
      ]
  },
  {
      "name": "角色管理",
      "code": "Role",
      "toCode": "",
      "type": 1,
      "level": 3,
      "children": [
          {
              "name": "添加角色",
              "code": "btn.Role.add",
              "toCode": "",
              "type": 2,
              "level": 4,
              "children": [],
              "select": false
          },
          {
              "name": "修改角色",
              "code": "btn.Role.update",
              "toCode": "",
              "type": 2,
              "level": 4,
              "children": [],
              "select": false
          },
          {
              "name": "删除角色",
              "code": "btn.Role.remove",
              "toCode": "",
              "type": 2,
              "level": 4,
              "children": [],
              "select": false
          }
      ]
   }

 ]
}]
```



以上的数据格式变为：
```
[{
  element: <LayoutIndex />,
	meta: {
		title: "权限管理"
		},
	children: [
    {
      //path:" /assembly/guide",
      element: <LayoutIndex />,
      meta: {
        title: "用户管理",
      },
      children:[
        {
          element: <LayoutIndex />,
          meta: {
            title: "添加用户",
          },
          children:[]
        },
        {
          element: <LayoutIndex />,
          meta: {
            title: "删除用户",
          },
          children:[]
        },
        {
          element: <LayoutIndex />,
          meta: {
            title: "修改用户",
          },
          children:[]
        },
      ]
    },
    {
      //path: "/assembly/guide",
      element: <LayoutIndex />,
      meta: {
        title: "角色管理",
      },
      children:[
        {
          element: <LayoutIndex />,
          meta: {
            title: "添加角色",
          },
          children:[]
        },
        {
          element: <LayoutIndex />,
          meta: {
            title: "删除角色",
          },
          children:[]
        },
        {
          element: <LayoutIndex />,
          meta: {
            title: "修改角色",
          },
          children:[]
        },
      ]
    }
  ]
}]
```



代码实现：
```
mapTree(org=>{
  haveChild = Array.isArray(org.children) && org.children.length>0
  return {
    element: org.level==2 ? <LayoutIndex />:<org.code />,
    meta: {
            title: org.name,
          },
    path: haveChild ? `/${org.code}/index`,
    children: haveChild ? org.children.map(item => mapTree(item)):[]
  }
})

const menuArray:RouteObject[] = menuList.map(item=> mapTree(item))

```

参考：https://blog.csdn.net/weixin_42217154/article/details/116142608



### 左侧菜单栏的静态实现

参考antd的layout 布局组件：
```
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

<Menu
  theme="dark"
  mode="inline"
  defaultSelectedKeys={['4']}
  items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
    (icon, index) => ({
      key: String(index + 1),
      icon: React.createElement(icon),
      label: `nav ${index + 1}`,
    }),
  )}
/>
```


可知<Menu> 菜单组件的items属性表示：菜单内容
将菜单组件封装一下：

```
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { updateCollapse } from "@/store/modules/global/action";
import './index.scss'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';

//定义类型
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Navigation One', 'sub1', <UploadOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),

  getItem('Navigation Two', 'sub2', <UserOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  getItem('Navigation Three', 'sub4', <VideoCameraOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

const LayoutMenu =(props:any)=>{
  const { t } = useTranslation();
  const { SubMenu } = Menu;
  const {isCollapse}= props

  return (

      <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={items}
        />   
  )

}

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
```


给<Menu>组件添加一个点击事件

```

 const  menuClick=(e:{key:string})=>{
  console.log("点击了",e.key)
 }

<Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={items}
          onClick={menuClick}
        />   

从点击的第二个参数key可以得知，这里可以放置组件的path路径，点击进行跳转


点击跳转，编程式导航

//路由跳转用到的hook
import { useNavigate } from 'react-router-dom'

//将item中的key设置为路由的路径，实现跳转
const items: MenuItem[] = [
  getItem('Navigation One', 'sub1', <UploadOutlined />, [
    getItem('Option 1', '/login'),
    getItem('Option 2', '/home/index'),
    getItem('Option 3', '/'),
   
  ]),

];

const LayoutMenu =(props:any)=>{
  const { t } = useTranslation();
  const { SubMenu } = Menu;
  const {isCollapse}= props
  const navigateTo = useNavigate()
  
  const  menuClick=(e:{key:string})=>{
    console.log("点击了",e.key)

  //点击跳转到对应的路由 ，编程式导航跳转，利用到一个hook
    navigateTo(e.key) //跳转

 }

   return (
      <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={items}
          onClick={menuClick}
        /> 
  )

}
```

### 改造menu组件，当前只能同时打开一个subMenu子菜单
当打开第二个折叠菜单时，上一个需要关闭

```
const items: MenuItem[] = [
  getItem('Navigation One', 'sub1', <UploadOutlined />, [
    getItem('Option 1', '/login'),
    getItem('Option 2', '/home/index'),
    getItem('Option 3', '/'),
    getItem('Option 4', '4'),
  ]),

  getItem('Navigation Two', 'sub2', <UserOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  getItem('Navigation Three', 'sub4', <VideoCameraOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];


 
const LayoutMenu =(props:any)=>{
  const { t } = useTranslation();
  const [openKeys, setOpenKeys] =useState([])
  const { SubMenu } = Menu;
  const {isCollapse}= props
  const navigateTo = useNavigate()
  
  const  menuClick=(e:{key:string})=>{
    console.log("点击了",e.key)

  //点击跳转到对应的路由 ，编程式导航跳转，利用到一个hook
    navigateTo(e.key)

 }
  
 //SubMenu 展开/关闭的回调
  const  handleOpenChange=(keys:string[])=>{
    console.log(`-----展开`, keys)  //['sub1','sub2']
    setOpenKeys([keys[keys.length-1]]); //当前打开的折叠菜单项
  }

  return (
      <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={items}
          onClick={menuClick}
          onOpenChange={handleOpenChange}
          openKeys={openKeys}
        /> 
  )

}
```















=====================================================================================

#### 3）将本地创建好的项目与github关联

##### A.在我的github中创建一个远程仓库：react_admin

```
…or create a new repository on the command line

echo "# react_admin" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/asd3884/react_admin.git //本地仓库关联
git push -u origin main

…or push an existing repository from the command line

git remote add origin https://github.com/asd3884/react_admin.git
git branch -M main
git push -u origin main
```

##### B.在项目根目录下初始化git

```
我创建好的项目路径为：
D:\bilibili\myWorkSpace\bilibiliReact\admin-client_blank>


git 操作如下：

HUAWEI@LAPTOP-507U33PC MINGW64 /d/bilibili/myWorkSpace/bilibiliReact/admin-client_blank
$ git init    //初始化git
Initialized empty Git repository in D:/bilibili/myWorkSpace/bilibiliReact/admin-client_blank/.git/

HUAWEI@LAPTOP-507U33PC MINGW64 /d/bilibili/myWorkSpace/bilibiliReact/admin-client_blank (master)
$ git add .   //添加到暂存区

HUAWEI@LAPTOP-507U33PC MINGW64 /d/bilibili/myWorkSpace/bilibiliReact/admin-client_blank (master)
$ git commit -m "init app"     //提交
[master (root-commit) 3039a39] init app
 14 files changed, 9124 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 package.json
 create mode 100644 public/favicon.ico
 create mode 100644 public/index.html
 create mode 100644 public/manifest.json
 create mode 100644 src/App.css
 create mode 100644 src/App.js
 create mode 100644 src/App.test.js
 create mode 100644 src/index.css
 create mode 100644 src/index.js
 create mode 100644 src/logo.svg
 create mode 100644 src/serviceWorker.js
 create mode 100644 yarn.lock

HUAWEI@LAPTOP-507U33PC MINGW64 /d/bilibili/myWorkSpace/bilibiliReact/admin-client_blank (master)
$ git remote add origin https://github.com/asd3884/react_admin.git    //关联远程仓库并取别名为origin

HUAWEI@LAPTOP-507U33PC MINGW64 /d/bilibili/myWorkSpace/bilibiliReact/admin-client_blank (master)
$ git push origin master   //提交到暂存区的代码推送到别名为origin的master分支
Enumerating objects: 18, done.
Counting objects: 100% (18/18), done.
Delta compression using up to 16 threads
Compressing objects: 100% (18/18), done.
Writing objects: 100% (18/18), 89.70 KiB | 6.90 MiB/s, done.
Total 18 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/asd3884/react_admin.git
 * [new branch]      master -> master

HUAWEI@LAPTOP-507U33PC MINGW64 /d/bilibili/myWorkSpace/bilibiliReact/admin-client_blank (master)

```

此次，本地和远程都有一个master分支

##### C:创建dev分支，作为项目开发的分支

```
HUAWEI@LAPTOP-507U33PC MINGW64 /d/bilibili/myWorkSpace/bilibiliReact/admin-client_blank (master)
$ git checkout -b dev   //创建并切换分支dev
Switched to a new branch 'dev'
//当前本地分支有两个：master、dev  远程分支只有一个master
HUAWEI@LAPTOP-507U33PC MINGW64 /d/bilibili/myWorkSpace/bilibiliReact/admin-client_blank (dev)
$ git push origin dev   //将当前分支推送到远程origin别名的dev分支，此时远程也有两个分支：master、dev
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'dev' on GitHub by visiting:
remote:      https://github.com/asd3884/react_admin/pull/new/dev
remote:
To https://github.com/asd3884/react_admin.git
 * [new branch]      dev -> dev

HUAWEI@LAPTOP-507U33PC MINGW64 /d/bilibili/myWorkSpace/bilibiliReact/admin-client_blank (dev)
$

```



注意：如果有新同学加入项目，git 操作如下：



```
1.从远程仓库中克隆项目
git clone 远程仓库地址

2.查看当前的分支
git branch

3.根据远程的dev生成本地的dev
git checkout -b dev origin/dev

4.再次查看当前分支，此时已经在dev分支
git branch

5.拉取最新代码(从远程origin的dev分支)
git pull origin dev
```

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
echo "# react_admin_template" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/asd3884/react_admin_template.git
git push -u origin main




++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


代码提交：
git commit -m 'feat: vue3+vite搭建后台管理系统模板'

git push origin 'master'

git fetch origin //git fetch 相当于是从远程获取最新版本到本地，不会自动merge

git checkout -b 'dev' //创建并切换分支：git checkout -b 'dev'

git push origin 'dev'

#提交本地dev分支作为远程的dev分支
git push origin dev:dev

# 以上都是master分支

比如:下面方式

```
//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

import type {

 loginFormData,

 loginResponseData,

 userInfoReponseData,

} from './type'

//项目用户相关的请求地址

enum API {

 LOGIN_URL = '/admin/acl/index/login',

 USERINFO_URL = '/admin/acl/index/info',

 LOGOUT_URL = '/admin/acl/index/logout',

}
//登录接口
export const reqLogin = (data: loginFormData) =>
 request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息

export const reqUserInfo = () =>

 request.get<any, userInfoReponseData>(API.USERINFO_URL)

//退出登录

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
```


## 项目参考：
GitHub：https://github.com/HalseySpicy/Hooks-Admin




## 四、项目的资源地址

贾成豪老师代码仓库地址:https://gitee.com/jch1011/vue3_admin_template-bj1.git

项目在线文档:

服务器域名:http://sph-api.atguigu.cn

swagger文档:

http://139.198.104.58:8209/swagger-ui.html

http://139.198.104.58:8212/swagger-ui.html#/

echarts:国内镜像网站

https://www.isqqw.com/echarts-doc/zh/option.html#title

http://datav.aliyun.com/portal/school/atlas/area_selector



纸飞机打开，switch为系统代理



https://github.com/panyushan-jade/react-template-admin




https://github.com/BetaSu/big-react