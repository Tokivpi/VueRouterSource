import Base from "@/vue-router/history/base";

function ensureSlash() {
  if (window.location.hash) {
    return;
  }
  window.location.hash = "/";
}
// 获取当前的路由地址
function getHash() {
  return window.location.hash.slice(1);
}

class HashHistory extends Base {
  constructor(router) {
    super(router);
    //   初始化hash路由的时候，要给定一个默认的hash路径
    ensureSlash();
  }

  setupListener() {
    // 监听hash模式下路由的变化
    window.addEventListener("hashchange", () => {
      this.transitionTo(getHash());
    });
  }
  getCurrentLocation() {
    return getHash();
  }
  push(location) {
    this.transitionTo(location, () => {
      window.location.hash = location;
    });
  }
}

export default HashHistory;
