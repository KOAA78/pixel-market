<!-- Warnning：此组件为避免数据过多造成赘余，故只支持插槽传值 -->
<!-- 复用组件说明
@插槽：

image：背景图
title：背景标题
subtitle：副标题
button：跳转按钮

@此组件功能：目标可操作项为空时的展示背景
 -->
<template>
  <v-card width="75vw" elevation="0">
    <slot name="image"></slot>
    <v-card-title class="d-flex justify-center">
      <slot name="title"></slot>
    </v-card-title>
    <v-card-subtitle class="d-flex justify-center">
      <slot name="subtitle"></slot>
    </v-card-subtitle>
    <v-card-text class="d-flex justify-center">
      <slot name="button"></slot>
    </v-card-text>
    <slot></slot>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
</style>