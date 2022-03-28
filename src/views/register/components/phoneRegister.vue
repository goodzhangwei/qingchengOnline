<template>
  <div id="phone-login">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
    >
      <a-form-model-item label="登录账号" prop="username">
        <a-input v-model="form.username" placeholder="请输入用户名">
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input-password v-model="form.password" placeholder="请输入密码">
          <a-icon slot="prefix" type="unlock" />
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item label="确认密码" prop="passwordTwice">
        <a-input-password
          v-model="form.passwordTwice"
          placeholder="请再次输入密码"
        >
          <a-icon slot="prefix" type="unlock" />
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item label="手机号" prop="phoneNumber">
        <a-input v-model="form.phoneNumber" placeholder="请输入手机号">
          <a-icon slot="prefix" type="mobile" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="验证码" prop="verificationCode">
        <a-input v-model="form.verificationCode" placeholder="请输入验证码">
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
      <a-form-model-item label="学校名称" prop="schoolName">
        <a-input v-model="form.schoolName" placeholder="请输入学校名称">
          <a-icon slot="prefix" type="info-circle" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="班级名称" prop="className">
        <a-input v-model="form.className" placeholder="请输入班级名称">
          <a-icon slot="prefix" type="info-circle" />
        </a-input>
      </a-form-model-item>
    </a-form-model>
    <div style="margin-top: 5px; margin-bottom: 20px; text-align: center">
      <a-button type="primary" @click="doRegister">注册</a-button>
    </div>
  </div>
</template>

<script>
import { getSmsCode, registerExport } from "../../../api/login";

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
        username: "",
        password: "",
        passwordTwice: "",
        phoneNumber: "",
        verificationCode: "",
        uuid: "",
        schoolName: "",
        className: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        passwordTwice: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
        ],
        phoneNumber: [{ validator: validatorPhone, trggier: "blur" }],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
        schoolName: [
          { required: true, message: "请输入学校名称", trigger: "blur" },
        ],
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
      },
      timer: null,
      count: null,
      getButtonDisabled: false,
      getButtonText: "获取验证码",
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
    doRegister() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.form.password !== this.form.passwordTwice) {
            this.$notification["error"]({
              message: "两次输入的密码不一致",
              description: "请检查两次输入的密码是否一致",
            });
            return false;
          }
          registerExport({
            code: this.form.verificationCode,
            password: this.form.password,
            phoneNumber: this.form.phoneNumber,
            username: this.form.username,
            uuid: this.form.uuid,
            schoolName: this.form.schoolName,
            className: this.form.className,
          }).then((response) => {
            if (response.code === 200) {
              this.msgSuccess("注册成功");
              if (!this.redirect) {
                this.$router.push("/login");
              } else {
                this.$router.push(`/login?redirect=${this.redirect}`);
              }
            } else {
              this.msgError(response.msg);
            }
          });
        } else {
          console.log("error submit!!");
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
          } else {
            this.msgError(response.msg);
          }
        });
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
