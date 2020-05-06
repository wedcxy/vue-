<template>
  <div id="show">
      <el-card class="show_box">
        <el-card class="show_box_card" v-slot="slot2" v-for="item in showList" :key="item.id">
          <div slot="header" class="show_box_card_header">
            <span>
              <i class="el-icon-reading"></i>
              卡片名称
            </span>
            <el-button type="danger" icon="el-icon-delete" @click="dj(slot2)">删除</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
        </el-card>
      </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        showList:[
            {id:1,title:'html',conter:'1111111'},
            {id:2,title:'html2',conter:'22222'},
            {id:3,title:'html3',conter:'3333333'},
            {id:4,title:'html3',conter:'3333333'},
        ]
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang='less' scoped>
#show {
  height: 100%;
  .show_box {
    min-height: 100%;
    width: 100%;
    .show_box_card
    {
      margin-bottom:2%;
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
}
</style>
 