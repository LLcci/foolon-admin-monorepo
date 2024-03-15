import type { FormModel } from '@/types'
import type { TableColumnInstance } from 'element-plus'
import type { FormItemProps } from '@/components/schemaForm/types'
import type { FormItemRule } from 'element-plus'
import type { VNode } from 'vue'

export type SchemaTableForm<T extends FormModel> = Partial<
  Record<
    keyof T,
    {
      /**
       * 表格参数
       * @description 表格参数 https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7
       */
      table?: Omit<TableColumnInstance['$props'], 'prop'> & {
        /**
         * 导出数据格式化
         * @param value 当前参数值
         * @returns 格式化后的值
         */
        exportFormatter?: (value: any) => any
      }
      /**
       * 编辑表单
       */
      editForm?: {
        /**
         * 表单校验规则
         */
        rule?: FormItemRule[]
        /**
         * 表单项目props https://element-plus.org/zh-CN/component/form.html#formitem-attributes
         */
        props?: FormItemProps
        /**
         * 表单v-if
         * @param value 当前参数值
         * @returns boolean
         */
        vIf?: (value: T) => boolean
        /**
         * 表单项目组件
         */
        component?: VNode
        /**
         * 导入数据格式化
         * @param value 当前参数值
         * @returns 格式化后的值
         */
        importFormatter?: (value: any) => any
      }
      /**
       * 查询表单
       */
      searchForm?: {
        /**
         * 表单校验规则
         */
        rule?: FormItemRule[]
        /**
         * 表单项目props https://element-plus.org/zh-CN/component/form.html#formitem-attributes
         */
        props?: FormItemProps
        /**
         * 表单v-if
         * @param value 当前参数值
         * @returns boolean
         */
        vIf?: (value: T) => boolean
        /**
         * 表单项目组件
         */
        component?: VNode
      }
    }
  >
>

/**
 * 接口
 */
export type Api = {
  /**
   * 导出列表
   */
  list: string
  /**
   * 分页查询
   */
  page: string
  /**
   * 按id查询
   */
  id: string
  /**
   * 新增
   */
  create: string
  /**
   * 修改
   */
  update: string
  /**
   * 导入
   */
  import: string
  /**
   * 删除
   */
  delete: string
}

export default SchemaTableForm

export type SchemaTableFormInstance = InstanceType<typeof import('../SchemaTableForm.vue').default>
