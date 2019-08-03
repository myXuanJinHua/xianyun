<template>
    <div class="main">
      <!-- 头部筛选 -->
      <div class="filghtsFilters">
        <FlightsFilters></FlightsFilters    >
        <!-- 飞机票列表头 -->
        <FlightsListHead></FlightsListHead>
        <!--飞机票列表  -->
        <FlightsItem></FlightsItem>
      </div>
    </div>
</template>
<script>
import FlightsFilters from '@/components/air/flightsFilters'
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '../../components/air/flightsItem'
export default {
    
  data() {
    return {
     
    };
  },
  components: {
      FlightsListHead,
      FlightsFilters,
      FlightsItem
  }
};
</script>
<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 0 auto;
  .filghtsFilters {
    width: 750px;
    font-size: 14px;
    line-height: 28px; 
  }
}
</style>
