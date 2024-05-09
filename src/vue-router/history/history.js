import Base from "@/vue-router/history/base";

class BrowserHistory extends Base {
  constructor(router) {
    super(router);
  }
  setupListener() {
    // 监听hash模式下路由的变化
    window.addEventListener("popstate", function() {
      this.transitionTo(window.location.pathname);
    });
  }
  getCurrentLocation() {
    return window.location.pathname;
  }
  push(location) {
    this.transitionTo(location, () => {
      history.pushState({}, "", location);
    });
  }
}
export default BrowserHistory;
