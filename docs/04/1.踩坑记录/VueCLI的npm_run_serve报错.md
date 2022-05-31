# VueCLI的npm run serve报错
## 问题详情
<img width="860px"   src="00.img\VueCLI的npm_run_serve报错\问题.png">

## 怀疑某个依赖没装上，执行了一下npm install
<img width="560px"   src="00.img\VueCLI的npm_run_serve报错\尝试1.png">

>报错：node.js v10.13.0版本太低，需要升级<br>
>解决方法：nvm切换node.js版本为16.14.2

## npm run serve依然报错
<img width="660px"   src="00.img\VueCLI的npm_run_serve报错\报错again.png">

>出现原因：<br>
使用npm安装依赖的时候vue-loader-v16有部分资源需要科学上网才能下载下来，可以采用国内镜像下载解决<br>

>解决方法：
1. 先卸载vue-loader-v16依赖<br>
`npm uninstall vue-loader-v16`
2. 使用cnpm安装vue-loader-v16依赖<br>
`cnpm i vue-loader-v16`

## cnpm : 无法将“cnpm”项识别为 cmdlet、函数、脚本文件或可运行程序的名称
>出现原因：未安装cnpm<br>

>解决方法：
1. 安装淘宝镜像<br>
`npm install -g cnpm --registry=https://registry.npm.taobao.org`
2. cnpm -v检查是否安装成功







