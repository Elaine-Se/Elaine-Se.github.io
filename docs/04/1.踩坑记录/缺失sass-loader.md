# 缺失sass-loader
## 报错信息
> ERROR：Failed to compile with 1 errors<br>
 Failed to resolve loader: sass-loader<br>
 You may need to install it.


> 问题原因：
说明项目中没有sass-loader依赖，由于sass-loader需要node-sass组件,所以需要安装两个组件


> 解决方法：

1. 安装sass-loader
 `npm install sass-loader --save-dev`
2. 安装 node-sass
 `npm install sass-loader --save-dev`


## 安装sass-loader报错信息

> npm ERR! code ERESOLVE<br>
npm ERR! ERESOLVE could not resolve<br>
npm ERR! <br>
npm ERR! While resolving: 01_learn_component@0.1.0<br>
npm ERR! Found: webpack@4.46.0<br>
npm ERR! node_modules/webpack<br>
npm ERR!   peer webpack@"^4.0.0" from @intervolga/<br>
optimize-cssnano-plugin@1.0.6<br>

> 问题原因：
安装的包与已经存在的包有冲突 

> 解决方法：

1. 安装sass-loader
 `npm install sass-loader --legacy-peer-deps`
2. 安装 node-sass
 `npm install sass-loader -- force`
