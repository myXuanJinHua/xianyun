<template>
  <div class="registerForm">
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" class="form">
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="registerForm.username"
          autocomplete="off"
          placeholder="用户名手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input type="text" v-model="registerForm.captcha" autocomplete="off" placeholder="验证码"></el-input>
        <el-button @click="handleSendCaptcha">发送验证码</el-button>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input type="text" v-model="registerForm.nickname" autocomplete="off" placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="registerForm.password"
          autocomplete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkpassword">
        <el-input
          type="password"
          v-model="registerForm.checkpassword"
          autocomplete="off"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="register" @click="handleRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkpassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入你的名字", trigger: "blur" }
        ],
        checkpassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 点击获取验证码
    handleSendCaptcha() {
      // console.log(this.registerForm.username);
      // 首先判断手机号码不能为空
      if (this.registerForm.username) {
        this.$axios({
          url: "/captchas",
          method: "post",
          data: { tel: this.registerForm.username }
        })
          .then(res => {
            this.$alert(res.data.code, "手机验证码", {
              confirmButtonText: "确定"
            });
          })
          .catch(err => {
            console.log("获取验证码错误", err);
          });
      }
    },
    // 点击注册
    handleRegister() {
      const { checkpassword, ...data } = this.registerForm;
      // console.log('注册表单上传数据',data)
      // 首先判断表单的数据不能为空
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/register",
            method: "post",
            data
          })
            .then(res => {
              // console.log('注册完成后',res)
              // 把返回的数据存到vuex的仓库,会有插件自动存到本地存储
              this.$store.commit('user/setUserInfo',res.data)
              this.$router.push('/')
            })
            .catch(err => {
              console.log("注册失败", err);
              this.$message.error("注册失败,请重新填写注册数据");
              this.$router.push("/user/login");
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.registerForm {
  .form {
    padding: 25px;
    .register {
      width: 100%;
    }
  }
}
</style>
