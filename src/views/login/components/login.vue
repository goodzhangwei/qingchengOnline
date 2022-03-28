<template>
  <div class="login-container">
    <div class="form-container">
      <div class="form-left">
        <ul>
          <li>
            <span style="font-size: 48px; color: white; font-family: '黑体'"
              >青程在线</span
            >
          </li>
          <li>
            <span style="font-size: 24px; color: white; font-family: '黑体'"
              >科技实践与在线学习平台</span
            >
          </li>
          <li><div style="height: 50px"></div></li>
        </ul>
      </div>
      <div class="form-right">
        <div class="form-block">
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="手机号登录">
              <phone-login />
            </a-tab-pane>
            <a-tab-pane key="2" tab="用户名登录">
              <password-login />
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordLogin from "./passwordLogin";
import PhoneLogin from "./phoneLogin";

export default {
  name: "login",
  components: { PhoneLogin, PasswordLogin },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 525px;
  background-image: linear-gradient(to right, #6a11cb 0%, #1890ff 100%);
}

.form-container {
  width: 1160px;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-left {
  flex: 1;
}

.form-left ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.form-left li {
  padding-left: 20px;
}

.form-right {
  height: 100%;
  width: 500px;
  position: relative;
}

.form-block {
  background-color: white;
  width: 325px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  overflow: hidden;
}

@media screen and (max-width: 480px) {
  .form-container {
    width: 100%;
    display: block;
  }

  .form-left {
    display: none;
  }

  .form-right {
    width: 100%;
  }
}
</style>
