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
    table: Omit<TableColumnInstance['$props'], 'prop'> & {
      show: boolean
    }
    form: {
      searchFormShow: boolean
      editFormShow: boolean
      formRule?: FormItemRule[]
      itemProps?: FormItemProps
      itemComponent?: FormItemCompanents
      itemComponentProps?: FormItemCompanentsProps
      itemComponentEvents?: FormItemCompanentsEvents
      itemComponentSlots?: Record<string, VNode[]>
    }
  }
>

export type Api = {
  list: string
  page: string
  id: string
  save: string
  delete: string
  import: string
}

export default SchemaTableForm
