<template>
  <div>
    <div id="login-header">
      <div class="header-container">
        <div class="container-left">
          <a @click="() => this.$router.push('/')">
            <img src="../../assets/header-logo.png" />
          </a>
        </div>
        <div class="container-middle">课程详情</div>
      </div>
    </div>
    <div class="share-container">
      <div class="course-title">
        <div class="course-image">
          <el-image
            class="course-el-image"
            fit="cover"
            :src="modalValue.courseCover"
          />
        </div>
        <div class="course-msg">
          <div class="course-detail-title">
            <span>{{ modalValue.courseName }}</span>
          </div>
          <div class="modal-tag">
            <a-tag
              color="#f50"
              v-for="(item, index) in modalValue.courseLabels"
              :key="index"
            >
              {{ item }}
            </a-tag>
          </div>
          <ul>
            <li>难易度：{{ modalValue.courseDifficulty }}</li>
            <li>适合人群：{{ modalValue.courseCrowd }}</li>
            <li>技术储备要求：{{ modalValue.courseStorage }}</li>
          </ul>
          <a-statistic
            title="课程价格"
            :precision="2"
            :value="modalValue.coursePrice"
            :value-style="{ color: '#cf1322' }"
          >
            <template #prefix>￥</template>
          </a-statistic>
          <div class="course-button-group">
            <a-button type="danger" size="large" block @click="buyCourse"
              ><a-icon type="shopping-cart" />立即购买</a-button
            >
          </div>
        </div>
      </div>
      <div class="course-intro">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="课程介绍">
            <div class="course-intro-pane">
              <p>{{ modalValue.courseDescription }}</p>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div id="video-footer">
      <div class="content">
        <ul>
          <li>青程在线&nbsp;·&nbsp;智慧编程&nbsp;青程倾心</li>
          <li>中科智禾人工智能科创教育研究中心</li>
          <li>中科智禾数字科技（北京）有限公司</li>
          <li>京ICP备2020043184号-1</li>
          <li>Copyright &copy; 2022 All Right Reserved</li>
        </ul>
      </div>
    </div>
    <a-modal v-model="modalVisible" title="购买课程" centered>
      <a-radio default-checked>
        <img src="../../assets/微信支付.png" style="height: 35px" />
      </a-radio>
      <template slot="footer">
        <a-button type="primary" size="large" block @click="payMoney"
          >立即支付</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script>
import { getCourseDetail, hasPermission } from "../../api/course";
import { getToken } from "../../utils/auth";
import { createOrder } from "../../api/wechat";
import { BASE_ADDRESS } from "../../api/address";

export default {
  name: "index",
  data() {
    return {
      courseId: undefined,
      modalValue: {
        courseId: 0,
        courseCover: "",
        courseName: "",
        courseDifficulty: "",
        courseDescription: "",
        courseCrowd: "",
        courseStorage: "",
        coursePrice: 0,
        courseLabels: [],
      },
      modalVisible: false,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.courseId = route.query && route.query.courseId;
        if (route.query && route.query.openid) {
          this.$store.dispatch("setOpenId", route.query.openid);
        }
      },
      immediate: true,
    },
  },
  computed: {
    openId() {
      return this.$store.getters.openId;
    },
  },
  mounted() {
    this.goViewDetail(this.courseId);
  },
  methods: {
    /* 查询该课程的详细信息 */
    goViewDetail(id) {
      getCourseDetail(id).then((response) => {
        if (response.code === 200) {
          this.modalValue = response.data;
        }
      });
    },
    /* 购买课程 */
    buyCourse() {
      if (getToken()) {
        const information = this.$store.getters.userInfo;
        // 判断当前用户是否已拉取完userInfo信息
        if (Object.keys(information).length === 0) {
          this.$store
            .dispatch("GetInfo")
            .then((response) => {
              console.log(response.data);
            })
            // eslint-disable-next-line no-unused-vars
            .catch((err) => {
              this.msgWarning("登录状态已过期，请重新进入链接");
              this.$store.dispatch("logOut");
            });
        } else {
          hasPermission(this.courseId).then((response) => {
            if (response.code === 200) {
              if (response.permission) {
                this.msgWarning("您已购买/报名该课程，正在前往课程页面");
                this.$router.push(`/course-detail/${this.courseId}`);
              } else {
                this.modalVisible = true;
              }
            } else {
              this.msgError(response.msg);
            }
          });
        }
      } else {
        // 没有Token
        const _this = this;
        this.$confirm({
          title: "",
          // eslint-disable-next-line no-unused-vars
          content: (h) => (
            <div style="color: #909399">您仍然可以继续留在此页。</div>
          ),
          okText: "前往登录",
          cancelText: "留在此页",
          onOk() {
            const path = `/share?courseId=${_this.courseId}`;
            _this.$router.push(`/login?redirect=${path}`);
          },
          onCancel() {
            console.log("留在此页");
          },
          class: "test",
        });
      }
    },
    /* 支付 */
    payMoney() {
      if (this.openId) {
        // this.msgSuccess("微信授权成功");
        createOrder({
          productId: this.courseId.toString(),
          openid: this.openId,
          tradeType: "JSAPI",
        }).then((response) => {
          if (response.code === 200) {
            this.callPayment(response.data);
          } else {
            this.msgError(response.msg);
          }
        });
      } else {
        this.msgInfo("请先进行微信授权");
        window.location.href =
          "https://zhongkeruitong.top/qingcheng_online/wechat/getCode?cid=" +
          this.courseId;
      }
    },
    /* 调起支付控件 */
    callPayment(query) {
      function onBridgeReady() {
        // eslint-disable-next-line no-undef
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: query.appId, //公众号ID，由商户传入
            timeStamp: query.timeStamp, //时间戳，自1970年以来的秒数
            nonceStr: query.nonceStr, //随机串
            package: query.packageValue,
            signType: query.signType, //微信签名方式：
            paySign: query.paySign,
          },
          function (res) {
            if (res.err_msg === "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              window.location.href = BASE_ADDRESS + "/paySuccess";
            } else {
              window.location.href = BASE_ADDRESS + "/payFailed";
            }
          }
        );
      }
      if (typeof WeixinJSBridge === "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    },
  },
};
</script>

<style scoped>
#login-header {
  height: 70px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.container-left {
  width: 180px;
  height: 70px;
  position: relative;
}

.container-left img {
  width: 150px;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}

.container-middle {
  padding-left: 20px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 70px;
}

.share-container {
  margin: 10px;
}

.course-title {
  display: block;
}

.course-image {
  padding-right: 0;
  padding-bottom: 5px;
}

.course-el-image {
  border-radius: 5px;
  width: 100%;
  height: 200px;
}

.course-msg {
  flex: 1;
}

.course-msg ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.course-msg ul li {
  margin: 10px 0;
}

.course-detail-title {
  color: #333333;
  font-size: 22px;
  font-weight: 600;
}

.course-button-group {
  text-align: center;
}

.modal-tag {
  margin: 5px 0;
}

.course-intro-pane {
  min-height: 200px;
}

.course-button-group {
  margin: 10px 0;
}

.content {
  padding: 10px 0;
  width: 100%;
  font-size: 12px;
}

.content ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}
</style>
