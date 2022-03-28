import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Antd from "ant-design-vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "ant-design-vue/dist/antd.css";
// import {
//   Carousel,
//   CarouselItem,
//   Image,
//   Table,
//   TableColumn,
//   Loading,
//   Pagination,
//   Card,

// } from "element-ui";
import axios from "axios";
import { parseTime } from "./utils/time";
import "./permission"; // permission control

Vue.config.productionTip = false;

Vue.prototype.msgSuccess = function (msg) {
  this.$message.success(msg);
};

Vue.prototype.msgError = function (msg) {
  this.$message.error(msg);
};

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
};

Vue.prototype.msgWarning = function (msg) {
  this.$message.warning(msg);
};

Vue.prototype.parseTime = parseTime;
Vue.prototype.axios = axios;
Vue.use(Element);
Vue.use(Antd);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Image);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(Pagination);
// Vue.use(Card);
// Vue.use(Loading.directive);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
