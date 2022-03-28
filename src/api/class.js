import request from "@/utils/request";

export function getClassInfo(id) {
  return request({
    url: `/class/${id}`,
    method: "get",
  });
}

export function applyJoinClass(data) {
  return request({
    url: "/class",
    method: "post",
    data,
  });
}

export function getMyClasses(query) {
  return request({
    url: "/class/my",
    method: "get",
    params: query,
  });
}

export function getApplyInfo(query) {
  return request({
    url: "/class",
    method: "get",
    params: query,
  });
}

export function getClassCourse(query) {
  return request({
    url: "/course/classCourse",
    method: "get",
    params: query,
  });
}
