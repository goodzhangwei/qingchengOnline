<template>
  <div>
    <div class="search-bar">
      <a-input-search
        placeholder="请输入班级ID"
        :allowClear="true"
        @search="onSearch"
      >
        <a-button slot="enterButton" type="primary"
          ><a-icon type="search" />搜索班级</a-button
        >
      </a-input-search>
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
      <el-table-column
        label="申请加入"
        align="center"
        fixed="right"
        width="85px"
      >
        <template slot-scope="scope">
          <a-popconfirm
            title="是否申请加入班级？"
            ok-text="是"
            cancel-text="否"
            @confirm="applyJoin(scope.row.classId)"
            @cancel="cancelApply"
          >
            <a-button size="small" type="primary"> 加入班级 </a-button>
          </a-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { applyJoinClass, getClassInfo } from "../../../api/class";

export default {
  name: "JoinClass",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    onSearch(value) {
      getClassInfo(value).then((response) => {
        if (response.code === 200) {
          const res = response.data;
          if (res instanceof Array) {
            this.tableData = res;
          } else {
            this.tableData = [res];
          }
        } else {
          this.tableData = [];
          this.msgError(response.msg);
        }
      });
    },
    applyJoin(id) {
      applyJoinClass({
        classId: id,
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess("已提交申请");
        } else {
          this.msgError(response.msg);
        }
      });
    },
    cancelApply() {
      this.msgWarning("取消申请");
    },
  },
};
</script>

<style scoped>
.search-bar {
  width: 50%;
  margin: auto;
}

@media screen and (max-width: 480px) {
  .search-bar {
    width: 100%;
    margin: 0;
  }
}
</style>
