<template>
  <div id="OneShow">
    <el-card>
      <!-- 用户没有使用过的占位符 -->
      <section id="notDisplayed" :style="{height:height}" v-if="judge">
        <img src="../assets/onFile.png" alt="空白文件夹" />
        <p>无文件，请自行添加文件</p>
      </section>

      <!-- 使用过 -->
      <section id="show" v-else>
        <!-- 内容 -->
        <el-card class="show_box_card" v-slot="slot2" v-for="item in showList" :key="item.id">
          <div slot="header" class="show_box_card_header">
            <span>
              <i class="el-icon-reading"></i>
              {{item.fileName}}
            </span>
            <el-button type="danger" icon="el-icon-delete" @click="dj(slot2)">删除</el-button>
          </div>
          <div  style="height:60px;overflow: hidden;" v-html="item.content">{{item.content}}</div>
        </el-card>

        <!-- 分页 -->
        <el-pagination
          background
          layout="sizes,prev, pager, next,total"
          :total="allNumber"
          @current-change="getTwoFileMessage"
          :page-sizes="[4]"
          :page-size="4"
        ></el-pagination>
      </section>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      judge: false, //判断是否新用户
      height: "", //自动控制页面的高度
      showList: [], //存储二级文件的内容
      pageNumber: null,
      allNumber: null
    };
  },
  methods: {
    //获取全部二级文件信息，并且监听分页
    async getTwoFileMessage(val) {
      val == null && (val = 1);

      !window.localStorage.getItem("userid") &&
        this.$message.error("oneshow页面获取用户id失败！");

      let ID = window.localStorage.getItem("userid");

      let { data: res } = await this.$http.get(
        `/inquire/twoFile?userid=${ID}&&index=${val}`
      );

      res.status == 201 && this.$message.error("oneShow页面请求失败！");

      this.showList = res.data;
      console.log(this.showList);

      //存储分页的数量
      this.pageNumber = res.pageNumber;
      this.allNumber = res.allNuber;
      console.log(this.pageNumber);
      console.log(this.allNumber)
    }
  },
  created() {
    //判断是否是新的用户sz
    if (window.localStorage.getItem("allFileContent") == "") {
      this.judge = true;
      console.log(this.$store.state.allFileContent);
      return;
    }

    //自动获取屏幕高度
    this.height = document.body.clientHeight - 140 + "px";
    this.getTwoFileMessage();
  }
};
</script>

<style lang='less' scoped>
#OneShow {
  width: 100%;
  height: 100%;
  user-select: none;

  // 未使用
  #notDisplayed {
    text-align: center;
    box-sizing: border-box;
    padding-top: 15%;
    font-family: 宋体;
    color: #bdc3c7;
  }
  #show {
    min-height: 100%;
    .show_box_card {
      margin-bottom: 1.5%;
      &:hover {
        background:#f3f6f7;
      }
      .show_box_card_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #cacfd2;
        box-sizing: border-box;
        padding-bottom: 5px;
      }
    }
  }
  .el-card {
    width: 100%;
  }
}
</style>