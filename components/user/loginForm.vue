<template>
  <div class="loginForm">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="form">
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
          placeholder="用户名/手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit" @click="handleSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
      handleSubmit(){
          // console.log(this.loginForm)
          this.$axios({
              url:'/accounts/login',
              method:'post',
              data:this.loginForm
          })
          .then(res=>{
              // console.log(res)
              this.$store.commit('user/setUserInfo',res.data)
              this.$router.push('/')
          })
          .catch(err=>{
              console.log(err)
          })
      }
  }
};
</script>
<style lang="less" scoped>
.loginForm {
  .form {
    padding: 25px;
    .submit{
        width: 100%;
    }
  }
}
</style>
