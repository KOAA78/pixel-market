<template>
  <v-main>
    <!-- appbar -->
    <v-app-bar color="brown lighten-4" class="pt-1">
      <v-app-bar-nav-icon
        ><v-icon large>mdi-chevron-left</v-icon>
      </v-app-bar-nav-icon>
      <v-container>
        <v-row>
          <v-col cols="3"> <v-app-bar-title></v-app-bar-title></v-col>
          <v-col cols="5" class="d-flex justify-center">
            <v-app-bar-title class="font-weight-bold"
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
      height="8vh"
    >
      <v-tab
        v-for="(tab, index) in tabList"
        class="my-4 mx-1"
        style="height: 50%; min-width: 8vw"
        :key="index"
        active-class="Selected"
        >{{ tab }}
      </v-tab>
    </v-tabs>
    <!-- 横向导航栏-->

    <!-- 显示内容 -->
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(page, index) in pageLists" :key="index">
        <v-card elevation="0">
          <empty
            v-if="allList.length == 0"
            style="margin-left: 12.5vw; margin-right: 12.5vw; margin-top: 25vh"
          >
            <template v-slot:image> </template>
            <template v-slot:title>你还没有卖出过宝贝呢 </template>
            <template v-slot:subtitle>别着急，宝贝总会遇到对的人 </template>
            <template v-slot:button
              ><v-btn rounded color="pink lighten-4" class="font-weight-bold">
                卖出宝贝</v-btn
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
import empty from "./EmptyBack.vue";
import item from "./ListItem.vue";
export default {
  mounted() {
    this.initPages();
  },
  updated() {},
  components: { empty, item },
  data() {
    return {
      tab: null,
      tabList: ["全部", "买家已付款", "已完成", "已退款"],
      pageLists: [],
      allList: [],
      paidList: [
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          account: "271920984@qq.com",
          state: "买家已付款",
          title: "这是一条测试标题",
          content: "这是一个一个内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
          picture: "这是图片的url",
          price: 22,
        },
      ],

      completedList: [
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          account: "271920984@qq.com",
          state: "买家已收货",
          title: "这是一条测试标题",
          content: "这是一个一个内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
          picture: "这是图片的url",
          money: "实际付款:999",
          price: 99,
        },
      ],
      refundLists: [
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          account: "271920984@qq.com",
          state: "买家已退款",
          title: "这是一条测试标题",
          content: "这是一个一个内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",

          picture: "这是图片的url",
          price: 99,
        },
      ],
    };
  },
  methods: {
    initPages() {
      this.pageLists = [
        this.allList,
        this.paidList,

        this.completedList,
        this.refundLists,
      ];
    },
  },
  watch: {},
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