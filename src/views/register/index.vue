<template>
  <div>
    <div id="login-header">
      <div class="header-container">
        <div class="container-left">
          <a @click="() => this.$router.push('/')">
            <img src="../../assets/header-logo.png" />
          </a>
        </div>
        <div class="container-middle">注册</div>
      </div>
    </div>
    <register />
    <footer>
      <div class="content">
        <div class="item-contact">
          <a-row>
            <a-col :span="12">
              <div class="item-title">
                <span>&nbsp;</span>
              </div>
              <div style="display: flex">
                <div>
                  <img
                    style="width: 75px; height: 75px"
                    src="../../assets/qrcode.jpg"
                    alt=""
                  />
                  <div
                    style="width: 75px; text-align: center; font-family: '隶书'"
                  >
                    中科智禾
                  </div>
                </div>
                <div style="flex: 1; padding-left: 20px; padding-top: 20px">
                  <ul>
                    <li>
                      <i class="a-icon-phone"></i
                      ><span>&nbsp;联系电话：400 - 168 - 6292</span>
                    </li>
                    <li>
                      <i class="iconfont icon-weixin"></i
                      ><span>&nbsp;微信公众号：中科智禾</span>
                    </li>
                  </ul>
                </div>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="copyright">
                <ul>
                  <li><div style="height: 20px"></div></li>
                  <li>中科智禾人工智能科创教育研究中心</li>
                  <li>中科智禾数字科技（北京）有限公司</li>
                  <li>京ICP备2020043184号-1</li>
                  <li>Copyright &copy; 2022 All Right Reserved</li>
                </ul>
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="item-contact-mobile">
          <div style="display: flex; padding: 0 20px">
            <div>
              <img
                style="width: 75px; height: 75px"
                src="../../assets/qrcode.jpg"
                alt=""
              />
              <div style="width: 75px; text-align: center; font-family: '隶书'">
                中科智禾
              </div>
            </div>
            <div class="brand-title">
              <ul>
                <li style="height: 7px"></li>
                <li>
                  <a-icon type="phone" /><span
                    >&nbsp;联系电话：400 - 168 - 6292</span
                  >
                </li>
                <li>
                  <a-icon type="wechat" /><span
                    >&nbsp;微信公众号：中科智禾</span
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="copyright">
            <ul>
              <li><div style="height: 20px"></div></li>
              <li>中科智禾人工智能科创教育研究中心</li>
              <li>中科智禾数字科技（北京）有限公司</li>
              <li>京ICP备2020043184号-1</li>
              <li>Copyright &copy; 2022 All Right Reserved</li>
            </ul>
          </div>
        </div>
        <div id="placeholder-block"></div>
      </div>
    </footer>
  </div>
</template>

<script>
import Register from "./components/register";

export default {
  name: "index",
  components: { Register },
};
</script>

<style scoped>
#login-header {
  height: 70px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-container {
  width: 1140px;
  height: 100%;
  margin: auto;
  display: flex;
}

.container-left {
  width: 180px;
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

footer {
  background-color: #f0f6fc;
}

.content {
  background-color: #f0f6fc;
  padding-top: 5px;
  width: 1140px;
  margin: auto;
}

.item-title {
  margin: 20px 0;
  font-size: 18px;
  font-family: "黑体";
  color: #6e6e6e;
}

.item-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #6e6e6e;
}

.item-contact li {
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 20px;
  font-family: "Lato", sans-serif;
}

.item-contact-mobile {
  display: none;
  overflow: hidden;
}

.item-contact-mobile ul {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #6e6e6e;
}

.item-contact-mobile li {
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 20px;
  font-family: "Lato", sans-serif;
}

.item-friend ul {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #6e6e6e;
}

.item-friend li {
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 20px;
  font-family: "Lato", sans-serif;
}

.copyright {
  height: 120px;
  margin-top: 35px;
  border-left: 1px solid #dcdfe6;
}

.copyright li {
  text-align: right;
}

.brand-title {
  flex: 1;
  padding-left: 20px;
  padding-top: 20px;
}

#placeholder-block {
  height: 40px;
}

@media screen and (max-width: 480px) {
  .header-container {
    width: 100%;
  }

  .container-left {
    height: 70px;
  }

  .container-left img {
    width: 150px;
  }

  .content {
    width: calc(100vw - 20px);
    padding: 0 10px 20px 10px;
  }

  .item-title {
    text-align: center;
    font-size: 14px;
  }

  .item-contact {
    display: none;
  }

  .item-contact-mobile {
    display: block;
  }

  .copyright {
    border-left: none;
  }

  .copyright li {
    text-align: center;
  }

  .brand-title {
    padding-top: 0;
  }

  #placeholder-block {
    display: none;
  }
}
</style>
