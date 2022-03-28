<template>
  <div>
    <h2>修改密码</h2>
    <div>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 8 }"
      >
        <a-form-model-item label="旧密码" prop="oldPwd">
          <a-input-password
            v-model="form.oldPwd"
            placeholder="请输入旧密码"
          ></a-input-password>
        </a-form-model-item>
        <a-form-model-item label="新密码" prop="newPwd">
          <a-input-password
            v-model="form.newPwd"
            placeholder="请输入新密码"
          ></a-input-password>
        </a-form-model-item>
        <a-form-model-item label="确认新密码" prop="newPwdTwice">
          <a-input-password
            v-model="form.newPwdTwice"
            placeholder="请再次输入新密码"
          ></a-input-password>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ offset: 4 }">
          <a-button type="primary" @click="changePassword"> 设置密码 </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { changePwd } from "../../../api/login";

export default {
  name: "change",
  data() {
    return {
      form: {
        oldPwd: "",
        newPwd: "",
        newPwdTwice: "",
      },
      rules: {
        oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        newPwdTwice: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    changePassword() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.form.newPwd !== this.form.newPwdTwice) {
            this.msgError("两次输入的密码不一致");
          } else {
            changePwd({
              password: this.form.oldPwd,
              newPassword: this.form.newPwd,
            }).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("密码修改成功，请重新登录");
                this.$store.dispatch("logOut");
                this.$router.push("/");
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style scoped></style>
