import { BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { values } from 'lodash'

/**
 * 验证对象数组
 * @param arr 对象数组
 * @param classFn class对象
 */
export default async function validateArrObj<T extends Record<string, any>>(
  arr: T[],
  classFn: new (...args: any[]) => T
) {
  for (const index in arr) {
    const menuItem = new classFn()
    Object.assign(menuItem, arr[index])
    const res = await validate(menuItem)
    if (res.length > 0) {
      let message = `第${Number(index) + 1}条数据格式错误：`
      for (const item of res) {
        message += `${values(item.constraints).join(';')};`
      }
      throw new BadRequestException(message)
    }
  }
}
