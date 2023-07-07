<template>
  <v-main>
    <!-- appbar -->
    <v-app-bar color="brown lighten-4" class="pt-1">
      <v-app-bar-nav-icon @click="backLastPage"
        ><v-icon large>mdi-chevron-left</v-icon>
      </v-app-bar-nav-icon>

      <v-container>
        <v-row>
          <v-col cols="3"> <v-app-bar-title></v-app-bar-title></v-col>
          <v-col cols="5" class="d-flex justify-center">
            <v-app-bar-title class="font-weight-bold mb-2"
              >我卖出的</v-app-bar-title
            ></v-col
          >

          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- appbar -->

    <!-- 横向导航栏 -->

    <v-tabs
      v-model="tab"
      show-arrows
      color="white"
      hide-slider
      class="align-center"
      height="7vh"
    >
      <v-tab
        v-for="(tab, index) in tabList"
        class="my-3 ml-5"
        style="height: 50%; min-width: 8vw"
        :key="index"
        active-class="Selected"
        @click="getSellerOrders(index)"
        >{{ tab }}
      </v-tab>
    </v-tabs>
    <!-- 横向导航栏-->

    <!-- 显示内容 -->

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(page, index) in pageLists" :key="index">
        <v-card elevation="0">
          <empty
            v-if="page.length == 0"
            style="margin-left: 12.5vw; margin-right: 12.5vw; margin-top: 25vh"
          >
            <template v-slot:image> </template>

            <template v-slot:title>你还没有买过宝贝呢 </template>

            <template v-slot:subtitle>快点去挑选心仪的宝贝吧 </template>

            <template v-slot:button
              ><v-btn rounded color="orange lighten-4" class="font-weight-bold">
                去市场</v-btn
              >
            </template>
          </empty>

          <v-list class="mx-2" v-else>
            <v-list-item-group
              ><item
                v-for="(item, keyCode) in page"
                :key="keyCode"
                :itemInfo="item"
              ></item
            ></v-list-item-group>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <!-- 显示内容-->
  </v-main>
</template>


  <script>
import empty from "@/components/EmptyBack.vue";

import item from "@/components/ListItem.vue";

export default {
  components: { empty, item },

  data() {
    return {
      tab: null,
      tabList: ["全部", "已付款", "已发货", "已完成"],
      pageLists: [],
      allList: [
        // {
        //   avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        //   userName: "271920984@qq.com",
        //   state: "我已付款",
        //   title: "这是一条测试标题",
        //   picture:
        //     "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
        //   price: 22,
        // },
      ],
      paidList: [
        // {
        //   avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        //   userName: "271920984@qq.com",
        //   state: "我已付款",
        //   title: "这是一条测试标题",
        //   picture:
        //     "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
        //   price: 22,
        // },
      ],
      outList: [
        // {
        //   avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        //   userName: "271920984@qq.com",
        //   state: "卖家已发货",
        //   title: "这是一条测试标题",
        //   picture:
        //     "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
        //   price: 22,
        // },
      ],
      completedList: [
        // {
        //   avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        //   userName: "271920984@qq.com",
        //   state: "交易完成",
        //   title: "这是一条测试标题",
        //   picture:
        //     "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
        //   price: 22,
        // },
      ],
    };
  },
  mounted() {
    this.initPages();
  },
  created() {
    this.getSellerOrders(0);
  },
  methods: {
    initPages() {
      this.pageLists = [
        this.allList,
        this.paidList,
        this.outList,
        this.completedList,
      ];
    },
    backLastPage() {
      this.$router.go(-1);
    },
    getSellerOrders(index) {
      let param = index - 1;
      this.$api.ordersApi.getSellerOrders(param).then((resp) => {
        this.allList.length = 0;
        this.paidList.length = 0;
        this.outList.length = 0;
        this.completedList.length = 0;
        resp.data.forEach((element) => {
          var orderInfo = {
            oid: element.orderId,
            state: element.state,
            price: element.merchandiseDetails.price,
            avatar: element.userBasicInfo.avatar,
            userName: element.userBasicInfo.userName,
            title: element.merchandiseDetails.title,
            picture: element.merchandiseDetails.pictures[0],
          };
          switch (param) {
            case -1: {
              this.allList.push(orderInfo);
              break; //记得break啊啊啊啊啊啊啊
            }
            case 0: {
              this.paidList.push(orderInfo);
              break;
            }
            case 1: {
              this.outList.push(orderInfo);
              break;
            }
            case 2: {
              this.completedList.push(orderInfo);
              break;
            }
          }
        });
      });
    },
  },
};
</script>


  <style scoped>
.Selected {
  font-weight: bolder;
  color: black;
  background-color: rgb(237, 209, 168);
  border-radius: 16px;
}
</style>