<template>
  <div>
    ===================A组件===============
    <hr/>
    <el-button><router-link to="/A/a">切A组件下的a组件</router-link></el-button>
    <el-button><router-link to="/A/b">切A组件下的b组件</router-link></el-button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "A"
};
</script>

<style scoped>

</style>
