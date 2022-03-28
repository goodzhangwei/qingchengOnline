import request from "@/utils/request";

export function getAllLabel() {
  return request({
    url: "/label/",
    method: "get",
  });
}

export function getAllCourse(query) {
  return request({
    url: "/course/",
    method: "get",
    params: query,
  });
}

export function getCourseDetail(id) {
  return request({
    url: `/course/detail/${id}`,
    method: "get",
  });
}

export function getVideoDetail(id) {
  return request({
    url: `/course/video/${id}`,
    method: "get",
  });
}

export function hasBoughtCourse(query) {
  return request({
    url: "/personal/myCourse",
    method: "get",
    params: query,
  });
}

export function hasPermission(id) {
  return request({
    url: `/course/permission/${id}`,
    method: "get",
  });
}

export function documentList(id) {
  return request({
    url: `/course/document/${id}`,
    method: "get",
  });
}

// 获取某课程所有评论
export function getAllComments(query) {
  return request({
    url: `/comment/root`,
    method: "post",
    data: query
  });
}
// 查看评论回复
export function getReply(query) {
  return request({
    url: `/comment/replay`,
    method: "post",
    data: query
  });
}
// 新增评论
export function addComment(query) {
  return request({
    url: `/comment`,
    method: "post",
    data: query
  });
}