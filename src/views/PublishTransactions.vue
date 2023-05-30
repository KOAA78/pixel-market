<template>
  <v-main>
    <!-- appbar 取消、存草稿、发布 -->
    <v-app-bar color="white" elevation="0">
      <v-container class="pa-0 ma-0">
        <v-row class="align-center">
          <v-col xs="3" sm="2" md="2" lg="2" xl="2">
            <v-btn
              min-width="0"
              outlined
              class="px-0 teal--text"
              height="25"
              style="border: 0px"
              >取消</v-btn
            ></v-col
          >
          <v-col xs="1" sm="4" md="4" lg="4" xl="4"> </v-col>
          <v-col xs="4" sm="3" md="3" lg="3" xl="3">
            <v-btn
              block
              outlined
              rounded
              class="px-0 teal--text"
              style="border: 2px solid lightgray"
              >存草稿</v-btn
            ></v-col
          >

          <v-col xs="4" sm="3" md="3" lg="3" xl="3">
            <v-btn
              block
              outlined
              rounded
              class="px-0 teal--text"
              style="border: 2px solid lightgray"
              >发布</v-btn
            ></v-col
          >
        </v-row>
      </v-container>
    </v-app-bar>
    <!-- 游戏选择栏 -->
    <v-container class="my-0 py-0">
      <v-row>
        <v-col cols="6" class="d-flex align-center cyan--text text--darken-4"
          ><v-icon x-large class="mx-1" color="teal darken-4"
            >mdi-controller</v-icon
          ><span style="font-size: 18px" class="font-weight-bold"
            >选择游戏</span
          >
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="6" class="d-flex justify-end align-center"
          ><span
            class="grey--text text-lighten-1"
            style="font-size: 15px"
            v-if="publishForm.game == ''"
            >请选择游戏</span
          >
          <span
            class="grey--text text-darken-1"
            style="font-size: 15px"
            v-else
            >{{ publishForm.game }}</span
          >
          <v-btn icon class="mx-1" @click="dialogState.gameChoose = true"
            ><v-icon x-large>mdi-chevron-right</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <!-- 游戏选择栏 -->

    <!-- 滚动游戏项 -->
    <v-sheet class="mx-auto mt-5" max-width="600">
      <v-slide-group multiple>
        <v-slide-item v-for="(game, key) in gameSlideLists" :key="key">
          <v-btn class="mx-2" depressed rounded small @click="selectGame(game)">
            {{ game }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <!-- 滚动游戏项-->

    <!-- 标题-->
    <v-container class="pa-0 mt-8 mb-0">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="10">
          <v-text-field
            filled
            append-icon="mdi-gamepad"
            label="帖子标题"
            v-model="publishForm.title"
            background-color="teal lighten-3"
            color="teal darken-2"
            shaped
            dense
            style="border-top: 7px dashed rgb(47, 125, 105)"
            counter="20"
            required
          >
          </v-text-field>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <!-- 标题 -->

      <!-- 简介-->
      <v-row class="my-0">
        <v-spacer></v-spacer>
        <v-col cols="10">
          <v-textarea
            filled
            append-icon="mdi-google-downasaur"
            label="账号描述"
            placeholder="请描述一下你的账号吧，买家比较关心游戏的等级，是否为一手账号"
            v-model="publishForm.description"
            background-color="grey lighten-4"
            color="teal darken-2"
            dense
            height="20vb"
            counter="150"
            required
          >
          </v-textarea>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <!-- 简介 -->
    </v-container>

    <!-- 上传图片 -->
    <v-container>
      <v-row class="mx-3">
        <v-col cols="4" class="d-flex justify-center">
          <uploaderImg></uploaderImg>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <uploaderImg></uploaderImg>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <uploaderImg></uploaderImg>
        </v-col>
      </v-row>
    </v-container>
    <!-- 上传图片 -->

    <!-- 价格栏 -->
    <v-container>
      <v-row
        ><v-col
          cols="4"
          class="d-flex align-center grey--text text--darken-3 font-weight-bold"
        >
          <v-icon large class="mx-2">mdi-bitcoin</v-icon
          ><span style="font-size: 20px">价格</span></v-col
        >
        <v-spacer></v-spacer>
        <v-col cols="6" class="d-flex justify-end align-center">
          <span style="color: red; font-weight: bolder; font-size: larger"
            >￥{{ publishForm.price }}</span
          >
          <v-btn icon class="mx-1" @click="dialogState.priceChoose = true"
            ><v-icon>mdi-chevron-right</v-icon></v-btn
          ></v-col
        >
      </v-row></v-container
    >
    <!-- 价格栏 -->

    <!-- 游戏选择面板 -->
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialogState.gameChoose"
    >
      <v-container style="background-color: rgb(231, 172, 95)"
        ><v-row
          ><v-col cols="12">
            <v-card class="d-flex justify-center my-2" color="brown lighten-3">
              <v-card-title style="font-weight: bold">选择游戏 </v-card-title>
            </v-card>
            <v-card color="brown lighten-3">
              <v-btn
                style="display: inline-block"
                class="mx-2 my-3"
                small
                v-for="(game, key) in gameSlideLists"
                :key="key"
                @click="selectGame(game)"
              >
                {{ game }}
              </v-btn>
            </v-card>
          </v-col></v-row
        ></v-container
      >
    </v-dialog>
    <!-- 游戏选择面板 -->

    <!-- 价格选择面板 -->
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialogState.priceChoose"
    >
      <v-container style="background-color: rgb(231, 172, 95)"
        ><v-row
          ><v-col cols="12">
            <v-card class="d-flex justify-center my-2" color="brown lighten-3">
              <v-card-title style="font-weight: bold">出售价格 </v-card-title>
            </v-card>
            <v-card color="brown lighten-3">
              <v-container>
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      type="number"
                      class="mx-2"
                      prepend-icon="mdi-hand-coin"
                      v-model="Money.Yuan"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="7">
                    <v-text-field
                      type="number"
                      class="mx-2"
                      v-model="Money.Cent"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card> </v-col
        ></v-row>
        <v-card-actions class="justify-end">
          <v-btn text @click="selectMoney(Money.Yuan, Money.Cent)">SAVE!</v-btn>
        </v-card-actions>
      </v-container>
    </v-dialog>
    <!-- 价格选择面板 -->
  </v-main>
</template>

<script>
import uploaderImg from "./img-upload.vue";
export default {
  data() {
    return {
      gameSlideLists: ["王者荣耀", "原神", "和平精英", "战争雷霆", "第五人格"],
      publishForm: {
        game: "",
        title: "",
        description: "",
        price: 0.0,
      },
      Money: { Yuan: 0, Cent: 0 },
      dialogState: {
        gameChoose: false,
        priceChoose: false,
      },
    };
  },
  components: {
    uploaderImg,
  },
  methods: {
    reload() {},
    selectGame(v) {
      this.publishForm.game = v;
      this.dialogState.gameChoose = false;
    },
    selectMoney(v, b) {
      this.dialogState.priceChoose = false;
      this.publishForm.price = parseFloat(v + "." + b);
    },
  },
};
</script>

<style scoped>
.pixel-art-robot {
  width: 1px;
  height: 1px;
  color: red;
  box-shadow: 
        /* 1st row */ 5px 1px 0 0 rgba(217, 216, 216, 255),
    6px 1px 0 0 rgba(217, 216, 216, 255), 7px 1px 0 0 rgba(217, 216, 216, 255),
    8px 1px 0 0 rgba(217, 216, 216, 255), 10px 1px 0 0 rgba(255, 255, 255, 1),
    11px 1px 0 0 rgba(255, 255, 255, 1), 12px 1px 0 0 rgba(255, 255, 255, 1),
    /* 2nd row */ 3px 2px 0 0 rgba(253, 254, 254, 255),
    4px 2px 0 0 rgba(234, 232, 236, 255), 5px 2px 0 0 rgba(236, 235, 235, 255),
    6px 2px 0 0 rgba(234, 232, 236, 255), 7px 2px 0 0 rgba(234, 232, 236, 255),
    8px 2px 0 0 rgba(234, 232, 236, 255), 9px 2px 0 0 rgba(234, 232, 236, 255),
    11px 2px 0 0 rgba(255, 255, 255, 1), 12px 2px 0 0 rgba(255, 255, 255, 1),
    /* 3rd row */ 3px 3px 0 0 rgba(234, 232, 236, 255),
    6px 3px 0 0 rgba(254, 254, 254, 255), 8px 3px 0 0 rgba(252, 252, 252, 255),
    9px 3px 0 0 rgba(234, 232, 236, 255), 10px 3px 0 0 rgba(234, 232, 236, 255),
    11px 3px 0 0 rgba(255, 255, 255, 1), 12px 3px 0 0 rgba(255, 255, 255, 1),
    /* 4th row */ 2px 4px 0 0 rgba(234, 232, 236, 255),
    3px 4px 0 0 rgba(0, 0, 0, 1), 4px 4px 0 0 rgba(0, 0, 0, 1),
    5px 4px 0 0 rgba(0, 0, 0, 1), 6px 4px 0 0 rgba(48, 63, 70, 1),
    7px 4px 0 0 rgba(48, 63, 70, 1), 9px 4px 0 0 rgba(250, 248, 249, 255),
    11px 4px 0 0 rgba(234, 232, 236, 255), 12px 4px 0 0 rgba(255, 255, 255, 1),
    /* 5th row */ 1px 5px 0 0 rgba(140, 232, 202, 255),
    2px 5px 0 0 rgba(217, 216, 216, 255), 3px 5px 0 0 rgba(0, 0, 0, 1),
    4px 5px 0 0 rgba(52, 165, 115, 255), 5px 5px 0 0 rgba(0, 0, 0, 1),
    6px 5px 0 0 rgba(0, 0, 11, 255), 7px 5px 0 0 rgba(0, 0, 0, 1),
    8px 5px 0 0 rgba(0, 0, 0, 1), 9px 5px 0 0 rgba(52, 165, 115, 255),
    10px 5px 0 0 rgba(0, 0, 0, 255), 11px 5px 0 0 rgba(217, 216, 216, 255),
    12px 5px 0 0 rgba(144, 235, 204, 255),
    /* 6th row */ 1px 6px 0 0 rgba(144, 235, 204, 255),
    2px 6px 0 0 rgba(217, 216, 216, 255), 3px 6px 0 0 rgba(0, 0, 0, 1),
    4px 6px 0 0 rgba(0, 0, 0, 1), 5px 6px 0 0 rgba(52, 165, 115, 255),
    6px 6px 0 0 rgba(0, 0, 0, 1), 7px 6px 0 0 rgba(0, 0, 0, 1),
    8px 6px 0 0 rgba(52, 165, 115, 255), 9px 6px 0 0 rgba(0, 0, 0, 255),
    10px 6px 0 0 rgba(0, 0, 0, 255), 11px 6px 0 0 rgba(217, 216, 216, 255),
    12px 6px 0 0 rgba(144, 235, 204, 255),
    /* 7th row */ 1px 7px 0 0 rgba(144, 235, 204, 255),
    2px 7px 0 0 rgba(217, 216, 216, 255), 3px 7px 0 0 rgba(0, 0, 0, 1),
    4px 7px 0 0 rgba(52, 165, 115, 255), 5px 7px 0 0 rgba(0, 0, 0, 1),
    6px 7px 0 0 rgba(0, 0, 0, 1), 7px 7px 0 0 rgba(0, 0, 0, 1),
    8px 7px 0 0 rgba(0, 0, 0, 1), 9px 7px 0 0 rgba(52, 165, 115, 255),
    10px 7px 0 0 rgba(0, 0, 0, 255), 11px 7px 0 0 rgba(217, 216, 216, 255),
    12px 7px 0 0 rgba(144, 235, 204, 255),
    /* 8th row */ 3px 8px 0 0 rgba(217, 216, 216, 255),
    4px 8px 0 0 rgba(0, 0, 0, 255), 5px 8px 0 0 rgba(0, 0, 8, 255),
    6px 8px 0 0 rgba(0, 0, 10, 255), 7px 8px 0 0 rgba(0, 0, 0, 255),
    8px 8px 0 0 rgba(0, 0, 0, 1), 9px 8px 0 0 rgba(0, 0, 0, 1),
    10px 8px 0 0 rgba(217, 216, 216, 255), 11px 8px 0 0 rgba(255, 255, 255, 1),
    12px 8px 0 0 rgba(255, 255, 255, 1),
    /* 9th row */ 4px 9px 0 0 rgba(217, 216, 216, 255),
    5px 9px 0 0 rgba(217, 216, 216, 255), 6px 9px 0 0 rgba(217, 216, 216, 255),
    7px 9px 0 0 rgba(217, 216, 216, 255), 8px 9px 0 0 rgba(217, 216, 216, 255),
    9px 9px 0 0 rgba(217, 216, 216, 255), 11px 9px 0 0 rgba(255, 255, 255, 1),
    12px 9px 0 0 rgba(255, 255, 255, 1);
  animation: flash 3s ease-in-out infinite;
}
</style>