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
        <el-button type="primary" @click="submitForm('signupForm')">注册</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('signupForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <p class="login-hint">
      已注册？<el-button type="text" @click="showSignIn">登录</el-button>
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

        fetch('/hamster/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `name=${this.form.name}&password=${this.form.password}`,
        })
          .then(response => response.json())
          .then(({ error }) => {
            if (error === '用户已存在') {
              this.$message({
                message: '用户已存在',
                type: 'error'
              }); 
              return
            }
          })
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    showSignIn() {
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

.login-hint {
  text-align: right;
}

.login-hint .el-button {
  width: auto;
}
</style>

