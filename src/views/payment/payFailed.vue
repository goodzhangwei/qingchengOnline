<template>
  <div>
    <div id="login-header">
      <div class="header-container">
        <div class="container-left">
          <a @click="() => this.$router.push('/')">
            <img src="../../assets/header-logo.png" />
          </a>
        </div>
      </div>
    </div>
    <div class="result-container">
      <img src="../../assets/login/shibai.png" />
      <div>支付失败</div>
      <div style="margin-top: 30px">
        <a-button shape="round" @click="() => this.$router.back()"
          >返回</a-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "payFailed",
};
</script>

<style scoped>
#login-header {
  height: 70px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.container-left {
  width: 180px;
  height: 70px;
  position: relative;
}

.container-left img {
  width: 150px;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}

.result-container {
  position: relative;
  width: 125px;
  text-align: center;
  font-size: 18px;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
}

.result-container img {
  height: 125px;
  width: 125px;
  margin-bottom: 20px;
}
</style>
