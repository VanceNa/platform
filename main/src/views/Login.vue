<template>
  <div class="ulogin-container">
    <img class="background-box" src="../assets/login-bg.png" alt="" />
    <div class="ulogin-content">
      <div class="ulogin-header">
        <div
          class="ulogin-logo"
          :style="{ 'background-image': 'url(' + logoUrl + ')' }"
        ></div>
        <p class="ulogin-platform1">{{ logoName }}</p>
        <p class="ulogin-platform2">让交互更便捷</p>
      </div>
      <div class="ulogin-main">
        <span class="border-top"></span>
        <span class="border-right"></span>
        <span class="border-bottom"></span>
        <span class="border-left"></span>
        <div class="login">
          <el-form :model="ruleForm" :rules="ruleInline" ref="ruleForm">
            <el-form-item
              prop="account"
              style="height: 0.4rem; margin-bottom: 20px"
            >
              <el-input
                class="el-input"
                placeholder="请输入用户名"
                v-model="ruleForm.account"
              >
                <i slot="prefix" class="iconfont iconact" />
              </el-input>
            </el-form-item>
            <el-form-item
              prop="checkPass"
              style="height: 0.4rem; margin-bottom: 20px"
            >
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                placeholder="请输入密码"
                class="input ivu-icon-left"
                @keyup.enter.prevent.native="handleSubmit"
              >
                <i slot="prefix" class="iconfont iconpwd" />
              </el-input>
            </el-form-item>
            <el-form-item prop="code" class="code" v-if="open">
              <el-input
                v-model="ruleForm.code"
                placeholder="请输入验证码"
                maxlength="4"
                style="width: 2.12rem; float: left"
              >
                <i slot="prefix" class="iconfont iconyanzhengma" />
              </el-input>
              <img
                class="code-img"
                :src="codeImg"
                @click="initVerificationCodeImg"
              />
            </el-form-item>
            <el-form-item
              key="companyIsNotSelect"
              v-if="!companyIsSelect"
              prop="companyNameByManual"
              style="height: 0.4rem; margin-bottom: 20px"
            >
              <el-input
                v-model="ruleForm.companyNameByManual"
                placeholder="请输入租户名"
                class="input ivu-icon-left"
                icon="icon-home1"
              >
                <span slot="prefix" class="iconfont iconzuhu"></span>
              </el-input>
            </el-form-item>
            <el-form-item
              key="companyIsSelect"
              v-else
              prop="companyid"
              style="height: 0.4rem; margin-bottom: 0.2rem"
            >
              <el-select
                v-model="ruleForm.companyid"
                placeholder="请选择"
                class="select"
                icon="icon-home1"
              >
                <i slot="prefix" class="iconfont iconzuhu" />
                <el-option
                  v-for="item in companyList"
                  :value="item.companyid"
                  :key="item._index"
                  :label="item.companyname"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0.2rem">
              <div class="ulogin-pwd">
                <el-checkbox
                  v-model="checked"
                  @change="isRemember"
                  class="ulogin-pwd-check"
                  >记住密码</el-checkbox
                >
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="ulogin-btn"
                @click="handleSubmit"
                :loading="logining"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <reset-pwd
      :dialogVisible="dialogVisible"
      :ruleForm="ruleForm"
      @resetDialogVisible="resetDialogVisible"
    ></reset-pwd>
    <div class="ulogin-canvas" id="ulogin-canvas"></div>
  </div>
</template>
<script>
import Base64 from "base-64";
import Cookie from "vue-cookie";
import global from "../global";
import resetPwd from "@/components/resetPwd";

export default {
  name: "login2",
  components: {
    "reset-pwd": resetPwd,
  },
  data() {
    const validName = (rule, value, callback) => {
      let p1 = /^\S{1,16}$/;
      let patterns = /^[A-Za-z0-9\u4E00-\u9FA5]*$/;
      if (!p1.test(value)) {
        callback(new Error("请输入16位之内的非空字符的用户名！"));
      } else if (!patterns.test(value)) {
        callback(new Error("不能包含特殊字符！"));
      } else {
        callback();
      }
    };

    const validPwd = (rule, value, callback) => {
      let RegExp = /[^\x00-\xff]/;
      if (RegExp.test(value)) {
        callback(new Error("不能输入中文字符"));
      } else {
        callback();
      }
    };

    return {
      dialogVisible: false, //是否展示修改密码弹窗
      key: "",
      codeImg: "", //验证码
      heightWithPix: 30,
      widthWithPix: 100,
      open: false, //是否开启验证码校验
      logining: false,
      ruleForm: {
        account: "",
        checkPass: "",
        companyid: "",
        companyNameByManual: "", // 手动输入的租户名
        code: "",
      },
      companyList: [],
      checked: true,
      ruleInline: {
        account: [
          { required: true, message: "请填写用户名", trigger: "blur" },
          { validator: validName, trigger: "blur" },
        ],
        checkPass: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { validator: validPwd, trigger: "blur" },
        ],
        companyNameByManual: [
          { required: true, message: "请填写租户名", trigger: "blur" },
          { max: 20, message: "租户名长度不能超过20位", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      logoUrl: "",
      logoName: "智能营销服务一体化平台",
      companyIsSelect: true, // 租户为 true - 下拉框 || false - 输入框
    };
  },
  mounted() {
    this.getCompany();
    window.addEventListener("keydown", this.onEnter);
    if (Cookie.get("isRemember")) {
      this.checked = true;
    } else {
      this.checked = false;
    }
    this.autoSetLoginInfo(this.checked);
    this.gotoHomeIfHasToken();
  },
  methods: {
    resetDialogVisible() {
      this.dialogVisible = false;
    },
    initVerificationCodeImg() {
      let { heightWithPix, widthWithPix } = this;
      this.axios
        .get(
          `${global.baseUrl}/gateway/verify_code?heightWithPix=${heightWithPix}&widthWithPix=${widthWithPix}`
        )
        .then(({ data }) => {
          this.codeImg = data.data.imageBase64;
          this.key = data.data.key;
          this.open = data.data.open;
        });
    },
    async fetchStatusToShowCompany() {
      try {
        const res = await this.axios.get("oam/tenant/displaySwitch/info");
        if (res.data.code === 0) {
          this.companyIsSelect = res.data.data === 1;
        } else {
          this.$message.error("获取租户显示状态失败");
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
    getCompany() {
      this.axios
        .get("oam/api/company/getAllCompany", {})
        .then((res, req) => {
          this.companyList = res.data.data;
          this.ruleForm.companyid = this.companyList[0].companyid;
        })
        .catch((err) => {
          // this.$message.error('获取租户失败');
        });
    },
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let loginParam = {
            username: this.ruleForm.account,
            password: this.encodePWD(this.ruleForm.checkPass),
            companyId: this.companyIsSelect ? this.ruleForm.companyid : null,
            companyName: this.companyIsSelect
              ? null
              : this.ruleForm.companyNameByManual,
          };
          this.axios
            .post(
              `gateway/login?key=${this.key}&code=${this.ruleForm.code}`,
              loginParam,
              jsonHeader
            )
            .then(({ data }) => {
              if (data.code == 0) {
                Cookie.set("userNameHead", this.ruleForm.account, 7);
                Cookie.set("companyId", loginParam.companyId, 7);
                this.setLoginInfo(Cookie.get("isRemember"));
                this.$store.commit("setToken", data.data);
                this.gotoHome();
              }
              if (data.code === 1008 || data.code === 1) {
                this.initVerificationCodeImg(); // 验证码验证不通过刷新验证码
                this.$message.error(data.message);
              }
              if (data.code === 1009) {
                this.dialogVisible = true;
                this.$message.error(data.message);
              }
            })
            .catch((err) => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    gotoHome() {
      this.$store.commit("setIsLoginPage", false);
      this.$router.push("/main");
    },
    gotoHomeIfHasToken() {
      if (localStorage.getItem("token")) {
        this.gotoHome();
      }
    },
    encodePWD(password) {
      var timestamp = new Date().getTime();
      var base64Pwd = timestamp + password;
      var pwd = Base64.encode(base64Pwd);
      return pwd;
    },

    isRemember(isCheck) {
      if (isCheck) {
        // 记住
        Cookie.set("isRemember", isCheck);
      } else {
        // 不记住
        Cookie.delete("isRemember");
      }
    },
    setLoginInfo(isRemember) {
      // 向cookie设置登录信息
      if (isRemember) {
        // 用户选择记住且登录成功
        Cookie.set("userName", this.ruleForm.account, 7);
        Cookie.set("pwd", Base64.encode(this.ruleForm.checkPass), 7);
      } else {
        // 用户选择不记住且登录成功
        Cookie.delete("userName");
        Cookie.delete("pwd");
      }
    },
    autoSetLoginInfo(isRemember) {
      if (isRemember) {
        if (Cookie.get("userName") && Cookie.get("pwd")) {
          this.ruleForm.account = Cookie.get("userName");
          this.ruleForm.checkPass = Base64.decode(Cookie.get("pwd"));
        }
      }
    },
    onEnter(event) {
      if (event.keyCode == "13") {
        this.handleSubmit();
      }
    },
    initLogo() {
      this.axios.get("/oam/logo/queryDescs?flag=3").then((res) => {
        let r = res.data;
        if (r.code == 0) {
          if (r.data && r.data.desc) {
            this.logoName = r.data.desc;
            document.title = this.logoName;
          }
        } else {
          this.$message.error(r.message);
        }
      });
      this.axios.get("/oam/logo/queryLoginImg.do?flag=3").then((res) => {
        let r = res.data;
        if (r.code == 0) {
          this.logoUrl = r.data ? "data:image/png;base64," + r.data.png : "";
          let link =
            document.querySelector("link[rel*='icon']") ||
            document.createElement("link");
          link.type = "image/x-icon";
          link.rel = "shortcut icon";
          r.data && (link.href = "data:image/png;base64," + r.data.ico);
          document.getElementsByTagName("head")[0].appendChild(link);
        } else {
          this.$message.error(r.message);
        }
      });
    },
  },
  created() {
    this.initLogo();
    this.initVerificationCodeImg();
    this.fetchStatusToShowCompany();
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval);
    // window.removeEventListener('keydown', this.onEnter)
  },
};
</script>
<style lang="less" scoped>
.ulogin-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: #0a0d31;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  .pwd-tips {
    color: red;
  }
  .background-box {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 0;
    width: 55%;
    max-width: 1083px;
  }

  .ulogin-header {
    width: 100%;
    z-index: 0;
    text-align: center;
    margin-bottom: 0.4rem;
    p {
      padding: 0;
      width: 100%;
      color: #ffffff;
      &.ulogin-platform1 {
        font: 28px "Microsoft YaHei", sans-serif;
        color: #4fdbe5;
      }
      &.ulogin-platform2 {
        font: 14px "Microsoft YaHei", sans-serif;
        margin-top: 0.16rem;
        color: #4fdbe5;
      }
    }
  }
  .ulogin-main {
    width: 4.2rem;
    position: relative;
    min-height: 3.67rem;
    z-index: 2;
    text-align: center;

    .login {
      padding: 0.1rem;
      width: 100%;
      height: 100%;
      form {
        padding: 0.38rem;
        box-sizing: border-box;
        margin: 0;
        .el-input {
          height: 0.4rem;
          width: 3.2rem;
          padding: 0;
          outline: none;
        }
        .select {
          font: 0.14rem "Microsoft YaHei", Arial !important;
          padding: 0 0.1rem;
          float: left;
          border: 0;
          background: transparent;
          width: 3.2rem;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: #fff;
          outline: 0;
        }
        .ulogin-pwd {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.1rem;
          margin-bottom: 6px;
          color: #abb5bf;
          width: 3.2rem;
          font: 0.14rem "Microsoft YaHei", Arial !important;
          .ulogin-pwd-check {
            font: 0.14rem "Microsoft YaHei", Arial !important;
            color: #4fdbe5;
            .ivu-checkbox-checked {
              .ivu-checkbox-inner {
                background-color: #fff;
              }
              .ivu-checkbox-inner::after {
                border-color: #3a68ad;
              }
            }
          }
        }
        .ulogin-btn {
          width: 3.2rem;
          height: 0.4rem;
          line-height: 1 !important;
          font-size: 14px !important;
          background-color: #4fdbe5;
          border: none;
          color: #0a0d31;
          font-weight: bold;
          letter-spacing: 2px;
        }
      }
    }
  }

  .border-top,
  .border-right,
  .border-bottom,
  .border-left {
    position: absolute;
    z-index: 1;
    box-sizing: border-box;
    width: 0;
    height: 0;
    background-color: #4fdbe5;
  }

  .border-top,
  .border-right,
  .border-bottom {
    &:before {
      content: "";
      position: absolute;
      border-radius: 50%;
      width: 6px;
      height: 6px;
      background-color: #4fdbe5;
      z-index: 100;
    }
  }

  .border-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, #4fdbe5, transparent, #4fdbe5);

    &:before {
      left: -2px;
      top: -2px;
    }
  }

  .border-right {
    top: 0;
    right: 0;
    height: 100%;
    width: 1px;
    background: linear-gradient(to bottom, #4fdbe5, transparent, transparent);

    &:before {
      left: -3px;
      top: -2px;
    }
  }

  .border-bottom {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, #4fdbe5, transparent, transparent);

    &:before {
      left: -2px;
      bottom: -2px;
    }
  }

  .border-left {
    left: 0;
    top: 0;
    height: 100%;
    width: 1px;
  }

  .ulogin-canvas {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }
  .ulogin-footer {
    color: #fff;
    font: 14px "Microsoft YaHei", sans-serif;
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 0.32rem;
    left: 0;
  }
  .ulogin-logo {
    width: 100px;
    height: 75px;
    margin: 0 auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-bottom: 0.25rem;
  }
  .ulogin-content {
    width: 4.2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -2.1rem;
    margin-top: -3.5rem;
  }
  .code-img {
    width: 1rem;
    height: 0.4rem;
  }
}
</style>
<style lang="less">
.ulogin-main .el-form .el-form-item .el-form-item__content {
  line-height: 0.4rem !important;
}
.ulogin-main .el-form .code .el-form-item__content {
  line-height: 1 !important;
}
.ulogin-main .el-form .code {
  padding: 0 0.1rem;
}
.ulogin-main .el-form span.el-input__prefix {
  height: 0.4rem;
  width: 0.38rem;
  line-height: 0.4rem;
  color: #4fdbe5;
}
.ulogin-main .el-form .iconfont {
  height: 0.4rem;
  width: 0.38rem;
  color: #4fdbe5;
  font-size: 20px;
}
.ulogin-main .el-input__prefix {
  height: 0.4rem;
  line-height: 0.4rem;
  left: 0;
}
.ulogin-main .el-input--prefix .el-input__inner {
  padding-left: 40px;
}
.ulogin-main .el-input.el-input__inner .el-input {
  height: 0.4rem;
  padding-left: 0.4rem;
  font: 0.14rem "Microsoft YaHei", Arial !important;
  background-color: #2f3150;
  border-color: #2f3150;
  border-radius: 2px;
  color: #4fdbe5;
}

.ulogin-main .el-input .el-input__inner {
  background-color: #2f3150 !important;
  border-color: #2f3150;
  color: #4fdbe5;
  height: 0.4rem !important;
  // width: 0.38rem !important;
  line-height: 0.4rem !important;
}
.ulogin-main .el-form-item .el-input.el-input .el-input__inner .el-input-icon {
  height: 0.4rem !important;
  width: 0.38rem !important;
  line-height: 0.4rem !important;
  color: #4fdbe5;
}

.ulogin-main .el-form-item__content .ivu-el-input:focus {
  border-color: transparent !important;
  box-shadow: none !important;
}

.ulogin-main .el-icon-arrow-up {
  position: absolute;
  top: 30%;
  right: 4px;
  line-height: 1;
  margin-top: -9px;
  font-size: 20px;
  color: #9fa9b2;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.ulogin-main .el-form-item .select .ivu-select-selection {
  height: 0.4rem !important;
  text-align: left;
  .el-select-placeholder {
    height: 0.4rem;
    padding-left: 0.4rem;
    line-height: 0.4rem;
  }
}

.ulogin-main .el-form-item .select .ivu-select-selected-value {
  height: 0.4rem !important;
  line-height: 0.4rem !important;
  padding-left: 0.4rem;
  font: 0.14rem "Microsoft YaHei", Arial;
}

.ulogin-main .el-form-item .select .ivu-select-visible .ivu-select-selection {
  outline: none !important;
  box-shadow: none !important;
}

.ulogin-main .el-form-item .ulogin-pwd-check {
  .ivu-checkbox {
    margin-right: 2px;
  }
  .ivu-checkbox-checked {
    .ivu-checkbox-inner {
      background-color: #fff;
    }
    .ivu-checkbox-inner::after {
      border-color: #3a68ad;
    }
  }
}
</style>
