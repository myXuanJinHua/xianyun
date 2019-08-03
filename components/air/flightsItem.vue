<template>
  <div class="flight-item">
    <el-row type="flex" class="filghtsList" justify="space-between">
      <el-col :span="5">南航 CZ3549</el-col>
      <el-col :span="12">
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <div class="time">
              <span class="big">06:55</span>
              <span class="posi">浦东机场T2</span>
            </div>
          </el-col>
          <el-col :span="7">
            <span class="line">2时30分</span>
          </el-col>
          <el-col :span="6">
            <div class="time">
              <span class="big">09:25</span>
              <span class="posi">白云机场T2</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        ￥
        <span class="big price">810</span> 起
      </el-col>
    </el-row>
    <div class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
            <el-col :span="16" class="flight-sell-left">
              <span>经济舱</span> | 上海一诺千金航空服务有限公司
            </el-col>
            <el-col :span="5" class="price">￥1345</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">选定</el-button>
              <p>剩余：83</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;
  .filghtsList {        
    line-height: 80px;
    padding-left: 50px;
    .time {
      position: relative;
    }
    span {
      font-size: 12px;
      color: #999;
      &.big {
        font-size: 20px;
        color: #000;
      }
      &.price {
        color: #ffa500;
      }
      &.posi {
        position: absolute;
        top: 20px;
        left: 0;
      }
      &.line {
        font-size: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
      }
    }
  }
  .flight-recommend {
    background: #f6f6f6;
    border-top: 1px #eee solid;
    padding: 0 20px;

    .flight-sell {
      border-bottom: 1px #eee solid;
      padding: 10px 0;

      &:last-child {
        border-bottom: none;
      }

      .flight-sell-left {
        font-size: 12px;
        span {
          color: green;
        }
      }

      .price {
        font-size: 20px;
        color: orange;
      }

      .choose-button {
        text-align: center;
        color: #666;
        button {
          display: block;
          width: 100%;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
