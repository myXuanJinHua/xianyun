<template>
  <div>
    <el-row type="flex" justify="space-between" class="filters">
      <el-col :span="8">单程: 上海 - 广州 / 2019-08-04</el-col>
      <el-col :span="4" v-for="(item,index) in options" :key="index">
        <el-select v-model="value" :placeholder="item" size="mini">
          <el-option label="以后再写" value="诙谐的"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div style="margin-bottom:15px">
      筛选:
      <el-button type="primary" plain style="border-radius:15px" size="mini">撤销</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: ["起飞机场", "起飞时间", "航空公司", "机型"],
      value: ""
    };
  }
};
</script>
<style lang="less" scoped>
.filters {
  margin-bottom: 15px;
  /deep/ .el-select {
    margin-right: 10px;
  }
}
</style>
