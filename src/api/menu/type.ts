//菜单数据与按钮数据的ts类型
export interface Permisstion {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: PermisstionList
  select: boolean
}
export type PermisstionList = Permisstion[]
//菜单接口返回的数据类型
export interface PermisstionResponseData extends ResponseData {
  data: PermisstionList
}
