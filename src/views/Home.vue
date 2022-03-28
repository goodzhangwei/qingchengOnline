<template>
  <div class="home">
    <app-header />
    <app-main />
    <app-footer />
    <div class="QRcode">
      <div class="QRcode_first">
        <i class="el-icon-arrow-up"></i>
      </div>
      <div class="QRcode_two"  @mouseover="changeOver" @mouseout="changeOut">
        <i class="el-icon-mobile-phone"></i>
        <div v-if = "flag" class="erweima">
          <div class="erweimaFirst">
            <h3>联系电话:</h3>
            <h4>400 -168 - 6292</h4>
          </div>
          <div class="erweimatwo">
            <img src="../assets/qrcode.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppMain from "./layout/AppMain";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import { getToken } from "../utils/auth";

export default {
  name: "Home",
  components: {
    AppFooter,
    AppHeader,
    AppMain,
  },
  data() {
    return {
      flag:false
    }
  },
  mounted() {
    if (getToken()) {
      this.$store.dispatch("logIn");
    }
  },
  methods:{
    // 鼠标经过
    changeOver() {
      this.flag = true
    },
    // 鼠标离开
    changeOut() {
      this.flag = false
    }
  }
};
</script>
<style scoped>
.QRcode {
  z-index: 1001;
  position: fixed;
  top: 50%;
  right: 10px;
  padding: 4px;
}

.QRcode .QRcode_first {
  width: 40px;
  height: 40px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 25px;
  background-color: #fff;
}

.QRcode .QRcode_first:hover {
  background:#1890ff;
  color: #fff;
}

.QRcode .QRcode_two {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40px;
  height: 40px;
  margin-top: 10px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
  border-radius: 5px;
  cursor: pointer;
  font-size: 25px;
  background-color: #fff;
}

.QRcode .QRcode_two:hover {
  background:#1890ff;
  color: #fff;
}

.erweima {
  height: 105px;
  width: 260px;
  background-color: #f0f6fc;
  position: absolute;
  right: 50px;
  bottom: -20px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.05);
  border-radius: 5px;
  display: flex;
  padding: 7px;
  font-size: 15px;
}
.erweima::before {
  content: "";
  position: absolute;
  bottom: 30px;
  right: -14px;
  border: 7px solid transparent;
  border-left-color: #f0f6fc;
}

.erweima .erweimaFirst {
  flex: 2;
  text-align: center;
  padding-top: 15px;
  color: #6e6e6e;
}
.erweima .erweimatwo {
  flex: 1;
}
.erweima .erweimatwo img{
  width: 100%;
  height: 100%;

}
</style>
