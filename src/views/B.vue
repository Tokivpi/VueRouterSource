<template>
  <div>
    ===================B组件===============
    <hr/>
    <el-button><router-link to="/B/a">切B组件下的a组件</router-link></el-button>
    <el-button><router-link to="/B/b">切B组件下的b组件</router-link></el-button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "B"
};
</script>

<style scoped>

</style>
