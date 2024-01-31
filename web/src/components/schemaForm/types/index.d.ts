import type {
  FormProps as ElFormProps,
  FormItemProps as ElFormItemProps,
  FormRules
} from 'element-plus'
import type { VNode } from 'vue'
import type { FormModel, ButtonItem } from '@/types/index'

/**
 *
 */
export type FormProps<T> = Partial<Omit<ElFormProps, 'model' | 'rules'>> & {
  rules?: FormRules<T>
}

export type FormItemProps = Partial<Omit<ElFormItemProps, 'prop'>>

/**
 * 表单组件
 * @param {FormItemProps} props ElementUI表单项目属性,https://element-plus.org/zh-CN/component/form.html#formitem-attributes
 * @param {VNode} component 组件
 */
export type FormItems<T> = Record<
  keyof T,
  {
    /**
     * ElementUI表单项目属性,https://element-plus.org/zh-CN/component/form.html#formitem-attributes
     */
    props?: FormItemProps
    /**
     * 组件
     */
    component: VNode
    /**
     * 等同于v-if
     */
    vIf?: (model: T) => boolean
  }
>

/**
 * 简单表单
 * @param {FormProps} props ElementUI表单属性,https://element-plus.org/zh-CN/component/form.html#form-attributes
 * @param {FormItems} formItems 表单项目及对应的组件
 * @param {ButtonItem[]} buttons 按钮组,不传默认显示提交和重置按钮
 */
export default interface SchemaForm<T extends FormModel> {
  /**
   * ElementUI表单属性,https://element-plus.org/zh-CN/component/form.html#form-attributes
   */
  props: FormProps<T>
  /**
   * 表单项目及对应的组件
   */
  formItems: FormItems<T>
  /**
   * 按钮组,不传默认显示提交和重置按钮
   */
  buttons?: ButtonItem[]
}

export type SchemaFormInstance = InstanceType<typeof import('../schemaForm.vue').default>
