# axios
## 概念
Axios 是一个基于 Promise 的 HTTP 库，可以用在浏览器和 node进行网络请求。github开源地址https://github.com/axios/axios
## axios基本使用
### 一、使用 npm安装 axios 
`npm install axios`
### 二、将axios 相关文件存放在单独文件夹
可以单独建一个 `service` 文件夹，存放 axios 相关文件，在main.ts中引用
### 三、建立 axios.ts 文件
#### 1.创建axios实例对象
```typescript
// 从axios包中导出一个 axios 实例对象
import axios from 'axios'
```
#### 2.使用实例方法
可用的实例方法:
* axios#request(config):发起真实网络请求
* axios#get(url[, config]):获取数据，请求指定的信息，返回实体对象

* axios#delete(url[, config]):请求服务器删除指定的数据

* axios#head(url[, config])
* axios#post(url[, data[, config]]):向指定资源提交数据（例如表单提交或文件上传)

* axios#put(url[, data[, config]]):更新数据,从客户端向服务器传送的数据取代指定的文档的内容
* axios#patch(url[, data[, config]]):更新数据，是对put方法的补充，用来对已知资源进行局部更新

```typescript
// 1.模拟get请求
// axios.get()方法返回的是promise对象，是可以有类型的，决定了.then返回值类型
// 这里的res是AxiosResponse<any, any>类型
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data)
})
```

#### 3.axios配置选项
* 全局的配置
```typescript
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
```
* 每一个请求单独的配置
```typescript
axios
  .get('/get', {
    params: {
      name: 'coderwhy',
      age: 18
    },
    // 每一个请求单独的配置
    timeout: 5000,
    headers: {}
  })
  .then((res) => {
    console.log(res.data)
  })
```
#### 4.axios.all()多个请求一起返回
```typescript
axios
  .all([
    axios.get('/get', { params: { name: 'why', age: 18 } }),
    axios.post('/post', { data: { name: 'why', age: 18 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })
```
#### 5.axios拦截器
在请求发出之前，对请求执行相应操作；或者拦截请求回传的封装数据，从中只提取自己需要的数据
```typescript
// axios.interceptors.request.use(fn1,fn2)
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作
    // 1.给请求添加token
    // 2.isLoading动画
    console.log('请求成功的拦截')
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)

// fn1: 数据响应成功(服务器正常地返回了数据 20x)
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
```
## axios封装
axios封装的好处：方便管理api，抽取共同特性
### 拦截器中完成携带token和loading加载页面


