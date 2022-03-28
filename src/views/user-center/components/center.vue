<template>
  <div>
    <h2>个人资料</h2>
    <ul class="info-list">
      <li>
        <a-avatar
          :size="75"
          style="color: #409eff; background-color: rgb(217, 236, 255)"
        >
          <span style="font-size: 30px">{{
            userInfo["nickName"].charAt(0)
          }}</span>
        </a-avatar>
      </li>
      <li>
        <a-row>
          <a-col :span="8">用户名：</a-col>
          <a-col :span="16">{{ userInfo["userName"] }}</a-col>
        </a-row>
      </li>
      <li>
        <a-row>
          <a-col :span="8">昵称：</a-col>
          <a-col :span="16"> {{ userInfo["nickName"] }}</a-col>
        </a-row>
      </li>
      <li>
        <a-row>
          <a-col :span="8">手机号：</a-col>
          <a-col :span="16"> {{ userInfo["phonenumber"] }}</a-col>
        </a-row>
      </li>
      <li>
        <a-row>
          <a-col :span="8">所属机构名称：</a-col>
          <a-col :span="16">
            {{
              userInfo["dept"] ? userInfo["dept"]["deptName"] : "暂无机构"
            }}</a-col
          >
        </a-row>
      </li>
      <li>
        <a-row>
          <a-col :span="8">学校名称：</a-col>
          <a-col :span="16"> {{ userInfo["schoolName"] }}</a-col>
        </a-row>
      </li>
      <li>
        <a-row>
          <a-col :span="8">班级名称：</a-col>
          <a-col :span="16"> {{ userInfo["className"] }}</a-col>
        </a-row>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "center",
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
};
</script>

<style scoped>
.info-list {
  list-style: none;
}

.info-list li {
  margin: 20px 0;
}
</style>
