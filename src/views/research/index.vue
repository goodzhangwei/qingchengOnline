<template>
  <div class="container">
    <!-- <building /> -->
    <div class="bg_img">
      <div class="bg-img-da">
      </div>
      <h3 >科技研学系列</h3 >
      <div class="line"></div>
    </div>
    <div class="text_shi">
      <div class="word_text">
        <span>研学简介</span>
      </div>
      <div class="line-text"></div>
      <div class="text_ss">
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过整合中科院相关实验室及重点大学的科技资源，为学生提供深度的科技研学、高级科技项目实践、学术论文的科技研究探索机会。
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结合学生的科技实践方向，推荐到中科院或大学相关合作实验室，开展为期2-4周的科技前沿实践研学活动。线下研学后，还将通过平台定期对学生进行指导，促进其形成科技特长成果。
        </p>
      </div>
    </div>
    <div class="text_shi">
      <div class="word_text">
        <span>一、研学内容与成果</span>
      </div>
      <div class="line-text"></div>
      <div class="text_ss">
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.进阶的实践项目：按照学生科技兴趣方向与基础，设定好高阶的实践项目，在实验室的导师指导下，完成既定的任务，形成对项目的整体实践与掌握。
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.科技写作与解决问题能力培养：针对有写作兴趣与能力的同学，在导师指导下，完成对某一实践课题的调研、分析、验证等环节，抓住主题基础上开展科技论文写作，形成在相应期刊的发表。
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.高中生考察探究活动：在提升学生编程实践能力同时，助力高中学生为参加大学综合评价形成高质量的研究性学习及研学旅行成果，结合科技前沿实践完成考察探究活动。
        </p>
      </div>
    </div>
    <div class="text_shi">
      <div class="word_text">
        <span>二、时间安排与成果</span>
      </div>
      <div class="line-text"></div>
      <div class="text_ss">
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;线下活动根据情况安排在暑假、寒假或周末时间，后续线上提供持续指导学习。学习成果将以专家项目鉴定、专家评价意见、专家推荐项目、学术论文等呈现。
        </p>
        <el-row :gutter="20" class="rowstyle">
          <el-col :span="12">
            <img src="../../assets/research/studyimg1.png" class="studyimg">
          </el-col>
          <el-col :span="12">
            <img src="../../assets/research/studyimg2.png" class="studyimg">
          </el-col>
        </el-row>
        <el-row :gutter="20" class="rowstyle">
          <el-col :span="12">
            <img src="../../assets/research/studyimg3.png" class="studyimg">
          </el-col>
          <el-col :span="12">
            <img src="../../assets/research/studyimg4.png" class="studyimg">
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="text_shi">
      <div class="word_text">
        <span>三、编程大赛</span>
      </div>
      <div class="line-text"></div>
      <div class="text_ss">
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据情况组织参加如中科院ACME大赛、信息奥赛等活动，检验学生科技实践成果与收获。
        </p>
        <el-row :gutter="20" class="rowstyle">
          <el-col :span="12">
            <img src="../../assets/research/studyimg5.png" class="img1">
          </el-col>
          <el-col :span="12">
            <img src="../../assets/research/studyimg6.png" class="img2">
            <img src="../../assets/research/studyimg7.png" class="img3">
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="text_shi">
      <div class="word_text">
        <span>合作模式</span>
      </div>
      <div class="line-text"></div>
      <div class="text_ss">
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为学生提供针对性和定制化的Python课程系列、研学服务、科技大赛辅导等，致力于为学校和老师提供高质量的科技资源。欢迎与相关方开展多层次合作。
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系方式：
        </p>
        <div class="img4">
          <img src="../../assets/research/studyimg8.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Building from "../components/building";

export default {
  name: "index",
  // components: { Building },
};
</script>

<style scoped>
.container {
  width: 100%;
}
.bg_img {
  position: relative;
  width: 100%;
  height: 400px;
  background-image: url("../../assets/research/yanxue.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.bg-img-da {
  height: 400px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 1140px;
}
.bg_img h3{
  position: absolute;
  top: 100px;
  left: 37%;
  font-size:46px;
  font-family:MicrosoftYaHei;
  color: #16bcb4;
}
.bg_img .line{
  position: absolute;
  top: 190px;
  left: 34%;
  width: 30%;
  height:2px;
  background-image: linear-gradient( 135deg, #C2FFD8 10%, #465EFB 100%);
}
.text_shi {
  margin-top: 30px;
  padding-top: 30px;
}
.word_text {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.line-text {
  width:70%;
  margin: 20px auto;
  background-color: rgba(0, 0, 0, 0.2);
  height: 1px;
}
.text_ss {
  width: 70%;
  margin: 25px auto;
}
.text_ss p {
  margin-top: 10px;
  font-size: 17px;
  line-height: 28px;
}
.studyimg {
  width: 400px;
  border-radius: 20px;
}
.rowstyle {
  margin-top: 12px;
  text-align: center;
}
.img1 {
  width: 400px;
  border-radius: 20px;
}
.img2 {
  width: 400px;
  height: 262px;
  margin-bottom: 10px;
  border-radius: 20px;
}
.img3 {
  width: 400px;
  height: 262px;
  border-radius: 20px;
}
.img4 {
  text-align: center;
}
   
</style>
