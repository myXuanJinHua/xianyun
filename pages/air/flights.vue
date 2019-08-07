<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤头部 -->
        <div>
          <FlightsFilters :data="cacheData" @getDataList="getDataList"></FlightsFilters>
        </div>

        <!-- 航班列表头部 -->
        <FlightsListHead />

        <!-- 航班列表 -->
        <div>
          <FlightsItem v-for="(item, index) in dataList" :key="index" :data="item"></FlightsItem>

          <!-- 分页组件 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <FlightsAside :data="cacheData"></FlightsAside>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";

export default {
  data() {
    return {
      // 后台返回的大的数据列表
      flightsData: {
        info: {},
        options: {},
        flights: {}
      },

      // 保存当前显示的列表数据
      dataList: [],
      //缓存当前显示的列表数据 ,过滤的时候不会改变
      cacheData: {
        info: {},
        options: {},
        flights: {}
      },
      // 当前页数
      pageIndex: 1,
      // 显示的条数
      pageSize: 2,
      // 总条数
      total: 0
    };
  },

  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },

  methods: {
    // 修改分页条数时候触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.getDataList();
    },

    // 切换页数时候触发
    handleCurrentChange(value) {
      this.pageIndex = value;

      // 获取分页的数据
      this.getDataList();
    },

    // 获取分页的数据
    getDataList(arr) {
      if (arr) {
        this.flightsData.flights = arr;
        this.total = arr.length;
      }
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        (this.pageIndex - 1) * this.pageSize + this.pageSize
      );
    },
    // 请求页面的总列表数据
    init() {
      this.$axios({
        url: "/airs",
        method: "GET",
        params: this.$route.query
      }).then(res => {
        // console.log("页面的总数据", res);
        // 保存总的大数据
        this.flightsData = res.data;
        // 保存缓存总的大数据
        this.cacheData = { ...res.data };
        this.total = this.flightsData.flights.length;
        // 切割出当前页面要显示的数据
        this.dataList = this.flightsData.flights.slice(0, 2);
      });
    }
  },

  mounted() {
    this.init();
  },
  watch: {
    $route() {
  
      this.init();
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>