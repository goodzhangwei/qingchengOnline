import Vue from "vue";
import Vuex from "vuex";
import getters from "./getter";
import { removeToken } from "../utils/auth";
import { getInfo } from "../api/login";

Vue.use(Vuex);

// 状态对象
const state = {
  loginStatus: false,
  routePath: "/home",
  userInfo: {},
  openId: undefined,
};

// 包含多个更新state函数的对象
const mutations = {
  SET_PATH: (state, path) => {
    state.routePath = path;
  },
  LOG_IN: (state) => {
    state.loginStatus = true;
  },
  LOG_OUT: (state) => {
    state.loginStatus = false;
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_WXID: (state, openId) => {
    state.openId = openId;
  },
};

// 包含多个对应事件回调函数的对象
const actions = {
  setRoutePath({ commit }, path) {
    commit("SET_PATH", path);
  },
  logIn({ commit }) {
    commit("LOG_IN");
  },
  logOut({ commit }) {
    removeToken();
    commit("LOG_OUT");
    commit("SET_USERINFO", {});
  },
  GetInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          if (response.code === 200) {
            commit("SET_USERINFO", response.user);
            resolve(response);
          } else {
            reject(response.code);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  setOpenId({ commit }, openId) {
    commit("SET_WXID", openId);
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
