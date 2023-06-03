<template>
  <!-- 左侧导航 -->
  <v-main style="background-color: lightgrey">
    <v-navigation-drawer app v-model="drawer"
      ><v-row>
        <v-col cols="12"
          ><v-card height="64px" class="gradient d-flex align-center"
            ><div
              style="text-align: center; width: 100%"
              class="white--text font-weight-bold text-h5"
            >
              <v-icon large>mdi-bird</v-icon>
              像素交易
            </div></v-card
          >
        </v-col>
      </v-row>
      <v-tabs v-model="navi" vertical color="rgb(243, 172, 127)">
        <v-tab><v-icon left>mdi-tray-arrow-up</v-icon>已上架商品</v-tab>
        <v-tab><v-icon left>mdi-table-eye</v-icon>待审核商品</v-tab>
        <v-tab><v-icon left>mdi-alert</v-icon>用户举报</v-tab>
      </v-tabs>
    </v-navigation-drawer>
    <!-- 左侧导航 -->

    <!-- 标题栏 -->
    <v-app-bar app color="rgb(247, 228, 193)"
      ><v-app-bar-nav-icon @click="drawer = !drawer"
        ><v-icon large color="brown lighten-2"
          >mdi-menu</v-icon
        ></v-app-bar-nav-icon
      ><v-app-bar-nav-icon @click="goBack"
        ><v-icon large color="brown lighten-2"
          >mdi-arrow-left-thick</v-icon
        ></v-app-bar-nav-icon
      ></v-app-bar
    >
    <!-- 标题栏 -->

    <!-- 展示界面 -->
    <v-card height="100%" class="my-5 mx-5">
      <v-card-actions
        ><v-container
          ><v-row
            ><v-col
              cols="12"
              xs="12"
              sm="12"
              md="5"
              lg="5"
              class="d-flex py-0 my-0"
              ><div class="text-h6 pt-1 mr-3 resize" style="height: 65%">
                商品名称:
              </div>
              <v-text-field
                solo
                dense
                append-icon="mdi-magnify"
                placeholder="请输入要查询的商品"
                v-model="searchedName"
                style="flex-grow: 1"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="4"
              lg="4"
              class="d-flex py-0 my-0"
              ><div class="text-h6 pt-1 mr-3 resize" style="height: 65%">
                日期:
              </div>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    solo
                    dense
                    v-model="date"
                    label="选择日期"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    撤销
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    我选好了！
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

            <!-- 显示按钮 -->
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="3"
              lg="3"
              class="d-flex py-0 my-0 justify-center"
              ><v-btn @click="search" class="mx-4" color="rgb(247, 228, 193)"
                >查找</v-btn
              >
              <v-btn
                v-if="getItemType == '未审核'"
                class="mx-4"
                @click="allPass"
                >一键通过</v-btn
              >
            </v-col></v-row
          >
          <!-- 显示按钮 -->
        </v-container></v-card-actions
      >
      <!-- 列表面板 -->
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row
              ><v-col cols="2" class="resize">编号</v-col
              ><v-col cols="4" class="resize">商品名称</v-col
              ><v-col cols="2" class="resize">卖家昵称</v-col
              ><v-col cols="2" class="resize">发布/上架日期</v-col
              ><v-col cols="2" class="resize">游戏分区</v-col></v-row
            >
            <template v-slot:actions>
              <v-icon color="teal">mdi-border-none-variant</v-icon>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-tabs-items v-model="navi">
        <v-tab-item v-for="(list, key) in listGroup" :key="key">
          <v-expansion-panels accordion
            ><panel
              v-for="(item, key) in list"
              :key="key"
              :itemInfo="item"
              :itemType="getItemType"
            ></panel>
          </v-expansion-panels>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <!-- 列表面板 -->

    <!-- 展示界面 -->
    <v-footer app color="rgb(247, 228, 193)" class="justify-center"
      ><v-pagination
        v-model="currentPage"
        :length="pageLength"
        color="rgb(243, 172, 127)"
      ></v-pagination
    ></v-footer>
  </v-main>
</template>

<script>
import panel from "@/components/ExpandableItem.vue";
export default {
  components: { panel },
  mounted() {
    this.initPages();
  },
  updated() {},
  data() {
    return {
      //控制UI显示的变量
      navi: null, //导航条的切换index
      drawer: true, //左侧导航栏的显示状态
      menu: false, //日期选择器插入菜单的显示状态
      modal: false,
      menu2: false,

      //分页
      currentPage: 1,
      pageLength: 3,

      //搜索框
      searchedName: "",
      date: "",
      // searchedList: [],

      //三个导航项对应的三个页面
      listGroup: [], //页面组，为二维数组
      checkedList: [
        {
          model: 0,
          id: 1,
          title: "一条商品标题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          tag: "原神",
          date: "2023-05-01",
          price: "2999",
          intro:
            "你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色",
          picture: [
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          ],
          sellerId: 0,
          sellerName: "假装这是用户名",
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          favo: false,
          favoSnack: false,
        },
        {
          model: 0,
          id: 2,
          title: "一条商品标题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          tag: "原神",
          date: "2023-05-01",
          price: "2999",
          intro:
            "你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色",
          picture: [
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          ],
          sellerId: 0,
          sellerName: "假装这是用户名",
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          favo: false,
          favoSnack: false,
        },
      ],
      unCheckedList: [
        {
          model: 0,
          id: 1,
          date: "2023-05-01",
          title: "一条商品标题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          tag: "原神",
          price: "2999",
          intro:
            "你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色",
          picture: [
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          ],
          sellerId: 0,
          sellerName: "假装这是用户名",
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          favo: false,
          favoSnack: false,
        },
      ],
      reportedList: [
        {
          model: 0,
          id: 1,
          date: "2023-05-01",
          title: "一条商品标题",
          tag: "原神",
          price: "2999",
          intro:
            "你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色",
          picture: [
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
            "https://www.tandemconstruction.com/sites/default/files/styles/project_slider_main/public/images/project-images/2_3.jpg",
          ],
          sellerId: 0,
          sellerName: "假装这是用户名",
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          favo: false,
          favoSnack: false,
        },
      ],
      //获取的三个列表
    };
  },

  methods: {
    initPages() {
      this.listGroup = [
        this.checkedList,
        this.unCheckedList,
        this.reportedList,
      ]; //初始化页面,拉列表的axios请求可以写在里面
    },
    goBack: () => {}, //返回到上级路由界面

    // searchedWithWords(keyWord, date) {
    //   const filterList = [];

    //   var currentList = this.listGroup[this.navi];
    //   for (let index = 0; index < currentList.length; index++) {
    //     let id = "" + currentList[index].id;
    //     if (
    //       (currentList[index].title.includes(keyWord) ||
    //         id.includes(keyWord)) &&
    //       currentList[index].date.includes(date)
    //     ) {
    //       filterList.push(currentList[index]);
    //     }
    //   }

    //   this.searchedList = filterList;
    // },
    //根据输入框本地搜索所有匹配item

    search: () => {},
    //点击查找搜索

    allPass: () => {
      alert("成功！");
    }, //一键通过
  },
  computed: {
    getItemType: function () {
      switch (this.navi) {
        case 0: {
          return "已审核";
        }

        case 1: {
          return "未审核";
        }
        case 2: {
          return "被举报";
        }
        default: {
          return null;
        }
      }
      //获取当前item的type值
    },
  },
};
</script>

<style>
.gradient {
  background: linear-gradient(160deg, rgb(247, 228, 193), rgb(243, 172, 127));
}
.resize {
  overflow: scroll;
}
</style>