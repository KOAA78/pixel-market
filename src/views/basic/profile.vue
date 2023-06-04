<!--
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-05-06 08:23:24
-->

<template>
  <div class="profile-view">
    <bott-nav></bott-nav>
    <div class="user-info">
      <div class="info-content">
        <v-avatar size="72px" class="user-avatar">
          <v-img alt="Avatar" :src="userInfo.avatar"></v-img
        ></v-avatar>
        <span class="user-name">{{ userInfo.userName }}</span>
      </div>
    </div>
    <div class="user-operation">
      <div class="user-setting">
        <router-link to="/favor">
          <v-icon right>mdi-heart-outline</v-icon>
          <p>已收藏</p>
        </router-link>
      </div>
      <div class="user-setting">
        <router-link to="/published">
          <v-icon right>mdi-cart-arrow-up</v-icon>
          <p>已发布</p>
        </router-link>
      </div>
      <div class="user-setting">
          <router-link to="/sold">
        <v-icon right>mdi-currency-usd</v-icon>
        <p>已卖出</p>
        </router-link>
      </div>
      <div class="user-setting">
         <router-link to="/bought">
        <v-icon right>mdi-archive-check-outline</v-icon>
        <p>已买到</p>
        </router-link>
      </div>
    </div>
    <img src="@/assets/img/boxes.png" class="deco-box" />
  </div>
</template>

<script>
import router from "@/router/router";
import bottNav from "../../components/bottom-nav.vue";
export default {
  components: {
    bottNav,
  },
  created() {
    console.log(this.$store);
    console.log(this.$store.state.userId);
    this.$api.userApi.getInfo().then((resp) => {
      this.userInfo = resp.data
      if (resp.data.avatar == "") {
        this.userInfo.userAvatar = this.defaultAvatar;
      } else {
        this.userInfo.userAvatar = resp.data.avatar;
      }
    });
  },
  data() {
    return {
      defaultAvatar: "https://s2.loli.net/2023/05/07/oQ1NMXWUn4HSeaE.png",
      userInfo: {
        userName: "",
        userAvatar: "",
      },
    };
  },
  methods: {
    async logout() {
      let res = await this.$dialog.confirm({
        text: "确认退出登录",
        persistent: false,
        actions: [
          {
            text: "确认",
            color: "brown",
            key: true,
          },
        ],
      });
      if (res) {
        this.$api.userApi.logout();
        localStorage.clear("authToken");
        router.push("/login");
      }
    },
  },
};
</script>

<style  scoped>
.profile-view {
  height: 100vh;
  width: 100vw;
  background: rgb(253, 252, 250);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info {
  height: 13vh;
  width: 80vw;
  background: rgb(245, 240, 235);
  position: relative;
  top: 70px;
  box-shadow: 2px 2px 10px 1px rgb(210, 210, 208);
  border-radius: 10px;
}

.info-content {
  display: flex;
  position: relative;
  top: 50%;
}

.user-avatar {
  position: relative;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
}

.user-name {
  position: relative;
  left: 25%;
  top: -15px;
  font-size: 22px;
  color: rgba(73, 62, 53, 0.748);
  text-align: right;
}

.user-operation {
  height: 9vh;
  width: 80vw;
  background: rgb(245, 240, 235);
  box-shadow: 2px 2px 10px 1px rgb(210, 210, 208);
  border-radius: 10px;
  position: relative;
  top: 120px;
  display: flex;
}

.user-setting {
  width: 100%;
  margin: 15px;
  cursor: pointer;
  position: relative;
  left: 2px;
}

.user-setting p {
  color: rgb(64, 43, 35);
  position: relative;
  right: 2px;
}

.deco-box {
  position: relative;
  top: 325px;
  left: 65px;
}
</style>
