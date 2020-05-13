<template>
  <div id="CARD">
    <el-card class="CARD_box">
      <!-- 富文本编辑器区域 -->
      <quill-editor v-model="content" id="card"></quill-editor>

      <!-- 按钮区域 -->
      <el-tooltip class="item" effect="dark" content="新建二级文件" placement="top">
        <el-button type="primary" icon="el-icon-plus" circle class="button" plain></el-button>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="提交文件" placement="top">
        <el-button
          type="primary"
          icon="el-icon-check"
          circle
          class="buttonTwo"
          plain
          @click="submit"
        ></el-button>
      </el-tooltip>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "", //编辑器的内容
      fileOneId: null,
      fileTwoId: null
    };
  },
  methods: {
    //提交编辑的内容
    async submit() {
      !this.content && this.$message.error("提交内容不能空白！");
      console.log("111");
      let { data: res } = await this.$http.post("/fileTwo/submitContent", {
        params: {
          fileOneId: this.fileOneId,
          fileTwoId: this.fileTwoId,
          content: this.content
        }
      });

      res.status !== 201 && this.$message.error("编辑文件内容错误！");

      this.$message.success("提交成功！");
      console.log(this.content);
    },

    //跨组件调用函数
    setData() {
      this.fileOneId = this.$route.query.fileOneId;
      this.fileTwoId = this.$route.query.fileTwoId;
      this.content = this.$route.query.twoFileContent.content;
      console.log("11");
    }
  },
  created() {
    this.fileOneId = this.$route.query.fileOneId;
    this.fileTwoId = this.$route.query.fileTwoId;
    this.content = this.$route.query.twoFileContent.content;
    console.log("11");
  }
};
</script>

<style lang='less' scoped>
#CARD {
  height: 100%;
  .CARD_box {
    min-height: 100%;
    position: relative;
    .button {
      position: absolute;
      bottom: 40px;
      right: 40px;
    }
    .buttonTwo {
      position: absolute;
      bottom: 100px;
      right: 40px;
    }
  }
}
</style>