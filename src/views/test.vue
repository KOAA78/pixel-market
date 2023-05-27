<!--
 * @Descripttion: socket连接测试
 * @Author: Rui Lin
 * @Date: 2023-05-17 02:29:05
-->
<template>
  <div>
    <h2>Socket Test</h2>
    <button @click="senMessage">发送消息</button>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
export default {
  data() {
    return {};
  },
  created() {
    this.connection();
  },
  methods: {
    connection() {
      const socket = new SockJS("http://localhost:8090/socket");
      this.stompClient = Stomp.over(socket);
      
      this.stompClient.connect({}, (frame) => {
        console.log("连接成功");
        this.stompClient.subscribe("/topic/greeting", (resp) => {
          console.log(resp.body);
        });
      });
    },
    senMessage() {
      this.stompClient.send("/app/hello", {}, "Rylan");
    },
  },
};
</script>