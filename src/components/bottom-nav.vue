<template>
  <div class="nav-view">
    <v-layout class="bott-nav">
      <v-bottom-navigation color="brown lighten-3" mode="shift" grow>
        <v-btn to="/home">
          <span>首页</span>
          <v-icon>mdi-home-search-outline</v-icon>
        </v-btn>
        <v-btn to="/message">
          <span>消息</span>
          <v-icon>mdi-package-variant-closed</v-icon>
        </v-btn>
        <v-btn to="/profile">
          <span>我的</span>
          <v-icon>mdi-account-arrow-up-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "bott-nav",
  data() {
    return {};
  },
};
</script>

<style  scoped>
.nav-view {
  position: fixed;
  bottom: 0;
  width: 100vw;
}
</style>
