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
              >我收藏的</v-app-bar-title
            ></v-col
          >
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-app-bar>
    <!-- appbar -->

    <!-- 收藏表 -->
    <v-card elevation="0">
      <v-list class="mx-2">
        <v-list-item-group
          ><item
            v-for="(item, index) in favorList"
            :key="index"
            :itemInfo="item"
          >
          </item
        ></v-list-item-group>
      </v-list>
    </v-card>
    <!-- 收藏表 -->
  </v-main>
</template>

<script>
import item from "@/components/ListItem.vue";
export default {
  components: {
    item,
  },
  data: () => {
    return {
      // FIX：长标题只能显示一行
      favorList: [
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          account: "271920984@qq.com",
          // state: "已收藏",
          title: "这是一条测试标题",
          // content: "这是一个一个内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
          picture:
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          price: 2999,
        },
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          account: "271920984@qq.com",
          // state: "已收藏",
          title: "这是一条测试标题",
          // content: "这是一个一个内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
          picture:
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          price: 2999,
        },
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          account: "271920984@qq.com",
          // state: "已收藏",
          title: "这是一条测试标题",
          // content: "这是一个一个内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
          picture:
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          price: 2999,
        },
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          account: "271920984@qq.com",
          // state: "已收藏",
          title: "这是一条测试标题",
          // content: "这是一个一个内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
          picture:
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          price: 2999,
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>