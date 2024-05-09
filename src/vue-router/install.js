import routerLink from "@/vue-router/components/router-link";
import routerView from "@/vue-router/components/router-view";

export let Vue;

const install = function(_Vue) {
  Vue = _Vue;
  // mixin就是listener监听事件与视图组件渲染的桥梁
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        this._routerRoot = this;// this指向的是Vue实例对象
        this._router = this.$options.router;// this.$options.router指向的是VueRouter实例对象
        // Vue._router可以获取根实例（可以进行增查路由表操作）
        this._router.init(this);
        // Vue._route可以获取当前路由current对象
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        // 在所有组件上都增加一个_routerRoot指向根实例
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    }
  });
  // 在实例上取值的时候，会去拿到_router属性 代理
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot && this._routerRoot._router;
    }
  });
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot && this._routerRoot._route;
    }
  });

  // router-link 它的标签不一定为a
  Vue.component("router-link", routerLink);

  Vue.component("router-view", routerView);
};
export default install;
