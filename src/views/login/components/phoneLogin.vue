<template>
  <div id="phone-login">
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-form-model-item prop="phoneNumber">
        <a-input
          v-model="form.phoneNumber"
          placeholder="请输入手机号"
          size="large"
        >
          <a-icon slot="prefix" type="mobile" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="verificationCode">
        <a-input
          v-model="form.verificationCode"
          placeholder="请输入验证码"
          size="large"
          @keyup.enter="doLogin"
        >
          <a-icon slot="prefix" type="safety-certificate" />
          <a-button
            type="link"
            slot="suffix"
            :disabled="getButtonDisabled"
            @click="getVerificationCode(60)"
          >
            {{ this.getButtonText }}
          </a-button>
        </a-input>
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
    <a-button style="padding: 0" type="link" @click="goRegister"
      >新用户注册</a-button
    >
  </div>
</template>

<script>
import { setToken } from "../../../utils/auth";
import { getSmsCode, loginExport } from "../../../api/login";

export default {
  name: "phoneLogin",
  data() {
    const validatorPhone = function (rule, value, callback) {
      if (!/^1\d{10}$/.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      redirect: undefined,
      form: {
        phoneNumber: "",
        verificationCode: "",
        uuid: "",
      },
      rules: {
        phoneNumber: [{ validator: validatorPhone, trggier: "blur" }],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      timer: null,
      count: null,
      getButtonDisabled: false,
      getButtonText: "获取验证码",
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
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          loginExport({
            phoneNumber: this.form.phoneNumber,
            code: this.form.verificationCode,
            uuid: this.form.uuid,
          }).then((response) => {
            if (response.code === 200) {
              setToken(response.token);
              this.msgSuccess("登录成功");
              this.loginLoading = false;
              this.$store.dispatch("logIn");
              /* 登录后返回之前页面 */
              this.$router.push({ path: this.redirect || "/" });
            } else {
              this.loginLoading = false;
              this.msgError(response.msg);
            }
          });
        } else {
          console.log("error submit!!");
          this.loginLoading = false;
          return false;
        }
      });
    },
    getVerificationCode(delay) {
      const number = this.form["phoneNumber"];
      if (!/^1\d{10}$/.test(number)) {
        this.msgError("请输入正确的手机号");
      } else {
        getSmsCode({
          phoneNumber: number,
        }).then((response) => {
          if (response.code === 200) {
            this.form["uuid"] = response.uuid;
            const time_out = delay;
            if (!this.timer) {
              this.count = time_out;
              this.getButtonDisabled = true;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= time_out) {
                  this.getButtonText = `再次获取(${this.count})`;
                  this.count--;
                } else {
                  this.timer = null;
                  this.getButtonDisabled = false;
                  this.getButtonText = "获取验证码";
                }
              }, 1000);
            }
            this.msgSuccess("验证码已发送");
          }
        });
      }
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
#phone-login {
  text-align: left;
}
</style>
