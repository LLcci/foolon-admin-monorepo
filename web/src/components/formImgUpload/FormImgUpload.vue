<template>
  <el-upload
    v-bind="props.uploadProps"
    v-model:file-list="fileList"
    @success="handleSuccess"
    :disabled="disabled"
    :limit="1"
  >
    <template #default>
      <div class="w-15 h-15 relative" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
        <el-avatar
          class="absolute left-0 top-0"
          :size="60"
          v-if="imageName"
          :src="imageUrl"
        ></el-avatar>
        <el-icon class="absolute left-0 top-0" :size="40" v-else><Upload /></el-icon>
        <div
          class="w-15 h-15 absolute left-0 top-0 z-99 bg-$el-mask-color flex items-center justify-center b-rd-5"
          v-if="deleteMaskShow"
          @click="handleDelete"
        >
          <el-icon color="#303133" :size="20"><Delete /></el-icon>
        </div>
      </div>
    </template>
    <template #tip>
      <div class="el-upload__tip">点击上方按钮上传图片，格式限制为jpg、png</div>
    </template>
  </el-upload>
</template>
<script setup lang="ts">
import type { Awaitable } from '@vueuse/core'
import {
  ElUpload,
  type UploadFile,
  type UploadFiles,
  type UploadProgressEvent,
  type UploadRawFile,
  type UploadRequestOptions,
  type UploadUserFile
} from 'element-plus'
import { computed, ref } from 'vue'

const props = defineProps<{
  uploadProps: {
    action: string
    headers?: Record<string, string>
    method?: string
    multiple?: boolean
    data?:
      | Record<string, any>
      | Awaitable<Record<string, any>>
      | ((rawFile: UploadRawFile) => Awaitable<Record<string, any>>)
    name: string
    'with-credentials'?: boolean
    'show-file-list'?: boolean
    drag?: boolean
    accept?: string
    crossorigin?: '' | 'anonymous' | 'use-credentials'
    'on-preview'?: (uploadFile: UploadFile) => void
    'on-remove'?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
    'on-error'?: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
    'on-progress'?: (
      evt: UploadProgressEvent,
      uploadFile: UploadFile,
      uploadFiles: UploadFiles
    ) => void
    'on-exceed'?: (files: File[], uploadFiles: UploadUserFile[]) => void
    'before-upload'?: (
      rawFile: UploadRawFile
    ) => Awaitable<void | undefined | null | boolean | File | Blob>
    'before-remove'?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>
    'list-type'?: 'text' | 'picture' | 'picture-card'
    'auto-upload'?: boolean
    'http-request'?: (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>
    'on-handle-delete'?: (imageName?: string) => void
  }
}>()

const imageName = defineModel<string>({ required: false })

const imageUrl = computed(() => {
  if (imageName.value) {
    return `${import.meta.env.VITE_AVATAR_URL}/${imageName.value}`
  }
  return ''
})

const fileList = ref<UploadFiles>([])

const disabled = ref(false)

const handleSuccess = (res: any) => {
  imageName.value = res.data
  disabled.value = true
}

const deleteMaskShow = ref(false)

const handleMouseOver = () => {
  if (imageName.value) {
    deleteMaskShow.value = true
  }
}
const handleMouseLeave = () => {
  deleteMaskShow.value = false
}

const handleDelete = async () => {
  props.uploadProps['on-handle-delete']?.(imageName.value)
  deleteMaskShow.value = false
  fileList.value = []
  imageName.value = undefined
  setTimeout(() => {
    disabled.value = false
  }, 1)
}
</script>
<style scoped></style>
