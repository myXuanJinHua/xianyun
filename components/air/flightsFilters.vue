<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <!-- 起飞机场 -->
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 起飞时间 -->
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 航空公司 -->
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 机型  -->
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item,index) in planSiza"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 撤销按钮 -->
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  // 父传给子
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      planSiza: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      // console.log(value)
      // 使用过滤遍历,把数据过滤后返回给arr
      let arr = this.data.flights.filter(item => {
        return item.org_airport_name === value;
      });
      // 把需要传的值发射出去  子传父
      this.$emit("getDataList", arr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // console.log('出发时间',value)
      let [from, to] = value.split(",");
      // console.log('劈开后的出发时间段',from,to)
      let arr = this.data.flights.filter(item => {
        // 获取数据的出发时间
        let start = item.dep_time.split(":")[0];
        return start >= from && start < to;
      });
      this.$emit("getDataList", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // console.log('选择航空公司',value)
      let arr = this.data.flights.filter(item => {
        return item.airline_name === value;
      });
      this.$emit("getDataList", arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      // console.log("机型", value);
      let arr = this.data.flights.filter(item => {
        return item.plane_size === value;
      });
      this.$emit("getDataList", arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = "";
      this.flightTimes = "";
      this.company = "";
      this.airSize = "";
      this.$emit("getDataList", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>