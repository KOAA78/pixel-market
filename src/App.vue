<!--
 * @Descripttion: 
 * @Author: Rylan
 * @Date: 2023-04-04 22:12:14
-->
<template>
  <v-app>
    <router-view v-if="isRouterAlive"></router-view>
  </v-app>
</template>
<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return { isRouterAlive: true };
  },
  mounted() {
    // 使用this.$store.state.XXX可以直接访问到仓库中的状态
    this.$store.state;
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "pixelFont";
}

.el-notification {
  right: 70px !important;
  width: 220px !important;
}

.el-notification p {
  position: relative;
  top: -5px !important;
}
</style>