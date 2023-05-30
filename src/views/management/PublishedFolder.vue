<template>
  <v-main>
    <!-- appbar -->
    <v-app-bar color="brown lighten-4" elevation="0">
      <v-app-bar-nav-icon to="/profile"
        ><v-icon large>mdi-chevron-left</v-icon></v-app-bar-nav-icon
      >
      <v-container>
        <v-row>
          <v-col cols="3"> <v-app-bar-title></v-app-bar-title></v-col>
          <v-col cols="5" class="d-flex justify-center">
            <v-app-bar-title class="font-weight-bold"
              >我发布的</v-app-bar-title
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
      class="align-center ma-0"
      height="7vh"
    >
      <v-tab
        v-for="(tab, index) in tabList"
        class="my-4 mx-3"
        style="height: 50%; min-width: 8vw"
        :key="index"
        active-class="Selected"
        >{{ tab }}
      </v-tab>
    </v-tabs>
    <!-- 横向导航栏-->

    <!-- 显示内容 -->
    <v-tabs-items v-model="tab" class="pa-0">
      <v-tab-item v-for="(page, index) in pageLists" :key="index">
        <v-card elevation="0">
          <empty
            v-if="page.length == 0"
            style="margin-left: 12.5vw; margin-right: 12.5vw; margin-top: 25vh"
          >
            <template v-slot:title>你还没有发布宝贝呢 </template>
            <template v-slot:subtitle
              >别人的世界花里胡哨，你的世界空空如也
            </template>
            <template v-slot:button>发布宝贝 </template>
          </empty>
          <v-list class="mx-2" v-else>
            <v-list-item-group>
              <item
                v-for="(item, keyCode) in page"
                :key="keyCode"
                :itemInfo="item"
              ></item>
            </v-list-item-group>
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
  mounted() {
    this.initPages();
  },
  updated() {},
  components: { empty, item },
  data() {
    return {
      tab: null,
      tabList: ["在卖", "草稿", "已下架"],
      soldingList: [
        {
          // state: "审核中",
          title: "这是一条测试标题",
          // content: "这是一个一个内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
          picture:
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          price: 99,
        },
        {
          // state: "已发布",
          title: "这是一条测试标题",
          // content: "这是一个一个内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
          picture:
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          price: 99,
        },
      ],
      // soldingButtons: [
      //   {
      //     name: "下架",
      //     buttonEvent: () => {
      //       alert("下架成功！您的宝贝将不会展示在页面中");
      //     },
      //   },
      // ],
      draftList: [
        {
          // state: "草稿已保存",
          title: "这是一条测试标题",
          // content: "这是一个一个内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
          picture:
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          price: 99,
        },
      ],
      // draftButtons: [
      //   {
      //     name: "删除",
      //     buttonEvent: () => {
      //       alert("删除成功！");
      //     },
      //   },
      // ],
      downList: [
        {
          // state: "已下架",
          title: "这是一条测试标题",
          // content: "这是一个一个内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
          picture:
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          price: 2999,
        },
      ],
      // downButtons: [
      //   {
      //     name: "删除",
      //     buttonEvent: () => {
      //       alert("删除成功！");
      //     },
      //   },
      //   {
      //     name: "重新修改",
      //     buttonEvent: () => {},
      //   },
      // ],
      pageLists: [],
    };
  },
  methods: {
    initPages() {
      this.pageLists = [this.soldingList, this.draftList, this.downList];
      // this.buttonLists = [
      //   this.soldingButtons,
      //   this.draftButtons,
      //   this.downButtons,
      // ];
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