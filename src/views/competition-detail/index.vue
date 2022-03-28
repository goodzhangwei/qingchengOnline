<template>
  <div>
    <a-page-header @back="() => this.$router.push('/competition')">
      <span slot="title" style="font-weight: normal">比赛服务</span>
    </a-page-header>
    <div class="box-top">
      <div class="top-box">
        <div></div>
        <div>状态</div>
        <div>举办方</div>
        <div>截止日期</div>
        <div>参赛队伍</div>
      </div>
      <div class="bottom-box">
        <div>{{ competInfo.competitiomName }}</div>
        <div>
          <span>{{ competInfo.status }}</span>
        </div>
        <div>{{ competInfo.organizers }}</div>
        <div>{{ competInfo.endTime.substring(0, 10) }}</div>
        <div>参赛队伍</div>
      </div>
      <div class="left-box" :class="{ isShow: apllyShow }" @click="applyBox()">
        <i class="el-icon-edit-outline"></i>
        <h2 v-if="apllyShow">已报名</h2>
        <h2 v-else>报名参赛</h2>
      </div>
    </div>
    <div class="box-content">
      <el-card>
        <el-tabs :tab-position="tabPosition" @tab-click="tabClick">
          <el-tab-pane label="赛制">赛制</el-tab-pane>
          <el-tab-pane label="提交结果" v-if="apllyShow">
            <div>
              <el-form :model="addForm" :rules="addRules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
                <el-form-item label="作品名称" prop="workName">
                  <el-input v-model="addForm.workName" placeholder="请输入作品名称" style="width:217px"></el-input>
                </el-form-item>
                <el-form-item label="上传作品">
                  <el-upload
                    action="http://upload.qiniup.com/"
                    :data="{token:this.qiniuToken}"
                    multiple
                    :on-success="handleAvatorsuccess"
                    ref="addUpload"
                    drag
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">请提交zip文件</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="提交信息">
                  <el-button type="success" size="medium" @click="submitWorkInfo">提交信息</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的成绩" v-if="apllyShow">
            <el-row v-if="tuxingShow">
              <div class="pingshen">
                <span>评审标准</span>
                <span v-text = "(resultForm.evaluateType === 1) ? '图形化编程项目' : '智能设计项目'"></span>
              </div>
              <el-divider class="divide"></el-divider>
              <el-form :model="resultForm" ref="resultRef" label-width="15px" class="demo-ruleForm">
                <el-form-item>
                  <span class="review">创新创造(0-25分)</span>
                  <el-input-number size="medium" controls-position="right" v-model="resultForm.scoreOne" :min="0" :max="25" label="描述文字" :disabled="true"></el-input-number>
                </el-form-item>
                <el-form-item>
                  <span class="review">用户体验(0-20分)</span>
                  <el-input-number size="medium" controls-position="right" v-model="resultForm.scoreTwo" :min="0" :max="20" label="描述文字" :disabled="true"></el-input-number>
                </el-form-item>
                <el-form-item >
                  <span class="review">艺术审美(0-20分)</span>
                  <el-input-number size="medium" controls-position="right" v-model="resultForm.scoreThree" :min="0" :max="20" label="描述文字" :disabled="true"></el-input-number>
                </el-form-item>
                <el-form-item>
                  <span class="review">程序设计(0-35分)</span>
                  <el-input-number size="medium" controls-position="right" v-model="resultForm.scoreFour" :min="0" :max="35" label="描述文字" :disabled="true"></el-input-number>
                </el-form-item>
                <el-divider class="divide"></el-divider>
                <div>
                  <span class="total">总分：<span>{{total}}</span></span>
                </div>
              </el-form>
            </el-row>
            <el-row v-if="zhinengShow">
              <div class="pingshen">
                <span>评审标准</span>
                <span v-text = "(resultForm.evaluateType === 1) ? '图形化编程项目' : '智能设计项目'"></span>
              </div>
              <el-divider class="divide"></el-divider>
              <el-form :model="resultForm" ref="resultRef" label-width="15px" class="demo-ruleForm">
                <el-form-item prop="scoreOne">
                  <span class="review1"> 科学性(0-25分)</span>
                  <el-input-number size="medium" controls-position="right" v-model="resultForm.scoreOne" :min="0" :max="25" label="描述文字" :disabled="true"></el-input-number>
                </el-form-item>
                <el-form-item  prop="scoreTwo">
                  <span class="review1"> 创新性(0-25分)</span>
                  <el-input-number size="medium" controls-position="right" v-model="resultForm.scoreTwo" :min="0" :max="25" label="描述文字" :disabled="true"></el-input-number>
                </el-form-item>
                <el-form-item  prop="scoreThree">
                  <span class="review1"> 艺术性(0-25分)</span>
                  <el-input-number size="medium" controls-position="right" v-model="resultForm.scoreThree" :min="0" :max="25" label="描述文字" :disabled="true"></el-input-number>
                </el-form-item>
                <el-form-item  prop="scoreFour">
                  <span class="review1"> 实用性(0-30分)</span>
                  <el-input-number size="medium" controls-position="right" v-model="resultForm.scoreFour" :min="0" :max="30" label="描述文字" :disabled="true"></el-input-number>
                </el-form-item>
                <el-divider class="divide"></el-divider>
                <div>
                  <span class="total">总分：<span>{{total}}</span></span>
                </div>
              </el-form>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="我的团队" v-if="apllyShow">
            <div v-loading="teamTabLoad" element-loading-background="rgba(255,255,255,0.95)">
              <!-- 我组织的团队 -->
              <div v-if="userStatus === '2'">
                <div class="team-top">
                  <h1 class="team-top-h1">
                    <span>我组织的团队：</span>
                    <span v-if="modifyNameFlag">{{teamName}}</span>
                    <div v-else>
                      <el-input v-model = "modifyName" style="width:150px;"></el-input>
                      <el-button type="primary" size="mini" style="margin-left:10px" @click="enterModify">确认</el-button>
                    </div>
                  </h1>
                  <div v-if="captainFlag">
                    <el-button v-if="modifyNameFlag" class="team-top-btn1" type="success" size="mini" @click="modifyTeam">编辑</el-button>
                    <el-button v-else class="team-top-btn1" type="warning" size="mini" @click="cancelModify">取消</el-button>
                    <el-button class="team-top-btn2" type="danger" size="mini" @click="deleteTeam">删除</el-button>
                  </div>
                </div>
                <div style="color:#006dbb">大赛进行中</div>
                <div class="team-table">
                  <el-tabs type="border-card" @tab-click="captainTabsClick">
                    <el-tab-pane label="已加入">
                      <el-table
                        :data="teamMembers"
                        stripe
                        border
                        style="width: 100%">
                        <el-table-column
                          label="团队成员"
                          >
                          <template slot-scope="scope">
                            <span>{{scope.row.nickName}}{{scope.row.creater === scope.row.teamMember ?'（队长）':''}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="phone"
                          label="手机号"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="school"
                          label="学校"
                          >
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <!-- v-if="captainFlag" -->
                    <el-tab-pane label="未加入" v-if="captainFlag">
                      <el-table
                        v-loading="teamWeiLoad"
                        element-loading-background="rgba(255,255,255,0.95)"
                        :data="teamMembersThree"
                        stripe
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="nickName"
                          label="成员"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="phone"
                          label="手机号"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="school"
                          label="学校"
                          >
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          >
                          <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-circle-check" size="mini" @click="agree(scope.row)">同意</el-button>
                            <el-button type="text" icon="el-icon-circle-close" size="mini" @click="refuse(scope.row)">拒绝</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
              <!-- 我申请的团队 -->
              <div v-if="userStatus === '1'">
                <h2>正在申请的团队：{{applyingTeamName}}</h2>
                <div style="display:flex;line-height:30px;margin-bottom:20px">
                  <div>申请状态：</div>
                  <el-tag type="warning" style="margin-right:15px">待审批</el-tag>
                  <el-button type="danger" size="mini" @click="undoApply">撤销</el-button>
                </div>
              </div>
              <!-- 创建团队 -->
              <div>
                <el-tabs type="border-card" v-model="activeName" @tab-click="tabsClick">
                  <el-tab-pane label="组织一个队伍" name="first">
                    <el-row v-if="teamShow">
                      <span>我的团队:</span>
                      <span>{{teamName}}</span>
                    </el-row>
                    <el-row :gutter="20" v-else>
                      <el-col :span="4" class="leftword"><span>您还没有组织任何团队</span></el-col>
                      <el-col :span="8">
                        <el-form
                          :model="applyTeamForm"
                          :rules="applyTeamRules"
                          ref="applyTeamRef"
                        >
                          <el-form-item  prop="teamName">
                            <el-input placeholder="请输入队伍名字" style="width:300px" v-model="applyTeamForm.teamName"></el-input>
                          </el-form-item>
                        </el-form>
                        <!-- <el-input placeholder="请输入队伍名字" style="width:300px" v-model="teamName"></el-input> -->
                      </el-col>
                      <el-col :span="12">
                        <el-button type="primary" @click="createTeam">组织一个队伍</el-button>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane label="加入一个队伍" name="second">
                    <el-row :gutter="20">
                      <el-col :span="4" class="leftword"><span>您可通过申请加入团队</span></el-col>
                      <el-col :span="8">
                        <el-input placeholder="请输入队伍名字" style="width:300px" v-model="searchName"></el-input>
                      </el-col>
                      <el-col :span="12">
                        <el-button type="primary" @click="searchTeam">搜索</el-button>
                      </el-col>
                    </el-row>
                    <div>
                      <!-- <div>
                        <span>已申请的队伍：{{}}</span>
                        <span>审批状态：{{}}</span>
                      </div> -->
                      <el-divider></el-divider>
                      <el-table
                        :data="teamDataList"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="teamName"
                          label="团队名称"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          align="center">
                          <template slot-scope="scope">
                            <el-button type="warning" @click="applybtn(scope.row)" size="mini">申请</el-button>
                          </template>
                        </el-table-column>
                      </el-table>

                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog
      title="参赛信息表"
      :visible.sync="applyBoxFlag"
      width="600px"
      @close="applyClose"
    >
      <el-form
        :model="applyForm"
        :rules="applyRules"
        ref="applyRef"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="nickName">
              <el-input
                v-model="applyForm.nickName"
                placeholder="请输入用户姓名"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input
                v-model="applyForm.phone"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学校" prop="school">
              <el-input
                v-model="applyForm.school"
                placeholder="请输入学校名称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="指导老师" prop="teacher">
              <el-input
                v-model="applyForm.teacher"
                placeholder="请输入指导老师"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="省份" prop="province">
              <el-input
                v-model="applyForm.province"
                placeholder="请输入省份"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市" prop="city">
              <el-input
                v-model="applyForm.city"
                placeholder="请输入城市"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addComInfo()">确 定</el-button>
        <el-button @click="applyBoxFlag = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getCompInfoById,
  addComInfo,
  getCompetUserById,
  addComTeam,
  getTeamInfo,
  getMembersInfo,
  delTeam,
  modifyComTeam,
  applyTeam,
  agreeApply,
  refuseApply,
  submitWork,
  getCommitted
} from "../../api/competition";
import { getToken } from "../../utils/auth";

export default {
  data() {
    return {
      competInfo: {},
      tabPosition: "left",
      applyBoxFlag: false,
      apllyShow: false,
      activeName: "first",
      applyForm: {
        nickName: "",
        phone: "",
        province: "",
        city: "",
        competitionId: 0,
        teacher: "",
        school: "",
        userId: 0,
      },
      applyRules: {
        nickName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "用户名称长度必须介于 2 和 20 之间",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
      applyTeamRules:{
        teamName: [{ required: true, message: "队伍名称不能为空", trigger: "blur" }],
      },
      applyTeamForm:{
        teamName:''
      },
      teamTabLoad:true,
      teamName:'',
      teamMembers:[],
      teamMembersThree:[],
      teamShow:false,
      tuxingShow:false,
      zhinengShow:false,
      teamId:'',
      modifyName:'',
      modifyNameFlag:true,
      searchName:'',
      teamDataList:[],
      applyedData:{},
      captainFlag:false,
      teamWeiLoad:false,
      applyTeamFlag:false,
      applyingData:{},
      applyingTeamName:'',
      // 0是无组，1是有组织，待审批，2是有组织，已同意
      userStatus:'',
      // 有组织，未审批时的申请id,即撤销时使用的id
      undo:0,
      qiniuToken:'',
      resultForm:{},
      addForm:{
        competitionId:'',
        submitUser:'',
        workName:'',
        works:''
      },
      addRules:{
        workName: [
          { required: true, message: '请输入作品名称', trigger: 'blur' },
        ],
      }
    };
  },
  computed: {
    competId() {
      return this.$route.params.id;
    },
    userId() {
      return this.$store.state.userInfo.userId;
    },
    nowTime() {
      var data = new Date()
      return data.toLocaleString()
    },
    total() {
      return parseInt(this.resultForm.scoreOne) + parseInt(this.resultForm.scoreTwo) + parseInt(this.resultForm.scoreThree) + parseInt(this.resultForm.scoreFour)
    }
  },
  created() {},
  mounted() {
    // 获取比赛详细信息
    this.getComDetail();
    // 查询是否已经报名
    this.getApplayed();
  },
  methods: {
    // 获取比赛详细信息
    getComDetail() {
      // 根据Id获取比赛详细信息
      getCompInfoById(this.competId).then((res) => {
        this.competInfo = res.data;
        console.log(res);
      });
    },
    // 报名信息表
    applyBox() {
      if (this.apllyShow === false) {
        this.applyBoxFlag = true;
      } else {
        return this.$message.warning("您已提交报名信息，请勿重复操作！");
      }
    },
    // 提交报名信息
    addComInfo() {
      this.applyForm.userId = this.userId;
      this.applyForm.competitionId = parseInt(this.$route.params.id);
      this.$refs.applyRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项！");
        }
        console.log(this.applyForm);
        this.$confirm("此操作将提交参赛信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          addComInfo(this.applyForm).then((res) => {
            if (res.code !== 200) return this.$message.error("信息提交失败！");
            this.$message.success("信息提交成功!");
            this.applyBoxFlag = false;
            this.apllyShow = true;
          });
        });
      });
    },
    // 报名信息表关闭
    applyClose() {
      // 带有prop属性的表单清空
      this.$refs.applyRef.resetFields();
    },
    // 报名信息是否已存在
    getApplayed() {
      getCompetUserById({
        competitionId: this.competId,
        userId: this.userId,
      }).then((res) => {
        if (res.total === 0) {
          this.apllyShow = false;
        } else {
          this.apllyShow = true;
        }
        console.log("查询报名信息", res);
      });
    },
    // 组织一个队伍
    createTeam() {
      if(this.userStatus === "0") {
        this.$refs.applyTeamRef.validate((valid) => {
          if (!valid) {
            return this.$message.warning("请输入队伍名称！");
          }
          this.$confirm("此操作将创建该队伍, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            // 创建比赛队伍
            addComTeam({
              competitionId:this.competId,
              creater:this.userId,
              teamName:this.applyTeamForm.teamName
            }).then(res=>{
              if (res.code !== 200) return this.$message.error("队伍创建失败！");
              // 开启加载进度条
              this.teamTabLoad = true
              this.$refs.applyTeamRef.resetFields();
              this.teamShow=true
              // 获取队伍
              this.getMyteam()
              this.userStatus = "2"
              // 2s后关闭加载进度条
              setTimeout(() => {
                this.teamTabLoad = false
                this.$message.success("队伍创建成功!");
              }, 2000);
            })
          })
        }
       )
      } else if(this.userStatus === "1"){
        return this.$message.warning('您尚有待审批的团队申请，请勿重复操作！')
      } else if(this.userStatus === "2") {
        return this.$message.warning('您已加入团队，请勿重复操作！')
      }
    },
    // 获取我的队伍信息
    getMyteam() {
      getMembersInfo({
        competitionId: this.competId,
        teamMember:this.userId
      }).then(res=>{
        // 队伍不存在
        if(res.data.length === 0) {
          this.teamShow = false
          this.applyTeamFlag=false
          this.userStatus = "0"
          setTimeout(() => {
            this.teamTabLoad = false
          }, 2000);
        } else {
          // 队伍存在
          // 还不是成员
          if(res.data[0].applicationStatus === "3") {
            this.applyTeamFlag=true
            this.teamShow=false
            this.userStatus = "1",
            this.undo = res.data[0].id
            this.applyingTeamName=res.data[0].teamName
            this.teamTabLoad = false
          }else {
            // 已经是成员
            this.userStatus = "2"
            this.teamName = res.data[0].teamName
            this.teamId = res.data[0].teamId
            // 判断是不是队长
            if(res.data[0].teamMember === res.data[0].creater) {
              this.captainFlag = true
            } else {
              this.captainFlag=false
            }
            // 查询该队伍中的所有成员
            this.getStatusById(1)
            this.teamShow = true
            this.teamTabLoad = false
          }
        }
      })
    },
    // 查询队伍中applicationStatus是1的所有成员
    getStatusById(val){
      if(val === 1) {
        getMembersInfo({
          competitionId:this.competId,
          teamId:this.teamId,
          applicationStatus:"1"
        }).then(res=>{
          console.log('获取队伍的成员信息',res)
          // 筛选状态是1的组员
          this.teamMembers = res.data
        })
      }else{
        getMembersInfo({
          competitionId:this.competId,
          teamId:this.teamId,
          applicationStatus:"3"
        }).then(res=>{
          console.log('获取队伍未审批的成员信息',res)
          if(res.data.length !== 0){
            // 筛选状态是3的组员
            this.teamMembersThree = res.data
          } else {
            this.teamMembersThree = []
          }
        })
      }
    },
    // 获取队伍信息
    getTeamInforma() {
      getTeamInfo({
        competitionId: this.competId,
      }).then(res=>{
        // 队伍存在
        if(res.total !== 0) {
          this.teamName = res.rows[0].teamName
          this.teamId = res.rows[0].id
          this.teamShow = true
          setTimeout(() => {
            this.teamTabLoad = false
          }, 2000);
          // 获取队伍成员信息
          getMembersInfo({
            competitionId:this.competId,
            id:res.rows[0].id
          }).then(res=>{
            console.log('获取队伍的成员信息',res)
            this.teamMembers = res.data
          })
        }else {
          // 队伍不存在
          this.teamShow = false
          setTimeout(() => {
            this.teamTabLoad = false
          }, 2000);
        }
      })
    },
    // tab被选中
    tabClick(val) {
      if(val.index === '3') {
        // 获取队伍信息,查看自己有没有队伍
        this.getMyteam()
      }else if(val.index == '1') {
        // 获取七牛云token
        this.getQiniuToken()
      }else if(val.index == '2') {
        // 获取评审结果
        this.getReviewResult()
      }
    },
    // 获取七牛云token
    getQiniuToken() {
      this.axios({
        method:'get',
        url:'https://www.zhongkeruitong.top/towerImg/cms/filesystem/getToken',
      }).then(res=>{
        console.log('七牛云token',res)
        if(res.status !== 200){
          return this.$message.error('获取七牛token失败！');
        }else{
          this.qiniuToken=res.data.uptoken
          console.log('七牛tokenl',this.qiniuToken)
        }
      })
    },
    // 获取评审结果
    getReviewResult(){
      getCommitted({
        competitionId:this.competId,
        userId:this.userId
      }).then(res=>{
        console.log('查看团队的信息',res)
        if(res.data.length == 0) {
          this.tuxingShow=false
          this.zhinengShow=false
          this.$message.warning('暂无成绩结果，请耐心等耐！')
        } else {
          this.axios({
            method:'get',
            headers:{"Authorization":getToken()},
            url:'http://123.56.149.85:11090/system/score/list?workId=' + res.data[0].workId,
          }).then(res=>{
            console.log('fasfsdfsa',res)
            this.resultForm = res.data.rows[0]
            if(res.data.rows[0].evaluateType == 1) {
              this.tuxingShow=true
              this.zhinengShow=false
            } else {
              this.tuxingShow=false
              this.zhinengShow=true
            }
            console.log('this.resultForm',this.resultForm)
          })
        }
      })
    },
    // 修改队伍
    modifyTeam() {
      this.modifyNameFlag = false
      this.modifyName=this.teamName
    },
    // 取消修改队伍
    cancelModify() {
      this.modifyNameFlag = true
    },
    // 确认修改队伍
    enterModify() {
      this.$confirm("此操作将修改队伍, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 修改比赛队伍
        modifyComTeam({
          competitionId:this.competId,
          creater:this.userId,
          teamName:this.modifyName,
          id:this.teamId
        }).then(res=>{
          if (res.code !== 200) return this.$message.error("修改失败！");
          // 开启加载进度条
          this.teamTabLoad = true
          this.modifyName = ''
          this.teamShow=true
          // 获取队伍
          this.getTeamInforma()
          this.modifyNameFlag=true
          // 2s后关闭加载进度条
          setTimeout(() => {
            this.teamTabLoad = false
            this.$message.success("修改成功!");
          }, 2000);
        })
      })
    },
    // 删除队伍
    deleteTeam() {
      this.$confirm("此操作将删除该队伍, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delTeam(this.teamId).then(res=>{
          if (res.code !== 200) return this.$message.error("队伍删除失败！");
          // 开启加载进度条
          this.teamTabLoad = true
          // 2s后关闭加载进度条
          setTimeout(() => {
            this.teamTabLoad = false
            this.userStatus = "0"
            this.$message.success("队伍删除成功!");
          }, 2000);
          this.teamShow=false
        })
      })
    },
    // 搜索队伍
    searchTeam() {
      if(this.searchName === '') {
        return this.$message.warning('请输入队伍名字')
      }
      getTeamInfo({
        teamName:this.searchName,
        competitionId:this.competId
      }).then(res=>{
        if(res.total !== 0) {
          this.teamDataList = res.rows
        }else {
          this.$message.warning('该队伍不存在，建议重新输入！')
          this.teamDataList = []
        }
      })
    },
    // 申请队伍
    applybtn(row) {
      if(this.userStatus === "0") {
        // 申请队伍
        applyTeam({
          teamMember:this.userId,
          teamId:row.id,
          applicationStatus:"3"
        }).then(res=>{
          this.$message.success('申请已发出，请等待审批！')
          this.userStatus = "1"
          this.teamTabLoad=true
          this.getMember()
          // 2s后关闭加载进度条
          setTimeout(() => {
            this.teamTabLoad = false
          }, 2000);
        })
      } else if(this.userStatus === "1") {
        return this.$message.warning('您尚有待审批的团队申请，请勿重复操作！')
      } else if(this.userStatus === "2") {
        return this.$message.warning('您已加入团队，请勿重复操作！')
      }
    },
    // 判断用户是否发出过申请/判断用户有没有队伍
    getMember() {
      getMembersInfo({
        competitionId: this.competId,
        teamMember:this.userId,
        applicationStatus:"3"
      }).then(res=>{
        if(res.data.length !== 0){
          this.applyTeamFlag = true
          this.applyingData=res.data[0]
        }else {
          this.applyTeamFlag = false
        }
      })
    },
    // 切换组织队伍/加入队伍标签页
    tabsClick(val) {
    //   if(val.index === '1') {
    //  }
    },
    captainTabsClick(val) {
      // 点击已加入
      if(val.index === '0') {
        // 刷新未加入列表
        this.teamWeiLoad=true
        // 刷新队伍成员列表
        this.getStatusById(1)
        // 2s后关闭加载进度条
        setTimeout(() => {
          this.teamWeiLoad = false
        }, 2000);
      }else if(val.index === '1'){
        // 点击未加入
        // 刷新已加入列表
        this.teamWeiLoad=true
        // 刷新队伍成员列表
        // 查询所有status不为1的成员
        this.getStatusById(3)
        // 2s后关闭加载进度条
        setTimeout(() => {
          this.teamWeiLoad = false
        }, 2000);
      }
    },
    // 同意审批
    agree(row) {
      console.log(row)
      this.$confirm("此操作将同意该审批, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          // 同意审批
          agreeApply({
            applicationStatus:"1",
            teamId:row.teamId,
            teamMember:row.teamMember,
            id:row.id
          }).then(res=>{
            console.log('同意审批',res)
            // 刷新未加入列表
            this.teamWeiLoad=true
            this.getStatusById(3)
            // 2s后关闭加载进度条
            setTimeout(() => {
              this.teamWeiLoad = false
            }, 2000);
          })
        })
    },
    // 判断审批状态
    userStatusById(val){
      if(val === "0") {
        this.applyTeamFlag=false
        this.teamShow=false
      }else if(val === "1") {
        this.applyTeamFlag=true
        this.teamShow=false
      }else if(val === "2") {
        this.applyTeamFlag=false
        this.teamShow=true
      }
    },
    // 拒绝审批
    refuse(row) {
      this.$confirm("此操作将拒绝该审批, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 拒绝审批
        refuseApply(row.id).then(res=>{
          // 刷新未加入列表
          this.teamWeiLoad=true
          this.getStatusById(3)
          // 2s后关闭加载进度条
          setTimeout(() => {
            this.teamWeiLoad = false
          }, 2000);
      })
      })
    },
    /* 撤销审批 */
    undoApply() {
      this.$confirm("此操作将撤销该审批, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          // 查一下undo
          getMembersInfo({
            competitionId: this.competId,
            teamMember:this.userId
          }).then(res=>{
            // 如果此时你的申请已经被同意，但是你没有刷新页面
            if(res.data.length === 0) {
              return this.$message.error('您的团队申请已被拒绝！请刷新页面后重新操作！')
            }else if(res.data[0].applicationStatus === "1") {
              return this.$message.warning('您的团队申请已通过！请及时刷新页面！')
            }else if(res.data[0].applicationStatus === "3") {
              refuseApply(res.data[0].id).then(res=>{
                if(res.code === 200) {
                  this.$message.success('撤销成功！')
                  this.userStatus = "0"
                  this.userStatusById("0")
                }
              })
            }
          })
        })
    },
    /* 文件上传七牛云成功后的处理函数 */
    handleAvatorsuccess(res) {
      console.log('文件成功函数',res)
      this.addForm.works=`https://qiniu.zhongkeruitong.top/${res.key}`
      console.log(this.addForm.works)
    },
    // 提交作品
    submitWorkInfo() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) {
          return this.$message.warning("请输入参赛作品名称！");
        }
        this.$confirm("此操作将创建该队伍, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          submitWork({
            competitionId:this.competId,
            submitUser:this.userId,
            workName:this.addForm.workName,
            works:this.addForm.works,
          }).then(res=>{
            if(res.msg == '还没有加入队伍') {
              this.$message.warning('请先加入团队，再进行提交！')
              this.$refs.addUpload.clearFiles()
              this.addForm = {
                competitionId:'',
                submitUser:'',
                workName:'',
                works:''
              }
            }else if(res.msg == '您所在的队伍已提交作品,请勿重复提交'){
              this.$message.warning('您所在的队伍已提交作品,请勿重复提交！')
              this.addForm = {
                competitionId:'',
                submitUser:'',
                workName:'',
                works:''
              }
              this.$refs.addUpload.clearFiles()
            }else{
              this.$message.success('作品提交成功！')
              console.log('作品提交',res)
              this.addForm = {
                competitionId:'',
                submitUser:'',
                workName:'',
                works:''
              }
              this.$refs.addUpload.clearFiles()
            }
          })
        })
      })
    }
  },
};
</script>
<style scoped>
.box-content {
  margin: 30px 0px 30px 0px;
}
.box-top {
  position: relative;
}
.top-box {
  display: flex;
  width: 990px;
  height: 66px;
  line-height: 66px;
  font-size: 14px;
  color: #666;
  text-align: center;
  background-color: #f0f6fc;
}
.top-box div:nth-child(1) {
  flex: 4;
}
.top-box div:nth-child(2) {
  flex: 1;
}
.top-box div:nth-child(3) {
  flex: 1;
}
.top-box div:nth-child(4) {
  flex: 1;
}
.top-box div:nth-child(5) {
  flex: 1;
}
.bottom-box {
  display: flex;
  width: 990px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-top: 1px solid #ccc;
  background-color: #f0f6fc;
}
.bottom-box div:nth-child(1) {
  flex: 4;
  font-size: 22px;
  font-weight: 400;
  color: #333;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.bottom-box div:nth-child(2) {
  flex: 1;
  text-align: center;
}
.bottom-box div:nth-child(2) span {
  padding: 5px 9px;
  border-radius: 3px;
  text-align: center;
  background-color: rgb(135, 208, 104);
  color: #fff;
}
.bottom-box div:nth-child(3) {
  flex: 1;
  font-size: 16px;
  font-weight: 400;
  color: #333;
}
.bottom-box div:nth-child(4) {
  flex: 1;
  font-size: 16px;
  font-weight: 400;
  color: #333;
}
.bottom-box div:nth-child(5) {
  flex: 1;
}
.left-box {
  position: absolute;
  top: 0;
  right: 0;
  width: 132px;
  height: 116px;
  background-color: #2d78f5;
  text-align: center;
  font-size: 22px;
  color: #fff;
  padding-top: 30px;
  cursor: pointer;
}
.left-box h2 {
  font-size: 16px;
  color: #fff;
}
.isShow {
  background-color: #f56c6c;
}
.leftword {
  padding-top: 11px;
}
.team-top {
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
}
.team-top .team-top-h1{
  display: flex;
  flex: 3;
}
.team-top .team-top-h1 /deep/.el-input__inner {
  height: 31px!important;
}
.team-top .team-top-btn1{
  /* flex: 1; */
}
.team-top .team-top-btn2{
  /* flex: 1; */
}
.team-table {
  margin-top: 10px;
  margin-bottom: 20px;
}
.upload {
  /* background-color: pink; */
  text-align: center;
  padding: 25px;
}
.uploadbtn {
  padding-left: 90px;
}
.divide {
  margin-top: 30px;
}
.total {
  margin-left: 30px;
  font-weight: 700;
}
.total span:nth-child(1) {
  font-size: 20px;
  color: #ff4949;
}
.review {
  margin-right: 10px;
  font-weight: 700;
}
.review::before {
  display: inline-block;
  content: "*";
  color: #ff4949;
  font-size: 15px;
  margin-right: 5px;
}
.review1 {
  margin-right: 20px;
  font-weight: 700;
}
.review1::before {
  display: inline-block;
  content: "*";
  color: #ff4949;
  font-size: 15px;
  margin-right: 5px;
}
.pingshen span:nth-child(1) {
  margin-left: 25px;
  font-size: 15px;
  font-weight: 700;
} 
.pingshen span:nth-child(2) {
  margin-left: 15px;
  font-size: 17px;
  color: #ff4949;
  font-weight: 700;
} 
</style>
