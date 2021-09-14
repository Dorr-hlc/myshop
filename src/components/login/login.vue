<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formLabelAlign"
    >
      <h2>用户登陆</h2>
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" type="primary" @click="handleLogin"
        >登陆</el-button
      >
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formLabelAlign: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // 登陆请求
    async handleLogin() {
      const res = await this.$http.post("login", this.formLabelAlign);
      const {
        data,
        meta: { msg, status },
      } = res.data;
      if (status === 200) {
        this.$router.push({ name: "home" });
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
  },
};
</script>
<style scoped>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>
