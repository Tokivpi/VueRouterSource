// import VueRouter from "vue-router";
import VueRouter from "../vue-router";
import Vue from "vue";

// Vue.use 如果里面放一个函数默认会执行（如果VueRouter里面有install 先去执行并给install函数传递Vue,install再去执行VueRouter函数）
Vue.use(VueRouter);
const routes = [
  {
    path: "/A",
    component: () => import("../views/A.vue"),
    children: [
      {
        path: "a",
        component: {
          render: (h) => <h1>a</h1>
        }
      },
      {
        path: "b",
        component: {
          render: (h) => <h1>b</h1>
        }
      }
    ]
  },
  {
    path: "/B",
    name: "B",
    component: () => import("../views/B.vue"),
    children: [
      {
        path: "a",
        component: {
          render: (h) => <h1>Ba</h1>
        }
      },
      {
        path: "b",
        component: {
          render: (h) => <h1>Bhhhhha</h1>
        }
      }
    ]
  }
];
const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
