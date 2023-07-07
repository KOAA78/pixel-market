<!-- Warnning：此组件为节省时间，故只支持props传值 -->
<template>
  <v-expansion-panel>
    <!-- 列表项标题 -->
    <v-expansion-panel-header
      ><v-row
        ><v-col cols="2" class="resize">{{ itemInfo.id }}</v-col
        ><v-col cols="4" class="resize">{{ itemInfo.title }}</v-col
        ><v-col cols="2" class="resize">{{ itemInfo.sellerName }}</v-col
        ><v-col cols="2" class="resize">{{ itemInfo.date }}</v-col
        ><v-col cols="2" class="resize">{{ itemInfo.tag }}</v-col></v-row
      >
      <template v-slot:actions v-if="itemType == '被举报'">
        <v-icon color="red">mdi-alert</v-icon>
      </template>
    </v-expansion-panel-header>
    <!-- 列表项标题 -->

    <!-- 列表项内容 -->
    <v-expansion-panel-content
      ><v-list-item-title class="font-weight-bold my-2 text-h6"
        >具体信息</v-list-item-title
      >
      <v-list-item-subtitle>提交图片:</v-list-item-subtitle>
      <div class="d-flex my-3">
        <v-img
          max-height="100px"
          max-width="100px"
          class="mx-2"
          v-for="(img, key) in itemInfo.picture"
          :key="key"
          :src="img"
        ></v-img>
      </div>

      <div class="my-3">
        <v-list-item-subtitle>标价：</v-list-item-subtitle
        ><v-list-item-action-text>{{ itemInfo.price }}</v-list-item-action-text>
      </div>
      <div class="my-3">
        <v-list-item-subtitle>商品描述：</v-list-item-subtitle>
        <v-list-item-action-text>{{ itemInfo.intro }}</v-list-item-action-text>
      </div>
      <!-- 以下内容只有在商品被举报时才渲染 -->
      <v-card v-if="itemType == '被举报'">
        <v-card-title class="font-weight-bold my-2 text-h6 red--text"
          >举报信息</v-card-title
        >
        <v-card-subtitle>举报日期：</v-card-subtitle>
        <v-card-text>{{ itemInfo.reportedDate }}</v-card-text>

        <v-card-subtitle>举报者:</v-card-subtitle>
        <v-card-text>{{ itemInfo.reportedUser }}</v-card-text>

        <v-container>
          <v-card color="grey lighten-2">
            <v-card-subtitle>举报理由:</v-card-subtitle>
            <v-card-text>{{ itemInfo.reportedReason }}</v-card-text>
          </v-card>
        </v-container>
      </v-card>
      <!-- 注意！以上内容只有在被举报时才渲染！ -->
      <v-card-actions class="justify-end">
        <v-btn
          v-for="(button, key) in buttonSwitch(itemType)"
          :key="key"
          :color="button.color"
          @click="button.buttonEvent"
          class="mx-2"
          >{{ button.name }}</v-btn
        >
      </v-card-actions>
    </v-expansion-panel-content>

    <!-- 列表项内容 -->
  </v-expansion-panel>
</template>

<script>
export default {
  props: ["itemInfo", "itemType"],
  //可拓展面板项展示内容只有三种状态并且单个页面只会出现一种情况，所以只需要父组件传递itemType的值就行了，无需根据状态判断展示内容
  //希望这样写以后不会成为屎山（划
  mounted() {},
  updated() {},
  methods: {
    buttonSwitch(itemType) {
      switch (itemType) {
        case "已审核": {
          return [
            { name: "下架", buttonEvent: () => {}, color: "red lighten-4" },
          ];
        }
        case "未审核": {
          return [
            { name: "下架", buttonEvent: () => {}, color: "red lighten-4" },
            { name: "通过审核", buttonEvent: () => {}, color: "green" },
          ];
        }
        case "被举报": {
          return [
            {
              name: "下架",
              buttonEvent: () => {
                // 设置审核状态为已处理
                this.$api.reportedApi
                  .handleReported({
                    reportedId: this.itemInfo.id,
                    state: 1,
                  })
                  .then((resp) => {
                    location.reload();
                  });
                // 且下架商品
                this.$api.merchandiseApi.outMerchandise(this.itemInfo.mid);
              },
              color: "red lighten-4",
            },
            {
              name: "举报不通过",
              buttonEvent: () => {
                this.$api.reportedApi
                  .handleReported({
                    reportedId: this.itemInfo.reportedId,
                    state: 1,
                  })
                  .then((resp) => {});
              },
              color: "primary",
            },
          ];
        }
        case "": {
          return null;
        }
        default:
          return null;
      }
    },
  },
};
</script>

<style scoped>
</style>