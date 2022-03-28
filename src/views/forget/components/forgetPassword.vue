<template>
  <div class="login-container">
    <div class="form-container">
      <a-page-header title="忘记密码" @back="() => this.$router.back()" />
      <div class="page-content">
        <a-steps :current="nowStep">
          <a-step title="验证手机号"></a-step>
          <a-step title="设置新密码"></a-step>
          <a-step title="设置完成"></a-step>
        </a-steps>
        <div style="height: 40px"></div>
        <div class="steps-content" v-if="nowStep === 0">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 8 }"
          >
            <a-form-model-item label="手机号" prop="phoneNumber">
              <a-input
                v-model="form.phoneNumber"
                placeholder="请输入手机号"
              ></a-input>
            </a-form-model-item>
            <a-form-model-item label="验证码" prop="verificationCode">
              <a-input
                v-model="form.verificationCode"
                placeholder="请输入验证码"
              >
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
          <div style="margin-top: 5px; margin-bottom: 20px; text-align: center">
            <a-button type="primary" @click="firstStep"> 验证手机号 </a-button>
          </div>
        </div>
        <div class="steps-content" v-else-if="nowStep === 1">
          <a-form-model
            ref="nextForm"
            :model="nextForm"
            :rules="nextRules"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 8 }"
          >
            <a-form-model-item label="新密码" prop="newPwd">
              <a-input-password
                v-model="nextForm.newPwd"
                placeholder="请输入新密码"
              ></a-input-password>
            </a-form-model-item>
            <a-form-model-item label="确认新密码" prop="newPwdTwice">
              <a-input-password
                v-model="nextForm.newPwdTwice"
                placeholder="请再次输入新密码"
              ></a-input-password>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ offset: 8 }">
              <a-button type="primary" @click="secondStep"> 设置密码 </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div class="steps-content" v-else>
          <ul>
            <li>
              <img src="../../../assets/success.png" />
            </li>
            <li>
              <span style="font-size: 18px">密码重置成功</span>
            </li>
            <li style="margin: 30px 0">
              <a-button
                type="primary"
                shape="round"
                @click="() => this.$router.push('/login')"
                >返回登录页面</a-button
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkCode, getSmsCode, resetPwd } from "../../../api/login";

export default {
  name: "forgetPassword",
  data() {
    const validatorPhone = function (rule, value, callback) {
      if (!/^1\d{10}$/.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      nowStep: 0,
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
      nextForm: {
        phoneNumber: "",
        newPwd: "",
        newPwdTwice: "",
      },
      nextRules: {
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        newPwdTwice: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
        ],
      },
      timer: null,
      count: null,
      getButtonDisabled: false,
      getButtonText: "获取验证码",
    };
  },
  methods: {
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
    firstStep() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          checkCode({
            phoneNumber: this.form.phoneNumber,
            uuid: this.form.uuid,
            code: this.form.verificationCode,
          }).then((response) => {
            if (response.code === 200) {
              this.msgSuccess("验证成功");
              this.nextForm.phoneNumber = this.form.phoneNumber;
              this.nowStep = 1;
            } else {
              this.msgError(response.msg);
            }
          });
        }
      });
    },
    secondStep() {
      this.$refs.nextForm.validate((valid) => {
        if (valid) {
          if (this.nextForm.newPwd !== this.nextForm.newPwdTwice) {
            this.msgError("两次输入的密码不一致");
          } else {
            resetPwd({
              phonenumber: this.nextForm.phoneNumber,
              password: this.nextForm.newPwd,
            }).then((response) => {
              if (response.code === 200) {
                this.nowStep = 2;
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

<style scoped>
.login-container {
  width: 100%;
  min-height: 525px;
}

.form-container {
  width: 1160px;
  height: 100%;
  margin: auto;
}

.page-content {
  margin: 0 200px;
}

.steps-content ul {
  list-style: none;
  padding: 0;
  text-align: center;
}

@media screen and (max-width: 480px) {
  .form-container {
    width: 100%;
  }

  .page-content {
    margin: 0 20px;
  }
}
</style>
