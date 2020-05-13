<template>
  <div id="show">
    <el-card class="show_box">

      <!-- 显示二级详情 -->
      <section v-if="showList">
        <el-card class="show_box_card" v-slot="slot2" v-for="item in showList" :key="item.id">
        <div slot="header" class="show_box_card_header">
          <span>
            <i class="el-icon-reading" style="color:#85c1e9"></i>
            {{item.fileName}}
          </span>
          <el-button type="danger" icon="el-icon-delete" @click="dj(slot2)">删除</el-button>
        </div>
        <div style="height:60px;overflow: hidden;" v-html="item.content">{{item.content}}</div>
      </el-card>
      </section>

      <!-- 没有二级文件情况 -->
      <el-card v-else id="no" :style="{height:height}">
          空白文件
      </el-card>
      <!-- 分页 -->
      <el-pagination
        background
        layout="sizes,prev, pager, next,total"
        :total="total"
        @current-change="getTwoFileMessage"
        :page-sizes="[4]"
        :page-size="4"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showList: [],
      oneFileId:null,
      total:null,
      height:null,
    };
  },
  methods: {
    async getTwoFileMessage(val){
       val == null && (val = 1);

      !this.oneFileId && this.$message.error('一级文件id空白')

      let {data:res} = await this.$http.get(`/inquire/twoFile?fileOne=${this.oneFileId}&&index=${val}`)

      res.status == 201 && this.$message.error('获取二级文件失败！')

      this.showList = res.data
      this.total = res.total
      console.log(res)
    },

    //获取home页面传递一级文件id
    setOneFileId(){
      this.oneFileId = this.$route.query.oneFileId
      this.getTwoFileMessage()
    },

    //把HTML代码转化成为页面
    setHtml(val){
      return document.getElementById('HTML').innerHTML = val
    }
  },
  created() {
    this.height = document.body.clientHeight - 160 + "px";
    this.oneFileId = this.$route.query.oneFileId
    this.getTwoFileMessage()
  }
};
</script>

<style lang='less' scoped>
#show {
  height: 100%;
  .show_box {
    min-height: 100%;
    width: 100%;
    .show_box_card {
      margin-bottom: 2%;
      &:hover{
        background: #e4e7e9;
      }
      .show_box_card_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #cacfd2;
        box-sizing: border-box;
        padding-bottom: 5px;
        .content_box{
          overflow: hidden;
          width: 100%;
          height: 100px;
        }
      }
    }

    #no{
      margin-bottom: 10px;
    }
  }
}
</style>
 