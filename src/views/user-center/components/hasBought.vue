<template>
  <div>
    <h2>已购课程</h2>
    <el-table :data="tableData">
      <el-table-column
        prop="courseName"
        label="课程名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="最近更新时间"
        align="center"
      ></el-table-column>
      <el-table-column label="课程价格" align="center">
        <template slot-scope="scope">
          <span style="color: #f50"
            >￥{{ scope.row.coursePrice.toFixed(2) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="学习" align="center" fixed="right" width="95px">
        <template slot-scope="scope">
          <a-button
            size="small"
            type="primary"
            @click="gotoLearn(scope.row.courseId)"
            >前往学习</a-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { hasBoughtCourse } from "../../../api/course";

export default {
  name: "hasBought",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      hasBoughtCourse().then((response) => {
        if (response.code === 200) {
          this.tableData = response.rows;
        } else {
          this.msgError(response.msg);
        }
      });
    },
    gotoLearn(id) {
      this.$router.push(`/course/${id}`);
    },
  },
};
</script>

<style scoped></style>
