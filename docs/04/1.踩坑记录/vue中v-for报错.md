# vue中v-for报错
## 报错信息
> [vue/require-v-for-key] Elements in iteration expect to have 'v-bind:key' dierrors<br>

> 问题原因：

* 在vue2.x后使用v-for时，为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性，
* 并且对于key属性不要使用对象或数组之类的非基本类型值作为 v-for 的 key。请用字符串或数值类型的值。


> 解决方法：
v-for 后面加上`:key="item"`