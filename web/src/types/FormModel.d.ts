import type { ButtonProps } from 'element-plus'

export type FormModel = Record<string, any>

/**
 * 按钮
 * @param {ButtonProps} props ElementUI按钮属性,https://element-plus.org/zh-CN/component/button.html#button-attributes
 * @param {Record<string, VNode[]>} slots 插槽,key:插槽名称,value:返回h函数数组https://element-plus.org/zh-CN/component/button.html#button-slots
 * @param {Record<string, (e: MouseEvent) => any>} events 事件
 */
export type ButtonItem = {
  /**
   * 按钮属性,https://element-plus.org/zh-CN/component/button.html#button-attributes
   */
  props: Partial<ButtonProps>
  /**
   * 插槽,key:插槽名称,value:返回h函数数组https://element-plus.org/zh-CN/component/button.html#button-slots
   */
  slots?: Record<string, VNode[]>
  /**
   * 事件
   */
  events?: { click: (e: MouseEvent) => any }
}
