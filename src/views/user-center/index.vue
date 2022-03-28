<template>
  <div>
    <user-header />
    <div class="mainer">
      <a-menu class="left-menu" v-model="current" mode="inline">
        <a-menu-item key="/user/index" @click="gotoPath('/user/index')">
          <a-icon type="user" /><span>个人资料</span>
        </a-menu-item>
        <a-menu-item key="/user/class" @click="gotoPath('/user/class')">
          <a-icon type="apartment" /><span>我的班级</span>
        </a-menu-item>
        <a-menu-item key="/user/buy" @click="gotoPath('/user/buy')">
          <a-icon type="shop" /><span>已购课程</span>
        </a-menu-item>
        <a-menu-item key="/user/order" @click="gotoPath('/user/order')">
          <a-icon type="audit" /><span>订单中心</span>
        </a-menu-item>
        <a-menu-item key="/user/change" @click="gotoPath('/user/change')">
          <a-icon type="unlock" /><span>修改密码</span>
        </a-menu-item>
      </a-menu>
      <a-menu class="left-menu-mobile" v-model="current" mode="horizontal">
        <a-menu-item key="/user/index" @click="gotoPath('/user/index')">
          <a-icon type="user" /><span>个人资料</span>
        </a-menu-item>
        <a-menu-item key="/user/class" @click="gotoPath('/user/class')">
          <a-icon type="apartment" /><span>我的班级</span>
        </a-menu-item>
        <a-menu-item key="/user/buy" @click="gotoPath('/user/buy')">
          <a-icon type="shop" /><span>已购课程</span>
        </a-menu-item>
        <a-menu-item key="/user/order" @click="gotoPath('/user/order')">
          <a-icon type="audit" /><span>订单中心</span>
        </a-menu-item>
        <a-menu-item key="/user/change" @click="gotoPath('/user/change')">
          <a-icon type="unlock" /><span>修改密码</span>
        </a-menu-item>
      </a-menu>
      <user-main />
    </div>
  </div>
</template>

<script>
import UserMain from "./layout/UserMain";
import UserHeader from "./layout/UserHeader";

export default {
  name: "center",
  components: { UserHeader, UserMain },
  computed: {
    current: {
      get() {
        return [this.$route.path];
      },
      set(value) {
        this.$store.dispatch("setRoutePath", value[0]);
      },
    },
  },
  methods: {
    gotoPath(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style scoped>
.mainer {
  width: 1160px;
  padding-top: 20px;
  margin: auto;
  display: flex;
}

.left-menu {
  width: 256px;
}

.left-menu-mobile {
  display: none;
}

@media screen and (max-width: 480px) {
  .mainer {
    display: block;
    width: 100%;
    padding-top: 0;
  }

  .left-menu {
    display: none;
  }

  .left-menu-mobile {
    display: block;
  }
}
</style>
