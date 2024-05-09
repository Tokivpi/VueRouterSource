
## 使用 Vue CLI脚手架简易地实现Vuex

> #### 初始化：
>
> ```
> npm install
> ```
>
> #### 运行：
>
> ```
> npm run dev
> ```
### 以下是src/vue-router中各个文件做了哪些事情

> **install：**
>
> - 保存将通过Vue.use获取到的Vue，并通过Vue.mixin全局混入的方式使组件的属性添加**$store**属性，**所有的$store的属性都指向根组件的$store的属性值$options.store**
>
> **index：**该文件主要创建VueRouter类
>
> - VueRouter类中的通过beforeEach实现路由守卫，并将参数传入到属性beforeEachHooks数组中，并于后续history/base文件中的queue合并为一个数组，然后在每次路由跳转的时候都会执行
> - 根据不同的模式（hash和history）创建不同的路由系统（将这两个系统的公共部分写在base类（该类在history文件中）中）
> - init方法：初始化以及监听路由的变化
> - match方法：查询路由并返回
>
> **history文件夹：**
>
> - **base：**该文件夹为hash与history的公共逻辑
>   - 该类最重要的函数**transitionTo**，路由跳转都是由transitionTo进行跳转，当路由信息发生变化时就会调用该函数，并将当前路由信息传递给Vue._route属性上
> - **hash：**路由跳转在hash模式下的操作（初始化路由，监听路由变化） Route-link通过hash类方法中的push进行路由的跳转
> - **history：**路由跳转在history模式下的操作（初始化路由，监听路由变化） Route-link通过history类方法中的push进行路由的跳转
>
> **create-matcher**:返回 添加多个路由方法 **addRoutes**、添加一个路由方法**addRoute**、查找并返回相应的路由**match**
>
> **create-route-map：**将传过来的路由信息数组进行扁平化处理并整合成一个对象
>
> **components文件夹：**Router-link与Router-view的实现
