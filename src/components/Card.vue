<template>
  <div id="CARD">
      <el-card class="CARD_box">
          <!-- 富文本编辑器区域 -->
          <quill-editor v-model="content"></quill-editor>
      </el-card>
      <el-button @click="dj">按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
        content:'',  //编辑器的内容
    };
  },
  methods: {
    dj()
    {
      console.log(111)
      this.$http.get('login')
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  },
  created() {}
};
</script>

<style lang='less' scoped>
#CARD
{
    height: 100%;
    .CARD_box
    {
        min-height: 100%;
    }
    .ql-editor
    {
        min-height: 200px !important;
    }
}
</style>