<!--
 * @Descripttion: 聊天页面（有毛病，暂搁置）
 * @Author: Rui Lin
 * @Date: 2023-05-17 00:10:15
-->

<template>
  <div>
    <v-toolbar color="brown lighten-4" flat>
      <v-btn icon @click="backLastPage"
        ><v-icon> mdi-arrow-left </v-icon></v-btn
      >
      <v-toolbar-title>用户名</v-toolbar-title>
    </v-toolbar>
    <div class="chat-container">
      <div class="messages">
        <div class="message" v-for="message in messages" :key="message.id">
          <div class="sender">{{ message.sender }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
      <div class="input-container flex">
        <v-text-field
          color="brown lighten-2"
          v-model="newMessage.content"
          class="input-msg float-left"
        ></v-text-field>
        <v-btn
          @click="sendMessage"
          color="brown lighten-3"
          class="floag-right ml-2 mt-2 font-weight-bold white--text"
          >发送</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
  data() {
    return {
      newMessage: {
        // sender: this.$store.state.userId,
        sender: sessionStorage.getItem("userId"),
        recipient: this.$route.params.recipient,
        content: "",
      },
      messages: [],
    };
  },
  created() {
    this.connection();
    // console.log("发送者：" + this.newMessage.sender);
    // console.log("接收者：" + this.newMessage.recipient);
  },
  methods: {
    backLastPage() {
      this.$router.go(-1);
    },
    connection() {
      const socket = new SockJS("http://localhost:8090/socket");
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
        console.log("连接成功");
        this.subscribeMessages();
      });
    },
    sendMessage() {
      this.stompClient.send(
        `/app/chat/${this.newMessage.recipient}`,
        {},
        JSON.stringify(this.newMessage)
      );
      this.messages.push(this.newMessage);
      // console.log(this.messages)
      // this.newMessage.content = ""; // 清空输入框
    },
    subscribeMessages() {
      // const recipientQueue = `/user/${this.newMessage.sender}/queue/messages`;
      const recipientQueue = "/user/queue/messages";
      this.stompClient.subscribe(recipientQueue, (message) => {
        const receivedMessage = JSON.parse(message.body);
        this.messages.push(receivedMessage);
      });
    },
  },
};
</script>

<style scoped>
.input-container {
  width: 90vw;
  position: fixed;
  bottom: 0;
  left: 5vw;
}

.input-msg {
  width: 70vw;
}
</style>
