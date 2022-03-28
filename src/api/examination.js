import request from "@/utils/request";

// 查询考试列表
export function getExamination() {
  return request({
    url: `/exam/exam-info/list`,
    method: "get",
  });
}

// 查询考试详情
export function getExamInfo() {
  return request({
    url: `/exam/exam-info/selectOne`,
    method: "get",
  });
}