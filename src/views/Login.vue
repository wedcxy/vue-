<template>
  <div id="LOGIN">
    <section class="login_box">
      <!-- 头像区域 -->
      <section class="login_box_img">
        <img src="../assets/wblogo.png" />
      </section>
      <!-- 表单区域 -->
      <section class="login_box_from">
        <el-form :model="loginfrom" :rules="rules" ref="ruleForm">
          <el-form-item  prop="username">
            <el-input v-model="loginfrom.username" prefix-icon="el-icon-user-solid" placeholder="请输入账号" class="input"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input v-model="loginfrom.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
        </el-form>
      </section>
      <!-- 按钮区域 -->
      <section class="login_box_button">
          <el-button type="primary" icon="el-icon-mouse" @click="login">登录</el-button>
          <el-button type="warning" icon="el-icon-setting" @click="reset">重置</el-button>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
        loginfrom:{
            username:'zhangxujie',
            password:'a18218791044'
        },
        rules:{
            username:[
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' } 
            ]
        }
    };
  },
  methods: {
      //登录
      async login()
      {
        const {data:res}=await this.$http.post('/login',{params:this.loginfrom})
        if(res.status !== 200) return this.$message.error('登录失败！')
        //本地存储token
        window.localStorage.setItem('token',res.token)
        //vuex存储id
        this.$store.commit('setUserId',res.id)
        window.localStorage.setItem('userid',res.id)
        this.$message.success('登录成功！')
        //跳转到达首页
        this.$router.replace({path:'/'})
      },
      //重置
      reset()
      {
          this.loginfrom.username=''
          this.loginfrom.password=''
      }
  },
  created() {}
};
</script>

<style lang='less' scoped>
#LOGIN {
  width: 100%;
  height: 100%;
  background: #235789;
  display: flex;
  align-items: center;
  justify-content: center;
  .login_box {
    width: 500px;
    height: 300px;
    border: 1px solid #fff;
    padding-top: 70px;
    box-sizing: border-box;
    background: #ffffff;
    position: relative;
    border-radius: 10px;
    -webkit-box-shadow: 1px 3px 2px 2px #cfe0f9;
    box-shadow: 3px 3px 24px 4px #cfe0f9;
    .login_box_img {
        width: 35%;
        height: 47%;
        border-radius: 50%;
        box-sizing: border-box;
        border: 5px solid #ebedec;
        position: absolute;
        background: #ffffff;
        left: 50%;
        top: -30%;
        transform: translate(-50%);
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .login_box_from
    {
       margin-top: 50px;
       width: 80%;
       margin: 0 auto;
    }
    .login_box_button{
        display: flex;
        justify-content: center;
        align-items: center;
    }
  }
  
}
</style>