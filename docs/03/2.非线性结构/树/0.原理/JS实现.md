# 树的实现
## 二叉搜索树的封装
### 二叉搜索树的基本的属性
* 指向节点的根（root）
* 节点中的键（key）
* 左指针（right）
* 右指针（right）

<img width = 560px src = "00.img/树实现/树实现1.png"></img>

* 封装代码：

```javascript
    //封装二叉搜索树
    function BinarySearchTree(){

      //节点内部类
      function Node(key){
        this.key = key
        this.left = null
        this.right = null
      }

      //属性
      this.root = null
  }
```

### 二叉搜索树的常见操作
<!-- tabs:start -->
#### **增: insert(key)**

##### 实现思路
1. 首先根据传入的key创建一个节点对象;
2. 然后判断根节点是否存在，不存在时通过：this.root = newNode，直接把新节点作为二叉搜索树的根节点;
3. 若存在根节点，则重新定义一个内部方法insertNode（）用于查找插入点。

* 实现代码：
```javascript
//insert方法:对外向用户暴露的方法
 BinarySearchTree.prototype.insert = function(key){
   //1.根据key创建节点
   let newNode = new Node(key)
     
   //2.判断根节点是否存在
   if (this.root == null) {
     this.root = newNode
     //根节点存在时
   }else {
     this.insertNode(this.root, newNode)
   }
 }
```

##### 内部方法insertNode（）
比较根节点和新节点，一直查找新节点适合插入的位置，直到成功插入新节点为止。

* 当`newNode.key < node.key`，则向左查找:
  * 当node无左子节点时，直接插入；
  * 当node有左子节点时，递归调用insertNode(),直到遇到无左子节点，则成功插入newNode，递归停止

<img width = 560px src = "00.img/树实现/树实现2.png"></img>

* 当`newNode.key >= node.key`，则向右查找:
  * 当node无右子节点时，直接插入；
  * 当node有右子节点时，依然递归调用insertNode(),直到遇到传入insertNode方法的node无右子节点，成功插入newNode，递归停止

<img width = 560px src = "00.img/树实现/树实现3.png"></img>

- insertNode()代码实现：

```javascript
      //内部使用的insertNode方法:用于比较节点从左边插入还是右边插入
      BinarySearchTree.prototype.insertNode = function(node, newNode){
        //当newNode.key < node.key向左查找
/*----------------------分支1:向左查找--------------------------*/      
        if(newNode.key < node.key){
          //情况1：node无左子节点，直接插入
/*----------------------分支1.1--------------------------*/
          if (node.left == null) {
            node.left = newNode
          //情况2：node有左子节点，递归调用insertNode(),直到遇到无左子节点成功插入newNode后，不再符合该情况，也就不再调用insertNode()，递归停止。
/*----------------------分支1.2--------------------------*/
          }else{
            this.insertNode(node.left, newNode)
          }
        //当newNode.key >= node.key向右查找
/*-----------------------分支2:向右查找--------------------------*/        
        }else{
          //情况1：node无右子节点，直接插入
/*-----------------------分支2.1--------------------------*/ 
          if(node.right == null){
            node.right == newNode
          //情况2：node有右子节点，依然递归调用insertNode(),直到遇到无右子节点成功插入newNode为止
/*-----------------------分支2.2--------------------------*/ 
          }else{
            this.insertNode(node.right, newNode)
          }
        }
      }
```

#### **查: search(key)**
> 查找特定值：从根节点开始将需要查找节点的key值与之比较，若node.key < root则向左查找，若node.key > root就向右查找，直到找到或查找到null为止。

* 实现代码：
```javascript
 //查找特定的key
  BinarySearchTree.prototype.search = function(key){
    //1.获取根节点
    let node = this.roo
    //2.循环搜索key
    while(node != null){
      if (key < node.key) {
        //小于根(父)节点就往左边找
        node = node.left
        //大于根(父)节点就往右边找
      }else if(key > node.key){
        node = node.right
      }else{
        return true
      }
    } 
    return false
  }
```

* 测试代码：
```javascript
    //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(3);
    bst.insert(9);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(12);
    bst.insert(14);
    bst.insert(20);
    bst.insert(18);
    bst.insert(25);
    bst.insert(6);
    
    //3.测试搜索方法
    console.log(bst.search(24));//false
    console.log(bst.search(13));//true
    console.log(bst.search(2));//false
```

#### **最大/小值**
> 二叉搜索树中查找最值非常简单，最小值在二叉搜索树的最左边，最大值在二叉搜索树的最右边。

* 实现代码：
```javascript
      //寻找最大值
      BinarySearchTree.prototype.max = function () {
        //1.获取根节点
        let node = this.root
        //2.定义key保存节点值
        let key = null
        //3.依次向右不断查找，直到节点为null
        while (node != null) {
          key = node.key
          node = node.right
        }
        return key
      }

      //寻找最小值
      BinarySearchTree.prototype.min = function(){
         //1.获取根节点
         let node = this.root
        //2.定义key保存节点值
        let key = null
        //3.依次向左不断查找，直到节点为null
        while (node != null) {
          key = node.key
          node = node.left
        }
        return key
      }
```



#### **删: remove(key)**
##### 实现思路：
1. 先找到需要删除的节点，若没找到，则不需要删除；
2. 删除找到的指定节点，后分3种情况：
    * 删除叶子节点；
    * 删除只有一个子节点的节点；
    * 删除有两个子节点的节点
        * 如果要删除的节点有两个子节点，甚至子节点还有子节点，这种情况下需要从要删除节点下面的子节点中找到一个合适的节点，来替换当前的节点。

##### 若用current表示需要删除的节点，则合适的节点指的是：
  * current左子树中比current小一点点的节点，即current左子树中的最大值；
  * current右子树中比current大一点点的节点，即current右子树中的最小值；

在二叉搜索树中，这两个特殊的节点有特殊的名字：
  * 比current小一点点的节点，称为current节点的前驱。比如下图中的节点5就是节点7的前驱；
  * 比current大一点点的节点，称为current节点的后继。比如下图中的节点8就是节点7的后继；

##### 实现代码：
```javascript

      //删除节点
      BinarySearchTree.prototype.remove = function(key){
  /*------------------------------1.寻找要删除的节点---------------------------------*/
        //1.1.定义变量current保存删除的节点，parent保存它的父节点。isLeftChild变量保存current是否为parent的左节点
        let current = this.root
        let parent = null
        let isLeftChild = true

        //1.2.开始寻找删除的节点
        while (current.key != key) {
          parent = current
          // 小于则往左查找
          if (key < current.key) {
            isLeftChild = true
            current = current.left
          } else{
            isLeftChild = false
            current = current.right
          }
          //找到最后依然没有找到相等的节点
          if (current == null) {
            return false
          }
        }
        //结束while循环后：current.key = key

  /*------------------------------2.根据对应情况删除节点------------------------------*/
        //情况1：删除的是叶子节点(没有子节点)
        if (current.left == null && current.right ==null) {
          if (current == this.root) {
            this.root = null
          }else if(isLeftChild){
            parent.left = null
          }else {
            parent.right =null
          }
        }
        //情况2：删除的节点有一个子节点
        //当current存在左子节点时
        else if(current.right == null){
            if (current == this.root) {
              this.root = current.left
            } else if(isLeftChild) {
                parent.left = current.left
            } else{
                parent.right = current.left
            }
        //当current存在右子节点时
      } else if(current.left == null){
            if (current == this.root) {
              this.root = current.right
            } else if(isLeftChild) {
                parent.left = current.right
            } else{
                parent.right = current.right
            } 
      }
        //情况3：删除的节点有两个子节点
        else{
          //1.获取后继节点
          let successor = this.getSuccessor(current)

          //2.判断是否根节点
          if (current == this.root) {
            this.root = successor
          }else if (isLeftChild){
            parent.left = successor
          }else{
            parent.right = successor
          }

          //3.将后继的左子节点改为被删除节点的左子节点
          successor.left = current.left
        }
      }

      //封装查找后继的方法
      BinarySearchTree.prototype.getSuccessor = function(delNode){
        //1.定义变量,保存找到的后继
        let successor = delNode
        let current = delNode.right
        let successorParent = delNode

        //2.循环查找current的右子树节点
        while(current != null){
          successorParent = successor
          successor = current
          current = current.left
        }

        //3.判断寻找到的后继节点是否直接就是删除节点的right节点
        if(successor != delNode.right){
          successorParent.left = successor.right
          successor.right = delNode.right 
        }
        return successor
      }
```

##### 测试代码：

  ```javascript
   //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(3);
    bst.insert(9);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(12);
    bst.insert(14);
    bst.insert(20);
    bst.insert(18);
    bst.insert(25);
    bst.insert(6);
    bst.insert(19);
    
   //3.测试删除代码
    //删除没有子节点的节点
    bst.remove(3)
    bst.remove(8)
    bst.remove(10)

    //删除有一个子节点的节点
    bst.remove(5)
    bst.remove(19)

    //删除有两个子节点的节点
    bst.remove(9)
    bst.remove(7)
    bst.remove(15)

    //遍历二叉搜索树并输出
    let resultString = ""
    bst.midOrderTraversal(function(key){
      resultString += key + "->"
    })
    alert(resultString)
  ```

<!-- tabs:end -->


### 二叉搜索树的遍历方法
  * 深度优先遍历
    * 前序遍历（递归法，迭代法）
    * 中序遍历（递归法，迭代法）
    * 后序遍历（递归法，迭代法）
  * 广度优先遍历
    * 层次遍历（迭代法）

<!-- tabs:start -->
#### **先序遍历: preOrderTraverse**
##### 遍历过程
1. 首先，遍历根节点；
2. 然后，遍历其左子树；
3. 最后，遍历其右子树

<img width = 560px src = "00.img/树实现/树实现4.png"></img>

* 代码实现：
```javascript
	  //先序遍历
      //传入一个handler函数方便之后对得到的key进行处理
      BinarySearchTree.prototype.preOrderTraversal = function(handler){
        // handler函数在外部定义
        this.preOrderTraversalNode(this.root, handler)
      }

      //封装内部方法，对某个节点进行遍历
      BinarySearchTree.prototype.preOrderTraversalNode = function(node,handler){
        if (node != null) {
          //1.处理经过的节点
          handler(node.key)
/*----------------------递归1----------------------------*/
          //2.遍历左子树中的节点
          this.preOrderTraversalNode(node.left, handler)
/*----------------------递归2----------------------------*/
          //3.遍历右子树中的节点
          this.preOrderTraversalNode(node.right, handler)
        }
      }
```
* 测试代码：
```javascript
    //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(3);
    bst.insert(9);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(12);
    bst.insert(14);
    bst.insert(20);
    bst.insert(18);
    bst.insert(25);
    bst.insert(6);
    
    //3.测试遍历
    let resultString = ""
    //传入处理节点值的handler函数
    bst.preOrderTraversal(function(key){
      resultString += key + "->"
    })
    alert(resultString)
```


* 过程详解

遍历以下二叉搜索树为例：

  <img width = 560px src = "00.img/树实现/树实现5.png"></img>

  * 首先调用preOrderTraversal方法，在方法里再调用preOrderTraversalNode方法用于遍历二叉搜索树。
  * 在preOrderTraversalNode方法中，递归1负责遍历左子节点，递归2负责遍历右子节点。
      <img width = 760px src = "00.img/树实现/树实现6.png"></img>

      1. 先执行递归 1，记为 A()，执行过程如上图所示，依次遍历左节点：11,7,5,3。
      2. 遍历 3 的左节点，但是 3 的左节点为空，递归1结束
      3. 向上返回，执行递归2，遍历 3 的右节点，3 的右节点为空，继续向上返回。
      4. 依次遍历5,7,11的右节点，而在右节点中继续递归。

      <img width = 860px src = "00.img/树实现/树实现7.png"></img>

#### **中序遍历: inOrderTraverse**
##### 遍历过程
1. 首先，遍历其左子树；
2. 然后，遍历根节点；
3. 最后，遍历其右子树

* 代码实现：
```javascript
      //中序遍历
      BinarySearchTree.prototype.midOrderTraversal = function(handler){
        this.midOrderTraversalNode(this.root, handler)
      }

      BinarySearchTree.prototype.midOrderTraversalNode = function(node, handler){
        if (node != null) {
          //1.遍历左子树中的节点
          this.midOrderTraversalNode(node.left, handler)
          
          //2.处理节点
          handler(node.key)

          //3.遍历右子树中的节点
          this.midOrderTraversalNode(node.right, handler)
        }
      }
```
* 测试代码：
```javascript
  //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(3);
    bst.insert(9);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(12);
    bst.insert(14);
    bst.insert(20);
    bst.insert(18);
    bst.insert(25);
    bst.insert(6);	
    
    //3.测试中序遍历
    let resultString2 =""
    bst.midOrderTraversal(function(key){
      resultString2 += key + "->"
    })
    alert(resultString2)
```

* 过程详解

遍历以下二叉搜索树为例：

  <img width = 560px src = "00.img/树实现/树实现8.png"></img>

  输出节点的顺序应为：3 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13 -> 14 -> 15 -> 18 -> 20 -> 25 。

#### **后序遍历: postOrderTraverse**

##### 遍历过程

1. 首先，遍历其左子树；
2. 然后，遍历其右子树；
3. 最后，遍历根（父）节点；

* 代码实现：
```javascript
            //后序遍历
      BinarySearchTree.prototype.postOrderTraversal = function(handler){
        this.postOrderTraversalNode(this.root, handler)
      }

      BinarySearchTree.prototype.postOrderTraversalNode = function(node, handler){
        if (node != null) {
          //1.遍历左子树中的节点
          this.postOrderTraversalNode(node.left, handler)
          
          //2.遍历右子树中的节点
          this.postOrderTraversalNode(node.right, handler)

          //3.处理节点
          handler(node.key)
        }
      }
```
* 测试代码：
```javascript
    //测试代码
    //1.创建BinarySearchTree
    let bst = new BinarySearchTree()

    //2.插入数据
    bst.insert(11);
    bst.insert(7);
    bst.insert(15);
    bst.insert(5);
    bst.insert(3);
    bst.insert(9);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(12);
    bst.insert(14);
    bst.insert(20);
    bst.insert(18);
    bst.insert(25);
    bst.insert(6);
    
    //3.测试后序遍历
    let resultString3 =""
    bst.postOrderTraversal(function(key){
      resultString3 += key + "->"
    })
    alert(resultString3)
```

* 过程详解

遍历以下二叉搜索树为例：

  <img width = 560px src = "00.img/树实现/树实现9.png"></img>
  
  输出节点的顺序应为：3 -> 6 -> 5 -> 8 -> 10 -> 9 -> 7 -> 12 -> 14 -> 13 -> 18 -> 25 -> 20 -> 15 -> 11 。

#### **层次遍历: levelOrder**

* 实现代码：
```javascript
var levelOrder = function(root) {
    //二叉树的层序遍历
    let res=[],queue=[];
    queue.push(root);
    if(root===null){
        return res;
    }
    while(queue.length!==0){
        // 记录当前层级节点数
        let length=queue.length;
        //存放每一层的节点 
        let curLevel=[];
        for(let i=0;i<length;i++){
            let node=queue.shift();
            curLevel.push(node.val);
            // 存放当前层下一层的节点
            node.left&&queue.push(node.left);
            node.right&&queue.push(node.right);
        }
        //把每一层的结果放到结果数组
        res.push(curLevel);
    }
    return res;
};
```
<!-- tabs:end -->