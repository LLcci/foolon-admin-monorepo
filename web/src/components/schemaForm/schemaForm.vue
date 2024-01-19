<template>
  <el-form ref="formRef" v-bind="form.props">
    <el-form-item
      v-for="(item, index) in form.formItems"
      :key="index"
      v-bind="item.props"
      :prop="index"
    >
      <component
        :is="item.component"
        v-bind="item.componentProps"
        v-on="{ ...item.componentEvents }"
        v-model="formModel[index]"
      >
        <template
          v-for="(slotItem, slotItemIndex) in item.componentSlots"
          :key="slotItemIndex"
          #[slotItemIndex]
        >
          <component
            v-for="(slotItemComponent, slotItemComponentIndex) in slotItem"
            :key="slotItemComponentIndex"
            :is="slotItemComponent"
          ></component>
        </template>
      </component>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import type SchemaForm from './types/'
import { type PropType } from 'vue'
import {
  ElAutocomplete,
  ElCascader,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElRate,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElTree,
  ElUpload,
  ElTreeSelect,
  ElOption,
  type FormInstance
} from 'element-plus'
import type { FormModel } from './types/'
export default {
  props: {
    form: {
      required: true,
      type: Object as PropType<SchemaForm<FormModel>>
    }
  },
  emits: {
    onValidateOk<T>(model: T) {
      return model
    }
  },
  components: {
    ElAutocomplete,
    ElCascader,
    ElColorPicker,
    ElDatePicker,
    ElInput,
    ElInputNumber,
    ElRate,
    ElSelect,
    ElOption,
    ElSlider,
    ElSwitch,
    ElTimePicker,
    ElTimeSelect,
    ElTransfer,
    ElTree,
    ElTreeSelect,
    ElUpload
  },
  computed: {
    formModel() {
      return this.form.props.model
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const formRef = this.$refs.formRef as FormInstance
        await formRef.validate()
        this.$emit('onValidateOk', this.formModel)
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
