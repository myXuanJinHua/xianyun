<template>
  <div class="searchForm">
    <!-- 表单tab栏 -->
    <el-row type="flex" class="searchTab">
      <span
        v-for="(item,index) in tabList"
        :key="index"
        :class="{active:index===current}"
        @click="handleSearchTab(index)"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <!-- 表单 -->
    <el-form ref="airForm" :model="airForm" class="airForm" v-if="current=='0'">
      <el-form-item label="出发城市">
        <el-autocomplete
          class="el-autocomplete"
          v-model="airForm.departCity"
          :fetch-suggestions="departSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          class="el-autocomplete"
          v-model="airForm.destCity"
          :fetch-suggestions="destSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
        ></el-autocomplete>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
      <el-form-item label="出发时间">
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          v-model="airForm.departDate"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      // 出发的数组
      departList: [],
      //表单搜索的需要数据
      airForm: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      current: 0,
      tabList: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ]
    };
  },
  methods: {
    handleSearchTab(index) {
      this.current = index;
      if (index === 1) {
        this.$message.warning("此功能还没开通");
      }
    },
    // 出发城市每次输入值的时候触发,cb必须调用,传入的实参必须是数组,数组里的对象必须包含value属性
    departSearch(value, cb) {
      // console.log('出发城市',value)
      if (!value) {
        cb([]);
        return;
      } else {
        this.$axios({
          url: "/airs/city",
          method: "get",
          params: { name: value }
        })
          .then(res => {
            // console.log('获取出发城市数组',res)
            let data = [];
            res.data.data.forEach(item => {
              item.value = item.name.replace("市", "");
              data.push(item);
            });
            // console.log('遍历后的数组',data)
            // 设置第一个为默认选中
            this.airForm.departCity = data[0].value;
            this.airForm.departCode = data[0].sort;
            cb(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 有item形参 选择选项的时候触发 需要把选择的值跟Code存到form里
    handleDepartSelect(item) {
      // console.log('选择选项的时候触发item',item)
      this.airForm.departCity = item.value;
      this.airForm.departCode = item.sort;
    },
    // 到达城市每次输入触发
    destSearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      } else {
        this.$axios({
          url: "/airs/city",
          method: "get",
          params: { name: value }
        })
          .then(res => {
            // console.log('获取出发城市数组',res)
            let data = [];
            res.data.data.forEach(item => {
              item.value = item.name.replace("市", "");
              data.push(item);
            });
            // console.log('遍历后的数组',data)
            cb(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 到达城市选择的时候触发
    handleDestSelect(item) {
      this.airForm.destCity = item.value;
      this.airForm.destCode = item.sort;
    },
    // 点击 换 的时候触发
    handleReverse() {
      let { departCity, departCode, destCity, destCode } = this.airForm;
      this.airForm.departCity = destCity;
      this.airForm.departCode = destCode;
      this.airForm.destCity = departCity;
      this.airForm.destCode = departCode;
    },
    //选择时间的时候
    handleDate(value) {
      this.airForm.departDate = moment(value).format("YYYY-MM-DD");
    },
    // 点击搜索
    handleSubmit() {
      if (!this.airForm.departCity) {
        this.$alert("出发城市不能为空", "提示", {
          type: "warning"
        });
        return;
      }
      if (!this.airForm.destCity) {
        this.$alert("到达城市不能为空", "提示", {
          type: "warning"
        });
        return;
      }
      if (!this.airForm.departDate) {
        this.$alert("出发时间不能为空", "提示", {
          type: "warning"
        });
        return;
      }

      // 跳转到机票列表页
      // console.log('跳转到机票列表页',this.airForm)
      this.$router.push({
        path: "/air/flights",
        // url的5个参数
        query: this.airForm
      });
      // 获取vuex本地的存储
      let arr = [...this.$store.state.air.historyList];
      // console.log(arr)
      arr.unshift(this.airForm);
      // 条件只容纳5条
      if (arr.length > 5) {
        arr.length = 5;
      }
      this.$store.commit("air/setHistoryList", arr);
    }
  }
};
</script>
<style lang="less" scoped>
.searchForm {
  width: 360px;
  border: 1px solid #000;
  border-top: none;
  box-sizing: border-box;
  margin: 0 auto;
  .searchTab {
    span {
      display: block;
      height: 48px;
      line-height: 48px;
      text-align: center;
      flex: 1;
      border-top: 1px solid #eee;
      box-sizing: border-box;
      background: #eee;
      &.active {
        border-top: 3px solid red;
        background: #fff;
      }
    }
  }
  .airForm {
    padding: 15px;
    position: relative;
    .reverse {
      position: absolute;
      top: 50px;
      right: 20px;
      padding: 3px 5px;
      color: #fff;
      background: #444;
      font-size: 18px;
      cursor: pointer;
      &:before {
        content: "";
        width: 28px;
        height: 20px;
        position: absolute;
        top: -22px;
        right: 20px;
        border-top: 1px solid #444;
        border-right: 1px solid #444;
      }
      &:after {
        content: "";
        width: 28px;
        height: 20px;
        position: absolute;
        top: 31px;
        right: 20px;
        border-bottom: 1px solid #444;
        border-right: 1px solid #444;
      }
    }
  }
}
</style>
