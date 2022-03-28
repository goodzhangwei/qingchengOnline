<template>
  <div>
    <video-header />
    <div class="main-container">
      <div class="main-container-left">
        <div class="title-bar">
          <ul>
            <li>
              <a-tag
                color="#f50"
                v-for="(item, index) in modalValue.courseLabels"
                :key="index"
              >
                {{ item }}
              </a-tag>
            </li>
            <li style="margin-top: 5px">
              <span
                >{{ modalValue.courseName }} -
                {{ directory[nowPlayIndex]["coursewareName"] }}</span
              >
            </li>
            <li>
              <div class="subtitle-bar">
                <span
                  >课程发布时间：{{
                    modalValue.updateTime
                      ? modalValue.updateTime
                      : "暂无时间信息"
                  }}</span
                >
              </div>
            </li>
          </ul>
        </div>
        <div class="video-player" id="dplayer"></div>
        <!-- 移动端课程目录显示 -->
        <div class="course-source">
          <div class="mobile-right">
            <div class="teacher-introduce">
              <img
                style="height: 50px; margin-right: 5px"
                src="../../assets/all-courses/上课.png"
              />
              <span style="font-size: 20px; font-family: '黑体'; color: #1890ff"
                >青程云课堂</span
              >
            </div>
            <a-collapse :bordered="false">
              <a-collapse-panel key="1" header="课程目录">
                <ul class="mobile-directory">
                  <li
                    v-for="(item, index) in directory"
                    :key="index"
                    :class="
                      nowPlayIndex === index
                        ? 'directory-item selected-item'
                        : 'directory-item'
                    "
                  >
                    <a
                      @click="changeVideo(index)"
                      :title="`P${index + 1} ${item.coursewareName}`"
                    >
                      <div
                        :class="
                          nowPlayIndex === index
                            ? 'click-title selected-item'
                            : 'click-title'
                        "
                      >
                        <img
                          v-show="nowPlayIndex === index"
                          src="../../assets/playing.gif"
                          style="height: 14px; width: 14px; margin-right: 5px"
                        />{{ `P${index + 1} ${item.coursewareName}` }}
                      </div>
                    </a>
                  </li>
                </ul>
              </a-collapse-panel>
            </a-collapse>
          </div>
          <a-tabs default-active-key="1">
            <a-tab-pane key="1">
              <span slot="tab">
                <a-icon type="book" />
                课程介绍
              </span>
              <div class="introduction">
                <p>{{ modalValue.courseDescription }}</p>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2">
              <span slot="tab">
                <a-icon type="message" />
                课程讨论
              </span>
              <comments :courseId="courseId" />
            </a-tab-pane>
            <a-tab-pane key="3">
              <span slot="tab">
                <a-icon type="file-zip" />
                资料下载
              </span>
              <sources :courseId="courseId" />
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="main-container-right">
        <div class="teacher-introduce">
          <img
            style="height: 50px; margin-right: 5px"
            src="../../assets/all-courses/上课.png"
          />
          <span style="font-size: 20px; font-family: '黑体'; color: #1890ff"
            >青程云课堂</span
          >
        </div>
        <div class="directory">
          <div class="directory-title">
            <a-icon type="unordered-list" />&nbsp;课程目录
          </div>
          <ul>
            <li
              v-for="(item, index) in directory"
              :key="index"
              :class="
                nowPlayIndex === index
                  ? 'directory-item selected-item'
                  : 'directory-item'
              "
            >
              <a
                @click="changeVideo(index)"
                :title="`P${index + 1} ${item.coursewareName}`"
              >
                <div
                  :class="
                    nowPlayIndex === index
                      ? 'click-title selected-item'
                      : 'click-title'
                  "
                >
                  <img
                    v-show="nowPlayIndex === index"
                    src="../../assets/playing.gif"
                    style="height: 14px; width: 14px; margin-right: 5px"
                  />{{ `P${index + 1} ${item.coursewareName}` }}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <video-footer />
  </div>
</template>

<script>
import VideoHeader from "./components/VideoHeader";
import Comments from "./components/comments";
import Sources from "./components/sources";
import VideoFooter from "./components/VideoFooter";
import { getCourseDetail, getVideoDetail } from "../../api/course";
import DPlayer from "dplayer";

export default {
  name: "index",
  components: {
    VideoFooter,
    Sources,
    Comments,
    VideoHeader,
  },
  data() {
    return {
      title: "人工智能介绍",
      tagName: "人工智能",
      directory: [
        {
          id: null,
          coursewareName: "",
          fileUrl: "",
        },
      ],
      modalValue: {
        courseId: 0,
        courseCover: "",
        courseName: "",
        courseDifficulty: "",
        courseDescription: "",
        courseCrowd: "",
        courseStorage: "",
        coursePrice: 0,
        courseLabels: [],
      },
      nowPlayIndex: 0,
      dp: undefined,
    };
  },
  computed: {
    courseId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.getViewDetail(this.courseId);
  },
  methods: {
    /* 查询该课程的详细信息 */
    getViewDetail(id) {
      getVideoDetail(id).then((response) => {
        const _this = this;
        if (response.code === 200) {
          this.modalValue = response.data;
          this.directory = this.modalValue["coursewareList"];
          this.setDplayer(this.directory[this.nowPlayIndex]["fileUrl"]);
          this.getLabels(id);
        } else if (response.code === 2001) {
          this.$info({
            title: response.msg,
            centered: true,
            okText: "前往报名",
            onOk() {
              _this.$router.push(`/course-detail/${id}`);
            },
          });
        } else {
          this.msgError(`Error:${response.code} ${response.msg}`);
        }
      });
    },
    /* 查询该课程的标签 */
    getLabels(id) {
      getCourseDetail(id).then((response) => {
        if (response.code === 200) {
          this.modalValue["courseLabels"] = response.data["courseLabels"];
        }
      });
    },
    changeVideo(index) {
      this.nowPlayIndex = index;
      this.setDplayer(this.directory[this.nowPlayIndex]["fileUrl"]);
    },
    setDplayer(url) {
      this.dp = new DPlayer({
        container: document.getElementById("dplayer"),
        video: {
          url: url,
        },
      });
    },
  },
};
</script>

<style scoped>
.main-container {
  width: 1140px;
  margin: auto;
  display: flex;
}

.main-container-left {
  flex: 1;
}

.main-container-right {
  width: 320px;
  padding-left: 30px;
}

.title-bar {
  padding: 20px 0;
  font-size: 18px;
  color: rgb(33, 33, 33);
}

.title-bar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.title-bar .subtitle-bar {
  margin: 5px 0;
  font-size: 12px;
  color: rgb(153, 153, 153);
}

.video-player {
  width: 100%;
  height: 466px;
  background-color: black;
}

.course-source {
  padding: 20px 0;
}

.mobile-right {
  display: none;
}

.teacher-introduce {
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
}

.directory {
  padding: 10px 6px;
  background-color: rgb(244, 244, 244);
}

.directory ul {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
}

.mobile-directory {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.directory ul::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3.5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.directory ul::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #9fa0a2;
}

.directory ul::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ededed;
  border-radius: 10px;
}

.directory-title {
  color: rgba(0, 0, 0, 0.85);
  padding-left: 10px;
}

.directory-item {
  padding: 0 10px;
  margin: 5px 0;
  height: 30px;
  line-height: 30px;
}

.click-title {
  font-size: 12px;
  color: rgb(33, 33, 33);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.directory-item:hover {
  background-color: white;
}

.selected-item {
  background-color: white;
  color: #1890ff;
}

.introduction {
  min-height: 300px;
  line-height: 24px;
}

@media screen and (max-width: 480px) {
  .main-container {
    width: 100%;
    display: block;
  }

  .main-container-right {
    display: none;
  }

  .title-bar {
    padding: 20px 5px;
  }

  .video-player {
    height: 275px;
  }

  .introduction {
    padding: 0 5px;
  }

  .course-source {
    padding-top: 0;
  }

  .mobile-right {
    display: block;
  }

  .teacher-introduce {
    padding: 10px;
  }
}
</style>
