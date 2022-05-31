# .eslintrc.js文件导致的报错
## 换行问题
> Error：Expected linebreaks to be ‘LF’ but found ‘CRLF’ linebreak-style

> 原因：各种环境下换行符格式不一样
* window：CRLF(\r\n 或者^M\n)
* mac: CR(\r 或^M)
* linux/unix: LF(\n)

> 解决方法：
eslint 中的规则配置，添加linebreak-style规则，声明为Windows系统
在rules里添加以下代码：
`'linebreak-style': ["error", "windows"],`

## 空格问题

> Error：Expected indentation of 0 spaces but found 2

> 原因：空格不规范

> 解决方法：

在rules里添加以下代码：
`"indent": ["off", 2]`