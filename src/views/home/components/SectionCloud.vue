<template>
  <div class="section-one">
    <div class="section-one-left">
      <ul class="section-one-list">
        <li class="title-first">
          <span @click="gotoCloud">资源云管理平台</span>
        </li>
        <li class="title-subtitle">
          媒资课件管理&nbsp;权限配置&nbsp;多维度分析辅助教师上课
        </li>
      </ul>
      <div class="section-one-row">
        <img src="../../../assets/homepage/check.png" />
        <div>
          <div class="subtitle-first-title">课件·云管理</div>
          <div>满足对PDF、word、PPT、视频等多种类型课件的管理</div>
          <div>提供按照课程关键词、课程时间、课程分类的上传存储</div>
        </div>
      </div>
      <div class="section-one-row">
        <img src="../../../assets/homepage/check.png" />
        <div>
          <div class="subtitle-first-title">用户权限灵活配置</div>
          <div>灵活配置不同角色权限功能</div>
          <div>针对课件资源申请配置不同管理权限，满足方便管理需求</div>
        </div>
      </div>
      <div class="section-one-row">
        <img src="../../../assets/homepage/check.png" />
        <div>
          <div class="subtitle-first-title">辅助教学及异常判断</div>
          <div>按一定的周期给出授权及老师课件应用记录</div>
          <div>进行多角度分析及所需的预测</div>
        </div>
      </div>
    </div>
    <div class="section-one-right">
      <img
        class="section-one-image"
        src="../../../assets/homepage/section1.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { CLOUD_SOURCE } from "../../../api/address";

export default {
  name: "SectionCloud",
  methods: {
    gotoCloud() {
      window.open(CLOUD_SOURCE, "_blank");
    },
  },
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
  .section-one-right {
    display: none;
  }
}
</style>
