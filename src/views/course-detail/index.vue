<template>
  <div>
    <a-page-header @back="() => this.$router.push('/all-courses')">
      <span slot="title" style="font-weight: normal">课程详情</span>
    </a-page-header>
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
          <a-button type="danger" size="large" shape="round" @click="buyLesson"
            ><a-icon type="shopping-cart" />立即购买</a-button
          >
          <a-button
            type="primary"
            size="large"
            shape="round"
            style="margin-left: 10px"
            @click="goLearn(modalValue.courseId)"
            ><a-icon type="play-circle" />前往学习</a-button
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
    <a-modal v-model="payModal" title="购买课程" centered :footer="null">
      <a-list item-layout="horizontal">
        <a-list-item class="wechat-pay" @click="genarateQrcode">
          <a-list-item-meta
            title="使用二维码支付"
            description="浏览器打开可选择此支付方式"
          ></a-list-item-meta>
          <template slot="actions">
            <a-icon type="right" v-show="!codeShow" />
          </template>
        </a-list-item>
        <div class="qrcode" v-if="codeShow">
          <div class="code-img" v-loading="codeLoading">
            <div id="qrCode" ref="qrCodeDiv"></div>
          </div>
          <div style="margin-top: 25px">
            <a-icon type="scan" />&nbsp;请使用微信扫码支付
          </div>
          <div>
            支付完成？请到<a @click="() => this.$router.push('/user/order')"
              >订单中心</a
            >查看订单状态
          </div>
        </div>
        <a-list-item class="wechat-pay" @click="goWechatPay">
          <a-list-item-meta
            title="前往微信支付"
            description="微信内打开可选择此支付方式"
          ></a-list-item-meta>
          <template slot="actions">
            <a-icon type="right" />
          </template>
        </a-list-item>
      </a-list>
    </a-modal>
  </div>
</template>

<script>
import { getCourseDetail, hasPermission } from "../../api/course";
import { createOrder } from "../../api/wechat";
import QRCode from "qrcodejs2";

export default {
  name: "index",
  computed: {
    courseId() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
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
      hasAccess: false,
      payModal: false,
      codeShow: false,
      codeLoading: false,
    };
  },
  mounted() {
    this.getPermission(this.courseId);
    this.goViewDetail(this.courseId);
  },
  methods: {
    /* 判断当前用户是否已购买该课程 */
    getPermission(id) {
      hasPermission(id).then((response) => {
        if (response.code === 200) {
          this.hasAccess = response.permission;
        } else {
          this.msgError(response.msg);
        }
      });
    },
    /* 查询该课程的详细信息 */
    goViewDetail(id) {
      getCourseDetail(id).then((response) => {
        if (response.code === 200) {
          this.modalValue = response.data;
        }
      });
    },
    /* 跳转到观看课程页面 */
    goLearn(id) {
      if (this.hasAccess) {
        this.$router.push(`/course/${id}`);
      } else {
        this.msgWarning("您还没有购买/报名该课程");
      }
    },
    /* 购买课程操作 */
    buyLesson() {
      if (this.hasAccess) {
        this.msgWarning("您已购买/报名该课程");
      } else {
        this.payModal = true;
      }
    },
    /* 前往调用微信内支付页面 */
    goWechatPay() {
      window.location.href =
        "https://zhongkeruitong.top/qingcheng_online/wechat/getCode?cid=" +
        this.courseId;
    },
    /* 生成支付二维码 */
    genarateQrcode() {
      if (this.codeShow) return;
      this.codeShow = true;
      this.codeLoading = true;
      createOrder({
        productId: this.courseId.toString(),
        tradeType: "NATIVE",
      }).then((response) => {
        if (response.code === 200) {
          this.codeLoading = false;
          new QRCode(this.$refs.qrCodeDiv, {
            text: response.data["codeUrl"],
            width: 120,
            height: 120,
            correctLevel: QRCode.CorrectLevel.L,
          });
        } else {
          this.codeLoading = false;
          this.msgError(response.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
.course-title {
  display: flex;
}

.course-image {
  padding-right: 20px;
}

.course-el-image {
  width: 510px;
  height: 288px;
  border-radius: 5px;
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

.modal-tag {
  margin: 5px 0;
}

.course-intro-pane {
  min-height: 200px;
}

.course-button-group {
  margin: 10px 0;
}

.wechat-pay:hover {
  cursor: pointer;
}

.qrcode {
  height: 200px;
  text-align: center;
}

.code-img {
  height: 120px;
  width: 120px;
  position: relative;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
}

@media screen and (max-width: 480px) {
  .course-title {
    display: block;
  }

  .course-image {
    padding-right: 0;
    padding-bottom: 5px;
  }

  .course-el-image {
    width: 100%;
    height: 200px;
  }

  .course-button-group {
    text-align: center;
  }
}
</style>
