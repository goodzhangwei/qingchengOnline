import request from "@/utils/request";

export function getSmsCode(query) {
  return request({
    url: "/sms/code",
    method: "get",
    params: query,
  });
}

export function loginExport(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function getInfo() {
  return request({
    url: "/getInfo",
    method: "get",
  });
}

export function registerExport(data) {
  return request({
    url: "/register",
    method: "post",
    data,
  });
}

export function checkCode(data) {
  return request({
    url: "/checkCode",
    method: "post",
    data,
  });
}

export function resetPwd(data) {
  return request({
    url: "/resetPwd",
    method: "put",
    data,
  });
}

export function changePwd(data) {
  return request({
    url: "/personal/password",
    method: "put",
    data,
  });
}
