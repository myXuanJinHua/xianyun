<template>
  <div class="header">
    <el-row type="flex" class="row-bg" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <!-- 导航栏 -->
      <el-row type="flex" class="nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录标签 -->
      <div class="login" v-if="$store.state.user.userInfo.token==''">
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>
      <!--登录后 -->
      <div class="logined" v-else>
        <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
        <span>{{$store.state.user.userInfo.user.nickname}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        token: "",
        user: {}
      }
    };
  },
  methods: {
    handleLogout() {
      this.$store.commit('user/setUserInfo',this.userInfo)
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  width: 1000px;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  .logo {
    > img {
      width: 156px;
      height: 42px;
      margin: 9px 0;
    }
  }
  .logined {
    > img {
      height: 36px;
      width: 36px;
      vertical-align: middle;
    }
  }
  .nav {
    flex: 1;
    a {
      display: block;
      padding: 0 20px;
      height: 60px;
      box-sizing: border-box;
      &:hover {
        border-bottom: 2px solid #409eff;
      }
    }
  }
}
//  nuxt会通过url匹配每个nuxt-link标签的链接，如果匹配上默认会加上nuxt-link-exact-active样式
.nuxt-link-exact-active {
  background: #409eff;
  color: #fff;
  &:hover {
    color: #fff;
  }
}
</style>
