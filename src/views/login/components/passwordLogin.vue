<template>
  <div id="password-login">
    <a-form-model ref="pwdFrom" :model="form" :rules="rules">
      <a-form-model-item prop="username">
        <a-input
          v-model="form.username"
          placeholder="请输入用户名"
          size="large"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="password">
        <a-input-password
          v-model="form.password"
          placeholder="请输入密码"
          size="large"
          @keyup.enter="doLogin"
        >
          <a-icon slot="prefix" type="unlock" />
        </a-input-password>
      </a-form-model-item>
    </a-form-model>
    <a-button
      type="primary"
      size="large"
      block
      :loading="loginLoading"
      @click="doLogin"
      >登录</a-button
    >
    <a-row>
      <a-col :span="12">
        <a-button style="padding: 0" type="link" @click="goRegister"
          >新用户注册</a-button
        >
      </a-col>
      <a-col :span="12" style="text-align: right">
        <a-button style="padding: 0" type="link" @click="forgetPwd"
          >忘记密码？</a-button
        >
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { loginExport } from "../../../api/login";
import { setToken } from "../../../utils/auth";

export default {
  name: "passwordLogin",
  data() {
    return {
      redirect: undefined,
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loginLoading: false,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    doLogin() {
      this.loginLoading = true;
      this.$refs.pwdFrom.validate((valid) => {
        if (valid) {
          loginExport({
            username: this.form.username,
            password: this.form.password,
          }).then((response) => {
            if (response.code === 200) {
              setToken(response.token);
              this.msgSuccess("登录成功");
              this.loginLoading = false;
              this.$store.dispatch("logIn");
              /* 登录后返回之前页面 */
              this.$router.push({ path: this.redirect || "/" });
            } else {
              this.msgError(response.msg);
              this.loginLoading = false;
            }
          });
        } else {
          console.log("error submit!!");
          this.loginLoading = false;
          return false;
        }
      });
    },
    forgetPwd() {
      console.log(this.redirect);
      this.$router.push("/forget");
    },
    goRegister() {
      if (!this.redirect) {
        this.$router.push("/register");
      } else {
        this.$router.push(`/register?redirect=${this.redirect}`);
      }
    },
  },
};
</script>

<style scoped>
#password-login {
  text-align: left;
}
</style>
