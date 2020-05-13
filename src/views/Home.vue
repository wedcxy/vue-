<template>
  <el-container id="HOME">
    <!-- 头部 -->
    <el-header>
      <!-- logo -->
      <section class="home_logo">
        <i class="iconfont icon-xingxing"></i>
        <span>星燎空间</span>
      </section>

      <!-- 导航条 -->
      <section class="home_nav">
        <el-menu
          mode="horizontal"
          background-color="#235789"
          text-color="#fff"
          menu-trigger='click'
          active-text-color="#118DF0"
        >
          <el-menu-item index="1" @click="add=true">
            <template slot="title">
              <i class="el-icon-circle-plus-outline"></i>
              <span>添加文件</span>
            </template>
          </el-menu-item>

          <el-submenu index="2" > 
            <template slot="title">
              <i class='el-icon-folder-opened'></i>
              <span>分类文件夹</span>
            </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
          </el-submenu>

          <el-menu-item index="3" @click="alert('111')">首页</el-menu-item>
          <el-menu-item index="4">
            <a href="https://www.ele.me" target="_blank">订单管理</a>
          </el-menu-item>
        </el-menu>
      </section>

      <!-- 退出按钮 -->
        <el-button type="primary" round class="button_animation" @click="secede" icon="iconfont icon-paobu" >退出</el-button>
    </el-header>

    <!-- 主体 -->
    <el-container>

      <!-- 主体左边 -->
      <el-aside width="200px">
        <el-menu  :default-active="this.$route.params.id" background-color="#fff" active-text-color="#35A7FF" text-color="#444444"  @open="handleOpen" unique-opened @select="handleSelect">
          <el-submenu :index="''+item.id" v-for="item in allFileContent" :key="item.id" >
            <template slot="title">
              <i class="el-icon-folder-opened"></i>
              <span>{{item.fileName}}</span>
            </template>
            <el-menu-item :index="item2.id+':'+item.id" v-for="item2 in twoFileContent" :key="item2.id" >{{item2.fileName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体右边 -->
      <el-main style="background:#E9EEF3">
        <el-card class="home_left_title" v-if="show">
          <!-- 添加二级文件的按钮 -->
          <section class="home_left_title_button">
              <el-button type="primary" round icon="el-icon-circle-plus-outline" size="small " @click="add2 = true">添加二级文件</el-button>
          </section>

          <!-- 一级文件名称 -->
          <section class="home_left_title_title">
              <i class="el-icon-document-checked"></i>
              <strong>{{this.oneFileMessage.fileName}}</strong>
          </section>
        </el-card>

        <router-view ref="view"></router-view>
      </el-main>
    </el-container>

    <!-- 对话框区域 -->

    <!-- 1.添加一级文件对话框 -->
    <el-dialog title="添加一级文件" :visible.sync="add" width="50%">
      <!-- 添加表单 -->
      <el-form :model="fileForm" :rules="rules" ref="fileOne" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文件名称" prop="fileName">
          <el-input v-model="fileForm.fileName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addFileOne">确 定</el-button>
      </span>
    </el-dialog>

     <!-- 2.添加二级文件对话框 -->
    <el-dialog title="添加二级文件" :visible.sync="add2" width="50%">
      <!-- 添加表单 -->
      <el-form :model="fileForm" :rules="rules" ref="fileTwo" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文件名称" prop="fileName">
          <el-input v-model="fileForm.fileName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addFileTwo">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      add: false ,//监听添加科目对话框
      add2:false,
      rules:{     //添加文件的检验规则
        fileName:[
          { required: true, message: '不能为空白', trigger: 'blur' }
        ]
      },
      fileForm:{   //存储添加文件
        fileName:''
      },
      allFileContent:[],  //存储列表数据
      twoFileContent:[],  //存储二级文件数据
      show:false,         //控制card隐藏
      oneFileMessage:{}  //存储选中的一级文件信息
    };
  },
  methods: {
    //获取一级文件
    async  getAllFile(){
      const userid = this.$store.state.userId || window.localStorage.getItem('userid')

      if(!userid) {
        return this.$message.error('用户数据错误，请重新登录!');
      }

      let {data:res} = await this.$http.get(`/inquire/allFile?userid=${userid}`)

      res.status !== 200 && this.$message.error('获取文件列表数据失败！')

      this.allFileContent = res.data

      //存储一份全局数据用于oneshow页面判断是否是新的用户
      window.localStorage.setItem('allFileContent',res.data)

    },
    //监听退出按钮
    secede() {
      //1. 添加动画
      this.button_animation = false;

      //2.清空本地缓存token
      window.localStorage.removeItem("token");

      //跳转到达登录页面
      this.$router.replace({ path: "/login" });

      this.$message.success("退出成功！");
    },

    //添加一级文件
    addFileOne(){
      //1.判断表单检验结果
      this.$refs.fileOne.validate(async callback => {
          if(!callback) return this.$message.error('请输入内容，不能空白！')

          let userId = this.$store.state.userId || window.localStorage.getItem('userid')

          let {data:res} = await this.$http.post('/fileOne',{params:{userId:userId,fileName:this.fileForm.fileName}})
         
          if(res.status !== 200) return this.$message.error('添加一级文件失败！')

          // //提示添加成功
          this.$message.success('添加成功！')
          this.fileForm.fileName = ''
          this.add=false

          //刷新页面
          this.getAllFile()
      })
    },

    //监听添加二级文件
    addFileTwo()
    {
      
      //判断表单内容是否空
       this.$refs.fileTwo.validate(async callback => {
          if(!callback) return this.$message.error('请输入内容，不能空白！')

          let userId = this.$store.state.userId || window.localStorage.getItem('userid')

          let {data:res} = await this.$http.post('/fileTwo',{params:{userid:userId,fileOneId:this.oneFileMessage.id,content:'',fileName:this.fileForm.fileName}})

          res.status !== 200 && this.$message.error('添加二级文件错误！')
          // //提示添加成功
          this.$message.success('添加成功！')
          this.fileForm.fileName = ''
          this.add2=false

          this.handleOpen(this.oneFileMessage.id)
      })
      
    },
    //监听右边列表点击事件
    async handleOpen(key) {
        //判断一级文件是否存在
        !key && this.$message.error('获取一级文件ID错误，请退出重新登录！')
       
        let {data:res} = await this.$http.get(`/inquire/twoFile?fileOne=${key}`)

        res.status == 201 && this.$message.error('请求二级文件列表失败，请刷新页面！')

        //赋值二级文件
        this.twoFileContent = res.data

        //通过路由控制show页面的card隐藏
        let path=this.$route.path
        path !== '/Show' ? this.show =false : this.show = true
        

        //根据点击的key在一级信息遍历出，对应数据
        this.oneFileMessage = this.allFileContent.find(item=>item.id == key)

        //跳转页面show.vue
        this.$router.push({path:'/Show',query:{oneFileId:this.oneFileMessage.id}})

        this.$refs['view'].setOneFileId()
        console.log(this.oneFileMessage.id)
       
    },

    //监听左边菜单子项点击事件
    handleSelect(key, keyPath) {
      //1.获取一，二，级文件id
      let id = keyPath[1]

      //2.ID进行切割数组存储
      let allID = id.split(":");

      let twoFileContent = this.twoFileContent.find(item=>item.id == allID[0])

      this.$router.push({path:"/card",query:{fileTwoId:allID[0],fileOneId:allID[1],twoFileContent:twoFileContent}})
      this.$refs['view'].setData()
      console.log(this.twoFileContent)
    },

    //监听添加文件取消事件
    cancel(){
      this.add = false;
      this.fileForm.fileName = null
    }
  },
  created() {
    this.getAllFile()
    this.handleOpen(this.$route.query.oneFileId)
    
  }
};
</script>

<style lang='less' scoped>
#HOME {
  height: 100%;
  .el-header {
    width: 100%;
    height: 50px;
    background: #235789;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .home_logo {
      margin-bottom: 11px;
      .icon-xingxing {
        font-size: 40px;
        display: inline-block;
        color: #fff;
      }
      span {
        font-size: 30px;
        color: #fff;
        font-family: 宋体;
      }
    }
    .home_nav {
    }
    .home_nav_button {
      width: 80px;
      height: 40px;
    }
  }
  .el-aside {
    height: 100%;
    background: #ffffff;
  }

  .home_left_title
  {
    margin-bottom: 15px;
    background: #ffffff;
    text-align: center;
    box-sizing: border-box;
    .home_left_title_button
    {
      float: left;
    }
    .home_left_title_title{
      display: inline-block;
      font-weight: 300;
      font-size: 20px;
      i{
        color: #1ec0ff;
      }
      strong{
        color: #000;
        margin-left: 9px;
      }
    }
  }
}

.icon-xingxing {
  font-size: 40px;
  display: inline-block;
  margin-top: 5px;
  color: #fff;
}



   .right-menu {
      border: 1px solid #eee;
      box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
      border-radius: 1px;
      display: block;
      font-family: Microsoft Yahei,Avenir,Helvetica,Arial,sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      position: fixed;
      background: #fff;
      border: 1px solid rgba(0,0,0,.2);
      border-radius: 3px;
      z-index: 999;
      display: none;
      a {
        padding: 2px 15px;
 
        // width: 120px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        display: block;
        color: #1a1a1a;
        
      }
      user agent stylesheet
      a:-webkit-any-link {
        color: -webkit-link;
        cursor: pointer;
        text-decoration: underline;
      }
      a:hover {
        background: #42b983;
        color: #fff;
      }
  }
</style>