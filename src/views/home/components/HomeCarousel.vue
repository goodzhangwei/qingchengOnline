<template>
  <div class="main">
    <div class="main-left">
      <el-carousel height="360px" :interval="5000">
        <el-carousel-item v-for="(item, index) in imageList" :key="index">
          <el-image
            class="main-left-content"
            :src="item.url"
            :fit="item.fitness"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main-left-mobile">
      <el-carousel height="175px" :interval="5000">
        <el-carousel-item v-for="(item, index) in imageList" :key="index">
          <el-image
            class="main-left-content"
            :src="item.url"
            :fit="item.fitness"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main-right">
      <a-card style="width: 100%; height: 100%; border-radius: 5px">
        <ul v-show="loginStatus">
          <li class="avatar-list">
            <a-avatar
              :size="64"
              style="color: #409eff; background-color: rgb(217, 236, 255)"
            >
              {{
                userInfo["nickName"] ? userInfo["nickName"].charAt(0) : "用户"
              }}
            </a-avatar>
          </li>
          <li class="nickname-list">{{ userInfo["nickName"] }}</li>
          <li class="button-list">
            <a-button
              type="primary"
              shape="round"
              size="large"
              @click="() => this.$router.push('/user/class')"
            >
              <a-icon type="book" />我的班级</a-button
            >
          </li>
        </ul>
        <ul v-show="!loginStatus">
          <li class="nickname-list">登录后学习精品课程</li>
          <li class="avatar-list"><a-avatar :size="64" icon="user" /></li>
          <li class="button-list">
            <a-button
              type="primary"
              shape="round"
              size="large"
              @click="() => this.$router.push('/login')"
            >
              登录/注册</a-button
            >
          </li>
        </ul>
      </a-card>
    </div>
    <div class="main-right-mobile">
      <div class="mobile-card">
        <a-row v-show="loginStatus">
          <div class="nickname-list">欢迎您，{{ userInfo["nickName"] }}</div>
          <div style="text-align: center">
            <a-button
              type="primary"
              shape="round"
              @click="() => this.$router.push('/user/class')"
            >
              <a-icon type="book" />我的班级</a-button
            >
          </div>
        </a-row>
        <a-row v-show="!loginStatus" style="padding-top: 15px">
          <a-col :span="10" style="text-align: center">
            <a-avatar :size="64" icon="user" />
          </a-col>
          <a-col :span="14" style="text-align: center">
            <div class="nickname-list">登录后学习精品课程</div>
            <div class="button-list">
              <a-button
                type="primary"
                shape="round"
                @click="() => this.$router.push('/login')"
              >
                登录/注册</a-button
              >
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCarousel",
  computed: {
    loginStatus() {
      return this.$store.getters.loginStatus;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  data() {
    return {
      imageList: [
        {
          url: require("../../../assets/homepage/img01.png"),
          fitness: "cover",
        },
      ],
    };
  },
  methods: {
    goDetailPage(id) {
      this.$router.push(`/course-detail/${id}`);
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 360px;
  /* background-color: pink; */
}

.main-left {
  float: left;
  width: 900px;
  height: 100%;
  padding-right: 10px;
}

.main-right {
  float: left;
  width: 240px;
  height: 100%;
}

.main-left-mobile {
  display: none;
}

.main-left-content {
  height: 360px;
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
}

.main-right-mobile {
  display: none;
}

.main-right ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.my-course {
  text-align: left;
  margin: 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.my-course:hover {
  color: #1890ff;
  cursor: pointer;
}

.avatar-list {
  margin: 30px 0;
}

.nickname-list {
  margin: 30px 0;
  color: #111;
  font-weight: 500;
}

.button-list {
  margin: 20px 0;
}

.mobile-card {
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e8;
  padding: 10px 5px 20px 0;
  border-radius: 5px;
}

@media screen and (max-width: 480px) {
  .main {
    height: auto;
  }

  .main-left {
    display: none;
  }

  .main-left-mobile {
    display: block;
  }

  .main-right {
    display: none;
  }

  .main-left-content {
    height: 175px;
  }

  .main-right-mobile {
    display: block;
    margin-top: 10px;
  }

  .avatar-list {
    margin: 20px 0;
  }

  .nickname-list {
    font-size: 16px;
    text-align: center;
    margin: 0 0 10px 0;
  }
}
</style>
