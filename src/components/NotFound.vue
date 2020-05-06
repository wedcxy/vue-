<template>
  <div id="not">
    <img src="../assets/404.jpg" alt="">
    <el-button  icon="el-icon-s-home" @click="home">回到首页</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
      //点击回到首页
      home()
      {
          this.$router.push('/')
      }
  }
};
</script>

<style lang='less' scoped>
#not{
    width: 100%;
    height: 100%;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .el-button{
      position: absolute;
      top: 58%;
      left:40%;
      transform: translate(-50%);
    }
}
#not>h1{
    // margin-top: 80px;
    // margin-bottom: 10px;
}
</style>