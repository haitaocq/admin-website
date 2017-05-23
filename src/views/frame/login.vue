<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <Form ref="loginForm" :model="loginForm" :rules="loginRule">
              <Form-item prop="userNo">
                  <Input type="text" size="large" v-model="loginForm.userNo" placeholder="用户名" @on-enter="submit">
                      <Icon type="ios-person" size="20" slot="prepend"></Icon>
                  </Input>
              </Form-item>
              <Form-item prop="password">
                  <Input type="password" size="large" v-model="loginForm.password" placeholder="密码" @on-enter="submit">
                      <Icon type="ios-locked" size="20" slot="prepend"></Icon>
                  </Input>
              </Form-item>
              <Form-item>
                  <Button type="primary" long @click.stop="submit">登录</Button>
                  <p style="font-size: 12px; line-height: 30px; color: rgb(153, 153, 153);">Tips : 用户名和密码随便填。</p>
              </Form-item>
            </Form>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        data: function(){
            return {
                loginForm: {
                    userNo: "",
                    password: ""
                },
                loginRule: {
                    userNo: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ...mapActions(['login']),
            submit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.login(this.loginForm).then(data => {
                            this.$router.replace('/home');
                            this.$Message.success('登录成功!');
                        },error => {
                            this.$Message.error(error);
                        });
                    } else {
                        this.$Message.error('用户名/密码不能为空！');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background: #324157;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:380px;
        height:240px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>