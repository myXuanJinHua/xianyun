<template>
  <div class="login" :style="`background:url(${$axios.defaults.baseURL+backgroundImage})`">
    <el-row type="felx" justify="center">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first">
            <LoginForm></LoginForm>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
            <registerForm></registerForm>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import LoginForm from '@/components/user/loginForm'
import registerForm from '@/components/user/registerForm'
export default {
  data() {
    return {
      backgroundImage: "",
      activeName: "first"
    };
  },
  components: {
    LoginForm,
    registerForm  
  },
  methods: {
    handleClick() {}
  },
  mounted() {
    this.$axios({
      url: "scenics/banners"
    }).then(res => {
      // console.log(res)
      this.backgroundImage = res.data.data[0].url;
    });
  }
};
</script>
<style lang="less" scoped>
.login {
  height: 700px;
  min-width: 1000px;
  /deep/ .el-tabs {
    background-color: #fff;
    width: 500px;
    margin: 150px auto;
  }
}
</style>
