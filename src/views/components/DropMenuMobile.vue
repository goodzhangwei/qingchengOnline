<template>
  <a-dropdown :trigger="['click']">
    <a-avatar style="color: #409eff; background-color: rgb(217, 236, 255)">
      {{ userInfo["nickName"].charAt(0) }}
    </a-avatar>
    <a-menu slot="overlay">
      <a-menu-divider />
      <a-menu-item key="1" @click="gotoPath('/user')">
        <a-icon type="home" />
        个人中心
      </a-menu-item>
      <a-menu-item key="2" @click="gotoPath('/user/class')">
        <a-icon type="apartment" />
        我的班级
      </a-menu-item>
      <a-menu-item key="3" @click="gotoPath('/user/change')">
        <a-icon type="unlock" />
        修改密码
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item key="4" @click="doLogOut">
        <a-icon type="logout" />
        退出登录
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: "DropMenuMobile",
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    doLogOut() {
      this.$store.dispatch("logOut");
      this.msgWarning("已退出登录");
      this.$router.push("/");
    },
    gotoPath(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style scoped></style>
