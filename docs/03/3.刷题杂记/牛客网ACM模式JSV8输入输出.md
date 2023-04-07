# 牛客网ACM模式JSV8输入输出
##  多行输入多行输出 列数确定
### 题目描述：
> 输入描述:输入包括两个正整数a,b(1 <= a, b <= 1000),输入数据包括多组。

> 输出描述:输出a+b的结果

### 输入输出示例：
> 输入:<br>
```javascript
1 5
10 20
```


> 输出:输出a+b的结果<br>
```javascript
6
30
```
### 输入输出代码：

```javascript
// line初始化
let line = '';
// readline() 可以读取一行的数据，返回字符串
// n 行输入则 while 循环n次，每次返回一行字符串赋值给 line
// line得到的行输入为1 5
while(line = readline())
{
  // split(" ")按空格将line分割
  // .map(Number)遍历数组每一项，转化为数字
    let items = line.split(" ").map(Number); //根据空格切割
    let a = items[0];
    let b = items[1];
  // console.log输出自带换行
    console.log(a + b); 
}
```
##  多行输入多行输出 第一行输入指定行数
### 题目描述：
> 输入描述:输入第一行包括一个数据组数t(1 <= t <= 100) 有多少行。接下来每行包括两个正整数a,b(1 <= a, b <= 1000)。

> 输出描述:输出a+b的结果

### 输入输出示例：
> 输入:<br>
```javascript
2
1 5
10 20
```

> 输出:输出a+b的结果<br>
```javascript
6
30
```

### 输入输出代码：

```javascript
let t = readline();
while(line = readline()){
    let item = line.split(" ").map(Number);
    let a = item[0];
    let b = item[1];
    console.log(a + b);
}
```