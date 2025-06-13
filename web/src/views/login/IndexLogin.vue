<template>
  <div class="h-screen flex items-center justify-center bg-$el-bg-color-page">
    <el-card class="xs:w-xs sm:w-4xl" shadow="always">
      <div class="flex items-center flex-col xs:mb-5 sm:mb-10">
        <div class="mt-4 flex items-center justify-center">
          <img class="w-10" src="/favicon.svg" alt="" />
          <span class="font-size-8 font-bold ml-2">{{ title }}</span>
        </div>
        <span class="color-$el-text-color-secondary mt-2">
          {{ description }}
        </span>
        <div class="xs:w-70 sm:w-xl xs:mt-6 sm:mt-10">
          <el-tabs>
            <el-tab-pane label="密码登录">
              <el-form :model="formData" ref="formRef" :rules="rules" @keyup.enter="onSubmit">
                <el-form-item prop="username">
                  <el-input v-model="formData.username" placeholder="用户账户"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="formData.password"
                    placeholder="密码"
                    type="password"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <cap-widget
                    id="cap"
                    :data-cap-api-endpoint="capApi"
                    data-cap-i18n-verifying-label="验证中..."
                    data-cap-i18n-initial-state="点击验证"
                    data-cap-i18n-solved-label="验证通过"
                    data-cap-i18n-error-label="验证失败，请重试"
                  ></cap-widget>
                </el-form-item>
                <el-form-item>
                  <el-button
                    class="w-full"
                    type="primary"
                    size="large"
                    @click="onSubmit"
                    :loading="loginLoading"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { type FormInstance, type FormRules } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useLogin } from './api'
import { useUser } from '@/stores/useUser'
import { useRouter } from 'vue-router'
import { useDict } from '@/stores/useDict'
import type { paths } from '@/types/Schema'

const capApi = ref(`${import.meta.env.VITE_API_URL}/admin/sys/login/`)

const router = useRouter()

const title = ref(import.meta.env.VITE_APP_NAME)
const description = ref(import.meta.env.VITE_APP_DESCRIPTION)

const formRef = ref<FormInstance>()

let formData = reactive<
  paths['/admin/sys/login']['post']['requestBody']['content']['application/json']
>({
  username: '',
  password: '',
  code: ''
})

const rules = reactive<FormRules<typeof formData>>({
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  code: [{ required: true, message: '请点击验证' }]
})

onMounted(() => {
  const widget = document.querySelector('#cap')

  widget?.addEventListener('solve', function (e: any) {
    formData.code = e.detail.token
  })
})

const { data: loginData, execute: goLogin } = useLogin(formData)
const loginLoading = ref(false)
async function onSubmit() {
  try {
    loginLoading.value = true
    await formRef.value?.validate()
    await goLogin(true)
    useUser().setToken(loginData.value?.token as string)
    await useUser().getPermissions()
    await useDict().initDictMap()
    router.replace('/')
  } catch (error) {
    console.error(error)
  } finally {
    loginLoading.value = false
  }
}
</script>
<style scoped></style>
