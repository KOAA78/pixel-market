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
              class="px-0 brown--text"
              height="25"
              style="border: 0px"
              to="/home"
              >取消</v-btn
            ></v-col
          >
          <v-col xs="1" sm="4" md="4" lg="4" xl="4"> </v-col>
          <v-col xs="4" sm="3" md="3" lg="3" xl="3">
            <!-- <v-btn
              block
              outlined
              rounded
              class="px-0 brown--text"
              style="border: 2px solid lightgray"
              >存草稿</v-btn
            > -->
          </v-col>

          <v-col xs="4" sm="3" md="3" lg="3" xl="3">
            <v-btn
              block
              outlined
              rounded
              class="px-0 brown--text"
              style="border: 2px solid lightgray"
              @click="addMerchandise"
              >发布</v-btn
            ></v-col
          >
        </v-row>
      </v-container>
    </v-app-bar>
    <!-- 游戏选择栏 -->
    <v-container class="my-0 py-0">
      <v-row>
        <v-col cols="6" class="d-flex align-centertext--darken-4"
          ><v-icon x-large class="mx-1" color="brown darken-1"
            >mdi-controller</v-icon
          >
          <span style="font-size: 18px" class="font-weight-bold brown--text"
            >选择游戏</span
          >
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="6" class="d-flex justify-end align-center"
          ><span
            class="grey--text text-lighten-1"
            style="font-size: 15px"
            v-if="publishForm.tagId == ''"
            >请选择游戏</span
          >
          <span
            class="grey--text text-darken-1"
            style="font-size: 15px"
            v-else
            >{{ chosenTag }}</span
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
        <v-slide-item v-for="tag in tags" :key="tag.tagId">
          <v-btn
            class="mx-2"
            depressed
            rounded
            small
            @click="selectGame(tag.tagId, tag.tagName)"
          >
            {{ tag.tagName }}
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
            background-color="brown lighten-5"
            color="brown darken-1"
            shaped
            dense
            style="border-top: 7px dashed rgba(75, 59, 57)"
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
            placeholder="买家比较关心游戏的等级，是否为一手账号等等~"
            v-model="publishForm.introduction"
            background-color="grey lighten-4"
            color="brown darken-1"
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
    <!-- FIXME: 一次性上传多张图片 -->
    <v-container>
      <v-row class="mx-1">
        <v-col cols="4" class="d-flex justify-center">
          <uploaderImg @change="getImgUrl"></uploaderImg>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <uploaderImg @change="getImgUrl"></uploaderImg>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <uploaderImg @change="getImgUrl"></uploaderImg>
        </v-col>
      </v-row>
    </v-container>
    <!-- 上传图片 -->

    <!-- 价格栏 -->
    <v-container>
      <v-row
        ><v-col
          cols="6"
          class="d-flex align-center grey--text text--darken-3 font-weight-bold"
        >
          <v-icon large class="mx-2">mdi-bitcoin</v-icon
          ><span style="font-size: 20px">价格</span></v-col
        >
        <v-col cols="6">
          <v-text-field
            prefix="￥"
            class="price-input"
            v-model="publishForm.price"
          ></v-text-field>
        </v-col> </v-row
    ></v-container>
    <!-- 价格栏 -->

    <!-- 游戏选择面板 -->
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialogState.gameChoose"
    >
      <v-container style="background-color: #ffffff"
        ><v-row
          ><v-col cols="12">
            <v-card color="brown lighten-3" elevation="0" class="pb-3">
              <v-card-title
                style="font-weight: bold"
                class="justify-center white--text choose-game"
                >选择游戏</v-card-title
              >
              <v-btn
                style="display: inline-block"
                class="mx-4 my-3"
                small
                v-for="tag in tags"
                :key="tag.tagId"
                @click="selectGame(tag.tagId, tag.tagName)"
              >
                {{ tag.tagName }}
              </v-btn>
            </v-card>
          </v-col></v-row
        ></v-container
      >
    </v-dialog>
    <!-- 游戏选择面板 -->
  </v-main>
</template>

<script>
import uploaderImg from "@/components/img-upload.vue";

var pictureArr = [];

export default {
  components: {
    uploaderImg,
  },
  created() {
    this.displayTag();
  },
  data() {
    return {
      chosenTag: "",
      tags: [
        {
          tagId: "1",
          tagName: "王者荣耀",
        },
      ],
      publishForm: {
        tagId: "",
        title: "",
        introduction: "",
        price: "",
        pictures: pictureArr,
      },
      dialogState: {
        gameChoose: false,
      },
    };
  },
  methods: {
    reload() {},
    selectGame(tagId, tagName) {
      this.publishForm.tagId = tagId;
      this.chosenTag = tagName;
      this.dialogState.gameChoose = false;
    },
    displayTag() {
      this.$api.merchandiseApi.displayTag().then((resp) => {
        this.tags = resp.data;
      });
    },
    getImgUrl(imgSrc) {
      let formData = new FormData();
      formData.append("file", imgSrc);
      // TODO 遮罩显示上传进度【找小图片测试】
      this.$api.merchandiseApi.uploadImg(formData).then((resp) => {
        console.log(resp.data);
        pictureArr.push(resp.data);
        console.log(pictureArr);
      });
    },
    addMerchandise() {
      this.$api.merchandiseApi.addMerchandise(this.publishForm).then((resp) => {
        this.$notify({
          message: "发布成功",
          offset: 115,
          type: "success",
          duration: 2000,
        });
        this.$router.push("/details/"+resp.data);
      });
    },
  },
};
</script>

<style scoped>
.pixel-art-robot {
  width: 1px;
  height: 1px;
  color: red;
}

.choose-game {
  letter-spacing: 8px;
}

.v-input.price-input {
  font-size: 1.5em;
}
</style>