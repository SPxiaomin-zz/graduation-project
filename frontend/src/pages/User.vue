<template>
  <div class="user">
    <h1 class="header">用户管理</h1>    

    <el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="用户名">
      </el-table-column>
      <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="jumpEditPage(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteUser(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    }
  },
  methods: {
    jumpEditPage(rowIndex, userInfo) {
      this.$router.push({
        path: `/user/${userInfo.name}`,
        query: { password: userInfo.password },
      })
    },

    deleteUser(rowIndex, userInfo) {
      fetch(`/hamster/user/${userInfo.name}`, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          location.reload()
          console.log(data)
        })
    },
  },
  mounted() {
    fetch('/hamster/user', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        this.users = data.users
      })
      .catch(err => console.log(err))
  },
}
</script>

<style scoped lang="scss">
.header {
  text-align: center;
}
</style>
