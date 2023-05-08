<template>
  <div class="login-view">
    <div class="box-intro">
      <h1 class="box-title">像素市场</h1>
      <p class="box-sub">Game Account Trading Platform</p>
    </div>
    <div class="user-login">
      <form>
        <input
          type="text"
          placeholder="请输入手机号"
          class="phone-input"
          v-model="loginForm.userPhone"
        />
        <input
          type="password"
          placeholder="请输入密码"
          class="pwd-input"
          v-model="loginForm.userPwd"
        />
        <v-btn class="login-btn" large @click="login">
          <v-icon color="brown lighten-3">mdi-airplane</v-icon>
          <span>登录</span>
        </v-btn>
      </form>
    </div>
    <div class="box-cover">
      <img src="../assets/img/island.png" />
      <router-link to="signin" id="login-link">去注册帐号</router-link>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";

export default {
  created() {
    localStorage.removeItem("authToken");
  },
  data() {
    return {
      loginForm: {
        userPhone: "",
        userPwd: "",
      },
    };
  },
  methods: {
    login() {
      this.$api.userApi.login(this.loginForm).then((resp) => {
        if (resp.code == 1000) {
          localStorage.setItem("authToken", resp.data);
          router.push("/profile/");
        }
      });
    },
  },
};
</script>

<style  scoped>
.login-view {
  height: 100vh;
  width: 100vw;
  background: rgb(238, 230, 223);
}

.box-intro {
  text-align: center;
  position: relative;
  top: 10%;
}

/* 如果取名 title 有冲突 */
.box-title {
  color: rgb(130, 113, 113);
  font-size: 1.6rem;
  letter-spacing: 0.1rem;
  letter-spacing: 20px;
}

.box-sub {
  color: #827373;
  position: relative;
  top: 5px;
  font-style: italic;
  font-size: 1.1rem;
}

.user-login {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 15vh;
}

.phone-input {
  margin-top: 3vh;
  background-color: rgb(248, 245, 242);
  box-shadow: 0px 2px 8px #c9c1c1;
  width: 75vw;
  border-radius: 10px;
  line-height: 3.2rem;
  text-indent: 0.8rem;
  font-size: 1.2rem;
  outline: none;
}

.pwd-input {
  margin-top: 4vh;
  background-color: rgb(248, 245, 242);
  box-shadow: 0px 2px 8px #c9c1c1;
  width: 75vw;
  border-radius: 10px;
  line-height: 3.2rem;
  text-indent: 0.8rem;
  font-size: 1.2rem;
  outline: none;
}

input::-webkit-input-placeholder {
  font-size: 0.9rem;
}

.login-btn {
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  margin-top: 2rem;
}

.login-btn span {
  margin: 0px 18px;
  color: #827171;
  font-size: 1rem;
}

.box-cover img {
  width: 80%;
  position: relative;
  left: -25%;
  margin-top: 400px;
  position: fixed;
}

#login-link {
  float: right;
  position: relative;
  top: 550px;
  margin: 28px 45px;
  font-size: 0.9rem;
  color: #5d433d;
  letter-spacing: 0.1rem;
  text-underline-offset: 0.5em;
}
</style>