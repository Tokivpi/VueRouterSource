export default {
  functional: true,
  // 解构出来的parent就是VUE的实例对象
  render(h, { parent, data }) {
    data.routerView = true;
    let route = parent.$route;
    // 组件渲染的时候要进行层级渲染
    let depth = 0;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        // 这个depth就是个标识，标识router-view的层级 router-link跳转的只能在节点和此层级上进行渲染
        depth++;
      }
      parent = parent.$parent;
    }
    let record = route.matched[depth];
    if (!record) {
      return h();
    }
    return h(record.component, data);
  }
};
