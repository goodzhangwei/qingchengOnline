import request from "@/utils/request";

// 查询比赛类别
export function getCompetitionCategory() {
  return request({
    url: `/competition/category/list`,
    method: "get",
  });
}
// 根据categoryId查询比赛详细信息
export function getCompetitionInfo(params) {
  return request({
    url: `/competition/competition/list`,
    method: "get",
    params: params,
  });
}

export function getCompCategoryId(id) {
  return request({
    url: `/competition/category/` + id,
    method: "get",
  });
}
// 根据Id查询比赛详细信息
export function getCompInfoById(id) {
  return request({
    url: "/competition/competition/" + id,
    method: "get",
  });
}
// 新增报名信息
export function addComInfo(params) {
  return request({
    url: "/competition/information",
    method: "post",
    data: params,
  });
}
// 根据competition/userId查询报名信息
export function getCompetUserById(params) {
  return request({
    url: `/competition/information/list`,
    method: "get",
    params: params,
  });
}
// 创建队伍
export function addComTeam(params) {
  return request({
    url: "/competition/team",
    method: "post",
    data: params,
  });
}
// 修改队伍
export function modifyComTeam(params) {
  return request({
    url: "/competition/team",
    method: "put",
    data: params,
  });
}
// 查询队伍信息
export function getTeamInfo(params) {
  return request({
    url: `/competition/team/list`,
    method: "get",
    params: params,
  });
}
// 查询队伍人员信息
export function getMembersInfo(params) {
  return request({
    url: `/competition/member/teamMemberVOList`,
    method: "get",
    params: params,
  });
}
// 删除队伍
export function delTeam(id) {
  return request({
    url: '/competition/team/' + id,
    method: "delete",
  });
}
// 申请加入队伍
export function applyTeam(params) {
  return request({
    url: "/competition/member",
    method: "post",
    data: params,
  });
}
// 同意审批
export function agreeApply(params) {
  return request({
    url: "/competition/member",
    method: "put",
    data: params,
  });
}
// 拒绝审批
export function refuseApply(id) {
  return request({
    url: "/competition/member/"+id,
    method: "delete",
  });
}
// 提交作品
export function submitWork(params) {
  return request({
    url: "/competition/work",
    method: "post",
    data: params,
  });
}
// 查看该学生所在队伍提交作品
export function getCommitted(params) {
  return request({
    url: '/competition/work/query',
    method: 'get',
    params:params
  })
}
