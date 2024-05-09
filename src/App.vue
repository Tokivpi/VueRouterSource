<template>
  <div id="app">
    ===================app组件===============
    <hr/>
    <el-button><router-link to="/A">切A组件</router-link></el-button>
    <el-button><router-link to="/B">切B组件</router-link></el-button>
    <router-view />

  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
