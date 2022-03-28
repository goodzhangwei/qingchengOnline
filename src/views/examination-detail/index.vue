<template>
  <div class="content">
    <h3>考试信息</h3>
    <div class="examTable">
      <div class="exam">
        <div>考试名称</div>
        <div>{{tableData.examName}}</div>
      </div>
      <div class="exam">
        <div>考试总分</div>
        <div>{{tableData.zongfen}}</div>
      </div>
      <div class="exam">
        <div>及格分数</div>
        <div>{{tableData.jige}}</div>
      </div>
      <div class="exam">
        <div>考试时长</div>
        <div>{{tableData.examTime}}</div>
      </div>
      <div class="exam">
        <div>考试类型</div>
        <div>正在考试</div>
      </div>
      <div class="exam">
        <div>注意事项</div>
        <div class="examWarning">个人晋升机会,好好把握</div>
      </div>
    </div>
    <div class="examButton">
      <el-button @click="goBack">返回</el-button>
      <el-button type="primary" @click="goExaming">开始考试</el-button>
    </div>
  </div>
</template>

<script>
import { getExamInfo } from '../../api/examination'
export default {
  name: "examination-detail",
  data() {
    return {
      tableData: {
        id: 1,
        paperId: 102,
        startTime: '2022-01-18T14:39:10.000+0800',
        endTime: '2022-01-18T16:09:33.000+0800',
        examTime:90,
        examFlag:0,
        preContext:'测试',
        examName:'摸底考试',
        examType:2,
        examPassword:'123456',
        backContext:'测试',
        isCamera:1,
        cutScreen:0,
        noAction:0,
        examResultInfo:0,
        isReview:0,
        examPolicy:1,
        lateTime:'30',
        submissionTime:'30',
        zongfen:100,
        jige:60
        }
    }
  },
  computed: {
    examId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    // 根据Id获取考试详情
    this.getExam()
  },
  methods:{
    // 根据Id获取考试详情
    getExam(){
      // var id = parseInt(this.examId)
      // console.log(typeof(id))
      // getExamInfo({
      //   id:id
      // }).then(res=>{
      //   console.log('adf',res)
      // })
    },
    // 返回上一级
    goBack() {
      this.$router.push('/examination')
    },
    // 前往考试页面
    goExaming() {
      this.$router.push(`/examing/${this.examId}`);
    }
  }
};
</script>
<style scoped>
.content {
  font-size: 17px;
  background:#f0f6fc;
  width: 100%;
  padding: 20px;
  margin: 30px;
}
.exam {
  display: flex;
  padding: 10px;
}
.exam div:nth-child(1) {
  color: #909399;
  margin-right: 30px;
}
.exam div:nth-child(2) {
}

.examWarning {
  color: rgb(255, 51, 51);;
}
.examButton {
  margin-top: 20px;
  margin-left: 7px;
}
</style>
