<template>
  <div class="signup">
    <el-form
      :model="form"
      :rules="rules"
      ref="signupForm"
      label-width="120px"
      class="signup-form"
      label-position="top">
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('signupForm')">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('signupForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <p class="signup-hint">
      未注册？<el-button type="text" @click="showSignUp">注册</el-button>
    </p>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          return
        }

        fetch('/hamster/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `name=${this.form.name}&password=${this.form.password}`,
        })
          .then(response => response.json())
          .then(({ error }) => {
            if (error === '用户不存在') {
              this.$message({
                message: '用户不存在',
                type: 'error',
              })
              return
            }

            if (error === '密码错误') {
              this.$message({
                message: '用户不存在',
                type: 'error',
              })
              return
            }

            this.$router.push('/hamster')
          })
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showSignUp() {
      this.$emit('toggleSignUp')
    },
  },
}
</script>

<style scoped>
.el-form-item:first-child {
  margin-bottom: 7px;
}

.el-button {
  width: 100%;
}

.signup-hint {
  text-align: right;
}

.signup-hint .el-button {
  width: auto;
}
</style>