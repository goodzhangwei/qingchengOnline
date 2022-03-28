<template>
  <div>
    <div class="select-title">
      <div class="title-left">
        <img
          class="title-image"
          src="../../assets/all-courses/course-title.png"
        />
        <img
          style="height: 12px"
          src="../../assets/all-courses/course-top.png"
        />
      </div>
      <div class="title-middle"></div>
      <div class="title-right">
        <a-input-search
          placeholder="搜索感兴趣的课程内容"
          enter-button
          @search="onSearch"
        />
      </div>
    </div>
    <a-spin :spinning="spinning">
      <div class="select-list">
        <div class="select-row">
          <div class="select-row-title">课程类型：</div>
          <ul>
            <li
              :class="
                selectParams.type === -1
                  ? 'classification-name-select'
                  : 'classification-name'
              "
              @click="selectLessonType({ id: -1, labelName: '' })"
            >
              全部
            </li>
            <li
              v-for="(item, index) in lessonType"
              :key="index"
              :class="
                selectParams.type === item.id
                  ? 'classification-name-select'
                  : 'classification-name'
              "
              @click="selectLessonType(item)"
            >
              {{ item.labelName }}
            </li>
          </ul>
        </div>
        <div class="select-row">
          <div class="select-row-title">学习方向：</div>
          <ul>
            <li
              :class="
                selectParams.direction === -1
                  ? 'classification-name-select'
                  : 'classification-name'
              "
              @click="selectLessonDirection({ id: -1, labelName: '' })"
            >
              全部
            </li>
            <li
              v-for="(item, index) in lessonDirection"
              :key="index"
              :class="
                selectParams.direction === item.id
                  ? 'classification-name-select'
                  : 'classification-name'
              "
              @click="selectLessonDirection(item)"
            >
              {{ item.labelName }}
            </li>
          </ul>
        </div>
        <div class="select-row">
          <div class="select-row-title">课程主题：</div>
          <ul>
            <li
              :class="
                selectParams.mode === -1
                  ? 'classification-name-select'
                  : 'classification-name'
              "
              @click="selectLessonMode({ id: -1, labelName: '' })"
            >
              全部
            </li>
            <li
              v-for="(item, index) in lessonMode"
              :key="index"
              :class="
                selectParams.mode === item.id
                  ? 'classification-name-select'
                  : 'classification-name'
              "
              @click="selectLessonMode(item)"
            >
              {{ item.labelName }}
            </li>
          </ul>
        </div>
      </div>
      <div class="list-container" v-if="lessonCard.length > 0">
        <div class="course-list" v-for="k in 2" :key="k">
          <div
            class="course-card"
            v-for="(item, index) in lessonCard.slice(
              5 * (k - 1) + 10 * (pageNum - 1),
              5 * k + 10 * (pageNum - 1)
            )"
            :key="index"
          >
            <div class="card-content" @click="goViewDetail(item.courseId)">
              <div class="card-image">
                <el-image
                  alt="example"
                  fit="cover"
                  class="card-el-image"
                  :src="item.courseCover"
                />
              </div>
              <div class="card-text">
                <div class="card-title">{{ item.courseName }}</div>
                <div class="card-subtitle">
                  ￥{{ item.coursePrice.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-container" v-else>
        <div class="no-content-div">
          <img src="../../assets/no-content.png" />
          <div class="no-content-text">该分类下暂无课程</div>
        </div>
      </div>
      <!-- 移动端课程展示列表 -->
      <div class="list-container-mobile" v-if="lessonCard.length > 0">
        <div class="course-list" v-for="i in 5" :key="i">
          <div
            class="course-card"
            v-for="(item, index) in lessonCard.slice(
              2 * (i - 1) + 10 * (pageNum - 1),
              2 * i + 10 * (pageNum - 1)
            )"
            :key="index"
          >
            <div class="card-content" @click="goViewDetail(item.courseId)">
              <div class="card-image">
                <el-image
                  alt="example"
                  fit="cover"
                  class="card-el-image"
                  :src="item.courseCover"
                />
              </div>
              <div class="card-text">
                <div class="card-title">{{ item.courseName }}</div>
                <div class="card-subtitle">
                  ￥{{ item.coursePrice.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-container-mobile" v-else>
        <div style="text-align: center; margin-bottom: 10px">
          <img src="../../assets/no-content.png" />
          <div class="no-content-text">该分类下暂无课程</div>
        </div>
      </div>
      <div class="list-pagination">
        <a-pagination
          v-model="pageNum"
          :total="lessonCard.length"
          :show-total="(total) => `共 ${total} 条`"
          size="small"
          show-less-items
          @change="handleChange"
        />
      </div>
    </a-spin>
    <a-modal
      v-model="modalVisible"
      title="课程详情"
      centered
      @ok="() => (modalVisible = false)"
    >
      <div class="modal-content">
        <el-image
          alt="example"
          fit="cover"
          class="modal-content-image"
          :src="modalValue.courseCover"
        />
        <a-statistic title="课程名称" :value="modalValue.courseName" />
        <div class="ant-statistic-title">课程类别</div>
        <div class="modal-tag">
          <a-tag
            color="#f50"
            v-for="(item, index) in modalValue.courseLabels"
            :key="index"
          >
            {{ item }}
          </a-tag>
        </div>
        <div class="ant-statistic-title">难易度</div>
        <div class="modal-tag">{{ modalValue.courseDifficulty }}</div>
        <div class="ant-statistic-title">适合人群</div>
        <div class="modal-tag">{{ modalValue.courseCrowd }}</div>
        <a-statistic
          title="课程价格"
          :precision="2"
          :value="modalValue.coursePrice"
          :value-style="{ color: '#cf1322' }"
        >
          <template #prefix>￥</template>
        </a-statistic>
      </div>
      <div slot="footer">
        <a-button
          type="primary"
          class="detail-button"
          @click="goDetailPage(modalValue.courseId)"
          ><a-icon type="container" />查看详情</a-button
        >
      </div>
    </a-modal>
  </div>
</template>

<script>
import { getAllCourse, getAllLabel, getCourseDetail } from "../../api/course";

export default {
  name: "index",
  data() {
    return {
      spinning: false,
      pageNum: 1,
      selectParams: {
        type: -1,
        direction: -1,
        mode: -1,
      },
      /* 一级分类：课程类型 */
      lessonType: [],
      /* 二级分类：方向 */
      lessonDirection: [],
      /* 三级分类：课程主题 */
      lessonMode: [],
      allClassification: {
        lessonType: [],
        lessonDirection: [],
      },
      lessonCard: [],
      modalVisible: false,
      modalValue: {},
      classificationTree: null,
    };
  },
  computed: {
    loginStatus() {
      return this.$store.getters.loginStatus;
    },
  },
  mounted() {
    this.getClassificationTree();
    this.getCourseList(0);
  },
  methods: {
    onSearch() {},
    /* 获取课程列表 */
    getCourseList(labelId) {
      this.spinning = true;
      if (labelId <= -1) {
        getAllCourse().then((response) => {
          this.lessonCard = response["rows"];
          this.spinning = false;
        });
      } else {
        getAllCourse({ labelId }).then((response) => {
          this.lessonCard = response["rows"];
          this.spinning = false;
        });
      }
    },
    /* 选择一级分类时的回调函数 */
    selectLessonType(item) {
      this.selectParams.type = item.id;
      this.selectParams.direction = -1;
      this.selectParams.mode = -1;
      if (this.selectParams.type > -1) {
        this.lessonDirection = item.children;
      } else {
        this.lessonDirection = this.allClassification["lessonDirection"];
      }
      this.sumbitSelected();
    },
    /* 选择二级分类时的回调函数 */
    selectLessonDirection(item) {
      this.selectParams.direction = item.id;
      this.selectParams.mode = -1;
      if (this.selectParams.direction > -1) {
        this.lessonMode = item.children;
      } else {
        this.selectParams.mode = -1;
        this.lessonMode = [];
      }
      this.sumbitSelected();
    },
    /* 选择三级分类时的回调函数 */
    selectLessonMode(item) {
      this.selectParams.mode = item.id;
      this.sumbitSelected();
    },
    /* 提交筛选该分类的课程 */
    sumbitSelected() {
      const _this = this;
      const ids = Object.values(_this.selectParams);
      let queryId = -1;
      ids.forEach((item) => {
        if (item !== -1) queryId = item;
      });
      _this.getCourseList(queryId);
    },
    /* 页码改变时触发的回调 */
    handleChange(page) {
      this.pageNum = page;
    },
    /* 查询该课程的详细信息 */
    goViewDetail(id) {
      getCourseDetail(id).then((response) => {
        if (response.code === 200) {
          this.modalValue = response.data;
          this.modalVisible = true;
        }
      });
    },
    /* 前往查看课程详情 */
    goDetailPage(id) {
      this.modalVisible = false;
      this.$router.push(`/course-detail/${id}`);
    },
    /* 获取分类的树形结构 */
    getClassificationTree() {
      getAllLabel().then((response) => {
        if (response.code === 200) {
          this.classificationTree = response.data[0];
          this.getAllClassification();
        }
      });
    },
    /* 层序遍历获取初始全部的分类列表 */
    getAllClassification() {
      /* N叉树层序遍历 */
      const levelOrder = function (root) {
        const result = [];
        if (!root || root["children"].length === 0) return result;
        const queue = [];
        queue.push(root);
        while (queue.length) {
          const level = [];
          const len = queue.length;
          for (let i = 0; i < len; i++) {
            const node = queue.shift();
            level.push(node);
            queue.push(...node.children);
          }
          result.push([...new Set(level)]);
        }
        return result;
      };
      const result = levelOrder(this.classificationTree);
      this.allClassification["lessonType"] = result[1] || [];
      this.lessonType = result[1] || [];
      this.allClassification["lessonDirection"] = result[2] || [];
      this.lessonDirection = result[2] || [];
    },
  },
};
</script>

<style scoped>
.select-title {
  padding: 0 10px;
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.select-list {
  padding: 0 10px;
  background-image: linear-gradient(to top, #f2f4f6 0%, #eef1f5 100%);
  border-radius: 4px;
}

.title-image {
  height: 46px;
  margin-right: 8px;
}

.title-middle {
  flex: 1;
}

.title-right {
  width: 250px;
}

.select-row {
  min-height: 52px;
  line-height: 32px;
  padding: 10px;
  margin-bottom: 7px;
  display: flex;
}

.select-row ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.select-row li {
  display: list-item;
  float: left;
  padding: 0 8px;
  margin-bottom: 8px;
  margin-right: 12px;
}

.select-row-title {
  width: 100px;
  font-weight: bold;
}

.classification-name {
  cursor: pointer;
}

.classification-name-select {
  background-color: rgba(242, 13, 13, 0.06);
  cursor: pointer;
  color: #f20d0d;
  font-weight: 700;
  border-radius: 5px;
}

.list-container {
  height: 500px;
}

.list-container-mobile {
  display: none;
}

.course-list {
  display: flex;
  width: 100%;
}

.course-card {
  width: 228px;
  padding: 15px 10px;
}

.card-content {
  border: 1px solid #e8e8e8;
  height: 220px;
  border-radius: 3px;
}

.card-content:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.card-image {
  width: 100%;
  height: 65%;
}

.card-el-image {
  width: 100%;
  height: 100%;
}

.card-text {
  width: 100%;
  height: 35%;
  padding: 5px 10px;
}

.card-title {
  height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-subtitle {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #f40;
}

.list-pagination {
  text-align: center;
  margin-bottom: 20px;
}

.modal-tag {
  margin-bottom: 5px;
}

.modal-content-image {
  height: 150px;
  width: 100%;
  object-fit: cover;
}

.no-content-div {
  position: relative;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  transform: translate(-50%, -50%);
  text-align: center;
}

.no-content-div img {
  width: 100%;
  height: 170px;
  object-fit: cover;
}

.no-content-text {
  color: #c0c4cc;
}

@media screen and (max-width: 480px) {
  .select-title {
    padding: 0 5px;
    display: block;
  }

  .title-left {
    padding: 10px;
  }

  .title-right {
    padding: 10px 20px;
    width: 100%;
  }

  .select-list {
    padding: 0;
  }

  .select-row-title {
    width: 75px;
  }

  .list-container {
    display: none;
  }

  .list-container-mobile {
    display: block;
  }

  .course-card {
    width: 50%;
    padding: 10px 5px;
  }
}
</style>
