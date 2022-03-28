<template>
  <div class="content">
    <div class="img-container">
      <img src="../../assets/building.png" />
    </div>
    <div class="flex-right">
      <ul>
        <li class="title">页面建设中…</li>
        <li class="sub-title">您可以先逛逛其它的页面或者返回首页。</li>
        <li>
          <a-button type="primary" shape="round" icon="home" @click="goHomePage"
            >返回首页</a-button
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "building",
  methods: {
    goHomePage() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.content {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content ul {
  list-style: none;
  padding: 0;
}

.content li {
  margin: 20px 0;
}

.flex-right {
  flex: 1;
}

.img-container {
  padding: 0 120px;
}

.img-container img {
  height: 400px;
  width: 400px;
}

.title {
  font-family: "黑体";
  font-size: 26px;
  color: #409eff;
}

.sub-title {
  color: #909399;
  font-size: 14px;
}

@media screen and (max-width: 480px) {
  .content {
    width: 100vw;
    flex-direction: column;
  }

  .img-container {
    padding: 0;
  }

  .img-container img {
    height: 300px;
    width: 300px;
  }

  .content ul {
    text-align: center;
  }
}
</style>
