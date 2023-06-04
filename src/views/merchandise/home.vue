<!--
 * @Descripttion: 首页
 * @Author: Rui Lin
 * @Date: 2023-05-07 18:56:56
-->

<template>
  <div class="zone-view">
    <div class="mx-auto zone-card">
      <v-text-field
        placeholder="查找游戏"
        color="brown"
        class="mx-auto search-input"
        append-icon="mdi-magnify"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-text-field>
    </div>
    <div class="mx-auto zone-container">
      <v-row>
        <v-col
          v-for="card in merchandise"
          :key="card.merchandiseId"
          :cols="24"
          style="padding-top: 0"
        >
          <v-card
            height="200px"
            rounded="lg"
            @click="displayDetails(card.merchandiseId)"
          >
            <v-img :src="card.picture" height="140px"></v-img>
            <h4 class="pa-2 brown--text">{{ card.title }}</h4>
            <p class="red--text">￥{{ card.price }}</p>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-btn
      elevation="5"
      fab
      absolute
      color="brown lighten-3"
      right
      class="add-btn"
      to="/issue"
    >
      <v-icon color="white">mdi-plus</v-icon></v-btn
    >
    <bott-nav></bott-nav>
  </div>
</template>

<script>
import bottNav from "@/components/bottom-nav.vue";
export default {
  components: {
    bottNav,
  },
  data() {
    return {
      page: 1,
      merchandise: [
        // {
        //   merchandiseId: "1664315799854874625",
        //   title: "测试商品",
        //   price: 999,
        //   imgCover: "https://s2.loli.net/2023/05/07/RaxzFbhBeik79H5.png",
        // },
      ],
    };
  },
    created() {
    this.getOverviewList();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    getOverviewList() {
      this.$api.merchandiseApi.getOverviewList(this.page).then((resp) => {
        resp.data.forEach(element => {
          // console.log(element)
          this.merchandise.push(element);
        });
      });
    },
    displayDetails(merchandiseId) {
      this.$router.push("/details/" + merchandiseId);
    },
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.page++;
        this.getOverviewList();
      }
    },
  },
};
</script>

<style  scoped>
.zone-view {
  min-height: 100%;
  width: 100vw;
  background: rgb(241, 240, 240);
}

.zone-card {
  height: 50px;
  width: 85vw;
  background: #ffffff;
  position: relative;
  top: 10px;
  border-radius: 5px;
}

.search-input {
  width: 70vw;
  display: block;
  position: relative;
  bottom: 8px;
}

.zone-container {
  width: 85vw;
  position: relative;
  top: 45px;
  /* NOTE: 解决底部导航栏遮挡 */
  padding-bottom: 100px;
}

.zone-container h4 {
  /*NOTE: 保证标题只显示15个汉字（不会有被截半的）*/
  width: 15em;
  overflow: hidden; /*超出长度的文字隐藏*/
  text-overflow: ellipsis; /*文字隐藏以后添加省略号*/
  white-space: nowrap; /*强制不换行*/
}

.zone-container p {
  float: right;
  font-size: 20px;
  position: relative;
  bottom: 14px;
  right: 12px;
}

.add-btn {
  top: 80vh;
  position: fixed;
}
</style>
