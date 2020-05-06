module.exports={
    //初始路径
    publicPath:'./',
    //输出文件名称
    outputDir:'dist',

    //配置mock数据
    configureWebpack:{
        externals: {
        },
        devServer: {  //编辑mock数据的地方
            before(app) {

                //存储用户信息
                const USER_NAME=[
                    {username:'zhang1',password:'123456'},
                    {username:'何高坚',password:'654321'}
                ]

                //登录接口
                app.get('/api/login',(req,res)=>{
                    const {username,password}=req.query
                    if(username == 'zhang1' && password == '123456' || username == '何高坚' && password == '654321')
                    {
                        res.json({
                            success:200,
                            message: '登录成功',
                            token:username + '-' + (new Date().getTime() + 60 * 60 * 1000)
                        })
                    }else
                    {
                        res.json({
                            success:201,
                            message: '账号或密码错误'
                          })  
                    }
                })
            }
        } 
    }
}