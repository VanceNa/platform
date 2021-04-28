<template>
  <el-dialog
    title="修改密码"
    width="420px"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancelPwd"
  >
    <el-form
      :model="pwdForm"
      ref="pwdForm"
      :rules="pwdFormRules"
      label-width="75px"
    >
      <el-form-item label="原密码" prop="pwd">
        <el-input v-model="pwdForm.pwd" @focus="changeType"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="pwdForm.newPwd" @focus="changeType"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="repeatPwd">
        <el-input v-model="pwdForm.repeatPwd" @focus="changeType"></el-input>
      </el-form-item>
    </el-form>
    <p class="pwd-tips">
      密码要求8-16位，必须包含英文字母、数字和英文符号，其中英文符号包括:!@#$%^&*，修改密码时不可和上次密码相同
    </p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitPwd">确 定</el-button>
      <el-button @click="cancelPwd">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
const pwdRule = /(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}/
const pwdRuleWord = /[^\x00-\xff]/
import Base64 from 'base-64'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    ruleForm: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    const validPwd = (rule, value, callback) => {
      if (
        !pwdRule.test(value) ||
        pwdRuleWord.test(value) ||
        value.length > 16
      ) {
        callback(new Error('新密码不符合规范！'))
      } else if (value === this.pwdForm.pwd) {
        callback(new Error('新密码不能和上次的密码相同'))
      } else {
        callback()
      }
    }
    const validRepeatPwd = (rule, value, callback) => {
      if (value !== this.pwdForm.newPwd) {
        callback(new Error('重复密码和新密码不一致'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        pwd: '',
        newPwd: '',
        repeatPwd: '',
      },
      pwdFormRules: {
        pwd: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
        newPwd: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { validator: validPwd, trigger: 'blur' },
        ],
        repeatPwd: [
          { required: true, message: '重复密码不能为空', trigger: 'blur' },
          { validator: validRepeatPwd, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    encodePWD(password) {
      var timestamp = new Date().getTime()
      var base64Pwd = timestamp + password
      var pwd = Base64.encode(base64Pwd)
      return pwd
    },
    changeType(e) {
      e.srcElement.type = 'password'
    },
    cancelPwd() {
      this.$refs.pwdForm.resetFields()
      this.$emit('resetDialogVisible')
    },
    submitPwd() {
      let { pwdForm, ruleForm } = this
      this.$refs.pwdForm.validate((valid) => {
        if (!valid) return
        const params = {
          username: ruleForm.account,
          oldPassword: this.encodePWD(pwdForm.pwd),
          newPassword: this.encodePWD(pwdForm.newPwd),
          companyId: ruleForm.companyid,
        }
        this.axios
          .post(`${global.baseUrl}/gateway/updatePassword`, params)
          .then(({ data }) => {
            if (data.code === 0) {
              this.$message.success('修改密码成功！')
              this.cancelPwd()
            } else {
              this.$message.error('原密码输入错误，请重新输入')
            }
          })
          .catch((err) => {
            console.log(err.message)
          })
      })
    },
  },
}
</script>
<style scoped>
.pwd-tips {
  color: red;
}
</style>
