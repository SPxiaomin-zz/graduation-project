<template>
  <div class="score">
    <h1 class="header">分数列表</h1>

    <el-table
      :data="scores"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="score"
        label="分数">
      </el-table-column>
      <el-table-column
        prop="hitRate"
        label="命中率">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scores: [],
    }
  },
  mounted() {
    fetch('/hamster/score', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        this.scores = data.scores
      })
  },
}
</script>

<style scoped>
.header {
  text-align: center;
}
</style>

