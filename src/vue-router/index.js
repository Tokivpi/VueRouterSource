import install from "@/vue-router/install";
import { createMatcher } from "@/vue-router/create-matcher";
import HashHistory from "@/vue-router/history/hash";
import BrowserHistory from "@/vue-router/history/history";

class VueRouter {
  constructor(options) {
    // 路由守卫
    this.beforeEachHooks = [];
    let routes = options.routes || [];
    // +++++++++++++++++++++++++++++++++++++++++++++++++
    // 将routes里面的数据进行扁平化处理并实现匹配、添加操作
    // +++++++++++++++++++++++++++++++++++++++++++++++++
    this.matcher = createMatcher(routes);

    //   根本不同的模式创建对应的路由系统 VueRouter默认模式为hash
    let mode = options.mode || "hash";
    if (mode === "hash") {
      this.history = new HashHistory(this);
    } else if (mode === "history") {
      this.history = new BrowserHistory(this);
    }
  }
  match(location) {
    return this.matcher.match(location);
  }
  push(location) {
    return this.history.push(location);
  }
  // 路由守卫
  beforeEach(cb) {
    this.beforeEachHooks.push(cb);
  }
  // 初始化以及监听路由的变化
  init(app) {
    let history = this.history;
    // 监听路径的变化
    history.transitionTo(history.getCurrentLocation(), () => {
      history.setupListener();
    });
    // 更新_route的值使它能够发生变化，数据变化会自动重新渲染视图
    history.listen((newRoute) => {
      app._route = newRoute;
    });
  }
}

VueRouter.install = install;
export default VueRouter;
