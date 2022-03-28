import request from "@/utils/request";

/* 创建支付订单 */
export function createOrder(data) {
  return request({
    url: "/pay/createOrder",
    method: "post",
    data,
  });
}

/* 获取订单列表 */
export function orderList(query) {
  return request({
    url: "/my/order/list",
    method: "get",
    params: query,
  });
}

/* 取消支付订单 */
export function orderCancel(query) {
  return request({
    url: "/my/order/",
    method: "delete",
    params: query,
  });
}
