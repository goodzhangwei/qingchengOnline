<template>
  <div id="video-header">
    <div class="header-container">
      <div class="container-left">
        <img src="../../../assets/header-logo.png" />
        <!-- 移动端布局下的个人中心 -->
        <div class="mobile-login">
          <drop-menu-mobile />
        </div>
      </div>
      <div class="container-middle">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="/home" @click="gotoPath('/')"> 首页</a-menu-item>
          <a-menu-item key="/all-courses" @click="gotoPath('/all-courses')">
            全部课程
          </a-menu-item>
          <a-menu-item key="/online-courses"> 我的课程 </a-menu-item>
        </a-menu>
      </div>
      <div class="container-right">
        <drop-menu />
      </div>
    </div>
  </div>
</template>

<script>
import DropMenu from "../../components/DropMenu";
import DropMenuMobile from "../../components/DropMenuMobile";

export default {
  name: "VideoHeader",
  components: { DropMenuMobile, DropMenu },
  data() {
    return {
      current: undefined,
    };
  },
  methods: {
    gotoPath(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style scoped>
#video-header {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-container {
  width: 1140px;
  margin: auto;
  display: flex;
}

.container-left {
  width: 180px;
  position: relative;
}

.container-left img {
  width: 110px;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}

.mobile-login {
  display: none;
}

.container-middle {
  flex: 1;
}

.header-container .ant-menu-horizontal {
  border-bottom: 0;
}

.container-right {
  width: 200px;
}

.welcome {
  line-height: 47px;
}

.welcome:hover {
  color: #409eff;
  cursor: pointer;
}

@media screen and (max-width: 480px) {
  .header-container {
    width: 100%;
  }

  .container-left {
    width: 100%;
    height: 70px;
  }

  .container-left img {
    width: 150px;
  }

  .mobile-login {
    display: block;
    height: 100%;
    line-height: 70px;
    text-align: right;
    padding-right: 20px;
  }

  .container-middle {
    display: none;
  }

  .container-right {
    display: none;
  }
}
</style>
