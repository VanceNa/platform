<template>
  <div>
    登录页
    <el-button @click="login">登录</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
       this.$router.push('/home')
    },
  },
};
</script>
