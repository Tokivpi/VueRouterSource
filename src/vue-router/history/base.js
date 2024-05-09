function createRoute(record, location) {
  let matched = [];
  if (record) {
    while (record) {
      // 例如“/about/a”为路径的路由 则要向matched数组中添加about路由的路由参数以及a路由的路由参数
      matched.unshift(record);
      record = record.parent;
    }
  }
  return {
    ...location,
    matched
  };
}

function renQueue(queue, from, to, cb) {
  function next(index) {
    if (index >= queue.length) return cb();
    let hook = queue[index];
    hook(from, to, () => next(index + 1));
  }

  next(0);
}

class Base {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, {
      path: "/"
    });
  }

  transitionTo(location, listener) {
    // this.router.match(location)执行return pathMap[location];
    let record = this.router.match(location);
    // 如果当路由切换的时候，也应该调用transitionTo方法，再次拿到新的记录
    let route = createRoute(record, { path: location });
    if (location === this.current.path && route.matched.length === this.current.matched.length) {
      return;
    }
    let queue = [].concat(this.router.beforeEachHooks);
    // 在当前位置this.current并未更新 所以this.current是上一个路由参数，route是当前路由参数
    renQueue(queue, this.current, route, () => {
      this.current = route;

      /*
    所接收的listener是一个函数，执行下列代码 获取当前路由地址信息并更新hash地址
   window.addEventListener("hashchange", () => {
     this.transitionTo(getHash());
   });
    */
      listener && listener();
      // 将当前路由信息传递给Vue._route属性 使其进行更细
      this.cb && this.cb(this.current);
    });
  }

  /* cb就是下列函数 当监听到数组变化的时候更新_route
  (newRoute) => {
      app._route = newRoute;
    }
   */
  listen(cb) {
    this.cb = cb;
  }
}

export default Base;
