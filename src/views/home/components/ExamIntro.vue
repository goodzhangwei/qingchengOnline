<template>
  <div class="section-one">
    <div class="section-one-right">
      <img
        class="section-one-image"
        src="../../../assets/homepage/img10.png"
        alt=""
      />
    </div>
    <div class="section-one-left">
      <ul class="section-one-list">
        <li class="title-first">
          <span @click="() => this.$router.push('/examination')"
            >等级考试平台</span
          >
        </li>
        <li class="title-subtitle">海量题库&nbsp;自由组卷&nbsp;在线考试</li>
      </ul>
      <div class="section-one-row">
        <img src="../../../assets/homepage/列表项2.png" />
        <div>
          <div>海量题库，自由选择试题组卷</div>
          <div>多种个性化考试设置，满足不同要求</div>
        </div>
      </div>
      <div class="section-one-row">
        <img src="../../../assets/homepage/列表项2.png" />
        <div>
          <div>告别纸笔考试时代，厚重的纸质试卷byebye</div>
          <div>应试考生在线监控，监拍画面随时查看</div>
        </div>
      </div>
      <div class="section-one-row">
        <img src="../../../assets/homepage/列表项2.png" />
        <div>
          <div>青程在线编程编译系统，在线调试，机器自动判题</div>
          <div>多题型支持：选择、填空、问答、编程</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExamIntro",
};
</script>

<style scoped>
.section-one {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.section-one-left {
  flex: 1;
  padding-left: 20px;
}

.section-one-right {
  flex: 1;
}

.section-one-list {
  list-style: none;
  padding: 30px 0;
  margin: 0;
}

.section-one-image {
  height: 360px;
  width: 100%;
  object-fit: contain;
}

.title-first {
  margin: 12px 0;
  font-size: 24px;
  font-weight: bold;
}

.title-first:hover {
  cursor: pointer;
  color: #1890ff;
}

.section-one-row {
  display: flex;
  margin-bottom: 20px;
}

.section-one-row img {
  height: 36px;
  width: 36px;
  margin-right: 20px;
}

.subtitle-first-title {
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
}

@media screen and (max-width: 480px) {
  .section-one {
    display: block;
  }

  .section-one-image {
    height: 200px;
  }
}
</style>
