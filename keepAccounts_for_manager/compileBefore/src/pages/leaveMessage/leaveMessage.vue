<template>
  <div class="app-container calendar-list-container">
    <el-table
      v-loading="loading"
      element-loading-text="努力加载中..."
      border
      :data="dataList"
      style="width: 100%">

      <el-table-column type="index" align="center" label="序号" width="65">
      </el-table-column>

      <el-table-column
        label="用户名"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="用户留言">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList:[],
      loading:true
    }
  },
  mounted() {
    this.loadUserMessage();
  },
  methods: {
    loadUserMessage() {
      this.loading = true;
      this.http.get(this).url(this.config.leaveMessage).params({}).request(function(response) {
        this.loading = false;
        this.dataList = response.data;
      }, function(error) {
        console.log(error);
        this.loading = false;
        this.$message.error(error);
      });
    }
  }
}
</script>

<style lang="scss">

</style>
