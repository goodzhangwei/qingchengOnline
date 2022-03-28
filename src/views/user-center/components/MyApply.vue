<template>
  <div>
    <div>
      <a-tag color="#2db7f5" @click="getApplyList(0)"> 已完成 </a-tag>
      <a-tag color="#87d068" @click="getApplyList(1)"> 已通过 </a-tag>
      <a-tag color="#f50" @click="getApplyList(2)"> 已拒绝 </a-tag>
      <a-tag color="#108ee9" @click="getApplyList(3)"> 处理中 </a-tag>
    </div>
    <el-table :data="tableData">
      <el-table-column
        prop="classId"
        label="班级ID"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="className"
        label="班级名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="deptName"
        label="机构名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="classLeader"
        label="班主任"
        align="center"
      ></el-table-column>
      <el-table-column label="申请状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1" style="color: #87d068"
            >已通过</span
          >
          <span v-else-if="scope.row.status === 2" style="color: #f50"
            >已拒绝</span
          >
          <span v-else style="color: #108ee9">处理中</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 5px">
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
import { getApplyInfo } from "../../../api/class";

export default {
  name: "MyApply",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      status: 0,
    };
  },
  mounted() {
    this.getApplyList(0);
  },
  methods: {
    getApplyList(status) {
      this.status = status;
      this.pageNum = 1;
      if (status !== 0) {
        getApplyInfo({
          status: status,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }).then((response) => {
          if (response.code === 200) {
            this.total = response.total;
            this.tableData = response.rows;
          } else {
            this.total = 0;
            this.tableData = [];
          }
        });
      } else {
        getApplyInfo({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }).then((response) => {
          if (response.code === 200) {
            this.total = response.total;
            this.tableData = response.rows;
          } else {
            this.total = 0;
            this.tableData = [];
          }
        });
      }
    },
    handleCurrentPage(page, pageSize) {
      if (this.status !== 0) {
        getApplyInfo({
          status: this.status,
          pageNum: page,
          pageSize: pageSize,
        }).then((response) => {
          if (response.code === 200) {
            this.total = response.total;
            this.tableData = response.rows;
          } else {
            this.total = 0;
            this.tableData = [];
          }
        });
      } else {
        getApplyInfo({
          pageNum: page,
          pageSize: pageSize,
        }).then((response) => {
          if (response.code === 200) {
            this.total = response.total;
            this.tableData = response.rows;
          } else {
            this.total = 0;
            this.tableData = [];
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.ant-tag:hover {
  cursor: pointer;
}
</style>
