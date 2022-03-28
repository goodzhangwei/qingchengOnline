<template>
  <div id="video-footer">
    <div class="content">
      <ul>
        <li>青程在线&nbsp;·&nbsp;智慧编程&nbsp;青程倾心</li>
        <li>
          中科智禾人工智能科创教育研究中心&nbsp;|&nbsp;中科智禾数字科技（北京）有限公司&nbsp;|&nbsp;京ICP备2020043184号-1
        </li>
        <li>Copyright &copy; 2022 All Right Reserved</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoFooter",
};
</script>

<style scoped>
.content {
  padding: 20px 0;
  width: 1140px;
  margin: auto;
  font-size: 12px;
}

.content ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

@media screen and (max-width: 480px) {
  .content {
    width: 100%;
    padding: 10px 0;
  }
}
</style>
