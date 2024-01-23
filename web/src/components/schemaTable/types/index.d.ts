import type { FormModel } from '@/types/index'
import type {
  PaginationProps,
  TableColumnInstance,
  TableProps,
  PaginationEmits
} from 'element-plus'

/**
 * 简单表格
 * @param props 表格属性,https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7
 * @param events 表格事件,https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6
 * @param slots 表格插槽,https://element-plus.org/zh-CN/component/table.html#table-%E6%8F%92%E6%A7%BD
 * @param columns key:数据类型key,value:表格列属性,https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
 * @param actionsProps 表格操作列属性,https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
 * @param pagination props:分页属性,events:分页事件,https://element-plus.org/zh-CN/component/pagination.html
 */
export default interface SchemaTable<T extends FormModel> {
  /**
   * 表格属性,https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7
   */
  props: Partial<Omit<TableProps<T>, 'data'>> & {
    data: T[]
  }
  /**
   * 表格事件,https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6
   */
  events?: Record<string, (...arg: any[]) => any>
  /**
   * 表格插槽,https://element-plus.org/zh-CN/component/table.html#table-%E6%8F%92%E6%A7%BD
   */
  slots?: Record<string, VNode[]>
  /**
   * key:数据类型key,value:表格列属性,https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
   */
  columns: Partial<
    Record<
      keyof T,
      {
        props: Omit<TableColumnInstance['$props'], 'prop'>
      }
    >
  >
  /**
   * 表格操作列属性,https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
   */
  actionsProps?: Omit<TableColumnInstance['$props'], 'prop'>
  /**
   * props:分页属性,events:分页事件,https://element-plus.org/zh-CN/component/pagination.html
   */
  pagination?: {
    props?: Partial<
      Omit<
        PaginationProps,
        | 'pageSize'
        | 'currentPage'
        | 'defaultPageSize'
        | 'defaultCurrentPage'
        | 'total'
        | 'pageCount'
      >
    >
    events?: Partial<Omit<PaginationEmits, 'change'>> & {
      change?: (page: number, size: number) => void
    }
  }
}
