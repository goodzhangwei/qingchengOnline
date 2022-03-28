<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "UserMain",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.app-main {
  width: 864px;
  padding: 10px;
}

@media screen and (max-width: 480px) {
  .app-main {
    width: calc(100% - 10px);
    padding: 5px;
  }
}
</style>
