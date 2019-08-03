<template>
    <div>
        <el-row type="flex" justify="space-between" class="filghtsItem">
          <el-col :span="6">航空信息</el-col>
          <el-col :span="8">起飞时间</el-col>
          <el-col :span="5">到达时间</el-col>
          <el-col :span="5">价格</el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.filghtsItem {
    width: 100%;
    background-color: #f6f6f6;
    padding: 5px 0 5px 60px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
    border: 1px solid #ddd;
  }
</style>
