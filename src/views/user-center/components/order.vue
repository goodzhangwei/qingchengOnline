<template>
  <div>
    <h2>订单中心</h2>
    <el-table :data="tableData">
      <el-table-column
        prop="orderId"
        label="课程编号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="goodsName"
        label="课程名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="订单创建时间"
        align="center"
        width="150px"
      ></el-table-column>
      <el-table-column label="课程价格" align="center">
        <template slot-scope="scope">
          <span style="color: #f50">￥{{ scope.row.totalFee.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1" style="color: #67c23a"
            >已支付</span
          >
          <span v-else-if="scope.row.status === 2" style="color: #409eff"
            >待支付</span
          >
          <span v-else style="color: #f56c6c">已取消</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="95px">
        <template slot-scope="scope">
          <template v-if="scope.row.status === 2">
            <a-popconfirm
              title="是否取消订单？"
              ok-text="是"
              cancel-text="否"
              @confirm="cancelOrder(scope.row.orderId)"
            >
              <a-button size="small" type="primary">取消订单</a-button>
            </a-popconfirm>
          </template>
          <span v-else style="color: #c0c4cc">不可操作</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 5px; text-align: center">
      <a-pagination
        size="small"
        v-model="pageNum"
        :pageSize="pageSize"
        :total="total"
        :show-total="(total) => `共 ${total} 条`"
        @change="handleCurrentPage"
      />
    </div>
  </div>
</template>

<script>
import { orderCancel, orderList } from "../../../api/wechat";

export default {
  name: "order",
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      orderList({
        userId: this.$store.getters.userInfo["userId"],
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then((response) => {
        if (response.code === 200) {
          this.total = response.total;
          this.tableData = response.rows;
        } else {
          this.total = 0;
          this.msgError(response.msg);
        }
      });
    },
    /* 取消订单 */
    cancelOrder(id) {
      orderCancel({
        orderId: id,
      }).then((response) => {
        if (response.code === 200) {
          this.msgWarning("订单已取消");
          this.getTableData();
        } else {
          this.msgError(response.msg);
        }
      });
    },
    handleCurrentPage() {
      this.getTableData();
    },
  },
};
</script>

<style scoped></style>
