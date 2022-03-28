<template>
  <div class="content">
    <div class="left_content">
      <el-card>
        <div class="left_head">
          <span>单选题</span>
          <span>总1题/共4分</span>
        </div>
        <div class="left_body">1</div>
      </el-card>
    </div>
    <div class="center_content">
      <el-card >
        <div class="center_head">单选题 (本题分值:5分)</div>
        <div class="center_center" >
          1.经过破译敌人密码，已经知道了“香蕉苹果大鸭梨”的意思是“星期三秘密进攻”；“苹果甘蔗水蜜桃”的意思是”执行秘密计划”；“广柑香蕉西红柿”的意识是“星期三的胜利属于我们”;那么，“大鸭梨”的意思是：
        </div>
        <div 
          v-for="(item,index) in answerList" 
          :key="index" 
          class="center_answer"
          :class="{answer_active:isActive == index}"
          @click="selectClick(index)"
          >{{item.name}}</div>
      </el-card>
    </div>
    <div class="right_content">
      <el-card >
        <div class="right_time">
          <div>剩余时间</div>
          <div>{{minute}}分钟{{second}}秒</div>
        </div>
        <div class="right_submit">
          <el-button type="warning" @click="submit">提交试卷</el-button>
        </div>
        <div class="right_operation">
          <div>
            <el-button icon="el-icon-back">上一题</el-button>
          </div>
          <div>
            <el-button type="primary">下一题<i class="el-icon-right el-icon--right"></i></el-button>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="dialog_warning"><i class="el-icon-warning"></i>此操作将提交该试卷，是否继续!</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "examing",
  data() {
    return {
      timeDate:0,
      minute:0,
      second:0,
      isActive:9,
      dialogVisible:false,
      answerList:[
        {
          index:0,
          name:'A 秘密'
        },
        {
          index:1,
          name:'B 星期三'
        },
        {
          index:2,
          name:'C 进攻'
        },
        {
          index:3,
          name:'D 执行'
        },
        {
          index:4,
          name:'E 计划'
        }
      ]
    }
  },
  computed: {
    examId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    // 获取当前时间
    this.getNowTime()
  },
  methods:{
    getNowTime() {
      var time = +new Date()
      this.timeDate = time + 1800000
      var Time = 1800000 / 1000
      var m = parseInt(Time / 60 % 60)
      this.minute = m<10?'0' + m : m
      var s = parseInt(Time % 60)
      this.second = s<10 ? '0' + s:s
      this.setTime()
    },
    setTime() {
      var timer = setInterval(()=>{
        var nowTime = +new Date()
        var times = (this.timeDate - nowTime) / 1000
        if (times == 0) {
          // 清除定时器
          clearInterval(timer)
        }
        var m = parseInt(times / 60 % 60)
        this.minute = m<10?'0' + m : m
        var s = parseInt(times % 60)
        this.second = s<10 ? '0' + s:s
      },1000)
    },
    // 答案被选择事件
    selectClick(id) {
      this.isActive = id
    },
    // 提交试卷
    submit() {
      this.dialogVisible = true
    },
    submitEnter() {
      this.dialogVisible = false
      this.$message.success('提交成功！')
      this.$router.push(`/examination-detail/${this.examId}`);
    }
  }
};
</script>
<style scoped>
.content {
  width: 100%;
  display: flex;
  margin: 30px 0;
}
.left_content {
  flex: 1;
}
.left_content .el-card {
  height: 100%;
}
.left_content .left_head {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
}
.left_content .left_body {
  border-radius: 10px;
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1890ff;
  font-weight: 700;
  margin-top: 15px;
}
.center_head {
  background-color: #ccc;
  padding: 5px;
  font-weight: 700;
}
.center_center {
  margin-top: 20px;
  margin-bottom: 20px;

}
.center_content {
  flex: 3;
  margin: 0 10px;
}
.center_content .el-card {
  height: 100%;
}
.center_answer {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}
.center_answer:hover {
  border:1px solid #1890ff;
}
.answer_active {
  color: #fff;
  background-color: #1890ff;
}
.right_content {
  flex: 1;
}
.right_content .el-card {
  height: 100%;
}
.right_time div:nth-child(2) {
  margin-top: 10px;
  color: rgb(255, 0, 0);
  font-weight: 700;
}
.el-card {
  background-color: #f0f6fc;
}
.right_time {
  text-align: center;
  font-size: 15px;
  font-weight: 700;
}
.right_submit {
  padding: 25px 0;
  margin: 30px 0;
  text-align: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.right_operation {
  text-align: center;
}
.right_operation div:nth-child(1) {
  margin-bottom: 20px;
}
.dialog_warning {
  text-align: center;
  font-size: 17px;
  font-weight: 700;
}
.el-icon-warning {
  color: red;
  font-size: 20px;

}
</style>
