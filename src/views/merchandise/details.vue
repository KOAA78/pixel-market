<template>
  <v-main>
    <!-- appbar -->
    <v-app-bar
      color="brown lighten-4"
      elevation="0"
      class="d-flex flex-column justify-center"
    >
      <v-app-bar-nav-icon @click="backLastPage"
        ><v-icon large>mdi-chevron-left</v-icon></v-app-bar-nav-icon
      >
      <v-container>
        <v-row>
          <v-col cols="9"> </v-col>
          <!-- 举报按钮 -->
          <v-col cols="3" class="d-flex flex-column align-end"
            ><v-app-bar-nav-icon @click="reportedDialog = true"
              ><v-icon>mdi-bell-alert</v-icon></v-app-bar-nav-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <!-- appbar -->

    <!-- 卖家基本信息 -->
    <v-card class="ma-3" elevation="1" light>
      <v-card-actions>
        <v-avatar style="border: 3px solid burlywood">
          <v-img :src="details.avatar"></v-img
        ></v-avatar>
        <v-card-title
          class="font-weight-bold brown--text overflow-hidden"
          style="text-overflow: ellipsis; white-space: nowrap"
          >{{ details.userName }}</v-card-title
        >
        <v-card-title
          class="font-weight-bold grey--text text-body-2 overflow-hidden"
          style="text-overflow: ellipsis; white-space: nowrap"
        >
          发布的商品
        </v-card-title>
      </v-card-actions>
    </v-card>
    <!-- 卖家基本信息 -->

    <!-- 商品图片滚播 -->
    <v-container>
      <v-carousel v-model="imgModel" height="50vw" style="border-radius: 10px">
        <v-carousel-item v-for="(img, key) in details.pictures" :key="key">
          <v-img :src="img" style="height: 100%"></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <!-- 商品图片滚播 -->
    <v-container>
      <v-card elevation="0"
        ><v-card-actions class="py-0">
          <v-card-title class="font-weight-bold red--text text-h5"
            >￥{{ details.price }}</v-card-title
          >
          <div
            class="font-weight-medium grey--text text-h6 mx-2"
            style="flex-grow: 1; text-align: end"
          >
            {{ details.tagName }}
          </div>
        </v-card-actions>
        <!-- <v-divider></v-divider> -->
        <v-card-actions>
          <v-card-title
            class="font-weight-bold brown--text text--darken-3 text-h6 pt-0"
            >{{ details.title }}</v-card-title
          >
        </v-card-actions>
        <!-- 简介-->
      </v-card>
      <v-card class="pa-2" min-height="30vh"
        ><v-card-text class="text-body-1">{{
          details.introduction
        }}</v-card-text>
      </v-card>
      <!-- 简介 -->
    </v-container>

    <!-- 底部 -->
    <v-footer app color="brown lighten-4">
      <!-- 商品上架状态 -->
      <v-container v-if="merchandiseState == true">
        <v-row>
          <v-col cols="2" class="d-flex justify-start pa-1 pl-2">
            <!-- 收藏图标 -->
            <v-app-bar-nav-icon @click="reverseFavorited(favo)"
              ><v-icon large>
                {{ favo ? "mdi-star-plus" : "mdi-star-plus-outline" }}</v-icon
              ></v-app-bar-nav-icon
            ></v-col
          ><v-spacer></v-spacer>
          <!-- 联系卖家 -->
          <v-col cols="2" class="d-flex justify-center pa-1">
            <v-app-bar-nav-icon @click="chatToSeller"
              ><v-icon large
                >mdi-account-arrow-right</v-icon
              ></v-app-bar-nav-icon
            >
          </v-col>
          <v-spacer></v-spacer>
          <!-- 立即购买 -->
          <v-col cols="2" class="d-flex justify-end pa-1">
            <v-app-bar-nav-icon class="mr-3" @click="buyMerchandise"
              ><v-icon large>mdi-cart</v-icon></v-app-bar-nav-icon
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="4"
            class="d-flex justify-start brown--text text--darken-4 pa-0 overflow-hidden rejustFont"
            style="text-overflow: ellipsis; white-space: nowrap"
          >
            {{ favo ? "已收藏" : "收藏" }}</v-col
          >
          <v-spacer></v-spacer>
          <v-col
            cols="4"
            class="d-flex justify-center brown--text text--darken-4 pa-0 pl-1 overflow-hidden"
            style="text-overflow: ellipsis; white-space: nowrap"
          >
            联系商家
          </v-col>
          <v-spacer></v-spacer>
          <v-col
            cols="4"
            class="d-flex justify-end brown--text text--darken-4 pa-0 pl-2 overflow-hidden"
            style="text-overflow: ellipsis; white-space: nowrap"
          >
            立即购买
          </v-col>
        </v-row>
      </v-container>
      <!-- 下架状态-->
      <v-container v-else>
        <v-row>
          <v-col cols="8" class="pa-1"></v-col>
          <v-col cols="4" class="pa-1"
            ><v-chip large class="pa-2" color="grey lighten-4"
              >商品已下架</v-chip
            ></v-col
          >
        </v-row>
      </v-container>
    </v-footer>
    <!-- 底部 -->

    <!-- 收藏按钮弹出消息 -->
    <!-- <v-snackbar v-model="favoSnack" color="brown darken-2">
      {{ details.favo ? "收藏商品成功！" : "取消收藏成功！" }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="favoSnack = false">
          我知道了
        </v-btn>
      </template>
    </v-snackbar> -->
    <!-- 收藏按钮弹出消息 -->

    <!-- 举报弹窗 -->
    <v-dialog v-model="reportedDialog">
      <v-card>
        <v-card-title class="brown lighten-2 pa-2 white--text">
          举报商品
        </v-card-title>
        <v-card-actions>
          <v-textarea label="举报理由" v-model="reportedReason"></v-textarea
        ></v-card-actions>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="reporetMerchandise"> 提交 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 举报弹窗 -->
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      imgModel: 0, //轮播图
      reportedDialog: false, //举报弹窗
      merchandiseState: true, //是否上架状态
      favoSnack: false, //收藏弹窗
      favo: false,
      reportedReason: "",
      details: {
        // state: "",
        // merchandiseId: 1,
        // title: "一条商品标题",
        // tagName: "原神",
        // price: "2999",
        // introduction:
        //   "你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色",
        // pictures: [
        //   "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
        //   "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
        //   "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
        // ],
        // userId: "1",
        // userName: "假装这是用户名",
        // avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
      },
    };
  },

  // NOTE: 异步？同步？
  created() {
    this.getDetails();
    // this.checkFavo();
  },
  watch: {
    // favo() {
    //   this.favoSnack = true;
    // },
  },
  methods: {
    backLastPage() {
      this.$router.go(-1);
    },
    getDetails() {
      this.$api.merchandiseApi
        .getDetails(this.$route.params.mid)
        .then((resp) => {
          this.details = resp.data;
          this.checkMerchandiseState();
          this.checkFavo();
        });
    },
    checkFavo() {
      this.$api.favoritesApi
        .checkFavor(this.$route.params.mid)
        .then((resp) => {
          this.favo = resp.data;
        });
    },
    checkMerchandiseState() {
      if (this.details.state == 0) {
        this.merchandiseState = true;
      } else {
        this.merchandiseState = false;
      }
    },
    reverseFavorited(favo) {
      if (favo == false) {
        this.$api.favoritesApi.favorMerchandise(this.$route.params.mid);
      } else {
        this.$api.favoritesApi.cancelFavor(this.$route.params.mid);
      }
      this.favo = !this.favo;
      // this.checkFavo(); //data无法重新渲染
    },
    chatToSeller() {
      this.$router.push("/chat/" + this.details.userId);
    },
    buyMerchandise() {
      this.$api.ordersApi.createOrder(this.$route.params.mid);
      this.merchandiseState = false;
    },
    reporetMerchandise() {
      this.$api.reportedApi
        .reporetMerchandise({
          merchandiseId: this.$route.params.mid,
          reportedReason: this.reportedReason,
        })
        .then((resp) => {
          this.reportedDialog = false;
        });
    },
  },
};
</script>

<style scoped>
.rejustFont {
  padding-left: 9px !important;
}
</style>