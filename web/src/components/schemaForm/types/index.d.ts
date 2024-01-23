import type {
  FormProps as ElFormProps,
  FormItemProps as ElFormItemProps,
  AutocompleteProps,
  CascaderProps,
  ColorPickerProps,
  DatePickerProps,
  InputNumberProps,
  InputProps,
  RateProps,
  SliderProps,
  SwitchProps,
  TransferProps,
  UploadProps,
  AutocompleteEmits,
  CascaderEmits,
  ColorPickerEmits,
  InputEmits,
  InputNumberEmits,
  RateEmits,
  SliderEmits,
  SwitchEmits,
  TransferEmits,
  FormRules,
  ButtonProps
} from 'element-plus'

import { ElSelect, ElTimePicker, ElTimeSelect, ElTree, ElTreeSelect } from 'element-plus'
import type { VNode } from 'vue'

export type FormItemCompanents = keyof Pick<
  typeof import('element-plus/es/components'),
  | 'ElAutocomplete'
  | 'ElCascader'
  | 'ElColorPicker'
  | 'ElDatePicker'
  | 'ElInput'
  | 'ElInputNumber'
  | 'ElRate'
  | 'ElSelect'
  | 'ElSlider'
  | 'ElSwitch'
  | 'ElTimePicker'
  | 'ElTimeSelect'
  | 'ElTransfer'
  | 'ElTree'
  | 'ElUpload'
  | 'ElTreeSelect'
>

export type SelectProps = InstanceType<typeof ElSelect>['$props']

export type TimePickerProps = InstanceType<typeof ElTimePicker>['$props']

export type TimeSelectProps = InstanceType<typeof ElTimeSelect>['$props']

export type TreeProps = InstanceType<typeof ElTree>['$props']

export type TreeSelectProps = InstanceType<typeof ElTreeSelect>['$props']

export type DatePickerEmits = {
  change: (val: any) => void
  blur: (e: FocusEvent) => void
  focus: (e: FocusEvent) => void
  'calendar-change': (val: [Date, null | Date]) => void
  'panel-change': (date: Date | [Date, Date], mode: 'month' | 'year', view?: string) => void
  'visible-change': (visibility: boolean) => void
}

export type SelectEmits = {
  change: (value: any) => void
  'visible-change': (visible: boolean) => void
  'remove-tag': (tagValue: any) => void
  clear: () => void3
  blur: (e: FocusEvent) => void
  focus: (e: FocusEvent) => void
}

export type TimePickeEmits = {
  change: (val: number | string | Date | [number, number] | [string, string] | [Date, Date]) => void
  blur: (e: FocusEvent) => void
  focus: (e: FocusEvent) => void
  'visible-change': (visibility: boolean) => void
}

export type TimeSelectEmits = {
  change: (value: string) => void
  blur: (e: FocusEvent) => void
  focus: (e: FocusEvent) => void
}

export type TreeEmits = Record<string, (val: any) => any>

export type TreeSelectEmits = {
  change: (value: string) => void
  blur: (e: FocusEvent) => void
  focus: (e: FocusEvent) => void
}

export type FormItemCompanentsProps = Partial<
  | AutocompleteProps
  | CascaderProps
  | ColorPickerProps
  | DatePickerProps
  | InputProps
  | InputNumberProps
  | RateProps
  | SelectProps
  | SliderProps
  | SwitchProps
  | TimePickerProps
  | TimeSelectProps
  | TransferProps
  | TreeProps
  | UploadProps
  | TreeSelectProps
>

export type FormItemCompanentsEvents = Partial<
  | AutocompleteEmits
  | CascaderEmits
  | ColorPickerEmits
  | DatePickerEmits
  | InputEmits
  | InputNumberEmits
  | RateEmits
  | SelectEmits
  | SliderEmits
  | SwitchEmits
  | TimePickeEmits
  | TimeSelectEmits
  | TransferEmits
  | TreeEmits
  | TreeSelectEmits
>

type FormModel = Record<string, any>

/**
 *
 */
export type FormProps<T> = Partial<Omit<ElFormProps, 'model' | 'rules'>> & {
  model: T
  rules?: FormRules<T>
}

export type FormItemProps = Partial<Omit<ElFormItemProps, 'prop'>>

/**
 * 表单组件
 * @param {FormItemProps} props ElementUI表单项目属性,https://element-plus.org/zh-CN/component/form.html#formitem-attributes
 * @param {FormItemCompanents} component 组件名称
 * @param {FormItemCompanentsProps} componentProps 组件属性,ElementUI各个组件对应的属性
 * @param {FormItemCompanentsEvents} componentEvents 组件事件,ElementUI各个组件对应的事件
 * @param {Record<string, VNode[]>} componentSlots 组件插槽,key:插槽名称,value:返回h函数数组https://cn.vuejs.org/guide/extras/render-function.html#basic-usage
 */
export type FormItems<T> = Record<
  keyof T,
  {
    props: FormItemProps
    component: FormItemCompanents
    componentProps?: FormItemCompanentsProps
    componentEvents?: FormItemCompanentsEvents
    componentSlots?: Record<string, VNode[]>
  }
>

export type ButtonItem = {
  props: Partial<ButtonProps>
  slots?: Record<string, VNode[]>
  events?: { click: (e: MouseEvent) => any }
}

/**
 * 简单表单
 * @param {FormProps} props ElementUI表单属性,https://element-plus.org/zh-CN/component/form.html#form-attributes
 * @param {FormItems} formItems 表单项目及对应的组件
 * @param {ButtonItem[]} buttons 按钮组,不传默认显示提交和重置按钮
 */
export default interface SchemaForm<T extends FormModel> {
  props: FormProps<T>
  formItems: FormItems<T>
  buttons?: ButtonItem[]
}

export type SchemaFormInstance = InstanceType<typeof import('../schemaForm.vue').default>
