<template>
  <a-affix>
    <div id="app-header">
      <div class="header-container">
        <div class="logo-left">
          <img src="../../assets/header-logo.png" />
          <!-- 移动端布局下的登录入口 -->
          <div
            class="mobile-login unlogin"
            v-if="!loginStatus"
            @click="goLogin(0)"
          >
            登录
          </div>
          <div class="mobile-login" v-else>
            <drop-menu-mobile />
          </div>
        </div>
        <div class="menu-middle">
          <a-menu v-model="current" mode="horizontal">
            <a-menu-item key="/home" @click="gotoPath('/')"> 首页</a-menu-item>
            <a-menu-item key="/all-courses" @click="gotoPath('/all-courses')">
              全部课程
            </a-menu-item>
            <a-menu-item key="/examination" @click="gotoPath('/examination')">
              等级考试
            </a-menu-item>
            <a-menu-item key="/research" @click="gotoPath('/research')">
              科技研学
            </a-menu-item>
            <a-menu-item key="/resource">
              <a :href="sourceAddress" target="_blank">资源平台</a>
            </a-menu-item>
            <a-menu-item key="/competition" @click="gotoPath('/competition')">
              比赛服务
            </a-menu-item>
          </a-menu>
        </div>
        <div class="login-right" v-if="!loginStatus">
          <div class="student" @click="goLogin(1)">机构登录</div>
          <div class="agency" @click="goLogin(0)">学生登录</div>
        </div>
        <div class="login-right" v-else>
          <drop-menu />
        </div>
      </div>
    </div>
  </a-affix>
</template>

<script>
import DropMenu from "../components/DropMenu";
import DropMenuMobile from "../components/DropMenuMobile";
import { CLOUD_SOURCE } from "../../api/address";

export default {
  name: "AppHeader",
  components: { DropMenuMobile, DropMenu },
  computed: {
    current: {
      get() {
        return [this.$route.path];
      },
      set(value) {
        this.$store.dispatch("setRoutePath", value[0]);
      },
    },
    loginStatus() {
      return this.$store.getters.loginStatus;
    },
    sourceAddress() {
      return CLOUD_SOURCE;
    },
  },
  methods: {
    gotoPath(url) {
      this.$router.push(url);
    },
    goLogin(role) {
      switch (role) {
        case 0:
          /* 学生登录 */
          this.$router.push("/login");
          break;
        case 1:
          /* 机构登录 */
          window.open(CLOUD_SOURCE, "_blank");
          break;
        default:
          break;
      }
    },
    doLogOut() {
      this.$store.dispatch("logOut");
      this.msgWarning("已退出登录");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#app-header {
  height: 70px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-container {
  width: 1140px;
  height: 100%;
  margin: auto;
  display: flex;
}

.header-container .ant-menu {
  height: 100%;
}

.header-container .ant-menu-horizontal {
  border-bottom: 0;
  line-height: 70px;
}

.header-container .ant-menu-item {
  height: 100%;
}

.logo-left {
  width: 250px;
  position: relative;
}

.logo-left img {
  width: 150px;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}

.mobile-login {
  display: none;
}

.menu-middle {
  flex: 1;
}

.login-right {
  width: 200px;
}

.student {
  height: 100%;
  width: 50%;
  display: inline-block;
  line-height: 70px;
  font-weight: bold;
  color: #606266;
  text-align: center;
}

.student:hover {
  color: #409eff;
  cursor: pointer;
}

.agency {
  height: 100%;
  width: 50%;
  display: inline-block;
  line-height: 70px;
  background-color: #1890ff;
  color: white;
  font-weight: bold;
  text-align: center;
}

.agency:hover {
  background-color: #409eff;
  cursor: pointer;
}

.welcome {
  height: 100%;
  line-height: 70px;
}

.welcome:hover {
  color: #409eff;
  cursor: pointer;
}

.unlogin {
  font-weight: bold;
  color: #409eff;
}

@media screen and (max-width: 480px) {
  #app-header {
    height: 118px;
  }

  .header-container {
    width: 100%;
    display: block;
  }

  .logo-left {
    width: 100%;
    height: 70px;
  }

  .logo-left img {
    width: 150px;
  }

  .mobile-login {
    display: block;
    height: 100%;
    line-height: 70px;
    text-align: right;
    padding-right: 20px;
  }

  .menu-middle {
    height: 48px;
  }

  .header-container .ant-menu-horizontal {
    border-bottom: 0;
    line-height: 48px;
  }

  .login-right {
    display: none;
  }
}
</style>
