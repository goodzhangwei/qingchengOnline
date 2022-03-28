<template>
  <div id="recommend-section">
    <h1>
      <a-icon
        type="fire"
        theme="twoTone"
        two-tone-color="#FF0000"
      />&nbsp;热门课程推荐
    </h1>
    <div class="course-list-web">
      <div class="course-list">
        <div
          class="course-card"
          v-for="(item, index) in lessonCard.slice(0, 5)"
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
    <div class="course-list-mobile">
      <div class="course-list">
        <div
          class="course-card"
          v-for="(item, index) in lessonCard.slice(0, 2)"
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
      <div class="course-list">
        <div
          class="course-card"
          v-for="(item, index) in lessonCard.slice(2, 4)"
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
  </div>
</template>

<script>
import { getAllCourse } from "../../../api/course";

export default {
  name: "Recommend",
  data() {
    return {
      lessonCard: [],
    };
  },
  mounted() {
    this.getRecommendList();
  },
  methods: {
    getRecommendList() {
      getAllCourse().then((response) => {
        if (response.code === 200) {
          this.lessonCard = response["rows"];
        }
      });
    },
    goViewDetail(id) {
      this.$router.push(`/course-detail/${id}`);
    },
  },
};
</script>

<style scoped>
#recommend-section {
  margin: 20px 0;
}

.course-list {
  display: flex;
  width: 100%;
}

.course-list-mobile {
  display: none;
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

@media screen and (max-width: 480px) {
  .course-list-web {
    display: none;
  }

  .course-list-mobile {
    display: block;
  }
}
</style>
