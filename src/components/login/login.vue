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
<<<<<<< HEAD
        <el-input v-model="formLabelAlign.password" type="password"></el-input>
=======
        <el-input v-model="formLabelAlign.password"></el-input>
>>>>>>> 6993a5a734f6785555988e2d751ea5eaa4b106a2
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
<<<<<<< HEAD
      if(this.formLabelAlign.username !=""&&this.formLabelAlign.password !=""){
=======
>>>>>>> 6993a5a734f6785555988e2d751ea5eaa4b106a2
      const res = await this.$http.post("login", this.formLabelAlign);
      const {
        data,
        meta: { msg, status },
      } = res.data;
      if (status === 200) {
<<<<<<< HEAD
        console.log(res);
        // 登录成功保存token到本地
        localStorage.setItem('token',data.token)
=======
>>>>>>> 6993a5a734f6785555988e2d751ea5eaa4b106a2
        this.$router.push({ name: "home" });
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
<<<<<<< HEAD
      }else{
        this.$message.warning('用户名或密码不能为空')
      }
=======
>>>>>>> 6993a5a734f6785555988e2d751ea5eaa4b106a2
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
