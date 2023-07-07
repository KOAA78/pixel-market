<!--
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-05-30
-->
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
            v-for="item in favorList"
            :key="item.merchandiseId"
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
      page: {},
      // FIX：长标题只能显示一行
      favorList: [
        // {
        //   merchandiseId: "",
        //   avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        //   userName: "271920984@qq.com",
        //   title: "这是一条测试标题",
        //   picture:
        //     "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
        //   price: 2999,
        // },
      ],
    };
  },
  created() {
    this.getFavorites();
  },
  methods: {
    getFavorites() {
      this.$api.favoritesApi.getFavorites().then((resp) => {
        resp.data.forEach((element) => {
          var list = {
            merchandiseId: element.merchandiseId,
            userName: element.merchandiseDetails.userName,
            avatar: element.merchandiseDetails.avatar,
            title: element.merchandiseDetails.title,
            picture: element.merchandiseDetails.pictures[0],
            price: element.merchandiseDetails.price,
          };
          this.favorList.push(list);
        });
      });
    },
    viewDetails() {

    },
  },
};
</script>

<style scoped>
</style>