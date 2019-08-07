<template>
  <div class="main">
    <!-- 调用计算属性 计算属性的值如果页面中没引用的话函数是不会执行的，所以需要在页面中调用-->
    <input type="hidden" :value="allPrice" />
    <!-- 乘机人 -->
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>
    <!-- 保险 -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`"
            border
            @change="handleChecked(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>
    <!-- 联系人 -->
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // 乘机人信息
      users: [{ username: "", id: "" }],
      // 保险ID
      insurances: [],
      // 联系人名字
      contactName: "",
      //联系人电话
      contactPhone: "",
      // 是否需要发票
      invoice: false,
      captcha: "000000" // 验证码
    };
  },
  methods: {
    // 添加乘机人 当每点击一次就新增一个对象,模板那里就会多遍历一个 ,就会多一个输入框结构
    handleAddUsers() {
      this.users = [...this.users, { username: "", id: "" }];
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },
    // 选中保险
    handleChecked(id) {
      // 有则删
      if (this.insurances.indexOf(id) > -1) {
        //  let arr=this.insurances.slice(0)  //两个都可以
        let arr = JSON.parse(JSON.stringify(this.insurances));
        arr.splice(this.insurances.indexOf(id), 1);
        this.insurances = arr;
      } else {
        this.insurances = [...new Set([...this.insurances, id])];
      }
      //  console.log(this.insurances)
    },
    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.contactPhone) {
        this.$alert("请输入手机号码", "提示", { type: "warning" });
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "post",
        data: { tel: this.contactPhone }
      })
        .then(res => {
          // console.log(res)
          this.$alert(res.data.code, "手机验证码", {
            confirmButtonText: "确定"
          });
        })
        .catch(err => {
          console.log("获取验证码错误", err);
        });
    },
    // 提交订单
    handleSubmit() {
      let data = {};
      data.users = this.users;
      data.insurances = this.insurances;
      data.contactName = this.contactName;
      data.contactPhone = this.contactPhone;
      data.invoice = this.invoice;
      data.seat_xid = this.data.seat_infos.seat_xid;
      data.air = this.data.id;
      data.captcha = this.captcha;
      let token = this.$store.state.user.userInfo.token;
      console.log("提交对象", data);
      this.$axios({
        url: "/airorders",
        method: "post",
        data,
        headers: { Authorization: `Bearer ${token || "NO TOKEN"}` }
      })
        .then(res => {
          // console.log(res)
          // 跳转到付款页
          this.$router.push({
            path: "/air/pay"
          });
        })
        .catch(err => {
          // 警告提示
          this.$confirm(err.response.data, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        });
    }
  },
  computed: {
    allPrice() {
      let price = 0;
      let len = this.users.length;

      price += this.data.seat_infos.org_settle_price * len;

      this.insurances.forEach(v => {
        price += this.data.insurances[v - 1].price * len;
      });

      price += this.data.airport_tax_audlet * len;
      let setDate={}
        setDate.price=price,
        setDate.len=len
      
      // 触发设置总金额事件
      this.$emit("setData", setDate);
      console.log(123);
      return price;
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>