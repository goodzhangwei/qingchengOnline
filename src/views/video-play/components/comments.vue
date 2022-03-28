<template>
  <div id="comments">
    <a-textarea
      v-model="comment"
      allow-clear
      placeholder="发一条友善的评论"
      :rows="3"
    />
    <div class="commit-button">
      <a-button type="primary" icon="edit" :disabled="submit" @click="emitComment"> 发布 </a-button>
    </div>
    <a-list
      class="comment-list"
      :header="`${allComments.length} 评论`"
      item-layout="horizontal"
      :data-source="allComments"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment :author="item.author.nickName">
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <p slot="content">
            {{ item.content }}
          </p>
          <a-tooltip slot="datetime">
            <span>{{ item.createTime }}</span>
          </a-tooltip>
          <span class="visible" key="comment-basic-reply-to" @click="showVisible(item)">查看回复</span>
        </a-comment>
      </a-list-item>
    </a-list>
    <a-modal v-model="visible" title="查看对话" :footer="null" @cancel="closeModal">
      <a-comment>
        <div v-if="replyFlag">
          <div class="cancelReply" @click="cancelReview">取消回复</div>
          <a-textarea
            v-model="comment"
            allow-clear
            placeholder="发一条友善的评论"
            :rows="3"
          />
          <div class="commit-button">
            <a-button type="primary" icon="edit" :disabled="submit" @click="replyComment"> 回复 </a-button>
          </div>
        </div>
        <template slot="actions" v-else>
          <span key="comment-basic-reply-to" @click="reView">回复</span>
        </template>
        <a slot="author">{{info.author.nickName}}</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <p slot="content">{{info.content}}</p>
        <a-tooltip slot="datetime">
          <span>{{ info.createTime }}</span>
        </a-tooltip>
      </a-comment>
      <div class="lookComment">
        <span class="look" @click="lookAllComments">查看</span>
      </div>
      <a-list
        class="comment-list"
        :header="`${replayOtherComments.length} 评论`"
        item-layout="horizontal"
        :data-source="replayOtherComments"
      >
        <a-list-item slot="renderItem" slot-scope="item" v-if="commentOtherFlag">
          <a-comment :author="item.author.nickName">
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <p slot="content">
              {{ item.content }}
            </p>
            <a-tooltip slot="datetime">
              <span>{{ item.createTime }}</span>
            </a-tooltip>
            <!-- <span class="visible" key="comment-basic-reply-to" @click="showVisible(item)">查看回复</span> -->
          </a-comment>
        </a-list-item>
      </a-list>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import { getAllComments,addComment,getReply } from "../../../api/course"

export default {
  name: "comments",
  props: ["courseId"],
  data() {
    return {
      comment: "",
      moment,
      allComments:[],
      replayOtherComments:[],
      visible:false,
      info:{
        author:{
          nickName:''
        },
        content:'',
        createTime:'',
        id:null
      },
      replyFlag:false,
      commentOtherFlag:false
    };
  },
  computed: {
    submit() {
      return !this.comment.length > 0;
    },
  },
  mounted() {
    // 获取该课程的所有评论
    this.getComments()
  },
  methods:{
    // 获取该课程的所有评论
    getComments() {
      console.log(this.$store.state.userInfo)
      getAllComments({
        course:{
          courseId:this.courseId
        }
      }).then(res=>{
        this.allComments = res.rows
        console.log('id',this.allComments)
      })
    },
    // 查看评论回复
    getAllReply() {
      getReply({
        id:this.info.id
      }).then(res=>{
        this.replayOtherComments=res.rows
        console.log('他人回复',res)
      })
    },
    // 打开查看对话弹框
    showVisible(info) {
      this.visible = true
      this.info = info
      // 查看评论回复
      this.getAllReply()
      console.log('info',this.info)
    },
    // 发布评论
    emitComment() {
      addComment({
        rootComment:1,
        content:this.comment,
        course:{
          courseId:this.courseId,
        },
        createBy:this.$store.state.userInfo.userId
      }).then(res=>{
        if(res.code == 200) {
          this.$message.success('发布成功！');
        } else {
          this.$message.error('发布失败！');
        }
        this.comment = ''
        // 刷新评论列表
        this.getComments()
      })
    },
    // 关闭Modal触发
    closeModal() {
      this.commentOtherFlag = false
    },
    // 回复
    reView() {
      this.replyFlag = true
    },
    // 取消回复
    cancelReview() {
      this.replyFlag=false
    },
    // 回复他人评论
    replyComment() {
      // 添加回复
      addComment({
        rootComment:2,
        content:this.comment,
        course:{
          courseId:this.courseId,
        },
        id:this.info.id,
        replayToAuthorId:this.$store.state.userInfo.userId,
        createBy:this.$store.state.userInfo.userId
      }).then(res=>{
        console.log('评论',res)
        if(res.code == 200) {
          this.$message.success('回复成功！');
          // 刷新评论
          this.getAllReply(),
          this.replyFlag=false
        } else {
          this.$message.error('回复失败！');
        }
        this.comment = ''
      })
    },
    lookAllComments() {
      this.commentOtherFlag = !this.commentOtherFlag
    }
  }
};
</script>

<style scoped>
.commit-button {
  margin-top: 5px;
  text-align: right;
}
.visible {
  cursor: pointer;
  font-size: 12px;
}
.visible:hover {
  color: #1890ff;
}
.cancelReply {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 15px;
}
.cancelReply:hover {
  color: #1890ff;
}
.lookComment {
  position: relative;
  color: rgba(0, 0, 0, 0.55);
}
.look {
  position: absolute;
  z-index: 1000;
  left: 60px;
  top: 12px;
  font-size: 14px;
  cursor: pointer;
}
.look:hover {
  color: #1890ff;
}
@media screen and (max-width: 480px) {
  #comments {
    padding: 0 5px;
  }
}
</style>
