<template>
  <div>
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
        label="查看班级课程"
        align="center"
        fixed="right"
        width="85px"
      >
        <template slot-scope="scope">
          <a-button
            type="primary"
            size="small"
            @click="classCourseList(scope.row.classId)"
            >查看</a-button
          >
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
    <a-modal v-model="modalVisible" title="班级课程" :footer="null">
      <el-table :data="innerTableData">
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
      <div style="margin-top: 5px; text-align: center">
        <a-pagination
          size="small"
          v-model="innerPageNum"
          :pageSize="innerPageSize"
          :total="innerTotal"
          :show-total="(total) => `共 ${total} 条`"
          @change="handleInnerPage"
        />
      </div>
    </a-modal>
  </div>
</template>

<script>
import { getClassCourse, getMyClasses } from "../../../api/class";

export default {
  name: "MyClass",
  data() {
    return {
      tableData: [],
      modalVisible: false,
      innerTableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      innerPageNum: 1,
      innerPageSize: 5,
      innerTotal: 0,
      currentCourse: 0,
    };
  },
  mounted() {
    this.getApplyList();
  },
  methods: {
    getApplyList() {
      getMyClasses({
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
    },
    classCourseList(id) {
      this.currentCourse = id;
      getClassCourse({
        classId: id,
        pageNum: this.innerPageNum,
        pageSize: this.innerPageSize,
      }).then((response) => {
        if (response.code === 200) {
          this.innerTableData = response.rows;
          this.innerTotal = response.total;
          this.modalVisible = true;
        } else {
          this.msgError(response.msg);
          this.innerTotal = 0;
          this.innerTableData = [];
        }
      });
    },
    gotoLearn(id) {
      this.$router.push(`/course/${id}`);
    },
    handleCurrentPage() {
      this.getApplyList();
    },
    handleInnerPage() {
      this.classCourseList(this.currentCourse);
    },
  },
};
</script>

<style scoped></style>
