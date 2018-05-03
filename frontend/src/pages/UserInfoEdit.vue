<template>
  <div class="user-info-edit">
    <h1 class="header">更新用户信息</h1>

    <el-form
      :model="form"
      label-width="120px"
      class="form"
      label-position="top">
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateUserPassword">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    }
  },

  methods: {
    updateUserPassword() {
      fetch(`/hamster/user/${this.form.name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `password=${this.form.password}`,
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.$router.push('/user')
        })
    },
  },

  mounted() {
    this.form = {
      name: this.$route.params.name,
      password: this.$route.query.password,
    }
  },
}
</script>

<style scoped>
.user-info-edit {
  padding: 25px 30px;
}

.header {
  text-align: center;
}
</style>
