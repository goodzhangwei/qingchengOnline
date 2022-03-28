<template>
  <div class="home-page">
    <home-carousel />
    <recommend />
    <exam-intro />
    <section-cloud />
  </div>
</template>

<script>
import HomeCarousel from "./components/HomeCarousel";
import SectionCloud from "./components/SectionCloud";
import Recommend from "./components/Recommend";
import ExamIntro from "./components/ExamIntro";

export default {
  name: "index",
  components: { ExamIntro, Recommend, SectionCloud, HomeCarousel },
};
</script>

<style scoped>
.home-page {
  margin: 20px 0;
}
</style>
