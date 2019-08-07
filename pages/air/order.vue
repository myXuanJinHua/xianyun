<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :data="infoData" @setData="setData"></OrderForm>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="infoData" :setDate="setDate"></OrderAside>
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";
import OrderAside from "@/components/air/orderAside";
export default {
  data() {
    return {
      infoData: {
        seat_infos: {
          org_settle_price: ""
        },
        insurances: []
      },
      setDate: {
        // 总金额
        allPrice: 0,
        // 人数
        num: 0
      }
    };
  },
  methods: {
    setData(setDate) {
      this.setDate.allPrice = setDate.price;
      this.setDate.num = setDate.len;
    }
  },
  components: {
    OrderForm,
    OrderAside
  },
  mounted() {
    let { query } = this.$route;
    this.$axios({
      url: `airs/${query.id}`,
      params: { seat_xid: query.seat_xid }
    })
      .then(res => {
        console.log("刚跳转页面后的钩子", res.data);
        this.infoData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>