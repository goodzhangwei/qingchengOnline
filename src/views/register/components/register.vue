<template>
  <div class="login-container">
    <div class="form-container">
      <a-page-header title="新用户注册" @back="backLogin" />
      <div class="page-content">
        <phone-register />
      </div>
    </div>
  </div>
</template>

<script>
import PhoneRegister from "../components/phoneRegister";

export default {
  name: "login",
  components: { PhoneRegister },
  data() {
    return {
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    backLogin() {
      if (!this.redirect) {
        this.$router.push("/login");
      } else {
        this.$router.push(`/login?redirect=${this.redirect}`);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
}

.form-container {
  width: 1160px;
  height: 100%;
  margin: auto;
}

.page-content {
  margin: 0 200px;
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
