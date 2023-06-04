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
    <v-tabs-items v-model="tab">
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
            <!-- FIXME: 如何插入跳转 -->
            <template v-slot:button >发布宝贝 </template>
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
  components: { empty, item },
  data() {
    return {
      page: 1,
      tab: null,
      tabList: ["已发布", "已下架"],
      pageLists: [],
      // 已发布列表
      soldingList: [
        // {
        //   state: "已发布",
        //   merchandiseId: "",
        //   title: "这是一条测试标题",
        //   picture: "https://s2.loli.net/2023/05/07/RaxzFbhBeik79H5.png",
        //   price: 99,
        // },
      ],
      // 已下架列表
      downList: [
        // {
        //   state: "已下架",
        //   title: "这是一条测试标题",
        //   picture: "https://s2.loli.net/2023/05/07/RaxzFbhBeik79H5.png",
        //   price: 2999,
        // },
      ],
    };
  },
  methods: {
    initPages() {
      this.pageLists = [this.soldingList, this.downList];
    },
    getPulishedList() {
      this.$api.merchandiseApi.getPublishedList(this.page).then((resp) => {
        resp.data.forEach(element => {
          this.soldingList.push(element);
        });
      });
    },
    getOutList() {
      this.$api.merchandiseApi.getOutList(this.page).then((resp) => {
        resp.data.forEach(element => {
          this.downList.push(element);
        });
      });
    },
  },
  created() {
    this.getPulishedList();
    this.getOutList();
  },
  mounted() {
    this.initPages();
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