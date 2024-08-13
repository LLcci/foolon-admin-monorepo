<template>
  <div
    class="m-a w-90% flex justify-between items-center sm:mt-40 pos-relative z-10 xs:flex-col sm:flex-row"
  >
    <div class="xs:block sm:hidden">
      <img class="animate__animated animate__rubberBand w-30" src="/favicon.svg" alt="" />
    </div>
    <div class="xs:w-full sm:w-2xl xs:text-center sm:text-left">
      <div class="xs:font-size-6 sm:font-size-14 font-bold animate__animated animate__bounceIn">
        <span class="admin">foolon admin</span>
      </div>
      <div class="xs:font-size-6 sm:font-size-16 font-bold">
        <div class="animate__animated animate__lightSpeedInRight">NestJS + Vue3 + TS</div>
        <div class="animate__animated animate__lightSpeedInLeft">权限管理系统</div>
      </div>
      <div class="xs:font-size-6 sm:font-size-8 mt-4 animate__animated animate__fadeInUp">
        一个好用、易上手的权限管理系统
      </div>
    </div>
    <div class="xs:hidden sm:block">
      <img class="animate__animated animate__rubberBand w-60 mr-30" src="/favicon.svg" alt="" />
    </div>
  </div>
  <div
    class="xs:flex xs:justify-around sm:inline-block sm:ml-5% mt-12 animate__animated animate__jackInTheBox pos-relative z-10"
  >
    <el-button type="primary" round @click="goDoc('quickStart/introduce.html')">快速上手</el-button>
    <el-button type="info" round @click="goDoc('/apiDoc/')">后端文档</el-button>
    <el-button type="info" round @click="goDoc('/webDoc/')">前端文档</el-button>
  </div>
  <img class="pos-absolute left-0 bottom-0 z-0" src="@/assets/wave.svg" alt="" />
</template>
<script setup lang="ts">
import 'animate.css'

const goDoc = (name: string) => {
  window.open(`https://llcci.github.io/foolon-admin-monorepo/${name}`)
}
</script>
<style scoped>
.admin {
  background: linear-gradient(90deg, rgba(255, 102, 171, 1) 0%, rgba(255, 128, 185, 1) 100%);
  background-clip: text;
  color: transparent;
}
</style>
