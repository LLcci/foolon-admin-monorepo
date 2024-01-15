<template>
  <div class="h-screen flex items-center justify-center bg-$el-bg-color-page">
    <el-card class="w-4xl h-xl" shadow="always">
      <div class="flex items-center flex-col">
        <div class="mt-4 flex items-center justify-center">
          <img class="w-10" src="/favicon.svg" alt="" />
          <span class="font-size-8 font-bold ml-2">{{ title }}</span>
        </div>
        <span class="color-$el-text-color-secondary mt-2">
          {{ description }}
        </span>
        <div class="w-xl mt-10">
          <el-tabs>
            <el-tab-pane label="密码登录">
              <el-form :model="formData" ref="formRef" :rules="rules">
                <el-form-item prop="username">
                  <el-input v-model="formData.username" placeholder="用户名"></el-input>
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
                  <div class="flex items-center">
                    <el-input v-model="formData.code" placeholder="验证码"></el-input>
                    <el-image @click="getCode" :src="code?.img" fit="fill" :lazy="true"></el-image>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button
                    class="w-full"
                    type="primary"
                    size="large"
                    @click="onSubmit"
                    :loading="loginFetching"
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
import { reactive, ref } from 'vue'
import { useCode, useLogin } from './api'
import type { LoginForm } from './types'
import { useUser } from '@/stores/useUser'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref(import.meta.env.VITE_APP_NAME)
const description = ref(import.meta.env.VITE_APP_DESCRIPTION)

const formRef = ref<FormInstance>()

let formData = reactive<LoginForm>({
  username: '',
  password: '',
  code: '',
  codeId: ''
})

const rules = reactive<FormRules<typeof formData>>({
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  code: [{ required: true, message: '请输入验证码' }]
})

const { data: code, execute: getCode } = useCode()
getCode()

const {
  data: loginData,
  onFetchError: onLoginError,
  isFetching: loginFetching,
  execute: goLogin
} = useLogin(formData)
onLoginError(() => getCode())
async function onSubmit() {
  try {
    await formRef.value?.validate()
    formData.codeId = code.value?.id as string
    await goLogin(true)
    useUser().setToken(loginData.value?.token as string)
    router.replace('/')
  } catch (error) {
    console.error(error)
  }
}
</script>
<style lang="scss" scoped></style>
