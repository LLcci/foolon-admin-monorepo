import type { FormModel } from '@/types'
import type { TableColumnInstance } from 'element-plus'
import type {
  FormItemProps,
  FormItemCompanents,
  FormItemCompanentsProps
} from '@/components/schemaForm/types'
import type { FormItemRule } from 'element-plus'

export type SchemaTableForm<T extends FormModel> = Record<
  keyof T,
  {
    /**
     * 表格参数
     * @description 表格参数 https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7
     */
    table: Omit<TableColumnInstance['$props'], 'prop'> & {
      /**
       * 表格内是否显示
       */
      show: boolean
      /**
       * 导出数据格式化
       * @param value 当前参数值
       * @returns 格式化后的值
       */
      exportFormatter?: (value: any) => any
    }
    /**
     * 表单参数
     */
    form: {
      /**
       * 搜索表单是否显示
       */
      searchFormShow: boolean
      /**
       * 编辑新增表单是否显示
       */
      editFormShow: boolean
      /**
       * 表单校验规则
       */
      formRule?: FormItemRule[]
      /**
       * 表单项目props https://element-plus.org/zh-CN/component/form.html#formitem-attributes
       */
      itemProps?: FormItemProps
      /**
       * 表单项目组件
       */
      itemComponent?: FormItemCompanents
      /**
       * 表单项目组件props
       */
      itemComponentProps?: FormItemCompanentsProps
      /**
       * 表单项目组件事件
       */
      itemComponentEvents?: FormItemCompanentsEvents
      /**
       * 表单项目组件插槽
       */
      itemComponentSlots?: Record<string, VNode[]>
      /**
       * 导入数据格式化
       * @param value 当前参数值
       * @returns 格式化后的值
       */
      importFormatter?: (value: any) => any
    }
  }
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
   * 保存或更新
   */
  save: string
  /**
   * 删除
   */
  delete: string
}

export default SchemaTableForm
