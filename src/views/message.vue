<!--
 * @Descripttion: 消息页面
 * @Author: Rui Lin
 * @Date: 2023-05-07 23:39:12
-->
<template>
  <div>
    <v-toolbar color="brown lighten-4" flat>
      <v-toolbar-title>消息</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
      <v-list>
        <v-list-item link>
          <v-list-item-avatar>
            <v-icon>mdi-alarm-light-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>系统通知</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    <bott-nav></bott-nav>
  </div>
</template>

<script>
import bottNav from "../components/bottom-nav.vue";

export default {
  components: {
    bottNav,
  },
  data() {
    return {
      messages: [
        {
          id: 1,
          sender: "通知消息",
          senderAvatar: "https://s2.loli.net/2023/05/07/oQ1NMXWUn4HSeaE.png",
          content: "Hello!",
        },
        {
          id: 2,
          sender: "Bob",
          senderAvatar: "https://s2.loli.net/2023/05/07/oQ1NMXWUn4HSeaE.png",
          content: "Hi, how are you?",
        },
        // Add more messages as needed
      ],
    };
  },
};
</script>

<style>
.message-list {
  max-width: 400px;
  margin: 0 auto;
}
</style>
