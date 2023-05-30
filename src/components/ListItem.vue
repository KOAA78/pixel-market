 <!-- 复用组件使用说明：
@插槽：

第一行
(1)用户头像（Avatar)
(2)账户名（Account)
(3)状态（State）

第二行
(1)图片（Picture）
(2)标题（Title）
(3)内容（Content）
(4)价格（Price）
(5)金钱(Money)

@注：
价格是商品标注时的显示价格，金钱是最后成交时候的成交额
Button等带有特殊属性的组件插入时，请传入相应的执行事件对象给buttons
buttons是对象数组，每个对象必须包括buttonName以及对应的buttonEvent两个属性
如传入props时，请勿在父组件再传入相应的插槽！

@此组件功能：基本交易信息列表项
-->
<template>
  <v-list-item>
    <v-list-item-content class="pa-0"
      ><v-container>
        <!-- 第一行 -->
        <v-row class="mt-0">
          <v-col
            cols="8"
            class="overflow-hidden"
            style="text-overflow: ellipsis; white-space: nowrap"
            ><v-avatar
              size="36"
              v-if="itemInfo.avatar != null && itemInfo.avatar != ''"
              class="mr-2"
              ><img :src="itemInfo.avatar" /></v-avatar
            ><slot name="avatar"></slot
            ><span v-if="itemInfo.account != null && itemInfo.account != ''">{{
              itemInfo.account
            }}</span
            ><slot name="account"></slot
          ></v-col>
          <v-col cols="4" class="d-flex justify-end"
            ><v-chip
              color="green lighten-2"
              v-if="itemInfo.state != null && itemInfo.state != ''"
              >{{ itemInfo.state }}<slot name="state"></slot></v-chip
          ></v-col>
        </v-row>
        <!-- 第一行 -->

        <!-- 第二行 -->
        <v-row class="my-0">
          <v-col cols="4" sm="2" md="1" lg="1"
            ><v-img ref="img" :src="itemInfo.picture"></v-img
            ><slot name="picture"></slot
          ></v-col>
          <v-col
            cols="8"
            sm="10"
            md="11"
            lg="11"
            class="d-flex flex-column pb-0"
          >
            <div
              style="font-size: large; min-height: 20px"
              class="font-weight-bold mb-2 overflow-hidden"
            >
              <slot name="title"></slot>{{ itemInfo.title }}
            </div>
            <v-list-item-subtitle
              style="
                font-size: small;

                width: 100%;
              "
              ><span>{{ itemInfo.content }}</span
              ><slot name="content"></slot
            ></v-list-item-subtitle>
            <v-list-item-action-text
              class="red--text font-weight-bold text-h6 d-flex py-2 align-center"
              ><span><slot name="price"></slot>{{ itemInfo.price }}</span
              >￥ <slot name="money"></slot>
              <div
                v-if="itemInfo.money != null"
                style="
                  text-align: end;
                  flex-grow: 1;
                  color: black;
                  font-size: 1rem;
                "
              >
                {{ itemInfo.money }}
                ￥
              </div>
            </v-list-item-action-text>
          </v-col>
        </v-row>
        <!-- 第二行 -->

        <!-- 第三行 -->
        <v-row v-if="buttonSwitch(itemInfo.state) != null">
          <v-col cols="6" class="pt-0 grey--text font-weight-bold">
            更多信息</v-col
          >
          <v-spacer></v-spacer>
          <v-col
            cols="3"
            class="pt-0 d-flex justify-end"
            v-if="buttonSwitch(itemInfo.state) != null"
          >
            <v-btn
              x-small
              @click="buttonSwitch(itemInfo.state)[0].buttonEvent"
              elevation="0"
              color="white"
              >{{ buttonSwitch(itemInfo.state)[0].name }}</v-btn
            ></v-col
          >
          <v-spacer></v-spacer>
          <v-col
            cols="3"
            class="pt-0"
            v-if="buttonSwitch(itemInfo.state)[1] != null"
          >
            <v-btn
              x-small
              @click="buttonSwitch(itemInfo.state)[1].buttonEvent"
              elevation="0"
              color="white"
              >{{ buttonSwitch(itemInfo.state)[1].name }}</v-btn
            ></v-col
          >
        </v-row>
        <!-- 第三行 -->
      </v-container>
    </v-list-item-content>
  </v-list-item>
</template>


<script>
export default {
  props: ["itemInfo"],
  mounted() {
    this.adjustImg();
  },
  updated() {
    this.adjustImg();
  },
  methods: {
    // 图片长宽自自适应匹配相等
    adjustImg() {
      setTimeout(() => {
        this.$refs.img.$el.style.height = this.$refs.img.$el.clientWidth + "px";
      }, 50);
    },
    //根据列表项的state使用对应的button组
    buttonSwitch(state) {
      switch (state) {
        case "已发布": {
          return [
            {
              name: "下架",
              buttonEvent: () => {
                alert("下架成功");
              },
            },
          ];
        }
        case "审核中": {
          return [
            {
              name: "下架",
              buttonEvent: () => {
                alert("下架成功");
              },
            },
          ];
        }
        case "已下架": {
          return [
            {
              name: "删除",
              buttonEvent: () => {
                alert("删除成功");
              },
            },
          ];
        }
        case "已付款": {
          return [
            {
              name: "退款",
              buttonEvent: () => {},
            },
            {
              name: "催发货",
              buttonEvent: () => {},
            },
          ];
        }
        case "已发货": {
          return [
            {
              name: "确认收货",
              buttonEvent: () => {
                alert("收货成功");
              },
            },
          ];
        }
        case "交易成功": {
          return [
            {
              name: "退款",
              buttonEvent: () => {},
            },
            {
              name: "联系买家",
              buttonEvent: () => {},
            },
          ];
        }
        case "已退款": {
          return [
            {
              name: "举报卖家",
              buttonEvent: () => {},
            },
          ];
        }
        case "草稿已保存": {
          return [
            {
              name: "编辑",
              buttonEvent: () => {},
            },
          ];
        }
        case "买家已付款": {
          return [
            {
              name: "发货",
              buttonEvent: () => {},
            },
          ];
        }
        case "买家已收货": {
          return [
            {
              name: "发货",
              buttonEvent: () => {},
            },
          ];
        }
        case "买家已退款": {
          return [
            {
              name: "重新发布",
              buttonEvent: () => {},
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
  //实现图片响应式显示
  //因为refs在组件切换时会延迟于update填充，故在延迟50毫秒后再执行调整宽高
};
</script>

<style>
</style>