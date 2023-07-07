<template>
  <div class="signin-view">
    <div class="box-intro">
      <h1 class="box-title">欢迎加入我们</h1>
      <p class="box-sub">Welcome To Pixel Market</p>
    </div>
    <div class="user-register">
      <form :model="signForm">
        <input
          type="tel"
          placeholder="请输入手机号"
          class="phone-input"
          v-model="signForm.phone"
        />
        <input
          type="password"
          placeholder="请设置密码"
          class="pwd-input"
          v-model="signForm.password"
        />
        <input
          type="text"
          placeholder="验证码"
          class="code-input"
          v-model="signForm.code"
        />
        <v-btn
          class="code-btn"
          text
          color="brown lighten-2"
          @click="sendCode"
          :disabled="disabled"
          >{{ send }}</v-btn
        >
        <v-btn class="reg-btn" large @click="signIn">
          <v-icon color="brown lighten-3">mdi-email-arrow-right-outline</v-icon>
          <span>注册</span>
        </v-btn>
      </form>
    </div>
    <div class="box-cover">
      <img src="@/assets/img/dinosaur.png" />
      <router-link to="login" id="login-link">登录已有帐号</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signForm: {
        phone: "",
        password: "",
        code: "",
      },
      send: "获取验证码",
      disabled: false,
    };
  },
  methods: {
    sendCode() {
      const regExp = /^1[35789]\d{9}$/;
      if (!regExp.test(this.signForm.phone)) {
        this.$notify({
          message: "手机格式错误",
          offset: 115,
          type: "warning",
          duration: 2000,
        });
      } else {
        this.$api.userApi.sms(this.signForm.phone);
        //验证码倒计时
        let self = this;
        self.disabled = true;
        var time = 60;
        var timer = setInterval(fun, 1000);
        function fun() {
          time--;
          if (time >= 0) {
            self.send = time + "s 后刷新";
          } else if (time < 0) {
            self.send = "获取验证码";
            self.disabled = false;
            clearInterval(timer);
            time = 60;
          }
        }
      }
    },
    signIn() {
      this.$api.userApi.signin(this.signForm).then((resp) => {
        if (resp.code == 0) {
          this.$router.push("/login");
          this.$notify({
            message: "欢迎登录",
            offset: 115,
            type: "success",
            duration: 2000,
          });
        }
      });
    },
  },
};
</script>

<style  scoped>
.signin-view {
  height: 100vh;
  width: 100vw;
  background: rgb(238, 230, 223);
}

.box-intro {
  text-align: center;
  position: relative;
  top: 10%;
}

.box-title {
  color: rgb(130, 113, 113);
  font-size: 1.6rem;
  letter-spacing: 0.1rem;
}

.box-sub {
  color: #827373;
  position: relative;
  top: 5px;
  font-style: italic;
  font-size: 1.1rem;
}

.user-register {
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

.code-input {
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

.code-btn {
  float: right;
  bottom: 44px;
  margin-right: 7px;
}

input::-webkit-input-placeholder {
  font-size: 0.9rem;
}

.reg-btn {
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  margin-top: 2rem;
}

.reg-btn span {
  margin: 0px 18px;
  color: #827171;
  font-size: 1rem;
}

.box-cover img {
  width: 45%;
  position: relative;
  top: 600px;
  left: 35px;
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